import { useState, useRef } from 'react';
import { traitDefs } from '../data/traits';

interface Props {
  traitId: string;
}

export function TraitTag({ traitId }: Props) {
  const [open, setOpen] = useState(false);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const tagRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trait = traitDefs[traitId];

  const clearHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = null;
  };

  const scheduleHide = () => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const showCard = () => {
    clearHideTimer();
    if (!tagRef.current) return;
    const rect = tagRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const CARD_W = 250;
    const CARD_H = 160;

    const left = Math.max(8, Math.min(rect.left, vw - CARD_W - 8));
    const below = rect.bottom + 6;
    const top = below + CARD_H > vh ? rect.top - CARD_H - 6 : below;

    setCardStyle({ left, top });
    setOpen(true);
  };

  if (!trait) return <span className="trait-tag">{traitId}</span>;

  return (
    <>
      <span
        ref={tagRef}
        className="trait-tag trait-tag--interactive"
        role="button"
        tabIndex={0}
        aria-label={`天赋：${trait.name}`}
        onClick={(e) => { e.stopPropagation(); open ? setOpen(false) : showCard(); }}
        onMouseEnter={showCard}
        onMouseLeave={scheduleHide}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open ? setOpen(false) : showCard(); } }}
      >
        {trait.name}
      </span>
      {open && (
        <div
          className="trait-card"
          style={cardStyle}
          onMouseEnter={clearHideTimer}
          onMouseLeave={scheduleHide}
        >
          <div className="trait-card__name">{trait.name}</div>
          <p className="trait-card__desc">{trait.description}</p>
          <div className="trait-card__effect-label">天赋效果</div>
          <p className="trait-card__effect">{trait.effect}</p>
        </div>
      )}
    </>
  );
}
