// ─── Localization types ───────────────────────────────────────────────────
// Chinese content in src/data/ is the source of truth. English lives in
// src/data/en/ as text-only overlays keyed by the same stable IDs, so game
// logic (effects, weights, conditions) is never duplicated per language.
// See LOCALIZATION_GUIDE.md for conventions.

export type Locale = 'zh' | 'en';

export const LOCALES: readonly Locale[] = ['zh', 'en'];

/**
 * A player-facing string stored in every supported language.
 * Story-log entries keep both versions so a mid-run language switch
 * re-renders the whole history instead of leaving it in the old language.
 */
export type LocalizedText = Record<Locale, string>;

// ─── Event overlays ────────────────────────────────────────────────────────

export interface OptionTranslation {
  text: string;
  /** One narrative per outcome, in the same order as the Chinese `outcomes` array. */
  outcomes: string[];
}

export interface EventTranslation {
  title: string;
  tagline?: string;
  prompt?: string;
  /** Same length as the Chinese `description`; empty-string spacers stay empty. */
  description: string[];
  /** Keyed by option ID. */
  options?: Record<string, OptionTranslation>;
}

export type EventTranslations = Record<string, EventTranslation>;

// ─── Static content overlays ───────────────────────────────────────────────

export interface CandidateTranslation {
  /** Canonical full name ("Jamie Lin") — identity surfaces only: admission card, member card, gallery. */
  name: string;
  /** How prose and system text refer to the student once introduced ("Jamie"). */
  firstName: string;
  pronoun: 'he' | 'she';
  tagline: string;
  bio: string;
  farewell?: string;
}

/** Everything English about one main student: profile card plus their personal events. */
export interface CharacterPack {
  profile: CandidateTranslation;
  events: EventTranslations;
}

export interface TraitTranslation {
  name: string;
  description: string;
  effect: string;
}

export interface ProjectTranslation {
  name: string;
  description: string;
  completionSummary: string;
  ideaSources: string[];
}

export interface AchievementTranslation {
  title: string;
  criteria: string;
}
