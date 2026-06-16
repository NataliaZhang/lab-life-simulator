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
  ActiveProject,
} from '../types';
import { initialPoolIds, allCandidates } from '../data/studentPool';
import { openingEventIds } from '../data/events';
import { getEvent, pickOutcome } from './eventQueue';
import { applyMonthlyUpdate } from './monthlyUpdate';
import { startProject, assignLeader, removeLeader, removeLeaderOnStudentLeave } from './projectEngine';

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

  return {
    id: candidate.id,
    name: candidate.name,
    year: 1,
    enrolledAt: time.year,
    skills: {
      theory: clamp100(candidate.baseSkills.theory),
      engineering: clamp100(candidate.baseSkills.engineering),
      social: clamp100(candidate.baseSkills.social),
    },
    favor: clampPos(candidate.baseFavor),
    happiness: clampPos(candidate.baseHappiness),
    projectProgress: 0,
    status: 'active',
    traitIds: candidate.traitIds,
  };
}

// ─── Initial State ─────────────────────────────────────────────────────────

export function createInitialState(): GameState {
  return {
    phase: 'playing',
    endingEventId: null,
    time: { year: 1, month: 8 }, // Game starts in August
    students: [],                 // Students enter via admission, not pre-loaded
    studentPool: [...initialPoolIds],
    admissionState: null,
    eventQueue: openingEventIds.map(id => ({ id } as QueuedEvent)),
    activeEventId: null,
    activeBoundStudentId: null,
    activeBoundStudent2Id: null,
    activeParagraphIndex: 0,
    graduationChecksSeen: [],
    graduationExtensions: {},
    storyLog: [],
    lab: {
      funding: 0,
      reputation: 0,
      energy: 100,
    },
    projectIdeas: [],
    activeProjects: [],
    completedProjects: [],
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
    projectProgress: '项目进度',
    'skills.theory': '理论',
    'skills.engineering': '工程',
    'skills.social': '社交',
  };
  return map[stat] ?? stat;
}

// ─── Placeholder resolution ────────────────────────────────────────────────

function resolvePlaceholders(
  text: string,
  studentId: string | null,
  students: Student[],
  student2Id?: string | null,
): string {
  let result = text;
  const s1 = studentId ? students.find(s => s.id === studentId) : null;
  const s2 = student2Id ? students.find(s => s.id === student2Id) : null;
  if (s1) result = result.replace(/\{studentName\}/g, s1.name);
  if (s2) result = result.replace(/\{student2Name\}/g, s2.name);
  return result;
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
  activeProjects: ActiveProject[];
  statChanges: StatChange[];
  newProjectIdeas: string[];
}

// Applies a projectProgress delta to the project the student is currently leading.
// Returns the updated activeProjects array, and pushes a stat change entry if applicable.
function applyProjectProgressEffect(
  studentId: string,
  studentName: string,
  delta: number,
  activeProjects: ActiveProject[],
  statChanges: StatChange[],
): ActiveProject[] {
  const projectIdx = activeProjects.findIndex(ap => ap.leaderId === studentId);
  if (projectIdx === -1) return activeProjects; // student not leading any project — skip
  const ap = activeProjects[projectIdx]!;
  const newProgress = Math.min(100, Math.max(0, ap.progress + delta));
  statChanges.push({ label: `${studentName}·项目进度`, delta });
  return activeProjects.map((p, i) => i === projectIdx ? { ...p, progress: newProgress } : p);
}

