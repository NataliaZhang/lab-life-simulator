import type { EventTranslations } from '../../../types/i18n';
import type { ProjectDefinition } from '../../../types/project';
import { projectDefinitions } from '../../projects';
import { projectsEn } from '../projects';

// English counterpart of src/data/events/project_completions.ts.
// Generated per project, exactly like the Chinese version:
//   project_complete_{id}     — student-led; uses {studentName}
//   project_complete_{id}_pi  — PI-led; no student placeholder

function projectText(p: ProjectDefinition) {
  const en = projectsEn[p.id];
  return {
    name: en?.name ?? p.name,
    description: en?.description ?? p.description,
    completionSummary: en?.completionSummary ?? p.completionSummary,
  };
}

function studentLed(p: ProjectDefinition): EventTranslations[string] {
  const t = projectText(p);
  return {
    title: `${p.grade}-Tier Project Complete: ${t.name}`,
    prompt: `“${t.name}” is finished and ready to be wrapped up.`,
    description: [
      `After {projectMonths} months of work, “${t.name}” is done. {studentName} led the project and presented the results in person.\n\n${t.description}`,
      `📄 Findings: ${t.completionSummary}`,
    ],
    options: {
      archive: {
        text: 'Archive the results and close it out',
        outcomes: ['Results archived.\n\nMost of the credit goes to {studentName}.'],
      },
    },
  };
}

function piLed(p: ProjectDefinition): EventTranslations[string] {
  const t = projectText(p);
  return {
    title: `${p.grade}-Tier Project Complete: ${t.name}`,
    prompt: `“${t.name}” is finished and ready to be wrapped up.`,
    description: [
      `After {projectMonths} months of work, “${t.name}” is done. You ran this one yourself, pushed it through every stage, and gave the final presentation at group meeting.\n\n${t.description}`,
      `📄 Findings: ${t.completionSummary}`,
    ],
    options: {
      archive: {
        text: 'Archive the results and close it out',
        outcomes: ['Results archived. Seeing a project you ran yourself all the way to the finish, you feel one small step closer to tenure.'],
      },
    },
  };
}

export const projectCompletionEventsEn: EventTranslations = Object.fromEntries([
  ...projectDefinitions.map(p => [`project_complete_${p.id}`, studentLed(p)]),
  ...projectDefinitions.map(p => [`project_complete_${p.id}_pi`, piLed(p)]),
]);
