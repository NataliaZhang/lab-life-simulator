/**
 * 属性触发事件 — 学生或实验室属性越过阈值时触发
 *
 * 触发机制：所有事件放入 monthlyEventPool，每月由 filterTriggerable
 * 检查 triggerConditions，条件不满足则从当月候选池中移除。
 * filterTriggerable 会将满足所有 anyStudent 条件的学生绑定到 QueuedEvent.studentId。
 *
 * 心情低落触发的六档事件（按好感度分区，严重程度递减）：
 *   favor < 10            → transfer_risk   (转组风险)
 *   favor 10–30           → favor_complaint (背后抱怨)
 *   favor 30–50           → student_sick    (身体预警)
 *   favor 50–70           → research_block  (研究瓶颈)
 *   favor 70–90           → peer_left       (同伴离开)
 *   favor > 90            → late_night_doubt (深夜自我怀疑)
 *
 * 实验室属性触发：
 *   reputation >= 30      → collaboration_offer (合作邀请)
 */

import type { GameEvent } from '../../types';

export const conditionalEvents: Record<string, GameEvent> = {

    transfer_risk: {
    id: 'transfer_risk',
    title: '{studentName}的转组申请已经写好了',
    description: [
      '你收到一条系统提醒：{studentName}预约了隔壁实验室导师的见面时间。',
      '你点开学生主页，发现简介悄悄改成了："Exploring new opportunities."',
      '更糟的是，转组申请表已经填完了，只差最后一个提交按钮。保存时间显示：三分钟前。',
    ],
    prompt: '坏了。你准备怎么把人拉回来？',
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '<', value: 10 },
    ],
    options: [
      {
        id: 'retain_with_raise',
        text: '提高待遇挽留（花2万）',
        fundingCost: 2,
        outcomes: [
          {
            weight: 2,
            narrative: '你火速约谈，并把补贴提高了一档。{studentName}看着咖啡杯沉默很久，最后说："我再想想。" 三天后，转组申请被删除。你看着回收站里的文件，产生了一种拆弹成功的庆幸。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 12 },
              { type: 'randomStudent', stat: 'happiness', delta: 12 },
            ],
          },
          {
            weight: 1,
            narrative: '你加了钱，态度诚恳，甚至连语气都很像招生广告。但{studentName}还是走了。有些裂缝不是补贴能补上的。你第一次意识到，学生不是项目资源，是会自己按提交按钮的人。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -3 },
              { type: 'leaveStudent' },
            ],
            nextEventIds: ['student_left_lab'],
          },
        ],
      },
      {
        id: 'honest_conversation',
        text: '立刻谈一次（消耗20精力）',
        energyCost: 20,
        outcomes: [
          {
            weight: 2,
            narrative: '你们聊了两个小时。{studentName}把憋了很久的话全倒出来，从组会压力讲到消息已读，从项目方向讲到"我是不是不适合这里"。最后对方把转组申请删了，说："我想再试一次。"你没有完全解决问题，但至少把人从提交按钮前拽回来了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 15 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你们谈完后，双方都更清楚了。清楚到足以确认，这段合作确实不适合继续。{studentName}离开得很体面，甚至临走前还帮你关了办公室灯。你更难受了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'leaveStudent' },
            ],
            nextEventIds: ['student_left_lab'],
          },
        ],
      },
      {
        id: 'let_go',
        text: '尊重选择，放行',
        outcomes: [{
          weight: 1,
          narrative: '你回复说理解并支持。{studentName}很快提交了申请。几个月后，你在会议上看到对方的poster，做得还不错。你站在远处看了一会儿，没有过去打扰。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: -2 },
            { type: 'leaveStudent' },
          ],
          nextEventIds: ['student_left_lab'],
        }],
      },
    ],
    tags: ['conditional'],
  },

  favor_complaint: {
    id: 'favor_complaint',
    title: '匿名吐槽贴爆了',
    description: [
      '论坛热帖：《导师第七次说下周处理》。',
      '浏览量17843，点赞3271，评论842。',
      '你本来只是觉得有点眼熟，直到看到那句："老师最爱说我晚上看看。" 全校只有一个人会这么说。坏了，是你。',
      '评论区已经开始团建："我导师也是。" "楼主我们是不是一个组的？" "建议整理成导师语录数据集。"',
    ],
    prompt: '这场舆情危机正在离谱扩散，你选择：',
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '<=', value: 30 },
    ],
    options: [
      {
        id: 'talk_privately',
        text: '约{studentName}吃饭，假装没看见帖子',
        outcomes: [
          {
            weight: 2,
            narrative: '你请{studentName}吃饭，没提帖子，只问最近是不是过得不太好。对方一开始很警惕，后来终于绷不住了："老师，我发完就后悔了。""那为什么没删？""因为评论太好笑了。"危机没有彻底解除，但至少你们一起笑了一下。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你们聊完后，误解解开了一半。另一半还挂在论坛首页，标题旁边有个红色"热"。至少{studentName}知道你不是完全没看见他。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 2 },
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'adjust_management',
        text: '立刻调整管理方式',
        outcomes: [{
          weight: 1,
          narrative: '你开始把"下周处理"替换成具体日期，把"晚上看看"替换成"周四下午三点前回复"。组里震惊了。{studentName}甚至在群里发了个"？"。一个月后，论坛帖子沉了下去，实验室里多了一点难得的空气流通感。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 8 },
            { type: 'allStudents', stat: 'happiness', delta: 6 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
      {
        id: 'ignore_it',
        text: '装作没看见',
        outcomes: [{
          weight: 1,
          narrative: '你决定冷处理。三天后，帖子被做成表情包，标题是《导师时间单位换算表》。"很快"约等于11.3天，"下周"约等于一个月。你甚至在学院群里看到了截图。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: -6 },
            { type: 'lab', stat: 'reputation', delta: -4 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

  student_sick: {
    id: 'student_sick',
    title: '校医院打电话来了',
    description: [
      '下午两点，你接到一个陌生电话。',
      '校医院护士问："请问是{studentName}导师吗？"',
      '你心里咯噔一下。对方解释：学生连续熬夜，实验做到一半直接趴在桌上睡过去，怎么叫都没反应。现在没大碍，但医嘱是——暂停科研活动。',
      '你第一次听见"暂停科研活动"被当成医学建议。',
    ],
    prompt: '{studentName}已经被身体强制关机，你怎么处理？',
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 30 },
      { type: 'anyStudent', stat: 'favor', op: '<=', value: 50 },
    ],
    options: [
      {
        id: 'medical_subsidy',
        text: '报销检查和营养费（花2万）',
        fundingCost: 2,
        outcomes: [{
          weight: 1,
          narrative: '你把费用报了，还发消息说："这几天别来实验室，真的别来。" {studentName}确认了三遍"真的可以吗"。第三天晚上，对方偷偷出现在实验室门口，手里拎着奶茶，说："老师，休息确实有用，我醒来想到bug在哪了。"你差点当场把人押回宿舍。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 10 },
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
          ],
        }],
      },
      {
        id: 'force_rest',
        text: '强制放假三天',
        outcomes: [{
          weight: 1,
          narrative: '你宣布{studentName}本周禁止出现在实验室。对方试图用"我就远程看一下"反抗，被你驳回。三天后，{studentName}回来时眼神清澈得像刚重装过系统。实验室全体成员短暂见证了睡眠的力量。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
          ],
        }],
      },
      {
        id: 'continue_work',
        text: '让在家线上跟进进度',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}在身体发出红色警报的情况下继续开会、回消息、同步进度。当天晚上，对方发来一句："老师，我觉得我可能快进化成怨灵了。"你似乎做了一个非常糟糕的管理决策。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: -12 },
            { type: 'randomStudent', stat: 'favor', delta: -15 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

  research_block: {
    id: 'research_block',
    title: '项目文件夹改名了',
    description: [
      '你打开共享目录，发现{studentName}的项目文件夹名字变成了：',
      'final_final_final_abandon_this_project',
      '第二天：really_abandon_this_project',
      '第三天：this_project_has_won',
      '第四天：please_help',
      '文件夹的命名风格已经比组会汇报更诚实了。',
    ],
    prompt: '{studentName}的研究状态明显不对，你选择：',
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 50 },
      { type: 'anyStudent', stat: 'favor', op: '<=', value: 70 },
    ],
    options: [
      {
        id: 'break_it_down',
        text: '一起把问题拆小',
        outcomes: [{
          weight: 1,
          narrative: '你们在白板上花了两个小时，把"整个项目没救了"拆成了九个具体问题。其中六个只是情绪幻觉，两个能绕开，一个确实很难。{studentName}把文件夹改名成 project_v2。虽然听起来还是不太靠谱，但至少它不再求救了。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 14 },
            { type: 'randomStudent', stat: 'favor', delta: 6 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
            { type: 'lab', stat: 'energy', delta: -10 },
          ],
        }],
      },
      {
        id: 'change_angle',
        text: '临时换个角度，别硬撞墙',
        outcomes: [{
          weight: 1,
          narrative: '你建议暂时不要继续撞同一堵墙，先做一个能跑的小版本。{studentName}半信半疑地试了两天，第三天发来截图：baseline终于动了。文件夹被改名成 maybe_alive。你觉得这个名字已经非常乐观。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
          ],
        }],
      },
      {
        id: 'push_through',
        text: '告诉他继续推',
        outcomes: [
          {
            weight: 2,
            narrative: '你说卡住很正常，让{studentName}再坚持一下。对方确实继续推了，文件夹名也确实稳定了下来，现在叫 suffer_but_continue。不能说完全健康，但至少努力的方向没错。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你说继续推。第二天，文件夹名变成了 this_is_not_a_project_anymore。你忽然意识到，"继续"有时候不是鼓励，是把人往墙上再推一次。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -6 },
              { type: 'randomStudent', stat: 'favor', delta: -4 },
            ],
          },
        ],
      },
    ],
    tags: ['conditional'],
  },

  peer_left: {
    id: 'peer_left',
    title: '{studentName}的浏览器标签页',
    description: [
      '你借用了一下{studentName}的电脑，准备看实验结果。',
      '浏览器最上面一排标签页依次是：',
      '《读博值得吗》',
      '《转行成功经验》',
      '《公务员考试时间》',
      '《35岁转行来得及吗》',
      '《养羊创业指南》',
      '《羊驼养殖利润》',
      '你和{studentName}同时沉默。空气里弥漫着一种事情已经发展到羊驼阶段的气息。',
    ],
    prompt: '{studentName}明显在重新评估人生路线，你怎么救？',
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 70 },
      { type: 'anyStudent', stat: 'favor', op: '<=', value: 90 },
    ],
    options: [
      {
        id: 'talk_future',
        text: '认真聊聊未来，不嘲笑羊驼',
        outcomes: [{
          weight: 1,
          narrative: '你们聊了很久，从科研聊到毕业，从毕业聊到生活，最后甚至认真讨论了羊驼养殖的前期投入。{studentName}自己说着说着也笑了。谈完之后，那些标签页还在，但最前面多了一个新的：《论文投稿模板》。危机暂时解除。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'randomStudent', stat: 'favor', delta: 10 },
          ],
        }],
      },
      {
        id: 'share_your_crisis',
        text: '分享你自己当年想跑路的经历',
        outcomes: [{
          weight: 1,
          narrative: '你讲了自己读博时差点跑路的经历。{studentName}听得很专注，尤其是听到你也搜过"转行"的时候，眼睛明显亮了一下。原来导师也不是从出生起就会写proposal。这个发现让对方松了一口气。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 5 },
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
          ],
        }],
      },
      {
        id: 'dismiss_it',
        text: '说这些只是情绪化搜索，不用当真',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}点点头，关掉了标签页。你以为事情结束了。第二天，浏览器推荐开始推送"低成本开农场"和"读博退路规划"。算法记住了这场危机，比你记得更牢。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: -6 },
            { type: 'randomStudent', stat: 'favor', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

  late_night_doubt: {
    id: 'late_night_doubt',
    title: '凌晨三点的二十七条消息',
    description: [
      '凌晨3:14，你手机响了。',
      '3:15，又响了。',
      '3:17，还是同一个人。',
      '等你睁眼时，{studentName}已经发来27条未读。',
      '内容包括："老师我是不是不适合科研"、"我是不是适合卖烤冷面"、"如果我开店你会投资吗"、"Reviewer #2是不是说得有道理"、"算了Reviewer #2肯定不懂"、"我刚刚想明白了"、"不对我又没想明白"。',
      '最后一条是："老师你睡了吗？"',
      '发送时间：3:16。',
    ],
    prompt: '你看着二十七条消息，决定：',
    triggerConditions: [
      { type: 'anyStudent', stat: 'happiness', op: '<', value: 10 },
      { type: 'anyStudent', stat: 'favor', op: '>', value: 90 },
    ],
    options: [
      {
        id: 'reply_awake',
        text: '回复："没睡。"',
        outcomes: [{
          weight: 1,
          narrative: '其实你刚刚睡得很香。但导师有时候需要说谎。你陪{studentName}把二十七条消息逐条捡回来，最后只剩下三个问题：睡觉、吃饭、明天再看。不久后，对方发来："谢谢老师，我去睡了。"第二天中午，{studentName}终于出现在实验室，像一台重启成功但还有点发热的机器。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
          ],
        }],
      },
      {
        id: 'voice_call',
        text: '直接打电话过去',
        outcomes: [{
          weight: 1,
          narrative: '电话接通后，{studentName}第一句是："老师我是不是打扰你睡觉了。"你说："你都发二十七条了，现在问这个已经晚了。"对方在电话那头笑了一下。笑出来就好办了。半小时后，危机从"人生完了"降级成"今晚先睡"。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
          ],
        }],
      },
      {
        id: 'reply_morning',
        text: '明早再回',
        outcomes: [
          {
            weight: 2,
            narrative: '早上你认真回了一大段。{studentName}说："老师，我昨晚有点发疯，抱歉。"事情勉强过去了，但你知道，凌晨三点的问题不会因为太阳升起就自动消失。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你早上才回。聊天框里最后一条停在凌晨4:02："算了，没事。"这句话非常有事。你盯着屏幕，意识到自己错过了一个重要的时间点。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
              { type: 'randomStudent', stat: 'favor', delta: -6 },
            ],
          },
        ],
      },
    ],
    tags: ['conditional'],
  },

  // ── 心情归零强制离组（由 monthlyUpdate 注入，无需玩家选择）────────────────
  // 只有一个选项，玩家无法做出不同决定；结果是固定的。

  student_crisis_departure: {
    id: 'student_crisis_departure',
    title: '{studentName}不辞而别',
    description: [
      '那天早上实验室开门，{studentName}的工位已经空了。椅子规规矩矩地推进去，桌面干净得像从来没有人坐过。',
      '你打了电话，没有接。发了消息，已读不回。后来辗转听说对方已经离开了这座城市。',
      '你后来想，也许早就应该看到一些迹象的：那些夜里没回的消息、越来越简短的汇报、某次组会结束后独自站在走廊很久。但那些迹象和太多别的事混在一起，实在不好分辨。',
    ],
    options: [
      {
        id: 'crisis_departure_ack',
        text: '（TA已经离开了）',
        outcomes: [
          {
            weight: 1,
            narrative: '之后很长一段时间，你经过那个工位都会愣一下。空椅子不会说话，但会让你记住一件事：有些问题，错过了那个时间点，就再也没有机会了。',
            effects: [
              { type: 'leaveStudent' },
              { type: 'lab', stat: 'reputation', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
            nextEventIds: ['student_left_lab'],
          },
        ],
      },
    ],
    tags: ['conditional'],
  },

  // ── 实验室属性触发 ────────────────────────────────────────────────────────

  collaboration_offer: {
    id: 'collaboration_offer',
    title: '有人来谈合作了',
    description: [
      '你收到了一封邮件，署名是某知名实验室的教授——那种在领域里光靠姓名就能结束一半争论的级别——说看了你最近的工作，有意向合作联合培养。',
      '邮件写得很短，短到有一种"我不需要多解释，你懂的"的从容感。你读了三遍，确认这不是垃圾邮件。',
    ],
    prompt: '合作邀请来了，你怎么回应？',
    triggerConditions: [{ type: 'lab', stat: 'reputation', op: '>=', value: 30 }],
    options: [
      {
        id: 'accept_collaboration',
        text: '接受合作，推进正式协议',
        outcomes: [
          {
            weight: 2,
            narrative: '合作协议签了。有一位学生被选为联合培养，去对方实验室待了半年，回来的时候眼界宽了一圈，技能涨了不止一圈。你的名字开始和一个比你更响的名字出现在同一篇论文里，这种搭便车，心安理得。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 8 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '合作协议签了，执行起来才发现两边的研究风格差异相当大，对方喜欢高度结构化，你们习惯灵活迭代。光协调这件事就消耗了大量精力。声望涨了一点，但你连续两周失眠，觉得自己在用健康换履历。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'negotiate_terms',
        text: '先谈清楚条件再决定',
        outcomes: [{
          weight: 1,
          narrative: '你要求明确了资源分配、学生署名权、成果归属等每一个细节。对方的助理助理发了七封邮件，花了一个月，谈判最终达成了一份双方都能接受的协议。谨慎的人运气不一定更好，但后悔的概率要低得多。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 5 },
            { type: 'lab', stat: 'energy', delta: -10 },
          ],
        }],
      },
      {
        id: 'decline_politely',
        text: '礼貌拒绝，专注自己方向',
        outcomes: [{
          weight: 1,
          narrative: '你礼貌地回复说时机不对，目前组里有几件重要的事要专注完成。对方回复说"理解，保持联系"。你把邮件存档，继续自己的节奏。组里的氛围因为少了外部压力而出人意料地放松了一些。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

  pi_third_burnout: {
    id: 'pi_third_burnout',
    title: '第三次倒下',
    description: [
      '办公室地板在你的视野里旋转，这是你第三次以这个视角欣赏它了。',
      '你没意识到自己倒下的那一刻——只知道上一秒还在盯着一个跑了三天仍未收敛的实验，下一秒便是天花板。精力：0/100。',
      '门缝里挤进来一个脑袋。{studentName}先是愣了半秒，然后以一种急救培训录像的标准姿势冲过来，一套拍肩膀、探呼吸、摸脉搏的流程，见你有反应，才把你从地板上扶起来。',
      '"老师……你、你这已经是第三次了。""哪有。"你虚弱地否认。',
      '"我数过的。"{studentName}不留情面地把记录截图亮给你看，上面有时间戳。',
      '{studentName}塞给你一瓶热水，你喝了两口，感觉灵魂渐渐回到了躯壳。',
    ],
    options: [
      {
        id: 'accept_help',
        text: '……谢了',
        outcomes: [{
          weight: 1,
          narrative: '你接过热水，把它喝完。{studentName}坐在旁边没敢立刻离开，大概是怕你再次倒地时无人目击。热水确实有点用，你感觉稍微活了回来。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 15 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
          ],
        }],
      },
      {
        id: 'deny_everything',
        text: '我只是在思考，不是倒下',
        outcomes: [{
          weight: 1,
          narrative: '"哦。"{studentName}把热水放在你够得到的地方，默默退出去了。你试图用"这是一种创新的卧式思考姿势"来说服自己，成功率约为零。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 10 },
          ],
        }],
      },
    ],
    triggerConditions: [
      { type: 'lab', stat: 'energyDepletedCount', op: '>=', value: 3 },
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
    ],
    tags: ['conditional'],
  },

  pi_fifth_burnout: {
    id: 'pi_fifth_burnout',
    title: '第五次倒下',
    description: [
      '这次你是在走廊里倒下的。{studentName}路过，差点踩到你。',
      '"老师你怎么又——"{studentName}把话咽了回去，立即颤抖着开始拨打校医室电话。',
      '校医来了，检查了一遍，语气严肃得像在朗读教科书："长期精力透支、睡眠不足、应激激素水平偏高。建议休养。如不改变，后续可能出现记忆力下降、判断力受损，乃至更严重的后果。"',
      '"严重是多严重？"你问。校医顿了一顿。"比你想的更严重。"',
      '这是目前你收到过的最含蓄的警告。你躺着盯着天花板，第一次真正开始害怕：如果自己继续这样下去，这个实验室会发生什么。',
    ],
    options: [
      {
        id: 'take_it_seriously',
        text: '认真考虑调整节奏',
        outcomes: [{
          weight: 1,
          narrative: '你说你需要认真想想。{studentName}点头，帮你把办公室的灯调暗了一档。这是{studentName}能做的，剩下的，得靠你自己了。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 15 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
            { type: 'randomStudent', stat: 'happiness', delta: -10 },
          ],
        }],
      },
      {
        id: 'push_through_anyway',
        text: '项目要紧，等这阵子过了就好',
        outcomes: [{
          weight: 1,
          narrative: '类似的说辞，你已经重复了太多次。{studentName}没有反驳，但离开时顺手把你的咖啡杯拿走了。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 5 },
            { type: 'randomStudent', stat: 'happiness', delta: -15 },
          ],
        }],
      },
    ],
    triggerConditions: [
      { type: 'lab', stat: 'energyDepletedCount', op: '>=', value: 5 },
      { type: 'seenEvent', eventId: 'pi_third_burnout' },
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
    ],
    tags: ['conditional'],
  },

};
