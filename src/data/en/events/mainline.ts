import type { EventTranslations } from '../../../types/i18n';

export const mainlineEventsEn: EventTranslations = {

  // ── Opening sequence ─────────────────────────────────────────────────────

  lab_opening: {
    title: 'Day One',
    description: [
      'The key turns in the lock with a soft click. The door opens. This is your lab.',
      'For the next six years, this is where you’ll apply for grants, advise students, stay up late revising papers, and match wits with reviewers. And at 3 a.m. some night, you may also find yourself wondering why you didn’t just go sell bubble tea.',
      'It isn’t a big room. A blank whiteboard, an empty desk, a few boxes you haven’t unpacked, a window that looks out over campus. Other than that, nothing.',
      'No results. No students. No reputation. Even the lab website is still the default template.',
      'You stand in the doorway for a long time. Then it hits you.',
      'Starting today, everyone is going to assume you know what you’re doing.',
    ],
    prompt: 'You decide:',
    options: {
      begin: {
        text: 'Fine. I’ll pretend I do.',
        outcomes: [
          'You slip the key into your pocket and step inside. One way or another, the story has begun.',
        ],
      },
    },
  },

  startup_grant: {
    title: 'Startup Funds Arrive',
    description: [
      'Early the next morning, an email arrives from the college finance office. Subject: “Notice Regarding the Disbursement of Startup Funds for Junior Faculty.”',
      'The body is long. You scroll straight to the bottom. When you see the number, you can’t help checking it again.',
      '$500,000. Half a million. Yesterday your lab was a whiteboard. Today you’re deciding how to spend half a million dollars.',
      'One of the most surreal things about becoming a professor is that people actually hand you money and then expect you to make good decisions with it.',
    ],
    prompt: 'How will you spend your first startup funds?',
    options: {
      buy_server: {
        text: 'Buy servers first',
        outcomes: [
          'You spend $200K on servers. The procurement process is roughly as complicated as a visa application. But the moment the confirmation email arrives, you suddenly feel like you really have a lab. Remaining funds: $300K.',
        ],
      },
      renovate_lab: {
        text: 'Fix up the lab first',
        outcomes: [
          'You buy office furniture, monitors, and a coffee machine. Your research capacity hasn’t improved in the slightest, but the lab has finally been upgraded from “unused room” to “place that looks like it could publish papers.” Remaining funds: $400K.',
        ],
      },
      save_money: {
        text: 'Save it for now',
        outcomes: [
          'You decide not to touch the money yet. The history of science is full of projects that died for lack of funding, and you intend to at least survive your first semester. Looking at the balance, you feel a brief, fragile sense of security.',
        ],
      },
    },
  },

  recruit_campaign: {
    title: 'Party of One',
    description: [
      'You look around. You have a lab now: a whiteboard, desks, maybe even a humming server. But the only person in the room is you. Technically, you are an “advisor with no advisees,” a position better known as “person with a lot of free time.”',
      'Somewhere out there, a crop of future PhD students is scrolling through lab websites with a list of “professors to email” open in another tab. They’ll email ten professors. Nine won’t reply. You need to be the one who does. But first, they need to know you exist.',
      'You open your laptop, create a new document, and title it “Recruitment Outreach Plan.” Then you stare at the blank page for three full minutes.',
    ],
    prompt: 'How will you promote your lab?',
    options: {
      poster_blast: {
        text: 'Make a poster, flood every applicant group chat',
        outcomes: [
          'In the small hours, you design a recruitment poster in PowerPoint. You get the crop ratio wrong three times and try five different fonts before settling on Calibri Bold.\n\nYou post it, and when you wake up the next morning there are seventeen inquiry emails in your inbox. Two of them ask whether the lab has a shuttle bus.',
        ],
      },
      crash_class: {
        text: 'Crash the lecture next door',
        outcomes: [
          '“I’ll only take thirty seconds of your time.” You raise a hand in the middle of Prof. Brennan’s lecture. Thirty seconds turns into five minutes. Prof. Brennan wears a polite but unmistakable smile the entire time.\n\nBut after class, three students come up to swap contact info with you, and one of them says, “Professor, you’re more fun than Prof. Brennan.”',
        ],
      },
      build_website: {
        text: 'Grind out a slick lab website',
        outcomes: [
          'You build a lab website from an open-source template. Your headshot is from a conference three years ago, in a borrowed suit. The Publications page currently lists two papers, but the layout is gorgeous.\n\nA week later, someone emails: “I found your lab through Google.” You feel a strange kind of pride.',
        ],
      },
      honest_pitch: {
        text: 'Tell it straight: join us, get your own GPUs',
        outcomes: [
          'You post a message in the applicant group chats: “New assistant professor, machine learning. The lab just bought servers, and students get dedicated access. Feel free to reach out.” No fluff, no flourishes. The message gets forwarded nine times. The evidence suggests that in CS, “has GPUs” is far more compelling than any academic vision.',
        ],
      },
    },
  },

  // ── Year 2, January (only if no server was bought) ───────────────────────

  gpu_envy: {
    title: 'The GPUs Next Door',
    description: [
      '{studentName} comes in with a complicated expression, the kind people wear when they want to say something but feel awkward about saying it.',
      '“Can I ask you something…” A three-second pause. “Prof. Brennan’s group just got a batch of new servers. Eight A100s. One of his students posted a screenshot of their experiments running yesterday.”\n\nYou realize this isn’t a status update. It’s the “previously on.”',
      '“One experiment used to take me three days. They get results in two hours.”\n\nAnother silence. Then the line you already saw coming:\n\n“Professor, could our lab get a server?”',
    ],
    prompt: 'How do you answer?',
    options: {
      buy_server_late: {
        text: 'Sweeping gesture: “Buy it!”',
        outcomes: [
          'You approve the purchase request. When {studentName} sees the delivery confirmation, {he} is overjoyed and looks up to say, “Thank you, Professor.” The day the server arrives, {studentName} skips lunch and spends the whole day in the server room setting up environments. You sneak a look at the lab’s GPU utilization: maxed out.',
        ],
      },
      rent_server_instead: {
        text: 'Make do with cloud servers for now',
        outcomes: [
          'You set {studentName} up with a cloud account and a reasonable monthly quota. {studentName} thanks you sincerely, but for some reason you hear a hint of disappointment in {his} voice. An account isn’t a machine, after all, just as “we can use one” isn’t the same as “we have one.”',
        ],
      },
      refuse_gpu: {
        text: 'Money’s tight. Not right now',
        outcomes: [
          'You explain the funding situation. {studentName} nods, says, “Okay, I understand,” and goes back to {his} desk. You can’t tell how much of that “I understand” is understanding, how much is disappointment, and how much is already quietly checking out what other labs are up to.',
        ],
      },
    },
  },

  // ── Early-game fixed events ──────────────────────────────────────────────

  joint_meeting_proposal: {
    title: 'A Group Meeting of Two',
    description: [
      'You solemnly write “Research Progress” on the whiteboard and turn around. Across the table sits your one and only student. You stare at each other. About seven seconds pass before you both realize you’re each waiting for the other to speak first.',
      'This is the first “group meeting” since you started the lab. Attendance: 2. Empty chairs: 6. The whole conference room is hinting, silently but firmly, that a “meeting” needs a certain number of people before it counts as one.',
      'Three knocks at the door. It’s Prof. Brennan from the office next door, holding a cup of tea, with the look of a man who knows he’s arrived at exactly the right moment. “Heard you just started your lab? We do a joint group meeting on Thursday afternoons. A few groups together. It’s livelier with more people, and the students get a sense of where they stand. Want to join us?”',
    ],
    prompt: 'How do you respond to Prof. Brennan’s offer?',
    options: {
      join_joint: {
        text: 'Join. Strength in numbers',
        outcomes: [
          'And that’s settled. From then on, every Thursday afternoon, you and your student show up in Prof. Brennan’s bigger conference room, trading updates with his three students, picking apart each other’s experimental designs, and splitting takeout orders. “Everyone in the group” now refers to an actual number of people. Most of them are just on loan.',
        ],
      },
      solo_meeting: {
        text: 'Thanks, but we’ll run our own',
        outcomes: [
          'You politely decline and decide to stay independent. For the next two Thursdays, you and your student sit down in the conference room right on time and meet for a full hour, with several silences that are hard to classify: deep thought, or genuinely nothing to say.\n\nIn week three, your student asks, head tilted, “Prof. Brennan’s students said we could sit in on their meeting. Want to go check it out?” You say yes.\n\nAnd that’s how you end up in the joint group meeting after all. Prof. Brennan sees you at the door and says only, “Should’ve come sooner.” Then he hands you a cup of tea and walks in without looking back.',
        ],
      },
    },
  },

  first_semester_reality: {
    title: 'What Nobody Tells New Professors',
    description: [
      'You open this week’s calendar: three committee meetings, two review requests, and a “Call for Feedback on Streamlining the Travel Reimbursement Process,” with a 57-page attachment and comments due Friday. Meanwhile, the lab Slack has three experiment updates, complete with plots and numbers. Your students appear to be much busier than you are.',
      'You’ve discovered a truth nobody says out loud: becoming a professor doesn’t mean you finally get to focus on research. It means doing research while also handling everything that keeps you from doing research, and convincing both sides you’re giving them your all.',
    ],
    prompt: 'Your plan for this packed calendar:',
    options: {
      clear_admin: {
        text: 'Clear the admin first, then research',
        outcomes: [
          'You spend an entire afternoon answering emails, filling out forms, and replying “Noted.” When you’re finally done and can open the codebase, you glance at the clock: 6 p.m. sharp. Tomorrow, then. At least that annoying little red badge on your inbox is gone.',
        ],
      },
      delegate_meeting: {
        text: 'Send a student. I have real work',
        outcomes: [
          'You hand one of the committee meetings off to a student: “Can you sit in for me and report back the highlights?” The reply is a “Got it,” with a faint note of novelty, the sound of someone realizing for the first time that advisors get subbed out too. Half an hour later, you’ve gotten three more experiment steps done.',
        ],
      },
    },
  },

  semester_one_checkpoint: {
    title: 'November',
    description: [
      'November. The ginkgo leaves outside the window are almost all gone, and someone is wheeling a cart of takeout boxes down the hallway, the overture to finals season. You do the math: the lab is exactly three months old.',
      'Results so far: one paper in progress, a few finished experiments, three pushed-back deadlines, and a number of late-night timestamps in your message history. Slower than planned, but better than the worst case. That’s probably just the normal pace of research: slower than you hoped, better than your nightmares, moving forward one day at a time.',
      'Sitting by the window, you suddenly feel like texting {studentName}.',
    ],
    prompt: 'What do you send?',
    options: {
      encourage: {
        text: '“Thanks for the hard work. Good semester.”',
        outcomes: [
          'You send: “Thanks for all your hard work. You did great this semester.” {studentName} replies not with words but with a screenshot of an experiment that finished that day, its logs a clean sheet of green. You suspect that isn’t entirely a coincidence.',
        ],
      },
      give_break: {
        text: 'A day off. We both need it',
        outcomes: [
          'You send: “No need to come in tomorrow.” {studentName} replies instantly: “Really?” Really. Sometimes it doesn’t take much to make a student happy.\n\nAs for you, you get a bubble tea that day and take a stroll around campus, getting reacquainted with the place. It turns out there’s a lot more university than the hallway outside your lab.',
        ],
      },
    },
  },

  independent_meeting: {
    title: 'Flying Solo',
    description: [
      'You count: three. The lab now has three enrolled students. Three backpacks, three sleep schedules, three different interpretations of “update on time.”',
      'You think back to that first Thursday: you and one student staring at each other across a conference table, until Prof. Brennan knocked and brought you both into the bigger room. Over the past year or so, you’ve gotten to know his students and his projects there, and watched how he words his comments on drafts: sometimes strict, sometimes precise, occasionally both.',
      'But with three, you can have a room of your own. You walk over to Prof. Brennan’s office and knock twice, softly.',
    ],
    prompt: 'How do you say goodbye?',
    options: {
      graceful_exit: {
        text: 'Thanks. We’re going solo next week',
        outcomes: [
          'Prof. Brennan looks at you, nods, and casually moves his group’s room booking an hour earlier. Back in your lab, you write “Group meeting: Friday afternoons” on the whiteboard, and three students look up. Something in the air has quietly shifted. Your lab has a rhythm of its own.',
        ],
      },
      confident_exit: {
        text: 'We’re big now. Bring it on',
        outcomes: [
          'Prof. Brennan freezes for a second, then laughs. “Say that again once you’ve got a top-tier paper.” Still, you’ve said what you came to say and thanked him properly. The next Friday afternoon, you sit down in your own meeting room for the first time. The whiteboard is new, the people are your own, and the group meeting is finally the meeting of an actual group.',
        ],
      },
    },
  },

  independent_meeting_4: {
    title: 'Four of Us Now',
    description: [
      'You count: four. The lab now has four enrolled students. Four backpacks, four sleep schedules, four different interpretations of “reply ASAP.”',
      'Sometimes you think three is just the right number: small enough that everyone gets attention, big enough to divide up the work. But with four, the meeting room starts to feel crowded, the whiteboard needs sections, and the speaking order at group meeting has to actually be planned.',
      'You post in the lab Slack: group meeting moves to the big conference room next Friday, come early to grab a seat.',
    ],
    prompt: 'A lab of four. What’s next?',
    options: {
      independent_meeting_4_structure: {
        text: 'Reassign roles. Make ownership clear',
        outcomes: [
          'You sketch a simple org chart on the whiteboard: who owns which project line, who pairs with whom, who is pushing which stage. For the first time, all four of them gather around the whiteboard to discuss it. Someone raises a concern, someone builds on it, someone starts taking notes. You realize something: this is probably the limit of what one person can manage. One more, and you’ll need an actual organization.',
        ],
      },
      independent_meeting_4_celebrate: {
        text: 'Celebrate first. A nice meal this afternoon',
        outcomes: [
          '“Four of us now. That calls for a celebration,” you say, and take them to the restaurant downstairs that everyone keeps saying they’ll try and never does. Over the meal you talk about a lot: projects, papers, and a few less official things too. On the way back, you notice the way everyone walks together. It looks a little like a lab.',
        ],
      },
    },
  },

  // ── Research chain: suspicious results ───────────────────────────────────

  suspicious_results: {
    title: 'These Numbers Look… Suspicious',
    description: [
      '{studentName} sends over results, and every metric is astonishingly good: a full 10 points above SOTA. Highlighted in bold red, followed by three exclamation marks.',
      'You stare at the numbers for three minutes. In your entire research career, you’ve never seen results this good. Usually, that means either a Nobel Prize or that something, somewhere, is off.',
    ],
    prompt: 'The results are absurdly good. You:',
    options: {
      double_check: {
        text: 'Have {studentName} check everything carefully',
        outcomes: [
          '{studentName} goes through it and finds the problem: test set leakage. The model had quietly seen data it was never supposed to see. After the fix, the real improvement is just 3 points. Still good, but the three exclamation marks have been retracted. An academic crisis quietly happened and was quietly defused.',
        ],
      },
      trust_results: {
        text: 'Trust the data. Start writing',
        outcomes: [
          'You and {studentName} excitedly spend two weeks writing the paper and submit it with total confidence. The reviews come back. Reviewer 2, point one: “Please describe the evaluation protocol and data splits in detail in the appendix.” You stare at that sentence for three seconds and go through a complete emotional arc, from “what does that mean” to “oh” to “oh no,” then forward the screenshot to {studentName}.',
        ],
      },
    },
  },

  investigation_result: {
    title: 'The Audit Is In',
    description: [
      '{studentName} has combed through all the code, module by module, and written a three-page audit report, formatted more neatly than most papers.',
      'Conclusion: there was a data processing issue, but the core method is sound. The results are real, just inflated. Like scoring an 85 and thinking it’s a 110 because you used the wrong total.',
    ],
    prompt: 'The audit is done. How do you wrap this up?',
    options: {
      write_clean: {
        text: 'Write it up honestly with the real numbers',
        outcomes: [
          'The final paper uses the real data. Every number is what it is, and not one of them has been prettied up. The reviewers write, “Thorough experimental design, credible results,” which is a better compliment than calling the results impressive. {studentName} texts, “Good thing we checked,” followed by a facepalm emoji, presumably still sweating over what almost happened.',
        ],
      },
      report_oversight: {
        text: 'Share it with the lab as a lesson',
        outcomes: [
          'At group meeting, you walk through the whole thing: what went wrong, why it wasn’t caught sooner, and how to prevent it next time. {studentName} looks a little uncomfortable, but once the questions start, {he} explains it more clearly than you did. Explained once, learned once, announced to the whole lab once: lesson thoroughly learned.',
        ],
      },
    },
  },

  // ── Research chain: conference sprint ────────────────────────────────────

  conference_ddl: {
    title: 'Three Days Until GRF',
    description: [
      '72 hours until the GRF deadline.',
      '{studentName} is staring at a progress bar. The experiments haven’t finished, the paper is half written, and {his} bloodshot eyes are running on pure caffeine.',
      'How you make the final push is up to you.',
    ],
    prompt: 'Final sprint. Your strategy?',
    options: {
      lead_charge: {
        text: 'Lead the charge yourself',
        outcomes: [
          'You and {studentName} work around the clock for three days and submit with ten minutes to spare. {studentName} sends a frantic string of emoji, then: “Let’s sprint together again next time, Professor.”',
          'Three days without sleep. The results aren’t great, but you manage to get it submitted. {studentName} sends, “Thanks for all your hard work, Professor,” but you can tell {he}’s exhausted too.',
        ],
      },
      delegate: {
        text: 'Let {studentName} run the sprint',
        outcomes: [
          '{studentName} doesn’t wait for you. {He} pulls an all-nighter to finish the experiments and polishes the abstract while {he}’s at it. The draft comes as a pleasant surprise: {studentName} did this paper almost entirely on {his} own.',
          '{studentName} says {he}’s on it, but forgets to run the final set of comparison experiments. The submission goes out in a rush, and the quality is questionable. You don’t criticize, but you make a mental note.',
        ],
      },
      postpone: {
        text: 'Skip this one. Submit next time',
        outcomes: [
          'You text {studentName} that you’re pulling out this time. Ten seconds later: “Okay, I’ll clean up the code then.” That’s not what you expected. You’d braced for a hard conversation. But {studentName} seems genuinely relieved, and “clean up the code” is probably a figure of speech here, meaning “finally get some sleep.”',
        ],
      },
    },
  },

  submission_result: {
    title: 'Decision Email',
    description: [
      'Months go by. Finally, the system email arrives.',
      'You hold your breath and click…',
    ],
    prompt: 'The decision is in. How do you handle it with {studentName}?',
    options: {
      celebrate_accept: {
        text: 'Celebrate if accepted, debrief if not',
        outcomes: [
          'Accepted! {studentName} immediately posts a screenshot online and sends you a string of fireworks emoji. You take {studentName} out for a nice dinner, and the two of you talk until late.',
          'Rejected. You organize the reviews and bring them to {studentName}. {studentName} reads them and says, “That’s okay. We’ll revise,” with a certain calm in {his} voice. You can’t help taking a second look, to make sure this isn’t a sign of having gone numb, but when your eyes meet, {he} is earnestly opening the document. Okay. Revise it is.',
        ],
      },
      analyze_reviews: {
        text: 'Whatever the result, go through it point by point',
        outcomes: [
          'You and {studentName} carefully read every reviewer comment. If accepted, you improve the paper; if rejected, you find a new direction. {studentName} says, “I never thought a reviewer would worry about that.” That’s the most valuable part.',
        ],
      },
    },
  },

  // ── Research chain: the big grant (lab-level, no bound student) ──────────

  grant_deadline: {
    title: 'Early-Career Grant Deadline',
    description: [
      'The national early-career grant proposal is due in a week. It’s a document that takes fifty thousand words to justify what you plan to do over the next three years, in a format nobody actually enjoys writing but everyone has to.',
      'You sit at your computer. The progress bar is still on chapter one. This is the national-level mission an assistant professor faces alone: no students who can help, no senior labmates to ask, just a deadline approaching at a rate of one second per second.',
    ],
    prompt: 'One week left. What’s the plan?',
    options: {
      write_hard: {
        text: 'Go all in and write it yourself',
        outcomes: [
          'Six days of late nights. You don’t remember how much coffee you drank. What you remember is the hollowed-out feeling of clicking “Submit” at 4 a.m. on the last day, like finishing a marathon with no one watching. The proposal is decent. You’re out of energy, but at least it’s in.',
          'Seven days of writing, and the more you write, the messier it gets. Chapter three overturns the premise of chapter one, and chapter four cites a paper you haven’t finished reading. You force it through in the early hours, but even you know the logic doesn’t hold together. Next time you’ll definitely start two months early. You’ve been saying that for three years.',
        ],
      },
      hire_help: {
        text: 'Hire a professional to polish it',
        outcomes: [
          'You find a grant-writing consultant with years of experience. On receiving your draft, the consultant pauses for about three seconds, a pause containing a professional’s complete assessment of your first draft, then replies: “I’ll take it from here.” Five days later, a clearly structured, properly worded, perfectly formatted proposal lands in your inbox. You saved about forty hours and spent $30K. Feels like a fair trade.',
        ],
      },
      skip_this_year: {
        text: 'Skip it this year',
        outcomes: [
          'You close the proposal and let out a long breath. A colleague asks whether you’re applying for the early-career grant this year. “Sitting this one out,” you say. The colleague nods: “Sometimes that’s for the best.” You put the energy you saved into experiments and, for the first time, don’t feel anxious before a deadline.',
        ],
      },
    },
  },

  grant_result: {
    title: 'Early-Career Grant Results',
    description: [
      'There’s an unread notification on the grants portal. When you see the red dot, you pause for about three seconds before opening it.',
      'It’s the kind of notice you spent months preparing for and waited almost a year to receive, and now you have to absorb it in two seconds. Sometimes the beauty of the system lies in exactly this contrast in information density.',
    ],
    prompt: 'The results are out. Now what?',
    options: {
      share_result: {
        text: 'Share the result with the lab',
        outcomes: [
          'Funded. $240K, officially awarded. You post the news in the lab Slack. The first reply is a “!!!”, followed by a stream of celebrations. With money in hand, the pressure drops a whole level, and the lab is noticeably more relaxed for the next two weeks.',
          'Not funded. At group meeting, you say, “The grant didn’t come through this time. We’ll try again next year,” and move straight on to the next item. Someone quietly flips the pen in their hand around, then everyone looks back up at the slides, all very naturally. The advisor isn’t falling apart. That’s the signal. We keep going.',
        ],
      },
      plan_next: {
        text: 'Quietly plan the next step',
        outcomes: [
          'You file the result away and open a new document titled “Next Year’s Grant Plan.” If it was funded, you plan how to put the money to good use; if not, you figure out where the proposal wasn’t convincing enough. Research is a long investment with no guaranteed return, and by now you’re used to the rhythm.',
        ],
      },
    },
  },

  // ── Timed: first submission (Y1 Dec) and Reviewer 2 (Y2 Feb) ─────────────

  first_paper_submission: {
    title: 'Final Submit',
    description: [
      'Forty minutes until the OWRC deadline. Paper uploaded, format check passed, author list confirmed, ethics statement checked, conflicts of interest: “None.” All that’s left on the screen is one orange button: “Final Submit.”',
      '{studentName} sits beside you, staring at the button like it’s an explosive device about to go off.',
      '“Professor, do you think we’ll get in?”\n\nYou think for three seconds. OWRC is famously mysterious. Its official description is a single line, “Innovative work across fields is welcome,” and nobody can say what it actually accepts, yet every year someone gets in. It’s like a raffle, except writing a paper takes a full six months longer than buying a ticket.',
      '“In theory, anyone can get in,” you say.',
      '{studentName} nods seriously, pauses for two seconds, then adds: “So in theory, we could also not get in.”\n\nThe logic is airtight. You can’t find an angle to argue with it.',
    ],
    prompt: 'Your cursor hovers over “Final Submit”',
    options: {
      submit_clean: {
        text: 'Close your eyes and click. No looking back',
        outcomes: [
          'Click. A confirmation dialog pops up, and you click again. “Your manuscript has been successfully submitted to OWRC.” The screen stays lit. Nothing will change right away, but at this moment the paper is flying toward some server, carrying six months of your work, along with the power of a reviewer you’ve never met to decide its fate.',
        ],
      },
      final_check: {
        text: 'One last read-through',
        outcomes: [
          'You spend half an hour reading the whole paper. You find a missing citation and a few spots of inconsistent notation, and fix them. The final version goes in two minutes before the deadline. The OWRC servers are probably processing a few hundred submissions right now. One of them is yours, tucked quietly between a pile of submissions that have “solved AGI alignment,” awaiting its fate.\n\n{studentName} says, “Professor, did you actually check it, or did you just go through the motions?” You answer {him} with a calm, steady look.',
        ],
      },
      submit_celebrate: {
        text: 'Submit, then go out for a good meal',
        outcomes: [
          'You click, then stand up and grab your coat. “Come on. Let’s eat.” {studentName} grabs {his} phone and follows, and by the door the “am I supposed to be happy right now?” look on {his} face finally turns into a real smile. You go to a Sichuan place nearby and order clearly more food than two people can eat.\n\nHalfway through, {studentName} says, “Professor, if we get in, let’s come back here again.” You say yes. An academic manifesto, with two dinners riding on it.',
        ],
      },
    },
  },

  reviewer_two: {
    title: 'Enter Reviewer 2',
    description: [
      'Two months later, the OWRC reviews arrive.',
      'Reviewer 1 is positive, friendly in tone, and recommends minor revisions. Reviewer 3 is neutral, suggests three optional directions for revision, and sounds like someone who isn’t fully awake yet, but means no harm.',
      'Then there’s Reviewer 2. A full page. Point one: “The core assumption of this paper is fundamentally flawed, and the authors appear to be entirely unaware of recent work in the field.”',
      'You check the author list again to confirm your name is on it.',
    ],
    prompt: 'Under fire from Reviewer 2, you:',
    options: {
      rebuttal_gracious: {
        text: 'Grovel at light speed, reply point by point',
        outcomes: [
          'You write a rebuttal so polite it borders on groveling, carefully answering every comment, patiently clearing up every misunderstanding, and even thanking the reviewer for their “valuable feedback.” Reviewer 2 eventually writes, “The authors’ response addresses most of my concerns,” and gives a weak accept. You and {studentName} trade a well-practiced celebration emoji in the chat, then get back to revising.',
          'You write a rebuttal: point by point, well-reasoned, sincere. Reviewer 2 doesn’t even read it, keeps the original score, and rejects. Academia has a widely accepted explanation for this: “bad luck.” Revise it and try another venue. New conference, new luck.',
        ],
      },
      rebuttal_strong: {
        text: 'Hit back. Point out the misunderstanding',
        outcomes: [
          'You cite six papers and lay out, in two clear and well-organized pages, exactly why the reviewer’s reading is wrong. Silence from the other side. They probably went and checked the literature and realized they’d misread it. The paper gets in. Someone in the lab says you’re “really good in a fight.” You don’t deny it.',
          'Your rebuttal comes off a little too firm. Reviewer 2 takes it as a “provocation” and promptly adds three new comments, each nastier than the last, like the continuation of a personal feud. The paper is rejected. {studentName} texts you: “Professor, did we just make an enemy?”',
        ],
      },
      ignore_and_resubmit: {
        text: 'Don’t fight it. Revise and submit elsewhere',
        outcomes: [
          'You decide not to waste emotional resources on this person. You take the useful comments and file the rest in a folder on your hard drive called “Reviewer Issues,” which already has seven subfolders. Revise it, new venue, new mood, new luck.',
        ],
      },
    },
  },

  // ── Timed: Year 2, August ────────────────────────────────────────────────

  lab_birthday: {
    title: 'The Lab Turns One',
    description: [
      'When you unlock the lab in the morning, there’s a new line in the corner of the whiteboard: “Happy first birthday, lab.” The writing is small, and next to it is a lopsided little cake. No streamers, no balloons, no big group photo. The lab is still just you and {studentName}, after all.',
      'You stand in the doorway for a moment before it sinks in: it really has been a year. Last August, this was a few still-boxed desks, a blank whiteboard, and an office that looked like a temporary storage room. Now the desks hold paper drafts, project plans, unwashed mugs, crooked sticky notes, and assorted evidence of {studentName}’s day-to-day existence.',
      '{studentName} came in earlier than usual today and is pretending to focus on {his} screen, but you’ve noticed {him} glance at the whiteboard three times already. You ask if {he} wrote something. {studentName} immediately looks away. “Nope. Maybe the whiteboard grew it on its own.”',
      'Around noon, you dig up a photo from the lab’s first day. The room in it is absurdly empty, the whiteboard as clean as if it had never met Reviewer 2. {studentName} studies it for a long time, then says, “We actually filled this place up this year.”',
      'There are still only two people in the room, but somehow it doesn’t look as empty as it did at the start.',
    ],
    prompt: 'For the lab’s first birthday, you:',
    options: {
      party: {
        text: 'Go out to eat. My treat',
        outcomes: [
          'You find a little place and order clearly more food than two people can eat. {studentName} insists at first that you’ll never finish it, then eats with great dedication. When the talk turns to the most ridiculous moments of the year, you each nominate three, and in the end you agree unanimously: making it this far is worth celebrating in itself.',
        ],
      },
      milestone_review: {
        text: 'Look back on the year and set goals',
        outcomes: [
          'Standing at the whiteboard, you write down everything you did this year. At first there are only a few items, but the list keeps growing until even failed projects and absurd accidents make it on. Looking at the full whiteboard, {studentName} says, “Huh. We actually did a lot.” Next to it, you draw another circle and write: Year Two.',
        ],
      },
      keep_working: {
        text: 'Business as usual',
        outcomes: [
          'You decide to keep working. The lab is quiet all afternoon, just keyboards and the air conditioner. As you’re about to leave, you notice a new line next to the little cake: “The lab turned one, but our advisor seems busy.” Below it is a tiny sighing face.',
        ],
      },
    },
  },

  // ── Timed: Year 4, October, mid-tenure review sequence ───────────────────

  midterm_review_open: {
    title: 'Mid-Tenure Review',
    description: [
      'October, Year 4. When the email from the department chair arrives, your stomach drops a little. The subject line is short: Mid-Tenure Review.',
      'You always knew this day would come, but once you’re actually standing outside his office, you can’t help replaying what exactly you’ve done for the past three years. It’s a question that’s fine as long as you don’t think about it. Once you do, it gets very specific.',
      'The chair sees you and waves you in. “Come in. Don’t be nervous.” He glances at the materials on his desk and adds, “Of course, I know saying that rarely helps.”',
    ],
    prompt: 'You sit down and wait for him to begin.',
    options: {
      listen: {
        text: 'Okay. I’m listening',
        outcomes: [
          'You sit, rest your hands on your knees, and try to arrange your face into an expression suitable for a mid-tenure review.',
        ],
      },
    },
  },

  midterm_review_no_projects: {
    title: 'Mid-Tenure Review: Projects',
    description: [
      'The chair flips through a couple of pages and taps his pen on the paper. “Let me start with the most obvious thing: you haven’t completed a single research project yet.”',
      '“I’m not saying you haven’t been working.” He looks up at you. “I can tell you have plenty of ideas, and you’ve done a lot of groundwork. But in research, preparing for too long turns into another kind of procrastination. Projects have to get moving first. Reputation, funding, papers, they all grow out of things you’ve actually finished.”',
      '💡 Tip: Tap “Projects” in the top-right corner to see your unlocked Ideas, launch a project, and assign a lead to push it forward.',
    ],
    options: {
      acknowledge: {
        text: 'I’ll get on it right away',
        outcomes: [
          '“Good.” The chair turns the page, as if giving you room to save face, and a deadline along with it.',
        ],
      },
    },
  },

  midterm_review_few_projects: {
    title: 'Mid-Tenure Review: Projects',
    description: [
      '“On projects, you’ve got some things done. That’s good.” The chair circles a few entries with his pen. “But this isn’t the time to ease off.”',
      '“In the early years, the danger isn’t being slow. It’s stopping. Once a direction stalls, the students drift off, the code goes cold, and warming it back up is harder than you’d think. When an idea comes, grab it. When you can launch a project, push it forward. Don’t let the lab slip into that state where everyone’s busy and nobody knows with what.”',
    ],
    options: {
      acknowledge: {
        text: 'Understood. Keep the momentum',
        outcomes: [
          '“Right. Momentum matters.” The chair scribbles a few words in the margin. The handwriting is a mess, but at least it doesn’t look like anything bad.',
        ],
      },
    },
  },

  midterm_review_low_students: {
    title: 'Mid-Tenure Review: Team',
    description: [
      'The chair turns to the page on students, and one eyebrow twitches. “I need to flag this. Your lab is on the small side.”',
      '“The tenure committee isn’t going to pretend students don’t exist just because you’re very capable on your own,” he says. “PhD students only have to feed themselves. Professors are different. A professor has to feed a whole group of PhD students, and convince them they weren’t produced by a random number generator.”',
      '“Recruiting, mentoring, getting results out the door, those are all metrics. Without a team, steady output has a hard time staying steady.”',
    ],
    options: {
      acknowledge: {
        text: 'I’ll make recruiting a priority',
        outcomes: [
          '“Mm.” The chair slides the student roster back into the pile. “Shore that up in the second half.”',
        ],
      },
    },
  },

  midterm_review_low_rep: {
    title: 'Mid-Tenure Review: Impact',
    description: [
      '“On impact, you need to get yourself out there more,” the chair says, looking at you earnestly.',
      '“Your name came up in a meeting the other day. The good news is, people’s impression of you isn’t bad. The bad news is, a few of them couldn’t place who you were right away.”',
      'He laughs a little at that himself, then softens his tone. “Don’t worry, plenty of people go through this. But over the next three years, you need more people to remember your name. The college expects more from you than quietly getting the work done.”',
    ],
    options: {
      acknowledge: {
        text: 'Understood',
        outcomes: [
          'You write down what the chair said. Written down, it stings a little more than it did out loud.',
        ],
      },
    },
  },

  midterm_review_low_funding: {
    title: 'Mid-Tenure Review: Funding',
    description: [
      'He turns to the funding page and taps a finger next to the number. “This isn’t in the danger zone yet, but it’s worth a second look.”',
      '“Passion doesn’t pay the lab’s electric bill,” he says. “Wrapping up projects, follow-up collaborations, a steady funding pipeline. It all sounds very administrative, but in the end it comes down to one very plain question: can your students keep working next month without worrying?”',
      '“So pushing projects forward isn’t just about academic reputation. It’s also about keeping the lab’s money flowing.”',
    ],
    options: {
      acknowledge: {
        text: 'Noted',
        outcomes: [
          'You nod. Funding is usually background noise that threatens your academic purity. Today, it has suddenly become the main theme.',
        ],
      },
    },
  },

  midterm_review_low_energy: {
    title: 'Mid-Tenure Review: Wellbeing',
    description: [
      'Leafing through the materials, the chair suddenly looks up at you.',
      '“You’ve been pretty tired lately, haven’t you? Not quite yourself?”',
      'Before you can answer, he waves a hand. “I can see it on your face.”',
      '“Don’t run yourself into the ground. Tenure matters, but getting tenure alive matters more. You’ve got three more years. Don’t wear yourself out before then.”',
    ],
    options: {
      acknowledge: {
        text: 'I’ll take better care of myself',
        outcomes: [
          'You agree very quickly. How long that lasts is another question.',
        ],
      },
    },
  },

  midterm_review_positive: {
    title: 'Mid-Tenure Review: Overall',
    description: [
      'The chair flips to the last page, looking a bit more relaxed than when you walked in. “Honestly, I came prepared with quite a lot to say.”',
      '“Turns out I don’t need much of it.” He smiles. “You’ve got projects, you’ve got students, and funding hasn’t been a real problem. Solid.”',
      'You find that one word, “solid,” is more of a relief than a long string of praise.',
      '“But the second half is where people really pull ahead.” He sets down his pen. “Now you have to decide where to concentrate resources, which directions to drop first, and who to collaborate with seriously. A head start from the first three years won’t carry itself to the finish line. You have to push it.”',
    ],
    options: {
      acknowledge: {
        text: 'I’ll think it through',
        outcomes: [
          '“I know,” he says. “You’ve got the foundation now. Don’t waste your talent.”',
        ],
      },
    },
  },

  midterm_review_close: {
    title: 'Mid-Tenure Review: Wrap-Up',
    description: [
      'The chair closes the folder. “All right, that’s it for today.” He pushes his chair back and looks at you once more. “Three more years.”',
      'When you step out of his office, the hallway looks the same as always. Same emails in your inbox, same projects, same students.',
      'But one thing has suddenly become very concrete: tenure isn’t some distant abstraction anymore. It’s three years away.',
    ],
    options: {
      go_back_to_work: {
        text: 'Back to work',
        outcomes: [
          'You go back to the lab, sit down, and open your laptop. When the screen lights up, you don’t open your email right away. Instead you pull up your to-do list and go over it again, starting from the first line.',
        ],
      },
    },
  },

};
