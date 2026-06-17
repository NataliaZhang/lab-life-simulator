import type { GameEvent } from '../../../types';

export const moWenxuanEvents: Record<string, GameEvent> = {

  mwx_first_meeting: {
    id: 'mwx_first_meeting',
    title: '先调一下气场',
    description: [
      '他进门，先没急着坐，而是以一种职业性的眼神扫了一圈你的办公室：书架、窗、桌面，像在做系统诊断，缺的不是数据，是风水数据。',
      '然后他走过来，把你桌上的文具架轻轻转了二十度，拍拍手，说："老师，这个方向气场会顺很多——不用介意，小优化，不收费的。"',
      '然后他坐下，从包里掏出一份打印的研究计划，开始以另一个完全不同的人格讲科研：方向清晰，假设有出处，每一句话都能追溯。你坐在那里，静静意识到：这个人的玄学和科研，分属两个不同的严谨体系。',
    ],
    prompt: '你怎么回应这个开场？',
    triggerConditions: [
      { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', op: '<=', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'mwx_first_meeting_allow',
        text: '随便，气场的事你做主',
        outcomes: [
          {
            weight: 1,
            narrative: '你没有说话，等他坐好，把话题接回研究计划。他讲方法论的时候偶尔摸一下包里的铜钱，但节奏从未断过。走之前他说："老师气场挺好的，就是桌子方向之前稍微漏财，现在补上了。"你意识到，你刚刚同时通过了他的科研面试和他的气场面试，缺一不可。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 7 },
            ],
          },
        ],
      },
      {
        id: 'mwx_first_meeting_stop',
        text: '麻烦保持原样，谢谢',
        outcomes: [
          {
            weight: 1,
            narrative: '他手停了一下，点头，把文具架挪回去，挪得和原来误差不超过五度，说："好的老师，我尊重。"然后坐下，完全没有受到影响，开始讲科研，讲得同样扎实。走之前他从包里掏出一个小挂件，放在书架角落，说："备用方案，老师不用特意注意它，它自己会工作的。"',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_tarot_before_submit: {
    id: 'mwx_tarot_before_submit',
    title: '今天宜投稿',
    description: [
      '论文改到位了，你们约好今天提交。他准时出现在走廊，但没有立刻进来，隔着玻璃，你看见他从书包侧袋摸出一副牌，在走廊灯光下认真地抽了一张，对着灯举起来看了好一会儿，表情严肃得像在读PCR结果。',
      '然后他推门进来，把那张牌平放在桌上，说："老师，今天宜投稿，我们可以提交了。"牌面是"星星"，他指着图案解释："星星代表希望与长程目标对齐，适合将长期积累的成果推送出去。"',
      '说完他打开电脑，走投稿系统流程，操作熟练，每个字段检查了两遍，比大多数人提交论文都认真。',
    ],
    prompt: '你怎么回应这次塔罗投稿仪式？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'mwx_tarot_before_submit_ask',
        text: '……你是认真的吗',
        outcomes: [
          {
            weight: 1,
            narrative: '他想了几秒，说："影响的是我的状态。抽到凶牌，我会更仔细检查论文，因为我觉得自己可能在哪里疏忽了什么。抽到星星，我心态稳，投出去更干脆。"他顿了一下，"论文本身的质量，我是按独立标准判断的，玄学不参与那部分。"你发现你张了张嘴，找不到可以驳倒的切入点，只好让他提交了。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'mwx_tarot_before_submit_ignore',
        text: '好，那就提交',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"好，那就提交吧"，他点头，一脸郑重地把星星牌收回牌盒，然后打开投稿系统，从头到尾检查了一遍所有信息才按下提交。进度条转完，确认页面出现，他对着屏幕点了点头，说："星星没说错。"这句话的因果逻辑你决定永远不去追问。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_lucky_timing: {
    id: 'mwx_lucky_timing',
    title: '玄学成功率：68%',
    description: [
      '上次投稿，他通过占卜选了一个"宜提交"的日子，比截止日期早了整整四天。你当时只是让他不要拖就好，没有特别在意那个日子的玄学属性。',
      '结果审稿系统的回信比预期早了三周，而且Reviewer A在评审意见里专门点名说框架"思路清晰"。',
      '他发来一条消息，语气平淡但掩不住得意："老师，玄学成功率本月更新：68%。统计表见附件。"你打开附件：一份标准表格，事件名称、决策类型、预期结果、实际结果，每行都填得整整齐齐，还有"可能的混淆变量"一列。',
    ],
    prompt: '你怎么回应这份68%的战报？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', op: '>=', value: 15 },
    ],
    options: [
      {
        id: 'mwx_lucky_timing_share',
        text: '夸他：记录习惯很好',
        outcomes: [
          {
            weight: 1,
            narrative: '你回"恭喜，成功率还挺高的"，他回了一个长消息，说68%比随机基准高出约18个百分点，他有在控制"论文本身质量"这一变量。你意识到他在用实验思维研究他自己的迷信，这件事本身有一种让人不知道该笑还是该服气的严谨性。他最后问你要不要加入他的统计，说"样本量多一个是一个"。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
            ],
          },
        ],
      },
      {
        id: 'mwx_lucky_timing_skeptic',
        text: '科学解释：早投本来就更容易被优先处理',
        outcomes: [
          {
            weight: 1,
            narrative: '"老师说得有道理，"他翻开记录表，"我在混淆变量那列也加了早投这一项。"他点开表格指给你看：提交时间、论文实际质量、审稿人负担、季节性因素，一栏一栏列着。他补充："我没有把巧合和玄学对立，巧合也是气运的一种显化形式。"你感觉你刚刚不是赢了这场辩论，而是参与了一场永远赢不了的辩论。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_gpu_fengshui: {
    id: 'mwx_gpu_fengshui',
    title: 'GPU的朝向问题',
    description: [
      '服务器实验跑了三天，每次都在同一个阶段崩溃，日志里看不出原因，代码逻辑反复检查过了，依然是谜。',
      '他在白板前分析了整整一个下午，把所有工程原因列成一排：内存泄漏、CUDA版本冲突、数据加载并发、驱动兼容性……逐条测试，逐条排除，排除完他在白板上画了一个箭头，指向机房方向。',
      '"我有个建议，听起来可能有一点……"他停顿了一下，"服务器机柜目前朝东南，我建议转一下，偏北十五度左右。"他补充说机房散热风道也是朝北的，"气流和气场可能存在正向耦合。"机房管理员一听是"散热优化"，觉得理由合理，帮忙调了方向。实验从那之后稳定了。',
    ],
    prompt: '你怎么理解这次玄学调试？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.engineering', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'mwx_gpu_fengshui_accept',
        text: '科学解释：散热改善了',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"散热的解释说得通"，他点头，"对，我提方案的时候也用的是这个理由。"他在记录表备注里写：风水干预/散热优化（双重解释，均有效）。成功率那栏打了个勾。你意识到他在玄学和现实之间找接口的能力，某种意义上也是一种工程技能，一种你在教材里没有见过分类的技能。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', delta: 4 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.engineering', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'mwx_gpu_fengshui_investigate',
        text: '排查风水以外的原因',
        outcomes: [
          {
            weight: 1,
            narrative: '你说实验稳定了是好事，但原因必须搞清楚，不然下次出问题还是不知道从哪下手。他点头，翻出排查记录，两人又花了一个下午，最终找到一个具体的交叉点：温度阈值偏高时GPU降频，触发了一个隐藏的计时器边界条件——而转向改善了散热，温度降下来了。他把根因写进了文档，最后一行备注：风水因素：不可排除，但本次非主因。就差给这句话标p值了。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.engineering', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_interview_ritual: {
    id: 'mwx_interview_ritual',
    title: '幸运蓝T恤出战',
    description: [
      '他去某大厂实习面试，出发前给你发了一条消息，语气轻快："老师，今天大吉，运势：事业宫旺，利于面试，忌犹豫。准备完毕，出发。"',
      '消息附了一张自拍，蓝色T恤，表情自信，手机壳被他翻开拍给你看，里面夹着一枚铜钱，说这个是标配，已陪他过了七次重要考试，胜率100%。',
      '下午四点多，消息来了："老师，通过了，进技术二面。"最后一句是："星星牌预判+幸运蓝：成功。样本量+1。"',
    ],
    prompt: '你怎么回应这个好消息？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', op: '>=', value: 45 },
    ],
    options: [
      {
        id: 'mwx_interview_ritual_congrats',
        text: '恭喜，顺便提醒一下推荐信也起了作用',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"恭喜，推荐信应该也有帮到你"，他回："老师的推荐信是硬实力支撑，幸运蓝负责把我调到最佳状态，两者缺一不可，形成互补闭环。"你看着这句话想了一下，发现……好像也不是完全没有道理。他后来顺利拿到实习offer，发来消息说玄学成功率再次更新，并感谢了T恤和推荐信。顺序是T恤在前。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'mwx_interview_ritual_ability',
        text: '是不是因为实力本来就够了',
        outcomes: [
          {
            weight: 1,
            narrative: '"实力当然够，"他语气平静，"我准备了三周，把常见题型过了两遍，项目经历整理了三个版本。幸运蓝的作用是走进面试间那一秒不紧张。"他发来他的面试准备清单，密密麻麻，一点都不像靠运气的人。他最后说："玄学不是实力的替代品，是催化剂，让实力以最大效率释放。"你读完这句话，觉得这个学生将来大概会去写自我效能感的商业咨询报告。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_bad_omen: {
    id: 'mwx_bad_omen',
    title: '这个月时机不对',
    description: [
      '你们在讨论要不要赶一个月底的会议截止，他来找你，表情比平时认真了一个刻度，说："老师，我测算了一下，这个月时机不太对，不建议投这个会议。"',
      '他列了几条维度：这个会议的接受率历年来在该月份偏低，组里这段时间修改状态不够稳定，还有一个他说"难以量化但直觉显著"的整体气场判断。',
      '你翻了一下日历，发现这个截止日期和你正在准备的一个基金申请高度重叠，时间上真的非常紧——这件事他并不知道。',
    ],
    prompt: '你怎么回应这个建议？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', op: '>=', value: 30 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'mwx_bad_omen_accept',
        text: '行，这个会议先跳过',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"好，这个会议先缓，下一个窗口再看"，他点头，说"下个季度气场更顺"。你没有解释时间冲突那件事，他也没有追问。后来那篇论文投进了下一个会议，进了一个更匹配的评审委员会，结果反而更好。他在成功率统计里把这条记成了"建议被采纳，结果正面"，成功率那栏打了个勾，旁边写：双因子对齐（玄学+时间管理）。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
              { type: 'lab', stat: 'energy', delta: 7 },
            ],
          },
        ],
      },
      {
        id: 'mwx_bad_omen_clarify',
        text: '时机参考归你，投不投归我——说说学术判断',
        outcomes: [
          {
            weight: 1,
            narrative: '他点头，无缝切换叙述模式，从"气场"档换到"实际分析"档：审稿周期在当前修改进度下偏紧，接受率这两年下降，建议把精力集中到另一个更匹配的会议。你听完觉得这个判断本身是合理的，同意先缓一缓。他最后补了一句："玄学结论和实际结论这次一致，效率高了。"你不确定他在夸玄学还是夸自己的分析，或者在他那里这两件事本来就没有区别。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 9 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_statistics: {
    id: 'mwx_statistics',
    title: '置信区间：0.04到0.40',
    description: [
      '他发来一份PDF，标题是《个人决策辅助系统效果评估报告（第一年度）》，共十一页。',
      '报告统计了过去一年内所有涉及玄学参考的决策，共43条，分"遵循玄学建议"与"忽略玄学建议"两组，记录每条的背景、结果，以及他认为的成功/失败判定标准。',
      '结论部分写着：遵循组成功率68%，忽略组46%，差值22个百分点，p=0.031，95%置信区间[0.04, 0.40]。下面附了一行小字：样本量偏小，结论应谨慎解读；混淆变量（心理状态、执行质量）尚未完全控制。他自己写了局限性，措辞和他投过的论文里用的一模一样。',
    ],
    prompt: '你怎么回应这份报告？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'mwx_statistics_read',
        text: '认真读，和他讨论实验设计',
        outcomes: [
          {
            weight: 1,
            narrative: '你把报告从头到尾读了一遍。分析框架是认真的，效应量估计也合理。你提了几个问题：成功的定义是否一致？评定是否盲的？他把每条都记下来，说下一版会改进。你坐在那里，突然意识到这份报告和他做的课题用的是同一套逻辑，只是研究对象从系统变成了他自己的迷信。你想了一下，不知道这算不算一种自我意识。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'mwx_statistics_sample',
        text: '43条太少了，得不出什么结论',
        outcomes: [
          {
            weight: 1,
            narrative: '"我在附注里写了，"他翻到最后一页，指给你看，局限性第一条，字体和正文一样大，一点都没有想低调处理的意思。他合上报告，说："我做这份统计，目的不是证明玄学成立，是量化它的实际影响规模，同时找到更好的控制变量。第二年度我会把样本量推到80以上。"你意识到他说的是"第二年度"，言下之意，这件事他打算做成一个长期项目。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_skeptic_debate: {
    id: 'mwx_skeptic_debate',
    title: '影响的是心理状态',
    description: [
      '实验室来了一位访学研究员，性格直接，在组会茶歇听说了塔罗投稿的事，当场发问："你是认真相信这个的吗？这不是典型的确认偏误？"',
      '气氛安静了片刻。他把茶杯放下，没有表现出任何被冒犯的迹象，开口，语气平静到像在组会上讲方法论：',
      '"我不认为玄学能直接影响物理规律，所以它不改变论文的实际质量。但我认为它影响了我做决策时的心理状态，比如投稿前的焦虑水平，面试时的紧张程度。心理状态影响执行质量，执行质量影响结果。"他停了一下，"所以我优化的，是结果贡献函数里的一个中间变量。"',
      '访学研究员思考了几秒，说："……这个说法我没办法直接驳倒。"',
    ],
    prompt: '你怎么回应这场意外的辩论？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'mwx_skeptic_debate_nod',
        text: '默默点头，让他自己收场',
        outcomes: [
          {
            weight: 1,
            narrative: '你没有插话，看他把整个逻辑链讲完。访学研究员最后说"好，算你自洽"，两人转去聊别的，气氛恢复正常。事后他来找你，问你觉得他的论述有没有漏洞，说他在考虑把这个框架写进玄学年度报告的理论部分。你说"目前没发现明显问题"，他认认真真记下来，和引用一篇peer review过的文献一样郑重。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 10 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'mwx_skeptic_debate_comment',
        text: '说：这个论述比我想的更严谨',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"这个框架比我预期的更有逻辑"，他高兴了一下，但很克制，说："谢谢老师，我推敲过很多次。"访学研究员离开后，他在白板上把整个论证写了出来，检查了一遍，然后自己指出："弱点在心理状态到执行质量那一步，因果链还需要实证支撑。"你看着他站在白板前思考怎么证伪自己的理论，觉得这是你见过最奇异的科学精神，但很难说它不严谨。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'skills.theory', delta: 2 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_paper_title_omen: {
    id: 'mwx_paper_title_omen',
    title: '标题笔画数的问题',
    description: [
      '论文初稿成形，你们在敲定标题。他对着当前版本看了一会儿，翻出手机，算了一下，抬头说："老师，这个标题有几个字的笔画数加起来……不太顺，有点散。我想改一个字。"',
      '他把那个字指给你看，说出替换方案。你把两个版本都念了一下，发现改完的标题确实更简洁：字数少了一个，节奏更紧凑，读起来更有力。只是他本人的出发点和这些优点没有任何关系。',
      '"笔画数方面，改完之后总画数是个吉数，"他补充道，"工程方面，关键词密度稍微好了一点，这是附带收益。"',
    ],
    prompt: '你怎么回应这个标题修改建议？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', op: '>=', value: 70 },
    ],
    options: [
      {
        id: 'mwx_paper_title_omen_agree',
        text: '同意，标题确实改得更好',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"这个版本更简洁，改吧"，他更新了文档，说"好"，若无其事地继续讨论摘要。你注意到他没再提笔画数的事，像是在一张内部清单上打完了勾，可以继续下一项。论文投出去后，一个审稿人在评语里专门写标题"精确而简洁"。他看到这条，给你发了一条消息，只有五个字：笔画数：有效。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'mwx_paper_title_omen_content',
        text: '内容比标题重要，先把摘要对齐再说',
        outcomes: [
          {
            weight: 1,
            narrative: '他点头，把标题搁下，认真讨论摘要去了。你注意到他在笔记本上把那个改动记了下来，旁边写了一行小字：待定，内容优先。两周后做最终审阅，他翻到那页笔记，说："老师，之前那个标题，可以定了。"你看了一眼，觉得改完的确实更好，同意了。他在成功率统计里把这条记成了"延迟采纳，结果正面"，并加了备注：说明玄学建议具有时间稳健性。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  mwx_alumni_visit: {
    id: 'mwx_alumni_visit',
    title: '玄学成功率：71%',
    description: [
      // 🎓 毕业后回访 — 建议引擎在graduation后约6个月注入
      '毕业之后他去了一家AI公司。入职没多久，他在团队里推动了一套"发布前玄学评估流程"：每次重大版本上线前，有一个非强制性的环节，让有意愿的同事抽一张塔罗牌，记录感受，然后继续正常的技术评审。',
      '没有人真的相信它能预测上线质量。但这个环节留了下来，因为大家觉得有趣，而且它奇特地把发布前剑拔弩张的气氛缓和了一些。后来有个工程师说，抽到"愚者"那次他们反而查出了一个潜伏了三个版本的bug。这件事他在内部分享会上讲了，ppt第一页是：样本量n=1，但方向值得关注。',
      '他发来一封邮件，标题简洁：近况更新。正文说玄学成功率已更新至71%，第三年度报告见附件，方法论做了改进，加入了双盲评定。另外，他在公司认识了一个对学术合作感兴趣的工程师，问你有没有意向，可以牵线。',
    ],
    prompt: '你怎么回复这封邮件？',
    triggerConditions: [
      { type: 'student', studentId: 'mo_wenxuan', stat: 'projectProgress', op: '>=', value: 95 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'mwx_alumni_visit_connect',
        text: '回复：很高兴听到你的消息，工程师合作可以聊',
        outcomes: [
          {
            weight: 1,
            narrative: '你回了封邮件，说很高兴听到他的近况，工程师合作的事可以进一步了解。他很快回复，把那位工程师的背景和他们讨论过的方向简单介绍了一下，说他可以帮忙安排视频会议。邮件最后他加了一行：老师当时气场调整后的办公室，据说现在依然运作良好。他没有解释这句话，但你知道他说的是第一次见面时那个二十度，那天你让他随便调，他大概记到现在了。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'mwx_alumni_visit_report',
        text: '先问报告里双盲评定是怎么做到的',
        outcomes: [
          {
            weight: 1,
            narrative: '他回复得飞快，洋洋洒洒写了好几段：他找了两个同事做独立评定，给他们事件描述但不告诉他们属于"遵循"还是"忽略"玄学建议的组，让他们独立判断结果好坏。这样可以避免他自己的确认偏误干扰评分。他说改进之后成功率从68%调整到了71%，但置信区间更窄了，他认为这是方法论进步带来的估计更准确，而不是玄学效果真的变强了。最后他问你有没有兴趣在第四年度做共同作者。你看着这封邮件，一时不知道是该笑还是认真考虑一下。',
            effects: [
              { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 大厂挖角 ─────────────────────────────────────────────────────────────

  mwx_industry_poach: {
    id: 'mwx_industry_poach',
    title: '有大厂找上了莫问玄',
    description: [
      '莫问玄来找你，神情比平时冷静，手里拿着一封打印出来的邮件，放在你桌上，说："老师，我收到了一个offer。"',
      '是一家头部AI公司，做基础模型的，职级不低，薪资几乎是学术界的数倍。邮件写得很正式，但你注意到对方还在末尾专门提了一句：他们了解过他的研究方向，觉得他的直觉和判断力"非常独特"。',
      '莫问玄停顿了一下，说："我昨晚占了一卦……结果是「旅」。动而不失位，行而有所归。" 他自己加了一句："模糊的好兆头，我也没完全想清楚。"',
    ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', op: '>=', value: 0 },
      { type: 'time', field: 'year', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'mwx_poach_encourage',
        text: '"去吧，做学术不是唯一的路。"',
        outcomes: [{
          weight: 1,
          narrative: '你说："去吧，这是一个好机会，你值得。" 莫问玄愣了一下，大概没预料到你这么干脆。临走前说了句"老师，谢谢你这几年"，说得很认真，不是客套话，你听出来了。莫问玄走后，实验室少了一个人，多了一段你之后在学生面前会讲的故事。某次会议上，你偶尔看到莫问玄的名字出现在一篇高引论文的致谢里，排在第一位。',
          effects: [
            { type: 'leaveStudent' },
            { type: 'lab', stat: 'reputation', delta: 2 },
          ],
        }],
      },
      {
        id: 'mwx_poach_stay',
        text: '"先别急，再想想，我们这边还有很多事。"',
        outcomes: [{
          weight: 1,
          narrative: '莫问玄看了你一眼，把那封邮件折好收起来，说："那就再等等，等天时。" 他留下来了。但有时候你在他的眼神里会看到一种你说不清楚的东西——不是后悔，更像是一扇没有完全关上的门，随时有可能再开。',
          effects: [
            { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: -8 },
            { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: -10 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

};
