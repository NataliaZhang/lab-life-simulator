import type { GameTime } from './index';

// ─── Project Definition ────────────────────────────────────────────────────
// Static project data defined in src/data/projects.ts.

export type ProjectGrade = 'C' | 'B' | 'A' | 'S';

export interface ProjectDefinition {
  id: string;
  name: string;
  description: string;
  grade: ProjectGrade;           // C = tutorial, B = short, A = normal, S = long
  ideaSources: string[];         // Human-readable sources (e.g. "Reviewer #2 事件")

  startupEnergyCost: number;     // Option A: PI writes proposal, costs energy
  startupFundingCost: number;    // Option B: buy external resources, costs funding (万)

  theoryRequired: number;        // Minimum student skills to be assigned
  engineeringRequired: number;
  socialRequired: number;

  baseMonthlyProgress: number;   // % added per month (e.g. 15 for short, 8 for normal, 5 for long)

  fundingReward: number;         // 万元 awarded on completion
  reputationReward: number;      // reputation points awarded on completion
  completionSummary: string;     // one-sentence academic-style result summary (shown in completion event)
}

// ─── Runtime Project State ─────────────────────────────────────────────────

export interface ActiveProject {
  projectId: string;
  progress: number;        // 0–100
  // null = stalled (no leader), 'pi' = PI self-managing, studentId = a student
  leaderId: string | null;
  startedAt?: GameTime;    // when the project was started (set in startProject)
}

export interface CompletedProject {
  projectId: string;
  leaderId: string | null;
  completedAt: GameTime;
}
