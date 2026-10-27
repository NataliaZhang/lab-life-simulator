// English UI and engine strings. Typed against zh.ts — a missing key is a compile error.
// Terminology follows the glossary in LOCALIZATION_GUIDE.md.

import type { Messages } from './zh';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Funding is stored in 万元 (10,000). English shows dollars: 5 → $50K, 150 → $1.5M.
function money(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const thousands = Math.abs(amount) * 10;
  if (thousands >= 1000) {
    const millions = Math.round((thousands / 1000) * 100) / 100;
    return `${sign}$${millions}M`;
  }
  return `${sign}$${Math.round(thousands * 10) / 10}K`;
}

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

export const en: Messages = {
  stat: {
    funding: 'Funding',
    reputation: 'Reputation',
    energy: 'Energy',
    energyDepletedCount: 'Burnouts',
    favor: 'Rapport',
    happiness: 'Mood',
    projectProgress: 'Project progress',
    theory: 'Theory',
    engineering: 'Engineering',
    social: 'Social',
  },

  money,
  moneyShort: money,
  moneyDelta: (delta: number) => (delta >= 0 ? `+${money(delta)}` : `−${money(-delta)}`),

  time: {
    full: (year: number, month: number) => `Year ${year} · ${MONTHS[month - 1] ?? month}`,
    compact: (year: number, month: number) => `Y${year} ${MONTHS[month - 1] ?? month}`,
    log: (year: number, month: number) => `Year ${year} · ${MONTHS[month - 1] ?? month}`,
    short: (year: number, month: number) => `Y${year} ${MONTHS[month - 1] ?? month}`,
  },

  list: (items: string[]) => items.join(', '),

  app: {
    title: 'Lab Simulator',
    start: 'Start',
    continue: 'Continue',
    chooseFirst: 'Make a choice first',
    fontSmaller: 'Smaller text',
    fontLarger: 'Larger text',
    gallery: 'Gallery',
    openGallery: 'Open gallery',
    reset: 'Reset game',
    resetConfirm: 'Reset the game? Your current progress will be erased and can’t be recovered.',
    resetConfirmLabel: 'Reset',
    cancel: 'Cancel',
    audioSettings: 'Audio settings',
    mute: 'Mute',
    unmute: 'Unmute',
    bgm: 'Music',
    sfx: 'SFX',
    switchLanguage: '中文',
    switchLanguageTitle: 'Switch language / 切换语言',
  },

  status: {
    phaseWon: 'Graduated',
    phaseOver: 'Game over',
    projects: 'Projects',
    openProjects: 'View projects',
    closeProjects: 'Close projects',
    members: 'Members',
    showMembers: 'Show members',
    hideMembers: 'Hide members',
    // English labels don't fit a phone-width status bar; "$" already says "funding".
    shortLabel: { funding: '', reputation: 'Rep', energy: '⚡' },
    reputationDesc: [
      'Google your name and the top results are someone else',
      'A few citations, mostly your own',
      'A few people in the field have heard of you',
      'Known in your subfield',
      'Top-venue regular and a big name in the field',
      'Academic heavyweight with former students everywhere',
    ],
  },

  intro: {
    welcome: 'Welcome to Lab Simulator!',
    premise: 'You’re a brand-new assistant professor of computer science, with an empty lab, some startup funding, and a future nobody can predict.',
    featuresHeading: 'Over the next six years, you’ll get to:',
    features: [
      'Recruit grinders, geniuses, slackers and future founders',
      'Watch students graduate, flee, take an extra year, or go viral overnight',
      'Write grants, answer reviewers, save the servers',
      'Find out who’s been quietly hogging every GPU',
    ],
    closingLead: 'Whatever happens,',
    closingMain: 'try to survive until tenure.',
    closingTail: 'Good luck!',
    feedback: 'Feedback',
    feedbackTitle: 'Thanks for playing',
    feedbackBody: 'If you have two minutes, a short feedback survey would help us make the game better.',
    feedbackGo: 'Take the survey',
    feedbackLater: 'Maybe later',
  },

  log: {
    choice: 'You chose: ',
  },

  event: {
    closeForNow: 'Close for now',
    requiresServer: '🔒 Requires the server purchase',
  },

  ending: {
    badgeWon: 'Six Years Later',
    badgeOver: 'Game Over',
    reputation: (n: number) => `Reputation ${n}`,
    funding: (m: string) => `Funding ${m}`,
    ideas: (n: number) => `Ideas ${n}`,
    started: (n: number) => `Launched ${n}`,
    completed: (n: number) => `Completed ${n}`,
    students: 'Students',
    newGame: 'Play again',
  },

  studentStatus: {
    graduated: 'Graduated',
    left: 'Left the lab',
    active: 'Enrolled',
  },

  trait: {
    aria: (name: string) => `Trait: ${name}`,
    effectLabel: 'Effect',
  },

  achievement: {
    unlocked: 'Achievement unlocked: ',
  },

  admission: {
    portraitAlt: (name: string) => `Portrait of ${name}`,
    admittedTitle: 'New Student Admitted',
    askSecond: 'Recruit a second student this year?',
    noMoreCandidates: 'You’ve seen every candidate, so there’s no one left for a second spot.',
    notEnoughFunding: (m: string) => `Not enough funding (need ${m})`,
    recruitSecond: 'Recruit a second student',
    endAdmissions: 'End this year’s admissions',
    seasonTitle: (year: number) => `Year ${year} Admissions`,
    roundTitle: (round: number) => `Round ${round} Candidates`,
    costHint: (m: string) => `Cost: ${m} per student`,
    prompt: 'Two applications are on your desk. Pick one to join the lab:',
    admit: (name: string) => `Admit ${name}`,
    refreshNoPool: 'Not enough candidates left for a new batch',
    refreshNoEnergy: (n: number) => `Not enough energy (need ${n})`,
    refreshHint: (n: number) => `Spend ${n} energy to see a new batch of candidates`,
    refresh: 'New batch',
    skipYear: 'Skip this year',
  },

  members: {
    title: 'Lab Members',
    you: 'You',
    anotherLine: 'Another one',
    viewDetail: 'View details',
    yearBadge: (year: number) => `Y${year}`,
    favorTitle: 'Rapport',
    favorChip: (n: number) => `Rapport: ${n}`,
    moodChip: (n: number) => `Mood: ${n}`,
    piBios: [
      'Lab babysitter-in-chief',
      'Paid provider of emotional support',
      'Designated scapegoat (and unpaid reviewer)',
      'Where grant money goes to die',
      'Plans to write a paper every week. Successfully holds meetings every week.',
      'Edits students’ papers, and occasionally their lives',
      'All the GPUs, none of the papers',
      'The only one in the lab who understands the reviews (unconfirmed)',
      'Ideal: scholar. Actual: customer support.',
      'Loves research. Fears forms.',
    ],
  },

  detail: {
    close: 'Close',
    yearStatus: (year: number) => `PhD Year ${year}`,
    favor: 'Rapport',
    mood: 'Mood',
    currentProject: 'Current project',
    noCurrentProject: 'No active project',
    completedProjects: 'Completed projects',
    noCompletedProjects: 'No completed projects yet',
    graduatedAt: (year: number, month: number) => `Graduated ${MONTHS[month - 1] ?? month}, Year ${year}`,
    tagline: (t: string) => t,
  },

  projects: {
    title: 'Projects',
    ideas: 'Ideas',
    ideasEmpty: 'No research ideas yet. Keep playing through events and some might turn up.',
    active: 'In Progress',
    activeEmpty: 'No projects in progress. Launched projects show up here.',
    completed: 'Completed',
    gradeAria: (grade: string) => `${grade}-tier project`,
    costEnergy: (n: number) => `Energy −${n}`,
    costFunding: (m: string) => `Funding −${m}`,
    costSeparator: ', ',
    needEnergy: (n: number) => `Not enough energy (need ${n})`,
    needFunding: (m: string) => `Not enough funding (need ${m})`,
    launch: (cost: string) => `Launch (${cost})`,
    chooseLead: 'Choose a lead',
    piDisabledTitle: 'Your energy is at 0, so you can’t lead a project yourself',
    piSelf: 'You (lead it yourself)',
    piOutOfEnergy: 'Out of energy, can’t take on a project',
    piDetail: (progress: string) => `Costs 15 energy/mo · Efficiency ×1.00 · +${progress}%/mo`,
    current: 'Current',
    busy: 'Busy',
    studentDetail: (mult: string, progress: string) => `Efficiency ×${mult} · +${progress}%/mo`,
    notQualified: 'Skills too low to assign',
    swapFree: (name: string, trait: string) => `${name}’s trait “${trait}”: no progress is lost.`,
    swapPenaltyBefore: 'Current progress ',
    swapPenaltyMiddle: ' will drop to ',
    swapPenaltyAfter: ' (−30%).',
    confirm: 'Confirm',
    cancel: 'Cancel',
    leadLabel: 'Lead: ',
    monthly: (progress: string) => `+${progress}%/mo`,
    stalled: '⏸ Stalled',
    collapse: 'Collapse',
    changeLead: 'Change lead',
    assignLead: 'Assign a lead',
    removeLeadTitle: 'Remove the lead (the project stalls)',
    removeLead: 'Remove',
    completedMeta: (leader: string, m: string, rep: number) => `Lead: ${leader} · Reward: +${m} / Reputation +${rep}`,
    unassigned: 'Unassigned',
    pi: 'PI',
  },

  gallery: {
    tabEndings: 'Endings',
    tabCharacters: 'Characters',
    tabProjects: 'Projects',
    tabAchievements: 'Achievements',
    closeAria: 'Close gallery',
    close: 'Close',
    endingsEmpty: 'No endings reached yet.',
    endingsEmptyHint: 'Finish a run and its ending will be recorded here for good.',
    endingsStat: (n: number) => ['', String(n), plural(n, ' ending reached', ' endings reached')],
    charactersStat: (n: number) => ['', String(n), plural(n, ' member recorded', ' members recorded')],
    unknownCharacter: 'Unknown character',
    unknownName: '???',
    unknownPortrait: '?',
    projectsEmpty: 'No projects launched yet.',
    projectsEmptyHint: 'Projects you launch will be recorded here for good.',
    projectsStat: (started: number, done: number) =>
      ['', String(started), plural(started, ' project launched, ', ' projects launched, '), String(done), ' completed'],
    completed: 'Completed',
    incomplete: 'Unfinished',
    achievementsStat: (n: number, total: number) => ['', String(n), ` / ${total} achievements unlocked`],
    lockedCriteria: '?',
    tabBackup: 'Backup',
    backupIntro: 'Your gallery and achievements are saved only in this browser. Switching browsers or devices, or clearing browsing data, can wipe them. Export a backup code now and then and keep it somewhere safe, like your notes app.',
    exportHeading: 'Export backup code',
    exportHint: 'This text holds all of your current gallery and achievement records.',
    copyCode: 'Copy code',
    copied: 'Copied.',
    copyFailed: 'Couldn’t copy automatically. Select the text above and copy it by hand.',
    importHeading: 'Import backup code',
    importHint: 'Importing merges with your current records. Nothing you already have is overwritten or removed.',
    importPlaceholder: 'Paste a backup code here',
    importButton: 'Import',
    importResult: {
      merged: 'Imported. Your gallery has been updated.',
      unchanged: 'Everything in this code is already here.',
      invalid: 'This doesn’t look like a valid backup code. Make sure you copied all of it.',
    },
  },

  engine: {
    unknownMonths: 'several',
    statFor: (name: string, stat: string) => `${name} · ${stat}`,
    everyone: (stat: string) => `Everyone · ${stat}`,
    graduated: (name: string) => `${name} · Graduated`,
    left: (name: string) => `${name} · Left`,
    traitGain: (name: string, stat: string) => `${name} (trait) · ${stat}`,
    traitGainOther: (name: string, target: string, stat: string) => `${name} (trait) · ${target} ${stat}`,
    everyoneMood: 'Everyone’s Mood',
    firstIdeaHint: '💡 Tap “Projects” in the top-right corner to see your ideas and put students to work on them.',
    summaryTitle: 'Six-Year Review',
    admitTitle: (name: string) => `${name} Joins the Lab`,
    admitNarrative: (name: string, tagline: string) => `${name} has officially joined the lab. ${tagline}`,
    firstStudentHint: '💡 Tap “Members” in the top-right corner to check on everyone in the lab at any time.',

    monthlyLab: (m: string, rep: number, energy: number) => `Funding ${m} · Reputation ${rep} · Energy ${energy}.`,
    monthlyMember: (name: string, favor: number, mood: number) => `${name} (Rapport ${favor}, Mood ${mood})`,
    monthlyMembers: (lines: string[]) => `Members: ${lines.join('; ')}.`,
    monthlyProject: (name: string, progress: number, leader: string) => `${name} (${progress}%, ${leader})`,
    monthlyProjects: (lines: string[]) => `Active projects: ${lines.join('; ')}.`,
    leaderUnassigned: 'unassigned',
    leaderYou: 'you',
    leaderUnknown: 'unknown',
    monthlyGraduated: (names: string) => `${names} graduated.`,

    noFundsTitle: 'Admissions Season',
    noFundsNarrative: (m: string) => `September admissions are here, but the lab has less than ${m} on the books, so there’s no recruiting this year. Maybe once the money comes in.`,
    memberChangeTitle: 'Lab Update',
    memberGraduated: (name: string) => `${name} has finished and officially graduated.`,
    memberLeft: (name: string) => `${name} has left the lab.`,
    memberStalledProjects: (names: string[]) =>
      `${plural(names.length, 'Project', 'Projects')} ${names.map(n => `“${n}”`).join(', ')} ${plural(names.length, 'is', 'are')} paused because the lead changed. Assign a new lead to resume.`,

    piStallTitle: (project: string) => `“${project}”: You’re Out of Energy`,
    piStallNarrative: (project: string, progress: number) =>
      `You ran out of energy. “${project}” still moved forward this month, but you’ve been removed as its lead and progress has dropped to ${progress}%. Assign a new lead.`,

    summary: {
      opening: 'And that’s six years.',
      finalLab: (rep: number, m: string) => `Final lab status: Reputation ${rep} · Funding left ${m}.`,
      graduated: (count: number, names: string) => `Graduated students (${count}):\n${names}`,
      avgDuration: (years: number) => `Average time to graduate: ${years} years.`,
      avgLong: 'Nearly five years each. Did your students put down roots? Industry has a saying about your lab: “Goes in a student, comes out a fossil.”',
      avgMedium: 'One bonus year on average. Students privately call it “the advisor’s extra training epoch.” You have no idea.',
      avgShort: 'Three years, right by the book. Your hairline contributed accordingly.',
      noneGraduated: 'Not one student graduated in these six years. That leaves a few regrets.',
      activeStudent: (name: string, year: number) => `${name} (Year ${year})`,
      active: (count: number, lines: string[]) => `Still enrolled (${count}):\n${lines.join('\n')}`,
      left: (names: string) => `Left the lab along the way: ${names}.`,
      projects: (started: number, done: number, rate: number) => `Projects: ${started} launched, ${done} completed, a ${rate}% completion rate.`,
      projectGrade: (grade: string, names: string[]) => `${grade}-tier (${names.length}): ${names.join(', ')}`,
      projectGradesJoin: (parts: string[]) => parts.map(p => `${p}.`).join('\n\n'),
      projectsNoneDone: (started: number) => `Projects: ${started} launched, none completed yet.`,
      closing: 'That was your six years.',
    },
  },
};
