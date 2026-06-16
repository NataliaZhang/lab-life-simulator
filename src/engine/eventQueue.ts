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

// Extract anyStudent conditions from a condition list.
function getAnyStudentConds(
  conditions: EventCondition[],
): Extract<EventCondition, { type: 'anyStudent' }>[] {
  return conditions.filter(
    (c): c is Extract<EventCondition, { type: 'anyStudent' }> => c.type === 'anyStudent',
  );
}

export function checkConditions(conditions: EventCondition[], state: GameState): boolean {
  // Multiple anyStudent conditions must ALL be satisfied by the SAME active student.
  const anyStudentConds = getAnyStudentConds(conditions);
  if (anyStudentConds.length > 0) {
    const active = state.students.filter(s => s.status === 'active');
    const hasMatch = active.some(s =>
      anyStudentConds.every(c => compare(getStudentStatValue(s, c.stat), c.op, c.value)),
    );
    if (!hasMatch) return false;
  }

  // Check all non-anyStudent conditions individually.
  return conditions
    .filter(c => c.type !== 'anyStudent')
    .every(cond => {
      if (cond.type === 'lab') {
        return compare(state.lab[cond.stat], cond.op, cond.value);
      }
      if (cond.type === 'student') {
        const s = state.students.find(st => st.id === cond.studentId && st.status === 'active');
        if (!s) return false;
        return compare(getStudentStatValue(s, cond.stat), cond.op, cond.value);
      }
      if (cond.type === 'minStudentCount') {
        return state.students.filter(s => s.status === 'active').length >= cond.value;
      }
      if (cond.type === 'time') {
        return compare(state.time[cond.field], cond.op, cond.value);
      }
      if (cond.type === 'seenEvent') {
        return state.storyLog.some(
          e => (e.type === 'event' || e.type === 'event-intro') && e.eventId === cond.eventId,
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
function findTriggeringStudents(
  conditions: EventCondition[],
  state: GameState,
): { studentId?: string; student2Id?: string } {
  const needsTwo = conditions.some(c => c.type === 'minStudentCount' && c.value >= 2);
  const active = state.students.filter(s => s.status === 'active');

  let studentId: string | undefined;

  // Find a student satisfying ALL anyStudent conditions simultaneously.
  const anyStudentConds = getAnyStudentConds(conditions);
  if (anyStudentConds.length > 0) {
    const eligible = active.filter(s =>
      anyStudentConds.every(c => compare(getStudentStatValue(s, c.stat), c.op, c.value)),
    );
    if (eligible.length > 0) {
      const shuffled = [...eligible].sort(() => Math.random() - 0.5);
      studentId = shuffled[0]?.id;
    }
  }

  // If no anyStudent condition but we need a primary, pick at random
  if (!studentId && active.length > 0) {
    const shuffled = [...active].sort(() => Math.random() - 0.5);
    studentId = shuffled[0]?.id;
  }

  if (!needsTwo) return { studentId };

  // Pick a different second student
  const others = active.filter(s => s.id !== studentId);
  const shuffled2 = [...others].sort(() => Math.random() - 0.5);
  return { studentId, student2Id: shuffled2[0]?.id };
}

// Collect studentIds that an event hard-codes in its effects (not randomStudent).
// Events that explicitly target a student by ID should only fire when that student is enrolled.
function getRequiredStudentIds(event: GameEvent): string[] {
  const ids = new Set<string>();
  for (const option of event.options ?? []) {
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
    const { studentId, student2Id } = event.triggerConditions
      ? findTriggeringStudents(event.triggerConditions, state)
      : {};
    result.push({ id, studentId, student2Id });
  }
  return result;
}

export function pickRandomQueuedEvent(pool: QueuedEvent[]): QueuedEvent | null {
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}
