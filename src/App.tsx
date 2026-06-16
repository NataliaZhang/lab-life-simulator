import { useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { StatusBar } from './components/StatusBar';
import { StoryLog } from './components/StoryLog';
import { EventModal } from './components/EventModal';
import { EndingModal } from './components/EndingModal';
import { AdmissionModal } from './components/AdmissionModal';
import { StudentList } from './components/StudentList';
import { ProjectsPanel } from './components/ProjectsPanel';
import { events } from './data/events';

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
    newGame,
    deleteSaveAndRestart,
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
    setFontSize(prev => {
      const next = Math.max(11, Math.min(20, prev + delta));
      localStorage.setItem('lab-font-size', String(next));
      document.documentElement.style.setProperty('--content-font-size', `${next}px`);
      return next;
    });
  };

  const isGameOver = state.phase !== 'playing';
  const endingEvent = state.endingEventId ? events[state.endingEventId] : null;

  return (
    <div className="app">
      <StatusBar
        state={state}
        studentPanelOpen={studentPanelOpen}
        onToggleStudentPanel={() => {
          setStudentPanelOpen(o => !o);
          setProjectPanelOpen(false);
        }}
        projectPanelOpen={projectPanelOpen}
        onToggleProjectPanel={() => {
          setProjectPanelOpen(o => !o);
          setStudentPanelOpen(false);
        }}
      />

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

      {projectPanelOpen && (
        <ProjectsPanel
          state={state}
          dispatch={dispatch}
          onClose={() => setProjectPanelOpen(false)}
        />
      )}

      {isGameOver && endingEvent && (
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
          onChoose={chooseOption}
        />
      )}

      {state.admissionState && !isGameOver && (
        <AdmissionModal
          admissionState={state.admissionState}
          lab={state.lab}
          gameYear={state.time.year}
          onAdmit={admitStudent}
          onPass={passAdmission}
          onContinue={continueRecruiting}
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
        <button className="btn btn--ghost btn--sm" onClick={deleteSaveAndRestart}>
          重置游戏
        </button>
      </footer>
    </div>
  );
}
