/**
 * 实验室日常生活事件 — 小事变大事系列
 *
 * 幽默核心：鸡毛蒜皮的导火索，排山倒海的后果。
 * 当事人全程保持高度严肃，从不认为自己在小题大做。
 */

import type { GameEvent } from '../../types';

// 用于绑定任意在读学生的通用触发条件
const BIND_ANY_STUDENT = [{ type: 'anyStudent' as const, stat: 'projectProgress' as const, op: '>=' as const, value: 0 }];

export const labLifeEvents: Record<string, GameEvent> = {

  // ── 1. 咖啡机危机 ─────────────────────────────────────────────────────────

  coffee_machine_crisis: {
    id: 'coffee_machine_crisis',
    title: '咖啡机停摆的第四天',
    description: [
      '实验室的咖啡机坏了。那台从创组第一年就存在的银色咖啡机，安静地停在角落里，上面贴着一张A4纸，写着"维修中，请勿触碰"，签名是四天前。没有人知道维修进度，没有人敢揭那张纸，没有人知道谁贴的。',
      '今天是星期一，上午九点。实验室里的气氛像是一个人憋着打喷嚏，不是生产力的问题——那不是重点——重点是，咖啡作为一种仪式感已经停转了整整九十六小时。有人开始用热水泡速溶，另一个人看了看那杯速溶，轻轻皱了一下眉，戴上了耳机。',
    ],
    prompt: '咖啡机停摆第四天，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'buy_new_machine',
        text: '直接买台新的（花1万）',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '新咖啡机当天下午到货，还自带磨豆功能。有人第一时间拆箱，拍了张照发到群里，配文"重生"。整个实验室的气氛在第一杯咖啡倒出来的那一刻，可见地松动了——甚至有人开始哼歌。旧机器上的"维修中"纸条，没有人去揭。它在那里又待了两个星期，像一座纪念碑。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 12 },
              { type: 'lab', stat: 'funding', delta: -1 },
              { type: 'allStudents', stat: 'favor', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '新机器到了，拆箱，插电，发现插头规格不对。你花了一个下午找转接头，找到了，咖啡机运转正常了。过程消耗了你本来用来写经费申请的两个小时。申请推迟了三天。后来拨款少了十万。你不确定这两件事之间有没有因果关系，但你偶尔会想。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'funding', delta: -1 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'self_service_coffee',
        text: '建议大家自己买咖啡',
        outcomes: [
          {
            weight: 1,
            narrative: '你在群里发了一条消息，建议大家近期自行解决咖啡需求，等维修进度。群里挂着已读双勾大约四分钟，然后有人回了个"好的"。这两个字的信息量，需要结合对方平时的聊天风格才能解码——你大概解码出来了，但选择不去细想。两周后，实验室角落出现了三个不同品牌的便携咖啡杯，各自形成了一个独立的咖啡生态圈，互不干涉。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'favor', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你建议大家自行解决，但顺手把实验室咖啡预算砍掉了，理由是"临时性政策"。这条消息发出去二十分钟后，有人在楼道里和你热情地打了个招呼，回来问你咖啡机什么时候修。你说不确定。对方"哦"了一声，转身走了。门带上的一瞬间，你隐约听到走廊里有人用力呼了口气。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'favor', delta: -6 },
            ],
          },
        ],
      },
      {
        id: 'remote_week',
        text: '宣布本周远程办公（消耗精力）',
        energyCost: 15,
        outcomes: [
          {
            weight: 2,
            narrative: '你宣布本周远程，原因在群里写的是"设备调整期"，没有人追问。大家在家工作，进度不减，有人甚至说"在家反而写代码更快"。你决定不去深究这句话的含义。咖啡机的维修纸条在空荡的实验室里独自贴了五天，等大家回来的时候还在，像什么都没发生。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '远程的第三天，你发现组会效率骤降——有人连麦时背景音是在外卖店，有人摄像头一直关着，有人回复消息的速度从"即时"变成了"人在，但是"。周五统计了一下本周产出，你决定这件事就此翻篇。咖啡机修好了，是维修师傅趁周四来学校顺手弄好的。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'projectProgress', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 2. 白板上的不死方程 ────────────────────────────────────────────────────

  whiteboard_immortal: {
    id: 'whiteboard_immortal',
    title: '白板上那个方程',
    description: [
      '白板的右下角，有一组方程。没有名字，没有日期，没有标注说明它属于哪个项目。有人说它在这里至少两年了，经历过三次"大扫除"和一次实验室搬迁，每一次都被奇迹般地保留了下来。上个月有人差点把它擦掉，但被旁边的人拉住了——"等等，你确定那不是什么重要的东西吗？"',
      '谁都不知道它重不重要。谁都不知道它是谁写的。但谁也没有动它。它就这么活着，安静地占据着一块大约A4纸大小的白板领土，变得越来越黄。',
    ],
    prompt: '那个无主方程还在白板上，你决定',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'declare_heritage',
        text: '宣布它为"实验室文化遗产"，永久保留',
        outcomes: [
          {
            weight: 1,
            narrative: '你在方程旁边用红色白板笔画了个框，写下"遗产区，请勿擦除"，落款日期。没有人质疑这个决定。两个月后，有新来的访客问起那个方程，有学生开始以一种半认真的口吻为它编造背景故事，每次版本都略有不同，越来越离奇。方程本身的学术地位从"不知道"升级成了"据说是某次重大突破的起点"。你没有纠正过任何一个版本。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'erase_it',
        text: '擦掉它，彻底了结',
        outcomes: [
          {
            weight: 2,
            narrative: '你在周五下午人少的时候，拿起板擦，三秒内把那组方程清除干净了。旁边没有人，很顺利。第二天，有学生回来，在白板面前站了将近一分钟，最后只是把帽子往下拽了一下，转身回了工位。白板从此空着那一块，大概两个月内没有人在那里写过任何东西。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'energy', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你擦掉了那组方程。当天下午，做理论方向的学生发来一条消息，语气克制得可疑："老师，那个白板上的式子你还记得长什么样吗？"你说记不清了。对方回了句"没事"，后面没有标点。三天后，对方把一个推导卡了两周的问题解出来了——和那个方程没有关系，纯粹是巧合。但你还是有点想知道那个方程到底是什么。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'investigate_equation',
        text: '认真研究一下那到底是什么',
        outcomes: [
          {
            weight: 2,
            narrative: '你把方程拍了照，发到了一个学术群里问了一圈。四十分钟后有人认出来了：是某篇2018年论文里的一个中间推导步骤，那篇论文后来被引用了九次。你把链接转发给实验室，大家各自点进去看了一会儿，然后有人说："那不是我们组做的方向。"方程不属于任何人，也不特别重要。但它终于有了一个身份——这已经算某种意义上的安慰。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
          {
            weight: 1,
            narrative: '你研究了两个小时，查了十几篇论文，没有找到任何匹配。那组方程很可能是某个人在某次推导中途放弃的草稿，既没有结论，也没有意义，只是碰巧没被擦掉。你把这个调查结果汇报给了任何一个问你的人，方式是说"先不去管它了"，语气里带着一种努力掩盖的虚无感。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 3. 冰箱谜团（链式起点） ───────────────────────────────────────────────

  mystery_fridge_encounter: {
    id: 'mystery_fridge_encounter',
    title: '冰箱里的存在',
    description: [
      '公共冰箱最下层，有一个保鲜盒，用黑色记号笔写着一个大大的问号。没有名字，没有日期。有人说它上学期就在了，有人说更早，没有人能核实。它就这么存在着，占据了三分之一的下层空间，气味谈不上难闻，但……总之不是食物的气味了。',
      '有人前几天在实验室群发了一条消息："有人知道冰箱里那个东西是谁的吗？"消息发出去之后得到了零个回复，只有三个表情包——分别是一个问号、一个眼睛往旁边看的猫、以及一个"我不知道你在说什么"的熊。',
    ],
    prompt: '冰箱谜团已经持续了整整一个学期，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'handle_it_yourself',
        text: '亲自动手，直接处理',
        outcomes: [
          {
            weight: 2,
            narrative: '你戴上厨房手套，把保鲜盒取出来，走到走廊垃圾桶旁边，打开看了一眼——然后立刻盖上，扔进去，转身走回来，全程没有任何表情。这种事最好的处理方式就是不留任何讨论空间。回到实验室，你说了一句"冰箱清了"，没有人追问，也没有人感谢你，这是正确的结局。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
            nextEventIds: ['mystery_fridge_truth'],
          },
          {
            weight: 1,
            narrative: '你打开了那个保鲜盒。里面的内容物的性状已经很难描述，你花了三秒辨认它原本的食物身份，没有成功。你把它扔了，但余波在你后脑勺某个区域留存了一整天，导致你午饭没怎么吃。这个代价比你预期的高。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
            nextEventIds: ['mystery_fridge_truth'],
          },
        ],
      },
      {
        id: 'post_notice',
        text: '贴通知，给72小时认领期',
        outcomes: [
          {
            weight: 2,
            narrative: '你在冰箱上贴了一张A4纸，写着"冰箱最下层保鲜盒，72小时内无人认领将予以处理"，日期时间一并标注。通知发出后，整个实验室进入了一种奇妙的集体视而不见，没有人认领，没有人询问，每个人经过冰箱时都格外专心地看着前方。72小时后，你如约动手处理了，程序合理，心理负担为零。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
            nextEventIds: ['mystery_fridge_truth'],
          },
          {
            weight: 1,
            narrative: '通知贴出去了，在72小时的最后三分钟，有人发来了一条消息。你看了看，深吸了口气。',
            effects: [],
            nextEventIds: ['mystery_fridge_truth'],
          },
        ],
      },
      {
        id: 'democratic_vote',
        text: '发起投票：民主决定如何处置',
        outcomes: [
          {
            weight: 1,
            narrative: '你在群里发起了投票，选项是"直接扔""留48小时再决定""请物主自行处理"。投票结果是三票"直接扔"，一票"留48小时"，一票"不投了感觉太荒诞了"。民主胜利了，你把它扔了，同时对整件事的荒诞程度有了新的量化认知。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 4 },
              { type: 'allStudents', stat: 'favor', delta: 2 },
            ],
            nextEventIds: ['mystery_fridge_truth'],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 4. 冰箱真相（链式后续） ───────────────────────────────────────────────

  mystery_fridge_truth: {
    id: 'mystery_fridge_truth',
    title: '冰箱谜团：真相大白',
    description: [
      '有人来敲你的门。是实验室里做工程方向的一个学生，表情有点复杂，介于内疚和"其实我也觉得不是大事"之间。"老师，关于冰箱那个……其实是我的。"',
      '解释如下：那是一个发酵项目，初衷是自制泡菜，使用的是一个经过改良的发酵配方，在密封环境下本应是安全可控的。这件事被遗忘的原因是期中考试周，随后是一篇论文的deadline，随后是另一个实验的连续故障。泡菜已经超过发酵周期两个月以上，具体状态不做描述。这位学生的表情，介于悼念和庆幸之间。',
    ],
    prompt: '冰箱谜团的主人已现身，你决定',
    options: [
      {
        id: 'let_it_go',
        text: '事情已经处理了，既往不咎',
        outcomes: [
          {
            weight: 2,
            narrative: '你说已经处理了，不用追究，但下次公共冰箱里的东西请注明名字和日期。对方道了谢，表情可见地松动了，转身离开时肩膀下降了大约两厘米。这件事就此翻篇。实验室群里再也没有人提起那个保鲜盒，但"发酵"这个词在接下来两个月内偶尔会引发一阵意味不明的安静。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 5 },
              { type: 'randomStudent', stat: 'happiness', delta: 6 },
            ],
          },
        ],
      },
      {
        id: 'diplomatic_debrief',
        text: '趁机进行一次"实验室物品管理"的友好谈话',
        outcomes: [
          {
            weight: 2,
            narrative: '你用一种不带任何火气的语气聊了大概十分钟，内容是关于公共空间的使用原则，态度是理解的，同时举了两个匿名案例说明类似情况在其他实验室的后果。对方全程认真听完，说了"老师您说得对"，补充了一句"我会注意的"。你相信这句话的真诚程度大约在百分之七十左右，对这个数字表示满意。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 2 },
              { type: 'randomStudent', stat: 'happiness', delta: 3 },
              { type: 'allStudents', stat: 'favor', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '你说了一些关于公共责任的话，语气里不知不觉带了一点严肃。对方点头如捣蒜，说"老师对不起，不会再有下次了"。出门的时候，你能感觉到对方脚步明显加快了。这次谈话的效果可能比你预期的留在对方记忆里的时间要长很多，但性质有点不一样了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -3 },
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'install_fridge_policy',
        text: '建立冰箱使用制度，防患于未然',
        outcomes: [
          {
            weight: 1,
            narrative: '你当天下午起草了一份《实验室公共冰箱使用规范》，共五条，要求所有物品注明姓名、存入日期和预计取用日期，超期自动视为无主物品。这份文件被打印出来贴在冰箱上，格式认真，字体工整。有学生私下评价说"跟物业管理条例似的"，但此后两个学期，冰箱里再也没有出现不明身份的存在。规范的制定成本换来了秩序，代价是你花了一个下午。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 2 },
              { type: 'allStudents', stat: 'favor', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['chain'],
  },

  // ── 5. 空调战争 ───────────────────────────────────────────────────────────

  ac_warfare: {
    id: 'ac_warfare',
    title: '空调温度战争',
    description: [
      '实验室内部形成了两个非正式派系：22度派和26度派。据不完全统计，过去两周内有人秘密调整了空调温度三次，没有人承认，但空调遥控器上的指纹密度可以证明一切。靠窗的桌子上出现了一台便携暖风机，靠门的桌子上出现了一台USB小风扇。它们相距三张桌子，各自运转，互不干涉。',
      '上周五的组会上，有人说了一句"有点冷"，有人说了一句"还好"，然后整个话题在全组的默契中被悄然放弃了。但事情显然还没结束。这两台电器的共存已经从"临时应对"演变成了"阵地声明"。',
    ],
    prompt: '空调派系矛盾已经公开化，你决定',
    triggerConditions: [{ type: 'minStudentCount', value: 3 }],
    options: [
      {
        id: 'impose_24',
        text: '裁定24度，全组统一执行',
        outcomes: [
          {
            weight: 2,
            narrative: '你在群里发布裁定："空调统一设定24度，不再调整。如有异议可以穿衣物调节。"消息发出后，暖风机和小风扇都在当天下午悄然消失了，不知道是被收起来了还是被遗弃在某个抽屉里。两个派系进入了一种表面和平状态，你偶尔还是能看到有人多穿了一件外套，另一个人把袖子卷到了肘部。24度就是这个实验室所能协商到的最大公约数。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -2 },
              { type: 'lab', stat: 'energy', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你裁定了24度，把遥控器锁进了抽屉。这个方案在实施后的前三天运行良好。第四天，你回来发现暖风机复活了，理由是"只是吹风，不是加热"。你决定不再纠缠定义问题，抽屉重新上锁，但解释了：吹风也不行。对方表示理解，拔了插头，但每次路过那台暖风机的时候，眼神都要在上面停留一秒半。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -4 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'ac_schedule',
        text: '制定轮换时间表：上午26度，下午22度',
        outcomes: [
          {
            weight: 2,
            narrative: '方案合情合理，每个人都得到了一半的时间。时间表贴在了空调旁边，格式认真。问题是：22度派集中在下午开展核心工作，26度派偏好上午写代码，这个时间表正好完全符合各自需求，完全是误打误撞的胜利。两个派系都觉得自己赢了，你没有去解释。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 6 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '时间表执行到第二周，有人发现交接时间恰好是他们每天组会的时间，导致每次调温都在会议进行到最关键的时候发生，暖风咔哒一声关，冷风嗡地一下开，全场分神。你修改了时间表，然后有人说修改后的版本跟他的午饭时间冲突了，你再次修改……这份时间表最终迭代了七个版本。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'let_them_sort_it',
        text: '不干预，让他们自己协商',
        outcomes: [
          {
            weight: 1,
            narrative: '你选择了不介入。他们确实没有自行解决。三周后，实验室里出现了第二台暖风机，第二台小风扇，以及有人开始戴着一顶针织帽坐在自己桌子前，声称"只是保暖"。你注意到但没有评论。空调温度维持在一种每天都不一样的量子叠加状态，取决于谁最先到。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -6 },
              { type: 'allStudents', stat: 'favor', delta: -2 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 6. 访客最差时机 ───────────────────────────────────────────────────────

  visitor_worst_timing: {
    id: 'visitor_worst_timing',
    title: '贵客二十分钟后到',
    description: [
      '你看了一眼日历，然后站在实验室门口看了一眼实验室。',
      '有人在午休，趴在键盘上，耳机还挂着。一台显示器上面放着一盒吃了一半的外卖，盒盖歪开，露出红油。白板上密密麻麻写满了公式，其中有一行被圈起来，旁边写了"???错的???"。线缆在地板上形成了一种复杂的拓扑结构。还剩二十分钟。',
    ],
    prompt: '贵客即将到访，实验室现状堪忧，你决定',
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 15 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'emergency_cleanup',
        text: '紧急动员，全体打扫',
        outcomes: [
          {
            weight: 2,
            narrative: '你叫醒了午休的那位，外卖盒被扔进了走廊的垃圾桶，线缆整理成了一个勉强整洁的束状，白板被翻了个面。十九分钟后，实验室的状态从"失事现场"升级到了"正在工作中的科研场所"。访客到来，参观一圈，表示"看起来很有研究氛围"——这句评价让你短暂陷入了对"氛围"这个词的深度思考。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'allStudents', stat: 'favor', delta: 2 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '紧急打扫行动进行到第十五分钟时，有人打翻了那盒外卖，红油洒在了地板上，清理花了额外七分钟。访客抵达时，你正在最后擦地，手里还拿着一张已经变红的纸巾。访客愉快地假装没有看见任何事情，你们进行了一场内容充实的交流。后来访客在朋友圈写了"参观了一个充满活力的实验室"，配了一张照片，你注意到画面边缘有一点红色，但角度很刁，不好确认是什么。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'honest_tour',
        text: '如实接待，这就是真实的科研现场',
        outcomes: [
          {
            weight: 1,
            narrative: '你迎接了访客，没有清理，没有解释，只是带着对方参观。走到午休那位旁边时，你说："这是在DDL前的高强度阶段，作息不规律是正常的。"走到外卖那里，你说："团队长时间在实验室工作，餐饮基本上就地解决。"访客认真点头，后来反映这次参观"非常真实，印象深刻"。这是你收到过的最令人困惑的正面反馈之一。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'favor', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '你如实带访客参观。午休那位刚好在这时候翻身，耳机脱落，弹出一段非常响亮的游戏音效，充满了整个房间。访客微笑着等到声音停下，说了一句"看来大家工作压力也会疏解一下"。你觉得这次参观的社会代价比预期的略高。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -1 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'reroute_to_conference',
        text: '临时改在会议室接待',
        outcomes: [
          {
            weight: 2,
            narrative: '你发消息给助教，把路线改到会议室。访客进来，整洁的白墙，一张长桌，你们正式交流了一小时，全程流畅、专业、体面。访客离开后，你回到实验室，外卖盒还在那里，午休那位已经醒了，问你"来的人参观了吗"。你说"去会议室了"。对方点了点头，重新戴上耳机。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 7. 永恒TODO出土 ───────────────────────────────────────────────────────

  eternal_todo_unearthed: {
    id: 'eternal_todo_unearthed',
    title: '那个TODO已经活了两年',
    description: [
      '在一次代码review中，有人发现了这样一行注释：`// TODO: fix this properly later — 2022-03-15`。',
      '日期距今超过两年。当年写下这行注释的人已经毕业了，或者换了方向，或者就是你，你已经不确定了。让这件事变得复杂的是：这个"fix this properly later"所在的函数，现在是整个推理流程的核心调用链。没有人知道当年"properly"指的是什么，也没有人敢轻易动它，因为它现在确实在跑，而且看起来……还行。',
    ],
    prompt: '两年前的TODO已经成为核心基础设施，你决定',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'attempt_the_fix',
        text: '尝试彻底修复它',
        outcomes: [
          {
            weight: 1,
            narrative: '你们花了三天重构了那段代码，写了严格的单元测试，把边界条件覆盖到了。重构后的版本更清晰，也确实修了一个原版存在的潜在数值精度问题——这个问题原本对大多数输入没有影响，但对某些极端情况有影响。没有人能确定这是不是当年说的那个"properly"，但至少写了注释可以证明你们认真对待过这件事。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 6 },
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'projectProgress', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '重构进行到一半，发现那段代码的逻辑和三个下游模块之间存在一种微妙的耦合，动了就全错。你们花了两天恢复原状，把注释改成了`// TODO: fix this properly — 2022-03-15 (尝试过，先放着) — 本年月日`，然后移交给了下一个人。链条传承了下去。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'lab', stat: 'energy', delta: -20 },
            ],
          },
        ],
      },
      {
        id: 'document_it',
        text: '写详细注释和文档，把已知情况记清楚',
        outcomes: [
          {
            weight: 1,
            narrative: '你用了半天写了一段详尽的注释块，说明这段代码的已知行为、潜在风险、以及为什么暂时保留原样。文档提交到了代码库里，还加入了README的"已知设计决策"一节。没有解决问题，但把问题的现状定格了，这已经是在技术债管理领域能做到的最体面的事情之一了。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'promote_to_known_limitation',
        text: '升格为"已知限制"，写进论文的limitation部分',
        outcomes: [
          {
            weight: 2,
            narrative: '你做了一个决定：这不是bug，这是limitation。你在论文的limitation部分加了一段，表述为"当前实现在极端输入分布下的数值稳定性尚未经过完整验证"，语气学术，无懈可击。审稿人没有人追问这句话背后的具体含义。代码里的TODO注释被改成了`// KNOWN LIMITATION: see paper Section 5.2`，焕然一新，完成了一次身份的华丽转型。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -3 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 8. 桌底考古 ───────────────────────────────────────────────────────────

  desk_archaeology: {
    id: 'desk_archaeology',
    title: '大扫除考古现场',
    description: [
      '年末大扫除。有人移开了一张桌子，开始清理底下的空间，随后停下来叫你过去看。',
      '桌底清单如下：三个不同年代的键盘（其中一个还有线），两台显示器（均能开机，均与任何现有接口不兼容），一本2019年的深度学习教材（书脊完好，疑似从未被翻开），以及一个U盘，黑色，标签手写，内容是"IMPORTANT - DO NOT DELETE"，没有后续说明。U盘旁边还有半包薯片，已经过期，但密封完好。没有人知道这些东西属于谁。',
    ],
    prompt: '桌底出土了一批无主文物，你的处置方式是',
    triggerConditions: [{ type: 'time', field: 'year', op: '>=', value: 2 }],
    options: [
      {
        id: 'check_the_usb',
        text: '插上那个U盘，看看里面是什么',
        outcomes: [
          {
            weight: 1,
            narrative: '你找了一台备用机插上了那个U盘。里面有：一个名为"最终版_真的最终版_这次是真的_v7.pptx"的文件，一个未命名的压缩包，里面是一个2021年某次组会的原始数据，一张照片，是一只猫，以及一个txt文件，打开是三行字："如果你看到这个说明你找到了。里面有我当年的原始实验数据。请联系xxx。"联系方式是一个已经注销的QQ号。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'skills.theory', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你把U盘插上了。它被识别为只读设备，里面的文件系统报错，无法访问。你换了三台电脑，结果都一样。那个U盘可能已经死了，或者它内部有某种奇异的文件系统，亦或者它从来就没有过重要内容，"IMPORTANT - DO NOT DELETE"只是某种程度上的心理建设。你把它放回了桌上，决定晚点再想。然后忘记了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'archive_everything',
        text: '统一归档，贴标签放进储藏室',
        outcomes: [
          {
            weight: 1,
            narrative: '你把所有东西归置整齐：键盘和显示器贴上"闲置设备"标签放进储藏室，教材进了实验室书架，U盘放进了一个标着"待处理"的抽屉，薯片扔掉了。这套操作完成后，实验室变得干净了，所有问题都被合法地推迟到了储藏室里。一年后有人打开那个储藏室，发现了这些东西，整个过程再次重演。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'throw_it_all',
        text: '全部扔掉，彻底清零',
        outcomes: [
          {
            weight: 2,
            narrative: '你把三个键盘、两台显示器、教材、U盘和薯片全部装进了大垃圾袋。当天下午有人路过，问了一句"那里面有没有一个黑色U盘"。你说已经扔了。对方停了一下，说了一句"好的"，然后继续走了，背影里带着一种克制过的遗憾。你永远无法知道那个U盘对于那个人来说是不是真的重要的东西，但整理出来的这片空间让你觉得值得。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你把所有东西扔了，干净利落。两天后，一个已经毕业的师兄发消息过来，问实验室大扫除有没有动某张桌子，因为他有一个U盘当年忘在那里了，里面有毕设的原始数据，虽然已经毕业了，但出于情感因素还是想要回来。你看着消息，看了很久。最后回了一个"在的"，然后去楼下翻了垃圾桶。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 9. 实验室流浪猫 ───────────────────────────────────────────────────────

  lab_stray_cat: {
    id: 'lab_stray_cat',
    title: '那只猫又来了',
    description: [
      '实验室窗口朝南，靠近一楼，窗台正好是一只流浪猫能跳上来的高度。它第一次来是三周前，{studentName}给它放了一点饼干，于是它开始每天来。它现在有了自己的角落——靠暖气管的那块地毯，{studentName}从家里带来的——还有了一个名字，也是{studentName}取的。',
      '昨天，它在一台没锁屏的笔记本上踩了一圈，向组会群发送了一条由它的爪子键入的消息。内容是"vbbbbbbbbnnn"。有两个人给它点了赞。',
    ],
    prompt: '{studentName}给这只猫建立了实质性的居留关系，你决定',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'officially_adopt',
        text: '正式收编，申请成为实验室成员',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '你批准了这只猫的"驻组"申请，买了猫粮、猫砂盆和一个小猫厕所。{studentName}为它建了一个档案，包含照片、到来日期，以及那条"vbbbbbbbbnnn"作为第一份学术贡献。这只猫成为了实验室迄今为止唯一一个不需要写年度总结的成员，实验室群的活跃度提升了一个量级，日常话题终于有了非科研的补充选项。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 15 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'funding', delta: -1 },
            ],
          },
          {
            weight: 1,
            narrative: '猫被正式收编了，买了全套装备。麻烦随之而来：有人对猫毛过敏，发现时已经在实验室待了两周，眼睛红了三天；猫砂盆的位置跟空气流向恰好形成了一种让人无法忽视的动态；这只猫在第二周爬上了服务器机柜，导致一台实验机过热警报。但每次组会结束，它过来踩一圈的时候，没有人舍得把它请走。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'funding', delta: -1 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'unofficial_mascot',
        text: '维持现状，默认它是非正式吉祥物',
        outcomes: [
          {
            weight: 1,
            narrative: '你没有明确表态，{studentName}也没有再申请什么。这只猫每天来，每天走，有时候在角落睡到傍晚。它的那条Slack消息被截图，贴在了白板上，标注了"实验室最高互动量发言"。有人出去买咖啡的时候会顺手带猫罐头，没有人统计过花了多少钱，也没有人问。这种状态维持了整整一个学期，所有人都满意，包括那只猫。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'favor', delta: 6 },
            ],
          },
        ],
      },
      {
        id: 'escalate_to_policy',
        text: '上报学院，走正规"工作场所动物"审批流程',
        outcomes: [
          {
            weight: 1,
            narrative: '你填写了一份情况说明，递交学院行政。行政回复说这需要走《校园动物管理暂行办法》第三章的程序，需要动物检疫证明、房间评估报告，以及楼长签字。你打了两个电话，填了一张表，楼长说他需要再问一下上级。三周后没有任何进展，那只猫仍然每天来，每天走，对整个审批流程毫无察觉，也毫不在意。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -12 },
              { type: 'allStudents', stat: 'happiness', delta: 4 },
              { type: 'randomStudent', stat: 'favor', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ── 10. 打印机启示录 ──────────────────────────────────────────────────────

  printing_apocalypse: {
    id: 'printing_apocalypse',
    title: '打印机在DDL前三天罢工',
    description: [
      '距论文提交截止三天。打印机坏了——不是卡纸，是滚轮彻底故障，打印头位移，每一页出来都是一种新的艺术形式。学校打印中心显示队列等待48小时，系统显示前方有217份文件。最近的校外打印店在公交40分钟外，还需要换一次车。',
      '更糟的是：每个人都需要打印同一套50页的表格——那种学校坚持要求纸质版的表格，填完签字再扫描提交，整个流程的荒诞性超越了任何理性解释，但这不是现在可以讨论的问题。',
    ],
    prompt: '打印机在最糟糕的时刻宣告死亡，你决定',
    triggerConditions: [{ type: 'minStudentCount' as const, value: 3 }],
    options: [
      {
        id: 'find_workaround',
        text: '发动全组人脉，找到能打印的地方',
        outcomes: [
          {
            weight: 2,
            narrative: '你发了一条朋友圈，附带了一段用词克制但含义清晰的求助文字。二十分钟内，隔壁楼的另一个组回复说他们的打印机还能用，欢迎来用。全组分批过去，用了一个下午，人情账上记了一笔，可以用一次联合审稿作为等值偿还。文件打印完了，截止日前三十小时提交成功，全程有惊无险。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '人脉网络动员起来了，但找到的打印机在另一个校区，来回时间三小时。去的那个学生带回了打印好的文件，同时带回了完全不属于这件事的疲惫。打印完成了，截止日前一小时提交，中间有人发现有一页表格漏签，用Uber送了一趟来回。总体而言，是有代价的成功。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'projectProgress', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'buy_cartridge',
        text: '买新墨盒和滚轮配件，自行修复（花1万）',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '你下单了墨盒和替换滚轮，加急运费，当天下午到货。有工程方向的学生自告奋勇拆机，按视频教程换了滚轮，打印机重新运转。第一张打出来的时候，有人给它拍了个视频。这件事在当天成为了实验室三周内最具有叙事高潮的事件，实验室修理经费账单上出现了一条新记录。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'funding', delta: -1 },
            ],
          },
          {
            weight: 1,
            narrative: '配件到了，工程系学生拆机，换完重装，打印机启动，走了三页，停了，报了一个之前从没见过的错误代码。你查了半小时找到解释：原来还有一个零件也坏了，但不在最初的故障报告里，属于连带损耗。重新下单，再等一天，在截止日前四小时装完，打完，提交。成本超过预算两倍。但确实搞定了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'funding', delta: -1 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'go_full_digital',
        text: '拒绝纸质流程，全部数字化提交',
        outcomes: [
          {
            weight: 1,
            narrative: '你给系主任写了一封邮件，措辞礼貌但含义清晰：打印机故障，时间紧迫，请问数字化提交是否可行。系主任回复说"可以，这次例外"。你把这条回复截图，发到了群里。有人说"还能这样"，有人说"这是今年最意外的收获"，有人说"为什么我们不一开始就这么做"。表格全部电子填写，签名用了PDF电子签，一个下午完成，效率比历年高了三倍。这件事让你重新评估了所有"必须纸质"的流程。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 12 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你尝试申请数字化提交，但系统是封闭的，表单只接受纸质材料扫描版，且必须有湿签名。你打电话到行政，被转接了三次，最后被告知"规定就是规定，数字化需要另外申请，审批周期两周"。你挂了电话，看了看日历，叫了出租车，和学生一起去了那个40分钟外的打印店，在那里排了一个半小时的队，用了一台勉强能用的机器，在截止前两小时把材料打完。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -12 },
              { type: 'allStudents', stat: 'favor', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

};
