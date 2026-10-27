import type { CharacterPack } from '../../../types/i18n';

export const guMianmianEn: CharacterPack = {
  profile: {
    name: 'Mina Koo',
    firstName: 'Mina',
    pronoun: 'she',
    tagline: 'Not asleep. Running in the background.',
    bio: 'By general agreement, the person in the lab who sleeps the most. She once slept through twenty minutes of a group meeting, woke up, and pointed out the critical bug in the presentation. Nobody knows whether she’s asleep or doing some kind of low-power thinking.',
    farewell: 'Even when I was asleep, I was listening.\n\nThank you for making it quiet enough here. Quiet enough that I wanted to stay for good.',
  },
  events: {

    // ── Personal events (src/data/events/students/gu_mianmian.ts) ──────────

    gmm_first_meeting: {
      title: 'First Impressions: Mina',
      description: [
        'You go to talk to Mina Koo about joining the lab. She is slumped over her desk with her hood pulled over her entire head, one hand resting on the keyboard. The monitor is on. There is no sign of human life.',
        'You clear your throat. She lifts her head, and her eyes are so alert that you briefly question your grip on reality. The first thing she says is: “You’re here about which framework to use, right? I think JAX has a trap here, look—” She flips her notebook open to a specific page and launches straight in.',
        'You haven’t said a word. You haven’t even sat down.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_first_meeting_normal: {
          text: 'Go with it. Act like this is normal.',
          outcomes: [
            'You talk for quite a while. Every call she makes about frameworks is accurate to an unnerving degree. When you’re done, she yawns and pulls the hood back over her head. “If that’s all, I’ll keep going.”\n\nOn your way out, you still can’t tell whether “keep going” meant working or sleeping, or whether for her those are the same thing.',
          ],
        },
        gmm_first_meeting_ask: {
          text: 'Is she human, or…',
          outcomes: [
            'You ask whether she was actually asleep just now. She gives it serious thought and answers, “Not sure.” A pause, then: “But the conclusion should be right.” She pulls the hood back over her head and enters another round of “not sure.”\n\nYou stand there and realize you can’t even come up with a follow-up question.',
          ],
        },
      },
    },

    gmm_group_meeting_nap: {
      title: 'A Background Process in Group Meeting',
      description: [
        'Friday group meeting, halfway through a presentation. You glance over at Mina. She is leaning back in her chair, eyes closed, chin dipped at a dangerous angle, laptop screen gone dark. The three people around her have silently agreed not to wake her.',
        'The talk ends and everyone gets ready to leave. Mina opens her eyes, yawns, raises a hand and says, “The ablation on slide 17. The random seed isn’t fixed. The error bars in the figure don’t match the text.”',
        'The presenter flips back to slide 17. They don’t match. The room goes quiet for a moment, quiet in a slightly supernatural way.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_group_meeting_ignore: {
          text: 'Pretend it was a dream. Meeting over.',
          outcomes: [
            'In the hallway, someone asks you quietly, “Was Mina asleep just now, or…” You say you don’t know. They nod, wearing exactly the same expression as you: the face of someone who has seen a ghost and can’t prove it.\n\nMina is already gone with her backpack, faster out the door than anyone.',
          ],
        },
        gmm_group_meeting_praise: {
          text: 'Canonize her: patron saint of group meetings',
          outcomes: [
            'You say, “Good catch, Mina.” She looks up, a little dazed, as if only now realizing she said something out loud. “Oh,” she nods. “Then I’ll head out.” The presenter is already rerunning the experiment and does not look happy.\n\nYou think this may be the most cost-effective quality control the lab has.',
          ],
        },
      },
    },

    gmm_gossip_oracle: {
      title: 'She Already Knew',
      description: [
        'Just this morning you heard a sensitive piece of gossip: a certain professor’s project is about to go under, and the funding is running out. The news only started going around this morning. You could count the people who know on your fingers.',
        'In the afternoon you run into Mina and ask, offhand, “Anything going on lately?” She yawns. “That project? Their funding’s been in trouble for three months. Last month they even tried to borrow our server quota, you know?”',
        'You didn’t know. You had no idea. You are at least ninety days behind her.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_gossip_ask_source: {
          text: 'Is she human, or…',
          outcomes: [
            'You ask where she heard it. She tilts her head, thinks, and says, “Don’t know. Maybe I heard it in a dream.” Then she adds, “Keep an eye on the server quota. They might come back.”\n\nBy the time she finishes, her eyes are already drifting shut. She can drop into a background process standing up, right in front of you.',
          ],
        },
        gmm_gossip_use_intel: {
          text: 'Appoint her Chief Intelligence Officer, effective now',
          outcomes: [
            'You ask what else she knows. She closes her eyes, yawns, and in a voice somewhere between dreaming and awake, lists two more things you didn’t know, complete with sources and timelines, accurate enough to be unsettling.\n\nYou stand in the hallway taking careful notes, with the vague feeling that you are interviewing an information system that runs without being plugged in.',
          ],
        },
      },
    },

    gmm_dream_solution: {
      title: 'Green Logs at 3 a.m.',
      description: [
        'At 9 a.m. you see a message from Mina: “That dataloader deadlock. Figured out the cause in a dream last night. It’s a race between num_workers and shared memory. I changed it, take a look.”',
        'Attached is a terminal screenshot. All green, loss curve going down the way it should. Timestamp: 3:20 a.m.',
        'You look at the bug. This thing has had you all stuck for almost two weeks.',
      ],
      prompt: 'How do you reply?',
      options: {
        gmm_dream_shocked: {
          text: 'Is dream-driven development even allowed?',
          outcomes: [
            '“Yeah,” she replies. “I was running experiments in the dream and saw the worker handles weren’t being released properly. Fixed it when I woke up.” You stare at the message for a long time and finally reply, “…ok thanks.”\n\nShe doesn’t answer. Probably asleep again: she left the fixed code here in reality and went back to the background.',
          ],
        },
        gmm_dream_record: {
          text: 'Make sleep-driven development official',
          outcomes: [
            '“Good idea,” she says. “That’s how I’ve always used it.” A pause, then: “Though sometimes the dream introduces new bugs, so you still have to run the tests after you wake up.”\n\nYou realize you are seriously discussing a dream CI/CD pipeline, and that its logic is completely self-consistent.',
          ],
        },
      },
    },

    gmm_mystery_nap: {
      title: 'Two Missing Hours',
      description: [
        'From 2 to 4 p.m., Mina vanishes off the face of the earth. Her desk is empty, her jacket is still on the back of her chair, her phone is still here, and the water in her cup is still warm. Every sign suggests she existed until fairly recently.',
        'At 4 on the dot she walks back in with a pillow crease on her face and her hair flattened in one direction, a stack of printouts under her arm, and goes straight back to her desk.',
        'You lean over to look. It’s a complete analysis of an experiment plan, with data, figures and conclusions. Print timestamp: 3:47 p.m. She gets more done asleep than you do awake.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_mystery_ask_where: {
          text: 'Press her: where were those two hours?',
          outcomes: [
            '“Took a nap,” she says, and fixes something with her pen. “Where?” “There’s a couch at the end of the hallway.” You think about it. There really is a couch at the end of the hallway. You’ve been here all this time, and only today did you learn that someone uses it as a bed.\n\nYou go back to your desk and don’t ask anything else. There is some infrastructure around here she knows better than you do.',
          ],
        },
        gmm_mystery_just_report: {
          text: 'Log the disappearance. Read the report first.',
          outcomes: [
            'You take the report and read it through. Clear structure, accurate conclusions. You change two punctuation marks. Then you send it to the group, and the email says nothing about her two unaccounted-for hours.\n\nSome phenomena only need to be recorded, not explained.',
          ],
        },
      },
    },

    gmm_code_quality: {
      title: 'The Code With No Comments',
      description: [
        'Mina pushes a branch. You open it: three hundred lines of code, and exactly one comment: “Functionality: see variable names.”',
        'And the variable names really do explain the functionality. `stale_grad_accumulator`, `fence_before_sync`, `shadow_buffer_offset`: every name is precise enough to need no explanation. The functions are cleanly split, the edge cases are all handled, and the logic reads straight through in one pass, like a book you can follow without page numbers.',
        'Commit timestamp: 1:30 a.m. yesterday. All through group meeting yesterday morning she kept her eyes closed, and you assumed she was having an off day.',
      ],
      prompt: 'How do you review it?',
      options: {
        gmm_code_ask_comments: {
          text: 'Standards first. Add comments.',
          outcomes: [
            'She replies “ok,” and two hours later pushes a new commit. Every comment is filled in, each one precise and written in the same style as the variable names. The only issue is one extra line under `handle_edge_case_7`: “I’ve seen this case in a dream twice.”\n\nYou stare at this comment for a long time and finally decide to keep it.',
          ],
        },
        gmm_code_merge: {
          text: 'The variable names are the docs. Merge it.',
          outcomes: [
            'You approve it with the comment “Nice variable naming.” She replies, “Thank you.” When the others see the merge, they open the code, read it for a long time, then post in the group chat: “When did she write this?”\n\nNobody can answer, because 1:30 a.m. is not a time slot anyone has memories of.',
          ],
        },
      },
    },

    gmm_debug_assist: {
      title: 'Five Seconds to Look, One Minute to Answer',
      description: [
        'A bug has had you stuck for three days. You’ve gone through the logs over and over, printed the stack traces, tried several ways to reproduce it, and gotten nowhere. You take your laptop over to Mina.',
        'She takes it and glances at the error for a few seconds at most. Then she hands the laptop back, closes her eyes, and her chin sinks, as if she has switched into some kind of internal search mode.',
        'A moment later she opens her eyes and names a root cause you never would have thought of, down to the exact call path and trigger condition, three orders of magnitude clearer than your own understanding.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_debug_thanks: {
          text: 'Say thanks and go fix the bug',
          outcomes: [
            '“You’re welcome,” she says, then pulls her hood down over her head, and her desk returns to its unoccupied state. You go fix the bug. Ten minutes, done.\n\nIn your head, you thank someone who may or may not currently be awake.',
          ],
        },
        gmm_debug_how: {
          text: 'Dig deeper: how does this black magic work?',
          outcomes: [
            'She tilts her head and thinks it over seriously. “There’s a lock in the call path that never gets released. I’ve seen that pattern before. Maybe in some dream.”\n\nYou look at her for a while, then decide to get a proper night’s sleep tonight and try it out as a learning method.',
          ],
        },
      },
    },

    gmm_missing_at_deadline: {
      title: 'Missing the Day Before the Deadline',
      description: [
        'The day before the deadline, Mina vanishes off the face of the earth. Empty desk, no hoodie, no phone on the desk, messages delivered and unanswered. You ask around. Someone saw her this morning; someone else thinks she may never have come in. The eyewitness accounts fail to reach consensus.',
        'A strange quantum superposition hangs over the lab: she is both in the lab and not in the lab, and nothing is settled until someone observes her.',
        'Two hours before the submission deadline, she walks in, plugs in her laptop, and uploads a data package: the most complete experimental results in the group, neatly labeled, with full baseline comparisons and a one-page summary, formatted even more cleanly than the template.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_deadline_ask: {
          text: 'You need to know where she was yesterday',
          outcomes: [
            '“Sleeping at home,” she says. “About sixteen hours. Woke up twice to run some experiments, then went back to sleep.” You take a moment to digest this workflow: submit jobs before bed, collect results on waking, sleep again.\n\nYou realize this is a kind of asynchronous human you have never encountered before. She has already opened the next file.',
          ],
        },
        gmm_deadline_praise: {
          text: 'Where she was doesn’t matter. Results do.',
          outcomes: [
            'You praise her. “Thank you,” she says, then lays her head on the desk and completes shutdown within three minutes. You look through the report for a long time. Most complete data in the group.\n\nIn your head, you permanently delete the reminder “Nudge Mina before deadlines.”',
          ],
        },
      },
    },

    gmm_knows_everything: {
      title: 'You Didn’t Tell Anyone',
      description: [
        'Last week you had a private conversation with another professor. It was sensitive: an empty conference room, door closed, blinds drawn, just the two of you.',
        'At lunch today, Mina is yawning when she says, offhandedly, “That equipment-sharing plan you discussed with the lab next door. What do you think of it?”',
        'She mentions a detail. That detail came up only in the conversation you had in that room.',
      ],
      prompt: 'What do you do?',
      options: {
        gmm_knows_ignore: {
          text: 'Pretend it was a dream. Change the subject.',
          outcomes: [
            'You change the subject as if nothing happened. She doesn’t press, just keeps yawning. Back at your desk, you sit for a while and replay that conference room in your head. The blinds were drawn. The door was closed. Your phone never rang once.\n\nIn the end you decide not to think about it any further. With some things, knowing the answer would be more unsettling than not knowing.',
          ],
        },
        gmm_knows_ask: {
          text: 'Ask her to her face: how did she know?',
          outcomes: [
            'She is caught off guard for a second, tilts her head, thinks it over seriously, and says, “I don’t know… maybe I heard something while I was asleep somewhere last week. Not sure.” She can’t work out where the information came from either.\n\nYou look at her for a while and decide to accept that answer, because you don’t quite dare to think the other explanation through.',
          ],
        },
      },
    },

    gmm_alumni_visit: {
      title: 'A Collaboration Invite at 4 a.m.',
      description: [
        'Half a year has passed since she graduated. Every so often you see Mina’s name in a journal, more often than you expected, always as first author. Someone tells you she is famous for sleeping at that institute too. Nobody in her group is sure when she’s awake. The only sure thing is that results show up on their own.',
        'This morning you open your email and find a message from her, subject line: “Collaboration proposal: equipment sharing and joint modeling.” It’s thorough, with a concrete plan, milestones and expected outputs, and it CCs exactly the right three people.',
        'Timestamp: 4:03 a.m. today. The last line reads: “Reply whenever it’s convenient. No rush. I’m probably asleep right now.”',
      ],
      prompt: 'How do you reply?',
      options: {
        gmm_alumni_accept: {
          text: 'Reply and accept the collaboration',
          outcomes: [
            'You send your reply and CC the relevant people. Then nothing for most of the day, until in the evening a revised draft of the collaboration agreement appears in your inbox, fully formatted, every clause clear, with one small line at the bottom: “Woke up and fleshed out the plan a bit.”\n\nYou decide that from now on, if you need something from her urgently, you won’t write “Please reply ASAP.” You’ll write “Reply when you wake up.”',
          ],
        },
        gmm_alumni_reply_friendly: {
          text: 'Ask how she’s been first',
          outcomes: [
            'You write a fairly casual reply asking how she’s doing. Her answer comes several hours later: “Pretty good. Three papers out so far. The couch here is way softer than the one in our hallway. Professor, did they ever replace our couch?”\n\nYou go out to the hallway to look. Not replaced. Still the same one, except that since the girl who used to nap on it left, it has gathered a thin layer of dust.\n\nYou message her that it’s still there. She replies with a happy emoji, as if knowing that was enough.',
          ],
        },
      },
    },

    gmm_whiteboard_mystery: {
      title: 'The Whiteboard Is Blank',
      description: [
        'Last week you left a derivation on the whiteboard, the kind everyone in the lab knows is “important, do not erase,” with a sticky note beside it that said “Please don’t erase.” This morning you walk in to a spotless whiteboard. The sticky note is on the floor.',
        'Mina is sitting at her desk with her hood over her head. Everything around her is as usual. You look around. There are no other suspects.',
        '“Mina, the whiteboard…” you begin. The hood moves slightly and a voice comes out of it: “I took a photo and sent it to you. Last night I noticed a step was wrong, so I fixed it for you, and erased it after.”',
        'You check your phone. There is a photo: the complete derivation, plus a correction in red pen. The correction is right.',
      ],
      prompt: 'Mina has secretly edited your whiteboard. What do you do?',
      options: {
        gmm_whiteboard_thank: {
          text: 'Thanks, that’s a good fix',
          outcomes: [
            'You say, “The fix is right. Thanks.” The hood moves a little, and from it comes, “Good.” That’s the end of it.\n\nStanding in front of the pristine whiteboard, you realize some more efficient mode of collaboration may have been running here on its own for quite a while, and you never noticed.',
          ],
        },
        gmm_whiteboard_curious: {
          text: 'Wait, this pattern is actually interesting',
          outcomes: [
            'You sit down and ask her whether this pattern, “written on a physical medium, used as scratch space, then gone,” is common. Mina lifts her head out of the hood, thinks for a moment, says, “Average whiteboard lifespan in our group is about three days,” and pulls up a spreadsheet of survival times for whiteboard content, data she had collected without really meaning to.\n\nYou announce on the spot that this should be a research project.',
          ],
        },
      },
    },

    gmm_server_prophecy: {
      title: 'She Knew the Server Would Go Down',
      description: [
        'The server goes down at 3 p.m., right in the middle of your experiments. All progress is lost. Everyone is complaining in the group chat, and IT says it’s an unknown error that will take a few hours to diagnose.',
        'You go ask Mina whether she backed up her experiments. A voice comes from inside the hoodie: “I backed up this morning.”',
        '“Why this morning?”',
        '“Had a feeling it would go down today.”',
        'You pause. “…A feeling?”',
        '“Mm. The CPU fan noise was at the wrong frequency, there were two disk latency spikes yesterday, and today’s Wednesday. Historically, Wednesday has the highest crash rate.” The hood gives a small shrug. “It’s not mysticism. It’s statistics.”',
      ],
      prompt: 'Mina is passing off statistics as a hunch. What do you do?',
      options: {
        gmm_server_relief: {
          text: 'Impressive. Teach me next time.',
          outcomes: [
            'You say, “Your premonition model is really accurate. Give us a heads-up next time.” She answers with a small “mm.” The next day a new shared doc quietly appears in the group: a “Downtime Risk Calendar,” with data sources and confidence intervals noted.\n\nNobody knows when it was created, and nobody has lost work to a crash since.',
          ],
        },
        gmm_server_formalize: {
          text: 'These stats are worth studying',
          outcomes: [
            'You ask whether she could turn this judgment process into a system. She lifts her head out of the hoodie, thinks for a moment, and says, “Sure. I’ve been keeping records.” She opens a local file: more than a year of server anomaly signals logged against downtime, absurdly detailed. You open a project doc right there and start organizing it.\n\nNot long after, someone from the campus server room walks by and asks what you’re working on. Mina explains it in three sentences. Five seconds of silence, then: “Could we use this? Every time we go down, we have to reimburse every group for the electricity their experiments used.” Mina lifts her head out of the hoodie and quotes a service fee, down to the last dollar. You and she exchange a look. She has already pulled her hood back down.',
          ],
        },
      },
    },

    // ── Half-favor event (src/data/events/half_favor.ts) ──────────────────

    half_favor_gu_mianmian: {
      title: 'What {studentName} Said Before Falling Asleep',
      description: [
        'In group meeting one day, a single problem has been going in circles for almost twenty minutes. You are about ready to set it aside until next week.',
        '{studentName} is leaning back in her chair, eyes half closed, by all appearances already mostly in a dream.',
        'Just as you’re about to say “Let’s stop here,” she speaks up, eyes closed, voice low: “Just use a sliding window.”',
        'The room goes quiet. You follow the idea through. She’s right. Everyone starts to say something, then turns to look at her. She has genuinely fallen asleep, her head resting lightly on the back of her hand.',
      ],
      prompt: '{studentName} is asleep, and her idea works. You:',
      options: {
        half_favor_gmm_whiteboard: {
          text: 'Write her solution on the whiteboard and credit her',
          outcomes: [
            'When the meeting ends, {studentName} slowly opens her eyes and sees her solution written clearly on the whiteboard, with a circled note beside it: “Mina, best comment of the day.” Her eyes crinkle a little. “Glad it works.” She picks up her drink, takes a sip, and goes back to staring into space.',
          ],
        },
        half_favor_gmm_continue: {
          text: 'Keep going and tell her when she wakes up',
          outcomes: [
            'By the time {studentName} wakes up, you’ve moved on by two problems. You tell her the idea really worked. She says “mm,” thinks about it, and says, “I think I came up with it in my dream too, but I forgot the dream version.” You don’t press, but you can’t shake the feeling that her dreams may be more productive than her waking hours.',
          ],
        },
      },
    },

    // ── Max-favor event (src/data/events/max_favor.ts) ────────────────────

    max_favor_gu_mianmian: {
      title: '{studentName}: A Good Place for Sitting in the Sun',
      description: [
        'On Wednesday afternoon, {studentName} sends you a message.',
        'It’s short: “Professor, I know a really good place for sitting in the sun.” A little later, another line: “The sun is especially nice today.”',
        '',
        'The place turns out to be a small grassy slope on the west side of campus. When you get there, {studentName} is already sitting there with two drinks and a bag of snacks beside her. She waves, hands you one of the bottles, and, without a word about it, shifts over a little to make room.',
        '',
        'The afternoon sun is warm. Cheers drift over now and then from the athletic field; someone must have gotten another nice hit. The wind moves across the grass and smells faintly of sunshine. You talk about nothing in particular, drifting from experiments to group meetings, from some paper to the new bubble tea place on campus.',
        '',
        '{studentName} doesn’t usually say much, but today she seems to be in a good mood. She talks about when she first joined the lab, about being so nervous before her first presentation that she couldn’t sleep, about the time an experiment was stuck for two weeks and she finally found the fix after waking up from a nap. As she talks, she ends up laughing at herself. “I think my biggest contribution in this whole PhD is proving that sleep is useful.”',
        '',
        'After a while the conversation slowly winds down. The sun feels nice, and so does the wind. You look down at your phone to answer a few messages, and when you look up again, {studentName} has fallen asleep leaning against the bench.',
        '',
        'She is still holding the bag of snacks, her drink by her feet, her eyelashes casting faint shadows in the sunlight. It’s quiet, apart from the occasional sound from the ball field in the distance. It occurs to you that she didn’t ask you here to say anything especially important.',
        '',
        'She just wanted to give you a little of this afternoon.',
      ],
      prompt: '{studentName} is asleep. You:',
      options: {
        max_favor_gmm_wait: {
          text: 'Just sit and wait for her to wake up',
          outcomes: [
            'You don’t wake her. You just sit quietly beside her. A long while later, {studentName} slowly opens her eyes, sees that you’re still there, and visibly freezes for a second. She holds her drink and stares into space for a bit, then laughs softly. “Professor, I just had a good dream.”',
          ],
        },
        max_favor_gmm_snack: {
          text: 'Open the snacks and start eating',
          outcomes: [
            'By the time {studentName} wakes up, the sun has slipped a little further west. She notices the snacks are open, doesn’t mind at all, and holds the bag while she eats, slowly. She says whatever comes to mind, a bit of this and a bit of that: her first presentation in the group, an experiment that got stuck, that paper she revised more than a dozen times. Her words come in fragments, without much order, but you feel you understand exactly what she means.',
          ],
        },
        max_favor_gmm_photo: {
          text: 'Quietly take a photo of the scene',
          outcomes: [
            'Sunlight, grass, drinks, and {studentName} asleep with her guard completely down: it looks like something out of a campus promo video. Later, when she wakes up and finds the photo, her ears turn red. “Professor, delete that.” A pause, then: “At least don’t post it in the group chat.”',
          ],
        },
      },
    },

    // ── New Year gift reaction (src/data/events/new_year.ts) ──────────────

    new_year_gift_result_gu_mianmian: {
      title: 'Mina’s Reaction',
      description: ['Mina is slumped over her desk. She lifts her head, still half asleep, and sees the gift box.'],
      prompt: 'Mina’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Mina stares at the box for several seconds, like she has just woken up and hasn’t finished loading. She unwraps it and hugs the box to her chest.\n\nYou are about to say something when she suddenly stands up and says quietly, “I’m going back to my room for a bit.” You ask what’s wrong. She heads out with the box in her arms, her voice soft and floaty: “I’m kind of happy.”\n\nThe next day, passing her desk, you notice the wrapping paper folded neatly in her drawer and the gift in the most visible spot on her desk.',
            'Mina says thank you, puts the box away, and lays her head back down on the desk. Two hours later you walk past and find she is using the box as a pillow.',
          ],
        },
      },
    },
  },
};
