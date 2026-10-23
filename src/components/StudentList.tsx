import { useState } from 'react';
import type { Student } from '../types';
import type { ActiveProject, CompletedProject } from '../types/project';
import { TraitTag } from './TraitTag';
import { expressionUrl, pickExpression } from '../data/studentArt';
import type { StudentExpression } from '../types/studentArt';
import { StudentDetailModal } from './StudentDetailModal';
import { useI18n } from '../i18n/I18nProvider';

function PICard() {
  const { m } = useI18n();
  const bios = m.members.piBios;
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * bios.length));
  return (
    <div className="student-card student-card--pi">
      <div className="student-card__name">{m.members.you}</div>
      <div className="student-card__pi-bio">
        <span>{bios[idx % bios.length]}</span>
        <button
          className="pi-bio-refresh"
          onClick={() => setIdx(i => (i + 1) % bios.length)}
          title={m.members.anotherLine}
        >↻</button>
      </div>
    </div>
  );
}

interface Props {
  students: Student[];
  activeProjects: ActiveProject[];
  completedProjects: CompletedProject[];
  onAdvanceMonth: () => void;
  canAdvanceMonth: boolean;
  isGameOver: boolean;  // hides the continue button when game is over (ending modal handles restart)
}

/** Q版头像，图片缺失时降级为首字母占位 */
function ExpressionAvatar({ studentId, expression, name }: {
  studentId: string;
  expression: StudentExpression;
  name: string;
}) {
  const [failed, setFailed] = useState(false);
  const url = expressionUrl(studentId, expression);

  if (failed || !url) {
    return (
      <div className="student-avatar student-avatar--placeholder" aria-hidden>
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={`${name} ${expression}`}
      className="student-avatar"
      onError={() => setFailed(true)}
    />
  );
}


function StudentCard({
  student,
  onOpenDetail,
}: {
  student: Student;
  onOpenDetail: (s: Student) => void;
}) {
  const { m, studentName } = useI18n();
  const name = studentName(student);

  if (student.status === 'graduated') {
    return (
      <div className="student-card student-card--graduated">
        <div className="student-card__name">{name}</div>
        <div className="student-card__status">{m.studentStatus.graduated}</div>
      </div>
    );
  }

  if (student.status === 'left') {
    return (
      <div className="student-card student-card--left">
        <div className="student-card__name">{name}</div>
        <div className="student-card__status">{m.studentStatus.left}</div>
      </div>
    );
  }

  const expression = pickExpression(student.happiness);

  return (
    <div className="student-card">
      {/* Avatar + name + year badge + traits */}
      <div className="student-card__header">
        <button
          className="student-avatar-btn"
          onClick={() => onOpenDetail(student)}
          title={m.members.viewDetail}
        >
          <ExpressionAvatar
            studentId={student.id}
            expression={expression}
            name={name}
          />
        </button>
        <div className="student-card__header-text">
          <div className="student-card__name-line">
            <span className="student-card__name">{name}</span>
            <span className="student-card__year">{m.members.yearBadge(student.year)}</span>
          </div>
          <div className="student-card__traits">
            {student.traitIds.map(id => (
              <TraitTag key={id} traitId={id} />
            ))}
          </div>
        </div>
      </div>

      {/* Mood stats */}
      <div className="student-card__attrs">
        <div className="student-card__mood-row">
          <span className={`skill skill--mood${student.favor <= 40 ? ' skill--warn' : ''}`} title={m.members.favorTitle}>{m.members.favorChip(Math.round(student.favor))}</span>
          <span className={`skill skill--mood${student.happiness < 30 ? ' skill--warn' : ''}`} title={m.stat.happiness}>{m.members.moodChip(Math.round(student.happiness))}</span>
        </div>
      </div>
    </div>
  );
}

export function StudentList({
  students,
  activeProjects,
  completedProjects,
  onAdvanceMonth,
  canAdvanceMonth,
  isGameOver,
}: Props) {
  const [detailStudent, setDetailStudent] = useState<Student | null>(null);
  const { m } = useI18n();

  return (
    <>
      <aside className="student-panel">
        <h3 className="student-panel__title">{m.members.title}</h3>
        <div className="student-panel__list">
          <PICard />
          {students.map(s => (
            <StudentCard
              key={s.id}
              student={s}
              onOpenDetail={setDetailStudent}
            />
          ))}
        </div>
        {!isGameOver && (
          <div className="student-panel__actions desktop-only">
            <button
              className="btn btn--primary"
              onClick={onAdvanceMonth}
              disabled={!canAdvanceMonth}
              title={canAdvanceMonth ? '' : m.app.chooseFirst}
            >
              {m.app.continue}
            </button>
          </div>
        )}
      </aside>

      {detailStudent && (
        <StudentDetailModal
          student={detailStudent}
          activeProjects={activeProjects}
          completedProjects={completedProjects}
          onClose={() => setDetailStudent(null)}
        />
      )}
    </>
  );
}
