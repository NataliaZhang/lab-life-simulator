import type { Locale } from '../../types/i18n';
import type { Messages } from './zh';
import { zh } from './zh';
import { en } from './en';

export type { Messages } from './zh';

const CATALOGS: Record<Locale, Messages> = { zh, en };

export function getMessages(locale: Locale): Messages {
  return CATALOGS[locale];
}
