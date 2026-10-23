import { useEffect } from 'react';
import { achievementById } from '../data/achievements';
import { useI18n } from '../i18n/I18nProvider';

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

  const { m, achievement } = useI18n();
  const def = achievementById[achievementId];
  if (!def) return null;

  return (
    <div className="achievement-toast" role="status">
      <span className="achievement-toast__label">{m.achievement.unlocked}</span>
      <span className="achievement-toast__title">{achievement(def).title}</span>
    </div>
  );
}
