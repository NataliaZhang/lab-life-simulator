/**
 * Shared helpers for the engine tests: an in-memory localStorage, a seeded
 * Math.random, and a headless player that drives the reducer the way the UI does.
 */

import { vi } from 'vitest';
import type { EventOption, GameAction, GameState } from '../../types';
import { timeToMonths } from '../../types';
import type { EndingRecord } from '../gallery';
import { gameReducer } from '../gameState';
import { getEvent } from '../eventQueue';
import { canAssignStudent, studentHasActiveProject } from '../projectEngine';
import { projectById } from '../../data/projects';
import { events } from '../../data/events';

// ─── Storage ───────────────────────────────────────────────────────────────

// Storage keys are part of the save format: renaming one silently orphans every
// player's existing data, so they are spelled out here rather than imported.
export const SAVE_KEY = 'lab-life-simulator-save';
export const GALLERY_KEY = 'lab-life-simulator-gallery';

/** Replaces localStorage with an empty in-memory store and returns its backing map. */
export function installMemoryStorage(): Map<string, string> {
  const items = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    get length() { return items.size; },
    key: (index: number) => [...items.keys()][index] ?? null,
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => { items.set(key, String(value)); },
    removeItem: (key: string) => { items.delete(key); },
    clear: () => items.clear(),
  });
  return items;
}

/** The gallery record App writes when the player reaches this ending. */
export function endingRecord(eventId: string): EndingRecord {
  const event = events[eventId];
  if (!event) throw new Error(`Unknown ending event '${eventId}'`);
  return { eventId, title: event.title, tagline: event.tagline ?? '' };
}

// ─── Randomness ────────────────────────────────────────────────────────────

/** Makes Math.random deterministic (mulberry32) so a played run is reproducible. */
export function seedRandom(seed: number): void {
  let s = seed | 0;
  vi.spyOn(Math, 'random').mockImplementation(() => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  });
}

// ─── Headless player ───────────────────────────────────────────────────────

// Same rules EventModal uses to hide or disable an option.
function isChoosable(option: EventOption, state: GameState): boolean {
  const active = state.students.filter(s => s.status === 'active').map(s => s.id);
  return (!option.requireStudentActive || active.includes(option.requireStudentActive))
    && (!option.fundingCost || state.lab.funding >= option.fundingCost)
    && (!option.energyCost || state.lab.energy >= option.energyCost)
    && (!option.requiredChoiceId || state.chosenOptionIds.includes(option.requiredChoiceId));
}

// The action a player would take next: mirrors useGameEngine.handleContinue,
// the choice and admission modals, and starting/staffing projects between months.
function nextPlayerAction(state: GameState): GameAction {
  if (state.admissionState) {
    const { candidates } = state.admissionState;
    return candidates
      ? { type: 'ADMIT_STUDENT', candidateId: candidates[0] }
      : { type: 'PASS_ADMISSION' };
  }
  if (state.pendingImage) return { type: 'REVEAL_PENDING_IMAGE' };
  if (state.activeEventId) {
    const event = getEvent(state.activeEventId);
    if (state.activeParagraphIndex < event.description.length - 1) return { type: 'NEXT_PARAGRAPH' };
    if (!event.options?.length) return { type: 'DISMISS_PASSIVE_EVENT' };
    const choosable = event.options.filter(o => isChoosable(o, state));
    const option = choosable[Math.floor(Math.random() * choosable.length)];
    if (!option) throw new Error(`No choosable option in event '${event.id}'`);
    return { type: 'CHOOSE_OPTION', eventId: event.id, optionId: option.id };
  }
  if (state.pendingSummarySlides.length > 0) return { type: 'DISMISS_SUMMARY_SLIDE' };
  if (state.eventQueue.length > 0) return { type: 'PRESENT_EVENT' };

  const idea = state.projectIdeas.find(id => {
    const p = projectById[id];
    return p && state.lab.energy >= p.startupEnergyCost && state.lab.funding >= p.startupFundingCost;
  });
  if (idea) return { type: 'START_PROJECT', projectId: idea };
  for (const project of state.activeProjects.filter(p => !p.leaderId)) {
    const leader = state.students.find(s =>
      s.status === 'active'
      && !studentHasActiveProject(s.id, state.activeProjects)
      && canAssignStudent(s, projectById[project.projectId]!));
    if (leader) return { type: 'ASSIGN_PROJECT_LEADER', projectId: project.projectId, leaderId: leader.id };
  }
  return { type: 'ADVANCE_MONTH' };
}

/** Plays until the calendar moves on by one month or the run reaches an ending. */
export function playMonth(state: GameState): GameState {
  const startMonth = timeToMonths(state.time);
  for (let steps = 0; steps < 1000; steps++) {
    if (state.phase !== 'playing' || timeToMonths(state.time) !== startMonth) return state;
    const action = nextPlayerAction(state);
    const next = gameReducer(state, action);
    if (next === state) throw new Error(`Run stuck: ${action.type} had no effect (event: ${state.activeEventId})`);
    state = next;
  }
  throw new Error(`Month ${startMonth} did not finish within 1000 steps`);
}
