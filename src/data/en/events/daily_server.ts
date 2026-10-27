import type { EventTranslations } from '../../../types/i18n';

// English overlay for src/data/events/daily_server.ts (server/GPU/storage disasters).
export const dailyServerEventsEn: EventTranslations = {

  mystery_process: {
    title: 'What’s Running on 47% of the GPUs?',
    description: [
      'Three days now. A process has been quietly holding 47% of the GPUs on the server. It doesn’t even have a proper name, just a string of random characters, as if it were anonymous on purpose. Nobody in the lab has owned up. “Does anyone know whose process this is?” has been posted in the group chat twice and sunk without a trace: two “Seen” receipts, and two messages left hanging in the air that nobody is ever going to pick up.',
      'You open the monitoring dashboard and stare at the process for a while. It keeps running steadily at 98% GPU utilization, as if it had no idea it was causing a diplomatic incident. Everyone else’s training jobs have been pushed into the queue, and the shortest wait is four hours.',
    ],
    prompt: 'The mystery process has been running for 72 hours. You decide to…',
    options: {
      investigate: {
        text: 'Investigate and trace where it came from',
        outcomes: [
          'You go through syslog, read ~/.bash_history and cross-check every user’s recent logins until you finally trace the IP to one specific machine.\n\nThe evidence is conclusive and the murder weapon is in hand. All that’s left is the trial.',
          'After a full sweep, you find the process was launched with nohup, and the user who started it is a student who graduated three years ago. You stare at the username, twisting your pen cap off and back on. Either someone borrowed his account, or this server is haunted.\n\nEventually the process finishes and exits on its own. A mystery to the very end, no explanation left behind.',
        ],
      },
      ignore_it: {
        text: 'Pretend you didn’t see it and let it finish',
        outcomes: [
          'You adopt a policy of “strategic neglect.” The process finishes on day five, and the GPUs quietly return to the queue. Nobody confesses, nobody explains, life goes on.\n\nBut from that day on, the lab has an unwritten rule: process names must include your initials. Nobody ever proposed it out loud, but everyone started following it.',
          'Before it finishes, a second mystery process shows up, this one taking 61%.\n\nThe group chat gets its first emotional breakdown: “???????????????????” The sender unsends it immediately, but everyone saw it.',
        ],
      },
      anonymous_message: {
        text: 'Post an anonymous “Whose process is this?” in the group chat',
        outcomes: [
          'You post from an alt account: “There’s a process on the server using 47% of the GPUs, PID 23847, name xvfb_worker_7734. Would the owner please claim it.”\n\nA little while later, an “oh oh one sec” drifts into the chat, and the process disappears.',
          'The message goes out and gets three replies. First: “Not me.” Second: “Not me.” Third: “I’m waiting for GPUs too. It’s been two days.”\n\nThe process doesn’t go away and the mystery continues, but you have successfully upgraded the lab atmosphere from “everyone scrolls their phone and pretends not to see it” to “everyone actively pointing fingers at each other.”',
        ],
      },
    },
  },

  mystery_process_resolved: {
    title: 'The Truth Comes Out',
    description: [
      'The results are in. The owner of the process has surfaced: it’s {studentName}. As you stand in front of {him}, {his} expression is a complex blend: a little guilt, a little “busted,” and a little baffling technical pride.',
      'The process was training a Minecraft agent (“just a small experiment, it’ll be done soon”). It has been running for 144 hours, trying to teach an AI to mine diamonds from scratch. GPU utilization never dropped below 95%.\n\nThis is not a “small experiment.” This is an independent project with its own research agenda and a serious hole in its funding logic.',
    ],
    prompt: 'The Minecraft run has been going for six full days. You decide to…',
    options: {
      handle_kindly: {
        text: 'Be kind and let it go gently',
        outcomes: [
          '“Fine, I get it,” you say, a little hoarsely, and admit you took a few “strategic detours” of your own during your PhD. But from now on, any job using more than 10% of the GPUs has to be announced in the group chat, and anything running longer than 48 hours needs an explanation.\n\n{studentName} nods vigorously, guilt upgrading to gratitude. That same afternoon {he} posts an extremely detailed GPU usage notice in the chat, so detailed that the whole lab realizes someone paid a price for this rule.',
          'You tell {him} kindly that you understand, that you took a few “strategic detours” of your own during your PhD, but {he} needs to be careful from now on.\n\n{studentName} says {he} understands and nods like a bobblehead. But you get the faint sense that the part {studentName} actually remembered was “I took detours during my PhD too,” which got clipped down to “the professor is fine with it.”\n\nThree weeks later, the Minecraft agent has learned to farm wheat.',
        ],
      },
      lecture_sternly: {
        text: 'Give a stern lecture and lay down the law',
        outcomes: [
          'You make it clear: the shared server is a shared resource. Occupying it without notice blocks everyone’s workflow. This isn’t a technical issue, it’s a professionalism issue.\n\n{studentName}’s face goes through three phases: white → red → white again. For the next week, the whole lab requests every single GPU job in the chat with extreme politeness, formatted as rigorously as an ethics-review application.',
          'Your lecture is rigorous, logical and well supported. {studentName} listens carefully, apologizes sincerely, then goes back and posts a 2,000-word written self-reflection to the group chat, along with an AI-generated GPU usage schedule accurate to the minute.\n\nThe overreaction leaves you staring at that schedule for a long time, unsure whether to praise {him} or worry.',
        ],
      },
      pretend_never_found: {
        text: 'Pretend you never figured it out and quietly kill the process',
        outcomes: [
          'Late at night you quietly kill the process. The next day you casually post in the chat: “The mystery process is gone, source unknown. Please label your processes from now on.”\n\n{studentName} replies with a brief “ok.” You both know. From then on, whenever your eyes meet, there’s a complicated gentlemen’s agreement in the look.\n\nThe Minecraft agent is frozen at that moment forever. That AI never did learn to mine diamonds.',
        ],
      },
    },
  },

  server_day_1000: {
    title: 'Someone Ran apt upgrade',
    description: [
      'The lab’s main server has been up for 1,127 consecutive days without a reboot. It’s an unofficial honor. Nobody says it out loud, but everyone knows the number, and when it comes up in Slack people mention it in the tone usually reserved for world records. Today someone posted in the group chat: “Needed to update a dependency so I ran sudo apt-get upgrade, that should be fine, right?”',
      '“That should be fine, right?” sits in the chat, quietly burning like a fuse. The Linux kernel jumped from 5.4.0 to 6.8.12, the NVIDIA driver is three major versions off, the CUDA toolkit updated itself, and this server hosts the experiment environments of eleven people. A 1,127-day record, ended by one afternoon of blissful ignorance.',
    ],
    prompt: 'The upgrade has finished and the server is rebooting. You choose to…',
    options: {
      pray: {
        text: 'Put your hands together and pray it comes back',
        outcomes: [
          'The server reboots. The CUDA driver takes a good while to reload, nvidia-smi prints a warning you’ve never seen before, and then, miraculously, lists every GPU. All the conda environments are alive. The loss curves can run again.\n\nYou post “Reboot successful,” and the chat erupts in cheers with four exclamation points. You held on to your coffee mug the entire time, and only now notice the coffee has gone cold.',
          'The server reboots and stops at an initramfs prompt. This is a Unix form of death: it got halfway through booting and then forgot how to go on living.\n\nYou spend most of the day dragging it back through rescue mode. Along the way the driver crashes once, the filesystem goes read-only once, and one mount point vanishes entirely. It lives in the end, but your uptime is back to zero, and the legend is over.',
        ],
      },
      rollback: {
        text: 'Emergency rollback: downgrade the kernel',
        outcomes: [
          'You manually pick the old kernel in GRUB and hold your breath as you hit Enter. The server comes up the way it always has. nvidia-smi prints that reassuring list of GPUs. Everything is as it was.\n\nYou lock down apt’s automatic updates for good, then add a bold warning to the wiki: “Running apt upgrade on the production server is strictly forbidden. Violators bear full responsibility for the consequences.” Whoever ran the upgrade is buying the whole lab bubble tea.',
          'The rollback fails. The update script overwrote the old kernel’s GRUB entry. You are now facing a server running a brand-new kernel that doesn’t recognize its own drivers, and the long manual repair begins.\n\nSo ends the 1,127-day legend. Late that night you message all the students: “The server probably won’t be usable tomorrow.” The message just sits there, delivered and unread, and for a long while nobody says anything.',
        ],
      },
      accept_fate: {
        text: 'Philosophically accept your fate and wait',
        outcomes: [
          'You post: “It’s updated, so it’s updated. We wait for the reboot. If it lives, great. If not, we fix it.” Someone replies “…”, and someone else posts a sticker of someone bowing down in prayer.\n\nThe server lives in the end, but the reboot takes nineteen minutes, and for those nineteen minutes nobody in the lab says a word. Everyone just stares at their own screen and waits. 1,127 days of uptime, gone to zero just like that, and the faces in front of those screens carry the hard-to-name heaviness of people watching an era end.',
          'You post that you’ll wait for the reboot, then go get a glass of water. When you come back, someone has already posted a complete “Server Death Contingency Plan” doc in the chat, including backup locations, a temporary migration plan and SSH keys for three standby servers.\n\nSo everyone had been carrying a version of this doc around in their head all along. They just never mentioned it. The server lives in the end, and the doc goes into the lab’s Confluence, the sole positive legacy of the whole affair.',
        ],
      },
    },
  },

  storage_crisis: {
    title: 'Disk at 99.3%',
    description: [
      'The storage alarm goes off: /data is 99.3% full, with 14 GB left. At last week’s write rate, that’s less than eighteen hours. Within ten minutes the group chat goes from zero to forty-three messages, which fall roughly into three categories: insisting that one’s own files are “all important, can’t delete,” hinting that other people’s checkpoints “could use some cleaning up,” and one standalone “who is running what???”',
      'df -h shows that the largest directory is /data/checkpoints, home to model weights from the past three years, 1.2 TB in total, most of it the legacy of “let’s keep it for now, might need it later.” Nobody wants to be the first to touch it.',
    ],
    prompt: 'The disk is about to burst and the finger-pointing is underway. You decide to…',
    options: {
      enforce_quota: {
        text: 'Enforce a hard quota: 100 GB per person',
        outcomes: [
          'You announce: effective immediately, everyone gets a 100 GB quota on /data. Anything over the limit must be dealt with within 72 hours, or the system automatically archives it to cold storage. The first reply is a single period. Three minutes later someone asks “do checkpoints count?” You say yes.\n\nThe next two days bring a lab-wide philosophical reckoning: which weight files are “truly needed,” and which are just emotional support. In the end 700 GB gets cleared and disk usage drops to 58%. The cost: three people come to see you one-on-one about whether they could “apply for a little extra space.”',
          'You announce the quota. Some people start cleaning up right away. Someone else, one hour before the three-day deadline, tars up their whole directory and stashes it in a corner of the filesystem nobody visits, technically complying with the rule.\n\nDisk usage drops to 74%. It’s barely alive, and the problem has been postponed by three months.',
        ],
      },
      buy_storage: {
        text: 'Buy a new drive and be done with it (costs $3K)',
        outcomes: [
          'You spend $3K on an 8 TB NAS and mount it. The percentage in df -h instantly drops to 12%. The chat erupts in cheers. Nobody cleaned up anything, nobody set up any rules, and the checkpoint files keep growing at 50 GB a week.\n\nThe next crisis already has a slot booked on the calendar, roughly eleven months from now. But that’s a problem for the future.',
          'You buy the drive, and when you go to mount it, you find the filesystem format is incompatible. Reformatting eats another morning. In the meantime /data actually fills up, and three people’s training jobs crash with “no space left on device.”\n\nThe drive gets mounted eventually, but today’s casualties can’t be undone.',
        ],
      },
      checkpoint_amnesty: {
        text: 'Declare an amnesty: 48 hours to clean up checkpoints voluntarily',
        outcomes: [
          'You declare a “Checkpoint Amnesty”: anything voluntarily deleted within 48 hours will not be traced back to its owner, and after that, account-by-account audits begin. The wording is cleverly designed: “will not be traced” implies “I was going to trace it.”\n\nWithin 48 hours, 430 GB is freed, and a strange lightness settles over the lab, like a collective Marie Kondo session. Usage drops to 63%. A passing grade.',
          'You declare the amnesty and wait. 48 hours later, the disk has freed up… 37 GB. Everyone “cleaned up a bit,” but deep down each of them believes their own checkpoints are the true scientific legacy.\n\nYou sigh and begin pondering the philosophical question of whether to lay down the law or buy a hard drive.',
        ],
      },
    },
  },

  pip_nuclear: {
    title: 'The pip install Massacre',
    description: [
      'This morning, someone ran pip install transformers==4.42.0 directly on the server without activating any virtual environment. pip happily installed it into /usr/local/lib/python3.10 and updated numpy, scipy and torch along the way, resolving a whole batch of “version conflicts.” Its resolution strategy was to upgrade every incompatible package at once.',
      'By the afternoon, import errors start rolling in. Someone’s torch can’t find CUDA, someone’s numpy is throwing API change warnings, and someone’s entire pipeline dies at the very first import. The chat gradually evolves from “does anyone know what’s going on?” to “I can’t run anything right now.”',
    ],
    prompt: 'Every pip environment in the lab has been wiped out. You decide to…',
    options: {
      rebuild_all: {
        text: 'Tear it all down and rebuild from requirements.txt',
        outcomes: [
          'You spend an afternoon writing a complete environment.yml with every key package pinned, then tell the whole lab to rebuild their conda environments. During the rebuild, you discover that the “same environment” everyone had been using actually varied to a staggering degree: some people were on torch 1.13, others on 2.3, and all of them believed they were running the same experiments.\n\nOnce the new environments are built, the versions are unified. One small blot on the lab’s history, traded for consistency going forward.',
          'You organize the rebuild and discover that everyone’s requirements.txt is a snapshot from a different era, in a different state. Some people have one, some don’t, and one was last updated in 2022.\n\nIt takes two full days to get everyone back to running code normally. For those two days, the whole lab’s research grinds to a halt, like a machine someone unplugged.',
        ],
      },
      find_culprit: {
        text: 'First, find out who did it',
        outcomes: [
          'You dig through pip’s install logs and find the timestamp and username. The culprit is in class when your message arrives, and replies afterward: “I thought that environment was just mine.” This is technically correct and, logically, a complete root cause analysis of the incident.\n\nYou drop the matter. Instead, you install pipenv on the server and write a two-page “Shared Server Usage Guidelines,” which becomes the incident’s legacy.',
          'You check the logs and find that the account matching the timestamp is yours. Last week, while helping someone debug, you installed a package in that session without noticing you were no longer in the venv.\n\nYou quietly close the investigation window, turn around and announce: “Cause unknown. Everyone please rebuild your environments.” You carry this one in silence for a long time.',
        ],
      },
      accept_chaos: {
        text: 'Embrace the chaos. If it runs, it runs',
        outcomes: [
          'You post: “Dependencies got updated. If something’s broken, fix it yourself with pip install --upgrade, and use conda for new packages.” For the next week, fresh dependency conflicts pop up in the lab every day. Everyone solves their own problems independently and, in the process, accidentally builds up a respectable amount of hands-on package management experience.\n\nResearch is delayed, but everyone’s engineering skills have grown, which counts as a blessing in disguise, in a sense.',
        ],
      },
    },
  },

  midnight_maintenance: {
    title: 'IT Is Rebooting the Server at 2 a.m.',
    description: [
      'At 11:02 p.m., IT sends an email with the subject line “[NOTICE] Scheduled Maintenance: Reboot Tonight at 02:00.” The body is three lines long and breezy, as if announcing something perfectly normal. And to be fair, on a normal human schedule, 2 a.m. is for sleeping, and a server reboot affects no one.',
      'But two people in the lab have training jobs running, at hour 41 and hour 43 respectively, both aiming to finish at 48. The last checkpoint was saved 12 hours ago. The first response in the chat is a brief silence, followed by a flood of messages, all different in wording and identical in emotional direction.',
    ],
    prompt: 'Three hours until IT reboots. You decide to…',
    options: {
      beg_it: {
        text: 'Beg IT, fast: can it wait until tomorrow?',
        outcomes: [
          'At 11:15 p.m. you send an email with “URGENT” in the subject line. The body lays out both jobs in detail (hours elapsed, progress, checkpoint status), written like a technical incident report. IT replies at 11:51: the reboot can be pushed to 4 p.m. tomorrow.\n\nYou screenshot the reply and post it in the chat, which fills with “Thank you Professor!!!” Thanks like this, for something that actually helped, are one of the small gifts that come with being an advisor now and then.',
          'You send the email and get no reply. At 1:58 a.m., the server reboots anyway, killing every process.\n\nThe next day IT replies: “Sorry, it had already started and couldn’t be stopped midway,” then asks, “Is there anything else I can help you with?” You reply “No, that’s all, thanks,” in a carefully restrained tone.',
        ],
      },
      save_checkpoints: {
        text: 'Rally the lab: save whatever you can',
        outcomes: [
          'You post an urgent notice in the chat. The two of them immediately patch checkpoint-saving logic into their training scripts and finish saving at 1:47 a.m., 13 minutes before the reboot. The damage shrinks from “restart from 12 hours ago” to “restart from 1 hour ago.”\n\nAfterward, the whole lab updates its training script template to include automatic timed checkpoints, every two hours. A reasonably priced lesson.',
          'You tell everyone to scramble and save checkpoints, but the training script is written in a rather hardcore way: checkpoint saving only triggers at the end of an epoch, and the current epoch won’t finish until 4 a.m.\n\nEveryone watches helplessly as the clock ticks to 1:59:50, and then the connection drops. The next morning someone posts “rerunning.” With a period. That’s it. Not another word.',
        ],
      },
      accept_with_dignity: {
        text: 'Accept fate and take the loss gracefully',
        outcomes: [
          'You post: “The reboot can’t be avoided. Tonight’s training will be interrupted, and we’ll just rerun. Remember to add timed checkpoints to your scripts next time.” The two people with running jobs reply “ok” and a thumbs-up, respectively. No question marks, no exclamation points. They’ve probably been through this enough times that their hands no longer shake when they type.\n\nAt 2 a.m. sharp, the server reboots. Everyone in the lab is asleep. The only trace is one more successful entry in IT’s maintenance log.',
        ],
      },
    },
  },

  crypto_tenant: {
    title: 'The Tenant Who Lived Rent-Free for Two Months',
    description: [
      'IT Security sends over a report titled “Anomalous Compute Resource Usage Alert.” It shows that for the past 61 days, the lab server has been keeping up encrypted connections to an IP in Eastern Europe, with compute behavior closely matching a cryptocurrency miner, using an estimated 12% of the lab’s GPU capacity.',
      'You slowly recall a few times over the past two months when training did seem a bit slower than expected. At the time, the conclusion was “maybe the batch size is off” or “the server’s been under some load lately.” Now all those “maybes” have a single explanation. 61 days, 12% of the compute. You do some quick mental math, then check it again, because the first result felt a little detached from reality.',
    ],
    prompt: 'A miner has been running on your server for two months. You decide to…',
    options: {
      report_authorities: {
        text: 'Report it to the university and go by the book',
        outcomes: [
          'You file a security incident report with IT’s analysis attached. The university’s security office kicks off the standard procedure: take the server offline for inspection, run vulnerability scans, do log forensics. It takes five business days, during which the lab can’t use the server at all.\n\nAfter the fix, IT sends you a thank-you note: “Thank you for reporting promptly. You helped us discover an unpatched vulnerability with a known CVE.” That vulnerability had been sitting on the patch list for four months.',
          'The report is filed, the process starts, and then it falls asleep on some department’s to-do list. Two weeks later you email to ask about progress and get back “We are following up.” The server keeps running. The miner process has disappeared, probably because whoever was behind it realized they’d been found out and withdrew.\n\nThe university eventually sends you a closing email, “Resolved, thank you for your cooperation,” with no details whatsoever.',
        ],
      },
      patch_and_move_on: {
        text: 'Patch it, clean it up, keep it quiet',
        outcomes: [
          'Together with IT, you close the exposed port, kill the mining process, apply every security patch and reboot the server.\n\nThe next day, GPU utilization jumps up like a kid whose homework load just got cut. Everyone says, “The server’s so fast today.” You say, “Did a little maintenance,” and leave it at that.',
          'You kill the process, apply the patches and assume all is well. Two days later, IT sends a second report: same IP, different port, the miner is back online, because one child process was missed during cleanup.\n\nThis time you report it to the university, and inwardly you give the persistent miner author a grudging, low-scoring nod of technical respect.',
        ],
      },
      calculate_damage: {
        text: 'First, work out how much money you lost',
        outcomes: [
          'You put together a full damage estimate: 61 days × 12% of compute × 8 A100s × on-demand cloud rental rates ≈ $8,800. You share the number with the lab. For a while nobody responds. Then someone writes: “Professor, that’s more than my stipend for a year.”\n\nYou then report it to the university, using the figure as a footnote on how serious the incident is. Once the security office sees the number, their response time noticeably improves.',
        ],
      },
    },
  },

  conda_three_envs: {
    title: 'Three lab_envs on the Server',
    description: [
      'conda env list outputs the following: lab_env, lab_env_v2, lab_env_new. Three environments, no documentation, no version notes, created fourteen, eleven and eight months ago respectively. lab_env_new was a “temporary” one, and the line at the time was “I’ll just use it once and delete it.”',
      'You ask everyone which one they use and get three different answers. Worse, nobody can explain how the three actually differ. The only certainty is that each has a different version of transformers installed, and at least one contains a mysterious package called fix_cuda_bug, origin unknown. Uninstall it and everything breaks.',
    ],
    prompt: 'Three conda environments, each a law unto itself. You decide to…',
    options: {
      nuclear_option: {
        text: 'Nuke it: delete everything and start over',
        outcomes: [
          'You post a notice: all three old environments will be deleted this Friday and replaced by a new lab_env_2024 with a pinned requirements.txt. If you need anything, speak up now. Two days later, someone comes to tell you there’s a package in the old environment he hacked up himself, and asks if he can back it up. You ask which package. He says he forgot.\n\nThe nuke goes off on schedule. The new environment is ready Friday afternoon, neat and clean, like a brand-new lab.',
          'You drop the nuke, delete all three environments and build a new one. The next day someone comes to say his experiment script errors out in the new environment. You trace it to a legacy dependency from three years ago whose version has vanished from PyPI.\n\nYou spend a morning digging up an equivalent replacement on conda-forge, feeling like you’re on an archaeological dig. The new environment works in the end, but at a cost: everyone in the lab now realizes that those three messy environments were each holding up a different set of historical ruins.',
        ],
      },
      archaeology: {
        text: 'Do some archaeology: why do these environments even exist?',
        outcomes: [
          'You spend an afternoon running pip list on all three environments and comparing them. lab_env is the stable “works, but old versions” one. lab_env_v2 is the intermediate state left behind when someone upgraded torch and broke things along the way. lab_env_new is the temporary version built to fix lab_env_v2, which fixed the torch problem and introduced a new CUDA compatibility problem.\n\nYou write the whole history up as a two-page document and put it on the lab wiki. After reading it, everyone develops a strange sense of understanding and sympathy toward the three environments.',
          'You start digging and find the differences run much deeper than expected. One environment has a local package called fix_cuda_compat_v3, a hand-written patch a since-graduated student made two years ago to fix one specific bug, with zero documentation. It is the only thing in any of the three environments that lets a certain old experiment run.\n\nYou stare at the package name for a while, quietly back it up separately, and then decide to keep using the three messy environments after all. At least they’re stable.',
        ],
      },
      create_fourth: {
        text: 'Start fresh: the fourth one is the real one',
        outcomes: [
          'You announce a new lab_env_official: the official version, with documentation and a requirements.txt pinning every key version. Three days after the announcement, conda env list shows four entries. Next to lab_env_official, the three old environments sit untouched.\n\nEveryone keeps taking a wait-and-see approach to “migrating to the new environment,” the reason being “once this experiment finishes,” and that experiment seems to be permanently “almost done.”',
        ],
      },
    },
  },

  permission_denied: {
    title: 'Permissions Gone on Monday Morning',
    description: [
      'At 9 a.m. on Monday, messages start pouring into the chat: “my home directory is read-only,” “ls -la shows everything as 444,” “I can’t even write my own files.” You try it yourself and confirm it: every directory under /home has lost its write permissions, and even creating a file gives you permission denied.',
      'IT’s reply arrives forty minutes later: “A permissions system update is in progress. Access is expected to be restored within the week. In the meantime, we recommend working in /tmp.” Today is Monday.',
    ],
    prompt: 'Home directories are read-only and IT says “within the week.” You decide to…',
    options: {
      work_from_tmp: {
        text: 'Do as IT says: everyone works in /tmp',
        outcomes: [
          'The whole lab migrates to /tmp. Within a day, /tmp has seven subdirectories named after users, plus three vaguely named ones (temp_work, work_backup, work_real) whose ownership is unclear. That afternoon someone discovers that the system wipes /tmp on a schedule, so people start running rsync on a schedule.\n\nThe next day IT restores permissions ahead of time, but the /tmp directory structure is already so tangled that nobody wants to clean it up. It just stays there, another kind of historical ruin.',
          'The whole lab moves to /tmp. At 2 p.m., /tmp is full. The /tmp partition on this server is only 20 GB, and someone had been writing experiment output to it.\n\nNew error: “no space left on device.” The location has moved from /data to /tmp, and everything else is the same. In engineering, this is known as trading one problem for another.',
        ],
      },
      escalate_it: {
        text: 'Escalate to IT management, politely but firmly',
        outcomes: [
          'You email the IT manager with the number of affected users (11), an estimate of research hours lost per day (about 82) and a precise timeline of the permission loss. The wording is objective, the data thorough, the tone free of any emotion, and the facts alone carry plenty of weight. The IT manager replies within two hours, saying permissions will be restored by 3 p.m.\n\nAt 3:07 p.m., the home directories come back. Students in the lab later screenshot the email and keep it as a model of “how to communicate effectively with IT.”',
          'You escalate. The IT manager replies: “We are coordinating internally.” Another day passes and permissions are still read-only, but you do receive a very formally worded apology explaining the technical cause and promising a fix by 10 a.m. Wednesday.\n\nAt 11 a.m. Wednesday, it’s fixed. That’s much faster than “within the week,” but an hour later than you expected.',
        ],
      },
      write_instead: {
        text: 'Accept fate, kick back and write',
        outcomes: [
          'You post: “Home directories are read-only today, so editing code is a pain. Good chance to tidy up docs, work on papers and catch up on reading.” Unexpectedly, the lab’s writing output that week is the highest it’s been all month. With no code to run, the long-overdue related work finally gets written.\n\nOne student says, “Professor, you could actually shut the server off one day a week.” You don’t comment on the suggestion, but you file it away.',
        ],
      },
    },
  },

  accidental_delete: {
    title: 'rm -rf in the Wrong Directory',
    description: [
      '{studentName} knocks on your door. The door is open, but {he} knocks anyway, and that detail alone tells you something. {He} comes in and stays standing instead of sitting down, wearing the specific expression of someone about to say something they know is serious: lips slightly pressed, eyes drifting a little, a small throat-clear before speaking, as if running each word through a sieve before letting it out.',
      '“Professor, I… ran rm -rf in the wrong directory.” A pause, then: “It was my experiments folder under /data/results.” That directory held three months of experiment results: 47 complete training runs, the matching log files, the baseline comparison data, and the very files the two of you agreed in group meeting two weeks ago were “really important.”',
    ],
    prompt: '{studentName}’s three months of data are gone. You decide to…',
    options: {
      data_recovery: {
        text: 'Try data recovery. It’s worth a shot',
        outcomes: [
          'You tell {studentName} to stop all writes to that disk immediately, then start scanning for leftover inodes with extundelete. After three hours of scanning, you recover about 60% of the files. Most logs are intact and some checkpoint files are corrupted, but almost all of the crucial baseline comparison data is back.\n\n{studentName} stares at the list of recovered files, scrolling up and down several times. About forty seconds later {he} looks up and says, “Thank you, Professor,” {his} voice a little hoarse. You don’t say anything, but the thank-you message {he} sends afterward stays in your inbox, unarchived, for a long time.',
          'You try data recovery. Four hours of disk scanning, and extundelete returns a batch of files, but most of them have already been overwritten: that partition is a hot disk, with new data written to it every day for the past three months. In the end, only 7 complete files come back, and none of them are the key runs.\n\n{studentName}’s expression travels a full arc from “we found some” to “but not enough,” finally landing on “I need to rerun it.” {He} says it as if exhaling the full weight of those three months.',
        ],
      },
      support_student: {
        text: 'The data’s gone. Comfort {studentName} first',
        outcomes: [
          'You have {studentName} sit down and say, “Data can be rerun. The method isn’t lost, and everything you learned in these three months is still there.” After a pause you add, “Plus, you’ll be much faster the second time, because now you know which paths are dead ends.”\n\n{studentName} nods, still looking deflated, but at least in a state where {he} can keep going. Sometimes that’s enough.',
        ],
      },
      backup_policy: {
        text: 'Better late than never: set up backups now',
        outcomes: [
          'That same evening you write a lab backup policy: every results directory syncs automatically to the NAS once a week, the training script template checks results paths against a whitelist, and rm requires a forced confirmation.\n\n{studentName}’s data can’t be recovered, but from that day on, the policy protects every future experiment in the lab.\n\nSix months later, when someone else nearly makes the same mistake, the system pops up that validation prompt, and in that moment everyone silently remembers this day.',
          'You set up the backup policy. The auto-sync script is written the same day, and the first sync runs successfully.\n\nThen you discover a directory in /data/results called test_dont_backup_this, holding about 300 GB of “temporary files” from four people, including a single 127 GB file named final_final_FINAL_v3_use_this.pt.\n\nThe backup policy is in effect, but you stare at that directory’s naming for a good while, silently cursing every one of them, then calmly close the terminal as if nothing happened.',
        ],
      },
    },
  },

  training_power_outage: {
    title: 'Power Outage at Hour 47',
    description: [
      'This afternoon the building lost power. Reportedly, construction next door cut through a cable. Details to follow. Details did not follow.',
      'The lab’s main server was in the middle of a 48-hour training run, at 47 hours and 12 minutes. The last checkpoint was saved at hour 12. That’s 35 hours of training progress lost, which at 8 A100s comes to roughly $1,400 in cloud compute, gone. The outage also took down two other debugging jobs in the lab, but those are comparatively minor.',
    ],
    prompt: '35 hours of training reset to zero at hour 47. You decide to…',
    options: {
      laugh_about_it: {
        text: 'Laugh it off and accept the randomness of the universe',
        outcomes: [
          'You post: “Power went out, the training run lost 35 hours, we’ll rerun it, and this time remember to add checkpoints. Anyone free this afternoon, come by and let’s talk about fixing the scripts.” Not a single exclamation point. The wording is as clean as an announcement, because you really have seen this many times, and the excitable words wore off long ago.\n\nFive people show up that afternoon. They write a general-purpose checkpoint wrapper and refactor the training pipeline while they’re at it, which comes out about half as cluttered as before. Sometimes a disaster is an excuse to refactor.',
          'You post “haha.” Someone replies “hahaha” three times over, then the typing bubbles disappear and nothing new shows up for a long time.\n\nFrom then on, the lab has an unwritten understanding: when someone posts “haha” in the chat with no explanation, things are not that fine. This semantic convention dates from today.',
        ],
      },
      buy_ups: {
        text: 'Buy a UPS, buy peace of mind (costs $2K)',
        outcomes: [
          'That afternoon you contact an equipment vendor. Three days later, an APC SUA3000RMi2U UPS rated at 3000 VA is installed beneath the server rack. Test run: simulated power cut, the server switches over smoothly and keeps running, with about 20 minutes of battery life.\n\nTwo months later the building loses power again, this time for seven minutes, and the training run doesn’t lose a thing. You post in the chat: “The UPS has paid for itself.” $2K for lasting peace of mind. A good deal.',
          'You buy the UPS, install it, it passes the test, and you’re satisfied. Two weeks later, during normal use, it suddenly lets out an unsettling beep and enters self-test mode. The self-test lasts four hours, during which the server stays remarkably stable under the UPS’s “Testing” status.\n\nThe manual says this is a normal calibration routine that runs every three months and lasts 2–6 hours, and recommends keeping “external power available” during that time. This is slightly at odds with why you bought it in the first place, which was to protect against power loss.',
        ],
      },
      checkpoint_rule: {
        text: 'Make it law: checkpoint every two hours, or be sacrificed to the gods',
        outcomes: [
          'You announce a new rule: every training script must save a checkpoint at least every two hours, and scripts that don’t comply can’t be submitted to the server. You also provide a template wrapper that plugs into any training loop in three lines of code.\n\nThis outage cost 35 hours, but from now on the rule caps any future accidental loss at 2 hours. It’s the most valuable decision of the day, even though it can’t bring back the $1,400 that already vanished.',
          'You announce the checkpoint rule and provide the wrapper template. Everyone says great, everyone says they’ll use it. Two weeks later, someone submits a new training script that does include checkpoint logic, saving once every 24 hours.\n\nYou decide not to quibble over the 22-hour gap between “2 hours” and “24 hours.” Something beats nothing, and this person’s disk probably can’t hold that many checkpoints anyway.',
        ],
      },
    },
  },

  disk_full_silent: {
    title: 'The Disk Filled Up Six Days Ago',
    description: [
      'This morning, someone checking experiment results notices something strange: the output files are all 0 bytes. Not just one. Every output file from every experiment in the last six days, all zero bytes, all opening just fine, all completely empty.',
      'The investigation reveals that /data quietly filled up six days ago. Writes returned ENOSPC, but none of the training scripts handled the error. They just kept running silently, and everything looked “normal”: training loss kept dropping, progress bars kept moving, logs kept scrolling. Only the output files had nothing in them. Six days, 11 experiments, every result written to the moral equivalent of /dev/null. The disk was full, and it was as if nothing had happened.',
    ],
    prompt: 'Six days of experiment results were never saved. You decide to…',
    options: {
      try_recovery: {
        text: 'Log archaeology: salvage what you can',
        outcomes: [
          'You have everyone check their TensorBoard logs. That monitoring data was written in real time to a separate log server, which mounts a different partition, so it wasn’t affected. From TensorBoard you can read off training curves, key metrics and some hyperparameter records. Not the full results, but enough to rebuild 80% of the data points.\n\nOne student says, “Oh, so TensorBoard isn’t just for decoration,” which makes you realize the way you’ve been promoting monitoring tools may need some work.',
          'You try every recovery approach: checking TensorBoard, digging through stdout logs, looking at the training scripts’ print output. Some scattered data comes back, but the full conclusions can’t be reconstructed, and three key control experiments left no record at all.\n\nIn the history of your research, these six days are like a passage someone erased. You can rewrite it, but you’ll never know what it originally said.',
        ],
      },
      start_over: {
        text: 'Accept it and rerun as if nothing happened',
        outcomes: [
          'You clear disk space and tell everyone to resubmit their experiments. Someone says, “So those six days were for nothing?” You say, “At least we confirmed the GPUs work.” It isn’t a useful thing to say, but it’s something that lets people keep going, and sometimes that’s all that’s needed.\n\nThe experiments are back in the queue that same day. The lab’s mood is like a system after a forced reboot: some programs are loading slowly, but overall it’s still running.',
        ],
      },
      implement_monitoring: {
        text: 'Set up monitoring. Learn from the pain',
        outcomes: [
          'You configure Prometheus + Alertmanager with three tiers of disk alerts: a warning at 80%, an orange alert at 90%, and a text message at 95%. You also add a pre-write disk space check to every training script template, so failed writes raise an explicit exception instead of silently carrying on. Final step: you write a one-line note explaining ENOSPC and add it to the lab’s onboarding doc.\n\nIt all takes an afternoon, but what it changes is the reliability floor for every future experiment.',
          'You set up monitoring with an alert email at 80%. Three days later, the first alert lands in your inbox: “Disk usage has reached 81%.” This is because after you cleared the disk, everyone resubmitted all their experiments, and six days’ worth of reruns produced a mountain of output.\n\nThe alert system works perfectly, successfully notifying you that the disk is nearly full again. It is a mildly deflating kind of success.',
        ],
      },
    },
  },

};
