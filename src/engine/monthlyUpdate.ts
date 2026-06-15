import type { GameState, LogEntry, Student, AdmissionState } from '../types';
import { formatTime } from '../types';
import { monthlyEventPool } from '../data/events';
import { filterUnseen, filterTriggerable, pickRandomQueuedEvent } from './eventQueue';
import { initialPoolIds } from '../data/studentPool';

const ADMISSION_COST = 10; // 万元 — must match gameState.ts constant

const GAME_END_YEAR = 6;
const GAME_END_MONTH = 12;

function clamp100(val: number): number {
  return Math.max(0, Math.min(100, val));
}

function progressGainForStudent(student: Student): number {
  const skillAvg = (student.skills.theory + student.skills.engineering) / 2;
  // Low happiness reduces progress
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
    narrative += `\n${names} 顺利毕业了，恭喜！`;
  }

  return {
    id: `monthly_${state.time.year}_${state.time.month}`,
    time: state.time,
    type: 'monthly',
    title: formatTime(state.time),
    narrative,
  };
}

function drawTwoFromPool(pool: string[]): [string, string] | null {
  if (pool.length < 2) return null;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0]!, shuffled[1]!];
}

export function applyMonthlyUpdate(state: GameState): GameState {
  let next = incrementTime(state);

  if (
    next.time.year > GAME_END_YEAR ||
    (next.time.year === GAME_END_YEAR && next.time.month > GAME_END_MONTH)
  ) {
    return {
      ...next,
      phase: 'won',
      storyLog: [
        ...next.storyLog,
        {
          id: 'game_end',
          time: next.time,
          type: 'system',
          title: '六年过去了',
          narrative:
            '你的六年PI任期走到了终点。实验室经历了GPU OOM、Reviewer 2、国基申请、arxiv被抢先……一路走来，学生们成长了，你也成长了——虽然你现在看到NaN还是会心跳加速。\n\n白板上那些公式，你终于搞懂了其中的大部分。',
        },
      ],
    };
  }

  // Reset energy at month start
  next = { ...next, lab: { ...next.lab, energy: 100 } };

  // September: increment active student years + trigger admission
  let admissionState: AdmissionState | null = next.admissionState;
  let students = state.students.map(updateStudent);
  let extraLogEntries: LogEntry[] = [];
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
          narrative: '九月招生季到来，但实验室账面资金不足10万，今年无法招募新生。等经费充裕了再说吧。',
        });
      }
    }
  }

  const graduatedStudents = students.map(checkGraduation);
  const summaryEntry = buildMonthlySummary({ ...next, students: graduatedStudents });

  // Build candidate event pool: unseen events that also satisfy triggerConditions
  const seenEventIds = new Set(
    state.storyLog
      .filter(e => (e.type === 'event' || e.type === 'event-intro') && e.eventId != null)
      .map(e => e.eventId!),
  );
  const unseenPool = filterUnseen(monthlyEventPool, seenEventIds);
  const triggerablePool = filterTriggerable(unseenPool, { ...next, students: graduatedStudents });
  const newQueued =
    Math.random() < 0.7 && triggerablePool.length > 0
      ? pickRandomQueuedEvent(triggerablePool)
      : null;

  const newQueue = newQueued ? [...next.eventQueue, newQueued] : next.eventQueue;

  return {
    ...next,
    admissionState,
    students: graduatedStudents,
    eventQueue: newQueue,
    storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries],
  };
}
