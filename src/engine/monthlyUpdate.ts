import type { GameState, LogEntry, Student, AdmissionState, QueuedEvent, EventCondition, ConditionOp, StudentStatKey, StatChange } from '../types';
import { formatTime } from '../types';
import { events, monthlyEventPool, conditionalStudentEventPool, idleEventIds, specialEndingIds, timeEndingIds } from '../data/events';
import { filterUnseen, filterTriggerable, pickRandomQueuedEvent } from './eventQueue';
import { initialPoolIds, year1RestrictedIds } from '../data/studentPool';
import { processMonthlyProjects, removeLeaderOnStudentLeave } from './projectEngine';
import { projectById } from '../data/projects';

// Maps each student ID to their personal alumni-visit event.
// Used to inject the event for graduated students, bypassing filterTriggerable
// which requires active status.
const STUDENT_ALUMNI_EVENT_IDS: Record<string, string> = {
  bi_xiaotian:  'bxt_alumni_visit',
  ye_zhiqiu:    'yzq_alumni_visit',
  bai_xiaoman:  'bxm_alumni_visit',
  lin_xiaojuan: 'lxj_alumni_visit',
  gu_mianmian:  'gmm_alumni_visit',
  xie_zhiwei:   'xzw_alumni_visit',
  qian_duoduo:  'qdd_alumni_visit',
  tang_kuolie:  'tkl_alumni_visit',
  mo_wenxuan:   'mwx_alumni_visit',
  he_shixu:     'hsx_alumni_visit',
};

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

const GAME_END_YEAR = 7;
const GAME_END_MONTH = 6;

function clamp100(val: number): number {
  return Math.max(0, Math.min(100, val));
}

const SKILL_LABELS: Record<'theory' | 'engineering' | 'social', string> = {
  theory: '理论',
  engineering: '工程',
  social: '社交',
};

type SkillGain = { name: string; skill: 'theory' | 'engineering' | 'social'; delta: number };

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

