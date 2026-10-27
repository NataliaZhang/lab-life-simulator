import type { CharacterPack } from '../../../types/i18n';

// English character pack for 白小满 (Sunny Bai).
// Source of truth: src/data/studentPool.ts, src/data/events/students/bai_xiaoman.ts,
// half_favor.ts, max_favor.ts and new_year.ts. Text only; see LOCALIZATION_GUIDE.md.

export const baiXiaomanEn: CharacterPack = {
  profile: {
    name: 'Sunny Bai',
    firstName: 'Sunny',
    pronoun: 'she',
    tagline: 'It is what it is. Let’s eat first.',
    bio: 'No matter how badly a project blows up, she’s always the first to comfort everyone: “Well, at least now we know this one’s a dead end.” Once, with the server down, every experiment failing and two days left before the deadline, she earnestly proposed ordering bubble tea first, because “you can’t fall apart on an empty stomach.”',
    farewell: 'Professor, did you know? Sometimes I get really scared too.\n\nBut when you’re around, it never seems like that big a deal.',
  },
  events: {

    // ── 1. First meeting ──────────────────────────────────────────────────
    bxm_first_meeting: {
      title: 'First Meeting',
      description: [
        'On the day the new students check in, Sunny Bai arrives with both hands full: a bubble tea in her left hand, a bubble tea in her right. She nudges your office door open with her elbow, wearing the focused expression of a professional delivery driver.',
        'She slides one cup across to you, completely serious. “Professor, I did a little research. Bringing your advisor bubble tea at your first meeting raises your odds of admission by twenty-three percent. I made that number up, but the bubble tea is real. Full sugar, light ice. I hope you like it.”',
        'Before you can decide which face to make, she has already sat down, opened her notebook, and asked, “So, Professor, what’s the group mainly working on right now?” The bubble tea is still steaming.',
      ],
      prompt: 'How do you respond to the bubble tea?',
      options: {
        bxm_fm_accept: {
          text: 'Accept it, touched, and remember the gesture',
          outcomes: [
            'It’s exactly the flavor you usually order. A little suspicious that she’s done her homework, you ask. She grins. “Lucky guess. But full sugar, light ice covers a lot of people. That stat’s real.”\n\nA good start. You decide you’re going to mentor this one properly.',
          ],
        },
        bxm_fm_decline: {
          text: 'Take the tea, but say she doesn’t need to next time',
          outcomes: [
            '“Okay, Professor. Then next time I’ll only bring two, and one of them is for me.” You replay her logic in your head and can’t find anything wrong with it.\n\nShe has already opened her notebook and is waiting for you to explain the research direction. The bubble tea sits on your desk, still steaming.',
          ],
        },
      },
    },

    // ── 2. Crisis mediation ───────────────────────────────────────────────
    bxm_crisis_mediator: {
      title: 'Crisis Mediation',
      description: [
        'The mood in the lab has been a little off lately. Task assignments have stirred up some feelings, group meetings have started to feature a brief vacuum after each “that’s all from me,” and hallway greetings have gotten noticeably shorter.',
        'Sunny knocks, comes in, closes the door and sits down. She lays out the root of the problem first, more clearly than you expected, then sums up without any hurry: “I think what we need right now is takeout. Good takeout. Everyone sits together, no work talk, and we let the feelings circulate for twenty minutes.”',
        'She pauses, then adds, “I’ve already figured out how to fix the root cause too. I’ll bring it up once everyone’s in a better mood.” You realize she has split the crisis response into two phases, and phase one is bubble tea delivery.',
      ],
      prompt: 'Her proposal sounds like it would work. What do you do?',
      options: {
        bxm_cm_adopt: {
          text: 'Devoutly launch crisis bubble tea diplomacy',
          outcomes: [
            'The takeout costs the lab the kind of money you could expense as “team building,” but the ROI is scary good. Over dinner, Sunny walks through the root of the problem in the same tone as small talk, and before she has even finished, people are already discussing solutions. Nobody realizes it’s a carefully designed mediation session.\n\nYou quietly file her methodology away for later.',
          ],
        },
        bxm_cm_task_first: {
          text: 'Root cause first, bubble tea later',
          outcomes: [
            'Sunny nods and goes through her full analysis, organized and backed by data. You take notes as she talks, and the problem finds a path to a fix. When she’s done, she stands up, pushes in her chair and says, “Okay, I’ll go order bubble tea for everyone. We still need that part.”\n\nYou don’t stop her. The bubble tea is part of the solution. You understand that now.',
          ],
        },
      },
    },

    // ── 3. Failure, reframed ──────────────────────────────────────────────
    bxm_failure_reframe: {
      title: 'Failure, Reframed',
      description: [
        'Last week, Sunny’s experiments collapsed across the board. All three comparison runs crashed, nothing converged, and on the test set the model was roughly as good as random guessing. You have some gently worded feedback ready and plan to talk to her today.',
        'Her update email reaches your inbox first. Subject line: “Major progress: we have successfully ruled out eighteen possibilities (P.S. a nineteenth is under verification).”',
        'The email is neatly formatted, with a hand-drawn “failure map” attached. Every dead end is labeled with why it failed and where the pitfalls are. The last paragraph reads: “The above is equivalent to eighteen negative results and could be compiled into a paper appendix.” You stare at the email for a while. The two of you might not be on the same channel about what counts as failure, but her channel sounds more interesting.',
      ],
      prompt: 'How do you reply to this email?',
      options: {
        bxm_fr_embrace: {
          text: 'Seems salvageable. Tell her to keep going',
          outcomes: [
            'You write back a longer email than usual, saying the failure map is valuable work in its own right, and that negative results are real data, not waste. Sunny replies within two minutes: “Will do!”\n\nRight behind it comes an updated experiment plan. Possibility number nineteen is already running. Alarmingly efficient.',
          ],
        },
        bxm_fr_redirect: {
          text: 'Great attitude. Now let’s get concrete',
          outcomes: [
            'You set up a meeting and go over the failure map together with a roadmap for next steps. Sunny takes careful notes, occasionally saying, “Oh, right, I didn’t think of that.” On her way out, she says, “Don’t worry, Professor. I just need to sort the disasters into categories. Once they’re sorted, they’re not scary.”\n\nYou feel that line deserves to be framed and hung in the most visible spot in the lab.',
          ],
        },
      },
    },

    // ── 4. Morale boost ───────────────────────────────────────────────────
    bxm_morale_boost: {
      title: 'A Morale Boost',
      description: [
        'The lab has been sliding lately. People are questioning its reputation, several projects are crawling, and group meetings have started to feature that brief vacuum after each “that’s all from me,” where nobody picks it up. Before you’ve figured out what to do about the mood, Sunny has already made a move.',
        'A message appears in the group chat: “This Friday night there’s a dinner. Not mandatory, but strongly encouraged. Hot pot place downstairs, I’ll book the table, we split the bill (it’s on as long as two people show). Theme: no work talk.”',
        'Seven of the eight people in the group go. Afterward you ask Sunny how she pulled it off. She thinks for a moment. “I just wanted everyone to remember that we actually know each other. That we’re not only people who happen to be in the same group.” You realize there’s a lot packed into that sentence.',
      ],
      prompt: 'Her initiative makes you see her in a new light. How do you respond?',
      options: {
        bxm_mb_praise: {
          text: 'Tell her to her face: that was a big deal',
          outcomes: [
            'Sunny listens and nods. “I know. That’s why I did it.” Not modest, not overly pleased either. Just a calm confirmation of how much the thing weighs.\n\nYou realize she knows exactly where she stands in this lab: what she is, and how much it matters. She just never says it out loud.',
          ],
        },
        bxm_mb_curious: {
          text: 'Ask her how she thought of it',
          outcomes: [
            '“There was a stretch when I was in really bad shape. Someone dragged me out to dinner, and it helped a lot.” She pauses, then adds, “Just one dinner. That’s all.”\n\nYou don’t press. Later you find out she quietly paid half the bill herself. Splitting the check was only ever an excuse to get people to come.',
          ],
        },
      },
    },

    // ── 5. Bubble tea strategy ────────────────────────────────────────────
    bxm_tea_strategy: {
      title: 'Bubble Tea Strategy',
      description: [
        'You’re stuck on a tough decision: funding allocation, a staffing change, or where some project should go. The kind where you stare at the screen for half an hour and it’s still the same screen.',
        'Sunny pushes the door open and sets a bubble tea on your desk, her face serious. “Professor, I’ve been observing for a while. When you make hard decisions with bubble tea on hand, your success rate goes up by thirty-one percent.”',
        'She pauses, then adds, “I made that number up too, but I think it has some scientific basis.” She turns to leave, then looks back from the doorway. “No need to thank me. Just text me when you’ve figured it out.”',
      ],
      prompt: 'What do you do with the bubble tea?',
      options: {
        bxm_ts_drink: {
          text: 'Take a sip. Something in your brain loosens',
          outcomes: [
            'Full sugar, light ice. She remembered. You take a sip, and something in your head clicks loose. Not because the bubble tea has any magic in it, but because someone noticed the state you were in and pulled you one notch out of it.\n\nYou make the decision that same afternoon, two days earlier than expected.',
          ],
        },
        bxm_ts_need_quiet: {
          text: 'Thank her, but say you need quiet right now',
          outcomes: [
            '“Then I’ll go. The bubble tea stays.” She closes the door so softly you barely hear it. You take a sip and keep thinking. An hour later you have a direction, and you text her.\n\nShe replies instantly with “Okay, Professor” and a thumbs-up. The kind of thumbs-up you can practically hear.',
          ],
        },
      },
    },

    // ── 6. Social genius ──────────────────────────────────────────────────
    bxm_social_talent: {
      title: 'Social Genius',
      description: [
        'There’s a professor in the department who is famously hard to approach: strict in funding reviews, stingy with words in recommendation letters, and politely distant from every cross-department collaboration. You once considered reaching out, estimated the odds, and shelved the idea.',
        'Last Friday, Sunny represented the lab at a cross-department student mixer. During her update yesterday, she mentioned in passing, “Oh, by the way, Professor, Prof. Harlow said he has a funding source and wanted to ask whether it might be a fit for us. He brought it up himself.”',
        'You ask her for details. She thinks about it. “I brought bubble tea to share, and then we talked a bit about what each of our groups works on. He said there was some overlap, so he asked.” A pause. “We talked about a lot, actually. Anyway, it was a nice conversation.” You’re stunned for a second, then realize she has no idea how remarkable this is.',
      ],
      prompt: 'How do you handle this unexpected chance at a collaboration?',
      options: {
        bxm_st_ask_story: {
          text: 'First, ask what she actually said',
          outcomes: [
            'Sunny thinks back. She says she mostly listened: let Prof. Harlow talk about his research, asked real questions, and worked the lab’s direction in naturally, without ever pitching anything. “I think he actually really wanted to talk. It’s just that nobody usually asks.”\n\nYou quietly file that away. It feels like a repeatable method, and you plan to send it to the whole group before the next cross-department collaboration meeting.',
          ],
        },
        bxm_st_seize_opportunity: {
          text: 'Seize the opportunity and set up a follow-up',
          outcomes: [
            'You have her help set up a meeting. The three of you sit down and talk for quite a while, the collaboration framework more or less takes shape, and the funding application goes into the pipeline. After the meeting, Sunny says, “I knew bringing bubble tea was the right call.”\n\nYou replay the whole thing and can’t find a single angle to argue with.',
          ],
        },
      },
    },

    // ── 7. A real bottleneck ──────────────────────────────────────────────
    bxm_genuine_struggle: {
      title: 'A Real Bottleneck',
      description: [
        'Sunny comes to see you, and for once she walks in empty-handed. No bubble tea, no notebook. Even her habit of carrying a pen around has disappeared.',
        'She sits up straight in the chair and gets right to it: “Professor, I’ve run into a problem. I’ve been thinking about it for two weeks, and I honestly don’t know what to do.”',
        'No “we can still save this.” No repackaging the difficulty as “we’ve ruled out one possibility.” She says plainly that she doesn’t know, then walks you through the whole problem. Her logic is clear, and she pinpoints exactly where she’s stuck. You can tell she held this up alone for a long time before coming in.',
      ],
      prompt: 'She’s willing to say it out loud. How do you respond?',
      options: {
        bxm_gs_guide: {
          text: 'Dive into the technical details and guide her',
          outcomes: [
            'The two of you sit down and talk it through for a long time. You draw diagrams, she fills in what she’s already tried, and after a few rounds you find a way forward. She comes up with the answer herself along the way; you just don’t interrupt her. She stands up and says, “Thanks, Professor.” At the door she stops and looks back. “I’m still going to bring bubble tea next time.”\n\nYou nod and say okay.',
            'You talk for a long time without finding a direct solution, but you map out the boundaries of the problem completely. Sunny says, “Okay, I’ll go think about it some more.” Her tone is calm, not disappointed. You realize she didn’t come to you for the answer. She needed someone to help her think the problem through.\n\nShe has what she came for.',
          ],
        },
        bxm_gs_affirm_first: {
          text: 'Tell her it took guts to say that, then talk',
          outcomes: [
            'You say, “Knowing exactly where you’re stuck is an important step in itself.” She stares at the desk for a moment, then nods. Then you get into the technical discussion. She’s noticeably more direct than before, as if she has set something down, and she starts to actually settle into the conversation.\n\nAfter a good while, you have a direction.',
          ],
        },
      },
    },

    // ── 8. Sunny steps in ─────────────────────────────────────────────────
    bxm_encourage_others: {
      title: 'Sunny Steps In',
      description: [
        'One of the students in the group has gotten stuck. His project won’t move, and he’s wearing himself down from the inside. You’ve talked to him once, with limited results. That kind of silence is defensive, like a wall; charge at it head-on and you only hurt yourself.',
        'You’re still working out how to approach a second conversation when Sunny walks past your office, pokes her head in, and asks, “Is this about him?”',
        '“I’ll go talk to him. We’re pretty close.” She leaves without waiting for an answer. A while later, you walk past the common area and see him at the whiteboard, which is now covered edge to edge in writing. He looks like a completely different person.',
      ],
      prompt: 'How do you respond to what Sunny did?',
      options: {
        bxm_eo_thank: {
          text: 'Find her and thank her. She really helped',
          outcomes: [
            'Sunny waves it off. “I just kept him company while he got it out. He already knew what to do. He was just bottling it up.” She pauses. “When a professor talks to a student, sometimes there’s a bit of distance. I don’t have as much baggage.”\n\nIt’s blunt, but not a dig at you. She’s just stating a fact. You accept the fact. It feels a little complicated, but you’re also a little glad the lab has her.',
          ],
        },
        bxm_eo_ask_what: {
          text: 'Ask her what she said to him',
          outcomes: [
            '“Nothing special. I just had him walk me through his project from the beginning, and I listened the whole time. Somewhere along the way he figured it out himself.” She adds, “Sometimes people just need an ear. They already have the answer.”\n\nYou quietly make a note of the method for later, then realize, a little guiltily, that you rarely lend anyone that ear.',
          ],
        },
      },
    },

    // ── 9. The limits of optimism ─────────────────────────────────────────
    bxm_optimism_tested: {
      title: 'The Limits of Optimism',
      description: [
        'Sunny has hit several walls lately: a paper rejected, a collaboration that fell through, and a direction she spent two months on overturned entirely in a single discussion. She comes to see you. This time she doesn’t bring bubble tea, and she doesn’t start by repackaging the trouble as “we’ve ruled out a few possibilities.”',
        'She sits down, is quiet for a moment, and says, “Professor, I want to tell you something. I’m not actually as unworried as I look.”',
        '“I just think worrying doesn’t accomplish anything, so I choose not to perform that action. But I can still feel it. Things have been pretty stressful lately.” When she finishes, she looks up at you, waiting for your reaction.',
      ],
      prompt: 'She has taken off part of her armor of optimism. How do you respond?',
      options: {
        bxm_ot_worry_valid: {
          text: 'Sometimes worry is what keeps you going',
          outcomes: [
            'Sunny thinks about it for a while. “Then I need to figure out what exactly I’m worried about first. Otherwise the worry just runs around everywhere and doesn’t help.” Together you list the things she’s most worried about and, for each one, talk about whether there’s anything she can do ahead of time.\n\nShe leaves in better shape than she came in. The worry is still there, but it has been put into boxes, each with a name and a place, and it has become something she can deal with.',
          ],
        },
        bxm_ot_affirm_method: {
          text: 'Not worrying can be rational too',
          outcomes: [
            'Sunny listens and slowly nods. “Okay. Then I’ll keep not worrying.” But her tone is different from usual. There’s more clarity in it, the calm of someone who has thought it through and decided to keep going, not just someone who doesn’t sweat things.\n\nBefore she leaves, she says, “Professor, I’ll still bring bubble tea next time. But now I know bubble tea can’t fix everything.” You nod and tell her to bring it anyway, because you like it. She laughs.',
          ],
        },
      },
    },

    // ── 10. Alumni check-in ───────────────────────────────────────────────
    bxm_alumni_visit: {
      title: 'Alumni Check-In',
      description: [
        'About half a year after she graduated, you get an email from Sunny.',
        'She has joined a nonprofit tech organization. In the email, she says she’s “mainly responsible for keeping the whole team from falling apart, and doing some technical work on the side.” It sounds like more or less the same job she had in the lab, but her tone carries a new certainty, the sense of someone who has found her place, like a person who has finally moved into a room built just for her.',
        'At the end of the email, she says she has put in a word with the head of the organization, who wants to explore a collaboration with the lab. “She’s a really good person. We were having bubble tea and got to talking about your research, and she was interested on the spot.” In parentheses she adds: “(I brought the bubble tea. And this time the data isn’t made up: bubble tea works. Repeatedly validated, p < 0.05.)”',
      ],
      prompt: 'This email is pure Sunny from start to finish. How do you respond?',
      options: {
        bxm_av_embrace_collab: {
          text: 'Move the collaboration forward and thank her for the intro',
          outcomes: [
            'Three weeks later you meet with the director. It goes smoothly, and by the second meeting the collaboration framework is settled. You tell Sunny how it’s going, and she texts back: “Told you. Bubble tea leads the way, every time.”\n\nYou screenshot it, send it back, and say you want to quote it in this year’s annual report. She agrees, on the condition that you buy her dinner when she comes back to visit. You say yes, knowing full well she’ll quietly pay half the bill.',
          ],
        },
        bxm_av_reply_warmly: {
          text: 'Write back first and ask how she’s doing',
          outcomes: [
            'You write a longer reply than usual, asking how things are at the new place and saying you’re glad she has found somewhere that fits. She answers quickly: “All good. People here fall apart pretty easily too, so my skills aren’t going to waste.”\n\nYou smile at that, then think about how the lab still sometimes misses someone to remind everyone that “we actually know each other.” The collaboration moves ahead later too, but you feel this exchange of emails is worth it on its own.',
          ],
        },
      },
    },

    // ── Conference map ────────────────────────────────────────────────────
    bxm_conference_map: {
      title: 'She Knows Who Knows Who',
      description: [
        'During the conference’s low-key lunch break, everyone is standing around chatting with plates in hand, but Sunny is sitting in a corner, scribbling on a paper napkin. You walk over to look. She’s drawing a relationship graph: the circles are names, and the edges are “where they met.”',
        '“Is this… a network graph you made?”',
        '“Mm. There really aren’t that many people in this field,” she says, “and the clustering is super obvious. At the NLP table over there, three of them originally met at the same workshop.” She points at the table, then at her graph. The angles match up.',
      ],
      prompt: 'Sunny has the whole conference mapped out. What do you say?',
      options: {
        bxm_conference_map_use: {
          text: 'Help me meet a few more people',
          outcomes: [
            'You ask if she can introduce you to a few researchers you’re interested in. Sunny immediately flips the napkin over, circles three names with her fingertip, and tells you where each of their directions intersects with your work. Over the next two hours you talk to two of them, one after the other, and both conversations go really well.\n\nBy the time you sit back down, she’s already updating her graph, adding your conversations to it.',
          ],
        },
        bxm_conference_map_research: {
          text: 'This graph could be research in itself',
          outcomes: [
            'You say, “If you collected data on these clustering patterns systematically, you might actually find something.” Sunny’s eyes light up. “Right? And the social patterns should be different at different conferences!”\n\nShe snaps a photo of the napkin on the spot, saves it to her notes app with the label “do this someday,” and goes back to chatting, with a light step, as if the whole thing were just a weekend plan.',
          ],
        },
      },
    },

    // ── Late submission data ──────────────────────────────────────────────
    bxm_late_submit_data: {
      title: 'Late Submissions Seem to Do Better',
      description: [
        'Sunny comes to see you with a stack of conference decisions, wearing the expression of someone who has discovered something she shouldn’t have.',
        '“Professor, I went through everything our group submitted over the past two years, and I found something weird.” She spreads out a table. “Papers submitted in the last twenty-four hours before the deadline have a slightly higher acceptance rate, and a few of the ones we submitted really early actually got rejected.”',
        '“That could just be sampling bias,” you say.',
        '“I know.” She nods. “But what if it’s not a coincidence? Maybe reviewers’ moods have an ordering effect too?” She pauses. “If we turned this into a study, it’d be really fun. But once we had the results, we might not know whether we should make them public.”',
      ],
      prompt: 'Sunny has stumbled onto an interesting but delicate pattern. What do you tell her?',
      options: {
        bxm_late_submit_coincidence: {
          text: 'Don’t overthink it. The sample is too small',
          outcomes: [
            'You tell her the sample is too small and too noisy, and not to read anything into it. Sunny accepts that quickly. She nods, says “Fair,” folds the table back into her bag, and moves on to something else.\n\nSome tiny part of you thinks she might have a point, but you don’t say so.',
          ],
        },
        bxm_late_submit_investigate: {
          text: 'Fun question. Worth a real look',
          outcomes: [
            'You say, “It really is fun. Whatever the answer turns out to be, the effect itself deserves a systematic study. Find a bigger dataset.” Sunny immediately pulls the table back out of her bag, unfolds it, and says, “I’ve already figured out how to scrape conference submission data.”\n\nThe back of the table is densely covered with a study design. She clearly worked it all out before coming in, and has just been waiting for you to say that.',
          ],
        },
      },
    },

    // ── Half-Rapport scene (src/data/events/half_favor.ts) ────────────────
    half_favor_bai_xiaoman: {
      title: 'A Note on Your Desk',
      description: [
        'When you get to the lab in the morning, there’s a sticky note on your desk. Light pink, round bubbly handwriting: “Thanks for working so hard, Professor! Everyone got a lot out of group meeting this week, really!” No signature.',
        'You pick up the note and look at it for a while. Yesterday’s group meeting actually felt a bit flat. You didn’t think you’d done well yourself, and the ending was rushed.',
        'You glance around the room. {studentName} is drinking bubble tea with her head down and her back to you, at an angle that is very deliberate.',
      ],
      prompt: 'You:',
      options: {
        half_favor_bxm_acknowledge: {
          text: 'Thanks, Sunny',
          outcomes: [
            '{studentName}’s shoulders visibly twitch. Then she slowly turns around, her expression extremely firm. “Thanks for what? I don’t know what you’re talking about.” You mention that you’ve seen the same sticky notes in her drawer. She glances down, and the tips of her ears quietly turn red. “That’s… a coincidence.” A pause, then, very seriously: “But whoever wrote it, they meant it.”',
          ],
        },
        half_favor_bxm_reply: {
          text: 'Quietly add a line under the note and put it back',
          outcomes: [
            'Under the note you add a line: “Thank you all too. Everyone worked really hard this week.” You put it back on the desk. In the afternoon, you find another one next to it, light yellow: “Mm-hm!!!” Round bubbly handwriting, still unsigned. You look over the handwriting and decide to stop pretending you don’t know who wrote it.',
          ],
        },
      },
    },

    // ── Max-Rapport scene (src/data/events/max_favor.ts) ──────────────────
    max_favor_bai_xiaoman: {
      title: 'No Deadline Talk Today',
      description: [
        'That morning, the moment you walk into the lab, you find {studentName} blocking the doorway. She has bubble tea in one hand and a bag of desserts in the other, and her expression is as serious as if she were about to make a major announcement: “Professor, no working today.” Before you can say anything, she has pressed the bubble tea into your hand.',
        'At some point a corner of the lab has been turned into a makeshift tea party. Pudding, little cakes, cookies and candy cover a whole table, next to a handwritten sign: DEADLINE-FREE ZONE. NO PROGRESS TALK. VIOLATORS BUY EVERYONE DESSERT. When you ask what this is all about, she says, without a trace of apology, “Because everyone’s been way too tired lately. And Professor, you’re tired too.”',
        'She quickly steers the conversation elsewhere and starts telling you about all the funny things that have happened lately: the lab next door named its servers after an entire encyclopedia of mythical beasts, someone sent their advisor experiment results together with a takeout order, and then there was the legendary group meeting where the projector died and everyone ended up crowded around the whiteboard. The two of you eat and laugh, and the desserts on the table slowly disappear.',
        'Later the conversation turns to one especially brutal submission season. You ask her how she still managed to be so happy every day back then. {studentName} thinks about it. “Because I noticed a pattern. Every time it feels like the sky is about to fall, it actually hasn’t yet.” She takes a bite of cake, then points at the desserts on the table. “And even if it really does fall, you can at least have a bite first, right?”',
        'Sunlight comes in through the window and lands on the bubble tea cups and dessert boxes. {studentName} smiles, her eyes curving into crescents, as if she has gently smoothed out the exhaustion of the whole lab. It suddenly occurs to you that this has probably been her greatest skill all along: she always finds a way to make the days a little bigger than the trouble in them.',
      ],
      prompt: '{studentName} pokes the last piece of cake with her fork and asks, “Is it good?”',
      options: {
        max_favor_bxm_good: {
          text: 'Delicious! Let’s order from here again',
          outcomes: [
            '{studentName} immediately pulls up her saved places. “I knew you’d like it, Professor!” The list is packed with notes on dessert shops: “This one is for paper acceptances, this one is for payday, this one is for recovering after a reviewer makes you cry.” You start to suspect she has a matching dessert ready for every situation in life.',
          ],
        },
        max_favor_bxm_you: {
          text: 'You picked it, so of course it’s good',
          outcomes: [
            '{studentName} blinks and suddenly ducks her head to sip her bubble tea. After a while, she says quietly, “Well, obviously.” Then, trying hard to sound casual, she adds, “I spent a long time choosing.” She pushes the last piece of cake toward you. “Since you’re such a smooth talker, Professor, you get an extra piece as a reward.”',
          ],
        },
      },
    },

    // ── New Year gift result (src/data/events/new_year.ts) ────────────────
    new_year_gift_result_bai_xiaoman: {
      title: 'Sunny’s Reaction',
      description: ['When Sunny sees the gift box, she freezes for a second.'],
      prompt: 'Sunny’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'She hugs the box and spins around in delight, then starts peppering you with questions: when did you buy it, how did you pick it, did you just happen to see it while walking by?\n\nFor the whole month after that, you keep finding mysterious little things on your desk: a drink you like, a new snack, an extra umbrella on a rainy day. Every time you ask who left them, she tilts her head. “No idea. Maybe it was the elves.”',
            'Sunny thanks you sweetly. The next day you find a pack of the snack you casually mentioned last week sitting on your desk, next to a cute thank-you note.',
          ],
        },
      },
    },
  },
};
