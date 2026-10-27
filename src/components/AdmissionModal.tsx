import { useState } from 'react';
import type { AdmissionState, LabStats } from '../types';
import { allCandidates } from '../data/studentPool';
import { TraitTag } from './TraitTag';
import { portraitUrl } from '../data/studentArt';
import { useI18n } from '../i18n/I18nProvider';

/** 立绘装裱框，统一裁切为 2:3 比例。图片缺失时整个框隐藏。 */
function CandidatePortrait({ studentId, name }: { studentId: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const { m } = useI18n();
  const url = portraitUrl(studentId);
  if (failed || !url) return null;
  return (
    <div className="portrait-frame">
      <img
        src={url}
        alt={m.admission.portraitAlt(name)}
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
  const { m, candidate: candidateText } = useI18n();

  if (candidates === null) {
    // "Offer continue" state: one student admitted, player can stop or recruit another
    const hasPoolForContinue = gameYear >= 3 && unshownPoolCount >= 2;
    const canAffordContinue = lab.energy >= CONTINUE_ENERGY_COST;
    const hasFundingForContinue = lab.funding >= CONTINUE_FUNDING_MIN;
    const canContinue = hasPoolForContinue && canAffordContinue && hasFundingForContinue;

    return (
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal admission-modal">
          <h2 className="modal__title">{m.admission.admittedTitle}</h2>
          <p className="modal__prompt">
            {hasPoolForContinue ? m.admission.askSecond : m.admission.noMoreCandidates}
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
                    ? m.admission.notEnoughFunding(m.money(CONTINUE_FUNDING_MIN))
                    : m.admission.recruitSecond}
                </span>
                <span className="modal__option-costs">
                  <span className={`option-cost${!canAffordContinue ? ' option-cost--unaffordable' : ''}`}>
                    ⚡ {CONTINUE_ENERGY_COST}
                  </span>
                </span>
              </button>
            )}
            <button className="modal__option-btn" onClick={onPass}>
              {m.admission.endAdmissions}
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
          {round === 1 ? m.admission.seasonTitle(gameYear) : m.admission.roundTitle(round)}
          <span className="admission-modal__cost-hint">{m.admission.costHint(m.money(admissionCost))}</span>
        </h2>
        <p className="modal__prompt">{m.admission.prompt}</p>

        <div className="admission-candidates">
          {candidateData.map(candidate => {
            if (!candidate) return null;
            const ct = candidateText(candidate);
            return (
              <div key={candidate.id} className="candidate-card">
                <CandidatePortrait studentId={candidate.id} name={ct.fullName} />
                <div className="candidate-card__body">
                  <div className="candidate-card__header">
                    <span className="candidate-card__name">{ct.fullName}</span>
                    <span className="candidate-card__tagline">{ct.tagline}</span>
                  </div>
                  <p className="candidate-card__bio">{ct.bio}</p>
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
                    {canAfford ? m.admission.admit(ct.fullName) : m.admission.notEnoughFunding(m.money(admissionCost))}
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
                  ? m.admission.refreshNoPool
                  : !canAffordRefresh
                    ? m.admission.refreshNoEnergy(REFRESH_ENERGY_COST)
                    : m.admission.refreshHint(REFRESH_ENERGY_COST)
              }
            >
              {m.admission.refresh} ⚡{REFRESH_ENERGY_COST}
            </button>
          )}
          {canPass && (
            <button className="btn btn--ghost" onClick={onPass}>
              {m.admission.skipYear}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
