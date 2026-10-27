import type { EventTranslations } from '../../../types/i18n';

export const dailyReviewerEventsEn: EventTranslations = {

  reviewer_agi_prerequisite: {
    title: 'Please Solve AGI Before Resubmitting',
    description: [
      'The ICOP reviews are in. Reviewer 1 recommends a conditional accept. Reviewer 3’s tone is friendly.',
      'Reviewer 2 writes: “The proposed approach is technically adequate. However, the core limitation of this work is that it cannot handle cases that require general intelligence. The authors are encouraged to first solve the problem of artificial general intelligence before submitting a revised version. Until a satisfactory AGI solution is provided, this reviewer recommends rejection.”',
      'You reread it three times, to rule out a machine-translation error and to make sure the reviewer isn’t joking.',
    ],
    prompt: 'Reviewer 2 wants you to solve AGI first, then revise. What do you do?',
    options: {
      rebuttal_deadpan: {
        text: 'Rebut it point by point. Bring it on.',
        outcomes: [
          'You write a point-by-point rebuttal. On the AGI comment, you spend four calm paragraphs explaining why this paper does not need to solve AGI first.\n\nThe program chair, presumably stunned by its sheer poise, accepts the paper on the spot. The first message in the group chat is a champagne emoji. The second is a screenshot. The third is “I’m getting this rebuttal framed.”',
          'You write a careful, well-supported rebuttal, complete with a literature survey on definitions of “artificial general intelligence,” and gently point out that this standard would apply equally to every AI paper. Reviewer 2 does not respond.\n\nCiting “substantial disagreement among reviewers,” the chairs send the paper to a fourth reviewer. Reviewer 4 leaves two comments. The first is “Why not consider diffusion models?” The second is “Formatting issues.”',
        ],
      },
      laugh_resubmit: {
        text: 'Leave it on read. Switch venues.',
        outcomes: [
          'You screenshot the comment and save it to a dedicated folder named “Reviewer 2: Greatest Hits,” then close the submission system and pull up a new target. You resubmit to IISC. Two months later the paper is accepted, and Reviewer 1 writes: “The paper is well motivated and the experiments are thorough.”\n\nYou nod at the screen. The world is mostly fair. Some conferences just run on a different physical layer.',
          'You resubmit to GRF. GRF’s Reviewer 3 writes: “The method is effective, but the paper lacks a discussion of generalization to broader settings. In extreme cases, would stronger reasoning capabilities be required?”\n\nYou stare at that comment for a long time. It feels like ICOP’s Reviewer 2 has made a new account and followed you to another conference.',
        ],
      },
      actually_address: {
        text: 'Fine. Solve AGI.',
        outcomes: [
          'You go through a mountain of literature, carefully map out the definitions of AGI and the main approaches to it, and write an appendix proposing a “lightweight generality framework.” It is internally consistent and rigorously worded. You stuff it into the rebuttal.\n\nReviewer 2 replies: “This material falls outside the scope of the current review.”\n\nThe paper is rejected. The appendix is later submitted as a paper of its own, and it gets in.',
        ],
      },
    },
  },

  reviewer_citation_demand: {
    title: 'The Reviewer Threw In a Shopping List',
    description: [
      'Reviewer 2 writes: “The literature review is insufficient and seriously overlooks important prior work in this area.” A list of references follows.',
      'You look them up one by one and find that the vast majority are by the same author. Let’s call him Professor X. Out of idle curiosity, you check which institution is organizing this year’s conference. The result is intriguing.',
      'Maybe it’s just a coincidence.',
    ],
    prompt: 'Reviewer 2’s reading list is highly suspicious. What do you do?',
    options: {
      cite_all: {
        text: 'Cite them all, no questions asked',
        outcomes: [
          'You cite the entire list, work the references into the relevant paragraphs, keep the formatting tidy, and make the transitions passable. The paper is accepted.\n\nYou and the lab arrive at an unspoken understanding called “academic survivalism”: read the useful citations, include the useless ones, and never ask who’s asking.',
          'You cite the whole list, and the paper is accepted. Not long after, a researcher posts an analysis on an academic forum tracing the citation sources of a batch of recent papers, complete with a network graph. Your paper is in it.\n\nYou stare at that node for a long time, then decide you know nothing about any of this.',
        ],
      },
      cite_selectively: {
        text: 'Cite only what’s relevant. Stand your ground.',
        outcomes: [
          'You go through the list carefully, pick out the few papers that are actually relevant, work them into the related work, and add a couple of sentences explaining the connection. In the revision round, Reviewer 2 writes: “The authors’ coverage of the literature remains insufficient, but the overall work is acceptable.”\n\nThe paper squeaks through, as if someone picked it up with tongs and dropped it onto the accepted list.',
          'You cite only the relevant ones and explain your selection criteria in the rebuttal. Reviewer 2 replies, “This is clearly inconsistent with my recommendation,” and keeps the negative score. The paper ends as a weak reject.\n\nSomeone in the lab asks quietly, “Professor, are they the same person?” You don’t answer, because you don’t know how.',
        ],
      },
      counter_rebuttal: {
        text: 'Call out the pattern in the rebuttal',
        outcomes: [
          'In the rebuttal, you write, politely but unmistakably: “We note that a substantial proportion of the recommended references are by a single author. After assessing their relevance, we have selectively cited those that are directly related to this work and noted this in the main text.”\n\nThree days later, the program chair sends a notice: the paper will be re-reviewed by a new reviewer. It is eventually accepted. When a colleague asks how you pulled that off, you say innocently, “I just wrote a normal rebuttal.”',
          'In the rebuttal, you tactfully point out the pattern in the references, with extreme restraint and without naming names. Reviewer 2 promptly adds two new comments. Neither is about citations. Both are negative. The program chair writes: “Taking all reviews into consideration, the paper cannot be accepted at this time.”\n\nYou archive the rebuttal, thinking it might come in handy someday. In all likelihood, it won’t.',
        ],
      },
    },
  },

  reviewer_ghost: {
    title: 'The Paper Vanished',
    description: [
      'The submission system says: Under Review. Your OWRC submission has been in this state for months, with no reviews in sight.',
      'You’ve sent several inquiry emails, their tone escalating from polite to more polite. No one has replied. When you look into it, you find that the OWRC main conference wrapped up two months ago and the proceedings are already online. Your paper is on neither the accepted list nor the rejected list.',
      'It just hangs there in the system, neither accepted nor rejected, like a letter no one intends to answer, trapped in the strangest intermediate state submission systems have ever invented: the quantum submission.',
    ],
    prompt: 'Your paper seems to have evaporated. What do you do?',
    options: {
      final_inquiry: {
        text: 'Send an ultimatum',
        outcomes: [
          'You write an email with a clear subject line and precise wording, and cc the conference chair. Three days later, you receive an auto-reply from the submission system: “Your inquiry has been received and will be processed as soon as possible.” Then you’re left on read for another three weeks.\n\nEventually a human writes back: “Upon investigation, your submission was lost during a system update. We recommend resubmitting.” You read that line over and over, and feel that human civilization has gone wrong somewhere along the way.',
          'You send the email. This time the program chair replies: “We sincerely apologize. A reviewer withdrew unexpectedly, which delayed your paper. We are restarting the process now and expect a decision within two weeks.”\n\nSix weeks later, the reviews arrive: conditional accept. When you tell a colleague the whole story, they ask, “So which year does that count as published?” You think about it for a long time. You have no answer.',
        ],
      },
      withdraw_resubmit: {
        text: 'Withdraw and resubmit right away',
        outcomes: [
          'You click Withdraw. While waiting for confirmation, you move the paper into the new conference’s template, fix the layout, clean up the references, and get everything ready. Two months after resubmitting, you get an acceptance.\n\nLater, the original conference’s system sends you an email: “Your paper has been withdrawn. Thank you for your participation.” You do not reply.',
          'You withdraw and resubmit to another conference. Reviewer 1 at the new venue writes: “I believe I have seen similar work somewhere. The authors should clarify how this paper differs from existing work.”\n\nYou badly want to tell them that the “similar work” is your own paper, which spent months in quantum superposition in another system. You don’t. You write a rebuttal and patiently explain the difference.',
        ],
      },
      quantum_acceptance: {
        text: 'Let it be. Superposition is a kind of existence too.',
        outcomes: [
          'You decide to stop asking. The paper remains suspended in the system, neither accepted nor rejected, in a philosophical state only a submission system could achieve.\n\nIn one corner of your CV, you add “(under review)” in parentheses, then open the draft of your next paper. Sometimes the best response is to keep moving.',
        ],
      },
    },
  },

  reviewer_scope_again: {
    title: 'Out of Scope, for the Fourth Time',
    description: [
      'The rejection notice is in. The reviewer writes: “The work is technically solid; however, it is not well aligned with the research focus of this conference and falls outside its scope.”',
      'This is the fourth conference to say so. The first was IISC, the second HMCS, the third OWRC. The fourth one’s theme is “AI and the Real World,” and its call for papers states, in so many words, that the scope is broad.',
      'You put the four rejection letters side by side on your screen and check them word by word. Every one contains the phrase. Somewhere in this world, this paper’s “scope” must be the right one. You just haven’t found the place yet.',
    ],
    prompt: 'Out of scope for the fourth time. What do you do?',
    options: {
      find_right_venue: {
        text: 'Do your homework and find a venue that fits',
        outcomes: [
          'You spend half a day sorting the past few years’ accepted papers one by one, and find an obscure workshop whose style matches. You reformat the paper and submit it.\n\nTwo months later it’s accepted. The reviewer writes: “This paper is an excellent fit for the theme of this workshop.” You screenshot that line and put it in the folder you keep for plot twists.',
          'You do your research, find a few likely targets, and submit to the best match. The reviewer writes: “The technical contribution is adequate, but this conference focuses more on empirical work. The authors may wish to consider a more theory-oriented venue.”\n\nYou dig up the first rejection letter. That conference said: “The authors may wish to consider more application-oriented settings.” You close every tab and drink a glass of water.',
        ],
      },
      pivot_framing: {
        text: 'Same method, new story',
        outcomes: [
          'You rewrite the introduction and abstract, recast “methodological contribution” as “real-world system impact,” and adjust the keywords. Not a single word of the technical content changes.\n\nYou submit to another conference, and this time it gets in. The reviewer writes: “This work fits the core themes of this conference very well.”',
          'You rewrite the introduction and carefully reposition the paper. After you submit, the reviewer writes: “The framing of this paper is not entirely honest, and the positioning of its core contribution is unclear.”\n\nYou realize you’ve reframed it so obviously that anyone can tell it’s been reframed. Next time, you’ll make it look more natural.',
        ],
      },
      scope_is_construct: {
        text: 'Accept that “scope” is a social construct. Stop fighting it.',
        outcomes: [
          'You put the paper on arXiv with a short note and the full experimental data. Before long, someone shares the link with the comment: “This unpublished work is more solid than several papers that actually got in.”\n\nYou don’t reshare it, but you bookmark the comment.',
        ],
      },
    },
  },

  reviewer_insider: {
    title: 'Reviewer 2 Knows Too Much',
    description: [
      'The reviews are in. Reviewer 2’s third point reads: “The authors’ sampling strategy for long-tailed data distributions is biased, which is also reflected in the internal comparison experiments. However, this issue has not yet been discussed in the public version of the method.”',
      'You read it again. Those internal comparison experiments were never made public. Only people in your lab should know the details of the sampling strategy.',
      'Reviewer 2 knows something they shouldn’t.',
    ],
    prompt: 'Reviewer 2 knows more than they should. What do you do?',
    options: {
      report_to_ac: {
        text: 'Report it to the program chair',
        outcomes: [
          'You send a formal email to the program chair laying out the specific details, explaining that the reviewer may have had access to non-public information, and requesting a conflict-of-interest investigation. The chair replies that it will be looked into. The paper goes to a new reviewer and eventually receives a conditional accept.\n\nNo one ever tells you what the investigation found, or explains how those details ended up in the review.',
          'You report it to the program chair, who replies that your feedback “will be taken seriously.” Then nothing for two weeks. Then the decision email arrives: the original reviews stand, and the paper is rejected.\n\nYou still can’t tell whether anyone ever read your report.',
        ],
      },
      use_strategically: {
        text: 'You know what this is. Meet it head-on.',
        outcomes: [
          'In the rebuttal, you answer that specific issue with extensive additional experiments, so precisely targeted it’s as if you knew all along it would be the central point of contention. Because you did. In the revision round, Reviewer 2 writes, “The authors have adequately addressed my concerns,” and gives a weak accept.\n\nYou never mention it to anyone. It becomes an episode that exists only in your memory.',
          'You write an unusually precise rebuttal that directly addresses the issue in those internal experiments. Reviewer 2 replies: “The authors’ response raises suspicion. Its precision exceeds what would normally be expected.”\n\nThe paper is rejected due to “certain procedural concerns.” No one explains what that means.',
        ],
      },
      pretend_not_to_notice: {
        text: 'Pretend you didn’t notice. Submit a normal rebuttal.',
        outcomes: [
          'You write an ordinary rebuttal, leave those details out, and respond to each comment as usual. The paper is accepted, and Reviewer 2’s comment is marked “Resolved.”\n\nYou save the original screenshot in a folder named “Just in Case.” It is the first file in there. You don’t know whether anything else will join it.',
        ],
      },
    },
  },

  reviewer_format_rejection: {
    title: 'The Abstract Was 1pt Too Big',
    description: [
      'HMCS has desk-rejected your paper. It never even reached peer review; it was turned back at the format check. The reason: “Per the conference submission guidelines, the abstract must be set in 10pt font. The submitted version uses 11pt font. As the submission does not comply with the formatting requirements, it will not be sent for review.”',
      'The abstract is four lines long. The font is one point too big.',
      'While you’re at it, you flip through HMCS’s formatting guidelines. The rules are many and various: the abstract must be 10pt, the ethics statement must be at least 200 words, and the ethics statement template must not be modified. Eventually you close the document, filled with a solemn sort of awe.',
    ],
    prompt: 'Desk-rejected because your abstract was one point too big. What do you do?',
    options: {
      fix_and_resubmit: {
        text: 'Fix the font, resubmit in three seconds',
        outcomes: [
          'You change the abstract to 10pt, export the PDF, double-check the formatting, and resubmit. This time it enters normal review, and two months later it gets a conditional accept. Not a single comment mentions formatting.\n\nEvery so often you think back on that edit. It was the most cost-effective three minutes of your entire research career.',
          'You fix the font size and resubmit. The confirmation page warns: “Please note that repeated submissions may be treated as a second submission of the same paper. Please ensure compliance with conference policies.”\n\nYou search the entire website and find no policy on “resubmitting the same paper.” You work up your courage and submit anyway. Fortunately, the paper goes into the normal review process.',
        ],
      },
      write_response: {
        text: 'Write an appeal against the box-ticking',
        outcomes: [
          'You write a two-page appeal. It opens with the purpose of academic review, cites several studies of the peer review system itself, and gently points out that a one-point difference in font size likely has close to zero effect on review quality.\n\nThe program committee chair replies: “Thank you for your feedback. We will include it in our discussion of the rules for next year’s conference. No exceptions will be made this year.”',
        ],
      },
      take_the_day_off: {
        text: 'Not today. Deal with it tomorrow.',
        outcomes: [
          'You close the submission system, put on a documentary, watch for a good while, then go for a walk. The next day you fix the formatting and resubmit without a trace of stress.\n\nThe paper is eventually accepted. One of the compliments in the reviews: the abstract is concise.',
        ],
      },
    },
  },

  reviewer_retroactive_scoop: {
    title: 'The Paper Uploaded Yesterday at 3 p.m.',
    description: [
      'In the reviews, Reviewer 2 writes: “The core contribution of this paper has already been covered by a recent work. I recommend rejection and refer the authors to the following.” A citation follows.',
      'You look up the citation. It was uploaded to arXiv yesterday at 3:00 p.m. sharp. Your paper, meanwhile, was submitted to GRF six months ago, and GRF’s review cycle is notoriously long.',
      'You stare at the timestamp for a good while and begin to wonder whether humanity’s understanding of “priority” contains some fundamental philosophical error.',
    ],
    prompt: 'Your paper has been ruled “superseded” by one uploaded yesterday. What do you do?',
    options: {
      argue_chronology: {
        text: 'Show the timeline. That’s not how time works.',
        outcomes: [
          'In the rebuttal, you attach a screenshot of the submission timestamp, set the two papers’ dates side by side, and make your point in a single sentence: “Our submission predates the upload of the cited work by a full six months; chronologically, our work should therefore be regarded as independent of and prior to it.”\n\nThe program chair seems to find the logic impossible to argue with. A different reviewer is assigned, and the paper is accepted.',
          'You submit a clear timeline as proof. Reviewer 2 replies: “Nevertheless, given that this work is now public, the paper needs to articulate its distinct contributions more clearly.” You update the relevant section and spell out the differences. It takes two weeks.\n\nThe paper is eventually accepted, and the new section does make it more complete. The only cost is the silent protest playing in your head.',
        ],
      },
      add_citation_carry_on: {
        text: 'Cite it, and politely draw a clear line',
        outcomes: [
          'You add the citation and write half a page on the specific differences between the two papers. The differences turn out to be bigger than you thought, which makes you feel a little better. The paper is accepted.\n\nIn the acknowledgments of the camera-ready, you keep a record of when the paper was originally written, a small declaration that no one will ever notice.',
          'You add the citation, write up the differences, and resubmit. Reviewer 1 says: “The distinction between this paper’s contributions and those of the cited work remains unclear.” You reread the two papers side by side. The differences are actually quite obvious; you just wrote them up so academically that no one could see them.\n\nYou rewrite the introduction, reword things, and the paper finally makes it through review.',
        ],
      },
      review_their_paper: {
        text: 'First, find out where they submitted it',
        outcomes: [
          'You find that the paper has been submitted to another conference where you are also on the reviewer list. You don’t bid on it, but when the system assigns it to you, you accept the assignment and write a careful, objective and rather strict review. Every point is backed by the literature. The logic is airtight.\n\nUnsurprisingly, your own paper is accepted around the same time. You feel that some kind of cosmic balance has been restored.',
        ],
      },
    },
  },

  desk_reject_48h: {
    title: 'Wednesday Morning, One Email',
    description: [
      'On Monday, you submitted a paper to ICOP. On Wednesday morning, an email arrives with the subject line “Regarding Your ICOP Submission.” You open it.',
      'The first paragraph is a rejection: “Following an initial editorial screening, we regret to inform you that your submission is not sufficiently aligned with the scope of this conference and will not proceed to peer review.”',
      'The second paragraph is an invitation: “We cordially invite you to serve on the Program Committee for this conference and assist in reviewing submissions. Your extensive research expertise would be of great value to this year’s review process.” Two paragraphs. One email.',
    ],
    prompt: 'You finish reading the email. What do you do?',
    options: {
      email_clarification: {
        text: 'Email them and demand an explanation',
        outcomes: [
          'You email them, politely asking in what respect the paper fails to fit, so you can improve it. You get a template reply: “Due to the high volume of submissions, the editorial team is unable to provide detailed explanations for individual screening decisions.”\n\nYou file the email in your folder called “How Academia Works.” It gains another subfolder this month.',
          'You send the email. The editor replies: “Your paper is somewhat removed from our current areas of focus, specifically in the following respects…” followed by two pieces of genuine feedback. Reading them, you find that one is a misunderstanding and the other is a fair point.\n\nYou revise the paper, check it against that feedback before your next submission, and it is accepted. That email turns out, unexpectedly, to be the most useful thing in the entire process.',
        ],
      },
      pivot_next_venue: {
        text: 'Don’t let it get to you. Next venue.',
        outcomes: [
          'You open the list of backup venues you always keep up to date, each annotated with its deadline, acceptance rate, and the kinds of papers it suits. You lock in the next target, reformat, and resubmit within three days.\n\nTwo months later, the acceptance comes in. Sometimes efficiency is a defense mechanism.',
          'You immediately open your backup list and pick the second choice. That night, formatting done and ready to submit, you discover its deadline was yesterday.\n\nThere is nothing to do but close the tab, open choice number three, check the date several times over, and submit the next day.',
        ],
      },
      post_arxiv: {
        text: 'Put it on arXiv and forget about it',
        outcomes: [
          'You upload the paper to arXiv, and five minutes later your arXiv ID comes through. Then you scroll down the email to the Program Committee invitation, think it over, and reply “Accept.” You’re here anyway, so you might as well review.\n\nThree months later, you’ve reviewed seven ICOP submissions. One of them is on almost exactly the same topic as the paper of yours they turned away at the door. You give it a conditional accept.',
        ],
      },
    },
  },

};
