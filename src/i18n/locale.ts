import type { Locale, LocalizedText } from '../types/i18n';
import { LOCALES } from '../types/i18n';

// ─── Persisted language preference ─────────────────────────────────────────
// Stored separately from the run save and the gallery so switching language
// never touches game progress.

const LOCALE_KEY = 'lab-locale';

export function loadLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch {
    // localStorage unavailable — fall through to browser detection
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'zh';
  return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    console.warn('Failed to save language preference.');
  }
}

// ─── Bilingual text helpers ────────────────────────────────────────────────

/** Renders a string once per supported language. Used by the engine for log entries. */
export function bothLocales(render: (locale: Locale) => string): LocalizedText {
  const out = {} as LocalizedText;
  for (const l of LOCALES) out[l] = render(l);
  return out;
}

/** The same text in every language (IDs, numbers, legacy strings). */
export function sameText(text: string): LocalizedText {
  return bothLocales(() => text);
}

/** Joins two localized strings language by language. */
export function joinText(a: LocalizedText, b: LocalizedText, separator = ''): LocalizedText {
  return bothLocales(l => (a[l] ? a[l] + separator + b[l] : b[l]));
}

/**
 * Picks one language from a stored text. Plain strings come from saves made
 * before localization existed and are shown as-is.
 */
export function pickText(text: LocalizedText | string | undefined, locale: Locale): string {
  if (text === undefined) return '';
  if (typeof text === 'string') return text;
  return text[locale] ?? text.zh;
}
