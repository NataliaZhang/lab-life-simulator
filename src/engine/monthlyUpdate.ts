import type { GameState, LogEntry, Student, AdmissionState, QueuedEvent, EventCondition, ConditionOp, StudentStatKey } from '../types';
import { formatTime } from '../types';
import { events, monthlyEventPool, conditionalStudentEventPool, idleEventIds, specialEndingIds, timeEndingIds } from '../data/events';
import { filterUnseen, filterTriggerable, pickRandomQueuedEvent } from './eventQueue';
import { initialPoolIds } from '../data/studentPool';
import { processMonthlyProjects, removeLeaderOnStudentLeave } from './projectEngine';

// Admission cost rises to 20万 in year 3+ when PhD stipends doubled.
function getAdmissionCost(year: number): number {
  return year >= 3 ? 20 : 10;
}

// ── Conditional event helpers ─────────────────────────────────────────────

function compareOp(val: number, op: ConditionOp, threshold: number): boolean {
  switch (op) {
    case '>=': return val >= threshold;
    case '<=': return val <= threshold;
    case '>':  return val > threshold;
    case '<':  return val < threshold;
    case '==': return val === threshold;
  }
}

function getStudentStat(student: Student, stat: StudentStatKey): number {
  switch (stat) {
    case 'favor':               return student.favor;
    case 'happiness':           return student.happiness;
    case 'projectProgress':     return student.projectProgress;
    case 'skills.theory':       return student.skills.theory;
    case 'skills.engineering':  return student.skills.engineering;
    case 'skills.social':       return student.skills.social;
  }
}

// Returns true if this student satisfies ALL anyStudent conditions in the list.
function studentMatchesConditions(student: Student, conditions: EventCondition[]): boolean {
  return conditions
    .filter((c): c is Extract<EventCondition, { type: 'anyStudent' }> => c.type === 'anyStudent')
    .every(c => compareOp(getStudentStat(student, c.stat), c.op, c.value));
}

// Calendar distance in whole months from `from` to `to` (can be negative).
function monthsElapsed(
  from: { year: number; month: number },
  to: { year: number; month: number },
): number {
  return (to.year - from.year) * 12 + (to.month - from.month);
}

const GAME_END_YEAR = 6;
const GAME_END_MONTH = 6;

function clamp100(val: number): number {
  return Math.max(0, Math.min(100, val));
}

function progressGainForStudent(student: Student): number {
  const skillAvg = (student.skills.theory + student.skills.engineering) / 2;
  const unhappinessPenalty = student.happiness < 30 ? (30 - student.happiness) * 0.4 : 0;
  return Math.max(0, skillAvg * 0.05 - unhappinessPenalty * 0.02);
}

function updateStudent(student: Student): Student {
  if (student.status !== 'active') return student;
  return {
    ...student,
    projectProgress: clamp100(student.projectProgress + progressGainForStudent(student)),
  };
}

function checkGraduation(student: Student): Student {
  if (student.status === 'active' && student.year >= 5 && student.projectProgress >= 85) {
    return { ...student, status: 'graduated' };
  }
  return student;
}

function incrementTime(state: GameState): GameState {
  const { year, month } = state.time;
  if (month < 12) return { ...state, time: { year, month: month + 1 } };
  return { ...state, time: { year: year + 1, month: 1 } };
}

function buildMonthlySummary(state: GameState, energyGain: number): LogEntry {
  const activeStudents = state.students.filter(s => s.status === 'active');
  const justGraduated = state.students.filter(s => s.status === 'graduated');

  const energyTag = energyGain > 0 ? `（+${energyGain}）` : '';
  let narrative = `资金 ${state.lab.funding}万 · 声望 ${state.lab.reputation} · 精力 ${state.lab.energy}${energyTag}。`;

  if (activeStudents.length > 0) {
    const lines = activeStudents
      .map(s => `${s.name}（好感 ${Math.round(s.favor)}，心情 ${Math.round(s.happiness)}）`)
      .join('；');
    narrative += `\n在读成员：${lines}。`;
  }

  if (justGraduated.length > 0) {
    const names = justGraduated.map(s => s.name).join('、');
    narrative += `\n${names} 已毕业`;
  }

  return {
    id: `monthly_${state.time.year}_${state.time.month}`,
    time: state.time,
    type: 'monthly',
    title: formatTime(state.time),
    narrative,
  };
}

