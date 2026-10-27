import type { CharacterPack } from '../../../types/i18n';

// English overlay for 谢之微 (Zoe Hsieh): profile card, personal events,
// half/max-favor events and the New Year gift result. Text only.
export const xieZhiweiEn: CharacterPack = {
  profile: {
    name: 'Zoe Hsieh',
    firstName: 'Zoe',
    pronoun: 'she',
    tagline: 'I’m just looking. I won’t touch anything.',
    bio: 'Took apart every appliance in the house as a kid, then grew up and moved on to code. She always wants to see how a device works, how a system actually runs. Whether she ends up changing a little something while she’s in there is another matter entirely.',
    farewell: 'I guess I caused my share of trouble.\n\nBut every time I looked back, you were still there.',
  },
  events: {

    xzw_first_meeting: {
      title: 'Just Looking',
      description: [
        'You go downstairs to meet Zoe Hsieh and find her crouched in front of the network cabinet by the entrance, half her head inside it, like a small animal that has found a glowing burrow. “I looked this model up,” she says, glancing up and blinking at you, fingers still lingering on the cabinet door. “I just want to see how everything’s mounted and configured in there. I really won’t touch it.” The security guard, clutching his thermos, looks like he’s deciding whether this is a police matter.',
        'In your office, Zoe has barely sat down before her eyes lock onto your computer screen. She makes a visible effort to keep her hands on her knees, but her fingertips twitch on their own. “Professor,” she says quietly, “your browser looks like it’s drowning in tabs.” Then she adds, very sincerely: “I could just take a look. I don’t have to close any.”',
      ],
      prompt: 'How do you respond?',
      options: {
        xzw_first_meeting_decline: {
          text: 'Business first. Leave the screen alone.',
          outcomes: [
            'Zoe sits up straight at once, opens her little notebook and snaps the cap onto the end of her pen. “Okay. Business.” She looks perfectly well-behaved, except that her eyes keep slipping past the edge of the notebook, touching the screen and darting back. While you go over project plans, she quietly doodles a tiny browser icon in the corner of the page, then covers it with her palm.',
          ],
        },
        xzw_first_meeting_allow: {
          text: 'Go ahead. It’s about to freeze anyway.',
          outcomes: [
            'Her eyes light up like a kid finally allowed to open a present. “I’ll clean it up very gently, then.” She rolls up her sleeves and gets to work with the quick, careful touch of someone grooming a very grumpy cat. Tab groups, extensions, cache, startup items: she trims and sorts the whole lot while she’s at it. When she’s done, she slides the laptop back and sticks out her tongue. “I only meant to close a few tabs. Then they started looking really pitiful.”',
          ],
        },
      },
    },

    xzw_just_look: {
      title: 'Refactored It While I Was At It',
      description: [
        'The formatting in the server logs is a mess, so you ask Zoe to “just take a look.” It’s the most dangerous thing you’ll say all day.',
        'A while later, she messages you: “Fixed! Also, I tidied up the logging system a bit while I was at it.” It’s followed by a sweet little smiley.',
        'You open the repo. She didn’t just fix the formatting. Timestamps, log levels, output structure, documentation: all rewritten. You pull up the git log and see she was at it from late at night into the small hours.',
        'The first line of the commit message reads: just a small cleanup. Second line: also split up the config options, they were a bit coupled. Third line: saw some duplicated logic, merged it while I was there. Fourth line: found out along the way that the logging system is actually kind of interesting.',
        'You close the git log. Some things are better not learned all at once.',
      ],
      prompt: 'How do you respond to Zoe?',
      options: {
        xzw_just_look_limit: {
          text: 'Check what else she touched, right now',
          outcomes: [
            'You take a deep breath and open the other directories. Build scripts: still there. Database connection: still there. User authentication: still there, but with a new comment: small potential issue here, could fix it but holding back for now.\n\nYou stare at “could fix it but holding back for now” for a long time.\n\nYou go find her and tell her that from now on, she messages you before touching anything. She nods. “Okay. So, reporting in first: I just found another interesting problem.”',
          ],
        },
        xzw_just_look_accept: {
          text: 'Officially name her the lab’s “Chief Code Neat Freak”',
          outcomes: [
            '“Really?!” Her eyes light up, but she quickly composes herself and says, in a very professional tone, “Then I’ll put together a list of changes for you to approve first.”\n\nThe list lands in your inbox the next morning: thirty-seven items, prioritized by “scope of impact” and “urgency,” with a Gantt chart attached.\n\nOver the next two months, the lab’s code changes profoundly, at a pace you can’t follow at all. The only problem is that you can tell less and less whether she’s doing research or just feeding her curiosity. The results are good, so you decide not to look too closely at what exactly happened.',
          ],
        },
      },
    },

    xzw_accidentally_broke: {
      title: 'Do We Still Have the Old Version?',
      description: [
        'Zoe optimized the training script. It runs noticeably faster, and her message comes with a string of little firework emojis. You’re pretty happy too, until you notice the new script saves checkpoints in a different format.',
        'The old results won’t load anymore.',
        'You ask Zoe what happened. “Typing…” pops up on her end almost instantly, disappears, pops up again. Finally: “Professor… do we still have the old version?” It’s followed by an emoji peeking nervously around a corner.',
      ],
      prompt: 'How do you handle this?',
      options: {
        xzw_accidentally_broke_criticize: {
          text: 'Code can be rewritten. Four months of data can’t.',
          outcomes: [
            'Zoe nods over and over, hugging her laptop, the little clip in her hair bobbing along. “Got it. Rescuing it now.” That same day she writes a format conversion script and recovers most of the old results. When she pushes it, it comes with a compatibility check, and in the description she has written, in all seriousness: Check with advisor before changing formats. No itchy fingers. You read the line and can’t tell whether the rule is meant for her or for you.',
            'Zoe launches into damage control at once, typing like a hamster frantically patching a burst pipe. Unfortunately the old format turns out to be messier than expected, and she only manages to recover part of it. She compiles the failed cases and labels each with its cause, then adds a new rule to the repo: every format change must ship with a conversion script. She looks at the rule and gives the screen a gentle poke. “This one’s for me.”',
          ],
        },
        xzw_accidentally_broke_solve_together: {
          text: 'Save the data first. Post-mortem later.',
          outcomes: [
            'You write the conversion script together. As she works, Zoe diagrams every weird branch of the old format, and by the end she’s wrinkling her nose at it herself. “So this is how it grew up.”\n\nMost of the data is recovered. You remind her that compatibility-breaking changes have to be announced in advance. She nods seriously, then creates a BREAKING_CHANGES file in the repo. First line: Read this before your fingers get itchy.\n\nLater you discover she has already added five draft entries, each marked “pending approval.”',
          ],
        },
      },
    },

    xzw_elegant_solution: {
      title: 'Elegant',
      description: [
        'Nobody assigned Zoe this task. She was just passing a core module, clicked in to take a look, and then couldn’t help herself.',
        'By the time you notice, she has reorganized the whole module: shorter code, faster runs, and the missing tests filled in. She gave the PR a very innocent title: Minor cleanup.',
        '“The old version worked too,” she explains, rubbing a fingertip along the edge of the desk. “It’s just that a few chunks of duplicated logic kept sitting there in a neat little row, and it made me itchy.”',
      ],
      prompt: 'How do you respond to the rewrite?',
      options: {
        xzw_elegant_solution_code_review: {
          text: 'Have her present it to the group',
          outcomes: [
            'Zoe carries her laptop up front and starts by plugging the projector cable into the wrong port, which makes her duck her head and laugh. Once she gets to the code structure, though, she lights up completely, walking through the design decisions and the test coverage, getting smoother the longer she goes. Someone asks how she came up with splitting the modules this way. She answers earnestly: “Because they never should have been crammed together.” When it’s over, the whole group quietly opens their own old code.',
          ],
        },
        xzw_elegant_solution_main_task: {
          text: 'And your actual task… when did you do that?',
          outcomes: [
            '“Oh, that’s already done.” Zoe hands you the main results, then pushes the refactor PR over too, like a kid turning in her homework and her craft project at the same time. “I did this one while waiting on experiments. It didn’t hold anything up.” Looking at her bright, shining eyes, you realize that the scraps of time other people spend scrolling on their phones, she spends giving code a deep clean.',
          ],
        },
      },
    },

    xzw_equipment_obsession: {
      title: 'I Just Want to See What’s Inside',
      description: [
        'A new piece of equipment has arrived in the lab. It’s just been unboxed, and the protective film isn’t even all the way off.',
        'When you walk past, Zoe is crouched beside it watching a teardown video, phone propped on the cardboard box, guarding it like a freshly found egg.',
        '“I just want to see how it’s built inside.” She looks up at you with eyes far too innocent, a screwdriver already in her hand. “I don’t have to open it. I’m just seeing if this fits the screws.” The warranty sticker is still intact, but the device’s future is clearly under threat.',
      ],
      prompt: 'How do you handle this?',
      options: {
        xzw_equipment_obsession_no: {
          text: 'It’s under warranty. No opening it.',
          outcomes: [
            '“Okay.” Zoe obediently puts the screwdriver back and even nudges it a little farther away with two fingers, to show she really isn’t touching anything. Then she walks a full circle around the device and crouches to look at the vents. “I won’t take it apart. I’ll take it apart with my eyes.” You decide to believe her for now, and move the toolbox to a higher shelf.',
          ],
        },
        xzw_equipment_obsession_later: {
          text: 'Once the warranty’s up, it’s all yours',
          outcomes: [
            '“Really?” Zoe immediately pulls out her phone and puts the warranty expiration date in her calendar, with a very plain event title: OK to take apart. Watching her carefully set a reminder, you get the sudden sense that this machine’s future has been decided. She puts her phone away and pats the box contentedly. “You work hard for now. I’ll come get to know you later.”',
          ],
        },
      },
    },

    xzw_optimization_spree: {
      title: 'Optimized Five While I Was At It',
      description: [
        'You didn’t give Zoe any extra tasks this week. She was supposed to be pushing her own research forward. On Friday afternoon, she sends you a list.',
        'Several of the lab’s everyday tools have all been through her hands. Each one comes with a benchmark, change notes and a short risk assessment.',
        '“My hands were free while the experiments ran,” Zoe explains, as if this were obvious. “Then I saw a loop that could take a shorter route. Once I fixed that one, the one next to it looked a little awkward too.” She sends a sheepish emoji. “And it just went from one to the next.”',
      ],
      prompt: 'How do you respond to this optimization spree?',
      options: {
        xzw_optimization_spree_report_first: {
          text: 'Wait, what about your own experiments?',
          outcomes: [
            'Zoe looks up, perfectly innocent. Then she slides another folder across the desk. “Done. I did these while waiting for results.”\n\nYou open it. Her experiments are on schedule, the logs neat and tidy. All five optimizations were things she slotted in “while she was at it,” with the GPUs running. She adds softly, “I don’t zone out. Being idle makes me uncomfortable.”\n\nYou decide to stop questioning it. You do, however, quietly add a “report before you change things” rule to the lab guidelines.',
          ],
        },
        xzw_optimization_spree_praise: {
          text: 'You’re in charge of engineering quality now',
          outcomes: [
            'She freezes for three seconds. Then she copies the sentence word for word into her notes app and opens a new private doc titled: Engineering Quality Improvement Roadmap (Draft).\n\nTwo days later you receive a 17-page spreadsheet. Every row is something she wants to touch, prioritized, with estimated hours and potential risks. A note on row 16 reads: “I’ve already done these 3, see PR.”\n\nYou realize you’ve said something very expensive.',
          ],
        },
      },
    },

    xzw_debug_instinct: {
      title: 'I Think I Know Where It Is',
      description: [
        'A bug has had the whole group stuck for days. Logs combed through, experiments rerun, everyone on the verge of questioning their life choices.',
        'Zoe was only passing by and poked her head in for a look. Then she sits down with her mug, scrolls the logs back a few screens, and her eyebrows slowly knit together.',
        '“This is weird.” She points at two entries squeezed together, in the tone of someone who has found a kitten hiding under the floorboards. “These shouldn’t show up at the same time. Probably a race condition, somewhere around this function.”',
      ],
      prompt: 'How do you respond to Zoe’s call?',
      options: {
        xzw_debug_instinct_trust: {
          text: 'Send everyone straight to that function',
          outcomes: [
            'The whole group turns to it. The bug is exactly where Zoe said: an unlocked write, down to the line. Someone turns around to look at her. “How did you know?”\n\n“A hunch,” she says, completely serious.\n\nFrom that day on, whenever the group has been stuck on something for three days, the first move is no longer digging through logs but: “Go ask Zoe.” She has already circled another structure like it, and asks you quietly, “This one looks kind of similar too. Can I fix it while I’m at it?”',
          ],
        },
        xzw_debug_instinct_verify: {
          text: 'Go reproduce it yourself first',
          outcomes: [
            'Zoe goes. Twenty minutes later she’s back: the bug is real. She also brings a reproduction doc and a fix patch, formatted as neatly as a homework assignment. “I was worried that if I just went in and fixed it, I’d end up fixing too much, so I came to check first,” she says, her hands hovering at the edge of the keyboard, waiting for your nod.\n\nYou nod. Only then do her hands come down and start typing.\n\nLater it occurs to you: if you hadn’t made her reproduce it first, that patch would probably have come with an “also fixed the one next to it while I was at it.”',
          ],
        },
      },
    },

    xzw_version_control: {
      title: 'Cleaned Up the History While I Was At It',
      description: [
        'You ask Zoe to fix a small bug. It should be done in no time.',
        'She sends a pull request: bug fixed. Plus a note: “I also tidied up the repo history while I was at it, and wrote a contributing guide.”',
        'You open the repo. A huge swath of stale branches is gone, and a CONTRIBUTING.md has appeared next to the README. Zoe has added in the PR: “Everything was backed up before I deleted it! I remembered this time!”',
      ],
      prompt: 'How do you respond to this latest “while I was at it”?',
      options: {
        xzw_version_control_thank: {
          text: 'Thanks. This should’ve been done ages ago.',
          outcomes: [
            '“Right?!” Zoe perks up instantly and starts explaining how messy branches would eventually get in the way of debugging, then walks you through several rules in the contributing guide. She explains it all very earnestly, like someone showing off a drawer she’s just organized. You send the doc to the whole group with the subject line: Follow this from now on. When she sees it, she sneaks a line onto the end of the doc: Suggestions welcome, please open an issue.',
          ],
        },
        xzw_version_control_warn: {
          text: 'Leave some work for other people',
          outcomes: [
            'Zoe pauses, then laughs, a little embarrassed, and pulls out one earbud. “Okay, next time I’ll ask first.” She writes it down in her notes app and draws a little warning sign next to it.\n\nThen she sends you the backup screenshots, restore instructions and the scope of the changes, all together, like submitting proof that she really didn’t go rogue.\n\nGoing through the proof, you find every single step was backed up. You’re quiet for a moment, then think: she didn’t leave anyone any work, but she left everyone plenty of rollback points.',
          ],
        },
      },
    },

    xzw_accidental_discovery: {
      title: 'I Was Just Seeing How Other People Do It',
      description: [
        'Zoe sends you a one-page technical memo titled: “Might be useful, might just be me overthinking.”',
        'It’s very detailed. While reading an implementation from another field, Zoe noticed that the way they handle a certain kind of data closely resembles your current bottleneck. She has written up the principle, the conditions where it applies, and roughly what would need to change to port it over.',
        '“I really was just seeing how other people do it,” Zoe explains. “And then it kept waving at me.”',
      ],
      prompt: 'How do you handle this unexpected find?',
      options: {
        xzw_accidental_discovery_evaluate: {
          text: 'Share it at next week’s group meeting',
          outcomes: [
            'You send the memo around the group for discussion, and the more people read it, the more promising it looks. When you tell Zoe the direction is worth trying, her eyes slowly widen. “It’s actually useful?” She isn’t being modest. She really was just following her curiosity, and never expected to stumble onto a new path. The idea ends up saving you a good deal of trial and error, and from then on she “just looks” with a much clearer conscience.',
            'You read it carefully and find that several key assumptions don’t hold in your setting. When you explain why, Zoe immediately renames the memo “Doesn’t apply, but learned something” and notes down why it failed. “Still not a loss,” she says, filing the related materials into the group’s knowledge base while she’s at it. The direction went nowhere, but the next time someone asks, she has already marked where the holes are.',
          ],
        },
        xzw_accidental_discovery_defer: {
          text: 'Finish your own research first',
          outcomes: [
            '“Okay, I’ll save it for later.” Zoe tags the memo “to evaluate” and thoughtfully adds a summary so it’s easy to pick back up. Then one thing led to another, and the doc sat forgotten in a corner. When you later see a similar idea in someone else’s paper, the first thought that pops into your head is: Zoe really did pick up this exact stone once.',
          ],
        },
      },
    },

    xzw_robot_dog: {
      title: 'And Also Some Robotics Research',
      description: [
        'Zoe comes to find you, hugging her laptop. “Professor, I’d like to request a robot dog.”',
        'You ask why, and she blurts out: “I want to know what it thinks when it sees stairs.”',
        'She pauses, then adds: “And also do some robotics research.”',
        'You can’t shake the feeling that the second half was added on the spot.',
      ],
      prompt: 'How do you respond?',
      options: {
        xzw_robot_dog_approve: {
          text: 'Approve the purchase',
          outcomes: [
            'The robot dog arrives. In week one, it learns to climb stairs. In week two, it starts patrolling a fixed post near the fridge. In week three, you find that Zoe has propped a small mirror in the hallway and is recording whether it stops in front of it.\n\nYou ask how the research is going. “Running experiments,” she says. You glance at the experiment log. Its title: Self-Awareness in Robot Dogs: A Preliminary Study.',
          ],
        },
        xzw_robot_dog_borrow: {
          text: 'Doesn’t the lab next door have one? Borrow it first.',
          outcomes: [
            'Zoe actually borrows it, promising to handle it with care. Two weeks later, Prof. Brennan from next door comes over and asks, with great restraint: “May I ask… why you’ve given it a robotic arm?”',
          ],
        },
        xzw_robot_dog_duck: {
          text: 'Why not a robot duck?',
          outcomes: [
            'Zoe thinks it over seriously for three seconds. “A robot duck… buoyancy is easy to handle, but the feather-deployment mechanism would be complicated, and there isn’t much data on duck calls.” She is not joking.\n\nThe two of you spend fifteen minutes on this question, and in the end Zoe says, “I’ll check whether one already exists.” It doesn’t. But she writes up a “Robot Duck Design Challenges” memo, just in case.',
          ],
        },
      },
    },

    xzw_window_rain: {
      title: 'I’m Waiting for the Experiment to Finish',
      description: [
        'An experiment is running, and Zoe is supposed to be keeping an eye on it.',
        'You go to find her and see her staring at the window. She doesn’t seem to be spacing out. Looking closer, you realize she’s watching how the raindrops run down the glass.',
        '“Look,” she says, pointing at two trails of water. “They’re going the same direction, but they never merge.”',
      ],
      prompt: 'How do you respond?',
      options: {
        xzw_window_rain_engage: {
          text: 'Funny, I was wondering the same thing',
          outcomes: [
            'Zoe’s eyes light up, and she launches into all her theories: flow paths, surface tension, contact angles.\n\nWhen she’s done, she looks deeply satisfied, like she’s finally let out a question that had been circling in her head for ages. The experiment log is still running fine. Nothing was held up.',
          ],
        },
        xzw_window_rain_back_to_work: {
          text: 'You’ve got an experiment to watch. Focus.',
          outcomes: [
            '“Okay.” Zoe closes her notes and pulls her attention back to the screen. After a moment of silence, she says softly, “But what if they’re going around something…” She catches herself, shuts her mouth firmly, and fixes her eyes on the log.\n\nBy the end of the day, her notes have two new entries. She used the gaps while waiting to estimate a range for the surface tension, with a footnote: Observed outside working hours, no research resources used.',
          ],
        },
        xzw_window_rain_official: {
          text: 'Does this count as an experimental observation?',
          outcomes: [
            '“Yes, yes, it counts.” She renames her notes “Informal Experiment Log vol. 3” and adds a line at the top: Research question: why don’t raindrops merge?\n\nThen she tidies up the formatting, looks up and says, “There. Now it’s compliant.” Watching her write up an experimental design for her own daydreaming, you hold back from reminding her that this is a computer science lab, not a physics lab.',
          ],
        },
      },
    },

    xzw_elevator_study: {
      title: 'I Just Jotted It Down',
      description: [
        'Zoe is seven minutes late, and when she comes in, part of her mind still seems to be somewhere else.',
        '“Professor,” she says, setting down her bag, “this building has six elevators, but everyone only waits for the three on the left. The three on the right keep showing up empty, and nobody gets in.”',
        'She opens her phone: fourteen days, every morning rush hour, about two hundred entries of people getting on and off. You ask when she recorded all this. “While waiting for the left elevators,” she says. “I had time.”',
      ],
      prompt: 'How do you respond to Zoe’s elevator study?',
      options: {
        xzw_elevator_study_model: {
          text: 'Ask what she plans to do with the data',
          outcomes: [
            '“Not sure yet,” she says, thinking it over. “But you could build a queueing game model and analyze how everyone reached this consensus without anyone ever proposing it.” She has already opened a doc and started writing research questions.\n\nLater, at group meeting, you mention that this kind of unorganized group coordination looks a lot like a certain class of problems in distributed systems. Zoe looks up, eyes suddenly bright, and pushes her laptop forward. “Yes, yes, yes, that’s exactly what I meant.”\n\n💡 New idea: “Silent Coordination Mechanisms” (saved to the Projects panel)',
          ],
        },
        xzw_elevator_study_optimal: {
          text: 'Ask if she’s found the best way to wait',
          outcomes: [
            'Zoe slides her phone forward and flips to the last page. “Number four,” she says. “It runs on its own dispatch system and responds three to five seconds faster. Most people don’t know.”\n\nShe pauses, then adds: “But if everyone started waiting for number four, it would get slow again.” Listening to her turn waiting for an elevator into something with a distinct flavor of game theory, you realize she has actually done the math.',
          ],
        },
      },
    },

    xzw_meeting_seats: {
      title: 'Nobody Made It a Rule, But Everyone Does It',
      description: [
        'When group meeting ends, Zoe packs up very slowly and is the last one out.',
        'Waiting for you in the hallway, she says, “Professor, have you noticed? We’ve had group meetings for three months, and everyone sits in the same seat every single time.”',
        'She opens her phone and shows you a diagram of the seating at every group meeting, marked with the simplest possible circles and names. It has barely changed once. “Nobody ever said it was a rule,” she says, “but everyone keeps it up. I want to know why.”',
      ],
      prompt: 'How do you respond?',
      options: {
        xzw_meeting_seats_experiment: {
          text: 'Next time, sit somewhere else on purpose',
          outcomes: [
            'Zoe’s eyes light up, then she settles back into calm. “Okay, but I need to think through how to control the variables first.”\n\nAt the next group meeting she arrives early and takes a different seat. People trickle in. Some pause for a second, some turn sideways and change course, and in the end the whole seating arrangement subtly rotates by about ninety degrees.\n\nZoe writes in her notes: The system is robust. A single perturbation is not enough to break the structure.',
          ],
        },
        xzw_meeting_seats_inside: {
          text: 'You’re part of it too',
          outcomes: [
            'Zoe looks down at the diagram and checks it carefully. “Right, me too.” She looks up as if she’s discovered something remarkable. “I thought I was the one observing, but I’m observed data too.”\n\nShe writes this into her notes and changes the title to: The Observer Is Also Data. Looking at the title, you are reminded of several quantum mechanics papers, and decide not to think any further.',
          ],
        },
        xzw_meeting_seats_social: {
          text: 'Is this a sociology project?',
          outcomes: [
            '“No,” she says, “but it feels like it could be.” She puts her phone away and walks a couple of steps ahead. “If you replace seats with any position that can be occupied, like on the subway, in the dining hall, in a parking lot, this question generalizes to a lot of places.”\n\nShe doesn’t say anything more, but her brain is clearly still running. Maybe tonight she’ll turn the idea into three pages of notes; maybe she’ll fall asleep and remember none of it tomorrow. You figure the two are about equally likely.',
          ],
        },
      },
    },

    xzw_coffee_machine: {
      title: 'I Just Wanted to Know Where That Noise Was Coming From',
      description: [
        'For a while now, the lab’s coffee machine has been making a strange noise. Some said air bubbles, some said wear and tear, and eventually everyone just got used to it.',
        '“I’m only going to open the lid and take a look,” Zoe reports to you in advance, manual in hand. “I won’t touch any parts.” You nod.',
        'Forty minutes later, she messages you: found the source of the noise, fixed it while I was at it. Attached is a full-page teardown diagram, every part labeled, drawn with the earnestness of a lab report cover.',
      ],
      prompt: 'How do you respond?',
      options: {
        xzw_coffee_machine_how: {
          text: 'Ask how she fixed it',
          outcomes: [
            'Zoe comes over, spreads out the sheet and points to an air-line seal. “The noise was coming from here. After enough use, a tiny gap opens up. I filled it with a bit of food-grade silicone grease on a cotton swab.” She adds: “Page 37 of the manual has this maintenance step. People usually don’t read page 37.”\n\nYou look at her, can’t think of what to say, and finally manage one word: “Okay.” She folds up the sheet and tucks it into the inside cover of her notebook.',
          ],
        },
        xzw_coffee_machine_list: {
          text: 'Ask what else she’s curious about',
          outcomes: [
            'Zoe flips the sheet over. There’s more on the back. “The microwave,” she says. “I want to know if the turntable speed has anything to do with the power level. And the projector’s focus: the official spec lists a narrower range than it really has. I tested it.”\n\nYou count seven items on the back, three already checked off. Zoe adds, “I just take a look when I’m walking by.” You decide to believe her, since the coffee machine really has gone quiet and nothing was lost.',
          ],
        },
        xzw_coffee_machine_approval: {
          text: 'From now on, ask before you touch things',
          outcomes: [
            '“Okay.” Zoe immediately takes out her phone and sends you a message. Subject: Request to repair coffee machine (completed). You approve it and add, “From now on, request first, then touch.” She screenshots it for her records and replies: “Next time I’ll do it in the right order.”\n\nAfter that, you never receive another request. But the coffee machine stays fixed for good, the microwave goes quiet one day, and at some point the projector’s focus starts turning smoothly. There are no request records whatsoever.',
          ],
        },
      },
    },

    xzw_alumni_visit: {
      title: 'The Legend of Her First Month',
      description: [
        'After graduating, Zoe joined an infrastructure company to work on systems optimization. You think the choice suits her perfectly, and you’re also a little nervous on the company’s behalf.',
        'Six months later, Zoe emails you. It opens with, “Work is really interesting, and everyone is really nice.” Further down, she mentions in passing that in her first month she cut a core service’s latency by a wide margin, and also, having “tidied up” a few modules she didn’t find elegant enough while she was at it, set off a minor production incident.',
        '“They call me the resident bomb defuser now,” she writes, “but I don’t think that’s entirely accurate, because sometimes I built the bomb myself.”',
        'At the end of the email, she says she has put together a set of open-source tools and would like to release them under the lab’s name. Some of them, she says, piled up while she was doing research here, and she wants to give them back.',
      ],
      prompt: 'How do you reply to Zoe?',
      options: {
        xzw_alumni_visit_agree: {
          text: 'Say yes, and let her take the lead',
          outcomes: [
            'Zoe replies quickly: “Thank you, Professor. I’ll put it together myself first and show you when it’s ready.” Some time later, a repo link arrives: clean tools, clear docs, and examples so considerate they feel like a row of stepping stones laid out for whoever comes next. The lab’s name is in the author list. Looking at it, you remember the first time she crouched in front of that equipment cabinet saying “I’m just looking,” and you feel she hasn’t really changed. The things she takes apart have just gotten bigger, and more useful.',
          ],
        },
        xzw_alumni_visit_ask_detail: {
          text: 'Review it first, then release if it’s fine',
          outcomes: [
            'Zoe sends over the tool list and descriptions, clearly marking which code came from the lab and which she rewrote after graduating. You go through it, confirm everything is fine, and say yes. Zoe replies: “Great! I checked the lab link in the README too.” You open the draft. The link works, the formatting is neat, and there’s even a contributing guide. You smile. Of course she did a little extra while she was at it.',
          ],
        },
      },
    },

    xzw_prompt_archaeology: {
      title: 'She Found Some Ancient Prompts in the Repo',
      description: [
        'While cleaning up an old code repo, Zoe finds a folder created two years ago, full of prompts. The earliest dates to the first week the system was hooked up to AI features: “Could you please explain what an attention mechanism is? In a friendly tone, please.”',
        'She goes through the whole folder and finds the prompts’ style evolving from extremely polite and tentative to concise, professional, even a little commanding.',
        '“This is someone learning to use AI, start to finish,” she says, pushing her laptop over. “I wrote down the stages it went through. Each stage has a different questioning strategy. It’s pretty interesting.”',
        'She speaks softly, but her notes are meticulous: every stage is backed by quoted examples, and every timestamp lines up.',
      ],
      prompt: 'Zoe is digging into how these prompts evolved. You decide to:',
      options: {
        xzw_prompt_archaeology_archive: {
          text: 'Archive it. Might come in handy someday.',
          outcomes: [
            'You say, “This is worth keeping. Put it in the group’s docs.” Zoe puts together a complete archive, laid out on a timeline with short annotations, far more polished than you expected. When she sends it, she adds, “I also went through a few other folders like this one.” Attached are four more analyses just like it. She had clearly done them long ago and was only waiting for the right moment to bring them up.',
          ],
        },
        xzw_prompt_archaeology_research: {
          text: 'Turn this into research',
          outcomes: [
            '“The way someone’s prompts evolve could reflect how their understanding of AI develops,” you say. “At scale, this data could be really valuable for research.” Zoe pauses, then asks, “Could we do it with anonymized public repos?” You say of course. She nods and says she knows a few AI tool projects on GitHub with long commit histories that could serve as a corpus, then looks down and starts writing. Her notebook already holds half of it; today’s conversation is just the other half.',
          ],
        },
      },
    },

    xzw_citation_bomb: {
      title: 'Something’s Off About This Paper’s Citations',
      description: [
        'While surveying a research direction, Zoe comes across a paper with an unusually high citation count, though its experiments look mediocre to her however she reads them. She stares at the list of citing papers for a long time, then comes to tell you something.',
        '“Thirty-seven of the papers citing it come from the same small conference. That conference has only run twice, and one of its organizers is a co-author on this paper.”',
        'You ask whether she has checked what those thirty-seven papers actually say.',
        '“Read all of them,” she says. “Twenty-one of them cite each other, with pretty thin reasons.” Her voice is flat. She doesn’t sound like she’s gossiping. She sounds like she’s presenting audit findings, only a little heavier than usual.',
      ],
      prompt: 'Zoe has found a suspicious citation pattern. You decide to:',
      options: {
        xzw_citation_bomb_note: {
          text: 'Note it, and don’t cite it in our work',
          outcomes: [
            'You say, “Then we won’t cite it in our own papers. Leave the rest alone.” Zoe nods, flags the paper with a red annotation, “Citation sources questionable, direct citation not recommended,” and goes back to organizing references. You notice her reference library is kept immaculately clean, every entry with her own quality rating. She has been doing this quietly for a long time.',
          ],
        },
        xzw_citation_bomb_investigate: {
          text: 'Turn this pattern into a detection method',
          outcomes: [
            '“If this kind of citation-network manipulation can be detected, it’s worth building a methodology around it,” you say. “You already have the data.” Zoe thinks for a moment, then says, “I also found two other cases like this. At the time I thought I might be overthinking it, so I didn’t say anything.” She opens a folder. Both cases are documented in the same detail and just as carefully timestamped, like letters waiting for someone to come and ask.',
          ],
        },
      },
    },

    // ── Half-favor event (src/data/events/half_favor.ts) ──────────────────

    half_favor_xie_zhiwei: {
      title: 'The Printer Works Now',
      description: [
        'The lab printer has been broken for ages. Strictly speaking, it isn’t broken: it still works, it just jams every three pages, and every time you have to smack it twice, and if you’re unlucky, start over. Over time, everyone has even worked out a technique: one smack on the left, one on the right, best success rate.',
        'So the day you print twenty pages in one go without a single jam, your first reaction isn’t joy but suspicion. You stare at the printer for two seconds, print another copy to make sure, and it runs as smoothly as if someone swapped in a new machine.',
        'You ask around the lab, and finally someone points to the corner: “I think Zoe did something to it.”',
        'When you find Zoe, she’s crouched on the floor sorting through a power strip she has taken apart. At your question she just nods. “Yeah, fixed it while I was at it.” When you ask how, she thinks for a moment. “Opened it up, replaced a worn roller, cleaned out the dust, recalibrated the alignment.” As if she were talking about straightening a chair on her way past.',
        'You’re about to say something when she suddenly adds, “That jamming noise was really annoying.” A pause, then one more: “And watching you all line up to smack the printer every time was so inefficient.”',
      ],
      prompt: 'Looking at Zoe, who fixed the printer without telling anyone:',
      options: {
        half_favor_xzw_care: {
          text: 'So you put up with it for three months?',
          outcomes: [
            'Zoe answers as if it’s nothing: “The first two months, I didn’t know how to fix it. The last month, I was kind of busy.” Then she goes back to her screws. You almost laugh out loud. Translation: that printer has been on her mind for three whole months.',
          ],
        },
        half_favor_xzw_thanks: {
          text: 'Thank her properly',
          outcomes: [
            'Zoe doesn’t seem used to being thanked so formally. It takes a few seconds before she says quietly, “Actually, it’s not just the printer.” She points to the network cables in the corner, now neatly re-routed, then to the drawers that have labels on them now. “I did these too, while I was at it.” By the end even she can’t help a small laugh. “It’s not like I did it for you guys to notice. I just get itchy hands whenever I see something messy.”',
          ],
        },
      },
    },

    // ── Max-favor event (src/data/events/max_favor.ts) ────────────────────

    max_favor_xie_zhiwei: {
      title: 'Zoe: “Professor, Let Me Show You Something”',
      description: [
        'One weekend afternoon your phone buzzes. It’s a message from Zoe: “Professor, are you on campus today?”\n\nYou’ve barely typed a question mark when the second message pops up.\n\n“Come up to the roof of the engineering building.” Two seconds later, another one: “Quick, quick.”',
        'When you get there, Zoe is crouched at the edge of the roof fiddling with something. The evening breeze lifts both her pigtails. At her feet are a toolbox, a coil of wire, and a strange contraption that looks like a homemade antenna.\n\nWhen she sees you, she waves you over happily. “Perfect timing, Professor.”',
        'Zoe hands you one of her earbuds and goes up on tiptoe to put it in your ear.\n\nAt first there’s just static. Then, suddenly, a voice. “—can someone cover group meeting for me tomorrow—”\n\nThe signal cuts out, and the next second it’s something else. “I’m telling you, that vending machine really does eat your money—”\n\nAfter that come the campus radio, weather station data, and noise from who knows where.\n\nZoe crouches by her equipment, tuning the frequency, as excited as if she’d found buried treasure.',
        'For the next half hour, the two of you sit on the roof and listen to all kinds of inexplicable things. A walkie-talkie some lab forgot to switch off, a security guard on patrol complaining about the heat, two students arguing over whether it’s okay to use ChatGPT for homework.\n\nEvery time she catches a new signal, Zoe immediately turns to look at you, like a kid who has just dug up something precious.',
        'After a while the wind picks up, and as evening comes on the sky turns orange-red, the kind of color that stirs something in a person.\n\nShe sits down by the railing, hugging her knees, looking out over the campus. The antenna keeps slowly picking up signals, and every so often a broken-up voice drifts through the earbud.\n\n“I’ve loved this kind of thing since I was little,” she says, unhurried. “Everywhere in the world, things are running. People are talking, people are doing their own thing.”',
        'She looks down and fiddles with the wire at the end of the antenna. “I always wanted to take them all apart and see. It made me so happy.”',
      ],
      prompt: 'You say:',
      options: {
        max_favor_xzw_home: {
          text: 'Next time there’s something fun, call me again',
          outcomes: [
            '“Okay, it’s a deal. Just don’t get tired of me, Professor.” Zoe’s eyes curve into a smile, as if they’d caught a piece of the sunset.\n\nThe wind picks up on the roof again, but you feel warm all over.',
          ],
        },
        max_favor_xzw_thanks: {
          text: 'No wonder I was the first one you thought of',
          outcomes: [
            '“That’s not it! It’s just… normal people wouldn’t find this stuff interesting anyway.” Zoe’s voice gets smaller and smaller, and she quietly buries her face in her knees.\n\nThen, seeming to realize she isn’t very convincing, she springs back up, snatches the earbud back with great indignation, and makes a face at you.',
          ],
        },
      },
    },

    // ── New Year gift result (src/data/events/new_year.ts) ────────────────

    new_year_gift_result_xie_zhiwei: {
      title: 'Zoe’s Reaction',
      description: [
        'When Zoe sees the gift box, she’s in the middle of taking apart a desktop tower she got from who knows where.',
      ],
      prompt: 'Zoe’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'She sets down her screwdriver, wipes her hands clean, carefully unwraps the box, then folds the wrapping paper neatly and puts it away.\n\nYou assume that’s the end of it. But the next morning, your office computer boots twice as fast, and the power strip that was always coming loose has been secured. When you ask if it was her, she just winks at you, smiling like a little cat.',
            'Zoe nods, sets the box on her desk and goes back to work, but makes a point of moving it to the spot where she can see it best.\n\nTwo days later, the lab’s wobbly door handle has been fixed. The rattle from the hallway exhaust fan is gone. You can’t remember when that noise started, but it’s definitely gone.\n\nShe never mentions it.',
          ],
        },
      },
    },
  },
};
