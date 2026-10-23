import type { GameState, LogEntry, LocalizedText, StatChange } from '../types';
import { sameText } from '../i18n/locale';

const SAVE_KEY = 'lab-life-simulator-save';
const SAVE_VERSION = 11; // bumped for deferredEvents field addition

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

// Saves made before localization stored log text as plain (Chinese) strings.
// Wrap them so the renderer can treat every entry uniformly; they show the same
// text in every language since there is no way to recover a translation.
type LegacyText = LocalizedText | string;
type LegacyLogEntry = Omit<LogEntry, 'title' | 'narrative' | 'choiceText' | 'narrativeAfterImage' | 'statChanges'> & {
  title: LegacyText;
  narrative: LegacyText;
  choiceText?: LegacyText;
  narrativeAfterImage?: LegacyText;
  statChanges?: Array<Omit<StatChange, 'label'> & { label: LegacyText }>;
};

const upgrade = (t: LegacyText): LocalizedText => (typeof t === 'string' ? sameText(t) : t);

function upgradeLegacyText(state: GameState): GameState {
  const log = state.storyLog as unknown as LegacyLogEntry[];
  const slides = (state.pendingSummarySlides ?? []) as unknown as LegacyText[];
  return {
    ...state,
    storyLog: log.map(e => ({
      ...e,
      title: upgrade(e.title),
      narrative: upgrade(e.narrative),
      choiceText: e.choiceText === undefined ? undefined : upgrade(e.choiceText),
      narrativeAfterImage: e.narrativeAfterImage === undefined ? undefined : upgrade(e.narrativeAfterImage),
      statChanges: e.statChanges?.map(c => ({ ...c, label: upgrade(c.label) })),
    })),
    pendingSummarySlides: slides.map(upgrade),
  };
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
    return upgradeLegacyText(file.state);
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
