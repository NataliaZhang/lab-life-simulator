/**
 * Localized views of the static game content.
 *
 * Chinese data in src/data/ is returned untouched for 'zh'. For 'en' the text
 * fields are swapped for the overlays in src/data/en/, falling back to Chinese
 * when a translation is missing (npm run check:i18n reports those gaps).
 * Pure functions only — safe to call from the engine and from components.
 */

import type { GameEvent, Student } from '../types';
import type { Locale } from '../types/i18n';
import type { ProjectDefinition } from '../types/project';
import type { AchievementDefinition } from '../types/achievement';
import type { TraitDef } from '../data/traits';
import type { StudentCandidate } from '../data/studentPool';
import { allCandidates } from '../data/studentPool';
import { eventsEn, candidatesEn, traitsEn, projectsEn, achievementsEn } from '../data/en';

// ─── Events ────────────────────────────────────────────────────────────────

const enEventCache = new Map<string, GameEvent>();

/** Returns the event with its player-facing text in the given language. Mechanics are untouched. */
export function localizeEvent(event: GameEvent, locale: Locale): GameEvent {
  if (locale === 'zh') return event;
  const tr = eventsEn[event.id];
  if (!tr) return event;

  const cached = enEventCache.get(event.id);
  if (cached) return cached;

  const localized: GameEvent = {
    ...event,
    title: tr.title || event.title,
    tagline: tr.tagline ?? event.tagline,
    prompt: tr.prompt ?? event.prompt,
    description: event.description.map((p, i) => tr.description[i] ?? p),
    options: event.options?.map(option => {
      const ot = tr.options?.[option.id];
      if (!ot) return option;
      return {
        ...option,
        text: ot.text || option.text,
        outcomes: option.outcomes.map((outcome, i) => ({
          ...outcome,
          narrative: ot.outcomes[i] ?? outcome.narrative,
        })),
      };
    }),
  };
  enEventCache.set(event.id, localized);
  return localized;
}

// ─── Students ──────────────────────────────────────────────────────────────

export interface CandidateText {
  name: string;
  tagline: string;
  bio: string;
  farewell?: string;
}

export function getCandidateText(candidate: StudentCandidate, locale: Locale): CandidateText {
  const en = locale === 'en' ? candidatesEn[candidate.id] : undefined;
  return {
    name: en?.name || candidate.name,
    tagline: en?.tagline || candidate.tagline,
    bio: en?.bio || candidate.bio,
    farewell: en?.farewell ?? candidate.farewell,
  };
}

/** Display name for a student ID. `fallback` covers IDs outside the candidate pool. */
export function studentDisplayName(studentId: string, locale: Locale, fallback = studentId): string {
  const candidate = allCandidates.find(c => c.id === studentId);
  if (!candidate) return fallback;
  return getCandidateText(candidate, locale).name;
}

export function nameOf(student: Pick<Student, 'id' | 'name'>, locale: Locale): string {
  return studentDisplayName(student.id, locale, student.name);
}

export type PronounForm = 'he' | 'him' | 'his' | 'himself';

const PRONOUNS: Record<Locale, Record<'m' | 'f', Record<PronounForm, string>>> = {
  en: {
    m: { he: 'he', him: 'him', his: 'his', himself: 'himself' },
    f: { he: 'she', him: 'her', his: 'her', himself: 'herself' },
  },
  zh: {
    m: { he: '他', him: '他', his: '他的', himself: '他自己' },
    f: { he: '她', him: '她', his: '她的', himself: '她自己' },
  },
};

export function studentPronoun(studentId: string, form: PronounForm, locale: Locale): string {
  const candidate = allCandidates.find(c => c.id === studentId);
  const gender = candidate?.pronoun === '她' ? 'f' : 'm';
  return PRONOUNS[locale][gender][form];
}

// ─── Traits / projects / achievements ──────────────────────────────────────

export function getTraitText(trait: TraitDef, locale: Locale): Pick<TraitDef, 'name' | 'description' | 'effect'> {
  const en = locale === 'en' ? traitsEn[trait.id] : undefined;
  return {
    name: en?.name || trait.name,
    description: en?.description || trait.description,
    effect: en?.effect || trait.effect,
  };
}

export type ProjectText = Pick<ProjectDefinition, 'name' | 'description' | 'completionSummary' | 'ideaSources'>;

export function getProjectText(project: ProjectDefinition, locale: Locale): ProjectText {
  const en = locale === 'en' ? projectsEn[project.id] : undefined;
  return {
    name: en?.name || project.name,
    description: en?.description || project.description,
    completionSummary: en?.completionSummary || project.completionSummary,
    ideaSources: en?.ideaSources ?? project.ideaSources,
  };
}

export function getAchievementText(a: AchievementDefinition, locale: Locale): Pick<AchievementDefinition, 'title' | 'criteria'> {
  const en = locale === 'en' ? achievementsEn[a.id] : undefined;
  return {
    title: en?.title || a.title,
    criteria: en?.criteria || a.criteria,
  };
}
