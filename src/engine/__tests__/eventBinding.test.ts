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
import { loadGame, saveGame } from '../saveLoad';
import { events } from '../../data/events';
import { nameOf } from '../../i18n/content';
import { LOCALES } from '../../types/i18n';
import { installMemoryStorage } from './helpers';

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

// late_alumni_success is about a former student: it binds someone who graduated this run
// (never a current student, never one who left) and its Rapport effects land on that graduate.
describe('alumni events (late_alumni_success)', () => {
  const ALUMNI_EVENT = 'late_alumni_success';
  const ROLLS = [0, 0.2, 0.4, 0.6, 0.8, 0.999];

  // Every student the event binds across a spread of random rolls.
  function boundAcrossRolls(state: GameState): Set<string | undefined> {
    const bound = new Set<string | undefined>();
    for (const roll of ROLLS) {
      vi.spyOn(Math, 'random').mockReturnValue(roll);
      bound.add(filterTriggerable([ALUMNI_EVENT], state)[0]?.studentId);
      vi.restoreAllMocks();
    }
    return bound;
  }

  // Presents the queued event and clicks through its description.
  function presentAndRead(state: GameState): GameState {
    let next = gameReducer(state, { type: 'PRESENT_EVENT' });
    while (next.activeParagraphIndex < events[ALUMNI_EVENT]!.description.length - 1) {
      next = gameReducer(next, { type: 'NEXT_PARAGRAPH' });
    }
    return next;
  }

  const choose = (state: GameState, optionId: string) =>
    gameReducer(state, { type: 'CHOOSE_OPTION', eventId: ALUMNI_EVENT, optionId });

  it('cannot trigger without a graduate, even when students left or are still active', () => {
    expect(filterTriggerable([ALUMNI_EVENT], stateWith([student('lin_xiaojuan')]))).toEqual([]);
    expect(filterTriggerable([ALUMNI_EVENT], stateWith([
      student('lin_xiaojuan'), student('gu_mianmian', 'left'),
    ]))).toEqual([]);
  });

  it('binds the graduate, never an active student or one who left', () => {
    const state = stateWith([
      student('lin_xiaojuan'), student('gu_mianmian', 'left'), student('ye_zhiqiu', 'graduated'), student('bai_xiaoman'),
    ]);
    expect(boundAcrossRolls(state)).toEqual(new Set(['ye_zhiqiu']));
  });

  it('binds one of several graduates', () => {
    const state = stateWith([
      student('lin_xiaojuan'), student('ye_zhiqiu', 'graduated'), student('bai_xiaoman', 'graduated'),
    ]);
    expect(boundAcrossRolls(state)).toEqual(new Set(['ye_zhiqiu', 'bai_xiaoman']));
  });

  it('needs a current lab to celebrate with: no active students, no event', () => {
    expect(filterTriggerable([ALUMNI_EVENT], stateWith([student('ye_zhiqiu', 'graduated')]))).toEqual([]);
  });

  it('the safety net rebinds a missing or active binding to a graduate, or skips the event', () => {
    const withGraduate = stateWith([student('lin_xiaojuan'), student('ye_zhiqiu', 'graduated')]);
    expect(bindRequiredStudents({ id: ALUMNI_EVENT }, withGraduate)?.studentId).toBe('ye_zhiqiu');
    expect(bindRequiredStudents({ id: ALUMNI_EVENT, studentId: 'lin_xiaojuan' }, withGraduate)?.studentId).toBe('ye_zhiqiu');

    const noGraduate = stateWith([student('lin_xiaojuan')], [{ id: ALUMNI_EVENT }, { id: 'idle_quiet_month' }]);
    expect(bindRequiredStudents({ id: ALUMNI_EVENT }, noGraduate)).toBeNull();
    expect(gameReducer(noGraduate, { type: 'PRESENT_EVENT' }).activeEventId).toBe('idle_quiet_month');
  });

  it('names the same graduate in every paragraph and in the result', () => {
    const graduate = student('ye_zhiqiu', 'graduated');
    const current = student('lin_xiaojuan');
    const state = stateWith([current, graduate], [{ id: ALUMNI_EVENT, studentId: graduate.id }]);
    const after = choose(presentAndRead(state), 'reply_privately');

    const entries = after.storyLog.filter(e => e.eventId === ALUMNI_EVENT);
    expect(entries.map(e => e.type)).toEqual(['event-intro', 'event']);
    for (const locale of LOCALES) {
      const text = entries.map(e => [e.narrative[locale], e.narrativeAfterImage?.[locale] ?? '']).flat().join('\n');
      expect(text).toContain(nameOf(graduate, locale));
      expect(text).not.toContain(nameOf(current, locale));
      expect(text).not.toMatch(/\{student/);
    }
    expect(entries[1]!.narrative.en).toContain('Ada');
  });

  it('applies Rapport to the graduate, keeps them graduated, and leaves current students to the group effects', () => {
    const state = stateWith(
      [student('lin_xiaojuan'), student('ye_zhiqiu', 'graduated')],
      [{ id: ALUMNI_EVENT, studentId: 'ye_zhiqiu' }],
    );
    const byId = (s: GameState, id: string) => s.students.find(x => x.id === id)!;

    const privately = choose(presentAndRead(state), 'reply_privately');
    expect(byId(privately, 'ye_zhiqiu').favor).toBe(60);
    expect(byId(privately, 'ye_zhiqiu').status).toBe('graduated');
    expect(byId(privately, 'lin_xiaojuan').favor).toBe(50);

    const publicly = choose(presentAndRead(state), 'celebrate_publicly');
    expect(byId(publicly, 'ye_zhiqiu')).toMatchObject({ favor: 53, happiness: 50, status: 'graduated' });
    expect(byId(publicly, 'lin_xiaojuan')).toMatchObject({ favor: 50, happiness: 47 });
    expect(publicly.students.filter(s => s.status === 'active').map(s => s.id)).toEqual(['lin_xiaojuan']);
  });

  it('keeps the bound graduate across save and load, queued or mid-event', () => {
    installMemoryStorage();
    const state = stateWith(
      [student('lin_xiaojuan'), student('ye_zhiqiu', 'graduated')],
      [{ id: ALUMNI_EVENT, studentId: 'ye_zhiqiu' }],
    );

    saveGame(state);
    expect(loadGame()?.eventQueue).toEqual([{ id: ALUMNI_EVENT, studentId: 'ye_zhiqiu' }]);

    saveGame(presentAndRead(state));
    const resumed = loadGame()!;
    expect(resumed.activeBoundStudentId).toBe('ye_zhiqiu');
    const after = choose(resumed, 'reply_privately');
    expect(after.students.find(s => s.id === 'ye_zhiqiu')).toMatchObject({ favor: 60, status: 'graduated' });
  });
});
