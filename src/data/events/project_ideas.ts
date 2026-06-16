import type { GameEvent } from '../../types';

// ─── 灵感事件 ──────────────────────────────────────────────────────────────
// 这些事件的某个 outcome 包含 unlockIdea effect，触发后在项目面板显示对应 idea。
// 事件设计原则：先有情境，再有灵感，不能直接给项目。

export const projectIdeaEvents: Record<string, GameEvent> = {

  // ── 组会纪要小助手（新手引导，第1年10月固定触发）────────────────────────────

  idea_meeting_minutes_assistant: {
    id: 'idea_meeting_minutes_assistant',
    title: '组会记录失踪事件',
    prompt: '组会结束后，你想找上周的讨论记录，发现根本不存在。',
    description: [
      '你问了三个学生，没人知道上周到底决定了什么。你自己也不太记得。纪要在哪里？"应该……有人记的吧？"三人互相对视，陷入沉默。',
      '你翻了翻组群聊天记录，唯一的相关内容是一条消息："今天组会很顺利！"后面跟着六个笑脸表情。没有任何实质性内容。',
      '这种事不该再发生了。如果有个工具能把组会录音自动整理成结构化纪要，不仅方便追溯，还能量化每个人的发言贡献——或者量化谁一直在沉默。',
      '💡 顺带一提：这种小工具其实工程量不大，能锻炼学生，还能出一篇不错的系统论文。你感觉找到了什么好项目。',
    ],
    options: [
      {
        id: 'build_minutes_tool',
        text: '启动这个项目，从下次组会开始录音',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了一个下午配好了录音流程，在组里公告："以后组会有纪要了。"学生们热烈鼓掌，然后问："那以后还需要做 PPT 吗？"\n\n💡 获得灵感：「组会纪要小助手」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'meeting_minutes_assistant' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'diy_minutes',
        text: '算了，以后自己记',
        outcomes: [
          {
            weight: 1,
            narrative: '你打开了一个新文档，郑重其事地写下"组会纪要 · 第X周"。然后下一场组会开始了，你把文档最小化，再也没有打开过。',
            effects: [{ type: 'lab', stat: 'energy', delta: -3 }],
          },
        ],
      },
    ],
  },

  // ── 导师回复预测 ─────────────────────────────────────────────────────────

  idea_advisor_reply: {
    id: 'idea_advisor_reply',
    title: '消息已读不回',
    prompt: '合作教授的消息三周前发出去，对方已读，没有回复。',
    description: [
      '你盯着聊天记录发呆。三周了，已读，没有回复。',
      '你开始回忆这位教授的历史行为模式：下午三点最活跃，周五沉默，收到截止日期提醒后必有回音……你突然意识到这些规律是可以被建模的。',
      '历史聊天记录加时间序列分析，完全可以训练一个"导师回复预测器"。而且几乎所有人都用得上。',
    ],
    options: [
      {
        id: 'model_it',
        text: '把这个想法记下来',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你打开笔记本，写下了几行公式框架，越写越投入，不知不觉过了一个小时。\n\n💡 获得灵感：「导师回复预测」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'advisor_reply_predictor' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'just_wait',
        text: '再等等，也许对方很忙',
        outcomes: [
          {
            weight: 1,
            narrative: '你继续等待，顺手处理了几封积压的邮件。消息依然已读，没有回复——但今天其他的事倒是都清完了。',
            effects: [{ type: 'lab', stat: 'energy', delta: 3 }],
          },
        ],
      },
    ],
  },

  // ── 自动 Rebuttal ─────────────────────────────────────────────────────────

  idea_auto_rebuttal: {
    id: 'idea_auto_rebuttal',
    title: 'Reviewer #2 又来了',
    prompt: '论文审稿结果回来了，Reviewer #2 的意见长达两页，充满了哲学质疑。',
    description: [
      'Reviewer #2 给出了一个令人叹为观止的审稿意见：第一条质疑你的动机，第二条质疑实验室的存在意义，第三条建议你去读一篇1983年的冷门论文。',
      '你不是第一次面对这种意见了。你打开三年前的 Rebuttal，发现格式几乎可以完全复用。',
      '这个模式太强了。审稿意见的结构是可重复的，历史 Rebuttal 库加上大模型，完全可以自动化这个痛苦过程。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'write_rebuttal_idea',
        text: '先记下这个想法，再写 Rebuttal',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你花了二十分钟把这个系统的雏形写进了备忘录。然后才开始应对 Reviewer #2。\n\n💡 获得灵感：「自动 Rebuttal」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'auto_rebuttal' }],
          },
        ],
      },
      {
        id: 'just_rebuttal',
        text: '先集中精力回复审稿意见',
        outcomes: [
          {
            weight: 3,
            narrative: '你花了半天写完了 Rebuttal，发现这件事真的太痛苦了。下次一定要想个办法。',
            effects: [{ type: 'lab', stat: 'energy', delta: -10 }],
          },
          {
            weight: 1,
            narrative: '写着写着，你突然觉得这流程可以自动化。\n\n💡 获得灵感：「自动 Rebuttal」——已记录到项目面板。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
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
    prompt: '服务器上有一个五年前的项目文件夹，没有 README，没有注释，没有作者信息。',
    description: [
      '文件夹名叫 `final_FINAL_v3_use_this_one`，里面有三千行无注释的 Python，和一个叫做 `do_not_run.sh` 的脚本。',
      '你花了两个小时，靠 git log 和错误信息，大概猜出了这个系统在做什么。它曾经是一个数据预处理流水线，作者已经毕业，无处可问。',
      '这个逆向过程本身就很有研究价值。给定一个历史代码库，能不能系统性地还原出当时的设计意图？commit 记录是线索，报错是线索，命名习惯也是线索。',
    ],
    options: [
      {
        id: 'archaeologize',
        text: '把这个方法论写成一篇论文',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你开始起草框架，感觉越想越有意思，不知不觉又多看了两个小时的 commit 记录。\n\n💡 获得灵感：「代码考古学」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'code_archaeology' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'give_up',
        text: '算了，直接重写',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了那个文件夹，开了一个新的。重写比你预计的慢得多——没有文档，每个参数都要靠猜。',
            effects: [{ type: 'lab', stat: 'energy', delta: -8 }],
          },
        ],
      },
    ],
  },

  // ── 校园 Agent ────────────────────────────────────────────────────────────

  idea_campus_agent: {
    id: 'idea_campus_agent',
    title: '教务系统再次崩溃',
    prompt: '今天要提交一份在线表格，页面加载了三分钟后闪退，数据全失。',
    description: [
      '这个表格你已经填了第三遍了。它要求你先登录，再二次验证，再上传一份PDF（只能是PDF），再等系统发确认邮件到另一个邮箱……',
      '你想起来学生也在抱怨类似的事情：选课要抢，报销要跑三个部门，借设备要去线下签字。',
      '如果有个 Agent 能帮你处理这些日常琐事就好了。理解页面结构，自动填写，知道什么时候要等、什么时候可以催。',
    ],
    options: [
      {
        id: 'build_it',
        text: '这确实值得做一下',
        energyCost: 5,
        outcomes: [
          {
            weight: 1,
            narrative:
              '你在浏览器 DevTools 里随手看了眼页面结构，越看越觉得有搞头。\n\n💡 获得灵感：「校园 Agent」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'campus_agent' }],
          },
        ],
      },
      {
        id: 'fill_again',
        text: '忍一忍，再填一遍',
        outcomes: [
          {
            weight: 1,
            narrative: '你咬牙填完了第四遍。成功提交。愤怒逐渐平息，然后又涌了上来。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
    ],
  },

  // ── DDL 强化学习 ──────────────────────────────────────────────────────────

  idea_ddl_reinforcement: {
    id: 'idea_ddl_reinforcement',
    title: '最后一小时',
    prompt: '论文截止还有一个小时，你突然意识到实验部分有个漏洞。',
    description: [
      '这是你第三次在最后时刻发现问题。每次都是同样的感受：绝望，然后奇迹般地找到一个够用的解法，然后提交。',
      '你开始想：为什么人类在 deadline 前会激活一种平时找不到的工作状态？为什么一小时能做完平时三天做不完的事？',
      '如果把这个"最后时刻决策过程"建模成一个强化学习问题——奖励是提交成功，惩罚是超时或质量太差——会不会是一篇好论文？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'energy', op: '<=', value: 60 },
    ],
    options: [
      {
        id: 'model_ddl',
        text: '先把想法记下来，deadline 之后再说',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你用三十秒写了一行备注，然后继续救场。\n\n💡 获得灵感：「DDL 强化学习」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'ddl_reinforcement' }],
          },
        ],
      },
      {
        id: 'focus',
        text: '先把眼前这个 deadline 过了再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你闭上眼睛深呼吸，进入了那个奇异的状态。两小时后，论文提交成功。',
            effects: [{ type: 'lab', stat: 'energy', delta: -15 }],
          },
        ],
      },
    ],
  },

  // ── 海豚语言模型 ──────────────────────────────────────────────────────────

  idea_dolphin_llm: {
    id: 'idea_dolphin_llm',
    title: '奇怪的 Workshop',
    prompt: '你误点进了一个"跨物种通信与语言学习"研讨会的直播。',
    description: [
      '你本来是想找另一个会议的直播链接的。结果点进去，一位海洋生物学家正在讲解海豚的声纹结构和语义单元分析。',
      '你意识到海豚的通信系统有某种类似语言的层级结构——音节、语句、语境依赖。过去二十年有人在尝试解码，但没有人用语言模型做过。',
      '你知道这个想法有点荒诞。但"荒诞"曾经是很多顶会论文的第一印象。而且这个数据集在某个海洋研究所开放了。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 8 },
    ],
    options: [
      {
        id: 'go_wild',
        text: '记下来，说不定真能做',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你本来只想找一下数据集，结果看了三个小时的海洋生物学论文，晚饭都忘了吃。\n\n💡 获得灵感：「海豚语言模型」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'dolphin_llm' },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'close_tab',
        text: '关掉，这个不是你的方向',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了 tab，回到了手头的工作。省下来的注意力正好用在了一个卡了很久的问题上。',
            effects: [{ type: 'lab', stat: 'energy', delta: 5 }],
          },
        ],
      },
    ],
  },

  // ── 幸运T恤因果推断 ───────────────────────────────────────────────────────

  idea_lucky_shirt: {
    id: 'idea_lucky_shirt',
    title: '玄学的力量',
    prompt: '你发现自己每次穿那件红色T恤，论文都会被接收。',
    description: [
      '三次了。三次穿那件红色T恤的日子，都有好消息。你清楚地知道这是幸存者偏差，但你还是把那件衬衫挂在了显眼的地方。',
      '在组会上，你随口提了一下。没想到三位学生都有类似的"幸运物"——幸运钢笔、幸运马克杯、还有一双专门用来debug的拖鞋。',
      '等等——如果用随机对照实验，真的测一测这些仪式和科研产出的相关性，你会得到什么结论？零假设很容易被拒绝吗？还是说……',
    ],
    options: [
      {
        id: 'run_experiment',
        text: '设计一个严肃的实验方案',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你在白板上写下了实验设计。匿名招募参与者，随机分配"幸运条件"，测量一个月产出。设计完发现还需要 IRB 审批……\n\n💡 获得灵感：「幸运T恤因果推断」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'lucky_shirt_causality' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'dismiss',
        text: '这纯粹是迷信，不值得研究',
        outcomes: [
          {
            weight: 1,
            narrative: '你理性地否定了这个想法。头脑清醒了，下午的工作出乎意料地顺利。然后悄悄把红色T恤叠好放回了抽屉里。',
            effects: [{ type: 'lab', stat: 'energy', delta: 3 }],
          },
        ],
      },
    ],
  },

  // ── 组会翻译 ──────────────────────────────────────────────────────────────

  idea_meeting_translator: {
    id: 'idea_meeting_translator',
    title: '你说的是中文吗',
    prompt: '组会刚结束，你发现自己完全没听懂学生汇报了什么。',
    description: [
      '你知道他说的每个词，但组合在一起就不知道意思了。"端到端的联合优化框架在多模态对齐任务上的渐进式微调范式"——这到底是在做什么？',
      '你不是唯一的受害者。另一位老师凑过来小声问你："他的工作是什么来着？"你摇了摇头。',
      '如果有个系统能把组会发言实时翻译成人类可以理解的语言，消灭废话和术语堆砌，也许每周能省下不少时间。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'translate_idea',
        text: '这个想法很有实用价值，记下来',
        outcomes: [
          {
            weight: 1,
            narrative: '你掏出手机，把这个想法记进了备忘录。\n\n💡 获得灵感：「组会翻译」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'meeting_translator' }],
          },
        ],
      },
      {
        id: 'ask_again',
        text: '让他重新解释一遍',
        outcomes: [
          {
            weight: 1,
            narrative: '学生重新解释了一遍，这次用的术语更多了。你点了点头，表示理解。你没有理解。',
            effects: [{ type: 'lab', stat: 'energy', delta: -3 }],
          },
        ],
      },
    ],
  },

  // ── 邮件礼貌税 ────────────────────────────────────────────────────────────

  idea_email_politeness: {
    id: 'idea_email_politeness',
    title: '邮件的艺术',
    prompt: '你写了一封措辞非常礼貌的邮件，对方在三分钟内回复了。',
    description: [
      '上周那封直接请求帮忙的邮件石沉大海。这周你加了四个"辛苦了"、两个"打扰一下"，对方三分钟内回复。',
      '你开始思考这里面的规律。礼貌程度和回复速度之间是否存在函数关系？称呼的选择呢？"老师"vs"教授"vs名字？',
      '如果从历史邮件里把这些变量抽出来，做一个系统性的因果分析……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'research_politeness',
        text: '整理一下数据，看看能不能发篇论文',
        outcomes: [
          {
            weight: 1,
            narrative: '你翻出了过去两年的邮件记录，开始打标签。光是分类就花了一个下午。\n\n💡 获得灵感：「邮件礼貌税」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'email_politeness_tax' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'just_remember',
        text: '记住这个结论就够了',
        outcomes: [
          {
            weight: 1,
            narrative: '你在心里记下了"多加辛苦了"这条经验，然后回去把下一封邮件的措辞改得更客气了一些。效率颇高。',
            effects: [{ type: 'lab', stat: 'energy', delta: 3 }],
          },
        ],
      },
    ],
  },

  // ── 夜间代码效应 ──────────────────────────────────────────────────────────

  idea_night_code: {
    id: 'idea_night_code',
    title: '凌晨三点的天才方案',
    prompt: '学生在凌晨三点提交了一个 commit，注释写着"天才想法，明天解释"。',
    description: [
      '你点开了那个 commit。代码量惊人，但完全没有注释，变量名是 `tmp2`、`data_new_v3`、`AAAA`。',
      '第二天早上，学生看着屏幕沉默了很久，说："我昨晚好像写了点什么……"',
      '这不是第一次了。夜间代码总是有某种奇特的风格：密度高，注释少，创意偶尔爆炸，可读性接近零。如果系统地对比白天和深夜的代码质量，会发现什么？',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'study_night_code',
        text: '把这个现象当成研究课题',
        outcomes: [
          {
            weight: 1,
            narrative: '你拉取了实验室所有人的提交时间戳，花了一个下午整理数据，发现规律比想象的有趣得多。\n\n💡 获得灵感：「夜间代码效应」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'night_code_effect' },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'ignore_it',
        text: '让他补完注释就行了',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了一条消息："记得加注释。" 他回了一个"好的"，然后没有下文。两天后你亲自去问，他说他已经补完了。你打开一看，每个函数的注释都是"这个函数的作用是执行这个函数的逻辑"。',
            effects: [{ type: 'lab', stat: 'energy', delta: -3 }],
          },
        ],
      },
    ],
  },

  // ── Reviewer 对齐 ─────────────────────────────────────────────────────────

  idea_reviewer_alignment: {
    id: 'idea_reviewer_alignment',
    title: '审稿人画像',
    prompt: '同一篇论文，投不同会议得到截然不同的审稿意见。',
    description: [
      '上个月投 A 会，三个 Reviewer 都说"实验设计合理"。这个月投 B 会，三个 Reviewer 都说"缺乏基础实验"。论文一字未改。',
      '你开始意识到，不同会议有不同的"审稿文化"，甚至不同年份都有差异。这是可以量化的。',
      '如果从公开的接受/拒绝记录和历史审稿意见里训练一个偏好模型——在投稿前就预测审稿结论——也许可以省去很多无谓的拒稿来回。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'build_reviewer_model',
        text: '这个方向很有价值，值得认真做',
        outcomes: [
          {
            weight: 1,
            narrative: '你从 OpenReview 找到了近五年的公开审稿数据，开始分析。\n\n💡 获得灵感：「Reviewer 对齐」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'reviewer_alignment' }],
          },
        ],
      },
      {
        id: 'just_resubmit',
        text: '改好再投，没什么好研究的',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了审稿意见，开始修改。这个循环你还要走很多遍。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
    ],
  },

  // ── 茶歇社交网络 ──────────────────────────────────────────────────────────

  idea_coffee_social: {
    id: 'idea_coffee_social',
    title: '咖啡机旁的合作',
    prompt: '两组原本没有交集的学生，因为同时在等咖啡机，聊出了一个合作项目。',
    description: [
      '你亲眼看到了这件事。两个原本没有交集的学生，等了五分钟咖啡机，聊了一个午饭时间，最后决定合写一篇论文。',
      '你开始想：这种"茶歇效应"有多普遍？组会和正式会议的合作效率，和非正式交流场合相比怎么样？',
      '如果系统地记录谁在什么时候在哪里喝咖啡，分析非正式接触频率和后续合作关系……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 4 },
    ],
    options: [
      {
        id: 'map_coffee_network',
        text: '这是个被低估的研究方向',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始把茶歇签到表作为数据来源，想着怎么建网络模型。\n\n💡 获得灵感：「茶歇社交网络」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'coffee_social_network' }],
          },
        ],
      },
      {
        id: 'just_glad',
        text: '有合作就好，不用研究',
        outcomes: [
          {
            weight: 1,
            narrative: '你为他们高兴，顺手在组会上提了这件事。其他学生听了也受到了鼓舞，当天下午又多了两个自发交流的小组。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },

  // ── 学术梗传播 ────────────────────────────────────────────────────────────

  idea_meme_propagation: {
    id: 'idea_meme_propagation',
    title: '全组都在用的梗',
    prompt: '实验室里流行了一个新梗，三天后你发现隔壁组也开始用了。',
    description: [
      '起源是一条吐槽 GPU 排队的弹幕，有人截图发到了实验室群。然后不知道怎么，它变成了组里一切等待场景的统一回应词。',
      '三天后，你在隔壁实验室的学生群里看到了一样的梗，但配了不同的图。一周后，你在一个学术论坛上看到了它的变体。',
      '这个传播速度和变异过程是可以被建模的。学术圈是个封闭的小世界，文化产品在其中的流动有独特的路径。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'study_memes',
        text: '学术梗图是一个严肃的研究对象',
        outcomes: [
          {
            weight: 1,
            narrative: '你建了一个文档，开始记录每个梗的起源、变体和传播路径。结果你在这个文档上花了一个小时，而那段时间本来是用来写论文的。\n\n💡 获得灵感：「学术梗传播」——已记录到项目面板。',
            effects: [
              { type: 'unlockIdea', projectId: 'meme_propagation' },
              { type: 'lab', stat: 'energy', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'just_laugh',
        text: '好笑就够了',
        outcomes: [
          {
            weight: 1,
            narrative: '你笑了笑，转发给了另一个人。笑声传出去，整个下午实验室的气氛都好了不少。',
            effects: [{ type: 'lab', stat: 'energy', delta: 3 }],
          },
        ],
      },
    ],
  },

  // ── AI 论文鉴定 ───────────────────────────────────────────────────────────

  idea_ai_paper_detection: {
    id: 'idea_ai_paper_detection',
    title: '这篇论文是人写的吗',
    prompt: '你在审稿时越来越难判断一篇论文是否由 AI 生成。',
    description: [
      '第三段的行文太流畅了，没有任何学者写作时惯有的语气起伏。句子结构工整得像模板。你读了三遍，不确定。',
      '你问了另一位审稿人，对方说："我也说不准，但感觉怪怪的。"',
      '如果有一个分类器，能从词汇多样性、句子分布、引用风格等维度给出一个量化的"人类撰写概率"——这个工具现在非常需要。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 6 },
    ],
    options: [
      {
        id: 'build_detector',
        text: '开发一个检测工具',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始整理已知 AI 生成和人类撰写的论文数据集，设计特征工程方案。\n\n💡 获得灵感：「AI 论文鉴定」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'ai_paper_detection' }],
          },
        ],
      },
      {
        id: 'accept_anyway',
        text: '质量不错就行，不用纠结',
        outcomes: [
          {
            weight: 1,
            narrative: '你在意见栏写了"写作清晰，逻辑完整，建议接收"，认真提交了审稿意见。作为尽职的审稿人，这也是一种贡献。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },

  // ── 毕业进度预警 ──────────────────────────────────────────────────────────

  idea_graduation_delay: {
    id: 'idea_graduation_delay',
    title: '这个信号早就有了',
    prompt: '一个延期毕业的学生，你回看他的历史数据，发现早有预警。',
    description: [
      '学生正式申请延期后，你打开了他一年半前的提交记录。commit 频率在第三学期末开始显著下降，消息回复延迟从小时级变成了天级，组会请假次数增加。',
      '所有信号都在那里，你只是没有系统性地看。',
      '如果有个早期预警模型，在问题形成之前就给出提示，也许可以提前干预。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<=', value: 40 },
    ],
    options: [
      {
        id: 'build_warning_system',
        text: '设计一套早期预警系统',
        outcomes: [
          {
            weight: 1,
            narrative: '你整理出了几个核心指标，开始回溯历史案例进行验证。\n\n💡 获得灵感：「毕业进度预警」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'graduation_delay_predictor' }],
          },
        ],
      },
      {
        id: 'talk_to_student',
        text: '先和学生谈谈',
        outcomes: [
          {
            weight: 1,
            narrative: '你约了学生面谈，聊了两个小时，制定了新的计划。也许来得及。',
            effects: [{ type: 'randomStudent', stat: 'happiness', delta: 10 }],
          },
        ],
      },
    ],
  },

  // ── 引用网络挖掘 ──────────────────────────────────────────────────────────

  idea_citation_network: {
    id: 'idea_citation_network',
    title: '你们都引用彼此',
    prompt: '你在做文献调研时，发现某几位作者似乎在互相高频引用。',
    description: [
      '三篇论文，作者集合几乎相同，每篇都在引用另外两篇。你仔细看了看，发现这个小圈子在该领域的引用图里占据了一个明显的核心节点。',
      '这不像是真正的学术影响力，更像是一个有意经营的引用网络。',
      '如果把整个领域的引用图建出来，用社区检测算法分析结构，那些"引用帮派"是否会自动浮现？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'mine_citations',
        text: '值得系统研究一下',
        outcomes: [
          {
            weight: 1,
            narrative: '你下载了 Semantic Scholar 的公开数据集，开始构建引用图。\n\n💡 获得灵感：「引用网络挖掘」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'citation_network_mining' }],
          },
        ],
      },
      {
        id: 'report_it',
        text: '举报给期刊编委',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了一个小时整理证据，写了一封措辞严谨的邮件。编委回复说"已收到，我们会关注"。你没有再收到任何消息。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
    ],
  },

  // ── 超参数玄学 ────────────────────────────────────────────────────────────

  idea_hyperparameter_divination: {
    id: 'idea_hyperparameter_divination',
    title: '炼丹是一种艺术',
    prompt: '学生用直觉调出来的参数，比你精心设计的网格搜索结果还要好。',
    description: [
      '学习率 3e-4，batch size 256，没有任何理论依据，只是"感觉这个好"。最终结果超出了你半个月自动化搜索的最佳结果。',
      '你问他为什么选这组参数。他说："这一套在上个项目有效，就试了一下。"',
      '这让你开始思考：专家直觉和贝叶斯优化之间的差异到底是什么？两者的搜索路径能否可视化对比？哪些参数是真正重要的，哪些是在安慰自己？',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'skills.engineering', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'study_tuning',
        text: '把炼丹过程形式化为研究课题',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始收集实验室历次调参记录，准备做一次系统性的对比分析。\n\n💡 获得灵感：「超参数玄学」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'hyperparameter_divination' }],
          },
        ],
      },
      {
        id: 'use_the_params',
        text: '先用着，原因以后再研究',
        outcomes: [
          {
            weight: 1,
            narrative: '你把那组参数加入了标准配置，省下了原本要花在超参搜索上的时间。为什么有效？不知道。有效就够了。',
            effects: [{ type: 'lab', stat: 'energy', delta: 5 }],
          },
        ],
      },
    ],
  },

  // ── 白板消失定理 ──────────────────────────────────────────────────────────

  idea_whiteboard_erasure: {
    id: 'idea_whiteboard_erasure',
    title: '白板被擦了',
    prompt: '组会后你回到会议室，白板上的推导已经被人擦干净了。',
    description: [
      '那上面有你花了四十分钟才推出来的一个不等式，你当时觉得"反正还在，等会儿再拍照"。',
      '现在白板空空如也，你努力回忆，只记得结论是正确的，但过程……消失了。',
      '你问了其他人，没有人记录。这种事在学术界有多常见？那些因为没有拍照、没有记录而永远消失的推导，到底有多少？',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'study_erasure',
        text: '这个问题值得认真统计',
        outcomes: [
          {
            weight: 1,
            narrative: '你设计了一个问卷，准备系统调查白板信息的消失率和可恢复率。\n\n💡 获得灵感：「白板消失定理」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'whiteboard_erasure_theorem' }],
          },
        ],
      },
      {
        id: 're_derive',
        text: '重新推一遍',
        outcomes: [
          {
            weight: 1,
            narrative: '你重新推了一遍。这次花了两个小时，结果略有不同，你不确定哪个是对的。',
            effects: [{ type: 'lab', stat: 'energy', delta: -10 }],
          },
        ],
      },
    ],
  },

  // ── 宕机先知 ─────────────────────────────────────────────────────────────

  idea_server_oracle: {
    id: 'idea_server_oracle',
    title: '又要宕机了',
    prompt: '有经验的学生说"感觉今晚服务器要崩"，四小时后真的崩了。',
    description: [
      '他说不清楚为什么。"就是感觉，GPU 利用率曲线不对，存储涨得太快，加上昨天刚做了系统更新。"',
      '你让他写下来他是怎么判断的。他写了三条直觉指标。你一看，这三条都是可以从监控日志里提取的数值特征。',
      '如果训练一个模型，在崩溃前几小时给出预警，可以让大家提前保存进度。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 4 },
    ],
    options: [
      {
        id: 'build_oracle',
        text: '把这个直觉工程化',
        outcomes: [
          {
            weight: 1,
            narrative: '你从监控系统里拉出了过去两年的崩溃记录，开始标注训练数据。\n\n💡 获得灵感：「宕机先知」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'server_downtime_oracle' }],
          },
        ],
      },
      {
        id: 'fix_server',
        text: '先去把服务器救一下',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了一个小时恢复了系统，所有任务重新排队。又是熟悉的结局。',
            effects: [{ type: 'lab', stat: 'energy', delta: -10 }],
          },
        ],
      },
    ],
  },

  // ── 会议社交匹配 ──────────────────────────────────────────────────────────

  idea_conference_social: {
    id: 'idea_conference_social',
    title: '茶歇遇到对的人',
    prompt: '在一次学术会议上，你与一位从未听说过但研究高度相关的学者偶然相遇。',
    description: [
      '五分钟的对话，你们发现各自在用不同方法处理同一个问题。他有数据，你有算法。这次会面有很高概率变成一篇合作论文。',
      '但这是完全偶然的——你本来是去找洗手间的。',
      '学术会议有几百人，你只见到了站在同一区域的那二十个。如果有个系统，在会前就推算出谁是你最应该认识的人……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 7 },
    ],
    options: [
      {
        id: 'design_matching',
        text: '设计一个会议社交匹配系统',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始整理学术社交网络数据，思考匹配算法的核心维度。\n\n💡 获得灵感：「会议社交匹配」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'conference_social_matching' }],
          },
        ],
      },
      {
        id: 'exchange_contacts',
        text: '先把联系方式交换了再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你们加了联系方式，互相关注了学术主页。这次偶遇可能会有后续。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },

  // ── 组会博弈论 ────────────────────────────────────────────────────────────

  idea_meeting_game_theory: {
    id: 'idea_meeting_game_theory',
    title: '没有人想第一个汇报',
    prompt: '今天没有人主动报名第一个汇报，沉默持续了两分钟。',
    description: [
      '你环顾一圈，每个人都在看手机或者假装在翻笔记。最终一个学生叹了口气，说"我先来吧"。',
      '这个过程是一个经典的博弈——每个人都在计算等待成本和主动出击的收益。',
      '如果把组会出勤和汇报决策形式化为博弈论模型，分析不同激励结构下的均衡策略……',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 20 },
    ],
    options: [
      {
        id: 'model_meeting',
        text: '组会本身就是一个博弈',
        outcomes: [
          {
            weight: 1,
            narrative: '你画了一个简单的博弈树，发现结构比预想的有趣多了。\n\n💡 获得灵感：「组会博弈论」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'meeting_game_theory' }],
          },
        ],
      },
      {
        id: 'fix_order',
        text: '以后固定汇报顺序，不用博弈',
        outcomes: [
          {
            weight: 1,
            narrative: '你宣布了新规则：按学号轮流。沉默立刻消失了，组会效率明显提高。学生们私下表示，这个规则"终于正常了"。',
            effects: [{ type: 'lab', stat: 'energy', delta: 5 }],
          },
        ],
      },
    ],
  },

  // ── 致谢关系图谱 ──────────────────────────────────────────────────────────

  idea_acknowledgment_network: {
    id: 'idea_acknowledgment_network',
    title: '感谢那些无名英雄',
    prompt: '你在写论文致谢时，意识到致谢段落里藏着大量人际关系信息。',
    description: [
      '你列出了名字：帮你看过草稿的师兄、提过关键建议的同学、借给你 GPU 的外组朋友。这些人没有在作者列表里，但他们在这项工作里有真实的贡献。',
      '你突然想到：如果把几千篇论文的致谢段落提取出来，构建一个图——谁感谢了谁——这个网络的结构会是什么样子？',
      '学术圈真实的人情网络，可能比合作网络更能解释一些事情。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'mine_acknowledgments',
        text: '致谢是被忽视的数据源',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始写爬虫，从 arXiv 和 ACL 论文库里抽取致谢段落。\n\n💡 获得灵感：「致谢关系图谱」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'acknowledgment_network' }],
          },
        ],
      },
      {
        id: 'finish_writing',
        text: '先把致谢写完，投稿更重要',
        outcomes: [
          {
            weight: 1,
            narrative: '你写完了致谢，论文顺利提交。截止日期前完成一件事，总是让人舒一口气。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },

  // ── 摘要压缩极限 ──────────────────────────────────────────────────────────

  idea_abstract_compression: {
    id: 'idea_abstract_compression',
    title: '摘要太长没人读',
    prompt: '审稿人说"请缩短摘要，当前太长"，但你已经删了三遍了。',
    description: [
      '原始摘要 350 词，你削到了 280 词，审稿人说还是太长。你改到 240 词，又觉得核心贡献说不清楚了。',
      '你开始想：一篇论文的"核心贡献"到底需要多少词才能说清楚？压缩到什么程度开始出现信息损失？',
      '如果系统地对比不同长度摘要在引用率和阅读完成率上的差异，可以找到一个信息密度最优点。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'study_compression',
        text: '用信息论方法研究摘要压缩',
        outcomes: [
          {
            weight: 1,
            narrative: '你从 Semantic Scholar 导出了大量论文，准备研究摘要长度和引用率的关系。\n\n💡 获得灵感：「摘要压缩极限」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'abstract_compression' }],
          },
        ],
      },
      {
        id: 'cut_more',
        text: '继续删，总能删到审稿人满意为止',
        outcomes: [
          {
            weight: 1,
            narrative: '你删掉了"局限性"段落，把摘要压到了 200 词。审稿人满意了。你在那个删掉的部分上花了三个小时，现在它什么都不是了。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
    ],
  },

  // ── Prompt 考古学 ─────────────────────────────────────────────────────────

  idea_prompt_archaeology: {
    id: 'idea_prompt_archaeology',
    title: '大模型在撒谎',
    prompt: '同一个问题，新版本的 GPT 给出了和旧版本截然不同的答案。',
    description: [
      '你用了同样的 prompt，旧版说"我无法提供这方面信息"，新版直接给出了详细回答。不是问题本身变了，是模型变了。',
      '背后的变化是什么？系统提示？RLHF 偏好数据？训练数据的构成？你查了一下官方文档，没有任何说明。',
      '如果用系统性的诱导测试，从模型的行为反推它的系统提示和对齐策略，能还原出多少历史版本的决策逻辑？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 6 },
    ],
    options: [
      {
        id: 'archaeologize_prompts',
        text: '把这个逆向过程做成系统研究',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始设计测试集，对不同版本的大模型发出结构化探测请求。\n\n💡 获得灵感：「Prompt 考古学」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'prompt_archaeology' }],
          },
        ],
      },
      {
        id: 'report_behavior',
        text: '向官方反馈这个行为变化',
        outcomes: [
          {
            weight: 1,
            narrative: '你整理了对比截图和复现步骤，写了一份详细的反馈报告。自动回复说已收到，感谢您的反馈。',
            effects: [{ type: 'lab', stat: 'energy', delta: -5 }],
          },
        ],
      },
    ],
  },

  // ── 水会检测系统 ──────────────────────────────────────────────────────────

  idea_mediocre_detector: {
    id: 'idea_mediocre_detector',
    title: '这篇怎么也发上去了',
    prompt: '你在顶会论文列表里看到一篇贡献存疑的论文，开始反思审稿机制。',
    description: [
      '实验只有一个 baseline，数据集不清楚怎么构建的，结论和摘要对不上。但它被接收了，而你认识的几个人更好的工作被拒了。',
      '这不是个例。审稿过程里的噪声很大，低质量论文混入顶会的情况并不罕见。',
      '如果训练一个自动质量分类器，用历史论文数据进行有监督学习，能否以高于随机的准确率识别出这类论文？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 8 },
    ],
    options: [
      {
        id: 'build_quality_filter',
        text: '开发一个学术质量评估模型',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始整理数据集标注方案，这件事本身就有点递归的感觉。\n\n💡 获得灵感：「水会检测系统」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'mediocre_paper_detector' }],
          },
        ],
      },
      {
        id: 'write_rebuttal',
        text: '专注在自己的工作上',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了那篇论文，打开了自己的文档。愤怒转化为动力，这个下午写得出奇地顺畅。',
            effects: [{ type: 'lab', stat: 'energy', delta: 5 }],
          },
        ],
      },
    ],
  },

  // ── 引用炸弹防御 ──────────────────────────────────────────────────────────

  idea_citation_bomb: {
    id: 'idea_citation_bomb',
    title: '这篇引用了什么',
    prompt: '学生在做文献综述时，发现某篇论文的参考文献里有大量自引和圈内互引。',
    description: [
      '38 条参考文献，11 条是作者自己的文章，9 条来自同一个小团队。这篇论文引用量很高，因为被同一批人引用了很多次。',
      '这种"引用炸弹"在某些领域已经是一种有组织的策略，用于提升 H-index 和论文排名。',
      '如果构建一个检测系统，识别不正常的引用网络结构，可以帮助期刊和读者更准确地评估学术影响力。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 7 },
    ],
    options: [
      {
        id: 'build_defense',
        text: '用算法检测这种行为',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始设计引用异常检测的特征：自引率、互引集中度、时间模式……\n\n💡 获得灵感：「引用炸弹防御」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'citation_bomb_defense' }],
          },
        ],
      },
      {
        id: 'ignore_it',
        text: '这种事管不了，做好自己就行',
        outcomes: [
          {
            weight: 1,
            narrative: '你叹了口气，关掉了文献列表。学术圈的问题比你能解决的多，但接受这一点之后，心里反而轻松了。',
            effects: [{ type: 'lab', stat: 'energy', delta: 3 }],
          },
        ],
      },
    ],
  },

  // ── 答辩崩溃预测 ──────────────────────────────────────────────────────────

  idea_defense_breakdown: {
    id: 'idea_defense_breakdown',
    title: '答辩前的沉默',
    prompt: '学生在答辩演练时突然停顿，沉默了三十秒，然后说"我忘了"。',
    description: [
      '你见过太多类似的场景。某个委员会问题击中了一个没有准备好的点，学生的整个思路就断掉了。',
      '这种现象有某种规律：哪些问题最容易触发崩溃？什么样的准备状态会提高风险？生理信号（心率、声音）能否提前预测？',
      '如果在答辩演练里收集数据，建立一个崩溃预测模型，可以帮助学生提前强化薄弱点。',
    ],
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<=', value: 50 },
    ],
    options: [
      {
        id: 'build_predictor',
        text: '设计一个答辩压力测量方案',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始设计实验方案，计划用穿戴设备在模拟答辩中采集数据。\n\n💡 获得灵感：「答辩崩溃预测」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'defense_breakdown_predictor' }],
          },
        ],
      },
      {
        id: 'help_student',
        text: '先帮他把那部分内容练熟',
        outcomes: [
          {
            weight: 1,
            narrative: '你陪他又练了一遍那几个问题。他好多了，答辩顺利通过了。',
            effects: [{ type: 'randomStudent', stat: 'favor', delta: 10 }],
          },
        ],
      },
    ],
  },

  // ── 学术六度空间 ──────────────────────────────────────────────────────────

  idea_six_degrees: {
    id: 'idea_six_degrees',
    title: '你认识他吗',
    prompt: '你发现自己和一位从未联系过的学者之间只隔了两个人。',
    description: [
      '你在查一篇论文的参考文献，注意到第三作者是导师的导师的学生，而那个人和你想联系的大佬合写过论文。两跳。',
      '你开始想：这个"学术社交距离"有多短？CS 领域的学者平均间隔几跳？和其他领域比较呢？',
      '小世界现象在学术合作网络里的具体参数，从来没有人认真测过。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 9 },
    ],
    options: [
      {
        id: 'measure_distance',
        text: '把这个测出来',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始构建 CS 领域的合著图，准备做最短路径分析。\n\n💡 获得灵感：「学术六度空间」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'academic_six_degrees' }],
          },
        ],
      },
      {
        id: 'ask_for_intro',
        text: '先让导师帮忙介绍',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了一条消息给导师，请他引荐。对方三天后回复了。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },

  // ── AI 审稿对齐 ──────────────────────────────────────────────────────────

  idea_ai_review_alignment: {
    id: 'idea_ai_review_alignment',
    title: '让 AI 来审稿',
    prompt: '你听说某个会议今年用了 AI 辅助审稿，审稿意见的一致性明显提高了。',
    description: [
      '传统审稿的噪声很大：同一篇论文，不同审稿人的评分方差可以达到三分。AI 辅助减少了这种随机性。',
      '但"减少随机性"不等于"更准确"——如果 AI 的偏好和历史接受模式对齐，可能只是更稳定地重复了过去的偏见。',
      '训练一个审稿模型，用 RLHF 让它的偏好分布和目标会议历史对齐——然后分析这个模型暴露出什么样的系统性偏差。',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'build_review_model',
        text: '这是个值得深入的方向',
        outcomes: [
          {
            weight: 1,
            narrative: '你开始收集历史审稿数据，设计偏好学习框架。\n\n💡 获得灵感：「AI 审稿对齐」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'ai_review_alignment' }],
          },
        ],
      },
      {
        id: 'oppose_ai_review',
        text: '审稿应该由人来做',
        outcomes: [
          {
            weight: 1,
            narrative: '你在学术论坛上发表了一篇反对立场的帖子。获得了 37 个赞和 12 条愤怒回复。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },

  // ── 深夜提交效应 ──────────────────────────────────────────────────────────

  idea_late_submission: {
    id: 'idea_late_submission',
    title: '最后五分钟上传',
    prompt: '你注意到实验室里大家都习惯在截止前最后几分钟提交论文。',
    description: [
      '组里有个学生是唯一提前两天提交的人。你好奇地比对了一下，他的接收率和其他人并无显著差异。',
      '你开始回忆：自己接收的论文是什么时间提交的？你审过的论文里，午夜前提交和当天下午提交的，质量有差异吗？',
      '如果收集大量提交时间戳和最终结果，找找有没有隐藏在里面的时间效应……',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 4 },
    ],
    options: [
      {
        id: 'study_submission_time',
        text: '从提交时间里找信号',
        outcomes: [
          {
            weight: 1,
            narrative: '你从 OpenReview 的公开记录里整理出了提交时间戳，准备开始分析。\n\n💡 获得灵感：「深夜提交效应」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'late_submission_effect' }],
          },
        ],
      },
      {
        id: 'submit_early',
        text: '以后都提前提交，省心',
        outcomes: [
          {
            weight: 1,
            narrative: '你在日历上设定了"比截止日期早48小时"的提醒，感觉非常自律。这种感觉本身就值几分精力。三个月后，你还是在最后一刻提交的。',
            effects: [{ type: 'lab', stat: 'energy', delta: 3 }],
          },
        ],
      },
    ],
  },

  // ── 拖延行为建模 ──────────────────────────────────────────────────────────

  idea_procrastination: {
    id: 'idea_procrastination',
    title: '打开又关上',
    prompt: '你今天已经打开了这篇论文十七次，每次都在五分钟内关掉。',
    description: [
      '你很清楚今天必须写完这个章节。你也很清楚你不会去写。',
      '你打开了浏览器，搜了一下"为什么人类会拖延"。然后发现这是一个真正有学术研究的领域——但大多数研究是问卷和访谈，缺乏行为数据。',
      '如果装一个后台日志，记录窗口切换、打字节奏、浏览器标签数……把拖延过程的每个微决策都捕捉下来，是不是可以建一个比较靠谱的计算模型？',
    ],
    triggerConditions: [
      { type: 'lab', stat: 'energy', op: '<=', value: 70 },
    ],
    options: [
      {
        id: 'model_procrastination',
        text: '用拖延的时间来研究拖延',
        outcomes: [
          {
            weight: 1,
            narrative:
              '你开了一个新文档，把数据采集方案写了进去。这算是工作吗？算。\n\n💡 获得灵感：「拖延行为建模」——已记录到项目面板。',
            effects: [{ type: 'unlockIdea', projectId: 'procrastination_model' }],
          },
        ],
      },
      {
        id: 'actually_write',
        text: '强迫自己写',
        energyCost: 10,
        outcomes: [
          {
            weight: 3,
            narrative: '你写了三段，虽然质量存疑，但毕竟写出来了。',
          },
          {
            weight: 1,
            narrative: '你写完了整个章节。效率之高让你怀疑刚才是不是换了一个人。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 1 }],
          },
        ],
      },
    ],
  },
};
