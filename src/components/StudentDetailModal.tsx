import { useState } from 'react';
import type { Student, StudentSkills } from '../types';
import type { ActiveProject, CompletedProject } from '../types/project';
import { allCandidates } from '../data/studentPool';
import { TraitTag } from './TraitTag';
import { projectById } from '../data/projects';
import { portraitUrl, expressionUrl, pickExpression } from '../data/studentArt';

interface Props {
  student: Student;
  activeProjects: ActiveProject[];
  completedProjects: CompletedProject[];
  onClose: () => void;
}

// ── Portrait with fallback ────────────────────────────────────────────────────

function DetailPortrait({ student }: { student: Student }) {
  const [portraitFailed, setPortraitFailed] = useState(false);
  const expression = pickExpression(student.happiness);
  const pUrl = portraitUrl(student.id);
  const eUrl = expressionUrl(student.id, expression);
  const [exprFailed, setExprFailed] = useState(false);

  // Prefer portrait; fall back to expression avatar; fall back to letter block
  if (!portraitFailed && pUrl) {
    return (
      <img
        src={pUrl}
        alt={`${student.name} 立绘`}
        className="detail-portrait"
        onError={() => setPortraitFailed(true)}
      />
    );
  }
  if (!exprFailed && eUrl) {
    return (
      <img
        src={eUrl}
        alt={`${student.name}`}
        className="detail-portrait detail-portrait--expr"
        onError={() => setExprFailed(true)}
      />
    );
  }
  return (
    <div className="detail-portrait detail-portrait--placeholder">
      {student.name.charAt(0)}
    </div>
  );
}

// ── Stat bars (favor / happiness) ─────────────────────────────────────────────

