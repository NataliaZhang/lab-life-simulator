import type { EventTranslations } from '../../../types/i18n';

// English overlay for src/data/events/conditional.ts
// (low-mood events by rapport band, crisis departure, collaboration offer,
// PI burnout milestones). Most bind a random student, so pronouns use
// the {he}/{him}/{his} placeholders.

export const conditionalEventsEn: EventTranslations = {

  transfer_risk: {
    title: '{studentName} Has Already Filled Out the Transfer Form',
    description: [
      'You get a system notification: {studentName} has booked a meeting with the PI of the lab next door.',
      'You open {his} student profile and find that the bio has been quietly changed to “Exploring new opportunities.”',
      'Worse, the lab transfer form is completely filled out. All that’s left is the Submit button. Last saved: three minutes ago.',
    ],
    prompt: 'Uh-oh. How do you pull {him} back?',
    options: {
      retain_with_raise: {
        text: 'Offer a better stipend to keep {him}',
        outcomes: [
          'You set up a meeting right away and bump {his} stipend up a tier. {studentName} stares into {his} coffee cup in silence for a long time, then finally says, “Let me think about it.” Three days later, the transfer form is deleted. Looking at the file in the trash, you feel the relief of someone who has just defused a bomb.',
          'You offer more money, sincerely, in a tone that sounds a lot like a recruitment brochure. {studentName} leaves anyway. Some cracks can’t be patched with a stipend. For the first time, you realize that students aren’t project resources. They’re people who can press the Submit button themselves.',
        ],
      },
      honest_conversation: {
        text: 'Sit down for a heart-to-heart, right now',
        outcomes: [
          'You talk for two hours. {studentName} pours out everything {he}’s been holding in, from the pressure of group meetings to the messages you left on read, from the project direction to “maybe I just don’t belong here.” In the end, {he} deletes the transfer form and says, “I want to give it another try.” You haven’t solved everything, but at least you’ve pulled {him} back from the Submit button.',
          'By the end of the talk, things are clearer for both of you. Clear enough to confirm that this working relationship really shouldn’t continue. {studentName} leaves gracefully, even turning off your office light on the way out. You feel even worse.',
        ],
      },
      let_go: {
        text: 'Respect {his} choice and let {him} go',
        outcomes: [
          'You reply that you understand and support {him}. {studentName} submits the form soon after. A few months later, you see {his} poster at a conference. It’s pretty good. You watch from a distance for a while and don’t go over.',
        ],
      },
    },
  },

  favor_complaint: {
    title: 'The Anonymous Rant Went Viral',
    description: [
      'Trending on the forum: “My Advisor Said ‘I’ll Handle It Next Week’ for the Seventh Time.”',
      '17,843 views. 3,271 likes. 842 comments.',
      'At first it just seems vaguely familiar. Then you hit the line: “My advisor’s favorite phrase is ‘I’ll take a look tonight.’” Only one person at this whole university says that. Oh no. It’s you.',
      'The comment section has already started team-building: “Mine too.” “OP, are we in the same lab?” “Someone should compile these into an advisor-quotes dataset.”',
    ],
    prompt: 'This PR crisis is spreading absurdly fast. You decide to:',
    options: {
      talk_privately: {
        text: 'Take {studentName} to dinner and act like you haven’t seen it',
        outcomes: [
          'You take {studentName} out to eat. You don’t mention the post, just ask whether things have been rough lately. {He}’s wary at first, then finally cracks. “Professor, I regretted it the second I posted it.” “Then why didn’t you delete it?” “Because the comments were too funny.” The crisis isn’t fully over, but at least the two of you got to laugh together.',
          'After you talk, half the misunderstanding is cleared up. The other half is still on the forum’s front page, with a red “HOT” tag next to the title. At least {studentName} knows you haven’t completely overlooked {him}.',
        ],
      },
      adjust_management: {
        text: 'Change how you manage, starting now',
        outcomes: [
          'You start replacing “I’ll handle it next week” with actual dates, and “I’ll take a look tonight” with “I’ll reply by 3 p.m. Thursday.” The group is stunned. {studentName} even posts a lone “?” in the group chat. A month later, the forum post has sunk out of sight, and the lab feels like someone finally opened a window.',
        ],
      },
      ignore_it: {
        text: 'Pretend you never saw it',
        outcomes: [
          'You decide to let it cool off on its own. Three days later, the post has been turned into a meme titled “Advisor Time Unit Conversion Chart.” “Soon” is about 11.3 days. “Next week” is about a month. You even spot a screenshot of it in the faculty group chat.',
        ],
      },
    },
  },

  student_sick: {
    title: 'A Call from Campus Health',
    description: [
      'At 2 p.m., you get a call from an unknown number.',
      'A nurse from the campus health center asks, “Is this {studentName}’s advisor?”',
      'Your heart drops. The nurse explains: after several late nights in a row, {he} passed out face-down on the desk in the middle of an experiment and couldn’t be woken no matter what anyone tried. {He}’s okay now, but the doctor’s orders are to pause all research activities.',
      'It’s the first time you’ve ever heard “pause all research activities” given as medical advice.',
    ],
    prompt: '{studentName}’s body has forced a hard shutdown. What do you do?',
    options: {
      medical_subsidy: {
        text: 'Cover the checkup and recovery costs (spend $2K)',
        outcomes: [
          'You cover the costs and text {him}: “Don’t come to the lab for a few days. I mean it.” {studentName} asks “Are you sure?” three separate times. On the third night, {he} sneaks up to the lab door holding a bubble tea and says, “Professor, rest really does work. I woke up and figured out where the bug is.” You very nearly march {him} straight back to the dorm.',
        ],
      },
      force_rest: {
        text: 'Order three days off',
        outcomes: [
          'You announce that {studentName} is banned from the lab this week. {He} tries to resist with “I’ll just check in remotely,” and you overrule it. Three days later, {studentName} comes back with eyes as clear as a fresh OS install. The whole lab briefly witnesses the power of sleep.',
        ],
      },
      continue_work: {
        text: 'Have {him} keep up online from home',
        outcomes: [
          'With {his} body flashing red alerts, {studentName} keeps attending meetings, answering messages, and syncing progress. That night, {he} sends you one line: “Professor, I think I’m about to evolve into a vengeful ghost.” You may have made a very bad management decision.',
        ],
      },
    },
  },

  research_block: {
    title: 'The Project Folder Got Renamed',
    description: [
      'You open the shared drive and find that {studentName}’s project folder has been renamed:',
      'final_final_final_abandon_this_project',
      'Next day: really_abandon_this_project',
      'Day three: this_project_has_won',
      'Day four: please_help',
      'The folder names have become more honest than the group meeting updates.',
    ],
    prompt: '{studentName}’s research is clearly not okay. You decide to:',
    options: {
      break_it_down: {
        text: 'Break the problem down together',
        outcomes: [
          'You spend two hours at the whiteboard together, breaking “the whole project is doomed” down into nine concrete problems. Six turn out to be emotional hallucinations, two can be worked around, and one is genuinely hard. {studentName} renames the folder project_v2. It still doesn’t sound entirely reliable, but at least it’s stopped calling for help.',
        ],
      },
      change_angle: {
        text: 'Try another angle instead of forcing it',
        outcomes: [
          'You suggest {he} stop running into the same wall for now and build a small version that actually runs. {studentName} tries it for two days, only half convinced. On the third day, {he} sends a screenshot: the baseline has finally moved. The folder is renamed maybe_alive. You consider this name extremely optimistic.',
        ],
      },
      push_through: {
        text: 'Tell {him} to keep pushing',
        outcomes: [
          'You say getting stuck is normal and tell {studentName} to hang in there a little longer. {He} does keep pushing, and the folder name does stabilize. It’s now called suffer_but_continue. Not exactly healthy, but at least the effort is pointed in the right direction.',
          'You say keep pushing. The next day, the folder is renamed this_is_not_a_project_anymore. It hits you that sometimes “keep going” isn’t encouragement. It’s shoving someone into the wall one more time.',
        ],
      },
    },
  },

  peer_left: {
    title: '{studentName}’s Browser Tabs',
    description: [
      'You borrow {studentName}’s laptop for a minute to check some experiment results.',
      'Across the top of the browser, the tabs read, in order:',
      'Is a PhD Worth It?',
      'How I Successfully Changed Careers',
      'Civil Service Exam Dates',
      'Is 35 Too Late to Switch Careers?',
      'Starting a Sheep Farm: A Beginner’s Guide',
      'Alpaca Farming Profit Margins',
      'You and {studentName} both go quiet. The air is thick with the sense that things have reached the alpaca stage.',
    ],
    prompt: '{studentName} is clearly rethinking {his} whole life plan. How do you save this?',
    options: {
      talk_future: {
        text: 'Have a real talk about the future. No alpaca jokes.',
        outcomes: [
          'You talk for a long time, from research to graduation, from graduation to life, and eventually you even have a serious discussion about the startup costs of alpaca farming. Somewhere along the way, {studentName} starts laughing too. When you’re done, the tabs are all still there, but there’s a new one at the front: “Paper Submission Template.” Crisis averted, for now.',
        ],
      },
      share_your_crisis: {
        text: 'Tell {him} about the time you almost quit',
        outcomes: [
          'You tell {him} about how you nearly bailed during your own PhD. {studentName} listens closely, and when you get to the part where you also searched “career change,” {his} eyes visibly light up. So advisors aren’t born knowing how to write proposals. The discovery comes as a real relief to {him}.',
        ],
      },
      dismiss_it: {
        text: 'It’s just stress-googling. Don’t take it seriously.',
        outcomes: [
          '{studentName} nods and closes the tabs. You think that’s the end of it. The next day, {his} browser starts recommending “Starting a Farm on a Budget” and “Exit Plans for PhD Students.” The algorithm remembers this crisis better than you do.',
        ],
      },
    },
  },

  late_night_doubt: {
    title: 'Twenty-Seven Messages at 3 a.m.',
    description: [
      '3:14 a.m. Your phone buzzes.',
      '3:15. Again.',
      '3:17. Same person.',
      'By the time you open your eyes, there are 27 unread messages from {studentName}.',
      'They include: “professor am I just not cut out for research,” “maybe I’m meant to run a street-food stand,” “if I opened one would you invest,” “is Reviewer 2 kind of right,” “no Reviewer 2 definitely doesn’t get it,” “wait I just figured it out,” “no I didn’t.”',
      'The last one: “professor are you asleep?”',
      'Sent at 3:16.',
    ],
    prompt: 'Looking at twenty-seven messages, you decide to:',
    options: {
      reply_awake: {
        text: 'Reply: “I’m awake.”',
        outcomes: [
          'You were actually sound asleep. But sometimes an advisor has to lie. You go back through all twenty-seven messages with {studentName}, one at a time, until only three items are left: sleep, eat, look at it tomorrow. Soon after, {he} writes: “Thanks, Professor. Going to sleep now.” At noon the next day, {studentName} finally shows up at the lab like a machine that rebooted successfully but is still running a little hot.',
        ],
      },
      voice_call: {
        text: 'Just call {him}',
        outcomes: [
          'When the call connects, the first thing {studentName} says is, “Professor, did I wake you up?” You say, “You sent twenty-seven messages. It’s a little late to ask.” {He} laughs on the other end. Once {he}’s laughing, things get easier. Half an hour later, the crisis has been downgraded from “my life is over” to “just sleep for tonight.”',
        ],
      },
      reply_morning: {
        text: 'Reply in the morning',
        outcomes: [
          'In the morning you write back a long, careful reply. {studentName} says, “Professor, I kind of lost it last night. Sorry.” It more or less blows over, but you know a 3 a.m. problem doesn’t just disappear because the sun came up.',
          'You don’t reply until morning. The last message in the chat is from 4:02 a.m.: “never mind, it’s nothing.” It is very much not nothing. You stare at the screen and realize you’ve missed an important moment.',
        ],
      },
    },
  },

  student_crisis_departure: {
    title: '{studentName} Left Without a Word',
    description: [
      'That morning, when the lab opens, {studentName}’s desk is already empty. The chair is pushed in neatly, and the desk is so clean it looks like no one ever sat there.',
      'You call. No answer. You text. Read, no reply. Later, secondhand, you hear that {he} has already left the city.',
      'Afterward, you think maybe you should have seen the signs long before: the late-night messages that never got a reply, the updates that kept getting shorter, the time {he} stood alone in the hallway for a long while after group meeting. But those signs were mixed in with too many other things, and they were hard to tell apart.',
    ],
    options: {
      crisis_departure_ack: {
        text: '({He}’s already gone.)',
        outcomes: [
          'For a long time afterward, you stop for a moment every time you pass that desk. An empty chair can’t say anything, but it makes you remember one thing: some problems, once you miss the moment, never give you another chance.',
        ],
      },
    },
  },

  collaboration_offer: {
    title: 'Someone Wants to Collaborate',
    description: [
      'You get an email signed by a professor from a well-known lab, the kind of name that can settle half the arguments in the field on its own. The email says they’ve read your recent work and are interested in a collaboration, including a joint training program for students.',
      'The email is short. Short enough to carry an air of “I don’t need to explain. You know.” You read it three times to make sure it isn’t spam.',
    ],
    prompt: 'The invitation is here. How do you respond?',
    options: {
      accept_collaboration: {
        text: 'Accept and move ahead with an agreement',
        outcomes: [
          'The agreement is signed. One of your students is chosen for the joint program and spends six months in their lab, coming back with a noticeably wider view of the field and skills that have grown even more. Your name starts appearing on papers next to a much bigger one. As free rides go, this one comes with a clear conscience.',
          'The agreement is signed, and only once the work begins do you discover how different the two groups’ research styles are. They like everything highly structured. Your lab is used to flexible iteration. Coordination alone eats up an enormous amount of energy. Your reputation goes up a little, but you spend two straight weeks unable to sleep, feeling like you’re trading your health for your CV.',
        ],
      },
      negotiate_terms: {
        text: 'Pin down the terms before deciding',
        outcomes: [
          'You insist on spelling out every detail: resource allocation, student authorship, ownership of results. Their assistant’s assistant sends seven emails over the course of a month, and the negotiation ends with an agreement both sides can live with. Careful people aren’t necessarily luckier, but they’re far less likely to have regrets.',
        ],
      },
      decline_politely: {
        text: 'Politely decline and focus on your own work',
        outcomes: [
          'You reply politely that the timing isn’t right, since the group has a few important things to focus on finishing. They write back: “Understood. Let’s keep in touch.” You archive the email and carry on at your own pace. Without the outside pressure, the mood in the lab turns out to be a bit more relaxed than you expected.',
        ],
      },
    },
  },

  pi_third_burnout: {
    title: 'The Third Collapse',
    description: [
      'The office floor spins in your field of vision. This is the third time you’ve admired it from this angle.',
      'You don’t notice the moment you go down. One second you’re staring at an experiment that’s been running for three days and still hasn’t converged. The next, it’s the ceiling. Energy: 0/100.',
      'A head squeezes in through the gap in the door. {studentName} freezes for half a second, then rushes over in textbook first-aid-training-video form: tap the shoulders, check breathing, check pulse. Only once you respond does {he} help you up off the floor.',
      '“Professor… th-this is already the third time.” “No, it’s not,” you deny weakly.',
      '“I’ve been counting.” Without mercy, {studentName} holds up a screenshot of {his} records. It has timestamps.',
      '{studentName} presses a bottle of hot water into your hands. You take a couple of sips and feel your soul slowly returning to your body.',
    ],
    options: {
      accept_help: {
        text: '…Thanks',
        outcomes: [
          'You take the hot water and drink all of it. {studentName} sits next to you and doesn’t dare leave just yet, probably afraid you’ll go down again with no witnesses. The hot water really does help a little. You feel slightly more alive.',
        ],
      },
      deny_everything: {
        text: 'I was just thinking. I didn’t collapse.',
        outcomes: [
          '“Oh.” {studentName} sets the hot water within your reach and quietly backs out of the room. You try to convince yourself that this was “an innovative horizontal thinking posture.” Success rate: approximately zero.',
        ],
      },
    },
  },

  pi_fifth_burnout: {
    title: 'The Fifth Collapse',
    description: [
      'This time you go down in the hallway. {studentName}, passing by, nearly steps on you.',
      '“Professor, why do you keep—” {studentName} swallows the rest and, hands shaking, immediately dials the campus clinic.',
      'The campus doctor arrives, examines you, and speaks in a tone as grave as someone reading aloud from a textbook: “Chronic exhaustion, sleep deprivation, elevated stress hormone levels. Rest is recommended. Without changes, you may later experience memory decline, impaired judgment, or even more serious consequences.”',
      '“How serious is ‘more serious’?” you ask. The doctor pauses. “Worse than you think.”',
      'It’s the most understated warning you’ve ever received. Lying there staring at the ceiling, for the first time you start to be truly afraid of what will happen to this lab if you keep going like this.',
    ],
    options: {
      take_it_seriously: {
        text: 'Seriously think about slowing down',
        outcomes: [
          'You say you need to think about it seriously. {studentName} nods and dims your office light a notch. That’s as much as {he} can do. The rest is up to you.',
        ],
      },
      push_through_anyway: {
        text: 'The project comes first. Once this stretch is over…',
        outcomes: [
          'You’ve said something like this too many times already. {studentName} doesn’t argue, but on the way out, {he} takes your coffee mug along.',
        ],
      },
    },
  },

};
