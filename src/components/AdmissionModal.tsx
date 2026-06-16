import type { AdmissionState, LabStats } from '../types';
import { allCandidates } from '../data/studentPool';
import { traitDefs } from '../data/traits';

const CONTINUE_ENERGY_COST = 20;

function getAdmissionCost(year: number): number {
  return year >= 3 ? 20 : 10;
}

interface Props {
  admissionState: AdmissionState;
  lab: LabStats;
  gameYear: number;
  onAdmit: (candidateId: string) => void;
  onPass: () => void;
  onContinue: () => void;
}

export function AdmissionModal({ admissionState, lab, gameYear, onAdmit, onPass, onContinue }: Props) {
  const { candidates, round } = admissionState;

  if (candidates === null) {
    // "Offer continue" state: player just admitted someone, can recruit again or stop
    const canContinue = lab.energy >= CONTINUE_ENERGY_COST;
    return (
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal admission-modal">
          <h2 className="modal__title">招生完成</h2>
          <p className="modal__prompt">
            新成员已加入实验室。是否继续招募本年度第二批学生？
          </p>
          <div className="admission-continue-bar">
            <button
              className={`modal__option-btn${!canContinue ? ' modal__option-btn--disabled' : ''}`}
              onClick={onContinue}
              disabled={!canContinue}
            >
              <span className="modal__option-text">继续招募</span>
              <span className="modal__option-costs">
                <span className={`option-cost${!canContinue ? ' option-cost--unaffordable' : ''}`}>
                  ⚡ {CONTINUE_ENERGY_COST}
                </span>
              </span>
            </button>
            <button className="modal__option-btn" onClick={onPass}>
              结束本年招生
            </button>
          </div>
        </div>
      </div>
    );
  }

  const candidateData = candidates.map(id => allCandidates.find(c => c.id === id)).filter(Boolean);
  const admissionCost = getAdmissionCost(gameYear);
  const canAfford = lab.funding >= admissionCost;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal admission-modal">
        <h2 className="modal__title">
          {round === 1 ? `第 ${gameYear} 年招生季` : `第 ${round} 轮招募`}
          <span className="admission-modal__cost-hint">录取费：{admissionCost}万/人</span>
        </h2>
        <p className="modal__prompt">两份申请材料摆在面前，选一位加入实验室：</p>

        <div className="admission-candidates">
          {candidateData.map(candidate => {
            if (!candidate) return null;
            return (
              <div key={candidate.id} className="candidate-card">
                <div className="candidate-card__header">
                  <span className="candidate-card__name">{candidate.name}</span>
                  <span className="candidate-card__tagline">{candidate.tagline}</span>
                </div>
                <p className="candidate-card__bio">{candidate.bio}</p>
                <div className="candidate-card__traits">
                  {candidate.traitIds.map(tid => {
                    const trait = traitDefs[tid];
                    if (!trait) return null;
                    return (
                      <span key={tid} className="trait-tag">
                        {trait.name}
                      </span>
                    );
                  })}
                </div>
                <button
                  className={`btn btn--primary candidate-card__admit-btn${!canAfford ? ' modal__option-btn--disabled' : ''}`}
                  onClick={() => onAdmit(candidate.id)}
                  disabled={!canAfford}
                >
                  {canAfford ? `录取 ${candidate.name}` : `资金不足（需${admissionCost}万）`}
                </button>
              </div>
            );
          })}
        </div>

        {/* In early years (1–3), player must recruit — no skip option */}
        {(gameYear >= 4 || round > 1) && (
          <div className="admission-footer">
            <button className="btn btn--ghost" onClick={onPass}>
              今年不招了
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
