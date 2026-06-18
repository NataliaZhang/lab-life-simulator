import type { GameState, LogEntry, QueuedEvent } from '../types';
import type { ActiveProject, CompletedProject, ProjectDefinition } from '../types/project';
import { projectById } from '../data/projects';

// ─── Helpers ───────────────────────────────────────────────────────────────

const PI_ENERGY_COST_PER_PROJECT = 15; // energy per month per PI-managed project
const LEADER_SWAP_PENALTY = 10;        // progress deducted on forced leader removal
const MAX_EFFICIENCY = 1.75;

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Returns true if the project is engineering-dominant (highest or tied-highest required dim).
function isEngineeringProject(project: ProjectDefinition): boolean {
  return (
    project.engineeringRequired >= project.theoryRequired &&
    project.engineeringRequired >= project.socialRequired &&
    project.engineeringRequired > 0
  );
}

// ─── Efficiency ────────────────────────────────────────────────────────────

// Student type minimal interface used across several helpers.
// traitIds is optional so callers that only have partial data still compile.
type StudentLike = {
  skills: { theory: number; engineering: number; social: number };
  traitIds?: string[];
};

// Effective engineering requirement after applying proof_addict trait.
function effectiveEngReq(student: StudentLike, project: ProjectDefinition): number {
  const hasProofAddict = student.traitIds?.includes('proof_addict') ?? false;
  if (hasProofAddict && project.engineeringRequired > 0) {
    return Math.max(0, project.engineeringRequired - 30);
  }
  return project.engineeringRequired;
}

// Efficiency formula: average ratio-surplus across required dimensions (required > 0).
// multiplier = clamp(1 + 0.75 × avg(skill/required − 1), 1, 1.75)
// proof_addict reduces the effective engineering requirement used in this calculation.
export function calcEfficiencyMultiplier(
  student: StudentLike,
  project: ProjectDefinition,
): number {
  const { theory, engineering, social } = student.skills;
  const engReq = effectiveEngReq(student, project);
  const ratios: number[] = [];
  if (project.theoryRequired > 0)   ratios.push(theory      / project.theoryRequired - 1);
  if (engReq > 0)                   ratios.push(engineering / engReq                 - 1);
  if (project.socialRequired > 0)   ratios.push(social      / project.socialRequired - 1);
  if (ratios.length === 0) return 1;
  const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  return clamp(1 + 0.75 * avgRatio, 1, MAX_EFFICIENCY);
}

// ─── Eligibility ───────────────────────────────────────────────────────────

// Returns true if the student meets every required dimension.
// proof_addict reduces the effective engineering requirement by 30.
export function canAssignStudent(
  student: StudentLike,
  project: ProjectDefinition,
): boolean {
  const engReq = effectiveEngReq(student, project);
  return (
    (project.theoryRequired === 0 || student.skills.theory      >= project.theoryRequired) &&
    (engReq === 0                 || student.skills.engineering  >= engReq) &&
    (project.socialRequired === 0 || student.skills.social      >= project.socialRequired)
  );
}

// Returns true if the student is currently leading any active project.
export function studentHasActiveProject(
  studentId: string,
  activeProjects: ActiveProject[],
): boolean {
  return activeProjects.some(p => p.leaderId === studentId);
}

// Returns the active project a student is currently leading, or undefined.
export function getStudentActiveProject(
  studentId: string,
  activeProjects: ActiveProject[],
): ActiveProject | undefined {
  return activeProjects.find(p => p.leaderId === studentId);
}

// ─── Leader name display ───────────────────────────────────────────────────

export function getLeaderDisplayName(
  leaderId: string | null,
  students: GameState['students'],
): string {
  if (!leaderId) return '未分配';
  if (leaderId === 'pi') return 'PI';
  return students.find(s => s.id === leaderId)?.name ?? '未分配';
}

// ─── Start a project ───────────────────────────────────────────────────────

