/**
 * 毕小天 专属事件
 *
 * 人设：奇怪论文收藏家、脑洞制造机、Workshop雷达。
 * 总能发现最离谱的研究方向，并认真讨论其学术价值。
 * 笑点：别人以为他在开玩笑，但他真的读完了论文，还写了 related work。
 */

import type { GameEvent } from '../../../types';

export const biXiaotianEvents: Record<string, GameEvent> = {

  // ── 1. 第一次见面 ──────────────────────────────────────────────────────────

  bxt_first_meeting: {
    id: 'bxt_first_meeting',
    title: '第一次见面',
    description: [
      '毕小天进门的第一件事不是自我介绍，而是把手机屏幕直接怼到你脸前。"老师，您先看这个。"',
      '论文截图，标题是《基于薛定谔猫的分布式系统容错模型》，来自某不知名会议论文集。他用食指点着屏幕，神情比你参加博士答辩时还要严肃："量子态叠加和系统容错之间有一个类比关系，没人仔细挖过，我们可以做。"',
      '你盯着他眼睛看了整整三秒。他完全不像在开玩笑。他手机备忘录里已经写了两页笔记。两页。',
    ],
    prompt: '新生第一次见面，你怎么回应？',
    triggerConditions: [
      { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'bxt_first_meeting_realistic',
        text: '温柔劝退：咱先做能发出去的',
        outcomes: [
          {
            weight: 1,
            narrative: '毕小天认真点头，把手机收起来。"好的老师，我理解。不过我先把这篇论文的核心论证整理成文档发您，万一以后用得上。" 三小时后，文档到了你邮箱。共八页，带参考文献。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: -5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'bxt_first_meeting_curious',
        text: '……说下去，我听着',
        outcomes: [
          {
            weight: 1,
            narrative: '毕小天立刻把手机切换到PPT模式——他已经准备了十八页幻灯片。你听了整整四十分钟，中途有两处你悄悄在心里承认逻辑上居然是对的。散会后你在笔记本上画了一个问号，盯着看了很久。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 2. 每日奇文 ───────────────────────────────────────────────────────────

  bxt_arxiv_discovery: {
    id: 'bxt_arxiv_discovery',
    title: '每日奇文（第十八天）',
    description: [
      '毕小天已经连续十八天在组内群里分享冷门论文了。前三天大家还认真看，第六天开始有人把他设成免打扰，第十天陈雪婷专门建了个"奇文频道"把他踢进去，单独归档。',
      '今天这篇的标题是《从鸽巢原理看大学食堂打菜的最优策略》，来自某985高校CS系，发表在"运筹学与生活决策"专栏。摘要写得极其正经，引理和推论一个不少。',
      '毕小天在消息下附言："这篇跟咱们调度模块有个结构上的联系，我梳理了一下发在共享文档里了，师兄师姐有空可以看看。" 没有一点玩笑的意思。',
    ],
    prompt: '对他的每日论文分享，你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'bxt_arxiv_limit',
        text: '每周一篇就够，精选一下',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，我会筛选的。" 他停了两天，然后恢复分享，频率变成每周一篇。但那一篇的质量肉眼可见地变高了——你意识到他在把真正离谱的论文留着自己看，只把"相对正常的"拿出来分享。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'bxt_arxiv_filter',
        text: '可以，但每篇加一句"和课题相关性"说明',
        outcomes: [
          {
            weight: 1,
            narrative: '毕小天眼睛一亮，"好主意！" 从那天起，每篇分享都多了一行"相关性评分：★★★☆☆"。评分标准他自己定，但奇怪的是，有人发现他的判断比预期准。你开始怀疑他其实很清醒，只是不说。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 3. 离谱Workshop ────────────────────────────────────────────────────────

  bxt_weird_workshop: {
    id: 'bxt_weird_workshop',
    title: '第四届AI与中医经络融合研讨会',
    description: [
      '毕小天来找你的时候手里拿着一张A4纸，上面打印着一个Workshop的官网截图："第四届AI与中医经络融合研讨会——探索传统医学与深度学习的交叉前沿"。',
      '他把截图放在你桌上，脸上的表情比你写基金申请书的时候还要认真。"老师，我觉得我们可以投一篇，我昨晚已经起草了摘要，您看一下。"',
      '第二张纸推过来了。摘要整整一页，引用了三篇相关文献——其中两篇经你确认确实存在于这个宇宙中。',
    ],
    prompt: '面对这个Workshop投稿请求，你怎么决定？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
    ],
    options: [
      {
        id: 'bxt_workshop_decline',
        text: '方向不对，热情保留',
        outcomes: [
          {
            weight: 1,
            narrative: '"毕小天，这个和咱们课题相关性太远了。但你主动找投稿机会这个意识很好——去查一下咱们领域的主要venue，做个表格。" 他点头，第二天交来七页的会议列表。每个venue的附注栏里都写了投稿理由，最长的一条写了三行。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: -5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'bxt_workshop_review',
        text: '先查一下审稿委员会再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了五分钟在Workshop官网上找审稿委员会名单。其中一位委员是某985正教授，研究方向：非线性经络电信号建模。你沉默了十秒，决定还是不投。毕小天表示理解，把摘要存档，标注"待时机成熟"——他真的这么写的。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 4. 意外的Related Work ─────────────────────────────────────────────────

  bxt_related_work: {
    id: 'bxt_related_work',
    title: '跨学科Related Work',
    description: [
      '毕小天发来一个共享文档链接："老师，Related Work初稿整理出来了，您看一下。"',
      '你打开文档，第一反应是眼睛有点花——文献来源跨越了生物信息学、行为经济学和材料科学，用来支撑一个纯CS问题。你深吸一口气，准备打一段措辞温和的"引用范围需要收窄"。',
      '然后你读到第三段，停住了。他用材料科学里的微观结构相变类比了系统状态迁移的不可逆性——那个类比不只是好听，逻辑上居然是严格的。你往回翻了两次，确认自己没看错。',
    ],
    prompt: '这份跨学科Related Work出乎意料地有点东西，你怎么处理？',
    triggerConditions: [
      { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', op: '>=', value: 50 },
      { type: 'time', field: 'year', op: '>=', value: 1 },
    ],
    options: [
      {
        id: 'bxt_related_work_integrate',
        text: '留着，整合进论文',
        outcomes: [
          {
            weight: 1,
            narrative: '"这部分写得不错，我们留着——但要加一段解释这个类比为什么成立，不能只凭直觉。" 毕小天点头如捣蒜，三天后交来补充说明，附了一个形式化证明草稿。你把它发给合作者，对方回复了一个问号和三个感叹号。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'bxt_related_work_narrow',
        text: '材料科学的事暂时放一放',
        outcomes: [
          {
            weight: 1,
            narrative: '"跨领域引用要考虑审稿人接受度，最核心的那个类比留下，其他的放附录或删掉。" 毕小天有些可惜地点头，整理出精简版。精简之后，那个核心论点反而更突出了。有时候少即是多。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 4 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 5. 意外有用的脑洞 ─────────────────────────────────────────────────────

  bxt_serious_insight: {
    id: 'bxt_serious_insight',
    title: '那个"随口说说"的想法',
    description: [
      '上周组会结束，毕小天在门口等你，夹在一堆闲聊里随口丢了一句话，语气像在说天气："老师，你有没有想过，如果把反馈延迟本身当成一个可学习的参数，系统稳定性边界会不会有不一样的形状？"',
      '你当时回了个"嗯等一下我接个电话"，然后就过去了。',
      '昨晚写方案写到一半，那句话突然在脑子里弹出来。你认真推导了一下——停不下来了。这里头有一个可以独立成文的核心观察，而且可能是一个相当漂亮的小结果。他随口说的。随口。',
    ],
    prompt: '这个脑洞比你以为的有价值，你怎么处理？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', op: '>=', value: 30 },
    ],
    options: [
      {
        id: 'bxt_insight_tell',
        text: '直接告诉他：你上周那句话，可以做',
        outcomes: [
          {
            weight: 1,
            narrative: '毕小天愣了整整三秒，随后出现了一种少见的、货真价实的惊讶表情——他大概也没想到那句话被记住了。"老师，那我……可以写个方案？" "写吧。" 方案两天后到了。二十页，附代码框架。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 15 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'bxt_insight_later',
        text: '先自己整理，做成完整方案再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你用两周把这个想法系统化，写成初步方案，然后约毕小天谈话，把方案摊开："你上周那个问题，我认真推了一下，你来看看。" 毕小天研究了十分钟，平静地抬起头："所以我是对的。" 他说得如此笃定，以至于你忘了反驳。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 10 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 6. 毕设方向危机 ───────────────────────────────────────────────────────

  bxt_thesis_crisis: {
    id: 'bxt_thesis_crisis',
    title: '毕设方向被打回',
    description: [
      '毕小天发来一条消息："老师，我有个事跟您说一下，不急，您有空的时候。"——凡是说"不急"的都很急。',
      '见面后他告诉你：系里审核委员会把他的毕设开题打回了，理由是"研究方向不在本学科规范范围内"。评审意见三条：第一，"跨学科程度超出学位论文边界"；第二，"理论基础借鉴来源存疑"；第三，"选题独特性过强"。最后那条你读了两遍才确认这是批评。',
      '毕小天讲完，往椅子背上一靠，补了一句，语气出奇地平静："老师，我早就备了一个B计划。"',
    ],
    prompt: '开题被打回，他说有B计划，你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'bxt_crisis_b_plan',
        text: '先听听这个B计划',
        outcomes: [
          {
            weight: 1,
            narrative: 'B计划是一个更"规范"的选题框架，但里面嵌套了一个和原方向几乎等价的核心问题——换了个表述方式，穿上了一件正经学科的外衣。你盯着他看了很久。"你早就知道会被打回？" "有预期，" 他说，"所以提前写了。" 他说这话的时候没有任何得意，只是陈述事实。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.social', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'bxt_crisis_communicate',
        text: '先帮他跟系里争取一次修改机会',
        outcomes: [
          {
            weight: 1,
            narrative: '你给系主任发了一封措辞谨慎的邮件，附上毕小天课题的理论依据说明。系里回复说可以提交修改版，给两周。毕小天知道之后平静地说："谢谢老师，我已经在改了。" 三天后修改版到了你邮箱。你翻了翻，和B计划差不多。他一直都在改。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 10 },
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 7. 科普潜力 ───────────────────────────────────────────────────────────

  bxt_science_communicator: {
    id: 'bxt_science_communicator',
    title: '"终于有人说人话了"',
    description: [
      '你正在看数据，毕小天发来一条消息："老师，我前几天发了个视频，有点流量，您要不要看一下。"',
      '视频时长十二分钟。他用"把一只猫放进装了猫粮的箱子"类比了某个著名容错协议，用外卖骑手接单策略解释了一类调度问题。全程语气一本正经得像在开学术报告，但每一句话都能让完全没背景的人听懂。',
      '评论区置顶评论："终于有人说人话了。" 点赞五百多，下面四十几条回复全在问下一期在哪。',
    ],
    prompt: '他在科普上展现出意外的才能，你怎么引导？',
    triggerConditions: [
      { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.social', op: '>=', value: 55 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'bxt_communicator_encourage',
        text: '鼓励他继续，这是真本事',
        outcomes: [
          {
            weight: 1,
            narrative: '"这个类比用得很好，你是真的理解那个协议。继续做，但每次发之前给我看一下内容准确性。" 毕小天点头，顺带问能不能在视频简介里提一下实验室。你说：先把课题做出来再说。他接受了，非常平静。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.social', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'bxt_communicator_balance',
        text: '科普可以，进度不能掉',
        outcomes: [
          {
            weight: 1,
            narrative: '"组会进度不能掉，你自己把握时间。" 毕小天认真点头。此后他保持每两周一个视频的频率，奇怪的是，每次发完视频的第二天，他的论文推进速度反而比平时快——可能是把表达欲清空了，反而静下来了。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 8. 跨学科发现 ─────────────────────────────────────────────────────────

  bxt_interdisciplinary_find: {
    id: 'bxt_interdisciplinary_find',
    title: '从巴赫赋格曲里挖出来的图神经网络',
    description: [
      '毕小天来找你，手里拿着三张手写纸，每张都密密麻麻画满了图和公式，字迹工整，排列紧凑，像某种精心维护的秘典。',
      '"老师，我在读一篇分析巴赫赋格曲声部结构的音乐理论论文——里面描述声部关系的那个数学结构，我觉得和我们用的图卷积存在一个同构。"',
      '他把三张纸依次铺开，讲了大约二十分钟。你认真跟了全程——那个同构不是牵强的类比，是有数学意义的结构对应。更离谱的是，把音乐理论的约束条件引入之后，可以自然推出他们一直在手动调的那个正则化项。他是从巴赫那里推出来的。',
    ],
    prompt: '这个跨学科发现有实际价值，你怎么处理？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'bxt_find_evaluate',
        text: '认真评估，列入课题计划',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了一个下午验证了他的推导。下次组会上，你把这个结果作为一个正式研究方向提出来，标注"来源：毕小天"。他坐在角落里，面色平静，但耳朵有一点点红。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 15 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'skills.theory', delta: 7 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'bxt_find_aside',
        text: '思路有意思，主线做完再说',
        outcomes: [
          {
            weight: 1,
            narrative: '"这个方向留着，先把主线实验做完，这个作为backup。" 毕小天把三张纸整齐叠好收起来，在角上认真地写了一行字："待主线完成后启动。" 他的认真让你产生了一种莫名的不安。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 9. 答辩被打回 ─────────────────────────────────────────────────────────

  bxt_yanbi: {
    id: 'bxt_yanbi',
    title: '太超前了',
    description: [
      '答辩持续了两个半小时。你在外面等。',
      '门打开的时候，毕小天走出来，表情平静，步伐稳健，和进去之前没有明显区别。他在你旁边坐下，说："委员会让修改，主要意见是研究方向过于边缘化，建议向主流问题靠拢。"',
      '沉默了三秒，他补了一句，语气平稳得像在报天气："老师，我觉得这说明我们的方向太超前了。"',
    ],
    prompt: '答辩被打回，他认为是因为"太超前"，你怎么应对？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', op: '>=', value: 70 },
    ],
    options: [
      {
        id: 'bxt_yanbi_replan',
        text: '帮他重整框架，向主流靠一靠',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了两周和他一起重整论文框架，把核心贡献用更保守的语言重新包装，保留了最有价值的部分。毕小天全程配合，但在每一处修改的旁边，都用铅笔轻轻写了一行注释："原版本在此。" 你装作没看见。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: -8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 8 },
              { type: 'extendGraduation' },
            ],
          },
        ],
      },
      {
        id: 'bxt_yanbi_validate',
        text: '你说的有道理，但先把毕业证拿到手',
        outcomes: [
          {
            weight: 1,
            narrative: '"你说的不是没有道理。但委员会的意见是客观存在的，咱们先完成答辩——你的原版本我帮你投出去。" 毕小天点头，认真地说："好，那修改版就当翻译项目。" 他开始改，效率出人意料地高。可能是觉得只是在翻译，心理上就不在乎了。',
            effects: [
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', delta: 10 },
              { type: 'extendGraduation' },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 10. 毕业回访 ──────────────────────────────────────────────────────────

  bxt_alumni_visit: {
    id: 'bxt_alumni_visit',
    title: '科普主播的邮件',
    description: [
      '一个普通的周三下午，你收到一封邮件，发件人：毕小天，主题："一件小事"。',
      '邮件不长。他说他现在专门做科普视频，解释"正经但看起来不正经的研究"，粉丝涨得比预期快。最近有家科技媒体邀请他做访谈，聊"冷门研究方向的价值"。他想在访谈里提实验室的名字，问你介不介意。',
      '邮件最后附了一行，语气和当年在组内群发论文一模一样：如果老师有新的离谱论文想让更多人知道，也可以给我发。',
    ],
    prompt: '老学生来信，你怎么回复？',
    triggerConditions: [
      { type: 'student', studentId: 'bi_xiaotian', stat: 'projectProgress', op: '>=', value: 95 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'bxt_alumni_allow',
        text: '没问题，欢迎提，加油',
        outcomes: [
          {
            weight: 1,
            narrative: '你回复了三个字："没问题，加油。" 访谈播出那天，你的助手发来链接说评论区有人问实验室怎么联系，主页访问量涨了一些。随后毕小天发来一条消息，没有任何铺垫："老师，那篇薛定谔猫的论文我后来投出去了，接受了，下个月见刊。" 就是当年第一次见面时他拿到你面前的那篇。他一直记着。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 10 },
            ],
          },
        ],
      },
      {
        id: 'bxt_alumni_conditional',
        text: '可以，先看一下内容再决定',
        outcomes: [
          {
            weight: 1,
            narrative: '毕小天发来访谈问题列表和答案草稿，你检查了一遍，没有问题。访谈播出，实验室的名字出现了大概三秒，附在一句话之后——"在这里学到了认真对待奇怪问题的方法。" 你把那一段截图发给了自己，没有说什么，也没有删。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

};
