import { useState } from 'react';
import type { Student } from '../types';
import type { ActiveProject, CompletedProject } from '../types/project';
import { TraitTag } from './TraitTag';
import { expressionUrl, pickExpression } from '../data/studentArt';
import type { StudentExpression } from '../types/studentArt';
import { StudentDetailModal } from './StudentDetailModal';

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

  const expression = pickExpression(student.happiness);

  return (
    <div className="student-card">
      {/* Avatar + name + year badge + traits */}
      <div className="student-card__header">
        <button
          className="student-avatar-btn"
          onClick={() => onOpenDetail(student)}
          title="查看角色详情"
        >
          <ExpressionAvatar
            studentId={student.id}
            expression={expression}
            name={student.name}
          />
        </button>
        <div className="student-card__header-text">
          <div className="student-card__name-line">
            <span className="student-card__name">{student.name}</span>
            <span className="student-card__year">博{student.year}</span>
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
          <span className={`skill skill--mood${student.favor <= 40 ? ' skill--warn' : ''}`} title="好感度">好感:{Math.round(student.favor)}</span>
          <span className={`skill skill--mood${student.happiness < 30 ? ' skill--warn' : ''}`} title="心情">心情:{Math.round(student.happiness)}</span>
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

  return (
    <>
      <aside className="student-panel">
        <h3 className="student-panel__title">实验室成员</h3>
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
