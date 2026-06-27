import { useState } from 'react';
import type { GalleryData } from '../engine/gallery';
import { allCandidates } from '../data/studentPool';
import { portraitUrl, coloredPortraitUrl, silhouettePortraitUrl } from '../data/studentArt';
import { projectById } from '../data/projects';
import { audioManager } from '../engine/audioManager';

type GalleryTab = 'endings' | 'characters' | 'projects';

interface Props {
  gallery: GalleryData;
  onClose: () => void;
}

export function GalleryPanel({ gallery, onClose }: Props) {
  const [tab, setTab] = useState<GalleryTab>('endings');

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
            结局
          </button>
          <button
            className={`gallery-tab-btn${tab === 'characters' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('characters')}
          >
            角色
          </button>
          <button
            className={`gallery-tab-btn${tab === 'projects' ? ' gallery-tab-btn--active' : ''}`}
            onClick={() => switchTab('projects')}
          >
            项目
          </button>
        </div>
        <button
          className="btn btn--ghost btn--sm gallery-panel__close"
          onClick={onClose}
          aria-label="关闭图鉴"
        >
          关闭
        </button>
      </div>

      <div className="gallery-panel__body">
        {tab === 'endings' && <EndingsTab gallery={gallery} />}
        {tab === 'characters' && <CharactersTab gallery={gallery} />}
        {tab === 'projects' && <ProjectsTab gallery={gallery} />}
      </div>
    </div>
  );
}

// ─── Endings tab ───────────────────────────────────────────────────────────

function EndingsTab({ gallery }: { gallery: GalleryData }) {
  if (gallery.endingsSeen.length === 0) {
    return (
      <div className="gallery-empty">
        <p>尚未达成任何结局。</p>
        <p className="gallery-empty__hint">完成一局游戏后，结局将永久记录在此。</p>
      </div>
    );
  }

  return (
    <>
      <p className="gallery-section-stat">
        已达成 <span className="gallery-section-stat__num">{gallery.endingsSeen.length}</span> 个结局
      </p>
      <div className="gallery-endings-grid">
        {gallery.endingsSeen.map(ending => (
          <div key={ending.eventId} className="gallery-ending-card">
            <div className="gallery-ending-card__title">{ending.title}</div>
            <div className="gallery-ending-card__tagline">{ending.tagline}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Characters tab ────────────────────────────────────────────────────────

function CharactersTab({ gallery }: { gallery: GalleryData }) {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const seenIds = new Set(gallery.studentsSeen);
  const unseenCandidates = allCandidates.filter(c => !seenIds.has(c.id));

  return (
    <>
      <p className="gallery-section-stat">
        已收录 <span className="gallery-section-stat__num">{gallery.studentsSeen.length}</span> 位成员
      </p>
      <div className="gallery-characters-grid">
        {/* Recruited characters — full display */}
        {gallery.studentsSeen.map(studentId => {
          const candidate = allCandidates.find(c => c.id === studentId);
          if (!candidate) return null;
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
                        alt="未知角色"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="gallery-char-card__portrait-placeholder">？</div>
                    )}
                  </div>
                  <div className="gallery-char-card__body">
                    <div className="gallery-char-card__name gallery-char-card__name--unknown">？？？</div>
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
  if (gallery.projectsStarted.length === 0) {
    return (
      <div className="gallery-empty">
        <p>尚未立项任何项目。</p>
        <p className="gallery-empty__hint">在游戏中立项后，项目将永久记录在此。</p>
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
      <p className="gallery-section-stat">
        已立项 <span className="gallery-section-stat__num">{gallery.projectsStarted.length}</span> 个项目，完成 <span className="gallery-section-stat__num">{completed.length}</span> 个
      </p>

      {completed.length > 0 && (
        <div className="gallery-projects-section">
          <h3 className="gallery-projects-section__heading">已完成</h3>
          <div className="gallery-projects-list">
            {completed.map(id => {
              const def = projectById[id];
              if (!def) return null;
              return (
                <div key={id} className="gallery-project-card gallery-project-card--completed">
                  <div className="gallery-project-card__header">
                    <span className={`gallery-project-card__grade gallery-project-card__grade--${def.grade.toLowerCase()}`}>{def.grade}</span>
                    <span className="gallery-project-card__name">{def.name}</span>
                  </div>
                  <p className="gallery-project-card__desc">{def.description}</p>
                  <p className="gallery-project-card__result">{def.completionSummary}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {incomplete.length > 0 && (
        <div className="gallery-projects-section">
          <h3 className="gallery-projects-section__heading">未完成</h3>
          <div className="gallery-projects-list">
            {incomplete.map(id => {
              const def = projectById[id];
              if (!def) return null;
              return (
                <div key={id} className="gallery-project-card">
                  <div className="gallery-project-card__header">
                    <span className={`gallery-project-card__grade gallery-project-card__grade--${def.grade.toLowerCase()}`}>{def.grade}</span>
                    <span className="gallery-project-card__name">{def.name}</span>
                  </div>
                  <p className="gallery-project-card__desc">{def.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
