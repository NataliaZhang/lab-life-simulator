/**
 * Gallery (图鉴) persistence. The gallery is the only progress that outlives a
 * run, so these tests guard against it being lost: old formats must stay
 * readable, data this build can't fully read must survive somewhere, tabs and
 * devices must merge rather than overwrite, and backup codes must round-trip.
 * Achievement backfill rules are covered in achievements.test.ts.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  decodeGalleryCode,
  encodeGalleryCode,
  loadGallery,
  mergeGallery,
  saveGallery,
} from '../gallery';
import type { EndingRecord, GalleryData } from '../gallery';
import { GALLERY_KEY, endingRecord, installMemoryStorage } from './helpers';

let storage: Map<string, string>;
beforeEach(() => {
  storage = installMemoryStorage();
});
afterEach(() => {
  vi.useRealTimers();
});

// Each gallery list reduced to its sorted record keys, so comparisons ignore order.
function recordKeys(data: GalleryData): Record<string, string[]> {
  return Object.fromEntries(Object.entries(data).map(([field, list]) => [
    field,
    (list as Array<string | EndingRecord>).map(r => (typeof r === 'string' ? r : r.eventId)).sort(),
  ]));
}

// Asserts `actual` still has every record in `expected` (it may have more, e.g. backfilled achievements).
function expectAllRecordsKept(actual: GalleryData, expected: GalleryData): void {
  const have = recordKeys(actual);
  for (const [field, keys] of Object.entries(recordKeys(expected))) {
    expect(have[field], field).toEqual(expect.arrayContaining(keys));
  }
}

// Storage keys whose value is exactly `raw`.
const keysHolding = (raw: string) => [...storage].filter(([, value]) => value === raw).map(([key]) => key);

const steadyPlayer: GalleryData = {
  endingsSeen: [endingRecord('ending_time_steady')],
  studentsSeen: ['lin_xiaojuan', 'mo_wenxuan'],
  studentsMaxFavor: ['lin_xiaojuan'],
  projectsStarted: ['auto_rebuttal', 'variable_naming_law'],
  projectsCompleted: ['auto_rebuttal'],
  achievementsUnlocked: ['lab_own', 'max_favor_lin_xiaojuan', 'tenure_granted'],
};

describe('stored gallery', () => {
  it('reads a gallery saved before achievements existed without losing records', () => {
    // The original v1 format: no achievementsUnlocked field at all.
    const { achievementsUnlocked: _, ...beforeAchievements } = steadyPlayer;
    storage.set(GALLERY_KEY, JSON.stringify({ version: 1, ...beforeAchievements }));

    const loaded = loadGallery();
    expect(loaded.endingsSeen).toEqual(steadyPlayer.endingsSeen);
    expectAllRecordsKept(loaded, { ...steadyPlayer, achievementsUnlocked: [] });

    saveGallery(loaded);
    expectAllRecordsKept(loadGallery(), loaded);
  });

  it('keeps data written by a newer build instead of overwriting it', () => {
    // e.g. a cached old build opened after a newer one has already saved.
    const raw = JSON.stringify({
      version: 2,
      studentsSeen: ['lin_xiaojuan'],
      endingsSeen: [endingRecord('ending_time_great')],
      futureField: { anything: [1, 2, 3] },
    });
    storage.set(GALLERY_KEY, raw);

    // Records this build understands are still shown.
    const loaded = loadGallery();
    expect(loaded.studentsSeen).toEqual(['lin_xiaojuan']);
    expect(loaded.endingsSeen.map(e => e.eventId)).toEqual(['ending_time_great']);

    // More page loads on later days, then this build records something new.
    vi.useFakeTimers({ toFake: ['Date'] });
    for (const day of [2, 3, 4]) {
      vi.setSystemTime(new Date(2026, 9, day));
      loadGallery();
    }
    saveGallery({ ...loaded, studentsSeen: [...loaded.studentsSeen, 'gu_mianmian'] });

    // The original is still recoverable, kept once (not re-copied on every load).
    expect(keysHolding(raw)).toHaveLength(1);
    expect(loadGallery().studentsSeen).toEqual(['lin_xiaojuan', 'gu_mianmian']);
  });

  const unreadable: Array<[string, string, Partial<GalleryData>]> = [
    ['truncated JSON', '{"version":1,"studentsSeen":["lin_xiaojuan"', {}],
    [
      'a malformed field next to valid ones',
      JSON.stringify({
        version: 1,
        endingsSeen: 'oops',
        studentsSeen: ['lin_xiaojuan', 3, null, 'lin_xiaojuan'],
        projectsCompleted: ['auto_rebuttal'],
      }),
      { studentsSeen: ['lin_xiaojuan'], projectsCompleted: ['auto_rebuttal'] },
    ],
  ];
  it.each(unreadable)('keeps whatever is readable from %s, plus a copy of the original', (_, raw, readable) => {
    storage.set(GALLERY_KEY, raw);

    const loaded = loadGallery();
    expect(loaded).toMatchObject(readable);

    saveGallery({ ...loaded, studentsSeen: [...loaded.studentsSeen, 'gu_mianmian'] });
    expect(keysHolding(raw)).toHaveLength(1);
    expect(loadGallery()).toMatchObject({ ...readable, studentsSeen: [...(readable.studentsSeen ?? []), 'gu_mianmian'] });
  });

  it('does not let a stale tab erase what another tab recorded', () => {
    storage.set(GALLERY_KEY, JSON.stringify({ version: 1, ...steadyPlayer }));
    const tabA = loadGallery();
    const tabB = loadGallery(); // opened at the same time, never refreshed

    saveGallery({ ...tabA, endingsSeen: [...tabA.endingsSeen, endingRecord('ending_be_rep_low')] });
    const tabBView = saveGallery({ ...tabB, studentsSeen: [...tabB.studentsSeen, 'ye_zhiqiu'] });

    const stored = loadGallery();
    expectAllRecordsKept(stored, steadyPlayer);
    expect(stored.endingsSeen.map(e => e.eventId)).toContain('ending_be_rep_low');
    expect(stored.studentsSeen).toContain('ye_zhiqiu');
    // The saving tab adopts the merged result, so its next save starts from it.
    expect(tabBView).toEqual(stored);
  });
});

describe('merging galleries', () => {
  // The same player's gallery after playing on two devices independently.
  const phone: GalleryData = {
    ...steadyPlayer,
    endingsSeen: [...steadyPlayer.endingsSeen, endingRecord('ending_be_rep_low')],
    studentsSeen: [...steadyPlayer.studentsSeen, 'gu_mianmian'],
  };
  const laptop: GalleryData = {
    ...steadyPlayer,
    studentsSeen: [...steadyPlayer.studentsSeen, 'ye_zhiqiu'],
    studentsMaxFavor: [...steadyPlayer.studentsMaxFavor, 'mo_wenxuan'],
    projectsCompleted: [...steadyPlayer.projectsCompleted, 'variable_naming_law'],
    achievementsUnlocked: [...steadyPlayer.achievementsUnlocked, 'first_gift'],
  };

  it('keeps every record from both sides, once, in either order', () => {
    const merged = mergeGallery(phone, laptop);
    expectAllRecordsKept(merged, phone);
    expectAllRecordsKept(merged, laptop);
    for (const [field, keys] of Object.entries(recordKeys(merged))) {
      expect(new Set(keys).size, `${field} has duplicates`).toBe(keys.length);
    }
    expect(recordKeys(mergeGallery(laptop, phone))).toEqual(recordKeys(merged));
  });

  it('adds nothing when the same backup code is imported twice', () => {
    const code = encodeGalleryCode(phone);
    const once = mergeGallery(laptop, decodeGalleryCode(code)!);
    expect(mergeGallery(once, decodeGalleryCode(code)!)).toEqual(once);
    // Pasting the gallery's own code back in is also a no-op.
    expect(mergeGallery(once, decodeGalleryCode(encodeGalleryCode(once))!)).toEqual(once);
  });
});

describe('backup codes', () => {
  it('carry the whole gallery, including Chinese text, to another device', () => {
    const decoded = decodeGalleryCode(encodeGalleryCode(steadyPlayer));
    expect(decoded).not.toBeNull();
    expect(decoded!.endingsSeen).toEqual(steadyPlayer.endingsSeen);
    expectAllRecordsKept(decoded!, steadyPlayer);

    // Importing on a device that already has its own records.
    storage.set(GALLERY_KEY, JSON.stringify({ version: 1, ...steadyPlayer, studentsSeen: ['bai_xiaoman'] }));
    const imported = saveGallery(mergeGallery(loadGallery(), decoded!));
    expectAllRecordsKept(imported, steadyPlayer);
    expect(imported.studentsSeen).toContain('bai_xiaoman');
  });

  it('still accepts a code exported by v0.1.0, even when pasted with line breaks', () => {
    // Players keep these in notes and chats, so future builds must keep reading them.
    const exportedByV010 = `
      LABSIM1:eyJ2ZXJzaW9uIjoxLCJlbmRpbmdzU2VlbiI6W3siZXZlbnRJZCI6ImVuZGluZ190
      aW1lX3N0ZWFkeSIsInRpdGxlIjoi57uI6Lqr5pWZ6IGM6K+E5a6h77ya5bCY5Z+D6JC95a6a
      IiwidGFnbGluZSI6IuS4gOi3r+S4iuaAu+inieW+l+i/mOW3ruS4gOeCue+8jOi1sOWIsOi/
      memHjOaJjeWPkeeOsOW3sue7j+aMuui/nOOAgiJ9LHsiZXZlbnRJZCI6ImVuZGluZ19iZV9y
      ZXBfbG93IiwidGl0bGUiOiLnu4jouqvmlZnogYzor4TlrqHvvJrpu5jpu5jml6DlkI0iLCJ0
      YWdsaW5lIjoi5ZCN5Y2V5LiK5pyJ5L2g55qE5ZCN5a2X77yM5L2G5rKh5Lq65p2l5aGr6YKj
      5oqK5qSF5a2Q44CCIn1dLCJzdHVkZW50c1NlZW4iOlsibGluX3hpYW9qdWFuIiwibW9fd2Vu
      eHVhbiIsImd1X21pYW5taWFuIl0sInN0dWRlbnRzTWF4RmF2b3IiOlsibGluX3hpYW9qdWFu
      Il0sInByb2plY3RzU3RhcnRlZCI6WyJhdXRvX3JlYnV0dGFsIiwidmFyaWFibGVfbmFtaW5n
      X2xhdyJdLCJwcm9qZWN0c0NvbXBsZXRlZCI6WyJhdXRvX3JlYnV0dGFsIl0sImFjaGlldmVt
      ZW50c1VubG9ja2VkIjpbImxhYl9vd24iLCJtYXhfZmF2b3JfbGluX3hpYW9qdWFuIiwidGVu
      dXJlX2dyYW50ZWQiLCJiYWRfZW5kaW5nIl19
    `;
    // Hard-coded rather than derived from the event data: the code is frozen.
    const decoded = decodeGalleryCode(exportedByV010);
    expect(decoded).not.toBeNull();
    expect(decoded!.endingsSeen).toEqual([
      {
        eventId: 'ending_time_steady',
        title: '终身教职评审：尘埃落定',
        tagline: '一路上总觉得还差一点，走到这里才发现已经挺远。',
      },
      {
        eventId: 'ending_be_rep_low',
        title: '终身教职评审：默默无名',
        tagline: '名单上有你的名字，但没人来填那把椅子。',
      },
    ]);
    expectAllRecordsKept(decoded!, {
      endingsSeen: [],
      studentsSeen: ['lin_xiaojuan', 'mo_wenxuan', 'gu_mianmian'],
      studentsMaxFavor: ['lin_xiaojuan'],
      projectsStarted: ['auto_rebuttal', 'variable_naming_law'],
      projectsCompleted: ['auto_rebuttal'],
      achievementsUnlocked: ['lab_own', 'max_favor_lin_xiaojuan', 'tenure_granted', 'bad_ending'],
    });
  });

  it('rejects text that is not a complete code', () => {
    const code = encodeGalleryCode(steadyPlayer);
    for (const text of [
      '',
      'hello',
      code.slice(0, Math.floor(code.length / 2)), // copy-paste cut off partway
      'LABSIM1:',
      'LABSIM1:!!!!',
      JSON.stringify({ version: 1, ...steadyPlayer }), // raw gallery JSON, not a code
    ]) {
      expect(decodeGalleryCode(text), JSON.stringify(text.slice(0, 40))).toBeNull();
    }
  });
});
