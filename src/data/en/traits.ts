import type { TraitTranslation } from '../../types/i18n';

// English text for src/data/traits.ts, keyed by trait ID.
// Trait names are canonical glossary terms (LOCALIZATION_GUIDE.md); effect lines must stay
// mechanically exact, so keep numbers and conditions identical to the Chinese.
export const traitsEn: Record<string, TraitTranslation> = {

  ddl_warrior: {
    name: 'Deadline Warrior',
    description: 'Three days before a deadline, something alien takes over. The rest of the time: dawdling. Deadline week: a different species.',
    effect: 'Monthly progress doubles once their project passes 75%',
  },

  last_minute_genius: {
    name: 'Last-Minute Genius',
    description: 'Permanently in the “still brewing” phase. The harder the advisor pushes, the better the output.',
    effect: '+2 Rapport per month while leading a project',
  },

  sleep_learning: {
    name: 'Sleep Learning',
    description: 'Thinks while asleep, tests hypotheses while dreaming. A half-beat slow when awake, but never takes a wrong turn.',
    effect: '+2 to a random skill each month',
  },

  dream_debugger: {
    name: 'Dream Debugger',
    description: 'Once napped for twenty minutes and woke up with the fix for a bug that had stalled the whole lab for a week. The engineering intuition may come from a parallel universe nobody else has found.',
    effect: '+3%/mo progress when leading an engineering project; otherwise −1%/mo',
  },

  proof_addict: {
    name: 'Proof Addict',
    description: 'Physically uncomfortable around any claim without a rigorous proof. Code that runs correctly isn’t enough; it has to be proven correct. Once turned an engineering problem into a theory problem just to avoid setting up an environment.',
    effect: 'On projects that need Engineering, the Engineering requirement drops by 30, but progress is −1%/mo',
  },

  reliable_senior: {
    name: 'Lab Anchor',
    description: 'The steadying force of the lab. Stuck on a proof, or a derivation that’s drifted off course? This is who you ask. Never the fastest, but always comes back with an idea that lets everyone breathe again.',
    effect: 'Each month, +2 Theory to one other random student',
  },

  optimistic_heart: {
    name: 'Unsinkable',
    description: 'The emotional backbone of every disaster. Server down, every experiment red, and the first reaction is: “It’s fine. At least now we know this one’s a dead end.”',
    effect: 'No progress lost when their project is forced to change leads',
  },

  morale_sunshine: {
    name: 'Lab Sunshine',
    description: 'Their mere presence steadies the whole team. Mid-meltdown, they propose things like “let’s eat first”: it sounds like avoidance, and it’s usually right.',
    effect: '+1 Mood to every student each month',
  },

  weird_paper_collector: {
    name: 'Weird Paper Collector',
    description: 'Digs up paper titles from the depths of the internet that leave a room speechless, then reads every page. Everyone assumes it’s a bit. The related-work section is already three pages long.',
    effect: '+2 Theory each month',
  },

  research_brainstormer: {
    name: 'Idea Machine',
    description: 'Generates five follow-up directions for any topic on the spot. Quality varies; quantity never does. Now and then one of them is genuinely good, but by now nobody around can tell which.',
    effect: 'Idea events trigger 40% more often; Energy cost +1',
  },

  startup_saint: {
    name: 'Founder in Waiting',
    description: 'Looks at any project and immediately asks who the users are, where the need is, and how the business model closes the loop. Catchphrase: “Does anyone actually use this?”',
    effect: '+$5K extra Funding when their project is completed',
  },

  product_mindset: {
    name: 'Product Brain',
    description: 'Automatically translates any research discussion into real-world needs. After group meeting, everyone else remembers the conclusions. He remembers the user personas.',
    effect: '+3 extra Reputation when their project is completed',
  },

  time_manager: {
    name: 'Time Management Master',
    description: 'Manages not only their own time but, while at it, the advisor’s too. “Professor, is the part you promised me done?”',
    effect: 'Projects you lead yourself progress ×1.5, but cost 60% more Energy',
  },

  schedule_is_justice: {
    name: 'The Plan Is Law',
    description: 'Overtime without a plan is chaos. Overtime with a plan is project management.',
    effect: '+1 Engineering each time you actively spend Energy',
  },

  social_terrorist: {
    name: 'Weaponized Extrovert',
    description: 'Can turn any stranger into a buddy in five minutes. No one too unlikely, no silence too awkward. Gives off so much social energy that people nearby want to plug in and recharge.',
    effect: 'Each month, +2 Rapport to one other random student',
  },

  network_magnet: {
    name: 'People Magnet',
    description: 'The biggest takeaway from any conference is always the contact list. Coffee breaks are the main quest.',
    effect: 'Their projects progress −1%/mo, but give +5 extra Reputation on completion',
  },

  research_mysticism: {
    name: 'Research Mystic',
    description: 'Believes research success is equal parts skill, luck and ritual. Draws a tarot card before submitting, picks an auspicious hour before launching runs, and adjusts which way the GPUs face. The thing is, sometimes it works.',
    effect: 'Their projects progress ×1.4 when Mood is above 50, ×0.8 when Mood is below 20',
  },

  fortune_engineer: {
    name: 'Luck Engineer',
    description: 'Approaches mysticism with an engineer’s rigor: logs every prediction against its outcome and keeps optimizing the divination strategy.',
    effect: '+3 Engineering on the 2nd Mood change each month',
  },

  curiosity_overload: {
    name: 'Curiosity Overload',
    description: 'Curiosity is where research begins. It’s also where incidents begin.',
    effect: '+2 Engineering each month, but Energy −1',
  },

  optimization_addict: {
    name: 'Optimization Fiend',
    description: 'Has a physical reaction to inefficient code; “quick optimizations” are a daily reflex. Hand her one bug and she’ll refactor the whole repo while she’s at it.',
    effect: 'Each month, +3% progress to a random active project',
  },

};
