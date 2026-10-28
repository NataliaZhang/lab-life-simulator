import type { EventTranslations } from '../../../types/i18n';

// English overlay for src/data/events/daily_life.ts ("small thing becomes a big deal" lab-life events).
export const dailyLifeEventsEn: EventTranslations = {

  // ── 1. Coffee machine crisis ──────────────────────────────────────────────

  coffee_machine_crisis: {
    title: 'Day Four Without the Coffee Machine',
    description: [
      'The lab’s coffee machine is broken. The silver machine that has been here since the lab’s first year sits quietly in the corner with a sheet of printer paper taped to it: “Under repair, do not touch,” dated four days ago. Nobody knows how the repair is going, nobody dares remove the sign, and nobody knows who put it there.',
      'It is Monday, 9 a.m. The mood in the lab is a sneeze that won’t come. Productivity is not the issue. That isn’t the point. The point is that coffee, as a ritual, has been offline for ninety-six straight hours. Someone has started making instant with hot water. Someone else looks at the cup of instant, frowns very slightly, and puts on headphones.',
    ],
    prompt: 'Day four of the coffee outage. You decide to…',
    options: {
      buy_new_machine: {
        text: 'Just buy a new one ($1K)',
        outcomes: [
          'The new machine arrives that afternoon, built-in grinder included. Someone unboxes it immediately and posts a photo to the group chat with the caption “reborn.” The moment the first cup pours, the whole lab visibly loosens up. Someone even starts humming. Nobody removes the “Under repair” sign from the old machine. It stays there for another two weeks, like a monument.',
          'The new machine arrives. Unbox, plug in, discover the plug is the wrong type. You spend an afternoon hunting for an adapter, find one, and the machine works fine. The whole thing eats the two hours you had set aside for your grant proposal. The proposal slips by three days. The grant later comes in $10K short. You’re not sure the two are causally related, but you think about it sometimes.',
        ],
      },
      self_service_coffee: {
        text: 'Suggest everyone buy their own coffee',
        outcomes: [
          'You post in the group chat suggesting that everyone handle their own coffee needs until the repair is done. The read receipts pile up for a while. Then someone replies “ok.” Decoding the information content of that reply requires knowing the sender’s usual texting style. You more or less decode it, and choose not to think about it further. Two weeks later, three travel mugs of three different brands have appeared in the lab, each the center of its own independent coffee ecosystem, with no contact between them.',
          'You suggest everyone handle it themselves, and while you’re at it you cut the lab coffee budget, citing a “temporary policy.” Not long after the message goes out, someone greets you warmly in the hallway, then comes back to ask when the coffee machine will be fixed. You say you’re not sure. They say “oh” and walk off. As the door closes, you faintly hear someone in the hallway exhale, hard.',
        ],
      },
      remote_week: {
        text: 'Everyone goes remote. Out of sight, out of mind.',
        outcomes: [
          'You announce a remote week. The reason given in the group chat is “equipment adjustment period.” Everyone works from home, progress holds steady, and someone even says “I actually code faster at home.” You decide not to look into what that means. The repair sign stays alone in the empty lab for five days. When everyone comes back it’s still there, as if nothing happened.',
          'On day three of remote work, you notice group meeting efficiency has collapsed. One person’s background audio is a takeout counter, one person’s camera never turns on, and one person’s reply time has gone from “instant” to “here, but.” On Friday you tally up the week’s output and decide to let the matter drop. The coffee machine gets fixed. The repair technician did it on Thursday while he was on campus for something else.',
        ],
      },
    },
  },

  // ── 2. The immortal whiteboard equation ───────────────────────────────────

  whiteboard_immortal: {
    title: 'That Equation on the Whiteboard',
    description: [
      'In the bottom right corner of the whiteboard there is a set of equations. No name, no date, no note saying which project it belongs to. People say it has been there for at least two years. It has survived three deep cleans and one lab move, miraculously preserved every time. Last month someone almost erased it, but the person next to them grabbed their arm: “Wait, are you sure that’s not something important?”',
      'Nobody knows whether it’s important. Nobody knows who wrote it. But nobody touches it. It just lives there, quietly occupying a patch of whiteboard about the size of a sheet of paper, getting yellower.',
    ],
    prompt: 'The orphaned equation is still on the whiteboard. You decide to…',
    options: {
      declare_heritage: {
        text: 'Declare it “Lab Cultural Heritage” and preserve it forever',
        outcomes: [
          'You draw a box around the equation in red marker, write “HERITAGE ZONE, DO NOT ERASE,” and sign and date it. Nobody questions the decision. Two months later, a visitor asks about the equation, and students start inventing backstories for it in a half-serious tone. Every version is slightly different and more outlandish than the last. The equation’s academic standing rises from “unknown” to “reportedly the starting point of a major breakthrough.” You never correct a single version.',
        ],
      },
      erase_it: {
        text: 'Erase it and be done with it',
        outcomes: [
          'On Friday afternoon, when the lab is mostly empty, you pick up the eraser and wipe the equations clean. Nobody is around. It goes smoothly. The next day, a student comes in and stands in front of the whiteboard for a long while, then just tugs their cap down a little lower and goes back to their desk. That patch of whiteboard stays empty. For about two months, nobody writes anything there.',
          'You erase the equations. That afternoon, the student who works on theory sends you a message in a suspiciously restrained tone: “Professor, do you remember what the thing on the whiteboard looked like?” You say you don’t really remember. The reply: “it’s fine” with no period. Three days later, that student solves a derivation they had been stuck on for two weeks. It has nothing to do with the equation. Pure coincidence. But you still kind of want to know what that equation was.',
        ],
      },
      investigate_equation: {
        text: 'Stare at it. What even is this?',
        outcomes: [
          'You take a photo of the equation and ask around in an academic group chat. After a while someone recognizes it: an intermediate step in a derivation from a 2018 paper, which went on to be cited nine times. You forward the link to the lab. Everyone clicks through and reads for a bit, and then someone says, “That’s not even our area.” The equation belongs to no one and isn’t especially important. But it finally has an identity, which is a kind of consolation.',
          'You dig into it for a good while and check a dozen-plus papers without finding a single match. The equations are most likely someone’s abandoned scratch work from the middle of a derivation: no conclusion, no meaning, just never erased. You report these findings to anyone who asks, in the form of “let’s just leave it for now,” in a tone of carefully concealed existential emptiness.',
        ],
      },
    },
  },

  // ── 3. Fridge mystery (chain start) ───────────────────────────────────────

  mystery_fridge_encounter: {
    title: 'The Presence in the Fridge',
    description: [
      'On the bottom shelf of the shared fridge sits a food container with a big question mark drawn on it in black marker. No name, no date. Some say it was there last semester. Some say earlier. Nobody can verify. It simply exists, taking up a third of the bottom shelf. The smell isn’t exactly bad, but… it is no longer the smell of food.',
      'A few days ago someone posted in the lab group chat: “Does anyone know whose thing that is in the fridge?” The message got zero replies and three stickers: a question mark, a cat looking off to the side, and a bear saying “I don’t know what you’re talking about.”',
    ],
    prompt: 'The fridge mystery has gone on for an entire semester. You decide to…',
    options: {
      handle_it_yourself: {
        text: 'Deal with it yourself, right now',
        outcomes: [
          'You put on kitchen gloves, take out the container, walk it to the hallway trash can, and open it for one look. Then you immediately close it, drop it in, turn around and walk back, expressionless the entire time. The best way to handle this kind of thing is to leave no room for discussion. Back in the lab, you say “fridge is cleared.” Nobody asks a follow-up question, and nobody thanks you. This is the correct ending.',
          'You open the container. The contents are hard to describe. You try to identify what food they used to be, without success. You throw it out, but the aftermath lingers in some region at the back of your head for the rest of the day, and you barely eat lunch. This cost more than you expected.',
        ],
      },
      post_notice: {
        text: 'Post a notice: unclaimed in 72 hours, it gets tossed',
        outcomes: [
          'You tape a sheet of paper to the fridge: “Container on bottom shelf. If unclaimed within 72 hours, it will be disposed of,” with the date and time noted. After the notice goes up, the whole lab enters a strange state of collective not-seeing. Nobody claims it, nobody asks about it, and everyone walking past the fridge looks straight ahead with unusual focus. After 72 hours, you dispose of it as promised. Due process followed. Zero guilt.',
          'The notice goes up. In the last three minutes of the 72 hours, someone sends you a message. You read it and take a deep breath.',
        ],
      },
      democratic_vote: {
        text: 'Put it to a vote. Majority rules.',
        outcomes: [
          'You start a poll in the group chat. The options: “Toss it,” “Wait 48 hours, then decide,” and “Owner please deal with it.”\n\nThe results: three votes for “Toss it,” one for “Wait 48 hours,” and one for “Not voting, this is too absurd.”\n\nDemocracy prevails. You throw it out, and come away with a new, quantified understanding of just how absurd the whole thing was.',
        ],
      },
    },
  },

  // ── 4. Fridge truth (chain follow-up) ─────────────────────────────────────

  mystery_fridge_truth: {
    title: 'The Fridge Mystery: Solved',
    description: [
      'Someone knocks on your door. It’s {studentName}, wearing a complicated expression somewhere between guilt and “honestly, I also don’t think it’s a big deal.” “Professor, about the fridge thing… it was mine.”',
      'The explanation: it was a fermentation project. The original goal was homemade pickles, using a modified fermentation recipe that should have been safe and controlled in a sealed environment. It was forgotten because of midterms week, followed by a paper deadline, followed by a string of failures in another experiment. The pickles were more than two months past their fermentation window. Their exact condition will not be described.\n\n{studentName}’s expression is somewhere between mourning and relief.',
    ],
    prompt: 'The owner of the fridge mystery has come forward. You decide to…',
    options: {
      let_it_go: {
        text: 'Let bygones be bygones',
        outcomes: [
          'You say it’s already been dealt with and there’s no need to pursue it, but next time, please label anything in the shared fridge with a name and date.\n\n{studentName} thanks you, visibly relaxing. As {he} turns to leave, {his} shoulders drop about an inch. The matter is closed. Nobody in the lab chat ever mentions the container again, but for the next two months the word “fermentation” occasionally triggers a small wave of discomfort.',
        ],
      },
      diplomatic_debrief: {
        text: 'Have a friendly talk',
        outcomes: [
          'You have a gentle, completely heat-free chat about the principles of shared-space etiquette, with an attitude of understanding.\n\n{studentName} nods earnestly and says, “You’re right, Professor, I’ll be more careful.” You estimate this statement to be about seventy percent sincere.',
          'You say a few things about shared responsibility, and without meaning to, a note of seriousness creeps into your voice. {studentName} nods rapidly: “I’m sorry, Professor, it won’t happen again.” On the way out, you can feel {his} pace pick up noticeably.\n\nThis conversation will probably stay in {studentName}’s memory a lot longer than you intended, though not quite in the way you intended.',
        ],
      },
      install_fridge_policy: {
        text: 'Legislate: a Fridge Charter, effective immediately',
        outcomes: [
          'That afternoon you draft the “Lab Shared Refrigerator Usage Guidelines,” requiring every item to be labeled with a name, date stored and expected pickup date. Overdue items are automatically considered ownerless. The document is printed and taped to the fridge.\n\nOne student remarks privately that it reads “like a landlord’s rulebook,” but for the next two semesters, no unidentified presence ever appears in the fridge again.\n\nDrafting regulations bought order. The price: one afternoon.',
        ],
      },
    },
  },

  // ── 5. AC war ─────────────────────────────────────────────────────────────

  ac_warfare: {
    title: 'The Thermostat War',
    description: [
      'Two informal factions have formed inside the lab: the 22°C faction and the 26°C faction. By incomplete count, someone has secretly adjusted the thermostat more than once in the past two weeks. Nobody admits to it. A portable space heater has appeared on a desk by the window. A small USB fan has appeared on a desk by the door. They are three desks apart, each running, neither interfering with the other.',
      'At group meeting last Friday, someone said “it’s a little cold,” someone else said “it’s fine,” and the whole topic was quietly dropped by unspoken group consensus. But this is clearly not over. The coexistence of these two appliances has evolved from “temporary measure” into “territorial claim.”',
    ],
    prompt: 'The thermostat factions are now openly at odds. You decide to…',
    options: {
      impose_24: {
        text: 'Decree 24°C and enforce it',
        outcomes: [
          'You post your ruling in the group chat: “The AC is set to 24°C, no further adjustments. Anyone who disagrees may adjust their clothing.”\n\nBy that afternoon, both the heater and the fan have quietly disappeared. Whether they were put away or abandoned in a drawer somewhere, nobody knows.\n\nThe two factions enter a state of surface-level peace. You still occasionally see one person wearing an extra jacket and another with sleeves rolled to the elbow.\n\n24 degrees is the greatest common divisor this lab can negotiate.',
          'You rule 24°C and lock the remote in a drawer. For the first three days, the policy works well.\n\nOn day four, you come in to find the space heater resurrected, on the grounds that “it’s just blowing air, not heating.” You decide not to litigate definitions, re-lock the drawer, and explain that blowing air isn’t allowed either.\n\nThe heater’s owner says they understand and unplugs it, but every time they walk past it, their eyes linger on it a beat too long.',
        ],
      },
      ac_schedule: {
        text: '26°C in the morning, 22°C in the afternoon',
        outcomes: [
          'The plan is fair and reasonable: everyone gets half the time. A schedule is posted next to the AC, carefully formatted. The thing is, the 22 faction does its core work in the afternoon, and the 26 faction prefers to code in the morning. The schedule happens to match everyone’s needs exactly, a complete accidental victory. Both factions think they won. You don’t explain.',
          'In week two, someone notices that the switchover lands right in the middle of the daily group meeting, so every temperature change happens at the most critical point of the meeting. The heat clicks off, the cold air hums on, and the whole room loses focus.\n\nYou revise the schedule. Then someone says the revised version conflicts with their lunch. You revise it again… The schedule eventually goes through seven versions.',
        ],
      },
      let_them_sort_it: {
        text: 'Stay out of it. Let them negotiate.',
        outcomes: [
          'You choose not to intervene. They do not, in fact, work it out themselves. Three weeks later, the lab has a second space heater, a second USB fan, and one person who now sits at their desk in a knit beanie, claiming it’s “just for warmth.”\n\nThe thermostat settles into a quantum superposition that differs every day, depending on who arrives first.',
        ],
      },
    },
  },

  // ── 6. Visitor at the worst time ──────────────────────────────────────────

  visitor_worst_timing: {
    title: 'VIP Arriving in Twenty Minutes',
    description: [
      'You glance at your calendar. Then you stand in the lab doorway and glance at the lab.',
      'Someone is napping face-down on their keyboard, headphones still on. On top of one monitor sits a half-eaten box of takeout, lid askew, chili oil showing. The whiteboard is covered in dense formulas, one line circled with “???WRONG???” next to it. The cables on the floor have formed a complex topological structure.',
      'Twenty minutes left.',
    ],
    prompt: 'An important visitor is about to arrive and the lab is in worrying shape. You decide to…',
    options: {
      emergency_cleanup: {
        text: 'Emergency mobilization. Everyone cleans.',
        outcomes: [
          'You wake up the napper, the takeout box goes into the hallway trash, the cables are wrangled into a roughly tidy bundle, and the whiteboard gets flipped around. Nineteen minutes later, the lab has been upgraded from “crash site” to “active research facility.” The visitor arrives, takes a tour, and remarks that it “has a real research atmosphere.”\n\nThis comment sends you briefly into deep reflection on the word “atmosphere.”',
          'Fifteen minutes into the emergency cleanup, someone knocks over the takeout and chili oil spills across the floor. Cleaning it takes an extra seven minutes. When the visitor arrives, you are finishing the floor with a paper towel that has turned red. The visitor cheerfully pretends not to see anything, and you have a substantive conversation. Later the visitor posts online about “visiting a really vibrant lab” with a photo. You notice a spot of red at the edge of the frame, but the angle is tricky and it’s hard to tell what it is.',
        ],
      },
      honest_tour: {
        text: 'Give an honest tour. This is what research looks like.',
        outcomes: [
          'You greet the visitor and give the tour with no cleanup and no excuses. Passing the napper, you say, “We’re in a high-intensity phase before a deadline. Irregular sleep schedules are normal.”\n\nAt the takeout, you say, “The team works long hours in the lab, so meals mostly happen on-site.”\n\nThe visitor nods seriously and later describes the tour as “very authentic, deeply memorable.”\n\nThis is one of the most confusing pieces of positive feedback you have ever received.',
          'You give the visitor an honest tour. Right then, {studentName}, still napping, rolls over, {his} headphones pop out, and a very loud burst of video game sound effects fills the room.\n\nThe visitor smiles, waits for it to stop, and says, “Good to see everyone finds ways to blow off steam.” You feel the social cost of this visit was slightly higher than anticipated.',
        ],
      },
      reroute_to_conference: {
        text: 'Move the meeting to the conference room',
        outcomes: [
          'You send a quick message and have the visit rerouted to the conference room. The visitor walks in to clean white walls and a long table, and you have an hour of formal discussion: smooth, professional, respectable.\n\nAfter the visitor leaves, you go back to the lab. The takeout is still there. The napper is awake now and asks whether the visitor toured the lab. You say you went to the conference room. They nod and put their headphones back on.',
        ],
      },
    },
  },

  // ── 7. The eternal FIXME──────────────────────────────────────────────────

  eternal_todo_unearthed: {
    title: 'The TODO That Has Lived for Two Years',
    description: [
      'During a code review, someone finds this comment: `// TODO: do this properly later — 2022-03-15`.',
      'The date is more than two years ago. Whoever wrote it has graduated, or switched directions, or it was you. You’re no longer sure. What complicates things: the function containing this comment is now the core call chain of the entire inference pipeline.\n\nNobody knows what “properly” meant back then, and nobody dares touch it, because it does currently run, and it seems… fine.',
    ],
    prompt: 'A two-year-old TODO has become core infrastructure. You decide to…',
    options: {
      attempt_the_fix: {
        text: 'Try to fix it for real',
        outcomes: [
          'You spend three days refactoring the code, write strict unit tests, and cover the edge cases. The refactored version is cleaner, and it does fix a latent numerical precision issue in the original.\n\nNobody can be sure this is the “properly” that was meant back then, but at least the comments prove you took it seriously.',
          'Halfway through the refactor, you discover a subtle coupling between that code’s logic and three downstream modules. Touch it and everything breaks.\n\nYou spend two more days restoring the original, change the comment to `// TODO: do this properly — 2022-03-15 (tried, leaving it for now) — [today’s date]`, and hand it off to the next person. The chain lives on.',
        ],
      },
      document_it: {
        text: 'Write detailed comments and docs',
        outcomes: [
          'You spend half a day writing a thorough comment block explaining the code’s known behavior, its potential risks, and why it’s being left as is for now. The documentation is committed to the repo.\n\nIt doesn’t solve the problem, but it freezes the problem in its current state, which is about the most dignified thing anyone can do in the field of technical debt management.',
        ],
      },
      promote_to_known_limitation: {
        text: 'Promote it to a “known limitation” and put it in the paper’s limitations section',
        outcomes: [
          'You make a call: this is not a bug, this is a limitation. You add a paragraph to the paper’s limitations section stating that “the numerical stability of the current implementation under extreme input distributions has not been fully validated.” Academic in tone, unimpeachable.\n\nNo reviewer asks what this sentence actually means. The TODO in the code is changed to `// KNOWN LIMITATION: see paper Section 5.2`. Freshly rebranded, it has completed a glamorous career change.',
        ],
      },
    },
  },

  // ── 8. Desk archaeology ───────────────────────────────────────────────────

  desk_archaeology: {
    title: 'Archaeology at the Year-End Cleanup',
    description: [
      'Year-end cleanup. Someone moves a desk, starts clearing out the space underneath, then stops and calls you over.',
      'Inventory of the space under the desk: three keyboards from different eras (one of them wired), two monitors (both power on, both incompatible with every port currently in use), a 2019 deep learning textbook (spine perfectly intact, suspected never opened), and a black USB drive with a handwritten label: “IMPORTANT - DO NOT DELETE,” with no further explanation. Next to the USB drive is half a bag of chips, expired but still sealed. Nobody knows whose any of this is.',
    ],
    prompt: 'A trove of ownerless artifacts has been excavated from under a desk. You decide to…',
    options: {
      check_the_usb: {
        text: 'Plug in the USB drive and see',
        outcomes: [
          'You find a spare computer and plug in the drive. Inside: a file named “final_REALLY_final_this_time_for_real_v7.pptx,” an unnamed zip archive containing raw data from a 2021 group meeting, a photo of a cat, and a txt file with three lines: “If you’re reading this, you found it. My original experimental data is in here. Get in touch.” Below it is the handle of a long-dead chat account.',
          'You plug in the drive. It shows up as read-only, and the file system throws an error. Nothing is accessible. You try several computers. Same result every time.\n\nThe drive may be dead, or it may have some exotic internal file system, or it may never have held anything important at all, and “IMPORTANT - DO NOT DELETE” was just a form of emotional self-reassurance.',
        ],
      },
      archive_everything: {
        text: 'Archive it all and label everything',
        outcomes: [
          'You sort everything neatly: the keyboards and monitors get “spare equipment” labels and go into the storage room, the textbook goes on the lab bookshelf, the USB drive goes into a drawer marked “to be processed,” and the chips go in the trash. Afterward the lab is clean, and every problem has been legally deferred to the storage room. A year later someone opens the storage room, finds all of it, and the whole process repeats.',
        ],
      },
      throw_it_all: {
        text: 'Throw it all out. Clean slate.',
        outcomes: [
          'You bag up all three keyboards, both monitors, the textbook, the USB drive and the chips.\n\nThat afternoon {studentName} walks by and asks, “Was there a black USB drive in there?” You say it’s already been thrown out. {studentName} walks away with a restrained sort of regret.\n\nYou will never know whether that USB drive really mattered to {studentName}, but the space you cleared makes it feel worth it.',
          'You throw everything out, clean and decisive. Two days later, a former student who graduated years ago messages you asking whether the lab cleanup touched a certain desk. He left a USB drive there with the raw data from his thesis. He’s already graduated, but he’d like to keep it as a memento.\n\nYou stare at the message for a long time, finally reply “it’s here,” and go downstairs to dig through the dumpster.',
        ],
      },
    },
  },

  // ── 9. The lab stray cat ──────────────────────────────────────────────────

  lab_stray_cat: {
    title: 'The Cat Is Back',
    description: [
      'The lab’s windows face south, close to the ground floor, and the windowsill is exactly the height a stray cat can jump to. It first showed up three weeks ago. {studentName} put out a few crackers for it, and now it comes every day. It has its own corner now, the rug by the radiator pipe that {studentName} brought from home, and a name, which {studentName} also gave it.',
      'Yesterday it walked across an unlocked laptop and sent a message, typed by its paws, to the group-meeting channel: “vbbbbbbbbnnn.” Two people reacted with a thumbs-up.',
    ],
    prompt: '{studentName} has established what amounts to residency for this cat. You decide to…',
    options: {
      officially_adopt: {
        text: 'Make it official. Put it on staff.',
        outcomes: [
          'You approve the cat’s application to join the group and buy cat food, cat litter and a little litter box.\n\n{studentName} creates a profile for it, including photos, its arrival date, and “vbbbbbbbbnnn” as its first scholarly contribution.\n\nThe cat becomes the only member of the lab so far who doesn’t have to write an annual progress report. Activity in the group chat goes up by an order of magnitude, and everyday conversation finally has a non-research option.',
          'The cat is officially taken in, full kit purchased. Then the trouble starts. Someone turns out to be allergic to cat hair, which they discover after two weeks in the lab, and their eyes stay red for three days. The litter box’s location and the room’s airflow combine into a dynamic nobody can ignore. In week two, the cat climbs onto the server rack and sets off an overheating alarm on one of the experiment machines.\n\nBut every time group meeting ends and it comes over to walk a lap across everyone, nobody can bring themselves to send it away.',
        ],
      },
      unofficial_mascot: {
        text: 'Treat it as the unofficial mascot. Say nothing.',
        outcomes: [
          'You don’t take a clear position, and {studentName} doesn’t ask for anything more. The cat comes every day, leaves every day, and sometimes sleeps in its corner until evening. A screenshot of its Slack message is pinned to the whiteboard, labeled “Most engaged post in lab history.” People going out for coffee pick up a can of cat food on the way. Nobody tracks how much it costs, and nobody asks. This arrangement lasts a whole semester, and everyone is satisfied, including the cat.',
        ],
      },
      escalate_to_policy: {
        text: 'Escalate it. Go through the official “workplace animal” process.',
        outcomes: [
          'You write up a summary of the situation and submit it to the dean’s office. Admin replies that this must go through the procedure under the university’s Interim Regulations on Animals on Campus, which requires an animal health certificate, a room assessment report and the building manager’s signature. You make two phone calls and fill out one form. The building manager says he needs to check with his superiors.\n\nThree weeks later there has been no progress. The cat still comes every day and leaves every day, entirely unaware of the approval process, and entirely unconcerned.',
        ],
      },
    },
  },

  // ── 10. Printer apocalypse ────────────────────────────────────────────────

  printing_apocalypse: {
    title: 'The Printer Quits Three Days Before the Deadline',
    description: [
      'Three days until the paper submission deadline. The printer is broken. Not a paper jam: the rollers have completely failed and the print head is misaligned, so every page comes out as a new art form. The campus print center shows a 48-hour queue, with 217 documents ahead of you. The nearest off-campus print shop is 40 minutes away by bus, with a transfer.',
      'Worse: everyone needs to print the same 50-page set of forms. The kind the university insists must be on paper, filled out, signed and then scanned for submission. The absurdity of this process defies all rational explanation, but now is not the time to discuss it.',
    ],
    prompt: 'The printer has died at the worst possible moment. You decide to…',
    options: {
      find_workaround: {
        text: 'Mobilize everyone’s network to find a printer',
        outcomes: [
          'You post on social media with a short, restrained but unmistakable call for help.\n\nBefore long, a group in the building next door replies that their printer still works and you’re welcome to use it. The lab goes over in shifts and spends the afternoon there. An entry goes into the favor ledger, redeemable for one joint review of equal value.\n\nThe forms are printed and submitted before the deadline. A close call, but no harm done.',
          'The network mobilizes, but the printer it finds is on another campus, three hours round trip. The student who goes brings back the printed forms, along with an exhaustion far out of proportion to the errand. Printing is done and the forms go in one hour before the deadline, but in between someone discovers a page missing a signature, and it takes an Uber round trip to fix. Overall, a success, at a price.',
        ],
      },
      buy_cartridge: {
        text: 'Buy parts and fix it yourselves',
        outcomes: [
          'You order ink cartridges and a replacement roller with expedited shipping, and they arrive that afternoon. A student on the engineering side volunteers to take the printer apart, swaps the roller following a video tutorial, and the printer runs again. When the first page comes out, someone films it. It becomes the most dramatic event in the lab in three weeks, and the lab repair budget gains a new line item.',
          'The parts arrive. The engineering-minded student takes the printer apart, swaps the parts, reassembles it, and starts it up. It prints three pages, stops, and throws an error code nobody has ever seen. Half an hour of searching turns up the explanation: another part was also broken, but it wasn’t in the original fault report. Collateral wear. You reorder, wait another day, finish the install four hours before the deadline, print, submit. It comes in at twice the budget. But it does get done.',
        ],
      },
      go_full_digital: {
        text: 'Refuse paper. Everything goes digital.',
        outcomes: [
          'You email the department chair, politely worded but unmistakable in meaning: the printer is broken, time is short, would digital submission be possible? The chair replies, “Yes, an exception this time.” You screenshot the reply and post it in the group chat. Someone says “we can do that?”, someone says “best surprise of the year,” and someone says “why didn’t we do this from the start.” All the forms are filled out electronically and signed with PDF e-signatures. It takes one afternoon, three times faster than any previous year. The experience makes you reconsider every process labeled “paper only.”',
          'You try to request digital submission, but the system is closed: the form only accepts scans of paper documents, with wet signatures. You call admin, get transferred three times, and are finally told, “Rules are rules. Digital submission requires a separate application, and approval takes two weeks.” You hang up, look at the calendar, call a cab, and go with your students to the print shop 40 minutes away. There you wait in line for an hour and a half, use a barely functional machine, and finish printing two hours before the deadline.',
        ],
      },
    },
  },

  // ── Midnight goose leg ────────────────────────────────────────────────────

  goose_leg_midnight: {
    title: 'Midnight Goose Leg',
    description: [
      'It’s almost eleven. {studentName} appears at your office door holding a greasy paper bag. The bag is open, and a goose leg is sticking out of it. Or rather, an object believed to be a goose leg.',
      'The problem is the color. The leg has an indefinable greenish tint, not the normal color of poultry. It’s closer to the color swatch a food safety manual would file under “recommend retesting.”',
      '{studentName} sets it on your desk and says excitedly, “Professor, the Goose Leg King stand outside the campus gate has been super popular lately. I waited in line for forty minutes and got you one. Keep your strength up.”',
      'The goose leg smells like normal roast goose. That is some consolation.',
    ],
    prompt: 'The goose leg sits there.',
    options: {
      goose_leg_eat: {
        text: 'Dig in',
        outcomes: [
          'The goose leg tastes normal, and the meat seems fine. At the time, all seems well. The next day you have a stomachache all day and can’t get any work done. You don’t mention it to anyone.\n\n{studentName} messages to ask how the late-night snack was. You reply, “Pretty good.” This is not entirely a lie.',
        ],
      },
      goose_leg_decline: {
        text: 'Politely decline. Something looks off.',
        outcomes: [
          '{studentName} puts the goose leg back in the bag, says, “Get some rest, then,” and leaves.\n\nThe hallway light catches {him} briefly on the way out, and the door swings shut. You stare at the grease mark the paper bag left on your desk for a while, and make a point of not thinking too hard about it.',
        ],
      },
      goose_leg_report: {
        text: 'Report the vendor',
        outcomes: [
          'You look up the complaint portal on the spot and have the report filled out before {studentName} has made it out of your office. You photograph the goose leg as evidence and attach it to the report.\n\n{studentName} pauses at the door, gives you a look that defies description, and leaves without a word.',
        ],
      },
    },
  },

  // Goose leg follow-up: the investigation result (chain event)
  goose_leg_investigation: {
    title: 'Goose Leg Investigation Results',
    description: [
      'A month ago you reported the goose leg stand outside the campus gate to the relevant authorities. The vendor cooperated with testing and the stand was temporarily shut down. The incident set off a two-week discussion on the campus forum. The top thread went from “A Report With a Conscience” all the way to “The Plight of Street Vendors in the Bitter Cold,” and finally sank out of sight as “Who Will Protect the Rights of Street Stalls?”',
      'Today, the official letter from the investigating office has arrived.',
    ],
    prompt: 'You open the letter.',
    options: {
      goose_leg_check_result: {
        text: 'Read the results',
        outcomes: [
          'The lab report confirms the sample is a goose leg, with every indicator in the normal range. The vendor is fully cleared and allowed to reopen immediately.\n\nA thread is promptly pinned on the forum: “An Apology to the Goose Leg Vendor Who Kept His Stall Open in the Bitter Cold.” Its view count climbs fast enough to watch. The comments are unanimous in condemning the heartless person who reported him. Luckily, your identity has not been exposed, for now. It is still enough of a scare that you can’t focus on a paper for half the day.',
          'The lab report states that the sample’s composition is complex, notes that it “cannot be confirmed as originating from any known domesticated poultry,” and recommends action per regulations. The vendor is fined and ordered to close for corrective measures. As for what kind of leg it actually was, the report says “source: to be determined.”\n\nThe forum erupts. People from the biology department, the vet school and the culinary society all join the debate, discussing the species of an unknown animal’s leg in an entirely academic tone. Your report is officially recognized as having “provided an important food safety lead.”',
        ],
      },
    },
  },

  // Real goose leg follow-up: trial by forum (chain event)
  goose_leg_apologize: {
    title: '“An Apology to the Goose Leg Vendor Who Kept His Stall Open in the Bitter Cold”',
    description: [
      'The thread hit #3 on the trending list at 1 p.m. and had over twenty thousand comments by evening. The vendor posted a reply under it: he has been selling goose legs outside this campus gate for twenty-three years, his supply has always been legal, the forced closure cost him a whole month of business, and he has elderly parents at home who need money for medicine. He attached three photos: his business license, his passed inspection certificate, and a picture of him setting his stall back up that night in the cold wind.',
      'Some commenters have started following the trail, and it’s already heading toward the lab building.',
    ],
    prompt: 'You’re going to have to respond eventually.',
    options: {
      goose_leg_apologize_admit: {
        text: 'Admit fault and apologize sincerely',
        outcomes: [
          'You reply under the thread in your own name, acknowledging that the sample’s appearance did raise reasonable suspicion at the time, but the test results were clean, and you are deeply sorry for the losses this caused the vendor. A wave of “okay, at least the attitude is decent” comes through, but the heat doesn’t die down because of it, and the thread stays up for several more days.',
        ],
      },
      goose_leg_report_justified: {
        text: 'Food safety first. Better a false positive.',
        outcomes: [
          'You reply under the thread in carefully precise language, stating that the report was made out of reasonable concern for public food safety and does not constitute a malicious complaint, and you attach the relevant regulations. The first comment underneath reads: “Can you say that like a normal person?” It is followed by forty thousand more comments, angrier than before.',
        ],
      },
    },
  },

  // ── Paper goes to the public ──────────────────────────────────────────────

  paper_to_public: {
    title: 'If the Reviewers Can’t Understand It',
    description: [
      'The paper has been rejected three times. ICOP said “insufficient connection to the field’s core open problems.” GRF said “generalization bounds not rigorously proven, experimental setup questionable.” The OWRC reviews ran a full two pages. After reading them carefully, you realized most of the content was about a 2011 paper that shares exactly one word with your submission.',
      '{studentName} comes to see you today, in a state somewhere between fury and enlightenment, and says one thing: “Professor, if the reviewers can’t understand it, that means this paper is meant for the general public.”',
      'This chain of reasoning rests on several debatable premises, but {studentName} is already holding out the submission page of a popular-science blog.',
    ],
    prompt: 'The submission page sits there, cursor blinking in the title field.',
    options: {
      paper_resubmit: {
        text: 'Keep polishing it for resubmission',
        outcomes: [
          'You and {studentName} spend two afternoons taking the reviews apart point by point, rewrite the introduction and contributions, and add a whole new section of experiments addressing GRF’s “generalization bounds” comment. Four months later it goes to IISC and gets accepted. The day the acceptance arrives, {studentName} messages you: “So the problem was how we told the story back in the ICOP round.” You do not reply, “I did mention that.”',
        ],
      },
      paper_go_public: {
        text: 'Submit it to the blog',
        outcomes: [
          'The editor changes the title to “SHOCKING: Formula Rejected by Both ICOP and GRF Solves AI’s Most Stubborn Problem With One Simple Trick.” You and {studentName} both feel this title has several problems, but by that evening it has passed 30,000 views, and by the next morning it has broken 100,000. By comparison, the paper’s all-time download count looks especially sad. {studentName} keeps staring at the analytics, and finally sends you a message: “Professor, I get why people do science communication now.”',
          'There is an abyss between the blog’s post editor and LaTeX. Equations turn to gibberish when pasted in, every figure’s aspect ratio breaks, and the references have to be reformatted one by one by hand. You and {studentName} sit there fixing formatting for nearly the entire night. The final version looks roughly fine on a laptop and has a small chance of looking fine on a phone. The post goes up at 7 a.m., misses every featured time slot, and ends up with forty-seven views. {studentName} opens the analytics, is silent for a moment, and says, “I need to go lie down.”',
        ],
      },
    },
  },

};
