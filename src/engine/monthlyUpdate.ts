import type { GameState, LogEntry, Student, AdmissionState, QueuedEvent, EventCondition, ConditionOp, StudentStatKey, StatChange, Locale, LocalizedText } from '../types';
import { events, monthlyEventPool, conditionalStudentEventPool, idleEventIds, specialEndingIds, timeEndingIds } from '../data/events';
import { filterUnseen, filterTriggerable, pickRandomQueuedEvent } from './eventQueue';
import { initialPoolIds, year1RestrictedIds } from '../data/studentPool';
import { processMonthlyProjects, removeLeaderOnStudentLeave } from './projectEngine';
import { projectById } from '../data/projects';
import { bothLocales } from '../i18n/locale';
import { getMessages } from '../i18n/messages';
import { getProjectText, nameOf } from '../i18n/content';

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

type SkillKey = 'theory' | 'engineering' | 'social';
type SkillGain = { student: Student; skill: SkillKey; delta: number };

// Trait stat-pill label, e.g. "林小卷天赋·好感" / "Jamie Lin (trait) · Rapport".
function traitLabel(student: Student, stat: (l: Locale) => string, target?: Student): LocalizedText {
  return bothLocales(l => {
    const m = getMessages(l).engine;
    return target
      ? m.traitGainOther(nameOf(student, l), nameOf(target, l), stat(l))
      : m.traitGain(nameOf(student, l), stat(l));
  });
}

const statName = (key: keyof ReturnType<typeof getMessages>['stat']) => (l: Locale) => getMessages(l).stat[key];

function projectName(projectId: string, locale: Locale): string {
  const def = projectById[projectId];
  return def ? getProjectText(def, locale).name : projectId;
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

  // Build StatChange pills (rendered as chips, not inline text)
  const statChanges: StatChange[] = [];
  if (energyGain > 0) statChanges.push({ label: bothLocales(statName('energy')), delta: energyGain });
  for (const g of skillGains) {
    statChanges.push({
      label: bothLocales(l => getMessages(l).engine.statFor(nameOf(g.student, l), getMessages(l).stat[g.skill])),
      delta: g.delta,
    });
  }
  statChanges.push(...traitGains);

  const narrative = bothLocales(l => {
    const m = getMessages(l);
    let text = m.engine.monthlyLab(m.money(state.lab.funding), state.lab.reputation, state.lab.energy);

    if (activeStudents.length > 0) {
      const lines = activeStudents.map(s =>
        m.engine.monthlyMember(nameOf(s, l), Math.round(s.favor), Math.round(s.happiness)),
      );
      text += `\n\n${m.engine.monthlyMembers(lines)}`;
    }

    if (state.activeProjects.length > 0) {
      const projectLines = state.activeProjects
        .map(ap => {
          if (!projectById[ap.projectId]) return null;
          const progress = Math.round(ap.progress);
          const leader = ap.leaderId ? state.students.find(s => s.id === ap.leaderId) : undefined;
          const leaderName =
            ap.leaderId === null ? m.engine.leaderUnassigned :
            ap.leaderId === 'pi'  ? m.engine.leaderYou :
            (leader ? nameOf(leader, l) : m.engine.leaderUnknown);
          return m.engine.monthlyProject(projectName(ap.projectId, l), progress, leaderName);
        })
        .filter((x): x is string => x !== null);
      if (projectLines.length > 0) text += `\n\n${m.engine.monthlyProjects(projectLines)}`;
    }

    if (justGraduated.length > 0) {
      text += `\n\n${m.engine.monthlyGraduated(m.list(justGraduated.map(s => nameOf(s, l))))}`;
    }
    return text;
  });

  return {
    id: `monthly_${state.time.year}_${state.time.month}`,
    time: state.time,
    type: 'monthly',
    title: bothLocales(l => getMessages(l).time.full(state.time.year, state.time.month)),
    narrative,
    statChanges: statChanges.length > 0 ? statChanges : undefined,
  };
}

// ─── Ending helpers ────────────────────────────────────────────────────────

