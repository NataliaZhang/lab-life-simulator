import type {
  GameState,
  GameAction,
  StateEffect,
  Student,
  LabStats,
  LabStatKey,
  StudentStatKey,
  LogEntry,
  StatChange,
  QueuedEvent,
  GameTime,
} from '../types';
import { initialPoolIds, allCandidates } from '../data/studentPool';
import { traitDefs } from '../data/traits';
import { openingEventIds } from '../data/events';
import { getEvent, pickOutcome } from './eventQueue';
import { applyMonthlyUpdate } from './monthlyUpdate';

const ADMISSION_COST = 10;       // 万元 per student
const CONTINUE_ENERGY_COST = 20; // energy cost to get a second round of candidates

// ─── Admission helpers ─────────────────────────────────────────────────────

function clamp100(val: number): number {
  return Math.max(0, Math.min(100, val));
}

function clampPos(val: number): number {
  return Math.max(0, val);
}

function drawTwoCandidates(pool: string[]): [string, string] | null {
  if (pool.length < 2) return null;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0]!, shuffled[1]!];
}

function buildStudent(candidateId: string, time: GameTime): Student | null {
  const candidate = allCandidates.find(c => c.id === candidateId);
  if (!candidate) return null;

  // Apply trait bonuses on top of base skills
  let theory = candidate.baseSkills.theory;
  let engineering = candidate.baseSkills.engineering;
  let social = candidate.baseSkills.social;
  let favor = candidate.baseFavor;
  let happiness = candidate.baseHappiness;

  for (const traitId of candidate.traitIds) {
    const trait = traitDefs[traitId];
    if (!trait) continue;
    theory += trait.bonuses.theory ?? 0;
    engineering += trait.bonuses.engineering ?? 0;
    social += trait.bonuses.social ?? 0;
    favor += trait.bonuses.favor ?? 0;
    happiness += trait.bonuses.happiness ?? 0;
  }

  return {
    id: candidate.id,
    name: candidate.name,
    year: 1,
    enrolledAt: time.year,
    skills: {
      theory: clamp100(theory),
      engineering: clamp100(engineering),
      social: clamp100(social),
    },
    favor: clampPos(favor),
    happiness: clampPos(happiness),
    projectProgress: 0,
    status: 'active',
    traitIds: candidate.traitIds,
  };
}

// ─── Initial State ─────────────────────────────────────────────────────────

export function createInitialState(): GameState {
  return {
    phase: 'playing',
    time: { year: 1, month: 8 }, // Game starts in August
    students: [],                 // Students enter via admission, not pre-loaded
    studentPool: [...initialPoolIds],
    admissionState: null,
    eventQueue: openingEventIds.map(id => ({ id } as QueuedEvent)),
    activeEventId: null,
    activeBoundStudentId: null,
    activeParagraphIndex: 0,
    storyLog: [],
    lab: {
      funding: 0,
      reputation: 0,
      energy: 100,
    },
  };
}

// ─── Stat labels ───────────────────────────────────────────────────────────

function labStatLabel(stat: LabStatKey): string {
  const map: Record<LabStatKey, string> = {
    funding: '资金',
    reputation: '声望',
    energy: '精力',
  };
  return map[stat];
}

function studentStatLabel(stat: StudentStatKey): string {
  const map: Record<StudentStatKey, string> = {
    favor: '好感',
    happiness: '心情',
    projectProgress: '进度',
    'skills.theory': '理论',
    'skills.engineering': '工程',
    'skills.social': '社交',
  };
  return map[stat] ?? stat;
}

// ─── Placeholder resolution ────────────────────────────────────────────────

function resolvePlaceholders(text: string, studentId: string | null, students: Student[]): string {
  if (!studentId) return text;
  const student = students.find(s => s.id === studentId);
  if (!student) return text;
  return text.replace(/\{studentName\}/g, student.name);
}

// ─── Effect Application ────────────────────────────────────────────────────

function applyLabEffect(lab: LabStats, stat: LabStatKey, delta: number): LabStats {
  const raw = lab[stat] + delta;
  const val = stat === 'energy' ? clamp100(raw) : clampPos(raw);
  return { ...lab, [stat]: val };
}

