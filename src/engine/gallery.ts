/**
 * Gallery (图鉴) — cross-run persistent data stored in its own localStorage key.
 * Tracks endings reached and students admitted across all playthroughs.
 * Intentionally independent from the per-run game save.
 *
 * Every field is an add-only list, so two copies of the gallery can always be
 * combined by set union without losing anything. This module relies on that
 * wherever data could otherwise be overwritten:
 *   - saveGallery() merges with what is already stored, so a stale tab can't
 *     erase what another tab recorded (useGallery also syncs via 'storage' events).
 *   - Stored data this build can't fully read (corrupt JSON, a newer version) is
 *     copied to a backup key before anything is written over it.
 *   - Backup codes (encodeGalleryCode / decodeGalleryCode) let players carry the
 *     gallery to another browser or device. Importing merges, never replaces.
 *     The UI lives in the 备份 tab of GalleryPanel.
 */

import { allCandidates } from '../data/studentPool';
import { events } from '../data/events';
import type { GamePhase } from '../types';
import { checkEndingAchievements } from './achievements';

export const GALLERY_KEY = 'lab-life-simulator-gallery';
const GALLERY_VERSION = 1;
// Unreadable stored data is parked under `${BACKUP_KEY_PREFIX}<timestamp>`.
const BACKUP_KEY_PREFIX = `${GALLERY_KEY}-backup-`;
// Marks text as a gallery backup code. The digit versions the code encoding
// (base64 of UTF-8 JSON); the gallery format itself is versioned inside the JSON.
const CODE_PREFIX = 'LABSIM1:';

export interface EndingRecord {
  eventId: string;
  title: string;
  tagline: string;
}

export interface GalleryData {
  endingsSeen: EndingRecord[];
  studentsSeen: string[];      // candidate IDs in order of first admission
  studentsMaxFavor: string[];  // IDs of students whose max_favor event has fired
  projectsStarted: string[];   // project IDs ever started (across all runs)
  projectsCompleted: string[]; // project IDs ever completed (across all runs)
  achievementsUnlocked: string[]; // achievement IDs ever unlocked (across all runs)
}

/** Outcome of importing a backup code. */
export type GalleryImportResult = 'merged' | 'unchanged' | 'invalid';

function emptyGallery(): GalleryData {
  return {
    endingsSeen: [],
    studentsSeen: [],
    studentsMaxFavor: [],
    projectsStarted: [],
    projectsCompleted: [],
    achievementsUnlocked: [],
  };
}

// ─── Achievement backfill ──────────────────────────────────────────────────

// Players who reached a student's max favor before the achievement system existed
// already have it recorded in studentsMaxFavor but never got the matching
// achievementsUnlocked entry. Derive those (and max_favor_all, if all 10 are covered)
// whenever gallery data is loaded or merged. This is not a live trigger: App seeds
// its banner diff from the loaded gallery, so data backfilled on load shows no toast.
function backfillMaxFavorAchievements(data: GalleryData): GalleryData {
  const unlocked = new Set(data.achievementsUnlocked);
  for (const studentId of data.studentsMaxFavor) {
    unlocked.add(`max_favor_${studentId}`);
  }
  if (allCandidates.every(c => unlocked.has(`max_favor_${c.id}`))) {
    unlocked.add('max_favor_all');
  }
  if (unlocked.size === data.achievementsUnlocked.length) return data;
  return { ...data, achievementsUnlocked: [...unlocked] };
}

// The phase an ending event resolves to. Every option of an ending event shares
// the same phaseChange, so the first one found speaks for the whole event.
function endingPhaseOf(eventId: string): GamePhase | undefined {
  for (const option of events[eventId]?.options ?? []) {
    const outcome = option.outcomes.find(o => o.phaseChange);
    if (outcome) return outcome.phaseChange;
  }
  return undefined;
}

// Same idea for endings reached before the ending achievements existed: they are
// in endingsSeen, but tenure_granted / bad_ending / ending_time_wealthy were never
// unlocked. Derive them with the live rules: checkEndingAchievements(), plus the
// ending_time_wealthy rule in checkAchievementUnlocks(), which fires on reaching it.
function backfillEndingAchievements(data: GalleryData): GalleryData {
  const unlocked = new Set(data.achievementsUnlocked);
  for (const { eventId } of data.endingsSeen) {
    const phase = endingPhaseOf(eventId);
    if (phase) checkEndingAchievements(phase, eventId).forEach(id => unlocked.add(id));
    if (eventId === 'ending_time_wealthy') unlocked.add('ending_time_wealthy');
  }
  if (unlocked.size === data.achievementsUnlocked.length) return data;
  return { ...data, achievementsUnlocked: [...unlocked] };
}

function backfillAchievements(data: GalleryData): GalleryData {
  return backfillEndingAchievements(backfillMaxFavorAchievements(data));
}

// ─── Merging ───────────────────────────────────────────────────────────────