// Builds ending-summary paragraphs for one-at-a-time reveal.
// Returns one entry per click, each holding every language. The paragraph split is
// computed once from the Chinese text so all languages always have the same slide count.
function buildEndingSummary(state: GameState): LocalizedText[] {
  const graduated = state.students.filter(s => s.status === 'graduated');
  const active = state.students.filter(s => s.status === 'active');
  const left = state.students.filter(s => s.status === 'left');

  const blocks = (l: Locale): string[] => {
    const m = getMessages(l);
    const t = m.engine.summary;
    const names = (list: Student[]) => m.list(list.map(s => nameOf(s, l)));
    const out: string[] = [t.opening, t.finalLab(state.lab.reputation, m.money(state.lab.funding))];

    if (graduated.length > 0) {
      out.push(t.graduated(graduated.length, names(graduated)));

      // Average graduation duration: graduatedAt.year - enrolledAt
      const durations = graduated
        .filter(s => s.graduatedAt != null)
        .map(s => s.graduatedAt!.year - s.enrolledAt);
      if (durations.length > 0) {
        const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
        const avgRounded = Math.round(avg * 10) / 10;
        out.push(t.avgDuration(avgRounded));
        if (avg > 4) out.push(t.avgLong);
        else if (avg >= 3.5) out.push(t.avgMedium);
        else out.push(t.avgShort);
      }
    } else {
      out.push(t.noneGraduated);
    }

    if (active.length > 0) {
      out.push(t.active(active.length, active.map(s => t.activeStudent(nameOf(s, l), s.year))));
    }

    if (left.length > 0) {
      out.push(t.left(names(left)));
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
        (gradeNames[def.grade] ??= []).push(getProjectText(def, l).name);
      }
      const gradeParts = gradeOrder
        .filter(g => (gradeNames[g]?.length ?? 0) > 0)
        .map(g => t.projectGrade(g, gradeNames[g]!));
      if (gradeParts.length > 0) {
        out.push(t.projects(totalStarted, state.completedProjects.length, conversionRate));
        out.push(t.projectGradesJoin(gradeParts));
      } else {
        out.push(t.projectsNoneDone(totalStarted));
      }
    }

    out.push(t.closing);

    // Split on double newlines so each logical block becomes one reveal-click.
    return out
      .join('\n\n')
      .split('\n\n')
      .map(x => x.trim())
      .filter(x => x.length > 0);
  };

  const zhSlides = blocks('zh');
  const enSlides = blocks('en');
  return zhSlides.map((zh, i) => ({ zh, en: enSlides[i] ?? zh }));
}

