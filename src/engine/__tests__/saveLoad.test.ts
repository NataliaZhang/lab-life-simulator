/**
 * Run save (the run in progress, in localStorage). Guards the two ways an
 * update could cost a player their run: saves from older builds stop loading or
 * load incomplete, or some state doesn't survive JSON and a reload quietly
 * changes the run.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import legacySaveRaw from './fixtures/save-v11-pre-localization.json?raw';
import { loadGame, saveGame } from '../saveLoad';
import { createInitialState } from '../gameState';
import { LOCALES } from '../../types/i18n';
import type { GameState, LocalizedText } from '../../types';
import { SAVE_KEY, installMemoryStorage, playMonth, seedRandom } from './helpers';

beforeEach(() => {
  installMemoryStorage();
});

// Log text as the pre-localization build stored it: plain Chinese strings.
interface LegacyLogEntry {
  title: string;
  narrative: string;
  choiceText?: string;
  narrativeAfterImage?: string;
  statChanges?: Array<{ label: string }>;
}

const inEveryLocale = (text: string) =>
  Object.fromEntries(LOCALES.map(locale => [locale, text])) as LocalizedText;
const upgradeOptional = (text: string | undefined) =>
  (text === undefined ? undefined : inEveryLocale(text));

// Fields a new game has that `loaded` lacks, at the top level and in lab stats.
function missingFields(loaded: GameState): string[] {
  const fresh = createInitialState();
  return [
    ...Object.keys(fresh).filter(k => !(k in loaded)),
    ...Object.keys(fresh.lab).filter(k => !(k in loaded.lab)).map(k => `lab.${k}`),
  ];
}

// Plays the run to its ending (or at most `maxMonths`), returning the final state.
function playToEnd(state: GameState, maxMonths = 120): GameState {
  for (let m = 0; m < maxMonths && state.phase === 'playing'; m++) state = playMonth(state);
  return state;
}

describe('run save', () => {
  it('resumes a run saved by the last pre-localization build and plays it to an ending', () => {
    // Written by commit a67a398 (story log trimmed to keep the file small): a
    // year-3 run with two students, a led project and a choice modal open.
    localStorage.setItem(SAVE_KEY, legacySaveRaw);
    const legacy = JSON.parse(legacySaveRaw).state as Record<string, unknown> & { storyLog: LegacyLogEntry[] };

    // The game resumes from loadGame() directly (useGameEngine's initializer).
    const resumed = loadGame();
    expect(resumed, 'existing saves no longer load; bumping SAVE_VERSION discards every run in progress').not.toBeNull();
    const state = resumed!;
    expect(missingFields(state), 'fields an existing save resumes without; give them a default in loadGame').toEqual([]);

    // Everything but the text carries over untouched; text reads the same in every language.
    expect(state).toMatchObject({ ...legacy, storyLog: expect.any(Array), pendingSummarySlides: expect.any(Array) });
    expect(state.storyLog).toEqual(legacy.storyLog.map(entry => ({
      ...entry,
      title: inEveryLocale(entry.title),
      narrative: inEveryLocale(entry.narrative),
      choiceText: upgradeOptional(entry.choiceText),
      narrativeAfterImage: upgradeOptional(entry.narrativeAfterImage),
      statChanges: entry.statChanges?.map(c => ({ ...c, label: inEveryLocale(c.label) })),
    })));

    seedRandom(11);
    const end = playToEnd(state);
    expect(end.phase).not.toBe('playing');
    expect(end.endingEventId).not.toBeNull();
  });

  it('survives a reload at every month boundary of a full run', () => {
    seedRandom(1);
    let state = createInitialState();
    for (let month = 0; month < 120 && state.phase === 'playing'; month++) {
      state = playMonth(state);
      saveGame(state);
      const reloaded = loadGame();
      expect(reloaded, `reload after month ${month + 1}`).toEqual(state);
      state = reloaded!; // keep playing from the reloaded copy, as a returning player would
    }
    expect(state.phase).not.toBe('playing');
    expect(state.endingEventId).not.toBeNull();
  });
});