function applyEffects(
  state: GameState,
  effects: StateEffect[],
  boundStudentId?: string,
  boundStudent2Id?: string,
): ApplyEffectsResult {
  let lab = { ...state.lab };
  let students = [...state.students];
  let activeProjects = [...state.activeProjects];
  const statChanges: StatChange[] = [];
  let newProjectIdeas = [...state.projectIdeas];

  for (const effect of effects) {
    if (effect.type === 'lab') {
      lab = applyLabEffect(lab, effect.stat, effect.delta);
      statChanges.push({ label: labStatLabel(effect.stat), delta: effect.delta });
    } else if (effect.type === 'student') {
      if (effect.stat === 'projectProgress') {
        // Redirect to the student's active project progress
        const target = state.students.find(s => s.id === effect.studentId);
        if (target) {
          activeProjects = applyProjectProgressEffect(target.id, target.name, effect.delta, activeProjects, statChanges);
        }
      } else {
        students = students.map(s =>
          s.id === effect.studentId ? applyStudentStat(s, effect.stat, effect.delta) : s,
        );
        const target = state.students.find(s => s.id === effect.studentId);
        if (target) {
          statChanges.push({ label: `${target.name}·${studentStatLabel(effect.stat)}`, delta: effect.delta });
        }
      }
    } else if (effect.type === 'allStudents') {
      const activeStudents = students.filter(s => s.status === 'active');
      if (effect.stat === 'projectProgress') {
        // Apply progress to each student's active project individually
        for (const s of activeStudents) {
          activeProjects = applyProjectProgressEffect(s.id, s.name, effect.delta, activeProjects, statChanges);
        }
      } else {
        students = students.map(s =>
          s.status === 'active' ? applyStudentStat(s, effect.stat, effect.delta) : s,
        );
        const allLabel = activeStudents.length === 1 && activeStudents[0]
          ? `${activeStudents[0].name}·${studentStatLabel(effect.stat)}`
          : `全体·${studentStatLabel(effect.stat)}`;
        statChanges.push({ label: allLabel, delta: effect.delta });
      }
    } else if (effect.type === 'randomStudent') {
      const active = students.filter(s => s.status === 'active');
      const target = boundStudentId
        ? (students.find(s => s.id === boundStudentId && s.status === 'active') ?? active[Math.floor(Math.random() * active.length)])
        : active[Math.floor(Math.random() * active.length)];
      if (target) {
        if (effect.stat === 'projectProgress') {
          activeProjects = applyProjectProgressEffect(target.id, target.name, effect.delta, activeProjects, statChanges);
        } else {
          students = students.map(s =>
            s.id === target.id ? applyStudentStat(s, effect.stat, effect.delta) : s,
          );
          statChanges.push({ label: `${target.name}·${studentStatLabel(effect.stat)}`, delta: effect.delta });
        }
      }
    } else if (effect.type === 'randomStudent2') {
      const active = students.filter(s => s.status === 'active');
      const target = boundStudent2Id
        ? (students.find(s => s.id === boundStudent2Id && s.status === 'active') ?? active[Math.floor(Math.random() * active.length)])
        : active[Math.floor(Math.random() * active.length)];
      if (target) {
        if (effect.stat === 'projectProgress') {
          activeProjects = applyProjectProgressEffect(target.id, target.name, effect.delta, activeProjects, statChanges);
        } else {
          students = students.map(s =>
            s.id === target.id ? applyStudentStat(s, effect.stat, effect.delta) : s,
          );
          statChanges.push({ label: `${target.name}·${studentStatLabel(effect.stat)}`, delta: effect.delta });
        }
      }
    } else if (effect.type === 'graduateStudent') {
      const target = boundStudentId
        ? students.find(s => s.id === boundStudentId && s.status === 'active')
        : undefined;
      if (target) {
        students = students.map(s =>
          s.id === target.id ? { ...s, status: 'graduated' as const } : s,
        );
        statChanges.push({ label: `${target.name}·毕业`, delta: 1 });
      }
    } else if (effect.type === 'leaveStudent') {
      const target = boundStudentId
        ? students.find(s => s.id === boundStudentId && s.status === 'active')
        : undefined;
      if (target) {
        students = students.map(s =>
          s.id === target.id ? { ...s, status: 'left' as const } : s,
        );
        statChanges.push({ label: `${target.name}·离组`, delta: -1 });
      }
    } else if (effect.type === 'unlockIdea') {
      // Add the project idea only if not already owned or active/completed
      const alreadyHas =
        newProjectIdeas.includes(effect.projectId) ||
        state.activeProjects.some(p => p.projectId === effect.projectId) ||
        state.completedProjects.some(p => p.projectId === effect.projectId);
      if (!alreadyHas) {
        newProjectIdeas = [...newProjectIdeas, effect.projectId];
      }
    }
    // extendGraduation is a state-level side-effect handled in CHOOSE_OPTION, not here
  }

  return { lab, students, activeProjects, statChanges, newProjectIdeas };
}

