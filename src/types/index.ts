import type { ActiveProject, CompletedProject } from './project';
export type { ActiveProject, CompletedProject } from './project';

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
  graduatedAt?: { year: number; month: number }; // set when status becomes 'graduated'
  traitIds: string[];      // trait IDs applied on admission
}

// ─── Lab ───────────────────────────────────────────────────────────────────

export type LabStatKey = 'funding' | 'reputation' | 'energy' | 'energyDepletedCount';

export interface LabStats {
  funding: number;    // 万元, 0+, no upper cap
  reputation: number; // 0+, no upper cap
  energy: number;     // 0–100, resets to 100 each month
  energyDepletedCount: number; // cumulative times energy dropped to 0 this run
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
  | { type: 'leaveStudent' }      // marks the bound student as left
  | { type: 'unlockIdea'; projectId: string }; // adds a project idea (ignored if already owned)

// ─── Conditions ────────────────────────────────────────────────────────────

export type ConditionOp = '>=' | '<=' | '>' | '<' | '==';

export type EventCondition =
  | { type: 'lab'; stat: LabStatKey; op: ConditionOp; value: number }
  | { type: 'student'; studentId: string; stat: StudentStatKey; op: ConditionOp; value: number }
  | { type: 'anyStudent'; stat: StudentStatKey; op: ConditionOp; value: number }
  | { type: 'minStudentCount'; value: number }  // event only triggers when ≥ N students are active
  | { type: 'time'; field: 'year' | 'month'; op: ConditionOp; value: number } // year/month gate
  | { type: 'seenEvent'; eventId: string }      // event only triggers after this event has appeared in the log
  | { type: 'studentStatus'; studentId: string; status: StudentStatus }; // gate on a specific student's status

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
  fundingCost?: number;          // 万元; option disabled if lab.funding < fundingCost
  energyCost?: number;           // option disabled if lab.energy < energyCost
  requiredChoiceId?: string;     // option locked unless this option ID was chosen in a prior event
  requireStudentActive?: string; // option hidden if this student ID is not currently active in the lab
  outcomes: WeightedOutcome[];
}

export interface GameEvent {
  id: string;
  title: string;
  tagline?: string;          // One-line signature shown in the ending modal (ending events only)
  prompt?: string;           // One-sentence popup — omit for passive (idle/news) events
  description: string[];     // Paragraphs revealed one per click before the choice modal
  options?: EventOption[];   // Omit for passive events; engine auto-dismisses when empty
  tags?: string[];
  triggerConditions?: EventCondition[]; // event enters queue only if ALL conditions met
  prioritizeNext?: boolean;             // when true, nextEventIds are prepended to queue front instead of appended
}

// ─── Story Log ─────────────────────────────────────────────────────────────

// 'event-intro' — description logged when event is presented
// 'event'       — choice + outcome logged after player chooses
export type LogEntryType = 'event-intro' | 'event' | 'monthly' | 'system';

export interface StatChange {
  label: string;
  delta: number;
  suffix?: string; // optional unit appended to delta, e.g. '%'
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
// candidates = null  → "offer continue" state: player just admitted someone, can recruit again or stop.
// candidates = [a,b] → two candidates are displayed for the player to choose from.
export interface AdmissionState {
  candidates: [string, string] | null;
  round: number;           // increments on each new batch shown (refresh or continue)
  shownIds: string[];      // all candidate IDs shown this session — excluded from future draws
  recruitedCount: number;  // how many students admitted so far this session (max 2)
  hasRefreshed: boolean;   // whether the one-time batch-swap (换一批) has been used
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
  endingEventId: string | null;  // ID of the event that triggered the phase change (for ending modal)
  chosenOptionIds: string[];     // all option IDs the player has ever selected (for requiredChoiceId gates)
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
  projectIdeas: string[];              // project IDs of unlocked but not-yet-started ideas
  activeProjects: ActiveProject[];
  completedProjects: CompletedProject[];
  noStudentMonths: number;             // consecutive months with zero active students (for grace-period ending)
  // Per-student record of which conditional happiness-events have fired and when.
  // Enforces one-time-per-student rule and 2-month cooldown between events.
  studentConditionalLog: Record<string, Array<{ eventId: string; year: number; month: number }>>;
  // Counts how many times each student's happiness changed during the current month.
  // Used by fortune_engineer (fires +2 engineering after the 3rd change). Reset each month-end.
  moodChangesThisMonth: Record<string, number>;
  // Ending-summary paragraphs queued for one-at-a-time reveal.
  // Each click dismisses the first entry and appends it to storyLog.
  // Blocks PRESENT_EVENT and ADVANCE_MONTH until empty.
  pendingSummarySlides: string[];
}

// ─── Reducer Actions ───────────────────────────────────────────────────────

export type GameAction =
  | { type: 'PRESENT_EVENT' }
  | { type: 'NEXT_PARAGRAPH' }
  | { type: 'CHOOSE_OPTION'; eventId: string; optionId: string }
  | { type: 'DISMISS_PASSIVE_EVENT' }  // for idle/news events with no options
  | { type: 'DISMISS_SUMMARY_SLIDE' }  // pop one ending-summary paragraph → storyLog
  | { type: 'ADVANCE_MONTH' }
  | { type: 'ADMIT_STUDENT'; candidateId: string }
  | { type: 'PASS_ADMISSION' }
  | { type: 'CONTINUE_RECRUITING' }
  | { type: 'REFRESH_CANDIDATES' }
  | { type: 'LOAD_SAVE'; state: GameState }
  | { type: 'NEW_GAME' }
  | { type: 'START_PROJECT'; projectId: string }
  | { type: 'ASSIGN_PROJECT_LEADER'; projectId: string; leaderId: string }
  | { type: 'REMOVE_PROJECT_LEADER'; projectId: string };
