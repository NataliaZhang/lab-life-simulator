// ─── Time ──────────────────────────────────────────────────────────────────

export interface GameTime {
  year: number;  // 1–6
  month: number; // 1–12
}

export function timeToMonths(t: GameTime): number {
  return (t.year - 1) * 12 + (t.month - 1);
}

export function formatTime(t: GameTime): string {
  return `第 ${t.year} 年 ${t.month} 月`;
}

// ─── Students ──────────────────────────────────────────────────────────────

export interface StudentSkills {
  theory: number;      // 20–80 initial; theoretical ability
  engineering: number; // 20–80 initial; implementation ability
  social: number;      // 20–80 initial; collaboration / communication
}

export type StudentStatus = 'active' | 'graduated' | 'left';

export interface Student {
  id: string;
  name: string;
  year: number;            // current PhD year (increments each September)
  enrolledAt: number;      // game year when admitted (for display)
  skills: StudentSkills;
  favor: number;           // 0+; ≤40 complaints, ≤20 transfer risk, ≤0 quits
  happiness: number;       // 0+; <30 complaints, <15 high stress, 0 crisis event
  projectProgress: number; // 0–100
  status: StudentStatus;
  traitIds: string[];      // trait IDs applied on admission
}

// ─── Lab ───────────────────────────────────────────────────────────────────

export type LabStatKey = 'funding' | 'reputation' | 'energy';

export interface LabStats {
  funding: number;    // 万元, 0+, no upper cap
  reputation: number; // 0+, no upper cap
  energy: number;     // 0–100, resets to 100 each month
}

// ─── Effects ───────────────────────────────────────────────────────────────

export type StudentStatKey =
  | 'favor'
  | 'happiness'
  | 'projectProgress'
  | 'skills.theory'
  | 'skills.engineering'
  | 'skills.social';

export type StateEffect =
  | { type: 'lab'; stat: LabStatKey; delta: number }
  | { type: 'student'; studentId: string; stat: StudentStatKey; delta: number }
  | { type: 'allStudents'; stat: StudentStatKey; delta: number }
  | { type: 'randomStudent'; stat: StudentStatKey; delta: number }
  | { type: 'randomStudent2'; stat: StudentStatKey; delta: number } // targets the second bound student
  | { type: 'graduateStudent' }   // marks the bound student as graduated
  | { type: 'extendGraduation' }  // records one extension for bound student (handled in reducer)
  | { type: 'leaveStudent' };     // marks the bound student as left

// ─── Conditions ────────────────────────────────────────────────────────────

export type ConditionOp = '>=' | '<=' | '>' | '<' | '==';

export type EventCondition =
  | { type: 'lab'; stat: LabStatKey; op: ConditionOp; value: number }
  | { type: 'student'; studentId: string; stat: StudentStatKey; op: ConditionOp; value: number }
  | { type: 'anyStudent'; stat: StudentStatKey; op: ConditionOp; value: number }
  | { type: 'minStudentCount'; value: number }  // event only triggers when ≥ N students are active
  | { type: 'time'; field: 'year' | 'month'; op: ConditionOp; value: number }; // year/month gate

// ─── Events ────────────────────────────────────────────────────────────────

export interface WeightedOutcome {
  weight: number;
  narrative: string;
  effects?: StateEffect[];
  nextEventIds?: string[];
  conditions?: EventCondition[]; // outcome eligible only if ALL conditions met
  phaseChange?: GamePhase;       // if set, transitions game phase after this outcome resolves
}

export interface EventOption {
  id: string;
  text: string;
  fundingCost?: number; // 万元; option disabled if lab.funding < fundingCost
  energyCost?: number;  // option disabled if lab.energy < energyCost
  outcomes: WeightedOutcome[];
}

export interface GameEvent {
  id: string;
  title: string;
  prompt: string;            // One-sentence popup (e.g. "…你选择：")
  description: string[];     // Paragraphs revealed one per click before the choice modal
  options: EventOption[];
  tags?: string[];
  triggerConditions?: EventCondition[]; // event enters queue only if ALL conditions met
}

// ─── Story Log ─────────────────────────────────────────────────────────────

// 'event-intro' — description logged when event is presented
// 'event'       — choice + outcome logged after player chooses
export type LogEntryType = 'event-intro' | 'event' | 'monthly' | 'system';

export interface StatChange {
  label: string;
  delta: number;
}

export interface LogEntry {
  id: string;
  eventId?: string;
  time: GameTime;
  type: LogEntryType;
  title: string;
  choiceText?: string;
  narrative: string;
  statChanges?: StatChange[];
}

// ─── Admission ─────────────────────────────────────────────────────────────

// Tracks the state of an in-progress admission session.
// candidates = null  → "offer continue" state: player can recruit another round or stop.
// candidates = [a,b] → two candidates are displayed for the player to choose from.
export interface AdmissionState {
  candidates: [string, string] | null;
  round: number; // 1 = first round of the year, 2+ = extended (year 4+)
}

// ─── Event Queue ───────────────────────────────────────────────────────────

// A queued event optionally binds to a specific student (for conditional events
// whose trigger condition is met by a particular student). The bound student ID
// is used to resolve {studentName} placeholders and to target 'randomStudent'
// effects at the correct person instead of picking randomly.
export interface QueuedEvent {
  id: string;
  studentId?: string;   // primary bound student ({studentName})
  student2Id?: string;  // secondary bound student ({student2Name})
}

// ─── Game State ────────────────────────────────────────────────────────────

export type GamePhase = 'playing' | 'won' | 'gameover';

export interface GameState {
  phase: GamePhase;
  time: GameTime;
  students: Student[];
  studentPool: string[];             // IDs of candidates not yet admitted
  admissionState: AdmissionState | null;
  eventQueue: QueuedEvent[];
  activeEventId: string | null;
  activeBoundStudentId: string | null;  // primary bound student ({studentName})
  activeBoundStudent2Id: string | null; // secondary bound student ({student2Name})
  activeParagraphIndex: number;         // which description paragraph has been revealed (0-based)
  graduationChecksSeen: string[];       // entries like "studentId", "studentId:2", "studentId:3"
  graduationExtensions: Record<string, number>; // studentId → times延毕 chosen
  storyLog: LogEntry[];
  lab: LabStats;
}

// ─── Reducer Actions ───────────────────────────────────────────────────────

export type GameAction =
  | { type: 'PRESENT_EVENT' }
  | { type: 'NEXT_PARAGRAPH' }
  | { type: 'CHOOSE_OPTION'; eventId: string; optionId: string }
  | { type: 'ADVANCE_MONTH' }
  | { type: 'ADMIT_STUDENT'; candidateId: string }
  | { type: 'PASS_ADMISSION' }
  | { type: 'CONTINUE_RECRUITING' }
  | { type: 'LOAD_SAVE'; state: GameState }
  | { type: 'NEW_GAME' };
