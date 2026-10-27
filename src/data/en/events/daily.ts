import type { EventTranslations } from '../../../types/i18n';

export const dailyEventsEn: EventTranslations = {

  gpu_oom: {
    title: 'CUDA Out of Memory',
    description: [
      '{studentName} walks in holding {his} laptop with the screen turned toward you, wearing an expression somewhere between “I’m fine” and “I’m not going to make it.” CUDA ran out of memory again. Not the first time, and probably not the last.',
      '“Batch size is already 1.” Having said this, {studentName} stares off at the wall, like someone who just paid for bottomless refills and realized they can’t drink another sip.',
    ],
    prompt: 'The GPU is OOMing again. What do you do?',
    options: {
      apply_gpu: {
        text: 'Request more GPU quota ($5K)',
        outcomes: [
          'Procurement takes a week, but the new GPUs finally arrive. That night, {studentName} messages you: the loss is going down. You stare at the screen, high-five yourself internally, and reply “good,” as if this were routine. The corners of your mouth give you away.',
        ],
      },
      gradient_accum: {
        text: 'Try gradient accumulation',
        outcomes: [
          'You spend ten minutes explaining how gradient accumulation works. {studentName} nods thoughtfully and goes back to change the config. It runs a bit slower, but the memory problem is solved. Sometimes the long way around is still a way.',
          'The gradient accumulation isn’t set up right. The accumulation steps are miscalculated, and the loss shoots straight into the sky, the curve tracing the outline of an erupting volcano. By the time {studentName} comes back to you, {his} face shows no expression at all.',
        ],
      },
      smaller_model: {
        text: 'Get it running on a smaller model first',
        outcomes: [
          'With a smaller model, the pipeline runs end to end, every component works, and the code itself is fine. {studentName} is hugely relieved. At least the bug isn’t in {his} own code, which for a grad student is a crucial psychological comfort.',
        ],
      },
    },
  },

  student_allnighter: {
    title: 'Still in the Group Chat at 3 a.m.',
    description: [
      'There’s a message in the lab group chat, timestamped 3:17 a.m., from {studentName}. It comes with a photo of handwritten equations, and the handwriting is still fairly neat, which means {he}’s still lucid. “Almost have it. Can you check if this is right?”',
      'You yawn, open your laptop, and wonder whether this is a sign of genius or an alarm that calls for intervention.',
    ],
    prompt: 'It’s 3 a.m. and {studentName} is still working out a derivation. How do you respond?',
    options: {
      stay_up_together: {
        text: 'Stay up and work through it with {him}',
        outcomes: [
          'You stay on a call until 4:30 and work the whole derivation out. {studentName} sends “So THAT’S how it works!!!” and you can tell {he} probably jumped out of {his} chair. The next day you oversleep and nearly miss a department meeting. Luckily, nothing of substance happened at it.',
        ],
      },
      send_home: {
        text: 'Tell {him} to get some sleep',
        outcomes: [
          'You message back telling {him} to rest; it’ll be clearer in the morning. {studentName} replies “Okay, thanks Prof!” with genuine relief. The next day {he} tells you that after waking up, the derivation took ten minutes.',
          'You message {studentName} to get some rest. The reply is just “ok”: zero exclamation marks, not even a period. It speaks volumes. {He} eventually finishes the derivation alone, but from then on there’s something in {studentName}’s eyes you can’t quite describe.',
        ],
      },
      check_deadline: {
        text: 'Check the deadline first',
        outcomes: [
          'You ask about the timeline. The next milestone is three weeks away. {studentName} goes quiet for a second, then sends “…”, followed by: “ok then I’m going to bed.” You can’t tell if {he}’s relieved or embarrassed, but {his} productivity the next day is a lot higher.',
        ],
      },
    },
  },

  lab_meeting_drama: {
    title: 'Group Meeting Gets a Little Awkward',
    description: [
      'Halfway through {studentName}’s update at group meeting, {student2Name} cuts in to point out a possible problem with the experimental design.',
      '{studentName} pauses, then says, “I think it’s fine,” a little stiffly. For a moment the air in the room freezes, and everyone suddenly becomes very absorbed in their laptop screens.',
    ],
    prompt: 'Group meeting just got awkward. How do you handle it?',
    options: {
      mediate: {
        text: 'Step in and smooth things over',
        outcomes: [
          'You take over the discussion, say both {studentName} and {student2Name} have a point, and suggest they each run a few more experiments and pick it up after the meeting. The tension deflates as if someone gently poked it, and things slowly go back to normal. Later, the two of them run into each other in the hallway and apologize privately.',
          'You smooth things over, and on the surface the meeting carries on. But you notice that every exchange between {studentName} and {student2Name} afterward is about 50% more polite than before. That kind of politeness has a name: polite distance.',
        ],
      },
      let_them_resolve: {
        text: 'Let them hash it out themselves',
        outcomes: [
          'You say, “Why don’t you two discuss it.” {studentName} and {student2Name} argue hard for ten minutes, citing papers at each other, drawing diagrams, writing equations, until {studentName} concedes a small design flaw. A consensus forged like that is ten times more solid than any ruling you could have handed down.',
          'You say, “Discuss.” {studentName} and {student2Name} turn to look at you in unison, then turn away in unison. For forty minutes, both of them stare at their screens, occasionally flipping a slide. The only sound is someone’s chair swiveling once. The moment the door closes, you faintly hear someone in the hallway let out a long breath.',
        ],
      },
      support_questioner: {
        text: 'Back {student2Name}’s objection',
        outcomes: [
          'You say {student2Name}’s objection is valid and ask {studentName} to give it serious thought. {studentName} nods, lips pressed together, clearly working hard to keep the indignation off {his} face. But at the next update, the experimental design is a full order of magnitude more rigorous, and {student2Name} says on the spot, “That’s airtight.”',
        ],
      },
    },
  },

  nan_loss: {
    title: 'The Loss Went NaN',
    description: [
      '{studentName} knocks on your door looking hollow, with the face of someone who rebooted the router three times in the middle of the night before discovering the internet had been cut off for an unpaid bill. “Prof, the loss went NaN.”',
      'Logs: checked. Stack trace: read. Learning rate: verified. A few random data samples: inspected. No cause found. You take a deep breath and begin to suspect this problem possesses some kind of metaphysical evil.',
    ],
    prompt: 'NaN loss. Your first move:',
    options: {
      rubber_duck: {
        text: 'Have {him} walk you through the code',
        outcomes: [
          'Three blocks in, {studentName} stops mid-sentence and makes a noise somewhere between “ah” and “oh” at nobody in particular: “I get it. The learning rate’s too high.”\n\nRubber duck debugging saves humanity once again. You didn’t say a word, and the problem is solved. The least effort you’ve put into answering a question all day.',
          'The walkthrough ends and you still haven’t found it. You debug together for a good while longer, checking every place you can think of, and finally find a numerical overflow hiding in a preprocessing step nobody had paid attention to.\n\n{studentName} stares at that line of code for a long time and says, “It was here the whole time.”',
        ],
      },
      gradient_clip: {
        text: 'Try adding gradient clipping',
        outcomes: [
          'Gradient clipping goes in, training stabilizes, and the loss obediently heads down. It treats the symptom, not the cause, but getting it running comes first. {studentName} breathes a sigh of relief and moves on with the experiments, planning to come back later and track down the root cause. {He} almost certainly won’t.',
          'With clipping on, the NaNs disappear, but now the loss is a flat line that won’t budge, as if expressing despair in a different format.\n\n{studentName} stares blankly at the curve for a while and asks, “Prof, is this worse?” You say, “Yes.”',
        ],
      },
      check_data: {
        text: 'Check the data for infs first',
        outcomes: [
          'Sure enough, a few samples contain infinite values, hiding quietly in the dataset and waiting for their moment.\n\nAfter cleaning, {studentName}’s training curve is as elegant as a textbook example.\n\nThis kind of bug is the hardest to find, but every time you find one, you get the satisfaction of a detective cracking a case.',
        ],
      },
    },
  },

  advisor_left_on_read: {
    title: 'A Study of Advisors Who Leave You on Read',
    description: [
      '{studentName} mysteriously sends you a screenshot of a paper.',
      'The title: “A Behavioral Dynamics Model of Advisors Leaving Students on Read: An Absurd Empirical Study of 156 Graduate Students.”',
      'The abstract is extremely formal and even includes r=0.87, p<0.001.',
      'The more you read, the more uneasy you feel, because several of the behavioral features seem highly correlated with you personally.',
    ],
    prompt: '{studentName} asks, “Prof, doesn’t this model have a lot of explanatory power?”',
    options: {
      laugh_it_off: {
        text: 'Pretend you don’t get it',
        outcomes: [
          'You reply: “Interesting topic, but the theoretical contribution needs further refinement.”\n\n{studentName} stares at the message for three minutes and replies: “Noted.”\n\nYou realize you may have just perfectly reproduced the paper’s “emotionally avoidant response.”',
        ],
      },
      serious_discussion: {
        text: 'Discuss the model seriously',
        outcomes: [
          'The two of you spend half an hour seriously discussing the “behavioral dynamics model of advisors leaving students on read.”\n\nBy the end, {studentName} proposes extending it into “a multi-agent game-theoretic model of PI email response delay.”\n\nYour instinct says this is absurd. But you also have a faint feeling it could make a workshop paper.\n\n💡 New idea: “A Multi-Agent Game-Theoretic Model of PI Email Latency” (saved to the Projects panel)',
        ],
      },
      promise_reply_faster: {
        text: 'Promise to reply faster from now on',
        outcomes: [
          'You solemnly promise to reply to messages faster from now on.\n\nThat night, {studentName} sends you three questions. The second one is 17 lines long. The third begins with “I have a quick idea.”\n\nYou stare at the chat window for a long time, and finally understand the complexity of silence as a social strategy.',
        ],
      },
    },
  },

};
