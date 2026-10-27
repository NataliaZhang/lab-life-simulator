import type { EventTranslations } from '../../../types/i18n';

// English overlay for src/data/events/endings.ts
// (special endings, the industry offer, and the six-year tenure outcomes).

export const endingsEventsEn: EventTranslations = {

  // ── Special endings: can fire at any time ────────────────────────────────

  ending_funding_crisis: {
    title: 'Out of Funding',
    tagline: 'Years from now, someone’s acknowledgments will still mention this place.',
    description: [
      'The balance has hit zero. No joke: the lab’s bank account really does read $0.00.',
      'The college finance office sends a politely worded but unmistakable email asking about the lab’s plans for continued operation. Gripping the mouse, you stare at that line for a long time.',
      'You remember how it felt when your startup funds first came through. Back then, it seemed like enough to last for ages.',
    ],
    prompt: 'With the money gone, you decide to:',
    options: {
      emergency_loan: {
        text: 'One last shot: ask the college for an emergency advance',
        outcomes: [
          'The college makes an exception and approves $5K in bridge funding, on the condition that you submit a grant proposal within three months. You’ve won one last chance. Whether the lab survives comes down to these three months.',
          'The college says there’s nothing it can do. Without funding, the lab can’t keep running. You tell each of your students and help them find new advisors. On the last day, you stay in the office packing until late.',
        ],
      },
      accept_closure: {
        text: 'Accept it and wind the lab down properly',
        outcomes: [
          'You arrange a transfer for every student, reaching out to colleagues you trust to take them in. At the last dinner before the lab closes, you don’t say much. You just raise your glass. There’s a certain dignity in ending something well.',
        ],
      },
    },
  },

  ending_all_students_left: {
    title: 'The Empty Lab',
    tagline: 'The group meeting isn’t over. It’s just that no one came today.',
    description: [
      'The last student is gone.',
      'Now it’s just you in the lab. The whiteboard still has the notes from the last group meeting. No one has erased them, because there won’t be another group meeting.',
      'You sit down at a desk. The screen is on, showing an experiment no one is going to continue. You stare at it for a long time.',
    ],
    prompt: 'A lab of one. You choose to:',
    options: {
      rebuild: {
        text: 'Post a recruitment call and start over',
        outcomes: [
          'You post a recruitment notice, and two months later a new student arrives. The newcomer knows nothing about what this lab has been through, and sees only an advisor talking earnestly about research directions. The newcomer stays on, a little lost, just like the first person you ever met in this lab.',
        ],
      },
      solo: {
        text: 'Carry on alone for now and wait for the right people',
        outcomes: [
          'You decide to finally write up the ideas you’ve been saving for years. No group meetings to interrupt you, no progress updates. In three months you finish a theory paper that turns out surprisingly solid. Sometimes quiet is a resource too.',
        ],
      },
    },
  },

  ending_burnout_tenure: {
    title: 'Doctor’s Orders',
    tagline: 'The sixth time you collapsed, it was an ambulance that took you away.',
    description: [
      'This time, no student is there to help you up.',
      'A colleague walking down the hallway finds you slumped against the doorframe, half on the floor and barely conscious, and immediately calls an ambulance. When the paramedics arrive, you are still saying, “I’m fine, just a little tired.” They ignore you.',
      'Four days in the hospital. The test results are spread across the bedside table, and the attending cardiologist tells you, in a very calm voice, that chronic sleep deprivation on top of sustained high stress has caused cumulative damage that can no longer be ignored. “You need at least three months of complete rest. No work, no pressure, no late nights. This isn’t a suggestion. It’s doctor’s orders.”',
      'Lying in the hospital room, staring at the glaring white ceiling light, you finally realize this has moved beyond anything you can control.',
      'The department chair comes to visit and stays twenty minutes. Before he leaves, he says just one thing: “The university needs researchers who can be here for the long haul, in stable health. As for the tenure committee, your situation… we’ll explain it as it is.” He doesn’t say more, and you don’t ask.',
      'Three months later, a formal letter arrives from the college. Polite wording, unmistakable meaning: given the extended interruption of work for health reasons, review of your tenure application has been suspended, and you are advised to rethink your career path once your leave ends.',
      'You close the email and look out at the campus for a long time. You aren’t surprised. You just never expected the end to come like this.',
    ],
    prompt: 'It’s come to this. You:',
    options: {
      burnout_accept: {
        text: 'Accept it. Health comes before everything.',
        outcomes: [
          'You don’t appeal. You don’t go back to the grant proposal you’d meant to keep writing, either. You silence your phone and set your work email to auto-reply. For the first time, on a weekday afternoon, you sit in the sunlight for a long time and do nothing at all. It’s harder than you thought it would be. It’s also more necessary than you thought.',
        ],
      },
      burnout_regret: {
        text: 'If only I’d listened to those warnings',
        outcomes: [
          'You think back to the mornings when someone helped you up after you collapsed. The hot water. The screenshot. The coffee mug that quietly went missing. The campus doctor’s “worse than you think.” People had been trying to tell you all along. You just never really listened. It isn’t regret, exactly. You’ve finally understood how much those words weighed. A little late, but you understand now.',
        ],
      },
    },
  },

  // ── Industry offer (Year 7, May; not an ending itself) ─────────────────────

  industry_invite: {
    title: 'An Offer from Industry',
    description: [
      'The email comes through an intermediary. The VP of Research at one of the leading AI companies has been asking around about you. They’ve noticed how you’ve run your lab’s finances these past few years. Not the papers, not the reputation. The money. They’ve done an analysis: on the same startup budget, your resource efficiency is the highest in your hiring cohort, your project ROI is unusually good, and you’ve kept cash flow positive throughout. They’d like to meet for a “casual chat.” You pick the place.',
      'The “casual chat” runs two and a half hours. The VP doesn’t ask about papers or research directions, only about how you make allocation decisions, how you judge whether a direction is worth investing in, how you put limited money where it really matters. You find yourself talking more and more easily, because these are things you actually did over the past six years. As you’re leaving, the VP slides a document across the table. “No need to decide now.” You glance at the salary line. It’s five times what you make now.',
      'You think it over for three days. With six years almost behind you, this is one of those rare moments when everything comes into focus: what you’ve been doing in academia is, at heart, using limited resources to bet on the right direction under uncertainty. That’s exactly what they want too, just with stakes an order of magnitude higher.\n\nYou open the email to write your reply.',
    ],
    prompt: 'The final year is almost over. What’s your answer?',
    options: {
      industry_invite_accept: {
        text: 'Accept: time for a bigger table',
        outcomes: [
          'You write that you accept. After hitting send, you sit back in your chair and look out at the campus for a while. It’s the same view it was three days ago. Only now you know that what comes next is different.',
        ],
      },
      industry_invite_decline: {
        text: 'Decline: your roots are in academia',
        outcomes: [
          'You send a polite reply: thank you, but the timing isn’t right. The VP writes back, “The door’s always open,” and the thread goes quiet. You close the window and open the next paper you’re supposed to review. Sometimes choosing not to change is a choice too.',
        ],
      },
    },
  },

  // ── Time-up endings: tenure review ─────────────────────────────────────────

  ending_time_famous: {
    title: 'Tenure Review: Standing Room Only',
    tagline: 'The hall was packed, and not just because you were the one they’d invited.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nYour case is a little unusual. Two months before your application deadline, the college reached out on its own to ask whether you had any special requests. Two members of the committee are collaborators you met at international conferences. When the department chair ran into you in the hallway, he said lightly, “It’s just a formality,” the approval in his voice unmistakable.',
      'The meeting room is packed, and a few more people who say they’ve come “to sit in and learn” are standing out in the hallway. Everyone is focused, nodding along.\n\nBy your third slide the questions have started, and they’re all good ones: where you see the field going, what kind of next generation of scholars you hope to train, what you would most want to do with ample resources.\n\nProf. Whitfield listens the whole time and asks just one question: “Where did most of your students end up?” You go through where each of them went. He nods, writes something in his notebook, and doesn’t follow up.',
      '“Please wait outside.” Someone in the hallway recognizes you and comes over to say hello. You respond politely, take a seat in the chair by the door, and look out the window. You don’t keep track of the time. Seven minutes, and the door opens.',
      '“Unanimous.” The department chair shakes your hand, looking sincerely pleased. “We’re very glad to have you here.”',
      'You say thank you. The hallway gets noisy. People come over to congratulate you, and your phone pings again and again. You walk to the window and look out over the campus, thinking of the morning six years ago when you first walked into this building. Back then you had no idea what this place would become. Now you know.',
    ],
    prompt: 'Six years. How do you look back on the journey?',
    options: {
      reflect_legacy: {
        text: 'The best of what I learned, my students taught me',
        outcomes: [
          'It’s true, and saying it doesn’t feel noble. It’s simply a fact. Advising them forced you to think through a lot of questions you had never actually worked out for yourself. That was the best part.',
        ],
      },
      reflect_just_started: {
        text: 'Six years, and it’s only the beginning',
        outcomes: [
          'This doesn’t feel like the finish line. Tenure is only a threshold, and there’s a long road on the other side of the door. You dig out the notebook where you wrote down your questions on your very first day, six years ago. Half of it is still blank.',
        ],
      },
    },
  },

  ending_time_wealthy: {
    title: 'Into Industry',
    tagline: 'You turned an empty lab into exactly what others wanted most.',
    description: [
      'After sending the email, you write to the department chair to tell him you’ve accepted the offer and won’t be renewing your contract. He replies a day later: “Honestly, I’m not surprised. Every dollar you spent here turned into results, and that alone puts you ahead of most people. Best of luck.” You save the email. You never reply, but you don’t delete it either.',
      'At the last group meeting, you tell everyone. Some ask whether they can come with you. The company has already set aside a few spots, and you go over the details with each of them. For the rest, you contact collaborators you trust one by one and ask whether they can take them in. Nobody says no. On the last day, you leave the whiteboard as it is. When you close the books, you glance at the balance on the last page. Not zero. Never zero.',
    ],
    prompt: 'As you walk off campus for the last time, you think:',
    options: {
      wealthy_forward: {
        text: 'Next round, higher stakes',
        outcomes: [
          'It doesn’t feel like leaving. It’s the same game in a bigger room: using limited resources to bet on the right direction under uncertainty. You’ve been doing this all along. Only the table has changed. You open the onboarding paperwork and fill in your name without a moment’s hesitation.',
        ],
      },
      wealthy_miss: {
        text: 'Some things only existed in that lab',
        outcomes: [
          'You think of the whiteboard that never wiped quite clean, the screens still lit late at night, the questions at every weekly group meeting that didn’t have answers yet. The new place will have new problems, new people, new bets. Some things will come back in another form. Some may have belonged only to that room. You don’t think that’s a bad thing. If something is worth missing, it was real.',
        ],
      },
    },
  },

  ending_time_great: {
    title: 'Tenure Review: Well Earned',
    tagline: 'Your students have started advising students of their own.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nYou gather six years of material into one folder: the list of graduated students, your publications, your collaborations, every trace of the reputation you’ve built. You put on the suit you’ve only ever worn to interviews and defenses, and walk into the conference room on the fourth floor of the department building.',
      'Forty minutes of presentation, and not one awkward silence. Of the seven committee members, some nod along, some take careful notes. Prof. Whitfield, known for his tough questions, sits on the left, flipping back and forth through your publication record, but he doesn’t raise a single objection the whole time. You know that’s a good sign.\n\nSomeone asks where your former students are now. You go through them one by one, and mention that one of them is now setting up a lab at another university.',
      '“Please wait outside.” You step out and sit down on a chair in the hallway, next to the water cooler with half its buttons broken. The hallway is quiet. You can faintly hear the low murmur of discussion from the room. You count the minutes. Five. Ten. Eighteen. You don’t take out your phone. Holding it wouldn’t help.',
      'At twenty minutes, the door opens. The department chair stands in the doorway, his expression calm, and holds out his hand.\n\n“Congratulations. The committee was unanimous.”',
      'You shake his hand and thank him. The hallway lights are the same. The water cooler is still dripping. Everything is exactly as it was twenty minutes ago. Only something inside you has settled firmly into place.',
    ],
    prompt: 'Six years. How do you look back on the journey?',
    options: {
      reflect_proud: {
        text: 'Worth it',
        outcomes: [
          'The papers you wrote, the group meetings you ran, the late nights you pulled over six years suddenly all add up to something.\n\nYou open a new document and start writing down the next question. Research, it seems, never really ends.',
        ],
      },
      reflect_humble: {
        text: 'The questions are still ahead',
        outcomes: [
          'You used to think the finish line would bring answers.\n\nInstead, you’ve found that what the finish line mostly does is earn you the right to ask the next question.',
        ],
      },
      reflect_students: {
        text: 'The torch has already been passed on',
        outcomes: [
          'Six years ago, you hoped the road to tenure would leave something behind.\n\nWhat you found is that what really lasts may not be the papers or the code.\n\nIt’s the people who leave the lab. They’ll carry what they learned here forward, and pass it on to the next generation.\n\nThinking about it, it strikes you that this may be the most romantic thing about academia.',
        ],
      },
    },
  },

  ending_time_steady: {
    title: 'Tenure Review: The Dust Settles',
    tagline: 'You always felt a step short. Only here do you see how far you’ve come.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nYou get your materials in order and check your slides for the third time. There’s a typo on slide seven. You fix it, take a deep breath, and walk into the room.',
      'Halfway through your presentation, Prof. Whitfield, known for his tough questions, raises a hand to interrupt. “Could you be more specific about where your graduates ended up?” You tell him. He nods, his expression unchanged. Another committee member turns to a page of your publication record and pencils something in the margin. You can’t see what, so you just keep going. At the end, someone asks, “Why hasn’t the group grown?” You answer honestly: the funding, and the trade-off you made for quality. No one follows up, but you can’t tell whether that’s a good thing.',
      '“Please wait outside.” The hallway chair is harder than you expected. Ten minutes pass. Then another ten. Then another. You check your phone several times and turn it face down again. Through the wall you can’t make out what’s being said, except once, when someone’s voice clearly rises, then drops again. You start drafting in your head what you’ll say if it doesn’t go your way.',
      'The door opens. The department chair steps out and his eyes land on you. For that one second, your heart skips a beat. Then he says, “After discussion, the committee has approved your tenure application. Four to one.”',
      'Four to one. You nod and say thank you. All the way back to your office, you keep wondering about that one vote: why, and whether it could have gone differently. You think about it for a long time, then decide to let it go. A pass is a pass. Time to move on to the next milestone.',
    ],
    prompt: 'Six years. How do you look back on the journey?',
    options: {
      reflect_steady: {
        text: 'Steady beats clever',
        outcomes: [
          'You believe that. Not because you aren’t smart enough, but because in these six years you’ve seen too many smart people fail to stick it out, for all kinds of reasons. You stuck it out. That’s an answer in itself.',
        ],
      },
      reflect_mixed: {
        text: 'Still on the road',
        outcomes: [
          'In the beginning, you always thought the next project, the next paper, the next submission would be the turning point.\n\nOnly later did you realize most things don’t have one.\n\nPeople came and went. Projects moved forward. Problems showed up one after another, and got solved one after another. Without quite noticing, you ended up here.',
        ],
      },
    },
  },

  ending_time_struggle: {
    title: 'Tenure Review: A Close Call',
    tagline: 'Not a perfect record, but it was enough.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nYou get your materials together and stare at the slides for a long time. The number of graduated students is right there on the first slide. So is the funding curve, and the line chart of your reputation over the years. None of it is pretty, but all of it really happened. You dig your suit out of the closet, find a crease in one cuff, iron it carefully, and walk into the room.',
      'The mood is heavier than you expected. The committee’s questions come one after another. Why aren’t there more publications? Why did students leave? With funding this tight, what’s the plan going forward? You answer what you can. For some questions, all you can say is, “That’s an area where I genuinely fell short.” Prof. Whitfield pages through your publication record again and again. No question marks, no nods. He just reads. You don’t know what that means. When you finish, the applause is scattered. Someone writes something in a notebook.',
      '“Please wait outside.” The hallway chair is hard, and the water cooler drips steadily. Twenty minutes. Another twenty. At one point you get up to get some water, then sit back down, afraid of missing the call. You’ve already run through every bad outcome you can think of, and now you almost want to laugh. You’ve already feared everything there is to fear. Might as well let it come.',
      'The door finally opens. The department chair comes out wearing an expression you can’t read, and pauses for three full seconds before speaking. “We discussed this for a long time…” Another pause.\n\n“The committee has decided to approve your tenure application. But it recommends that you submit an improvement plan next year.”',
      'You thank him and shake his hand. Back in your office, you take off the sweat-soaked suit and hang it back in the closet. Outside the window, it’s July on campus. Students are sitting on the grass. Everything is normal. You sit down and open a new document. You haven’t written anything yet.',
    ],
    prompt: 'Six years. How do you look back on the journey?',
    options: {
      reflect_survived: {
        text: 'Surviving is winning',
        outcomes: [
          'It sounds pessimistic, but you say it with a kind of unapologetic conviction.\n\nYou’ve seen people who couldn’t hold on and left the field early. You’re still here. You didn’t fail, because you kept going.',
        ],
      },
      reflect_lessons: {
        text: 'The most important things I learned aren’t in any paper',
        outcomes: [
          'Not everything you learned in six years was about research.\n\nYou learned what kind of pressure breaks people, which relationships are worth protecting, and what kind of work you’ll never regret spending time on.\n\nNone of those lessons are in any paper.',
        ],
      },
    },
  },

  // ── Time-up endings: bad endings ───────────────────────────────────────────

  ending_be_rep_low: {
    title: 'Tenure Review: Unnoticed',
    tagline: 'Your name was on the list, but no one came to fill that chair.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nYou get your materials in order, put on your suit, and walk into the room on time.',
      'Three committee members show up. There are supposed to be five; the other two changed their plans at the last minute. The three of them flip through your materials and ask routine questions: publications, student training, collaborations. You answer each one. The whole thing feels like filling out a form. No one follows up, and no one shows any particular interest. At the end there’s no encouragement and no grilling. It just ends.',
      '“Please wait outside.” You’re the only one in the hallway. On the other side of the wall, the room soon goes quiet. Just chairs shifting, papers turning, the occasional words you can’t make out. In under fifteen minutes, the door opens.',
      '“The committee finds that the impact of your research does not yet meet the threshold for tenure. Your application has not been approved at this time, but the college will grant you a one-year improvement period.”',
      'The department chair pauses when he’s done, as if waiting for you to say something. You nod and say thank you on autopilot. One of the hallway lights is flickering faintly. You walk to the stairwell. Outside, it’s still light.',
    ],
    prompt: 'As you leave the building, you think:',
    options: {
      be_rep_understand: {
        text: 'A failure I saw coming',
        outcomes: [
          'It isn’t an easy thing to say, but once it’s said, there’s a strange steadiness to it.\n\nYou know where you didn’t push hard enough, and you know why: time, energy, trade-offs. Nobody ends up here because they didn’t care.',
        ],
      },
      be_rep_fight: {
        text: 'I still have a year. I’ll make them see it.',
        outcomes: [
          'You take out your phone and start blocking out the next three months in your calendar, one chunk at a time. An academic career has never been decided by a single review.',
        ],
      },
    },
  },

  ending_be_no_successor: {
    title: 'Tenure Review: No Successors',
    tagline: 'Good research needs students to carry it on.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nAs you put your materials together, the numbers look good: completed projects, the reputation curve, the publication list. You even catch yourself thinking there might not be much suspense this time.',
      'The committee turns to the last page and stops. Graduated students: 0.\n\nThe room grows heavy. In the end, it’s Prof. Whitfield who speaks first. “Over these six years, your lab has completed a great deal of research.” He pauses.\n\n“But what about your students?”',
      '“When the academic community evaluates a researcher, it looks not only at what they have done, but at whom they have trained. Students here usually graduate in three years. In six years, this lab has produced results, but not a single student has taken what was learned here and carried it forward.”',
      'You want to explain. Some came and then left. Some were almost ready to graduate… But in this room, none of it sounds like a reason.',
      '“I’m sorry. The committee was unable to approve your tenure application.”',
    ],
    prompt: 'As you walk out of the room, what comes to mind is:',
    options: {
      no_successor_reflect_self: {
        text: 'I kept my students too long',
        outcomes: [
          'You always used to think: let’s finish this project first. Then one project ended and there was another. One paper went out and there was the next one. Graduation always felt like something that could wait a little longer.\n\nOnly later did you realize that your students’ lives don’t get pushed back along with the project timeline.',
        ],
      },
      no_successor_reflect_students: {
        text: 'Maybe something mattered more than papers',
        outcomes: [
          'You spent so much time keeping the lab running. Only looking back do you see that the people who mattered most seem to have been waiting all along for a little of your attention.',
        ],
      },
    },
  },

  ending_be_proj_insufficient: {
    title: 'Tenure Review: Just Short',
    tagline: 'You did your best, but the committee needed to see results.',
    description: [
      'It’s July of Year 7, six years since you first came to this university, and tenure review week arrives right on schedule.\n\nAs you put your materials together, you notice the “Completed Research Projects” section won’t fill up. The research has kept moving, but fewer things have actually reached a finish than you thought. You put the folder together anyway, put on your suit, and walk into the room.',
      'The committee’s very first question goes straight to the point: “Could you explain the number of completed projects?” You explain: the direction has been shifting, the team has been growing, and several projects are nearly done, just one last step away. The committee’s expressions don’t change.',
      '“Please wait outside.” The hallway is quieter than it has ever been. Twenty-five minutes pass, and hardly a sound comes from the room. You go back over every answer you gave today. They were all true. But you also know that true isn’t the same as enough.',
      'The door opens. The department chair comes out and gets straight to it. “I’m sorry. The committee was unable to approve your tenure application. We believe your research has potential, but your output has not yet reached the expected threshold.”',
      'You nod, say thank you on autopilot, and shake his hand. Back in your office, you look over the few projects still in progress. You missed the bar by just that much.',
    ],
    prompt: 'You have a one-year improvement period. What now?',
    options: {
      be_proj_almost: {
        text: 'It was so close',
        outcomes: [
          'The hardest outcome is never the one that was out of reach. It’s knowing you were right up against the line and fell just short of it.\n\nA few projects were nearly finished. A few papers might have been ready to submit after one more round of revisions. Given one more year, some things really might have turned out differently.\n\nBut a review never changes its rules because you were “so close.”',
        ],
      },
      be_proj_worth: {
        text: 'It wasn’t for nothing',
        outcomes: [
          'You look back through the records from these years. Some things got finished, some didn’t. Some worked, some failed.\n\nIn the end they didn’t add up to a tenure contract. But they did change some students, and they changed you.\n\nThe committee needed a tidy conclusion. But research itself was never about reaching one.',
        ],
      },
    },
  },

};
