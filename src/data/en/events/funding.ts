import type { EventTranslations } from '../../../types/i18n';

export const fundingEventsEn: EventTranslations = {

  funding_crisis_grant: {
    title: 'Grant-Writing Season',
    description: [
      'Account balance: under $50K.',
      'The number reminds you of something you should have done a long time ago: write a grant. Official name: “Application for Research Funding.” Typical length: fifty to a hundred thousand words. Content: “what you plan to do over the next three years.” Format requirements: “written in a way nobody wants to read.” Review outcome: “if you’re lucky, someone skims the abstract.”',
      'You open a new document, type a title, pause for a few seconds, delete it, type something else, and finally type the original title back in.',
    ],
    prompt: 'How much of your life will you trade for money this time?',
    options: {
      grant_full: {
        text: 'Burn the boats. Grind out a massive proposal',
        outcomes: [
          'You camp out in your office for three days and produce eighty thousand words. Twenty thousand of them are your own new ideas, thirty thousand are the “theoretical framework” justifying those ideas, and the remaining thirty thousand describe how you will “leverage cutting-edge interdisciplinary synergies to conduct systematic, in-depth research, yielding transformative outcomes of significant theoretical and practical value.” The proposal goes out. A few months later, the reviews come back: priority funding. You’re not sure which passage made the difference, but those thirty thousand words probably pulled their weight.',
        ],
      },
      grant_medium: {
        text: 'Good enough is good enough. Throw one together',
        outcomes: [
          'You dig out last year’s proposal, change the year in the title, swap two words in the abstract, and add one line under “Innovation”: “Incorporates state-of-the-art large language model technology.” That same line was probably added to eight hundred other proposals nationwide this cycle. Result: funded, money in the account. Enough to get by. It’ll do.',
        ],
      },
      grant_minimal: {
        text: 'Emergency mode: file a quick stopgap version',
        outcomes: [
          'Buried in the department’s “Junior Faculty Supplementary Research Fund” spreadsheet, you find a call with a deadline of, conveniently, tomorrow, and a 500-word limit. You fill it out in thirty minutes, at a keyword density of no fewer than three “innovative,” “focused,” or “empowering” per paragraph. It’s small, but better than nothing.',
          'You find the portal for the “Junior Faculty Supplementary Research Fund,” fill out the form, and submit. The system replies: “Application received.” Two months later, it emails again: “Thank you for applying. This funding round is now closed.” You check the timestamps and discover the “received” email and the “closed” email were sent three minutes apart.',
        ],
      },
    },
  },

};
