import type { GameState, LogEntry, QueuedEvent } from '../types';
import type { ActiveProject, CompletedProject, ProjectDefinition } from '../types/project';
import { projectById } from '../data/projects';

// ─── Helpers ───────────────────────────────────────────────────────────────

const PI_ENERGY_COST_PER_PROJECT = 15; // energy per month per PI-managed project
const LEADER_SWAP_PENALTY = 30;        // progress deducted on forced leader removal
const MAX_EFFICIENCY = 1.75;

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// ─── Efficiency ────────────────────────────────────────────────────────────

export function calcEfficiencyMultiplier(
  student: { skills: { theory: number; engineering: number; social: number } },
  project: ProjectDefinition,
): number {
  const { theory, engineering, social } = student.skills;
  const surplus =
    (theory - project.theoryRequired) *
    (engineering - project.engineeringRequired) *
    (social - project.socialRequired);
  return clamp(1 + surplus / 200, 1, MAX_EFFICIENCY);
}

// ─── Eligibility ───────────────────────────────────────────────────────────

// Returns true if the student meets all three skill requirements for the project.
export function canAssignStudent(
  student: { skills: { theory: number; engineering: number; social: number } },
  project: ProjectDefinition,
): boolean {
  return (
    student.skills.theory >= project.theoryRequired &&
    student.skills.engineering >= project.engineeringRequired &&
    student.skills.social >= project.socialRequired
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
// forced-removal progress penalty first.
export function assignLeader(
  state: GameState,
  projectId: string,
  newLeaderId: string, // 'pi' or a student ID
): GameState {
  const projectIdx = state.activeProjects.findIndex(p => p.projectId === projectId);
  if (projectIdx === -1) return state;

  const project = state.activeProjects[projectIdx]!;
  const isSwap = project.leaderId !== null && project.leaderId !== newLeaderId;

  const updatedProgress = isSwap
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

// Called when a student graduates or leaves. Applies forced-removal penalty
// and stalls any project they were leading.
export function removeLeaderOnStudentLeave(
  state: GameState,
  studentId: string,
): GameState {
  return {
    ...state,
    activeProjects: state.activeProjects.map(p => {
      if (p.leaderId !== studentId) return p;
      return {
        ...p,
        leaderId: null,
        progress: Math.max(0, p.progress - LEADER_SWAP_PENALTY),
      };
    }),
  };
}

// ─── Monthly project progression ───────────────────────────────────────────

interface MonthlyProjectResult {
  newState: GameState;
  completedProjectIds: string[];
  logEntries: LogEntry[];
  completionEvents: QueuedEvent[]; // injected into the month's event queue
}

export function processMonthlyProjects(state: GameState): MonthlyProjectResult {
  let lab = { ...state.lab };
  let students = [...state.students];
  const completedProjectIds: string[] = [];
  const logEntries: LogEntry[] = [];
  const completionEvents: QueuedEvent[] = [];
  const completed: CompletedProject[] = [];

  const updatedActives: ActiveProject[] = [];

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
      // PI self-manages: check energy
      if (lab.energy < PI_ENERGY_COST_PER_PROJECT) {
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
      lab = { ...lab, energy: Math.max(0, lab.energy - PI_ENERGY_COST_PER_PROJECT) };
      monthlyGain = projectDef.baseMonthlyProgress;
    } else {
      // Student leads
      const student = students.find(s => s.id === ap.leaderId && s.status === 'active');
      if (!student) {
        // Student no longer active — stall (should have been handled by removeLeaderOnStudentLeave,
        // but guard here as well)
        updatedActives.push({ ...ap, leaderId: null });
        continue;
      }
      const multiplier = canAssignStudent(student, projectDef)
        ? calcEfficiencyMultiplier(student, projectDef)
        : 1;
      monthlyGain = projectDef.baseMonthlyProgress * multiplier;
    }

    const newProgress = Math.min(100, ap.progress + monthlyGain);

    if (newProgress >= 100) {
      // Project complete — rewards are applied via the completion event, not here
      completedProjectIds.push(ap.projectId);
      completed.push({ projectId: ap.projectId, leaderId: ap.leaderId, completedAt: { ...state.time } });
      completionEvents.push({ id: `project_complete_${ap.projectId}` });
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