function checkGraduation(student: Student, extensions: Record<string, number>): Student {
  // If the player already engaged the graduation-check series for this student and chose
  // to delay, respect that — auto-graduation here would fire before graduation_check_3 runs.
  if ((extensions[student.id] ?? 0) > 0) return student;
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

function buildMonthlySummary(state: GameState, energyGain: number, skillGains: SkillGain[], traitGains: StatChange[]): LogEntry {
  const activeStudents = state.students.filter(s => s.status === 'active');
  const justGraduated = state.students.filter(s => s.status === 'graduated');

  let narrative = `资金 ${state.lab.funding}万 · 声望 ${state.lab.reputation} · 精力 ${state.lab.energy}。`;

  // Build StatChange pills (rendered as chips, not inline text)
  const statChanges: StatChange[] = [];
  if (energyGain > 0) statChanges.push({ label: '精力', delta: energyGain });
  for (const g of skillGains) statChanges.push({ label: `${g.name}·${SKILL_LABELS[g.skill]}`, delta: g.delta });
  statChanges.push(...traitGains);

  if (activeStudents.length > 0) {
    const lines = activeStudents
      .map(s => `${s.name}（好感 ${Math.round(s.favor)}，心情 ${Math.round(s.happiness)}）`)
      .join('；');
    narrative += `\n\n在读成员：${lines}。`;
  }

  if (state.activeProjects.length > 0) {
    const projectLines = state.activeProjects
      .map(ap => {
        const def = projectById[ap.projectId];
        if (!def) return null;
        const progress = Math.round(ap.progress);
        const leaderName =
          ap.leaderId === null ? '待分配' :
          ap.leaderId === 'pi'  ? '你' :
          (state.students.find(s => s.id === ap.leaderId)?.name ?? '未知');
        return `${def.name}（${progress}%，${leaderName}）`;
      })
      .filter((x): x is string => x !== null)
      .join('；');
    if (projectLines) narrative += `\n\n进行中项目：${projectLines}。`;
  }

  if (justGraduated.length > 0) {
    const names = justGraduated.map(s => s.name).join('、');
    narrative += `\n\n${names} 已毕业`;
  }

  return {
    id: `monthly_${state.time.year}_${state.time.month}`,
    time: state.time,
    type: 'monthly',
    title: formatTime(state.time),
    narrative,
    statChanges: statChanges.length > 0 ? statChanges : undefined,
  };
}

// ─── Ending helpers ────────────────────────────────────────────────────────

// Builds ending-summary paragraphs for one-at-a-time reveal.
// Returns an array of strings; each element is one click's worth of content.
function buildEndingSummary(state: GameState): string[] {
  const graduated = state.students.filter(s => s.status === 'graduated');
  const active = state.students.filter(s => s.status === 'active');
  const left = state.students.filter(s => s.status === 'left');

  let narrative = `六年走完了。\n\n`;
  narrative += `实验室最终状态：声望 ${state.lab.reputation} · 资金余额 ${state.lab.funding}万。\n\n`;

  if (graduated.length > 0) {
    const lines = graduated.map(s => s.name).join('、');
    narrative += `已毕业的学生（${graduated.length}人）：\n${lines}\n\n`;

    // Average graduation duration: graduatedAt.year - enrolledAt
    const durations = graduated
      .filter(s => s.graduatedAt != null)
      .map(s => s.graduatedAt!.year - s.enrolledAt);
    if (durations.length > 0) {
      const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
      const avgRounded = Math.round(avg * 10) / 10;
      narrative += `平均毕业时长：${avgRounded} 年。\n\n`;
      if (avg > 4) {
        narrative += `将近五年才出去——你的学生是在实验室生根发芽了吗？业界流传"进了这个组，出来就是化石"。\n\n`;
      } else if (avg >= 3.5) {
        narrative += `平均多修炼了一年。学生私下管这叫"导师炼丹期"，你本人毫不知情。\n\n`;
      } else {
        narrative += `三年，教科书式的学制。当然，你的头发也做出了相应的贡献。\n\n`;
      }
    }
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

  // Project summary — list completed projects by grade
  const totalStarted = state.activeProjects.length + state.completedProjects.length;
  if (totalStarted > 0) {
    const conversionRate = Math.round((state.completedProjects.length / totalStarted) * 100);
    const gradeOrder = ['S', 'A', 'B', 'C'] as const;
    // Group completed project names by grade
    const gradeNames: Partial<Record<string, string[]>> = {};
    for (const cp of state.completedProjects) {
      const def = projectById[cp.projectId];
      if (!def) continue;
      (gradeNames[def.grade] ??= []).push(def.name);
    }
    const gradeParts = gradeOrder
      .filter(g => (gradeNames[g]?.length ?? 0) > 0)
      .map(g => `${g}级（${gradeNames[g]!.length}）：${gradeNames[g]!.join('、')}`);
    if (gradeParts.length > 0) {
      narrative += `项目：立项${totalStarted}个，完成${state.completedProjects.length}个，成果转化率${conversionRate}%。\n`;
      narrative += gradeParts.join('；\n\n') + `。\n\n`;
    } else {
      narrative += `项目：立项${totalStarted}个，暂无完成项目。\n\n`;
    }
  }

  narrative += `以上是你的六年。`;

  // Split on double newlines so each logical block becomes one reveal-click.
  return narrative
    .split('\n\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Selects which time-exhausted ending to trigger based on final state.
// Priority order matches the comment in endings.ts.
function pickTimeEnding(state: GameState): string {
  const graduated = state.students.filter(s => s.status === 'graduated').length;
  const rep = state.lab.reputation;
  const completed = state.completedProjects.length;

  // Player explicitly chose industry path via industry_invite event
  if (state.chosenOptionIds.includes('industry_invite_accept')) return 'ending_time_wealthy';

  if (rep > 200 && graduated > 2)  return 'ending_time_famous';
  if (rep > 150 && graduated > 1)  return 'ending_time_great';
  if (rep > 100 && graduated >= 1) return 'ending_time_steady';
  if (rep < 80)                    return 'ending_be_rep_low';
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

  // Priority 2: all students gone for 6+ consecutive months
  const hasHadStudents = state.students.length > 0;
  const allGone = state.students.every(s => s.status !== 'active');
  if (hasHadStudents && allGone && state.noStudentMonths >= 6 && !seenIds.has('ending_all_students_left')) {
    return 'ending_all_students_left';
  }

  // Priority 3: PI energy depleted 6+ times — forced medical leave, tenure fails
  if (state.lab.energyDepletedCount >= 6 && !seenIds.has('ending_burnout_tenure')) {
    return 'ending_burnout_tenure';
  }

  return null;
}

// ─── Trait monthly effects ─────────────────────────────────────────────────

// Applies all passive monthly trait effects for active students.
// Also checks fortune_engineer using the accumulated moodChangesThisMonth counter,
// then resets the counter for the new month.
// Returns the updated state and a list of pre-formatted gain labels for the monthly summary.
function applyTraitMonthlyEffects(
  state: GameState,
  moodChangesFromEvents: Record<string, number>,
): { newState: GameState; traitGains: StatChange[] } {
  const activeStudents = state.students.filter(s => s.status === 'active');
  let students = [...state.students];
  let lab = { ...state.lab };
  let activeProjects = [...state.activeProjects];
  const traitGains: StatChange[] = [];

  // Running mood change totals for this month (events + monthly effects)
  const moodChanges = { ...moodChangesFromEvents };

  const updateStudent = (id: string, fn: (s: Student) => Student) => {
    students = students.map(s => (s.id === id ? fn(s) : s));
  };

  for (const student of activeStudents) {
    const t = student.traitIds;

    // last_minute_genius: happiness < 50 → favor +2
    if (t.includes('last_minute_genius') && student.happiness < 50) {
      updateStudent(student.id, s => ({ ...s, favor: clamp100(s.favor + 2) }));
      traitGains.push({ label: `${student.name}天赋·好感`, delta: 2 });
    }

    // sleep_learning: random skill +1
    if (t.includes('sleep_learning')) {
      const SKILLS = ['theory', 'engineering', 'social'] as const;
      const NAMES = { theory: '理论', engineering: '工程', social: '社交' } as const;
      const skill = SKILLS[Math.floor(Math.random() * 3)]!;
      updateStudent(student.id, s => ({
        ...s, skills: { ...s.skills, [skill]: clamp100(s.skills[skill] + 1) },
      }));
      traitGains.push({ label: `${student.name}天赋·${NAMES[skill]}`, delta: 1 });
    }

    // weird_paper_collector: theory +1
    if (t.includes('weird_paper_collector')) {
      updateStudent(student.id, s => ({
        ...s, skills: { ...s.skills, theory: clamp100(s.skills.theory + 1) },
      }));
      traitGains.push({ label: `${student.name}天赋·理论`, delta: 1 });
    }

    // curiosity_overload: engineering +1, lab energy -1
    if (t.includes('curiosity_overload')) {
      updateStudent(student.id, s => ({
        ...s, skills: { ...s.skills, engineering: clamp100(s.skills.engineering + 1) },
      }));
      lab = { ...lab, energy: Math.max(0, lab.energy - 1) };
      traitGains.push({ label: `${student.name}天赋·工程`, delta: 1 });
    }

    // research_brainstormer: flat -1 energy cost per month for boosted idea draw
    if (t.includes('research_brainstormer')) {
      lab = { ...lab, energy: Math.max(0, lab.energy - 1) };
    }

    // reliable_senior: random other active student theory +1
    if (t.includes('reliable_senior')) {
      const others = activeStudents.filter(s => s.id !== student.id);
      if (others.length > 0) {
        const target = others[Math.floor(Math.random() * others.length)]!;
        updateStudent(target.id, s => ({
          ...s, skills: { ...s.skills, theory: clamp100(s.skills.theory + 1) },
        }));
        traitGains.push({ label: `${student.name}天赋·${target.name}理论`, delta: 1 });
      }
    }

    // social_terrorist: random other active student favor +1
    if (t.includes('social_terrorist')) {
      const others = activeStudents.filter(s => s.id !== student.id);
      if (others.length > 0) {
        const target = others[Math.floor(Math.random() * others.length)]!;
        updateStudent(target.id, s => ({ ...s, favor: clamp100(s.favor + 1) }));
        traitGains.push({ label: `${student.name}天赋·${target.name}好感`, delta: 1 });
      }
    }

    // optimization_addict: random active project with leader → progress +1%
    if (t.includes('optimization_addict')) {
      const eligible = activeProjects.filter(p => p.leaderId !== null);
      if (eligible.length > 0) {
        const proj = eligible[Math.floor(Math.random() * eligible.length)]!;
        activeProjects = activeProjects.map(p =>
          p.projectId === proj.projectId
            ? { ...p, progress: Math.min(100, p.progress + 1) }
            : p,
        );
        traitGains.push({ label: `${student.name}天赋·项目进度`, delta: 1, suffix: '%' });
      }
    }
  }

  // morale_sunshine: all active students happiness +1 (applied once if ANY student has the trait)
  if (activeStudents.some(s => s.traitIds.includes('morale_sunshine'))) {
    for (const s of activeStudents) {
      updateStudent(s.id, st => ({ ...st, happiness: clamp100(st.happiness + 1) }));
      moodChanges[s.id] = (moodChanges[s.id] ?? 0) + 1;
    }
    const sunshineStudent = activeStudents.find(s => s.traitIds.includes('morale_sunshine'));
    if (sunshineStudent) traitGains.push({ label: `${sunshineStudent.name}天赋·全员心情`, delta: 1 });
  }

  // fortune_engineer: if this student's happiness changed ≥3 times this month → engineering +2
  for (const student of activeStudents) {
    if (student.traitIds.includes('fortune_engineer')) {
      if ((moodChanges[student.id] ?? 0) >= 3) {
        updateStudent(student.id, s => ({
          ...s, skills: { ...s.skills, engineering: clamp100(s.skills.engineering + 2) },
        }));
        traitGains.push({ label: `${student.name}天赋·工程`, delta: 2 });
      }
    }
  }

  return {
    newState: {
      ...state,
      students,
      lab,
      activeProjects,
      moodChangesThisMonth: {}, // reset for the new month
    },
    traitGains,
  };
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
    const finalStudents = state.students.map(updateStudent).map(s => checkGraduation(s, next.graduationExtensions));
    const finalState = { ...next, students: finalStudents };
    const summarySlides = buildEndingSummary(finalState);
    const timeEndingId = pickTimeEnding(finalState);

    return {
      ...finalState,
      eventQueue: [{ id: timeEndingId }],
      pendingSummarySlides: summarySlides,
      // storyLog is left unchanged; each slide appends itself as the player clicks through
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
    const basePool = next.studentPool.length >= 2
      ? next.studentPool
      : [...initialPoolIds].filter(id => !next.students.some(s => s.id === id));
    const availablePool = next.time.year === 1
      ? basePool.filter(id => !year1RestrictedIds.has(id))
      : basePool;
    const candidates = drawTwoFromPool(availablePool);
    const admissionCost = getAdmissionCost(next.time.year);
    if (candidates) {
      if (next.lab.funding >= admissionCost) {
        admissionState = {
          candidates,
          round: 1,
          shownIds: [...candidates],
          recruitedCount: 0,
          hasRefreshed: false,
        };
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

  const graduatedStudents = students.map(s => checkGraduation(s, next.graduationExtensions));

  // Stall projects for students who automatically graduated/left this month, and
  // emit a one-line system notice so the player knows what happened.
  const prevActiveIds = new Set(state.students.filter(s => s.status === 'active').map(s => s.id));
  const newlyGone = graduatedStudents.filter(s => s.status !== 'active' && prevActiveIds.has(s.id));
  let stateForProjects: GameState = { ...next, students: graduatedStudents };
  for (const gone of newlyGone) {
    // Collect project names before stalling so we can mention them in the notice.
    const stalledNames = stateForProjects.activeProjects
      .filter(p => p.leaderId === gone.id)
      .map(p => projectById[p.projectId]?.name ?? p.projectId);

    stateForProjects = removeLeaderOnStudentLeave(stateForProjects, gone.id);

    const action = gone.status === 'graduated' ? '完成学业，正式毕业' : '离开了实验室';
    let notice = `${gone.name} ${action}。`;
    if (stalledNames.length > 0) {
      notice += `\n\n进行中项目《${stalledNames.join('》《')}》因负责人变动暂停，进度 -10。`;
    }
    extraLogEntries.push({
      id: `member_change_${gone.id}_y${next.time.year}m${next.time.month}`,
      time: { ...next.time },
      type: 'system',
      title: '成员动态',
      narrative: notice,
    });
  }

  // Process monthly project progression (may modify lab, activeProjects, completedProjects)
  const { newState: afterProjects, logEntries: projectLogEntries, completionEvents } =
    processMonthlyProjects(stateForProjects);

  // Monthly +1 random skill for each active project's student leader; collect gains for bulletin
  const SKILL_KEYS = ['theory', 'engineering', 'social'] as const;
  const skillGains: SkillGain[] = [];
  const stateAfterSkills = afterProjects.activeProjects.reduce<GameState>((acc, ap) => {
    if (!ap.leaderId || ap.leaderId === 'pi') return acc;
    const skill = SKILL_KEYS[Math.floor(Math.random() * 3)]!;
    const student = acc.students.find(s => s.id === ap.leaderId);
    if (!student) return acc;
    skillGains.push({ name: student.name, skill, delta: 1 });
    return {
      ...acc,
      students: acc.students.map(s =>
        s.id === ap.leaderId
          ? {
              ...s,
              skills: { ...s.skills, [skill]: clamp100(s.skills[skill] + 1) },
              // Leading a project costs mental energy each month.
              happiness: clamp100(s.happiness - 2),
            }
          : s,
      ),
    };
  }, afterProjects);

  // Track consecutive months with no active students (grace period before ending fires)
  const _hasHadStudents = afterProjects.students.length > 0;
  const _allGone = afterProjects.students.every(s => s.status !== 'active');
  const newNoStudentMonths = _hasHadStudents && _allGone ? next.noStudentMonths + 1 : 0;
  const stateAfterCounts: GameState = { ...stateAfterSkills, noStudentMonths: newNoStudentMonths };

  // Apply passive monthly trait effects (skill gains, favor/happiness adjustments, etc.)
  const { newState: stateAfterTraits, traitGains } = applyTraitMonthlyEffects(
    stateAfterCounts,
    stateAfterCounts.moodChangesThisMonth,
  );

  // Track how many times energy has been fully depleted this run.
  const depletedThisMonth = stateAfterTraits.lab.energy === 0;
  const stateWithDepletionTracked: GameState = depletedThisMonth
    ? {
        ...stateAfterTraits,
        lab: {
          ...stateAfterTraits.lab,
          energyDepletedCount: stateAfterTraits.lab.energyDepletedCount + 1,
        },
      }
    : stateAfterTraits;

  const summaryEntry = buildMonthlySummary(stateWithDepletionTracked, energyGain, skillGains, traitGains);

  // Build the seen-event set (used for both daily pool and ending checks)
  const seenEventIds = new Set(
    state.storyLog
      .filter(e => (e.type === 'event' || e.type === 'event-intro') && e.eventId != null)
      .map(e => e.eventId!),
  );

  // ── Special ending check ─────────────────────────────────────────────────
  const specialEndingId = checkSpecialEnding(stateWithDepletionTracked, seenEventIds);
  if (specialEndingId) {
    // Skip daily events; prepend ending to queue (clear existing queue so it fires first)
    return {
      ...stateWithDepletionTracked,
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
    const tutorialActiveStudents = stateWithDepletionTracked.students.filter(s => s.status === 'active');
    const tutorialStudent = tutorialActiveStudents.length > 0
      ? tutorialActiveStudents[Math.floor(Math.random() * tutorialActiveStudents.length)]
      : null;
    tutorialEvents.push({
      id: 'idea_meeting_minutes_assistant',
      ...(tutorialStudent ? { studentId: tutorialStudent.id } : {}),
    });
  }
  if (next.time.year === 1 && next.time.month === 11 && !seenEventIds.has('semester_one_checkpoint')) {
    const checkpointActiveStudents = stateWithDepletionTracked.students.filter(s => s.status === 'active');
    const checkpointStudent = checkpointActiveStudents.length > 0
      ? checkpointActiveStudents[Math.floor(Math.random() * checkpointActiveStudents.length)]
      : null;
    tutorialEvents.push({
      id: 'semester_one_checkpoint',
      ...(checkpointStudent ? { studentId: checkpointStudent.id } : {}),
    });
  }

  // independent_meeting: 当在读人数首次达到3人时触发（任何时间）
  const activeCount = stateWithDepletionTracked.students.filter(s => s.status === 'active').length;
  if (activeCount >= 3 && !seenEventIds.has('independent_meeting')) {
    tutorialEvents.push({ id: 'independent_meeting' });
  }

  // ── Daily event pool ─────────────────────────────────────────────────────
  // 新手期（第1年9–11月）不抽随机事件；有教程事件时也无需补随机
  const skipRandom = isEarlyGame || tutorialEvents.length > 0;
  const unseenPool = filterUnseen(monthlyEventPool, seenEventIds);
  const triggerablePool = filterTriggerable(unseenPool, stateWithDepletionTracked);
  // research_brainstormer: when any active student has this trait, idea events always draw (no filter).
  // Otherwise idea events are down-weighted to ~70% of normal draw rate.
  const hasResearchBrainstormer = stateWithDepletionTracked.students.some(
    s => s.status === 'active' && s.traitIds.includes('research_brainstormer'),
  );
  const IDEA_DRAW_CHANCE = hasResearchBrainstormer ? 1.0 : 0.7;
  const biasedPool = triggerablePool.filter(e =>
    !e.id.startsWith('idea_') || Math.random() < IDEA_DRAW_CHANCE,
  );
  const newQueued: QueuedEvent | null =
    !skipRandom && Math.random() < 0.7 && biasedPool.length > 0
      ? pickRandomQueuedEvent(biasedPool)
      : null;

  // ── Timed mainline events ────────────────────────────────────────────────
  const forcedEvents: QueuedEvent[] = [];

  // gpu_envy: Year 2 Month 1 — only if player never bought a server in startup_grant
  if (next.time.year === 2 && next.time.month === 1 && !seenEventIds.has('gpu_envy')
      && !next.chosenOptionIds.includes('buy_server')) {
    const anyStudent = stateWithDepletionTracked.students.find(s => s.status === 'active');
    if (anyStudent) {
      forcedEvents.push({ id: 'gpu_envy', studentId: anyStudent.id });
    }
  }

  // B-grade idea spotlight: Year 2 March and Year 2 November — surface one random unseen B-grade idea event
  if ((next.time.year === 2 && next.time.month === 3) ||
      (next.time.year === 2 && next.time.month === 11)) {
    const bGradeIds = new Set(
      Object.values(projectById).filter(p => p.grade === 'B').map(p => p.id),
    );
    const ideaCandidateIds = Object.keys(events).filter(eid => {
      if (seenEventIds.has(eid)) return false;
      const ev = events[eid];
      return ev.options?.some(opt =>
        opt.outcomes?.some(out =>
          (out.effects ?? []).some(
            eff => eff.type === 'unlockIdea' && bGradeIds.has(eff.projectId),
          ),
        ),
      ) ?? false;
    });
    const triggerable = filterTriggerable(ideaCandidateIds, stateWithDepletionTracked);
    const picked = pickRandomQueuedEvent(triggerable);
    if (picked) forcedEvents.push(picked);
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

  // pi burnout milestone events: inject directly the month the threshold is crossed.
  // These must fire reliably, so they bypass the random daily pool.
  if (depletedThisMonth) {
    const burnoutCount = stateWithDepletionTracked.lab.energyDepletedCount;
    const anyStudent = stateWithDepletionTracked.students.find(s => s.status === 'active');
    if (anyStudent) {
      if (burnoutCount === 3 && !seenEventIds.has('pi_third_burnout')) {
        forcedEvents.push({ id: 'pi_third_burnout', studentId: anyStudent.id });
      }
      if (burnoutCount === 5 && seenEventIds.has('pi_third_burnout') && !seenEventIds.has('pi_fifth_burnout')) {
        forcedEvents.push({ id: 'pi_fifth_burnout', studentId: anyStudent.id });
      }
    }
  }

  // first_paper_submission: Year 1 Month 12 — first OWRC submission
  if (next.time.year === 1 && next.time.month === 12 && !seenEventIds.has('first_paper_submission')) {
    const anyStudent = stateWithDepletionTracked.students.find(s => s.status === 'active');
    if (anyStudent) {
      forcedEvents.push({ id: 'first_paper_submission', studentId: anyStudent.id });
    }
  }

  // reviewer_two: Year 2 Month 2 — OWRC reviews arrive
  if (next.time.year === 2 && next.time.month === 2 && !seenEventIds.has('reviewer_two')) {
    const anyStudent = stateWithDepletionTracked.students.find(s => s.status === 'active');
    if (anyStudent) {
      forcedEvents.push({ id: 'reviewer_two', studentId: anyStudent.id });
    }
  }

  // lab_birthday: Year 2 Month 8
  if (next.time.year === 2 && next.time.month === 8 && !seenEventIds.has('lab_birthday')) {
    const firstStudent = stateWithDepletionTracked.students.find(s => s.status === 'active');
    if (firstStudent) {
      forcedEvents.push({ id: 'lab_birthday', studentId: firstStudent.id });
    }
  }

  // midterm_review: Year 4 October — conditional sequence based on current lab state
  if (next.time.year === 4 && next.time.month === 10 && !seenEventIds.has('midterm_review_open')) {
    const activeStudents = stateWithDepletionTracked.students.filter(s => s.status === 'active');
    const completedCount = stateWithDepletionTracked.completedProjects.length;
    const { reputation, funding, energy } = stateWithDepletionTracked.lab;

    const sequence: string[] = ['midterm_review_open'];
    if (completedCount === 0)       sequence.push('midterm_review_no_projects');
    else if (completedCount <= 2)   sequence.push('midterm_review_few_projects');
    if (activeStudents.length <= 2) sequence.push('midterm_review_low_students');
    if (reputation < 50)            sequence.push('midterm_review_low_rep');
    if (funding < 20)               sequence.push('midterm_review_low_funding');
    if (energy < 20)                sequence.push('midterm_review_low_energy');
    if (completedCount >= 3 && activeStudents.length >= 3 && reputation >= 50 && funding >= 20 && energy >= 20)
      sequence.push('midterm_review_positive');
    sequence.push('midterm_review_close');

    for (const eid of sequence) {
      if (events[eid]) forcedEvents.push({ id: eid });
    }
  }

  // industry_invite: Year 7 Month 5 — one month before the game ends, if funding is high
  // Accepting this event sets chosenOptionIds 'industry_invite_accept' → pickTimeEnding returns ending_time_wealthy
  if (next.time.year === 7 && next.time.month === 5 && !seenEventIds.has('industry_invite')
      && next.lab.funding > 150) {
    forcedEvents.push({ id: 'industry_invite' });
  }

  // graduation_check series: injected in June based on enrolledAt + 3/4/5
  if (next.time.month === 6) {
    for (const student of stateWithDepletionTracked.students.filter(s => s.status === 'active')) {
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
  for (const student of stateWithDepletionTracked.students.filter(s => s.status === 'active')) {
    if (student.favor >= 50) {
    // if (student.favor >= 5) { // test mode
      const eventId = `half_favor_${student.id}`;
      const alreadyQueued = next.eventQueue.some(e => e.id === eventId);
      if (!seenEventIds.has(eventId) && !alreadyQueued && events[eventId]) {
        forcedEvents.push({ id: eventId, studentId: student.id });
      }
    }
  }

  // Max-favor special events: one per student, triggers when favor first reaches 100
  for (const student of stateWithDepletionTracked.students.filter(s => s.status === 'active')) {
    if (student.favor >= 100) {
    // if (student.favor >= 10) { // test mode
      const eventId = `max_favor_${student.id}`;
      const alreadyQueued = next.eventQueue.some(e => e.id === eventId);
      if (!seenEventIds.has(eventId) && !alreadyQueued && events[eventId]) {
        forcedEvents.push({ id: eventId, studentId: student.id });
      }
    }
  }

  // Alumni visits: inject exactly 6 months after graduation, only if favor >= 50.
  // filterTriggerable cannot handle this (requires active status), so we inject directly.
  for (const student of stateWithDepletionTracked.students.filter(s => s.status === 'graduated')) {
    const eventId = STUDENT_ALUMNI_EVENT_IDS[student.id];
    if (!eventId || !events[eventId]) continue;
    if (!student.graduatedAt) continue;
    if (monthsElapsed(student.graduatedAt, next.time) < 6) continue;
    if (student.favor < 50) continue;
    const alreadyQueued = next.eventQueue.some(e => e.id === eventId);
    if (!seenEventIds.has(eventId) && !alreadyQueued) {
      forcedEvents.push({ id: eventId, studentId: student.id });
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
  for (const student of stateWithDepletionTracked.students.filter(s => s.status === 'active')) {
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
  const eligibleStudents = stateWithDepletionTracked.students
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
    ...(next.deferredEvents ?? []),  // events delayed by nextMonthEventIds arrive here
  ];

  // If nothing was queued this month, show a random idle event
  if (newQueue.length === 0) {
    const idleId = idleEventIds[Math.floor(Math.random() * idleEventIds.length)];
    newQueue.push({ id: idleId });
  }

  return {
    ...stateWithDepletionTracked,
    admissionState,
    eventQueue: newQueue,
    deferredEvents: [],        // consumed above; reset for the next month
    studentConditionalLog: updatedConditionalLog,
    storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries, ...projectLogEntries],
  };
}

// Re-export for engine consumers that only need to know which IDs are endings
export { specialEndingIds, timeEndingIds };
