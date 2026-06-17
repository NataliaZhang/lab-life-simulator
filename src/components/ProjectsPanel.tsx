import { useState } from 'react';
import type { GameState, GameAction, Student } from '../types';
import type { ActiveProject, ProjectDefinition } from '../types/project';
import { projectById } from '../data/projects';
import {
  canAssignStudent,
  studentHasActiveProject,
  getLeaderDisplayName,
  calcEfficiencyMultiplier,
} from '../engine/projectEngine';
import { audioManager } from '../engine/audioManager';

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatTime(t: { year: number; month: number }): string {
  return `第${t.year}年${t.month}月`;
}

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

// ─── Idea Card ─────────────────────────────────────────────────────────────

function startupCostLabel(def: ProjectDefinition): string {
  const parts: string[] = [];
  if (def.startupEnergyCost > 0) parts.push(`精力 -${def.startupEnergyCost}`);
  if (def.startupFundingCost > 0) parts.push(`资金 -${def.startupFundingCost}万`);
  return parts.join('，');
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
  const def = projectById[projectId];
  if (!def) return null;

  const canAffordEnergy = def.startupEnergyCost === 0 || state.lab.energy >= def.startupEnergyCost;
  const canAffordFunding = def.startupFundingCost === 0 || state.lab.funding >= def.startupFundingCost;
  const canAfford = canAffordEnergy && canAffordFunding;

  const disabledReason = !canAffordEnergy
    ? `精力不足（需 ${def.startupEnergyCost}）`
    : !canAffordFunding
    ? `资金不足（需 ${def.startupFundingCost}万）`
    : '';

  return (
    <div className="proj-card proj-card--idea">
      <div className="proj-card__header">
        <span className="proj-card__name">💡 {def.name}</span>
      </div>
      <p className="proj-card__desc">{def.description}</p>
      <div className="proj-card__sources">
        {def.ideaSources.map((src, i) => (
          <span key={i} className="idea-source-tag">{src}</span>
        ))}
      </div>
      <div className="proj-card__reqs">
        <RequirementBadge label="理论" required={def.theoryRequired} />
        <RequirementBadge label="工程" required={def.engineeringRequired} />
        <RequirementBadge label="社交" required={def.socialRequired} />
      </div>
      <div className="proj-card__footer">
        <span className="proj-card__reward">完成奖励：资金 +{def.fundingReward}万，声望 +{def.reputationReward}</span>
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
          立项（{startupCostLabel(def)}）
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
  dispatch,
  onClose,
}: {
  ap: ActiveProject;
  def: ProjectDefinition;
  state: GameState;
  dispatch: (a: GameAction) => void;
  onClose: () => void;
}) {
  const activeStudents = state.students.filter(s => s.status === 'active');

  const assign = (leaderId: string) => {
    audioManager.playSfx('click');
    dispatch({ type: 'ASSIGN_PROJECT_LEADER', projectId: ap.projectId, leaderId });
    onClose();
  };

  return (
    <div className="leader-selector">
      <div className="leader-selector__header">
        <span>选择负责人</span>
        <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
      </div>

      {/* PI option */}
      <div
        className={`leader-option${ap.leaderId === 'pi' ? ' leader-option--current' : ''}`}
        onClick={() => assign('pi')}
      >
        <div className="leader-option__name">PI（自己负责）</div>
        <div className="leader-option__detail">每月消耗精力 15，效率 ×1.00，月推进 {def.baseMonthlyProgress.toFixed(1)}%</div>
        {ap.leaderId === 'pi' && <span className="leader-option__badge">当前</span>}
      </div>

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
              assign(s.id);
            }}
          >
            <div className="leader-option__name">
              {s.name}
              {isCurrent && <span className="leader-option__badge">当前</span>}
              {busy && !isCurrent && <span className="leader-option__badge leader-option__badge--warn">已有项目</span>}
            </div>
            <div className="leader-option__skills">
              <RequirementBadge label="理论" required={def.theoryRequired} actual={s.skills.theory} />
              <RequirementBadge label="工程" required={def.engineeringRequired} actual={s.skills.engineering} />
              <RequirementBadge label="社交" required={def.socialRequired} actual={s.skills.social} />
            </div>
            {eligible && multiplier !== null && (
              <div className="leader-option__detail">
                效率 ×{multiplier.toFixed(2)}，月推进 {(def.baseMonthlyProgress * multiplier).toFixed(1)}%
              </div>
            )}
            {!eligible && <div className="leader-option__detail leader-option__detail--warn">属性不足，无法分配</div>}
          </div>
        );
      })}
    </div>
  );
}

