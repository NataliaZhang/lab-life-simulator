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
import { initialPoolIds, allCandidates, year1RestrictedIds } from '../data/studentPool';
import { openingEventIds } from '../data/events';
import { getEvent, pickOutcome } from './eventQueue';
import { applyMonthlyUpdate } from './monthlyUpdate';
import { startProject, assignLeader, removeLeader, removeLeaderOnStudentLeave } from './projectEngine';
import { projectById } from '../data/projects';

// Admission cost rises in year 3+ when PhD stipends doubled.
function getAdmissionCost(year: number): number {
  return year >= 3 ? 20 : 10;
}
const REFRESH_ENERGY_COST = 10;   // one-time batch-swap before any admission
const CONTINUE_ENERGY_COST = 20;  // recruit second student after admitting one
const CONTINUE_FUNDING_MIN = 20;  // minimum funding to start a second recruitment batch

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
    favor: clamp100(candidate.baseFavor),
    happiness: clamp100(candidate.baseHappiness),
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
    activeProjectMonths: null,
    activeParagraphIndex: 0,
    graduationChecksSeen: [],
    graduationExtensions: {},
    storyLog: [],
    lab: {
      funding: 0,
      reputation: 0,
      energy: 100,
      energyDepletedCount: 0,
    },
    projectIdeas: [],
    activeProjects: [],
    completedProjects: [],
    noStudentMonths: 0,
    chosenOptionIds: [],
    studentConditionalLog: {},
    moodChangesThisMonth: {},
    pendingSummarySlides: [],
    deferredEvents: [],
    happinessWarned: [],
    pendingImage: null,
    activeDescriptionImageRevealed: false,
  };
}

// ─── Stat labels ───────────────────────────────────────────────────────────