// Moves a project idea into active projects, spending the chosen resource.
// Assumes the caller has already verified the player has enough resources.
export function startProject(
  state: GameState,
  projectId: string,
): GameState {
  const project = projectById[projectId];
  if (!project) return state;
  if (!state.projectIdeas.includes(projectId)) return state;

  // Deduct whatever fixed costs the project requires (energy and/or funding)
  const newEnergy = project.startupEnergyCost > 0
    ? clamp(state.lab.energy - project.startupEnergyCost, 0, 100)
    : state.lab.energy;
  const newFunding = project.startupFundingCost > 0
    ? Math.max(0, state.lab.funding - project.startupFundingCost)
    : state.lab.funding;

  const newProject: ActiveProject = { projectId, progress: 0, leaderId: null };

  return {
    ...state,
    lab: { ...state.lab, energy: newEnergy, funding: newFunding },
    projectIdeas: state.projectIdeas.filter(id => id !== projectId),
    activeProjects: [...state.activeProjects, newProject],
  };
}

// ─── Assign / remove leader ────────────────────────────────────────────────

// Assigns a leader to a project. If there was already a leader, applies the
// forced-removal progress penalty first — unless the current leader has optimistic_heart.
export function assignLeader(
  state: GameState,
  projectId: string,
  newLeaderId: string, // 'pi' or a student ID
): GameState {
  const projectIdx = state.activeProjects.findIndex(p => p.projectId === projectId);
  if (projectIdx === -1) return state;

  const project = state.activeProjects[projectIdx]!;
  const isSwap = project.leaderId !== null && project.leaderId !== newLeaderId;

  // optimistic_heart: no progress penalty when the current leader is swapped out
  const currentLeader = project.leaderId
    ? state.students.find(s => s.id === project.leaderId)
    : null;
  const swapIsFree = currentLeader?.traitIds.includes('optimistic_heart') ?? false;

  const updatedProgress = isSwap && !swapIsFree
    ? Math.max(0, project.progress - LEADER_SWAP_PENALTY)
    : project.progress;

  const updatedProject: ActiveProject = {
    ...project,
    progress: updatedProgress,
    leaderId: newLeaderId,
  };

  const newActiveProjects = state.activeProjects.map((p, i) =>
    i === projectIdx ? updatedProject : p,
  );

  return { ...state, activeProjects: newActiveProjects };
}

// Clears a project's leader (stalls the project). No penalty.
export function removeLeader(state: GameState, projectId: string): GameState {
  return {
    ...state,
    activeProjects: state.activeProjects.map(p =>
      p.projectId === projectId ? { ...p, leaderId: null } : p,
    ),
  };
}

// Called when a student graduates or leaves. Stalls any project they were leading.
// optimistic_heart: no progress penalty on the departing leader's projects.
export function removeLeaderOnStudentLeave(
  state: GameState,
  studentId: string,
): GameState {
  const student = state.students.find(s => s.id === studentId);
  const swapIsFree = student?.traitIds.includes('optimistic_heart') ?? false;

  return {
    ...state,
    activeProjects: state.activeProjects.map(p => {
      if (p.leaderId !== studentId) return p;
      return {
        ...p,
        leaderId: null,
        progress: swapIsFree ? p.progress : Math.max(0, p.progress - LEADER_SWAP_PENALTY),
      };
    }),
  };
}

// ─── Dominant skill for project completion reward ─────────────────────────

// Returns the skill key with the highest required value. Ties broken randomly.
export function getDominantSkill(project: ProjectDefinition): 'theory' | 'engineering' | 'social' {
  const { theoryRequired: t, engineeringRequired: e, socialRequired: s } = project;
  const max = Math.max(t, e, s);
  const tied: Array<'theory' | 'engineering' | 'social'> = [];
  if (t === max) tied.push('theory');
  if (e === max) tied.push('engineering');
  if (s === max) tied.push('social');
  return tied[Math.floor(Math.random() * tied.length)]!;
}

// ─── Monthly project progression ───────────────────────────────────────────

interface MonthlyProjectResult {
  newState: GameState;
  completedProjectIds: string[];
  logEntries: LogEntry[];
  completionEvents: QueuedEvent[];
}

