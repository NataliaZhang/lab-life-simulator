import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { GameEvent, Student } from '../types';
import type { Locale, LocalizedText } from '../types/i18n';
import type { ProjectDefinition } from '../types/project';
import type { AchievementDefinition } from '../types/achievement';
import type { TraitDef } from '../data/traits';
import type { StudentCandidate } from '../data/studentPool';
import type { Messages } from './messages';
import { getMessages } from './messages';
import { loadLocale, saveLocale, pickText } from './locale';
import {
  localizeEvent,
  getCandidateText,
  getTraitText,
  getProjectText,
  getAchievementText,
  nameOf,
  studentDisplayName,
} from './content';

export interface I18n {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI/engine string catalog for the current language. */
  m: Messages;
  /** Picks the current language out of a stored bilingual string. */
  text: (t: LocalizedText | string | undefined) => string;
  event: (e: GameEvent) => GameEvent;
  candidate: (c: StudentCandidate) => ReturnType<typeof getCandidateText>;
  trait: (t: TraitDef) => ReturnType<typeof getTraitText>;
  project: (p: ProjectDefinition) => ReturnType<typeof getProjectText>;
  achievement: (a: AchievementDefinition) => ReturnType<typeof getAchievementText>;
  studentName: (s: Pick<Student, 'id' | 'name'>) => string;
  studentNameById: (id: string) => string;
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.title = locale === 'zh' ? 'Lab Life Simulator · 实验室模拟器' : 'Lab Life Simulator';
  }, [locale]);

  const value = useMemo<I18n>(() => ({
    locale,
    setLocale,
    m: getMessages(locale),
    text: t => pickText(t, locale),
    event: e => localizeEvent(e, locale),
    candidate: c => getCandidateText(c, locale),
    trait: t => getTraitText(t, locale),
    project: p => getProjectText(p, locale),
    achievement: a => getAchievementText(a, locale),
    studentName: s => nameOf(s, locale),
    studentNameById: id => studentDisplayName(id, locale),
  }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
