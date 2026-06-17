import type { GameEvent } from '../../types';
import type { ProjectDefinition } from '../../types/project';
import { projectDefinitions } from '../projects';
import { getDominantSkill } from '../../engine/projectEngine';

// ─── Project Completion Events ─────────────────────────────────────────────
// Auto-generated from projectDefinitions. One event per project.
// These are injected directly into the event queue when a project reaches 100%.
// Lab rewards and student skill/favor gains all live here as effects.

function makeCompletionEvent(p: ProjectDefinition): GameEvent {
  const dominant = getDominantSkill(p);
  const skillStat = `skills.${dominant}` as 'skills.theory' | 'skills.engineering' | 'skills.social';

  return {
    id: `project_complete_${p.id}`,
    title: `项目结项：${p.name}`,
    prompt: `「${p.name}」的研究工作已全部完成，可以正式结项了。`,
    description: [
      `历经数月推进，「${p.name}」的研究工作宣告完成。{studentName}主导了这个项目并亲自汇报进展。\n\n${p.description}`,
      `📄 研究结论：${p.completionSummary}`,
    ],
    options: [
      {
        id: 'archive',
        text: '整理成果，归档结项',
        outcomes: [
          {
            weight: 1,
            narrative: `成果已整理归档，{studentName}功不可没。`,
            effects: [
              { type: 'lab', stat: 'funding', delta: p.fundingReward },
              { type: 'lab', stat: 'reputation', delta: p.reputationReward },
              { type: 'randomStudent', stat: skillStat, delta: 10 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
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
