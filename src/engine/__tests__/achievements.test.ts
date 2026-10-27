/**
 * Achievement rules. Galleries saved before achievements existed get them
 * backfilled from the endings and max-favor students they recorded, so the
 * backfill has to agree with the live unlock rules. The live rules match event
 * and option IDs by name, so a renamed event can also silently make an
 * achievement unobtainable while everything still builds.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { checkAchievementUnlocks, checkEndingAchievements } from '../achievements';
import { loadGallery } from '../gallery';
import type { GalleryData } from '../gallery';
import { achievements } from '../../data/achievements';
import { endingEventIds, events } from '../../data/events';
import { allCandidates } from '../../data/studentPool';
import type { GamePhase } from '../../types';
import { GALLERY_KEY, endingRecord, installMemoryStorage } from './helpers';

beforeEach(() => {
  installMemoryStorage();
});

const emptyGallery: GalleryData = {
  endingsSeen: [],
  studentsSeen: [],
  studentsMaxFavor: [],
  projectsStarted: [],
  projectsCompleted: [],
  achievementsUnlocked: [],
};

// Achievements a stored gallery from before achievements existed ends up with once loaded.
function backfilledFrom(old: Partial<GalleryData>): string[] {
  localStorage.setItem(GALLERY_KEY, JSON.stringify({ version: 1, ...old }));
  return [...loadGallery().achievementsUnlocked].sort();
}

// Every phase the ending's outcomes can move the game to.
function phasesOf(eventId: string): GamePhase[] {
  const phases = (events[eventId]?.options ?? [])
    .flatMap(o => o.outcomes.map(x => x.phaseChange))
    .filter((p): p is GamePhase => p !== undefined);
  return [...new Set(phases)];
}

describe('ending achievements', () => {
  it('are backfilled exactly as reaching the ending would unlock them live', () => {
    for (const id of endingEventIds) {
      const options = events[id]?.options ?? [];
      expect(phasesOf(id), `${id} never ends the game`).not.toHaveLength(0);
      for (const option of options) {
        for (const outcome of option.outcomes) {
          if (!outcome.phaseChange) continue; // the game goes on, so nothing is recorded
          // What App unlocks when the player picks this option and the game ends.
          const live = new Set([
            ...checkAchievementUnlocks(id, option.id, emptyGallery),
            ...checkEndingAchievements(outcome.phaseChange, id),
          ]);
          expect(backfilledFrom({ endingsSeen: [endingRecord(id)] }), `${id} / ${option.id}`)
            .toEqual([...live].sort());
        }
      }
    }
  });

  it('count every winning ending as tenure except leaving for industry', () => {
    // Spelled out on purpose: this is the rule itself, not derived from the code under test.
    expect(endingEventIds).toContain('ending_time_wealthy');
    expect(phasesOf('ending_time_wealthy')).toEqual(['won']);

    for (const id of endingEventIds) {
      const phases = phasesOf(id);
      expect(phases, `${id} should end the game one way`).toHaveLength(1);
      const expected = id === 'ending_time_wealthy' ? ['ending_time_wealthy']
        : phases[0] === 'won' ? ['tenure_granted']
        : ['bad_ending'];
      expect(backfilledFrom({ endingsSeen: [endingRecord(id)] }), id).toEqual(expected);
    }

    expect(backfilledFrom({ endingsSeen: endingEventIds.map(endingRecord) }))
      .toEqual(['bad_ending', 'ending_time_wealthy', 'tenure_granted']);
  });
});

describe('max-favor achievements', () => {
  it('are backfilled per student, with max_favor_all only once every student is covered', () => {
    const ids = allCandidates.map(c => c.id);
    const allButOne = ids.slice(1);
    expect(backfilledFrom({ studentsMaxFavor: allButOne }))
      .toEqual(allButOne.map(id => `max_favor_${id}`).sort());
    expect(backfilledFrom({ studentsMaxFavor: ids }))
      .toEqual([...ids.map(id => `max_favor_${id}`), 'max_favor_all'].sort());
  });
});

describe('achievement catalogue', () => {
  it('matches what the current event data can actually unlock', () => {
    // Collect everything any choice in any event can unlock, with a gallery
    // where every student is already at max favor so max_favor_all can fire too.
    const everyoneMaxed = { ...emptyGallery, studentsMaxFavor: allCandidates.map(c => c.id) };
    const reachable = new Set<string>();
    for (const [eventId, event] of Object.entries(events)) {
      for (const option of event.options ?? []) {
        checkAchievementUnlocks(eventId, option.id, everyoneMaxed).forEach(a => reachable.add(a));
        for (const { phaseChange } of option.outcomes) {
          if (phaseChange) checkEndingAchievements(phaseChange, eventId).forEach(a => reachable.add(a));
        }
      }
    }
    const catalogue = new Set(achievements.map(a => a.id));
    expect([...catalogue].filter(id => !reachable.has(id)), 'achievements nothing can unlock').toEqual([]);
    expect([...reachable].filter(id => !catalogue.has(id)), 'unlocks with no gallery card').toEqual([]);
  });
});
