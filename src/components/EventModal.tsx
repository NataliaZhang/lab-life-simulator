import type { GameEvent, LabStats, Student } from '../types';
import { audioManager } from '../engine/audioManager';
import { useI18n } from '../i18n/I18nProvider';
import { resolvePlaceholders } from '../i18n/placeholders';

interface Props {
  event: GameEvent;
  lab: LabStats;
  chosenOptionIds: string[];
  activeStudentIds: string[];
  students: Student[];
  boundStudentId: string | null;
  boundStudent2Id: string | null;
  onChoose: (eventId: string, optionId: string) => void;
  onClose: () => void;
}

export function EventModal({ event: sourceEvent, lab, chosenOptionIds, activeStudentIds, students, boundStudentId, boundStudent2Id, onChoose, onClose }: Props) {
  const { locale, m, event: localize } = useI18n();
  const event = localize(sourceEvent);
  const resolve = (text: string) =>
    resolvePlaceholders(text, { students, studentId: boundStudentId, student2Id: boundStudent2Id }, locale);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="event-title">
      <div className="modal event-modal">
        <div className="modal__header">
          <h2 className="modal__title" id="event-title">{resolve(event.title)}</h2>
          <button className="modal__close" onClick={onClose} aria-label={m.event.closeForNow}>✕</button>
        </div>
        <div className="modal__prompt">{resolve(event.prompt ?? '')}</div>
        <div className="modal__options">
          {(event.options ?? []).filter(option =>
            !option.requireStudentActive || activeStudentIds.includes(option.requireStudentActive)
          ).map(option => {
            const fundingOk = !option.fundingCost || lab.funding >= option.fundingCost;
            const energyOk = !option.energyCost || lab.energy >= option.energyCost;
            const choiceOk = !option.requiredChoiceId || chosenOptionIds.includes(option.requiredChoiceId);
            const disabled = !fundingOk || !energyOk || !choiceOk;
            return (
              <button
                key={option.id}
                className={`modal__option-btn${disabled ? ' modal__option-btn--disabled' : ''}`}
                onClick={() => {
                  if (disabled) { audioManager.playSfx('cannot_choose'); return; }
                  onChoose(event.id, option.id);
                }}
              >
                <span className="modal__option-text">{resolve(option.text)}</span>
                <span className="modal__option-costs">
                  {option.fundingCost != null && (
                    <span className={`option-cost${!fundingOk ? ' option-cost--unaffordable' : ''}`}>
                      💰 {m.money(option.fundingCost)}
                    </span>
                  )}
                  {option.energyCost != null && (
                    <span className={`option-cost${!energyOk ? ' option-cost--unaffordable' : ''}`}>
                      ⚡ {option.energyCost}
                    </span>
                  )}
                  {!choiceOk && (
                    <span className="option-cost option-cost--unaffordable">
                      {m.event.requiresServer}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
