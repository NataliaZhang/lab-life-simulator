import { useState } from 'react';
import type { Student } from '../types';
import type { ActiveProject } from '../types/project';
import { traitDefs } from '../data/traits';
import { projectById } from '../data/projects';

const PI_BIOS = [
  '实验室头号保姆',
  '有偿情感支持提供者',
  '背锅侠（兼义务审稿员）',
  '经费的掘墓人',
  '每周计划写论文，每周成功开会',
  '帮学生改论文，顺便改人生',
  '坐拥服务器，身无三篇文',
  '组里唯一读懂审稿意见的人（存疑）',
  '理想状态：学者。实际状态：客服',
  '热爱科研，恐惧填表',
];

function PICard() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * PI_BIOS.length));
  return (
    <div className="student-card student-card--pi">
      <div className="student-card__name">你</div>
      <div className="student-card__pi-bio">
        <span>{PI_BIOS[idx]}</span>
        <button
          className="pi-bio-refresh"
          onClick={() => setIdx(i => (i + 1) % PI_BIOS.length)}
          title="换一句"
        >↻</button>
      </div>
    </div>
  );
}

interface Props {
  students: Student[];
  activeProjects: ActiveProject[];
  onAdvanceMonth: () => void;
  canAdvanceMonth: boolean;
  isGameOver: boolean;  // hides the continue button when game is over (ending modal handles restart)
}

function StatBar({ value, warn, max = 100 }: { value: number; warn?: boolean; max?: number }) {
  return (
    <div className="stat-bar">
      <div
        className={`stat-bar__fill${warn ? ' stat-bar__fill--warn' : ''}`}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  );
}

function StudentCard({ student, activeProjects }: { student: Student; activeProjects: ActiveProject[] }) {
  if (student.status === 'graduated') {
    return (
      <div className="student-card student-card--graduated">
        <div className="student-card__name">{student.name}</div>
        <div className="student-card__status">已毕业</div>
      </div>
    );
  }

  if (student.status === 'left') {
    return (
      <div className="student-card student-card--left">
        <div className="student-card__name">{student.name}</div>
        <div className="student-card__status">已离组</div>
      </div>
    );
  }

  const assignedProject = activeProjects.find(p => p.leaderId === student.id);
  const projectName = assignedProject
    ? (projectById[assignedProject.projectId]?.name ?? assignedProject.projectId)
    : null;

  return (
    <div className="student-card">
      <div className="student-card__header">
        <span className="student-card__name">{student.name}</span>
        <span className="student-card__year">博{student.year}</span>
      </div>
      <div className="student-card__traits">
        {student.traitIds.map(id => (
          <span key={id} className="trait-tag">{traitDefs[id]?.name ?? id}</span>
        ))}
      </div>
      <div className="student-card__project">
        {projectName
          ? <span className="student-project-tag">📋 {projectName}</span>
          : <span className="student-project-tag student-project-tag--none">当前没有进行中的项目</span>}
      </div>
      <div className="student-card__stats">
        <div className="student-stat">
          <span className="student-stat__label">好感</span>
          <StatBar value={student.favor} warn={student.favor <= 40} max={100} />
          <span className="student-stat__num">{Math.round(student.favor)}</span>
        </div>
        <div className="student-stat">
          <span className="student-stat__label">心情</span>
          <StatBar value={student.happiness} warn={student.happiness < 30} max={100} />
          <span className="student-stat__num">{Math.round(student.happiness)}</span>
        </div>
      </div>
      <div className="student-card__skills">
        <span className="skill" title="理论能力">理论:{student.skills.theory}</span>
        <span className="skill" title="工程能力">工程:{student.skills.engineering}</span>
        <span className="skill" title="社交能力">社交:{student.skills.social}</span>
      </div>
    </div>
  );
}

export function StudentList({
  students,
  activeProjects,
  onAdvanceMonth,
  canAdvanceMonth,
  isGameOver,
}: Props) {
  return (
    <aside className="student-panel">
      <h3 className="student-panel__title">实验室成员</h3>
      <div className="student-panel__list">
        <PICard />
        {students.map(s => (
          <StudentCard key={s.id} student={s} activeProjects={activeProjects} />
        ))}
      </div>
      {!isGameOver && (
        <div className="student-panel__actions">
          <button
            className="btn btn--primary"
            onClick={onAdvanceMonth}
            disabled={!canAdvanceMonth}
            title={canAdvanceMonth ? '' : '请先做出选择'}
          >
            继续
          </button>
        </div>
      )}
    </aside>
  );
}
