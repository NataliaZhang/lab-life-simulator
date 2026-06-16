import type { GameEvent } from '../../types';
import { projectDefinitions } from '../projects';

// ─── Project Completion Events ─────────────────────────────────────────────
// Auto-generated from projectDefinitions. One event per project.
// These are injected directly into the event queue when a project reaches 100%.
// The reward effects live here, NOT in processMonthlyProjects.

function makeCompletionEvent(p: {
  id: string;
  name: string;
  description: string;
  completionSummary: string;
  fundingReward: number;
  reputationReward: number;
}): GameEvent {
  return {
    id: `project_complete_${p.id}`,
    title: `项目结项：${p.name}`,
    prompt: `「${p.name}」研究工作已全部完成，可以正式结项了。`,
    description: [
      `历经数月推进，「${p.name}」的研究工作宣告完成。\n\n${p.description}`,
      `📄 研究结论：${p.completionSummary}`,
    ],
    options: [
      {
        id: 'archive',
        text: '整理成果，归档结项',
        outcomes: [
          {
            weight: 1,
            narrative: `成果已整理归档。资金入账，声望提升。\n\n资金 +${p.fundingReward}万，声望 +${p.reputationReward}。`,
            effects: [
              { type: 'lab', stat: 'funding', delta: p.fundingReward },
              { type: 'lab', stat: 'reputation', delta: p.reputationReward },
            ],
          },
        ],
      },
    ],
  };
}

export const projectCompletionEvents: Record<string, GameEvent> = Object.fromEntries(
  projectDefinitions.map(p => [
    `project_complete_${p.id}`,
    makeCompletionEvent(p),
  ]),
);
