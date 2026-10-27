import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { useGallery } from './hooks/useGallery';
import { useAudioTriggers } from './hooks/useAudioTriggers';
import { audioManager } from './engine/audioManager';
import { StatusBar } from './components/StatusBar';
import { StoryLog } from './components/StoryLog';
import { EventModal } from './components/EventModal';
import { EndingModal } from './components/EndingModal';
import { AdmissionModal } from './components/AdmissionModal';
import { ConfirmDialog } from './components/ConfirmDialog';
import { StudentList } from './components/StudentList';
import { ProjectsPanel } from './components/ProjectsPanel';
import { GalleryPanel } from './components/GalleryPanel';
import { AchievementToast } from './components/AchievementToast';
import { TutorialOverlay } from './components/TutorialOverlay';
import { events } from './data/events';
import { checkAchievementUnlocks, checkEndingAchievements } from './engine/achievements';
import { getTutorialStep } from './engine/projectTutorial';
import { useI18n } from './i18n/I18nProvider';

// ─── Audio controls panel ─────────────────────────────────────────────────────

function AudioControls() {
  const { m } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [muted,    setMuted]    = useState(() => audioManager.isMuted());
  const [bgmVol,   setBgmVol]   = useState(() => audioManager.getBgmVolume());
  const [sfxVol,   setSfxVol]   = useState(() => audioManager.getSfxVolume());

  const handleMuteToggle = () => {
    const next = !muted;
    setMuted(next);
    audioManager.setMuted(next);
  };

  const handleBgmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setBgmVol(v);
    audioManager.setBgmVolume(v);
  };

  const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setSfxVol(v);
    audioManager.setSfxVolume(v);
  };

  const icon = muted ? '🔇' : bgmVol < 0.3 ? '🔈' : '🔉';

  return (
    <div className="audio-controls">
      <button
        className="btn btn--ghost btn--sm audio-controls__icon"
        onClick={() => setExpanded(o => !o)}
        title={m.app.audioSettings}
        aria-label={m.app.audioSettings}
      >
        {icon}
      </button>
      {expanded && (
        <div className="audio-controls__panel">
          <button
            className={`btn btn--sm audio-controls__mute-btn${muted ? ' audio-controls__mute-btn--active' : ' btn--ghost'}`}
            onClick={handleMuteToggle}
          >
            {muted ? m.app.unmute : m.app.mute}
          </button>
          <label className="audio-controls__row">
            <span className="audio-controls__label">{m.app.bgm}</span>
            <input
              className="audio-controls__slider"
              type="range"
              min="0" max="1" step="0.05"
              value={bgmVol}
              onChange={handleBgmChange}
              disabled={muted}
            />
          </label>
          <label className="audio-controls__row">
            <span className="audio-controls__label">{m.app.sfx}</span>
            <input
              className="audio-controls__slider"
              type="range"
              min="0" max="1" step="0.05"
              value={sfxVol}
              onChange={handleSfxChange}
              disabled={muted}
            />
          </label>
        </div>
      )}
    </div>
  );
}

// Toggles between the two languages. The label is always written in the
// language you would switch *to*, so each reader can find it.
function LanguageToggle() {
  const { locale, setLocale, m } = useI18n();
  return (
    <button
      className="btn btn--ghost btn--sm"
      onClick={() => { audioManager.playSfx('click'); setLocale(locale === 'zh' ? 'en' : 'zh'); }}
      title={m.app.switchLanguageTitle}
      aria-label={m.app.switchLanguageTitle}
      lang={locale === 'zh' ? 'en' : 'zh'}
    >
      {m.app.switchLanguage}
    </button>
  );
}