function DetailBar({
  label, value, max = 100, warn,
}: { label: string; value: number; max?: number; warn?: boolean }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="detail-stat">
      <span className="detail-stat__label">{label}</span>
      <div className="detail-stat__track">
        <div
          className={`detail-stat__fill${warn ? ' detail-stat__fill--warn' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="detail-stat__num">{Math.round(value)}</span>
    </div>
  );
}

// ── Skill radar chart (equilateral triangle) ──────────────────────────────────

function SkillRadar({ skills }: { skills: StudentSkills }) {
  const CX = 110, CY = 82, R = 52, LOFF = 20;
  const MAX = 100;
  const deg = (d: number) => (d * Math.PI) / 180;

  // Theory points up, engineering lower-right, social lower-left
  const AXES = [
    { key: 'theory'      as const, label: '理论', a: deg(-90) },
    { key: 'engineering' as const, label: '工程', a: deg( 30) },
    { key: 'social'      as const, label: '社交', a: deg(150) },
  ];

  const ringPts = (ratio: number) =>
    AXES.map(({ a }) =>
      `${CX + R * ratio * Math.cos(a)},${CY + R * ratio * Math.sin(a)}`
    ).join(' ');

  // Allow polygon to extend 30% past the reference ring for values > 100
  const valuePts = AXES.map(({ key, a }) => {
    const d = Math.min(skills[key] / MAX, 1.3) * R;
    return `${CX + d * Math.cos(a)},${CY + d * Math.sin(a)}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 220 142" style={{ width: '100%', display: 'block' }}>
      {/* Reference rings at 25 / 50 / 75 / 100 */}
      {[0.25, 0.5, 0.75, 1.0].map(ratio => (
        <polygon key={ratio} points={ringPts(ratio)} fill="none"
          stroke="var(--color-border)" strokeWidth={ratio === 1 ? 1.5 : 0.8} />
      ))}
      {/* Axis spokes */}
      {AXES.map(({ key, a }) => (
        <line key={key}
          x1={CX} y1={CY}
          x2={CX + R * Math.cos(a)} y2={CY + R * Math.sin(a)}
          stroke="var(--color-border)" strokeWidth="1"
        />
      ))}
      {/* Value polygon */}
      <polygon points={valuePts}
        fill="rgba(44,95,138,0.15)"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Vertex dots */}
      {AXES.map(({ key, a }) => {
        const d = Math.min(skills[key] / MAX, 1.3) * R;
        return (
          <circle key={key}
            cx={CX + d * Math.cos(a)} cy={CY + d * Math.sin(a)}
            r={3} fill="var(--color-accent)"
          />
        );
      })}
      {/* Axis labels + values */}
      {AXES.map(({ key, label, a }, i) => {
        const lx = CX + (R + LOFF) * Math.cos(a);
        const ly = CY + (R + LOFF) * Math.sin(a);
        const anchor: 'middle' | 'start' | 'end' =
          i === 0 ? 'middle' : i === 1 ? 'start' : 'end';
        return (
          <text key={key} x={lx} y={ly}
            textAnchor={anchor} dominantBaseline="middle"
            fontSize="11" fill="var(--color-text-muted)"
            fontFamily="var(--font-sans)">
            {label} {skills[key]}
          </text>
        );
      })}
    </svg>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function StudentDetailModal({
  student, activeProjects, completedProjects, onClose,
}: Props) {
  const candidate = allCandidates.find(c => c.id === student.id);
  const assignedProject = activeProjects.find(p => p.leaderId === student.id);
  const projectName = assignedProject
    ? (projectById[assignedProject.projectId]?.name ?? assignedProject.projectId)
    : null;

  const doneProjects = completedProjects
    .filter(p => p.leaderId === student.id)
    .map(p => ({
      name: projectById[p.projectId]?.name ?? p.projectId,
      at: p.completedAt,
    }));

  const statusLabel =
    student.status === 'graduated' ? '已毕业' :
    student.status === 'left'      ? '已离组' :
    `博士 ${student.year} 年级`;

  return (
    <div
      className="modal-overlay detail-overlay"
      role="dialog"
      aria-modal="true"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="detail-modal">
        {/* Close */}
        <button className="detail-modal__close" onClick={onClose} aria-label="关闭">×</button>

        {/* Portrait column */}
        <div className="detail-modal__portrait-col">
          <DetailPortrait student={student} />
        </div>

        {/* Info column */}
        <div className="detail-modal__info-col">

          {/* Name + year */}
          <div className="detail-modal__name-row">
            <h2 className="detail-modal__name">{student.name}</h2>
            <span className="detail-modal__badge">{statusLabel}</span>
          </div>

          {/* Signature / tagline */}
          {candidate?.tagline && (
            <p className="detail-modal__tagline">「{candidate.tagline}」</p>
          )}

          {/* Bio */}
          {candidate?.bio && (
            <p className="detail-modal__bio">{candidate.bio}</p>
          )}

          {/* Traits */}
          {student.traitIds.length > 0 && (
            <div className="detail-modal__section">
              <div className="detail-modal__traits">
                {student.traitIds.map(tid => (
                  <TraitTag key={tid} traitId={tid} />
                ))}
              </div>
            </div>
          )}

          {/* 状态 + 能力 side by side */}
          {student.status === 'active' ? (
            <div className="detail-modal__stats-grid">
              <div className="detail-modal__section">
                <DetailBar label="好感" value={student.favor} warn={student.favor <= 40} />
                <DetailBar label="心　情" value={student.happiness} warn={student.happiness < 30} />
              </div>
              <div className="detail-modal__section">
                <SkillRadar skills={student.skills} />
              </div>
            </div>
          ) : (
            <div className="detail-modal__section">
              <SkillRadar skills={student.skills} />
            </div>
          )}

          {/* Current project */}
          {student.status === 'active' && (
            <div className="detail-modal__section">
              <h3 className="detail-modal__section-title">当前项目</h3>
              {projectName
                ? <span className="detail-modal__project">{projectName}</span>
                : <span className="detail-modal__project detail-modal__project--none">暂无进行中的项目</span>}
            </div>
          )}

          {/* Completed projects */}
          <div className="detail-modal__section">
            <h3 className="detail-modal__section-title">已完成项目</h3>
            {doneProjects.length > 0
              ? (
                <div className="detail-modal__done-list">
                  {doneProjects.map((p, i) => (
                    <div key={i} className="detail-modal__done-item">
                      <span className="detail-modal__project detail-modal__project--done">{p.name}</span>
                      {p.at && (
                        <span className="detail-modal__done-time">
                          第{p.at.year}年{p.at.month}月
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )
              : <span className="detail-modal__project detail-modal__project--none">暂未完成任何项目</span>
            }
          </div>

          {/* Graduation info */}
          {student.status === 'graduated' && student.graduatedAt && (
            <p className="detail-modal__grad-note">
              毕业于第 {student.graduatedAt.year} 年 {student.graduatedAt.month} 月
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
