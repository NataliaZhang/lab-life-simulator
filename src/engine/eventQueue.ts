import type {
  GameEvent,
  GameState,
  WeightedOutcome,
  EventCondition,
  ConditionOp,
  StudentStatKey,
  QueuedEvent,
} from '../types';
import { events } from '../data/events';

export function getEvent(id: string): GameEvent {
  const event = events[id];
  if (!event) throw new Error(`Unknown event ID: "${id}"`);
  return event;
}

// ─── Condition evaluation ──────────────────────────────────────────────────

function compare(val: number, op: ConditionOp, threshold: number): boolean {
  switch (op) {
    case '>=': return val >= threshold;
    case '<=': return val <= threshold;
    case '>':  return val > threshold;
    case '<':  return val < threshold;
    case '==': return val === threshold;
  }
}

function getStudentStatValue(
  student: import('../types').Student,
  stat: StudentStatKey,
): number {
  switch (stat) {
    case 'favor':            return student.favor;
    case 'happiness':        return student.happiness;
    case 'projectProgress':  return student.projectProgress;
    case 'skills.theory':    return student.skills.theory;
    case 'skills.engineering': return student.skills.engineering;
    case 'skills.social':    return student.skills.social;
  }
}

export function checkConditions(conditions: EventCondition[], state: GameState): boolean {
  return conditions.every(cond => {
    if (cond.type === 'lab') {
      return compare(state.lab[cond.stat], cond.op, cond.value);
    }
    if (cond.type === 'student') {
      const s = state.students.find(st => st.id === cond.studentId && st.status === 'active');
      if (!s) return false;
      return compare(getStudentStatValue(s, cond.stat), cond.op, cond.value);
    }
    if (cond.type === 'anyStudent') {
      return state.students.some(
        s => s.status === 'active' && compare(getStudentStatValue(s, cond.stat), cond.op, cond.value),
      );
    }
    return true;
  });
}

// ─── Outcome picking ───────────────────────────────────────────────────────

// Pick one outcome, respecting per-outcome conditions.
// Outcomes whose conditions are not met are excluded from the pool.
export function pickOutcome(outcomes: WeightedOutcome[], state: GameState): WeightedOutcome | null {
  const eligible = outcomes.filter(o =>
    !o.conditions || checkConditions(o.conditions, state),
  );
  const pool = eligible.length > 0 ? eligible : outcomes;
  if (pool.length === 0) return null;

  const total = pool.reduce((sum, o) => sum + o.weight, 0);
  let roll = Math.random() * total;
  for (const o of pool) {
    roll -= o.weight;
    if (roll <= 0) return o;
  }
  return pool[pool.length - 1] ?? null;
}

// ─── Queue helpers ─────────────────────────────────────────────────────────

export function filterUnseen(candidates: string[], seenIds: Set<string>): string[] {
  return candidates.filter(id => !seenIds.has(id));
}

// For events with anyStudent conditions, find the student who most urgently
// satisfies the condition (lowest value for < / <=, highest for > / >=).
// Returns undefined for events without anyStudent conditions.
function findTriggeringStudent(conditions: EventCondition[], state: GameState): string | undefined {
  for (const cond of conditions) {
    if (cond.type !== 'anyStudent') continue;
    const active = state.students.filter(s => s.status === 'active');
    const candidates = active.filter(s =>
      compare(getStudentStatValue(s, cond.stat), cond.op, cond.value),
    );
    if (candidates.length === 0) continue;
    const pickLowest = cond.op === '<' || cond.op === '<=';
    candidates.sort((a, b) => {
      const va = getStudentStatValue(a, cond.stat);
      const vb = getStudentStatValue(b, cond.stat);
      return pickLowest ? va - vb : vb - va;
    });
    return candidates[0]?.id;
  }
  return undefined;
}

// Collect studentIds that an event hard-codes in its effects (not randomStudent).
// Events that explicitly target a student by ID should only fire when that student is enrolled.
function getRequiredStudentIds(event: GameEvent): string[] {
  const ids = new Set<string>();
  for (const option of event.options) {
    for (const outcome of option.outcomes) {
      for (const effect of outcome.effects ?? []) {
        if (effect.type === 'student') ids.add(effect.studentId);
      }
    }
  }
  return [...ids];
}

// Filter events whose triggerConditions are all satisfied.
// Returns QueuedEvent objects that carry the bound studentId when applicable.
export function filterTriggerable(eventIds: string[], state: GameState): QueuedEvent[] {
  const activeIds = new Set(state.students.filter(s => s.status === 'active').map(s => s.id));
  const result: QueuedEvent[] = [];
  for (const id of eventIds) {
    const event = events[id];
    if (!event) continue;
    if (event.triggerConditions && !checkConditions(event.triggerConditions, state)) continue;
    // Skip events that explicitly target students not yet in the lab
    const required = getRequiredStudentIds(event);
    if (required.some(sid => !activeIds.has(sid))) continue;
    const studentId = event.triggerConditions
      ? findTriggeringStudent(event.triggerConditions, state)
      : undefined;
    result.push({ id, studentId });
  }
  return result;
}

export function pickRandomQueuedEvent(pool: QueuedEvent[]): QueuedEvent | null {
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}