// ─── Ending helpers ────────────────────────────────────────────────────────

// Builds a rich summary log entry shown before any time-exhausted ending.
function buildEndingSummary(state: GameState): LogEntry {
  const graduated = state.students.filter(s => s.status === 'graduated');
  const active = state.students.filter(s => s.status === 'active');
  const left = state.students.filter(s => s.status === 'left');

  let narrative = `六年走完了。\n\n`;
  narrative += `实验室最终状态：声望 ${state.lab.reputation} · 资金余额 ${state.lab.funding}万。\n\n`;

  if (graduated.length > 0) {
    const lines = graduated
      .map(s => `${s.name}（毕业，理论 ${Math.round(s.skills.theory)}，工程 ${Math.round(s.skills.engineering)}）`)
      .join('\n');
    narrative += `已毕业的学生（${graduated.length}人）：\n${lines}\n\n`;
  } else {
    narrative += `这六年里没有学生完成毕业——留下了一些遗憾。\n\n`;
  }

  if (active.length > 0) {
    const lines = active
      .map(s => `${s.name}（在读第${s.year}年）`)
      .join('\n');
    narrative += `尚在读的学生（${active.length}人）：\n${lines}\n\n`;
  }

  if (left.length > 0) {
    const names = left.map(s => s.name).join('、');
    narrative += `中途离组的学生：${names}。\n\n`;
  }

  narrative += `以上是你的六年。`;

  return {
    id: 'ending_summary',
    time: { ...state.time },
    type: 'system',
    title: '六年总结',
    narrative,
  };
}

// Selects which time-exhausted ending to trigger based on final state.
// Priority order matches the comment in endings.ts.
function pickTimeEnding(state: GameState): string {
  const graduated = state.students.filter(s => s.status === 'graduated').length;
  const rep = state.lab.reputation;
  const funding = state.lab.funding;
  const completed = state.completedProjects.length;

  if (rep > 150 && graduated > 1)  return 'ending_time_famous';
  if (funding > 100 && rep < 100)  return 'ending_time_wealthy';
  if (rep > 100 && graduated > 1)  return 'ending_time_great';
  if (rep > 75 && graduated >= 1)  return 'ending_time_steady';
  if (rep < 50)                    return 'ending_be_rep_low';
  if (completed < 3)               return 'ending_be_proj_insufficient';
  return 'ending_time_struggle';
}

// Checks whether a special (anytime) ending should fire this tick.
// Returns the ending event ID, or null if none applies.
function checkSpecialEnding(state: GameState, seenIds: Set<string>): string | null {
  // Priority 1: funding crisis
  if (state.lab.funding <= 0 && !seenIds.has('ending_funding_crisis')) {
    return 'ending_funding_crisis';
  }

  // Priority 2: all students gone (only after at least one was ever enrolled)
  const hasHadStudents = state.students.length > 0;
  const allGone = state.students.every(s => s.status !== 'active');
  if (hasHadStudents && allGone && !seenIds.has('ending_all_students_left')) {
    return 'ending_all_students_left';
  }

  return null;
}

function drawTwoFromPool(pool: string[]): [string, string] | null {
  if (pool.length < 2) return null;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0]!, shuffled[1]!];
}

