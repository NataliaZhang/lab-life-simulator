/**
 * Gallery (图鉴) — cross-run persistent data stored in its own localStorage key.
 * Tracks endings reached and students admitted across all playthroughs.
 * Intentionally independent from the per-run game save.
 */

import { allCandidates } from '../data/studentPool';

const GALLERY_KEY = 'lab-life-simulator-gallery';
const GALLERY_VERSION = 1;

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

// Players who reached a student's max favor before the achievement system existed
// already have it recorded in studentsMaxFavor but never got the matching
// achievementsUnlocked entry. Derive those (and max_favor_all, if all 10 are covered)
// on every load so the Gallery shows them as unlocked retroactively. This runs on
// load rather than as a live trigger, so it never queues a toast banner.
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

export function loadGallery(): GalleryData {
  try {
    const raw = localStorage.getItem(GALLERY_KEY);
    if (!raw) return emptyGallery();
    const parsed = JSON.parse(raw) as {
      version?: number;
      endingsSeen?: EndingRecord[];
      studentsSeen?: string[];
      studentsMaxFavor?: string[];
      projectsStarted?: string[];
      projectsCompleted?: string[];
      achievementsUnlocked?: string[];
    };
    if (parsed.version !== GALLERY_VERSION) return emptyGallery();
    return backfillMaxFavorAchievements({
      endingsSeen: parsed.endingsSeen ?? [],
      studentsSeen: parsed.studentsSeen ?? [],
      studentsMaxFavor: parsed.studentsMaxFavor ?? [],
      projectsStarted: parsed.projectsStarted ?? [],
      projectsCompleted: parsed.projectsCompleted ?? [],
      achievementsUnlocked: parsed.achievementsUnlocked ?? [],
    });
  } catch {
    return emptyGallery();
  }
}

export function saveGallery(data: GalleryData): void {
  try {
    localStorage.setItem(
      GALLERY_KEY,
      JSON.stringify({ version: GALLERY_VERSION, ...data }),
    );
  } catch {
    console.warn('Failed to save gallery data.');
  }
}
