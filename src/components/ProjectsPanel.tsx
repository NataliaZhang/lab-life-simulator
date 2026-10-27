import { useState } from 'react';
import type { GameState, GameAction, Student } from '../types';
import type { ActiveProject, ProjectDefinition, ProjectGrade } from '../types/project';
import { projectById } from '../data/projects';
import { traitDefs } from '../data/traits';
import {
  canAssignStudent,
  studentHasActiveProject,
  getLeaderDisplayName,
  calcEfficiencyMultiplier,
} from '../engine/projectEngine';
import { audioManager } from '../engine/audioManager';
import { useI18n } from '../i18n/I18nProvider';
import type { Messages } from '../i18n/messages';

// ─── Helpers ───────────────────────────────────────────────────────────────

function calcMonthlyProgress(ap: ActiveProject, def: ProjectDefinition, students: Student[]): number {
  if (!ap.leaderId) return 0;
  if (ap.leaderId === 'pi') return def.baseMonthlyProgress;
  const student = students.find(s => s.id === ap.leaderId && s.status === 'active');
  if (!student) return 0;
  if (!canAssignStudent(student, def)) return def.baseMonthlyProgress;
  return def.baseMonthlyProgress * calcEfficiencyMultiplier(student, def);
}

// ─── Sub-components ────────────────────────────────────────────────────────

function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="proj-bar">
      <div className="proj-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function RequirementBadge({
  label,
  required,
  actual,
}: {
  label: string;
  required: number;
  actual?: number;
}) {
  const met = actual !== undefined ? actual >= required : null;
  return (
    <span className={`req-badge${met === true ? ' req-badge--ok' : met === false ? ' req-badge--fail' : ''}`}>
      {label} {required}
      {actual !== undefined && (
        <span className="req-badge__actual">
          {met ? ' ✓' : ' ✗'}({actual})
        </span>
      )}
    </span>
  );
}

// ─── Grade Badge ───────────────────────────────────────────────────────────

function GradeBadge({ grade }: { grade: ProjectGrade }) {
  const { m } = useI18n();
  return (
    <span className={`proj-grade proj-grade--${grade.toLowerCase()}`} aria-label={m.projects.gradeAria(grade)}>
      {grade}
    </span>
  );
}

// ─── Idea Card ─────────────────────────────────────────────────────────────

function startupCostLabel(def: ProjectDefinition, m: Messages): string {
  const parts: string[] = [];
  if (def.startupEnergyCost > 0) parts.push(m.projects.costEnergy(def.startupEnergyCost));
  if (def.startupFundingCost > 0) parts.push(m.projects.costFunding(m.money(def.startupFundingCost)));
  return parts.join(m.projects.costSeparator);
}

function IdeaCard({
  projectId,
  state,
  dispatch,
}: {
  projectId: string;
  state: GameState;
  dispatch: (a: GameAction) => void;
}) {
  const { m, project } = useI18n();
  const def = projectById[projectId];
  if (!def) return null;
  const text = project(def);

  const canAffordEnergy = def.startupEnergyCost === 0 || state.lab.energy >= def.startupEnergyCost;
  const canAffordFunding = def.startupFundingCost === 0 || state.lab.funding >= def.startupFundingCost;
  const canAfford = canAffordEnergy && canAffordFunding;

  const disabledReason = !canAffordEnergy
    ? m.projects.needEnergy(def.startupEnergyCost)
    : !canAffordFunding
    ? m.projects.needFunding(m.money(def.startupFundingCost))
    : '';

  return (
    <div className="proj-card proj-card--idea">
      <div className="proj-card__header">
        <span className="proj-card__name">💡 {text.name}</span>
        <GradeBadge grade={def.grade} />
      </div>
      <p className="proj-card__desc">{text.description}</p>
      <div className="proj-card__sources">
        {text.ideaSources.map((src, i) => (
          <span key={i} className="idea-source-tag">{src}</span>
        ))}
      </div>
      <div className="proj-card__reqs">
        <RequirementBadge label={m.stat.theory} required={def.theoryRequired} />
        <RequirementBadge label={m.stat.engineering} required={def.engineeringRequired} />
        <RequirementBadge label={m.stat.social} required={def.socialRequired} />
      </div>
      <div className="proj-card__actions">
        <button
          className="btn btn--secondary btn--sm"
          disabled={!canAfford}
          title={disabledReason}
          onClick={() => {
            audioManager.playSfx('click');
            dispatch({ type: 'START_PROJECT', projectId });
          }}
        >
          {m.projects.launch(startupCostLabel(def, m))}
        </button>
      </div>
    </div>
  );
}

