import type { ProjectTranslation } from '../../types/i18n';

// English text for src/data/projects.ts, keyed by project ID.
// ideaSources must stay the same length and order as the Chinese array.
export const projectsEn: Record<string, ProjectTranslation> = {

  // ── Tutorial project ────────────────────────────────────────────────────

  meeting_minutes_assistant: {
    name: 'Group Meeting Minutes Assistant',
    description: 'Train a small model that turns group meeting recordings into organized minutes. Core feature: making “we discussed a lot” accountable.',
    completionSummary: 'The tool is officially live. The minutes are much better and every decision is easy to find. Everyone now uses it to prove they “contributed the most to the discussion,” and group meetings have gotten 20% longer as a result.',
    ideaSources: ['The case of the missing minutes'],
  },

  // ── Short projects ──────────────────────────────────────────────────────

  pi_email_delay_game_theory: {
    name: 'A Multi-Agent Game-Theoretic Model of PI Email Latency',
    description: 'Model academic email exchanges as a game of incomplete information: the PI and the student each have a strategy set, and a delayed reply is an equilibrium, not an accident. A theoretical framework plus small-scale survey data, aimed at a workshop.',
    completionSummary: 'Accepted at the workshop. Anonymous Reviewer 2 wrote: “Are the authors aware that this study itself exhibits the ‘delayed acknowledgment bias’ described in the paper?” The comment gets quoted at group meeting again and again.',
    ideaSources: ['The “advisor left me on read” study', 'After seriously discussing that absurd paper with a student'],
  },

  advisor_reply_predictor: {
    name: 'Advisor Reply Prediction',
    description: 'Predict when an advisor will reply to a message, based on chat history.',
    completionSummary: 'Experiments show that 97.3% of advisor reply delays follow a Poisson distribution, with a significant “Friday disappearance effect” within the confidence interval. Prediction accuracy: 89%.',
    ideaSources: ['The long wait for a reply', 'Everyday student complaints', 'Left on read'],
  },

  auto_rebuttal: {
    name: 'Automated Rebuttal',
    description: 'Use historical review data to automatically generate high-quality rebuttals.',
    completionSummary: 'Our system outscores human authors by an average of 23% across ten top-venue datasets, but Reviewer 2 still finds the logic “not sufficiently rigorous.”',
    ideaSources: ['A rejection notice', 'A review meeting', 'The Reviewer 2 incident', 'A student discussion'],
  },

  campus_agent: {
    name: 'Campus Agent',
    description: 'Build a campus agent that takes care of students’ everyday chores for them.',
    completionSummary: 'The prototype automated nine kinds of university admin tasks, then hit the edge of the real world at the “get it officially stamped” step: the applicant must appear in person.',
    ideaSources: ['Bureaucratic hoops', 'The portal crashes again', 'A student complaint session'],
  },

  meeting_translator: {
    name: 'Group Meeting Translator',
    description: 'Translate what people say at group meeting into language humans can understand, in real time.',
    completionSummary: 'Across 200 recorded group meetings, the system reached 91% translation accuracy. The hardest sentence pattern to handle was “so basically… that thing… you know.”',
    ideaSources: ['Group meeting chaos', 'Students who can’t understand each other', 'Decoding what the advisor meant'],
  },

  email_politeness_tax: {
    name: 'The Email Politeness Tax',
    description: 'Analyze the causal relationship between how polite a greeting is and email reply rates.',
    completionSummary: 'Each additional “I hope this email finds you well” raises the reply rate by 11%, but returns diminish after three, at which point the recipient’s “this person wants something” alarm goes off.',
    ideaSources: ['Emailing someone for a favor', 'Waiting too long for a reply', 'A discussion of how students write emails'],
  },

  night_code_effect: {
    name: 'The Nocturnal Code Effect',
    description: 'Compare the quality of code written at 2 a.m. with code written at 10 a.m.',
    completionSummary: 'Late-night code has 58% lower comment density and 40% more creative variable names, and 73% of “genius solutions” become unreadable by the next morning.',
    ideaSources: ['Students debugging all night', 'The 3 a.m. commit', 'Analyzing server log timestamps'],
  },

  gpu_queue_game_theory: {
    name: 'The GPU Queue Game',
    description: 'A game-theoretic model of resource competition on a shared GPU cluster. Members play against each other through submission timing and resource-request strategies, producing a set of unwritten rules that nobody ever stated but everyone follows.',
    completionSummary: 'Experiments show the cluster’s equilibrium strategy is to submit large jobs one hour before the end of the workday and overstate the estimated runtime by 50%. After the paper came out, the whole lab adjusted in sync and cluster utilization dropped 23%, until everyone doubled their overestimates again.',
    ideaSources: ['GPU cluster queues', 'Complaints about GPU hogging', 'A group meeting discussion about resources'],
  },

  slacking_detector: {
    name: 'The Slacking Detector',
    description: 'Use image recognition to classify lab members’ working state: actually thinking about a research problem, or zoning out. The core difficulty is that “staring blankly at the screen” and “working hard” look visually almost identical.',
    completionSummary: 'The system tells “thinking” from “zoning out” with 92% accuracy, but every participant insists they belong to the misclassified 8%, and not one of them is willing to pull up the footage of their own classification.',
    ideaSources: ['A group meeting observation', 'A discussion of remote-work productivity', 'The lab camera upgrade'],
  },

  blame_propagation: {
    name: 'A Distributed Blame-Passing Protocol',
    description: 'Model how responsibility flows between components and teams after a large system failure, and where it finally ends up. The study finds that blame propagation shows network dynamics similar to the spread of a virus.',
    completionSummary: 'Replaying 17 real system failures shows that each incident triggers an average of 4.3 rounds of primary blame-shifting and 2.1 rounds of secondary blame-shifting. Where the blame finally lands correlates only 0.31 with the component that originally failed, and the endpoint is almost always someone who has already left.',
    ideaSources: ['The server crash', 'A lab incident postmortem', 'A dispute over who was responsible'],
  },

  variable_naming_law: {
    name: 'Naming Is Destiny',
    description: 'Study how the length and semantic clarity of variable names affect program correctness. The hypothesis: clearer names, fewer bugs. The data refuses to give the expected answer.',
    completionSummary: 'An analysis of 500,000 lines of code finds a U-shaped relationship between variable name length and bug density: names that are too short (a, x) and too long (userInputValidationCheckResultFlagBoolean) both correlate with higher bug rates. The optimal range is 8–12 characters, and nobody sticks to it.',
    ideaSources: ['A code review', 'A student’s naming disaster', 'The ancestral codebase'],
  },

  todo_completeness: {
    name: 'A Completeness Theory of To-Dos',
    description: 'Study whether the number of to-do comments in a software project converges over time, and the systematic gap between what developers expect and how the count actually grows.',
    completionSummary: 'Tracking 42 open-source projects over three years proves that the set of to-dos is monotonically increasing in 99% of cases, with no statistically significant convergence. The only exception is this research project itself, because nobody ever wrote a to-do for it.',
    ideaSources: ['The to-do explosion in the codebase', 'A tech-debt cleanup discussion', 'A code audit'],
  },

  reviewer_impossibility: {
    name: 'The Reviewer Impossibility Theorem',
    description: 'Use social choice theory to prove that no reviewer can simultaneously be “constructive,” “has read the whole paper,” and “easy to get accepted by.” The theorem is structurally similar to Arrow’s impossibility theorem.',
    completionSummary: 'Proof complete: any two of the three conditions can hold at once, but all three together lead to a contradiction. After submission, Reviewer 2 left a comment that was both constructive and clearly written without reading the whole paper. The authors included it as Appendix A.',
    ideaSources: ['The Reviewer 2 incident', 'Contradictory reviews', 'A discussion about the review system'],
  },

  // ── Normal projects ─────────────────────────────────────────────────────

  code_archaeology: {
    name: 'Code Archaeology',
    description: 'Reconstruct lost system designs from historical commit records.',
    completionSummary: 'Design intent was reconstructed for 134 undocumented legacy repositories with 71% accuracy. For 12 of them, the original authors can no longer be reached to confirm.',
    ideaSources: ['The ancestral repo', 'The mysterious process', 'A Zoe incident'],
  },

  reviewer_alignment: {
    name: 'Reviewer Alignment',
    description: 'Train a model that simulates the preferences of reviewers at different conferences, so a paper’s style can be aligned with them in advance.',
    completionSummary: 'Trained on 23,000 historical reviews, the model predicts review decisions with 82% accuracy, but declines to give specific reasons.',
    ideaSources: ['Decoding reviewer comments', 'The Reviewer 2 incident', 'Submission results'],
  },

  coffee_social_network: {
    name: 'Coffee Break Social Networks',
    description: 'Analyze the social structure of academic coffee breaks and model how informal collaborations form.',
    completionSummary: 'Six months of coffee break records show that 80% of cross-group collaborations began in the 3 minutes spent waiting for the coffee machine, a window with significantly higher ROI than formal group meetings.',
    ideaSources: ['Coffee break small talk', 'Dinner after group meeting', 'Socializing at a conference'],
  },

  ddl_reinforcement: {
    name: 'Deadline Reinforcement Learning',
    description: 'Use reinforcement learning to find policies that maximize the total payoff of finishing tasks before the deadline.',
    completionSummary: 'The agent learned an optimal policy known as the “final two-hour burst,” whose action sequences are 91% similar to those of the human control group.',
    ideaSources: ['Racing a deadline', 'Students pulling all-nighters', 'A brutal group meeting'],
  },

  meme_propagation: {
    name: 'Academic Meme Propagation',
    description: 'Model how memes spread inside academia and the group-identity effects they create.',
    completionSummary: 'Academic memes survive an average of 18 days. After crossing three subfields, they mutate spontaneously at a rate of 40%, in unpredictable directions.',
    ideaSources: ['Something in the academic community', 'Something on the lab intranet', 'A student discussion'],
  },

  ai_paper_detection: {
    name: 'AI Paper Detection',
    description: 'Build a classifier that detects whether an academic paper was generated by AI.',
    completionSummary: 'The detector reaches 94% accuracy on AI-generated papers, but drops to 51%, close to random guessing, on “humans imitating AI writing style.”',
    ideaSources: ['The AI wave', 'A paper-quality controversy', 'Student homework submissions'],
  },

  graduation_delay_predictor: {
    name: 'Early Warning for Graduation Delays',
    description: 'Predict whether a student will delay graduation from commit frequency and message reply speed.',
    completionSummary: 'Using commit frequency, message reply latency and check-in times, the model predicts graduation delays six months in advance with 79% accuracy. Advisors generally responded, “If only we’d known sooner.”',
    ideaSources: ['A procrastinating student', 'Graduation-season anxiety', 'Progress updates at group meeting'],
  },

  citation_network_mining: {
    name: 'Citation Network Mining',
    description: 'Uncover the academic cliques hidden in citation relationships.',
    completionSummary: 'In a citation graph of 5,000 papers, we found 17 highly self-consistent “citation gangs.” The largest has 4 authors and more than 300 mutual citations.',
    ideaSources: ['A literature review', 'A citation dispute', 'Downloading a dataset'],
  },

  hyperparameter_divination: {
    name: 'Hyperparameter Black Magic',
    description: 'Formalize the alchemy of training runs as Bayesian optimization, and study how it differs from tuning by intuition.',
    completionSummary: 'An analysis of a thousand tuning logs finds no significant difference between the final hyperparameters chosen by experts and by novices (p=0.07), though the experts drank 2.3 fewer cups of coffee on average.',
    ideaSources: ['Running experiments on the GPUs', 'A failed training run', 'Orion’s research mysticism'],
  },

  whiteboard_erasure_theorem: {
    name: 'The Whiteboard Erasure Theorem',
    description: 'Document the important derivations that were erased before anyone took a photo.',
    completionSummary: 'A survey shows that 67% of researchers have erased something “very important,” and 23% of them could never reproduce it. Those theorems have vanished from academic history for good.',
    ideaSources: ['The erased group meeting whiteboard', 'A sudden flash of inspiration', 'Fighting over the conference room'],
  },

  server_downtime_oracle: {
    name: 'The Downtime Oracle',
    description: 'Use machine learning to predict when the GPU cluster will crash.',
    completionSummary: 'A multimodal model built on GPU utilization curves, storage growth rate and the day’s weather predicts outages up to 4.7 hours ahead with 83% accuracy.',
    ideaSources: ['The server crash', 'GPU out-of-memory errors', 'A late-night outage rescue'],
  },

  conference_social_matching: {
    name: 'Conference Social Matching',
    description: 'Recommend to each attendee at an academic conference the people most worth meeting.',
    completionSummary: 'Collaborators matched by the algorithm across three simulated conferences went on to produce 2.1 times as many papers as random pairs, though the algorithm refuses to call it “fate.”',
    ideaSources: ['Socializing at a conference', 'Meeting a big name at the coffee break', 'Nico’s network'],
  },

  meeting_game_theory: {
    name: 'Group Meeting Game Theory',
    description: 'Use game theory to analyze optimal strategies for group meeting attendance and presentations.',
    completionSummary: 'Nash equilibrium analysis shows that the optimal group meeting strategy is “listen carefully for the first 10 minutes, then switch to scrolling arXiv the moment the advisor zones out.”',
    ideaSources: ['The group meeting attendance problem', 'A discussion of student slacking strategies', 'Reflections on meeting efficiency'],
  },

  acknowledgment_network: {
    name: 'The Acknowledgment Graph',
    description: 'Reconstruct academia’s web of personal connections from the acknowledgments sections of papers.',
    completionSummary: 'From the acknowledgments of 13,000 papers, we reconstructed an 891-node network of academic favors. Its most central node is an obscure editor who handles reviews.',
    ideaSources: ['Writing the acknowledgments', 'Thanking the reviewers in a submission', 'A discussion of academic relationships'],
  },

  abstract_compression: {
    name: 'The Limits of Abstract Compression',
    description: 'Compress a paper down to 100 words while preserving its core contributions.',
    completionSummary: 'Top-venue papers can be compressed to 18% of their original length on average without losing their core contributions, but the limitations section disappears 98% of the time. This may not be a coincidence.',
    ideaSources: ['Abstracts are hard to write', 'Reviewers won’t read long papers', 'Losing it over word limits'],
  },

  // ── Long projects ───────────────────────────────────────────────────────

  procrastination_model: {
    name: 'Computational Modeling of Procrastination',
    description: 'Causal modeling and intervention experiments on how academics make procrastination decisions.',
    completionSummary: 'The computational model breaks procrastination into seven discrete decision points. The most critical one is “opened the document, then switched to watching a video” (38%).',
    ideaSources: ['A procrastinating student', 'A missed group meeting update', 'Graduation-season anxiety'],
  },

  lucky_shirt_causality: {
    name: 'Causal Inference on Lucky T-Shirts',
    description: 'Use randomized controlled trials to test whether wearing lucky clothing actually affects research output.',
    completionSummary: 'A double-blind trial found no significant effect of lucky clothing on research output (p=0.34), but 73% of participants said they would keep wearing theirs after the study ended.',
    ideaSources: ['A discussion of superstitions', 'Lucky objects', 'Lab mysticism'],
  },

  prompt_archaeology: {
    name: 'Prompt Archaeology',
    description: 'Infer how an LLM’s prompt design evolved over its training history from the way it behaves.',
    completionSummary: 'Through systematic elicitation tests, we reconstructed the evolution of 7 different system prompt versions from the GPT-3 era. The earliest version was worded very politely.',
    ideaSources: ['Weird LLM output', 'A student debugging an AI', 'A technical discussion'],
  },

  mediocre_paper_detector: {
    name: 'Junk Paper Detection System',
    description: 'Build a classifier that automatically identifies low-quality academic papers.',
    completionSummary: 'The classifier achieves an F1 of 0.87 on the test set, but when asked to classify its own analysis report, it returned “questionable” and requested human review.',
    ideaSources: ['A paper-quality controversy', 'A discussion of padded publication records', 'Complaints about reviewing workload'],
  },

  citation_bomb_defense: {
    name: 'Citation Bomb Defense',
    description: 'Detect and block coordinated mutual-citation rings in academia.',
    completionSummary: 'We identified and tracked 53 cases of citation manipulation. Participants’ average h-index rose by 3.2 as a result, and not one of them was sanctioned.',
    ideaSources: ['Citation-count anxiety', 'Competition with peers', 'An academic integrity discussion'],
  },

  defense_breakdown_predictor: {
    name: 'Predicting Thesis Defense Meltdowns',
    description: 'Predict the probability of an on-the-spot meltdown during a defense from physiological data.',
    completionSummary: 'Wearable data shows that in 87% of cases, heart-rate spikes and a shaky voice occur within 3 seconds of a committee member asking, “So about this ablation study…”',
    ideaSources: ['A student preparing for a defense', 'Peak graduation anxiety', 'Legends of failed defenses'],
  },

  academic_six_degrees: {
    name: 'Six Degrees of Academia',
    description: 'Compute the shortest collaboration path between any two researchers.',
    completionSummary: 'Across 2.2 million papers, the average distance between any two CS authors is 4.2, but between Turing Award winners it is only 1.8. They all know each other.',
    ideaSources: ['A literature review discovery', 'Analyzing academic connections', 'Meeting a big name at a conference'],
  },

  ai_review_alignment: {
    name: 'AI Reviewer Alignment',
    description: 'Train a model whose reviewing style precisely matches the historical acceptance preferences of top venues.',
    completionSummary: 'After RLHF training, the review model’s acceptance rate is within 2.1% of the target conference’s historical rate, but it gave perfect scores to papers from its own institution.',
    ideaSources: ['A discussion of review bias', 'The Reviewer 2 incident', 'Research on submission strategy'],
  },

  late_submission_effect: {
    name: 'The Late-Night Submission Effect',
    description: 'Investigate a hidden link between submission timestamps and paper acceptance rates.',
    completionSummary: 'An analysis of 80,000 submissions shows that papers submitted in the 5 minutes before midnight have a 6% higher acceptance rate than those submitted at normal hours. The effect holds across time zones, and the mechanism remains a mystery.',
    ideaSources: ['Submitting right at the deadline', 'Last-minute uploads', 'A discussion of submission-time superstitions'],
  },

  agent_sociology: {
    name: 'Agent Sociology',
    description: 'Study the division of labor, power structures and cultural norms that emerge on their own among large numbers of language agents over long-term interaction. The core question: when nothing is explicitly designed, what kind of social order does a population of agents converge to?',
    completionSummary: 'After 2,000 rounds of interaction, 200 agents spontaneously formed a clear hierarchy: a few took on coordination, most did execution, and about 3% got stuck in endless arguments. The pattern closely resembles a human committee, but the reviewers on the committee refused to accept this conclusion.',
    ideaSources: ['A multi-agent experiment', 'Testing an agent framework', 'Observing emergent behavior'],
  },

  dolphin_llm: {
    name: 'Dolphin Language Model',
    description: 'Build the first dolphin–human cross-species dialogue model.',
    completionSummary: 'After training on 280 hours of acoustic recordings, the model’s dialogue received an average rating of 3.7/5 from dolphins, and the researchers could not tell real dolphin vocalizations from generated ones.',
    ideaSources: ['The dolphin workshop', 'Something Theo found', 'A weird paper', 'An interdisciplinary discussion'],
  },

  spontaneous_coordination: {
    name: 'Silent Coordination Mechanisms',
    description: 'Study how groups spontaneously settle into stable coordination rules without anything written down: everyone waiting for the elevators on the left, fixed seats at group meeting, the default route through the dining hall. Nobody started them, but everyone follows them.',
    completionSummary: 'Long-term tracking of 21 campus settings shows that silent rules stabilize after an average of 7 repetitions and are significantly robust to one-off perturbations: even with a deliberate disruptor introduced, a rule usually reverts within two meetings.',
    ideaSources: ['Zoe’s elevator log', 'Group meeting seating observations'],
  },

};
