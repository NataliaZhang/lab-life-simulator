import type { GameEvent, LabStats } from '../types';
import { audioManager } from '../engine/audioManager';

interface Props {
  event: GameEvent;
  lab: LabStats;
  chosenOptionIds: string[];
  activeStudentIds: string[];
  boundStudentName?: string;
  boundStudent2Name?: string;
  onChoose: (eventId: string, optionId: string) => void;
  onClose: () => void;
}

function resolve(text: string, name?: string, name2?: string): string {
  let result = text;
  if (name) result = result.replace(/\{studentName\}/g, name);
  if (name2) result = result.replace(/\{student2Name\}/g, name2);
  return result;
}

export function EventModal({ event, lab, chosenOptionIds, activeStudentIds, boundStudentName, boundStudent2Name, onChoose, onClose }: Props) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="event-title">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title" id="event-title">{resolve(event.title, boundStudentName, boundStudent2Name)}</h2>
          <button className="modal__close" onClick={onClose} aria-label="暂时关闭">✕</button>
        </div>
        <div className="modal__prompt">{resolve(event.prompt ?? '', boundStudentName, boundStudent2Name)}</div>
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
                <span className="modal__option-text">{resolve(option.text, boundStudentName, boundStudent2Name)}</span>
                <span className="modal__option-costs">
                  {option.fundingCost != null && (
                    <span className={`option-cost${!fundingOk ? ' option-cost--unaffordable' : ''}`}>
                      💰 {option.fundingCost}万
                    </span>
                  )}
                  {option.energyCost != null && (
                    <span className={`option-cost${!energyOk ? ' option-cost--unaffordable' : ''}`}>
                      ⚡ {option.energyCost}
                    </span>
                  )}
                  {!choiceOk && (
                    <span className="option-cost option-cost--unaffordable">
                      🔒 需先购买服务器
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