export function processMonthlyProjects(state: GameState): MonthlyProjectResult {
  let lab = { ...state.lab };
  let students = [...state.students];
  const completedProjectIds: string[] = [];
  const logEntries: LogEntry[] = [];
  const completionEvents: QueuedEvent[] = [];
  const completed: CompletedProject[] = [];

  const updatedActives: ActiveProject[] = [];

  // Does any active student have time_manager?
  const hasTimeManager = students.some(
    s => s.status === 'active' && s.traitIds.includes('time_manager'),
  );

  for (const ap of state.activeProjects) {
    const projectDef = projectById[ap.projectId];
    if (!projectDef) {
      updatedActives.push(ap);
      continue;
    }

    // No leader → stalled, no progress
    if (ap.leaderId === null) {
      updatedActives.push(ap);
      continue;
    }

    let monthlyGain: number;

    if (ap.leaderId === 'pi') {
      // PI self-manages; time_manager boosts progress but raises energy cost
      const energyCost = hasTimeManager
        ? Math.round(PI_ENERGY_COST_PER_PROJECT * 1.6)
        : PI_ENERGY_COST_PER_PROJECT;

      if (lab.energy < energyCost) {
        // Not enough energy → project stalls, remove leader
        updatedActives.push({ ...ap, leaderId: null });
        logEntries.push({
          id: `project_pi_stall_${ap.projectId}_${state.time.year}_${state.time.month}`,
          time: { ...state.time },
          type: 'system',
          title: `「${projectDef.name}」进度停滞`,
          narrative: `PI 精力不足，「${projectDef.name}」本月无法推进，项目负责人解除。请重新分配负责人。`,
        });
        continue;
      }
      lab = { ...lab, energy: Math.max(0, lab.energy - energyCost) };
      monthlyGain = projectDef.baseMonthlyProgress * (hasTimeManager ? 1.5 : 1);
    } else {
      // Student leads
      const student = students.find(s => s.id === ap.leaderId && s.status === 'active');
      if (!student) {
        // Student no longer active — stall (should have been caught by removeLeaderOnStudentLeave)
        updatedActives.push({ ...ap, leaderId: null });
        continue;
      }

      const multiplier = canAssignStudent(student, projectDef)
        ? calcEfficiencyMultiplier(student, projectDef)
        : 1;
      monthlyGain = projectDef.baseMonthlyProgress * multiplier;

      // ── Trait-based progress modifiers ──────────────────────────────────

      // ddl_warrior: progress already > 80% → monthly gain ×2
      if (student.traitIds.includes('ddl_warrior') && ap.progress >= 80) {
        monthlyGain *= 2;
      }

      // dream_debugger: engineering-dominant project → +2% absolute, else -1%
      if (student.traitIds.includes('dream_debugger')) {
        monthlyGain += isEngineeringProject(projectDef) ? 2 : -1;
      }

      // proof_addict: engineering required > 0 → monthly gain -1%
      if (student.traitIds.includes('proof_addict') && projectDef.engineeringRequired > 0) {
        monthlyGain -= 1;
      }

      // research_mysticism: mood multiplier
      if (student.traitIds.includes('research_mysticism')) {
        if (student.happiness > 60) monthlyGain *= 1.2;
        else if (student.happiness < 40) monthlyGain *= 0.8;
      }

      // network_magnet: -1% absolute, but +4 reputation on completion (handled below)
      if (student.traitIds.includes('network_magnet')) {
        monthlyGain -= 1;
      }

      monthlyGain = Math.max(0, monthlyGain);
    }

    const newProgress = Math.min(100, ap.progress + monthlyGain);

    if (newProgress >= 100) {
      completedProjectIds.push(ap.projectId);
      completed.push({ projectId: ap.projectId, leaderId: ap.leaderId, completedAt: { ...state.time } });

      // Apply trait-based completion bonuses for student leaders
      if (ap.leaderId && ap.leaderId !== 'pi') {
        const leader = students.find(s => s.id === ap.leaderId);
        if (leader?.traitIds.includes('startup_saint')) {
          lab = { ...lab, funding: lab.funding + 3 };
        }
        if (leader?.traitIds.includes('product_mindset')) {
          lab = { ...lab, reputation: lab.reputation + 2 };
        }
        if (leader?.traitIds.includes('network_magnet')) {
          lab = { ...lab, reputation: lab.reputation + 4 };
        }
        completionEvents.push({ id: `project_complete_${ap.projectId}`, studentId: ap.leaderId });
      } else {
        completionEvents.push({ id: `project_complete_${ap.projectId}` });
      }
    } else {
      updatedActives.push({ ...ap, progress: newProgress });
    }
  }

  const newState: GameState = {
    ...state,
    lab,
    students,
    activeProjects: updatedActives,
    completedProjects: [...state.completedProjects, ...completed],
  };

  return { newState, completedProjectIds, logEntries, completionEvents };
}
