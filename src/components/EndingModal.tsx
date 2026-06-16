import type { GamePhase, LabStats, Student } from '../types';

interface Props {
  endingTitle: string;
  tagline: string;
  phase: GamePhase;
  lab: LabStats;
  students: Student[];
  ideasCollected: number;
  projectsStarted: number;
  projectsCompleted: number;
  onNewGame: () => void;
}

const STATUS_LABEL: Record<Student['status'], string> = {
  graduated: '已毕业',
  left: '已离组',
  active: '在读',
};

export function EndingModal({ endingTitle, tagline, phase, lab, students, ideasCollected, projectsStarted, projectsCompleted, onNewGame }: Props) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ending-title">
      <div className="ending-modal">
        <div className="ending-modal__header">
          <div className={`ending-modal__badge${phase === 'gameover' ? ' ending-modal__badge--over' : ''}`}>
            {phase === 'won' ? '六年结束' : '游戏结束'}
          </div>
          <h2 className="ending-modal__title" id="ending-title">{endingTitle}</h2>
          <p className="ending-modal__tagline">{tagline}</p>
        </div>

        <div className="ending-modal__stats">
          <span>声望 {Math.round(lab.reputation)}</span>
          <span className="ending-modal__dot">·</span>
          <span>资金 {lab.funding}万</span>
        </div>

        {ideasCollected > 0 && (
          <div className="ending-modal__stats">
            <span>灵感 {ideasCollected}</span>
            <span className="ending-modal__dot">·</span>
            <span>立项 {projectsStarted}</span>
            <span className="ending-modal__dot">·</span>
            <span>完成 {projectsCompleted}</span>
          </div>
        )}

        {students.length > 0 && (
          <div className="ending-modal__students">
            <div className="ending-modal__students-label">学生</div>
            <div className="ending-modal__students-list">
              {students.map(s => (
                <div key={s.id} className="ending-modal__student-row">
                  <span className="ending-modal__student-name">{s.name}</span>
                  <span className={`ending-modal__student-status ending-modal__student-status--${s.status}`}>
                    {STATUS_LABEL[s.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ending-modal__actions">
          <button className="btn btn--primary" onClick={onNewGame}>
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
}
