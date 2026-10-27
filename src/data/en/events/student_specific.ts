import type { EventTranslations } from '../../../types/i18n';

export const studentSpecificEventsEn: EventTranslations = {

  // ── Graduation check series (shared by all students) ─────────────────────

  graduation_check: {
    title: '{studentName}’s Graduation Petition',
    description: [
      'June. {studentName} sends an extremely formal message: “Professor, I’d like to schedule a time to talk about graduating.” You reply “Sure,” with a vague feeling you know what’s coming.',
      'When you meet, {studentName} slides a printed, bound document across the desk. The cover reads “Doctoral Dissertation (Draft),” and the footer says “First Draft · For Advisor Review Only.” The whole thing looks thoroughly prepared. It even has a color cover.',
      '{studentName} sits up straight and speaks as seriously as if presenting at group meeting: “Professor, I think I’m about ready. Going by the timeline, I can defend this summer.”',
    ],
    prompt: 'The first graduation petition. How do you respond?',
    options: {
      graduate_now: {
        text: 'Approve it. Start preparing the defense',
        outcomes: [
          '{studentName} freezes for a moment, then nods hard and hugs the dissertation a little tighter, as if afraid you’ll change your mind. The next few months go smoothly.\n\nOn defense day, you get a message: “I passed! Thank you, Professor!!” The whole lab celebrates together, and everyone is very happy.',
        ],
      },
      extend_one_year: {
        text: 'It could use more polish. One more year',
        outcomes: [
          '{studentName} stares at the dissertation for a while, then tucks it back into {his} backpack as if nothing happened, moving as slowly as someone defusing a bomb. “Okay, Professor. I’ll come back next year.” {His} voice is low enough to feel a little off, and a guilty part of you wants to open the dissertation and read it again.',
        ],
      },
    },
  },

  graduation_check_2: {
    title: '{studentName}’s Second Graduation Petition',
    description: [
      'June again. You’re drinking coffee when {studentName} knocks and gently sets a document on your desk. It’s nearly identical to last year’s, except the cover is now blue. Blue.',
      '{studentName} begins nervously: “Professor, I added three chapters, filled in the missing experiments, ran new baselines, and completely rewrote chapter two. This should be enough this time, right?”',
      'You flip to the last page and take a look. The footer still says: “First Draft · For Advisor Review Only.”',
    ],
    prompt: 'The second petition. What do you say?',
    options: {
      graduate_now_2: {
        text: 'Okay, okay. You graduate this time',
        outcomes: [
          '{studentName} shoots up out of the chair, nearly knocking it over. On defense day, {he} wears a dress shirt, tie not quite straight, eyes bright. {He} passes. You go to the celebration dinner and stay until eleven.',
        ],
      },
      extend_two_years: {
        text: 'Hmm… not quite. One more year',
        outcomes: [
          '{studentName} takes the blue dissertation back off your desk, pats the cover, and nods with a complicated expression. “It’s okay, Professor. See you next year.” The moment the door closes, you faintly hear someone in the hallway let out a long, hard breath.',
        ],
      },
    },
  },

  graduation_check_3: {
    title: '{studentName}’s Third Graduation Petition',
    description: [
      'June, again. This time {studentName} doesn’t message ahead. {He} just appears at your door at 9 a.m., backpack on, with a complicated expression, like someone braced for something.',
      'The dissertation that lands on your desk is twice as thick as before. The cover reads “Doctoral Dissertation (FINAL · Official Version · For Real This Time).” You leaf through it: about four hundred pages, the last third of them appendices. Appendix F is a supplementary note on Appendix C, and Appendix G is a revision of Appendix F.',
      '{studentName} takes a deep breath and pauses before speaking. “Professor… my dissertation is done. And I just got an offer from a startup. Everything’s lined up. I can start the moment I graduate.”',
    ],
    prompt: 'The third time. How do you respond now?',
    options: {
      graduate_now_3: {
        text: 'Go get ready for your defense',
        outcomes: [
          '{studentName} looks like a prisoner who has spent years without seeing daylight and has just been told, without warning, that release might come today, with nothing packed yet.\n\nOn defense day, {studentName} cries twice: once during the acknowledgments, and once when the committee says “pass.” As you see {him} off, {studentName} turns back and says, “Professor, I think I could have graduated a long time ago.” You open your mouth to say something, then swallow it. Some things are too heavy to say in that moment. Better to keep them to yourself.',
        ],
      },
      extend_three_years: {
        text: 'Then… one more year?',
        outcomes: [
          'Before you can finish, {studentName} is already on {his} feet. “Professor, I’ve thought this through.” {He} leaves the four-hundred-page dissertation on your desk, swings {his} backpack over {his} shoulder, gives a small bow, and walks out.\n\nThree weeks later, an email arrives: “{studentName} has officially left the lab. Thank you to my advisor for three years of mentorship.”\n\nOn the campus forum, someone has posted a map of the college with your lab labeled: “Vintage PhD Aging Cellar.”',
        ],
      },
    },
  },

};