// Selects which time-exhausted ending to trigger based on final state.
// Priority order matches the comment in endings.ts.
function pickTimeEnding(state: GameState): string {
  const graduated = state.students.filter(s => s.status === 'graduated').length;
  const rep = state.lab.reputation;
  const completed = state.completedProjects.length;

  // Player explicitly chose industry path via industry_invite event
  if (state.chosenOptionIds.includes('industry_invite_accept')) return 'ending_time_wealthy';

  if (rep > 260 && graduated > 4)                   return 'ending_time_famous';
  if (rep > 220 && graduated > 3)                   return 'ending_time_great';
  if (rep > 160 && graduated >= 2)                  return 'ending_time_steady';
  if (rep > 160 && completed >= 5 && graduated === 0) return 'ending_be_no_successor';
  if (rep < 120)                                    return 'ending_be_rep_low';
  if (completed < 5)                                return 'ending_be_proj_insufficient';
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

    // last_minute_genius: leading any project → favor +2
    if (t.includes('last_minute_genius') && state.activeProjects.some(p => p.leaderId === student.id)) {
      updateStudent(student.id, s => ({ ...s, favor: clamp100(s.favor + 2) }));
      traitGains.push({ label: traitLabel(student, statName('favor')), delta: 2 });
    }

    // sleep_learning: random skill +2
    if (t.includes('sleep_learning')) {
      const SKILLS = ['theory', 'engineering', 'social'] as const;
      const skill = SKILLS[Math.floor(Math.random() * 3)]!;
      updateStudent(student.id, s => ({
        ...s, skills: { ...s.skills, [skill]: clamp100(s.skills[skill] + 2) },
      }));
      traitGains.push({ label: traitLabel(student, statName(skill)), delta: 2 });
    }

    // weird_paper_collector: theory +2
    if (t.includes('weird_paper_collector')) {
      updateStudent(student.id, s => ({
        ...s, skills: { ...s.skills, theory: clamp100(s.skills.theory + 2) },
      }));
      traitGains.push({ label: traitLabel(student, statName('theory')), delta: 2 });
    }

    // curiosity_overload: engineering +2, lab energy -1
    if (t.includes('curiosity_overload')) {
      updateStudent(student.id, s => ({
        ...s, skills: { ...s.skills, engineering: clamp100(s.skills.engineering + 2) },
      }));
      lab = { ...lab, energy: Math.max(0, lab.energy - 1) };
      traitGains.push({ label: traitLabel(student, statName('engineering')), delta: 2 });
    }

    // research_brainstormer: flat -1 energy cost per month for boosted idea draw
    if (t.includes('research_brainstormer')) {
      lab = { ...lab, energy: Math.max(0, lab.energy - 1) };
    }

    // reliable_senior: random other active student theory +2
    if (t.includes('reliable_senior')) {
      const others = activeStudents.filter(s => s.id !== student.id);
      if (others.length > 0) {
        const target = others[Math.floor(Math.random() * others.length)]!;
        updateStudent(target.id, s => ({
          ...s, skills: { ...s.skills, theory: clamp100(s.skills.theory + 2) },
        }));
        traitGains.push({ label: traitLabel(student, statName('theory'), target), delta: 2 });
      }
    }

    // social_terrorist: random other active student favor +2
    if (t.includes('social_terrorist')) {
      const others = activeStudents.filter(s => s.id !== student.id);
      if (others.length > 0) {
        const target = others[Math.floor(Math.random() * others.length)]!;
        updateStudent(target.id, s => ({ ...s, favor: clamp100(s.favor + 2) }));
        traitGains.push({ label: traitLabel(student, statName('favor'), target), delta: 2 });
      }
    }

    // optimization_addict: random active project with leader → progress +3%
    if (t.includes('optimization_addict')) {
      const eligible = activeProjects.filter(p => p.leaderId !== null);
      if (eligible.length > 0) {
        const proj = eligible[Math.floor(Math.random() * eligible.length)]!;
        activeProjects = activeProjects.map(p =>
          p.projectId === proj.projectId
            ? { ...p, progress: Math.min(100, p.progress + 3) }
            : p,
        );
        traitGains.push({ label: traitLabel(student, statName('projectProgress')), delta: 3, suffix: '%' });
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
    if (sunshineStudent) {
      traitGains.push({ label: traitLabel(sunshineStudent, l => getMessages(l).engine.everyoneMood), delta: 1 });
    }
  }

  // fortune_engineer: if this student's happiness changed ≥2 times this month → engineering +3
  for (const student of activeStudents) {
    if (student.traitIds.includes('fortune_engineer')) {
      if ((moodChanges[student.id] ?? 0) >= 2) {
        updateStudent(student.id, s => ({
          ...s, skills: { ...s.skills, engineering: clamp100(s.skills.engineering + 3) },
        }));
        traitGains.push({ label: traitLabel(student, statName('engineering')), delta: 3 });
      }
    }
  }

  // High-happiness passive bonus: happiness > 90 → favor +1 each month
  for (const student of activeStudents) {
    if (student.happiness > 90) {
      updateStudent(student.id, s => ({ ...s, favor: clamp100(s.favor + 1) }));
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
          title: bothLocales(l => getMessages(l).engine.noFundsTitle),
          narrative: bothLocales(l => getMessages(l).engine.noFundsNarrative(getMessages(l).money(admissionCost))),
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
    // Collect project IDs before stalling so we can mention them in the notice.
    const stalledIds = stateForProjects.activeProjects
      .filter(p => p.leaderId === gone.id)
      .map(p => p.projectId);

    stateForProjects = removeLeaderOnStudentLeave(stateForProjects, gone.id);

    const notice = bothLocales(l => {
      const m = getMessages(l).engine;
      const name = nameOf(gone, l);
      let text = gone.status === 'graduated' ? m.memberGraduated(name) : m.memberLeft(name);
      if (stalledIds.length > 0) {
        text += `\n\n${m.memberStalledProjects(stalledIds.map(id => projectName(id, l)))}`;
      }
      return text;
    });
    extraLogEntries.push({
      id: `member_change_${gone.id}_y${next.time.year}m${next.time.month}`,
      time: { ...next.time },
      type: 'system',
      title: bothLocales(l => getMessages(l).engine.memberChangeTitle),
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
    skillGains.push({ student, skill, delta: 1 });
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

  // independent_meeting（3人）与 independent_meeting_4（4人）互斥：两者只会触发一个。
  // 谁的条件先被满足，谁就触发，并永久拦住另一个——即使招募跳过3人直接到4人，
  // 或者后续人数继续变化，也不会补触发已被拦住的那个。
  const activeCount = stateWithDepletionTracked.students.filter(s => s.status === 'active').length;
  const independentMeetingResolved = seenEventIds.has('independent_meeting') || seenEventIds.has('independent_meeting_4');
  if (!independentMeetingResolved) {
    if (activeCount >= 4) {
      tutorialEvents.push({ id: 'independent_meeting_4' });
    } else if (activeCount >= 3) {
      tutorialEvents.push({ id: 'independent_meeting' });
    }
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
    else if (completedCount <= 3)   sequence.push('midterm_review_few_projects');
    if (activeStudents.length <= 2) sequence.push('midterm_review_low_students');
    if (reputation < 60)            sequence.push('midterm_review_low_rep');
    if (funding < 20)               sequence.push('midterm_review_low_funding');
    if (energy < 20)                sequence.push('midterm_review_low_energy');
    if (completedCount >= 4 && activeStudents.length >= 3 && reputation >= 60 && funding >= 20 && energy >= 20)
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
  //   1. If happiness <= 0 for the FIRST month → grace period: student enters happinessWarned,
  //      Pass 2 still runs so low-mood conditional events can fire. Departure is deferred.
  //   2. If happiness <= 0 for a SECOND consecutive month → forced departure, skip Pass 2.
  //   3. Recovery (happiness > 0) removes student from happinessWarned.
  //   4. Each event in conditionalStudentEventPool fires at most once per student.
  //   5. At least 2 months must pass between any two conditional events for the same student.
  //   6. At most one conditional event queued per month across all students.

  const CONDITIONAL_COOLDOWN = 2; // months
  let updatedConditionalLog = { ...next.studentConditionalLog };

  const prevWarned = new Set(stateWithDepletionTracked.happinessWarned ?? []);
  const newWarned: string[] = [];

  // Pass 1: grace-period logic for happiness = 0.
  const crisisStudentIds = new Set<string>();
  for (const student of stateWithDepletionTracked.students.filter(s => s.status === 'active')) {
    if (student.happiness <= 0) {
      if (prevWarned.has(student.id)) {
        // Second consecutive month at 0 → depart now.
        crisisStudentIds.add(student.id);
        const alreadyQueued = next.eventQueue.some(
          e => e.id === 'student_crisis_departure' && e.studentId === student.id,
        );
        if (!alreadyQueued) {
          forcedEvents.push({ id: 'student_crisis_departure', studentId: student.id });
        }
        // Do NOT add back to newWarned; they're leaving.
      } else {
        // First month at 0 → grace period: record warning, let Pass 2 fire low-mood events.
        newWarned.push(student.id);
      }
    }
    // Students with happiness > 0 are naturally excluded from newWarned (recovery clears warning).
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
    happinessWarned: newWarned,
    storyLog: [...state.storyLog, summaryEntry, ...extraLogEntries, ...projectLogEntries],
  };
}

// Re-export for engine consumers that only need to know which IDs are endings
export { specialEndingIds, timeEndingIds };
