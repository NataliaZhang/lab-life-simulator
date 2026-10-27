import type { GameState } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { PROJECTS_BUTTON_TARGET } from '../engine/projectTutorial';

interface Props {
  state: GameState;
  studentPanelOpen: boolean;
  onToggleStudentPanel: () => void;
  projectPanelOpen: boolean;
  onToggleProjectPanel: () => void;
}

// Index into the localized reputation tier descriptions.
function reputationTier(rep: number): number {
  if (rep === 0) return 0;
  if (rep < 5)   return 1;
  if (rep < 15)  return 2;
  if (rep < 30)  return 3;
  if (rep < 60)  return 4;
  return 5;
}

// Full label on wide screens, compact label on phones (see .status-text--* in index.css).
function StatLabel({ full, short }: { full: string; short: string }) {
  return (
    <>
      <span className="stat-label status-text--full">{full}</span>
      {short && <span className="stat-label status-text--short">{short}</span>}
    </>
  );
}

export function StatusBar({ state, studentPanelOpen, onToggleStudentPanel, projectPanelOpen, onToggleProjectPanel }: Props) {
  const { lab, time, phase } = state;
  const { m } = useI18n();

  return (
    <header className="status-bar">
      <div className="status-left">
        <span className="game-title">{m.app.title}</span>
        <span className="time-display">
          <span className="status-text--full">{m.time.full(time.year, time.month)}</span>
          <span className="status-text--short">{m.time.short(time.year, time.month)}</span>
        </span>
        {phase !== 'playing' && (
          <span className="phase-badge">{phase === 'won' ? m.status.phaseWon : m.status.phaseOver}</span>
        )}
      </div>
      <div className="status-right">
        <span className={`stat-chip${lab.funding < 10 ? ' stat-chip--warn' : ''}`}>
          <StatLabel full={m.stat.funding} short={m.status.shortLabel.funding} />
          <span className="stat-value">{m.moneyShort(lab.funding)}</span>
        </span>
        <span className="stat-chip" title={m.status.reputationDesc[reputationTier(lab.reputation)]}>
          <StatLabel full={m.stat.reputation} short={m.status.shortLabel.reputation} />
          <span className="stat-value">{lab.reputation}</span>
        </span>
        <span className={`stat-chip${lab.energy < 30 ? ' stat-chip--warn' : ''}`}>
          <StatLabel full={m.stat.energy} short={m.status.shortLabel.energy} />
          <span className="stat-value">{lab.energy}</span>
        </span>
        <button
          className={`panel-toggle-btn${projectPanelOpen ? ' panel-toggle-btn--active' : ''}`}
          onClick={onToggleProjectPanel}
          title={projectPanelOpen ? m.status.closeProjects : m.status.openProjects}
          data-tutorial-target={PROJECTS_BUTTON_TARGET}
        >
          {m.status.projects}{state.projectIdeas.length > 0 && !projectPanelOpen ? ` (${state.projectIdeas.length})` : ''}
        </button>
        <button
          className={`panel-toggle-btn${studentPanelOpen ? ' panel-toggle-btn--active' : ''}`}
          onClick={onToggleStudentPanel}
          title={studentPanelOpen ? m.status.hideMembers : m.status.showMembers}
        >
          {m.status.members}
        </button>
      </div>
    </header>
  );
}
