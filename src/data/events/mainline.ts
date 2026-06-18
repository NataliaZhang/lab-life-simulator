/**
 * 主线事件 — 开局序列 + 核心科研推进链 + 时间锚定里程碑
 *
 * 开局序列：lab_opening → startup_grant（固定顺序，放在 openingEventIds）
 * 推进链（单学生视角，{studentName} 贯穿全链）：
 *   suspicious_results → investigation_result
 *   conference_ddl     → submission_result
 *   grant_deadline     → grant_result（经费事件，无学生绑定）
 *
 * 链式事件仅通过 nextEventIds 注入队列，不放入 monthlyEventPool。
 * 链式事件会继承触发者的 bound student，所以 {studentName} 在链中持续有效。
 *
 * 时间锚定：lab_birthday（第2年8月，由 monthlyUpdate 强制注入）
 *
 * 含"全组"/"大家"语言的事件 → 放到 group_events.ts（需 ≥3 人）
 */

import type { GameEvent } from '../../types';

const BIND_ANY_STUDENT = [{ type: 'anyStudent' as const, stat: 'projectProgress' as const, op: '>=' as const, value: 0 }];

export const mainlineEvents: Record<string, GameEvent> = {

  // ── 开局序列（无学生，实验室刚成立）────────────────────────────────────────

  lab_opening: {
    id: 'lab_opening',
    title: '实验室的第一天',
    description: [
      '钥匙在锁孔里轻轻转动了一下。门开了。这就是你的实验室。',
      '未来六年，你将在这里申请经费、指导学生、熬夜改论文、和 Reviewer 斗智斗勇，也可能在某个凌晨三点怀疑自己为什么没有去卖奶茶。',
      '房间并不大。一块空白的白板。几张还没拆封的办公桌。一扇能看到校园的窗户。除此之外，什么都没有。',
      '没有成果。没有学生。没有声望。甚至连实验室官网都是默认模板。',
      '你站在门口看了很久。然后忽然意识到一件事。',
      '从今天开始，所有人都会觉得——你应该知道自己在做什么。',
    ],
    prompt: '你决定：',
    options: [
      {
        id: 'begin',
        text: '好吧，那就假装我知道。',
        outcomes: [{
          weight: 1,
          narrative: '你把钥匙揣进口袋，走进实验室。无论如何，故事开始了。',
        }],
      },
    ],
    tags: ['intro'],
  },

  startup_grant: {
    id: 'startup_grant',
    title: '启动经费到账',
    description: [
      '第二天一早，你收到了一封来自学院财务办公室的邮件。主题：《关于青年教师启动经费发放的通知》。',
      '正文很长。你直接拉到最后。看到数字的时候，还是忍不住重新确认了一遍。',
      '¥500,000。五十万。昨天你的实验室还只有一块白板，今天你已经要开始决定怎么花五十万了。',
      '成为教授最神奇的地方之一，大概就是别人真的会把钱交给你，然后期待你做出正确决定。',
    ],
    prompt: '你的第一笔启动经费，准备怎么花？',
    options: [
      {
        id: 'buy_server',
        text: '先买服务器',
        outcomes: [{
          weight: 1,
          narrative: '你花了20万元订购服务器。采购流程复杂得像在申请签证。但当确认邮件发来的那一刻，你忽然有了一种真正拥有实验室的感觉。剩余经费：30万元。',
          effects: [
            { type: 'lab', stat: 'funding', delta: 30 },
            { type: 'lab', stat: 'reputation', delta: 5 },
          ],
          nextEventIds: ['recruit_campaign'],
        }],
      },
      {
        id: 'save_money',
        text: '先存着再说',
        outcomes: [{
          weight: 1,
          narrative: '你决定暂时不动这笔钱。科研史上有无数项目死于缺钱，而你打算至少先活过第一个学期。看着账户里的数字，你获得了一种短暂而脆弱的安全感。',
          effects: [{ type: 'lab', stat: 'funding', delta: 50 }],
          nextEventIds: ['recruit_campaign'],
        }],
      },
      {
        id: 'renovate_lab',
        text: '先改善实验室环境',
        outcomes: [{
          weight: 1,
          narrative: '你购置了一批办公家具、显示器和咖啡机。虽然科研水平没有任何提升，但实验室终于从"闲置房间"升级成了"看起来像能发论文的地方"。剩余经费：40万元。',
          effects: [
            { type: 'lab', stat: 'funding', delta: 40 },
            { type: 'lab', stat: 'reputation', delta: 2 },
          ],
          nextEventIds: ['recruit_campaign'],
        }],
      },
    ],
    tags: ['opening'],
  },

  recruit_campaign: {
    id: 'recruit_campaign',
    title: '光杆司令',
    description: [
      '你环顾四周。实验室是有了——白板、桌子、也许还有一台轰轰作响的服务器——但整个房间里就只有你一个人。严格来说，你现在是一位"没有学生的导师"，这个职位的另一个名字叫做"闲人"。',
      '某处有一批准博士生正在滚动浏览各个实验室的网页，手边备着一份"可以发邮件的导师名单"。他们会给十位教授发邮件，其中九位不会回复。你需要成为那个回复的人。但首先，你得让他们知道你存在。',
      '你打开电脑，新建了一个文档，标题是《招生宣传方案》。然后盯着空白页面看了整整三分钟。',
    ],
    prompt: '你准备怎么宣传自己的实验室？',
    options: [
      {
        id: 'poster_blast',
        text: '做一张海报，发到所有考研群',
        outcomes: [{
          weight: 1,
          narrative: '你在凌晨十一点用 PowerPoint 设计了一张招生海报，裁切比例错了三次，字体换了五种，最终选了"微软雅黑加粗"。发出去之后，第二天早上醒来，邮箱里已经有十七封询问邮件。其中两封是问实验室有没有班车的。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'lab', stat: 'energy', delta: -10 },
          ],
        }],
      },
      {
        id: 'crash_class',
        text: '直接去隔壁教授的研究生课上宣讲',
        outcomes: [{
          weight: 1,
          narrative: '"就占用大家三十秒。" 你在张教授讲课途中举手示意。三十秒变成了五分钟。张教授全程保持着一个礼貌但含义明确的微笑。但课后有三位同学过来加了你微信，其中一个说"老师你讲得比张老师好玩"。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
      {
        id: 'build_website',
        text: '肝一个高大上的实验室官网',
        outcomes: [{
          weight: 1,
          narrative: '你用开源模板搭了一个官网，个人照片用的是三年前参会时拍的，西装是借的。Publications 页面目前只有两篇，但排版非常漂亮。一周后，有人发邮件说"我是通过谷歌搜到您实验室的"。你感到了一种奇特的骄傲。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 4 },
            { type: 'lab', stat: 'energy', delta: -15 },
          ],
        }],
      },
      {
        id: 'honest_pitch',
        text: '实话实说：来我组，有独立 GPU 用',
        requiredChoiceId: 'buy_server',
        outcomes: [{
          weight: 1,
          narrative: '你在群里发了一条消息："本人新晋助理教授，方向 XXX，实验室刚采购了服务器，学生可独立使用，欢迎联系。" 没有废话，没有修饰。这条消息被转发了九次。事实证明，在 CS 领域，"有 GPU"的吸引力远大于任何学术愿景。',
          effects: [{ type: 'lab', stat: 'reputation', delta: 6 }],
        }],
      },
    ],
    tags: ['opening'],
  },

  // ── 第2年1月固定事件（仅限未买服务器的路线，monthlyUpdate 强制注入）─────────────

  // 安全：由 monthlyUpdate 注入时绑定了 studentId，{studentName} 可安全使用
  gpu_envy: {
    id: 'gpu_envy',
    title: '隔壁的 GPU',
    description: [
      '{studentName}进来的时候表情有点复杂——像是有话想说，又觉得不好意思说的那种。',
      '"老师，我问你个事……" 停顿了三秒。"张老师组最近买了一批新服务器，八张A100，他们的同学昨天在朋友圈发了个跑实验的截图。"\n\n你意识到这不是一个汇报，是一个前情提要。',
      '"我之前跑一个实验要等三天，他们两个小时就出结果了。"\n\n又是一段沉默。然后是那句你其实已经预感到的话：\n\n"老师，我们组能买台服务器吗？"',
    ],
    prompt: '你准备怎么回答？',
    options: [
      {
        id: 'buy_server_late',
        text: '大手一挥：买！',
        fundingCost: 20,
        outcomes: [{
          weight: 1,
          narrative: '你批了采购申请。看见入库确认单的{studentName}大喜过望，抬起头说"谢谢老师"。服务器到货的那天，{studentName}中午都没出去吃饭，一直在机房调环境。你偷偷看了一眼实验室的GPU使用率：满载。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 2 },
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'randomStudent', stat: 'skills.engineering', delta: 4 },
          ],
        }],
      },
      {
        id: 'rent_server_instead',
        text: '先租云服务器凑合用',
        fundingCost: 5,
        outcomes: [{
          weight: 1,
          narrative: '你给{studentName}开通了一个云服务器账号，月度额度够用。{studentName}认真道了谢，但不知为何你从对方的语气里听出一丝失望——毕竟账号和机器不是一回事，就像"可以用"和"自己有"不是一回事。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: -2 },
            { type: 'randomStudent', stat: 'happiness', delta: -2 },
          ],
        }],
      },
      {
        id: 'refuse_gpu',
        text: '现在经费紧张，暂时不行',
        outcomes: [{
          weight: 1,
          narrative: '你解释了经费状况。{studentName}点头，说"好的老师我知道了"，然后回去了。你说不清楚那个"知道了"里面有多少理解，有多少失望，以及有多少已经开始悄悄浏览其他组动态的成分。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: -5 },
            { type: 'randomStudent', stat: 'happiness', delta: -10 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  // ── 新手期固定事件（由 monthlyUpdate 按月强制注入，不放入 monthlyEventPool）─────
  // 时序：year 1 month 9 → joint_meeting_proposal
  //       year 1 month 10 → first_semester_reality
  //       year 1 month 11 → semester_one_checkpoint
  //       students >= 3（任何时间）→ independent_meeting

  joint_meeting_proposal: {
    id: 'joint_meeting_proposal',
    title: '两个人的组会',
    description: [
      '你在白板上郑重地写下"研究进展"四个字，转过身——对面坐着你唯一的学生，两人大眼瞪小眼。大概过了七秒钟，你们同时意识到都在等对方先开口。',
      '这就是你建组以来的第一次"组会"。参与人数：2。多余的椅子：6。整间会议室正在以一种沉默但坚定的方式暗示你，"会议"这个词需要一定的规模才能成立。',
      '门被敲了三下。是隔壁办公室的张嘉明老师，端着一杯茶，脸上带着一种"我来得正是时候"的神情。他说："听说你刚建组？我们每周四下午开联合组会，几个组拼在一起，人多热闹，学生互相也有个参照，要不要来凑一凑？"',
    ],
    prompt: '张老师的提议，你怎么回应？',
    options: [
      {
        id: 'join_joint',
        text: '加入，人多力量大',
        outcomes: [{
          weight: 1,
          narrative: '就这么定了。从那以后每周四下午，你带着学生出现在张老师那间更大的会议室里，和他的三个学生一起汇报进展、互相挑剔实验设计，顺手拼桌叫外卖。"组里大家"从此真的有了实际人数——只是其中大部分人是借来的。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'lab', stat: 'energy', delta: 10 },
            { type: 'allStudents', stat: 'skills.social', delta: 2 },
          ],
        }],
      },
      {
        id: 'solo_meeting',
        text: '谢了，我们自己开',
        outcomes: [{
          weight: 1,
          narrative: '你婉拒了张老师，决定保持独立。接下来两周的周四下午，你和学生准时坐进会议室，开足一小时，中间有几次陷入难以定性的沉默——分不清是深度思考还是实在没话讲。\n\n第三周，学生侧着脑袋问："张老师那边的同学说可以带我们过去旁听，要去看看吗？"你说好。\n\n从那以后你们就这么并入了联合组会。张老师在门口看见你，只说了一句："早来就好了。"然后递给你一杯茶，头也不回地走进去了。',
          effects: [
            { type: 'lab', stat: 'energy', delta: -10 },
            { type: 'lab', stat: 'reputation', delta: 1 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  first_semester_reality: {
    id: 'first_semester_reality',
    title: '教授的秘密',
    description: [
      '你翻开这周的日历：三个委员会会议、两份审阅请求、一份"关于差旅报销流程优化的意见征集"——附件57页，请在本周五前反馈意见。与此同时，学生群里出现了三条带图带数据的实验进展更新，看起来比你忙碌多了。',
      '你发现了一个没有人明说的真相：成为教授，并不意味着你终于可以一心做研究。它意味着你需要在做研究的同时，处理所有妨碍你做研究的事情，并让两边都觉得你全力以赴。',
    ],
    prompt: '这份塞满的日历，你的对策是：',
    options: [
      {
        id: 'clear_admin',
        text: '先把行政清完，再专心科研',
        outcomes: [{
          weight: 1,
          narrative: '你花了整整一个下午处理邮件、填表、回复"已阅"。清完之后终于可以打开代码库了——然后看了一眼时钟，六点整。明天再说。至少把邮箱里那个烦人的小红点清掉了。',
          effects: [
            { type: 'lab', stat: 'energy', delta: -10 },
            { type: 'lab', stat: 'reputation', delta: 1 },
          ],
        }],
      },
      {
        id: 'delegate_meeting',
        text: '拉一个学生去开会，我有正事',
        outcomes: [{
          weight: 1,
          narrative: '你把一个委员会会议转给了学生，说"帮我去听一下，回来汇报重点"。对方回了个"收到"，语气里有一种微妙的新鲜感——大概是第一次意识到，导师也需要被人替下场。半小时后，你多推进了三个实验步骤。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 5 },
            { type: 'lab', stat: 'reputation', delta: -2 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
            { type: 'randomStudent', stat: 'favor', delta: -2 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  semester_one_checkpoint: {
    id: 'semester_one_checkpoint',
    title: '十一月',
    description: [
      '十一月。窗外的银杏叶掉得差不多了，走廊里有人在推车搬外卖箱——期末季的前奏。你算了一下：建组刚好三个月。',
      '成果清单：一篇在写的论文、几组跑完的实验、三次被推迟的截止日期，以及若干条消息记录里的深夜时间戳。进度比计划的慢，但比最坏的预期好。这大概就是科研的正常节奏：比期待慢，比噩梦好，日复一日地往前走。',
      '你坐在窗边，忽然想给{studentName}发条消息。',
    ],
    prompt: '发什么？',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'encourage',
        text: '辛苦了，这学期干得不错',
        outcomes: [{
          weight: 1,
          narrative: '你发了一句"辛苦了，这学期表现得很好"。{studentName}的回复不是文字，而是一张当天刚跑完的实验截图，日志是一片通畅的绿色。你猜这不完全是巧合。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 5 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
          ],
        }],
      },
      {
        id: 'give_break',
        text: '放一天假，你我都需要',
        outcomes: [{
          weight: 1,
          narrative: '你发了一句"明天不用来实验室"。{studentName}秒回了个"真的吗？"。真的。学生的快乐有时候就这么简单。\n\n而你自己那天买了杯奶茶，在校园里溜达了一圈，重新感受了一下这个地方。原来除了实验室走廊，学校还挺大的。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'lab', stat: 'energy', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  independent_meeting: {
    id: 'independent_meeting',
    title: '终于单飞了',
    description: [
      '你数了一下：三个。实验室里现在有三名在读学生，三个包、三套作息、三种对按时汇报的不同理解。',
      '你想起了那个最早的周四——你和一个学生坐在会议室里，两人大眼瞪小眼，然后张老师敲门进来，把你们带进了更大的会议室。这一年多，你在那里见识了他的学生、他的项目，也旁观了他批改稿子时的措辞——有时候严格，有时候准确，偶尔两者兼有。',
      '但三个人了，可以有自己的会议室了。你去张老师办公室，轻轻敲了两下门。',
    ],
    prompt: '告别要怎么说？',
    options: [
      {
        id: 'graceful_exit',
        text: '谢谢这段时间，我们下周单飞',
        outcomes: [{
          weight: 1,
          narrative: '张老师看了你一眼，点点头，然后顺手把他们组的会议室档期往前挪了一小时。你回来后在白板上写了"独立组会：每周五下午"，三个学生抬起头看着。你觉得空气里有什么东西悄悄变了——你的实验室有了自己的节奏。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'allStudents', stat: 'happiness', delta: 5 },
            { type: 'lab', stat: 'energy', delta: 5 },
            { type: 'allStudents', stat: 'skills.social', delta: 2 },
          ],
        }],
      },
      {
        id: 'confident_exit',
        text: '我们组大了，来打架的',
        outcomes: [{
          weight: 1,
          narrative: '张老师愣了一秒，然后笑出来，说"等你们发了顶会再来说这话"。但该说的都说了，该感谢的也感谢了。下周五下午，你们第一次在自己的会议室里坐下来，白板是新的，人是自己的，组会也终于是真正意义上的"组"的会了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'allStudents', stat: 'happiness', delta: 8 },
            { type: 'allStudents', stat: 'favor', delta: 3 },
            { type: 'allStudents', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  // ── 科研推进链：可疑实验结果（单学生视角）─────────────────────────────────

  suspicious_results: {
    id: 'suspicious_results',
    title: '数据有点……可疑',
    description: [
      '{studentName}发来实验结果，各项指标好得出奇——比SOTA高了整整10个点。用红色加粗标注了，后面跟着三个感叹号。',
      '你盯着数字看了三分钟。科研生涯里你还没见过好到这种程度的结果——通常这意味着要么诺贝尔奖，要么有什么地方不对劲。',
    ],
    prompt: '结果好得离谱，你选择：',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'double_check',
        text: '让{studentName}仔细复查',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}翻了一遍，发现了问题：测试集泄漏了，模型悄悄见过它不该见的数据。修正之后真实提升只有3个点——仍然不错，但那三个感叹号已经收回去了。一场学术危机就这样在悄悄发生、又悄悄被消解。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
          nextEventIds: ['investigation_result'],
        }],
      },
      {
        id: 'trust_results',
        text: '相信数据，直接写论文',
        outcomes: [{
          weight: 1,
          narrative: '你和{studentName}兴奋地花了两周写完论文，信心满满地投出去。审稿意见回来了，审稿人二号：第一条——"请在附录中详细说明评估协议及数据划分方式。" 你盯着这句话看了三秒，内心经历了一套完整的情绪——从"这是什么意思"到"哦"到"哦不"——然后把截图转发给了{studentName}。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: -3 },
            { type: 'randomStudent', stat: 'happiness', delta: -10 },
          ],
          nextEventIds: ['reviewer_two'],
        }],
      },
    ],
    tags: ['monthly'],
  },

  investigation_result: {
    id: 'investigation_result',
    title: '调查结果出来了',
    description: [
      '{studentName}把所有代码重新梳理了一遍，每个模块都过了一遍，写了一份三页的检查报告，格式比大多数论文还工整。',
      '结论是：确实有数据处理问题，但核心方法是对的。结果是有效的，只是被高估了——就像一个真实成绩85分的人，因为算错了满分，误以为自己考了110。',
    ],
    prompt: '复查完毕，你怎么收尾？',
    // 链式事件：bound student 继承自 suspicious_results
    options: [
      {
        id: 'write_clean',
        text: '用真实结果老老实实写',
        outcomes: [{
          weight: 1,
          narrative: '最终论文用了真实数据，该是多少就是多少，一个数字都没有美化。审稿人说"实验设计完整，结果可信"——这是比夸结果漂亮更值得高兴的评价。{studentName}发来一条消息说"还好我们查了"，后面跟了一个捂脸表情，大概是在为差点做了什么捏一把汗。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 4 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
      {
        id: 'report_oversight',
        text: '在组内通报，引以为戒',
        outcomes: [{
          weight: 1,
          narrative: '你在组会上把整件事完整讲了一遍：哪里出了问题、为什么没有更早发现、下次该怎么防范。{studentName}有点不自在，但在别人开始提问的时候，解释得比你还清楚——讲一遍，学一遍，通报一遍，彻底学会了。',
          effects: [
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

  // ── 科研推进链：会议冲刺（单学生视角，≤2人适用）──────────────────────────
  // 含"全组"/"大家"的版本 → group_events.ts 的 group_conference_ddl（需 ≥3 人）

  conference_ddl: {
    id: 'conference_ddl',
    title: 'GRF截止日前三天',
    description: [
      '距GRF截止还有72小时。',
      '{studentName}盯着进度条，实验还没跑完，论文写了一半，红眼睛里全是咖啡因。',
      '接下来怎么冲，取决于你。',
    ],
    prompt: '最后冲刺，你的策略是？',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'lead_charge',
        text: '亲自带头冲（消耗精力）',
        energyCost: 35,
        outcomes: [
          {
            weight: 2,
            narrative: '你和{studentName}连轴三天，最后十分钟提交成功。{studentName}发来一串疯狂emoji，然后说"以后还想跟老师一起冲"。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 10 },
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
            nextEventIds: ['submission_result'],
          },
          {
            weight: 1,
            narrative: '三天没睡，实验结果不理想，勉强投出去了。{studentName}发来"老师辛苦了"，但你能感觉到对方也很疲惫。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -12 },
            ],
            nextEventIds: ['submission_result'],
          },
        ],
      },
      {
        id: 'delegate',
        text: '让{studentName}自己主导冲刺',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}没有等你，自己通宵把实验跑完，还顺手润色了abstract。你收到草稿时意外地惊喜——这篇基本是{studentName}独立完成的。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 8 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 4 },
            ],
            conditions: [{ type: 'anyStudent', stat: 'favor', op: '>=', value: 55 }],
            nextEventIds: ['submission_result'],
          },
          {
            weight: 1,
            narrative: '{studentName}口头答应，实际上忘记跑最后一组对比实验。最后仓促提交，质量堪忧。你没有批评，但心里记了一笔。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
              { type: 'randomStudent', stat: 'favor', delta: -5 },
            ],
            nextEventIds: ['submission_result'],
          },
        ],
      },
      {
        id: 'postpone',
        text: '这次不投了，改下次',
        outcomes: [{
          weight: 1,
          narrative: '你发消息告诉{studentName}这次先撤。过了十秒，回了"好的，那我把代码整理一下"。这句话在你意料之外——你本来以为会有一段艰难的说服过程——但{studentName}好像真的松了口气，"整理代码"在这里大概是一种说法，意思是终于可以睡觉了。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'randomStudent', stat: 'favor', delta: 2 },
            { type: 'lab', stat: 'reputation', delta: -2 },
          ],
        }],
      },
    ],
    tags: ['monthly'],
  },

  submission_result: {
    id: 'submission_result',
    title: '投稿结果出来了',
    description: [
      '几个月过去了，系统邮件终于来了。',
      '你屏住呼吸点开……',
    ],
    prompt: '结果出来了，你怎么面对{studentName}？',
    // 链式事件：bound student 继承自 conference_ddl
    options: [
      {
        id: 'celebrate_accept',
        text: '中了就庆祝，没中就分析',
        outcomes: [
          {
            weight: 2,
            narrative: '中了！{studentName}第一时间截图发朋友圈，还发了一串烟花表情包给你。你请{studentName}吃了顿好的，两人聊到很晚。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'randomStudent', stat: 'happiness', delta: 12 },
              { type: 'randomStudent', stat: 'favor', delta: 6 },
            ],
          },
          {
            weight: 1,
            narrative: 'Rejected。你把审稿意见整理好拿给{studentName}。{studentName}看完说"没关系，我们改"话语间透露着一股镇定。你忍不住多看了一眼，想确认这不是某种已经麻木的迹象，但眼神对上去，对方在认真地打开文档。好，那就改。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
        ],
      },
      {
        id: 'analyze_reviews',
        text: '不管结果，先逐条分析审稿意见',
        outcomes: [{
          weight: 1,
          narrative: '你和{studentName}认真读了每条审稿意见。接受了就改进，拒绝了就找方向。{studentName}说"我没想到审稿人还有这个顾虑"——这才是最有价值的部分。',
          effects: [
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

  // ── 科研推进链：国自然（实验室层面，无学生绑定）────────────────────────────

  grant_deadline: {
    id: 'grant_deadline',
    title: '国自然截止日将至',
    description: [
      '国自然青年基金申请书截止日还有一周。这是一份需要写五万字来证明你未来三年打算做什么的文件——用一种没有人真正喜欢写、但所有人都必须写的格式。',
      '你坐在电脑前，进度条还在第一章。这就是一位助理教授孤独面对的国家级任务：没有学生可以帮，没有师兄师姐可以问，只有截止日期以每秒一秒的速度逼近。',
    ],
    prompt: '距截止一周，你怎么应对？',
    options: [
      {
        id: 'write_hard',
        text: '全力以赴亲自写',
        energyCost: 40,
        outcomes: [
          {
            weight: 2,
            narrative: '熬了六天。你喝了多少咖啡你不记得了，你记得的是最后一天凌晨四点点击"提交"按钮时的那种虚脱感，像是刚跑完一场没有人围观的马拉松。申请书质量说得过去，精力耗尽，但至少交上去了。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 3 }],
            nextEventIds: ['grant_result'],
          },
          {
            weight: 1,
            narrative: '写了七天，越写越乱——第三章推翻了第一章的前提，第四章引用了一篇你还没读完的文献。最后凌晨硬提交了，但你自己都知道逻辑链是断的。下次一定要早两个月开始，这句话你已经说了三年了。',
            effects: [],
            nextEventIds: ['grant_result'],
          },
        ],
      },
      {
        id: 'hire_help',
        text: '找专业助理润色',
        fundingCost: 3,
        outcomes: [{
          weight: 1,
          narrative: '你找了一个有丰富申请书经验的科研助理。对方收到你的草稿，停顿了大约三秒——那种停顿里包含着专业人士对初稿的全部评估——然后回复说"我来整理"。五天后，一份结构清晰、措辞规范、格式完美的申请书出现在你邮箱里。你省了大概四十个小时，花了三万，感觉是一笔值得的交易。',
          effects: [{ type: 'lab', stat: 'energy', delta: 15 }],
          nextEventIds: ['grant_result'],
        }],
      },
      {
        id: 'skip_this_year',
        text: '今年先不投了',
        outcomes: [{
          weight: 1,
          narrative: '你关掉了申请书文档，长呼一口气。有同事问"今年投国自然吗"，你说"今年先缓一年"，对方点了点头，说了一句"有时候也好"。你把省下来的精力用来做实验，感觉自己第一次在截止日期前不焦虑了。',
          effects: [{ type: 'lab', stat: 'energy', delta: 30 }],
        }],
      },
    ],
    tags: ['monthly'],
  },

  grant_result: {
    id: 'grant_result',
    title: '国自然基金结果公布',
    description: [
      '项目管理平台多了一条未读消息。你看到那个红点的时候，停顿了大约三秒，才点开。',
      '这是那种你花了几个月准备、等了将近一年结果、却要在两秒钟之内接受的通知——体制之美，有时候就在于这种信息密度的反差。',
    ],
    prompt: '基金结果出来了，接下来？',
    // 经费事件：无学生绑定，用 allStudents 影响全组
    options: [
      {
        id: 'share_result',
        text: '把结果通报给实验室',
        outcomes: [
          {
            weight: 2,
            narrative: '中了。24万，已立项。你把消息发进组里，群里第一条回复是一个"！！！"，然后大家陆续发来各种庆祝。经费有了，压力小了一个级别，组里接下来两周的气氛都比平时松了不少。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 24 },
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '没中。你在组会上说了一句"这次国自然没过，明年再来"，然后直接进入下一个议题。有人轻轻把手里的笔换了个方向，然后大家抬起头重新看ppt，动作都很自然——老师没有崩溃，这就是信号，我们继续。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'plan_next',
        text: '默默规划下一步',
        outcomes: [{
          weight: 1,
          narrative: '你把结果存档，打开了一个新文档，标题是"明年申请计划"。中了就规划怎么用好这笔钱，没中就复盘哪里写得不够有说服力。科研是一场漫长的、不保证回报的投入，而你已经习惯了这种节奏。',
          effects: [{ type: 'lab', stat: 'energy', delta: 10 }],
        }],
      },
    ],
    tags: ['chain'],
  },

  // ── 时间锚定：第1年12月投稿 + 第2年2月审稿意见，由 monthlyUpdate 强制注入 ────
  // 安全：注入时绑定了 studentId，{studentName} 可安全使用

  first_paper_submission: {
    id: 'first_paper_submission',
    title: '点击最终提交',
    description: [
      '距离OWRC截止还剩四十分钟。论文上传成功，格式检测通过，作者列表确认，伦理声明勾选，利益冲突一栏填了"无"。屏幕上只剩最后那个橙色按钮：「最终提交」。',
      '{studentName}坐在旁边，盯着那个按钮，眼神像是在审视一枚即将引爆的装置。',
      '"老师，你觉得我们能中吗？"\n\n你想了三秒。OWRC是出了名的神秘，官方介绍只有一句"欢迎横跨领域的创新性工作"，实际上没有人能说清楚它到底收什么，但每届都有人中，就像摸奖，区别在于写论文比买彩票长了整整六个月。',
      '"理论上，任何人都有可能中。"你说。',
      '{studentName}认真点了点头，停顿了两秒，然后补了一句："那理论上，我们也有可能不中。"\n\n这句话逻辑无懈可击，你找不到反驳的角度。',
    ],
    prompt: '鼠标悬停在"最终提交"上',
    options: [
      {
        id: 'submit_clean',
        text: '闭眼点下去，不再回头',
        outcomes: [{
          weight: 1,
          narrative: '咔哒。系统弹出确认框，你再点一次。「稿件已成功提交OWRC。」屏幕继续亮着，什么都不会立刻改变，但这篇论文此刻正在向某个服务器飞去，里面装着你们半年的心血，以及一位素未谋面的审稿人对它命运的最终决定权。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 2 },
          ],
        }],
      },
      {
        id: 'final_check',
        text: '最后通读一遍',
        energyCost: 15,
        outcomes: [{
          weight: 1,
          narrative: '你花了半小时把全文读了一遍。发现了一处漏掉的引用、几个前后不一致的符号，然后改掉了。最终版在截止前两分钟提交。OWRC服务器大概正在处理几百份稿件，其中一份是你们的，悄悄夹在一堆"已解决AGI对齐"的投稿中间，等待命运。\n\n{studentName}说："老师你真的检查了吗，还是只是走了一遍流程？"你回以他一个踏实的眼神。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 3 },
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 2 },
          ],
        }],
      },
      {
        id: 'submit_celebrate',
        text: '投完立刻出去吃顿好的',
        fundingCost: 2,
        outcomes: [{
          weight: 1,
          narrative: '你点下去，然后直接站起来拿了外套。"走，咱们吃饭去。" {studentName}抓起手机跟上来，脸上那种"到底该不该高兴"的神情在门口终于变成了真正的笑。你们去了附近一家川菜馆，点了明显超过两个人饭量的菜。\n\n聊到一半，{studentName}说："老师，如果中了我们再来吃一次吧。"你说好。这算是一个以两顿饭为赌注的学术宣言。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 5 },
            { type: 'randomStudent', stat: 'favor', delta: 8 },
            { type: 'randomStudent', stat: 'skills.social', delta: 2 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  reviewer_two: {
    id: 'reviewer_two',
    title: '审稿人二号来了',
    description: [
      '两个月过去了。OWRC的审稿意见到了。',
      '审稿人一号好评，措辞友好，建议小修。三号中性，提了三个可选修改方向，语气像个没睡醒的人，但没有恶意。',
      '然后是审稿人二号。整整一页，第一条："这篇论文的核心假设存在根本性缺陷，作者似乎对该领域最近的工作一无所知。"',
      '你重新看了一眼作者列表，确认上面有你的名字。',
    ],
    prompt: '面对审稿人二号的炮火，你选择：',
    options: [
      {
        id: 'rebuttal_gracious',
        text: '光速滑跪，逐条回应',
        outcomes: [
          {
            weight: 2,
            narrative: '你写了一份措辞礼貌到近乎卑微的rebuttal，每条意见都认真回应，每个误解都耐心解释，甚至感谢了审稿人的"宝贵意见"。审稿人二号最终说"作者的回应解释了大部分问题"，给了个弱接受。你和{studentName}在群里发了个熟练工式的庆祝表情，然后继续改论文。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你写了rebuttal，逐条回应，有理有据，态度诚恳。审稿人二号看都没看，维持原分，直接拒了。这种事在学术界有个公认的解释，叫"运气不好"。改完换个会吧，换个运气。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'rebuttal_strong',
        text: '重拳出击，指出误解',
        outcomes: [
          {
            weight: 1,
            narrative: '你引用了六篇文献，用两页纸条理清晰地证明审稿人的理解是错的。对方沉默了——大概是去查了文献，确认自己看错了。论文最终过了。组里有人说你"打架很厉害"，你没有否认。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
          {
            weight: 2,
            narrative: '你的rebuttal语气稍微硬了一点。审稿人二号把它理解为"挑衅"，随即补充了三条新意见，每一条都比上一条更刁钻，像是在进行一场个人恩怨的延续。论文被拒。{studentName}发来消息问"老师，我们是不是认识了什么仇人？"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'ignore_and_resubmit',
        text: '不想争，改完换个会投',
        outcomes: [{
          weight: 1,
          narrative: '你决定不在这个人身上浪费情感资源。有用的意见吸收，剩下的归入你硬盘里那个名叫"审稿人问题"的文件夹——这个文件夹已经有七个子文件夹了。改完换个会，换个心情，换个运气。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 10 },
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

  // ── 时间锚定：第2年8月，由 monthlyUpdate 强制注入 ─────────────────────────

  lab_birthday: {
    id: 'lab_birthday',
    title: '实验室成立一周年',
    description: [
      '早上打开实验室门的时候，你发现白板角落多了一行字：「实验室一周年快乐。」字写得不大，旁边还画了一个歪歪扭扭的小蛋糕。没有彩带，没有气球，没有热闹的合照——毕竟实验室现在只有你和{studentName}。',
      '你站在门口看了一会儿，才意识到真的已经一年了。去年八月，这里还是几张没拆封的桌子、一块空白白板和一个看起来像临时仓库的办公室。现在桌上有论文草稿、项目计划、没洗的杯子、贴歪的便利贴，还有{studentName}留下的各种生活痕迹。',
      '{studentName}今天来得比平时早，正在假装认真看屏幕，但你注意到对方已经往白板那里看了三次。你问是不是写了什么。{studentName}立刻移开目光，说：「没有啊，可能是白板自己长出来的。」',
      '中午的时候，你们翻出了实验室第一天的照片。照片里的房间空得离谱，白板干净得像从未经历过Reviewer二号。{studentName}看了半天，忽然说：「这一年居然真的把这里填满了。」',
      '房间里还是只有两个人，但不知道为什么，看起来已经不像刚开始那么空了。',
    ],
    prompt: '一周年，你打算：',
    options: [
      {
        id: 'party',
        text: '出去吃一顿，算老师请客',
        fundingCost: 2,
        outcomes: [{
          weight: 1,
          narrative: '你们找了家小店，点了明显超过两个人饭量的菜。{studentName}一开始说吃不完，后来吃得很认真。聊到这一年最离谱的瞬间，你们各自提名了三个，最后一致同意：能活到现在本身就值得庆祝。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 10 },
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
      {
        id: 'milestone_review',
        text: '认真聊聊这一年，定下新目标',
        energyCost: 10,
        outcomes: [{
          weight: 1,
          narrative: '你们在白板前逐字写下这一年做过的事。起初只有几条，后来越写越多，连失败项目和离谱事故都被算了进去。{studentName}看着写满的白板，感慨说：「原来我们真的做了挺多。」你在旁边又画了一个圈，写下：第二年。',
          effects: [
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
            { type: 'randomStudent', stat: 'happiness', delta: 5 },
          ],
        }],
      },
      {
        id: 'keep_working',
        text: '该干嘛干嘛，科研不等人',
        outcomes: [{
          weight: 1,
          narrative: '你决定继续工作。下午实验室很安静，只有键盘声和空调声。快走的时候，你发现白板上的小蛋糕旁边多了一行字：「实验室一岁了，但导师好像没空。」下面还画了一个很小的叹气表情。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: -3 },
            { type: 'randomStudent', stat: 'happiness', delta: -8 },
            { type: 'lab', stat: 'energy', delta: 10 },

          ],

        }],

      },

    ],

    tags: ['mainline'],

  },

};
