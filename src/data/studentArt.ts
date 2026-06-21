/**
 * Art configuration for all student characters.
 *
 * Portrait files live at:  assets/img/students/portrait/<id>_portrait.<ext>
 * Expression files live at: assets/img/students/expressions/<id>/<expression>.png
 *
 * Both are served as static assets via publicDir: 'assets' → /img/students/...
 *
 * Adding a new student: add one entry to studentArt below.
 * Missing images fail silently — the UI shows a letter placeholder.
 */

import type { StudentArt, StudentExpression } from '../types/studentArt';

// Vite serves publicDir files under the deployment base (import.meta.env.BASE_URL).
// Prepend it so paths resolve correctly both in dev (/lab-life-simulator/) and prod.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // strip trailing slash

// ── Per-student art registry ───────────────────────────────────────────────────
// Store paths relative to the public root (no leading slash, no base prefix).
// portraitUrl/expressionUrl add the base at call time.

export const studentArt: Record<string, StudentArt> = {
  lin_xiaojuan: {
    portrait:      'img/students/portrait/lin_xiaojuan_portrait.jpg',
    expressionDir: 'img/students/expressions/lin_xiaojuan',
  },
  gu_mianmian: {
    portrait:      'img/students/portrait/gu_mianmian_portrait.jpg',
    expressionDir: 'img/students/expressions/gu_mianmian',
  },
  ye_zhiqiu: {
    portrait:      'img/students/portrait/ye_zhiqiu_portrait.jpg',
    expressionDir: 'img/students/expressions/ye_zhiqiu',
  },
  bai_xiaoman: {
    portrait:      'img/students/portrait/bai_xiaoman_portrait.PNG',
    expressionDir: 'img/students/expressions/bai_xiaoman',
  },
  bi_xiaotian: {
    portrait:      'img/students/portrait/bi_xiaotian_portrait.jpg',
    expressionDir: 'img/students/expressions/bi_xiaotian',
  },
  qian_duoduo: {
    portrait:      'img/students/portrait/qian_duoduo_portrait.jpg',
    expressionDir: 'img/students/expressions/qian_duoduo',
  },
  he_shixu: {
    portrait:      'img/students/portrait/he_shixu_portrait.jpg',
    expressionDir: 'img/students/expressions/he_shixu',
  },
  tang_kuolie: {
    portrait:      'img/students/portrait/tang_kuolie_portrait.jpg',
    expressionDir: 'img/students/expressions/tang_kuolie',
  },
  mo_wenxuan: {
    portrait:      'img/students/portrait/mo_wenxuan_portrait.jpg',
    expressionDir: 'img/students/expressions/mo_wenxuan',
  },
  xie_zhiwei: {
    portrait:      'img/students/portrait/xie_zhiwei_portrait.PNG',
    expressionDir: 'img/students/expressions/xie_zhiwei',
  },
};


// ── URL helpers ────────────────────────────────────────────────────────────────

export function portraitUrl(studentId: string): string {
  const path = studentArt[studentId]?.portrait;
  return path ? `${BASE}/${path}` : '';
}

export function expressionUrl(studentId: string, expression: StudentExpression): string {
  const dir = studentArt[studentId]?.expressionDir;
  return dir ? `${BASE}/${dir}/${expression}.jpg` : '';
}


// ── Expression selection from stats ───────────────────────────────────────────

/**
 * Derive the appropriate expression from a student's current favor and happiness.
 * Used by student cards to show mood at a glance.
 */
export function pickExpression(happiness: number): StudentExpression {
  if (happiness < 25)      return 'sad';
  if (happiness > 75)      return 'happy';
  return 'neutral';
}
