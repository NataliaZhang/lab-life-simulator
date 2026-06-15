import type { GameState } from '../types';

const SAVE_KEY = 'lab-life-simulator-save';
const SAVE_VERSION = 4;

interface SaveFile {
  version: number;
  savedAt: string;
  state: GameState;
}

export function saveGame(state: GameState): void {
  const file: SaveFile = {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    state,
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(file));
  } catch {
    console.warn('Failed to save game state to localStorage.');
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const file: SaveFile = JSON.parse(raw) as SaveFile;
    if (file.version !== SAVE_VERSION) {
      console.warn('Save file version mismatch — starting fresh.');
      return null;
    }
    return file.state;
  } catch {
    console.warn('Failed to parse save file — starting fresh.');
    return null;
  }
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY);
}

export function hasSave(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}
