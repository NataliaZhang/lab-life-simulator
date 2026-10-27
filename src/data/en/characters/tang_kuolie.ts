import type { CharacterPack } from '../../../types/i18n';

// English character pack for 唐扩列 (Nico Tang).
// Catchphrase 来都来了 is rendered consistently as “while we’re here”, so its
// slightly illogical reuse (alumni meetup, post-graduation email) still lands.
export const tangKuolieEn: CharacterPack = {
  profile: {
    name: 'Nico Tang',
    firstName: 'Nico',
    pronoun: 'he',
    tagline: 'While we’re here, let’s swap contacts.',
    bio: 'The best thing he brings home from an academic conference is never a paper. It’s his contact list. Professors, admin staff, industry reps, some alum who happened to walk by: give him five minutes and they’re old friends.',
    farewell: 'I’ve added a lot of people over the years. The one most worth adding was you, back when you first took me into the lab.',
  },
  events: {
    // ── 1. First meeting ──────────────────────────────────────────────────
    tkl_first_meeting: {
      title: 'While we’re here, let’s swap contacts',
      description: [
        'It’s Nico Tang’s first day in the lab. You head out to the hallway to meet him and find him already leaning against the doorframe, deep in lively conversation with two students from the lab next door, the three of them taking turns scanning each other’s phones, like a spontaneous meetup had broken out right there in the doorway.',
        'Back in your office, you’re about to bring up research directions when he pulls out his phone. “Prof, do you know Professor Kapoor? I just added him in the hallway. He says our directions overlap. Want me to start a group chat with the three of us?”',
        'He says this with one hundred percent sincere enthusiasm. It has not occurred to him at all that you haven’t said a single word about research yet.',
      ],
      prompt: 'You choose:',
      options: {
        tkl_first_meeting_focus: {
          text: 'Research first, networking later',
          outcomes: [
            'He earnestly puts his phone away and takes out a notebook, ready to write down the key points. Two sentences in, he looks up. “Prof, does the lab have any industry partnership channels? I know a research scientist at a big tech company, met him at an event a while back. Really similar direction, seems solid.” You decide to take this one step at a time.',
          ],
        },
        tkl_first_meeting_group: {
          text: 'Sure, but don’t get distracted',
          outcomes: [
            'He starts the group chat on the spot, and Professor Kapoor quickly replies, “Pleasure to meet you.” Satisfied, he puts his phone away and looks up. “Go ahead, Prof. I’m all ears.” You realize that to him, none of that counted as a distraction. It was barely an effort, just something he did in passing.',
          ],
        },
      },
    },

    // ── 2. Conference contact harvest ─────────────────────────────────────
    tkl_conference_harvest: {
      title: 'Seventeen new contacts',
      description: [
        'You send Nico to a small academic symposium so he can get exposure to new work in the field and broaden his horizons.',
        'He comes back, sits down in your office, and reports: “The papers… nothing that really stuck with me. But I added seventeen people.”',
        'He flips his phone around to show you: three big-tech researchers, two professors, a handful of PhD students, and one mystery figure saved as “Exact field unclear, but feels useful someday.” He adds one last thing: “There’s actually plenty of time during the coffee breaks. You just have to make the first move.”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_conference_harvest_use: {
          text: 'Connections are an asset. Organize them',
          outcomes: [
            'The next day he sends you a document sorting everyone into three categories by field, institution and collaboration potential, each person followed by a summary of what they talked about. You stare at it for a moment, then ask when he did this. “Last night,” he says. “Just on the side.”',
          ],
        },
        tkl_conference_harvest_remind: {
          text: 'Bring back some papers next time, too',
          outcomes: [
            'He nods. “You’re right, Prof. I’ll take more notes next time.” Then he adds, “But that big-tech researcher said they have a direction lately that’s really close to ours, and we could talk about it one-on-one. I told him ‘whenever works for you.’ Think I should set something up?” You sigh and tell him to set it up.',
          ],
        },
      },
    },

    // ── 3. Surprise connection ────────────────────────────────────────────
    tkl_surprise_connection: {
      title: 'I think I know someone who can help with that',
      description: [
        'The lab is stuck on a thorny administrative approval. Through normal channels it takes two or three weeks, and it has been sitting at one step without budging. You grumble about it offhand in the hallway, and Nico, who happens to be walking by, stops to ask what’s going on.',
        '“Prof, I think I know someone who can help with that,” he says, as calmly as if he were reading the weather forecast. “Added him at a meeting a while back. I think he does coordination in that office. Want me to message him?”',
        'He sends the message. Two hours later the approval goes through, with an explanatory memo attached. He forwards you the screenshot without a single extra word.',
      ],
      prompt: 'You choose:',
      options: {
        tkl_surprise_connection_thanks: {
          text: 'This kid is something else',
          outcomes: [
            'He waves it off. “While we’re here. It was nothing.” You realize this is his catchphrase, and also the logic underneath everything he does: knowing people isn’t the point, being able to help is what counts. His contact list isn’t a roster. It’s a network he can activate at any moment.',
          ],
        },
        tkl_surprise_connection_curious: {
          text: 'Wait, who does he know…?',
          outcomes: [
            'He thinks about it. “No idea. Never counted.” Then, quite seriously: “But I remember what I talked about with each of them. That’s the important part.” Suddenly you understand the difference between him and the usual social butterfly. What he collects isn’t contact info. It’s conversations.',
          ],
        },
      },
    },

    // ── 4. Coffee break main quest ────────────────────────────────────────
    tkl_tea_break_main_quest: {
      title: 'The coffee break is the main quest',
      description: [
        'Nico goes to a big conference in the field. You aren’t expecting much. You just want him to get a look at the wider world.',
        'At 3 p.m., he messages you: “Prof, I met someone from industry at the coffee break. They’re looking for a lab to partner with, and their direction is a really close match with ours. We talked for a while and he wants to come visit you today. Does this afternoon work?”',
        'At 4 p.m. sharp, the man appears at your door and introduces himself as head of partnerships at a big tech company’s research institute. You talk for half an hour, and the directions line up. On his way out, he says, “That student of yours, Nico, is something else. He explained your whole lab clearly in five minutes. That’s why we came.”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_tea_break_follow_up: {
          text: 'Have him keep the relationship going',
          outcomes: [
            'You send an email confirming your interest. Nico volunteers to handle the follow-up, and within a week every line of communication is sorted out. Only when the draft contract framework arrives do you realize he did about eighty percent of the whole thing. He texts you: “Don’t worry, Prof. The second I added him, I knew this one would work out.”',
          ],
        },
        tkl_tea_break_decline: {
          text: 'Thank him, but shelve industry deals for now',
          outcomes: [
            '“Okay, Prof,” he says. No follow-up questions, no disappointment. Two days later he mentions he kept the contact anyway, “in case it comes in handy someday.” Watching how unbothered he is, you get the feeling his contact list is some kind of living resource that grows on its own.',
          ],
        },
      },
    },

    // ── 5. Letting the research slide ─────────────────────────────────────
    tkl_academic_neglect: {
      title: 'Consider it my apology',
      description: [
        'For the past two months Nico has been going to one event after another: conferences, dinners, alumni get-togethers. He hasn’t hit a single milestone you set for him, and he keeps saying, “Almost there, almost there.”',
        'Today he comes and knocks on your door on his own, and stands there. “Prof, I know I’m behind. That’s on me. I’ve been spread too thin lately.”',
        'He slides a document across the desk: a list of collaboration opportunities sorted by priority, each contact annotated with background and possible follow-up directions, plus two already-written drafts of collaboration emails. “Consider this my apology,” he says. “See if any of it is useful.”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_academic_neglect_talk: {
          text: 'Have a real talk: research comes first',
          outcomes: [
            'He listens all the way through and nods. “You’re right, Prof. Next month I’ll block out a research week and cancel everything.” And he does. That month his progress catches up a lot, and the only thing he attends is a tea social he says he “really couldn’t get out of,” from which he brings back a potential collaboration lead on the side.',
          ],
        },
        tkl_academic_neglect_accept: {
          text: 'Look at the list first',
          outcomes: [
            'You flip through the list and find it remarkably systematic. A few of the contacts are people you’ve wanted to reach yourself but never found a way in. You look up. “This is useful, but your progress has to catch up too.” “Got it,” he says. “I’ll focus on it this week.” Then he adds, “You can send those email drafts as is, by the way. I already adjusted the tone for you.”',
          ],
        },
      },
    },

    // ── 6. He knows everyone ──────────────────────────────────────────────
    tkl_knows_everyone: {
      title: 'Oh, I know him',
      description: [
        'You’re talking with Nico about where the research should go next and mention a scholar you’ve wanted to contact for a long time but never found a way to reach. He does cutting-edge work in an interdisciplinary area, and the two of you have no mutual acquaintances.',
        'Nico thinks for a moment, scrolls through his phone, and turns the screen toward you. “Oh, I know him. Added him at a forum last year. See, this is his account. He even sent me his group’s preprint a while ago.”',
        'You look at the profile picture and confirm it’s really him. A second of silence.',
      ],
      prompt: 'You choose:',
      options: {
        tkl_knows_everyone_yes: {
          text: 'Could you introduce us?',
          outcomes: [
            'Nico sends a message on the spot, introducing both sides with just the right touch, neither overselling nor stiffly polite. The scholar replies that same afternoon and offers to set up a video call. You had figured this would take at least three intermediaries and two months of going around in circles. He did it with one message.',
          ],
        },
        tkl_knows_everyone_self: {
          text: 'Thanks, I’ll reach out myself',
          outcomes: [
            '“Sure, Prof,” he says, putting his phone away. “When you reach out, I can give him a heads-up that we know each other. He’ll reply faster.” You thank him, and a thought crosses your mind: so he already had two plans worked out.',
          ],
        },
      },
    },

    // ── 7. Alumni meetup ──────────────────────────────────────────────────
    tkl_alumni_network: {
      title: 'He threw his own meetup',
      description: [
        'For a while you have no idea what Nico is busy with outside the lab, until he messages you: “Prof, last week I put together a small AI meetup on campus. Twenty-some alumni came, some still in school, some working. It was a good time.”',
        'You ask him why he organized it. “Well, while we’re all here, you know? Everyone’s in the same circle. It’s nice to get to know each other.” You can’t shake the feeling that the phrase doesn’t quite make sense here, but he says it so naturally that you can’t argue.',
        'He goes on: “A few people asked about our lab, so I gave them the rundown. One of them said he wants to donate an old server. They just upgraded, and it still works fine.”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_alumni_network_appreciate: {
          text: 'Nice work',
          outcomes: [
            '“It’s nothing,” he says. “I just thought it’d be nice for everyone to meet. Didn’t expect it to help us out too.” The server arrives a week later, and he coordinates the entire handoff. You notice there’s nothing calculated about the way he does this. He genuinely just likes connecting people. Everything else is a side effect.',
          ],
        },
        tkl_alumni_network_remind: {
          text: 'Give me a heads-up before events like this',
          outcomes: [
            '“Okay, Prof, I’ll let you know in advance next time.” He writes it down and actually follows through, sending a short preview before every event. Later you notice that since he picked up this habit, he organizes them even more often, because you occasionally help spread the word, and the people who show up are better, too.',
          ],
        },
      },
    },

    // ── 8. Wrong priority ─────────────────────────────────────────────────
    tkl_wrong_priority: {
      title: 'That party wasn’t really that important',
      description: [
        'Last week there was an important mid-project review, and Nico did noticeably worse than usual. His reasoning didn’t flow, he mixed up several key numbers, and the Q&A didn’t go well either.',
        'Afterward, you ask him to stay behind and tell you what happened. He looks down. “I went to a party the night before. Got back pretty late, didn’t sleep well.”',
        'He pauses. “That party wasn’t even that important. I thought it’d be useful at the time, but nothing came of it. I shouldn’t have gone.”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_wrong_priority_criticize: {
          text: 'He got his priorities wrong. Make that clear',
          outcomes: [
            'He takes it without making excuses. “You’re right, Prof. Next time something like this comes up, I’ll check with you first.” For a while after that, he mentions every event to you before he goes. Sometimes you help him filter, and sometimes, by the time he’s done explaining, he realizes he’d already made up his mind.',
          ],
        },
        tkl_wrong_priority_lesson: {
          text: 'Learn from it and be careful next time',
          outcomes: [
            '“Thanks, Prof.” He looks up, his usual expression back. “I went back through the data from the presentation and sent it to you. Let me know if anything looks off.” When you open the file, you find he has already redone every comparison plot that got mixed up, with a short explanation attached. He’s never been slow to react. This time his energy just went in the wrong direction.',
          ],
        },
      },
    },

    // ── 9. Key introduction ───────────────────────────────────────────────
    tkl_key_introduction: {
      title: 'He knows someone on the panel',
      description: [
        'You’re preparing an important grant application. Time is tight, the competition is fierce, and you’re not feeling confident.',
        'One day Nico calls, as casually as if he were just catching up: “Prof, I think a friend of mine is on the review panel for this grant. We met at a forum and really hit it off. Want me to introduce you two so you can meet and talk?”',
        'He adds, “Just to get to know each other. I don’t mean pulling strings or anything. I just think it’s always good to know one more person.”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_key_introduction_yes: {
          text: 'Meet up, just to say hello',
          outcomes: [
            'Nico arranges a short in-person meeting. In his introduction he covers both people’s backgrounds and nothing more. The other researcher turns out to be a scholar of real integrity, and the whole conversation is about the research itself. A few months later the grant comes through. You don’t know whether that meeting played any part. Maybe it didn’t. But there is now one more person in the field who really understands what you’re working on, and that is enough on its own.',
          ],
        },
        tkl_key_introduction_no: {
          text: 'Not appropriate. Go through proper channels',
          outcomes: [
            '“Okay, Prof, I understand.” He doesn’t say more, adding only, “I’ll still keep in touch with that friend, though. Nothing to do with the application. We just get along.” You nod, and it occurs to you that he has a much clearer sense of where the lines are than you’d assumed.',
          ],
        },
      },
    },

    // ── 10. Post-graduation visit ─────────────────────────────────────────
    tkl_alumni_visit: {
      title: 'The CEO went to your school',
      description: [
        'After graduating, Nico went to work in ecosystem partnerships at a tech company. Word is, three months in, everyone in the building knows him. Even the security guard at the front door knows his name.',
        'Today you get an email from him with the subject line “Partnership Invitation: Joint Research Opportunity with the Lab.” The content is very formal: project framework, timeline, expected deliverables, division of responsibilities. He clearly took it seriously.',
        'The last line of the email reads: “Oh, and Professor, I looked up the company’s CEO, and I think he’s a fellow alum of yours. Want me to introduce you? While we’re here, right?”',
      ],
      prompt: 'You choose:',
      options: {
        tkl_alumni_visit_accept: {
          text: 'Yes to both',
          outcomes: [
            'You reply that you’re happy to move forward on both. That afternoon he sends the introduction. It’s beautifully written, weaving your lab’s research and the CEO’s background together so naturally that it reads as if the two of you have known each other for years. The CEO replies quickly: “I’ve heard a lot about you. Let’s meet sometime.” You put down your phone and think about this student: out in the world all this time, and the lab is still the first thing on his mind. Still “while we’re here.” Some people are just like that. Wherever they go, they connect people to each other. It isn’t a strategy. It’s just who he is.',
          ],
        },
        tkl_alumni_visit_project_only: {
          text: 'Yes to the project, skip the introduction',
          outcomes: [
            '“Okay, Professor,” he replies, then adds, “I’ll keep that alumni intro on standby for you. Just say the word anytime.” The project goes smoothly, with him handling liaison and coordination with remarkable efficiency. Once, in a meeting, he mentions the CEO in passing, and only then do you realize he got to know the man on his own long ago. But he never brought up the introduction again. All he says is, “He’s an interesting guy. We’ve talked a few times.” You told him to drop it, so he dropped it. This kid has good judgment.',
          ],
        },
      },
    },

    // ── Acknowledgments map (unlocks an Idea) ─────────────────────────────
    tkl_acknowledgment_map: {
      title: 'He’s analyzing the acknowledgments',
      description: [
        'Nico is reading a top-venue paper when he suddenly says, “These acknowledgments are pretty interesting.” You lean over to look. They thank seven people, two labs, a reading group, and “a conversation during a coffee break at an unnamed conference.”',
        '“What’s interesting about that?”',
        '“The names in the acknowledgments reflect how information actually flows better than the author list does,” he says. “And hardly anyone analyzes them, so the information in there is really clean. No strategy involved.”',
        'He pulls out his phone and shows you an acknowledgments list he’s been building in his notes app for months, names sorted by how often they appear. You recognize the one at the top: a big name you run into at every conference.',
      ],
      prompt: 'Nico is mining acknowledgments for relationship data. You choose:',
      options: {
        tkl_acknowledgment_cute: {
          text: 'You sure know a lot of people',
          outcomes: [
            '“So do you know the one at the top?” you ask, pointing to the first name on the list. “Yep,” Nico says. “Added him at the last conference. He replies fast.” You have no idea how he does it, but he really does seem to find someone worth talking to wherever he goes, and never in that going-through-the-motions networking way that makes people uncomfortable. That skill and his acknowledgment analysis probably feed into each other somehow.',
          ],
        },
        tkl_acknowledgment_research: {
          text: 'Turn this into a proper study',
          outcomes: [
            '“If you scraped the acknowledgments from a batch of top-venue papers, you could reconstruct the field’s hidden collaboration network,” you say. “That would tell you more than co-authorship does.” Nico’s eyes light up. “That’s exactly what I was thinking! And you could track how many times an idea gets acknowledged, to understand how it travels.” He’s already working out how to collect the data, pulling out his phone to take notes as he talks.',
          ],
        },
      },
    },

    // ── Six degrees (unlocks an Idea) ─────────────────────────────────────
    tkl_six_degrees: {
      title: 'He says he can reach anyone in five steps',
      description: [
        'Nico claims that in academia he can find a chain of five steps or fewer from himself to any researcher. You’re skeptical.',
        '“Prof, name someone,” he says. “Anyone in the field.”',
        'You toss out the name of a professor abroad whom you’ve heard of but have zero connection to. He thinks for about forty seconds, then counts it off on his fingers: “Me → a guy from the cohort above me → his co-advisor → a visiting scholar in that professor’s lab → the professor. Four steps.”',
        '“How did you meet the visiting scholar?” you ask. “At the dinner after a conference. It was past midnight, we were the only two still there, and we talked for a long time.” He says it with a completely straight face, as if this were a perfectly normal time window for building professional connections.',
        'You have no way of verifying that this chain really exists, but you can place every intermediary he mentions, and he can give a reason for every link. You start to think this might not be bragging after all.',
      ],
      prompt: 'Nico has just shown off his feel for the academic network. You choose:',
      options: {
        tkl_six_degrees_use: {
          text: 'Okay, put me in touch with that professor',
          outcomes: [
            'You say, “Then set it up for me. I really am interested in his work.” Nico nods. “No problem. Give it about a week.” Eight days later, the professor’s email shows up in your inbox. It opens with, “Our visiting scholar told me about the direction you’re working on, and I’d love to talk.” Reading to the end, you find the last paragraph mentions a small seed fund for international collaboration at his institution. You happen to meet the requirements, and all it takes is exchanging letters of intent. You forward it to Nico with a thank-you, and he texts back: “Prof, I was just going to get you two acquainted. Didn’t expect it to come with this.”',
          ],
        },
        tkl_six_degrees_verify: {
          text: 'This pattern is worth testing',
          outcomes: [
            '“Just how small is academia’s small world? Can it be quantified?” you say. “Your intuition is data. If you measured it systematically, it could be really interesting.” Nico pauses. He says he’d never thought of it as research; he just found it “fun.” You tell him fun is often enough for a paper. He takes out his phone, finds three related papers in five minutes, and says, “Yeah, nobody’s done it at this level of detail.”',
          ],
        },
      },
    },

    // ── Half-favor event ──────────────────────────────────────────────────
    half_favor_tang_kuolie: {
      title: '{studentName} went out for breakfast and came back with a person',
      description: [
        '{studentName} says he’s running downstairs to get breakfast and will be back in ten minutes. Twenty minutes later he appears at the door, and next to him is someone you’ve never seen before.',
        '“Prof,” he says, holding up a soy milk, “let me introduce you. This is Dr. Mehta. He just published that paper last month you said you wanted to read, the sparse attention one.”',
        'Dr. Mehta looks a little bewildered himself. Clearly someone just struck up a conversation with him while he was buying breakfast, and he hasn’t entirely figured out what’s going on.',
        '“I said my advisor might be interested, and Dr. Mehta said he didn’t mind chatting,” {studentName} says, handing out soy milk to everyone as if nothing were unusual. “It was on the way.”',
      ],
      prompt: 'You:',
      options: {
        half_favor_tkl_chat: {
          text: 'Have a real conversation with Dr. Mehta',
          outcomes: [
            'You talk for nearly an hour, from his paper to your research directions. {studentName} sits nearby drinking his soy milk, chiming in now and then but mostly looking at his phone. Yet every time the conversation stalls, he drops in exactly the right prompt and it picks right back up. After Dr. Mehta leaves, he looks up. “Went pretty well, right?” You say it went great. He nods. “Told you two would hit it off.” He says it completely calmly, as if he’d had it all figured out from the start.',
          ],
        },
        half_favor_tkl_how: {
          text: 'How do you meet someone buying breakfast?',
          outcomes: [
            '{studentName} thinks about it. “I said the soy milk wasn’t as good as yesterday’s, and he said yeah. I asked which lab he was in, he said computer science, I said my advisor does research in CS too, and we just got talking.” He smiles. “I think as long as you’re willing to open your mouth, the people around you are all pretty easy to talk to.” You and Dr. Mehta exchange a glance. He seems to still be processing this logic too.',
          ],
        },
      },
    },

    // ── Max-favor event ───────────────────────────────────────────────────
    max_favor_tang_kuolie: {
      title: 'Prof, I put together a little get-together for you',
      description: [
        'Friday afternoon, just as you’re about to head home, {studentName} messages you: “Prof, come by at six. I put together a little get-together.” You ask what kind of get-together. He replies instantly: “All good people, all want to meet you. Don’t worry, I’ll run the room.” It sounds so much like an emcee’s opening line that before you can say no, the address has already arrived.',
        'At six sharp you push open the door of the private dining room, and more than a dozen people look up at once to greet you. Students from the lab next door, industry researchers, alumni, people from the admin office, a collaborator you’ve only ever dealt with over email, all of them are there. More absurd still, they all know your lab and your recent projects, and someone’s very first words to you are: “Professor, is the Reviewer 2 story true?”',
        '{studentName} doesn’t see anything odd about this at all. He sits at the table like a human network switch: “This one does systems, this one does theory, this one’s a future collaborator, this one has server resources, this one is amazing at writing grants.” He introduces everyone warmly and with just the right touch, as if he’d already run tonight’s route through his head beforehand.',
        'Halfway through dinner, someone jokes, “Why are you always hyping up your advisor?” {studentName}, topping up everyone’s drinks, says as naturally as anything, “Because my advisor really is amazing.” It comes out so smoothly that it takes you a moment to register it, and a few people nearby are already laughing and nodding along.',
        'After everyone heads off, the two of you walk back together. The night breeze is a little cool, and {studentName} is still looking down at his phone, replying to messages and sorting the people he met tonight into different group chats. It suddenly hits you that he doesn’t just like meeting people. In his own way, he is carefully introducing the people he thinks matter to the rest of the world.',
      ],
      prompt: 'Under the streetlight, {studentName} is still head-down, sorting his contacts.',
      options: {
        max_favor_tkl_proud: {
          text: 'You praise me so smoothly. Have you been practicing?',
          outcomes: [
            '{studentName} glances up at you, entirely unapologetic. “It’s the truth. What’s there to practice?” Then he goes back to adding notes to his contacts, as if he’d just stated common knowledge. A few steps later he can’t help adding, “When I bring up our group to people outside, it really does make me feel kind of proud.”',
          ],
        },
        max_favor_tkl_world: {
          text: 'Thank you for introducing me to so many people',
          outcomes: [
            '{studentName} waves it off. “What’s there to thank me for?” He walks a couple of steps, then smiles. “I just think more people should know you.” With that, he adds you to a new group chat called “Future Collaboration Opportunities.” Looking at the name, you suddenly feel as if even tonight’s breeze has gotten a little lighter.',
          ],
        },
      },
    },

    // ── New Year gift reaction ────────────────────────────────────────────
    new_year_gift_result_tang_kuolie: {
      title: 'Nico’s reaction',
      description: ['Nico takes the gift box.'],
      prompt: 'Nico’s reaction is…',
      options: {
        ack: {
          text: 'Watch',
          outcomes: [
            'Nico opens the gift box and immediately snaps photos and sends them to a whole pile of group chats. That evening you get a dozen messages, every one of them some version of “Heard you’ve been giving your students gifts.”\n\nYou track down the culprit, who is completely unrepentant: “You don’t get it, Prof. This is brand building. Also, I really, really wanted to show off.”',
            'Nico says politely, “That’s very thoughtful of you, Prof,” then starts telling you about a new friend he made yesterday. The gift box seems to have been just an opener for the conversation. He’s already on to the next topic.',
          ],
        },
      },
    },
  },
};
