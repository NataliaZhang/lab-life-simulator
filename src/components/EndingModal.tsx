import type { GamePhase, LabStats, Student } from '../types';
import { useI18n } from '../i18n/I18nProvider';

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

export function EndingModal({ endingTitle, tagline, phase, lab, students, ideasCollected, projectsStarted, projectsCompleted, onNewGame }: Props) {
  const { m, studentName } = useI18n();
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ending-title">
      <div className="ending-modal">
        <div className="ending-modal__header">
          <div className={`ending-modal__badge${phase === 'gameover' ? ' ending-modal__badge--over' : ''}`}>
            {phase === 'won' ? m.ending.badgeWon : m.ending.badgeOver}
          </div>
          <h2 className="ending-modal__title" id="ending-title">{endingTitle}</h2>
          <p className="ending-modal__tagline">{tagline}</p>
        </div>

        <div className="ending-modal__stats">
          <span>{m.ending.reputation(Math.round(lab.reputation))}</span>
          <span className="ending-modal__dot">·</span>
          <span>{m.ending.funding(m.money(lab.funding))}</span>
        </div>

        {ideasCollected > 0 && (
          <div className="ending-modal__stats">
            <span>{m.ending.ideas(ideasCollected)}</span>
            <span className="ending-modal__dot">·</span>
            <span>{m.ending.started(projectsStarted)}</span>
            <span className="ending-modal__dot">·</span>
            <span>{m.ending.completed(projectsCompleted)}</span>
          </div>
        )}

        {students.length > 0 && (
          <div className="ending-modal__students">
            <div className="ending-modal__students-label">{m.ending.students}</div>
            <div className="ending-modal__students-list">
              {students.map(s => (
                <div key={s.id} className="ending-modal__student-row">
                  <span className="ending-modal__student-name">{studentName(s)}</span>
                  <span className={`ending-modal__student-status ending-modal__student-status--${s.status}`}>
                    {m.studentStatus[s.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ending-modal__actions">
          <button className="btn btn--primary" onClick={onNewGame}>
            {m.ending.newGame}
          </button>
        </div>
      </div>
    </div>
  );
}
