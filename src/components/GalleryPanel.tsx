import { useMemo, useRef, useState } from 'react';
import type { GalleryData, GalleryImportResult } from '../engine/gallery';
import { encodeGalleryCode } from '../engine/gallery';
import { allCandidates } from '../data/studentPool';
import { portraitUrl, coloredPortraitUrl, silhouettePortraitUrl } from '../data/studentArt';
import { projectById } from '../data/projects';
import { achievements } from '../data/achievements';
import { audioManager } from '../engine/audioManager';
import { events } from '../data/events';
import { useI18n } from '../i18n/I18nProvider';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

type GalleryTab = 'endings' | 'characters' | 'projects' | 'achievements' | 'backup';

interface Props {
  gallery: GalleryData;
  onImport: (code: string) => GalleryImportResult;
  onClose: () => void;
}

export function GalleryPanel({ gallery, onImport, onClose }: Props) {
  const [tab, setTab] = useState<GalleryTab>('endings');
  const { m } = useI18n();

  const switchTab = (next: GalleryTab) => {
    audioManager.playSfx('click');
    setTab(next);
  };

  return (
    <div className="gallery-panel">
      <div className="gallery-panel__header">
        <div className="gallery-panel__tabs">
          <button
            className={`gallery-tab-btn${tab === 'endings' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('endings')}
          >
            {m.gallery.tabEndings}
          </button>
          <button
            className={`gallery-tab-btn${tab === 'characters' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('characters')}
          >
            {m.gallery.tabCharacters}
          </button>
          <button
            className={`gallery-tab-btn${tab === 'projects' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('projects')}
          >
            {m.gallery.tabProjects}
          </button>
          <button
            className={`gallery-tab-btn${tab === 'achievements' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('achievements')}
          >
            {m.gallery.tabAchievements}
          </button>
          <button
            className={`gallery-tab-btn${tab === 'backup' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('backup')}
          >
            {m.gallery.tabBackup}
          </button>
        </div>
        <button
          className="btn btn--ghost btn--sm gallery-panel__close"
          onClick={onClose}
          aria-label={m.gallery.closeAria}
        >
          {m.gallery.close}
        </button>
      </div>

      <div className="gallery-panel__body">
        {tab === 'endings' && <EndingsTab gallery={gallery} />}
        {tab === 'characters' && <CharactersTab gallery={gallery} />}
        {tab === 'projects' && <ProjectsTab gallery={gallery} />}
        {tab === 'achievements' && <AchievementsTab gallery={gallery} />}
        {tab === 'backup' && <BackupTab gallery={gallery} onImport={onImport} />}
      </div>
    </div>
  );
}

// ─── Endings tab ───────────────────────────────────────────────────────────

// Renders [text, number, text, number, …] with the numbers highlighted.
function StatLine({ parts }: { parts: readonly string[] }) {
  return (
    <p className="gallery-section-stat">
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="gallery-section-stat__num">{part}</span>
          : <span key={i}>{part}</span>,
      )}
    </p>
  );
}

function EndingsTab({ gallery }: { gallery: GalleryData }) {
  const { m, event } = useI18n();
  if (gallery.endingsSeen.length === 0) {
    return (
      <div className="gallery-empty">
        <p>{m.gallery.endingsEmpty}</p>
        <p className="gallery-empty__hint">{m.gallery.endingsEmptyHint}</p>
      </div>
    );
  }

  return (
    <>
      <StatLine parts={m.gallery.endingsStat(gallery.endingsSeen.length)} />
      <div className="gallery-endings-grid">
        {gallery.endingsSeen.map(ending => {
          // Records store the text from when the ending was reached; prefer the
          // current-language event text when the event still exists.
          const source = events[ending.eventId];
          const localized = source ? event(source) : undefined;
          return (
            <div key={ending.eventId} className="gallery-ending-card">
              <div className="gallery-ending-card__title">{localized?.title ?? ending.title}</div>
              <div className="gallery-ending-card__tagline">{localized?.tagline ?? ending.tagline}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Characters tab ────────────────────────────────────────────────────────

function CharactersTab({ gallery }: { gallery: GalleryData }) {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const { m, candidate: candidateText } = useI18n();

  const seenIds = new Set(gallery.studentsSeen);
  const unseenCandidates = allCandidates.filter(c => !seenIds.has(c.id));

  return (
    <>
      <StatLine parts={m.gallery.charactersStat(gallery.studentsSeen.length)} />
      <div className="gallery-characters-grid">
        {/* Recruited characters — full display */}
        {gallery.studentsSeen.map(studentId => {
          const source = allCandidates.find(c => c.id === studentId);
          if (!source) return null;
          const candidate = candidateText(source);
          const maxFavorUnlocked = gallery.studentsMaxFavor.includes(studentId);
          const colored = maxFavorUnlocked ? coloredPortraitUrl(studentId) : '';
          const portrait = colored || portraitUrl(studentId);
          const isFlipped = flippedId === studentId;

          const handleClick = () => {
            if (!maxFavorUnlocked) return;
            audioManager.playSfx('continue');
            setFlippedId(isFlipped ? null : studentId);
          };

          return (
            <div
              key={studentId}
              className={`gallery-char-card${maxFavorUnlocked ? ' gallery-char-card--colored' : ''}${isFlipped ? ' gallery-char-card--flipped' : ''}`}
              onClick={handleClick}
              style={maxFavorUnlocked ? { cursor: 'pointer' } : undefined}
            >
              <div className="gallery-char-card__inner">
                <div className="gallery-char-card__front">
                  <div className="gallery-char-card__portrait-frame">
                    {portrait ? (
                      <img
                        className="gallery-char-card__portrait"
                        src={portrait}
                        alt={candidate.name}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="gallery-char-card__portrait-placeholder">
                        {candidate.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="gallery-char-card__body">
                    <div className="gallery-char-card__name">{candidate.name}</div>
                    <div className="gallery-char-card__tagline">{candidate.tagline}</div>
                  </div>
                </div>
                {maxFavorUnlocked && (
                  <div className="gallery-char-card__back">
                    <div className="gallery-char-card__back-name">{candidate.name}</div>
                    {(candidate.farewell ?? '').split('\n\n').map((para, i) => (
                      <p key={i} className="gallery-char-card__farewell">{para}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Unrecruited characters — silhouette with hidden identity */}
        {unseenCandidates.map(candidate => {
          const silhouette = silhouettePortraitUrl(candidate.id);
          return (
            <div key={candidate.id} className="gallery-char-card gallery-char-card--unknown">
              <div className="gallery-char-card__inner">
                <div className="gallery-char-card__front">
                  <div className="gallery-char-card__portrait-frame">
                    {silhouette ? (
                      <img
                        className="gallery-char-card__portrait"
                        src={silhouette}
                        alt={m.gallery.unknownCharacter}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="gallery-char-card__portrait-placeholder">{m.gallery.unknownPortrait}</div>
                    )}
                  </div>
                  <div className="gallery-char-card__body">
                    <div className="gallery-char-card__name gallery-char-card__name--unknown">{m.gallery.unknownName}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Projects tab ──────────────────────────────────────────────────────────

function ProjectsTab({ gallery }: { gallery: GalleryData }) {
  const { m, project } = useI18n();
  if (gallery.projectsStarted.length === 0) {
    return (
      <div className="gallery-empty">
        <p>{m.gallery.projectsEmpty}</p>
        <p className="gallery-empty__hint">{m.gallery.projectsEmptyHint}</p>
      </div>
    );
  }

  const GRADE_RANK: Record<string, number> = { S: 3, A: 2, B: 1, C: 0 };
  const byGradeDesc = (a: string, b: string) => {
    const da = projectById[a], db = projectById[b];
    return (GRADE_RANK[db?.grade ?? 'C'] ?? 0) - (GRADE_RANK[da?.grade ?? 'C'] ?? 0);
  };

  const completed = gallery.projectsStarted
    .filter(id => gallery.projectsCompleted.includes(id))
    .sort(byGradeDesc);
  const incomplete = gallery.projectsStarted
    .filter(id => !gallery.projectsCompleted.includes(id))
    .sort(byGradeDesc);

  return (
    <>
      <StatLine parts={m.gallery.projectsStat(gallery.projectsStarted.length, completed.length)} />

      {completed.length > 0 && (
        <div className="gallery-projects-section">
          <h3 className="gallery-projects-section__heading">{m.gallery.completed}</h3>
          <div className="gallery-projects-list">
            {completed.map(id => {
              const def = projectById[id];
              if (!def) return null;
              return (
                <div key={id} className="gallery-project-card gallery-project-card--completed">
                  <div className="gallery-project-card__header">
                    <span className={`gallery-project-card__grade gallery-project-card__grade--${def.grade.toLowerCase()}`}>{def.grade}</span>
                    <span className="gallery-project-card__name">{project(def).name}</span>
                  </div>
                  <p className="gallery-project-card__desc">{project(def).description}</p>
                  <p className="gallery-project-card__result">{project(def).completionSummary}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {incomplete.length > 0 && (
        <div className="gallery-projects-section">
          <h3 className="gallery-projects-section__heading">{m.gallery.incomplete}</h3>
          <div className="gallery-projects-list">
            {incomplete.map(id => {
              const def = projectById[id];
              if (!def) return null;
              return (
                <div key={id} className="gallery-project-card">
                  <div className="gallery-project-card__header">
                    <span className={`gallery-project-card__grade gallery-project-card__grade--${def.grade.toLowerCase()}`}>{def.grade}</span>
                    <span className="gallery-project-card__name">{project(def).name}</span>
                  </div>
                  <p className="gallery-project-card__desc">{project(def).description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Achievements tab ──────────────────────────────────────────────────────

function AchievementsTab({ gallery }: { gallery: GalleryData }) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const { m, achievement } = useI18n();
  const unlockedCount = achievements.filter(a => gallery.achievementsUnlocked.includes(a.id)).length;

  // Unlocked achievements first, then locked — stable within each group (data-file order).
  const orderedAchievements = [...achievements].sort((a, b) => {
    const aUnlocked = gallery.achievementsUnlocked.includes(a.id);
    const bUnlocked = gallery.achievementsUnlocked.includes(b.id);
    return aUnlocked === bUnlocked ? 0 : aUnlocked ? -1 : 1;
  });

  return (
    <>
      <StatLine parts={m.gallery.achievementsStat(unlockedCount, achievements.length)} />
      <div className="gallery-achievements-list">
        {orderedAchievements.map(a => {
          const unlocked = gallery.achievementsUnlocked.includes(a.id);
          const text = achievement(a);
          return (
            <div
              key={a.id}
              className={`gallery-achievement-card${unlocked ? '' : ' gallery-achievement-card--locked'}`}
            >
              <div
                className="gallery-achievement-card__image-frame"
                onClick={() => {
                  if (!unlocked) return;
                  audioManager.playSfx('click');
                  setEnlargedImage(`${BASE}/${a.image}`);
                }}
                style={unlocked ? { cursor: 'pointer' } : undefined}
              >
                {unlocked ? (
                  <img
                    className="gallery-achievement-card__image"
                    src={`${BASE}/${a.image}`}
                    alt={text.title}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="gallery-achievement-card__image-placeholder">🔒</div>
                )}
              </div>
              <div className="gallery-achievement-card__body">
                <div className={`gallery-achievement-card__title${unlocked ? '' : ' gallery-achievement-card__title--locked'}`}>
                  {text.title}
                </div>
                <div className="gallery-achievement-card__criteria">{unlocked ? text.criteria : m.gallery.lockedCriteria}</div>
              </div>
            </div>
          );
        })}
      </div>

      {enlargedImage && (
        <div
          className="achievement-image-overlay"
          onClick={() => setEnlargedImage(null)}
        >
          <img className="achievement-image-overlay__img" src={enlargedImage} alt="" />
        </div>
      )}
    </>
  );
}

// ─── Backup tab ────────────────────────────────────────────────────────────

// Export / import of the gallery as a plain-text backup code (see engine/gallery.ts).
function BackupTab({ gallery, onImport }: { gallery: GalleryData; onImport: (code: string) => GalleryImportResult }) {
  const { m } = useI18n();
  const exportCode = useMemo(() => encodeGalleryCode(gallery), [gallery]);
  const exportRef = useRef<HTMLTextAreaElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [importText, setImportText] = useState('');
  const [importResult, setImportResult] = useState<GalleryImportResult | null>(null);

  const handleCopy = async () => {
    audioManager.playSfx('click');
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopyStatus('copied');
    } catch {
      // The clipboard API is missing in some in-app browsers and on plain http;
      // select the text so the player can copy it by hand.
      exportRef.current?.select();
      setCopyStatus('failed');
    }
  };

  const handleImport = () => {
    audioManager.playSfx('click');
    const result = onImport(importText);
    setImportResult(result);
    if (result !== 'invalid') setImportText('');
  };

  return (
    <div className="gallery-backup">
      <p className="gallery-backup__intro">{m.gallery.backupIntro}</p>

      <section className="gallery-backup__section">
        <h3 className="gallery-projects-section__heading">{m.gallery.exportHeading}</h3>
        <p className="gallery-backup__hint">{m.gallery.exportHint}</p>
        <textarea
          ref={exportRef}
          className="gallery-backup__code"
          value={exportCode}
          readOnly
          rows={4}
          aria-label={m.gallery.exportHeading}
          onFocus={e => e.currentTarget.select()}
        />
        <div className="gallery-backup__actions">
          <button className="btn btn--primary btn--sm" onClick={handleCopy}>
            {m.gallery.copyCode}
          </button>
          {copyStatus !== 'idle' && (
            <span className={`gallery-backup__status${copyStatus === 'failed' ? ' gallery-backup__status--error' : ''}`}>
              {copyStatus === 'copied' ? m.gallery.copied : m.gallery.copyFailed}
            </span>
          )}
        </div>
      </section>

      <section className="gallery-backup__section">
        <h3 className="gallery-projects-section__heading">{m.gallery.importHeading}</h3>
        <p className="gallery-backup__hint">{m.gallery.importHint}</p>
        <textarea
          className="gallery-backup__code"
          value={importText}
          rows={4}
          placeholder={m.gallery.importPlaceholder}
          aria-label={m.gallery.importHeading}
          onChange={e => { setImportText(e.target.value); setImportResult(null); }}
        />
        <div className="gallery-backup__actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={handleImport}
            disabled={importText.trim() === ''}
          >
            {m.gallery.importButton}
          </button>
          {importResult && (
            <span className={`gallery-backup__status${importResult === 'invalid' ? ' gallery-backup__status--error' : ''}`}>
              {m.gallery.importResult[importResult]}
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