function applyStudentStat(student: Student, stat: StudentStatKey, delta: number): Student {
  switch (stat) {
    case 'favor':
      return { ...student, favor: clampPos(student.favor + delta) };
    case 'happiness':
      return { ...student, happiness: clampPos(student.happiness + delta) };
    case 'projectProgress':
      return { ...student, projectProgress: clamp100(student.projectProgress + delta) };
    case 'skills.theory':
      return { ...student, skills: { ...student.skills, theory: clamp100(student.skills.theory + delta) } };
    case 'skills.engineering':
      return { ...student, skills: { ...student.skills, engineering: clamp100(student.skills.engineering + delta) } };
    case 'skills.social':
      return { ...student, skills: { ...student.skills, social: clamp100(student.skills.social + delta) } };
    default:
      return student;
  }
}

interface ApplyEffectsResult {
  lab: LabStats;
  students: Student[];
  statChanges: StatChange[];
}

function applyEffects(
  state: GameState,
  effects: StateEffect[],
  boundStudentId?: string,
): ApplyEffectsResult {
  let lab = { ...state.lab };
  let students = [...state.students];
  const statChanges: StatChange[] = [];

  for (const effect of effects) {
    if (effect.type === 'lab') {
      lab = applyLabEffect(lab, effect.stat, effect.delta);
      statChanges.push({ label: labStatLabel(effect.stat), delta: effect.delta });
    } else if (effect.type === 'student') {
      students = students.map(s =>
        s.id === effect.studentId ? applyStudentStat(s, effect.stat, effect.delta) : s,
      );
      const target = state.students.find(s => s.id === effect.studentId);
      if (target) {
        statChanges.push({ label: `${target.name}·${studentStatLabel(effect.stat)}`, delta: effect.delta });
      }
    } else if (effect.type === 'allStudents') {
      students = students.map(s =>
        s.status === 'active' ? applyStudentStat(s, effect.stat, effect.delta) : s,
      );
      statChanges.push({ label: `全体·${studentStatLabel(effect.stat)}`, delta: effect.delta });
    } else if (effect.type === 'randomStudent') {
      const active = students.filter(s => s.status === 'active');
      const target = boundStudentId
        ? (students.find(s => s.id === boundStudentId && s.status === 'active') ?? active[Math.floor(Math.random() * active.length)])
        : active[Math.floor(Math.random() * active.length)];
      if (target) {
        students = students.map(s =>
          s.id === target.id ? applyStudentStat(s, effect.stat, effect.delta) : s,
        );
        statChanges.push({ label: `${target.name}·${studentStatLabel(effect.stat)}`, delta: effect.delta });
      }
    }
  }

  return { lab, students, statChanges };
}