// ─── Leader Selector ───────────────────────────────────────────────────────

function LeaderSelector({
  ap,
  def,
  state,
  onSelect,
  onClose,
}: {
  ap: ActiveProject;
  def: ProjectDefinition;
  state: GameState;
  onSelect: (leaderId: string) => void;
  onClose: () => void;
}) {
  const { m, studentName } = useI18n();
  const activeStudents = state.students.filter(s => s.status === 'active');

  return (
    <div className="leader-selector">
      <div className="leader-selector__header">
        <span>{m.projects.chooseLead}</span>
        <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
      </div>

      {/* PI option — disabled when energy is 0 */}
      {(() => {
        const piDisabled = state.lab.energy <= 0 && ap.leaderId !== 'pi';
        return (
          <div
            className={`leader-option${ap.leaderId === 'pi' ? ' leader-option--current' : ''}${piDisabled ? ' leader-option--disabled' : ''}`}
            onClick={() => { if (!piDisabled) onSelect('pi'); }}
            title={piDisabled ? m.projects.piDisabledTitle : undefined}
          >
            <div className="leader-option__name">{m.projects.piSelf}</div>
            <div className="leader-option__detail">
              {piDisabled
                ? m.projects.piOutOfEnergy
                : m.projects.piDetail(def.baseMonthlyProgress.toFixed(1))}
            </div>
            {ap.leaderId === 'pi' && <span className="leader-option__badge">{m.projects.current}</span>}
          </div>
        );
      })()}

      {/* Student options */}
      {activeStudents.map(s => {
        const eligible = canAssignStudent(s, def);
        const busy = studentHasActiveProject(s.id, state.activeProjects) && s.id !== ap.leaderId;
        const isCurrent = ap.leaderId === s.id;
        const multiplier = eligible ? calcEfficiencyMultiplier(s, def) : null;

        return (
          <div
            key={s.id}
            className={`leader-option${isCurrent ? ' leader-option--current' : ''}${!eligible || busy ? ' leader-option--disabled' : ''}`}
            onClick={() => {
              if (!eligible || busy) return;
              onSelect(s.id);
            }}
          >
            <div className="leader-option__name">
              {studentName(s)}
              {isCurrent && <span className="leader-option__badge">{m.projects.current}</span>}
              {busy && !isCurrent && <span className="leader-option__badge leader-option__badge--warn">{m.projects.busy}</span>}
            </div>
            <div className="leader-option__skills">
              <RequirementBadge label={m.stat.theory} required={def.theoryRequired} actual={s.skills.theory} />
              <RequirementBadge label={m.stat.engineering} required={def.engineeringRequired} actual={s.skills.engineering} />
              <RequirementBadge label={m.stat.social} required={def.socialRequired} actual={s.skills.social} />
            </div>
            {eligible && multiplier !== null && (
              <div className="leader-option__detail">
                {m.projects.studentDetail(multiplier.toFixed(2), (def.baseMonthlyProgress * multiplier).toFixed(1))}
              </div>
            )}
            {!eligible && <div className="leader-option__detail leader-option__detail--warn">{m.projects.notQualified}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ─── Active Project Card ────────────────────────────────────────────────────

type PendingAction =
  | { type: 'assign'; leaderId: string }
  | { type: 'remove' };

// `freeSwapBy` is set when the outgoing leader's optimistic_heart trait waives the penalty.
function SwapConfirmModal({
  currentProgress,
  freeSwapBy,
  onConfirm,
  onCancel,
}: {
  currentProgress: number;
  freeSwapBy: Student | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const after = Math.round(currentProgress * 0.7);
  const { m, studentName, trait } = useI18n();
  const freeTrait = traitDefs['optimistic_heart'];
  return (
    <div className="swap-confirm-overlay" onClick={onCancel}>
      <div className="swap-confirm-modal" onClick={e => e.stopPropagation()}>
        <p className="swap-confirm-modal__msg">
          {freeSwapBy && freeTrait
            ? m.projects.swapFree(studentName(freeSwapBy), trait(freeTrait).name)
            : <>{m.projects.swapPenaltyBefore}<strong>{Math.round(currentProgress)}%</strong>{m.projects.swapPenaltyMiddle}<strong>{after}%</strong>{m.projects.swapPenaltyAfter}</>
          }
        </p>
        <div className="swap-confirm-modal__actions">
          <button className="btn btn--primary btn--sm" onClick={onConfirm}>{m.projects.confirm}</button>
          <button className="btn btn--ghost btn--sm" onClick={onCancel}>{m.projects.cancel}</button>
        </div>
      </div>
    </div>
  );
}

function ActiveProjectCard({
  ap,
  state,
  dispatch,
}: {
  ap: ActiveProject;
  state: GameState;
  dispatch: (a: GameAction) => void;
}) {
  const [showSelector, setShowSelector] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const { m, locale, project } = useI18n();
  const def = projectById[ap.projectId];
  if (!def) return null;
  const text = project(def);

  const leaderName = getLeaderDisplayName(ap.leaderId, state.students, locale);
  const monthlyGain = calcMonthlyProgress(ap, def, state.students);
  const currentLeader = ap.leaderId ? state.students.find(s => s.id === ap.leaderId) : null;
  const freeSwapBy = currentLeader?.traitIds.includes('optimistic_heart') ? currentLeader : null;

  // Called when the user picks a leader from the selector.
  const handleSelectLeader = (leaderId: string) => {
    const isSwap = ap.leaderId !== null && ap.leaderId !== leaderId;
    if (isSwap) {
      setPendingAction({ type: 'assign', leaderId });
    } else {
      audioManager.playSfx('click');
      dispatch({ type: 'ASSIGN_PROJECT_LEADER', projectId: ap.projectId, leaderId });
      setShowSelector(false);
    }
  };

  const handleConfirm = () => {
    if (!pendingAction) return;
    audioManager.playSfx('click');
    if (pendingAction.type === 'assign') {
      dispatch({ type: 'ASSIGN_PROJECT_LEADER', projectId: ap.projectId, leaderId: pendingAction.leaderId });
      setShowSelector(false);
    } else {
      dispatch({ type: 'REMOVE_PROJECT_LEADER', projectId: ap.projectId });
    }
    setPendingAction(null);
  };

  return (
    <div className="proj-card proj-card--active">
      <div className="proj-card__header">
        <span className="proj-card__name">{text.name}</span>
        <div className="proj-card__header-right">
          <GradeBadge grade={def.grade} />
          <span className="proj-card__progress-num">{Math.round(ap.progress)}%</span>
        </div>
      </div>
      <p className="proj-card__desc">{text.description}</p>
      <ProgressBar value={ap.progress} />
      <div className="proj-card__reqs">
        <RequirementBadge label={m.stat.theory} required={def.theoryRequired} />
        <RequirementBadge label={m.stat.engineering} required={def.engineeringRequired} />
        <RequirementBadge label={m.stat.social} required={def.socialRequired} />
      </div>
      <div className="proj-card__leader-row">
        <span className="proj-card__leader-label">{m.projects.leadLabel}</span>
        <span className={`proj-card__leader${!ap.leaderId ? ' proj-card__leader--none' : ''}`}>
          {leaderName}
        </span>
        {ap.leaderId && (
          <span className="proj-card__monthly">
            {m.projects.monthly(monthlyGain.toFixed(1))}
          </span>
        )}
        {!ap.leaderId && (
          <span className="proj-card__stalled">{m.projects.stalled}</span>
        )}
      </div>
      <div className="proj-card__actions">
        <button
          className="btn btn--secondary btn--sm"
          onClick={() => { audioManager.playSfx('click'); setShowSelector(v => !v); }}
        >
          {showSelector ? m.projects.collapse : (ap.leaderId ? m.projects.changeLead : m.projects.assignLead)}
        </button>
        {ap.leaderId && (
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => setPendingAction({ type: 'remove' })}
            title={m.projects.removeLeadTitle}
          >
            {m.projects.removeLead}
          </button>
        )}
      </div>
      {showSelector && (
        <LeaderSelector
          ap={ap}
          def={def}
          state={state}
          onSelect={handleSelectLeader}
          onClose={() => setShowSelector(false)}
        />
      )}
      {pendingAction && (
        <SwapConfirmModal
          currentProgress={ap.progress}
          freeSwapBy={freeSwapBy}
          onConfirm={handleConfirm}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
}

// ─── Completed Project Card ─────────────────────────────────────────────────

function CompletedProjectCard({
  projectId,
  leaderId,
  completedAt,
  students,
}: {
  projectId: string;
  leaderId: string | null;
  completedAt: { year: number; month: number };
  students: Student[];
}) {
  const { m, locale, project } = useI18n();
  const def = projectById[projectId];
  if (!def) return null;
  const text = project(def);
  const leaderName = getLeaderDisplayName(leaderId, students, locale);
  return (
    <div className="proj-card proj-card--completed">
      <div className="proj-card__header">
        <span className="proj-card__name">✓ {text.name}</span>
        <div className="proj-card__header-right">
          <GradeBadge grade={def.grade} />
          <span className="proj-card__done-time">{m.time.compact(completedAt.year, completedAt.month)}</span>
        </div>
      </div>
      <p className="proj-card__desc">{text.description}</p>
      <div className="proj-card__done-meta">
        {m.projects.completedMeta(leaderName, m.money(def.fundingReward), def.reputationReward)}
      </div>
    </div>
  );
}

// ─── Main Panel ─────────────────────────────────────────────────────────────

interface Props {
  state: GameState;
  dispatch: (a: GameAction) => void;
  onClose: () => void;
}

export function ProjectsPanel({ state, dispatch, onClose }: Props) {
  const { m } = useI18n();

  return (
    <div className="projects-panel">
      <div className="projects-panel__header">
        <h2 className="projects-panel__title">{m.projects.title}</h2>
        <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
      </div>

      <div className="projects-panel__body">

        {/* Ideas */}
        <section className="proj-section">
          <h3 className="proj-section__title">
            {m.projects.ideas}
            <span className="proj-section__count">{state.projectIdeas.length}</span>
          </h3>
          {state.projectIdeas.length === 0 ? (
            <p className="proj-empty">{m.projects.ideasEmpty}</p>
          ) : (
            <div className="proj-grid">
              {state.projectIdeas.map(id => (
                <IdeaCard key={id} projectId={id} state={state} dispatch={dispatch} />
              ))}
            </div>
          )}
        </section>

        {/* Active */}
        <section className="proj-section">
          <h3 className="proj-section__title">
            {m.projects.active}
            <span className="proj-section__count">{state.activeProjects.length}</span>
          </h3>
          {state.activeProjects.length === 0 ? (
            <p className="proj-empty">{m.projects.activeEmpty}</p>
          ) : (
            <div className="proj-grid">
              {state.activeProjects.map(ap => (
                <ActiveProjectCard
                  key={ap.projectId}
                  ap={ap}
                  state={state}
                  dispatch={dispatch}
                />
              ))}
            </div>
          )}
        </section>

        {/* Completed */}
        {state.completedProjects.length > 0 && (
          <section className="proj-section">
            <h3 className="proj-section__title">
              {m.projects.completed}
              <span className="proj-section__count">{state.completedProjects.length}</span>
            </h3>
            <div className="proj-grid">
              {state.completedProjects.map((cp, i) => (
                <CompletedProjectCard
                  key={i}
                  projectId={cp.projectId}
                  leaderId={cp.leaderId}
                  completedAt={cp.completedAt}
                  students={state.students}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
