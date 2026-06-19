import { useState, useEffect, useRef } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { useAudioTriggers } from './hooks/useAudioTriggers';
import { audioManager } from './engine/audioManager';
import { StatusBar } from './components/StatusBar';
import { StoryLog } from './components/StoryLog';
import { EventModal } from './components/EventModal';
import { EndingModal } from './components/EndingModal';
import { AdmissionModal } from './components/AdmissionModal';
import { StudentList } from './components/StudentList';
import { ProjectsPanel } from './components/ProjectsPanel';
import { events } from './data/events';

// ─── Audio controls panel ─────────────────────────────────────────────────────

function AudioControls() {
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
        title="音频设置"
        aria-label="音频设置"
      >
        {icon}
      </button>
      {expanded && (
        <div className="audio-controls__panel">
          <button
            className={`btn btn--sm audio-controls__mute-btn${muted ? ' audio-controls__mute-btn--active' : ' btn--ghost'}`}
            onClick={handleMuteToggle}
          >
            {muted ? '取消静音' : '静音'}
          </button>
          <label className="audio-controls__row">
            <span className="audio-controls__label">BGM</span>
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
            <span className="audio-controls__label">音效</span>
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

export function App() {
  const {
    state,
    dispatch,
    activeEvent,
    boundStudentName,
    boundStudent2Name,
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

  const [studentPanelOpen, setStudentPanelOpen] = useState(false);
  const [projectPanelOpen, setProjectPanelOpen] = useState(false);

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('lab-font-size');
    const size = saved ? parseInt(saved, 10) : 14;
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
  const endingEvent = state.endingEventId ? events[state.endingEventId] : null;

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

  // Wrap chooseOption to play click SFX before dispatching.
  const handleChoose = (eventId: string, optionId: string) => {
    audioManager.playSfx('make_choice');
    chooseOption(eventId, optionId);
  };

  const isInitialScreen = state.storyLog.length === 0;

  return (
    <div className="app">
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
            onClick={handleContinue}
            disabled={!canContinue}
            title={canContinue ? '' : '请先做出选择'}
          >
            继续
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
            继续
          </button>
        </div>
      )}

      {projectPanelOpen && (
        <ProjectsPanel
          state={state}
          dispatch={dispatch}
          onClose={() => setProjectPanelOpen(false)}
        />
      )}

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
          boundStudentName={boundStudentName}
          boundStudent2Name={boundStudent2Name}
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
          onAdmit={admitStudent}
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
            title="缩小字体"
            aria-label="缩小字体"
          >
            A-
          </button>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => changeFontSize(1)}
            disabled={fontSize >= 20}
            title="放大字体"
            aria-label="放大字体"
          >
            A+
          </button>
        </div>
        <AudioControls />
        <button className="btn btn--ghost btn--sm" onClick={deleteSaveAndRestart}>
          重置游戏
        </button>
      </footer>
    </div>
  );
}
