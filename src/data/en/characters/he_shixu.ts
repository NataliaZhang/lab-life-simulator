import type { CharacterPack } from '../../../types/i18n';

export const heShixuEn: CharacterPack = {
  profile: {
    name: 'Serena Ho',
    firstName: 'Serena',
    pronoun: 'she',
    tagline: 'Professor, is the part you promised me done?',
    bio: 'Other people run their research on inspiration. She runs hers on a plan. The latest version of her schedule is always on her desk, accurate to the minute, and the schedule includes her advisor.',
    farewell: 'I like doing things in order, the way the schedule says.\n\nThere was only one day I kept putting off scheduling: the day I graduate and say goodbye to you.',
  },
  events: {
    // ── 1. First meeting ──────────────────────────────────────────────────
    hsx_first_meeting: {
      title: 'The Onboarding Plan',
      description: [
        'Serena sits down and places a bound document on your desk. You open to the first page. Milestones broken down by month, every phase with deliverables and acceptance criteria, formatted almost exactly like an export from professional project-management software.',
        'On the last page there’s a field labeled “Advisor confirms milestone dates,” left blank for you. She glances through her notebook and asks, as calmly as if she were asking about the weather, “Professor, would now be a good time to confirm this item? Once it’s filled in, I’ll sync it to the shared calendar for you.”',
        'That’s when it dawns on you: you are one of the dependencies in this plan.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_first_meeting_fill: {
          text: 'Dutifully fill it in (you’re under management now)',
          outcomes: [
            'You fill in the dates. Serena immediately annotates them, closes the document, and looks up. “Thank you, Professor. I’ll remind you three days before each milestone.”\n\nYou nod. Then it slowly sinks in that you just signed, without reading the fine print, a contract containing your own deadlines.',
          ],
        },
        hsx_first_meeting_flexible: {
          text: 'No need to be strict about dates (attempt resistance)',
          outcomes: [
            'Serena pauses and glances through her notebook, her tone as calm as ever. “Professor, I understand research involves uncertainty, so every milestone has a two-week buffer. If needed, we can add another week.” She turns to the appendix.\n\nA detailed explanation of the buffers has been there all along. She saw your resistance coming and defused it in advance.',
          ],
        },
      },
    },

    // ── 2. Reminding the advisor of a deadline ────────────────────────────
    hsx_ddl_reminder: {
      title: 'You Said This Week',
      description: [
        'Last week you promised to look at Serena’s revised draft and get back to her this week. You forgot.',
        'Today there’s a new message waiting for you, sent at 9:00 a.m. sharp. “Professor, last time you mentioned you’d send revision comments this week. There are three days left in the week. If it’s easier, you could send high-level direction first and the details later.”',
        'Not one word of nagging. The information density of a precision-guided missile.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_ddl_read_now: {
          text: 'Drop everything and reply today',
          outcomes: [
            'You dig out the draft and send detailed comments two hours later. She replies, “Received, thank you.” The next morning the revised version arrives with a neatly organized change list, every comment mapped to its location in the text.\n\nYou were supposed to be the one chasing drafts. Instead you got chased, and all you did was help her hit her own milestone. Right on target.',
          ],
        },
        hsx_ddl_delay: {
          text: 'Negotiate an extension',
          outcomes: [
            'You explain that things have been busy and you’ll get it to her next week. She replies, “Sure, I’ve made a note on next Monday in the calendar. If that day works, that would be great.” You open the shared calendar. Next Monday now has an entry, “Advisor feedback on revised draft,” added by her.\n\nYou quietly move a few other things off that day.',
          ],
        },
      },
    },

    // ── 3. The Gantt chart arrives ────────────────────────────────────────
    hsx_gantt_chart: {
      title: 'The Gantt Chart',
      description: [
        'After group meeting, you casually ask Serena how things are going. She says, “Let me send it to you.”',
        'You expect a few lines of text. You get a chart: a timeline down to the day, color-coded by task type, solid blocks for completed work, dashed boxes for what’s pending, and a deliverable labeled at the end of every bar.',
        'One color block has its own label, “Advisor review window.” It recurs regularly, two to three days each time. She has built a task bar just for your feedback.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_gantt_accept: {
          text: 'Admit this thing is actually useful',
          outcomes: [
            'You reply that the chart is very clear. She glances through her notebook. “Then next time I’ll fix your window to a set time slot. It’ll be easier to plan around.” You mean to say there’s no need to be so formal, but what comes out is “Sure.”\n\nAnd just like that, your feedback time is officially part of her project management system.',
          ],
        },
        hsx_gantt_too_detailed: {
          text: 'You don’t need to get this detailed',
          outcomes: [
            'She pauses. “Professor, the chart is mostly for me. When tasks pile up, it lets me see at a glance which ones can slip and which can’t.” She glances through her notebook and adds, “I can make your window looser so it doesn’t affect you.”\n\nYou don’t say anything more. There is no arguing with that.',
          ],
        },
      },
    },

    // ── 4. Taking over the lab calendar ───────────────────────────────────
    hsx_takes_over: {
      title: 'The Shared Lab Calendar',
      description: [
        'You open the shared lab calendar and find a lot of new entries this month: every student’s group meeting presentation slot, weekly equipment booking windows, and a recurring monthly “Lab Maintenance Day.”',
        'You click on one to see who created it: Serena. Another one: Serena. That includes your own “Advisor feedback window,” twice a week, three hours each, with a note: “If you have other plans, please let me know in advance and I’ll adjust.”',
        'You didn’t set any of this up. She did. The lab’s schedule has been put in order without your knowledge.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_takes_over_accept: {
          text: 'The lab needs people like you',
          outcomes: [
            'You message her that this is really useful and ask her to keep maintaining it. She replies, “Sure. I’ll update it at the start of every month. Let me know anytime if something comes up.”\n\nAfter that, the lab’s scheduling gets noticeably more efficient. Nobody ever asks “Who’s in charge of scheduling group meetings?” because nobody needs to.',
          ],
        },
        hsx_takes_over_discuss: {
          text: 'Call a meeting first. Due process.',
          outcomes: [
            'She glances through her notebook and nods. “Okay. I’ll organize a ten-minute briefing next Wednesday, before group meeting.” Before you’ve even said yes, the calendar has a new entry, “Schedule Management Briefing (10 min),” and everyone has received an invite.\n\nAt the meeting, the whole group approves it unanimously, and two people suggest additions. Serena writes them down carefully and has everything updated by the next day.',
          ],
        },
      },
    },

    // ── 5. Flawless execution ─────────────────────────────────────────────
    hsx_perfect_execution: {
      title: 'On Time, Above Expectations',
      description: [
        'You notice something. Serena’s tasks never run late, and her deliverables are always more complete than expected. At first you assumed it was coincidence. Eventually you accepted the truth: it’s a system.',
        'Stranger still, you’ve started checking her progress first, without meaning to, and adjusting your expectations for everyone else accordingly. If she’s moving forward, the direction is viable. If she’s flagged a risk, that risk is almost certainly real.',
        'You realize she has become your live dashboard for the state of every project. You’ve just never told her.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_execution_tell_her: {
          text: 'Tell her straight: she’s the lab’s anchor',
          outcomes: [
            'She pauses, glances through her notebook, and looks up. “Thank you, Professor. If there’s anything I can help coordinate, please let me know.” Her tone is no different from usual.\n\nBut when she looks down to take notes, you notice she writes one extra line. The writing is small, and you can’t make out what it says.',
          ],
        },
        hsx_execution_challenge: {
          text: 'Raise the bar: stress test at double difficulty',
          outcomes: [
            'You propose a direction roughly twice as complex. She listens, glances through her notebook, and is silent for a full two seconds. Then: “Okay. I’ll do a feasibility assessment first and have it to you next Wednesday. Would you like me to list the uncertainties as well?” You say yes. She closes the notebook, says “Okay,” and gets to work.\n\nThose two seconds were the entirety of her hesitation.',
          ],
        },
      },
    },

    // ── 6. Reverse push ───────────────────────────────────────────────────
    hsx_reverse_push: {
      title: 'The Recommendation Letter Outline',
      description: [
        'Serena is applying for a fellowship and needs a recommendation letter from you, due in three weeks. You’ve been keeping it in mind but haven’t started.',
        'Today she sends a message. “Professor, the recommendation letter is due in three weeks. I’ve drafted an outline for you with a few specific examples you could expand on. You’d only need to fill in the details and sign. I estimate it’ll take you about thirty minutes. I can send it over if that would help.”',
        'She isn’t pushing you. She has simply eliminated every excuse you had to procrastinate.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_reverse_push_accept: {
          text: 'Take the outline (grateful to be managed)',
          outcomes: [
            'The file arrives: clean formatting, clearly marked blanks, and examples framed from exactly the right angle. It takes you twenty-five minutes to fill in, less than she estimated. After sending it off, you message her, “Done.” She replies, “Thank you, Professor.”\n\nYou sit back in your chair for a while. You helped her, but she helped you more.',
          ],
        },
        hsx_reverse_push_self_write: {
          text: 'Write it yourself, ask her for materials',
          outcomes: [
            'She pauses. “Sure. I’ll put the materials together and send them over. If you want the outline, just let me know.” The next day she sends an extremely thorough package: project list, publication record, and a personal statement outline, all with properly formatted citations.\n\nYou write the letter from that. When you’re done, you notice the structure is more or less identical to her outline. She just found another way to get you to the same result.',
          ],
        },
      },
    },

    // ── 7. Can’t stand chaos ──────────────────────────────────────────────
    hsx_chaos_intolerance: {
      title: 'Lab Operations: Issue List',
      description: [
        'Things haven’t been going well in the lab lately. Some people are waiting on data, some are waiting on feedback, and some don’t know what their priorities are. You’ve been handling one ad-hoc situation after another, and you’re running on fumes.',
        'Serena comes to talk to you. She sits down and places a document on the desk. “Professor, I’ve put together a list of current issues with lab operations. Do you have time to take a look?”',
        'You open to the first page. Item one: “Advisor energy may be insufficient (Recommendation: reduce ad-hoc tasks, schedule fixed deep-work hours).” There are six more after it. You are item number one.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_chaos_read: {
          text: 'Read it carefully and work out fixes together',
          outcomes: [
            'Seven items, every one of them on point, each with a recommended action. You talk it over with her for a while and settle on three things you can change right away. Taking notes, she says, “I’ll keep an eye on it for you this week. Next week we can see whether it’s improved.”\n\nYou nod, and realize that having someone turn your problems into a list is already the most labor-saving kind of help there is.',
          ],
        },
        hsx_chaos_dismiss: {
          text: 'Thanks, but that’s management’s job',
          outcomes: [
            'She pauses, then says calmly, “Professor, I mainly put this together to make my own work go more smoothly, not to add to your workload. If it’s not appropriate, I can keep only the parts that directly concern me.” She takes the document back.\n\nYou sit there, slowly going back over the items she mentioned. Two of them you really should have dealt with a while ago.',
          ],
        },
      },
    },

    // ── 8. Worried about your overtime ────────────────────────────────────
    hsx_overtime_concern: {
      title: 'The Sticky Note',
      description: [
        'You’ve been leaving late for several days in a row, sometimes writing, sometimes dealing with a pile of emergencies.',
        'Yesterday evening, when Serena left, you were still at your desk. This morning when you get to the office, there’s a sticky note on your door, in neat blue handwriting:',
        '“Professor, a sustainable work pace produces more over the long run than short-term sprints. That’s not my opinion, it’s the conclusion of a meta-analysis. I can send you the DOI if you’d like. Please make sure you get some rest. —Serena”',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_overtime_moved: {
          text: 'It got to you. Text her a thank-you.',
          outcomes: [
            'You text her, “Thank you. I saw the sticky note.” She replies, “I can send the DOI if you want. The data in that paper is pretty solid.”\n\nYou smile, fold the sticky note, and put it in your drawer. That afternoon you leave at six, the earliest all week.',
          ],
        },
        hsx_overtime_soon_over: {
          text: 'Explain: it’s temporary, two more weeks',
          outcomes: [
            'You tell her a project is wrapping up and things will settle down in two weeks. She replies, “Okay. I’ll push next week’s advisor review window to the week after, to give you some room.” You open the calendar. The entry has already been moved, with a note: “To be restored.”\n\nYou don’t tell her it’s unnecessary, because you’re genuinely grateful for the breathing room.',
          ],
        },
      },
    },

    // ── 9. Efficiency monster ─────────────────────────────────────────────
    hsx_high_efficiency: {
      title: 'Pipeline Optimization Report',
      description: [
        'You get an email from Serena. Subject: “Experiment pipeline optimization notes (benchmarks attached).” Sent yesterday at 4 p.m.',
        'She found an optimization that cuts runtime by a third and spent one afternoon implementing and validating it. The email includes before-and-after benchmarks: same test environment, adequate sample size, clear conclusions.',
        'The optimization saves nearly two hours per run. It took her half a day, she didn’t bother anyone, and then she sent you an email about it.',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_efficiency_share: {
          text: 'Praise her to the whole lab and roll it out everywhere',
          outcomes: [
            'You share the optimization in the lab group chat, credit Serena, and attach her benchmark report. Two people update their pipelines that same day. Some people message her privately with technical questions, and she answers every one, briefly and precisely.\n\nYou notice she says nothing extra in the group chat, only replying when necessary. Work done, credit received, nothing more to say.',
          ],
        },
        hsx_efficiency_doc: {
          text: 'Have her write it up for future students',
          outcomes: [
            'She glances through her notebook. “Sure. I’ll finish it next week, including when it applies and what to watch out for.” A week later the documentation arrives, clearly structured, even listing three common failure cases and how to handle each.\n\nYou add it to the lab wiki, and a thought crosses your mind: this document will probably be in use much longer than she’ll be in the lab.',
          ],
        },
      },
    },

    // ── 10. Alumni visit ──────────────────────────────────────────────────
    hsx_alumni_visit: {
      title: 'Industry Chaos Index: 1.7×',
      description: [
        'Six months after graduating, Serena sends you an email. Subject: “Wrap-up report on my first project (for reference).”',
        'She’s doing project management at a tech company. Her first project just shipped without a hitch, and her team’s delivery cycle came in 40% shorter than the department average. She has attached a simplified retrospective and says the last section might be useful to you.',
        'You flip to the end. She has compared project management in the lab and in industry, and concludes that “systemic chaos in industry is roughly 1.7 times that of the lab, but the interventions are largely reusable.” The last line: “By the way, my company has a university collaboration program. Contact details are in the attachment, in case you’re interested.”',
      ],
      prompt: 'What do you do?',
      options: {
        hsx_alumni_collaborate: {
          text: 'Reply: you’re interested in collaborating',
          outcomes: [
            'You say you’re very interested and ask her to send details. She replies the same day. The collaboration overview is fully formatted, with contacts, timeline, and expected deliverables all clearly laid out.\n\nLooking at it, you think back to her years in the lab, and it occurs to you that wherever she goes, she seems to do the same thing: the people around her end up organized whether they planned to or not. The collaboration did go ahead.',
          ],
        },
        hsx_alumni_reply_congrats: {
          text: 'Congratulate her first and ask how she’s doing',
          outcomes: [
            'You send a relaxed reply, congratulating her on the smooth delivery and asking how she’s settling in. She replies, “Not bad. Mostly a lot of meetings, so I have to maintain an extra meeting-efficiency tracker.” Then she adds, “Is the lab’s shared calendar system still in use? If any new students can’t figure it out, they can contact me.”\n\nYou look at the calendar. The system is still running, perfectly fine. You sort of want to tell her, but you suspect she already knows.',
          ],
        },
      },
    },

    // ── TODO analysis ─────────────────────────────────────────────────────
    hsx_todo_theory: {
      title: 'She Counted Every Unfinished TODO',
      description: [
        'Serena is holding a report titled “The State of TODO Comments in the Group Codebase,” subtitled “With a Discussion of Why Some TODOs Will Never Be Done.” She says she spent the weekend scanning every repo. The results: the group has 237 TODOs, 63% of them have survived more than six months, and 21% were written by people who have since graduated or left.',
        '“What’s the oldest one?” you ask.',
        '“It was left in 2017,” she says. “Nobody knows where the original author is now. The comment says `needs optimizing, will fix next week`.”',
        'There’s a brief silence. “So what’s your conclusion?”',
        '“I have some thoughts,” she says, “on the relationship between a TODO’s half-life and its completability.”',
      ],
      prompt: 'Serena has found a deeper pattern in the lab’s TODOs. What do you do?',
      options: {
        hsx_todo_cleanup: {
          text: 'Clean them up. They’re just taking up space.',
          outcomes: [
            'You say, “Start by deleting the ones that are obviously never getting done.” Serena sorts every TODO into three categories: actionable, questionable, and commemorative. She doesn’t delete a single commemorative one. “They have historical value.”\n\nAfter the cleanup the repos are tidy, and Serena produces a TODO removal log recording when and why each one was removed. It’s more detailed than the TODOs themselves ever were.',
          ],
        },
        hsx_todo_research: {
          text: '“Half-life and completability”? Go on.',
          outcomes: [
            'You say, “Walk me through it.” Serena’s expression visibly relaxes. She had clearly prepared for this question. She lays out her hypothesis: whether a TODO gets done depends on when it was born, and TODOs created at high-pressure moments (right before a deadline, right before group meeting) are the least likely ever to be done. She has already done a preliminary classification. What she needs now is data at a larger scale.\n\nYou say, “Then do it.”',
          ],
        },
      },
    },

    // ── Group meeting analysis ────────────────────────────────────────────
    hsx_meeting_timing: {
      title: 'She Analyzed Group Meeting Participation',
      description: [
        'After group meeting, Serena stays behind and, a little hesitantly, hands you a printed spreadsheet. For every group meeting over the past six months, it records each person’s speaking time, when they spoke (in the first hour or the last twenty minutes), how many times they interrupted, and how often their input “meaningfully changed the conclusion of the discussion.”',
        '“You… tracked this for six months?”',
        '“I just thought it was interesting,” she says, a little embarrassed. “I don’t speak up much myself, so I figured I’d observe everyone else’s patterns while I was at it.”',
        '“And your conclusion?”',
        '“Once a meeting runs past ninety minutes, the rate of useful conclusions drops by about 40%. Also, the first person to speak gets their view adopted far more often than anyone after.” She pauses, then adds, “And Professor, anything you say after the 47th minute of a group meeting has an adoption rate close to zero. That holds for every meeting, with a 6% margin of error.”',
      ],
      prompt: 'Serena has been quietly studying the game theory of group meetings. What do you do?',
      options: {
        hsx_meeting_timing_apply: {
          text: 'Okay, next meeting we do it your way',
          outcomes: [
            'You say, “Then next time we’ll keep it under ninety minutes and encourage people to speak early.” Serena immediately sends over a new group meeting agenda with the speaking prompts marked at specific times, and a note: “Projected to increase useful conclusions by about 20%.”\n\nYou have no idea how that number was calculated, but group meetings do get shorter, and a few of the discussions are noticeably better.',
          ],
        },
        hsx_meeting_timing_publish: {
          text: 'This could actually make an interesting paper',
          outcomes: [
            'You say, “If you turned this into a systematic study, it’d be really interesting. Information flow and power structures in group meetings.” Serena is silent for three seconds, then says, “I have thought about it. I assumed you’d think it was too niche.”\n\nShe opens her notebook. Inside is an analysis framework she has clearly been building for a long time, data visualizations and all, just waiting for someone to say “go for it.”',
          ],
        },
      },
    },

    // ── Half-favor ────────────────────────────────────────────────────────
    half_favor_he_shixu: {
      title: 'One Item on {studentName}’s To-Do List',
      description: [
        'You’re sitting together sorting through files. {studentName} has set her tablet on the table for reference, and when she switches apps, her to-do list opens by accident.',
        'You don’t mean to look, but in that one instant you catch the item at the very top: “Tell someone today they’ve been doing well lately (3 min, can be done during hallway time).”',
        '{studentName} probably realizes you saw it. She turns the tablet screen away and goes on sorting files without a word.',
      ],
      prompt: 'You:',
      options: {
        half_favor_hsx_say_nothing: {
          text: 'Pretend you didn’t see it and keep sorting',
          outcomes: [
            'You keep working, and neither of you brings it up. Near the end, {studentName} closes her tablet and suddenly says, “Professor, that report last week was really solid.” Just that one sentence, then she goes back to packing up, her face as calm as ever. You think of the to-do item, smile, and say thank you. She nods, as if to accept it.',
          ],
        },
        half_favor_hsx_ask: {
          text: 'Is that task… a recurring one?',
          outcomes: [
            '{studentName} pauses, then nods calmly. “One a day. I’ve been doing it for almost two years.” She puts the tablet away. “Research shows that timely positive feedback significantly improves team performance.” Then she adds, a little more quietly, “Also, a lot of people do a lot of things, and nobody ever tells them.” You start to answer, but she’s already up and getting the files.',
          ],
        },
      },
    },

    // ── Max-favor ─────────────────────────────────────────────────────────
    max_favor_he_shixu: {
      title: 'Archive No. 001',
      description: [
        'A meeting invite lands in your inbox. From: {studentName}. Subject: “Annual Lab Archive Review.” The time is specified to the minute, with five attachments, three notes, and a final line suggesting you arrive five minutes early. You don’t even need to check the sender to know it’s from her.',
        'When you get to the meeting room that afternoon, no one else is there. A thick black notebook sits on the table. {studentName} slides it over. “The annual archive report.” You open it. Page one is the day the lab was founded. Page two, the first group meeting. Page three, the first time Reviewer 2 tore you apart. Every entry has a date, what happened, and how it turned out, even a score and remarks. One group meeting: Efficiency 7/10, advisor went off-topic for twenty minutes but unexpectedly solved the core problem. One submission: process chaotic, outcome good. The more you read, the more absurd it gets.',
        'Because a lot of it you don’t even remember yourself. The night you finished editing a student’s paper at 1 a.m. and turned off the last light in the lab on your way out. The day of a downpour when you walked a student who’d forgotten an umbrella all the way downstairs. The group meeting you ended early because you noticed everyone was about to fall asleep. Things you did and forgot as soon as they were done, all neatly written down in her notebook.',
        'Toward the back, you find a separate section titled “Advisor Observation Log.” It’s full of your catchphrases, odd habits, and classic quotes. There are even charts. For example, the actual distribution of what “next week” means, the probability that “let’s see” eventually turns into a new project, and how big the problem usually turns out to be after “should be fine.”',
        'You look up at her. {studentName} pushes up her glasses and says calmly, “The sample size was large enough to warrant its own file.” Then she adds, “Besides, a lot of things disappear quickly if nobody writes them down.” She looks down at the nearly full chronicle. “I don’t think they should disappear.”',
      ],
      prompt: 'You keep turning pages and find that the last few are still blank:',
      options: {
        max_favor_hsx_memory: {
          text: 'You remember all of this…',
          outcomes: [
            '{studentName} says, each word deliberate, “I remember the important things.” You look back down at the chronicle and realize that all these years, someone has been carefully keeping everything that happened safe, for all of you.',
          ],
        },
        max_favor_hsx_future: {
          text: 'And the blank pages?',
          outcomes: [
            '“Those are for next year.” {studentName} says it as if it were obvious. “The template’s ready and the table of contents is laid out. I’ve left room for all of it.” You look at the pages with nothing written on them yet, already numbered, running on far into the distance, as if someone were quietly hoping for a future with no end date.',
          ],
        },
      },
    },

    // ── New Year gift result ──────────────────────────────────────────────
    new_year_gift_result_he_shixu: {
      title: 'Serena’s Reaction',
      description: ['When Serena sees the gift box, she’s in the middle of organizing her plan for the new semester.'],
      prompt: 'Serena’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Serena takes the box and thanks you, pleasantly surprised, then bends over her notebook, writing and crossing things out. Unable to help yourself, you lean in for a look. The notebook says “Lab Members’ New Year Plan,” and your name is right there on the first page.\n\nSeeing that you’ve noticed, she just opens it up. “I was going to implement this in a few days.” Inside is a dense list of New Year arrangements for different people.\n\nShe closes it and clears her throat. “I’ll need to reprioritize now.”',
            'Serena thanks you formally, logs it, and mentions in passing that “this will count toward this year’s advisor-care metrics.” Then she asks whether you’ve read the paper you promised to look at last week.',
          ],
        },
      },
    },
  },
};