// ─── Active Project Card ────────────────────────────────────────────────────

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
  const def = projectById[ap.projectId];
  if (!def) return null;

  const leaderName = getLeaderDisplayName(ap.leaderId, state.students);
  const monthlyGain = calcMonthlyProgress(ap, def, state.students);
  const isSwap = ap.leaderId !== null;

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_PROJECT_LEADER', projectId: ap.projectId });
  };

  return (
    <div className="proj-card proj-card--active">
      <div className="proj-card__header">
        <span className="proj-card__name">{def.name}</span>
        <span className="proj-card__progress-num">{Math.round(ap.progress)}%</span>
      </div>
      <p className="proj-card__desc">{def.description}</p>
      <ProgressBar value={ap.progress} />
      <div className="proj-card__reqs">
        <RequirementBadge label="理论" required={def.theoryRequired} />
        <RequirementBadge label="工程" required={def.engineeringRequired} />
        <RequirementBadge label="社交" required={def.socialRequired} />
      </div>
      <div className="proj-card__leader-row">
        <span className="proj-card__leader-label">负责人：</span>
        <span className={`proj-card__leader${!ap.leaderId ? ' proj-card__leader--none' : ''}`}>
          {leaderName}
        </span>
        {ap.leaderId && (
          <span className="proj-card__monthly">
            月推进 {monthlyGain.toFixed(1)}%
          </span>
        )}
        {!ap.leaderId && (
          <span className="proj-card__stalled">⏸ 停滞中</span>
        )}
      </div>
      <div className="proj-card__actions">
        <button
          className="btn btn--secondary btn--sm"
          onClick={() => { audioManager.playSfx('click'); setShowSelector(v => !v); }}
        >
          {showSelector ? '收起' : (ap.leaderId ? (isSwap ? '换人（-30%进度）' : '管理负责人') : '分配负责人')}
        </button>
        {ap.leaderId && (
          <button
            className="btn btn--ghost btn--sm"
            onClick={handleRemove}
            title="解除负责人，项目停滞"
          >
            解除
          </button>
        )}
      </div>
      {showSelector && (
        <LeaderSelector
          ap={ap}
          def={def}
          state={state}
          dispatch={dispatch}
          onClose={() => setShowSelector(false)}
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
  const def = projectById[projectId];
  if (!def) return null;
  const leaderName = getLeaderDisplayName(leaderId, students);
  return (
    <div className="proj-card proj-card--completed">
      <div className="proj-card__header">
        <span className="proj-card__name">✓ {def.name}</span>
        <span className="proj-card__done-time">{formatTime(completedAt)}</span>
      </div>
      <p className="proj-card__desc">{def.description}</p>
      <div className="proj-card__done-meta">
        负责人：{leaderName}　奖励：+{def.fundingReward}万 / 声望+{def.reputationReward}
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

  return (
    <div className="projects-panel">
      <div className="projects-panel__header">
        <h2 className="projects-panel__title">项目管理</h2>
        <button className="btn btn--ghost" onClick={onClose}>✕ 关闭</button>
      </div>

      <div className="projects-panel__body">

        {/* Ideas */}
        <section className="proj-section">
          <h3 className="proj-section__title">
            灵感库
            <span className="proj-section__count">{state.projectIdeas.length}</span>
          </h3>
          {state.projectIdeas.length === 0 ? (
            <p className="proj-empty">还没有任何研究灵感。推进剧情事件，说不定会有收获。</p>
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
            进行中
            <span className="proj-section__count">{state.activeProjects.length}</span>
          </h3>
          {state.activeProjects.length === 0 ? (
            <p className="proj-empty">暂无进行中的项目。立项后项目会在这里出现。</p>
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
              已完成
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
