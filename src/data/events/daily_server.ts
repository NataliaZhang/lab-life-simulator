/**
 * 服务器灾难事件 — GPU/存储/环境崩溃专区
 *
 * 这里的事件面向整个实验室，不应 hardcode 特定学生 ID。
 * 需要绑定特定学生的事件使用 triggerConditions: anyStudent + {studentName} 占位符。
 */

import type { GameEvent } from '../../types';



export const serverEvents: Record<string, GameEvent> = {

  mystery_process: {
    id: 'mystery_process',
    title: '47%的显卡在跑什么？',
    description: [
      '三天了。服务器上有一个进程静悄悄地占着47%的GPU，连名字都没有，进程名是一串随机字符，像是刻意匿名的。组里没有任何人承认。群里发了两次"有人知道这是谁的进程吗"，石沉大海，只有两个"已读"气泡和两条悬在空气里再也没有人接的消息。',
      '你打开监控面板盯着那个进程看了好一会儿。它仍在稳定运行，GPU利用率98%，像是丝毫不知道自己正在引发外交风波。组里其他人的训练任务已经被挤到排队，最短的等待队列是四个小时。',
    ],
    prompt: '神秘进程已运行72小时，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'investigate',
        text: '深入调查，追查进程来源',
        energyCost: 15,
        outcomes: [
          {
            weight: 2,
            narrative: '你翻了syslog、看了~/.bash_history、核对了所有用户最近的登录记录，终于将IP追溯到一台具体的机器。\n\n证据确凿，凶器在手，现在需要做的是开庭审理。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
            nextEventIds: ['mystery_process_resolved'],
          },
          {
            weight: 1,
            narrative: '你查了一圈，发现那个进程是用nohup跑的，启动用户被设成了一个三年前已经毕业的同学。你盯着那个用户名，把笔盖拧了拧又拧回去，要么有人借了他的账号，要么这台服务器上有游魂。\n\n最终进程自己跑完退出了，神秘到底，不留任何解释。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'ignore_it',
        text: '当没看见，等它自己跑完',
        outcomes: [
          {
            weight: 2,
            narrative: '你决定采取"战略忽视"策略。进程在第五天跑完了，GPU安静地归还给了队列。没有人承认，没有人解释，生活继续。\n\n但群里从那天起多了一条不成文的规定：进程名必须包含自己的名字缩写，没有人公开提出这条规定，但大家都开始遵守了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '进程还没跑完，又多了一个新的神秘进程，这次占了61%。\n\n群里出现了第一条情绪崩溃的消息："???????????????????"，发消息的人随后立刻撤回了，但每个人都看见了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'projectProgress', delta: -4},
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'anonymous_message',
        text: '发一条匿名群消息"请问这是谁的进程"',
        outcomes: [
          {
            weight: 2,
            narrative: '你用另一个账号发了条消息："服务器上有个进程占着47%的GPU，PID 23847，进程名 xvfb_worker_7734，请主人认领。"\n\n等了一会儿，群里飘来一条"哦哦马上"，然后进程消失了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '消息发出去了，收到了三条回复。第一条："不是我。" 第二条："不是我。" 第三条："我也在等GPU，都等两天了。"\n\n进程没有消失，神秘仍在继续，但你成功地把实验室氛围从"各自刷手机装没看见"升级到了"主动互相指认"。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  mystery_process_resolved: {
    id: 'mystery_process_resolved',
    title: '真相大白',
    description: [
      '调查结果出来了。那个进程的主人浮出水面——是{studentName}。你站在对方面前，{studentName}的表情是一种复杂的混合体：有一点点愧疚，有一点点"被发现了"，还有一点点令人费解的技术性自豪感。',
      '原来那个进程在训练一个Minecraft智能体——"只是个小实验，很快就好"——已经运行了144小时，正在尝试教一个AI从零开始学习挖钻石。GPU利用率从未低于95%。\n\n这不是"小实验"，这是一个有完整课题、有经费逻辑漏洞的独立项目。',
    ],
    prompt: 'Minecraft训练任务已跑满6天，你决定',
    options: [
      {
        id: 'handle_kindly',
        text: '好言好语，轻轻放下',
        outcomes: [
          {
            weight: 2,
            narrative: '你哑声说了句"行吧，我理解"，说你自己读博的时候也有过类似的"战略性绕路"。但今后使用超过10%显卡资源的任务必须在群里通知，超过48小时要有说明。\n\n{studentName}连连点头，表情从愧疚升级到感激，当天下午就在群里发了一条非常详细的占用通知，详细到让整个组都意识到这个规定是有人付出代价换来的。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 5 },
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你好言好语地表示理解，说你自己读博的时候也有过类似的"战略性绕路"，但今后要注意了。\n\n{studentName}表示理解，点头如捣蒜。然而你隐约察觉，{studentName}真正记住的部分是你说的"我自己读博的时候也绕过路"，这句话被截取成了"老师默许了"。\n\n三周后，Minecraft智能体已经学会了种小麦。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'lecture_sternly',
        text: '严肃批评，当场立威',
        outcomes: [
          {
            weight: 1,
            narrative: '你阐明了：共享服务器是公共资源，未通知占用等同于堵塞所有人的工作流，这不是技术问题而是职业素养问题。\n\n{studentName}脸色经历了三个阶段：白→红→重新白。整个组后来一个星期都在群里非常礼貌地申请每一次GPU使用，格式严谨得像在填报道德审查表。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -8 },
              { type: 'randomStudent', stat: 'happiness', delta: -12 },
              { type: 'allStudents', stat: 'favor', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你严肃批评了一通，逻辑严密，有理有据。{studentName}认真听了，诚恳道了歉，然后回去写了一篇两千字的深刻检讨发到群里，附带一份AI自动生成的GPU使用排班表，精确到分钟。\n\n这份过度反应让你盯着那份排班表发了很久的呆，不知道该夸还是该担心。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'pretend_never_found',
        text: '假装没查清楚，悄悄把进程kill掉',
        outcomes: [
          {
            weight: 1,
            narrative: '你在深夜默默kill了进程，第二天若无其事地发了一条群消息说"神秘进程已消失，来源不明，大家注意以后贴上进程标签"。\n\n{studentName}在群里简洁地回了个"好的"。你们心照不宣，从此对视时都带着一种复杂的君子协定。\n\nMinecraft智能体永远停在了那个时间点，那个AI从来没有学会挖钻石。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'lab', stat: 'energy', delta: 10 },
            ],
          },
        ],
      },
    ],
    tags: ['chain', 'server'],
  },

  server_day_1000: {
    id: 'server_day_1000',
    title: '有人跑了apt upgrade',
    description: [
      '实验室的主力服务器已经连续运行了1127天，从未重启。这是一项非官方的荣誉，没有人明说，但大家都知道这个数字，偶尔在slack里提起时会带着一种保持了世界纪录的语气。今天有人在群里发了一条消息："需要更新一个依赖，我sudo apt-get upgrade了一下，正常应该没事吧"。',
      '"正常应该没事吧"在群里静静燃烧，像一根引信。Linux内核从5.4.0跳到了6.8.12，NVIDIA驱动版本差了整整三个大版本，CUDA toolkit自动更新了，而这台服务器上跑着十一个人的实验环境。1127天的纪录，结束于一个下午的无知者无畏。',
    ],
    prompt: '更新已经跑完，服务器正在重启，你选择',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'pray',
        text: '双手合十，祈祷它能起来',
        outcomes: [
          {
            weight: 2,
            narrative: '服务器重启了。CUDA驱动花了好一阵才重新加载，nvidia-smi输出了一行你从未见过的警告，然后奇迹般地显示出了所有GPU。所有的conda环境都活着，loss曲线可以重新运行。\n\n你发了一条"重启成功"，群里响起了四个感叹号的欢呼。整个过程你攥着咖啡杯没有放手，现在发现杯子里的咖啡已经凉了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '服务器重启了，然后停在了initramfs提示符。这是一种Unix的死亡形态，意味着它启动到一半，然后忘记了怎么继续活下去。\n\n你花了大半天从rescue模式里把它拉回来，期间驱动崩了一次、文件系统只读了一次、有一个挂载点彻底消失了。最终活了，但你的uptime清零了，神话就此落幕。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -15 },
              { type: 'lab', stat: 'energy', delta: -25 },
              { type: 'lab', stat: 'reputation', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'rollback',
        text: '紧急回滚，降级内核',
        outcomes: [
          {
            weight: 2,
            narrative: '你在grub里手动选择了旧内核，屏住呼吸回车。服务器以它熟悉的方式起来了，nvidia-smi输出了那行令人心安的GPU列表，一切如旧。\n\n你把apt的自动更新彻底锁死，然后在wiki上写了一条加粗的警告："严禁在生产服务器上运行apt upgrade。违者后果自负。" 跑了upgrade的那个人负责请全组喝奶茶。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '回滚失败了，旧内核的grub入口已经被新版本的更新脚本覆盖掉了。你面对着一台运行着崭新内核却完全不认识自己驱动的服务器，开始了漫长的手动修复。\n\n1127天的传说以这种方式终结，你在深夜给所有学生发消息说"明天可能不能用服务器"，群里挂着三个灰色双勾，好半天没有人说话。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -20 },
              { type: 'lab', stat: 'energy', delta: -30 },
              { type: 'lab', stat: 'funding', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'accept_fate',
        text: '哲学上接受，静待命运',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了一条消息："更新了就更新了，等它自己重启，活了皆大欢喜，不活我们修。" 群里有人回复了一个"……"，有人发了一张正在叩头的表情包。\n\n最终服务器活了，但它花了十九分钟才完成重启，这十九分钟实验室里没有人说话，所有人都在盯着自己的屏幕等待。1127天的uptime就这样归零了，大家盯着各自屏幕的神情，有一种见证历史落幕时那种说不出来的低气压。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了消息说等它重启，然后去接了杯水。回来的时候，有人已经在群里贴出了一份完整的"服务器死亡预案"文档，包括数据备份地址、临时迁移方案和三台备用服务器的SSH密钥。\n\n原来每个人心里都有一个这个文档，只是平时不说出来。服务器最终活了，文档存进了组里的confluence，这是这件事唯一的正面遗产。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  storage_crisis: {
    id: 'storage_crisis',
    title: '磁盘99.3%了',
    description: [
      '存储报警了：/data分区已用99.3%，剩余可用空间14GB，按照最近一周的写入速度，还有不到十八个小时。群里的消息在十分钟内从零涨到了四十三条，内容可以粗略分为三类：指出自己的文件"都很重要不能删"、暗示别人的checkpoint"应该清一清"、以及一条独立发出的"这谁跑了什么？？？"',
      'df -h显示，最大的目录是/data/checkpoints，里面住着来自过去三年的模型权重文件，总计1.2TB，大部分都是"先留着以后可能会用到"的逻辑遗产。没有人愿意第一个动手。',
    ],
    prompt: '磁盘即将撑爆，组里互相指认进行中，你决定',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'enforce_quota',
        text: '强制限额，每人100GB',
        energyCost: 20,
        outcomes: [
          {
            weight: 2,
            narrative: '你宣布：即日起每人/data配额100GB，超额文件72小时内自行处理，否则系统自动归档到冷存储。群里先是有人回了个句号，过了三分钟才有人问"checkpoint算不算"，你说算。\n\n接下来的两天组里进行了一次大规模的哲学反思：什么是"真正需要的"权重文件，什么只是"心理安慰"。最终清出了700GB，磁盘使用率降到了58%。代价是有三个人找你单独谈了一次"能不能额外申请一点空间"。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'favor', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你宣布了限额政策。有人立刻开始清理，有人在三天截止日期前一小时把自己的目录打了个tar包存到了别人不常去的角落，技术上遵守了规定。\n\n磁盘使用率降到了74%，勉强活着，问题被推迟了三个月。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'buy_storage',
        text: '买块新硬盘，扩容了事（花3万）',
        fundingCost: 3,
        outcomes: [
          {
            weight: 2,
            narrative: '你花了3万买了一块8TB的NAS挂载上去，df -h里的百分比当场跌到了12%。群里传来一片欢呼。没有人清理了任何东西，没有人建立了任何规范，checkpoint文件继续以每周50GB的速度增长。\n\n下一次危机已经在日历上预约了位置：大约在十一个月后。但那是未来的事。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 15 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '你买了硬盘，挂载的时候发现文件系统格式不兼容，重新格式化又花了一个上午。在这段时间里，/data真的写满了，有三个人的训练任务因为"no space left on device"崩掉了。\n\n硬盘最终挂好了，但今天的战损已无法挽回。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'projectProgress', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'checkpoint_amnesty',
        text: '宣布大赦：所有checkpoint 48小时内自愿清理',
        outcomes: [
          {
            weight: 2,
            narrative: '你宣布"checkpoint大赦令"：48小时内自愿删除的文件不追究来源，超时后开始逐账户审计。这个措辞设计精妙，用"不追究"暗示了"本来我是要追的"。\n\n48小时内磁盘释放了430GB，全组出现了一种奇特的轻松感，像是一次集体断舍离。使用率降到了63%，算是及格。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你宣布了大赦令，然后等待。48小时过去了，磁盘释放了……37GB。大家都"清理了一下"，但每个人内心深处都认为自己的那份checkpoint才是真正的科研遗产。\n\n你叹了口气，开始思考是该立威还是该买硬盘的哲学问题。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['conditional', 'server'],
  },

  pip_nuclear: {
    id: 'pip_nuclear',
    title: 'pip install惨案',
    description: [
      '今天早上，有人在服务器上直接跑了pip install transformers==4.42.0，没有激活任何虚拟环境。pip愉快地把包装进了/usr/local/lib/python3.10，顺带更新了numpy、scipy、torch，解决了一批"版本冲突"，它的解决方式是把所有不兼容的包一起升级。',
      '到了下午，组里陆续开始收到import错误。有人的torch找不到CUDA，有人的numpy报了API变更警告，有人的整个pipeline在最开始的import阶段就崩掉了。群里的消息内容逐渐从"有人知道这是怎么回事吗"演变为"我现在什么都跑不了"。',
    ],
    prompt: '全组pip环境被团灭，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'rebuild_all',
        text: '推倒重建，requirements.txt见',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了一个下午写了一份完整的environment.yml，锁定了所有关键包的版本，然后通知全组重建conda环境。重建过程中，你发现原来大家用的"同一个环境"其实版本差异达到了惊人的程度：有人用的torch是1.13，有人是2.3，这些人以为他们在做相同的实验。\n\n新环境建完，版本统一了，history上的一个小黑点换来了未来的一致性。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '你组织了重建，发现大家的requirements.txt都是不同时期、不同状态的快照，有的有，有的没有，有的最后更新时间是2022年。\n\n最终花了整整两天才让所有人回到可以正常跑代码的状态。在这两天里，整个组的科研进度集体停摆，像一台被人拔了电源的机器。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -15 },
              { type: 'allStudents', stat: 'projectProgress', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -20 },
            ],
          },
        ],
      },
      {
        id: 'find_culprit',
        text: '先找出是谁干的',
        outcomes: [
          {
            weight: 2,
            narrative: '你翻了pip的安装日志，找到了时间戳和用户名。当事人收到消息时正在上课，回来之后发了一条"我以为那个环境是自己的"，这句话在技术上正确，在逻辑上是本次事故的完整根因分析。\n\n你没有继续追究，转而在服务器上装了pipenv并写了一份两页纸的"共享服务器使用规范"，以此作为这次事故的遗产。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '你查了日志，发现时间戳对应的账号是你自己的，你上周帮人调试的时候，在那个session里装了个包，忘记退出venv了。\n\n你静静地关上了调查窗口，转身宣布"原因不明，大家重建环境吧"。这件事你在心里压了很久。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -20 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'accept_chaos',
        text: '接受混沌，能跑就跑',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了条消息："依赖更新了，有问题的自己用pip install --upgrade修一下，装新包记得用conda。" 接下来一周，组里每天都有新的依赖冲突冒出来，每个人都独立解决了自己的问题，由此意外积累了相当水平的包管理实战经验。\n\n科研延误了，但engineering skill集体长进了，这算是某种意义上的因祸得福。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  midnight_maintenance: {
    id: 'midnight_maintenance',
    title: 'IT今晚两点重启服务器',
    description: [
      '晚上11:02，IT发来了一封邮件，主题是"【通知】计划内维护，今夜02:00重启"。正文三行，语气轻快，像是在通知一件完全正常的事情。确实，在人类的正常作息里，凌晨两点是睡觉的时间，服务器重启不影响任何人。',
      '但组里有两个人的训练任务正在跑，分别处于第41小时和第43小时，目标都是48小时完成。上一个checkpoint是12小时前存的。群里的第一条回复是短暂的空白，然后是一连串的消息，内容各不相同，但情绪方向完全一致。',
    ],
    prompt: '距离IT重启还有三小时，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'beg_it',
        text: '飞速求IT：能延到明天吗',
        outcomes: [
          {
            weight: 2,
            narrative: '你在11:15发了邮件，标题用了"紧急"二字，正文解释了两个任务的具体情况，小时数、进度、checkpoint状态，写得像一份技术事故报告。IT在11:51回复了：可以推迟到明天下午四点。\n\n你把这条消息截图发到群里，群里传来一片"谢谢老师！！！"。这种格外有用的感谢，是做导师偶尔能收到的礼物之一。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'allStudents', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了邮件，没有收到回复。凌晨1:58，服务器还是重启了，进程全部中断。\n\n第二天IT回邮件说"抱歉，已经开始了，无法中途停止"，然后问"有什么其他可以帮到你的吗"。你回复了一个"没有了谢谢"，语气经过了精心克制。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'projectProgress', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'save_checkpoints',
        text: '群发动员：能存多少是多少',
        outcomes: [
          {
            weight: 2,
            narrative: '你在群里发了紧急通知，两个人立刻在训练脚本里插入了checkpoint保存逻辑，在凌晨1:47完成了保存，距离重启还有13分钟。损失从"重新从12小时前开始"压缩到了"从1小时前开始"。\n\n事后整个组更新了训练脚本模板，加入了自动定时checkpoint，频率：每两小时。这是一次价格合理的教训。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你通知大家抢存checkpoint，但训练任务所在的脚本写得相当硬核，存checkpoint的逻辑只在epoch结束时触发，而当前epoch要到凌晨四点才结束。\n\n大家眼睁睁看着进度条走到了1:59:50，然后连接断开。第二天早上有人发消息说"重新跑了"，后面跟了个句号，就这样，再没有别的字。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'projectProgress', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'accept_with_dignity',
        text: '认命，优雅地接受损失',
        outcomes: [
          {
            weight: 1,
            narrative: '你在群里发了一条消息："重启不可避免，今晚的训练会中断，重新跑就是了。大家记得下次脚本里加上定时checkpoint。" 两个正在跑任务的人分别回了"好的"和一个点赞，没有问号，没有感叹号，大概是已经经历过了足够多次，打字时手都不会抖了。\n\n凌晨两点，服务器准时重启，组里所有人都睡着了，唯独IT的运维日志里多了一条成功记录。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  crypto_tenant: {
    id: 'crypto_tenant',
    title: '服务器白住了两个月的租客',
    description: [
      'IT安全发来了一份报告，标题是"异常计算资源使用警报"。内容显示：过去61天里，实验室服务器持续向一个位于东欧的IP发送加密连接，计算行为特征高度吻合加密货币挖矿程序，估算占用了实验室GPU资源的12%。',
      '你慢慢回想起过去两个月里，确实有几次觉得训练速度比预期慢了一些，当时的结论是"可能是batch size没调好"或者"服务器最近有点负载"。现在这些"可能"有了一个统一的解释。61天，12%的算力，你迅速做了个心算，又确认了一遍，因为第一次的结果让你感觉有点脱离现实。',
    ],
    prompt: '矿机在你的服务器上挖了两个月，你决定',
    triggerConditions: [{ type: 'time', field: 'year', op: '>=', value: 2 }],
    options: [
      {
        id: 'report_authorities',
        text: '上报校方，程序走起',
        outcomes: [
          {
            weight: 2,
            narrative: '你提交了安全事件报告，附上了IT的分析材料。校方安全部门启动了标准流程：服务器离线检查、漏洞扫描、日志取证，历时五个工作日。期间实验室完全无法使用服务器。\n\n修复完成后，IT给你发了一封感谢信说"感谢及时上报，您帮助我们发现了一个已知CVE的未修补漏洞"，这个漏洞已经在补丁列表里挂了四个月了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: -15 },
              { type: 'allStudents', stat: 'projectProgress', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '报告提交了，流程启动了，然后在某个部门的待办清单里睡着了。两周后你发邮件问进展，对方回复"正在跟进"。服务器继续运行，矿机进程已经消失了，可能是对方发现被发现了，自己撤退了。\n\n校方最终给你发了一封"已处理，感谢配合"的结案邮件，没有任何细节。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'patch_and_move_on',
        text: '打补丁消毒，低调处理',
        outcomes: [
          {
            weight: 2,
            narrative: '你和IT一起关闭了漏洞端口、清除了挖矿进程、更新了所有安全补丁，然后重启服务器。\n\n第二天GPU利用率如同被减负的孩子一样跳了上去，大家都说"服务器今天跑得好快啊"，你说"刚维护了一下"，没有进一步解释。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '你们清除了进程，打了补丁，以为万事大吉。两天后，IT发来了第二份报告：同一IP，换了一个端口，矿机重新上线了，因为打补丁的时候漏掉了一个子进程。\n\n这次你上报了校方，并在内心为那个坚持不懈的矿机作者打了一个低分的技术致敬。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'calculate_damage',
        text: '先算一下损失了多少钱',
        outcomes: [
          {
            weight: 1,
            narrative: '你做了一份完整的损失计算：61天×12%算力×8张A100×按时租价格$2.1/GPU-hour = 约¥88,000。你把这个数字发给了组里，好一会儿没有任何回应，然后有人发了一条消息："老师，这相当于我一年的补贴。"\n\n你随后上报了校方，用这个数字作为事件严重性的注脚。安全部门看到这个数字之后，响应速度明显加快了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['conditional', 'server'],
  },

  conda_three_envs: {
    id: 'conda_three_envs',
    title: '服务器上有三个lab_env',
    description: [
      'conda env list的输出里出现了这样的列表：lab_env、lab_env_v2、lab_env_new。三个环境，没有任何说明文档，没有任何版本注释，创建时间分别是十四个月前、十一个月前和八个月前。lab_env_new是"临时"建的，当时的说法是"用一下就删"。',
      '你问了问大家用的是哪个，得到了三种不同的答案。更糟糕的是，没有人能说清楚这三个环境之间的差异是什么，唯一可以确定的是，它们各自装了不同版本的transformers，而且至少有一个环境里有一个叫做fix_cuda_bug的奇怪包，来源不明，卸了就崩。',
    ],
    prompt: '服务器上三个conda环境各自为政，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'nuclear_option',
        text: '核平：全删重来',
        outcomes: [
          {
            weight: 2,
            narrative: '你发了通知：本周五三个老环境全部删除，届时会有新的lab_env_2024，带锁定版本的requirements.txt，有需求提前说。过了两天，有人来找你说老环境里有一个自己魔改的包，问能不能备份一下。你问他是哪个包，他说他忘了。\n\n核爆准时进行，新环境在周五下午建好，整洁干净，像一个新实验室。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '你执行了核弹，删了三个环境，建了新的。第二天有人来说他的实验脚本在新环境里报错，定位发现是一个三年前的遗留依赖，版本号已经从PyPI上消失了。\n\n你花了一个上午从conda-forge里找到了等价的替代方案，感觉自己在做考古挖掘。新环境最终可用了，但代价是实验室所有人都意识到：之前那三个混乱的环境，其实在各自承载着不同的历史遗迹。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -20 },
            ],
          },
        ],
      },
      {
        id: 'archaeology',
        text: '考古挖掘：这些环境凭什么存在',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了一个下午pip list了三个环境，做了对比分析。发现lab_env是稳定的"跑得通但版本旧"版本，lab_env_v2是有人升级了torch之后顺带出问题的中间态，lab_env_new是为了解决lab_env_v2的问题而建的临时版本，结果解决了torch的问题，又引入了一个新的CUDA兼容问题。\n\n你把这份历史写成了两页文档，存进了组里的wiki。读完这份文档，大家都对这三个环境产生了一种奇异的理解与同情。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '你开始考古，发现三个环境之间的差异比想象中要深得多：其中一个环境有一个叫作fix_cuda_compat_v3的本地包，是某个已经毕业的学生两年前为了解决一个特定bug手写的补丁，没有任何文档。这个包是三个环境中唯一能让某个老实验正常跑起来的关键。\n\n你盯着那个包名看了好一会儿，默默地把它单独备份，然后决定还是继续用那三个混乱的环境，至少它们是稳定的。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'create_fourth',
        text: '另起炉灶，第四个才是真的',
        outcomes: [
          {
            weight: 1,
            narrative: '你宣布新建lab_env_official，这是官方版本，有文档，有requirements.txt，锁定了所有关键版本。消息发出三天后，conda env list里出现了四个条目。lab_env_official旁边，三个旧环境纹丝未动。\n\n大家对于"迁移到新环境"这件事持续观望，理由是"等我这个实验跑完"，而这个实验似乎永远处于"快跑完了"的状态。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  permission_denied: {
    id: 'permission_denied',
    title: '周一早上权限没了',
    description: [
      '周一上午九点，组里的消息开始涌来："我的home目录只读了"、"ls -la显示权限都是444"、"连写自己的文件都不行了"。你自己试了一下，确认了：/home下的所有目录，读写权限全部丢失，连创建文件都报permission denied。',
      'IT的回复在四十分钟后到达："正在进行权限系统更新，预计本周内恢复，建议使用期间切换到/tmp工作。" 今天是周一。',
    ],
    prompt: 'home目录只读，IT说本周内恢复，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'work_from_tmp',
        text: '听IT的，都去/tmp工作',
        outcomes: [
          {
            weight: 2,
            narrative: '全组迁移到/tmp。一天之内，/tmp里诞生了七个以用户名命名的子目录，还有三个叫做temp_work、work_backup、work_real的模糊目录，来源归属不明。当天下午有人发现/tmp会被系统定时清理，于是开始定时rsync。\n\n第二天IT提前恢复了权限，但/tmp的目录结构已经复杂到没有人愿意整理了，就那样留着，又成了另一种形式的历史遗迹。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '全组去了/tmp，下午两点，/tmp满了。原来这台服务器的/tmp分区只有20GB，有人在跑实验把数据输出到了/tmp。\n\n新的错误："no space left on device"，地点从/data变成了/tmp，其他都一样。这种情况在工程学上叫作"用一个问题交换了另一个问题"。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'projectProgress', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'escalate_it',
        text: '礼貌但坚定地升级到IT上级',
        outcomes: [
          {
            weight: 2,
            narrative: '你给IT主管发了邮件，附上了受影响的用户数量（11人）、每日科研工时估计（约82小时）和权限丢失的具体时间线，措辞客观，数据详实，语气没有任何情绪，但事实本身就已经足够有力。IT主管在两小时内回复，表示下午三点前会恢复。\n\n三点零七分，home目录权限回来了。这份邮件后来被同组同学截图保存，作为"如何有效与IT沟通"的范本。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你升级了投诉，IT主管回复说"正在内部协调"。又过了一天，权限依然只读，但你收到了一封措辞非常正式的道歉邮件，说明了问题的技术原因，并承诺周三上午十点前恢复。\n\n周三上午十一点，恢复了。这比"本周内"快了很多，但是比你预期的晚了一个小时。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'write_instead',
        text: '服从天命，躺平写作',
        outcomes: [
          {
            weight: 1,
            narrative: '你在群里发了一条消息："今天home目录只读，改代码不方便，大家趁机整理一下文档、写写论文、看看文献。" 出人意料的是，这个星期大家的写作产出是过去一个月里最高的。代码跑不了，逼出了久拖未决的related work。\n\n有一个学生说"老师其实可以每周停一天服务器"，你没有评论这个建议，但把它记在了心里。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'allStudents', stat: 'skills.theory', delta: 5 },
              { type: 'allStudents', stat: 'projectProgress', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  accidental_delete: {
    id: 'accidental_delete',
    title: 'rm -rf跑错目录了',
    description: [
      '{studentName}来敲你的门。门开着，但对方还是敲了——这个细节本身就说明了一些事情。进来之后站着没有坐下，表情是那种人在准备说一件自己知道很严重的事情时会有的特定表情：嘴角微微抿着，眼神有一点飘，说话前先清了一下嗓子，像是把话在口腔里过了一遍筛再放出来。',
      '"老师，我……rm -rf跑错目录了。" 停顿了一下，补充说："是/data/results/{studentName}_experiments这个目录。" 这个目录里是三个月的实验结果：47次完整的训练run、配套的log文件、baseline的对比数据，以及两周前你们在组会上讨论过说"这批数据很重要"的那些文件。',
    ],
    prompt: '{studentName}三个月的数据被误删，你决定',
    triggerConditions: [
      { type: 'minStudentCount', value: 1 },
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'data_recovery',
        text: '数据急救，死马当活马医',
        outcomes: [
          {
            weight: 2,
            narrative: '你让{studentName}立刻停止对那块磁盘的任何写操作，然后开始用extundelete扫描inode残留。扫了三个小时，找回了约60%的文件，大部分log完整，部分checkpoint文件损坏，但最关键的baseline对比数据几乎全部找到了。\n\n{studentName}盯着找回来的文件列表，把屏幕上下滚了好几遍，约四十秒后抬起头，说了一句"谢谢老师"，声音有点哑。你没说什么，但这条消息后来存在了你的收件箱里很久没有归档。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 10 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -20 },
            ],
          },
          {
            weight: 1,
            narrative: '你们尝试了数据恢复，磁盘扫了四个小时，extundelete返回了一批文件，但大部分已经被系统覆写了，那块分区是热写盘，三个月来每天都有新数据写入。最终只找回了7个完整文件，里面没有最关键的那几次run。\n\n{studentName}的表情在"找到一些"和"但不够用"之间经历了一个完整的弧度，最终落在了"我需要重新跑"这个结论上，说这话的时像是把那三个月的重量都吐出来了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'randomStudent', stat: 'happiness', delta: -15 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -15 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'support_student',
        text: '数据没了就没了，先安抚{studentName}',
        outcomes: [
          {
            weight: 1,
            narrative: '你让{studentName}坐下，说："数据可以重跑，方法没有失，这三个月学到的东西还在。" 停顿了一下，加了一句："而且，重跑的时候你会比第一次快得多，因为你现在知道哪条路不通了。"\n\n{studentName}点了点头，还是显得失落，但至少是一种可以继续往下走的状态，有时候这已经足够了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'backup_policy',
        text: '亡羊补牢，立即建备份',
        outcomes: [
          {
            weight: 2,
            narrative: '你当天晚上写了一份实验室备份规范：所有results目录每周自动同步到NAS，训练脚本模板里加入results路径白名单校验，rm前强制confirm。\n\n{studentName}的数据找不回来了，但这份规范从那天起保护了实验室所有后续的实验数据。\n\n半年后，当另一个人差点犯了同样的错误时，系统弹出了那行校验提示，那一刻每个人都默默想起了这件事。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '你建立了备份规范，自动同步脚本当天就写好了，跑了第一次同步，成功。\n\n然后你发现：/data/results里有一个叫做test_dont_backup_this的目录，里面存着四个人共约300GB的"临时文件"，其中有一个单文件大小是127GB，文件名是final_final_FINAL_v3_use_this.pt。\n\n备份规范执行了，但你对着这个目录的命名盯了好一会儿，在心里把这群人骂了个遍，然后若无其事地关上了终端。',
            effects: [
              { type: 'randomStudent', stat: 'projectProgress', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
    ],
    tags: ['conditional', 'server'],
  },

  training_power_outage: {
    id: 'training_power_outage',
    title: '第47小时停电了',
    description: [
      '今天下午楼里停电了。原因据说是旁边在施工，挖断了一根线，具体情况后续通报。不具体通报了。',
      '实验室的主服务器正在进行一次48小时的训练run，此刻处于第47小时12分。上一次checkpoint保存在第12小时。损失了35小时的训练进度，以8张A100的算力计算，这相当于消失了约¥14,000的云计算成本。停电还附带着带走了组里另外两个正在运行的调试任务，但那些相对次要。',
    ],
    prompt: '35小时的训练进度在第47小时归零，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'laugh_about_it',
        text: '哈哈一笑，接受宇宙的随机性',
        outcomes: [
          {
            weight: 2,
            narrative: '你在群里发了一条消息："停电了，训练run丢了35小时，重新跑吧，这次记得加checkpoint。下午有空的来讨论一下怎么改脚本。" 句子里没有一个感叹号，措辞干净得像在发通知，因为你确实见过很多次了，激动的词语早就被磨光了。\n\n下午组里来了五个人，写了一个通用的checkpoint wrapper，顺便把training pipeline重构了，反而比原来干净了一半。有时候灾难是重构的借口。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了一条"哈哈"，群里有人回了三个"哈哈哈"，然后消息气泡消失了，好一会儿没有新的动静。\n\n从那以后，组里有一种不成文的共识：当有人在群里发"哈哈"而不带任何解释时，说明事情没有那么好。这个语义共识是从今天开始建立的。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'buy_ups',
        text: '买UPS，花钱买心安（花2万）',
        fundingCost: 2,
        outcomes: [
          {
            weight: 2,
            narrative: '你当天下午就联系了设备供应商，三天后，一台APC SUA3000RMi2U额定功率3000VA的UPS安装在了服务器机柜下方。接入测试：模拟断电，服务器平稳切换，继续运行，电池续航约20分钟。\n\n两个月后，楼里又停了一次电，这次持续了七分钟，训练run毫发无伤。你在群里发了一条"UPS投资回报了"。¥20,000换来了长期的内心平静，这是个划算的买卖。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 12 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你采购了UPS，安装完成，测试通过，心满意足。两周后，UPS在一次正常使用中突然发出了一声令人不安的哔声，然后进入了自检模式，检了四个小时，其间服务器在UPS的"正在检查"状态下保持了惊人的稳定。\n\n说明书说这是正常的校准流程，每三个月一次，每次持续2-6小时，建议在此期间保持"外部电源可用"。这与"防止断电"的购买初衷略有矛盾。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'checkpoint_rule',
        text: '立法：两小时一存，违者祭天',
        outcomes: [
          {
            weight: 2,
            narrative: '你在组里宣布了新规定：所有训练脚本必须包含每两小时一次的checkpoint保存，不符合要求的脚本不允许在服务器上提交。同时提供了一个模板wrapper，三行代码可以接进任何训练循环。\n\n这次停电损失了35小时，但这条规定从此把所有未来的意外损失上限压到了2小时。这是今天最有价值的决策，尽管它无法挽回已经消失的14000块钱。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '你宣布了checkpoint规定，提供了wrapper模板。大家都说好，都表示会用。两周后，有人提交了一个新的训练脚本，里面包含了checkpoint逻辑，保存频率是每24小时一次。\n\n你决定不计较"2小时"和"24小时"之间这22小时的差距，毕竟有总比没有强，而且这人的磁盘可能也装不下太多checkpoint。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'server'],
  },

  disk_full_silent: {
    id: 'disk_full_silent',
    title: '六天前磁盘就满了',
    description: [
      '今天早上，有人在检查实验结果时发现了一个奇怪的现象：输出文件大小全是0字节。不是一个，是最近六天所有实验的所有输出文件，全部大小为零，全部可以正常打开，全部什么都没有写进去。',
      '排查之后发现：/data在六天前悄悄写满了，写入返回了ENOSPC错误，但所有训练脚本都没有对这个错误做任何处理，只是默默继续运行，一切看起来"正常"，训练loss照样在降，进度条照样在走，日志照样在滚动，唯独输出文件里没有任何内容。六天，11个实验，所有结果写入了/dev/null的等价物——磁盘满了，就像什么都没发生一样。',
    ],
    prompt: '六天的实验结果从未被保存过，你决定',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'try_recovery',
        text: '日志考古，死中求活',
        outcomes: [
          {
            weight: 2,
            narrative: '你让所有人检查各自的tensorboard日志，那些实时写到独立日志服务器的监控数据没有受到影响，因为日志服务器挂载的是不同分区。从tensorboard里，可以读出训练曲线、关键指标和部分超参数记录。不是完整的结果，但足够重建80%的数据点。\n\n有一个学生说"原来tensorboard不是装饰用的"，这句话让你意识到推广监控工具的方式或许需要改进。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'projectProgress', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你尝试了各种恢复手段：检查tensorboard、翻stdout日志、看训练脚本的print输出。零散数据找回了一些，但实验的完整结论无法重建，有三个关键的对照实验什么记录都没有留下。\n\n这六天在科研史上就像是被人用橡皮擦掉的部分，可以重写，但永远不知道原来写的是什么。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'projectProgress', delta: -10 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'start_over',
        text: '认命重跑，当无事发生',
        outcomes: [
          {
            weight: 1,
            narrative: '你清出了磁盘空间，通知大家重新提交实验。有人说"那六天不是白跑了吗"，你说"至少验证了GPU是好的"。这不是一句有用的话，但是一句能让人继续往下走的话，而有时候这就是全部所需。\n\n实验在当天重新排队，组里的情绪像一台被强行重启的系统：有些程序加载慢了，但总体上还在运行。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -12 },
              { type: 'allStudents', stat: 'projectProgress', delta: -8 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'implement_monitoring',
        text: '装监控，痛定思痛',
        energyCost: 20,
        outcomes: [
          {
            weight: 2,
            narrative: '你配置了Prometheus + Alertmanager，设置了三级磁盘报警：80%警告、90%橙色告警、95%发短信。同时在所有训练脚本模板里加入了写入前磁盘空间检查，写入失败时抛出明确异常而不是静默继续。最后一步：给ENOSPC写了一行注释说明，加到了实验室的onboarding文档里。\n\n这些工作花了一个下午，但它改变的是所有未来实验的可靠性下界。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你配置了监控，设置了80%时发报警邮件。三天后，你的邮件收件箱里出现了第一条告警："磁盘使用率已达81%"。这是因为你刚才清磁盘之后，大家重新提交了所有实验，六天的补跑产生了大量输出。\n\n报警系统完美运作，成功地在磁盘再次接近满时通知了你，这是一种令人略感挫败的成功。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['conditional', 'server'],
  },

};
