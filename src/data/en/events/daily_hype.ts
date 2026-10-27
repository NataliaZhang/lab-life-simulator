import type { EventTranslations } from '../../../types/i18n';

export const dailyHypeEventsEn: EventTranslations = {

  llm_everything: {
    title: 'LLM Maximalism',
    description: [
      '{studentName} walks into your office with a system design diagram printed on A3 paper and spreads it out across your desk. This isn’t the first time {he} has pitched “replace everything with an LLM,” but it is the first time it has come with a full architecture diagram: the data preprocessing module becomes a GPT-4 API call, the model itself becomes a GPT-4 API call, the evaluation metric becomes a GPT-4 API call, and the figure caption generator also becomes a GPT-4 API call. Every box on the page contains the same word.',
      '“LLMs can handle everything.” {studentName} says it gravely, as if stating a law of physics. You look at the diagram and count the API-call boxes: eleven. Your first thought is the monthly bill.',
    ],
    prompt: 'What do you do with the all-LLM blueprint?',
    options: {
      engage_seriously: {
        text: 'Seriously discuss whether it’s feasible',
        outcomes: [
          'You spend the entire afternoon going through it module by module. By the third module, {studentName} starts crossing things out on {his} own: “This one’s out, latency’s too high.” “This one’s out, no way to guarantee determinism.” “This one… actually might be okay.” In the end, two sensible LLM integration points survive, and everything else goes back to conventional methods.\n\n{studentName} redraws the diagram, and it’s much better than the original. You think: seventeenth time’s the charm.',
          'The discussion gets very animated. The longer it goes, the more energized {studentName} gets and the more drained you get. Two hours in, the two of you reach a philosophical impasse over the sub-question of “LLM-based evaluation metrics,” and neither convinces the other. {studentName} heads out, saying, “Let me think about it some more.” The printout is still on your desk. You fold it up and put it in the bottom right drawer.',
        ],
      },
      explain_why_not: {
        text: 'Explain, scientifically, why it won’t work',
        outcomes: [
          'You point out three core problems: reproducibility, cost, and the circular logic of “using a language model to evaluate a language model’s output.” {studentName} frowns at the diagram for a while, then says, “…But in theory you could use a different model.” You say, “You could. That’s your next experiment.” {studentName} leaves. The diagram stays on your desk, a monument to a solved problem.',
          'You lay out the three problems very clearly. {studentName} listens carefully, nods, and leaves. The next day you find that {studentName}’s design still has seven LLM-call boxes, plus one new annotation: “For open issues, see advisor’s comments.” The ticket isn’t closed. It’s on hold.',
        ],
      },
      let_them_try: {
        text: 'Green-light a prototype',
        outcomes: [
          'You say, “Fine, build a prototype and let’s see.” {studentName}’s eyes light up. Three weeks later, the prototype really does run end to end, and it really is somewhat useful, but there’s one line on the API bill that is hard to look at. The bigger problem: {studentName} now believes this proves LLMs can handle everything, and plans to write a paper called “An Empirical Study of Fully-LLM Pipelines.” You opened that door yourself.',
          'You say, “Fine, build a prototype.” {studentName} heads off, rubbing {his} hands together. Two weeks later {he} comes back with findings: GPT-4 hallucinates 23% of the time in the evaluation step; in preprocessing, it starts randomly deleting columns whenever it hits non-English characters; and the caption generator insists on describing every figure as “a figure showing trends in the data.” The bill: $230. {studentName} hesitates, then asks, “So our next step is…” You say, “Write up an analysis of LLM limitations.”',
        ],
      },
    },
  },

  agent_gospel: {
    title: 'The Gospel of Agents',
    description: [
      '{studentName} has recently found religion. The religion is called multi-agent systems. In group meeting, no matter what problem comes up, {studentName}’s solution is “add a few more agents.” Results are bad? “We need an agent for self-reflection.” Code has a bug? “We need a dedicated debugging agent.” Late to last week’s group meeting? “I should have a time-management agent to remind me.”',
      '{studentName} has started calling {his} research vision “The Agentic Future” and has already written a 3,000-word vision statement in a Markdown file titled “Toward a Fully Autonomous Research Paradigm.” You can’t tell whether this is an early sign of genius or a sign that you need to step in.',
    ],
    prompt: 'What do you do about {studentName}’s newfound faith in agents?',
    options: {
      gently_redirect: {
        text: 'Gently pull the plug and steer back on topic',
        outcomes: [
          'You ask one question: “For the hardest type of sample in your current dataset, which specific subproblem would adding an agent solve?” {studentName} thinks it over seriously, then says, “…Maybe a data augmentation agent?” You say, “Good. That’s concrete. Go do it.” Three days later {studentName} comes back to tell you the core problem wasn’t a data problem at all. The faith has cooled a little. The technical judgment has improved.',
          'You gently steer {studentName} toward the actual problem. {studentName} nods like a bobblehead: “Totally, that’s exactly what I meant.” Then, at next week’s group meeting, {he} presents an architecture diagram with agents nested six levels deep, introduced as the solution to the actual problem. You realize some faiths can’t be steered anywhere. You just have to wait for them to hit a wall on their own.',
        ],
      },
      let_it_play_out: {
        text: 'Let it be. Faith finds its own way.',
        outcomes: [
          '{studentName} builds a system with twelve agents. When it runs, it burns forty times the tokens of the single-model approach, has eight seconds of latency, and scores two percentage points below the baseline. {studentName} stares at the eval results, pushes {his} chair back, and sits for a long time with {his} face in {his} hands. Then {he} opens the document, changes “Fully Autonomous” to “Semi-Autonomous,” and deletes most of the sprawling vision statement. You think this worked better than any lecture could have.',
          '{studentName}’s multi-agent system unexpectedly gets good results on one specific subtask. {studentName} messages you right away, barely containing {his} excitement: “Professor! I think I found something!” You open the results and look carefully. There really is something there. Sometimes faith is onto something, you have to admit.',
        ],
      },
      learn_from_enthusiasm: {
        text: 'Actually read the 3,000-word scripture',
        outcomes: [
          'You read the whole document. Most of it is grand narrative, long on enthusiasm and short on evidence, but one section on “recovery strategies for failed tool calls” is surprisingly concrete, even a little novel. You clip out that section and send it to {studentName}: “This is worth digging into.” {studentName} is caught off guard for a second, then visibly perks up. Being taken seriously is the best fuel there is.',
          'You read all 3,000 words of the vision statement. You come away with two takeaways. One: {studentName} is a pretty good writer. Two: you are now a little bit sold on multi-agent yourself. You quickly open a paper arguing the opposite and haul yourself back from the edge of the cliff.',
        ],
      },
    },
  },

  hot_arxiv_nuke: {
    title: 'A Top Lab Just Dropped a Nuke',
    description: [
      'At 11 p.m. last night, a paper went up on arXiv. By 7 a.m., your phone won’t stop buzzing. A top lab has released work that overlaps almost exactly with your group’s direction for the past eight months, except faster, cheaper, and better. The paper is at five hundred retweets, and someone in the replies is saying “this problem is solved.”',
      'Over in your repo, the experiments launched last week are still quietly running on the server, unaware that they are already history.',
    ],
    prompt: 'Steamrolled head-on by a top lab. What’s your strategy?',
    options: {
      differentiate: {
        text: 'Read it closely and hunt for weaknesses',
        outcomes: [
          'You read the paper carefully several times, annotating every section. In Section 4, you find a crack: their method degrades badly in low-resource settings, which is exactly the setting your group has been working on. You open the group chat and post: “Group meeting tonight. I have good news.” A crisis is also a door into another direction.',
          'You spend the entire day reading. Their method is very thorough, with very few holes, but there is one application setting they really didn’t cover, and nobody has built a dataset for it yet. That means three extra months of work. You send the finding to the group. The group chat goes silent for several minutes, then someone replies, “ok.” Work continues.',
        ],
      },
      race_to_publish: {
        text: 'Sprint and get ours out first',
        outcomes: [
          'In four days you write up everything that can be written and submit it to a workshop, noting that it was done “concurrently with and independently of” the other lab. At the workshop, someone recognizes your paper: “Oh, I know you guys. Your low-resource setting is really interesting.” The timing was off, but you left a mark.',
          'You rush the results together and post an arXiv preprint four days later. But in those four days the original paper picks up another eight hundred retweets, and the first reviewer comment on your submission reads: “This problem has already been solved by [citation].” You sit in front of your monitor for a long time. It feels like hearing the announcer declare the race over when you are five hundred meters from the marathon finish line.',
        ],
      },
      pivot: {
        text: 'Make the call and announce a pivot',
        outcomes: [
          'You post in the group chat: change of direction, discussing new goals tonight. The message sits there, delivered and unread, for ages. Then a typing indicator pops up and vanishes. Then someone sends “got it,” someone else sends “ok,” and a third person sends “I still have experiments that haven’t finished running, should we wait?” You say you’ll wait. Two weeks later, the new direction gets underway. The old code doesn’t get deleted. Some work is destined to be groundwork.',
          'You announce the pivot. One student asks to talk to you privately: everything from the past six months is tied to this direction, and pivoting means starting over in any real sense. You talk for a long time and finally find a transition plan that keeps the core of the work, but it pushes that student’s timeline back by several months. Some costs are real.',
        ],
      },
    },
  },

  sota_17_samples: {
    title: 'SOTA on 17 Samples',
    description: [
      '{studentName} bursts into your office, barely containing {his} excitement: “Professor! We hit SOTA on the benchmark!” You put down what you’re holding and ask: which benchmark, and by how much? Answer: 0.3%. You say nice, and what’s the sample size? Answer: 17 test samples.',
      '{studentName} already has the paper draft open on {his} laptop. The “State of the Art” section is written, in bold, two font sizes larger than the body text. You look at that heading over your coffee and feel like you’re going to need another cup.',
    ],
    prompt: 'How do you handle a 0.3% SOTA on 17 samples?',
    options: {
      celebrate_carefully: {
        text: 'Praise first, then quietly ask for the p-value',
        outcomes: [
          'You say, “Great result, but let’s compute a confidence interval first.” {studentName} opens Python and runs it: the interval spans plus or minus two percentage points, and the p-value comes out around 0.4. Everyone looks down at the number. Someone starts doodling little boxes in the margin. You say, “The data collection is headed the right way. Next step is scaling up the test set. That’s the right path.” {studentName} renames the “State of the Art” section to “Preliminary Results” and sets the font size back to normal.',
          'You start with some praise, and {studentName} brightens up. Then you say, “But let’s think about the confidence interval.” {studentName} runs the numbers, gets a complicated look, and says, “…Maybe we need more data.” You say yes. On the way out, {studentName} folds up the draft and puts it in {his} bag. {He} doesn’t throw it out. Presumably it’s being kept to mourn later.',
        ],
      },
      explain_significance: {
        text: 'Unleash the p-value and sample size',
        outcomes: [
          'You write the confidence interval formula on the whiteboard and walk through it from the beginning. {studentName} listens carefully, glances out the window, taps {his} fingers on the desk a few times, then asks, “So what about our result…” You say, “It’s a preliminary finding. But scaling up the test set is itself the contribution for the next stage.” {studentName} nods, closes the paper draft, and opens the dataset-building code.',
          'When you finish, {studentName} nods and asks a question: “So who released a 17-sample benchmark, and how did it get through review?” You pause and realize that’s a very good question. You then spend quite a while discussing the history of academic publishing. It is an extremely pleasant tangent.',
        ],
      },
      workshop_it: {
        text: 'Submit it as is (17 is still a sample)',
        outcomes: [
          'You say, “Let’s send it to a workshop first, so people in the area know someone’s working on this, and collect more data in the meantime.” {studentName} regroups, renames the “State of the Art” section to “Preliminary Study,” and submits. The workshop accepts it, with reviewer comments reading: “An interesting preliminary exploration; we look forward to larger-scale validation.” {studentName} comes back and asks whether this counts as recognition. You say it does, though the bar was temporarily lowered.',
          'You say to send it to a workshop. Reviewer 1 writes “promising direction.” Reviewer 2 writes, flatly, “n=17 is statistically inadequate for any meaningful conclusion,” and attaches a five-hundred-word statistics primer. Rejected. {studentName} comes back with a complicated expression and says, “Reviewer 2 is kind of… right?” You say: yes, they’re right. But you don’t have to thank them.',
        ],
      },
    },
  },

  industry_pilgrimage: {
    title: 'Industry Visit Day',
    description: [
      'A major tech company has reached out to the lab about coming by for “an informal, exploratory conversation to learn about cutting-edge research directions and explore potential collaboration opportunities.” The contact’s email signature runs six lines, with three all-caps acronyms in the job title.',
      'Once the news is out in the group, the lab undergoes a quiet transformation. Someone who wore a hoodie with a cat meme on it yesterday shows up today in something with a collar. Someone starts writing “Impact” and “Scalability” on the whiteboard in thick marker. Someone asks you, “Want me to make the slides?” It is the first time this student has volunteered to help since joining the lab.',
    ],
    prompt: 'How do you play the industry visit?',
    options: {
      professional_presentation: {
        text: 'Suit up and bring the real stuff',
        outcomes: [
          'You prepare a twenty-minute talk: clean data, clear conclusions, and a demo that actually runs. Afterward, the visitors hand out a few business cards and say, “We’re very interested in this direction. Let’s set up a deeper conversation next month.” In the hallway, students whisper, “Were they serious about the internships?” You think they probably were.',
          'The deck runs forty slides. Halfway through, the demo suddenly throws an error, and it takes you three minutes to trace it to an environment config issue. The visitors show no obvious impatience, but at the end they say, “We’ll stay in touch,” which in both academia and industry is the universal phrase for ending things politely. Within five minutes of the visitors leaving the building, nearly every collar in the lab has been unbuttoned.',
        ],
      },
      casual_honest: {
        text: 'Keep it casual, be honest about progress',
        outcomes: [
          'You close the slides and say, “Let’s just talk.” Their engineers relax immediately: “Oh good, we’re not big on formal presentations.” You talk for an hour and a half, from technical details to the gap between research and real industry settings, and halfway through someone drags over a whiteboard and starts sketching architectures. On the way out, they say, “This was the most productive visit we’ve had all year.”',
          'You walk them through your progress honestly, including the unsolved problems and the current limitations. The business people’s faces stiffen slightly, but the engineers perk up and start asking, “Have you thought about handling this limitation with approach X?” From there on, the discussion is very substantive. Sometimes sincerity is the most effective presentation strategy.',
        ],
      },
      panic_clean: {
        text: '8 a.m. emergency cleanup (all hands)',
        outcomes: [
          'Cleaning starts at 8 a.m. The whiteboards get wiped, the takeout containers get cleared out, the printer that has been broken for six months gets pushed into a corner out of sight, and someone even buys a potted plant for the entrance. The first thing the visitors say when they walk in is, “What a tidy lab.” You breathe a sigh of relief. But five minutes into the visit, someone realizes the experimental results aren’t ready. The room is clean; the content is improvised.',
          'In the middle of the emergency cleanup, someone accidentally knocks an external hard drive onto the floor. It holds the last three weeks of experiment logs. Everyone stops cleaning on the spot and switches to collective prayer that the drive survived. Throughout the visit, you present your research progress while mentally estimating the odds of data recovery. Good news: the drive is fine. Bad news: the potted plant someone put by the entrance had just been grabbed from out in the hallway, and after the visit its owner came to collect it.',
        ],
      },
    },
  },

  vibe_research: {
    title: 'The Vibe Coding Reveal',
    description: [
      'Halfway through today’s group meeting, {studentName} says something in a very offhand tone and then keeps going, as if commenting on the weather: “Oh, by the way, my code for the last two months has basically all been AI-generated. I describe what I need, it writes the code, I run the experiments. The results are pretty good.”',
      'For a moment, the whole room goes still. Your eyes land on the results report: three thousand lines of code, four sets of controlled experiments, and the numbers really are good. The problem is that you don’t know what those three thousand lines actually do, and {studentName} probably only knows about half of it.',
    ],
    prompt: 'What do you do about three thousand lines of fully AI-generated code?',
    options: {
      academic_integrity: {
        text: 'Seriously discuss the limits of AI tools',
        outcomes: [
          'You ask three questions: Can you clearly explain the core algorithmic logic in the code? Can you reproduce the results? If a reviewer asks about implementation details, how will you answer?\n\nPartway through, {studentName} starts scrolling on {his} phone, then puts it down, frowns at the desk, and says, “I understand the core logic, but a few modules really are black boxes.” You spend the afternoon opening up those black boxes. One of them has a subtle error. It doesn’t affect the conclusions, but it’s worth noting. The boundary is now clear: use the tools, but not without understanding them.',
          'You have a serious discussion about boundaries and norms. {studentName} listens carefully and says {he} understands. But you notice that when it’s over, {studentName} adds: “So it’s not against the rules, right?” You say right.\n\n{studentName} immediately opens Claude and starts describing the requirements for the next module. Some conversations don’t land where you expected them to.',
        ],
      },
      embrace_productivity: {
        text: 'If the tool is productive, that’s fine',
        outcomes: [
          'You say the results look good, so keep going, but {studentName} has to be able to explain every key module. {studentName} nods and adds, “I can already explain all of it. Writing it out was just tedious, so I had the AI write it for me.” You realize the two of you were never talking about the same problem. You thought it was about understanding; {studentName} thought it was about typing. Productivity is up. Whether that gap in understanding counts as a cost, you’re not sure.',
          'You say the tool is fine; results first. The results are good. But three weeks later in group meeting, you ask {studentName} to explain a design choice in one of the data augmentation modules. {studentName} freezes, quickly picks up {his} phone and pretends to look something up, puts it down, picks it up again, and finally says, “…Let me check.” You don’t say anything, but you make a mental note: ask earlier next time.',
        ],
      },
      run_carefully: {
        text: 'Not convinced. Run it through to settle your nerves',
        outcomes: [
          'You and {studentName} spend two days going through all three thousand lines: unit tests, edge cases, numerical stability, all of it. You find two potential issues. One is harmless; the other would cause an out-of-memory error with ten times more data. Verdict: the code quality is surprisingly good, and it’s better to have caught that memory issue early. {studentName} says, “The AI writes cleaner code than I do.” You don’t reply.',
          'You review the code carefully and find that the core logic uses an approximation for one of its calculations. It happens to work well on {studentName}’s dataset, but on a different batch of data it would be systematically biased. The mysteriously good results now have an explanation: the experimental setup and the bug happen to mask each other. You tell {studentName}. The two of you sit across from each other, looking at that number, thinking about the experiments that now have to be redone.',
        ],
      },
    },
  },

  replication_crisis: {
    title: 'Replication Crisis',
    description: [
      'Another lab has emailed you. The wording is polite, but the content is a little uncomfortable: they have been trying to reproduce your published results for three months and still can’t get within 15% of your numbers. They would like your complete training details.',
      'You open the directory from when you ran those experiments. Inside are seven files with different names and very similar contents: final.ipynb, final_v2.ipynb, final_FINAL.ipynb, final_FINAL_v2.ipynb, final_FINAL_v3.ipynb, final_FINAL_v3_USE_THIS.ipynb, and one called use_this_one_actually.ipynb.\n\nYou open final_FINAL_v3_USE_THIS.ipynb. The comment in the first cell reads: “remember to change the seed here.”',
    ],
    prompt: 'How do you handle the replication crisis?',
    options: {
      help_fully: {
        text: 'Help them reproduce it, hold nothing back',
        outcomes: [
          'You spend two days putting together a complete reproduction guide: random seeds, every preprocessing step, the hardware configuration, and what “remember to change the seed here” in that notebook actually meant.\n\nThey reproduce your results successfully and send a thank-you email saying, “You’re one of the most transparent labs we’ve ever contacted.” Their paper gives you an extra paragraph in the acknowledgments. Not everyone is willing to cooperate like this.',
          'You cooperate fully and work through it step by step. Along the way, you discover that one hyperparameter is described ambiguously in the original paper. Different readings lead to different results. Both are reasonable, but they differ by about 12%.\n\nThey write this finding into their paper too, as “a discussion of ambiguity in the experimental setup.” You sigh. At least it did move one small problem in the field forward.',
        ],
      },
      investigate_yourself: {
        text: 'Reproduce it yourself first. Seeing is believing.',
        outcomes: [
          'You spend an entire week reproducing the experiments yourself, start to finish. The results come in 8% off the paper’s numbers, but within a reasonable range. You track down the source of the difference: a data augmentation strategy you used changed its behavior slightly after a code update, and you never recorded the version number. You write them a long reply explaining every detail, with a corrected reproduction guide attached. In their next paper, they say your lab “demonstrated a high degree of scientific transparency.”',
          'You try reproducing it yourself. After three days of runs, your numbers are a full 18% off the paper’s, outside the margin of error for you too.\n\nYou dig in and find a difference between the test set you used back then and the current version of the dataset, but the commit where the change happened has no real description.\n\nYour reply to them takes an hour to write. It is very sincere, and it comes with detailed environment requirements.\n\nFrom then on, every experiment in your group records full dependency versions.',
        ],
      },
      send_what_you_have: {
        text: 'Send the code with a short note',
        outcomes: [
          'You send over final_FINAL_v3_USE_THIS.ipynb, with an honest note: “Some details may need further confirmation.”\n\nThey reply with a thank-you, and then nothing for three weeks. Every day your email client shows “Read,” and still no further reply.\n\nThen one Monday morning, a new email arrives out of nowhere: they’ve found the discrepancy. It’s the order of the data preprocessing steps. Your description and your code don’t fully match.',
          'You send over the code. Three days later they write back: two cells in it output different results, and which one is correct?\n\nYou open the file and find the leftovers of two different experiments, both still there, neither clearly labeled. It takes you an hour to work out again which version is the right one.',
        ],
      },
    },
  },

  foundation_war: {
    title: 'The Foundation Model Wars',
    description: [
      'The group has been split into two camps for weeks, and at today’s group meeting it finally comes out into the open. One camp believes all future work should start from a general-purpose foundation model: whatever the task, scale is all you need. The other camp believes domain-specific pretraining is the only right answer, and that general models are a joke in specialized domains. Both camps cite a mountain of papers. The two sets of citations have zero overlap.',
      'Group meeting has turned into a debate tournament. The whiteboard is covered in comparison numbers, someone has the other side’s paper spread out on the table as a rebuttal, and someone’s voice is a good half step higher than usual. Sitting at one end of the table, you realize that if you don’t do something, this could go on until dark.',
    ],
    prompt: 'Civil war in the lab. How do you respond?',
    options: {
      declare_position: {
        text: 'Take a side and decree the direction',
        outcomes: [
          'You say you lean toward the foundation-model route, citing data scale and general transfer ability. The camp on your side immediately goes quiet, wearing the look of victors. The other camp also goes quiet, with the expression of people working hard to maintain academic neutrality.\n\nThe meeting ends with a clear direction, but you can tell half the room left with something they couldn’t quite swallow. It may find a way out when the next round of results comes in.',
          'You say that domain-specific pretraining is more feasible given current resources, and give three reasons. The other camp pushes back. You nod, say, “Let’s pick this up next week,” and end the meeting.\n\nThree days later you get an email with a newly released paper that happens to support your position. It’s from one of the students who argued against you. That probably counts as a roundabout form of acceptance.',
        ],
      },
      stay_neutral: {
        text: 'Stay neutral and let the bullets fly',
        outcomes: [
          'You say, “Good question. Carry on,” then lean back in your chair and let them argue for another forty minutes.\n\nThe whiteboard fills up, and by the end both camps concede that the other side has a point or two.\n\nYou write the question in the corner of the whiteboard and say, “That’s next quarter’s experiment.” A research direction is born out of an argument.',
          'You stay neutral and let them argue. An hour in, there is no conclusion, but tempers are up on both sides. The meeting ends in an uncomfortable atmosphere, and as the door swings shut, you faintly hear someone in the hallway let out a hard breath.\n\nNeutrality isn’t peace. Sometimes it just postpones the problem.',
        ],
      },
      design_experiment: {
        text: 'Design an experiment and let the data decide',
        outcomes: [
          'You cut into the debate and write an experimental framework on the whiteboard: same data, same tasks, two pretraining strategies, three evaluation metrics. You say, “Six weeks from now, the data does the talking.” Both camps stop arguing at the same moment and start debating whether the experimental design is sound, and this time they are discussing it together, not facing off. Six weeks later the results come in: interesting, not simple, and enough for a paper.',
          'You propose settling it with an experiment, and both camps agree. Designing the experiment takes two group meetings, and along the way the camps split again over the choice of benchmark: whose benchmark to use and which metrics to evaluate are each a new point of contention. You realize the real joy of research may be this: every problem you solve grows two new ones. This set of experiments is probably going to be a lot more complicated than expected.',
        ],
      },
    },
  },

};