// ─── Reducer ───────────────────────────────────────────────────────────────

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {

    case 'PRESENT_EVENT': {
      const [nextQueued, ...restQueue] = state.eventQueue;
      if (!nextQueued) return state;
      const event = getEvent(nextQueued.id);
      const boundStudentId = nextQueued.studentId ?? null;

      const introEntry: LogEntry = {
        id: `${nextQueued.id}_p0_${Date.now()}`,
        eventId: nextQueued.id,
        time: { ...state.time },
        type: 'event-intro',
        title: resolvePlaceholders(event.title, boundStudentId, state.students),
        narrative: resolvePlaceholders(event.description[0] ?? '', boundStudentId, state.students),
      };

      return {
        ...state,
        eventQueue: restQueue,
        activeEventId: nextQueued.id,
        activeBoundStudentId: boundStudentId,
        activeParagraphIndex: 0,
        storyLog: [...state.storyLog, introEntry],
      };
    }

    case 'NEXT_PARAGRAPH': {
      if (!state.activeEventId) return state;
      const event = getEvent(state.activeEventId);
      const nextIdx = state.activeParagraphIndex + 1;
      if (nextIdx >= event.description.length) return state;

      const para = resolvePlaceholders(
        event.description[nextIdx] ?? '',
        state.activeBoundStudentId,
        state.students,
      );

      // Append the new paragraph to the existing log entry for this event
      // (find the last event-intro entry for this event and update it in place)
      const newLog = state.storyLog.map((e, i) => {
        if (e.eventId !== state.activeEventId || e.type !== 'event-intro') return e;
        // Only update the last matching entry
        const isLast = !state.storyLog.slice(i + 1).some(
          later => later.eventId === state.activeEventId && later.type === 'event-intro',
        );
        if (!isLast) return e;
        return { ...e, narrative: e.narrative + '\n\n' + para };
      });

      return {
        ...state,
        activeParagraphIndex: nextIdx,
        storyLog: newLog,
      };
    }

    case 'CHOOSE_OPTION': {
      if (!state.activeEventId || state.activeEventId !== action.eventId) return state;
      const event = getEvent(action.eventId);
      const option = event.options.find(o => o.id === action.optionId);
      if (!option) return state;

      const fundingCost = option.fundingCost ?? 0;
      const energyCost = option.energyCost ?? 0;
      if (state.lab.funding < fundingCost || state.lab.energy < energyCost) return state;

      const outcome = pickOutcome(option.outcomes, state);
      if (!outcome) return state;

      const costEffects: StateEffect[] = [];
      if (fundingCost > 0) costEffects.push({ type: 'lab', stat: 'funding', delta: -fundingCost });
      if (energyCost > 0) costEffects.push({ type: 'lab', stat: 'energy', delta: -energyCost });

      const boundStudentId = state.activeBoundStudentId ?? undefined;

      const { lab, students, statChanges } = applyEffects(state, [
        ...costEffects,
        ...(outcome.effects ?? []),
      ], boundStudentId);

      const logEntry: LogEntry = {
        id: `${action.eventId}_${Date.now()}`,
        eventId: action.eventId,
        time: { ...state.time },
        type: 'event',
        title: resolvePlaceholders(event.title, state.activeBoundStudentId, state.students),
        choiceText: option.text,
        narrative: resolvePlaceholders(outcome.narrative, state.activeBoundStudentId, state.students),
        statChanges: statChanges.length > 0 ? statChanges : undefined,
      };

      const nextQueue: typeof state.eventQueue = [
        ...state.eventQueue,
        ...(outcome.nextEventIds ?? []).map(id => ({ id })),
      ];

      return {
        ...state,
        lab,
        students,
        eventQueue: nextQueue,
        activeEventId: null,
        activeBoundStudentId: null,
        storyLog: [...state.storyLog, logEntry],
      };
    }

    case 'ADVANCE_MONTH': {
      if (state.eventQueue.length > 0 || state.activeEventId !== null || state.admissionState !== null) return state;
      const next = applyMonthlyUpdate(state);
      return { ...next, activeEventId: null };
    }

    case 'ADMIT_STUDENT': {
      const { candidateId } = action;
      if (!state.admissionState?.candidates) return state;
      if (state.lab.funding < ADMISSION_COST) return state;

      const newStudent = buildStudent(candidateId, state.time);
      if (!newStudent) return state;

      const candidate = allCandidates.find(c => c.id === candidateId)!;
      const newPool = state.studentPool.filter(id => id !== candidateId);
      const newFunding = state.lab.funding - ADMISSION_COST;

      // After admission: if year 4+ and energy enough and pool has candidates, offer another round
      const currentRound = state.admissionState.round;
      const canOfferMore = state.time.year >= 4
        && state.lab.energy >= CONTINUE_ENERGY_COST
        && newPool.length >= 2;

      const logEntry: LogEntry = {
        id: `admit_${candidateId}_${Date.now()}`,
        time: { ...state.time },
        type: 'system',
        title: `${candidate.name} 加入实验室`,
        narrative: `${candidate.name}正式入组。${candidate.tagline}`,
        statChanges: [{ label: '资金', delta: -ADMISSION_COST }],
      };

      return {
        ...state,
        students: [...state.students, newStudent],
        studentPool: newPool,
        lab: { ...state.lab, funding: newFunding },
        // null candidates = "offer continue" state; or clear if can't continue
        admissionState: canOfferMore
          ? { candidates: null, round: currentRound }
          : null,
        storyLog: [...state.storyLog, logEntry],
      };
    }

    case 'CONTINUE_RECRUITING': {
      if (!state.admissionState) return state;
      if (state.lab.energy < CONTINUE_ENERGY_COST) return state;
      if (state.studentPool.length < 2) return state;

      const candidates = drawTwoCandidates(state.studentPool);
      if (!candidates) return state;

      return {
        ...state,
        lab: { ...state.lab, energy: clamp100(state.lab.energy - CONTINUE_ENERGY_COST) },
        admissionState: {
          candidates,
          round: (state.admissionState.round) + 1,
        },
      };
    }

    case 'PASS_ADMISSION': {
      return { ...state, admissionState: null };
    }

    case 'LOAD_SAVE': {
      return action.state;
    }

    case 'NEW_GAME': {
      return createInitialState();
    }
  }
}
