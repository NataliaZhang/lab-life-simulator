/**
 * 白小满 — 专属事件
 *
 * tagline: 事已至此，先吃饭吧
 * traits: 乐观心大 · 实验室太阳 · 危机奶茶学
 *
 * 触发方式同其他学生专属事件，放入 monthlyEventPool 后
 * 由 filterTriggerable 决定是否出队。
 */

import type { GameEvent } from '../../../types';

export const baiXiaomanEvents: Record<string, GameEvent> = {

  // ── 1. 第一次见面 ─────────────────────────────────────────────────────────

  bxm_first_meeting: {
    id: 'bxm_first_meeting',
    title: '白小满：第一次见面',
    description: [
      '新生报到那天，白小满进门时两只手都满着，左手一杯奶茶，右手一杯奶茶，用手肘顶开了你办公室的门，表情堪比送外卖的职业选手。',
      '她把其中一杯推到你面前，神情一本正经："老师，我做了个小调研——第一次见面给导师带奶茶，录取成功率会提高百分之二十三。这个数据是我编的，但奶茶是真的，全糖少冰，希望你喜欢。"',
      '你还没想好表情该摆哪一种，她已经坐下来打开了笔记本，问："老师，咱们组现在主攻哪个方向？" 那杯奶茶还冒着热气。',
    ],
    prompt: '面对这杯奶茶，你怎么回应？',
    triggerConditions: [
      { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'bxm_fm_accept',
        text: '收下，感动，并记在心里',
        outcomes: [
          {
            weight: 1,
            narrative: '奶茶是你平时点的那种口味。你有点怀疑她是不是提前做了调查，问了一句。她咧嘴笑："猜的。但全糖少冰的基本盘挺大——这个数据是真的。"\n\n开局不错，你决定好好带她。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'bxm_fm_decline',
        text: '收下奶茶，顺带说以后不用这样',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，那我下次只带两杯，一杯给我自己喝。" 你在脑子里重播了一遍她的逻辑，发现并没有哪里说错。\n\n她已经翻开笔记本在等你讲研究方向了，那杯奶茶摆在你桌上，热气还没散。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 6 },
            ],
          },
        ],
      },
      // TODO: 加一个选项：拒绝奶茶。
    ],
    tags: ['student_specific'],
  },

  // ── 2. 危机调解 ───────────────────────────────────────────────────────────

  bxm_crisis_mediator: {
    id: 'bxm_crisis_mediator',
    title: '白小满：危机调解',
    description: [
      '实验室最近气氛有点微妙，任务分配引发了一些情绪，组会开始出现"我说完了"之后片刻的真空，走廊里的问候也变得比往常简洁了一截。',
      '白小满敲门进来，关上门，坐下来先把问题的症结说了一遍，分析得比你想象中清楚，然后不急不忙地总结："我觉得我们现在需要外卖。好的外卖。大家坐一块，不谈工作，让情绪先流通二十分钟。"',
      '她顿了顿，补了一句："根源我也想好怎么解了，等大家心情上来之后我来聊。" 你意识到她已经把危机处理分成了两个阶段，而且阶段一是奶茶外卖。',
    ],
    prompt: '她的提议听起来管用，你怎么做？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 3 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'bxm_cm_adopt',
        text: '虔诚展开危机奶茶外交',
        outcomes: [
          {
            weight: 1,
            narrative: '那顿外卖花了实验室一笔可以报"团建"的经费，但 ROI 高得吓人。白小满在饭桌上把问题的根源用聊天的语气说了一遍，话刚落大家已经开始讨论解决方案了，没有人意识到这是一场精心设计的调解会议。\n\n你心里把她的方法论默默存档。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'bxm_cm_task_first',
        text: '先讲根源，奶茶待会说',
        outcomes: [
          {
            weight: 1,
            narrative: '白小满点点头，把分析完整讲了一遍，有条理，有数据，你边听边做记录，问题有了解决路径。结束后她站起来，推回椅子，说了句："那我去给大家点奶茶，这个还是需要的。"\n\n你没有拦她。奶茶也是方案的一部分，你已经理解了。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 3. 失败重构 ───────────────────────────────────────────────────────────

  bxm_failure_reframe: {
    id: 'bxm_failure_reframe',
    title: '白小满：失败重构',
    description: [
      '上周白小满的实验全线崩了，三组对照全部跑崩，数据不收敛，模型在测试集上约等于随机猜测。你已经准备好了一份措辞温和的反馈，打算今天找她谈。',
      '她的汇报邮件先到了你的收件箱，标题是：「重大进展：我们成功排除了十八种可能性（附：第十九种正在验证中）」。',
      '邮件正文格式规范，附了一张手绘的"失败图谱"，每一条走不通的路都标注了原因和坑的位置，最后一段写道："以上信息等价于十八份阴性结果，可以整理成论文附录。" 你盯着这封邮件看了一会儿，感觉你们对失败这件事的定义可能不在同一个频道上，但她的频道听起来更有意思。',
    ],
    prompt: '你怎么回应这封邮件？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'bxm_fr_embrace',
        text: '感觉还能抢救，鼓励继续',
        outcomes: [
          {
            weight: 1,
            narrative: '你回了一封比平时长的邮件，说这张"失败图谱"本身就是有价值的工作，阴性结果是真实数据，不是浪费。白小满两分钟内回复："知道！"\n\n后面跟着一份更新的实验计划，第十九种可能性已经开始跑了。效率惊人。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', delta: 3 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'bxm_fr_redirect',
        text: '心态满分，但还是要落地',
        outcomes: [
          {
            weight: 1,
            narrative: '你约她面谈，把失败图谱和下一步路线图一起过了一遍。白小满拿着笔做记录，认真，偶尔说一句"哦对，这个我没想到"。走之前她说："老师你别担心，我只需要把灾难分类一下——分完就不怕了。"\n\n你觉得这句话可以裱起来挂在组里最显眼的地方。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 5 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 4. 主动打气 ───────────────────────────────────────────────────────────

  bxm_morale_boost: {
    id: 'bxm_morale_boost',
    title: '白小满：主动打气',
    description: [
      '实验室最近整体状态下滑，声望遭到质疑，几个项目进展缓慢，组会开始出现"我说完了"之后无人接话的片刻真空。你还没想好怎么处理这个气氛，白小满已经自己动了。',
      '组群里出现了一条消息："本周五晚上有个非强制性但强烈建议参加的饭局，楼下火锅店，我来订位，AA制（保底两人成行），主题是：不谈工作。"',
      '那顿饭全组八个人去了七个。你事后问白小满用了什么方法，她想了想说："就是让大家先记起来，我们是认识的，不只是同一个组里的。" 你意识到这一句话里装了不少东西。',
    ],
    prompt: '她的行动力让你刮目相看，你怎么回应？',
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '<=', value: 30 },
      { type: 'time', field: 'year', op: '>=', value: 1 },
    ],
    options: [
      {
        id: 'bxm_mb_praise',
        text: '当面夸：你做了件大事',
        outcomes: [
          {
            weight: 1,
            narrative: '白小满听完点了点头，说："我知道，所以才去做。" 不谦虚，也没有过度的高兴，就是平静地确认了这件事的重量。\n\n你意识到她对自己在实验室里的位置心知肚明，知道自己是什么，也知道这有多重要，只是从来不说出来。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'bxm_mb_curious',
        text: '好奇：这是怎么想到的',
        outcomes: [
          {
            weight: 1,
            narrative: '"以前我有段时间状态很差，有人拉我去吃了一顿饭，就好多了。" 她说完顿了一下，补了一句，"就一顿饭，没别的。"\n\n你没有追问。后来发现她把账单自己默默付了一半，AA制从头到尾只是一个让大家愿意去的借口。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 6 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 5. 奶茶战略 ───────────────────────────────────────────────────────────

  bxm_tea_strategy: {
    id: 'bxm_tea_strategy',
    title: '白小满：奶茶战略',
    description: [
      '你正在为一个棘手的决定发愁，经费分配、人员调整，或者某个项目的走向，总之是那种盯着屏幕半小时屏幕还是那个屏幕的类型。',
      '白小满推开门，把一杯奶茶放在你桌上，神情严肃："老师，我观察了一段时间。你做困难决定的时候手边有奶茶，通过率会高百分之三十一。"',
      '她停了停，补了一句："这个数据也是我编的，但我觉得有一定的科学依据。" 然后转身要走，走到门口又回头："不用谢，等你想通了发我一条消息就行。"',
    ],
    prompt: '你怎么对待这杯奶茶？',
    triggerConditions: [
      { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'bxm_ts_drink',
        text: '喝了一口，感觉脑子松动了',
        outcomes: [
          {
            weight: 1,
            narrative: '全糖少冰，她记住了。你喝了一口，脑子里有什么咔哒一声松动——不是奶茶有什么魔力，只是有人记得你这个状态，把你从困境里拉出来一格。\n\n决定当天下午就做了，比预期早了两天。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 4 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'bxm_ts_need_quiet',
        text: '道谢，说你现在更需要安静',
        outcomes: [
          {
            weight: 1,
            narrative: '"那我走了，奶茶留着。" 她把门带上，轻得你几乎没听见。你喝了一口，继续想。一小时后有了方向，你发消息告诉她。\n\n她秒回了一个"好的老师"加大拇指——那种掷地有声的大拇指。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 6 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 6. 社交天才 ───────────────────────────────────────────────────────────

  bxm_social_talent: {
    id: 'bxm_social_talent',
    title: '白小满：社交天才',
    description: [
      '系里有位老师，向来难以接近，审经费严，推荐信惜字如金，跨院合作项目一律保持距离。你有过念头，估计了一下成功率，搁置了。',
      '上周五，白小满代表实验室去参加了一个跨院系学生交流活动。昨天汇报时顺带提了一句："对了老师，王老师说他那边有个经费来源，想问问我们合不合适——是他主动问的。"',
      '你让她细说。她想了想："我带了奶茶去分享，然后我们聊了一下双方的方向，他说有交叉点就问了。" 停了一下，"具体聊了挺多的，总之气氛不错。" 你愣了一下，发现她本人对这件事的惊人程度毫无感知。',
    ],
    prompt: '这个意外的合作机会怎么处理？',
    triggerConditions: [
      { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', op: '>=', value: 70 },
    ],
    options: [
      {
        id: 'bxm_st_ask_story',
        text: '先追问：她到底说了啥',
        outcomes: [
          {
            weight: 1,
            narrative: '白小满回忆了一下，说她主要在听，让王老师讲他的研究，认真提问，把我们的方向自然地带进去，没有主动推销过。"我发现他其实挺想聊的，只是平时没人问。"\n\n你把这句话默默存档，感觉这是一条可以复制的方法论，下次开跨院合作会议前发给全组。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'bxm_st_seize_opportunity',
        text: '接住机会，安排跟进',
        outcomes: [
          {
            weight: 1,
            narrative: '你让她帮忙约时间，三方坐下来谈了好一阵，合作框架基本成型，经费申请在走流程。白小满会议结束后说了句："我就知道带奶茶没错。"\n\n你回想了一下整个过程，没有找到任何可以反驳的角度。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'funding', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 7. 真正的瓶颈 ─────────────────────────────────────────────────────────

  bxm_genuine_struggle: {
    id: 'bxm_genuine_struggle',
    title: '白小满：真正的瓶颈',
    description: [
      '白小满来找你，破天荒地两手空空进来，没有奶茶，没有笔记本，连平时那种随手拿着支笔的习惯都消失了。',
      '她在椅子上坐直，直接开口："老师，我遇到一个问题，想了两周，真的不知道怎么做。"',
      '没有"还能救"，没有把困难包装成"排除了一种可能性"。她平铺直叙地说自己不知道，然后把问题完整讲了一遍，逻辑清晰，卡住的地方说得很准，你知道她在来之前已经独自撑了很久了。',
    ],
    prompt: '她愿意说出来——你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'bxm_gs_guide',
        text: '直接进入技术，认真指导',
        outcomes: [
          {
            weight: 2,
            narrative: '你们坐下来讨论了很久，你画图，她补充她试过的方案，来回几轮之后找到了一条路——答案是她自己在过程中想到的，你只是没有打断她。她站起来说了声"谢谢老师"，走到门口停了一下，回头说："我下次还是会带奶茶的。"\n\n你点了点头，说好。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你们讨论了很久，没有找到直接的解法，但把问题的边界彻底厘清了。白小满说："那我再去想想。" 语气平静，没有失落——你意识到她来找你，不是为了拿答案，而是需要一个人帮她把问题想清楚。\n\n她拿到了她要的东西。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'bxm_gs_affirm_first',
        text: '先肯定她敢说，再聊',
        outcomes: [
          {
            weight: 1,
            narrative: '你说了一句"能想清楚自己在哪里卡住了，这一步本身就很重要"，她盯着桌面愣了一下，点了点头。然后你们进入技术讨论，她明显说得比刚才直接，卸下了什么，开始在讨论里真正安心了。\n\n过了好一会儿有了方向。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'projectProgress', delta: 5 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 8. 帮你安慰学生 ───────────────────────────────────────────────────────

  bxm_encourage_others: {
    id: 'bxm_encourage_others',
    title: '白小满：帮你安慰学生',
    description: [
      '组里有个学生陷进了瓶颈，项目推不动，状态越来越内耗，你找他谈过一次，效果有限，那种沉默带着防御，像堵墙，硬撞只会把自己撞疼。',
      '你正在想怎么谈第二次，白小满路过你办公室，探头进来问了一句："你是在想某某的事吗？"',
      '"我去聊聊，我跟他平时比较熟。" 说完不等你回答就走了。过了一会儿，你路过公共区域，看见那个学生坐在白板前写了满满一黑板——状态和刚才完全是两个人。',
    ],
    prompt: '你怎么回应白小满的行动？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'lab', stat: 'energy', op: '<=', value: 40 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'bxm_eo_thank',
        text: '找她道谢，说她帮了大忙',
        outcomes: [
          {
            weight: 1,
            narrative: '白小满摆了摆手："我就是陪他把事情说出来了，他自己知道怎么做，只是憋着。" 停了一下，"老师跟学生聊有时候有距离感，我说话没那么多包袱。"\n\n话说得很直接，不是挑剔你，就是在说事实。你接受了这个事实，觉得有点复杂，但也有点庆幸实验室有她。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 4 },
              { type: 'lab', stat: 'energy', delta: 7 },
            ],
          },
        ],
      },
      {
        id: 'bxm_eo_ask_what',
        text: '好奇地问她说了什么',
        outcomes: [
          {
            weight: 1,
            narrative: '"没说什么特别的，就让他从头跟我讲他的项目，我一直在听。讲着讲着他就自己想到了。" 她补了一句，"人有时候需要的就是个耳朵，答案自己有。"\n\n你默默把这条方法记了下来，打算以后用，然后有点惭愧地意识到你很少给别人这个耳朵。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 6 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 9. 乐观的边界 ─────────────────────────────────────────────────────────

  bxm_optimism_tested: {
    id: 'bxm_optimism_tested',
    title: '白小满：乐观的边界',
    description: [
      '最近白小满碰了好几个壁，投稿被拒，合作谈崩，一个做了两个月的方向在讨论中被整体推翻。她来找你，这次没有带奶茶，也没有把困难先包装成"排除了若干可能性"。',
      '她坐下来，沉默了一下，说："老师，我跟你说一个事——我其实不是真的完全不担心的。"',
      '"我只是觉得，担心本身没有用，所以我选择不做这个动作。但感受得到是感受得到的。最近压力确实挺大。" 她说完抬头看了你一眼，在等你的反应。',
    ],
    prompt: '她卸下了一部分乐观的盔甲，你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', op: '<=', value: 45 },
    ],
    options: [
      {
        id: 'bxm_ot_worry_valid',
        text: '担心有时候是动力',
        outcomes: [
          {
            weight: 1,
            narrative: '白小满想了一会儿，说："那我得先想清楚担心什么，不然担心会乱跑，没有用。" 你们把她现在最担心的几件事列出来，每一条都讨论了能不能提前做什么。\n\n她走的时候状态比来时好，担心还在，但被放进了格子里，有名字有位置，变成了可以处理的东西。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'bxm_ot_affirm_method',
        text: '不担心，也是一种理性',
        outcomes: [
          {
            weight: 1,
            narrative: '白小满听完，慢慢点了点头，说："那好，我继续不担心。" 但语气和平时不一样，多了几分清醒，是想清楚了再往前走的那种平静，而不是心大。\n\n走之前她说："老师，下次还是带奶茶来，但我知道奶茶不是万能的了。" 你点点头，说还是带吧，你喜欢喝。她笑了。',
            effects: [
              { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 10. 毕业回访 ──────────────────────────────────────────────────────────

  bxm_alumni_visit: {
    id: 'bxm_alumni_visit',
    title: '白小满：毕业回访',
    triggerConditions: [{ type: 'studentStatus', studentId: 'bai_xiaoman', status: 'graduated' }],
    description: [
      // 🎓 毕业后回访 — 建议引擎在 graduation 后约6个月注入
      '毕业大概半年后，你收到了白小满的邮件。',
      '她去了一家公益科技机构，邮件里说她在那里"主要负责让整个团队不崩溃，顺便做一些技术工作"，听起来和在实验室时职责差不多，但语气里多了一种找到位置的笃定，像一个人终于住进了为自己量身做的房间。',
      '邮件最后，她说她帮忙介绍了机构的负责人，想和实验室探讨合作。"她是很好的人，我们一起喝奶茶的时候聊起了你们的研究，她当场就有兴趣了。" 括号里她补了一句："（奶茶是我带的，这次的数据不是编的：奶茶有用，经过反复验证，p<0.05。）"',
    ],
    prompt: '这封邮件从头到尾都是白小满风格，你怎么回应？',
    options: [
      {
        id: 'bxm_av_embrace_collab',
        text: '推进合作，感谢她牵线',
        outcomes: [
          {
            weight: 1,
            narrative: '三周后你和那位负责人见了面，谈得顺利，第二次会面合作框架就定了。你把进展告诉白小满，她回了一条消息："我就说嘛，奶茶开路，无往不利。"\n\n你截图发回给她，说想引用在今年的年度总结里。她同意了，条件是你请她回来吃一顿饭。你答应了，心里清楚这顿饭她会把账单默默付一半。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'lab', stat: 'funding', delta: 12 },
            ],
          },
        ],
      },
      {
        id: 'bxm_av_reply_warmly',
        text: '先回邮件，问问近况',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封比平时长的回信，问她在新机构的状态，说很高兴她找到了合适的位置。她回得很快："一切都好，这里也有人容易崩溃，我的技能没有浪费。"\n\n你看着这句话笑了一下，然后想起实验室这边偶尔还是会缺一个人帮大家记起"我们是认识的"。合作后来也推进了，但这封来回的邮件本身，你觉得也值。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },


  bxm_conference_map: {
    id: 'bxm_conference_map',
    title: '白小满：她知道所有人认识谁',
    description: [
      '学术会议的懒人午餐环节，大家拿着盘子站着聊天，白小满却坐在角落，对着一张餐巾纸在写写画画。你走过去一看：她在画一张关系图，圆圈是人名，连线是"在哪里认识的"。',
      '"这是……你做的网络图？"',
      '"嗯，这个领域的人其实就这么多，" 她说，"而且聚集模式特别明显。做NLP的那桌，以前有三个是在同一个workshop认识的。" 她指了指那一桌，然后指了指她的图，角度对得上。',
    ],
    prompt: '白小满把会议摸清了一个遍，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'bxm_conference_map_use',
        text: '帮我再认识几个人',
        outcomes: [{
          weight: 1,
          narrative: '你问她能不能帮你引荐几个感兴趣的研究者。白小满立刻把那张餐巾纸翻过来，用手指头圈出三个名字，告诉你他们各自在哪个方向上和你的工作有交集。接下来两小时，你依次聊了其中两个，全部聊得很顺。\n\n你们坐回来的时候，她已经在更新图谱了，把你们的交流也标注进去了。',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 7 },
            { type: 'lab', stat: 'reputation', delta: 5 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
      {
        id: 'bxm_conference_map_research',
        text: '这个图本身可以做研究',
        outcomes: [{
          weight: 1,
          narrative: '你说"你这个聚集模式如果系统收集数据，说不定真能找到规律。" 白小满眼睛一亮，说"对啊，而且不同会议的社交模式应该不一样！"\n\n她当场用手机拍下了那张餐巾纸，发到自己的备忘录，备注"以后做这个"，然后继续去聊天了，脚步轻快，仿佛整件事只是一个周末计划。',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 6 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.social', delta: 3 },
            { type: 'unlockIdea', projectId: 'conference_social_matching' },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  bxm_late_submit_data: {
    id: 'bxm_late_submit_data',
    title: '白小满：晚交的论文好像更容易过',
    description: [
      '白小满拿着一堆会议接收结果来找你，表情是那种"我发现了一件不该发现的事"。',
      '"老师，我统计了一下过去两年咱们组投的稿，发现一个奇怪的现象。" 她摊开一张表，"截止前二十四小时投的，接收率偏高一点点，而很早投的，有几篇反而拒了。"',
      '"这可能只是样本偏差，"你说。',
      '"我知道，" 她点头，"但如果不是偶然呢？审稿人的状态会不会也有时序效应？" 她停顿了一下，"这个如果做成研究，感觉会很好玩，但结论出来我们可能都不知道该不该公开。"',
    ],
    prompt: '白小满发现了一个有趣但微妙的现象，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', op: '>=', value: 40 },
      { type: 'time', field: 'year', op: '>=', value: 1 },
    ],
    options: [
      {
        id: 'bxm_late_submit_coincidence',
        text: '别多想，样本太小了',
        outcomes: [{
          weight: 1,
          narrative: '你说样本量太小，随机性太高，别对号入座。白小满很快接受了，点头说"也对"，把那张表叠起来放回包里，然后接着聊别的了。\n\n你心里有一丁点觉得她说的也不是没道理，但你没说出来。',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: -5 },
          ],
        }],
      },
      {
        id: 'bxm_late_submit_investigate',
        text: '好玩的问题，值得认真查',
        outcomes: [{
          weight: 1,
          narrative: '你说"确实好玩，不管结论是什么，这个效应本身值得系统研究一下，找更大的数据集。" 白小满立刻从包里掏出那张表，展开，说"我已经想好怎么爬会议投稿数据了。"\n\n那张表背面密密麻麻写着方法设计，明显是来之前就想好的，等的就是你这句话。',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'skills.theory', delta: 3 },
            { type: 'unlockIdea', projectId: 'late_submission_effect' },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

};
