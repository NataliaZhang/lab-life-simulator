import { useState, useCallback, useEffect, useRef } from 'react';
import {
  GALLERY_KEY,
  loadGallery,
  saveGallery,
  mergeGallery,
  galleryRecordCount,
  decodeGalleryCode,
} from '../engine/gallery';
import type { GalleryData, EndingRecord, GalleryImportResult } from '../engine/gallery';

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryData>(loadGallery);

  // Achievement IDs that reached this tab from another tab or an imported backup
  // code rather than being unlocked here. App skips the unlock banner for these,
  // so syncing old records doesn't replay a burst of toasts.
  const syncedAchievementsRef = useRef(new Set<string>());
  const isSyncedAchievement = useCallback(
    (id: string) => syncedAchievementsRef.current.has(id),
    [],
  );

  // Adopt records written by another open tab of the game. saveGallery already
  // merges with storage before writing, so this only keeps the visible state current.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== GALLERY_KEY || e.newValue === null) return;
      const incoming = loadGallery();
      incoming.achievementsUnlocked.forEach(id => syncedAchievementsRef.current.add(id));
      setGallery(prev => {
        const merged = mergeGallery(prev, incoming);
        return galleryRecordCount(merged) === galleryRecordCount(prev) ? prev : merged;
      });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Record an ending the first time it is reached (deduplicates by eventId).
  const recordEnding = useCallback((record: EndingRecord) => {
    setGallery(prev => {
      if (prev.endingsSeen.some(e => e.eventId === record.eventId)) return prev;
      return saveGallery({ ...prev, endingsSeen: [...prev.endingsSeen, record] });
    });
  }, []);

  // Record a student the first time they are admitted to the lab.
  const recordStudent = useCallback((studentId: string) => {
    setGallery(prev => {
      if (prev.studentsSeen.includes(studentId)) return prev;
      return saveGallery({ ...prev, studentsSeen: [...prev.studentsSeen, studentId] });
    });
  }, []);

  // Mark a student's max_favor event as seen, unlocking their colored portrait.
  const recordMaxFavor = useCallback((studentId: string) => {
    setGallery(prev => {
      if (prev.studentsMaxFavor.includes(studentId)) return prev;
      return saveGallery({ ...prev, studentsMaxFavor: [...prev.studentsMaxFavor, studentId] });
    });
  }, []);

  // Record a project the first time it is started (across any run).
  const recordProjectStarted = useCallback((projectId: string) => {
    setGallery(prev => {
      if (prev.projectsStarted.includes(projectId)) return prev;
      return saveGallery({ ...prev, projectsStarted: [...prev.projectsStarted, projectId] });
    });
  }, []);

  // Record a project the first time it is completed (across any run).
  const recordProjectCompleted = useCallback((projectId: string) => {
    setGallery(prev => {
      // Also ensure it's in projectsStarted (defensive, shouldn't happen otherwise).
      const started = prev.projectsStarted.includes(projectId)
        ? prev.projectsStarted
        : [...prev.projectsStarted, projectId];
      if (prev.projectsCompleted.includes(projectId)) {
        // Already completed — still persist started list if it changed.
        if (started === prev.projectsStarted) return prev;
        return saveGallery({ ...prev, projectsStarted: started });
      }
      return saveGallery({
        ...prev,
        projectsStarted: started,
        projectsCompleted: [...prev.projectsCompleted, projectId],
      });
    });
  }, []);

  // Record an achievement the first time it unlocks (deduplicates by achievementId).
  const recordAchievement = useCallback((achievementId: string) => {
    setGallery(prev => {
      if (prev.achievementsUnlocked.includes(achievementId)) return prev;
      return saveGallery({ ...prev, achievementsUnlocked: [...prev.achievementsUnlocked, achievementId] });
    });
  }, []);

  // Merge a backup code into the gallery. Only ever adds records, never removes any.
  const importCode = useCallback((code: string): GalleryImportResult => {
    const incoming = decodeGalleryCode(code);
    if (!incoming) return 'invalid';
    const merged = saveGallery(mergeGallery(gallery, incoming));
    if (galleryRecordCount(merged) === galleryRecordCount(gallery)) return 'unchanged';
    merged.achievementsUnlocked.forEach(id => syncedAchievementsRef.current.add(id));
    setGallery(prev => mergeGallery(prev, merged));
    return 'merged';
  }, [gallery]);

  return {
    gallery,
    recordEnding,
    recordStudent,
    recordMaxFavor,
    recordProjectStarted,
    recordProjectCompleted,
    recordAchievement,
    importCode,
    isSyncedAchievement,
  };
}
