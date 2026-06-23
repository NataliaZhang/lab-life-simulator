import { useState } from 'react';
import type { AdmissionState, LabStats } from '../types';
import { allCandidates } from '../data/studentPool';
import { TraitTag } from './TraitTag';
import { portraitUrl } from '../data/studentArt';

/** 立绘装裱框，统一裁切为 2:3 比例。图片缺失时整个框隐藏。 */
function CandidatePortrait({ studentId, name }: { studentId: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const url = portraitUrl(studentId);
  if (failed || !url) return null;
  return (
    <div className="portrait-frame">
      <img
        src={url}
        alt={`${name} 立绘`}
        className="candidate-portrait"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

const REFRESH_ENERGY_COST = 10;
const CONTINUE_ENERGY_COST = 20;
const CONTINUE_FUNDING_MIN = 20;

function getAdmissionCost(year: number): number {
  return year >= 3 ? 20 : 10;
}

interface Props {
  admissionState: AdmissionState;
  lab: LabStats;
  gameYear: number;
  unshownPoolCount: number; // candidates in pool not yet shown this session
  onAdmit: (candidateId: string) => void;
  onPass: () => void;
  onContinue: () => void;
  onRefresh: () => void;
}

export function AdmissionModal({
  admissionState,
  lab,
  gameYear,
  unshownPoolCount,
  onAdmit,
  onPass,
  onContinue,
  onRefresh,
}: Props) {
  const { candidates, round, recruitedCount, hasRefreshed } = admissionState;

  if (candidates === null) {
    // "Offer continue" state: one student admitted, player can stop or recruit another
    const hasPoolForContinue = gameYear >= 3 && unshownPoolCount >= 2;
    const canAffordContinue = lab.energy >= CONTINUE_ENERGY_COST;
    const hasFundingForContinue = lab.funding >= CONTINUE_FUNDING_MIN;
    const canContinue = hasPoolForContinue && canAffordContinue && hasFundingForContinue;

    return (
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal admission-modal">
          <h2 className="modal__title">已录取一名新生</h2>
          <p className="modal__prompt">
            {hasPoolForContinue
              ? '是否继续招募本年度第二名学生？'
              : '候选人已全部看过，无法再招募第二名。'}
          </p>
          <div className="admission-continue-bar">
            {hasPoolForContinue && (
              <button
                className={`modal__option-btn${!canContinue ? ' modal__option-btn--disabled' : ''}`}
                onClick={onContinue}
                disabled={!canContinue}
              >
                <span className="modal__option-text">
                  {!hasFundingForContinue
                    ? `资金不足（需${CONTINUE_FUNDING_MIN}万）`
                    : '继续招募第二名'}
                </span>
                <span className="modal__option-costs">
                  <span className={`option-cost${!canAffordContinue ? ' option-cost--unaffordable' : ''}`}>
                    ⚡ {CONTINUE_ENERGY_COST}
                  </span>
                </span>
              </button>
            )}
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

  // Refresh: year 3+, one-time swap, only before any admission, requires unshown pool & energy
  const canRefreshPool = unshownPoolCount >= 2;
  const canAffordRefresh = lab.energy >= REFRESH_ENERGY_COST;
  const canRefresh = gameYear >= 3 && !hasRefreshed && recruitedCount === 0 && canRefreshPool && canAffordRefresh;

  // Pass: always in year 4+; in years 1–3 only after admitting at least one
  const canPass = gameYear >= 4 || recruitedCount >= 1;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal admission-modal">
        <h2 className="modal__title">
          {round === 1 ? `第 ${gameYear} 年招生季` : `第 ${round} 轮候选`}
          <span className="admission-modal__cost-hint">录取费：{admissionCost}万/人</span>
        </h2>
        <p className="modal__prompt">两份申请材料摆在面前，选一位加入实验室：</p>

        <div className="admission-candidates">
          {candidateData.map(candidate => {
            if (!candidate) return null;
            return (
              <div key={candidate.id} className="candidate-card">
                <CandidatePortrait studentId={candidate.id} name={candidate.name} />
                <div className="candidate-card__body">
                  <div className="candidate-card__header">
                    <span className="candidate-card__name">{candidate.name}</span>
                    <span className="candidate-card__tagline">{candidate.tagline}</span>
                  </div>
                  <p className="candidate-card__bio">{candidate.bio}</p>
                  <div className="candidate-card__traits">
                    {candidate.traitIds.map(tid => (
                      <TraitTag key={tid} traitId={tid} />
                    ))}
                  </div>
                  <button
                    className={`btn btn--primary candidate-card__admit-btn${!canAfford ? ' modal__option-btn--disabled' : ''}`}
                    onClick={() => onAdmit(candidate.id)}
                    disabled={!canAfford}
                  >
                    {canAfford ? `录取 ${candidate.name}` : `资金不足（需${admissionCost}万）`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admission-footer">
          {/* One-time refresh: year 3+, shows new candidates, costs energy */}
          {gameYear >= 3 && !hasRefreshed && recruitedCount === 0 && (
            <button
              className={`btn btn--ghost${!canRefresh ? ' modal__option-btn--disabled' : ''}`}
              onClick={onRefresh}
              disabled={!canRefresh}
              title={
                !canRefreshPool
                  ? '候选人已不足，无法换批'
                  : !canAffordRefresh
                    ? `精力不足（需${REFRESH_ENERGY_COST}点）`
                    : `消耗${REFRESH_ENERGY_COST}点精力，换一批候选人`
              }
            >
              换一批 ⚡{REFRESH_ENERGY_COST}
            </button>
          )}
          {canPass && (
            <button className="btn btn--ghost" onClick={onPass}>
              今年不招了
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
