import type { GameState, LogEntry, Student, AdmissionState, QueuedEvent } from '../types';
import { formatTime } from '../types';
import { monthlyEventPool, specialEndingIds, timeEndingIds } from '../data/events';
import { filterUnseen, filterTriggerable, pickRandomQueuedEvent } from './eventQueue';
import { initialPoolIds } from '../data/studentPool';

const ADMISSION_COST = 10; // 万元 — must match gameState.ts constant

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

function buildMonthlySummary(state: GameState): LogEntry {
  const activeStudents = state.students.filter(s => s.status === 'active');
  const justGraduated = state.students.filter(s => s.status === 'graduated');

  let narrative = `资金 ${state.lab.funding}万 · 声望 ${state.lab.reputation} · 精力 ${state.lab.energy}。`;

  if (activeStudents.length > 0) {
    const lines = activeStudents
      .map(s => `${s.name}（进度 ${Math.round(s.projectProgress)}%，好感 ${Math.round(s.favor)}，心情 ${Math.round(s.happiness)}）`)
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
      .map(s => `${s.name}（在读第${s.year}年，进度 ${Math.round(s.projectProgress)}%）`)
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
function pickTimeEnding(state: GameState): string {
  const graduated = state.students.filter(s => s.status === 'graduated').length;
  const rep = state.lab.reputation;
  if (rep >= 50 && graduated >= 1) return 'ending_time_great';
  if (rep >= 25 || graduated >= 1) return 'ending_time_steady';
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

  // Reset energy at month start
  next = { ...next, lab: { ...next.lab, energy: 100 } };

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
    if (candidates) {
      if (next.lab.funding >= ADMISSION_COST) {
        admissionState = { candidates, round: 1 };
      } else {
        extraLogEntries.push({
          id: `no_funds_admission_y${next.time.year}`,
          time: { ...next.time },
          type: 'system',
          title: '招生季',
          narrative: '九月招生季到来，但实验室账面资金不足10万，今年无法招募新生了。等经费充裕了再说吧。',
        });
      }
    }
  }

  const graduatedStudents = students.map(checkGraduation);
  const summaryEntry = buildMonthlySummary({ ...next, students: graduatedStudents });

  // Build the seen-event set (used for both daily pool and ending checks)
  const seenEventIds = new Set(
    state.storyLog
      .filter(e => (e.type === 'event' || e.type === 'event-intro') && e.eventId != null)
      .map(e => e.eventId!),
  );

  // ── Special ending check ─────────────────────────────────────────────────
  const specialEndingId = checkSpecialEnding(
    { ...next, students: graduatedStudents },
    seenEventIds,
  );
  if (specialEndingId) {
    // Skip daily events; prepend ending to queue (clear existing queue so it fires first)
    return {
      ...next,
      admissionState,
      students: graduatedStudents,
      eventQueue: [{ id: specialEndingId }],
      storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries],
    };
  }

  // ── Daily event pool ─────────────────────────────────────────────────────
  const unseenPool = filterUnseen(monthlyEventPool, seenEventIds);
  const triggerablePool = filterTriggerable(unseenPool, { ...next, students: graduatedStudents });
  const newQueued: QueuedEvent | null =
    Math.random() < 0.7 && triggerablePool.length > 0
      ? pickRandomQueuedEvent(triggerablePool)
      : null;

  // ── Timed mainline events ────────────────────────────────────────────────
  const forcedEvents: QueuedEvent[] = [];

  // lab_birthday: Year 2 Month 8
  if (next.time.year === 2 && next.time.month === 8 && !seenEventIds.has('lab_birthday')) {
    const firstStudent = graduatedStudents.find(s => s.status === 'active');
    if (firstStudent) {
      forcedEvents.push({ id: 'lab_birthday', studentId: firstStudent.id });
    }
  }

  // graduation_check series: injected in June based on enrolledAt + 3/4/5
  if (next.time.month === 6) {
    for (const student of graduatedStudents.filter(s => s.status === 'active')) {
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

  const newQueue: QueuedEvent[] = [
    ...next.eventQueue,
    ...(newQueued ? [newQueued] : []),
    ...forcedEvents,
  ];

  return {
    ...next,
    admissionState,
    students: graduatedStudents,
    eventQueue: newQueue,
    storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries],
  };
}

// Re-export for engine consumers that only need to know which IDs are endings
export { specialEndingIds, timeEndingIds };
