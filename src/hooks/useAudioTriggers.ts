// Watches GameState for changes and fires audio cues accordingly.
// BGM switches are crossfaded; SFX are fire-and-forget.

import { useEffect, useRef } from 'react';
import type { GameState } from '../types';
import { audioManager } from '../engine/audioManager';

// ─── Ending → BGM mapping ─────────────────────────────────────────────────────

const ENDING_BGM: Record<string, string> = {
  ending_time_famous:          'ending_time_great',
  ending_time_wealthy:         'ending_time_great',
  ending_time_great:           'ending_time_great',
  ending_time_steady:          'ending_time_steady',
  ending_time_struggle:        'ending_time_struggle',
  ending_funding_crisis:       'ending_lose',
  ending_all_students_left:    'ending_lose',
  ending_burnout_tenure:       'ending_lose',
  ending_be_rep_low:           'ending_lose',
  ending_be_proj_insufficient: 'ending_lose',
};

function bgmForEnding(id: string): string {
  return ENDING_BGM[id] ?? 'ending_lose';
}

// Pick randomly between daily1 and daily2 each time we start daily BGM.
function dailyBgm(): string {
  return Math.random() < 0.5 ? 'daily1' : 'daily2';
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAudioTriggers(state: GameState): void {
  const prevRef = useRef<GameState | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = state;

    // ── First render: kick off BGM ───────────────────────────────────────────
    if (!prev) {
      if (state.endingEventId) {
        audioManager.playBgm(bgmForEnding(state.endingEventId));
      } else if (state.phase === 'playing') {
        audioManager.playBgm(dailyBgm());
      }
      return;
    }

    // ── Ending triggered → switch BGM ───────────────────────────────────────
    if (state.endingEventId && state.endingEventId !== prev.endingEventId) {
      audioManager.fadeToBgm(bgmForEnding(state.endingEventId));
    }

    // ── New event appeared on screen ─────────────────────────────────────────
    if (state.activeEventId && state.activeEventId !== prev.activeEventId) {
      audioManager.playSfx('continue');
    }

    // ── Admission modal opened ────────────────────────────────────────────────
    if (state.admissionState && !prev.admissionState) {
      audioManager.playSfx('new_student');
    }

    // ── New game started → switch back to daily BGM ─────────────────────────
    if (state.phase === 'playing' && prev.phase !== 'playing') {
      audioManager.fadeToBgm(dailyBgm());
    }

    // ── Recovery: restart daily BGM if it stopped unexpectedly ───────────────
    // Fires on any state update when in playing phase with no ending active.
    // playBgm() is idempotent — it no-ops if the same track is already running.
    if (state.phase === 'playing' && !state.endingEventId && !audioManager.isBgmActive()) {
      audioManager.playBgm(dailyBgm());
    }

    // ── Idea unlocked ────────────────────────────────────────────────────────
    if (state.projectIdeas.length > prev.projectIdeas.length) {
      audioManager.playSfx('idea');
    }

    // ── Project started ──────────────────────────────────────────────────────
    if (state.activeProjects.length > prev.activeProjects.length) {
      audioManager.playSfx('project_start');
    }

    // ── Project completed ────────────────────────────────────────────────────
    if (state.completedProjects.length > prev.completedProjects.length) {
      audioManager.playSfx('project_complete');
    }

    // ── Student reached max favor (100) ─────────────────────────────────────
    const prevMaxFavor = Math.max(0, ...prev.students.map(s => s.favor));
    const currMaxFavor = Math.max(0, ...state.students.map(s => s.favor));
    if (currMaxFavor >= 100 && prevMaxFavor < 100) {
      audioManager.playSfx('high_favor');
    }

    // ── Reward / penalty from significant lab stat changes ───────────────────
    // Only trigger when a story log entry was just appended (i.e., an event
    // outcome resolved), to avoid triggering on monthly passive updates.
    const logGrew = state.storyLog.length > prev.storyLog.length;
    if (logGrew) {
      const repDelta     = state.lab.reputation - prev.lab.reputation;
      const fundingDelta = state.lab.funding    - prev.lab.funding;
      if (repDelta > 0 || fundingDelta > 3) {
        audioManager.playSfx('reward');
      } else if (repDelta < -2 || fundingDelta < -5) {
        audioManager.playSfx('penalty');
      }
    }
  }, [state]);
}
