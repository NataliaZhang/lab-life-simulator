/**
 * Achievement unlock detection — pure functions only.
 *
 * Achievements are cross-run permanent records (see GalleryData.achievementsUnlocked).
 * Each entry here inspects a single player choice (eventId + optionId) plus the
 * gallery snapshot *before* this choice's side effects are recorded, and returns
 * the achievement IDs that should newly unlock as a result.
 *
 * Per-student max_favor achievements reuse the max_favor event ID directly
 * (e.g. 'max_favor_lin_xiaojuan'), so no separate mapping table is needed.
 *
 * checkEndingAchievements() covers triggers keyed off the resulting game phase
 * (e.g. reaching any winning ending) rather than a specific choice, since the
 * outcome that sets phaseChange is resolved inside the reducer, not known at
 * the call site of chooseOption().
 */

import type { GalleryData } from './gallery';
import type { GamePhase } from '../types';
import { allCandidates } from '../data/studentPool';

export function checkAchievementUnlocks(
  eventId: string,
  optionId: string,
  gallery: GalleryData,
): string[] {
  const unlocked: string[] = [];

  if (eventId.startsWith('max_favor_')) {
    unlocked.push(eventId);

    const studentId = eventId.slice('max_favor_'.length);
    const allMaxFavorIds = new Set([...gallery.studentsMaxFavor, studentId]);
    if (allCandidates.every(c => allMaxFavorIds.has(c.id))) {
      unlocked.push('max_favor_all');
    }
  }

  if (eventId === 'lab_opening' && optionId === 'begin') {
    unlocked.push('lab_own');
  }

  if (eventId === 'startup_grant' && optionId === 'renovate_lab') {
    unlocked.push('lab_decorated');
  }

  if (eventId === 'new_year_gift' && optionId.startsWith('gift_')) {
    unlocked.push('first_gift');
  }

  return unlocked;
}

// Any ending that resolves to a "win" (as opposed to a gameover/BE ending)
// unlocks the tenure achievement, regardless of which specific ending it was.
export function checkEndingAchievements(phase: GamePhase): string[] {
  return phase === 'won' ? ['tenure_granted'] : [];
}
