import { useState, useCallback } from 'react';
import { loadGallery, saveGallery } from '../engine/gallery';
import type { GalleryData, EndingRecord } from '../engine/gallery';

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryData>(loadGallery);

  // Record an ending the first time it is reached (deduplicates by eventId).
  const recordEnding = useCallback((record: EndingRecord) => {
    setGallery(prev => {
      if (prev.endingsSeen.some(e => e.eventId === record.eventId)) return prev;
      const next = { ...prev, endingsSeen: [...prev.endingsSeen, record] };
      saveGallery(next);
      return next;
    });
  }, []);

  // Record a student the first time they are admitted to the lab.
  const recordStudent = useCallback((studentId: string) => {
    setGallery(prev => {
      if (prev.studentsSeen.includes(studentId)) return prev;
      const next = { ...prev, studentsSeen: [...prev.studentsSeen, studentId] };
      saveGallery(next);
      return next;
    });
  }, []);

  // Mark a student's max_favor event as seen, unlocking their colored portrait.
  const recordMaxFavor = useCallback((studentId: string) => {
    setGallery(prev => {
      if (prev.studentsMaxFavor.includes(studentId)) return prev;
      const next = { ...prev, studentsMaxFavor: [...prev.studentsMaxFavor, studentId] };
      saveGallery(next);
      return next;
    });
  }, []);

  // Record a project the first time it is started (across any run).
  const recordProjectStarted = useCallback((projectId: string) => {
    setGallery(prev => {
      if (prev.projectsStarted.includes(projectId)) return prev;
      const next = { ...prev, projectsStarted: [...prev.projectsStarted, projectId] };
      saveGallery(next);
      return next;
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
        const next = { ...prev, projectsStarted: started };
        saveGallery(next);
        return next;
      }
      const next = {
        ...prev,
        projectsStarted: started,
        projectsCompleted: [...prev.projectsCompleted, projectId],
      };
      saveGallery(next);
      return next;
    });
  }, []);

  return { gallery, recordEnding, recordStudent, recordMaxFavor, recordProjectStarted, recordProjectCompleted };
}
