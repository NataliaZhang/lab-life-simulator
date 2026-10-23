import type { EventTranslations } from '../../../types/i18n';

export const groupEventsEn: EventTranslations = {

  // ── Whole-lab conference sprint ─────────────────────────────────────────

  group_conference_ddl: {
    title: 'Three Days to the GRF Deadline',
    description: [
      'The GRF deadline is 72 hours away.',
      'The whole lab has gone into battle mode: some people are running experiments, some are glued to loss curves, and some are writing the paper to avoid running experiments.',
      'The strategy from here is your call.',
    ],
    prompt: 'Final push. Which approach do you bet on?',
    options: {
      lead_charge: {
        text: 'Get in there and lead the push yourself',
        outcomes: [
          '72 hours straight, submitted with ten minutes to spare. The group chat explodes: screenshots, someone sending “!!!”, someone saying “pretty sure I just took out an advance on all the sleep I’ll ever get.” You don’t say anything. You just close your laptop and take a slow sip of tea that went cold hours ago. Worth it.',
          'Three days without sleep. The experiments crash twice near the end, and what you finally scrape together and submit is a half-broken version. The lab goes quiet. The group chat is silent for two days, except for one person who posts a single “.”. Nobody replies.',
        ],
      },
      split_tasks: {
        text: 'Divide the work, everyone owns a piece',
        outcomes: [
          'You send out a Gantt chart, everyone claims a module, and nobody argues. The paper comes together surprisingly well, and one module even goes beyond what was asked. You don’t ask who did it, but you have a pretty good guess.',
          'You hand out the tasks. Three modules go unclaimed, and in the end you quietly pick them all up yourself. The paper gets submitted, but you stare at the confirmation email with two all-nighters’ worth of dark circles under your eyes, and only one word comes to mind: whatever.',
        ],
      },
      postpone: {
        text: 'Skip this one. Next time.',
        outcomes: [
          'You post in the group chat: we’re pulling out this round. Everyone stares at their screens for a moment to absorb it. Then someone writes “Understood, next time for sure,” someone else adds a thumbs-up, and the mood is surprisingly calm. Everyone here is doing a PhD. This kind of thing doesn’t need explaining.',
        ],
      },
    },
  },

  group_submission_result: {
    title: 'The Decision Is In',
    description: [
      'Months go by. The notification email finally arrives.',
      'You take a deep breath and click…',
    ],
    prompt: 'Whatever it says, the lab expects to hear something from you.',
    options: {
      celebrate_accept: {
        text: 'Celebrate if it’s in, debrief if it’s not',
        outcomes: [
          'Accepted! Within five seconds the group chat goes from silence to a flood: screenshots, CV updates, “already have the next paper planned.” You take the whole lab out for a proper dinner, and you all talk until almost midnight. When the check comes, someone reaches for it. You don’t let them.',
          'Rejected. You compile the reviews into a doc and walk the lab through them one comment at a time. Someone writes a question mark next to R3’s comments. Someone else just says, “This one’s fair.” The mood is a little heavy, but bit by bit, the lab’s work is getting more solid.',
        ],
      },
      analyze_reviews: {
        text: 'Whatever the result, dig into the reviews first',
        outcomes: [
          'You project the reviews onto the whiteboard and have everyone pick one comment and explain how they read it. Two people get into a heated argument over the same comment: one says the reviewer has a point, the other says the reviewer didn’t understand the paper. You don’t referee. You let them fight it out. By the time they’re done, the plan for the next draft has written itself.',
        ],
      },
    },
  },

  // ── Scooped on arXiv ─────────────────────────────────────────────────────

  arxiv_scooped: {
    title: 'Scooped on arXiv',
    description: [
      'A message pops up in the group chat: “Um, have you seen this one…”',
      'You open the link. A big-name group, posted yesterday, with a method almost identical to yours, and a timestamp a full three weeks earlier than yours.',
    ],
    prompt: 'You’ve been scooped. Next move?',
    options: {
      differentiate: {
        text: 'Study the differences, find a weak spot, hit back',
        outcomes: [
          'You compare the two papers section by section and find that they skipped a key validation on one subtask. That alone gives your method a real edge. New angle, rewritten contributions, submitted. Reviewer: “Offers a valuable new perspective.”',
          'You find the differences, but proving them means new experiments, and the workload doubles. Every face in the room says “you again.” Three weeks later the code quality is visibly better, but that’s not the consolation prize anyone wanted.',
        ],
      },
      concurrent_work: {
        text: 'Send it to a workshop as concurrent independent work',
        outcomes: [
          'You send it to a workshop, labeled “concurrent independent work.” People in the field see it and give you credit. The work wasn’t wasted; someone else just got to the trophy first. The disappointment is smaller than you expected, maybe because nobody’s hopes were that high to begin with.',
        ],
      },
      pivot: {
        text: 'Face reality and change direction',
        outcomes: [
          'You announce a change of direction. Someone sets down a mug a little harder than usual. A few seconds of silence. Then someone asks, “So do we delete the old code?” and the discussion starts from there. Everyone is already looking ahead. They’re just still holding what they carried on the last stretch of road.',
        ],
      },
    },
  },

  // ── Lab outing ───────────────────────────────────────────────────────────

  group_celebration: {
    title: 'A Rare Lab Outing',
    description: [
      'Nobody remembers who suggested it, but for once everyone agreed: a whole day out, together.',
      'A look at the calendar says the whole lab hasn’t gone out together in months. Research really does eat people alive.',
    ],
    prompt: 'Lab outing. Where to?',
    options: {
      escape_room: {
        text: 'Escape room (puzzle-nerd PI comes out of retirement)',
        outcomes: [
          'The escape room lays everyone’s personality bare: someone charges to the front, someone scrutinizes every detail, someone sits in a corner reasoning alone and refuses to cooperate. You break out in the final minute, everyone laughing hard and making fun of each other.',
          'You don’t make it out, but everyone keeps roasting each other until time runs out. You notice your students think under pressure exactly the way they do in research: some are exactly who you thought they were, and some surprise you. That’s more useful to know than any experimental data.',
        ],
      },
      hotpot: {
        text: 'Hot pot, everything goes in',
        outcomes: [
          'Three hours of hot pot. The conversation goes from papers to the future, from academia to life, and someone says a few things they’d never normally say. By the end the broth has cooked down to a deep red, and someone is already planning the next meal. It’s a very different kind of fullness from the lab’s long-term projects, but just as real.',
        ],
      },
      hike: {
        text: 'Go for a hike. It’s free.',
        outcomes: [
          'Halfway up the mountain, someone starts talking about a research idea they haven’t touched in ages, and someone else tells a joke so bad the whole lab has to stop on the slope for five minutes. On the way down everyone walks slowly, not because they’re tired, but because nobody wants to get back too soon. It didn’t cost a thing. It was just a good day.',
        ],
      },
    },
  },

  // ── Two-student daily friction ───────────────────────────────────────────

  group_fridge_lunchbox: {
    title: 'The Cold Case in the Fridge',
    description: [
      'There is a boxed lunch in the lab fridge.',
      'Length of storage unknown. No label. No witnesses. Unclaimed for three days.',
      'Today, {studentName} and {student2Name} open the fridge at the same time, reach for it at the same time, and say at the same time: “That’s mine.”',
    ],
    prompt: 'A sovereignty dispute. You rule.',
    options: {
      quiz: {
        text: 'Whoever can name what’s inside gets it',
        outcomes: [
          '{studentName} names two dishes. {student2Name} is silent for three seconds, then says, “Actually, I’m not so sure anymore.” The lunch is solemnly returned to its place. Both parties agree not to press charges, shake hands, and disperse.',
          'Both of them rattle off the dishes with total confidence, and both are exactly right, because they ordered from the same takeout place on the same day. No ruling is possible, so you suggest sharing. They look at each other for a second, both say “fine,” and split it.',
        ],
      },
      throw_away: {
        text: 'Throw it out and move on',
        outcomes: [
          'The lunch is solemnly laid to rest in the trash. Three minutes later, a third student walks in and asks, “Where’s the lunch I put in here yesterday?”',
          'The lunch disappears and the matter is closed. The next day a sheet of printer paper appears on the fridge, handwritten in careful block letters: “Do not dispose of other people’s food without permission. — Legal Counsel: {studentName}”',
        ],
      },
      open_it: {
        text: 'Open it. On-site forensics.',
        outcomes: [
          'The moment the lid comes off, everyone within a three-meter radius steps back. Inside, an independent ecosystem has formed. {studentName} and {student2Name} say “not mine” in unison, then work together to push it into the trash. It’s the best teamwork they’ve shown all day.',
          'You open it. Completely normal. {studentName} stares at it for three seconds, says quietly, “It really is mine… thanks,” and goes off to heat it up. {student2Name} closes the fridge without a word.',
        ],
      },
    },
  },

  group_desk_war: {
    title: 'The Desk Expansion War',
    description: [
      'Week 1: A book appears next to {studentName}’s desk.',
      'Week 2: Half a box of snacks and a spare chair appear next to {student2Name}’s desk.',
      'Week 3: Both borders have advanced to the middle of the aisle, which is nominally a common area.',
    ],
    prompt: 'The territorial dispute can no longer be ignored. How do you respond?',
    options: {
      draw_border: {
        text: 'Draw a border, effective today',
        outcomes: [
          'You lay a line of tape across the floor, and both sides pull back a step. {studentName} and {student2Name} each stare at the line for a while. Both think their share is too small. Neither says a word. Peace on the border, for two weeks.',
          'You put down the tape and issue a solemn declaration. The next day, the tape is buried under a case of {studentName}’s bottled water, and one leg of {student2Name}’s folding table is planted on the line, precisely on the border, which technically isn’t crossing it. International law has broken down here.',
        ],
      },
      free_market: {
        text: 'Free competition. The strong take the land.',
        outcomes: [
          'You announce: whoever gets the other to back off willingly wins. Over the next five days, {studentName} upgrades to an ergonomic chair and {student2Name} brings in a potted plant and a desk lamp. The whole aisle somehow ends up looking a lot more respectable.',
          'The results of free competition: {student2Name} moves in a standing desk, {studentName} brings an extra monitor. The aisle is no longer passable. People have to turn sideways to get to the bathroom.',
        ],
      },
      charge_rent: {
        text: 'Charge rent. Space costs money.',
        outcomes: [
          'You announce that each floor tile of common space now costs $5 a month, payable to the lab fund. {studentName} and {student2Name} both freeze for a moment, each count up how many tiles they’re occupying, and ask in unison: “Do you take Venmo?” The lab is unexpectedly $40 richer this month.',
        ],
      },
    },
  },

  group_bluetooth_dj: {
    title: 'The Late-Night Bluetooth Incident',
    description: [
      '2 a.m. Only a few people are left in the lab.',
      'Suddenly the speaker comes on: an up-tempo song, source unknown.',
      '{studentName} and {student2Name} look up at the same time and declare at the same time: “Not me.”',
    ],
    prompt: 'The late-night broadcast continues. What do you do?',
    options: {
      investigate: {
        text: 'Check the Bluetooth logs and nab the culprit',
        outcomes: [
          'You check the connection log. The device is called “Daniel’s iPhone.” Nobody here is named Daniel. The device has never appeared on any list of lab members, and no one knows how it connected. The music stops, but the mystery remains unsolved.',
          'The log says it’s {studentName}’s device, but {studentName} insists the song started on autoplay and {he} thought {he}’d disconnected. {student2Name} takes a screenshot and saves it for future blackmail purposes.',
        ],
      },
      just_listen: {
        text: 'Just listen. It’s basically morning anyway.',
        outcomes: [
          'Nobody touches the speaker. For the next forty minutes the lab drifts through songs of every genre. Someone swivels their chair halfway around, someone bobs their head a couple of times. It’s the least productive and most pleasant night of the month.',
          'You all listen to the whole album. Then {studentName} says, “I still haven’t run that experiment,” and puts {his} headphones back on. The nice moment is over, but the code did finish running.',
        ],
      },
      turn_up: {
        text: 'Crank it all the way up',
        outcomes: [
          'You max out the volume. {studentName} freezes for a second, then pushes the keyboard aside. {student2Name} is already on {his2} feet. For the next hour nobody in the lab writes any code, but everyone unwinds. The group next door knocks twice and joins in.',
          'Volume maxed. Campus security shows up five minutes later. You explain that this is an “academic decompression activity.” The guard is sympathetic but asks you to turn it down. You set the volume back to normal. The cost: one warning, and {studentName} now has meme material for life.',
        ],
      },
    },
  },

  group_academic_bet: {
    title: 'Academic Bet: Escalation Alert',
    description: [
      '{studentName} and {student2Name} have a bet going on whether a certain model will produce positive results by next week.',
      'The stakes started at “loser buys bubble tea” and somehow evolved into:',
      'Writing three pages of the winner’s related work / Attending the next group meeting in a mascot costume / Treating the whole lab to hot pot.',
    ],
    prompt: 'The bet is out of control. Where do you stand?',
    options: {
      ban_gambling: {
        text: 'Ban it outright. This is a lab, not a casino.',
        outcomes: [
          'You announce a ban. {studentName} and {student2Name} nod in unison and accept it, then, the moment your back is turned, exchange a look that clearly means “we’ll settle this privately.” The bet goes underground. You don’t ask about it again.',
          'The same day your ban goes out, {studentName} gets the model working, to avoid wearing the mascot costume. Sometimes a bet works better than any deadline.',
        ],
      },
      referee: {
        text: 'Be the referee and keep it fair',
        outcomes: [
          'You appoint yourself impartial referee. The results come in: {student2Name} loses. You solemnly deliver the verdict. {student2Name} accepts defeat like a good sport and sits through the next group meeting in the mascot costume, maintaining admirable dignity throughout.',
          'You referee, but the results are ambiguous and each side insists it won. You rule that “both of you lose”: each of them treats half the lab to dinner. Both of them freeze for a long moment, say “that’s not fair” at the same time, and then, unexpectedly, make up.',
        ],
      },
      join_bet_1: {
        text: 'Join in and bet on {studentName}',
        outcomes: [
          'When {studentName} hears you bet on {him}, {his} productivity visibly shoots up. The model works, and you win your bet: one bubble tea. You drink it with a perfectly clear conscience.',
          'Once {studentName} finds out you bet on {him}, the pressure gets to {him} and the experiment crashes. You lose the bet, and now you owe {student2Name} half a page of related work. {student2Name} is very grateful.',
        ],
      },
      join_bet_2: {
        text: 'Join in and bet on {student2Name}',
        outcomes: [
          'When {student2Name} hears you bet on {him2}, {his2} productivity visibly shoots up. The model works, and you win your bet: one bubble tea. You drink it with a perfectly clear conscience.',
          'Once {student2Name} finds out you bet on {him2}, the pressure gets to {him2} and the experiment crashes. You lose the bet, and now you owe {studentName} half a page of related work. {studentName} is very grateful.',
        ],
      },
    },
  },

  group_gpu_league: {
    title: 'The Lab Olympics',
    description: [
      '{studentName} says: while we’re waiting in the GPU queue, we should get some exercise.',
      '{student2Name} agrees and suggests ping-pong.',
      'Three days later, it has turned into a lab league with a leaderboard, a rulebook, and a playoff format.',
    ],
    prompt: 'Lab recess has gotten bigger than expected. What do you do?',
    options: {
      allow: {
        text: 'Allow it, as long as experiments don’t suffer',
        outcomes: [
          'The league runs for two months, and the lab’s average efficiency unexpectedly goes up: whenever an experiment is running, people go play a match while they wait instead of staring blankly at the screen.\n\n{studentName} wins the season championship. {student2Name} takes home the “Most Gracious Loser” award.',
          'The league spins out of control in week three. People start playing ranked matches during GPU wait times, discover the waits aren’t long enough to finish a game, and start deliberately submitting short jobs to buy more time. Experimental output temporarily drops.',
        ],
      },
      ban: {
        text: 'Ban it. Protect the academic atmosphere.',
        outcomes: [
          'You announce the ban with a stern face. {studentName} and {student2Name} nod. Two days later they move the ping-pong table into the hallway, explaining, “This isn’t the lab.” You decide not to pursue the question of definitions.',
        ],
      },
      official_trophy: {
        text: 'Make it an official league, with a trophy',
        outcomes: [
          'You buy a trophy engraved “Lab Ping-Pong Champion.” {studentName} wins and puts it next to {his} monitor, where {he} can see it all day while working. {His} commit count this semester is up 30% over last semester. Causality not yet established.',
          'The league wraps up. {student2Name} wins the championship and, in {his2} acceptance speech, thanks {his2} advisor, the GPU cluster, and {his2} “toughest rival,” {studentName}. The award ceremony runs forty minutes and eats into group meeting time, but nobody complains.',
        ],
      },
    },
  },

  group_charger_war: {
    title: 'The Charger Sovereignty Dispute',
    description: [
      'An unlabeled charger has turned up in the lab.',
      '{studentName} says it belongs to {him}. {student2Name} says it belongs to {him2}.',
      'Their two chargers look exactly alike, and neither of them can produce proof of purchase.',
    ],
    prompt: 'Mediation has failed. How do you rule?',
    options: {
      check_order: {
        text: 'Check their Amazon orders. Whoever bought one gets it.',
        outcomes: [
          '{studentName} pulls up a screenshot of the order: clear timestamp, $38.90. Sovereignty established. {student2Name} glances silently at {his2} bag, then walks back to {his2} desk without explanation. So one charger wasn’t enough after all.',
          'Both of them produce order screenshots: purchased three days apart, identical model. Ownership remains undetermined. You declare the charger lab property, available to both, first come first served. They frown in unison, but accept the ruling.',
        ],
      },
      buy_new: {
        text: 'Buy a new one and keep the peace',
        outcomes: [
          'You spend $38.90 on a new one and the problem is solved. {studentName} and {student2Name} each take one, and the conflict dissolves. From then on, the lab’s charger population enters a period of steady growth: every time there’s a dispute, you buy another one.',
          'The new charger arrives and you declare the dispute over. That afternoon, {studentName}’s old charger turns up too, proving the original really was {student2Name}’s. {student2Name} says, “Well, why didn’t you say so,” grabs the charger, and leaves.',
        ],
      },
      time_share: {
        text: 'Share it in shifts, like civilized people',
        outcomes: [
          'You draw up a charging timetable: mornings for {studentName}, afternoons for {student2Name}, weekends alternating. Day one goes perfectly. On day two, {studentName} works late and forgets the handoff, and {student2Name}’s battery dies in the middle of the night. The diplomatic crisis flares up again, and the timetable is officially terminated.',
        ],
      },
    },
  },

  group_takeout_disaster: {
    title: 'The Group Order Incident',
    description: [
      '{studentName} and {student2Name} split a takeout order.',
      'The delivery driver put the two meals in the wrong bags.',
      'Now {studentName} has {student2Name}’s food, and vice versa.',
      'Worse, {studentName} seems to be allergic to one of the ingredients in {student2Name}’s order.',
    ],
    prompt: 'You’re on the scene. How do you handle it?',
    options: {
      swap_back: {
        text: 'Swap back. Everything to its rightful owner.',
        outcomes: [
          'They swap containers. {studentName} looks at the other one and says, “Yours actually looks better.” {student2Name} looks at it and says, “Then let’s swap back.”\n\nA little later, the conversation repeats itself, and they swap again. In the end, each of them eats exactly what they originally ordered. It takes twenty minutes.',
          'The swap goes smoothly and {studentName}’s allergy crisis is averted. But {student2Name} finds {his2} food has gone cold, because {studentName} was taste-testing it a minute ago. {student2Name} maintains a dignified silence, then quietly adds a note to {his2} next order: “No group orders.”',
        ],
      },
      random_assign: {
        text: 'Let fate decide. Destiny’s lunch.',
        outcomes: [
          'You suggest they each eat whatever they ended up with. It’s fate. {studentName} picks around the allergen, eats the rest, and declares it “pretty good.” {student2Name} gets halfway through and says, “I thought I didn’t like this dish, but it’s actually fine.” An unexpected lunch, unexpectedly peaceful.',
        ],
      },
      eat_all: {
        text: 'Put it all out, share everything, call it even',
        outcomes: [
          'You announce: one table, everything shared, no need to split the bill. {studentName} and {student2Name} exchange a look and push all the containers to the middle of the table. Three nearby students drag their chairs over. Nobody invited them, but nobody tells them to leave either.',
          'The shared meal begins. {studentName} accidentally eats the allergen, quickly takes a sip of water to keep it down, and has no real reaction, though {his} face stays red for half an hour.\n\n{student2Name} notices and asks, “You okay?” {studentName} says, “I’m fine. Engineering problem.”',
        ],
      },
    },
  },

  group_comment_war: {
    title: 'The Comment Holy War',
    description: [
      'During code review, {student2Name} rewrote every one of {studentName}’s comments.',
      '{studentName}’s commenting style: brief, sometimes abstract, occasionally a single word.',
      '{student2Name}’s commenting style: exhaustive, fully referenced, on every line.',
      'Now {studentName} is demanding a revert, and {student2Name} says the original was garbage.',
    ],
    prompt: 'A dispute over comment sovereignty. Your ruling?',
    options: {
      judge: {
        text: 'Review both versions and keep the better one',
        outcomes: [
          'You go through both versions line by line. {studentName}’s is concise but unfriendly to newcomers. {student2Name}’s is detailed, but in three places it gets the code’s actual behavior wrong.\n\nYou order a merge: {studentName}’s skeleton, plus {student2Name}’s key explanations. They both say “fine” at the same moment, in perfect harmony.',
          'After reviewing, you point out that three of {student2Name}’s comments don’t describe what the code actually does. {student2Name} stares at them for a long time and says, “The logic here should be… oh.” The code itself was wrong. The two of them shake hands, make peace, and start fixing the bug.',
        ],
      },
      mediate: {
        text: 'Split the difference. Both sides have a point.',
        outcomes: [
          'You say both are right, each has its merits, and suggest they work it out. {studentName} and {student2Name} go back to their own desks to negotiate for thirty minutes. Then {studentName} opens a PR that deletes every comment and leaves only the code. PR description: “Resolution.”',
        ],
      },
      ban_comments: {
        text: 'Announce: no more comments in code, ever',
        outcomes: [
          'You declare that code should explain itself, and comments are banned. {studentName} is instantly relieved. {student2Name} goes quiet for a long time, then sends a message: “So can I use really long variable names?” You realize you’ve opened Pandora’s box.',
          'After the no-comments order goes out, {student2Name} moves all the explanatory text into function names, bringing the average function name to 47 characters. Readability plummets, but it’s within the rules. Technically, it’s compliant.',
        ],
      },
    },
  },

  group_nap_spot: {
    title: 'The Nap Territory Dispute',
    description: [
      'The lab has one folding lounge chair, which by universal agreement is the de facto best nap spot.',
      'Today, right after lunch, {studentName} and {student2Name} head for it at the same time.',
      'Both stop two meters from the chair and begin a silent standoff of meaningful looks.',
    ],
    prompt: 'The territorial dispute is unfolding at the slowest possible speed. Do you intervene?',
    options: {
      schedule: {
        text: 'Set a rotation: odd days and even days',
        outcomes: [
          'You make the call: odd days go to {studentName}, even days to {student2Name}. The system launches and runs smoothly, until the 31st and the 1st come back to back, two odd days in a row. After two straight days sleeping on the floor, {student2Name} raises serious objections to the system.',
          'Day one goes smoothly. On day two, it’s {student2Name}’s turn, but {studentName} forgets and gets there first. {student2Name} stands there watching for three seconds, folds up {his2} jacket, and puts {his2} head down on the desk without a word. You owe {him2} one.',
        ],
      },
      first_come: {
        text: 'First come, first served. Old-school rules.',
        outcomes: [
          'You declare first come, first served. Over the next two weeks, both {studentName} and {student2Name} eat lunch about 30% faster. Lab nap efficiency reaches an all-time high, but with lunches getting faster and faster, it’s unclear whether this counts as healthy.',
        ],
      },
      buy_chair: {
        text: 'Buy a second chair. Solve it at the root.',
        outcomes: [
          'You spend $300 on an identical folding chair and bring it into the lab. {studentName} and {student2Name} each claim one, and both sleep soundly all afternoon. Your most successful resource-allocation decision of the month.',
          'The new chair arrives, but {studentName} says it isn’t as comfortable as the old one and wants to keep using the old one. You realize this is no longer about resources. It’s about belonging. You decide to stay out of it and let time sort it out.',
        ],
      },
    },
  },

  group_citation_cartel: {
    title: 'The Citation Cartel',
    description: [
      '{studentName} pulls {student2Name} aside and says, in a low voice:',
      '“I cite one of yours, you cite one of mine. Both our h-indexes go up, and nobody owes anybody.”',
      '{student2Name} thinks about it for roughly four seconds and says, “Go on.”',
      'You accidentally overhear the second half of the conversation.',
    ],
    prompt: 'An academic citation alliance. Where do you stand?',
    options: {
      discourage: {
        text: 'Talk them out of it. This isn’t the way.',
        outcomes: [
          'You talk to each of them separately and explain that this is taboo in the field and could damage their credibility if anyone notices. {studentName} says, “It’s just a casual citation, it’s not like we’re faking data.” {student2Name} says, “Everyone in the field does this.” You talk for thirty minutes. You don’t fully convince them, but they put the plan on hold for now.',
          'You talk them out of it, and they accept. A month later, each of them carefully cites the other’s related work in their papers, well justified and in full context. This time it’s legitimate, but you’re not sure whether that’s because of your talk.',
        ],
      },
      look_away: {
        text: 'Pretend you didn’t hear. The ecosystem regulates itself.',
        outcomes: [
          'You pretend you didn’t hear and walk back to your office. Over the next semester, both of their h-indexes tick up a little. Nobody is affected, nobody gets caught. You selectively forget the whole thing.',
          'You don’t intervene. The two of them cite each other, then tell two other students about the method, and those two start citing each other too. Your lab gradually forms a small closed citation loop, which earns a yellow warning flag from an indexing service.',
        ],
      },
      join_expand: {
        text: 'Join in, and bring the whole lab along',
        outcomes: [
          'You call the whole lab together and announce: everyone writes a serious survey and you all cite each other, on the condition that every citation is genuinely relevant. It turns into an organized literature review effort. Three months later the lab’s output is up, and the citation chains hold up to scrutiny. Sometimes direction matters more than motive.',
          'The lab-wide mutual citation plan launches. Two weeks later, a reviewer writes: “The reference list of this work exhibits pronounced self-citation clustering.” You have to explain in the rebuttal that you are simply a small, close-knit research group. The reviewer is not entirely convinced.',
        ],
      },
    },
  },

};
