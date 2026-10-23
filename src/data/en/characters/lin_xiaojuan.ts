import type { CharacterPack } from '../../../types/i18n';

// English character pack for 林小卷 (Jamie Lin): profile card, personal events,
// half/max-favor events and the New Year gift reaction. Text only; see LOCALIZATION_GUIDE.md.
export const linXiaojuanEn: CharacterPack = {
  profile: {
    name: 'Jamie Lin',
    pronoun: 'he',
    tagline: 'Seldom seen. Deadlines unlock his final form.',
    bio: 'Lives in a near-permanent state of “concerning project progress.” Slow to reply, slow to run experiments, in no particular hurry even when walking. Only when a deadline closes in does he enter some unknown form: no sleep for days, a month of work compressed into 48 hours.',
    farewell: 'Most of the time, not even I believed I’d make the deadline.\n\nHaving an advisor who did, though. That was pretty great.',
  },
  events: {

    lxj_first_meeting: {
      title: 'The Star Arrives, Fashionably Late',
      description: [
        'Your first meeting is set for 3 p.m. Jamie Lin shows up a full fifteen minutes late. You’re sitting in your office, just starting to think about texting him, when the door swings open. He has a bubble tea in one hand and the straw in his mouth, looking as relaxed as a spring breeze, clearly living in another time zone.',
        'He sets the bubble tea on your desk, pulls out a chair and sits down with a composure that made it impossible to be mad at him. Then, in the tone people use to talk about the weather: “Hi Professor, I’m Jamie Lin, the new guy. Looking forward to working with you.” He pauses and nudges the cup toward you. “This place is really good. Want a sip?”',
        'Holding your own coffee mug, looking at his flawless smile, you find yourself pondering one of life’s great questions: does this kid even have a concept of social anxiety?',
      ],
      prompt: 'How do you handle the new guy?',
      options: {
        lxj_first_meeting_strict: {
          text: 'Announce that the culture of lateness ends here',
          outcomes: [
            'You clear your throat and formally bring up the lateness. Jamie’s smile vanishes at once and he nods with extreme sincerity. “You’re right, Professor. Next time, for sure.” It comes out as smoothly as a memorized script.\n\nAfter the meeting, he comes back to ask whether the group has any recommended bubble tea places. Watching him earnestly type the names into his phone, you realize your little speech probably only made it as far as the outer edge of his ears.',
          ],
        },
        lxj_first_meeting_easy: {
          text: 'Let it go. Results matter more than attendance',
          outcomes: [
            'You wave at him to settle in and keep going. Jamie immediately pushes the bubble tea aside and opens a notebook. You glance over: the cover is crammed with ideas, the handwriting a mess but the sheer quantity startling, every line reading like a sudden 2 a.m. revelation.\n\nSo he does think. His thinking just keeps happening at the wrong hours.',
          ],
        },
      },
    },

    lxj_progress_check: {
      title: '“Almost There”: Progress in a Quantum State',
      description: [
        'This is the third time you’ve asked Jamie how things are going. Every time, same tone, same calm face: “Almost there, almost there. Just the last step.” That “last step” sounds within reach, but like the horizon, it’s always a little farther away than you thought.',
        'He has been saying this for two full months. You quietly open your calendar, do some not very encouraging math, then close the calendar and decide what you don’t see can’t hurt you. Meanwhile his “last step” rests serenely in quantum superposition, both done and not done, until someone observes it.',
      ],
      prompt: 'Jamie’s progress is Schrödinger’s. You:',
      options: {
        lxj_progress_check_push: {
          text: 'Go nuclear: daily updates, down to the hour',
          outcomes: [
            'You ask him to write out a detailed timeline on the spot. Jamie picks up a pen, writes three lines, contemplates the ceiling for a while, adds two more, then slides the paper over. Milestones down to the hour, subtasks broken out in exhaustive detail.\n\nYou stare at it for a second. This plan wasn’t written just now. He’s had it all along. He just had no intention of volunteering it.',
          ],
        },
        lxj_progress_check_wait: {
          text: 'Kick back and wait for a miracle',
          outcomes: [
            'You sigh and decide to give it a little more time. Sensing the questions have stopped, Jamie relaxes instantly, opens his notebook and starts scribbling. You lean in for a look: it’s a brand-new idea with nothing to do with the project. Then again, on closer inspection, the new idea overlaps with the project by about thirty percent.\n\nMaybe this is what people mean by spiraling in on a solution.',
          ],
        },
      },
    },

    lxj_ddl_miracle: {
      title: 'Ten Minutes to Deadline, a Legend Descends',
      description: [
        'Forty-eight hours before the deadline, Jamie evaporated. Messages: read, no reply. Emails: read, no reply. His desk sat empty and untouched like a museum exhibit, and even the owner of his favorite bubble tea shop said he hadn’t been in for two days. At one point you seriously considered calling the police.',
        'Exactly ten minutes before submission closes, your phone buzzes. A link to a zip file, followed by one line: “Prof, sent it over. Could you check if the formatting looks right?” Hands shaking, you open it. Complete code, clear comments, results even better than expected, documentation with figures, and not a single reference out of format.',
        'Where he did all this, how much caffeine it took, whether he slept at all: you plan to ask later. Right now you just need to take a deep breath and hit submit.',
      ],
      prompt: 'Once again, Jamie has spread his wings at the very edge of the cliff. You:',
      options: {
        lxj_ddl_miracle_admire: {
          text: 'Award him a Deadline God medal',
          outcomes: [
            'You text him: “Really good work this time.” A while later, a reply: a thumbs-up, then “thanks prof, going to sleep.” He vanishes completely for the next two days. According to his roommate, he slept for a very long time and broke the lab record, which had also been set by him.\n\nA legend surpassing a legend. The loop closes perfectly.',
          ],
        },
        lxj_ddl_miracle_criticize: {
          text: 'Time for a serious talk about life',
          outcomes: [
            'You set up a meeting and spend a solid fifteen minutes on research pacing and sustainable work habits. Jamie nods the entire time, looking so sincere it’s almost heartbreaking. When you finish, he says, “You’re absolutely right, Professor. I’ll really reflect on this.” Then he asks when the next deadline is, saves it in his phone, and you can see on his face that he’s already planning the next sprint.\n\nWatching him walk out the door, you realize this may simply be a wall you can’t knock down.',
          ],
        },
      },
    },

    lxj_midnight_message: {
      title: 'A Stroke of Genius at 2 A.M.',
      description: [
        'At 2 a.m., your phone lights up. Jamie. Assuming it’s an emergency, you open it: an eight-hundred-word message detonates across the screen like a grenade full of words. It isn’t a cry for help. It’s an epiphany.',
        'In logic so chaotic it borders on art, he describes a sudden insight about a research problem. Three times along the way he writes “wait let me start over.” At the end there’s a photo of a hand-drawn sketch: arrows, circles, one lopsided triangle, and a scrawled note beside it reading “something like this.”',
        'The reasoning is like a ball of yarn someone tried to stir-fry, but by the end you find two or three genuinely valuable ideas buried in it, ideas that would hold up perfectly well in daylight. Sorted out properly, this could turn into something.',
      ],
      prompt: 'Jamie’s 2 a.m. idea barrage. You:',
      options: {
        lxj_midnight_message_respond: {
          text: 'Call an emergency 2 a.m. seminar',
          outcomes: [
            'You put down your phone, open your laptop and carefully work through his tangle of thoughts. The core concept really is valuable. The two of you message back and forth until almost dawn, slowly combing the chaos into a single thread with a visible direction.\n\nThe next day Jamie shows up with dark circles the size of coins. “Prof, you didn’t sleep either?” You look at each other, then reach for the coffee machine button at the same time.',
          ],
        },
        lxj_midnight_message_later: {
          text: 'Read. Sleeping. Talk tomorrow',
          outcomes: [
            'You reply: “Let’s talk tomorrow.” The next day Jamie turns up as promised and walks you through the idea again. The daytime version is more than twice as clear; he obviously reworked it himself after waking up.\n\nSome ideas are like dough. They need to rest overnight in the dark before they rise into something you can bake.',
          ],
        },
      },
    },

    lxj_conference_abstract: {
      title: 'Due at 5:00, Submitted at 4:58',
      description: [
        'The conference abstract is due today at 5 p.m. At 11 a.m., Jamie is in group meeting, earnestly discussing someone else’s experimental design with no apparent awareness of the deadline, as if he lives in his own private time zone three hours behind the rest of the world.',
        'At 4:30 p.m. he casually announces, “Prof, I’m gonna go write the abstract,” and disappears. You refresh your email a few times. Silence, like the middle of the night. You quietly start working out an emergency contact plan.',
        'At 4:58, the abstract lands in your inbox, right on time. You read it: tight, forceful prose, the core question nailed in one stroke, and the highlights paragraph even has a slightly literary quality, as if someone had polished it for a week. The reviewers’ comment: “Clearly written, with a novel premise.” This, from something written in under half an hour.',
      ],
      prompt: 'Jamie has pulled off another textbook deadline sprint. You:',
      options: {
        lxj_abstract_praise: {
          text: 'Fine, I eat my words. Praise him!',
          outcomes: [
            'You text him: “Really well written, and the reviewers liked it too.” Jamie replies with a sticker of a cat drinking bubble tea, followed by: “thanks prof, I thought it came out pretty good too.”\n\nThat unvarnished confidence leaves you briefly speechless. But the abstract really was good, and you have to admit it to yourself. Between this person and “modesty” lies roughly an entire galaxy.',
          ],
        },
        lxj_abstract_warn: {
          text: 'Good result ≠ good method. Make that clear',
          outcomes: [
            'You tell him seriously that he got lucky this time, and ask what happens if it goes wrong next time. Jamie listens, thinks it over, and says: “Then next time I’ll start half an hour earlier.”\n\nYou take a deep breath, let it out slowly, and decide to look at life from a different angle. At least the abstract really was good, and no amount of methodology can take that fact back now.',
          ],
        },
      },
    },

    lxj_fake_progress: {
      title: 'Progress Report, Padded by 25 Points',
      description: [
        'In his monthly update, Jamie announces that the project is 70% done. He says it with total confidence, and the slides are nicely illustrated, with a genuinely pleasant color scheme. As you listen, you notice that several key experiments are shown only as screenshots of results. The methods have evaporated entirely.',
        'After the meeting you open his repo. The last commit was three weeks ago. Three function bodies in the experiment script all read `pass`, and a comment called `TODO_FIXME_URGENT` has survived two whole months, unmoved by wind or rain.',
        'You look down at the progress sheet you just signed: 70%. Then at the code: closer to 40%. Between those two numbers lies exactly one Jamie Lin–sized optimistic estimate.',
      ],
      prompt: 'The progress has been padded. You:',
      options: {
        lxj_fake_progress_ignore: {
          text: 'Just send him the repo link',
          outcomes: [
            'You say nothing. You just send him the repo link with a note: “take a look when you get a chance.” Jamie goes quiet for a while. Then a new commit appears: two of the `pass` lines filled in, and `TODO_FIXME_URGENT` quietly renamed to `TODO_IN_PROGRESS`.\n\nTiny progress, but at least it actually happened.',
          ],
        },
        lxj_fake_progress_confront: {
          text: 'Ask point-blank: what’s with the three passes?',
          outcomes: [
            'You send him a screenshot of the code and ask, “What’s going on with these three pass statements?” After a long silence, Jamie writes back: “Prof, realistically… more like 45?” A wry-smile emoji, then: “I’ll get two of them done this week. Give me a week.” A week later, two commits show up and the number on the progress sheet gets updated. This time it’s real.\n\nPeople often run faster right after they’ve been caught than they ever do normally.',
          ],
        },
      },
    },

    lxj_lost_in_lab: {
      title: 'Late Night, One Person, One Cold Coffee',
      description: [
        'You come back to the lab late at night to grab a file, assuming everyone’s gone. You push open the door and there’s Jamie at his desk. Not coding, not reading papers, just staring at a half-written function, the cursor blinking alone as if waiting for orders.',
        'He hears you and turns around, looks at you for a second, then says, in the tone you’d use to greet someone you know: “Oh, you’re still here too, Prof?” No embarrassment, no panic. Just a bit of a faraway look he hasn’t quite pulled back yet.',
        'The coffee on his desk has gone cold. Next to it is a sheet of paper with a few lines written on it, half covered by his arm. You don’t ask about it, but you notice.',
      ],
      prompt: 'Late at night, you’ve found Jamie lost in thought. You:',
      options: {
        lxj_lost_chat: {
          text: 'Pull up a chair and just talk',
          outcomes: [
            'You pull up a chair. You don’t ask anything, you just say, “How’ve things been?” Jamie is quiet for a moment, then starts talking, for quite a while: from where the project got stuck, to his doubts about himself, to an idea he’s never told anyone. When he’s done, he lets out a breath, flips the sheet of paper over and slides it to you. It says: Am I actually cut out for research?\n\nYou keep talking for a good while longer. When you leave, the cold coffee is gone, replaced by a hot one.',
          ],
        },
        lxj_lost_rest: {
          text: 'Go home and sleep. See you tomorrow',
          outcomes: [
            'You tell him to head home for tonight; you can talk tomorrow. Jamie nods, folds the sheet of paper into his pocket, and starts packing his bag. At the door he stops and looks back. “Thanks, Professor.”\n\nHe doesn’t say what for. Sometimes you don’t need to. When the timing is right, one line is enough.',
          ],
        },
      },
    },

    lxj_sudden_expert: {
      title: 'Wait, There’s a Big Hole Here',
      description: [
        'Jamie knocks and comes in. “Professor, I found a problem.” His voice is a full octave higher than usual. You gesture for him to sit. He doesn’t. He walks to the whiteboard, picks up a marker, and starts writing.',
        'He points out a crack in the theoretical framework the group has been using all along: under a certain boundary condition, the core assumption quietly breaks, and every existing experiment happens to steer clear of that boundary, which is why no one has ever noticed. He talks for a good while, each step locking into the next. You cut in with two questions along the way. He answers both without missing a beat.',
        'You realize he’s right. This hole could undercut the core conclusions of several papers in the field, or it could be the entrance to an entirely new direction. The writing on the whiteboard sits there quietly, waiting for your decision.',
      ],
      prompt: 'Jamie has blown a hole in the theory. You:',
      options: {
        lxj_expert_publish: {
          text: 'Go for it! Start writing the paper today',
          outcomes: [
            'You start organizing it that same day and turn the hole into an analysis paper. For the first time, Jamie is writing as the person whose idea it is, and once he starts he can’t stop. It goes more smoothly than even he expected. After submission, there’s one line in the reviews that he screenshots and sends to you: “This is a very sharp observation.”\n\nThe screenshot comes with a message: “prof look”',
          ],
        },
        lxj_expert_verify: {
          text: 'Build counterexamples first and nail the hole down',
          outcomes: [
            'You have him start by running a set of purpose-built test cases to pin down exactly when the boundary fails. Jamie spends a few days constructing a batch of counterexamples. The hole is not only confirmed, it turns out to be more general than he first described, covering many more cases. That upgrades the paper from “we found a problem” to “we proved the problem and point toward a fix,” easily an order of magnitude more weight.\n\n“Prof, this is bigger than I thought,” he says excitedly, and the whiteboard gains another ring of writing.',
          ],
        },
      },
    },

    lxj_graduation_panic: {
      title: 'Thesis? I Have a Plan',
      description: [
        'With exactly one month left before the thesis is due, you call Jamie in and ask him straight out how far along it is. He answers: “Just getting started.” You blink, making sure you heard that right.',
        'He goes on: “But Professor, I have a plan.” He turns his phone around: a screenshot of a note titled “One-Month Thesis Sprint Plan.” Four phases, each with subtasks, color-coded, down to “collect materials for printing and binding.” It looks as rigorous as a military operation.',
        'Then you notice the note’s creation time. This afternoon, less than an hour ago. The moment he heard you wanted to meet, he ran off and wrote this plan.',
      ],
      prompt: 'One month until the thesis is due, and a plan cobbled together at the last minute. You:',
      options: {
        lxj_grad_trust: {
          text: 'Take the gamble. Go with his plan',
          outcomes: [
            'You pat him on the shoulder. “Okay. Follow the plan, and show me progress once a week.” For the next month he shows up every week on schedule, each time with more chapters than you expected and quality that holds up. The last few days are all-nighters, but the thesis goes in on time, and quite a few pages over the required length.\n\nThe committee calls it “solid work.” When Jamie comes back to tell you, his expression is highly controlled, but his feet do a quick little dance step on the floor that he thinks you didn’t see.',
          ],
        },
        lxj_grad_intervene: {
          text: 'No. Daily reports, mandatory',
          outcomes: [
            'You require a progress report every day at 5 p.m., at least three hundred words. For the first three days he sends proper written reports. On day four he sends a voice memo. On day five, a photo of a whiteboard. The content is real; the format is freestyle.\n\nUnder pressure he does write faster. By the end, though, the daily report has turned into him knocking on your door every day on his own, which is more of a hassle than a written report but surprisingly efficient.',
          ],
        },
      },
    },

    lxj_procrastination_log: {
      title: 'Filed Between the Lab Notes',
      description: [
        'At the weekly meeting, you’re flipping through Jamie’s project notebook to check his progress when you come across a chart tucked between the experiment logs. The x-axis is “hours remaining until deadline,” the y-axis is “commit frequency.” The curve shoots straight up at the 24-hour mark, followed by a nearly vertical spike. You look up at him.',
        '“Tracked it for three months,” he says, in the tone of someone presenting another person’s experiment. “I am a nonlinear productivity system that is highly sensitive to deadline pressure.”',
        'You want to ask when exactly he made this chart. Then you conclude that whatever the answer is, it will make you feel terrible, and decide not to.',
      ],
      prompt: 'Jamie has been studying his own procrastination. You:',
      options: {
        lxj_procrastination_log_mock: {
          text: 'So what’s the conclusion? Keep slacking off?',
          outcomes: [
            'You say, “So the conclusion is that you’ve found a good excuse.” Jamie doesn’t argue. He just zooms in on the chart. “Prof, look at this peak. In the literature it’s called—” You cut him off: “Too late.”\n\nHe freezes for a second, then bursts out laughing, slips his phone back into his pocket, and adds: “Prof, if you want me to turn this into a real project, I totally could.”',
          ],
        },
        lxj_procrastination_log_research: {
          text: 'Nice data. Ever thought of turning it into research?',
          outcomes: [
            'You say, “Have you ever thought about turning this into research?” Jamie goes quiet for a moment, then starts listing: N=1, methodological problems, the experimenter and the subject are the same person so there’s confounding… He talks faster and faster. It doesn’t sound like he’s complaining about obstacles; it sounds like he’s been over this many times already. When he stops, he thinks for a bit and says, “If I model the self-observation itself as a variable, I could probably get around part of that.”\n\nYou don’t say anything. He starts looking around for a pen.',
          ],
        },
      },
    },

    lxj_blame_chain: {
      title: 'Whose Bug Is This?',
      description: [
        'On code review day, a very deep bug turns up. Jamie studies it for five minutes, digs into the commit history, and says, “The original error is in this function, written two months ago.” He looks at the author. One second of silence. “It’s me.”',
        'Then he keeps scrolling back. “But I was following the existing logic.” More scrolling. “And that logic looks like a pattern from one of our older labmates. He’s graduated now.” More scrolling. “And that pattern originally came from a 2019 paper. Seventeen follow-ups, and nobody caught the problem.”',
        'You are now facing a chain of responsibility spanning three years, two generations of students and one top-venue paper, like standing at the edge of a cliff looking down. Jamie is quiet for a while, then says, “The buck stops nowhere.” Then he goes to get a bubble tea.',
      ],
      prompt: 'You’ve traced it to the source. You:',
      options: {
        lxj_blame_chain_fix: {
          text: 'Fix the bug first. Stop digging',
          outcomes: [
            'You tell him to stop digging and fix the bug first. Two hours later Jamie has a clean patch. The commit message reads: “Fix edge-case issue that may arise under certain conditions (origin untraceable, unconfirmed, recommend future investigation).”\n\nIt is the most academic line he has written all year.',
          ],
        },
        lxj_blame_chain_document: {
          text: 'Document how it propagated',
          outcomes: [
            'You say, “Wait. Map out this chain. The propagation path itself is interesting.” Jamie perks right up. Twenty minutes later he sends you a directed graph: nodes are people, edges are “who inherited whose code,” and at the very end sits the 2019 paper.\n\nThe graph is beautifully drawn. The bug itself ends up as the minor detail.',
          ],
        },
      },
    },

    lxj_alumni_visit: {
      title: 'A Letter After Graduation',
      description: [
        'A familiar name shows up in your inbox: Jamie Lin. The subject line: “Hi Professor, just a quick update.” You open it and find that “quick” is followed by nearly two thousand words.',
        'He’s at a big tech company now. Before he’d even officially started, one project sprint earned him a performance rating above expectations. The team’s deadline culture suits him perfectly; he writes, “For the first time, a work rhythm feels tailor-made for me.” He got promoted a full six months ahead of his starting cohort. Somewhere in the middle, he mentions those last weeks before his defense: “Honestly, I’m really grateful you didn’t give up on me.” Just that one line. No elaboration, no sentiment. The sentence turns a corner and he’s back to talking about projects.',
        'At the end, he asks whether you’d be interested in collaborating on an industry project. The budget is there and the direction is a good fit. He’s attached a link to a draft proposal. Document created: shortly before midnight last night, which means he finished it minutes before sending this email. Some people really never change.',
      ],
      prompt: 'Jamie has come back with a collaboration offer. You:',
      options: {
        lxj_alumni_collaborate: {
          text: 'Accept. Gotta support a former student',
          outcomes: [
            'You reply that you’re in and ask when he’s free to go over details. He answers almost immediately with a video call link for 9 a.m. tomorrow. You strongly suspect that link existed before the email was even sent. The collaboration officially kicks off, and the lab brings in a round of industry funding.\n\nLooking at his name on the collaboration agreement, you think of the new student who wandered in late with a bubble tea, and find that time can be a funny thing.',
          ],
        },
        lxj_alumni_decline: {
          text: 'Politely decline. Too busy right now',
          outcomes: [
            'You politely explain that the group is pretty full at the moment and can’t take on a new collaboration. Jamie replies, “No problem, Prof. Another time,” then adds: “What’s the group working on these days? I’ll keep an eye out for people for you.”\n\nYou look at that message for a while. Less than a year out, and he’s already sending people your way. You file the email under “Follow up later” and think about the student who was always “almost there.” These days, he really does get there fast.',
          ],
        },
      },
    },

    // ── Half-favor event (src/data/events/half_favor.ts) ──────────────────────
    half_favor_lin_xiaojuan: {
      title: '{studentName} Is Cursing at His Code',
      description: [
        'That afternoon you head back to the lab to pick something up and hear muffled muttering down the hallway. You assume someone’s on the phone. Closer up, you realize it’s Jamie, talking to his screen.',
        '“Why the fuck are you NaN again.” His brow is furrowed, his tone somewhere between pleading and accusation. “You were fine this morning. Did you betray me?” A pause, then: “Where did you hide the gradients? Tell me!”',
        'He hasn’t noticed you in the doorway at all. After watching for a bit, you realize he isn’t just cursing. After each outburst he stops and reads the error message carefully. Curse, read, curse, read. Venting and debugging in parallel, at remarkable efficiency.',
      ],
      prompt: 'Do you say something?',
      options: {
        half_favor_lxj_cough: {
          text: 'Cough softly and pretend you just got here',
          outcomes: [
            'Jamie turns around and instantly switches to a normal person’s face. “Oh, you’re back, Prof.” His tone is perfectly professional, as if nothing had happened. You pretend you didn’t see anything either, and you both get back to work. But as he turns back around, you hear him mutter to the screen: “I’ll deal with you later.”',
          ],
        },
        half_favor_lxj_ask: {
          text: 'Just ask: “Did negotiations break down?”',
          outcomes: [
            'Jamie turns around. One second of eye contact. Then he nods, resigned. “We couldn’t reach an agreement. It won’t listen to reason.” He pushes his chair back. “Prof, you be the judge. I changed one line of code and the gradients went from normal to infinity. Is that my problem?” You tell him it’s probably not his problem. He turns solemnly back to the screen. “You heard that. Not my problem. Yours.”',
          ],
        },
      },
    },

    // ── Max-favor event (src/data/events/max_favor.ts) ────────────────────────
    max_favor_lin_xiaojuan: {
      title: '{studentName}: I LIVE!!! I’M GETTING LATE-NIGHT FOOD!!!',
      description: [
        'At 11:58 p.m., the submission system finally shows that familiar line: Submission Successful. Three seconds later, your phone starts buzzing like crazy.',
        'First message: “PROF!!!!!!” Second: “I’M ALIVE!!!!!!!” Third: “COME OUTSIDE!!!!!” Fourth: “I’M ALREADY DOWNSTAIRS!!!!”',
        'When you get downstairs, Jamie is darting back and forth outside the building. The moment he sees you, he charges over with his phone held high and shoves the confirmation page in your face. “Prof, look!! It took it!! The system actually took it!!!”',
        'Within ten minutes, the two of you are sitting at a late-night barbecue stand. You’ve barely sat down when Jamie goes into post-mortem mode. “Prof, you know what the most ridiculous part is? Last night I was ready to quit and change careers. Seriously, I’d already figured out where to park my food truck. Then at noon today the experiment suddenly worked, this afternoon I patched the proof, and tonight the paper’s in.”',
        'He starts laughing before he even finishes. “Research is such a weird job. Yesterday I thought my life was over. Today I feel like I could change the world.”',
        'He raises his drink and clinks it against yours. “To this extremely unstable mental state.” You eat and talk. From the first group meeting to the latest deadline, from the lab’s most absurd bug to the most absurd Reviewer. Jamie does most of the talking. Every time you chime in, he can run with it for another five minutes.',
        'Later on, he suddenly goes quiet, poking at the grilled potato slices on his plate. “Honestly, sometimes I think I’m kind of ridiculous too,” he says softly. “Every time, I think I’m done for. And every time, I make it out alive.”',
        'Then he looks up, eyes bright, as if he’s just remembered something important. “Prof, will you still let me tag along on the next paper?”',
      ],
      prompt: '{studentName} looks at you, hopeful. What about the next paper?',
      options: {
        max_favor_lxj_next_paper: {
          text: 'Of course. We’ll go for the next one together',
          outcomes: [
            '“Yesss!” Jamie nearly sloshes his drink everywhere. “Prof, I knew it!” He immediately launches into his next idea, from the problem definition all the way to its future impact. The logic is riddled with holes, and he could not care less. You try to point out a few problems. He concedes every single one, then keeps going. At the end, he raises his cup and clinks it against yours. “Either way, I’ve got you for the next one.”',
          ],
        },
        max_favor_lxj_relax: {
          text: 'The next paper can wait. Tonight we celebrate',
          outcomes: [
            '“Fair point!” Jamie flips his phone face down on the table. “Projects paused, research paused. Tonight my only job is being happy.” For the next hour he goes from roasting Reviewers to lab gossip, then does impressions of how everyone in the group acts at group meeting, until you nearly choke on your drink. When the check comes, he grabs it first and waves you off grandly. “Don’t worry about it. Today I feel extremely rich.”',
          ],
        },
      },
    },

    // ── New Year gift reaction (src/data/events/new_year.ts) ──────────────────
    new_year_gift_result_lin_xiaojuan: {
      title: 'Jamie’s Reaction',
      description: ['Jamie finds the gift box, picks it up and looks it over.'],
      prompt: 'Jamie’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'After opening the box, Jamie suddenly pulls out his phone and starts typing. You ask what he’s doing. Without looking up: “Writing my will.” You freeze. He keeps typing. “If I get hit by a car tonight, this will be the last New Year’s gift of my life.” You’re about to tell him off when he cracks up first.',
            'Jamie thanks you politely, sets the box at the edge of his desk, and goes back to staring at his laptop, possibly chasing yet another deadline.',
          ],
        },
      },
    },

  },
};
