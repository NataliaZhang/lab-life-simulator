import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { TutorialStep } from '../engine/projectTutorial';
import { tutorialTargetId } from '../engine/projectTutorial';
import { projectById } from '../data/projects';
import { useI18n } from '../i18n/I18nProvider';

// ─── First-project tutorial overlay ────────────────────────────────────────
// Dims the screen and leaves only the current step's target usable (the element
// whose data-tutorial-target matches the step). Clicks anywhere else land on
// transparent blockers around the target; keyboard focus is kept inside the
// target and keys pressed with focus elsewhere are swallowed. The instruction
// card stays in the top-right corner unless it would cover the target.
// If the target can't be found the overlay only dims and blocks nothing, so a
// layout bug can never lock up the game.

const STEP_NUMBER: Record<TutorialStep['kind'], number> = { openProjects: 1, launch: 2, chooseLead: 3 };
const STEP_COUNT = 3;
const GAP = 12;          // px between the card and the viewport edge or the target
const RING = 4;          // px of undimmed space around the target
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]';

interface Box { top: number; left: number; width: number; height: number }
interface Layout { target: Box | null; cardTop: number }

function findTarget(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-tutorial-target="${id}"]`);
}

// Enabled, tabbable elements inside the target (the target itself included).
function focusablesIn(target: HTMLElement): HTMLElement[] {
  return [target, ...Array.from(target.querySelectorAll<HTMLElement>(FOCUSABLE))].filter(el =>
    el.matches(FOCUSABLE) && el.tabIndex >= 0 && !el.matches(':disabled'));
}

function overlaps(a: Box, b: Box): boolean {
  return a.left < b.left + b.width && b.left < a.left + a.width &&
    a.top < b.top + b.height && b.top < a.top + a.height;
}

// Card top: top-right corner by default, else just below or above the target.
function placeCard(target: Box | null, card: DOMRect | undefined): number {
  if (!target || !card) return GAP;
  const near: Box = { top: target.top - GAP, left: target.left - GAP, width: target.width + 2 * GAP, height: target.height + 2 * GAP };
  const at = (top: number): Box => ({ top, left: card.left, width: card.width, height: card.height });
  const below = target.top + target.height + GAP;
  const above = target.top - GAP - card.height;
  if (!overlaps(at(GAP), near)) return GAP;
  if (below + card.height <= window.innerHeight - GAP) return below;
  if (above >= GAP) return above;
  return GAP;
}

function sameLayout(a: Layout, b: Layout): boolean {
  const t = a.target, u = b.target;
  return a.cardTop === b.cardTop && (t === u || (!!t && !!u &&
    t.top === u.top && t.left === u.left && t.width === u.width && t.height === u.height));
}

export function TutorialOverlay({ step }: { step: TutorialStep }) {
  const { m, project } = useI18n();
  const targetId = tutorialTargetId(step);
  const cardRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({ target: null, cardTop: GAP });
  const hasTarget = layout.target !== null;

  // Track the target every frame: panels open, content reflows and lists scroll under it.
  useLayoutEffect(() => {
    let frame = 0;
    const measure = () => {
      const r = findTarget(targetId)?.getBoundingClientRect();
      const target = r && r.width > 0 && r.height > 0
        ? { top: r.top, left: r.left, width: r.width, height: r.height }
        : null;
      const next = { target, cardTop: placeCard(target, cardRef.current?.getBoundingClientRect()) };
      setLayout(prev => (sameLayout(prev, next) ? prev : next));
      frame = requestAnimationFrame(measure);
    };
    measure();
    return () => cancelAnimationFrame(frame);
  }, [targetId]);

  // Each new step: bring the target into view and move keyboard focus onto it.
  useEffect(() => {
    const target = findTarget(targetId);
    if (!target) return;
    target.scrollIntoView({ block: 'nearest' });
    focusablesIn(target)[0]?.focus({ preventScroll: true });
  }, [targetId, hasTarget]);

  // Keyboard lock: Tab cycles within the target; other keys only work while focus is inside it.
  // Modifier shortcuts (reload, zoom, devtools) are left to the browser.
  useEffect(() => {
    if (!hasTarget) return;
    const outsideTarget = (node: EventTarget | null) => {
      const target = findTarget(targetId);
      return !!target && !(node instanceof Node && target.contains(node));
    };
    const onKey = (e: KeyboardEvent) => {
      const target = findTarget(targetId);
      if (!target) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.type !== 'keydown') return;
        const items = focusablesIn(target);
        if (items.length === 0) return;
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        items[next]?.focus();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (outsideTarget(document.activeElement)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onFocus = (e: FocusEvent) => {
      const target = findTarget(targetId);
      if (target && outsideTarget(e.target)) focusablesIn(target)[0]?.focus({ preventScroll: true });
    };
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('keyup', onKey, true);
    document.addEventListener('focusin', onFocus, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('keyup', onKey, true);
      document.removeEventListener('focusin', onFocus, true);
    };
  }, [targetId, hasTarget]);

  const def = projectById[step.projectId];
  const idea = def ? project(def).name : '';
  const text =
    step.kind === 'openProjects' ? m.tutorial.openProjects(idea)
    : step.kind === 'launch' ? m.tutorial.launch(idea)
    : m.tutorial.chooseLead;

  const t = layout.target;
  // Clicking the dimmed area must not pull keyboard focus off the target.
  const keepFocus = (e: React.MouseEvent) => e.preventDefault();
  return (
    <div className="tutorial">
      {t ? (
        <>
          {/* Transparent click blockers on all four sides of the target */}
          <div className="tutorial__blocker" aria-hidden onMouseDown={keepFocus} style={{ top: 0, left: 0, right: 0, height: Math.max(0, t.top) }} />
          <div className="tutorial__blocker" aria-hidden onMouseDown={keepFocus} style={{ top: t.top + t.height, left: 0, right: 0, bottom: 0 }} />
          <div className="tutorial__blocker" aria-hidden onMouseDown={keepFocus} style={{ top: t.top, left: 0, width: Math.max(0, t.left), height: t.height }} />
          <div className="tutorial__blocker" aria-hidden onMouseDown={keepFocus} style={{ top: t.top, left: t.left + t.width, right: 0, height: t.height }} />
          {/* Undimmed window over the target; its shadow dims the rest of the screen */}
          <div
            className="tutorial__spotlight"
            aria-hidden
            style={{ top: t.top - RING, left: t.left - RING, width: t.width + 2 * RING, height: t.height + 2 * RING }}
          />
        </>
      ) : (
        <div className="tutorial__dim" aria-hidden />
      )}
      <div ref={cardRef} className="tutorial__card" style={{ top: layout.cardTop }} role="status" aria-live="polite">
        <div className="tutorial__label">{m.tutorial.label(STEP_NUMBER[step.kind], STEP_COUNT)}</div>
        <p className="tutorial__text">{text}</p>
      </div>
    </div>
  );
}
