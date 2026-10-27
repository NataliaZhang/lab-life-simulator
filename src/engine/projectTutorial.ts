import type { GameState } from '../types';
import type { ProjectTutorial } from '../types/project';
import { projectById } from '../data/projects';
import { canAssignStudent, studentHasActiveProject } from './projectEngine';

// ─── First-project tutorial ────────────────────────────────────────────────
// A one-time walkthrough the first time the player holds a project idea:
// open Projects → launch the idea → pick a student as lead.
//
// Only the status is stored (GameState.projectTutorial, saved with the run).
// The current step is derived from game state plus whether the projects panel
// is open, so a reload mid-tutorial resumes at the right step. The UI locks
// everything except the current step's target; the reducer itself enforces
// nothing, so normal project rules are unchanged.
//
// The tutorial only starts when it can be finished: the idea is affordable and
// some student qualifies to lead it. Otherwise it waits (pending) until that
// changes, and is skipped for good once the player launches a project alone.

export type TutorialStep =
  | { kind: 'openProjects'; projectId: string }
  | { kind: 'launch'; projectId: string }
  | { kind: 'chooseLead'; projectId: string };

// Value of the data-tutorial-target attribute on the element each step spotlights.
export const PROJECTS_BUTTON_TARGET = 'projects';
export function tutorialTargetId(step: TutorialStep): string {
  return step.kind === 'openProjects' ? PROJECTS_BUTTON_TARGET : `${step.kind}:${step.projectId}`;
}

const DONE: ProjectTutorial = { status: 'done' };
const PENDING: ProjectTutorial = { status: 'pending' };

// Students who may lead the project now: active, qualified and not leading another project.
// These are exactly the options LeaderSelector leaves enabled.
export function tutorialLeadIds(state: GameState, projectId: string): string[] {
  const def = projectById[projectId];
  if (!def) return [];
  return state.students
    .filter(s =>
      s.status === 'active' &&
      canAssignStudent(s, def) &&
      !studentHasActiveProject(s.id, state.activeProjects))
    .map(s => s.id);
}

// Same affordability check as the idea card's launch button.
function canLaunch(state: GameState, projectId: string): boolean {
  const def = projectById[projectId];
  return !!def &&
    state.projectIdeas.includes(projectId) &&
    state.lab.energy >= def.startupEnergyCost &&
    state.lab.funding >= def.startupFundingCost;
}

// True when the remaining steps for this project can all be completed right now.
function canFinish(state: GameState, projectId: string): boolean {
  if (tutorialLeadIds(state, projectId).length === 0) return false;
  if (state.projectIdeas.includes(projectId)) return canLaunch(state, projectId);
  const active = state.activeProjects.find(p => p.projectId === projectId);
  return !!active && active.leaderId === null;
}

// Nothing else is waiting for the player (event, admission, ending summary).
function isIdle(state: GameState): boolean {
  return state.phase === 'playing' &&
    state.activeEventId === null &&
    state.admissionState === null &&
    state.pendingSummarySlides.length === 0;
}

// Moves the stored status along. gameReducer runs it after every action.
// Returns the same object when nothing changes.
export function syncProjectTutorial(state: GameState): GameState {
  const tutorial = state.projectTutorial;
  if (tutorial.status === 'done') return state;

  if (tutorial.status === 'active') {
    const active = state.activeProjects.find(p => p.projectId === tutorial.projectId);
    if (active?.leaderId) return { ...state, projectTutorial: DONE };
    if (canFinish(state, tutorial.projectId)) return state;
    // Can't be finished from here (should not happen while the UI is locked): re-evaluate as pending.
    return syncProjectTutorial({ ...state, projectTutorial: PENDING });
  }

  // The player already launched a project without the tutorial.
  if (state.activeProjects.length > 0 || state.completedProjects.length > 0) {
    return { ...state, projectTutorial: DONE };
  }
  if (!isIdle(state)) return state;
  const projectId = state.projectIdeas.find(id => canFinish(state, id));
  return projectId ? { ...state, projectTutorial: { status: 'active', projectId } } : state;
}

// The step to show, or null when the tutorial should not lock anything right now.
export function getTutorialStep(state: GameState, projectPanelOpen: boolean): TutorialStep | null {
  const tutorial = state.projectTutorial;
  if (tutorial.status !== 'active' || !isIdle(state) || !canFinish(state, tutorial.projectId)) return null;
  const { projectId } = tutorial;
  if (!projectPanelOpen) return { kind: 'openProjects', projectId };
  return state.projectIdeas.includes(projectId)
    ? { kind: 'launch', projectId }
    : { kind: 'chooseLead', projectId };
}

// A new run keeps a finished tutorial finished; anything else starts over.
export function carryOverTutorial(previous: GameState): ProjectTutorial {
  return previous.projectTutorial?.status === 'done' ? DONE : PENDING;
}
