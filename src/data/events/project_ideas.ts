import type { GameEvent } from '../../types';

// ─── 灵感事件 ──────────────────────────────────────────────────────────────
// 这些事件的某个 outcome 包含 unlockIdea effect，触发后在项目面板显示对应 idea。
// 事件设计原则：先有情境，再有灵感，不能直接给项目。

export const projectIdeaEvents: Record<string, GameEvent> = {

  // ── 组会纪要小助手（新手引导，第1年10月固定触发）────────────────────────────

  idea_meeting_minutes_assistant: {
    id: 'idea_meeting_minutes_assistant',
    title: '组会记录失踪事件',
    description: [
      '组会结束后，你想找上周的讨论记录，发现根本不存在。',
      '你问了{studentName}，对方摇头说不知道。另外两个人也说不知道。纪要在哪里？"应该……有人记的吧？"几个人互相对视，陷入沉默。',
      '你翻了翻组群聊天记录，唯一的相关内容是一条消息："今天组会很顺利！"后面跟着六个笑脸表情。没有任何实质性内容。',
      '这种事不该再发生了。如果有个工具能把组会录音自动整理成结构化纪要，不仅方便追溯，还能量化每个人的发言贡献，或者量化谁一直在沉默。',
      '💡 顺带一提：这种小工具其实工程量不大，能锻炼学生，还能出一篇不错的系统论文。你感觉找到了什么好项目。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'build_minutes_tool',
        text: '手机架一下，先录起来再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你把手机斜放在纸杯上，对准白板。学生们以为你在打字。后来你发现这个录音能做的事情，比你一开始想的多一点。\n\n💡 获得灵感：「组会纪要小助手」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'meeting_minutes_assistant' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'diy_minutes',
        text: '以后只开站会，强制十分钟结束',
        outcomes: [
          {
            weight: 1,
            narrative: '你宣布了新规则：以后组会全程站着开。所有人都站着，果然快了许多。没有纪要，但也没有可以被记下来的废话了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 导师回复预测 ─────────────────────────────────────────────────────────

  idea_advisor_reply: {
    id: 'idea_advisor_reply',
    title: '消息已读不回',
    description: [
      '合作教授的消息三周前发出去，对方已读，没有回复。',
      '你盯着聊天记录发呆。三周了，已读，没有回复。',
      '你开始回忆这位教授的历史行为模式：下午三点最活跃，周五沉默，收到截止日期提醒后必有回音……你突然意识到这些规律是可以被建模的。',
      '历史聊天记录加时间序列分析，完全可以训练一个"导师回复预测器"。而且几乎所有人都用得上。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'model_it',
        text: '用不科学的方法算算他什么时候会回',
        outcomes: [
          {
            weight: 1,
            narrative: '你拿出纸，把他历史回复的时间点画成一张分布图。发现周五下午三点是高峰期，截止日期前必有动静。这个规律清晰得不像话。\n\n💡 获得灵感：「导师回复预测」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'advisor_reply_predictor' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'just_wait',
        text: '发第二封，措辞再客气一些',
        outcomes: [
          {
            weight: 1,
            narrative: '你重写了邮件，删掉"还请百忙之中"，加上"不知道之前的消息您是否有看到"。对方当天下午就回复了。有时候问题不在于等，而在于怎么问。',
            effects: [{ type: 'lab', stat: 'energy', delta: 8 }],
          },
        ],
      },
    ],
  },

  // ── 自动 Rebuttal ─────────────────────────────────────────────────────────

  idea_auto_rebuttal: {
    id: 'idea_auto_rebuttal',
    title: 'Reviewer #2 又来了',
    description: [
      '论文审稿结果回来了，Reviewer #2 的意见长达两页，充满了哲学质疑。',
      'Reviewer #2 给出了一个令人叹为观止的审稿意见：第一条质疑你的动机，第二条质疑实验室的存在意义，第三条建议你去读一条2003年的冷门论文。',
      '你不是第一次面对这种无厘头的意见了。你打开三年前的 Rebuttal，发现格式几乎可以完全复用。',
      '这个模式太强了。审稿意见的结构是可重复的，历史 Rebuttal 库加上大模型，完全可以自动化这个痛苦过程。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 3 },
      { type: 'seenEvent', eventId: 'reviewer_two' },
    ],
    options: [
      {
        id: 'write_rebuttal_idea',
        text: '先存个思路，回来再怼 Reviewer #2',
        outcomes: [
          {
            weight: 1,
            narrative: '你用两分钟把这个系统的框架写进备忘录，然后切回去应对 Reviewer #2。Rebuttal 写了半天，发现这件事交给人类做果然太痛苦了。\n\n💡 获得灵感：「自动 Rebuttal」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'auto_rebuttal' },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'just_rebuttal',
        text: 'Rebuttal 先，灵感靠不住',
        outcomes: [
          {
            weight: 3,
            narrative: '你把杂念清出脑海，集中火力干掉了 Reviewer #2。三天后提交，等待结果。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '写着写着，你突然觉得这流程完全可以自动化。\n\n💡 获得灵感：「自动 Rebuttal」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'auto_rebuttal' },
            ],
          },
        ],
      },
    ],
  },

  // ── 代码考古学 ────────────────────────────────────────────────────────────

  idea_code_archaeology: {
    id: 'idea_code_archaeology',
    title: '祖传代码库',
    description: [
      '服务器上有一个五年前的项目文件夹，没有 README，没有注释，没有作者信息。',
      '文件夹名叫 `final_FINAL_v3_use_this_one`，里面有三千行无注释的 Python，和一个叫做 `do_not_run.sh` 的脚本。',
      '你花了两个小时，靠 git log 和错误信息，大概猜出了这个系统在做什么。它曾经是一个数据预处理流水线，作者已经毕业，无处可问。',
      '这个逆向过程本身就很有研究价值。给定一个历史代码库，能不能系统性地还原出当时的设计意图？commit 记录是线索，报错是线索，命名习惯也是线索。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 18 },
    ],
    options: [
      {
        id: 'archaeologize',
        text: '这个逆向过程本身就是个方法论',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始起草框架，越写越有意思，不知不觉把 `do_not_run.sh` 也给运行了一下。它竟然跑通了。\n\n💡 获得灵感：「代码考古学」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'code_archaeology' },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'give_up',
        text: '直接重写，三小时解决一切',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了那个文件夹，新建了一个干净的工程。一个下午就搞完了，干净利落。`do_not_run.sh` 到底在做什么，将永远成谜。',
            effects: [{ type: 'lab', stat: 'energy', delta: 15 }],
          },
        ],
      },
    ],
  },

  // ── 校园 Agent ────────────────────────────────────────────────────────────

  idea_campus_agent: {
    id: 'idea_campus_agent',
    title: '教务系统再次崩溃',
    description: [
      '今天要提交一份在线表格，页面加载了三分钟后闪退，数据全失。',
      '这个表格你已经填了第三遍了。它要求你先登录，再二次验证，再上传一份PDF（只能是PDF），再等系统发确认邮件到另一个邮箱……',
      '你想起来学生也在抱怨类似的事情：选课要抢，报销要跑三个部门，借设备要去线下签字。',
      '如果有个 Agent 能帮你处理这些日常琐事就好了。理解页面结构，自动填写，知道什么时候要等、什么时候可以催。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 4 },
    ],
    options: [
      {
        id: 'build_it',
        text: '打开看看这个破页面是什么结构',
        outcomes: [
          {
            weight: 1,
            narrative: '你打开了 DevTools，随手看了眼 network 请求，越看越觉得有意思。这个页面的结构，完全可以被程序理解。\n\n💡 获得灵感：「校园 Agent」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'campus_agent' },
              { type: 'lab', stat: 'energy', delta: -5 },
          ],
          },
        ],
      },
      {
        id: 'fill_again',
        text: '打电话给 IT，这是他们的锅',
        outcomes: [
          {
            weight: 1,
            narrative: '你找到了 IT 的电话，说明了情况。对方说"已记录，会跟进"。三天后，系统又崩了。但至少今天不是你的锅了。',
            effects: [{ type: 'lab', stat: 'energy', delta: 8 }],
          },
        ],
      },
    ],
  },

  // ── DDL 强化学习 ──────────────────────────────────────────────────────────

  idea_ddl_reinforcement: {
    id: 'idea_ddl_reinforcement',
    title: '最后一小时',
    description: [
      '论文截止还有一个小时，你突然意识到实验部分有个漏洞。',
      '这是你第三次在最后时刻发现问题。每次都是同样的感受：绝望，然后奇迹般地找到一个够用的解法，然后提交。',
      '你开始想：为什么人类在 deadline 前会激活一种平时找不到的工作状态？为什么一小时能做完平时三天做不完的事？',
      '如果把这个"最后时刻决策过程"建模成一个强化学习问题，奖励是提交成功，惩罚是超时或质量太差，会不会是一篇好论文？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 22 },
      { type: 'lab', stat: 'energy', op: '<=', value: 60 },
    ],
    options: [
      {
        id: 'model_ddl',
        text: '在备忘录里敲一行：此刻就是数据点',
        outcomes: [
          {
            weight: 1,
            narrative: '你用三十秒写了一行备注，然后立刻切回去救场。等论文提交成功，你又补了一句：最后时刻的解法质量，值得建模。\n\n💡 获得灵感：「DDL 强化学习」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'ddl_reinforcement' }],
          },
        ],
      },
      {
        id: 'focus',
        text: '不想了，先把眼前的过了',
        outcomes: [
          {
            weight: 1,
            narrative: '你强行进入专注模式，把其他所有窗口全部关掉。论文提交成功，你盯着确认邮件发了一会儿呆。还是做成了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 海豚语言模型 ──────────────────────────────────────────────────────────

  idea_dolphin_llm: {
    id: 'idea_dolphin_llm',
    title: '奇怪的 Workshop',
    description: [
      '你误点进了一个"跨物种通信与语言学习"研讨会的直播。',
      '你本来是想找另一个会议的直播链接的。结果点进去，一位海洋生物学家正在讲解海豚的声纹结构和语义单元分析。',
      '你意识到海豚的通信系统有某种类似语言的层级结构：音节、语句、语境依赖。过去二十年有人在尝试解码，但没有人用语言模型做过。',
      '你知道这个想法有点荒诞。但"荒诞"曾经是很多顶会论文的第一印象。而且这个数据集在某个海洋研究所开放了。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 100 },
    ],
    options: [
      {
        id: 'go_wild',
        text: '立刻搜一下海豚数据集在哪',
        outcomes: [
          {
            weight: 1,
            narrative: '你本来只想找一下数据集，结果一头扎进了声纳学和海豚认知的交叉文献，晚饭都忘了吃。数据集是真实开放的。\n\n💡 获得灵感：「海豚语言模型」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'dolphin_llm' },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'close_tab',
        text: '加进书签，等有空再看',
        outcomes: [
          {
            weight: 1,
            narrative: '你把那个 tab 存进了书签文件夹，文件夹里还有四十三个"等有空再看"。省下来的注意力正好用在了一个卡了很久的问题上。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 幸运T恤因果推断 ───────────────────────────────────────────────────────

  idea_lucky_shirt: {
    id: 'idea_lucky_shirt',
    title: '玄学的力量',
    description: [
      '你发现自己每次穿那件红色T恤，论文都会被接收。',
      '三次了。三次穿那件红色T恤的日子，都有好消息。你清楚地知道这是幸存者偏差，但你还是把那件衬衫挂在了显眼的地方。',
      '在组会上，你随口提了一下。{studentName}立刻从包里掏出一支笔，说这是"专用答辩笔"，用了必过。另外两个人也点头承认，一个有幸运马克杯，一个有专门用来debug的拖鞋。',
      '等等——如果用随机对照实验，真的测一测这些仪式和科研产出的相关性，你会得到什么结论？零假设很容易被拒绝吗？还是说……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 58 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'run_experiment',
        text: '其实这是可以严肃做的实验',
        outcomes: [
          {
            weight: 1,
            narrative: '你在白板上写下了实验设计：随机分配"幸运条件"，测量一个月产出，控制变量……等你回头，你已经把它变成了一个正经的研究项目。\n\n💡 获得灵感：「幸运T恤因果推断」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'lucky_shirt_causality' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'dismiss',
        text: '迷信不值得研究，但值得相信',
        outcomes: [
          {
            weight: 1,
            narrative: '你理性地否定了这个想法。然后悄悄把那件红色T恤叠好放进包里——明天有个重要的答辩，学生需要一点运气。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 组会翻译 ──────────────────────────────────────────────────────────────

  idea_meeting_translator: {
    id: 'idea_meeting_translator',
    title: '你说的是中文吗',
    description: [
      '组会刚结束，你发现自己完全没听懂{studentName}的汇报。',
      '你知道{studentName}说的每个词，但组合在一起就不知道意思了。"端到端的联合优化框架在多模态对齐任务上的渐进式微调范式"——这到底是在做什么？',
      '你不是唯一的受害者。另一位老师凑过来小声问你："{studentName}的工作是什么来着？"你摇了摇头。',
      '如果有个系统能把组会发言实时翻译成人类可以理解的语言，消灭废话和术语堆砌，也许每周能省下不少时间。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'translate_idea',
        text: '掏出手机，假装在记笔记',
        outcomes: [
          {
            weight: 1,
            narrative: '你在手机上写下了"组会翻译器：把术语还原成人话"，顺手加了个功能需求列表。学生以为你在认真做记录。\n\n💡 获得灵感：「组会翻译」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'meeting_translator' }],
          },
        ],
      },
      {
        id: 'ask_again',
        text: '让{studentName}画个图说明',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}在白板上画了一张图。这次你听懂了——其实是个很直接的问题，只是被话语包装了三层。你们聊了一会儿，{studentName}好像也发现了点什么。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 邮件礼貌税 ────────────────────────────────────────────────────────────

  idea_email_politeness: {
    id: 'idea_email_politeness',
    title: '邮件的艺术',
    description: [
      '你写了一封措辞非常礼貌的邮件，对方在三分钟内回复了。',
      '上周那封直接请求帮忙的邮件石沉大海。这周你加了四个"辛苦了"、两个"打扰一下"，对方三分钟内回复。',
      '你开始思考这里面的规律。礼貌程度和回复速度之间是否存在函数关系？称呼的选择呢？老师vs教授vs名字？',
      '如果从历史邮件里把这些变量抽出来，做一个系统性的因果分析……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 6 },
    ],
    options: [
      {
        id: 'research_politeness',
        text: '翻出三年邮件记录，开始打标签',
        outcomes: [
          {
            weight: 1,
            narrative: '你把邮件按"有没有回复"分了两类。规律比你想象的清晰，清晰到让你有点不安。\n\n💡 获得灵感：「邮件礼貌税」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'email_politeness_tax' },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'just_remember',
        text: '把这套话术传授给学生',
        outcomes: [
          {
            weight: 1,
            narrative: '你在组会上分享了这个发现。学生们当天就开始在邮件里加"辛苦了"。下午你收到了一封极其客气的请假邮件，是其中一个学生写的。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 夜间代码效应 ──────────────────────────────────────────────────────────

  idea_night_code: {
    id: 'idea_night_code',
    title: '凌晨三点的天才方案',
    description: [
      '{studentName}在凌晨三点提交了一个 commit，注释写着"天才想法，明天解释"。',
      '你点开了那个 commit。代码量惊人，但完全没有注释，变量名是 `tmp2`、`data_new_v3`、`AAAA`。',
      '第二天早上，{studentName}看着屏幕沉默了很久，说："我昨晚好像写了点什么……"',
      '这不是第一次了。夜间代码总是有某种奇特的风格：密度高，注释少，创意偶尔爆炸，可读性接近零。如果系统地对比白天和深夜的代码质量，会发现什么？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 30 },
    ],
    options: [
      {
        id: 'study_night_code',
        text: '拉一下所有人的提交时间戳',
        outcomes: [
          {
            weight: 1,
            narrative: '你从 git log 里提取了实验室所有成员过去一年的 commit 时间分布。图出来之后，你盯着看了很久。凌晨两点确实是个高峰。\n\n💡 获得灵感：「夜间代码效应」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'night_code_effect' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'ignore_it',
        text: '发消息给{studentName}：明天 push 之前加注释',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了条消息。{studentName}回了"好的"。第二天你打开一看，每个函数的注释写着"这个函数负责完成其功能"。这种创造力，也是一种奇才。',
            effects: [{ type: 'lab', stat: 'energy', delta: 5 }],
          },
        ],
      },
    ],
  },

  // ── Reviewer 对齐 ─────────────────────────────────────────────────────────

  idea_reviewer_alignment: {
    id: 'idea_reviewer_alignment',
    title: '审稿人画像',
    description: [
      '同一篇论文，投不同会议得到截然不同的审稿意见。',
      '上个月投 A 会，三个 Reviewer 都说"实验设计合理"。这个月投 B 会，三个 Reviewer 都说"缺乏基础实验"。论文一字未改。',
      '你开始意识到，不同会议有不同的"审稿文化"，甚至不同年份都有差异。这是可以量化的。',
      '如果从公开的接受/拒绝记录和历史审稿意见里训练一个偏好模型，在投稿前就预测审稿结论，也许可以省去很多无谓的拒稿来回。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 35 },
    ],
    options: [
      {
        id: 'build_reviewer_model',
        text: '从 OpenReview 下几年数据看一看',
        outcomes: [
          {
            weight: 1,
            narrative: '你下载了数据，原本只想粗略扫一眼，结果一看就停不下来。不同会议的审稿偏好真的差很多。\n\n💡 获得灵感：「Reviewer 对齐」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'reviewer_alignment' }],
          },
        ],
      },
      {
        id: 'just_resubmit',
        text: '改好重投，这次选口味合适的会议',
        outcomes: [
          {
            weight: 1,
            narrative: '你仔细看了目标会议往年的接受论文，做了针对性修改。重投之后中了。命中率比随机选会议高了不少。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
    ],
  },

  // ── 茶歇社交网络 ──────────────────────────────────────────────────────────

  idea_coffee_social: {
    id: 'idea_coffee_social',
    title: '咖啡机旁的合作',
    description: [
      '两组原本没有交集的学生，因为同时在等咖啡机，聊出了一个合作项目。',
      '你亲眼看到了这件事。两个原本没有交集的学生，等了五分钟咖啡机，聊了一个午饭时间，最后决定合写一篇论文。',
      '你开始想：这种"茶歇效应"有多普遍？组会和正式会议的合作效率，和非正式交流场合相比怎么样？',
      '如果系统地记录谁在什么时候在哪里喝咖啡，分析非正式接触频率和后续合作关系……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 18 },
    ],
    options: [
      {
        id: 'map_coffee_network',
        text: '把咖啡机旁的签到表拍下来',
        outcomes: [
          {
            weight: 1,
            narrative: '你拍了张签到表，发现时间规律比想象的有趣。谁和谁在同一时间段出现，频率有多高？这是张隐藏的社交图。\n\n💡 获得灵感：「茶歇社交网络」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'coffee_social_network' }],
          },
        ],
      },
      {
        id: 'just_glad',
        text: '干脆组织一次集体茶歇，庆祝一下',
        outcomes: [
          {
            weight: 1,
            narrative: '你买了奶茶，通知大家下午四点一起去喝。当天气氛出奇地好，还有两个学生自发聊起了新合作。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 学术梗传播 ────────────────────────────────────────────────────────────

  idea_meme_propagation: {
    id: 'idea_meme_propagation',
    title: '全组都在用的梗',
    description: [
      '实验室里流行了一个新梗，三天后你发现隔壁组也开始用了。',
      '起源是一条吐槽 GPU 排队的弹幕，有人截图发到了实验室群。然后不知道怎么，它变成了组里一切等待场景的统一回应词。',
      '三天后，你在隔壁实验室的学生群里看到了一样的梗，但配了不同的图。一周后，你在一个学术论坛上看到了它的变体。',
      '这个传播速度和变异过程是可以被建模的。学术圈是个封闭的小世界，文化产品在其中的流动有独特的路径。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 28 },
    ],
    options: [
      {
        id: 'study_memes',
        text: '建个文档，记一下这梗的传播路径',
        outcomes: [
          {
            weight: 1,
            narrative: '你建了一个文档，开始记录起源、变体、传播路径。结果你在这个文档上花了一个多小时，而那段时间本来是用来写论文的。研究者的天性。\n\n💡 获得灵感：「学术梗传播」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'meme_propagation' },
              { type: 'lab', stat: 'energy', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'just_laugh',
        text: '加工一下，转发出去',
        outcomes: [
          {
            weight: 1,
            narrative: '你改了改配图，重新发了出去。新版本传播速度比原版快了不少。你在学术圈的形象正在发生微妙的变化。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── AI 论文鉴定 ───────────────────────────────────────────────────────────

  idea_ai_paper_detection: {
    id: 'idea_ai_paper_detection',
    title: '这篇论文是人写的吗',
    description: [
      '你在审稿时越来越难判断一篇论文是否由 AI 生成。',
      '第三段的行文太流畅了，没有任何学者写作时惯有的语气起伏。句子结构工整得像模板。你读了三遍，不确定。',
      '你问了另一位审稿人，对方说："我也说不准，但感觉怪怪的。"',
      '如果有一个分类器，能从词汇多样性、句子分布、引用风格等维度给出一个量化的"人类撰写概率"，这个工具现在非常需要。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 20 },
    ],
    options: [
      {
        id: 'build_detector',
        text: '算一下这篇的 perplexity 分布',
        outcomes: [
          {
            weight: 1,
            narrative: '你跑了个简单的语言模型测试，结果很有意思。然后你给旁边同事的论文也算了一份，发现人类写的和机器写的确实有规律可循。\n\n💡 获得灵感：「AI 论文鉴定」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'ai_paper_detection' }],
          },
        ],
      },
      {
        id: 'accept_anyway',
        text: '质量没问题就行，其他不管',
        outcomes: [
          {
            weight: 1,
            narrative: '你认真看完了全文，逻辑是对的，实验设计也合理，写了"内容扎实，建议接收"，提交了审稿意见。作为审稿人，这也是一种职业精神。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 2 }],
          },
        ],
      },
    ],
  },

  // ── 毕业进度预警 ──────────────────────────────────────────────────────────

  idea_graduation_delay: {
    id: 'idea_graduation_delay',
    title: '这个信号早就有了',
    description: [
      '{studentName}正式提交了延期申请，你回看TA的历史数据，发现早有预警。',
      '你打开了{studentName}一年半前的提交记录。commit 频率在第三学期末开始显著下降，消息回复延迟从小时级变成了天级，组会请假次数增加。',
      '所有信号都在那里，你只是没有系统性地看。',
      '如果有个早期预警模型，在问题形成之前就给出提示，也许可以提前干预。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 20 },
      { type: 'anyStudent', stat: 'happiness', op: '<=', value: 40 },
    ],
    options: [
      {
        id: 'build_warning_system',
        text: '整理一下，那几个信号能不能量化',
        outcomes: [
          {
            weight: 1,
            narrative: '你列出了指标：commit 频率、回复延迟、请假次数。越整理越觉得这是个真正可以做的早期预警系统。\n\n💡 获得灵感：「毕业进度预警」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'graduation_delay_predictor' }],
          },
        ],
      },
      {
        id: 'talk_to_student',
        text: '先和{studentName}谈一次，从现在开始调整',
        outcomes: [
          {
            weight: 1,
            narrative: '你约了{studentName}来谈，聊了很久，重新制定了计划。{studentName}好多了，你也好多了。也许来得及。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 12 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 引用网络挖掘 ──────────────────────────────────────────────────────────

  idea_citation_network: {
    id: 'idea_citation_network',
    title: '你们都引用彼此',
    description: [
      '你在做文献调研时，发现某几位作者似乎在互相高频引用。',
      '三篇论文，作者集合几乎相同，每篇都在引用另外两篇。你仔细看了看，发现这个小圈子在该领域的引用图里占据了一个明显的核心节点。',
      '这不像是真正的学术影响力，更像是一个有意经营的引用网络。',
      '如果把整个领域的引用图建出来，用社区检测算法分析结构，那些"引用帮派"是否会自动浮现？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 16 },
    ],
    options: [
      {
        id: 'mine_citations',
        text: '下个数据集，把这张图画出来',
        outcomes: [
          {
            weight: 1,
            narrative: '你下载了 Semantic Scholar 的公开数据集，开始构建引用图。越画越觉得图里的结构在讲一个故事。\n\n💡 获得灵感：「引用网络挖掘」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'citation_network_mining' }],
          },
        ],
      },
      {
        id: 'report_it',
        text: '截图发给几个朋友，公开品鉴',
        outcomes: [
          {
            weight: 1,
            narrative: '你把那张引用网络截图发进了一个学术群，"这也太明显了"成了今天的公共话题。发泄完毕，心情舒畅。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 超参数玄学 ────────────────────────────────────────────────────────────

  idea_hyperparameter_divination: {
    id: 'idea_hyperparameter_divination',
    title: '炼丹是一种艺术',
    description: [
      '{studentName}用直觉调出来的参数，比你精心设计的网格搜索结果还要好。',
      '学习率 3e-4，batch size 256，没有任何理论依据，只是"感觉这个好"。最终结果超出了你半个月自动化搜索的最佳结果。',
      '你问{studentName}为什么选这组参数。对方说："这一套在上个项目有效，就试了一下。"',
      '这让你开始思考：专家直觉和贝叶斯优化之间的差异到底是什么？两者的搜索路径能否可视化对比？哪些参数是真正重要的，哪些是在安慰自己？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 25 },
      { type: 'anyStudent', stat: 'skills.engineering', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'study_tuning',
        text: '让{studentName}把调参过程录屏，说是"分析一下"',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}记录了三次调参的完整过程，你自己也做了网格搜索。对比一看，专家直觉的搜索路径比算法高效得多，而且原因其实能被解释。\n\n💡 获得灵感：「超参数玄学」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'hyperparameter_divination' },
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'use_the_params',
        text: '列为实验室默认配置',
        outcomes: [
          {
            weight: 1,
            narrative: '你把那组参数加进了实验室公共配置文件，备注写着"来源：{studentName}的感觉"。省下了原本要花在超参搜索上的时间，全组受益。{studentName}看到备注，笑了一下。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 12 },
              { type: 'randomStudent', stat: 'favor', delta: 3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 白板消失定理 ──────────────────────────────────────────────────────────

  idea_whiteboard_erasure: {
    id: 'idea_whiteboard_erasure',
    title: '白板被擦了',
    description: [
      '组会后你回到会议室，白板上的推导已经被人擦干净了。',
      '那上面有你费了好大力气才推出来的一个不等式，你当时觉得"反正还在，等会儿再拍照"。',
      '现在白板空空如也，你努力回忆，只记得结论是正确的，但过程……消失了。',
      '你问了其他人，没有人记录。这种事在学术界有多常见？那些因为没有拍照、没有记录而永远消失的推导，到底有多少？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 16 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'study_erasure',
        text: '在群里发个投票："你们丢失过白板内容吗"',
        outcomes: [
          {
            weight: 1,
            narrative: '回应率惊人地高。有人说丢过一整块推导，有人说拍了张糊照。这个痛点是普遍的，而且从来没有人认真统计过。\n\n💡 获得灵感：「白板消失定理」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'whiteboard_erasure_theorem' }],
          },
        ],
      },
      {
        id: 're_derive',
        text: '重新推一遍，脑子还在',
        outcomes: [
          {
            weight: 1,
            narrative: '你重新推了一遍，花了好一阵，结论和上次的微微有点不同。但重新推过之后，你对这个不等式的理解深了一层。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 宕机先知 ─────────────────────────────────────────────────────────────

  idea_server_oracle: {
    id: 'idea_server_oracle',
    title: '又要宕机了',
    description: [
      '{studentName}说"感觉今晚服务器要崩"，四小时后真的崩了。',
      '{studentName}说不清楚为什么。"就是感觉，GPU 利用率曲线不对，存储涨得太快，加上昨天刚做了系统更新。"',
      '你让{studentName}写下来是怎么判断的。{studentName}写了三条直觉指标。你一看，这三条都是可以从监控日志里提取的数值特征。',
      '如果训练一个模型，在崩溃前几小时给出预警，可以让大家提前保存进度。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 15 },
    ],
    options: [
      {
        id: 'build_oracle',
        text: '让{studentName}把那三条直觉写下来，说是"帮你整理"',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}写下了三条。你一看，这三条都是可以从监控日志里提取的数值特征，而且历史数据有两年。{studentName}还顺手加了第四条——这比预想的还要好。\n\n💡 获得灵感：「宕机先知」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'server_downtime_oracle' },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'fix_server',
        text: '先重启，今晚的任务等不了',
        outcomes: [
          {
            weight: 1,
            narrative: '重启之后系统恢复了，所有任务重新排队运行。你的实验在今晚出了结果，比预计早了半天。',
            effects: [{ type: 'lab', stat: 'energy', delta: 5 }],
          },
        ],
      },
    ],
  },

  // ── 会议社交匹配 ──────────────────────────────────────────────────────────

  idea_conference_social: {
    id: 'idea_conference_social',
    title: '茶歇遇到对的人',
    description: [
      '在一次学术会议上，你与一位从未听说过但研究高度相关的学者偶然相遇。',
      '五分钟的对话，你们发现各自在用不同方法处理同一个问题。他有数据，你有算法。这次会面有很高概率变成一篇合作论文。',
      '但这是完全偶然的——你本来是去找洗手间的。',
      '学术会议有几百人，你只见到了站在同一区域的那二十个。如果有个系统，在会前就推算出谁是你最应该认识的人……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 16 },
    ],
    options: [
      {
        id: 'design_matching',
        text: '回到房间，把今天认识的人连成线图',
        outcomes: [
          {
            weight: 1,
            narrative: '你在纸上画了今天所有有效对话的连线，发现从你的位置出发，错过的人比认识的人多得多。这件事本可以提前安排。\n\n💡 获得灵感：「会议社交匹配」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'conference_social_matching' }],
          },
        ],
      },
      {
        id: 'exchange_contacts',
        text: '加了联系方式，顺手发了篇最新论文',
        outcomes: [
          {
            weight: 1,
            narrative: '你们互相关注了学术主页，交换了最近的研究。他当晚就回了一封邮件，说看到了一个可以合作的切入点。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 组会博弈论 ────────────────────────────────────────────────────────────

  idea_meeting_game_theory: {
    id: 'idea_meeting_game_theory',
    title: '没有人想第一个汇报',
    description: [
      '今天没有人主动报名第一个汇报，沉默持续了两分钟。',
      '你环顾一圈，每个人都在看手机或者假装在翻笔记。最终{studentName}叹了口气，说"我先来吧"。',
      '这个过程是一个经典的博弈，每个人都在计算等待成本和主动出击的收益。',
      '如果把组会出勤和汇报决策形式化为博弈论模型，分析不同激励结构下的均衡策略……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 22 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 20 },
    ],
    options: [
      {
        id: 'model_meeting',
        text: '画了个博弈树，均衡解和直觉完全一致',
        outcomes: [
          {
            weight: 1,
            narrative: '你在纸上把这个等待博弈建了个简单模型，纳什均衡正好是"谁都不先说话"。但如果改变激励结构……\n\n💡 获得灵感：「组会博弈论」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'meeting_game_theory' }],
          },
        ],
      },
      {
        id: 'fix_order',
        text: '随机抽签，彻底打破纳什均衡',
        outcomes: [
          {
            weight: 1,
            narrative: '你现场抽了签。{studentName}第一个被抽到，叹了口气，然后汇报得出奇地流畅。此后的组会再没有沉默超过十秒。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 致谢关系图谱 ──────────────────────────────────────────────────────────

  idea_acknowledgment_network: {
    id: 'idea_acknowledgment_network',
    title: '感谢那些无名英雄',
    description: [
      '你在写论文致谢时，意识到致谢段落里藏着大量人际关系信息。',
      '你列出了名字：帮你看过草稿的师兄、提过关键建议的同学、借给你 GPU 的外组朋友。这些人没有在作者列表里，但他们在这项工作里有真实的贡献。',
      '你突然想到：如果把几千篇论文的致谢段落提取出来，构建一个图，看看谁感谢了谁，这个网络的结构会是什么样子？',
      '学术圈真实的人情网络，可能比合作网络更能解释一些事情。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 15 },
    ],
    options: [
      {
        id: 'mine_acknowledgments',
        text: '先把刚才列出来的名单分析一遍',
        outcomes: [
          {
            weight: 1,
            narrative: '你盯着那张名单，想：如果把几千篇论文的致谢都提取出来，这张图会是什么样？打开 arXiv API 文档时，你意识到这个数据是真的可以拿到的。\n\n💡 获得灵感：「致谢关系图谱」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'acknowledgment_network' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'finish_writing',
        text: '认认真真把所有人都写进去，一个都不漏',
        outcomes: [
          {
            weight: 1,
            narrative: '你认认真真把所有人都写进去了，还加了几句真心话。投稿之后有人专门发消息说"看到你的致谢了，谢谢"。这件事值得。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 摘要压缩极限 ──────────────────────────────────────────────────────────

  idea_abstract_compression: {
    id: 'idea_abstract_compression',
    title: '摘要太长没人读',
    description: [
      '审稿人说"请缩短摘要，当前太长"，但你已经删了三遍了。',
      '原始摘要 350 词，你削到了 280 词，审稿人说还是太长。你改到 240 词，又觉得核心贡献说不清楚了。',
      '你开始想：一篇论文的"核心贡献"到底需要多少词才能说清楚？压缩到什么程度开始出现信息损失？',
      '如果系统地对比不同长度摘要在引用率和阅读完成率上的差异，可以找到一个信息密度最优点。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 15 },
    ],
    options: [
      {
        id: 'study_compression',
        text: '算一下不同长度版本的信息损失',
        outcomes: [
          {
            weight: 1,
            narrative: '你拿出三个不同长度的摘要版本，开始算信息量差异。发现有个临界点之后，压缩的不是冗余，而是贡献本身。\n\n💡 获得灵感：「摘要压缩极限」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'abstract_compression' }],
          },
        ],
      },
      {
        id: 'cut_more',
        text: '发给大模型，让它帮你压',
        outcomes: [
          {
            weight: 1,
            narrative: '你把摘要扔给了大模型，让它压到 200 词。结果压出来的比你自己写的还通顺。你加了几处细节，提交了。审稿人满意了。',
            effects: [{ type: 'lab', stat: 'energy', delta: 10 }],
          },
        ],
      },
    ],
  },

  // ── Prompt 考古学 ─────────────────────────────────────────────────────────

  idea_prompt_archaeology: {
    id: 'idea_prompt_archaeology',
    title: '大模型在撒谎',
    description: [
      '同一个问题，新版本的 GPT 给出了和旧版本截然不同的答案。',
      '你用了同样的 prompt，旧版说"我无法提供这方面信息"，新版直接给出了详细回答。不是问题本身变了，是模型变了。',
      '背后的变化是什么？系统提示？RLHF 偏好数据？训练数据的构成？你查了一下官方文档，没有任何说明。',
      '如果用系统性的诱导测试，从模型的行为反推它的系统提示和对齐策略，能还原出多少历史版本的决策逻辑？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 65 },
    ],
    options: [
      {
        id: 'archaeologize_prompts',
        text: '设计一组探针，系统地问不同版本',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一份测试集，对多个版本的模型发出结构化探测请求。行为差异比你预期的大，而且有规律。\n\n💡 获得灵感：「Prompt 考古学」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'prompt_archaeology' }],
          },
        ],
      },
      {
        id: 'report_behavior',
        text: '发帖：旧版 GPT 被悄悄修改了',
        outcomes: [
          {
            weight: 1,
            narrative: '你整理了截图，写了一篇观点帖，旗帜鲜明地指出这个变化。出乎意料地火了，评论区吵了很久，但你的名字被更多人记住了。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 2 }],
          },
        ],
      },
    ],
  },

  // ── 水会检测系统 ──────────────────────────────────────────────────────────

  idea_mediocre_detector: {
    id: 'idea_mediocre_detector',
    title: '这篇怎么也发上去了',
    description: [
      '你在顶会论文列表里看到一篇贡献存疑的论文，开始反思审稿机制。',
      '实验只有一个 baseline，数据集不清楚怎么构建的，结论和摘要对不上。但它被接收了，而你认识的几个人更好的工作被拒了。',
      '这不是个例。审稿过程里的噪声很大，低质量论文混入顶会的情况并不罕见。',
      '如果训练一个自动质量分类器，用历史论文数据进行有监督学习，能否以高于随机的准确率识别出这类论文？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'build_quality_filter',
        text: '给这篇打个分，看分类器能不能识别',
        outcomes: [
          {
            weight: 1,
            narrative: '你给这篇论文跑了几个简单的质量指标，分数很低。然后你给自己最近的论文也跑了一遍……略高，但没高多少。这件事有点递归。\n\n💡 获得灵感：「水会检测系统」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'mediocre_paper_detector' }],
          },
        ],
      },
      {
        id: 'write_rebuttal',
        text: '关掉，不值得多看',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了那篇论文，打开了自己的文档。愤怒转化为动力，这个下午写得出奇地顺畅。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 引用炸弹防御 ──────────────────────────────────────────────────────────

  idea_citation_bomb: {
    id: 'idea_citation_bomb',
    title: '这篇引用了什么',
    description: [
      '{studentName}在做文献综述时，发现某篇论文的参考文献里有大量自引和圈内互引。',
      '38 条参考文献，11 条是作者自己的文章，9 条来自同一个小团队。这篇论文引用量很高，因为被同一批人引用了很多次。',
      '这种"引用炸弹"在某些领域已经是一种有组织的策略，用于提升 H-index 和论文排名。',
      '如果构建一个检测系统，识别不正常的引用网络结构，可以帮助期刊和读者更准确地评估学术影响力。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 65 },
    ],
    options: [
      {
        id: 'build_defense',
        text: '把这个圈子的引用图画出来',
        outcomes: [
          {
            weight: 1,
            narrative: '你构建了这个作者群体的引用网络，越画越觉得结构异常明显。这种异常是有算法特征的，也是可以被检测的。\n\n💡 获得灵感：「引用炸弹防御」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'citation_bomb_defense' }],
          },
        ],
      },
      {
        id: 'ignore_it',
        text: '加进黑名单，引用时绕开',
        outcomes: [
          {
            weight: 1,
            narrative: '你在备忘录里记了一笔：这个圈子的论文，引用时谨慎对待。知道这件事的人比能改变它的人多，至少你不会被骗进去。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── 答辩崩溃预测 ──────────────────────────────────────────────────────────

  idea_defense_breakdown: {
    id: 'idea_defense_breakdown',
    title: '答辩前的沉默',
    description: [
      '{studentName}在答辩演练时突然停顿，沉默了三十秒，然后说"我忘了"。',
      '你见过太多类似的场景。某个委员会问题击中了一个没有准备好的点，整个思路就断掉了。',
      '这种现象有某种规律：哪些问题最容易触发崩溃？什么样的准备状态会提高风险？生理信号（心率、声音）能否提前预测？',
      '如果在答辩演练里收集数据，建立一个崩溃预测模型，可以帮助学生提前强化薄弱点。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 70 },
      { type: 'anyStudent', stat: 'happiness', op: '<=', value: 50 },
    ],
    options: [
      {
        id: 'build_predictor',
        text: '问{studentName}愿不愿意戴个手环做个实验',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}想了想说："只要能过答辩，什么都行。"你开始设计数据采集方案，心率、声音频率、停顿时长……\n\n💡 获得灵感：「答辩崩溃预测」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'defense_breakdown_predictor' }],
          },
        ],
      },
      {
        id: 'help_student',
        text: '陪{studentName}把那几道题再演练一遍',
        outcomes: [
          {
            weight: 1,
            narrative: '你陪{studentName}反复练了那几个薄弱问题，专打最可能被委员追问的点。答辩那天{studentName}稳得出奇，你比TA还高兴了一会儿。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 10 },
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
            ],
          },
        ],
      },
    ],
  },

  // ── 学术六度空间 ──────────────────────────────────────────────────────────

  idea_six_degrees: {
    id: 'idea_six_degrees',
    title: '你认识他吗',
    description: [
      '你发现自己和一位从未联系过的学者之间只隔了两个人。',
      '你在查一篇论文的参考文献，注意到第三作者是导师的导师的学生，而那个人和你想联系的大佬合写过论文。两跳。',
      '你开始想：这个"学术社交距离"有多短？CS 领域的学者平均间隔几跳？和其他领域比较呢？',
      '小世界现象在学术合作网络里的具体参数，从来没有人认真测过。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 72 },
    ],
    options: [
      {
        id: 'measure_distance',
        text: '下个合著图数据，验证一下这个两跳',
        outcomes: [
          {
            weight: 1,
            narrative: '你下载了 CS 领域的合著图数据，原本只想确认"两跳"这件事，结果发现平均路径比任何人预想的都短。\n\n💡 获得灵感：「学术六度空间」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'academic_six_degrees' }],
          },
        ],
      },
      {
        id: 'ask_for_intro',
        text: '直接发邮件，最坏不过没回复',
        outcomes: [
          {
            weight: 1,
            narrative: '你直接给那位学者发了封邮件，附上了两篇最相关的论文。对方三天后回复了，说有很多可以聊的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
        ],
      },
    ],
  },

  // ── AI 审稿对齐 ──────────────────────────────────────────────────────────

  idea_ai_review_alignment: {
    id: 'idea_ai_review_alignment',
    title: '让 AI 来审稿',
    description: [
      '你听说某个会议今年用了 AI 辅助审稿，审稿意见的一致性明显提高了。',
      '传统审稿的噪声很大：同一篇论文，不同审稿人的评分方差可以达到三分。AI 辅助减少了这种随机性。',
      '但"减少随机性"不等于"更准确"，如果 AI 的偏好和历史接受模式对齐，可能只是更稳定地重复了过去的偏见。',
      '训练一个审稿模型，用 RLHF 让它的偏好分布和目标会议历史对齐，然后分析这个模型暴露出什么样的系统性偏差。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 65 },
    ],
    options: [
      {
        id: 'build_review_model',
        text: '下历史审稿数据，训练一个偏好模型',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始收集 OpenReview 上的历史数据，设计偏好学习框架。有个问题越来越清晰：这个模型会比人类更公正，还是更稳定地重复偏见？\n\n💡 获得灵感：「AI 审稿对齐」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'ai_review_alignment' }],
          },
        ],
      },
      {
        id: 'oppose_ai_review',
        text: '发帖：AI 审稿是在用偏见优化偏见',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一篇观点文章，旗帜鲜明地反对。出乎意料地获得了很多转发，其中不少来自顶会 PC member，你的名字被更多人记住了。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 2 }],
          },
        ],
      },
    ],
  },

  // ── 深夜提交效应 ──────────────────────────────────────────────────────────

  idea_late_submission: {
    id: 'idea_late_submission',
    title: '最后五分钟上传',
    description: [
      '你注意到实验室里大家都习惯在截止前最后几分钟提交论文。',
      '组里{studentName}是唯一提前两天提交的人。你好奇地比对了一下，TA的接收率和其他人并无显著差异。',
      '你开始回忆：自己接收的论文是什么时间提交的？你审过的论文里，午夜前提交和当天下午提交的，质量有差异吗？',
      '如果收集大量提交时间戳和最终结果，找找有没有隐藏在里面的时间效应……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'study_submission_time',
        text: '整理一下组里的提交记录，找找规律',
        outcomes: [
          {
            weight: 1,
            narrative: '你从 OpenReview 的公开记录里整理了提交时间戳，发现了一件奇怪的事：越接近截止时间提交的论文，引用率均值反而偏高。\n\n💡 获得灵感：「深夜提交效应」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'late_submission_effect' }],
          },
        ],
      },
      {
        id: 'submit_early',
        text: '设个闹钟，下次提前两天提交',
        outcomes: [
          {
            weight: 1,
            narrative: '你在日历上郑重设定了提醒。三个月后，你提前了一天提交。这对你来说已经是历史性的突破。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
  },

  // ── GPU排队博弈 ───────────────────────────────────────────────────────────

  idea_gpu_queue: {
    id: 'idea_gpu_queue',
    title: 'GPU集群里的隐形博弈',
    description: [
      '你发现实验室里几乎每个人都在特定时间点提交任务，规律性强得像是提前约好的。',
      '{studentName}昨晚11点提交了一个要跑36小时的任务，恰好卡在另一个任务结束后15分钟。你问了一句，对方说："就是感觉这个时候提成功率高。"',
      '你想了想：集群状态可预测，任务时长可估计，所有人都在优化自己的队列位置。这不是随机提交，这是一场从来没有人宣布开始的竞赛。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'set_gpu_rules',
        text: '制定规范，大家提前申报资源使用计划',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了一封邮件，要求每周五提前申报次周的大型任务。第一周执行顺利，第二周有两个人"忘了"，第三周大家找到了申报表的空白字段，开始用它来占位。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
      {
        id: 'analyze_submit_log',
        text: '从日志里把过去几个月的提交时间拉出来，画个分布图',
        outcomes: [
          {
            weight: 1,
            narrative: '时间分布图出来的时候，你盯着看了很久。峰值完全不是随机的，而且每个人的峰值时段几乎不重叠——他们在无意识地避开彼此，同时也在竞争。这是一场从来没有明说的博弈。\n\n💡 获得灵感：「GPU排队博弈」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'gpu_queue_game_theory' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 摸鱼检测器 ───────────────────────────────────────────────────────────

  idea_slacking_detector: {
    id: 'idea_slacking_detector',
    title: '这是在思考还是在发呆',
    description: [
      '{studentName}已经盯着屏幕四十分钟了，光标没有动过一次。',
      '你走过去问了句"进展怎么样"，{studentName}立刻回过神来说"刚在想一个事情"，然后打了几行字证明这一点。',
      '你走回自己的位置，发现自己也盯着论文看了二十分钟，一个字没写。这两种状态的表面特征，几乎完全一样。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 8 },
    ],
    options: [
      {
        id: 'knock_on_door',
        text: '进去说一声"有进度发一下群"',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}发了一段进度更新，思路清晰，看来那四十分钟没有浪费。你也不确定自己那二十分钟算什么，但此刻不适合深究。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 2 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'take_photos',
        text: '随手拍了几张，对比两种状态下的表情差异',
        outcomes: [
          {
            weight: 1,
            narrative: '你把照片并排放：眼睛焦距不一样，肩膀姿态不一样，鼠标手的张弛程度也不一样。区别是客观存在的，而且比你预期的更可测量。\n\n💡 获得灵感：「摸鱼检测器」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'slacking_detector' },
              { type: 'lab', stat: 'energy', delta: -3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 分布式甩锅协议 ────────────────────────────────────────────────────────

  idea_blame_propagation: {
    id: 'idea_blame_propagation',
    title: '这是谁的锅',
    description: [
      '实验室服务器今天宕机，两个正在跑的实验中断，数据库连接全部失败。',
      '你问了一圈：负责运维的说是磁盘满了，负责磁盘的说是日志没配轮转，负责日志配置的说这原本是运维的职责。每次转移都有理由，每次理由都能找到下一个人来接。',
      '你站在这场对话中间意识到，这个传播路径有某种奇特的规律——锅不是随机落点的，它沿着某种拓扑结构运动，而且几乎总是找到一个无法反驳的终点。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 12 },
    ],
    options: [
      {
        id: 'organize_postmortem',
        text: '组织复盘，把根因分析写成文档',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一份事后复盘，根因明确，改进措施具体。大家认真读完，郑重点头，然后在下次崩溃时忘得一干二净。至少这次的锅有了官方定性。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'trace_blame_path',
        text: '默默记下每次甩锅的方向，看看这条链终止在哪里',
        outcomes: [
          {
            weight: 1,
            narrative: '你在纸上画了一张图：每个节点是一个角色，箭头是甩锅方向。最后，锅稳稳落在了一个已经毕业两年的学生身上——他的 GitHub 账号已经注销了。这个模式太规律，规律到值得认真研究。\n\n💡 获得灵感：「分布式甩锅协议」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'blame_propagation' },
              { type: 'lab', stat: 'energy', delta: -3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 命名即命运 ────────────────────────────────────────────────────────────

  idea_variable_naming: {
    id: 'idea_variable_naming',
    title: '这个变量叫什么',
    description: [
      '{studentName}的代码 review 里，连续三屏都是 `data2`、`result_tmp`、`flag_new_v2`。',
      '你指着某一行问："这个 `tmp3` 是什么意思？"停顿了五秒，{studentName}说："就是个临时变量。"你再问："那 `tmp4` 呢？"又是停顿。',
      '你最终数了一下：整个文件有22个以 tmp 开头的变量，没有两个含义完全相同。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'send_naming_guide',
        text: '给{studentName}发一份命名规范，下次 review 前必须改好',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}把所有 tmp 都改了，改完后的代码一目了然，review 速度快了将近一倍。你满意地关上标签页，想到了每个月那两次同样的对话。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -2 },
              { type: 'randomStudent', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'check_bug_rate',
        text: '翻一下 git log，看看改名前后 bug 提交频率有没有变化',
        outcomes: [
          {
            weight: 1,
            narrative: '你提取了三个月的 commit 记录，把重命名前后的 bug 修复次数对比了一下。结果出乎意料地清晰：语义清晰的命名，与后续更少的 bug 修复高度相关。这个规律可以系统地量化。\n\n💡 获得灵感：「命名即命运」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'variable_naming_law' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
  },

  // ── TODO完备性理论 ────────────────────────────────────────────────────────

  idea_todo_completeness: {
    id: 'idea_todo_completeness',
    title: '这里有多少个TODO',
    description: [
      '你搜了一下代码库里的 TODO 注释，返回了287条。',
      '其中最老的一条写于三年前，内容是"TODO: 之后优化这个循环"。你找到那段代码，循环还在，TODO 也还在。',
      '最新的一条是昨天{studentName}提交的：`# TODO: 为什么这里work？`——你看了半天，不知道为什么这里 work，但也没办法删掉这行注释。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'todo_cleanup',
        text: '发起大扫除，两周内必须处理完所有遗留 TODO',
        outcomes: [
          {
            weight: 1,
            narrative: '两周后清掉了73条，与此同时新增了91条。你看着净增的18条沉默了很久，然后在自己的文档里写下："TODO: 想清楚这件事为什么发生。"',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'plot_todo_growth',
        text: '按时间排个序，看看这些 TODO 的增长曲线长什么样',
        outcomes: [
          {
            weight: 1,
            narrative: '你导出了所有 TODO 的首次提交时间，画了一条累积曲线。单调递增，没有例外。斜率随项目规模扩大而加速，更像是物理定律，而不是工程问题。\n\n💡 获得灵感：「TODO完备性理论」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'todo_completeness' },
              { type: 'lab', stat: 'energy', delta: -3 },
            ],
          },
        ],
      },
    ],
  },

  // ── 审稿人不可能定理 ──────────────────────────────────────────────────────

  idea_reviewer_impossibility: {
    id: 'idea_reviewer_impossibility',
    title: '完美审稿意见',
    description: [
      '你收到了一条看起来很建设性的审稿意见：有具体建议，措辞通情达理，读起来确实认真。',
      '仔细读完，你发现 Reviewer 说"第4节的假设X没有实验支持"——但你在第6节表3里有三个专门验证这一点的实验。',
      '你翻到第三条意见，那里引用了第4节的公式。但如果 Reviewer 没读到第6节，他又是怎么知道第4节和第3节之间的关联的？你开始在脑子里拼这个矛盾，发现三条意见放在一起，逻辑上根本无法同时成立。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 20 },
    ],
    options: [
      {
        id: 'rebuttal_politely',
        text: '按意见修改，在 rebuttal 里礼貌指出"该部分已在第6节论述"',
        outcomes: [
          {
            weight: 3,
            narrative: '你在 rebuttal 里写道："感谢建设性意见。关于第4节，相关实验已在第6节表3详细列出，请参阅。"对方没有回应，但论文最终被接收了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你礼貌地指出了矛盾。论文被拒了，但 Reviewer 在二审回复里说"感谢作者的认真回复"，这大概算是一种道义上的胜利。',
            effects: [{ type: 'lab', stat: 'energy', delta: -10 }],
          },
        ],
      },
      {
        id: 'map_contradictions',
        text: '把三条意见并排列出来，理一下它们之间的逻辑关系',
        outcomes: [
          {
            weight: 1,
            narrative: '你把三条意见画成关系图：第一条要求增加实验，第二条说实验太多，第三条的建设性前提是接受了第一条。三个要求不能同时满足。你开始想这是不是一个普遍的结构性矛盾。\n\n💡 获得灵感：「审稿人不可能定理」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'reviewer_impossibility' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
  },

  // ── 智能体社会学 ──────────────────────────────────────────────────────────

  idea_agent_sociology: {
    id: 'idea_agent_sociology',
    title: '智能体开始分工了',
    description: [
      '你的多智能体实验跑了几百轮后，任务分配模式开始变得不随机了。',
      '实验设计很简单：100个语言智能体，任务随机分配，观察协作效果。但某些智能体总在接高复杂度任务，另一批稳定接简单任务，分工清晰得像是提前商量好的。',
      '没有任何明确的分工机制，但分工自发出现了。更奇怪的是，那些被固定承担复杂任务的智能体，响应时间逐渐变长了。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 75 },
    ],
    options: [
      {
        id: 'check_random_seed',
        text: '重置实验，检查随机数种子是不是出了问题',
        outcomes: [
          {
            weight: 1,
            narrative: '你检查了随机数生成器，没有问题。重置后再跑，同样的分化仍然出现，而且这次速度更快。你记了一行日志，决定先观察再说。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
      {
        id: 'let_it_run',
        text: '先不动，让它再跑500轮，把行为日志都存下来',
        outcomes: [
          {
            weight: 1,
            narrative: '到第800轮时，分工已经非常稳定，出现了两个始终回避高复杂度任务的智能体，行为模式类似于在系统性推卸工作。你意识到这不是bug——这是一个值得认真研究的社会现象。\n\n💡 获得灵感：「智能体社会学」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'agent_sociology' },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
    ],
  },

  // ── 拖延行为建模 ──────────────────────────────────────────────────────────

  idea_procrastination: {
    id: 'idea_procrastination',
    title: '打开又关上',
    description: [
      '你今天已经打开了这篇论文许多次，每次都在五分钟内关掉。',
      '你很清楚今天必须写完这个章节。你也很清楚你不会去写。',
      '你打开了浏览器，搜了一下"为什么人类会拖延"。然后发现这是一个真正有学术研究的领域——但大多数研究是问卷和访谈，缺乏行为数据。',
      '如果装一个后台日志，记录窗口切换、打字节奏、浏览器标签数……把拖延过程的每个微决策都捕捉下来，是不是可以建一个比较靠谱的计算模型？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 58 },
      { type: 'lab', stat: 'energy', op: '<=', value: 70 },
    ],
    options: [
      {
        id: 'actually_write',
        text: '关掉所有标签，专注论文',
        outcomes: [
          {
            weight: 3,
            narrative: '你写了三段，虽然质量存疑，但毕竟写出来了。截止日期没有来临前，这就够了。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
          {
            weight: 1,
            narrative: '你一口气写完了整个章节，效率之高让你自己都吓到了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'model_procrastination',
        text: '关掉论文，新建文档写采集方案',
        outcomes: [
          {
            weight: 1,
            narrative: '你开了一个新文档，把数据采集方案一口气写完了。这算是工作吗？算。写完之后心情很好，顺手把论文打开，居然写了两段。\n\n💡 获得灵感：「拖延行为建模」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'procrastination_model' }],
          },
        ],
      },
      
    ],
  },
};
