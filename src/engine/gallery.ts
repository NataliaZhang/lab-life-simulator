/**
 * Gallery (图鉴) — cross-run persistent data stored in its own localStorage key.
 * Tracks endings reached and students admitted across all playthroughs.
 * Intentionally independent from the per-run game save.
 */

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
}

function emptyGallery(): GalleryData {
  return {
    endingsSeen: [],
    studentsSeen: [],
    studentsMaxFavor: [],
    projectsStarted: [],
    projectsCompleted: [],
  };
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
    };
    if (parsed.version !== GALLERY_VERSION) return emptyGallery();
    return {
      endingsSeen: parsed.endingsSeen ?? [],
      studentsSeen: parsed.studentsSeen ?? [],
      studentsMaxFavor: parsed.studentsMaxFavor ?? [],
      projectsStarted: parsed.projectsStarted ?? [],
      projectsCompleted: parsed.projectsCompleted ?? [],
    };
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
