import type { Student } from '../types';
import { traitDefs } from '../data/traits';

interface Props {
  students: Student[];
  onAdvanceMonth: () => void;
  canAdvanceMonth: boolean;
  onNewGame: () => void;
  isGameOver: boolean;
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

function StudentCard({ student }: { student: Student }) {
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
      <div className="student-card__stats">
        <div className="student-stat">
          <span className="student-stat__label">进度</span>
          <StatBar value={student.projectProgress} />
          <span className="student-stat__num">{Math.round(student.projectProgress)}</span>
        </div>
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
        <span className="skill" title="理论能力">论:{student.skills.theory}</span>
        <span className="skill" title="工程能力">工:{student.skills.engineering}</span>
        <span className="skill" title="社交能力">交:{student.skills.social}</span>
      </div>
    </div>
  );
}

export function StudentList({
  students,
  onAdvanceMonth,
  canAdvanceMonth,
  onNewGame,
  isGameOver,
}: Props) {
  return (
    <aside className="student-panel">
      <h3 className="student-panel__title">实验室成员</h3>
      <div className="student-panel__list">
        {students.map(s => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
      <div className="student-panel__actions">
        {isGameOver ? (
          <button className="btn btn--primary" onClick={onNewGame}>
            重新开始
          </button>
        ) : (
          <button
            className="btn btn--primary"
            onClick={onAdvanceMonth}
            disabled={!canAdvanceMonth}
            title={canAdvanceMonth ? '' : '请先做出选择'}
          >
            继续
          </button>
        )}
      </div>
    </aside>
  );
}
