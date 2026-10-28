/**
 * First-project tutorial. Guards the ways it could misbehave without anyone
 * noticing: showing up again after a reload, missing from a new run, resuming at
 * the wrong step, or starting when it can't be finished (which would lock the UI).
 */

import { beforeEach, describe, expect, it } from 'vitest';
import legacySaveRaw from './fixtures/save-v11-pre-localization.json?raw';
import { createInitialState, gameReducer } from '../gameState';
import { getTutorialStep } from '../projectTutorial';
import { loadGame, saveGame } from '../saveLoad';
import type { GameState, Student } from '../../types';
import { SAVE_KEY, installMemoryStorage } from './helpers';

beforeEach(() => {
  installMemoryStorage();
});

const IDEA_EVENT = 'idea_meeting_minutes_assistant'; // unlocks meeting_minutes_assistant (engineering 30)
const IDEA = 'meeting_minutes_assistant';

function student(id: string, engineering: number): Student {
  return {
    id, name: id, year: 1, enrolledAt: 1,
    skills: { theory: 50, engineering, social: 50 },
    favor: 50, happiness: 50, projectProgress: 0, status: 'active', traitIds: [],
  };
}

// A run in October of year 1 with the idea event open and its choice modal showing.
function atIdeaEvent(students: Student[]): GameState {
  return {
    ...createInitialState(),
    time: { year: 1, month: 10 },
    students,
    eventQueue: [],
    activeEventId: IDEA_EVENT,
    activeBoundStudentId: students[0]?.id ?? null,
    activeParagraphIndex: 4,
  };
}

const takeIdea = (state: GameState) =>
  gameReducer(state, { type: 'CHOOSE_OPTION', eventId: IDEA_EVENT, optionId: 'build_minutes_tool' });

function reload(state: GameState): GameState {
  saveGame(state);
  return loadGame()!;
}

describe('first-project tutorial', () => {
  it('starts with the first idea, resumes after reloads, and starts over in every new run', () => {
    let state = takeIdea(atIdeaEvent([student('a', 60), student('b', 10)]));
    expect(state.projectTutorial).toEqual({ status: 'active', projectId: IDEA });
    expect(getTutorialStep(state, false)).toEqual({ kind: 'openProjects', projectId: IDEA });
    expect(getTutorialStep(state, true)).toEqual({ kind: 'launch', projectId: IDEA });

    state = reload(gameReducer(reload(state), { type: 'START_PROJECT', projectId: IDEA }));
    // After a reload the projects panel is closed again, so the tutorial points back at it.
    expect(getTutorialStep(state, false)).toEqual({ kind: 'openProjects', projectId: IDEA });
    expect(getTutorialStep(state, true)).toEqual({ kind: 'chooseLead', projectId: IDEA });

    state = gameReducer(state, { type: 'ASSIGN_PROJECT_LEADER', projectId: IDEA, leaderId: 'a' });
    expect(state.projectTutorial).toEqual({ status: 'done' });
    expect(getTutorialStep(reload(state), true)).toBeNull();

    // A new run (ending screen or reset) shows it again with that run's first idea.
    expect(gameReducer(state, { type: 'NEW_GAME' }).projectTutorial).toEqual({ status: 'pending' });
  });

  it('waits while no student can lead the idea, and is skipped once the player launches a project alone', () => {
    let state = takeIdea(atIdeaEvent([student('a', 10)]));
    expect(state.projectIdeas).toEqual([IDEA]);
    expect(state.projectTutorial).toEqual({ status: 'pending' });
    expect(getTutorialStep(state, false)).toBeNull();

    state = gameReducer(state, { type: 'START_PROJECT', projectId: IDEA });
    expect(state.projectTutorial).toEqual({ status: 'done' });
  });

  it('is skipped for saves from before it existed that already reached the project system', () => {
    localStorage.setItem(SAVE_KEY, legacySaveRaw);
    expect(loadGame()!.projectTutorial).toEqual({ status: 'done' });
  });
});
