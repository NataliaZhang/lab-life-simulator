import type { Student } from '../types';
import type { Locale } from '../types/i18n';
import type { PronounForm } from './content';
import { nameOf, studentPronoun } from './content';
import { getMessages } from './messages';

/** Students bound to the event being rendered (see the placeholder rule in CLAUDE.md). */
export interface PlaceholderContext {
  students: Student[];
  studentId?: string | null;
  student2Id?: string | null;
  projectMonths?: number | null;
}

const PRONOUN_FORMS: PronounForm[] = ['he', 'him', 'his', 'himself'];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function replaceStudent(text: string, student: Student, suffix: '' | '2', nameKey: string, locale: Locale): string {
  let result = text.replace(new RegExp(`\\{${nameKey}\\}`, 'g'), nameOf(student, locale));
  for (const form of PRONOUN_FORMS) {
    const p = studentPronoun(student.id, form, locale);
    result = result
      .replace(new RegExp(`\\{${form}${suffix}\\}`, 'g'), p)
      .replace(new RegExp(`\\{${capitalize(form)}${suffix}\\}`, 'g'), capitalize(p));
  }
  return result;
}

/**
 * Fills {studentName}/{student2Name}, the English pronoun placeholders
 * ({he} {him} {his} {himself}, capitalized forms, and the …2 variants for the
 * second student) and {projectMonths}. Unbound placeholders are left as-is.
 */
export function resolvePlaceholders(text: string, ctx: PlaceholderContext, locale: Locale): string {
  let result = text;
  const s1 = ctx.studentId ? ctx.students.find(s => s.id === ctx.studentId) : undefined;
  const s2 = ctx.student2Id ? ctx.students.find(s => s.id === ctx.student2Id) : undefined;
  if (s1) result = replaceStudent(result, s1, '', 'studentName', locale);
  if (s2) result = replaceStudent(result, s2, '2', 'student2Name', locale);
  const months = ctx.projectMonths != null ? String(ctx.projectMonths) : getMessages(locale).engine.unknownMonths;
  return result.replace(/\{projectMonths\}/g, months);
}
