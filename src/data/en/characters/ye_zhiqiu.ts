import type { CharacterPack } from '../../../types/i18n';

export const yeZhiqiuEn: CharacterPack = {
  profile: {
    name: 'Ada Yeh',
    pronoun: 'she',
    tagline: 'Code gets deprecated. Proofs are forever.',
    bio: 'There are always a few papers spread open on her desk, next to a notebook crammed with annotations. Rumor has it she once turned an experimental problem into a theory problem just to avoid setting up an environment. Thorough enough to be reassuring, and thorough enough to make you question your life choices.',
    farewell: 'I want to prove almost everything. Only one thing has never needed a proof.\n\nDoing research with you was the most correct choice I ever made.',
  },
  events: {

    // ── Personal events (src/data/events/students/ye_zhiqiu.ts) ──────────

    yzq_first_meeting: {
      title: 'A Two-Page Self-Introduction',
      description: [
        'Ada arrives at your office door on time. More accurately, “precisely on time”: she later admitted that she reached the hallway two minutes early and waited outside until exactly the hour to knock, “because knocking early would introduce an uncontrolled perturbation into your time budget.”',
        'She takes a printed document out of her bag and hands it to you with both hands. The cover reads, in bold: Self-Assessment Report on Joining the Lab (Initial Version). Two pages. There is a table of contents. Under the table of contents, in small print: “See inside for changelog.”',
        '“Professor, I’d like to confirm one thing first.” She turns to page one and points the cap of her fountain pen at the “Engineering” row. “Does the domain of this definition include system design? If it covers only implementation, my score needs a downward correction. The justification is in note 3 on page two, with additional remarks.”',
      ],
      prompt: 'How do you respond to the report?',
      options: {
        yzq_first_meeting_explain: {
          text: 'Align on terms: design counts as engineering',
          outcomes: [
            'Ada turns to page two and pencils “Definition confirmed, V1.0” next to note 3. Then she looks up. “Okay. The score stands. Professor, I’ve archived this report in the lab’s shared folder. I’ll message you the path.” Watching her leave, it dawns on you that this student will probably turn “getting lunch” into an execution report too.',
          ],
        },
        yzq_first_meeting_defer: {
          text: 'Table the definitions, talk research directions',
          outcomes: [
            'Ada folds the report, polite and composed. “Okay. In V1.1 I’ll give the term definitions their own section, so we can align next time.” You notice she said “next time.” You thought you’d dodged the question. You’ve only postponed it.',
          ],
        },
      },
    },

    yzq_definition_battle: {
      title: 'The Precise Meaning of “Most Likely”',
      description: [
        'The group meeting is well underway. You say, “This direction is most likely right, so let’s go with it,” and reach to flip to the next slide.',
        'Ada raises her hand politely, like an ever-punctual logic cop who has just pulled over a concept for running a red light. “Sorry to interrupt, Professor. Does ‘most likely’ have a quantitative definition? Subjective Bayesian credence, or a limit in the frequentist sense? Because the two have different implications for experimental design…”',
        'From then on, the discussion circles “most likely” for twenty minutes. Her question is beyond reproach. Her timing is just… very precise.',
      ],
      prompt: 'How do you handle these twenty minutes?',
      options: {
        yzq_definition_battle_engage: {
          text: 'Accept the challenge: axiomatize “most likely” on the spot',
          outcomes: [
            'You go back over the core assumptions together on the whiteboard, and Ada fills half of it with notation and boundary conditions. After the meeting she sends a cleaned-up definitions document titled “Meeting Consensus (incl. Confidence Level Conventions),” with a note: “Thank you for today’s discussion. The document is archived. Future writing can cite Section 2.1 directly.” That direction did end up avoiding several major pitfalls because of it.',
          ],
        },
        yzq_definition_battle_redirect: {
          text: 'Friendly reminder: there’s more on the agenda',
          outcomes: [
            'Ada lowers her hand, writes something quickly in her notebook, and sits quietly until the meeting ends. The next morning you get a message: “Professor, I’ve put together three possible operational definitions of ‘most likely.’ Please confirm one when you have time. Otherwise I can’t determine which convention to use in next week’s update.” She isn’t upset. Her questions just don’t go away because you said “let’s keep moving.”',
          ],
        },
      },
    },

    yzq_theory_saves_day: {
      title: 'The Hidden Assumption',
      description: [
        'The results show a bizarre deviation. The whole group is combing the code for bugs. The logs have been read several times over, the runs have been redone, and nobody has an answer.',
        'Ada doesn’t touch a computer. She prints out the PDF of the original derivation and works through it from page one, penciling the preconditions next to every equation, like a forensic examiner reconstructing the timeline at a crime scene.',
        'After a while she pushes the printout to the middle of the table and points to an unremarkable assumption on page three. “This condition doesn’t always hold on our dataset. Remove it, and every observation is completely self-consistent.” The group goes quiet for a moment.',
      ],
      prompt: 'How do you respond to her finding?',
      options: {
        yzq_theory_saves_day_record: {
          text: 'Archive it and promote it to core methodology',
          outcomes: [
            'That same day you turn the hidden assumption into a standalone proposition, with a proof and its scope of applicability. Ada writes it up and sends it over with a note: “I suggest making this the first footnote of the methodology, since every later conclusion depends on it.”\n\nA reviewer later singles it out: the methodological rigor is impressive. When Ada sees the comment, she writes in her notebook: “External validation: rigor.”',
          ],
        },
        yzq_theory_saves_day_praise: {
          text: 'Praise her now, sort out the details next week',
          outcomes: [
            'Ada nods, folds the printout into a folder, and says, “Okay. I’ll write out the full proof first so we can use it directly next week.” You tell her there’s no rush. “It’s no trouble. I’ll finish it tonight.”\n\nThe next morning you open your inbox: a four-page derivation, clearly labeled, not a single skipped step. Her “no trouble” sits about two orders of magnitude above most people’s “careful work.”',
          ],
        },
      },
    },

    yzq_env_crisis: {
      title: 'Can I Make This a Theory Problem?',
      description: [
        'Ada knocks and comes in looking like a lawyer who has just sat through a very long trial: deeply exhausted, deeply restrained, deeply suppressing some emotion that is already close to boiling.',
        '“Professor, I can’t get the environment set up.” She turns her phone toward you: a dense wall of error messages, with a fatal in a new color every few lines. “Version conflicts, circular dependencies. It won’t run in Docker, the local install throws errors, and I don’t have enough permissions on the server. I’ve tried a lot of solutions.”',
        'She takes a deep breath, then makes a request in an unusually calm voice. “Professor… may I turn this into a theory problem? Formalize the experimental setup mathematically and bypass the implementation entirely?”',
      ],
      prompt: 'How do you handle this environment disaster?',
      options: {
        yzq_env_crisis_fix: {
          text: 'Roll up your sleeves: engineering rescue',
          outcomes: [
            'You spend an afternoon with her getting the environment working, hitting two pitfalls no one has ever heard of along the way. Ada records every step in her notebook and turns it into an “Environment Setup Memo (with Troubleshooting Log and Root Cause Analysis),” which ends with an acknowledgment: “Thanks to my advisor for engineering support.”\n\nYou stare at the words “engineering support” and feel a complicated emotion slowly fermenting in your stomach.',
          ],
        },
        yzq_env_crisis_theorize: {
          text: 'Render unto math what is math’s, and the environment… never mind',
          outcomes: [
            'Ada’s expression switches from “deeply pained” to “deeply focused” in an instant, as if someone had switched off a sensor that had been sounding an alarm the whole time. A week later she sends a twenty-page theoretical framework, with a note: “The experimental section has been replaced by a constructive proof. The conclusions are in fact stronger.”\n\nYou realize this was never avoidance. She had just finally found the right coordinate system.',
          ],
        },
      },
    },

    yzq_checklist: {
      title: 'The 32-Point Checklist',
      description: [
        'You ask Ada to look over a project application, figuring it will take her two or three hours, and add offhand, “Just give it a look and see if anything’s obviously wrong.”',
        'She sends it back that same afternoon with two attachments. One is an annotated copy of the original. The other is a separate document titled Application Review Checklist (32 Items, Cross-Validated Across 8 Dimensions).',
        'Item 31 reads: “Has item 1 been confirmed?” Item 32 reads: “Has item 31 been confirmed?” The checklist is self-recursive.',
      ],
      prompt: 'What do you do with the 32-point checklist?',
      options: {
        yzq_checklist_follow: {
          text: 'Go through every item. That’s what checklists are for.',
          outcomes: [
            'You spend two hours checking all 32 items one by one. The data citation problem in item 7 is real, and the formatting suggestion in item 19 makes a lot of sense. The application is visibly better. You reply, “The checklist is extremely useful.” She writes back: “If you think it appropriate, I can turn a general version into a standard operating procedure for the group.” You say sure.\n\nAnd just like that, the group has a 32-point quality control system, all because you casually said “just give it a look.”',
          ],
        },
        yzq_checklist_skip: {
          text: 'Reply “thanks, ok” and only read the annotated copy',
          outcomes: [
            'After you submit, the committee comes back: a data citation is formatted incorrectly, revise and resubmit. You dig out the checklist. Item 7 spells it out clearly, with a suggested fix attached.\n\nAda doesn’t say a word of complaint. After you send the revised version, she just sends one message: “Received. Next time, would you like me to mark the high-priority items in red?”',
          ],
        },
      },
    },

    yzq_logic_police: {
      title: 'This Analogy Breaks Down at Step Two',
      description: [
        'You’re explaining a concept to Ada with an everyday analogy that you think is pretty vivid, and you’re ready to wrap up and move on.',
        'She puts down her pen, looks at you, and says, “Professor, this analogy breaks down at step two. In the original concept the mapping is injective, but the corresponding relation in your analogy doesn’t have that property, so the subsequent inferences…”',
        'She goes on for a while, deconstructing your analogy from step one through step five, pointing out three places where it isn’t rigorous, then offers a replacement: precise, unambiguous, and completely missing the everyday charm of your original.',
      ],
      prompt: 'How do you respond to having your analogy deconstructed?',
      options: {
        yzq_logic_police_accept: {
          text: 'Concede and adopt her precise version',
          outcomes: [
            '“You’re right. We’ll use your version.” Ada writes the replacement analogy into the lab’s concept doc, with the note “Original analogy replaced due to mismatched mapping properties, V2.0.” The next time you explain the same concept, it feels like some of the charm is gone, but no one in the group ever misunderstands that step again.\n\nSometimes rigor is the best analogy.',
          ],
        },
        yzq_logic_police_defend: {
          text: 'An analogy just has to work. It doesn’t need to be rigorous.',
          outcomes: [
            '“Professor,” she pauses. “I understand the value of intuition. But if this analogy gets cited to support later arguments, the non-rigorous parts could spread misunderstandings.” She doesn’t push any further. She just writes something in her notebook, and you don’t see what.\n\nFrom then on, every time you explain a concept with an analogy, she quietly adds a “strictly speaking” from the side. Every time. Without fail.',
          ],
        },
      },
    },

    yzq_cant_code: {
      title: 'A Constructive Proof Instead of Experiments',
      description: [
        'You assign Ada a set of controlled experiments, results due in two weeks. The task description is perfectly clear: run the experiments, get numbers.',
        'Two weeks later the report arrives. Twenty-eight pages. The first twenty-four are a complete mathematical analysis: rigorous conclusions, every edge case covered, airtight.',
        'Page twenty-five is titled “Experiments (Constructive).” No code, no plots. Instead there is a formal constructive proof: if the experiment could be run, its results would necessarily satisfy such-and-such property. The conclusion is complete, correct and beyond criticism. There is just nothing in it that can actually be run.',
      ],
      prompt: 'How do you assess this report?',
      options: {
        yzq_cant_code_praise_theory: {
          text: 'Praise the theory, then ask for a runnable version',
          outcomes: [
            '“The theory is really solid,” you say, “but in the end we need numbers from something that actually runs.” Ada nods. “Understood. I’ll ask a labmate on the engineering side to work with me on that part.”\n\nShe pronounces the word “engineering” with special clarity, like someone speaking a foreign language she isn’t fluent in but takes very seriously.',
          ],
        },
        yzq_cant_code_push: {
          text: 'Be blunt: I need code this week',
          outcomes: [
            'Ada turns to the “Experiments (Constructive)” page and looks at it in silence for a while, then looks up. “Okay, Professor. I’ll try the environment again this week.”\n\nA week later you receive the code. It runs, it produces results, and its comment density borders on literature: every line is annotated with the corresponding mathematical notation and derivation number. Performance is mediocre, the results are entirely correct, and one line carries the comment: “This implementation is equivalent to step 4 of Theorem 3.2. See Appendix B.”',
          ],
        },
      },
    },

    yzq_reliable_delivery: {
      title: 'Day Thirteen',
      description: [
        'You give Ada a two-week task and add offhand, “No need to rush, just get it done.”',
        'On the afternoon of day thirteen she appears at your office door and sets a file on your desk, looking the same as always. “Professor, the task is complete.”',
        'You open it. The main text is complete and exactly what you expected, followed by Appendix A, Appendix B and an “Extended Analysis.” It’s about a third more than you asked for, including two edge cases you never asked about but that really do matter.',
      ],
      prompt: 'How do you respond to the early delivery?',
      options: {
        yzq_reliable_delivery_praise: {
          text: 'Praise her: the appendices are really valuable',
          outcomes: [
            'Ada nods calmly, as if confirming something that was on the schedule. “If needed, I can turn Appendix B into a standalone document for the archive.” You say sure. She says, “I’ll send it tonight,” and leaves.\n\nYou look at the file for a while and feel something rare: the solid, steady relief of knowing someone has completely got you covered.',
          ],
        },
        yzq_reliable_delivery_ask: {
          text: 'Ask how she finished on day thirteen',
          outcomes: [
            '“On day one I split the task into ten subtasks,” Ada says, “gave each one a time budget, and reserved the last day for integration and checking. So finishing on day thirteen was planned. The appendices cover gaps I found during the checking phase. They didn’t take any extra time window.”\n\nYou nod and quietly update your definition of “efficient.”',
          ],
        },
      },
    },

    yzq_proof_breakthrough: {
      title: 'QED',
      description: [
        'This convergence proof has been stuck for nearly two semesters. Two people tried it before and hit a wall in the same place, after which everyone tacitly moved it to the “strategically shelved” folder.',
        'One Friday afternoon, Ada sends a message with an attachment: a scan of handwritten pages. The handwriting is neat, every step is marked with its premises, and the chain of derivation is complete, with no breaks.',
        'The last line reads “QED,” with a small checkmark next to it in ballpoint pen. It’s as low-key as going through a to-do list and casually crossing off something that was supposed to be impossible.',
      ],
      prompt: 'How do you respond to the breakthrough?',
      options: {
        yzq_proof_breakthrough_publish: {
          text: 'Write it up now. It deserves its own paper.',
          outcomes: [
            'Ada spends a few days converting the handwritten draft to LaTeX. The typesetting is meticulous, and every symbol matches the manuscript. Before submission she asks for two independent verifiers to check it step by step. The request was entirely her own idea.\n\nWithin a month of publication, three researchers email to say they had also been stuck on this problem for a long time. Ada’s assessment: “Then the proof has nontrivial value.”\n\nThe journal editor later sends a follow-up email: this issue comes with a small “Outstanding Contribution” award. Ada forwards it to you. The body is one line: “Accept or decline.”',
          ],
        },
        yzq_proof_breakthrough_verify: {
          text: 'Verify it independently first, then celebrate',
          outcomes: [
            '“That’s the right approach,” Ada says. “I’ve checked it many times myself, but independent verification is a necessary protocol.” You have the strongest theory person in the group go through the proof. Two days. Verdict: correct, zero gaps.\n\nThe labmate later tells you privately, “That construction in step 14 is clever. I never would have thought of putting it together like that.” When Ada hears the feedback, she writes a line in her notebook: “External assessment: step 14 construction. Clever.”',
          ],
        },
      },
    },

    yzq_alumni_visit: {
      title: 'Is This Too Blunt?',
      description: [
        'After graduating, Ada went to a top theory lab as a postdoc. Before she left she said she would “stay in touch.” You took it as a pleasantry, then found out she meant it: roughly one email every two months, each with a specific question or some useful material. Never a message that just says “Hi, Professor.”',
        'This one’s subject line: “Could you help me check my wording?”',
        'The body: in her new group she helped review a collaborator’s paper and found three gaps in the proofs. She wants to write up review comments but isn’t sure whether her wording is too blunt. Attached is her detailed review report, with a full counterexample and a suggested fix for each gap. On the last line she added: “If anything about the tone is inappropriate, please adjust it for me.”',
      ],
      prompt: 'How do you reply to Ada?',
      options: {
        yzq_alumni_visit_affirm: {
          text: 'Reply: It’s fine, go ahead and send it',
          outcomes: [
            'Ada replies: “Okay, thank you for confirming. I softened the description of the second gap slightly by adding ‘suggest verifying,’ and kept the rest as is.” Three days later she messages you: the comments have been sent, and the authors replied, “Thank you very much, these issues are real.” You save that email in a folder of its own.\n\nShe is still herself. She has just flown from your group to somewhere farther away, still conscientious, still precise, still asking “Professor, is this too blunt?” before sending out any piece of criticism.',
          ],
        },
        yzq_alumni_visit_soften: {
          text: 'Suggest softening it. Academic relationships matter.',
          outcomes: [
            '“I understand your reasoning,” she replies. “I’ll add ‘we suggest further verification’ before each gap. But I will still list every gap in full. Readers have a right to know the limits of the proof.”\n\nLooking at her email, you think about how she did come to ask you, after all, and about that line at the end of her attachment: “If anything about the tone is inappropriate, please adjust it for me.” For Ada, that is already as gentle as it gets.',
          ],
        },
      },
    },

    yzq_reviewer_rant: {
      title: 'Reviewer Requests, Tabulated',
      description: [
        'The paper was rejected, and the reviews came in today. Ada sits and reads through the reviewers’ requests one by one, closes the email, and says in a very calm voice, “These three requests are pairwise contradictory.”',
        'She opens a document and shows you a table: Reviewer 1’s requests in the left column, Reviewer 2’s in the right, and in the middle, the points of conflict she has marked with the symbol “⊥”. The last row reads: if all requests are satisfied simultaneously, the proposition does not hold.',
        '“I’m not saying we won’t revise,” she adds, unusually earnest. “I’m saying the problem itself is provable.”',
      ],
      prompt: 'Ada wants to prove mathematically that the reviewers’ requests contradict each other. You:',
      options: {
        yzq_reviewer_rant_revise: {
          text: 'Revise first. The proof can wait.',
          outcomes: [
            'You tell her revising the paper comes first and the proof can wait. Ada nods, closes the table and starts revising. She revises with extreme care, attaching a formal justification to every change. In the next round, the reviewers write: “Logically rigorous, revisions well executed.”\n\nThe contradiction is still there. It’s just buried deep enough now.',
          ],
        },
        yzq_reviewer_rant_prove: {
          text: 'You say it’s provable? Then prove it.',
          outcomes: [
            'You say, “Fine. Formalize the contradiction and write it up as a small result.” Ada nods, her expression unchanged.\n\nYou assume she’ll go back and revise first, but when you pass her desk she is already deriving. Behind that table are several more sheets, each one densely filled, with a date at the top: three days ago. “You were already working on it?” “I was waiting for you to say I could.”\n\nYou both know the result can’t be sent to the reviewers. But it holds up, and now it’s officially sanctioned.',
          ],
        },
      },
    },

    yzq_abstract_war: {
      title: 'The Abstract Is on Draft Thirteen',
      description: [
        'The abstract limit is 250 words. Ada’s first draft was 400 words. She cut it to 300, then to 270, then discovered that deleting a certain clause changed the meaning, put it back, and landed at 280. This has been going on for five days.',
        'Today she brings you draft thirteen and says, “Professor, I think this has a theoretical lower bound.”',
        '“Abstracts have a lower bound on word count?”',
        '“Information has an upper bound on density.” She lays the two versions side by side. “Look here. Same information. I can’t find a more compact way to say these seven words. Cut any more and it becomes lossy.”',
      ],
      prompt: 'Ada is studying the compression limit of an abstract. You:',
      options: {
        yzq_abstract_war_accept: {
          text: 'Draft thirteen is good enough. Go with it.',
          outcomes: [
            'You say, “That’s enough. Draft thirteen, submit it today.” Ada closes the document and submits, her expression somewhere between relief and regret.\n\nThree days later, once the submission confirmation arrives, she sends you a message: “Professor, I think the last sentence of draft twelve was actually more accurate.” You don’t reply. Some truths don’t need confirmation.',
          ],
        },
        yzq_abstract_war_formalize: {
          text: 'Write up this “lower bound” properly',
          outcomes: [
            '“Are you serious about this upper bound on information density?” you ask. Ada nods. She says she compared the abstracts of more than forty top-venue papers and found a pattern of minimal incompressible units. You say, “Write that up. It might be an interesting piece of research on its own.”\n\nShe thinks for two seconds, picks up a pencil and starts deriving formulas on scratch paper. Draft fourteen of the abstract is shelved indefinitely.',
          ],
        },
      },
    },

    // ── Half-favor event (src/data/events/half_favor.ts) ───────────────────

    half_favor_ye_zhiqiu: {
      title: '{studentName} Is Correcting the Menu',
      description: [
        'It’s the afternoon coffee break. You’re sitting at the little table by the hallway, and {studentName} is ordering from a takeout menu.',
        'She studies it for about three minutes, then puts it down with a slightly troubled look. “This menu,” she says, “has a problem with how it uses the word ‘signature.’ It marks four dishes as signature dishes, but a restaurant can’t have four signature dishes at once. That’s a logical contradiction.”',
        'You tell her it’s just marketing. She nods. “I know.” A pause. “But if you have four signature dishes, you have no signature dish.”',
        'You order anyway. Ada flips the menu over and continues: “Also, the layout of this menu violates Fitts’s law. The most frequently ordered items should be in the visual center.” She says it in exactly the tone she uses to present experimental results.',
      ],
      prompt: '{studentName}’s precision is giving you a headache, but you:',
      options: {
        half_favor_yzq_ask: {
          text: 'So how would you lay it out?',
          outcomes: [
            'Ada takes the menu back at once and starts redesigning the layout. She talks for a long time, logically tight, no filler, and finally arrives at the “UX-optimal solution.” You realize she has probably spent twenty times more energy on this than on the actual ordering. But when she finishes, she looks satisfied. It’s mealtime by now. She glances at her phone. “We should place the order first.”',
          ],
        },
        half_favor_yzq_tease: {
          text: 'At this rate, restaurants will hire you as a consultant',
          outcomes: [
            'Ada considers this seriously. “In theory, I could offer menu design consulting, but they probably wouldn’t pay for it.” You say they really probably wouldn’t. She nods. “Then never mind.” She goes back to the menu. After a while she speaks up again: “The protein-to-carb ratio here isn’t very reasonable either.” You stop trying to respond.',
          ],
        },
      },
    },

    // ── Max-favor event (src/data/events/max_favor.ts) ─────────────────────

    max_favor_ye_zhiqiu: {
      title: '{studentName}: The One That Suits You',
      description: [
        '{studentName} sends you a message: “Professor, are you free this evening? I’d like to take you to buy a notebook.” You stare at it for a while before remembering that last week you mentioned, in passing, that you “wanted a new one.” She actually remembered.',
        'The stationery shop is quiet in the early evening, with a layer of orange light across the window. Ada stands in front of the notebook shelf, as serious as if she were reviewing a paper. You say any one will do. She immediately looks up to object. “‘Any one’ is the choice with the highest error rate.”',
        'She picks up a notebook with a plain cover and hands it to you. “This one.” You ask why. “Thick paper, good for repeated revisions. Large grid, good for writing down ideas before they’re mature. Plain cover, good for pretending to be organized in meetings.” You ask, “Are you making fun of me?” She thinks about it. “It’s a recommendation.”',
        'You point at a prettier one next to it. “What about that one?” Ada shakes her head. “Not right for you. It’s too pretty. You won’t want to scribble in it.” She pauses, then adds, “And you need a notebook you can scribble in, cross out, start over in, and keep scribbling in.” Her tone is extremely rigorous, as if she were matching you with some kind of research assistive device.',
        'Then she picks out a few pens, and her test writing is perfectly legible. You notice she’s actually in a good mood today: when she sees paper she likes she makes a very short “mm,” and when she catches you noticing, she instantly goes back to neutral. Before checkout, she also drops a pack of sticky notes into the basket. You ask whether that’s necessary too. She nods. “Necessary. In the future, when I point out your logical leaps, I can make them more visible.”',
      ],
      prompt: 'At checkout, {studentName} puts your notebook on the counter.',
      options: {
        max_favor_yzq_pay_for_both: {
          text: 'Beat her to the card reader and pay for both',
          outcomes: [
            'Ada tries to stop you and fails. The whole way back she argues for the fairness of splitting the bill, and you overrule her every time. At the campus gate, she suddenly presses a small booklet into your hand. “Fair’s fair.” You open it to the first page. It reads: Common Logical Gaps of My Advisor, continuously updated. There is already a first entry.',
          ],
        },
        max_favor_yzq_notice: {
          text: 'Ask her: what about yours?',
          outcomes: [
            'Ada visibly freezes for a moment. “Already paid for.” “When?” “Just now.” She says it with total conviction: “I don’t want to owe my advisor a favor.” You’re about to say something when you look down and find that she has quietly slipped the pack of sticky notes into your bag.',
          ],
        },
      },
    },

    // ── New Year gift result (src/data/events/new_year.ts) ─────────────────

    new_year_gift_result_ye_zhiqiu: {
      title: 'Ada’s Reaction',
      description: ['Ada’s eyes land on the gift box.'],
      prompt: 'Ada’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Ada’s first reaction: “Professor, this is a nonessential expense.” Her second reaction is to ask how much it cost. Only her third reaction is to say thank you.\n\nShe holds the box and studies it for more than ten minutes, from the structure of the packaging to the choice of materials.\n\nThat evening you receive a PDF titled “A Feasibility Analysis of Advisor Gift-Giving Behavior.” The first five pages are all argument. The last page is a one-sentence conclusion: I like it very much. Thank you, Professor.',
            'Ada thanks you formally and places the gift box in a fixed spot on the right side of her desk. Everything on her desk has a fixed spot. Then she goes back to work, without losing any efficiency at all.',
          ],
        },
      },
    },

  },
};