// ─── Reducer ───────────────────────────────────────────────────────────────

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {

    case 'PRESENT_EVENT': {
      const [nextQueued, ...restQueue] = state.eventQueue;
      if (!nextQueued) return state;
      const event = getEvent(nextQueued.id);
      const boundStudentId = nextQueued.studentId ?? null;
      const boundStudent2Id = nextQueued.student2Id ?? null;

      const introEntry: LogEntry = {
        id: `${nextQueued.id}_p0_${Date.now()}`,
        eventId: nextQueued.id,
        time: { ...state.time },
        type: 'event-intro',
        title: resolvePlaceholders(event.title, boundStudentId, state.students, boundStudent2Id),
        narrative: resolvePlaceholders(event.description[0] ?? '', boundStudentId, state.students, boundStudent2Id),
      };

      // Track which graduation check stage has been presented for this student
      const gradCheckKey =
        nextQueued.id === 'graduation_check' ? boundStudentId
        : nextQueued.id === 'graduation_check_2' ? (boundStudentId ? boundStudentId + ':2' : null)
        : nextQueued.id === 'graduation_check_3' ? (boundStudentId ? boundStudentId + ':3' : null)
        : null;
      const graduationChecksSeen = gradCheckKey
        ? [...state.graduationChecksSeen, gradCheckKey]
        : state.graduationChecksSeen;

      return {
        ...state,
        eventQueue: restQueue,
        activeEventId: nextQueued.id,
        activeBoundStudentId: boundStudentId,
        activeBoundStudent2Id: boundStudent2Id,
        activeParagraphIndex: 0,
        graduationChecksSeen,
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
        state.activeBoundStudent2Id,
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

    case 'DISMISS_PASSIVE_EVENT': {
      // Auto-dismiss idle/news events that have no options — no choice modal, no outcome
      if (!state.activeEventId) return state;
      return {
        ...state,
        activeEventId: null,
        activeBoundStudentId: null,
        activeBoundStudent2Id: null,
        activeParagraphIndex: 0,
      };
    }

    case 'CHOOSE_OPTION': {
      if (!state.activeEventId || state.activeEventId !== action.eventId) return state;
      const event = getEvent(action.eventId);
      const option = (event.options ?? []).find(o => o.id === action.optionId);
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
      const boundStudent2Id = state.activeBoundStudent2Id ?? undefined;

      const { lab, students, activeProjects: effectProjects, statChanges, newProjectIdeas } = applyEffects(state, [
        ...costEffects,
        ...(outcome.effects ?? []),
      ], boundStudentId, boundStudent2Id);

      const logEntry: LogEntry = {
        id: `${action.eventId}_${Date.now()}`,
        eventId: action.eventId,
        time: { ...state.time },
        type: 'event',
        title: resolvePlaceholders(event.title, state.activeBoundStudentId, state.students, state.activeBoundStudent2Id),
        choiceText: resolvePlaceholders(option.text, state.activeBoundStudentId, state.students, state.activeBoundStudent2Id),
        narrative: resolvePlaceholders(outcome.narrative, state.activeBoundStudentId, state.students, state.activeBoundStudent2Id),
        statChanges: statChanges.length > 0 ? statChanges : undefined,
      };

      const nextQueue: typeof state.eventQueue = [
        ...state.eventQueue,
        // Chain events inherit the current bound students so {studentName} keeps resolving
        ...(outcome.nextEventIds ?? []).map(id => ({
          id,
          studentId: boundStudentId,
          student2Id: boundStudent2Id,
        })),
      ];

      // extendGraduation increments the per-student extension counter
      const hasExtend = (outcome.effects ?? []).some(e => e.type === 'extendGraduation');
      const graduationExtensions = hasExtend && boundStudentId
        ? {
            ...state.graduationExtensions,
            [boundStudentId]: (state.graduationExtensions[boundStudentId] ?? 0) + 1,
          }
        : state.graduationExtensions;

      // Stall any project whose leader just graduated or left via this outcome's effects
      const allEffects = [...costEffects, ...(outcome.effects ?? [])];
      const hasGraduate = allEffects.some(e => e.type === 'graduateStudent');
      const hasLeave = allEffects.some(e => e.type === 'leaveStudent');
      let activeProjects = effectProjects;
      if ((hasGraduate || hasLeave) && boundStudentId) {
        // Build a temporary minimal state-like object to call removeLeaderOnStudentLeave
        const tempState = { ...state, students, activeProjects };
        activeProjects = removeLeaderOnStudentLeave(tempState, boundStudentId).activeProjects;
      }

      return {
        ...state,
        phase: outcome.phaseChange ?? state.phase,
        endingEventId: outcome.phaseChange ? (state.activeEventId ?? state.endingEventId) : state.endingEventId,
        lab,
        students,
        projectIdeas: newProjectIdeas,
        activeProjects,
        eventQueue: nextQueue,
        activeEventId: null,
        activeBoundStudentId: null,
        activeBoundStudent2Id: null,
        graduationExtensions,
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

      // After admission: offer a second round only (round 1 → round 2, no further)
      const currentRound = state.admissionState.round;
      const canOfferMore = currentRound < 2
        && state.time.year >= 4
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

      // Immediately queue the student's first-meeting event, bound to this student
      const firstMeetingQueue = candidate.firstMeetingEventId
        ? [{ id: candidate.firstMeetingEventId, studentId: candidateId }]
        : [];

      return {
        ...state,
        students: [...state.students, newStudent],
        studentPool: newPool,
        lab: { ...state.lab, funding: newFunding },
        // null candidates = "offer continue" state; or clear if can't continue
        admissionState: canOfferMore
          ? { candidates: null, round: currentRound }
          : null,
        eventQueue: [...firstMeetingQueue, ...state.eventQueue],
        storyLog: [...state.storyLog, logEntry],
      };
    }

    case 'CONTINUE_RECRUITING': {
      if (!state.admissionState) return state;
      if (state.admissionState.round >= 2) return state; // max two rounds per year
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

    case 'START_PROJECT': {
      return startProject(state, action.projectId);
    }

    case 'ASSIGN_PROJECT_LEADER': {
      return assignLeader(state, action.projectId, action.leaderId);
    }

    case 'REMOVE_PROJECT_LEADER': {
      return removeLeader(state, action.projectId);
    }
  }
}
