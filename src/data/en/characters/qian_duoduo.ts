import type { CharacterPack } from '../../../types/i18n';

// English overlay for 钱多多 → Dorian Vale.
// Text only; effects, weights and conditions live in the Chinese source files.
export const qianDuoduoEn: CharacterPack = {
  profile: {
    name: 'Dorian Vale',
    firstName: 'Dorian',
    pronoun: 'he',
    tagline: 'So who’s actually going to use this?',
    bio: 'Has a strange gift: while everyone else is still discussing the experimental results, he’s already asking who the users are. After group meeting, other people remember the conclusions. Dorian remembers the needs. Nobody knows for sure whether there’s a product manager living in his head, on call 24/7.',
    farewell: 'I was always thinking about how to build something of value.\n\nLater I realized some things are worth it without being built at all. Meeting you, for one.',
  },
  events: {

    // ── Personal events (src/data/events/students/qian_duoduo.ts) ──────────

    qdd_first_meeting: {
      title: 'The First Question',
      prompt: 'Dorian brought a product sketch to your very first meeting. You:',
      description: [
        'Dorian is the newest PhD student in the group. In your first proper one-on-one, you spend a good while walking him through the research direction: the technical approach, the data sources, the open problems. It’s clear, well organized and thoroughly professional.',
        'He listens carefully, nods, and asks his first question: “So when we build this, who’s the user?”',
        'You expected questions about the method, or related work. He doesn’t. He pulls a slightly battered little notebook out of his bag and explains that he did some quick digging before the meeting, put together a rough first read on the market, and while he was at it, sketched an MVP. A product. Not a paper. A product. There is clearly a background process in his brain called “user persona analysis,” and it does not stop.',
      ],
      options: {
        qdd_first_meeting_academic: {
          text: 'Research first. Products after you graduate.',
          outcomes: [
            'You tell him the core job of a PhD is to get the science right; deployment comes later. Dorian closes the notebook. “That makes sense. I’ll get the research figured out first.” He puts the sketch away, but you notice he’s written a line on the cover: “Backup: revisit once the paper’s out.” Something about that “backup” stays with you. It’s as if he’s set the idea to “suspended” in his own task manager, ready to resume at any moment.',
          ],
        },
        qdd_first_meeting_curious: {
          text: 'Sure. Show me the MVP.',
          outcomes: [
            'You take the notebook and flip it open. The sketch is rough, but the logic is surprisingly clean: who the users are, which step they get stuck on, where the technology could step in. The user flow runs as a single line and ends in a question mark, annotated “hardest part.” You look up. “You’ve thought the user side through pretty well.” Dorian promptly takes the notebook back and starts adding to the margins. You talk for nearly an hour without a single word about the lab, and the background process in his brain runs at full load the entire time.',
          ],
        },
      },
    },

    qdd_group_meeting_derail: {
      title: 'Group Meeting, Derailed',
      prompt: 'Group meeting has been taken off course. You:',
      description: [
        'Halfway through group meeting, everyone is going over the experimental data, trying to work out why the control group results drifted from what you expected. Normal atmosphere, reasonably deep discussion.',
        'Then Dorian speaks up. “Wait, let me come at this from another angle. If we commercialize this method, how should we design the pricing model? Usage-based or subscription? Because that affects which metric we end up optimizing.”',
        'The conversation goes sideways for quite a while. Someone starts analyzing competitors, someone else estimates the market size, and the actual experimental data sits abandoned on the whiteboard like homework nobody will claim. In the middle of it all, Dorian draws a business model diagram, extremely carefully, with no sense whatsoever that he’s done anything out of line.',
      ],
      options: {
        qdd_group_meeting_stop: {
          text: 'Tap the table and pull it back on topic',
          outcomes: [
            'You tap the table. “Commercialization is an interesting question. Today, let’s focus on the data.” Dorian stops at once, circles the business model on the whiteboard, labels it “to discuss,” goes back to his seat and studies the results table in earnest. The meeting gets back on track. Afterward, though, you find he’s posted a photo of the diagram to the group chat with the caption: “Let’s talk about this sometime.” His background process never really paused.',
          ],
        },
        qdd_group_meeting_allow: {
          text: 'Let him finish. It’s a fresh angle.',
          outcomes: [
            'You gesture for him to go on. Dorian finishes the pricing logic, then turns it around: with a subscription model, the optimization target should shift from one-off accuracy to user retention, and that happens to explain the “anomaly” in the control group. Seen through retention, the deviation actually makes sense. The meeting runs long, but everyone leaves with a clearer shared answer to “why are we optimizing this metric?” Sometimes going off topic just means a brain is staying on topic one level up.',
          ],
        },
      },
    },

    qdd_user_interview: {
      title: 'He Went and Did User Interviews',
      prompt: 'Dorian ran user interviews on his own. You:',
      description: [
        'Dorian comes by and says he did some “extracurricular work” last weekend. You assume he means extra lit review. He opens his notebook: user interview notes, page after page of densely packed feedback summaries.',
        'Over two weekends, he tracked down more than a dozen potential target users around campus and asked them what tools they use now, where they get stuck, and what they’d be willing to give up to make the problem go away. He even made a slide deck sorting them into people with a “real need” and people who just “think it’s cool,” all laid out clearly.',
        '“The need is real,” he says. “Most of them said they’d use a tool like this.” He pauses, then adds, “I didn’t ask whether they’d pay. If you ask that, the numbers shrink, and it doesn’t tell you anything.” His user research is more solid than a lot of product managers’, and this is just how one PhD student spends his weekends.',
      ],
      options: {
        qdd_user_interview_praise: {
          text: 'Good initiative. Let’s talk it through.',
          outcomes: [
            'You tell him it’s rare for someone to go out and find real users on their own, and that the interviews were pretty well designed.\n\nDorian nods. “I just want to know whether anyone actually needs what we’re building. Otherwise the paper comes out, nobody ever uses it, and it feels like a waste.”\n\nFor a moment you don’t know what to say. The logic is perfectly reasonable. It just isn’t very fashionable in academia.',
          ],
        },
        qdd_user_interview_redirect: {
          text: 'Get your own research solid first',
          outcomes: [
            'You tell Dorian he’s pointed in the right direction, but right now what matters most is getting the core method solid. User validation can come later, once the technology is mature.\n\nDorian puts the slides away. “Then I’ll park this here and bring it back out to compare once the tech is done.” And he opens his reference library, very conscientiously.\n\nYou don’t get the sense he’s brushing you off. He has simply moved the item further down the task queue in his head.',
          ],
        },
      },
    },

    qdd_startup_plan: {
      title: 'Bringing You On Board',
      prompt: 'Dorian wants you as his technical advisor. You:',
      description: [
        'Dorian asks to talk one-on-one, and it looks like he’s been preparing for a while. He has a startup plan: take the lab’s research direction and build a product that actually ships. He’s already found two co-founders, one for design and one for operations, and he’ll handle product and technical direction.',
        '“I’d like you to be our technical advisor,” he says. “It wouldn’t take much of your time. Mostly sanity-checking the technical calls so we step on fewer landmines.” He hands you a document. The cover reads “Project Overview: Version One,” and in the footer is a version number: v0.7.',
        'You open it. This isn’t a business plan. It’s a product requirements document, and a very formal one: user stories, feature priorities, technical constraints, all of it. v0.7 means he’s already been back and forth on it at least six or seven times. His definition of “taking something seriously” is a little different from other people’s.',
      ],
      options: {
        qdd_startup_plan_decline: {
          text: 'Not getting on board for now',
          outcomes: [
            'You tell him that, the way things are, taking on a startup advisor role on top of everything would spread you too thin. Dorian nods. “I get it. Never mind, then.” He takes the document back without a single extra word of persuasion. On his way out he says, “I’ll show you once we’ve built it.” There’s no hurt in his voice, only a calm certainty, as if he’d already anticipated this answer, filed it under “reasonable resistance,” and kept going.',
          ],
        },
        qdd_startup_plan_ask: {
          text: 'Walk me through the business plan',
          outcomes: [
            'You open the document, point to the “Technical Constraints” section and ask, “This approach here. Do you know what it would cost to implement?” He immediately opens a notebook and starts flipping. He has one notebook just for technical questions, another for user feedback, and a third for business logic. You go from the technical plan to product positioning to use cases, talking for nearly an hour. You notice he’s much clearer on “who does this help?” than on “how much money can this company make?” You tell him he can drop by and talk it over now and then, informally.',
          ],
        },
      },
    },

    qdd_pitch_practice: {
      title: 'Slide Six of the Pitch Deck',
      prompt: 'Unpublished data has turned up in the pitch deck. You:',
      description: [
        'Dorian is entering a university startup competition. The pitch is next week, and he’s asked you to look over his slides.',
        'You open the file. It’s impressively professional: user pain points, solution, technical differentiation, market size. Clear logic, clean visuals, less like a student project and more like something from an actual company. You get to slide six, titled “Technical Validation.” In the middle of the slide is a results figure: the core data from the lab’s latest submission. The paper hasn’t been published yet.',
        'You rest the cursor on the figure and say nothing. Something in the air freezes for a second.',
      ],
      options: {
        qdd_pitch_help_edit: {
          text: 'Help him revise, but that slide goes',
          outcomes: [
            'You tell him plainly that unpublished data cannot appear in public. It’s not about rules; it’s about protecting the lab and himself. Dorian frowns. “So that slide is just a description of the direction, with no data. Will it hold up?” You say it will: technical validation can be “internal beta results” plus qualitative user feedback. He thinks for a moment, nods, and reopens the deck. The revised slide is leaner than the original without losing any of its logic. His execution under pressure is better than you expected.',
          ],
        },
        qdd_pitch_reject: {
          text: 'Slide six is a problem. Think it through first.',
          outcomes: [
            'You tell him this slide is a problem, unpublished data can’t be used, and he should figure out how to handle it before coming back. Dorian doesn’t argue. “Okay, let me think about it,” he says, and leaves with his laptop. Two days later he’s back, and slide six now quotes user interviews. The twenty interviews he did around campus have finally come in handy, and they’re more convincing than the figure was. Even he admits, “Honestly, this version is better.” Sometimes getting blocked is how you find the better path.',
          ],
        },
      },
    },

    qdd_investor_drama: {
      title: 'The Investor Drops By',
      prompt: 'An investor has suddenly appeared in your lab. You:',
      description: [
        'One afternoon, a stranger follows Dorian into the lab. Dorian introduces the visitor as an angel investor he met at some event, “really interested in what we’re working on, so they wanted to just drop by and see the lab.” You don’t remember anyone telling you about this in advance.',
        '“Just drop by.”',
        'The investor shakes hands, looks around, nods, then asks, “Does the lab have a concrete commercialization plan for this direction?” A few students have stopped what they were doing. The whiteboard still has this afternoon’s experimental data on it. You have prepared nothing. Dorian stands nearby, more or less composed, but you can tell he has already realized this was not thought through.',
      ],
      options: {
        qdd_investor_improvise: {
          text: 'Tough it out and present the lab on the spot',
          outcomes: [
            'You give a brief overview of the lab’s research. The technical side comes across clearly; commercialization gets covered with a quick “still exploratory.” The investor nods. “Very solid work.” After the visit, you pull Dorian aside for a word: from now on, any outside visitor to the lab gets cleared with you first. He nods and offers no excuses. “I’m sorry. I didn’t think it through.” Nothing more. He owns it so cleanly that you’re left with nothing to push against. Two weeks later the investor emails to say they’re interested in the lab’s direction and asks whether you’d sign a small technical consulting agreement.',
          ],
        },
        qdd_investor_end_visit: {
          text: 'Politely see them out and reschedule',
          outcomes: [
            'You explain that the group has an internal discussion this afternoon and can’t host a long visit, but you’d be glad to set up a proper meeting another day. The investor nods understandingly, leaves a business card and heads out with Dorian. That evening Dorian texts: “Sorry. I’ll give you a heads-up next time.” Then a follow-up: “I didn’t mean to. I just got a bit carried away.” You reply, “Keep it in mind next time,” and tuck the card under the corner of your desk. No use for it right now, but you don’t throw it out either.',
          ],
        },
      },
    },

    qdd_product_insight: {
      title: 'Working Backward from the Pain Point',
      prompt: 'Dorian’s user perspective has clarified the direction. You:',
      description: [
        'The group argues for a long time about the next research direction. There are two technical routes, each with its supporters, nobody can convince anybody, and the mood gets a little stiff.',
        'Dorian has barely said a word. Once everyone runs out of steam, he speaks up. “Let me think about it differently. If you’re the user, what’s the step where you get stuck the most? Not the hardest one technically. The one you least want to do by hand. If we work backward from there, which route should we pick?”',
        'He draws a user workflow on the whiteboard, marks three “friction points,” and lines both technical routes up against the highest-priority one. The answer is clear: the second route covers it more precisely. A few people who had backed the first route change their minds after seeing the diagram. Sometimes the solution isn’t in the technology. It’s at some turn in the user flow chart.',
      ],
      options: {
        qdd_product_insight_adopt: {
          text: 'Take his angle and go with it',
          outcomes: [
            'You say, “That’s a sound way to look at it. Let’s go with that logic.” Dorian doesn’t show much expression. He just takes a photo of the user flow and later adds it to the project docs. The adjusted direction cuts out a lot of wasted attempts in later experiments. When it comes up, all Dorian says is, “I think figuring out who the user is matters more than anything.” There’s no self-promotion in it. He’s just stating something he considers obvious.',
          ],
        },
        qdd_product_insight_praise_only: {
          text: 'Good analysis, but the direction stays',
          outcomes: [
            'You tell him it’s a good analytical framework, but all things considered, the direction stays as it was. Dorian nods. “Sure. I was just offering it as a reference.” He erases the diagram from the whiteboard. But you see him copy the three friction points into his notebook, word for word. His ideas don’t disappear. They just get archived somewhere else, ready to be pulled back up the next time they’re useful.',
          ],
        },
      },
    },

    qdd_anti_finance: {
      title: 'That Direction Is Pointless',
      prompt: 'Dorian objects to the quant trading direction. You:',
      description: [
        'During an internal discussion, someone suggests the lab’s technology could be applied to quantitative trading, with some very attractive potential returns. A few people think it’s worth considering.',
        'Dorian doesn’t say much during the discussion. But that evening he comes to find you, asks for a few minutes alone, and gets straight to the point: he thinks quant trading is a pointless direction.',
        '“All it does is move money out of some people’s pockets and into other people’s,” he says. “It doesn’t create anything new. If what we build ends up only serving that, I think it’s a waste.” He pauses, then adds, “I’m not against making money. I’m against making useless things.” There’s an unusual seriousness in his eyes as he says it, and you get the feeling this isn’t the first time he’s thought about it.',
      ],
      options: {
        qdd_anti_finance_agree: {
          text: '“Solves a real problem” is a fair standard',
          outcomes: [
            'You tell him you understand his reasoning: when choosing where to apply research, “what real problem does this solve?” is a reasonable criterion. Dorian nods. “Thanks. I just wanted to know my thinking isn’t too weird.” He wasn’t asking you to come out against quant trading. He just needed to know his framework holds up. You understand both of those things, and he knows you understand.',
          ],
        },
        qdd_anti_finance_objective: {
          text: 'Directions need weighing on several fronts',
          outcomes: [
            'You tell him that choosing an application area means weighing several things. “Is it useful?” is one angle, but feasibility, available resources and the team’s strengths matter too; you can’t rule out an entire field on a personal judgment call. Dorian is quiet for a few seconds. “I know. I just feel that if I have a choice, I’ll pick the one that helps real users.” He doesn’t argue further, but you sense his standard hasn’t moved because of anything you said. He has simply put it into his own list of trade-offs, ranked it first, said okay, and gone on his way.',
          ],
        },
      },
    },

    qdd_real_impact: {
      title: 'Real Users Showed Up',
      prompt: 'Dorian’s demo got a strong response from real users. You:',
      description: [
        'Dorian sends you a screenshot with no explanation. You open it: a post in a niche online community, where a little demo he uploaded has started getting shared on its own. In the comments, someone says “I’ve been waiting three years for this,” someone else says “This fixes the thing I have to do by hand every day,” and several people have left contact info asking to get into the beta.',
        'A minute later, another message: “This is the happiest day I’ve had since starting my PhD.”',
        'He doesn’t explain why. You open the post and read through the comments, and you think you probably understand the kind of happiness he means. It isn’t that the numbers look good, or that people are praising him. It’s that the people in those comments have actually been helped by his work. To him, that’s more solid proof than any metric.',
      ],
      options: {
        qdd_real_impact_celebrate: {
          text: 'This is real validation of your work',
          outcomes: [
            'You reply: “Saw it. That feedback is real. You’re on the right track.” He answers immediately: “Now I know! The need is real! I wasn’t just guessing!” followed by a string of exclamation marks, far more animated than he usually sounds, as if some confirmation he’d been waiting on for a long time had finally come through. The conversation ends there, but you don’t delete it. Sometimes being needed by real people is already meaning enough.\n\nNot long after, a midsize company emails about a collaboration. They saw the demo and want to know if you’d be interested in a small, targeted partnership.',
          ],
        },
        qdd_real_impact_paper: {
          text: 'Now turn that feedback into user validation for the paper',
          outcomes: [
            'You tell him the positive feedback is a great signal, but it only counts as real evidence once it’s turned into a user study the paper can cite. There’s a pause. Then: “Professor, can I be happy for a bit first?” You look at the message and reply, “Sure.” It’s a while before the next one arrives: “Okay. I’ll go design a proper user study protocol.” He handles both the feelings and the work, in that order, feelings first and work second, and there’s nothing halfhearted about either.',
          ],
        },
      },
    },

    qdd_alumni_visit: {
      title: 'Back with an Angel Round',
      prompt: 'Dorian is back, with a startup to show for it. You:',
      description: [
        'Six months after he graduates, you get an email from Dorian. Subject line: “Update + a proposal.”',
        'He writes that after graduating he started a company whose core product takes the lab’s technology and puts it to work in one specific real-world setting, and that they’ve just closed an angel round. He keeps it brief: no amount, no valuation. Just two things. One, the product has its first paying users. Two, he wants to sign a formal technical collaboration agreement with the lab, with part of the money going back to the lab to acknowledge where the technology came from.',
        '“It’s not about getting a name on a website,” he writes at the end. “It’s that none of this could have been built without the groundwork the lab laid. I think that deserves to be made official.” You stop there for a moment. You remember the very first question he ever asked you: “Who’s the user?” He found the answer, then turned it into a real product and put it in real people’s hands.',
      ],
      options: {
        qdd_alumni_cooperate: {
          text: 'Move the agreement forward and welcome him back',
          outcomes: [
            'You write back that you’d like to move forward. A month later the agreement is signed, and the lab receives its first payment. On signing day, Dorian brings a product introduction. Not a fundraising deck: a user manual, describing how real people use the product and the specific problems it solves for them. On the first page is a line crediting the technology to the long-term research of your lab. You put the manual on your office bookshelf. He once asked “Who’s the user?” This manual is full of answers.',
          ],
        },
        qdd_alumni_stay_in_touch: {
          text: 'Hold off on the agreement and stay in touch',
          outcomes: [
            'You tell him the agreement can wait until the product is more mature, but you’re really glad to hear he’s doing well. He replies, “Sounds good. Anytime,” and attaches a beta link: anyone in the lab who’s interested can try it, no feedback needed, just take a look. You forward the link to the group chat, and three people sign up that same day. One of them later messages, “This thing is actually pretty useful.” Dorian never showed up in the replies to explain the technology. He just built something that works, and waited for people to use it.',
          ],
        },
      },
    },

    qdd_pi_email_timing: {
      title: 'He Knows When Emails Work Best',
      prompt: 'Dorian has quietly modeled your communication patterns. You:',
      description: [
        'Dorian comes to you with a set of reply-rate statistics. He says he’s found a pattern: the same email, sent Wednesday at 10 a.m., gets a reply from you within two hours on average; sent Friday afternoon, it waits until the following week. He asks whether that’s really true.',
        'You think about it. “Probably?”',
        '“Not probably,” he says. “I went through the group’s reply data. The pattern is very stable.” He pulls up a spreadsheet covering eight months. Your reply rhythm is visible at a glance, more clearly than you’d ever noticed yourself.',
        '“You’ve been… studying my email habits?”',
        '“Just curious,” he says, without a trace of guilt. “I happened to keep notes.”',
      ],
      options: {
        qdd_pi_email_timing_shrug: {
          text: 'Fine. Help me pick the timing too.',
          outcomes: [
            'You say, “Fine. From now on I’ll check with you on important emails.” Dorian nods, perfectly calm, like someone accepting a commission he’d planned for long ago. Over the next two weeks, reply rates on the group’s important emails go up, and communication with other faculty gets noticeably smoother too. He doesn’t mention it to anyone. He just stops by before each important email goes out to settle the timing with you.',
          ],
        },
        qdd_pi_email_timing_research: {
          text: 'This pattern deserves a proper study',
          outcomes: [
            '“If reply delays are predictable, students’ strategy turns into a game,” Dorian says. “That’s a multi-agent modeling problem.” He pauses, then points to one person in the spreadsheet whose reply times are uniformly distributed. “This person,” he says, “is the only one I couldn’t predict.” Another pause. “In game theory, a uniform distribution is the optimal strategy. Nobody can read you.” Then he suddenly laughs, with the look of someone who has just walked into his own trap. “It’s me.” You realize he is both the researcher and the subject, and for a moment you can’t decide whether to congratulate him or apologize. He’s already got his phone out, jotting down notes on methodology.',
          ],
        },
      },
    },

    qdd_mediocre_paper_filter: {
      title: 'He Can Triage a Paper in Three Minutes',
      prompt: 'Dorian has an efficient paper-screening system. You:',
      description: [
        'It’s literature review week, and Dorian has read thirty papers in three days, an unusually high rate. You ask him how he does it.',
        '“A filter,” he says. “It takes about three minutes to decide whether a paper deserves a close read.” He walks you through it: first check the abstract for hedge words in three particular spots, then check whether the experiments include an ablation, then skim the conclusion. If the conclusion is weaker than the abstract, skip it.',
        '“How many does that filter out?”',
        '“About sixty percent of this batch,” he says, as if there were nothing odd about the number. “But if you ask me, sixty percent is an underestimate. This field has a lot of padding.”',
      ],
      options: {
        qdd_mediocre_paper_share: {
          text: 'Share it with the group. Double everyone’s speed.',
          outcomes: [
            'You have him present the process at group meeting. He talks for twenty minutes, as clearly organized as a product manual, and several people say on the spot that they’ll try it. A week later, everyone’s literature reviews are moving faster. Someone asks whether he’d write up a tutorial. He says, “I’ll send it once it’s cleaned up,” and actually does. The doc is even more detailed than the slides.',
          ],
        },
        qdd_mediocre_paper_formalize: {
          text: 'Turn the criteria into a tool',
          outcomes: [
            'You say, “If this logic can be formalized, it could become an automatic classifier.” Dorian thinks about it. “Sure. And with enough data, you could flip it around and analyze which features make papers low quality. That’s the interesting part.” His expression turns unmistakably calculating, and you can tell he’s already running an ROI estimate on the idea.',
          ],
        },
      },
    },

    // ── Half-favor event (src/data/events/half_favor.ts) ───────────────────

    half_favor_qian_duoduo: {
      title: '{studentName} Accidentally Goes into Pitch Mode',
      prompt: 'You:',
      description: [
        'That day you just ask, offhand, “Should the group get a meal together this week?”',
        '{studentName} says “Mm,” then goes quiet for about five seconds. You assume he’s thinking about scheduling. Then he speaks: “This is the right direction. We need to improve team cohesion. Specifically—”',
        'You sense something is off, but he can’t stop now. “One: clarify dining requirements and conduct a preference survey. Two: the venue should optimize for per-person budget and travel cost. Three: the timing should be chosen based on…”',
        'Halfway through, he catches himself and switches back to a normal voice in a split second: “…so, where should we eat?”',
      ],
      options: {
        half_favor_qdd_detail: {
          text: 'That venue plan you mentioned. Can you flesh it out?',
          outcomes: [
            '{studentName} opens his phone and, a moment later, shows you a spreadsheet: twelve restaurants nearby, annotated with price per person, distance, wait time and how well each matches the group’s known preferences.\n\n“I sometimes build these on the side,” he says breezily. “Just on the side.” You ask how long he’s been doing it on the side. About a year, he says. The lab’s lunch spending has possibly never been taken this seriously.',
          ],
        },
        half_favor_qdd_calm: {
          text: 'Deep breath. Then we order food like normal people.',
          outcomes: [
            '{studentName} takes a deep breath and nods. “Okay.” He opens a delivery app, picks three places and posts screenshots in the group chat with “Everyone vote.” You think that’s the end of it. Five minutes later he sends another message: “Also, based on the data, we should eat together every three weeks. Irregular intervals lower anticipation.” Followed by a note in parentheses: (For reference only, not mandatory.)',
          ],
        },
      },
    },

    // ── Max-favor event (src/data/events/max_favor.ts) ─────────────────────

    max_favor_qian_duoduo: {
      title: 'The Lab Pop-Up Shop',
      prompt: 'You pick up the T-shirt. On the back it says: Still Debugging.',
      description: [
        'Friday afternoon, walking past the campus plaza, you spot a folding table set up in the shade of a tree. It’s covered in odd merchandise: mugs printed with “Reviewer 2,” “Future Best Paper” stickers, a deadline countdown calendar, and a T-shirt that reads “Experiment in progress. Do not disturb (unless there are results).” The table sign says Lab Merchandise Beta v0.3. Underneath, in small print: Not yet officially authorized by anyone.',
        'Behind the table stands {studentName}. He’s pitching a passing undergrad: “This is our lab’s most classic piece of merch, with commemorative value and psychological damage in one—” Halfway through, he spots you and waves you over. “The professor’s here. The boss is here.”',
        'You walk over and find that people are actually buying. One student leaves happily hugging a Reviewer 2 mug; another is earnestly comparing two deadline calendars to see which one feels more oppressive. Looking down at the merch, you notice a small card tucked behind each item, listing the project it’s tied to, the students involved, and a one-line description. All the results that usually just sit in the project list, he’s packaged like campus legends.',
        'Someone asks you, “Are you with this lab too?” {studentName}, still counting out change, jumps in before you can answer and casually points at you. “Of course. I’m with this one.” Then he goes right back to taking money, as if he hadn’t said anything special. You’re the one who stays standing there a little longer, suddenly thinking that the little folding table looks a lot like a signboard the lab has sprouted out here on campus.',
        'At the corner of the table you notice a T-shirt with no price on it, neatly folded and set apart from everything else. You ask why it’s not for sale. {studentName} closes the cash box, still keeping up the professional tone: “Sample. Not available to the public.” A pause, then, more quietly: “Actually, I saved it for you.”',
      ],
      options: {
        max_favor_qdd_wear: {
          text: 'Put the T-shirt on right there',
          outcomes: [
            'You pull the T-shirt on over your work clothes. {studentName}’s eyes go wide, and then he immediately takes out his phone for a photo. “This could be the promo shot for the next version.” You warn him not to post it everywhere. He nods very quickly. “Internal materials. Founding team only.”\n\nA little later he adds, grinning, “But seriously, Professor, you actually look the part.”',
          ],
        },
        max_favor_qdd_continue: {
          text: 'Grant the official license and invest more',
          outcomes: [
            '{studentName} immediately edits the sign that read “Not yet officially authorized by anyone” to read “Officially authorized by anyone.”\n\nHe takes stock of the inventory with great seriousness. “Sold better than expected today. Next time we can add new products, like an annual lab mystery box, commemorative rejection pins, and coasters with your greatest quotes.”\n\nYou tease him, “Now that you’ve taken my investment, no giving up halfway.” He looks up at you. “Of course I’m keeping it going.” He’s talking about the pop-up shop, but to you it sounds like he means something else.',
          ],
        },
      },
    },

    // ── New Year gift reaction (src/data/events/new_year.ts) ───────────────

    new_year_gift_result_qian_duoduo: {
      title: 'Dorian’s Reaction',
      prompt: 'Dorian’s reaction is…',
      description: ['Dorian takes the gift box.'],
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Dorian opens the box. His first reaction: “Where did the budget for this come from?” His second is to study the packaging. Only his third is realizing it’s a gift for him.\n\nThen he suddenly pulls out his phone and starts posting. You ask if that’s really necessary. He looks up, grinning. “Professor, if I don’t post this, what am I supposed to remember my youth by when I’m old?”\n\nThat night, scrolling, you see his post: nine photos. Eight are of the gift. One is of you.',
            'Opening the box, Dorian quickly estimates what it cost, and he’s almost exactly right. He thanks you with practiced professionalism, then mentions that he knows a wholesale gift supplier and could help you “optimize procurement costs” next time. You’re not sure whether that counts as giving something back.',
          ],
        },
      },
    },
  },
};
