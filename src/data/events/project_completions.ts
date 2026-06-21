import type { GameEvent } from '../../types';
import type { ProjectDefinition } from '../../types/project';
import { projectDefinitions } from '../projects';
import { getDominantSkill } from '../../engine/projectEngine';

// ─── Project Completion Events ─────────────────────────────────────────────
// Auto-generated from projectDefinitions. Two events per project:
//   project_complete_{id}     — student-led; uses {studentName}
//   project_complete_{id}_pi  — PI-led; no {studentName} placeholder
// These are injected directly into the event queue when a project reaches 100%.
// Lab rewards and student skill/favor gains all live here as effects.

function makeCompletionEvent(p: ProjectDefinition): GameEvent {
  const dominant = getDominantSkill(p);
  const skillStat = `skills.${dominant}` as 'skills.theory' | 'skills.engineering' | 'skills.social';

  return {
    id: `project_complete_${p.id}`,
    title: `${p.grade}级项目结项：${p.name}`,
    prompt: `「${p.name}」的研究工作已全部完成，可以正式结项了。`,
    description: [
      `历经{projectMonths}个月推进，「${p.name}」的研究工作宣告完成。{studentName}主导了这个项目并亲自汇报进展。\n\n${p.description}`,
      `📄 研究结论：${p.completionSummary}`,
    ],
    options: [
      {
        id: 'archive',
        text: '整理成果，归档结项',
        outcomes: [
          {
            weight: 1,
            narrative: `成果已整理归档。\n\n{studentName}功不可没。`,
            effects: [
              { type: 'lab', stat: 'funding', delta: p.fundingReward },
              { type: 'lab', stat: 'reputation', delta: p.reputationReward },
              { type: 'randomStudent', stat: skillStat, delta: 10 },
            ],
          },
        ],
      },
    ],
  };
}

// PI-led variant: no {studentName} in text; skill bonus goes to a random student.
function makePICompletionEvent(p: ProjectDefinition): GameEvent {

  return {
    id: `project_complete_${p.id}_pi`,
    title: `${p.grade}级项目结项：${p.name}`,
    prompt: `「${p.name}」的研究工作已全部完成，可以正式结项了。`,
    description: [
      `历经{projectMonths}个月推进，「${p.name}」的研究工作宣告完成。这个项目由你亲自主导，你完成了所有阶段的推进并在组会上做了最终汇报。\n\n${p.description}`,
      `📄 研究结论：${p.completionSummary}`,
    ],
    options: [
      {
        id: 'archive',
        text: '整理成果，归档结项',
        outcomes: [
          {
            weight: 1,
            narrative: `成果已整理归档。看着亲手负责的项目圆满完成，你感觉离tenure又近了一小步。`,
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

export const projectCompletionEvents: Record<string, GameEvent> = Object.fromEntries([
  ...projectDefinitions.map(p => [`project_complete_${p.id}`, makeCompletionEvent(p)]),
  ...projectDefinitions.map(p => [`project_complete_${p.id}_pi`, makePICompletionEvent(p)]),
]);
