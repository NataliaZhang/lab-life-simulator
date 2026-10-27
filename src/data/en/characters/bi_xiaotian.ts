import type { CharacterPack } from '../../../types/i18n';

// English overlay for 毕小天 (Theo Bell): profile card plus all of his personal events,
// his half/max-Rapport events and his New Year gift reaction.
// Recurring minor character in this file: 陈教授 (dolphin-paper coauthor) → Professor Chen.

export const biXiaotianEn: CharacterPack = {
  profile: {
    name: 'Theo Bell',
    firstName: 'Theo',
    pronoun: 'he',
    tagline: 'This paper is absurd. I found it inspiring.',
    bio: 'He has a knack for digging up paper titles from the deepest corners of the internet that leave a room speechless, and then earnestly explaining their academic value. Everyone else just wants to close the browser tab. He’s already sketching a roadmap for follow-up work.',
    farewell: 'Every time I have a new idea, the first person I want to show it to is you.',
  },
  events: {
    // ── 1. First meeting ─────────────────────────────────────────────────────
    bxt_first_meeting: {
      title: 'First Meeting',
      description: [
        'The first thing Theo does when he walks in isn’t introducing himself. It’s holding his phone right up to your face. “Professor, look at this first.”',
        'A screenshot of a paper titled “Schrödinger’s Cat as a Fault-Tolerance Model for Distributed Systems,” from the proceedings of a conference you’ve never heard of. He taps the screen with his index finger, looking more serious than you did at your own PhD defense. “There’s an analogy between quantum superposition and fault tolerance. Nobody’s really dug into it. We could do this.”',
        'You look him in the eye for a while. He is absolutely not joking. His notes app already has two pages on it. Two pages.',
      ],
      prompt: 'Your first meeting with a new student. How do you respond?',
      options: {
        bxt_first_meeting_realistic: {
          text: 'Gently steer him toward something publishable',
          outcomes: [
            'Theo nods earnestly and puts his phone away. “Got it, Professor. I’ll write up the paper’s core argument and send it to you anyway, just in case it comes in handy someday.”\n\nThree hours later, the document lands in your inbox. Eight pages, with references.',
          ],
        },
        bxt_first_meeting_curious: {
          text: '…Go on. I’m listening.',
          outcomes: [
            'Theo immediately switches his phone to slideshow mode. He has more than a dozen slides ready. You listen for quite a while, and at one point you quietly admit to yourself that the logic actually holds up.\n\nAfter he leaves, you stay where you are, staring at the question marks in your notebook for a long time.',
          ],
        },
      },
    },

    // ── 2. Weird paper of the day ────────────────────────────────────────────
    bxt_arxiv_discovery: {
      title: 'Weird Paper of the Day',
      description: [
        'For a couple of weeks straight, Theo has been sharing obscure papers in the lab group chat. The first few days, people actually read them. Before long, someone muted him.',
        'Today’s title is “Optimal Strategies for Dining Hall Serving Lines via the Pigeonhole Principle,” from a university CS department, published in a column called “Operations Research and Everyday Decision-Making.” The abstract is written with complete seriousness. Every lemma and corollary is present and accounted for.',
        'Theo adds a note under the link: “This has a structural connection to our scheduling module. I wrote up my thoughts in the shared doc, if anyone has time to take a look.”',
      ],
      prompt: 'How do you respond to his daily paper drops?',
      options: {
        bxt_arxiv_limit: {
          text: 'One a week. Curated.',
          outcomes: [
            '“Okay, Professor, I’ll be selective.” He goes quiet for two days, then resumes sharing at one paper a week.\n\nBut the quality of that one paper is noticeably higher. You realize he’s keeping the truly absurd ones for himself and only sharing the “relatively normal” ones.',
          ],
        },
        bxt_arxiv_filter: {
          text: 'Each one needs a note on relevance to our work',
          outcomes: [
            'Theo’s eyes light up. “Great idea!” From then on, every post comes with an extra line: “Relevance: ★★★☆☆.” He sets the rating criteria himself, but strangely, people find his judgment more accurate than they expected.\n\nYou start to suspect he’s perfectly clear-headed and just doesn’t say so.',
          ],
        },
      },
    },

    // ── 3. The absurd workshop ───────────────────────────────────────────────
    bxt_weird_workshop: {
      title: 'The 4th Workshop on AI and TCM Meridian Theory',
      description: [
        'Theo shows up holding a printout of a workshop website: “The 4th Workshop on the Integration of AI and Traditional Chinese Medicine Meridian Theory: Exploring the Interdisciplinary Frontier of Traditional Medicine and Deep Learning.”',
        'He sets it on your desk, looking more serious than you do when you’re writing a grant proposal. “Professor, I think we could submit something. I drafted an abstract last night. Could you take a look?”',
        'A second sheet slides across the desk. The abstract fills an entire page. The related work it cites, you verify, does in fact exist in this universe.',
      ],
      prompt: 'How do you handle this workshop submission?',
      options: {
        bxt_workshop_decline: {
          text: 'Wrong direction, but keep the enthusiasm',
          outcomes: [
            '“Theo, this is too far from our research. But I like that you’re looking for places to submit. Go through the main venues in our field and put together a spreadsheet.”\n\nHe nods, and the next day he hands you a seven-page list of conferences. Every venue has a notes column explaining why to submit there. The longest entry runs several lines.',
          ],
        },
        bxt_workshop_review: {
          text: 'Check the program committee first',
          outcomes: [
            'You pull up the program committee on the workshop website. One member is a full professor at a top university, research area: nonlinear modeling of meridian electrical signals. You go quiet for a moment, then decide not to submit after all.\n\nTheo says he understands, archives the abstract, and labels it “On hold until the time is right.” He really did write that.',
          ],
        },
      },
    },

    // ── 4. Unexpected related work ───────────────────────────────────────────
    bxt_related_work: {
      title: 'Interdisciplinary Related Work',
      description: [
        'Theo sends you a link to a shared doc: “Professor, the first draft of the related work is ready. Could you take a look?”',
        'You open it, and your first reaction is mild dizziness. The sources span bioinformatics, behavioral economics and materials science, all marshaled in support of a pure CS problem. You take a deep breath and get ready to type a gently worded “we need to narrow the scope of the citations.”',
        'Then, partway through, you stop. He’s used microstructural phase transitions from materials science as an analogy for the irreversibility of system state transitions, and the analogy isn’t just pretty. It’s logically rigorous. You flip back twice to make sure you read it right.',
      ],
      prompt: 'This interdisciplinary related work is unexpectedly onto something. What do you do with it?',
      options: {
        bxt_related_work_integrate: {
          text: 'Take it all. Work it into the paper.',
          outcomes: [
            '“This section is good. We’ll keep it, but add a paragraph explaining why the analogy holds. We can’t rest it on intuition.” Theo nods vigorously, and a few days later he sends a supplementary note with a draft formal proof attached.\n\nYou forward it to your collaborator, who replies: “…?”',
          ],
        },
        bxt_related_work_narrow: {
          text: 'Set the materials science aside for now',
          outcomes: [
            '“Cross-field citations have to be something reviewers will accept. Keep the core analogy, and move the rest to the appendix or cut it.” Theo nods, a little wistfully, and puts together a trimmed version.\n\nWith the cuts, the core argument actually stands out more. Sometimes less is more.',
          ],
        },
      },
    },

    // ── 5. The offhand idea that turns out useful ───────────────────────────
    bxt_serious_insight: {
      title: 'The “Just Thinking Out Loud” Idea',
      description: [
        'After group meeting last week, Theo was waiting for you by the door. Buried in a pile of small talk, he tossed out a line as casually as a comment about the weather: “Professor, have you ever thought about treating the feedback delay itself as a learnable parameter? Would the stability boundary take a different shape?”',
        'You said something like “Mm, hang on, I have to take this call,” and that was the end of it.',
        'Last night, halfway through writing a proposal, that line suddenly popped back into your head. You worked through it properly and couldn’t stop. There’s a core observation in there that could stand as a paper on its own, and maybe a rather elegant little result. He said it offhand. Offhand.',
      ],
      prompt: 'This idea is worth more than you thought. What do you do?',
      options: {
        bxt_insight_tell: {
          text: 'Tell him he might really be onto something',
          outcomes: [
            'Theo pauses, and then a rare look of genuine surprise crosses his face. He probably never expected anyone to remember that line. “Professor, so can I… write up a proposal?” “Go for it.”\n\nThe proposal arrives two days later. Twenty pages, with a code skeleton.',
          ],
        },
        bxt_insight_later: {
          text: 'Say nothing. Quietly draft a plan first.',
          outcomes: [
            'You spend two weeks turning the idea into a preliminary proposal, then set up a meeting with Theo and lay it out in front of him. “That question you asked the other week. I worked it through. Take a look.” Theo studies it for a while, then looks up with total certainty. “So I was right.”\n\nYou open your mouth and find you have no comeback.',
          ],
        },
      },
    },

    // ── 6. Thesis direction crisis ───────────────────────────────────────────
    bxt_thesis_crisis: {
      title: 'Thesis Proposal Rejected',
      description: [
        'Theo sends you a message: “Professor, there’s something I should tell you. No rush, whenever you have time.” Anything labeled “no rush” is urgent.',
        'When you meet, he tells you his thesis proposal has been rejected by the department review committee, on the grounds that “the research direction falls outside the accepted scope of the discipline.” The review lists three points. First, “the degree of interdisciplinarity exceeds the boundaries of a doctoral thesis.” Second, “the sources of its theoretical foundation are questionable.” Third, “the topic is excessively original.” The last one is, incredibly, meant as a criticism.',
        'When he’s done, Theo leans back in his chair and adds, unbothered: “But Professor, I prepared a Plan B a long time ago.”',
      ],
      prompt: 'His proposal got rejected, and he says he has a Plan B. How do you respond?',
      options: {
        bxt_crisis_b_plan: {
          text: 'Hear the Plan B first',
          outcomes: [
            'Plan B is a more “conventional” framing, but nested inside it is a core question almost equivalent to the original direction. Same problem, reworded, dressed up in the clothes of a respectable discipline.\n\nYou rub your forehead. “You knew it would get rejected?”\n\n“I expected it,” he says with a shrug. “So I wrote this in advance.”',
          ],
        },
        bxt_crisis_communicate: {
          text: 'Fight for a chance to revise',
          outcomes: [
            'You send the department chair a carefully worded email, attaching a statement of the theoretical basis for Theo’s project. The department replies that he can submit a revised version within two weeks. Theo writes back: “Thank you, Professor. I’m already revising.”\n\nThe revised version is in your inbox three days later. He was probably ready for this.',
          ],
        },
      },
    },

    // ── 7. Science communication talent ──────────────────────────────────────
    bxt_science_communicator: {
      title: '“Finally, Someone Who Explains It Like a Human”',
      description: [
        'You’re looking at data when Theo messages you: “Professor, I posted a video a few days ago and it’s getting some views. Want to take a look?”',
        'The video is twelve minutes long. He explains a famous fault-tolerance protocol by “putting a cat in a box full of cat food,” and a class of scheduling problems by how delivery drivers decide which orders to take. His tone is as earnest as a conference talk the whole way through, and yet, strangely, every sentence makes sense to someone with zero background.',
        'The pinned comment: “Finally, someone who explains it like a human.” Over 10K likes, and every reply is asking when the next episode is coming.',
      ],
      prompt: 'He’s shown an unexpected talent for science communication. How do you guide it?',
      options: {
        bxt_communicator_encourage: {
          text: 'Look at you. That’s a real skill.',
          outcomes: [
            '“That analogy was great. It shows you really understand the protocol. If you enjoy this, keep going. Just run each one by me for accuracy before you post.” Theo nods, and asks while he’s at it whether he can mention the lab in the video description.\n\nThree weeks later he sends you a screenshot. A company that makes research productivity tools saw the video and wants to put a small sponsorship into the next episode, on the condition that he mentions their name once. He reports the outcome of the negotiation: “I said I couldn’t call it a sponsorship, only a thank-you for providing the tools. They agreed, then asked whether there was a referral fee they could send the lab. I said yes, so they sent over some money.”\n\nYou stare at the message and realize he has just conducted an entire business negotiation.',
          ],
        },
        bxt_communicator_balance: {
          text: 'Research first, hobbies second',
          outcomes: [
            '“Don’t let your progress slip at group meeting. Manage your own time.” Theo nods earnestly. After that he keeps to one video every two weeks. Oddly, the day after each video goes up, his paper moves faster than usual. Maybe getting the urge to explain things out of his system lets him settle down.',
          ],
        },
      },
    },

    // ── 8. Interdisciplinary discovery ───────────────────────────────────────
    bxt_interdisciplinary_find: {
      title: 'A Graph Neural Network Unearthed from a Bach Fugue',
      description: [
        'Theo comes to see you holding three handwritten sheets, each densely covered in diagrams and equations. The handwriting is neat and the layout compact, like some carefully maintained secret codex.',
        '“Professor, I’ve been reading a music theory paper that analyzes the voice structure of Bach’s fugues. I think the mathematical structure it uses to describe the relationships between voices is isomorphic to the graph convolution we’ve been using.”',
        'He lays the three sheets out one by one and talks for quite a while. You follow every step carefully. The isomorphism isn’t a forced analogy. It’s a structural correspondence with real mathematical meaning. Even more absurd, once you bring in the constraints from music theory, the regularization term the group has been hand-tuning all along falls out naturally. He derived it from Bach.',
      ],
      prompt: 'This interdisciplinary find has real value. What do you do with it?',
      options: {
        bxt_find_evaluate: {
          text: 'Evaluate it properly and put it on the plan',
          outcomes: [
            'You spend an afternoon verifying his derivation. At the next group meeting, you present the result as an official research direction, labeled “Source: Theo Bell.”\n\nHe sits in the corner, barely able to hide how excited he is.',
          ],
        },
        bxt_find_aside: {
          text: 'Revisit it after the main project',
          outcomes: [
            '“Keep this direction in reserve. Finish the main experiments first, and we’ll treat this as a backup.” Theo stacks the three sheets neatly, puts them away, and carefully writes a line in the corner: “To be launched upon completion of main project.”\n\nHis earnestness gives you an inexplicable sense of unease.',
          ],
        },
      },
    },

    // ── 9. Defense sent back ─────────────────────────────────────────────────
    bxt_yanbi: {
      title: 'Ahead of Its Time',
      description: [
        'The defense runs two and a half hours. You wait outside.',
        'When the door opens, Theo walks out calm and steady, looking no different from when he went in. He sits down next to you and says, “The committee wants revisions. Their main comment is that the research direction is too marginal, and they suggest moving it closer to mainstream problems.”',
        'He’s trying hard to stay composed, but there’s a hurt in his voice he won’t admit to. “Professor, I think this means our direction is too far ahead of its time.”',
      ],
      prompt: 'His defense didn’t pass, and he thinks it’s because the work is “too far ahead of its time.” How do you handle it?',
      options: {
        bxt_yanbi_replan: {
          text: 'Help him reframe the whole story',
          outcomes: [
            'You spend two weeks with him restructuring the thesis, repackaging the core contributions in more conservative language while keeping the most valuable parts. Theo cooperates the whole way, but next to every single edit, he pencils in a faint note: “Original version was here.”\n\nYou pretend not to see.',
          ],
        },
        bxt_yanbi_validate: {
          text: 'Swallow it. Graduate first.',
          outcomes: [
            '“You have a point. But the committee’s comments are what they are. Let’s get you through the defense first, and I’ll help you submit the original version.” Theo nods and says, completely seriously, “Okay. Then the revised version is a translation project.”\n\nHe starts revising, and he’s surprisingly fast. Maybe because he thinks of it as just translating, he doesn’t take it to heart.',
          ],
        },
      },
    },

    // ── 10. Pilgrimage ───────────────────────────────────────────────────────
    bxt_paper_pilgrimage: {
      title: 'A Pilgrimage to the Weird Paper',
      description: [
        'Theo pushes the door open with a light in his eyes you’ve seen before, the one that only appears when he’s found something especially fun. “Professor, I checked. Professor Chen is visiting our university today. He’s a coauthor on that paper, ‘Language Modeling for Dolphins.’”',
        'He pauses, then adds, very seriously, “I want to go see him.”',
        'You ask what he plans to do. He says, just… go take a look. Take it in.',
      ],
      prompt: 'He wants to go see the professor. How do you respond?',
      options: {
        bxt_pilgrimage_join: {
          text: '…Fine. I’ll come with you.',
          outcomes: [
            'The two of you loiter outside the mechanical engineering building for over half an hour, Theo holding Professor Chen’s photo up on his phone. Every so often you pretend to walk past, pretend to check your phones, pretend to study the building directory.\n\nFinally Professor Chen appears, walking out of a convenience store with an Americano. He looks completely normal and walks completely normally, without a trace of the mystique you’d expect from someone who has studied dolphin language.\n\nYou walk back in silence. Just before you reach the lab, Theo says thoughtfully, “Maybe he just dashed off the dolphin paper.” You nod in agreement, though you suspect he’s already planning the next one.',
          ],
        },
        bxt_pilgrimage_solo: {
          text: 'Go ahead. See you this afternoon.',
          outcomes: [
            'Theo comes back in the afternoon, sits down the moment he’s through the door, and says with no preamble, “Professor, I saw him. He was buying coffee.” Two-second pause. “A regular Americano.” Another two seconds. “He wasn’t quite what I imagined.”\n\nYou look up and ask what was different. He hesitates. “I can’t really explain it. Maybe the paper was just written with so much passion that I thought he’d be the kind of person who…” He gestures, but can’t quite get the shape of it.',
          ],
        },
      },
    },

    // ── 11. Alumni visit ─────────────────────────────────────────────────────
    bxt_alumni_visit: {
      title: 'An Email from a Science YouTuber',
      description: [
        'On an ordinary Wednesday afternoon, you get an email. From: Theo Bell. Subject: “A small thing.”',
        'It isn’t long. He says he now makes science videos full-time, explaining “serious research that doesn’t look serious,” and his following is growing faster than he expected. A tech outlet recently invited him for an interview about “the value of obscure research directions.” He’d like to mention the lab by name and wants to know if you mind.',
        'At the end there’s one more line, in exactly the tone he used to post papers in the group chat: If you ever come across a new absurd paper you want more people to know about, feel free to send it my way.',
      ],
      prompt: 'Theo wants to know if he can mention the lab in the video. How do you reply?',
      options: {
        bxt_alumni_allow: {
          text: 'Mention us, by all means',
          outcomes: [
            'You reply: “No problem. Good luck.” The day the interview comes out, you see people in the comments asking how to contact the lab, and traffic to the lab website goes up noticeably.\n\nThen Theo sends a message, no preamble: “Professor, I did end up submitting that Schrödinger’s cat paper. It got accepted. It comes out next month.” The very one he held up in front of you at your first meeting. He’d been holding on to it all along.',
          ],
        },
        bxt_alumni_conditional: {
          text: 'Let me see the content first',
          outcomes: [
            'Theo sends over the interview questions and his draft answers. You look them over and find nothing wrong. The interview comes out, and the lab’s name flashes by, attached to a single sentence: “That’s where I learned how to take strange questions seriously.” You screenshot that part and send it to yourself.',
            'Theo sends you the interview outline to review. From the first glance something feels off, and the more you read, the deeper your frown gets.\n\nSome interviews make the interviewee famous. Some interviews make the advisor famous. You decide not to gamble.',
          ],
        },
      },
    },

    // ── GPU queue game ───────────────────────────────────────────────────────
    bxt_gpu_queue_exploit: {
      title: 'He’s Betting on When the GPUs Free Up',
      description: [
        'You notice the lab’s GPU utilization has been unusually even lately. There’s normally a late-night peak, but now it’s practically a flat line. You ask Theo whether some new scheduling tool is involved.',
        '“No tool,” he says. “I’ve been picking the times by hand.” He opens a script he wrote: submission-time prediction based on historical utilization, plus a bit of forecasting of everyone else’s daily routines.',
        '“You’re predicting when other people won’t be using the GPUs?”',
        '“Yeah, so my jobs basically never wait in the queue.” He pauses. “But I realized that if everyone did this, the equilibrium would collapse. It’s actually a game theory problem.”',
      ],
      prompt: 'Theo is playing the GPU queue game. You:',
      options: {
        bxt_gpu_queue_ban: {
          text: 'Don’t. Everyone should just share fairly.',
          outcomes: [
            'You tell him that if everyone did this it would turn into an arms race, and suggest he drop the whole thing. Theo nods. “Okay, Professor, I’ll use the regular queue.” The script gets shut off, and the GPU peaks come back.\n\nOne night his job sits in the queue for three hours. He posts a crying-laughing emoji in the group chat and says nothing more.',
          ],
        },
        bxt_gpu_queue_formalize: {
          text: 'Model the game properly',
          outcomes: [
            '“Then work out where the Nash equilibrium is.” Theo pushes the script aside and opens the last tab of a spreadsheet, titled “Game Analysis (draft, unfinished).” Inside is a half-finished mixed-strategy matrix with a comment: “Convergent strategies → efficiency drops ~18%, not verified, parking this for now.”\n\nHe glances at you, a little embarrassed. “I figured it was kind of a detour, so I didn’t mention it.” You say, “Finish it.” His expression turns complicated for a moment. Then he sets the embarrassment aside and gives you a serious nod.',
          ],
        },
      },
    },

    // ── Variable naming ──────────────────────────────────────────────────────
    bxt_variable_naming: {
      title: 'His Variable Names Are an Art Form',
      description: [
        'You’re reviewing Theo’s code when you hit a variable: `final_final_v3_ACTUALLY_FINAL`. Further down: `temp_but_not_really`, `flag_idk_what_this_does`, `this_should_work`. You call him over to explain.',
        'Theo looks at it for half a minute, and his expression starts to get complicated. “Professor, this… has a history,” he says. “This `final_final_v3` is from when I’d gone through so many versions that I thought I’d finally gotten it right, so…”',
        '“And `ACTUALLY_FINAL`?”',
        '“I changed it one more time after that.”',
        'You both sit in silence for a moment. Then he says, “Professor, have you noticed you can actually reconstruct someone’s state of mind from the variable names they wrote?”',
      ],
      prompt: 'Theo’s variable names are an entire emotional journey. You:',
      options: {
        bxt_variable_naming_refactor: {
          text: 'Rename them. Today.',
          outcomes: [
            'You say, “Rename all of it today. Use descriptive names.” Theo sits down and spends two hours on it, then sends it over. The code really is much clearer.\n\nBut you notice one last variable called `should_i_even_rename_this`. You choose to look the other way, since that part really is temporary code.',
          ],
        },
        bxt_variable_naming_observe: {
          text: 'You’re right. That’s information.',
          outcomes: [
            'You say, “Actually, that’s a good idea. Variable names really are a kind of cognitive trace. Want to test it on a batch of real projects?” Theo immediately says, “I’ve scraped some open-source repos, I have data!”\n\nHe goes digging and comes back with a corpus of variable names he’d casually collected a while ago, already roughly sorted by “naming confidence.” You realize this research has been underway for quite a while. He just never told you.',
          ],
        },
      },
    },

    // ── Half Rapport ─────────────────────────────────────────────────────────
    half_favor_bi_xiaotian: {
      title: '{studentName} Goes Off on a Tangent (a Good One)',
      description: [
        'You’re discussing experiment design when {studentName} says, “Professor, I just thought of an analogy…” and then starts talking.',
        'About two minutes later, you have completely forgotten what you were originally discussing. {studentName} is explaining a 1987 behavioral ecology paper, eyes shining, hands going nonstop. “Look at this model. The problem it explains and our core hypothesis are structurally isomorphic…”',
        'He stops midsentence. “Wait, let me show you this,” he says, pulling up a chart. “See, this and your data distribution…” He keeps going for another ten minutes.',
        'When he’s done, he stops on his own, looks at you, then at the whiteboard. “Professor, what were we originally talking about?”',
      ],
      prompt: 'You:',
      options: {
        half_favor_bxt_tangent_good: {
          text: 'I forgot too, but that analogy was really interesting',
          outcomes: [
            '{studentName} visibly lights up. “Really?!” He saves the paper into a folder named “Possibly Relevant/Relevance Unconfirmed?”, question mark included. You ask how many papers are in that folder. He thinks about it. “A hundred and thirty-seven, but maybe thirty are actually relevant.” You ask how he tells them apart. He says, “Gut feeling.” Then he looks at you as if that’s the obvious answer.',
          ],
        },
        half_favor_bxt_new_direction: {
          text: 'Your tangent is way more interesting than the original. Want to run with it?',
          outcomes: [
            '{studentName} looks down and thinks for two seconds. “Then… should we switch directions?” He snaps a photo of the whiteboard, starts a fresh page and begins building a framework, fast and precise, the logic a little winding but self-consistent. When you’re done, he caps his marker and says, “Professor, I’ve noticed my good ideas usually don’t come from thinking. They come from wandering off course.” You suspect that might actually be true.',
          ],
        },
      },
    },

    // ── Max Rapport ──────────────────────────────────────────────────────────
    max_favor_bi_xiaotian: {
      title: 'The Top Secret Folder (Finally Declassified)',
      description: [
        '{studentName} mysteriously pulls you into a meeting room, checks that the door is shut, checks that the blinds are down, then pulls a bulging folder from the very bottom of his backpack. The cover has a handwritten label: “Important Research Materials.” You’re about to admire his rigor when you notice a smaller line underneath: “Strictly Not for Ordinary People.”',
        'The moment the folder opens, you know something is off. Page one: “Can Large Language Models Explain Feline Midnight Zoomies?” Page two: “Bubble Tea Sales as a Predictor of Paper Acceptance Rates.” Page three: “Would Academia Improve If Peer Review Were Conducted by Otters?” Every paper is followed by pages of annotations and references, the level of seriousness genuinely frightening.',
        '{studentName} gets more and more excited, like a curator giving a tour of his private museum. “Professor, look at this one! This author really spent three years studying pigeon navigation! And this one, they actually ran the experiments!” Every so often he slaps the table, every so often he stands up to gesture, so happy he completely loses track of time.',
        'At first you just find it funny. Then, gradually, you start really listening. Underneath those ridiculous-looking titles there are real research questions, real experimental designs, and a small, unreasonable sincerity. {studentName} isn’t collecting jokes. He’s collecting the ideas in this world that haven’t yet been allowed to become serious.',
        'Toward the end, his voice suddenly goes quiet. He slides one sheet out from the very bottom of the folder and sets it in front of you. “This one wasn’t written by someone else,” he says. “I wrote this one.” The person who was talking nonstop a moment ago is suddenly a little nervous, fingers resting on the edge of the folder, tapping lightly twice. “Professor, do you think this direction is… actually interesting?”',
      ],
      prompt: '{studentName} pushes the sheet toward you and waits for your answer.',
      options: {
        max_favor_bxt_submit: {
          text: 'Of course it is. Polish it and submit.',
          outcomes: [
            '{studentName} freezes for a second, then visibly brightens. “I knew it!” He says it too fast, giving away that he’s been waiting to hear this all along. A second later he’s already planning the submission, from extra experiments to future work. It dawns on you that he didn’t come looking for permission. He came looking for someone willing to believe in these strange ideas with him.',
          ],
        },
        max_favor_bxt_why: {
          text: 'Why did you keep it hidden?',
          outcomes: [
            '{studentName} answers quietly, “Because the direction is so weird. I was afraid people would think I was just playing around.” But that page, dense with derivations and references, really doesn’t look like a joke. You pat him lightly on the shoulder and give him an encouraging smile. He smiles too. “It’s fine now, though. At least one person was willing to read the whole thing seriously.”',
          ],
        },
      },
    },

    // ── New Year gift reaction ───────────────────────────────────────────────
    new_year_gift_result_bi_xiaotian: {
      title: 'Theo’s Reaction',
      description: ['Theo takes the gift box and immediately turns it over to inspect it.'],
      prompt: 'Theo’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Theo’s eyes light up, and he launches into a nonstop lecture on the gift’s historical origins, cultural evolution and design logic. Twenty minutes in, he suddenly remembers: “Oh, right, thank you, Professor. I was actually going to buy one myself, um… but it’s better coming from you.”',
            'Theo says thank you and turns the box over a couple of times in his hands. Then his gaze drifts to some unrelated book on the shelf nearby, and his attention quietly wanders off.',
          ],
        },
      },
    },
  },
};
