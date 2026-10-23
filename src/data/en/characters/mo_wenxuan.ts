import type { CharacterPack } from '../../../types/i18n';

// English character pack for 莫问玄 → Orion Moreau.
// Covers his profile card, personal events (src/data/events/students/mo_wenxuan.ts),
// half-favor / max-favor events, and his New Year gift reaction.
export const moWenxuanEn: CharacterPack = {
  profile: {
    name: 'Orion Moreau',
    pronoun: 'he',
    tagline: 'Code won’t run? Check which way it’s facing.',
    bio: 'His backpack is never without a tarot deck, a few copper coins, and a luck-turning charm from who knows where. He firmly believes research is a science, but success still needs a little fortune on its side.',
    farewell: 'Before I joined the lab, I drew a card. It was “The Benefactor.”\n\nWhat I never told you is that the card has stood by my bed ever since.',
  },
  events: {
    mwx_first_meeting: {
      title: 'First, a Small Energy Adjustment',
      description: [
        'Orion Moreau walks in and doesn’t sit down right away. Instead he sweeps your office with a professional eye: bookshelf, window, desk. It has the feel of a system diagnostic, except the data he’s after is feng shui data.',
        'Then he walks over, gently rotates the desk organizer twenty degrees, dusts off his hands and says, “Professor, the energy flows much better this way. Don’t mind me. Small optimization, no charge.”',
        'Then he sits down, pulls a printed research plan out of his bag, and starts talking research as a completely different person: clear direction, every assumption sourced, every sentence traceable. Sitting there, you quietly realize that his mysticism and his research run on two separate systems of rigor.',
      ],
      prompt: 'How do you respond to this opening?',
      options: {
        mwx_first_meeting_allow: {
          text: 'Sure. The energy is your call.',
          outcomes: [
            'You say nothing more, wait for him to settle in, and steer things back to the research plan. While he walks through his methodology he occasionally touches the copper coins in his bag, but he never loses his rhythm. On his way out he says, “Your energy is good, Professor. The desk angle was just leaking a little money before. I’ve patched it.” You realize you have just passed both his research interview and his energy interview, and both were mandatory.',
          ],
        },
        mwx_first_meeting_stop: {
          text: 'Please leave things as they were, thanks',
          outcomes: [
            'His hand pauses. He nods and turns the organizer back, to within five degrees of where it was. “Of course, Professor. I respect that.” Then he sits down, completely unfazed, and talks research just as solidly. On his way out, he takes a small charm out of his bag and sets it in a corner of your bookshelf. “Backup plan. You don’t need to pay any attention to it. It works on its own.”',
          ],
        },
      },
    },

    mwx_tarot_before_submit: {
      title: 'Today Is Auspicious for Submitting',
      description: [
        'The paper is finally in shape, and you agreed to submit today. Orion shows up in the hallway right on time but doesn’t come in. Through the glass, you watch him pull a deck of cards from the side pocket of his backpack, carefully draw one under the hallway lights, and hold it up to the light for a long moment, as grave as someone reading PCR results.',
        'Then he pushes the door open, lays the card flat on your desk and says, “Professor, today is auspicious for submitting. We can go ahead.” The card is The Star. He points to the picture and explains, “The Star represents hope and alignment with long-term goals. It’s a good time to push out work that’s been accumulating for a while.”',
        'Then he opens his laptop and goes through the submission portal, quick and practiced, checking every field twice. He’s more careful than most people are when submitting a paper.',
      ],
      prompt: 'How do you respond to this tarot submission ritual?',
      options: {
        mwx_tarot_before_submit_ask: {
          text: '…Are you serious?',
          outcomes: [
            'He thinks for a few seconds. “It affects my state of mind. If I draw an ominous card, I check the paper more carefully, because I assume I’ve missed something somewhere. If I draw The Star, I’m steady and I submit without second-guessing.” He pauses. “The paper’s actual quality I judge by independent criteria. The mysticism doesn’t touch that part.” You open your mouth, find no angle from which to refute him, and let him submit.',
          ],
        },
        mwx_tarot_before_submit_ignore: {
          text: 'Okay, submit it',
          outcomes: [
            '“Okay, go ahead and submit,” you say. He nods, solemnly returns The Star to its box, then opens the submission system and checks every field from top to bottom before hitting submit. The progress bar finishes, the confirmation page loads, and he nods at the screen. “The Star was right.” You decide never to ask about the causal logic of that sentence.',
          ],
        },
      },
    },

    mwx_lucky_timing: {
      title: 'Mysticism Success Rate: 68%',
      description: [
        'For the last submission, Orion used divination to pick a day “auspicious for submitting,” a full four days before the deadline. At the time you only cared that he didn’t leave it to the last minute, and paid no attention to the day’s mystical properties.',
        'The reviews came back three weeks earlier than expected, and Reviewer A specifically called the framework “clearly reasoned.”',
        'He sends you a message, flat in tone but not quite hiding the smugness: “Professor, this month’s mysticism success rate update: 68%. Spreadsheet attached.” You open it. It’s a proper table, with columns for event, decision type, expected outcome and actual outcome, every row neatly filled in, plus a column labeled “Possible confounders.”',
      ],
      prompt: 'How do you respond to the 68% victory report?',
      options: {
        mwx_lucky_timing_share: {
          text: 'Praise his record-keeping',
          outcomes: [
            'You reply, “Congrats, that’s a pretty high success rate.” He sends back a long message explaining that 68% beats the random baseline by about 18 percentage points, and that he is controlling for “intrinsic paper quality.” You realize he is studying his own superstition experimentally, with a rigor you don’t know whether to laugh at or respect. At the end he asks if you’d like to join his study. “Every extra sample helps.”',
          ],
        },
        mwx_lucky_timing_skeptic: {
          text: 'Scientific explanation: early papers get handled first',
          outcomes: [
            '“Good point, Professor,” he says, opening his log. “I already added early submission to the confounders column.” He pulls up the spreadsheet to show you: submission timing, actual paper quality, reviewer load, seasonal effects, each in its own column. He adds, “I don’t treat coincidence and mysticism as opposites. Coincidence is one of the ways fortune manifests.” You get the feeling you didn’t just win this debate. You joined one that can never be won.',
          ],
        },
      },
    },

    mwx_gpu_fengshui: {
      title: 'A Question of GPU Orientation',
      description: [
        'For three days, the experiments on the server have crashed at the same stage every time. The logs show nothing, the code logic has been checked over and over, and it’s still a mystery.',
        'Orion spends an entire afternoon at the whiteboard, listing every engineering cause in a row: memory leaks, CUDA version conflicts, data loader concurrency, driver compatibility… He tests them one by one and rules them out one by one. When he’s done, he draws an arrow on the whiteboard pointing toward the server room.',
        '“I have a suggestion. It may sound a little…” He pauses. “The server rack currently faces southeast. I’d like to rotate it about fifteen degrees toward north.” He adds that the server room’s cooling ducts also run north: “The flow of air and the flow of qi may be positively coupled.” When the server room admin hears “cooling optimization,” it sounds reasonable enough, and the rack gets turned. The experiments have been stable ever since.',
      ],
      prompt: 'What do you make of this mystical debugging?',
      options: {
        mwx_gpu_fengshui_accept: {
          text: 'Scientific explanation: better cooling',
          outcomes: [
            '“The cooling explanation makes sense,” you say. He nods. “Right, that’s the reason I gave when I proposed it.” In the notes column of his log he writes: Feng shui intervention / cooling optimization (dual explanation, both valid). He checks the success box. You realize that his knack for building interfaces between mysticism and reality is, in a sense, an engineering skill too, one that no textbook you’ve seen has a category for.',
          ],
        },
        mwx_gpu_fengshui_investigate: {
          text: 'Look for causes other than feng shui',
          outcomes: [
            'You tell him it’s good that the runs are stable, but you need to know why, or next time something breaks you still won’t know where to start. He nods and pulls up his debugging notes, and the two of you spend another afternoon on it. Eventually you find the exact intersection: when the temperature ran high, the GPUs throttled, which triggered a hidden timer edge case. Turning the rack improved cooling and brought the temperature down. He writes up the root cause, with one final note at the bottom: Feng shui factor: cannot be ruled out, but not the primary cause in this instance. All it’s missing is a p-value.',
          ],
        },
      },
    },

    mwx_interview_ritual: {
      title: 'The Lucky Blue T-Shirt Deploys',
      description: [
        'Orion has an internship interview at a big tech company. Before he heads out, he sends you a breezy message: “Professor, today is highly auspicious. Fortune: career house strong. Favorable for interviews. Avoid hesitation. Prep complete. Heading out.”',
        'Attached is a selfie: blue T-shirt, confident expression. He has also flipped open his phone case to show you the copper coin tucked inside. Standard equipment, he says. It has been with him through seven major exams, win rate 100%.',
        'A little after 4 p.m., another message arrives: “Professor, I passed. On to the second technical round.” The last line reads: “Star card forecast + lucky blue: success. Sample size +1.”',
      ],
      prompt: 'How do you respond to the good news?',
      options: {
        mwx_interview_ritual_congrats: {
          text: 'Congrats. The rec letter helped too.',
          outcomes: [
            '“Congrats. I think the recommendation letter helped too,” you write. He replies, “Your letter provides hard-skill support. The lucky blue tunes me to peak condition. Both are essential, forming a complementary closed loop.” You look at that sentence for a while and find that it… doesn’t entirely not make sense. He goes on to land the internship offer, and messages you that the mysticism success rate has been updated again, with thanks to the T-shirt and the recommendation letter. In that order.',
          ],
        },
        mwx_interview_ritual_ability: {
          text: 'Maybe you were just good enough already?',
          outcomes: [
            '“Of course I was good enough. I prepped for three weeks, went through all the common question types, and organized my project experience down to the last detail. The lucky blue is for not getting nervous in the one second I walk into the room.” He sends over his interview prep checklist. It’s dense, nothing like the work of someone who relies on luck.\n\nHis last message says, “Mysticism isn’t a substitute for ability. It’s a catalyst that lets ability release at maximum efficiency.” Reading that, you suspect this student will someday write consulting reports on self-efficacy.',
          ],
        },
      },
    },

    mwx_bad_omen: {
      title: 'The Timing Is Off This Month',
      description: [
        'You’ve been debating whether to rush for a conference deadline at the end of the month when Orion comes to see you, looking one notch more serious than usual. “Professor, I ran some calculations. The timing this month isn’t right. I don’t recommend submitting this work to that conference.”',
        'He lays out several dimensions: the conference’s acceptance rate has historically run low in this month, the group’s revision work hasn’t been stable lately, and there’s an overall energy assessment that he describes as “hard to quantify but intuitively significant.”',
        'You check your calendar and see that the deadline lands right on top of a grant proposal you’re preparing. The timing really is extremely tight. He doesn’t know about the grant.',
      ],
      prompt: 'How do you respond to Orion’s suggestion?',
      options: {
        mwx_bad_omen_accept: {
          text: 'Better safe than sorry. Skip this conference.',
          outcomes: [
            '“Okay, let’s hold off on this one and look at the next window,” you say. He nods. “The energy is better next quarter.”\n\nThe paper eventually goes to the next conference, lands with a better-matched program committee, and actually does better.\n\nIn his success-rate log he records this one as “Advice adopted, positive outcome,” checks the success box, and writes beside it: Two-factor alignment (mysticism + time management).',
          ],
        },
        mwx_bad_omen_clarify: {
          text: 'You decide whether we submit',
          outcomes: [
            'He nods and switches modes seamlessly, shifting out of energy gear and into practical-analysis gear: given the current state of revisions, the review timeline is tight, the acceptance rate has dropped over the past two years, and he recommends focusing on a better-matched conference.\n\nYou find the reasoning sound and agree to hold off. He adds one last thing: “The mystical conclusion and the practical conclusion agree this time. Very efficient.”\n\nYou’re not sure whether he’s praising mysticism or his own analysis, or whether, for him, there was ever a difference.',
          ],
        },
        mwx_bad_omen_override: {
          text: 'Mysticism aside, we’re submitting',
          outcomes: [
            '“A deadline is a deadline. We’re submitting,” you say. He pauses for a second, nods, and says nothing more.\n\nIn the weeks that follow, the grant deadline and the paper revisions land on the same days, and for several days in a row the group barely has a solid block of time. Exactly as you’d expected, exactly as he’d said, except he never knew you already knew.\n\nThe paper is finished and submitted in the final few hours, the formatting errors fixed twice, and you’re editing into the early morning yourself.\n\nHe logs this one in his success-rate log: “Advice overruled. Two-track task conflict, overlapping deadlines, power consumption exceeded expectations. Outcome pending.” The notes column gets an extra line: “Energy assessment empirically supported but not adopted. Value of this data point uncertain.”',
          ],
        },
      },
    },

    mwx_statistics: {
      title: 'Confidence Interval: 0.04 to 0.40',
      description: [
        'Orion sends you a PDF titled “Evaluation of a Personal Decision Support System (Year One Report).” It is eleven pages long.',
        'The report covers every decision from the past year that involved mystical input, 43 in total, split into a “followed mystical advice” group and an “ignored mystical advice” group. Each entry records the context, the outcome, and the criteria Orion used to judge it a success or a failure.',
        'The conclusion reads: success rate 68% in the followed group, 46% in the ignored group, a difference of 22 percentage points, p = 0.031, 95% CI [0.04, 0.40]. Below it, in small print: Sample size is small; interpret with caution. Confounders (psychological state, execution quality) not yet fully controlled. Orion wrote his own limitations, in exactly the wording he uses in the papers he submits.',
      ],
      prompt: 'How do you respond to Orion’s report?',
      options: {
        mwx_statistics_read: {
          text: 'Read it carefully and discuss the design',
          outcomes: [
            'You read the report from start to finish. The analytical framework is serious, and the effect size estimates are reasonable. You raise a few questions: Was “success” defined consistently? Were the judgments blinded? He writes each one down and says the next version will address them. Sitting there, it hits you that this report runs on the same logic as his actual research, except the object of study has shifted from systems to his own superstition. You think about it for a moment and can’t decide whether this counts as a kind of self-awareness.',
          ],
        },
        mwx_statistics_sample: {
          text: '43 entries is too few to conclude anything',
          outcomes: [
            '“I noted that,” he says, flipping to the last page to show you: limitation number one, in the same font size as the main text, with no attempt whatsoever to downplay it. He closes the report. “The point of this analysis isn’t to prove mysticism works. It’s to quantify the actual size of its effect and find better control variables. For Year Two, I’ll push the sample size past 80.” You notice he said “Year Two,” which means he plans to make this a long-term project.',
          ],
        },
      },
    },

    mwx_skeptic_debate: {
      title: 'It’s About Mental State',
      description: [
        'The lab is hosting a visiting researcher, a blunt sort, who hears about Orion’s pre-submission tarot during the group meeting coffee break and asks on the spot, “Do you seriously believe in this? Isn’t this textbook confirmation bias?”',
        'The room goes quiet for a moment. Orion sets down his tea, shows no sign of being offended, and answers in a voice as calm as if he were presenting methodology at group meeting:',
        '“I don’t believe mysticism directly affects the laws of physics, so it doesn’t change the actual quality of a paper. But I do believe it affects my psychological state when I make decisions, like my anxiety level before submitting, or how nervous I am in an interview. Psychological state affects execution quality, and execution quality affects outcomes.” He pauses. “So what I’m optimizing is an intermediate variable in the outcome function.”',
        'The visiting researcher thinks for a few seconds. “…I can’t refute that outright.”',
      ],
      prompt: 'How do you respond to this unexpected debate?',
      options: {
        mwx_skeptic_debate_nod: {
          text: 'Nod along and let him make his case',
          outcomes: [
            'You don’t interrupt, and let him finish the whole chain of reasoning. The visiting researcher finally says, “Fine, it’s internally consistent,” the two of them move on to other topics, and the mood returns to normal. Afterward Orion comes to ask whether you saw any holes in his argument. He’s considering putting the framework in the theory section of his annual mysticism report. You say, “Nothing obvious so far,” and he writes it down with the same gravity as citing a peer-reviewed paper.',
          ],
        },
        mwx_skeptic_debate_comment: {
          text: 'His mysticism is more rigorous than I expected',
          outcomes: [
            '“That framework is more logical than I expected,” you say. He looks pleased for a moment, but keeps it in check. “Thank you, Professor. I’ve worked through it many times.” After the visiting researcher leaves, he writes the whole argument out on the whiteboard, checks it, and then points out on his own, “The weak link is the step from psychological state to execution quality. That part of the causal chain still needs empirical support.” Watching him stand at the whiteboard working out how to falsify his own theory, you think it’s the strangest scientific spirit you’ve ever seen, but it’s hard to call it unrigorous.',
          ],
        },
      },
    },

    mwx_paper_title_omen: {
      title: 'The Title’s Numerology Problem',
      description: [
        'The first draft has taken shape, and you’re settling on a title. Orion studies the current version for a while, takes out his phone, does some calculating, and looks up. “Professor, a few parts of this title, when you add up the letter values… they don’t flow. It’s a bit scattered. I’d like to change it.”',
        'He points out what he wants to change and proposes a replacement. You read both versions aloud and find the new title genuinely cleaner: one word shorter, tighter rhythm, more punch. It’s just that none of these merits have anything to do with his reasons.',
        '“Numerologically, the new total is an auspicious number,” he adds. “On the engineering side, keyword density is slightly better too. That’s a side benefit.”',
      ],
      prompt: 'How do you respond to this title suggestion?',
      options: {
        mwx_paper_title_omen_agree: {
          text: 'Agree. It is a better title.',
          outcomes: [
            '“This version’s cleaner. Go ahead,” you say. Orion updates the document, says “Okay,” and moves on to the abstract as if nothing happened. You notice he doesn’t bring up the numerology again, as if he’s checked an item off some internal list and moved on to the next. After submission, one reviewer specifically describes the title as “precise and concise.” When he sees it, he sends you a one-line message: Numerology: effective.',
          ],
        },
        mwx_paper_title_omen_content: {
          text: 'Content matters more. Nail the abstract first.',
          outcomes: [
            'Orion nods, sets the title aside, and turns his full attention to the abstract. You notice he jots the change down in his notebook, with a small note beside it: Pending. Content first. Two weeks later, during the final review, he flips to that page. “Professor, about that title. I think we can lock it in now.” You take a look, agree the revised one really is better, and approve it. He logs this one in his success-rate log as “Delayed adoption, positive outcome,” with a note: Suggests mystical advice is robust over time.',
          ],
        },
      },
    },

    mwx_alumni_visit: {
      title: 'Mysticism Success Rate: 71%',
      description: [
        'After graduating, Orion joined an AI company. Not long after starting, he got his team to adopt a “pre-release mystical assessment process”: before every major release there’s an optional step where anyone who wants to can draw a tarot card and note how they feel about it, and then the normal technical review carries on.',
        'Nobody actually believes it predicts release quality. But the step stuck around, because people find it fun, and it oddly takes some of the edge off the pre-release tension. One engineer later said that the time someone drew The Fool, they ended up catching a bug that had been lurking for three versions. The story made it into an internal tech talk, whose first slide read: n = 1, but the direction is worth watching.',
        'He sends you an email with a simple subject line: Update. The body says the mysticism success rate now stands at 71%, the Year Three report is attached, and the methodology has been improved with double-blind assessment. Also, he has met an engineer at the company who’s interested in academic collaboration, and he can make an introduction if you’re interested.',
      ],
      prompt: 'How do you reply to the email?',
      options: {
        mwx_alumni_visit_connect: {
          text: 'Interested. Please set it up.',
          outcomes: [
            'You write back that it’s great to hear how he’s doing and you’d like to learn more about the collaboration. He replies quickly with a short summary of the engineer’s background and the directions they’ve discussed, and offers to set up a video call. At the end of the email he adds one line: I hear your office, post-energy adjustment, is still operating well. He doesn’t explain, but you know he means those twenty degrees from your first meeting. That day you told him to adjust whatever he liked, and he has probably remembered it ever since.',
          ],
        },
        mwx_alumni_visit_report: {
          text: 'First question: how did you do double-blind?',
          outcomes: [
            'He replies almost instantly, several expansive paragraphs long. He had two colleagues serve as independent raters: they got the event descriptions but weren’t told whether each one belonged to the “followed” or “ignored” group, and judged the outcomes on their own. That keeps his own confirmation bias out of the scoring. With the improvements, he says, the success rate moved from 68% to 71%, but the confidence interval is narrower, which he attributes to more accurate estimation from better methodology, not to the mysticism actually getting stronger. Finally, he asks whether you’d be interested in co-authoring the Year Four report. You stare at the email, unsure whether to laugh or seriously consider it.',
          ],
        },
      },
    },

    mwx_industry_poach: {
      title: 'Big Tech Comes for Orion',
      description: [
        'Orion comes to see you, calmer than usual, holding a printed email. He sets it on your desk. “Professor, I got an offer.”',
        'It’s from a leading AI company that builds foundation models. The level is senior, and the pay is several times what academia offers. The email is very formal, but you notice they added a line at the end: they’ve looked into his research, and they find his intuition and judgment “truly unique.”',
        'Orion pauses. “I cast a hexagram last night… It came up Lü, the Wanderer. Moving without losing one’s place; traveling, with somewhere to return to.” He adds, “A vague good omen. I haven’t fully worked it out myself.”',
      ],
      prompt: 'How do you respond?',
      options: {
        mwx_poach_encourage: {
          text: '“Go. Academia isn’t the only path.”',
          outcomes: [
            '“Go. This is a great opportunity, and you’ve earned it,” you say. Orion freezes for a moment, probably not expecting you to be so decisive. Before he leaves, he says, “Professor, thank you for these years.” He means it. It isn’t politeness, and you can hear the difference. After he’s gone, the lab has one less person and one more story you’ll tell your students. At a conference some time later, you happen to see Orion’s name in the acknowledgments of a highly cited paper, listed first.',
          ],
        },
        mwx_poach_stay: {
          text: '“Don’t rush. Think it over. There’s still a lot to do here.”',
          outcomes: [
            'Orion looks at you, then folds the email and puts it away. “Then I’ll wait a while. Wait for the timing to be right.” He stays. But sometimes you catch something in his eyes that you can’t quite name. Not regret. More like a door that never fully closed, and could open again at any moment.',
          ],
        },
      },
    },

    mwx_hyperparameter_ritual: {
      title: 'Tuning by Intuition, Intuition by the Stars',
      description: [
        'Orion’s experiments are done, and his results beat everyone else’s in the group. You ask him to walk you through his tuning. He says, “Learning rate 0.000137, batch size 88, dropout 0.23.”',
        '“Why those values?”',
        '“They felt right.” A pause. “Also, the digits of 0.000137 add up to twelve, and this is my zodiac year, and twelve corresponds to… You don’t need to remember this part, Professor,” he adds, seeing your face. “But the results are right.”',
        'The results really are right. You check his experiment log: he ran twenty-seven different configurations, each choice accompanied by a scribbled note. Some contain legitimate ablation reasoning, mixed in with annotations you can’t quite follow, but overall they trace an effective search path.',
      ],
      prompt: 'Orion’s mystical tuning delivered. What do you do?',
      options: {
        mwx_hyperparameter_accept: {
          text: 'Results are results. No more questions.',
          outcomes: [
            '“As long as the results are right. Next time, make sure you log the configs that work,” you say. Orion nods and sends over an immaculate parameter log, with an “Intuitive Rationale” attached to every run. That column reads like a short fantasy novel. You mentally mark the column “ignorable,” keep the data itself, and find that the data really is valuable.',
          ],
        },
        mwx_hyperparameter_analyze: {
          text: 'Study why his intuition works',
          outcomes: [
            '“What’s underneath the intuition?” you ask. “You can’t explain your choices, but they traced an effective search path. That in itself is worth studying.” Orion is quiet for a moment, then says, “I’ve actually been wondering about that. Sometimes it feels like I’m running Monte Carlo in my head.” You open a document on the spot, write down “Human-Prior-Guided Hyperparameter Search,” and ask if he’d like to pursue it systematically. “Worth a try,” he says. “But I’ll probably still check my horoscope.”',
          ],
        },
      },
    },

    mwx_agent_civilization: {
      title: 'He Wrote AI Agents as a History of Civilization',
      description: [
        'Orion hands in a related work survey. The first three pages are a normal literature review. On page four, the style changes completely: he starts describing the history of different agent types with words like “tribes,” “migrations” and “succession of civilizations,” and there’s a figure of how agent technology evolved, whose timeline in the bottom-right corner runs from “Year One” to “the Fifth Era.”',
        'You ask him why he wrote it this way.',
        '“Because if you analyze agents as a sociological subject, a lot of emergent phenomena become easy to explain,” he says, completely serious. “And from this perspective, a lot of existing work is actually studying the same thing without realizing it.”',
        'You flip back and reread page four, and find that it… actually makes sense.',
      ],
      prompt: 'Orion’s agent sociology holds up. What do you do?',
      options: {
        mwx_agent_civilization_redirect: {
          text: 'Have him rewrite it in a normal academic tone',
          outcomes: [
            '“A survey still needs standard phrasing. Please revise it,” you say. Orion nods and sends back a revised version: “tribes” became “categories,” and “the Fifth Era” became “the current stage.” Same logic, new packaging, and the reviewers come back calling the framework “clear.” From then on, the history-of-civilization theory becomes his private reference system. Now and then it slips into the way he talks. You pretend not to hear, but you know he’s still thinking in those terms.',
          ],
        },
        mwx_agent_civilization_expand: {
          text: 'This perspective deserves its own paper',
          outcomes: [
            '“A sociological lens on emergent agent behavior has value in its own right,” you say. “Put the survey in a standard tone, but write this framework up separately as a position paper.” Orion’s face lights up, then he immediately reins it in, nods, and says, “Okay, Professor,” perfectly composed, though you notice he’s taking notes twice as fast as usual. Three weeks after submission, the position paper is accepted at a small interdisciplinary workshop, along with an email saying “a uniquely insightful perspective; this year we have a small travel grant available.” Orion messages you the reading he cast back then: “This journey brings fortune.” Then: “I didn’t expect it to be literal either.”',
          ],
        },
      },
    },

    half_favor_mo_wenxuan: {
      title: '{studentName} Does One Small Thing Before Every Run',
      description: [
        'You’ve noticed {studentName} has a habit: before every experiment, he raises his chair by one notch.',
        'That’s it. He doesn’t check the code or reread the parameters. He sits down at the keyboard, raises the chair one notch, and hits run. It doesn’t affect anything, but he does it seriously every time, more ritual than ergonomics.',
        'One day you can’t help asking. He isn’t the least bit embarrassed and explains earnestly, “Change one variable, to rule out chair height as a factor in the results.” You stare at him. He adds, “I know it’s not scientific. But mood affects execution quality, and execution quality affects results. So I need a signal that tells me: now it’s serious. The chair is convenient.”',
      ],
      prompt: 'You:',
      options: {
        half_favor_mwx_better_ritual: {
          text: 'Want a ritual with a bit more presence?',
          outcomes: [
            'He gives it serious thought. “Suggestion noted, but the chair is currently the most efficient option.” He turns back, opens his code, raises the chair, and hits run. “Also,” he says over his shoulder, “I’ve been keeping track. Runs with the ritual have a higher success rate than runs without, but the sample is too small and the p-value isn’t significant. I’m still collecting data.” Before you can figure out what to say, he’s already back to watching the terminal.',
          ],
        },
        half_favor_mwx_anchoring: {
          text: 'You have a point. That’s cognitive anchoring.',
          outcomes: [
            'He blinks, then his eyes light up. “Yes! That’s exactly it. I could never explain it properly, and now there’s a word for it.” He carefully writes “cognitive anchoring” in his notebook and circles it. “Thank you, Professor.” He puts the pen away and happily presses the chair lever one more time. “I think the ritual just got an upgrade.”',
          ],
        },
      },
    },

    max_favor_mo_wenxuan: {
      title: 'The Lab’s Annual Luck-Turning Ceremony (Scientific Notes Included)',
      description: [
        'A handwritten invitation has been slipped under your office door, in neat, careful script and dark blue ink: “You are cordially invited to the Lab’s Annual Luck-Turning Ceremony. Time: today. Place: the large conference room. Guest: Professor (sole invitee). Officiant: Orion Moreau. Dress: any. Results depend on sincerity.”',
        'You go. In the conference room, {studentName} has set out battery-powered candles (with a sticky note beside them reading “Fire safety first”), a dark blue cloth and a tarot deck. The sense of ceremony is completely real. He has you shuffle, cut and draw, all of it done with meticulous care, while he recites an interpretive framework of his own invention: internally consistent, unfalsifiable.',
        'When the reading is over, he sums up: “Overall fortune this year is positive, but beware of the server crashing at a critical moment. That one is backed by historical data, so it’s not purely mysticism.” You want to laugh, but he says it so earnestly that you hold it in.',
        'As he gathers the cards and folds the cloth, his tone shifts. “Professor, I know this isn’t scientific. I’ve tracked the accuracy myself. The p-value isn’t significant.” He pauses. “But sometimes a person needs a ritual to fire their own starting gun. You know what I mean?”',
        '“I don’t do this because I really believe in the cards,” he says, putting the cloth bag away. “It’s because the person who takes something seriously is the thing actually worth believing in. I asked you here as my witness today because you’re that kind of person.”',
      ],
      prompt: '{studentName} finishes packing up and waits for you to say something:',
      options: {
        max_favor_mwx_reopen: {
          text: 'Can I draw one more?',
          outcomes: [
            'He freezes for a second, then his eyes light up. “Of course.” He spreads the cloth out again, has you draw, and reads it with care, even more absorbed than the first time. The framework gets more and more detailed as he goes, and you realize he’s really explaining his own reasoning, just wrapped in the shell of the cards. When he’s done, he packs up and says, “Both readings agree. Low statistical significance, but high symbolic significance.” He looks up and smiles. “Thank you for going through the whole thing with me, Professor.”',
          ],
        },
        max_favor_mwx_ritual: {
          text: 'Everyone needs a little ritual',
          outcomes: [
            'He looks at you as if checking that you’re not just humoring him, then nods firmly. “A lot of people think unscientific means useless. But unscientific doesn’t mean it has no effect, right?” He pats the cloth bag and puts it in his backpack. “Every time I do this, it’s not so the cards can tell me the outcome. It’s to put myself in the state where I can do the work seriously. This year’s ceremony had you as a witness, Professor. That’s at least double the fortune bonus.”',
          ],
        },
      },
    },

    new_year_gift_result_mo_wenxuan: {
      title: 'Orion’s Reaction',
      description: ['Orion takes the gift box and closes his eyes for a moment, sensing it.'],
      prompt: 'Orion’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Orion holds the box with his eyes closed for a moment, then suddenly pulls out his tarot deck and draws a card. “I knew it.” He shows it to you with total confidence. “Today’s card is the Nine of Cups. It means a wish fulfilled.”\n\nWhen you ask what the wish is, he looks unusually shy. “Can’t say. If I say it, it won’t come true. But part of it has probably come true already.”',
            'Orion thanks you politely, then asks whether the day you bought it was auspicious for gift-giving. You have no answer.',
          ],
        },
      },
    },
  },
};