// Order-preserving union: everything in `a`, then whatever `b` adds.
function unionBy<T>(a: T[], b: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return [...a, ...b].filter(item => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const unionIds = (a: string[], b: string[]) => unionBy(a, b, id => id);

/** Combines two galleries by set union; the result has every record either side had. */
export function mergeGallery(a: GalleryData, b: GalleryData): GalleryData {
  return backfillAchievements({
    endingsSeen: unionBy(a.endingsSeen, b.endingsSeen, e => e.eventId),
    studentsSeen: unionIds(a.studentsSeen, b.studentsSeen),
    studentsMaxFavor: unionIds(a.studentsMaxFavor, b.studentsMaxFavor),
    projectsStarted: unionIds(a.projectsStarted, b.projectsStarted),
    projectsCompleted: unionIds(a.projectsCompleted, b.projectsCompleted),
    achievementsUnlocked: unionIds(a.achievementsUnlocked, b.achievementsUnlocked),
  });
}

/** Total number of records. Merging only ever grows it, so a rise means something new arrived. */
export function galleryRecordCount(data: GalleryData): number {
  return data.endingsSeen.length
    + data.studentsSeen.length
    + data.studentsMaxFavor.length
    + data.projectsStarted.length
    + data.projectsCompleted.length
    + data.achievementsUnlocked.length;
}

// ─── Parsing ───────────────────────────────────────────────────────────────

const isString = (item: unknown): item is string => typeof item === 'string';

function isEndingRecord(item: unknown): item is EndingRecord {
  if (typeof item !== 'object' || item === null) return false;
  const r = item as Record<string, unknown>;
  return isString(r.eventId) && isString(r.title) && isString(r.tagline);
}

// Reads gallery JSON (from storage or a backup code) one field at a time. Every
// field is an add-only list, so whatever is recognisable is kept and the rest
// defaults to empty. `lossy` flags input this build could not read in full, so
// the caller can keep a copy of the original. Returns null for non-objects.
function parseGallery(raw: string): { data: GalleryData; lossy: boolean } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
  const obj = parsed as Record<string, unknown>;

  // Older versions load as-is: fields added since then default to empty below.
  // If a future version reshapes a field, convert the old shape here rather than
  // discarding it. A version newer than this build (e.g. a cached old build
  // reading what a newer one wrote) is read best-effort and flagged lossy.
  const version = typeof obj.version === 'number' ? obj.version : GALLERY_VERSION;
  let lossy = version > GALLERY_VERSION;

  const list = <T>(value: unknown, keep: (item: unknown) => item is T): T[] => {
    if (value === undefined) return [];
    if (!Array.isArray(value)) {
      lossy = true;
      return [];
    }
    const items = value.filter(keep);
    if (items.length !== value.length) lossy = true;
    return items;
  };

  // Merging into an empty gallery dedupes each list and runs the backfill.
  const data = mergeGallery(emptyGallery(), {
    endingsSeen: list(obj.endingsSeen, isEndingRecord),
    studentsSeen: list(obj.studentsSeen, isString),
    studentsMaxFavor: list(obj.studentsMaxFavor, isString),
    projectsStarted: list(obj.projectsStarted, isString),
    projectsCompleted: list(obj.projectsCompleted, isString),
    achievementsUnlocked: list(obj.achievementsUnlocked, isString),
  });
  return { data, lossy };
}

// ─── Storage ───────────────────────────────────────────────────────────────

// Parks a copy of stored data this build couldn't fully read under its own key
// before anything overwrites it, so it can still be recovered later. Skips the
// write when an identical copy is already parked.
function backUpRaw(raw: string): void {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(BACKUP_KEY_PREFIX) && localStorage.getItem(key) === raw) return;
    }
    localStorage.setItem(`${BACKUP_KEY_PREFIX}${Date.now()}`, raw);
  } catch {
    console.warn('Failed to back up unreadable gallery data.');
  }
}

export function loadGallery(): GalleryData {
  try {
    const raw = localStorage.getItem(GALLERY_KEY);
    if (!raw) return emptyGallery();
    const result = parseGallery(raw);
    if (!result || result.lossy) backUpRaw(raw);
    return result?.data ?? emptyGallery();
  } catch {
    return emptyGallery();
  }
}

// Merges `data` with whatever is already stored before writing, so a stale tab
// or an outdated copy of the state can never shrink the saved gallery. Returns
// the merged result, which callers should adopt as their new state.
export function saveGallery(data: GalleryData): GalleryData {
  const merged = mergeGallery(data, loadGallery());
  try {
    localStorage.setItem(
      GALLERY_KEY,
      JSON.stringify({ version: GALLERY_VERSION, ...merged }),
    );
  } catch {
    console.warn('Failed to save gallery data.');
  }
  return merged;
}

// ─── Backup codes ──────────────────────────────────────────────────────────

/** Encodes the gallery as a single line of plain text players can paste anywhere. */
export function encodeGalleryCode(data: GalleryData): string {
  const bytes = new TextEncoder().encode(JSON.stringify({ version: GALLERY_VERSION, ...data }));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return CODE_PREFIX + btoa(binary);
}

/** Decodes a backup code. Returns null when the text isn't a complete, valid code. */
export function decodeGalleryCode(code: string): GalleryData | null {
  // Notes and chat apps may wrap or indent long lines, so ignore all whitespace.
  const compact = code.replace(/\s+/g, '');
  if (!compact.startsWith(CODE_PREFIX)) return null;
  try {
    const binary = atob(compact.slice(CODE_PREFIX.length));
    const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
    const json = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return parseGallery(json)?.data ?? null;
  } catch {
    return null;
  }
}