export function applyMonthlyUpdate(state: GameState): GameState {
  let next = incrementTime(state);

  // ── Time-exhausted path ──────────────────────────────────────────────────
  if (
    next.time.year > GAME_END_YEAR ||
    (next.time.year === GAME_END_YEAR && next.time.month > GAME_END_MONTH)
  ) {
    const finalStudents = state.students.map(updateStudent).map(checkGraduation);
    const finalState = { ...next, students: finalStudents };
    const summaryEntry = buildEndingSummary(finalState);
    const timeEndingId = pickTimeEnding(finalState);

    return {
      ...finalState,
      eventQueue: [{ id: timeEndingId }],
      storyLog: [...state.storyLog, summaryEntry],
    };
  }

  // ── Normal monthly path ──────────────────────────────────────────────────

  // Recover energy each month (+10, capped at 100)
  const energyBefore = next.lab.energy;
  const energyAfter = Math.min(100, energyBefore + 10);
  const energyGain = energyAfter - energyBefore;
  next = { ...next, lab: { ...next.lab, energy: energyAfter } };

  // September: increment active student years + trigger admission
  let admissionState: AdmissionState | null = next.admissionState;
  let students = state.students.map(updateStudent);
  const extraLogEntries: LogEntry[] = [];
  if (next.time.month === 9) {
    students = students.map(s =>
      s.status === 'active' ? { ...s, year: s.year + 1 } : s,
    );
    const availablePool = next.studentPool.length >= 2
      ? next.studentPool
      : [...initialPoolIds].filter(id => !next.students.some(s => s.id === id));
    const candidates = drawTwoFromPool(availablePool);
    const admissionCost = getAdmissionCost(next.time.year);
    if (candidates) {
      if (next.lab.funding >= admissionCost) {
        admissionState = { candidates, round: 1 };
      } else {
        extraLogEntries.push({
          id: `no_funds_admission_y${next.time.year}`,
          time: { ...next.time },
          type: 'system',
          title: '招生季',
          narrative: `九月招生季到来，但实验室账面资金不足${admissionCost}万，今年无法招募新生了。等经费充裕了再说吧。`,
        });
      }
    }
  }

  const graduatedStudents = students.map(checkGraduation);

  // Stall projects for students who automatically graduated this month
  const prevActiveIds = new Set(state.students.filter(s => s.status === 'active').map(s => s.id));
  const newlyGone = graduatedStudents.filter(s => s.status !== 'active' && prevActiveIds.has(s.id));
  let stateForProjects: GameState = { ...next, students: graduatedStudents };
  for (const gone of newlyGone) {
    stateForProjects = removeLeaderOnStudentLeave(stateForProjects, gone.id);
  }

  // Process monthly project progression (may modify lab, activeProjects, completedProjects)
  const { newState: afterProjects, logEntries: projectLogEntries, completionEvents } =
    processMonthlyProjects(stateForProjects);

  const summaryEntry = buildMonthlySummary(afterProjects, energyGain);

  // Build the seen-event set (used for both daily pool and ending checks)
  const seenEventIds = new Set(
    state.storyLog
      .filter(e => (e.type === 'event' || e.type === 'event-intro') && e.eventId != null)
      .map(e => e.eventId!),
  );

  // ── Special ending check ─────────────────────────────────────────────────
  const specialEndingId = checkSpecialEnding(afterProjects, seenEventIds);
  if (specialEndingId) {
    // Skip daily events; prepend ending to queue (clear existing queue so it fires first)
    return {
      ...afterProjects,
      admissionState,
      eventQueue: [{ id: specialEndingId }],
      storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries, ...projectLogEntries],
    };
  }

  // ── Tutorial fixed events（第1年9–11月，及人数达标时）────────────────────
  // 新手期前三个月不抽随机事件，只投放固定教程事件，让玩家循序渐进进入节奏。
  const isEarlyGame =
    next.time.year === 1 &&
    (next.time.month === 9 || next.time.month === 10 || next.time.month === 11);

  const tutorialEvents: QueuedEvent[] = [];

  if (next.time.year === 1 && next.time.month === 9 && !seenEventIds.has('joint_meeting_proposal')) {
    tutorialEvents.push({ id: 'joint_meeting_proposal' });
  }
  if (next.time.year === 1 && next.time.month === 10 && !seenEventIds.has('first_semester_reality')) {
    tutorialEvents.push({ id: 'first_semester_reality' });
  }
  // Project system tutorial: show a low-bar idea event so new players discover the project panel
  if (next.time.year === 1 && next.time.month === 10 && !seenEventIds.has('idea_meeting_minutes_assistant')) {
    tutorialEvents.push({ id: 'idea_meeting_minutes_assistant' });
  }
  if (next.time.year === 1 && next.time.month === 11 && !seenEventIds.has('semester_one_checkpoint')) {
    tutorialEvents.push({ id: 'semester_one_checkpoint' });
  }

  // independent_meeting: 当在读人数首次达到3人时触发（任何时间）
  const activeCount = afterProjects.students.filter(s => s.status === 'active').length;
  if (activeCount >= 3 && !seenEventIds.has('independent_meeting')) {
    tutorialEvents.push({ id: 'independent_meeting' });
  }

  // ── Daily event pool ─────────────────────────────────────────────────────
  // 新手期（第1年9–11月）不抽随机事件；有教程事件时也无需补随机
  const skipRandom = isEarlyGame || tutorialEvents.length > 0;
  const unseenPool = filterUnseen(monthlyEventPool, seenEventIds);
  const triggerablePool = filterTriggerable(unseenPool, afterProjects);
  const newQueued: QueuedEvent | null =
    !skipRandom && Math.random() < 0.7 && triggerablePool.length > 0
      ? pickRandomQueuedEvent(triggerablePool)
      : null;

  // ── Timed mainline events ────────────────────────────────────────────────
  const forcedEvents: QueuedEvent[] = [];

  // gpu_envy: Year 2 Month 1 — only if player never bought a server in startup_grant
  if (next.time.year === 2 && next.time.month === 1 && !seenEventIds.has('gpu_envy')
      && !next.chosenOptionIds.includes('buy_server')) {
    const anyStudent = afterProjects.students.find(s => s.status === 'active');
    if (anyStudent) {
      forcedEvents.push({ id: 'gpu_envy', studentId: anyStudent.id });
    }
  }

  // news_phd_salary_double: Year 3 Month 6 — PhD stipend doubling notice (also triggers cost rise)
  if (next.time.year === 3 && next.time.month === 6 && !seenEventIds.has('news_phd_salary_double')) {
    forcedEvents.push({ id: 'news_phd_salary_double' });
  }

  // new_year_gift: every January from year 2 onward, fires once per calendar year
  if (next.time.year >= 2 && next.time.month === 1) {
    const seenThisYear = state.storyLog.some(
      e => e.eventId === 'new_year_gift' && e.time.year === next.time.year,
    );
    const alreadyQueued = next.eventQueue.some(e => e.id === 'new_year_gift');
    if (!seenThisYear && !alreadyQueued) {
      forcedEvents.push({ id: 'new_year_gift' });
    }
  }

  // funding_crisis_grant: when lab funding < 5万, year >= 2, at most once every 6 months
  if (next.time.year >= 2 && next.lab.funding < 5) {
    const grantLogs = state.storyLog.filter(e => e.eventId === 'funding_crisis_grant');
    const lastGrant = grantLogs[grantLogs.length - 1];
    const monthsSince = lastGrant ? monthsElapsed(lastGrant.time, next.time) : 999;
    const alreadyQueued = next.eventQueue.some(e => e.id === 'funding_crisis_grant');
    if (monthsSince >= 6 && !alreadyQueued) {
      forcedEvents.push({ id: 'funding_crisis_grant' });
    }
  }

  // lab_birthday: Year 2 Month 8
  if (next.time.year === 2 && next.time.month === 8 && !seenEventIds.has('lab_birthday')) {
    const firstStudent = afterProjects.students.find(s => s.status === 'active');
    if (firstStudent) {
      forcedEvents.push({ id: 'lab_birthday', studentId: firstStudent.id });
    }
  }

  // graduation_check series: injected in June based on enrolledAt + 3/4/5
  if (next.time.month === 6) {
    for (const student of afterProjects.students.filter(s => s.status === 'active')) {
      const ext = next.graduationExtensions[student.id] ?? 0;
      const base = student.enrolledAt + 3;
      if (ext === 0 && next.time.year === base && !next.graduationChecksSeen.includes(student.id)) {
        forcedEvents.push({ id: 'graduation_check', studentId: student.id });
      } else if (ext === 1 && next.time.year === base + 1 && !next.graduationChecksSeen.includes(student.id + ':2')) {
        forcedEvents.push({ id: 'graduation_check_2', studentId: student.id });
      } else if (ext === 2 && next.time.year === base + 2 && !next.graduationChecksSeen.includes(student.id + ':3')) {
        forcedEvents.push({ id: 'graduation_check_3', studentId: student.id });
      }
    }
  }

  // Half-favor special events: one per student, triggers when favor first reaches 50
  for (const student of afterProjects.students.filter(s => s.status === 'active')) {
    if (student.favor >= 50) {
      const eventId = `half_favor_${student.id}`;
      const alreadyQueued = next.eventQueue.some(e => e.id === eventId);
      if (!seenEventIds.has(eventId) && !alreadyQueued && events[eventId]) {
        forcedEvents.push({ id: eventId, studentId: student.id });
      }
    }
  }

  // Max-favor special events: one per student, triggers when favor first reaches 100
  for (const student of afterProjects.students.filter(s => s.status === 'active')) {
    if (student.favor >= 100) {
      const eventId = `max_favor_${student.id}`;
      const alreadyQueued = next.eventQueue.some(e => e.id === eventId);
      if (!seenEventIds.has(eventId) && !alreadyQueued && events[eventId]) {
        forcedEvents.push({ id: eventId, studentId: student.id });
      }
    }
  }

  // ── Per-student conditional events (happiness-triggered) ─────────────────
  // Rules:
  //   1. If happiness <= 0 → forced departure, skip all other conditional events.
  //   2. Each event in conditionalStudentEventPool fires at most once per student.
  //   3. At least 2 months must pass between any two conditional events for the same student.
  //   4. At most one conditional event queued per month across all students.

  const CONDITIONAL_COOLDOWN = 2; // months
  let updatedConditionalLog = { ...next.studentConditionalLog };

  // Pass 1: happiness = 0 → immediate forced departure (highest priority).
  const crisisStudentIds = new Set<string>();
  for (const student of afterProjects.students.filter(s => s.status === 'active')) {
    if (student.happiness <= 0) {
      crisisStudentIds.add(student.id);
      const alreadyQueued = next.eventQueue.some(
        e => e.id === 'student_crisis_departure' && e.studentId === student.id,
      );
      if (!alreadyQueued) {
        forcedEvents.push({ id: 'student_crisis_departure', studentId: student.id });
      }
    }
  }

  // Pass 2: pick at most one conditional event for one non-crisis student.
  const eligibleStudents = afterProjects.students
    .filter(s => s.status === 'active' && !crisisStudentIds.has(s.id))
    .sort(() => Math.random() - 0.5); // randomise priority

  for (const student of eligibleStudents) {
    const history = updatedConditionalLog[student.id] ?? [];

    // Cooldown: skip if the last conditional event for this student was < 2 months ago.
    if (history.length > 0) {
      const last = history[history.length - 1]!;
      if (monthsElapsed(last, next.time) < CONDITIONAL_COOLDOWN) continue;
    }

    // Find events this student hasn't seen yet and currently qualifies for.
    const firedIds = new Set(history.map(h => h.eventId));
    const eligible = conditionalStudentEventPool.filter(eventId => {
      if (firedIds.has(eventId)) return false;
      const event = events[eventId];
      if (!event?.triggerConditions) return false;
      return studentMatchesConditions(student, event.triggerConditions);
    });

    if (eligible.length === 0) continue;

    // Pick one event at random.
    const chosen = eligible[Math.floor(Math.random() * eligible.length)]!;
    forcedEvents.push({ id: chosen, studentId: student.id });

    // Record so we can enforce the one-time + cooldown rules in future months.
    updatedConditionalLog = {
      ...updatedConditionalLog,
      [student.id]: [
        ...history,
        { eventId: chosen, year: next.time.year, month: next.time.month },
      ],
    };

    break; // one conditional event per month is enough
  }

  // Tutorial events come before random pool events (but after any carry-over queue items)
  const newQueue: QueuedEvent[] = [
    ...completionEvents,       // project completions fire first each month
    ...next.eventQueue,
    ...tutorialEvents,
    ...(newQueued ? [newQueued] : []),
    ...forcedEvents,
  ];

  // If nothing was queued this month, show a random idle event
  if (newQueue.length === 0) {
    const idleId = idleEventIds[Math.floor(Math.random() * idleEventIds.length)];
    newQueue.push({ id: idleId });
  }

  return {
    ...afterProjects,
    admissionState,
    eventQueue: newQueue,
    studentConditionalLog: updatedConditionalLog,
    storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries, ...projectLogEntries],
  };
}

// Re-export for engine consumers that only need to know which IDs are endings
export { specialEndingIds, timeEndingIds };
