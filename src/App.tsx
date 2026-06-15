import { useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { StatusBar } from './components/StatusBar';
import { StoryLog } from './components/StoryLog';
import { EventModal } from './components/EventModal';
import { AdmissionModal } from './components/AdmissionModal';
import { StudentList } from './components/StudentList';

export function App() {
  const {
    state,
    activeEvent,
    boundStudentName,
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

  const isGameOver = state.phase !== 'playing';

  return (
    <div className="app">
      <StatusBar
        state={state}
        studentPanelOpen={studentPanelOpen}
        onToggleStudentPanel={() => setStudentPanelOpen(o => !o)}
      />

      <div className={`app__body${studentPanelOpen ? ' app__body--panel-open' : ''}`}>
        <main className="main-pane">
          <StoryLog log={state.storyLog} />
        </main>

        {studentPanelOpen && (
          <StudentList
            students={state.students}
            onAdvanceMonth={handleContinue}
            canAdvanceMonth={canContinue}
            onNewGame={newGame}
            isGameOver={isGameOver}
          />
        )}
      </div>

      {!studentPanelOpen && (
        <div className="bottom-bar">
          {isGameOver ? (
            <button className="btn btn--primary btn--bottom" onClick={newGame}>
              重新开始
            </button>
          ) : (
            <button
              className="btn btn--primary btn--bottom"
              onClick={handleContinue}
              disabled={!canContinue}
              title={canContinue ? '' : '请先做出选择'}
            >
              继续
            </button>
          )}
        </div>
      )}

      {activeEvent && modalVisible && !isGameOver && (
        <EventModal
          event={activeEvent}
          lab={state.lab}
          boundStudentName={boundStudentName}
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
        <button className="btn btn--ghost btn--sm" onClick={deleteSaveAndRestart}>
          重置游戏
        </button>
      </footer>
    </div>
  );
}
