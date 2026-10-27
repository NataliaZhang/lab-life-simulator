/**
 * Student binding for placeholder text. An event whose text names {studentName}
 * must reach the screen with a student bound, or the placeholder renders
 * literally (in both languages). These cover the paths that used to leak it:
 * pool draws and directly queued events when no student was bound.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import type { GameState, Student } from '../../types';
import { createInitialState, gameReducer } from '../gameState';
import { bindRequiredStudents, filterTriggerable } from '../eventQueue';
import { events } from '../../data/events';

afterEach(() => {
  vi.restoreAllMocks();
});

function student(id: string, status: Student['status'] = 'active'): Student {
  return {
    id, name: id, year: 2, enrolledAt: 1,
    skills: { theory: 50, engineering: 50, social: 50 },
    favor: 50, happiness: 50, projectProgress: 0, status, traitIds: [],
  };
}

// Reputation clears idea_server_oracle's own trigger condition (>= 15), so only binding decides.
function stateWith(students: Student[], queue: GameState['eventQueue'] = []): GameState {
  const base = createInitialState();
  return { ...base, time: { year: 3, month: 4 }, lab: { ...base.lab, reputation: 20 }, students, eventQueue: queue };
}

// Events chosen because their text names {studentName}; the second also names {student2Name}.
const ONE_STUDENT_EVENT = 'idea_server_oracle';
const TWO_STUDENT_EVENT = Object.values(events).find(e =>
  JSON.stringify(e).includes('{student2Name}'))!.id;

describe('bindRequiredStudents', () => {
  it('binds an active student when the event names one and none is bound', () => {
    const state = stateWith([student('lin_xiaojuan')]);
    expect(bindRequiredStudents({ id: ONE_STUDENT_EVENT }, state)).toEqual({
      id: ONE_STUDENT_EVENT, studentId: 'lin_xiaojuan', student2Id: undefined,
    });
  });

  it('returns null when no active student can be bound', () => {
    const state = stateWith([student('lin_xiaojuan', 'graduated')]);
    expect(bindRequiredStudents({ id: ONE_STUDENT_EVENT }, state)).toBeNull();
  });

  it('keeps an existing binding even if that student is no longer active', () => {
    const state = stateWith([student('lin_xiaojuan', 'graduated')]);
    const queued = { id: ONE_STUDENT_EVENT, studentId: 'lin_xiaojuan' };
    expect(bindRequiredStudents(queued, state)).toBe(queued);
  });

  it('binds two different students for events that name both', () => {
    const state = stateWith([student('lin_xiaojuan'), student('gu_mianmian')]);
    const bound = bindRequiredStudents({ id: TWO_STUDENT_EVENT }, state);
    expect(bound?.studentId).toBeDefined();
    expect(bound?.student2Id).toBeDefined();
    expect(bound?.studentId).not.toBe(bound?.student2Id);
  });

  it('leaves events without student placeholders untouched', () => {
    const queued = { id: 'idle_quiet_month' };
    expect(bindRequiredStudents(queued, stateWith([]))).toBe(queued);
  });
});

describe('placeholder events in play', () => {
  it('pool draws bind a student, or skip the event when the lab has no active students', () => {
    const staffed = stateWith([student('lin_xiaojuan')]);
    expect(filterTriggerable([ONE_STUDENT_EVENT], staffed)).toEqual([
      { id: ONE_STUDENT_EVENT, studentId: 'lin_xiaojuan', student2Id: undefined },
    ]);
    const empty = stateWith([student('lin_xiaojuan', 'left')]);
    expect(filterTriggerable([ONE_STUDENT_EVENT], empty)).toEqual([]);
  });

  it('PRESENT_EVENT binds a student for an unbound queued event', () => {
    const state = stateWith([student('gu_mianmian')], [{ id: ONE_STUDENT_EVENT }]);
    const next = gameReducer(state, { type: 'PRESENT_EVENT' });
    expect(next.activeEventId).toBe(ONE_STUDENT_EVENT);
    expect(next.activeBoundStudentId).toBe('gu_mianmian');
    const intro = next.storyLog[next.storyLog.length - 1]!;
    expect(intro.narrative.zh).not.toContain('{studentName}');
    expect(intro.narrative.en).not.toContain('{studentName}');
  });

  it('PRESENT_EVENT skips an event nobody can fill in and shows the next one', () => {
    const state = stateWith([student('gu_mianmian', 'graduated')], [
      { id: ONE_STUDENT_EVENT },
      { id: 'idle_quiet_month' },
    ]);
    const next = gameReducer(state, { type: 'PRESENT_EVENT' });
    expect(next.activeEventId).toBe('idle_quiet_month');
    expect(next.eventQueue).toEqual([]);
  });
});
