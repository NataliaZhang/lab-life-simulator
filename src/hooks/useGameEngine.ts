import { useReducer, useEffect, useCallback, useState } from 'react';
import type { GameState, GameEvent } from '../types';
import { gameReducer, createInitialState } from '../engine/gameState';
import { getEvent } from '../engine/eventQueue';
import { saveGame, loadGame } from '../engine/saveLoad';

export interface GameEngine {
  state: GameState;
  activeEvent: GameEvent | null;
  boundStudentName: string | undefined;
  modalVisible: boolean;
  canContinue: boolean;
  chooseOption: (eventId: string, optionId: string) => void;
  handleContinue: () => void;
  admitStudent: (candidateId: string) => void;
  passAdmission: () => void;
  continueRecruiting: () => void;
  newGame: () => void;
  loadSave: () => boolean;
  deleteSaveAndRestart: () => void;
}

export function useGameEngine(): GameEngine {
  const [state, dispatch] = useReducer(gameReducer, null, () => {
    const saved = loadGame();
    return saved ?? createInitialState();
  });

  // Controls whether the choice popup is visible.
  // Flow: PRESENT_EVENT logs description → user clicks 继续 → setModalVisible(true) → modal shows.
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    saveGame(state);
  }, [state]);

  const activeEvent: GameEvent | null =
    state.activeEventId ? getEvent(state.activeEventId) : null;

  const boundStudentName: string | undefined = state.activeBoundStudentId
    ? state.students.find(s => s.id === state.activeBoundStudentId)?.name
    : undefined;

  const boundStudent2Name: string | undefined = state.activeBoundStudent2Id
    ? state.students.find(s => s.id === state.activeBoundStudent2Id)?.name
    : undefined;

  // Button is available whenever there's no open modal and no admission pending
  const canContinue = state.phase === 'playing' && !modalVisible && state.admissionState === null;

  const chooseOption = useCallback(
    (eventId: string, optionId: string) => {
      setModalVisible(false);
      dispatch({ type: 'CHOOSE_OPTION', eventId, optionId });
    },
    [],
  );

  const handleContinue = useCallback(() => {
    if (modalVisible) return;

    if (state.activeEventId) {
      const event = getEvent(state.activeEventId);
      if (state.activeParagraphIndex < event.description.length - 1) {
        // More paragraphs to reveal
        dispatch({ type: 'NEXT_PARAGRAPH' });
      } else {
        // All paragraphs shown; open the choice popup
        setModalVisible(true);
      }
      return;
    }

    if (state.eventQueue.length > 0) {
      dispatch({ type: 'PRESENT_EVENT' });
    } else {
      dispatch({ type: 'ADVANCE_MONTH' });
    }
  }, [state.activeEventId, state.activeParagraphIndex, state.eventQueue.length, modalVisible]);

  const admitStudent = useCallback((candidateId: string) => {
    dispatch({ type: 'ADMIT_STUDENT', candidateId });
  }, []);

  const passAdmission = useCallback(() => {
    dispatch({ type: 'PASS_ADMISSION' });
  }, []);

  const continueRecruiting = useCallback(() => {
    dispatch({ type: 'CONTINUE_RECRUITING' });
  }, []);

  const newGame = useCallback(() => {
    setModalVisible(false);
    dispatch({ type: 'NEW_GAME' });
  }, []);

  const loadSave = useCallback((): boolean => {
    const saved = loadGame();
    if (!saved) return false;
    setModalVisible(false);
    dispatch({ type: 'LOAD_SAVE', state: saved });
    return true;
  }, []);

  const deleteSaveAndRestart = useCallback(() => {
    localStorage.removeItem('lab-life-simulator-save');
    setModalVisible(false);
    dispatch({ type: 'NEW_GAME' });
  }, []);

  return {
    state,
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
    loadSave,
    deleteSaveAndRestart,
  };
}
