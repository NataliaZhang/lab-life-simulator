/**
 * 全组事件 — 含"全组"/"大家"等集体语言的事件，以及双人日常摩擦。
 *
 * 单条件 REQUIRE_GROUP (minStudentCount: 3) 已足够绑定两名随机学生，
 * 因此双人事件也挂同一 triggerConditions，用 {studentName} 和 {student2Name}
 * 分别代指两人。效果层使用 randomStudent / randomStudent2 精准定向。
 */

import type { GameEvent } from '../../types';

const REQUIRE_GROUP = [{ type: 'minStudentCount' as const, value: 3 }];

export const groupEvents: Record<string, GameEvent> = {

  // ── 全组会议冲刺（对应 mainline 的 conference_ddl，≥3人版）────────────────

  group_conference_ddl: {
    id: 'group_conference_ddl',
    title: 'GRF截止日前三天',
    description: [
      '距GRF截止还有72小时。',
      '整个组都进入了备战状态：有人跑实验，有人死盯loss曲线，有人在用写论文来逃避跑实验。',
      '接下来的策略取决于你。',
    ],
    prompt: '最后冲刺，押哪个路线？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'lead_charge',
        text: '亲自下场带冲',
        energyCost: 35,
        outcomes: [
          {
            weight: 2,
            narrative: '72小时连轴，最后十分钟提交。群里炸了：有人截图，有人发三个感叹号，有人说"感觉这辈子的睡眠都提前预支完了"。你没说话，只是把笔记本合上，慢慢喝了一口凉了很久的茶。这种感觉，值得。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
            nextEventIds: ['group_submission_result'],
          },
          {
            weight: 1,
            narrative: '三天没睡，最后实验跑崩了两次，勉强投出了一个残次品版本。全组进入沉默期，群里两天没有消息，只有一个人发了个"."，没人回。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -12 },
              { type: 'lab', stat: 'reputation', delta: -2 },
            ],
            nextEventIds: ['group_submission_result'],
          },
        ],
      },
      {
        id: 'split_tasks',
        text: '分工到人，各守一块',
        outcomes: [
          {
            weight: 2,
            narrative: '甘特图发出去，每人认领模块，无人扯皮。论文完成度出乎意料地好，某个模块甚至超额——你没问谁，但你大概猜得到是谁。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
            nextEventIds: ['group_submission_result'],
          },
          {
            weight: 1,
            narrative: '任务分了，有三个模块没人认领，最后被你默默兜底。论文投出去了，但你拖着两个通宵的眼圈盯着确认邮件，心里只有一个字：算了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -6 },
              { type: 'allStudents', stat: 'favor', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
            nextEventIds: ['group_submission_result'],
          },
        ],
      },
      {
        id: 'postpone',
        text: '不投了，下次再来',
        outcomes: [{
          weight: 1,
          narrative: '你在群里发通知：这次撤。大家各自盯着屏幕消化了一下，然后有人发"理解，下次一定"，另一个人加了个点赞，气氛意外地缓和——大家都是读博的，这种事不用多解释。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 6 },
            { type: 'allStudents', stat: 'favor', delta: 2 },
            { type: 'lab', stat: 'reputation', delta: -4 },
          ],
        }],
      },
    ],
    tags: ['monthly'],
  },

  group_submission_result: {
    id: 'group_submission_result',
    title: '投稿结果出来了',
    description: [
      '几个月过去。系统邮件终于来了。',
      '你深吸一口气，点开……',
    ],
    prompt: '无论结果，全组要一个说法。',
    // 链式事件，继承 group_conference_ddl 的触发条件（≥3人）
    options: [
      {
        id: 'celebrate_accept',
        text: '中了就庆祝，没中就复盘',
        outcomes: [
          {
            weight: 2,
            narrative: '中了！群里在五秒钟内从零消息变成了刷屏——截图、更新简历、"下一篇选题已经想好了"。你请全组吃了顿好的，聊到快十二点，结账时有人抢，你没让。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'allStudents', stat: 'favor', delta: 4 },
              { type: 'lab', stat: 'funding', delta: -2 },
            ],
          },
          {
            weight: 1,
            narrative: 'Rejected。你把审稿意见整理成文档，组织全组逐条过。有人在R3的意见旁边写了一个问号，有人直接说"这条说得对"。气氛有点沉，但组里的东西在一点点变得更扎实。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
        ],
      },
      {
        id: 'analyze_reviews',
        text: '不管结果，先啃意见',
        outcomes: [{
          weight: 1,
          narrative: '你把审稿意见投影在白板上，让每个人挑一条说理解。两个人为同一条意见激烈杠了起来——一个说审稿人说对了，一个说审稿人没看懂。你没裁判，让他们杠到底。杠完，论文的下一版思路自己出来了。',
          effects: [
            { type: 'allStudents', stat: 'skills.theory', delta: 5 },
            { type: 'allStudents', stat: 'favor', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

  // ── arxiv撞车 ─────────────────────────────────────────────────────────────

  arxiv_scooped: {
    id: 'arxiv_scooped',
    title: 'arxiv撞车了',
    description: [
      '消息从群里发来："老师，你看这篇……"',
      '你打开链接：某知名组，昨天，方法跟你们做的几乎一模一样，时间戳比你们早了整整三周。',
    ],
    prompt: '被人截了胡，下一步？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'differentiate',
        text: '精读差异，找破绽再打',
        outcomes: [
          {
            weight: 2,
            narrative: '你们逐段比对，发现对方在一个子任务上跳过了关键验证。就这一条，你们的方法有独特优势。换角度，重写贡献，投出去。审稿人：「提供了有价值的新视角」。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '差异找到了，但要补实验，工作量加了一倍。大家脸上写着"又是你"。三周后代码质量肉眼可见地提升了，但这不是大家想要的安慰奖。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'concurrent_work',
        text: '转投workshop，标注同期独立',
        outcomes: [{
          weight: 1,
          narrative: '发到workshop，注明"concurrent independent work"。圈内人看到了，也认可了——工作没白费，只是奖杯让别人先拿走了。大家的失落比你预想的小，或许是因为本来也没太期待。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'allStudents', stat: 'happiness', delta: -5 },
          ],
        }],
      },
      {
        id: 'pivot',
        text: '认清现实，换方向',
        outcomes: [{
          weight: 1,
          narrative: '你宣布换方向。有人把茶杯放下来，声音比平时重了一点。停了几秒，然后有人开口问"那之前的代码要删吗"，讨论就这么开始了——大家已经在往前看了，只是手上还拿着上一段路的东西。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: -10 },
            { type: 'allStudents', stat: 'favor', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  // ── 全组聚会 ──────────────────────────────────────────────────────────────

  group_celebration: {
    id: 'group_celebration',
    title: '难得的全组聚会',
    description: [
      '不知道是谁提议的，大家居然一致同意出去玩一天。',
      '日历一查，好几个月没有全组一起出去过了。科研真的太能吃人了。',
    ],
    prompt: '全组活动，去哪？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'escape_room',
        text: '密室逃脱（解谜派PI亲自出山）',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '密室里每个人的性格暴露无遗：有人冲最前面，有人盯着每一个细节，有人在角落独自推理拒绝合作。最后一分钟逃出来，大家笑得非常开心，并且互相笑话对方。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '没逃出来，但大家笑话彼此笑到密室结束。你发现你的学生在压力下的思路跟科研时完全一致：有人是你以为的那样，有人出乎意料——这比实验数据更有参考价值。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'hotpot',
        text: '吃火锅，大乱炖',
        fundingCost: 2,
        outcomes: [{
          weight: 1,
          narrative: '三个小时的火锅，从论文聊到未来，从学界聊到人生，有人说了些平时不会说的话。吃到最后锅底都红了，有人已经在规划下次吃什么。这种饱足感和组里的长期项目截然不同，但一样真实。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 10 },
            { type: 'allStudents', stat: 'happiness', delta: 12 },
          ],
        }],
      },
      {
        id: 'hike',
        text: '爬山散心，免费的',
        outcomes: [{
          weight: 1,
          narrative: '爬到山腰，有人开始聊很久没碰过的研究想法，有人讲了一个让全组在斜坡上停了五分钟的冷笑话。下山时大家都走得很慢，不是累，是不想那么快回去。不需要花钱，就是个好日子。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 6 },
            { type: 'allStudents', stat: 'favor', delta: 3 },
            { type: 'lab', stat: 'energy', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  // ── 双人日常事件 ──────────────────────────────────────────────────────────

  group_fridge_lunchbox: {
    id: 'group_fridge_lunchbox',
    title: '冰箱悬案',
    description: [
      '实验室冰箱里有一份盒饭。',
      '存放时长不明，没有标签，没有证人，三天内无人认领。',
      '今天，{studentName}和{student2Name}同时打开冰箱，同时伸手，同时说："这是我的。"',
    ],
    prompt: '主权争议，你来判。',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'quiz',
        text: '说出里面有什么菜，谁说对归谁',
        outcomes: [
          {
            weight: 2,
            narrative: '{studentName}报了两道菜。{student2Name}沉默了三秒，说"我也不太确定了"。盒饭以一种庄严的姿态被放回原位。双方达成不追究协议，握手，散去。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 3 },
              { type: 'randomStudent2', stat: 'happiness', delta: -2 },
            ],
          },
          {
            weight: 1,
            narrative: '两人都说得头头是道，菜名一道不差——因为他们说的是同一天的同一家外卖店。无法裁决，建议共享。两人对视了一秒，都说"算了"，分着吃了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 3 },
              { type: 'randomStudent2', stat: 'favor', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'throw_away',
        text: '扔掉，翻篇',
        outcomes: [
          {
            weight: 2,
            narrative: '盒饭庄严入桶。三分钟后，第三个学生走进来，问："我昨天放的盒饭呢？"',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: -4 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '盒饭消失了，事情翻篇。第二天冰箱上贴出一张A4纸，手写，正楷：「请勿擅自处理他人食物。— 法律顾问：{studentName}」。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'open_it',
        text: '开盒，现场鉴定',
        outcomes: [
          {
            weight: 2,
            narrative: '开盖那一刻，三米内的人全部后退。里面已经形成了独立的生态圈。{studentName}和{student2Name}同时说"不是我的"，然后共同把它推进了垃圾桶。这是他们今天合作得最默契的一次。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'favor', delta: 4 },
              { type: 'randomStudent2', stat: 'favor', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '打开，完全正常，{studentName}盯着看了三秒，小声说"真是我的……谢谢"，然后去热饭了。{student2Name}一句话没说，关上了冰箱。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 4 },
              { type: 'randomStudent2', stat: 'happiness', delta: -8 },
              { type: 'randomStudent', stat: 'favor', delta: -4 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  group_desk_war: {
    id: 'group_desk_war',
    title: '工位扩张战争',
    description: [
      '第一周：{studentName}的工位旁边多了一本书。',
      '第二周：{student2Name}的工位旁边多了半箱零食和一把备用椅。',
      '第三周：双方边界已经推进到走廊中央，这里名义上是公共区域。',
    ],
    prompt: '领土争端已不可忽视，如何处置？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'draw_border',
        text: '划定边界，今日起执行',
        outcomes: [
          {
            weight: 2,
            narrative: '你拿胶带在地板上画了一条线，双方各退一步。{studentName}和{student2Name}各自盯着那条线看了一会儿，都觉得自己分到的区域不够大，但都没吭声。边境和平，为期两周。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -2 },
              { type: 'randomStudent2', stat: 'happiness', delta: -2 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你拉了胶带，严正声明。次日，胶带被{studentName}的一箱矿泉水压住了，{student2Name}的折叠桌脚踩在线上，精确地踩在边界上，不算越界。国际法在这里失效了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent2', stat: 'favor', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'free_market',
        text: '自由竞争，强者得地',
        outcomes: [
          {
            weight: 1,
            narrative: '你宣布：谁能让另一个人心甘情愿退让，谁就赢。接下来五天，{studentName}换上了人体工学椅，{student2Name}搬来了一株绿植和一盏台灯。整个走廊居然因此变得体面了许多。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '自由竞争的结果：{student2Name}搬来了站立式办公桌，{studentName}带来了一台额外显示器。走廊已经无法正常通行，有人上厕所要侧身。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent2', stat: 'favor', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'charge_rent',
        text: '收租，占地要给钱',
        outcomes: [{
          weight: 1,
          narrative: '你宣布：公共区域占一格收5块/月，上交实验室基金。{studentName}和{student2Name}同时愣了一下，然后各自算了算自己占了多少格，同时开口问："可以转账吗？"实验室本月意外多了40块钱。',
          effects: [
            { type: 'lab', stat: 'funding', delta: 1 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
            { type: 'randomStudent2', stat: 'favor', delta: 3 },
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  group_bluetooth_dj: {
    id: 'group_bluetooth_dj',
    title: '深夜蓝牙事件',
    description: [
      '凌晨两点，实验室里只剩几个人。',
      '音响忽然响了——是一首节奏很快的歌，来源不明。',
      '{studentName}和{student2Name}同时抬头，同时声明："不是我"。',
    ],
    prompt: '深夜广播还在继续，怎么处理？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'investigate',
        text: '查蓝牙连接记录，绑架凶手',
        outcomes: [
          {
            weight: 2,
            narrative: '查了连接记录，设备名叫"小方的手机"。没有人叫小方。这个设备从未出现在实验室成员名单里，也没人知道它是怎么连上的。音乐停了，但谜团没有解开。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '连接记录显示是{studentName}的设备——但{studentName}坚称那首歌是自动播放的，他以为已经断开了。{student2Name}截图保存，以备将来要挟之用。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'just_listen',
        text: '一起听完，反正也快凌晨了',
        outcomes: [
          {
            weight: 2,
            narrative: '谁都没去管音响。接下来四十分钟，实验室里飘着各种不同风格的歌，有人把椅子转了半圈，有人跟着摇了两下头。这是本月最没生产力也最愉快的夜晚。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'allStudents', stat: 'projectProgress', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你们一起听完了整张专辑，然后{studentName}说"那个实验我还没跑"，重新戴上了耳机。美好时光结束，但代码也跑完了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'turn_up',
        text: '把音量调到最大',
        outcomes: [
          {
            weight: 1,
            narrative: '你把音量拉满。{studentName}愣了一秒，把手里的键盘推到一边，{student2Name}已经站起来了。接下来的一小时，实验室里没人写代码，但所有人都放松了。隔壁研究组敲了两下门，也加进来了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: -4 },
            ],
          },
          {
            weight: 1,
            narrative: '音量拉满，保安五分钟后来了。你解释这是"学术放松活动"，保安表示理解但请调小。你把音量调回了正常值。代价：一次警告和{studentName}永久性的表情包素材。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  group_academic_bet: {
    id: 'group_academic_bet',
    title: '学术赌局升级告急',
    description: [
      '{studentName}和{student2Name}打赌：赌一个模型能不能在下周跑出正结果。',
      '赌注从最初的"输了请喝奶茶"，不知道怎么演变成了：',
      '帮对方写三页Related Work / 穿玩偶服参加下次组会 / 请全组吃火锅。',
    ],
    prompt: '赌局已失控，你的立场是？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'ban_gambling',
        text: '明令禁止，实验室不是赌场',
        outcomes: [
          {
            weight: 2,
            narrative: '你宣布禁止。{studentName}和{student2Name}同时点头表示接受，然后在你转身后用眼神交换了一个"私下解决"的信号。赌局地下化，你没再过问。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent2', stat: 'favor', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你的禁令发布后，{studentName}当天把模型跑出来了——为了避免穿玩偶服。有时候赌注比任何deadline更有效。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'referee',
        text: '当裁判，主持公道',
        outcomes: [
          {
            weight: 2,
            narrative: '你宣布担任公正裁判。实验结果出来了——{student2Name}输了。你庄严宣判，{student2Name}认赌服输，穿着玩偶服坐进了下次组会，全程维持了令人钦佩的尊严。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
              { type: 'randomStudent2', stat: 'favor', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你当了裁判，但实验结果模棱两可，双方各执一词。你宣判"双方都输"，各请全组一半人吃饭。两人都愣了很久，然后同时说"这不公平"，然后意外地和解了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent2', stat: 'favor', delta: -3 },
              { type: 'lab', stat: 'funding', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'join_bet_1',
        text: '加入下注，押{studentName}赢',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}听说你押了自己，效率肉眼可见地提升了。模型跑出来了，你赢了赌注——一杯奶茶。你喝得很心安理得。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '{studentName}知道你押了自己之后，压力过大，实验跑崩了。你输掉了赌注，还要替{student2Name}写半页Related Work。{student2Name}表示非常感谢。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 10 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'join_bet_2',
        text: '加入下注，押{student2Name}赢',
        outcomes: [
          {
            weight: 1,
            narrative: '{student2Name}听说你押了自己，效率肉眼可见地提升了。模型跑出来了，你赢了赌注——一杯奶茶。你喝得很心安理得。',
            effects: [
              { type: 'randomStudent2', stat: 'favor', delta: 8 },
              { type: 'randomStudent2', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '{student2Name}知道你押了自己之后，压力过大，实验跑崩了。你输掉了赌注，还要替{student2Name}写半页Related Work。{studentName}表示非常感谢。',
            effects: [
              { type: 'randomStudent2', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  group_gpu_league: {
    id: 'group_gpu_league',
    title: '实验室运动会',
    description: [
      '{studentName}说：GPU排队的空档，咱们应该动一动。',
      '{student2Name}表示赞同，并提议打乒乓球。',
      '三天后，这已经演变成了有积分榜、有规则手册、有季后赛机制的实验室联赛。',
    ],
    prompt: '组内课间运动超出了预期，你怎么办？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'allow',
        text: '放行，只要不耽误实验',
        outcomes: [
          {
            weight: 2,
            narrative: '联赛延续了两个月，全组平均工作效率意外提升——有实验跑着，就得打比赛去等，省了盯屏幕发呆的时间。\n\n{studentName}拿到了本季冠军，{student2Name}拿到了"最具风度落败奖"。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
              { type: 'randomStudent', stat: 'skills.social', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '联赛在第三周失控——有人开始在GPU等待时间打排位赛，然后发现等待时间不够打完一场，于是开始故意提交短任务来续时。实验产出暂时性下降。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'allStudents', stat: 'projectProgress', delta: -3},
              { type: 'lab', stat: 'reputation', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'ban',
        text: '禁止，维护学术氛围',
        outcomes: [{
          weight: 1,
          narrative: '你宣布禁止，表情严肃。{studentName}和{student2Name}点头，然后在两天后把乒乓球桌移到了楼道里，说"这不是实验室"。你决定不再追究定义问题。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: -5 },
            { type: 'randomStudent2', stat: 'favor', delta: -5 },
            { type: 'allStudents', stat: 'happiness', delta: -3 },
            { type: 'lab', stat: 'reputation', delta: -2 },
          ],
        }],
      },
      {
        id: 'official_trophy',
        text: '举办正式联赛，设冠军奖杯',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '你买了一个奖杯，刻上"实验室乒乓球冠军"。{studentName}赢了，把奖杯放在显示器旁边，每天工作时都能看到。这学期他的代码提交量比上学期高了三成，相关性尚不确定。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 15 },
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '联赛办完了，{student2Name}赢了冠军，然后在颁奖词里感谢了导师、GPU集群，以及"最强对手"{studentName}。颁奖仪式持续了四十分钟，占用了组会时间，但没人抗议。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 6 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  group_charger_war: {
    id: 'group_charger_war',
    title: '充电器主权争议',
    description: [
      '实验室多了一根无标签充电器。',
      '{studentName}说是自己的。{student2Name}也说是自己的。',
      '两根充电器外观完全一致，均无法提供购买证明。',
    ],
    prompt: '争议无法调解，你怎么判？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'check_order',
        text: '查淘宝订单，谁买过就归谁',
        outcomes: [
          {
            weight: 2,
            narrative: '{studentName}翻出了订单截图，时间戳清晰，价格38.9元。主权确立，{student2Name}默默看了一眼自己的包，然后走回工位，没有解释。一根充电器原来并不足够。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 4 },
              { type: 'randomStudent2', stat: 'happiness', delta: -4 },
            ],
          },
          {
            weight: 1,
            narrative: '两人都翻出了订单截图，购买时间相差三天，型号完全一致。主权归属依然不明。你宣布这根充电器归实验室公有，两人均可使用，先到先得。两人同时皱眉，但接受了裁决。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'randomStudent2', stat: 'favor', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'buy_new',
        text: '买条新的，息事宁人',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '你花38.9元买了一根新的，问题解决。{studentName}和{student2Name}各拿一根，矛盾消弭。实验室的充电器数量从此进入稳定增长期——每有争议，你就买一根新的。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 5 },
              { type: 'randomStudent2', stat: 'favor', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '新充电器送到了，你宣布争议结束。当天下午，{studentName}的旧充电器也找到了，证明原来那根确实是{student2Name}的。{student2Name}表示"早说啊"，拎起充电器就走了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'time_share',
        text: '分时段共用，文明解决',
        outcomes: [{
          weight: 1,
          narrative: '你制定了充电时刻表：上午{studentName}，下午{student2Name}，周末轮换。执行第一天完美，第二天{studentName}加班忘记交接，{student2Name}大半夜没电关机了。外交危机重新爆发，时刻表宣告终止。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: -5 },
            { type: 'randomStudent2', stat: 'favor', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  group_takeout_disaster: {
    id: 'group_takeout_disaster',
    title: '外卖拼单事故',
    description: [
      '{studentName}和{student2Name}拼了一单外卖。',
      '配送员把两份单放错了袋子。',
      '现在{studentName}拿到的是{student2Name}的菜，反之亦然。',
      '更麻烦的是，{studentName}似乎对{student2Name}点的其中一样食材过敏。',
    ],
    prompt: '事故现场，如何处理？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'swap_back',
        text: '互换，物归原主',
        outcomes: [
          {
            weight: 2,
            narrative: '两人交换了餐盒，{studentName}看了看对方的菜，说"你点的这个看起来更好吃"。{student2Name}看了看，说"那换回去吧"。\n\n又一会儿，对话重复，他们又换了一次。最后两人各自吃了原本点的菜，花了二十分钟。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '交换顺利，{studentName}的过敏危机解除。但{student2Name}发现自己的菜已经凉了，因为{studentName}刚才试吃了几口。{student2Name}保持了体面的沉默，然后默默给下次外卖加了"不可拼单"备注。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 4 },
              { type: 'randomStudent2', stat: 'happiness', delta: -3 },
              { type: 'randomStudent2', stat: 'favor', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'random_assign',
        text: '随缘，命中注定的午饭',
        outcomes: [{
          weight: 1,
          narrative: '你建议两人各吃各拿到的，命运使然。{studentName}避开过敏食材，其余照吃，并表示"还不错"。{student2Name}吃了一半，说"我以为我不喜欢这个菜，其实还行"。意外的午饭，意外地和平。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 6 },
            { type: 'randomStudent2', stat: 'happiness', delta: 6 },
          ],
        }],
      },
      {
        id: 'eat_all',
        text: '全端上来，一起吃，账两清',
        outcomes: [
          {
            weight: 2,
            narrative: '你宣布：拼桌，共享，AA制不用算了。{studentName}和{student2Name}对视一秒，把所有餐盒推到桌子中间。附近三个学生端着椅子凑了过来，没人邀请他们，但也没人赶走。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '共享饭局开始，{studentName}一不小心吃了过敏食材，迅速抿了一口水压住了，没有发作，但脸红了半小时。\n\n{student2Name}注意到了，说"你还好吗"，{studentName}说"没事，工程问题"。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },


  group_comment_war: {
    id: 'group_comment_war',
    title: '注释圣战',
    description: [
      '{student2Name}在code review时，把{studentName}的注释全部重写了。',
      '{studentName}的注释风格：简短，有时抽象，偶尔只有一个词。',
      '{student2Name}的注释风格：详尽，引经据典，每行都有。',
      '现在{studentName}要求回滚，{student2Name}说原版是垃圾。',
    ],
    prompt: '注释主权争议，你如何裁决？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'judge',
        text: '评审双方注释，择优选用',
        outcomes: [
          {
            weight: 2,
            narrative: '你逐行看了两个版本。{studentName}的简洁但对新人不友好；{student2Name}的详细但有三处解释错了代码实际行为。\n\n你要求合并：保留{studentName}的骨架，加{student2Name}的关键说明。两人同时发出"好吧"的声音，和弦完美。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
              { type: 'randomStudent2', stat: 'skills.engineering', delta: 3 },
              { type: 'randomStudent', stat: 'favor', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你评审完，宣布{student2Name}的三处注释描述的根本不是代码实际做的事。{student2Name}看了很久，说"这里的逻辑应该是……哦"。原来代码本身也写错了。双方握手言和，开始修bug。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
              { type: 'randomStudent2', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'mediate',
        text: '和稀泥，两边都有道理',
        outcomes: [{
          weight: 1,
          narrative: '你说两边都对，各有千秋，建议协商。{studentName}和{student2Name}各自回工位协商了三十分钟，然后{studentName}发来了一个PR，里面把所有注释全删了，只留下代码。附言："解决方案"。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 5 },
            { type: 'randomStudent2', stat: 'happiness', delta: -5 },
            { type: 'lab', stat: 'energy', delta: -3 },
          ],
        }],
      },
      {
        id: 'ban_comments',
        text: '宣布：以后代码不许写注释',
        outcomes: [
          {
            weight: 1,
            narrative: '你宣布：代码应该自我解释，禁止注释。{studentName}立刻感到解脱，{student2Name}沉默了很久，然后发了一条：「那我可以写特别长的变量名吗？」你意识到你开了一个潘多拉的盒子。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent2', stat: 'favor', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '禁止注释令发出后，{student2Name}把所有解释性文字移进了函数名里，导致函数名平均长达47个字符。代码可读性直线下降，但确实符合规定。技术上，这是合规的。',
            effects: [
              { type: 'randomStudent2', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: -2 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  group_nap_spot: {
    id: 'group_nap_spot',
    title: '午睡领地争端',
    description: [
      '实验室有一把折叠躺椅，是实际上公认的最佳午睡地点。',
      '今天，{studentName}和{student2Name}同时在午饭后走向它。',
      '双方都在距离躺椅两米处停下，开始进行眼神博弈。',
    ],
    prompt: '领土争端以最慢速度进行中，你介入吗？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'schedule',
        text: '排班制，奇偶日各一人',
        outcomes: [
          {
            weight: 2,
            narrative: '你拍板：奇数日{studentName}，偶数日{student2Name}。系统正式运行，运行良好，直到遇到了月末31号和下月1号的连续奇数日，{student2Name}连续两天睡地板，提出了强烈的制度质疑。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent2', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '排班第一天顺利。第二天，今天是{student2Name}的，但{studentName}忘了，先到先睡了。{student2Name}站在旁边看了三秒，把外套叠起来，在桌上趴下了，一声没说。你欠了一个人情。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent2', stat: 'favor', delta: -4 },
            ],
          },
        ],
      },
      {
        id: 'first_come',
        text: '先到先得，江湖规矩',
        outcomes: [{
          weight: 1,
          narrative: '你宣布先到先得。接下来两周，{studentName}和{student2Name}的吃饭速度都提升了约三成。实验室午休效率空前高涨，但饭是越吃越快，不知道算不算对健康有益。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: -4 },
            { type: 'randomStudent2', stat: 'happiness', delta: -4 },
            { type: 'lab', stat: 'energy', delta: 8 },
          ],
        }],
      },
      {
        id: 'buy_chair',
        text: '买把折叠椅，根本解决',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '你花三百块买了一把一样的折叠椅，搬进实验室。{studentName}和{student2Name}各占一张，下午都睡得很香。这是本月最成功的资源调配决策。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
              { type: 'randomStudent2', stat: 'favor', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '新椅子搬来了，但{studentName}说新椅子没有旧的舒服，要继续用旧的。你意识到这已经不是资源问题，是归属感问题。你决定不再介入，让时间解决。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'randomStudent2', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  group_citation_cartel: {
    id: 'group_citation_cartel',
    title: '互引同盟',
    description: [
      '{studentName}找到{student2Name}，低声说了一件事：',
      '"我引你一篇，你引我一篇，h指数一起涨，互不亏欠。"',
      '{student2Name}思考了大约四秒，说"说来听听"。',
      '你不小心听到了对话的后半段。',
    ],
    prompt: '学术互引同盟，你的立场？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'discourage',
        text: '劝阻，这条路不对',
        outcomes: [
          {
            weight: 2,
            narrative: '你找两人分别谈了谈，说这件事在业内是禁忌，被发现会影响信誉。{studentName}说"只是顺手引一下，又不是造数据"，{student2Name}说"业内这样的多了去了"。你说了三十分钟，没有完全说服对方，但他们暂时搁置了计划。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent2', stat: 'favor', delta: -3 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你劝阻了，两人接受了。一个月后，两人各自在论文里认认真真地引用了对方的相关工作，理由充分，上下文完整。这次是合法的，但你不确定是不是因为你的劝说。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
              { type: 'randomStudent2', stat: 'skills.theory', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'look_away',
        text: '假装没听见，业内生态自有规律',
        outcomes: [
          {
            weight: 2,
            narrative: '你假装没听到，走回办公室。两人的h指数在接下来一个学期里各增加了一点点。没有人受到影响，没有人被发现。你选择性地遗忘了这件事。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 3 },
              { type: 'randomStudent2', stat: 'favor', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你没有干涉。两人互相引了，然后把这个方法告诉了另外两个同学，然后那两个同学也开始互引。你的实验室逐渐形成了一个小型引用闭环，被某个检索系统标了黄色警告。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'join_expand',
        text: '加入，带上全组一起涨',
        outcomes: [
          {
            weight: 1,
            narrative: '你召集全组，宣布：每人认真写一篇survey，互相引用，前提是引用必须有实质相关性。这变成了一次有组织的文献梳理活动。三个月后全组学术产出提升，引用链经得起审查。有时候方向比动机重要。',
            effects: [
              { type: 'allStudents', stat: 'skills.theory', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '全组互引计划启动。两周后，某个审稿人在review意见里写道："该工作的引用列表显示出明显的自引团簇特征。"你不得不在rebuttal里解释这只是一个小而紧密的研究组。审稿人没有被完全说服。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -8 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

};