function labStatLabel(stat: LabStatKey): string {
  const map: Record<LabStatKey, string> = {
    funding: '资金',
    reputation: '声望',
    energy: '精力',
    energyDepletedCount: '精力耗尽次数',
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
  projectMonths?: number | null,
): string {
  let result = text;
  const s1 = studentId ? students.find(s => s.id === studentId) : null;
  const s2 = student2Id ? students.find(s => s.id === student2Id) : null;
  if (s1) result = result.replace(/\{studentName\}/g, s1.name);
  if (s2) result = result.replace(/\{student2Name\}/g, s2.name);
  if (projectMonths != null) result = result.replace(/\{projectMonths\}/g, String(projectMonths));
  else result = result.replace(/\{projectMonths\}/g, '数');
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
      return { ...student, favor: clamp100(student.favor + delta) };
    case 'happiness':
      return { ...student, happiness: clamp100(student.happiness + delta) };
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
  // studentId → number of happiness deltas applied this call (for fortune_engineer tracking)
  moodChanges: Record<string, number>;
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
  const moodChanges: Record<string, number> = {};

  // Track a happiness delta for fortune_engineer counting.
  const trackMood = (studentId: string, delta: number) => {
    if (delta !== 0) moodChanges[studentId] = (moodChanges[studentId] ?? 0) + 1;
  };

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
        if (effect.stat === 'happiness') trackMood(effect.studentId, effect.delta);
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
        if (effect.stat === 'happiness') {
          for (const s of activeStudents) trackMood(s.id, effect.delta);
        }
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
          if (effect.stat === 'happiness') trackMood(target.id, effect.delta);
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
          if (effect.stat === 'happiness') trackMood(target.id, effect.delta);
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
          s.id === target.id
            ? { ...s, status: 'graduated' as const, graduatedAt: { ...state.time } }
            : s,
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

  return { lab, students, activeProjects, statChanges, newProjectIdeas, moodChanges };
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

      const qProjectMonths = nextQueued.projectMonths ?? null;
      const introEntry: LogEntry = {
        id: `${nextQueued.id}_p0_${Date.now()}`,
        eventId: nextQueued.id,
        time: { ...state.time },
        type: 'event-intro',
        title: resolvePlaceholders(event.title, boundStudentId, state.students, boundStudent2Id, qProjectMonths),
        narrative: resolvePlaceholders(event.description[0] ?? '', boundStudentId, state.students, boundStudent2Id, qProjectMonths),
        // If the event has a description image, attach it now but keep it hidden until clicked.
        ...(event.descriptionImage
          ? { image: event.descriptionImage, imageRevealed: false }
          : {}),
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
        activeProjectMonths: qProjectMonths,
        activeParagraphIndex: 0,
        graduationChecksSeen,
        storyLog: [...state.storyLog, introEntry],
        // Queue the image for reveal on next click if this event has a description image.
        pendingImage: event.descriptionImage ?? null,
        activeDescriptionImageRevealed: false,
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
        state.activeProjectMonths,
      );

      // Append to the last event-intro entry for this event.
      // After the description image is revealed, paragraphs go into narrativeAfterImage
      // so they render below the image rather than above it.
      const newLog = state.storyLog.map((e, i) => {
        if (e.eventId !== state.activeEventId || e.type !== 'event-intro') return e;
        const isLast = !state.storyLog.slice(i + 1).some(
          later => later.eventId === state.activeEventId && later.type === 'event-intro',
        );
        if (!isLast) return e;
        if (state.activeDescriptionImageRevealed) {
          const prev = e.narrativeAfterImage ?? '';
          return { ...e, narrativeAfterImage: prev ? prev + '\n\n' + para : para };
        }
        return { ...e, narrative: e.narrative + '\n\n' + para };
      });

      return {
        ...state,
        activeParagraphIndex: nextIdx,
        storyLog: newLog,
      };
    }

    case 'REVEAL_PENDING_IMAGE': {
      if (!state.pendingImage) return state;
      // Find the last log entry that has this image and is still hidden, reveal it.
      let found = false;
      const newLog = [...state.storyLog].reverse().map(e => {
        if (!found && e.image === state.pendingImage && e.imageRevealed === false) {
          found = true;
          return { ...e, imageRevealed: true };
        }
        return e;
      }).reverse();
      // If the reveal was for a description image (active event still open), mark it so
      // subsequent NEXT_PARAGRAPH calls append to narrativeAfterImage.
      const isDescription = state.activeEventId !== null;
      return {
        ...state,
        storyLog: newLog,
        pendingImage: null,
        activeDescriptionImageRevealed: isDescription,
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
        activeProjectMonths: null,
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

      const { lab, students: effectStudents, activeProjects: effectProjects, statChanges, newProjectIdeas, moodChanges } = applyEffects(state, [
        ...costEffects,
        ...(outcome.effects ?? []),
      ], boundStudentId, boundStudent2Id);

      // schedule_is_justice: when energy is spent on a choice, the bound student gains +1 engineering
      let students = effectStudents;
      if (energyCost > 0 && boundStudentId) {
        students = students.map(s =>
          s.id === boundStudentId && s.status === 'active' && s.traitIds.includes('schedule_is_justice')
            ? { ...s, skills: { ...s.skills, engineering: Math.min(100, s.skills.engineering + 1) } }
            : s,
        );
      }

      // Merge mood changes from this event into the monthly tracker (for fortune_engineer)
      const newMoodChangesThisMonth: Record<string, number> = { ...state.moodChangesThisMonth };
      for (const [sid, count] of Object.entries(moodChanges)) {
        newMoodChangesThisMonth[sid] = (newMoodChangesThisMonth[sid] ?? 0) + count;
      }

      // Show student's smug portrait when archiving a student-led project completion.
      const isStudentLedProjectComplete =
        action.eventId.startsWith('project_complete_') &&
        !action.eventId.endsWith('_pi') &&
        action.optionId === 'archive' &&
        state.activeBoundStudentId !== null;

      const logEntry: LogEntry = {
        id: `${action.eventId}_${Date.now()}`,
        eventId: action.eventId,
        time: { ...state.time },
        type: 'event',
        title: resolvePlaceholders(event.title, state.activeBoundStudentId, state.students, state.activeBoundStudent2Id, state.activeProjectMonths),
        choiceText: resolvePlaceholders(option.text, state.activeBoundStudentId, state.students, state.activeBoundStudent2Id, state.activeProjectMonths),
        narrative: resolvePlaceholders(outcome.narrative, state.activeBoundStudentId, state.students, state.activeBoundStudent2Id, state.activeProjectMonths),
        statChanges: statChanges.length > 0 ? statChanges : undefined,
        studentPortrait: isStudentLedProjectComplete ? state.activeBoundStudentId ?? undefined : undefined,
        // Attach image as hidden; revealed on the next click via REVEAL_PENDING_IMAGE.
        ...(outcome.image ? { image: outcome.image, imageRevealed: false } : {}),
      };

      const chainEvents = (outcome.nextEventIds ?? []).map(id => ({
        id,
        studentId: boundStudentId,
        student2Id: boundStudent2Id,
      }));
      // Chain events inherit the current bound students so {studentName} keeps resolving.
      // prioritizeNext: prepend so they fire immediately; otherwise append.
      const currentEvent = getEvent(state.activeEventId!);
      const nextQueue: typeof state.eventQueue = currentEvent?.prioritizeNext
        ? [...chainEvents, ...state.eventQueue]
        : [...state.eventQueue, ...chainEvents];

      // nextMonthEventIds: deferred to the following ADVANCE_MONTH cycle.
      const newDeferredEvents: QueuedEvent[] = [
        ...(state.deferredEvents ?? []),
        ...(outcome.nextMonthEventIds ?? []).map(id => ({
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

      // When a student graduates, purge queued events bound to them.
      // Alumni-visit events are injected months later by monthlyUpdate and won't be in queue yet.
      let prunedQueue = nextQueue;
      if (hasGraduate && boundStudentId) {
        prunedQueue = nextQueue.filter(
          qe => qe.studentId !== boundStudentId && qe.student2Id !== boundStudentId,
        );
      }

      // First-idea onboarding hint: fires once when the very first project idea is unlocked
      const isFirstIdea = state.projectIdeas.length === 0 && newProjectIdeas.length > 0;
      const ideaHintEntry: LogEntry | null = isFirstIdea ? {
        id: `hint_first_idea_${action.eventId}`,
        time: { ...state.time },
        type: 'system',
        title: '',
        narrative: '💡 点击右上角的"项目"可以查看灵感，并安排学生推进研究项目。',
      } : null;

      return {
        ...state,
        phase: outcome.phaseChange ?? state.phase,
        endingEventId: outcome.phaseChange ? (state.activeEventId ?? state.endingEventId) : state.endingEventId,
        lab,
        students,
        projectIdeas: newProjectIdeas,
        activeProjects,
        eventQueue: prunedQueue,
        activeEventId: null,
        activeBoundStudentId: null,
        activeBoundStudent2Id: null,
        activeProjectMonths: null,
        graduationExtensions,
        chosenOptionIds: [...state.chosenOptionIds, action.optionId],
        moodChangesThisMonth: newMoodChangesThisMonth,
        deferredEvents: newDeferredEvents,
        storyLog: [...state.storyLog, logEntry, ...(ideaHintEntry ? [ideaHintEntry] : [])],
        pendingImage: outcome.image ?? null,
        activeDescriptionImageRevealed: false,
      };
    }

    case 'DISMISS_SUMMARY_SLIDE': {
      const [currentSlide, ...remaining] = state.pendingSummarySlides;
      if (!currentSlide) return state;
      const slideEntry: LogEntry = {
        id: `summary_slide_${remaining.length}_${state.time.year}_${state.time.month}`,
        time: { ...state.time },
        type: 'system',
        title: '六年总结',
        narrative: currentSlide,
      };
      return { ...state, pendingSummarySlides: remaining, storyLog: [...state.storyLog, slideEntry] };
    }

    case 'ADVANCE_MONTH': {
      if (state.eventQueue.length > 0 || state.activeEventId !== null || state.admissionState !== null || state.pendingSummarySlides.length > 0) return state;
      const next = applyMonthlyUpdate(state);
      return { ...next, activeEventId: null };
    }

    case 'ADMIT_STUDENT': {
      const { candidateId } = action;
      if (!state.admissionState?.candidates) return state;
      const admissionCost = getAdmissionCost(state.time.year);
      if (state.lab.funding < admissionCost) return state;

      const newStudent = buildStudent(candidateId, state.time);
      if (!newStudent) return state;

      const candidate = allCandidates.find(c => c.id === candidateId)!;
      const newPool = state.studentPool.filter(id => id !== candidateId);
      const newFunding = state.lab.funding - admissionCost;
      const { round, shownIds, recruitedCount, hasRefreshed } = state.admissionState;
      const newRecruitedCount = recruitedCount + 1;

      // Offer a second student only in year 3+, when max not reached and pool has candidates.
      const unshownPool = newPool.filter(id => !shownIds.includes(id));
      const canOfferMore = state.time.year >= 3 && newRecruitedCount < 2 && unshownPool.length >= 2;

      const isFirstStudent = state.students.filter(s => s.status === 'active').length === 0;
      const admitNarrative = isFirstStudent
        ? `${candidate.name}正式入组。${candidate.tagline}\n\n💡 点击右上角的"成员"可以随时查看实验室所有成员的状态。`
        : `${candidate.name}正式入组。${candidate.tagline}`;

      const logEntry: LogEntry = {
        id: `admit_${candidateId}_${Date.now()}`,
        time: { ...state.time },
        type: 'system',
        title: `${candidate.name} 加入实验室`,
        narrative: admitNarrative,
        statChanges: [{ label: '资金', delta: -admissionCost }],
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
        // null candidates = "offer continue" state; clear admissionState if max reached
        admissionState: canOfferMore
          ? { candidates: null, round, shownIds, recruitedCount: newRecruitedCount, hasRefreshed }
          : null,
        eventQueue: [...firstMeetingQueue, ...state.eventQueue],
        storyLog: [...state.storyLog, logEntry],
      };
    }

    case 'REFRESH_CANDIDATES': {
      // One-time batch swap before any admission. Cannot refresh after admitting. Year 3+ only.
      if (!state.admissionState) return state;
      if (state.time.year < 3) return state;
      if (state.admissionState.hasRefreshed) return state;
      if (state.admissionState.recruitedCount > 0) return state;
      if (state.lab.energy < REFRESH_ENERGY_COST) return state;

      const shownIds = state.admissionState.shownIds;
      const basePool = state.studentPool.filter(id => !shownIds.includes(id));
      const refreshPool = state.time.year === 1
        ? basePool.filter(id => !year1RestrictedIds.has(id))
        : basePool;
      const candidates = drawTwoCandidates(refreshPool);
      if (!candidates) return state;

      return {
        ...state,
        lab: { ...state.lab, energy: clamp100(state.lab.energy - REFRESH_ENERGY_COST) },
        admissionState: {
          ...state.admissionState,
          candidates,
          round: state.admissionState.round + 1,
          shownIds: [...shownIds, ...candidates],
          hasRefreshed: true,
        },
      };
    }

    case 'CONTINUE_RECRUITING': {
      // Draw a second batch after already admitting one student. Year 3+ only.
      if (!state.admissionState) return state;
      if (state.time.year < 3) return state;
      if (state.admissionState.recruitedCount < 1) return state;
      if (state.admissionState.recruitedCount >= 2) return state;
      if (state.lab.energy < CONTINUE_ENERGY_COST) return state;
      if (state.lab.funding < CONTINUE_FUNDING_MIN) return state;

      const shownIds = state.admissionState.shownIds;
      const basePool = state.studentPool.filter(id => !shownIds.includes(id));
      const continuePool = state.time.year === 1
        ? basePool.filter(id => !year1RestrictedIds.has(id))
        : basePool;
      const candidates = drawTwoCandidates(continuePool);
      if (!candidates) return state;

      return {
        ...state,
        lab: { ...state.lab, energy: clamp100(state.lab.energy - CONTINUE_ENERGY_COST) },
        admissionState: {
          ...state.admissionState,
          candidates,
          round: state.admissionState.round + 1,
          shownIds: [...shownIds, ...candidates],
        },
      };
    }

    case 'PASS_ADMISSION': {
      return { ...state, admissionState: null };
    }

    case 'LOAD_SAVE': {
      // Migrate older saves that lack newer GameState fields.
      const savedAdmission = action.state.admissionState;
      return {
        ...action.state,
        studentConditionalLog: action.state.studentConditionalLog ?? {},
        moodChangesThisMonth: action.state.moodChangesThisMonth ?? {},
        pendingSummarySlides: action.state.pendingSummarySlides ?? [],
        deferredEvents: action.state.deferredEvents ?? [],
        activeProjectMonths: action.state.activeProjectMonths ?? null,
        happinessWarned: action.state.happinessWarned ?? [],
        pendingImage: action.state.pendingImage ?? null,
        activeDescriptionImageRevealed: action.state.activeDescriptionImageRevealed ?? false,
        lab: { ...action.state.lab, energyDepletedCount: action.state.lab.energyDepletedCount ?? 0 },
        admissionState: savedAdmission
          ? {
              ...savedAdmission,
              shownIds: savedAdmission.shownIds ?? (savedAdmission.candidates ? [...savedAdmission.candidates] : []),
              recruitedCount: savedAdmission.recruitedCount ?? 0,
              hasRefreshed: savedAdmission.hasRefreshed ?? false,
            }
          : null,
        // Old saves have image entries without imageRevealed — treat them as already revealed.
        storyLog: action.state.storyLog.map(entry =>
          entry.image !== undefined && entry.imageRevealed === undefined
            ? { ...entry, imageRevealed: true }
            : entry,
        ),
      };
    }

    case 'NEW_GAME': {
      return createInitialState();
    }

    case 'START_PROJECT': {
      const newState = startProject(state, action.projectId);
      // schedule_is_justice: each active student with this trait gains +1 engineering
      // when energy is spent to start a project
      const proj = projectById[action.projectId];
      if (proj && proj.startupEnergyCost > 0) {
        return {
          ...newState,
          students: newState.students.map(s =>
            s.status === 'active' && s.traitIds.includes('schedule_is_justice')
              ? { ...s, skills: { ...s.skills, engineering: Math.min(100, s.skills.engineering + 1) } }
              : s,
          ),
        };
      }
      return newState;
    }

    case 'ASSIGN_PROJECT_LEADER': {
      return assignLeader(state, action.projectId, action.leaderId);
    }

    case 'REMOVE_PROJECT_LEADER': {
      return removeLeader(state, action.projectId);
    }
  }
}