export function App() {
  const { m, event: localizeEvent } = useI18n();
  const {
    state,
    dispatch,
    activeEvent,
    modalVisible,
    canContinue,
    chooseOption,
    handleContinue,
    admitStudent,
    passAdmission,
    continueRecruiting,
    refreshCandidates,
    newGame,
    deleteSaveAndRestart,
    closeModal,
  } = useGameEngine();

  const {
    gallery,
    recordEnding,
    recordStudent,
    recordMaxFavor,
    recordProjectStarted,
    recordProjectCompleted,
    recordAchievement,
    importCode,
    isSyncedAchievement,
  } = useGallery();

  const [studentPanelOpen, setStudentPanelOpen] = useState(false);
  const [projectPanelOpen, setProjectPanelOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Queue of newly unlocked achievement IDs pending their top-of-screen banner.
  // Diffing against gallery.achievementsUnlocked (rather than enqueuing inline where it's
  // recorded) keeps this correct even under React StrictMode's double-invoked updaters,
  // and naturally skips achievements already unlocked in a prior run/session.
  // Achievements synced from another tab or an imported backup code are skipped too.
  const [achievementToastQueue, setAchievementToastQueue] = useState<string[]>([]);
  const prevAchievementsRef = useRef<string[]>(gallery.achievementsUnlocked);
  useEffect(() => {
    const prev = prevAchievementsRef.current;
    const newlyUnlocked = gallery.achievementsUnlocked.filter(
      id => !prev.includes(id) && !isSyncedAchievement(id),
    );
    if (newlyUnlocked.length > 0) {
      setAchievementToastQueue(q => [...q, ...newlyUnlocked]);
      audioManager.playSfx('achievement');
    }
    prevAchievementsRef.current = gallery.achievementsUnlocked;
  }, [gallery.achievementsUnlocked, isSyncedAchievement]);

  // Must keep a stable identity: AchievementToast restarts its timer whenever onDone
  // changes, so an inline arrow would reset it on every App render (every click) and
  // leave the faded-out banner mounted, blocking the rest of the queue.
  const dismissAchievementToast = useCallback(() => setAchievementToastQueue(q => q.slice(1)), []);

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('lab-font-size');
    const size = saved ? parseInt(saved, 10) : 17;
    document.documentElement.style.setProperty('--content-font-size', `${size}px`);
    return size;
  });

  const changeFontSize = (delta: number) => {
    audioManager.playSfx('click');
    setFontSize(prev => {
      const next = Math.max(11, Math.min(20, prev + delta));
      localStorage.setItem('lab-font-size', String(next));
      document.documentElement.style.setProperty('--content-font-size', `${next}px`);
      return next;
    });
  };

  // Fire BGM and SFX based on state changes.
  useAudioTriggers(state);

  const isGameOver = state.phase !== 'playing';
  const endingSource = state.endingEventId ? events[state.endingEventId] : null;
  const endingEvent = endingSource ? localizeEvent(endingSource) : null;

  // Defer EndingModal until the player explicitly clicks through after game-over.
  // Initialise to true when loading a save that's already finished (so modal shows immediately).
  const [endingConfirmed, setEndingConfirmed] = useState(() => state.phase !== 'playing');
  const prevIsGameOver = useRef(state.phase !== 'playing');
  useEffect(() => {
    if (isGameOver && !prevIsGameOver.current) {
      // Just transitioned to game-over this render — let player read narrative first.
      setEndingConfirmed(false);
    }
    prevIsGameOver.current = isGameOver;
  }, [isGameOver]);

  // Record ending to gallery on transition to game-over (deduplicates by eventId).
  useEffect(() => {
    if (isGameOver && state.endingEventId && endingEvent) {
      recordEnding({
        eventId: state.endingEventId,
        title: endingEvent.title,
        tagline: endingEvent.tagline ?? '',
      });
    }
  // recordEnding is stable (useCallback with no deps); endingEvent is derived from state.endingEventId.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, state.endingEventId]);

  // Unlock the tenure/bad-ending achievements on transition into any winning/gameover ending.
  // recordAchievement is stable and self-dedupes, so re-running while phase stays put is harmless.
  useEffect(() => {
    checkEndingAchievements(state.phase, state.endingEventId).forEach(recordAchievement);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.endingEventId]);

  // Wrap dispatch to intercept START_PROJECT for gallery tracking.
  const galleryDispatch: typeof dispatch = useCallback((action) => {
    if (action.type === 'START_PROJECT') {
      recordProjectStarted(action.projectId);
    }
    dispatch(action);
  }, [dispatch, recordProjectStarted]);

  // Wrap admitStudent to also record the student in the gallery.
  const handleAdmitStudent = (candidateId: string) => {
    admitStudent(candidateId);
    recordStudent(candidateId);
  };

  // Wrap chooseOption to play click SFX before dispatching.
  // Also records max_favor events (colored portraits) and project completions in the gallery.
  const handleChoose = (eventId: string, optionId: string) => {
    audioManager.playSfx('make_choice');
    chooseOption(eventId, optionId);
    if (eventId.startsWith('max_favor_')) {
      recordMaxFavor(eventId.slice('max_favor_'.length));
    }
    if (eventId.startsWith('project_complete_') && optionId === 'archive') {
      // Extract project ID: strip prefix and optional _pi suffix.
      const raw = eventId.slice('project_complete_'.length);
      const projectId = raw.endsWith('_pi') ? raw.slice(0, -3) : raw;
      recordProjectCompleted(projectId);
    }
    checkAchievementUnlocks(eventId, optionId, gallery).forEach(recordAchievement);
  };

  const isInitialScreen = state.storyLog.length === 0;

  // First-project tutorial: while a step is showing, only its target can be used.
  // Paused while the gallery or reset dialog is open so it never stacks over them.
  const tutorialStep = galleryOpen || showResetConfirm ? null : getTutorialStep(state, projectPanelOpen);

  return (
    <div className="app">
      {achievementToastQueue.length > 0 && (
        <AchievementToast
          key={achievementToastQueue[0]}
          achievementId={achievementToastQueue[0]}
          onDone={dismissAchievementToast}
        />
      )}
      {!isInitialScreen && (
        <StatusBar
          state={state}
          studentPanelOpen={studentPanelOpen}
          onToggleStudentPanel={() => {
            audioManager.playSfx('click');
            setStudentPanelOpen(o => !o);
            setProjectPanelOpen(false);
          }}
          projectPanelOpen={projectPanelOpen}
          onToggleProjectPanel={() => {
            audioManager.playSfx('click');
            setProjectPanelOpen(o => !o);
            setStudentPanelOpen(false);
          }}
        />
      )}

      <div className={`app__body${studentPanelOpen ? ' app__body--panel-open' : ''}`}>
        <main className="main-pane">
          <StoryLog log={state.storyLog} />
        </main>

        {studentPanelOpen && (
          <StudentList
            students={state.students}
            activeProjects={state.activeProjects}
            completedProjects={state.completedProjects}
            onAdvanceMonth={handleContinue}
            canAdvanceMonth={canContinue}
            isGameOver={isGameOver}
          />
        )}
      </div>

      {!studentPanelOpen && !isGameOver && (
        <div className="bottom-bar">
          <button
            className="btn btn--primary btn--bottom"
            onClick={() => {
              if (isInitialScreen) audioManager.playSfx('start');
              handleContinue();
            }}
            disabled={!canContinue}
            title={canContinue ? '' : m.app.chooseFirst}
          >
            {isInitialScreen ? m.app.start : m.app.continue}
          </button>
        </div>
      )}

      {/* After game-over: let player read the outcome narrative before EndingModal appears */}
      {isGameOver && !endingConfirmed && (
        <div className="bottom-bar">
          <button
            className="btn btn--primary btn--bottom"
            onClick={() => { audioManager.playSfx('click'); setEndingConfirmed(true); }}
          >
            {m.app.continue}
          </button>
        </div>
      )}

      {projectPanelOpen && (
        <ProjectsPanel
          state={state}
          dispatch={galleryDispatch}
          onClose={() => setProjectPanelOpen(false)}
          tutorialStep={tutorialStep}
        />
      )}

      {tutorialStep && <TutorialOverlay step={tutorialStep} />}

      {isGameOver && endingEvent && endingConfirmed && (
        <EndingModal
          endingTitle={endingEvent.title}
          tagline={endingEvent.tagline ?? ''}
          phase={state.phase}
          lab={state.lab}
          students={state.students}
          ideasCollected={state.projectIdeas.length + state.activeProjects.length + state.completedProjects.length}
          projectsStarted={state.activeProjects.length + state.completedProjects.length}
          projectsCompleted={state.completedProjects.length}
          onNewGame={newGame}
        />
      )}

      {activeEvent && modalVisible && !isGameOver && (
        <EventModal
          event={activeEvent}
          lab={state.lab}
          chosenOptionIds={state.chosenOptionIds}
          activeStudentIds={state.students.filter(s => s.status === 'active').map(s => s.id)}
          students={state.students}
          boundStudentId={state.activeBoundStudentId}
          boundStudent2Id={state.activeBoundStudent2Id}
          onChoose={handleChoose}
          onClose={closeModal}
        />
      )}

      {state.admissionState && !isGameOver && (
        <AdmissionModal
          admissionState={state.admissionState}
          lab={state.lab}
          gameYear={state.time.year}
          unshownPoolCount={state.studentPool.filter(
            id => !(state.admissionState?.shownIds ?? []).includes(id),
          ).length}
          onAdmit={handleAdmitStudent}
          onPass={passAdmission}
          onContinue={continueRecruiting}
          onRefresh={refreshCandidates}
        />
      )}

      <footer className="app__footer">
        <div className="font-controls">
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => changeFontSize(-1)}
            disabled={fontSize <= 11}
            title={m.app.fontSmaller}
            aria-label={m.app.fontSmaller}
          >
            A-
          </button>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => changeFontSize(1)}
            disabled={fontSize >= 20}
            title={m.app.fontLarger}
            aria-label={m.app.fontLarger}
          >
            A+
          </button>
        </div>
        <div className="footer-center">
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => { audioManager.playSfx('click'); setGalleryOpen(true); }}
            title={m.app.gallery}
            aria-label={m.app.openGallery}
          >
            {m.app.gallery}
          </button>
          <AudioControls />
          <LanguageToggle />
        </div>
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => { audioManager.playSfx('click'); setShowResetConfirm(true); }}
          disabled={isInitialScreen}
        >
          {m.app.reset}
        </button>
      </footer>

      {showResetConfirm && (
        <ConfirmDialog
          message={m.app.resetConfirm}
          confirmLabel={m.app.resetConfirmLabel}
          cancelLabel={m.app.cancel}
          onConfirm={() => {
            audioManager.playSfx('click');
            setShowResetConfirm(false);
            deleteSaveAndRestart();
          }}
          onCancel={() => { audioManager.playSfx('click'); setShowResetConfirm(false); }}
        />
      )}

      {galleryOpen && (
        <GalleryPanel
          gallery={gallery}
          onImport={importCode}
          onClose={() => { audioManager.playSfx('click'); setGalleryOpen(false); }}
        />
      )}
    </div>
  );
}
