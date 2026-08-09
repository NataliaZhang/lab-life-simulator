import { useEffect } from 'react';
import { achievementById } from '../data/achievements';

interface Props {
  achievementId: string;
  onDone: () => void;
}

// Top-center banner announcing a newly unlocked achievement.
// Stays for 2.5 seconds, then calls onDone so the caller can advance its queue.
export function AchievementToast({ achievementId, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [achievementId, onDone]);

  const def = achievementById[achievementId];
  if (!def) return null;

  return (
    <div className="achievement-toast" role="status">
      <span className="achievement-toast__label">解锁成就：</span>
      <span className="achievement-toast__title">{def.title}</span>
    </div>
  );
}
