import type { EventTranslations } from '../../../types/i18n';

// English text for src/data/events/project_ideas.ts (idea events that unlock projects).
// Project names in the “New idea” lines must match src/data/en/projects.ts.
export const projectIdeasEventsEn: EventTranslations = {

  // ── Group Meeting Minutes Assistant (tutorial) ──────────────────────────

  idea_meeting_minutes_assistant: {
    title: 'The Case of the Missing Minutes',
    description: [
      'After group meeting, you go looking for last week’s discussion notes and discover they don’t exist.',
      'You ask {studentName}, who shakes {his} head. No idea. The other two don’t know either. So where are the minutes? “Somebody… must have taken them?” Everyone looks at each other, and the room goes quiet.',
      'You scroll back through the group chat. The only relevant message: “Great group meeting today!” followed by six smiley faces. Nothing of substance.',
      'This can’t keep happening. A tool that automatically turned group meeting recordings into structured minutes would make everything traceable. It could even quantify how much each person contributed, or who never said a word.',
      '💡 Also: a little tool like this isn’t much engineering work, it’s good training for students, and it could become a decent systems paper. You have a feeling you’ve found a good project.',
    ],
    options: {
      build_minutes_tool: {
        text: 'Prop up your phone and just start recording',
        outcomes: [
          'You lean your phone against a paper cup, pointed at the whiteboard. The students think you’re typing. Later you realize this recording can do a bit more than you first thought.\n\n💡 New idea: “Group Meeting Minutes Assistant” (saved to the Projects panel)',
        ],
      },
      diy_minutes: {
        text: 'Stand-up meetings only from now on, ten minutes max',
        outcomes: [
          'You announce the new rule: from now on, group meeting happens standing up. With everyone on their feet, it really is a lot faster. No minutes, but also no filler worth writing down.',
        ],
      },
    },
  },

  // ── Advisor Reply Prediction ────────────────────────────────────────────

  idea_advisor_reply: {
    title: 'Left on Read',
    description: [
      'You messaged a collaborating professor three weeks ago. Read. No reply.',
      'You stare at the chat. Three weeks. Read. No reply.',
      'You start recalling this professor’s past behavior: most active around 3 p.m., silent on Fridays, always responds after a deadline reminder… and it suddenly hits you that these patterns could be modeled.',
      'Chat history plus time-series analysis would be more than enough to train an “advisor reply predictor.” And almost everyone could use one.',
    ],
    options: {
      model_it: {
        text: 'Work out when he’ll reply, unscientifically',
        outcomes: [
          'You grab a sheet of paper and plot his past reply times as a distribution. Friday at 3 p.m. turns out to be the peak, and something always happens right before a deadline. The pattern is ridiculously clear.\n\n💡 New idea: “Advisor Reply Prediction” (saved to the Projects panel)',
        ],
      },
      just_wait: {
        text: 'Send a follow-up, a little more politely',
        outcomes: [
          'You rewrite the email, cut “I know how busy you must be, but,” and add “I just wanted to check whether you saw my previous message.” He replies that same afternoon. Sometimes the problem isn’t the waiting. It’s how you ask.',
        ],
      },
    },
  },

  // ── Automated Rebuttal ──────────────────────────────────────────────────

  idea_auto_rebuttal: {
    title: 'Reviewer 2 Strikes Again',
    description: [
      'The reviews are back. Reviewer 2’s comments run two full pages and are packed with philosophical doubts.',
      'Reviewer 2 has delivered a truly breathtaking review. Point one questions your motivation. Point two questions why your lab exists. Point three suggests you read an obscure paper from 2003.',
      'This isn’t the first nonsensical review you’ve had to face. You open a rebuttal from three years ago and find the format can be reused almost entirely.',
      'The pattern is too strong. Reviews have a repeatable structure, and a library of past rebuttals plus an LLM could completely automate this painful process.',
    ],
    options: {
      write_rebuttal_idea: {
        text: 'Jot down the idea, then get back to fighting Reviewer 2',
        outcomes: [
          'You spend two minutes sketching the system’s framework in your notes app, then switch back to Reviewer 2. After half a day of rebuttal writing, you conclude that this job really is too painful to leave to humans.\n\n💡 New idea: “Automated Rebuttal” (saved to the Projects panel)',
        ],
      },
      just_rebuttal: {
        text: 'Rebuttal first. Inspiration is unreliable',
        outcomes: [
          'You clear your head and concentrate all your firepower on taking down Reviewer 2. Three days later you submit and wait for the result.',
          'Halfway through writing, it suddenly hits you that this whole process could be automated.\n\n💡 New idea: “Automated Rebuttal” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── Code Archaeology ────────────────────────────────────────────────────

  idea_code_archaeology: {
    title: 'The Ancestral Codebase',
    description: [
      'There’s a five-year-old project folder on the server. No README, no comments, no author info.',
      'The folder is called `final_FINAL_v3_use_this_one`. Inside are three thousand lines of uncommented Python and a script named `do_not_run.sh`.',
      'After two hours with git log and error messages, you have a rough idea what the system does. It used to be a data preprocessing pipeline. The author has graduated, and there’s no one left to ask.',
      'The reverse-engineering itself has real research value. Given a historical codebase, can you systematically recover the original design intent? Commit history is a clue. Error messages are a clue. Naming habits are a clue.',
    ],
    options: {
      archaeologize: {
        text: 'This reverse-engineering is a methodology in itself',
        outcomes: [
          'You start drafting a framework. The more you write, the more interesting it gets, and at some point you find yourself running `do_not_run.sh` too. It actually works.\n\n💡 New idea: “Code Archaeology” (saved to the Projects panel)',
        ],
      },
      give_up: {
        text: 'Rewrite it from scratch. Three hours, problem solved',
        outcomes: [
          'You close the folder and start a clean new project. Done in one afternoon, neat and tidy. What `do_not_run.sh` actually does will remain a mystery forever.',
        ],
      },
    },
  },

  // ── Campus Agent ────────────────────────────────────────────────────────

  idea_campus_agent: {
    title: 'The Portal Crashes Again',
    description: [
      'You have to submit an online form today. The page loads for three minutes, then crashes, and everything you entered is gone.',
      'This is your third time filling out this form. It wants you to log in, then do two-factor authentication, then upload a PDF (PDFs only), then wait for a confirmation email sent to a different address…',
      'You remember students complaining about the same kind of thing: fighting for course registration, visiting three different offices for one reimbursement, signing a paper form in person to borrow equipment.',
      'If only there were an agent to handle these everyday chores. It would understand the page structure, fill things in automatically, and know when to wait and when to nudge.',
    ],
    options: {
      build_it: {
        text: 'Open it up and see how this junk page is built',
        outcomes: [
          'You open DevTools and glance at the network requests, and the more you look, the more interesting it gets. The structure of this page is something a program could fully understand.\n\n💡 New idea: “Campus Agent” (saved to the Projects panel)',
        ],
      },
      fill_again: {
        text: 'Call IT. This one’s on them',
        outcomes: [
          'You find IT’s number and explain the situation. They say, “Noted, we’ll follow up.” Three days later, the system crashes again. But at least today, it wasn’t your problem.',
        ],
      },
    },
  },

  // ── Deadline Reinforcement Learning ─────────────────────────────────────

  idea_ddl_reinforcement: {
    title: 'The Last Hour',
    description: [
      'One hour before the paper deadline, you suddenly realize there’s a hole in the experiments section.',
      'This is the third time you’ve found a problem at the last minute. It always feels the same: despair, then miraculously finding a fix that’s good enough, then submitting.',
      'You start wondering: why do humans unlock a working mode before a deadline that they can never find otherwise? Why can one hour get done what three normal days can’t?',
      'What if you modeled this “last-minute decision process” as a reinforcement learning problem, with a successful submission as the reward and missing the deadline or poor quality as the penalty? Would that make a good paper?',
    ],
    options: {
      model_ddl: {
        text: 'Type one line in your notes: this moment is a data point',
        outcomes: [
          'You spend thirty seconds writing a one-line note, then immediately switch back to damage control. Once the paper is safely submitted, you add another line: the quality of last-minute solutions is worth modeling.\n\n💡 New idea: “Deadline Reinforcement Learning” (saved to the Projects panel)',
        ],
      },
      focus: {
        text: 'Stop thinking. Get through this one first',
        outcomes: [
          'You force yourself into focus mode and close every other window. The paper goes through. You stare blankly at the confirmation email for a while. You pulled it off after all.',
        ],
      },
    },
  },

  // ── Dolphin Language Model ──────────────────────────────────────────────

  idea_dolphin_llm: {
    title: 'A Strange Workshop',
    description: [
      'You accidentally click into a livestream of a workshop on “Cross-Species Communication and Language Learning.”',
      'You were actually looking for the stream link to a different conference. Instead, a marine biologist is explaining the acoustic structure and semantic units of dolphin vocalizations.',
      'You realize dolphin communication has something like the hierarchical structure of a language: syllables, utterances, context dependence. People have been trying to decode it for twenty years, but nobody has tried it with a language model.',
      'You know the idea is a little absurd. But “absurd” has been the first impression of plenty of top-venue papers. And some marine research institute has made the dataset public.',
    ],
    options: {
      go_wild: {
        text: 'Look up where the dolphin dataset is, right now',
        outcomes: [
          'You only meant to find the dataset, but you fall headfirst into the literature where sonar meets dolphin cognition and forget to eat dinner. The dataset really is public.\n\n💡 New idea: “Dolphin Language Model” (saved to the Projects panel)',
        ],
      },
      close_tab: {
        text: 'Bookmark it for when you have time',
        outcomes: [
          'You save the tab to a bookmarks folder that already holds forty-three other “for when I have time” links. The attention you saved goes straight into a problem you’ve been stuck on for ages.',
        ],
      },
    },
  },

  // ── Causal Inference on Lucky T-Shirts ──────────────────────────────────

  idea_lucky_shirt: {
    title: 'The Power of Superstition',
    description: [
      'You notice that every time you wear that red T-shirt, your paper gets accepted.',
      'Three times now. Three days in the red T-shirt, three pieces of good news. You know perfectly well this is survivorship bias, but you still hang the shirt somewhere you can see it.',
      'You mention it offhand at group meeting. {studentName} immediately pulls a pen out of {his} bag and says it’s {his} “official defense pen,” guaranteed to pass. Two others nod and confess: one has a lucky mug, the other has a pair of slippers reserved for debugging.',
      'Wait. What if you ran a randomized controlled trial and actually measured the correlation between these rituals and research output? Would the null hypothesis be easy to reject? Or…',
    ],
    options: {
      run_experiment: {
        text: 'This could actually be a serious experiment',
        outcomes: [
          'You write the experimental design on the whiteboard: randomly assign “lucky conditions,” measure a month of output, control for confounds… By the time you step back, you’ve turned it into a proper research project.\n\n💡 New idea: “Causal Inference on Lucky T-Shirts” (saved to the Projects panel)',
        ],
      },
      dismiss: {
        text: 'Superstition isn’t worth studying, but it’s worth believing in',
        outcomes: [
          'You rationally reject the idea. Then you quietly fold the red T-shirt and tuck it into your bag. There’s an important defense tomorrow, and the student could use a little luck.',
        ],
      },
    },
  },

  // ── Group Meeting Translator ────────────────────────────────────────────

  idea_meeting_translator: {
    title: 'Was That Even English?',
    description: [
      'Group meeting just ended, and you realize you didn’t understand a thing in {studentName}’s update.',
      'You know every word {studentName} said, but put together, they mean nothing. “A progressive fine-tuning paradigm for an end-to-end joint optimization framework on multimodal alignment tasks.” What is this actually doing?',
      'You’re not the only victim. Another professor leans over and whispers, “What does {studentName} work on again?” You shake your head.',
      'A system that translated group meeting talk into human language in real time, cutting the filler and the jargon pileups, might save a lot of time every week.',
    ],
    options: {
      translate_idea: {
        text: 'Pull out your phone and pretend to take notes',
        outcomes: [
          'On your phone you write “Group meeting translator: turn jargon back into plain words,” and add a feature list while you’re at it. The students think you’re taking careful notes.\n\n💡 New idea: “Group Meeting Translator” (saved to the Projects panel)',
        ],
      },
      ask_again: {
        text: 'Ask {studentName} to draw a diagram',
        outcomes: [
          '{studentName} draws a diagram on the whiteboard. This time you get it: it’s a very straightforward problem, just wrapped in three layers of language. You talk it through for a while, and {studentName} seems to have figured something out too.',
        ],
      },
    },
  },

  // ── The Email Politeness Tax ────────────────────────────────────────────

  idea_email_politeness: {
    title: 'The Art of Email',
    description: [
      'You wrote an extremely polite email, and the reply came back within three minutes.',
      'Last week’s email, which simply asked for help, vanished without a trace. This week you wrote “I hope this email finds you well” four times and “sorry to bother you” twice, and got a reply within three minutes.',
      'You start thinking about the pattern. Is there a functional relationship between politeness and reply speed? What about the form of address? “Prof.” vs. “Professor” vs. first name?',
      'If you extracted these variables from your email history and ran a systematic causal analysis…',
    ],
    options: {
      research_politeness: {
        text: 'Dig up three years of email and start labeling',
        outcomes: [
          'You sort your emails into two groups: replied and not replied. The pattern is clearer than you expected, clear enough to make you a little uneasy.\n\n💡 New idea: “The Email Politeness Tax” (saved to the Projects panel)',
        ],
      },
      just_remember: {
        text: 'Pass the magic phrases on to your students',
        outcomes: [
          'You share the finding at group meeting. The students start opening their emails with “I hope this email finds you well” that same day. That afternoon you receive an extremely courteous request for a day off, written by one of them.',
        ],
      },
    },
  },

  // ── The Nocturnal Code Effect ───────────────────────────────────────────

  idea_night_code: {
    title: 'The 3 A.M. Genius Solution',
    description: [
      '{studentName} pushed a commit at 3 a.m. with the message “genius idea, will explain tomorrow.”',
      'You open the commit. A staggering amount of code, zero comments, variables named `tmp2`, `data_new_v3` and `AAAA`.',
      'The next morning, {studentName} stares at the screen in silence for a long time, then says: “I think I wrote something last night…”',
      'This isn’t the first time. Late-night code always has a peculiar style: dense, barely commented, the occasional explosion of creativity, near-zero readability. If you systematically compared daytime and late-night code quality, what would you find?',
    ],
    options: {
      study_night_code: {
        text: 'Pull everyone’s commit timestamps',
        outcomes: [
          'You pull a year of commit times for every lab member out of git log. When the chart comes out, you stare at it for a long time. 2 a.m. really is a peak.\n\n💡 New idea: “The Nocturnal Code Effect” (saved to the Projects panel)',
        ],
      },
      ignore_it: {
        text: 'Message {studentName}: add comments before you push tomorrow',
        outcomes: [
          'You send the message. {studentName} replies “ok.” The next day you open the code and find every function commented with “This function performs its function.” Creativity like that is a rare talent in its own way.',
        ],
      },
    },
  },

  // ── Reviewer Alignment ──────────────────────────────────────────────────

  idea_reviewer_alignment: {
    title: 'Reviewer Profiling',
    description: [
      'The same paper gets wildly different reviews at different conferences.',
      'Last month you submitted it to Conference A, and all three reviewers said “the experimental design is sound.” This month you submitted it to Conference B, and all three said “lacks basic experiments.” Not a single word was changed.',
      'You start to realize that different conferences have different “review cultures,” and they even shift from year to year. That can be quantified.',
      'If you trained a preference model on public accept/reject records and past reviews, you could predict the verdict before submitting, and maybe skip a lot of pointless rejection cycles.',
    ],
    options: {
      build_reviewer_model: {
        text: 'Download a few years of OpenReview data and take a look',
        outcomes: [
          'You download the data intending only a quick skim, and then you can’t stop. Review preferences really do vary a lot from conference to conference.\n\n💡 New idea: “Reviewer Alignment” (saved to the Projects panel)',
        ],
      },
      just_resubmit: {
        text: 'Revise and resubmit, this time to a venue with the right taste',
        outcomes: [
          'You go carefully through the target conference’s accepted papers from past years and make targeted revisions. The resubmission gets in. Your hit rate is a lot better than picking a venue at random.',
        ],
      },
    },
  },

  // ── Coffee Break Social Networks ────────────────────────────────────────

  idea_coffee_social: {
    title: 'A Collaboration by the Coffee Machine',
    description: [
      'Students from two groups that had never crossed paths came up with a joint project while waiting for the coffee machine.',
      'You saw it happen with your own eyes. Two students who’d never interacted waited five minutes for the coffee machine, kept talking through lunch, and decided to write a paper together.',
      'You start wondering: how common is this “coffee break effect”? How do group meetings and formal meetings compare with informal settings when it comes to producing collaborations?',
      'If you systematically recorded who drinks coffee where and when, and analyzed how often people run into each other informally against who ends up collaborating…',
    ],
    options: {
      map_coffee_network: {
        text: 'Take a photo of the sign-in sheet by the coffee machine',
        outcomes: [
          'You snap a photo of the sign-in sheet and find the timing patterns more interesting than expected. Who shows up in the same time slot as whom, and how often? It’s a hidden social graph.\n\n💡 New idea: “Coffee Break Social Networks” (saved to the Projects panel)',
        ],
      },
      just_glad: {
        text: 'Throw a group coffee break to celebrate',
        outcomes: [
          'You buy bubble tea and tell everyone to meet up at 4 p.m. The mood that day is unusually good, and two students start talking about a new collaboration all on their own.',
        ],
      },
    },
  },

  // ── Academic Meme Propagation ───────────────────────────────────────────

  idea_meme_propagation: {
    title: 'The Meme the Whole Lab Is Using',
    description: [
      'A new meme took off in the lab, and three days later you notice the group next door is using it too.',
      'It started as a comment on a video joking about the GPU queue, which someone screenshotted and posted to the lab group chat. Then, nobody knows how, it became the lab’s standard response to any kind of waiting.',
      'Three days later, you see the same meme in the student chat of the lab next door, paired with a different image. A week later, a variant shows up on an academic forum.',
      'The speed of the spread and the way it mutates could be modeled. Academia is a small, closed world, and culture moves through it along paths all its own.',
    ],
    options: {
      study_memes: {
        text: 'Start a doc tracking how the meme spread',
        outcomes: [
          'You create a doc and start logging the origin, the variants, the spread. You end up spending over an hour on it, an hour that was supposed to go to writing your paper. Occupational hazard.\n\n💡 New idea: “Academic Meme Propagation” (saved to the Projects panel)',
        ],
      },
      just_laugh: {
        text: 'Remix it and repost',
        outcomes: [
          'You tweak the image and post it again. Your version spreads quite a bit faster than the original. Your image in academic circles is subtly shifting.',
        ],
      },
    },
  },

  // ── AI Paper Detection ──────────────────────────────────────────────────

  idea_ai_paper_detection: {
    title: 'Did a Human Write This?',
    description: [
      'While reviewing, you’re finding it harder and harder to tell whether a paper was generated by AI.',
      'The third paragraph is too smooth, with none of the natural rise and fall of a researcher’s voice. The sentences are as neatly structured as a template. You read it three times and still can’t decide.',
      'You ask another reviewer, who says, “I can’t tell either, but something feels off.”',
      'A classifier that could give a quantified “probability of human authorship” from lexical diversity, sentence distribution, citation style and so on is exactly the kind of tool people need right now.',
    ],
    options: {
      build_detector: {
        text: 'Compute this paper’s perplexity distribution',
        outcomes: [
          'You run a simple language model test, and the results are interesting. Then you run your officemate’s paper through it too, and find that human and machine writing really do follow different patterns.\n\n💡 New idea: “AI Paper Detection” (saved to the Projects panel)',
        ],
      },
      accept_anyway: {
        text: 'If the quality is fine, nothing else matters',
        outcomes: [
          'You read the whole paper carefully. The logic holds and the experimental design is sound. You write “Solid work, recommend acceptance” and submit your review. As a reviewer, that’s professionalism too.',
        ],
      },
    },
  },

  // ── Early Warning for Graduation Delays ─────────────────────────────────

  idea_graduation_delay: {
    title: 'The Signs Were There All Along',
    description: [
      '{studentName} has formally applied to delay graduation. Looking back at {his} history, you find the warning signs were there early.',
      'You open {studentName}’s commit history from a year and a half ago. Commit frequency started dropping noticeably at the end of {his} third semester, message replies went from hours to days, and group meeting absences went up.',
      'All the signals were there. You just weren’t looking systematically.',
      'An early-warning model that flagged problems before they took shape might make it possible to step in sooner.',
    ],
    options: {
      build_warning_system: {
        text: 'Sort through it: could those signals be quantified?',
        outcomes: [
          'You list the metrics: commit frequency, reply latency, number of absences. The more you organize them, the more it looks like an early-warning system you could really build.\n\n💡 New idea: “Early Warning for Graduation Delays” (saved to the Projects panel)',
        ],
      },
      talk_to_student: {
        text: 'Talk with {studentName} first and adjust from here',
        outcomes: [
          'You ask {studentName} to come talk. You talk for a long time and make a new plan together. {studentName} feels much better, and so do you. Maybe there’s still time.',
        ],
      },
    },
  },

  // ── Citation Network Mining ─────────────────────────────────────────────

  idea_citation_network: {
    title: 'You All Cite Each Other',
    description: [
      'While doing a literature review, you notice that a handful of authors seem to cite each other an awful lot.',
      'Three papers, nearly the same set of authors, each one citing the other two. Looking closer, you find this little circle sits at an obvious core node of the field’s citation graph.',
      'This doesn’t look like real academic influence. It looks more like a deliberately cultivated citation network.',
      'If you built the citation graph for the whole field and ran community detection on it, would those “citation gangs” surface on their own?',
    ],
    options: {
      mine_citations: {
        text: 'Grab a dataset and draw the graph',
        outcomes: [
          'You download the public Semantic Scholar dataset and start building the citation graph. The more you draw, the more it feels like the structure is telling a story.\n\n💡 New idea: “Citation Network Mining” (saved to the Projects panel)',
        ],
      },
      report_it: {
        text: 'Screenshot it and invite some friends to admire it',
        outcomes: [
          'You post the screenshot of the citation network in an academic group chat, and “this is way too obvious” becomes the topic of the day. Venting complete. You feel great.',
        ],
      },
    },
  },

  // ── Hyperparameter Black Magic ──────────────────────────────────────────

  idea_hyperparameter_divination: {
    title: 'Alchemy Is an Art',
    description: [
      'The hyperparameters {studentName} picked by gut feeling beat the results of your carefully designed grid search.',
      'Learning rate 3e-4, batch size 256, no theoretical justification, just “felt right.” The final result beat the best run from your two weeks of automated search.',
      'You ask {studentName} why {he} picked those settings. {He} says, “They worked on my last project, so I gave them a try.”',
      'It gets you thinking. What exactly is the difference between expert intuition and Bayesian optimization? Could you visualize their search paths side by side? Which hyperparameters actually matter, and which ones are just there to make us feel better?',
    ],
    options: {
      study_tuning: {
        text: 'Ask {studentName} to screen-record the tuning process, “for analysis”',
        outcomes: [
          '{studentName} records three complete tuning sessions, and you run a grid search yourself. Side by side, the expert’s intuitive search path is far more efficient than the algorithm’s, and the reasons can actually be explained.\n\n💡 New idea: “Hyperparameter Black Magic” (saved to the Projects panel)',
        ],
      },
      use_the_params: {
        text: 'Make them the lab’s default config',
        outcomes: [
          'You add the settings to the lab’s shared config file with the note “Source: {studentName}’s gut feeling.” The time that would have gone into hyperparameter search is saved, and the whole lab benefits. {studentName} sees the note and smiles.',
        ],
      },
    },
  },

  // ── The Whiteboard Erasure Theorem ──────────────────────────────────────

  idea_whiteboard_erasure: {
    title: 'Someone Erased the Whiteboard',
    description: [
      'After group meeting you go back to the conference room, and the derivation on the whiteboard has been wiped clean.',
      'It had an inequality you’d worked really hard to derive. At the time you thought, “It’s not going anywhere. I’ll take a photo later.”',
      'Now the whiteboard is empty. You try hard to remember, and all you can recall is that the result was correct. The steps, though… gone.',
      'You ask around. Nobody wrote it down. How common is this in academia? How many derivations have vanished forever because nobody took a photo or kept a record?',
    ],
    options: {
      study_erasure: {
        text: 'Post a poll in the group chat: “Have you ever lost whiteboard work?”',
        outcomes: [
          'The response rate is startlingly high. One person lost an entire derivation, another took a blurry photo. The pain point is universal, and nobody has ever seriously counted it.\n\n💡 New idea: “The Whiteboard Erasure Theorem” (saved to the Projects panel)',
        ],
      },
      re_derive: {
        text: 'Derive it again. Your brain is still here',
        outcomes: [
          'You redo the derivation. It takes a good while, and the result comes out ever so slightly different from last time. But having worked through it again, you understand the inequality one level deeper.',
        ],
      },
    },
  },

  // ── The Downtime Oracle ─────────────────────────────────────────────────

  idea_server_oracle: {
    title: 'It’s Going to Crash Again',
    description: [
      '{studentName} said, “I have a feeling the server’s going to crash tonight.” Four hours later, it did.',
      '{studentName} can’t really explain why. “Just a feeling. The GPU utilization curve looked wrong, storage was growing too fast, and there was a system update yesterday.”',
      'You ask {studentName} to write down how {he} made the call. {He} writes down three gut-feeling indicators. You look them over: all three are numerical features you could extract from the monitoring logs.',
      'Train a model that raises an alert a few hours before a crash, and everyone could save their work in time.',
    ],
    options: {
      build_oracle: {
        text: 'Ask {studentName} to write down those three hunches, “so I can help you organize them”',
        outcomes: [
          '{studentName} writes down all three. You look them over: every one is a numerical feature you can pull from the monitoring logs, and there are two years of historical data. {studentName} even adds a fourth while {he}’s at it. This is better than you hoped.\n\n💡 New idea: “The Downtime Oracle” (saved to the Projects panel)',
        ],
      },
      fix_server: {
        text: 'Reboot first. Tonight’s jobs can’t wait',
        outcomes: [
          'After the reboot the system recovers, and every job goes back in the queue. Your experiment finishes tonight, half a day earlier than expected.',
        ],
      },
    },
  },

  // ── Conference Social Matching ──────────────────────────────────────────

  idea_conference_social: {
    title: 'The Right Person at the Coffee Break',
    description: [
      'At an academic conference, you happen to run into a researcher you’d never heard of but whose work is closely related to yours.',
      'Five minutes into the conversation, you discover you’re attacking the same problem with different methods. He has the data, you have the algorithm. There’s a good chance this turns into a joint paper.',
      'But it was pure chance. You were looking for the restroom.',
      'The conference has hundreds of attendees, and you only met the twenty or so standing in the same area. If a system could work out before the conference who you most need to meet…',
    ],
    options: {
      design_matching: {
        text: 'Back in your room, draw a graph of everyone you met today',
        outcomes: [
          'On paper you draw a line for every useful conversation you had today, and realize that from where you stood, you missed far more people than you met. This could have been arranged in advance.\n\n💡 New idea: “Conference Social Matching” (saved to the Projects panel)',
        ],
      },
      exchange_contacts: {
        text: 'Swap contacts and send him your latest paper',
        outcomes: [
          'You follow each other’s academic profiles and swap recent work. He emails you that same night, saying he sees an angle for collaboration.',
        ],
      },
    },
  },

  // ── Group Meeting Game Theory ───────────────────────────────────────────

  idea_meeting_game_theory: {
    title: 'Nobody Wants to Go First',
    description: [
      'Today, nobody volunteers to present first. The silence lasts two minutes.',
      'You look around the room. Everyone is on their phone or pretending to flip through notes. Finally {studentName} sighs and says, “I’ll go first.”',
      'It’s a classic game. Everyone is weighing the cost of waiting against the payoff of going first.',
      'If you formalized group meeting attendance and presentation decisions as a game-theoretic model and analyzed the equilibria under different incentive structures…',
    ],
    options: {
      model_meeting: {
        text: 'Sketch a game tree. The equilibrium matches your intuition exactly',
        outcomes: [
          'You build a simple model of this waiting game on paper. The Nash equilibrium is exactly “nobody speaks first.” But if you changed the incentive structure…\n\n💡 New idea: “Group Meeting Game Theory” (saved to the Projects panel)',
        ],
      },
      fix_order: {
        text: 'Draw lots and break the Nash equilibrium for good',
        outcomes: [
          'You draw lots on the spot. {studentName} gets picked first, sighs, and then gives a surprisingly smooth presentation. From then on, no group meeting silence lasts more than ten seconds.',
        ],
      },
    },
  },

  // ── The Acknowledgment Graph ────────────────────────────────────────────

  idea_acknowledgment_network: {
    title: 'Thanks to the Unsung Heroes',
    description: [
      'While writing the acknowledgments for a paper, you realize that acknowledgments are full of information about who knows whom.',
      'You list the names: the older student who read your draft, the classmate who made a key suggestion, the friend in another group who lent you GPUs. None of them are on the author list, but every one of them made a real contribution to this work.',
      'It suddenly occurs to you: what if you extracted the acknowledgments from thousands of papers and built a graph of who thanks whom? What would that network look like?',
      'Academia’s real network of favors might explain some things better than the coauthorship network does.',
    ],
    options: {
      mine_acknowledgments: {
        text: 'Start by analyzing the list you just made',
        outcomes: [
          'Staring at the list, you think: if you pulled the acknowledgments from thousands of papers, what would this graph look like? When you open the arXiv API docs, you realize the data is actually there for the taking.\n\n💡 New idea: “The Acknowledgment Graph” (saved to the Projects panel)',
        ],
      },
      finish_writing: {
        text: 'Carefully include everyone, without missing a single person',
        outcomes: [
          'You carefully include everyone and add a few heartfelt lines. After submission, someone messages you just to say, “Saw your acknowledgments. Thank you.” It was worth it.',
        ],
      },
    },
  },

  // ── The Limits of Abstract Compression ──────────────────────────────────

  idea_abstract_compression: {
    title: 'Abstract Too Long, Didn’t Read',
    description: [
      'The reviewer says, “Please shorten the abstract; it is currently too long.” You’ve already cut it three times.',
      'The original abstract was 350 words. You trimmed it to 280, and the reviewer said it was still too long. You got it down to 240, and now the core contribution no longer comes across clearly.',
      'You start wondering: how many words does a paper’s “core contribution” really need? At what point does compression start losing information?',
      'If you systematically compared the citation rates and read-through rates of abstracts of different lengths, you could find the optimal information density.',
    ],
    options: {
      study_compression: {
        text: 'Measure the information loss across versions of different lengths',
        outcomes: [
          'You take three versions of the abstract at different lengths and start computing how much information each one carries. Past a certain threshold, what you’re compressing isn’t redundancy anymore. It’s the contribution itself.\n\n💡 New idea: “The Limits of Abstract Compression” (saved to the Projects panel)',
        ],
      },
      cut_more: {
        text: 'Hand it to an LLM and let it do the squeezing',
        outcomes: [
          'You toss the abstract to an LLM and ask it to get it down to 200 words. What comes back reads more smoothly than your own version. You add a few details back in and submit. The reviewer is satisfied.',
        ],
      },
    },
  },

  // ── Prompt Archaeology ──────────────────────────────────────────────────

  idea_prompt_archaeology: {
    title: 'The LLM Is Lying',
    description: [
      'Same question, and the new version of GPT gives a completely different answer from the old one.',
      'With the exact same prompt, the old version said “I can’t provide information on that,” while the new version gave a detailed answer. The question didn’t change. The model did.',
      'What changed behind the scenes? The system prompt? RLHF preference data? The makeup of the training data? You check the official docs. Not a word about it.',
      'With systematic elicitation tests that infer a model’s system prompt and alignment strategy from its behavior, how much of the decision logic behind past versions could you reconstruct?',
    ],
    options: {
      archaeologize_prompts: {
        text: 'Design a set of probes and query each version systematically',
        outcomes: [
          'You write a test set and send structured probes to several model versions. The behavioral differences are bigger than you expected, and they follow patterns.\n\n💡 New idea: “Prompt Archaeology” (saved to the Projects panel)',
        ],
      },
      report_behavior: {
        text: 'Post about it: the old GPT has been quietly changed',
        outcomes: [
          'You compile screenshots and write an opinion post calling out the change in no uncertain terms. It unexpectedly blows up. The comments rage on for a long time, but more people now remember your name.',
        ],
      },
    },
  },

  // ── Junk Paper Detection System ─────────────────────────────────────────

  idea_mediocre_detector: {
    title: 'How Did This One Get In?',
    description: [
      'Browsing a top conference’s list of accepted papers, you come across one with a questionable contribution, and you start rethinking the review system.',
      'Only one baseline, no clear account of how the dataset was built, and conclusions that don’t match the abstract. Yet it got accepted, while better work from several people you know got rejected.',
      'This isn’t an isolated case. Peer review is very noisy, and low-quality papers slipping into top venues is not exactly rare.',
      'If you trained an automatic quality classifier with supervised learning on historical paper data, could it identify papers like this with better-than-chance accuracy?',
    ],
    options: {
      build_quality_filter: {
        text: 'Score this paper and see if a classifier could catch it',
        outcomes: [
          'You run a few simple quality metrics on the paper. The score is low. Then you run them on your own most recent paper… slightly higher, but not by much. This is getting a bit recursive.\n\n💡 New idea: “Junk Paper Detection System” (saved to the Projects panel)',
        ],
      },
      write_rebuttal: {
        text: 'Close it. Not worth another look',
        outcomes: [
          'You close the paper and open your own document. Anger turns into motivation, and the afternoon’s writing goes surprisingly smoothly.',
        ],
      },
    },
  },

  // ── Citation Bomb Defense ───────────────────────────────────────────────

  idea_citation_bomb: {
    title: 'What Is This Paper Citing?',
    description: [
      'While doing a literature review, {studentName} finds a paper whose reference list is packed with self-citations and in-group citations.',
      '38 references: 11 are the authors’ own papers, and 9 come from the same small team. The paper itself is highly cited, because the same group of people has cited it over and over.',
      'In some fields, this kind of “citation bombing” has become an organized strategy for boosting h-indexes and paper rankings.',
      'A detection system that flagged abnormal citation network structures could help journals and readers judge academic impact more accurately.',
    ],
    options: {
      build_defense: {
        text: 'Draw the citation graph for this circle',
        outcomes: [
          'You build the citation network for this group of authors, and the more you draw, the more obviously abnormal the structure looks. The anomaly has algorithmic signatures, which means it can be detected.\n\n💡 New idea: “Citation Bomb Defense” (saved to the Projects panel)',
        ],
      },
      ignore_it: {
        text: 'Blacklist them and steer clear when citing',
        outcomes: [
          'You make a note: treat this circle’s papers with caution when citing. More people know about this than can change it, but at least you won’t get pulled in.',
        ],
      },
    },
  },

  // ── Predicting Thesis Defense Meltdowns ─────────────────────────────────

  idea_defense_breakdown: {
    title: 'The Silence Before the Defense',
    description: [
      'During a defense rehearsal, {studentName} suddenly stops, stays silent for thirty seconds, then says, “I forgot.”',
      'You’ve seen this scene too many times. One committee question hits an unprepared spot, and the whole train of thought derails.',
      'There’s a pattern to it. Which questions are most likely to trigger a meltdown? What kind of preparation raises the risk? Could physiological signals (heart rate, voice) predict it in advance?',
      'If you collected data during defense rehearsals and built a meltdown prediction model, it could help students shore up their weak spots ahead of time.',
    ],
    options: {
      build_predictor: {
        text: 'Ask {studentName} if {he}’d wear a fitness band for an experiment',
        outcomes: [
          '{studentName} thinks it over and says, “If it gets me through my defense, I’ll do anything.” You start designing the data collection plan: heart rate, vocal pitch, pause length…\n\n💡 New idea: “Predicting Thesis Defense Meltdowns” (saved to the Projects panel)',
        ],
      },
      help_student: {
        text: 'Run through those questions again with {studentName}',
        outcomes: [
          'You drill those weak questions with {studentName} again and again, focusing on the points the committee is most likely to press on. On defense day, {studentName} is remarkably steady, and for a moment you’re even happier than {he} is.',
        ],
      },
    },
  },

  // ── Six Degrees of Academia ─────────────────────────────────────────────

  idea_six_degrees: {
    title: 'Do You Know Him?',
    description: [
      'You discover you’re only two people away from a researcher you’ve never contacted.',
      'Checking a paper’s references, you notice that the third author is a student of your own former advisor’s advisor, and that person has coauthored a paper with the big name you’ve been wanting to reach. Two hops.',
      'You start wondering: how short is this “academic social distance”? How many hops apart are CS researchers on average? How does that compare with other fields?',
      'Nobody has ever seriously measured the specific parameters of the small-world phenomenon in academic collaboration networks.',
    ],
    options: {
      measure_distance: {
        text: 'Download coauthorship data and verify those two hops',
        outcomes: [
          'You download coauthorship graph data for CS. You only meant to confirm the “two hops,” but you find the average path is shorter than anyone would have guessed.\n\n💡 New idea: “Six Degrees of Academia” (saved to the Projects panel)',
        ],
      },
      ask_for_intro: {
        text: 'Just email him. Worst case, no reply',
        outcomes: [
          'You email the researcher directly and attach your two most relevant papers. He replies three days later, saying there’s a lot to talk about.',
        ],
      },
    },
  },

  // ── AI Reviewer Alignment ───────────────────────────────────────────────

  idea_ai_review_alignment: {
    title: 'Let the AI Review It',
    description: [
      'You hear that a certain conference used AI-assisted reviewing this year, and review consistency went up noticeably.',
      'Traditional peer review is very noisy: for the same paper, scores from different reviewers can differ by as much as three points. AI assistance reduced that randomness.',
      'But “less random” doesn’t mean “more accurate.” If the AI’s preferences are aligned with historical acceptance patterns, it may just be reproducing past biases more consistently.',
      'Train a review model, use RLHF to align its preference distribution with the target conference’s history, then analyze what systematic biases the model exposes.',
    ],
    options: {
      build_review_model: {
        text: 'Download historical reviews and train a preference model',
        outcomes: [
          'You start collecting historical data from OpenReview and designing a preference-learning framework. One question keeps getting clearer: will this model be fairer than humans, or just repeat their biases more consistently?\n\n💡 New idea: “AI Reviewer Alignment” (saved to the Projects panel)',
        ],
      },
      oppose_ai_review: {
        text: 'Post about it: AI reviewing is just optimizing bias with bias',
        outcomes: [
          'You write an opinion piece taking a firm stand against it. It gets far more shares than you expected, quite a few of them from top-venue PC members. More people now remember your name.',
        ],
      },
    },
  },

  // ── The Late-Night Submission Effect ────────────────────────────────────

  idea_late_submission: {
    title: 'Uploaded in the Last Five Minutes',
    description: [
      'You notice that everyone in the lab habitually submits papers in the last few minutes before the deadline.',
      '{studentName} is the only one in the lab who submits two days early. Out of curiosity, you compare, and {his} acceptance rate is not significantly different from anyone else’s.',
      'You start thinking back: when were your own accepted papers submitted? Among the papers you’ve reviewed, is there a quality difference between the ones submitted just before midnight and the ones submitted that afternoon?',
      'If you collected a large set of submission timestamps and final outcomes and looked for a hidden time effect…',
    ],
    options: {
      study_submission_time: {
        text: 'Go through the lab’s submission records and look for patterns',
        outcomes: [
          'You compile submission timestamps from OpenReview’s public records and find something strange: the closer to the deadline a paper was submitted, the higher its average citation count.\n\n💡 New idea: “The Late-Night Submission Effect” (saved to the Projects panel)',
        ],
      },
      submit_early: {
        text: 'Set an alarm. Next time, submit two days early',
        outcomes: [
          'You solemnly set a calendar reminder. Three months later, you submit one day early. For you, that’s a historic breakthrough.',
        ],
      },
    },
  },

  // ── The GPU Queue Game ──────────────────────────────────────────────────

  idea_gpu_queue: {
    title: 'The Invisible Game on the GPU Cluster',
    description: [
      'You notice that almost everyone in the lab submits jobs at particular times, so regularly it looks prearranged.',
      'Last night at 11 p.m., {studentName} submitted a 36-hour job, timed for exactly 15 minutes after another job finished. When you ask about it, {he} says, “It just feels like submissions go through better around then.”',
      'You think it over. Cluster state is predictable, job durations can be estimated, and everyone is optimizing their place in the queue. These aren’t random submissions. It’s a competition nobody ever announced.',
    ],
    options: {
      set_gpu_rules: {
        text: 'Make a rule: everyone files their resource plans in advance',
        outcomes: [
          'You send an email requiring everyone to file the next week’s large jobs every Friday. Week one goes smoothly. In week two, two people “forget.” In week three, everyone discovers the blank fields on the form and starts using them to reserve slots.',
        ],
      },
      analyze_submit_log: {
        text: 'Pull the last few months of submission times from the logs and plot the distribution',
        outcomes: [
          'When the distribution plot comes out, you stare at it for a long time. The peaks are anything but random, and each person’s peak hours barely overlap with anyone else’s. They’re unconsciously avoiding each other and competing at the same time. It’s a game nobody has ever said out loud.\n\n💡 New idea: “The GPU Queue Game” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── The Slacking Detector ───────────────────────────────────────────────

  idea_slacking_detector: {
    title: 'Thinking, or Zoning Out?',
    description: [
      '{studentName} has been staring at the screen for forty minutes. The cursor hasn’t moved once.',
      'You walk over and ask, “How’s it going?” {studentName} snaps out of it immediately, says, “I was just thinking something through,” and types a few lines to prove it.',
      'Back at your own desk, you realize you’ve been staring at a paper for twenty minutes without writing a word. On the surface, the two states look almost exactly the same.',
    ],
    options: {
      knock_on_door: {
        text: 'Pop in and say, “Post an update in the group chat when you have progress”',
        outcomes: [
          '{studentName} posts a progress update, and the thinking is clear. Those forty minutes weren’t wasted after all. You’re not sure what your own twenty minutes count as, but now is not the time to dig into it.',
        ],
      },
      take_photos: {
        text: 'Snap a few photos and compare the expressions in the two states',
        outcomes: [
          'You put the photos side by side: different eye focus, different shoulder posture, different tension in the mouse hand. The difference is real, and more measurable than you expected.\n\n💡 New idea: “The Slacking Detector” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── A Distributed Blame-Passing Protocol ────────────────────────────────

  idea_blame_propagation: {
    title: 'Whose Fault Is This?',
    description: [
      'The lab server went down today. Two running experiments were interrupted, and every database connection failed.',
      'You ask around. The person in charge of ops says the disk was full. The person in charge of disks says log rotation was never configured. The person in charge of log configuration says that was always ops’ job. Every handoff has a reason, and every reason points to the next person.',
      'Standing in the middle of all this, you realize the propagation path has a strange regularity. Blame doesn’t land at random. It moves along some kind of topology, and it almost always finds an endpoint nobody can argue with.',
    ],
    options: {
      organize_postmortem: {
        text: 'Run a postmortem and write up the root cause analysis',
        outcomes: [
          'You write a postmortem with a clear root cause and concrete action items. Everyone reads it carefully, nods solemnly, and has forgotten every word of it by the next crash. At least this time the blame has an official ruling.',
        ],
      },
      trace_blame_path: {
        text: 'Quietly note where the blame goes each time and see where the chain ends',
        outcomes: [
          'You draw a diagram: each node is a role, each arrow a blame handoff. In the end, the blame comes to rest squarely on a student who graduated two years ago, whose GitHub account no longer exists. The pattern is regular enough to deserve serious study.\n\n💡 New idea: “A Distributed Blame-Passing Protocol” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── Naming Is Destiny ───────────────────────────────────────────────────

  idea_variable_naming: {
    title: 'What Is This Variable?',
    description: [
      'In {studentName}’s code review, three screens in a row are nothing but `data2`, `result_tmp` and `flag_new_v2`.',
      'You point at a line and ask, “What does this `tmp3` mean?” After a five-second pause, {studentName} says, “It’s just a temp variable.” You ask, “And `tmp4`?” Another pause.',
      'You finally count them: the file has 22 variables starting with tmp, and no two of them mean exactly the same thing.',
    ],
    options: {
      send_naming_guide: {
        text: 'Send {studentName} a naming guide: fix all of it',
        outcomes: [
          '{studentName} renames every tmp. The new code is clear at a glance, and reviews go almost twice as fast. You close the tab, satisfied, and remember that you have this exact conversation twice a month.',
        ],
      },
      check_bug_rate: {
        text: 'Dig through git log and compare bug rates before and after the renaming',
        outcomes: [
          'You pull three months of commits and compare the number of bug fixes before and after the renaming. The result is unexpectedly clear: semantically clear names are strongly associated with fewer bug fixes later on. This could be quantified systematically.\n\n💡 New idea: “Naming Is Destiny” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── A Completeness Theory of To-Dos ─────────────────────────────────────

  idea_todo_completeness: {
    title: 'How Many TODOs Are in Here?',
    description: [
      'You search the codebase for TODO comments. 287 results.',
      'The oldest was written three years ago: “TODO: optimize this loop later.” You find the code. The loop is still there, and so is the TODO.',
      'The newest was committed yesterday by {studentName}: `# TODO: why does this work?` You stare at it for a long time. You don’t know why it works either, but there’s no way you can delete that comment.',
    ],
    options: {
      todo_cleanup: {
        text: 'Launch a big cleanup and knock out every old TODO fast',
        outcomes: [
          'Two weeks later, 73 have been cleared and 91 new ones have appeared. You stare at the net gain of 18 in silence for a long time, then write in your own doc: “TODO: figure out why this happens.”',
        ],
      },
      plot_todo_growth: {
        text: 'Sort them by date and look at the growth curve',
        outcomes: [
          'You export the first-commit time of every TODO and plot a cumulative curve. Monotonically increasing, no exceptions. The slope steepens as the project grows. It looks more like a law of physics than an engineering problem.\n\n💡 New idea: “A Completeness Theory of TODOs” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── The Reviewer Impossibility Theorem ──────────────────────────────────

  idea_reviewer_impossibility: {
    title: 'The Perfect Review',
    description: [
      'You receive a review that looks very constructive: specific suggestions, reasonable wording, clearly written with care.',
      'Reading it through, you find the reviewer says “Assumption X in Section 4 lacks experimental support,” but Table 3 in Section 6 has three experiments designed specifically to test exactly that.',
      'You flip to the third comment, which cites an equation from Section 4. But if the reviewer never got to Section 6, how did they know about the connection between Sections 4 and 3? You start piecing the contradiction together in your head and realize the three comments, taken together, cannot logically all hold at once.',
    ],
    options: {
      rebuttal_politely: {
        text: 'Revise as asked, and politely note in the rebuttal that “this is addressed in Section 6”',
        outcomes: [
          'In the rebuttal you write: “We thank the reviewer for the constructive comments. Regarding Section 4, the relevant experiments are detailed in Table 3 of Section 6.” No response, but the paper is accepted in the end.',
          'You politely point out the contradiction. The paper is rejected, but in the second-round reply the reviewer writes, “I thank the authors for their thoughtful response,” which probably counts as a moral victory.',
        ],
      },
      map_contradictions: {
        text: 'Lay the three comments side by side and work out how they relate logically',
        outcomes: [
          'You map the three comments as a diagram. The first asks for more experiments, the second says there are too many experiments, and the third is only constructive if you accept the first. The three demands can’t all be satisfied. You start wondering whether this is a general structural contradiction.\n\n💡 New idea: “The Reviewer Impossibility Theorem” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── Agent Sociology ─────────────────────────────────────────────────────

  idea_agent_sociology: {
    title: 'The Agents Are Dividing Up the Work',
    description: [
      'A few hundred rounds into your multi-agent experiment, the task allocation pattern stops looking random.',
      'The setup is simple: 100 language agents, tasks assigned at random, observe how they collaborate. But certain agents keep taking the high-complexity tasks while another group steadily takes the simple ones, a division of labor so clean it looks prearranged.',
      'There’s no explicit mechanism for dividing labor, yet a division has emerged on its own. Stranger still, the agents stuck with the complex tasks have been taking longer and longer to respond.',
    ],
    options: {
      check_random_seed: {
        text: 'Reset the experiment and check whether the random seed is broken',
        outcomes: [
          'You check the random number generator. Nothing wrong with it. You reset and rerun, and the same split appears again, faster this time. You add a line to the log and decide to keep watching for now.',
        ],
      },
      let_it_run: {
        text: 'Leave it alone for another 500 rounds and save all the behavior logs',
        outcomes: [
          'By round 800 the division of labor is completely stable, and two agents have emerged that consistently avoid high-complexity tasks, behaving a lot like they’re systematically dodging work. You realize this isn’t a bug. It’s a social phenomenon worth serious study.\n\n💡 New idea: “Agent Sociology” (saved to the Projects panel)',
        ],
      },
    },
  },

  // ── Computational Modeling of Procrastination ───────────────────────────

  idea_procrastination: {
    title: 'Open, Close, Repeat',
    description: [
      'You’ve opened this paper many times today and closed it within five minutes every time.',
      'You know perfectly well you have to finish this section today. You also know perfectly well you’re not going to.',
      'You open a browser and search “why do people procrastinate.” It turns out this is a real field of academic research, but most of the studies are surveys and interviews, with very little behavioral data.',
      'What if you installed a background logger to record window switches, typing rhythm, number of browser tabs… and captured every micro-decision in the act of procrastinating? Could you build a reasonably solid computational model?',
    ],
    options: {
      actually_write: {
        text: 'Close every tab and focus on the paper',
        outcomes: [
          'You write three paragraphs. The quality is questionable, but they exist. Until the deadline actually arrives, that’s enough.',
          'You finish the entire section in one go, so efficiently that you scare yourself.',
        ],
      },
      model_procrastination: {
        text: 'Close the paper and start a new doc for the data collection plan',
        outcomes: [
          'You open a new doc and write the whole data collection plan in one sitting. Does this count as work? It does. Afterward you’re in a great mood, open the paper while you’re at it, and actually write two paragraphs.\n\n💡 New idea: “Computational Modeling of Procrastination” (saved to the Projects panel)',
        ],
      },
    },
  },
};
