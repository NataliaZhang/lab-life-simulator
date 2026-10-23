import type { EventTranslations } from '../../../types/i18n';

export const dailyBureaucracyEventsEn: EventTranslations = {

  // ════════════════════════════════════════════════════════════════════
  // SECTION 1: Daily bureaucracy
  // ════════════════════════════════════════════════════════════════════

  bureau_template_apocalypse: {
    title: 'The Template Changed',
    description: [
      'With 48 hours left before the deadline, the conference website quietly posts an announcement: the paper template has been updated. New margins, slightly tweaked fonts and line spacing, and “all authors must submit using the latest version.” You open the new template and drop your paper in. Nine pages become 10.3.',
      'The problem isn’t the 0.3 pages. The problem is that those 0.3 pages are spread across 23 figures, and every one of them needs to be resized, realigned and checked for resolution again. By your count, that is roughly the same as redoing every figure in the paper.',
    ],
    prompt: 'The template changed 48 hours before the deadline. What do you do?',
    options: {
      reformat_marathon: {
        text: 'Pull an all-nighter and reformat',
        outcomes: [
          'You open Overleaf, down two cups of coffee and start fixing the figures one by one. By 4 a.m. all 23 are done. The paper lands at exactly 9.97 pages, inside the 10-page limit, fully compliant, with margins accurate to within 0.01 mm. Submitted.\n\nYou close the laptop and think: academia has a special kind of suffering, and it was designed specifically for formatting.',
          'You reformat all night, adjusting the figures over and over. Somewhere around figure 18 you accidentally set the references to 8pt, and you don’t notice until five minutes before submission. You change it back, the formatting breaks, you recompile, and the countdown hits zero. You are forty seconds late. The system won’t accept it.\n\nYou stare at the error page and feel something in your head quietly disconnect. Then, very calmly, you start looking up the AC’s email address. Your logic is sound. Your hands are steady.',
        ],
      },
      submit_as_is: {
        text: 'Submit with the old template and bet the reviewers won’t care',
        outcomes: [
          'You submit with the old template and add a note in the comments field: “Please note that the template was updated less than 48 hours before the deadline.” The tone is polite but firm, the logic airtight. The conference never responds. The paper goes out for review.\n\nTo this day, you don’t know whether anyone noticed those 0.3 pages.',
          'The paper is desk rejected for formatting. The notification arrives three hours after the deadline and is brief: for formatting requirements, see the latest template on the conference website. You want to argue, but the email came from a no-reply address.\n\nYour anger is undeliverable. In the end it gets filed in your “Reviewer Problems” folder, which already has seven subfolders. You make a new one: “Admin Problems.”',
        ],
      },
      request_extension: {
        text: 'Ask the conference for an extension',
        outcomes: [
          'You send the organizing committee a well-reasoned email explaining that the template timeline is unreasonable and requesting a 48-hour extension. You get an auto-reply: Your message has been received. A member of our team will respond within 5–7 business days.\n\nThe deadline is tomorrow. You close the window and start reformatting.',
        ],
      },
    },
  },

  bureau_submission_portal_dies: {
    title: 'The Submission Portal Is Down',
    description: [
      '11:45 p.m. The deadline is midnight. Your paper is ready. You open the submission system, the page spins for about three seconds, and then it shows an HTTP 503. You refresh. 503. Refresh again. 503. The conference’s official Twitter account posted three minutes ago: “We are aware of the issue and working to resolve it.”',
      'You open academic Twitter and find 1,400 people going through the same thing. One big name in the field is posting in all caps. Someone else is live-updating their refresh count. It is a strange form of collective action: everyone refreshing the same page simultaneously, separately and uselessly.',
    ],
    prompt: 'The portal is down and you have fifteen minutes. What do you do?',
    options: {
      keep_refreshing: {
        text: 'Keep refreshing until it comes back',
        outcomes: [
          'At 11:58 p.m. the page suddenly comes back to life. You upload, fill in the form and confirm faster than you have ever done anything, and the confirmation email arrives at 11:59:47.\n\nYou let go of the mouse. Your hands are shaking a little. Not from nerves. It’s the physical aftermath of the last thirteen minutes.',
          'The system comes back three minutes before midnight, but all that refreshing has messed up your browser cache. The upload fails its file check, and the retry times out. Submissions close.\n\nOn Twitter, people are celebrating their successful submissions. You feel a loneliness that goes all the way to the bone.',
        ],
      },
      contact_chairs: {
        text: 'Email the program chairs for help',
        outcomes: [
          'You email the PC chairs, explain that your paper was ready but the outage kept you from submitting, and attach the PDF. A reply arrives two days later: “Thank you for your feedback. The submission system outage has been logged. Affected authors may resubmit within 24 hours.”\n\nYou resubmit. The whole thing felt like having a productive conversation with a wall.',
          'You send the email and never hear back. You submit once the system recovers, but the timestamp reads 00:07, past the midnight deadline.\n\nTo this day you don’t know whether the paper ever entered review. The rejection notice you got later offered no clues. Maybe it was rejected. Maybe it was thrown out for being late. That question will never have an answer.',
        ],
      },
      go_to_sleep: {
        text: 'Go to bed and try again at 6 a.m.',
        outcomes: [
          'You shut the laptop. The outage isn’t your problem, you tell yourself, and conferences usually extend the deadline when this happens. At 6 a.m. the system is back up, and the conference has announced an extension to noon.\n\nWhile everyone else is still on the forums asking each other “Can you submit yet?” you quietly submit your paper, and even have time to check the references.',
          'The system came back at 3 a.m., with no extension. You open your laptop at 6 a.m. to an email: Submissions closed at 00:00. No further submissions will be accepted this cycle.\n\nYou take your first sip of coffee, and something inside you quietly breaks.',
        ],
      },
    },
  },

  bureau_ethics_review_ml: {
    title: 'Ethics Review Required',
    description: [
      'You receive an automated email: Your paper, “On Gradient Descent-Based Optimization Strategies,” has been flagged and requires an ethics impact assessment before submission. Required materials: an ethics impact statement of no fewer than 3,000 words, two letters of reference, and written approval from the ethics committee. Review takes 6 to 8 weeks.',
      'The paper is about the convergence properties of gradient descent. It involves no human subjects, no data collection, and no action that could be performed on any real individual. It doesn’t even have an application. It is just a study of a mathematical algorithm. You reread the criteria that trigger an ethics review and find the keyword: “artificial intelligence.”',
    ],
    prompt: 'A pure theory ML paper has triggered an ethics review. What do you do?',
    options: {
      complete_process: {
        text: 'Grind through the full paperwork',
        outcomes: [
          'You spend two weeks writing the 3,000-word ethics statement: carefully worded, logically airtight, every paragraph citing the relevant policy clause. You get your two reference letters. The committee approves it in just five weeks, faster than expected.\n\nThe paper moves on to submission. You archive the 3,000-word statement, thinking you might need it again someday, and hoping you never will.',
          'Six weeks later the committee responds: the “Potential Societal Impact” section is not sufficiently detailed and must be expanded with “a specific quantitative analysis of effects on the job market.” This is a paper about the convergence rate of gradient descent.\n\nYou expand the section and wait another three weeks. The conference deadline has passed.',
        ],
      },
      push_back: {
        text: 'Appeal it: why was this even flagged?',
        outcomes: [
          'You write a detailed appeal explaining, point by point, that the study meets none of the ethics review criteria. You attach the committee’s official trigger conditions verbatim, with every one your study doesn’t meet marked in red. The committee replies: Your appeal has been forwarded to the relevant office. Please expect a response within 4 to 6 weeks.\n\nWhile you wait, you submit the paper to a conference that has no such requirement.',
          'Your appeal is denied. Reason: “The trigger mechanism is generated by an automated system and is not subject to human intervention.” You screenshot the sentence and send it to three colleagues, and each reply is different: one sends a spinning emoji, one sends “…”, and one sends a paper from 2019 with the note “I ran into this before.”\n\nThe paper eventually goes to a different conference with no problems at all.',
        ],
      },
      philosophical_statement: {
        text: 'Write 3,000 words: technically compliant, philosophically spiraling',
        outcomes: [
          'You write a fully compliant 3,000-word statement. Section 1 covers the historical origins of gradient descent. Section 2 explores the relationship between optimization algorithms and human cognitive biases. Section 3 introduces a discussion of “convergence” in an existentialist context. Section 4 returns to technical matters and explains, with a perfectly straight face, why this paper poses no threat to humanity.\n\nThe committee approves it. The reply is a single line: Materials complete. Approved.',
          'In the “Potential Impact” section, the committee finds a Nietzsche quote and asks you to clarify its “direct relevance to the present research.” You reply that it is a metaphor about gradients and the will. They go silent for ten days, then approve it with a note: “We recommend that future statements maintain an academic style.”\n\nYou file the email in a folder called “Worth Remembering.”',
        ],
      },
    },
  },

  bureau_meeting_email: {
    title: 'Mandatory Faculty Meeting',
    description: [
      'An email arrives: the department will hold a 2.5-hour all-faculty meeting at 2 p.m. today. Agenda: “General Updates and Other Business.” All faculty are expected to attend on time, and absences will not, in principle, be excused. Sent: 11:30 a.m. today. The meeting starts in thirty minutes.',
      'You look at today’s calendar. This afternoon was supposed to be three Pomodoros of focused writing, a read-through of a student’s paper draft, and a block of thinking time that might finally move the bottleneck you’ve been stuck on for a year. All of that now gives way to “General Updates and Other Business.”',
    ],
    prompt: 'Two and a half hours of “General Updates and Other Business.” What do you do?',
    options: {
      attend_laptop: {
        text: 'Go, but bring your laptop to “take notes”',
        outcomes: [
          'You sit in the back row, laptop open, looking focused. You really are taking notes. They just happen to be your paper draft. Midway through you answer a question about lab safety rules and come across as highly engaged.\n\nBy the end of the meeting you’ve finished two subsections, with better focus than you ever get in your office, probably because nobody can knock on your door.',
          'Forty minutes in, the department chair calls on you to share your views on “research output standards for labs” just as you are changing the color scheme of a figure. You look up, glance at the slides, and improvise three sentences that are mostly coherent.\n\nAfterward a colleague walks over and asks, “Were you serious about that point?” You say, “Yes,” and offer no further explanation.',
        ],
      },
      attend_fully: {
        text: 'Accept your fate and sit through all of it',
        outcomes: [
          'You listen attentively the whole time, take notes, join the discussion, and offer three concrete suggestions under “Other Business.” The chair adopts one of them on the spot.\n\nAfterward you realize that a new grant program mentioned in passing lines up closely with your next research plan. That alone was worth the two and a half hours.',
          'You sit attentively through all two and a half hours, which contain roughly as much useful information as an email you could read in five minutes. When the meeting ends you stand up with a tiredness you can’t argue with. Not the tiredness of having done a lot, but of having done nothing while not being allowed to do anything else.',
        ],
      },
      send_apology: {
        text: 'Send a very carefully worded apology',
        outcomes: [
          'You spend twenty minutes on a sincere email: “My lab is currently handling a time-sensitive submission and I am unable to step away. My sincere apologies. Please keep me informed of any important decisions.” The chair replies: “OK, noted.”\n\nYou put the two hours you saved into your paper and write half a section more than planned.',
          'You send your apology: good reasons, sincere tone. But afterward a colleague tells you the meeting covered TA assignments for the new academic year, and because your lab had “no representative present,” it got the heaviest tier: three undergraduate courses, six hours of class a week.\n\nThe email saved you two and a half hours. The teaching schedule is taking them back.',
        ],
      },
    },
  },

  bureau_reimbursement_quest: {
    title: 'The Long Road to $35',
    description: [
      'Four months ago, at a conference, you had a $35 working meal, kept the receipt, and filed for reimbursement exactly as instructed. Four months later, the $35 is still “under review.” When you contact the finance office for the third time, you finally get an answer: your request requires an updated supplementary explanation form. Please complete form B-7 (rev. 2024) and resubmit.',
      'You find form B-7 (rev. 2024). Box 3, “Department Chair Signature,” requires the signature of your department’s former chair, who retired last year, now lives in another city, and has no known contact information.',
    ],
    prompt: 'What are you willing to do for $35?',
    options: {
      escalate_to_chair: {
        text: 'Go over their heads to the department chair',
        outcomes: [
          'The chair hears the whole story, leans back, and says, “I’ll handle it.” Three days later the finance office reaches out on its own to say the form issue has been resolved and the $35 will be paid in the next payment cycle.\n\nTwo weeks later, $35 shows up in your account. Counting the time you spent on this, it works out to about $0.40 an hour. You decide that doesn’t matter. It’s the principle.',
          'The chair promises to handle it, but the matter then disappears into a procedural labyrinth that even the chair can’t get into. Six weeks later, the finance office informs you that the request has exceeded the reimbursement deadline (four months) and can no longer be processed.\n\nTotal: six months, seven emails, three phone calls and two in-person meetings. Result: $35, lost. You write the whole thing up in a document titled “Case Study.”',
        ],
      },
      abandon_the_35: {
        text: 'Let it go: call it tuition paid to the system',
        outcomes: [
          'You close the email. For $35 you got an in-depth look at the university’s financial system, which counts as one-of-a-kind fieldwork. You delete the item from your to-do list and feel a certain lightness.\n\nOn your next trip, you put everything on your own credit card and don’t file for reimbursement at all. Your quality of life improves by 30%.',
        ],
      },
      bureaucracy_speedrun: {
        text: 'Get reimbursed or die trying',
        outcomes: [
          'You reach a former colleague of the retired chair, get the contact information secondhand, and send an email. A reply comes within three days: happy to sign, but you’ll need to mail a paper form. You go to a print shop, print the form, get it notarized and mail it. Two weeks later the signed form arrives, and you resubmit it to finance.\n\nFinance informs you that form B-7 (rev. 2024) has been discontinued. Please use B-7 (rev. 2025).',
        ],
      },
    },
  },

  bureau_room_booking_fail: {
    title: 'Our Room Got Taken',
    description: [
      'It’s group meeting day. You arrive at the room you booked and find it already occupied: chairs arranged in a circle, someone unrolling a banner that reads “Mental Health Starts with Caring for Yourself.” Facilities informs you that the room is being used today for a “Department Wellness Promotion Event,” which takes priority over ordinary teaching and research meetings.',
      'You check your booking record. You made it eight days ago, before the event. Facilities says: “Wellness events are strategic departmental initiatives. In case of conflict, teaching and research activities should yield.” You stand in the hallway next to a potted pothos, which looks much calmer about this than you are.',
    ],
    prompt: 'Someone took your group meeting room. What do you do?',
    options: {
      find_another_room: {
        text: 'Find somewhere else to meet',
        outcomes: [
          'You search the booking system and find a small unbooked meeting room, just big enough. The projector is a little old, and the remote has no batteries. You borrow two AAs, and the meeting goes ahead as usual.\n\nA student remarks that the chairs here are more comfortable than in the old room. This is added to your future room-selection criteria.',
          'The system shows every room booked for the day. You end up holding group meeting in the lounge at the end of the hallway, around two coffee tables pushed together. Some people crouch, some stand, some sit on the floor.\n\nThe meeting is surprisingly efficient, probably because nobody wants to drag things out while standing. The format gets unexpectedly positive reviews.',
        ],
      },
      join_wellness: {
        text: 'Bring the whole group to the wellness event',
        outcomes: [
          'You push the door open and ask, “Mind if we join?” The organizer pauses, then says, “Of course.” For the next forty minutes, you and your students practice mindful breathing and fill out a “Stress Source Identification Worksheet.” The top three: deadlines, experimental results, and meetings with their advisor.\n\nAfterward, two students say this was more relaxing than group meeting. You decide to cancel group meeting for today.',
        ],
      },
      assert_booking_rights: {
        text: 'Argue your case with Facilities',
        outcomes: [
          'You pull up your booking record, send Facilities a screenshot of the timestamp, and point out that your booking predates theirs by eight days and should be protected under the rules. Facilities replies: “Wellness events fall into a priority category. For any objections, please contact department administration.” You contact department administration and are told: “Facilities is responsible for matters of this kind.”\n\nYou stand in the hallway for twenty minutes and eventually find another room. The pothos hasn’t moved.',
        ],
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // SECTION 2: Late-game / reputation-gated events
  // ════════════════════════════════════════════════════════════════════

  late_alumni_success: {
    title: 'Your Student Made It',
    description: [
      'Your phone lights up with a message from {studentName}. You still remember {studentName}: the one who set the learning rate to 1.0, watched the loss curve shoot into the stratosphere, and then casually asked, “Is this normal?”',
      'The message reads: “Professor!!! I got Best Paper at ICOP!!!! The committee said our work ‘fundamentally rethinks’ the entire field!!!!!!” You remember that {studentName}’s first paper was rejected four times for an “unclear contribution.” After the third rejection, {studentName} sat in your office for a long time, staring glumly out the window.',
    ],
    prompt: '{studentName} won Best Paper. What do you do?',
    options: {
      celebrate_publicly: {
        text: 'Announce it to the whole group and celebrate',
        outcomes: [
          'You post in the lab group chat that {studentName} won Best Paper at ICOP and tell everyone to send congratulations. Your current students each open the message and don’t reply right away. Then the congratulations trickle in, in a tone that mixes genuine happiness with a kind of silent pressure.\n\nThat night, someone is still in the lab past 10 p.m. You realize you may have accidentally created an incentive. Or a competition.',
        ],
      },
      reply_privately: {
        text: 'Send a heartfelt private message',
        outcomes: [
          'You reply: “Congratulations.” Then, after a moment’s thought, your fingers outrun your judgment and send one more: “You know the first code you ever put on the server? I secretly had AI fix it.”\n\n{studentName}: “?”\n\n“The second one too.”\n\n{studentName}: “???”\n\nOne clean hit. You close the chat window immediately. Any more secrets will have to wait until after graduation.',
        ],
      },
      feel_ancient: {
        text: 'Feel the weight of time',
        outcomes: [
          'You send a 🎉, put the phone down, and sit for a while. You think of {studentName}’s first day in the lab, and the face {he} made while you explained loss convergence: an “I get it” look from someone who very clearly did not.\n\nNow {studentName} is off rethinking an entire field, and you’re still here explaining loss convergence. You pick up the phone and send one more message: “Don’t forget to take the whole group out to dinner. You’re paying.”',
        ],
      },
    },
  },

  late_invited_talk: {
    title: 'Keynote Invitation',
    description: [
      'The subject line reads: “Keynote Invitation — ICOP 2026.” As you read it, you think back to the first paper you ever submitted to ICOP. It was rejected, and Reviewer 2 used the word “superficial.” You still remember.',
      'The email says: “Your group’s research has had a sustained impact over the past several years. We would be delighted to invite you to deliver a 45-minute keynote at this year’s conference, on a topic of your choosing.”\n\nForty-five minutes. The last time you spoke that long was at an internal department presentation, and someone fell asleep partway through. But this time is different.',
    ],
    prompt: 'You’ve been invited to give a keynote. What will you talk about?',
    options: {
      tight_research_talk: {
        text: 'A serious research talk, every claim backed up',
        outcomes: [
          'You spend three weeks preparing. Every slide is backed by solid experiments, the conclusions are conservative but airtight, and the pacing is planned to the minute. Afterward someone calls it “the most rigorous talk at the conference this year,” then adds, “and the densest.”\n\nThe Q&A runs for half an hour, and not one question stumps you.',
          'The talk is solid. So are the questions. You can’t answer the last one, and you hem and haw for a moment while a toe-curling silence settles over the room. Luckily, you eventually manage a partial answer.\n\nA few people were taking notes, at least, you tell yourself.',
        ],
      },
      visionary_talk: {
        text: 'Sell them a grand vision',
        outcomes: [
          'You spend two weeks working out where the whole field should go over the next five years, and turn it into a talk full of open problems. People in the audience nod a lot, take extensive notes, and photograph your slides. Afterward two young researchers come up to talk, and the conversation runs an hour.\n\nOver the next two weeks, your name gets cited noticeably more often.',
          'The talk is grand. Grand enough that at a panel three days later, another big name points out on the spot that several of your specific predictions “contain logical gaps.” You respond quickly, and the big name calls your answer “acceptable,” but someone has already posted screenshots online.',
        ],
      },
      tell_rejection_story: {
        text: 'Speak from experience: the rejection years',
        outcomes: [
          'On slide three you put a screenshot of that rejection, the one where Reviewer 2 used the word “superficial.” You spend four minutes on it, and the young researchers in the audience smile warmly. So even the big names got treated like this.\n\nThe screenshot later gets shared three hundred times, each share with its own version of “I have an email like this too.”',
          'You tell the rejection story, the audience laughs, and you move into the main content. Unfortunately, your timing is off. The story ran too long, the research had to be brutally compressed, and you never got to the last two experiments.\n\nAfterward someone says, “Fun talk, but the ending felt a little rushed.”',
        ],
      },
    },
  },

  late_industry_poach: {
    title: 'Big Tech Wants {studentName}',
    description: [
      '{studentName} knocks on your door holding {his} phone, screen turned toward you, wearing an expression that mixes excitement and guilt. You’ve seen that expression before. It usually appears right before someone tells you something that will make you happy and sad at the same time.',
      '“Professor, I got an offer.” On the screen is an email from that company. You know the one. Everyone knows the one. You glance at the salary line, hand the phone back to {studentName}, and lean back in your chair. The number is seventeen times the stipend you currently pay {him}, and roughly eight times the best academia has to offer. “I wanted to hear what you think,” {studentName} says.',
    ],
    prompt: '{studentName} has a big tech offer. What do you do?',
    options: {
      encourage_to_go: {
        text: 'Let {him} go: academia isn’t the only path',
        outcomes: [
          'You say, “Go. It’s a great opportunity, and you’ve earned it.” {studentName} freezes for a second, probably not expecting you to be so straightforward. There will be no PhD diploma, but you have sent someone out into the world who found {his} direction.\n\nBefore leaving, {studentName} thanks you formally, and you can hear how sincere it is.\n\nAfter {studentName} leaves, the lab has one fewer person and one more story for you to tell your students. Some time later, at a conference, you happen to see {studentName}’s name in the acknowledgments of a highly cited paper, listed first.',
        ],
      },
      keep_in_academia: {
        text: 'Talk {him} into staying: academia is great, really',
        outcomes: [
          'You talk with {studentName} for over an hour about academic freedom, the autonomy to choose your own research direction, and the particular satisfaction of having your name attached to your discoveries forever. {studentName} listens carefully and finally says, “Let me think about it.”\n\nThree days later, {he} tells you {he}’s decided to stay, with the lightness of someone who has just made up {his} mind. Six months later, {studentName}’s paper is nominated for Best Paper. You don’t say “I told you so,” but you think it.',
          'You make the case for academia. {studentName} listens carefully, then says, “Professor, I’ve thought it through. I still want to go.” You nod, say okay, and wish {him} luck.\n\nAfter {studentName} leaves, you sit in your chair for a while and realize that the hour-long speech was partly for yourself.',
        ],
      },
      make_a_deal: {
        text: 'Throw money at the problem',
        outcomes: [
          'You raise {studentName}’s stipend, secure a chance for {him} to lead a project independently, and promise first-author priority. {studentName} thinks it over for two days and decides to stay. It isn’t all about the money, {he} says. It’s more that “here I know what I’m doing, and over there I’m not sure.”\n\nYou consider it money well spent, even if funding will be a little tight next quarter.',
          'You improve your offer. {studentName} thanks you for the sincere effort, and goes anyway. The ending was probably decided the moment that offer email arrived; the two of you just stretched out the goodbye a little.\n\nYou put the $100K back into the budget, adjust your research plans, and keep going.',
        ],
      },
    },
  },

  late_media_profile: {
    title: 'A Journalist Is Coming',
    description: [
      'A tech journalist emails to say they want to write an in-depth feature on your lab. The plan is to spend a day there, observe how things run, interview you and your students, and “capture what frontline AI research really looks like.” This sounds nice.',
      'Then you see the date they’ve proposed, and realize that, in some inexplicable way, it is your most representative ordinary workday: a student progress update in the morning that may run a bit long, reviewer comments in the afternoon that need a same-day response, an experiment that may still not have converged, and lunch, which you usually eat at your keyboard. If this day were filmed, it would go either very well or very badly.',
    ],
    prompt: 'A journalist wants to profile your lab. What do you do?',
    options: {
      agree_and_prepare: {
        text: 'Say yes and prepare ahead of time',
        outcomes: [
          'You tidy up that day’s schedule a little and tell your students to just work normally, no performing. The journalist comes, takes lots of photos, and asks some good questions you didn’t expect, like “What’s the hardest part of this job?” You answer honestly, and for quite a while.\n\nAfter the article comes out, a few undergrads say it made them decide to apply for PhDs. You feel something that’s hard to name, maybe the other side of responsibility.',
          'You prepare, the day goes smoothly, and the journalist leaves satisfied. When the article comes out, your advisor, the one from your own PhD days, sends you a message: “Saw the article. Nicely done.”',
        ],
      },
      agree_no_prep: {
        text: 'Say yes and wing it',
        outcomes: [
          'The journalist arrives just as a student is demonstrating an error. The error message takes up a good half of the screen and includes the line “RuntimeError: CUDA out of memory.”\n\nThe journalist asks, “What’s this?” The student explains for about three minutes, getting more and more excited, and ends up at the core question of the entire research direction.\n\nThe article devotes a whole section to the scene, under the heading “When an Error Becomes a Research Question,” which the editor added. It is the most-read piece ever written about your lab.',
          'The journalist happens to arrive on the group’s quietest day. Everyone is alone in front of a screen, lunch is takeout eaten at desks, and you spend the afternoon on three admin emails. Nothing exciting happens.\n\nThe article runs under the headline “A Day in an AI Lab: Much Quieter Than You’d Think.” In the comments, some people say “This article talked me out of a PhD,” and others say “This is exactly the life I want.” Split exactly down the middle.',
        ],
      },
      politely_decline: {
        text: 'Politely decline and stay low-key',
        outcomes: [
          'You reply with thanks, explaining that the lab is at a critical stage in its research and can’t host outside visitors right now, but you’d be glad to work together in the future. The journalist says they understand and adds, “Looking forward to seeing your work published.”\n\nYou clear that day on your calendar, spend the prep time on your paper instead, and write an extra section. It feels good.',
        ],
      },
    },
  },

  late_grant_renewal: {
    title: 'Grant Renewal: Balancing the Books',
    description: [
      'The renewal application for your main research grant is due. At its core is a comparison table: what you promised in the original proposal, and what you actually delivered. You dig out the proposal you wrote five years ago.',
      'You get about three pages in and stop. There is a sub-aim “expected to be completed in Year 2.” In Year 3 it changed direction, in Year 4 it turned into a different problem entirely, and in the end it produced your three most important papers to date, but its relationship to the original plan is roughly that of a butterfly to a caterpillar. Two other planned goals genuinely weren’t met, because newer work disproved the assumptions behind them. That is normal, but on a renewal form it needs explaining.',
    ],
    prompt: 'The renewal comparison table needs filling out. How do you handle it?',
    options: {
      honest_accounting: {
        text: 'Fill it in honestly and plead guilty item by item',
        outcomes: [
          'You spend three days filling in every item honestly, including the two unmet goals, each followed by a detailed explanation: assumptions invalidated by progress in the field, new results that came out of the change in direction, and so on. The review panel’s feedback: “Honest materials. Changes in direction are academically well justified. Actual results exceed expectations. Renewal recommended.”\n\nYou save that review in a folder of its own. So far, it is the only file in there.',
          'You fill it in honestly. The panel raises written questions about the two unmet goals and asks you to address them at an in-person review. You prepare twenty slides, and your explanations are clear, reasonable and backed by data. The panel eventually approves the renewal, but the whole process takes three weeks longer than a clean approval would have, eating time you had planned to spend on a new paper.\n\nSometimes the price of honesty is efficiency.',
        ],
      },
      strategic_framing: {
        text: 'Frame it strategically: the pivots were “iterative evolution”',
        outcomes: [
          'You write: “Over the course of implementation, the original aims underwent systematic evaluation and were iterated in light of the latest developments in the field, ultimately yielding research outcomes of greater frontier value, including…” followed by a list of your three best papers. It is all completely true. The narrative strategy just chose an optimistic perspective.\n\nThe renewal is approved two weeks faster than expected.',
          'Your strategic framing is a little too strategic. One panelist who knows your field very well notes in the feedback: “Relative to the original proposal, the connection between certain stated aims and the actual outcomes requires further clarification.” You submit another round of materials, which takes a week longer than simply being honest would have. The end result is the same, but you get an uncomfortable stretch in the middle.',
        ],
      },
      colleague_review: {
        text: 'Have a colleague look it over',
        outcomes: [
          'You send it to a colleague you’ve worked with for years, with a note: “Could you help me figure out how to word these parts?” The draft comes back with six changes, each more accurate and more reasonable than your original. None of them hide anything. They just state what actually happened, clearly.\n\nYou revise and submit, and the review goes through smoothly with the comment “Materials complete and clear.” The outside perspective was worth the dinner you owe them.',
        ],
      },
    },
  },

  late_lab_anniversary: {
    title: 'The Lab Turns Five',
    description: [
      'You open the lab door and find the room isn’t the way you left it. The desks have been pushed to the side, and in the middle, on a tablecloth, sits a cake with the lab logo drawn on it in frosting. It isn’t very accurate, but you can tell who drew it. {studentName} is standing next to it with an expression somewhere between “nailed it” and “please don’t be mad.”',
      'A slideshow is projected on the wall. The first slide is a photo from the lab’s first day, five years ago, when the entire lab was two computers, a whiteboard, and you. There’s an equation on the whiteboard. You stare at it for a moment before you recognize it: the core hypothesis that once made you think “this direction might work.” It later turned out to be basically right, just realized in a completely different way. The you in the photo looks younger than you do now, but more nervous.',
    ],
    prompt: 'It’s the lab’s fifth anniversary, and everyone is waiting for you.',
    options: {
      give_a_speech: {
        text: 'Say a few words off the cuff',
        outcomes: [
          'You stand in front of the cake, look around at everyone, and talk for about five minutes.\n\nYou talk about how hard the first year was, and about the mid-tenure review you almost didn’t pass. You say you don’t know what the next five years will bring, but you know that what happens here matters.\n\n{studentName} hands you the first slice. It has a frosting “5” on it, crooked. You eat it.',
        ],
      },
      try_not_to_cry: {
        text: 'Try to keep it together',
        outcomes: [
          'Slide seven is a screenshot from the group’s first top-venue acceptance. That night everyone waited for results together in the group chat. The notification came at 2 a.m., and you sent a giant reaction GIF you never normally use. Seeing that GIF up on the projector, you feel your eyes get a little warm, and you pretend to check something on your phone.\n\n{studentName} pretends not to notice and, very obligingly, picks that exact moment to start cutting the cake, making plenty of noise. As the door swings shut, you faintly hear someone in the hallway let out a big breath.',
        ],
      },
      back_to_work: {
        text: 'Announce it’s back to work after cake',
        outcomes: [
          'You look at the cake and say, “Thank you, everyone. Back to work once we’re done eating.” The lab immediately breaks into a small cheer.\n\nYou’re taken aback, and for a moment you wonder whether you’ve pushed your students so hard they’ve snapped. Later you find out they placed bets the night before on whether you’d bring up work right away at the party. Sure enough, the odds-on favorite won.',
        ],
      },
    },
  },

};
