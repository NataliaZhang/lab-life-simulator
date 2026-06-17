/**
 * 行政官僚事件（日常）+ 晚期/声望门控事件
 *
 * Section 1: 日常行政折磨（tags: ['daily']）
 * Section 2: 晚期/声望解锁事件（tags: ['late_game']）
 */

import type { GameEvent } from '../../types';



export const bureaucracyEvents: Record<string, GameEvent> = {

  // ════════════════════════════════════════════════════════════════════
  // SECTION 1: 行政官僚事件（日常）
  // ════════════════════════════════════════════════════════════════════

  bureau_template_apocalypse: {
    id: 'bureau_template_apocalypse',
    title: '模板更新了',
    description: [
      '距离截稿还有48小时，大会官网悄悄发布了一条公告：论文模板已更新，新版页边距调整，字体行距微调，"请所有作者使用最新版本提交"。你把新模板打开，把论文拖进去。9页变成了10.3页。',
      '问题不在于0.3页，问题在于这0.3页散布在23张图里，每一张都需要重新调整尺寸、重新对齐、重新检查分辨率。你数了一下，这大约等于把整篇论文的图表部分再做一遍。',
    ],
    prompt: '截稿前48小时，模板变了，你选择：',
    options: [
      {
        id: 'reformat_marathon',
        text: '通宵重新排版（消耗精力）',
        energyCost: 30,
        outcomes: [
          {
            weight: 2,
            narrative: '你打开Overleaf，灌了两杯咖啡，开始逐张调图。到凌晨四点，23张图全部处理完毕，论文精确落在9.97页，在要求的10页内，格式完全合规，页边距误差在0.01mm以内。提交成功。你把电脑关上，心想：学术界有一种苦是专门为排版设计的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你通宵排版，图表调了一遍又一遍，到第18张的时候不小心把参考文献的字号改成了8pt，提交前五分钟才发现。临时改回来，格式崩了，重新编译，倒计时归零。截稿超出了四十秒。系统不接受。你盯着那个错误页面，脑子里有什么东西悄悄断开了——然后你非常冷静地开始找AC的邮箱地址，逻辑完整，手没抖。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -3 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'submit_as_is',
        text: '用旧模板直接投，赌审稿人不在意',
        outcomes: [
          {
            weight: 1,
            narrative: '你用旧模板提交了，在备注栏写了"模板更新时间距截稿不足48小时，特此说明"，语气不卑不亢，逻辑无懈可击。大会官方没有任何回应。论文进了审稿流程。你至今不知道有没有人注意到那0.3页。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '论文因格式不符被desk reject，通知邮件发在截稿后三小时，措辞简洁：格式要求参见官网最新模板。你想反驳，但大会的邮件是no-reply地址。这份愤怒无处投递，最终只能存档在那个已经有七个子文件夹的"审稿人问题"文件夹里，再新建一个叫"行政问题"的子文件夹。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -4 },
              { type: 'allStudents', stat: 'happiness', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'request_extension',
        text: '向大会申请延期',
        outcomes: [
          {
            weight: 1,
            narrative: '你给组委会发了一封言辞有理有据的申请邮件，说明模板更新时间线不合理，请求48小时延期。收到了自动回复：您的邮件已收到，工作人员将在5-7个工作日内回复。截稿在明天。你把论文关掉，开始重新排版。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  bureau_submission_portal_dies: {
    id: 'bureau_submission_portal_dies',
    title: '投稿系统崩了',
    description: [
      '11:45pm。截稿是午夜。论文已经准备好了，你打开投稿系统，页面转了大概三秒，然后显示了一个HTTP 503。你刷新。503。再刷新。503。官方Twitter上有条三分钟前发的推文："We are aware of the issue and working to resolve it."',
      '你打开学术推特，发现一千四百个人正在经历同样的事，其中有一位大佬用了全大写，还有人在实时更新刷新次数。这是一种奇特的集体行动：所有人同时、单独地、无效地刷新着同一个页面。',
    ],
    prompt: '投稿系统崩了，还有十五分钟，你：',
    options: [
      {
        id: 'keep_refreshing',
        text: '死守刷新，等它活过来',
        outcomes: [
          {
            weight: 2,
            narrative: '11:58pm，页面突然活了。你以从未有过的速度完成上传、填写信息、确认提交，在11:59:47收到确认邮件。你放下鼠标，手有点抖——不是紧张，是这十三分钟之后的生理后遗症。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '系统在午夜前三分钟恢复了，但你因为长时间刷新导致浏览器缓存出问题，上传时文件校验失败，重新上传时超时。截稿。你在Twitter上看到有人成功提交的庆祝，感到了一种深入骨髓的孤独。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'happiness', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'contact_chairs',
        text: '给Program Chair发邮件求助',
        outcomes: [
          {
            weight: 1,
            narrative: '你给PC chair发了邮件，说明论文已准备好，系统崩溃导致无法提交，附上了论文PDF。回复在两天后到达："感谢您的反馈，本次提交系统故障已记录在案，受影响的投稿请于24小时内重新提交。" 你把论文重新提交了，感觉整件事就像是和一堵墙进行了一次有效的对话。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了邮件，没有收到回复。系统恢复后你补提交了，但提交记录显示的时间戳是00:07，超过了午夜截止。你至今不知道这篇论文有没有进入审稿流程，因为后来收到的拒稿通知里没有任何线索，也许是被拒了，也许是因为超时被直接丢弃，这个问题永远没有答案了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'go_to_sleep',
        text: '去睡觉，早上六点再试',
        outcomes: [
          {
            weight: 2,
            narrative: '你关掉电脑，心想反正崩溃不是你的问题，通常这种情况大会都会延期。早上六点，系统已恢复，并且大会官方宣布截止延长至当天正午。你在所有同行还在论坛里互相问"你能提交了吗"的时候，不动声色地提交了论文，甚至来得及检查了一遍参考文献。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 10 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '系统在凌晨三点恢复，没有延期通知。你早上六点打开电脑，看到一封邮件：投稿已于00:00关闭，本轮不再接受提交。你喝了第一口咖啡，心里有什么东西安静地碎掉了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -4 },
              { type: 'allStudents', stat: 'happiness', delta: -12 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  bureau_ethics_review_ml: {
    id: 'bureau_ethics_review_ml',
    title: '伦理审查来了',
    description: [
      '你收到系统邮件：您的论文《基于梯度下降的优化策略研究》已被标记，需要在提交前完成伦理影响评估。所需材料包括：一份不少于3000字的伦理影响说明、两封参考人推荐信、以及伦理委员会的书面审批，审批周期6至8周。',
      '这篇论文研究的是梯度下降的收敛性质。它不涉及人类受试者，不涉及数据采集，不涉及任何可以被施加于真实个体的行为，它甚至不涉及任何具体的应用场景，它只是在研究一个数学算法。你重新读了一遍伦理审查的触发标准，发现关键词是"人工智能"。',
    ],
    prompt: '纯理论ML论文触发了伦理审查，你决定：',
    options: [
      {
        id: 'complete_process',
        text: '认真完成全套材料（消耗精力）',
        energyCost: 25,
        outcomes: [
          {
            weight: 2,
            narrative: '你花了两周写完3000字伦理说明，措辞严谨，逻辑无懈可击，每一段都引用了相关政策条文。两封推荐信请到了，伦理委员会批了——只用了五周，快于预期。论文顺利进入投稿流程。你把这份3000字的声明存档，心想也许将来还会用到，但希望永远不会。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '六周后，伦理委员会反馈：说明材料中"潜在社会影响"一节不够详尽，需要补充"对就业市场的具体量化分析"。这是一篇关于梯度下降收敛速度的论文。你补充了这一节，又等了三周。会议截稿已经过了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'push_back',
        text: '向委员会提出申诉，要求解释触发理由',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封详细的申诉信，逐点说明本研究不触及任何伦理审查标准，并附上了委员会官方触发条件的原文，用红字标注了本研究不符合的每一条。委员会回复：已将您的申诉转交相关部门处理，预计4至6周内给予答复。你在等待期间把论文投到了一个没有这个审查要求的会议。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 1 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你的申诉被驳回，理由是："触发机制为自动系统生成，不受人工干预。" 你把这句话截图，发给了三个同行，他们每个人的回复都不一样：一个发了个旋转表情，一个回了"……"，一个发来了一篇2019年的论文说"我之前也遇到过这个"。论文最终换了个会投出去，没有任何问题。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'philosophical_statement',
        text: '写一份3000字、技术合规但哲学上开始螺旋的声明',
        outcomes: [
          {
            weight: 2,
            narrative: '你写了一份完全合规的3000字声明。第一节讨论梯度下降的历史起源，第二节探讨优化算法与人类认知偏差的关系，第三节引入了一段关于"收敛"在存在主义语境下的讨论，第四节回到技术层面，以一种不动声色的方式描述了为什么这篇论文对人类毫无威胁。委员会批了，回复只有一行字：材料完整，审核通过。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '委员会在"潜在影响"一节发现你引用了一段尼采，要求你澄清"与本研究的直接关联性"。你回复说那是一个关于梯度和意志的隐喻。对方消失了十天，然后批准了，附言是："建议未来声明保持学术风格。" 你把这封邮件存进了一个名叫"值得纪念"的文件夹。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  bureau_meeting_email: {
    id: 'bureau_meeting_email',
    title: '强制参加系里例会',
    description: [
      '邮件到了：系里将于今天下午两点召开2.5小时全体教职例会，议程为"综合汇报及其他事项"，请全体教职人员准时出席，原则上不得请假。发件时间：今天上午11:30。距离会议开始还有三十分钟。',
      '你看了眼今天的日历：下午原本安排了三个番茄钟专注写作、一次学生论文审阅、以及一个可能推进一年以来关键瓶颈的思考时段。现在这些都要让位于"综合汇报及其他事项"。',
    ],
    prompt: '2.5小时的"综合汇报及其他事项"，你决定：',
    options: [
      {
        id: 'attend_laptop',
        text: '去，但带电脑"做记录"',
        outcomes: [
          {
            weight: 2,
            narrative: '你坐在后排，电脑打开，表情专注——你确实在做记录，只是记录的是自己的论文草稿。中途回答了一个关于实验室安全规范的问题，显得参与度很高。会议结束，你完成了论文的两个小节，甚至比在办公室写得更专心，大概是因为没有人来敲门。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '第四十分钟，系主任点名让你就"实验室科研产出规范"发表意见，而你正在改一个图的配色。你抬头，看了一眼PPT，即兴说了三句话，逻辑基本连贯。会后有同事走过来问你"你刚才那个观点是认真的吗"，你说"是的"，没有继续解释。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'attend_fully',
        text: '全程认真参加（消耗精力）',
        energyCost: 20,
        outcomes: [
          {
            weight: 1,
            narrative: '你全程认真听，做了笔记，参与了讨论，在"其他事项"环节提出了三条具体建议。系主任对其中一条当场表示采纳。散会后你发现，会上随口提到的一个新申报项目的方向，跟你接下来的研究计划高度重合，这个信息值那两个半小时。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你认真参加了全程两个半小时，其中有效信息密度约等于一封五分钟可以读完的邮件。散会时你站起来，感到一种无从辩驳的疲倦，那种疲倦不是因为做了很多事，而是因为什么都没做、却又不能做任何事。',
            effects: [],
          },
        ],
      },
      {
        id: 'send_apology',
        text: '发一封措辞精心的请假邮件',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了二十分钟写了一封邮件，言辞诚恳，理由是"实验室正在处理一个时间敏感的投稿事项，本人无法脱身，深表歉意，如有重要决议请知悉"。系主任回复了三个字："好的，知道了。" 你用省下来的两小时推进了论文，比预期多写了半节。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 10 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了请假邮件，理由充分，表达诚恳。但会后有位同事转告你，会上讨论了新学年TA分配方案，你的实验室因为"无代表出席"被分配了最重的一档，三个本科课程，每周六课时。你在邮件里找回了那两个半小时，然后在课程表里还了回去。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  bureau_reimbursement_quest: {
    id: 'bureau_reimbursement_quest',
    title: '35美元的漫漫报销路',
    description: [
      '四个月前，你参加了一个会议，在当地吃了顿35美元的工作餐，保留了发票，按照要求提交了报销申请。四个月过去了，这35美元仍然处于"审核中"。你第三次联系财务办公室，得到了回复：您的申请需要一份新版本的附加说明表格，请填写B-7(rev.2024)版本并重新提交。',
      '你找到B-7(rev.2024)表格，发现第三栏"部门主管签字"需要你所在部门的前任主管签字，那位主管去年已经退休，现居另一个城市，联系方式不明。',
    ],
    prompt: '为了35美元，你打算：',
    options: [
      {
        id: 'escalate_to_chair',
        text: '升级到系主任，请求介入',
        outcomes: [
          {
            weight: 2,
            narrative: '系主任听完这件事，往椅背上靠了一下，说"我来处理"。三天后，财务办公室主动联系你，说表格问题已经解决，35美元将在下一个支付周期到账。两周后，账上多了35美元。你为这件事消耗的时间成本，折合时薪大约是0.4美元。你觉得这没有什么关系，关键是原则。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 0 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '系主任说会处理，但后来这件事进入了某个他也无法进入的流程迷宫。又过了六周，财务办公室告知，由于该笔申请超过报销有效期（四个月），现已无法处理。共历时六个月，耗费七封邮件、三次电话、两次当面沟通，结果是：35美元丢失。你把这件事写进了一个名为"案例研究"的文档。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'abandon_the_35',
        text: '放弃，就当给体制交了学费',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉邮件，心想35美元换来了一次对大学财务系统的深度了解，这属于不可复制的田野调查经验。你把这件事从待办事项里删掉，感到了一种轻盈。下次出差你改用信用卡，自己承担，不报销，生活质量提升了30%。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'bureaucracy_speedrun',
        text: '穷尽一切手段，必须报到',
        outcomes: [
          {
            weight: 1,
            narrative: '你联系到了退休主管的前同事，辗转拿到了联系方式，发了一封邮件。对方在三天内回复，表示愿意签字，但需要你邮寄纸质表格。你去打印店打印、盖章、邮寄。两周后收到签好字的表格，重新提交财务。财务告知，B-7(rev.2024)版本已废止，请使用B-7(rev.2025)。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -20 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  bureau_room_booking_fail: {
    id: 'bureau_room_booking_fail',
    title: '会议室被抢了',
    description: [
      '今天是组会日。你来到预定的会议室，发现里面已经有人，椅子摆成了圈，有人正在展开一块印着"心理健康从关注自己开始"的横幅。设施管理办公室告知：这个房间今天被"系部门健康促进活动"使用，该活动优先级高于普通教研会议。',
      '你查了一下自己的预定记录，是八天前做的，早于那个活动。设施管理说："健康活动属于部门战略性项目，如有冲突，教研活动应予以让步。"你站在走廊里，旁边有一盆绿萝，显得比你更淡定。',
    ],
    prompt: '组会场地被抢，你选择：',
    options: [
      {
        id: 'find_another_room',
        text: '临时找个别的地方开会',
        outcomes: [
          {
            weight: 2,
            narrative: '你在系统里搜了一圈，找到了一间尚未被预定的小会议室，容量刚好够用，投影仪有点旧，遥控器没有电池。你借来了两节五号电池，会议照常进行。有学生说"这间屋子的椅子比以前那间好坐"，这条信息被纳入了未来选房标准。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -3 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '系统显示当天所有会议室都已被占用。你们最终在走廊尽头的一个休息区，围着两张拼在一起的咖啡桌开了组会。有人蹲着，有人站着，有人坐在地上。会议效率出奇地高，大概是因为站着开会没有人想拖长。这个姿势获得了一种意外的好评。',
            effects: [
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'join_wellness',
        text: '带着学生去参加健康活动',
        outcomes: [
          {
            weight: 1,
            narrative: '你推开门，说："请问我们能一起参加吗？" 活动组织者愣了一下，然后说"当然"。接下来四十分钟，你和组里的学生一起做了正念呼吸练习、填写了一份"压力来源识别表"，发现前三名分别是：截稿日期、实验结果、和导师开会。活动结束后，两名学生说"这个比组会轻松"，你决定今天取消组会。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 15 },
              { type: 'allStudents', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'energy', delta: 10 },
            ],
          },
        ],
      },
      {
        id: 'assert_booking_rights',
        text: '向设施管理据理力争',
        outcomes: [
          {
            weight: 1,
            narrative: '你调出预定记录，把时间戳截图发给了设施管理，指出你的预定早于对方八天，按照规则应当受到保护。设施管理回复："健康活动属于优先类别，如有异议请联系部门行政。" 你联系了部门行政，得到回复："此类事项由设施管理负责。" 你在走廊里站了二十分钟，最终找了另一间会议室。旁边那盆绿萝没有动。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  // ════════════════════════════════════════════════════════════════════
  // SECTION 2: 晚期/声望门控事件（tags: ['late_game']）
  // ════════════════════════════════════════════════════════════════════

  late_alumni_success: {
    id: 'late_alumni_success',
    title: '第一个学生出息了',
    description: [
      '你的手机屏幕亮了，是{studentName}发来的消息。你还记得{studentName}，那个把学习率调到1.0、看着loss曲线飞上天际然后若无其事问"老师这正常吗"的{studentName}。',
      '消息是这样写的："老师！！！我中了ICOP Best Paper！！！！评委说我们的工作fundamentally rethinks了整个方向！！！！！！" 你数了一遍感叹号，然后又数了一遍，确认自己没有眼花。你想起来，当年{studentName}的第一篇论文因为"contribution不够清晰"被拒了四次，第三次被拒的时候{studentName}在你办公室坐了很久，看着窗外，偶尔把水杯转一圈再转回来。',
    ],
    prompt: '{studentName}拿了最佳论文奖，你想：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'celebrate_publicly',
        text: '发组里通知，公开庆祝',
        outcomes: [
          {
            weight: 1,
            narrative: '你在组群发了一条消息，说{studentName}拿了ICOP最佳论文，让大家向学长/学姐祝贺。现任学生先是各自在群里点开了消息又没有立刻回，然后陆续发来恭喜，语气里混合着真诚的高兴和一种无声的压力。有人当天晚上十点多还在实验室。你发现你可能不经意间创造了一个激励，或者一场竞赛。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'reply_privately',
        text: '单独回消息，说几句真心话',
        outcomes: [
          {
            weight: 1,
            narrative: '你回复说："恭喜，这是你应得的。我记得你第三次被拒的那天下午。"过了大概五分钟，{studentName}回了一条："老师，我当时以为你不知道我在想什么。原来你知道。" 你看着这句话，没有立刻回复，窗外有什么东西刚好过了一阵风。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 10 },
            ],
          },
        ],
      },
      {
        id: 'feel_ancient',
        text: '感受时间的重量',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了一个"🎉"，然后放下手机，坐了一会儿。你想起{studentName}第一次进实验室的样子，想起你当时讲loss收敛的时候对方一脸"我懂了"但明显没懂的表情。现在{studentName}去rethink了整个方向，你还在这里讲loss收敛。你把手机再拿起来，发了一条消息："请全组吃饭，你请。"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
            ],
          },
        ],
      },
    ],
    tags: ['late_game'],
  },

  late_invited_talk: {
    id: 'late_invited_talk',
    title: 'Keynote邀请',
    description: [
      '邮件的主题是："Keynote Invitation — [Conference Name] 2026"。你把这句话读了两遍，然后向后靠在椅背上，想起八年前你在这个会议投的第一篇论文，被拒了，审稿人二号用了"superficial"这个词，你至今记得。',
      '邮件说："您的研究组在过去几年产生了持续的影响力，我们诚挚邀请您在今年的会议上做45分钟keynote报告，题目由您自行拟定。" 四十五分钟。你上一次做45分钟报告是在某次院系内部汇报，中间有人睡着了。这次性质不同。',
    ],
    prompt: '你被邀请做Keynote了，你打算讲什么',
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 40 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'tight_research_talk',
        text: '做一个严谨扎实的研究报告',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了三周准备，PPT每一页都有充分的实验支撑，结论保守但确凿，演讲节奏精确到分钟。报告结束后，有人评价说"这是今年会议上最扎实的报告"，随后补充了一句"也是最dense的"。问答环节持续了二十五分钟，你回答了七个问题，没有一个能难住你。声誉稳步上升，方式是正确的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'allStudents', stat: 'skills.theory', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '报告很扎实，问题也很扎实，最后一个问题你没有立刻答上来，停顿了一下，现场非常安静。你最终给出了一个部分答案。有几个人在记笔记，这让你感到一种复杂的满足感。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'visionary_talk',
        text: '讲一个宏大的愿景报告',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了两周想清楚了整个领域接下来五年应该往哪走，做成了一个充满open problem和provocative question的报告。台下有人频繁点头，有人频繁皱眉，有人记了大量笔记，有人在PPT里截图。散会后有两个年轻研究者来找你聊，一聊聊了一个小时。你的名字在接下来两周里被引用的频率上升了一个可见的幅度。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 10 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '报告很宏大，宏大到有几个具体预测在三天后的讨论环节被另一位大佬当场指出"存在逻辑漏洞"。你做了回应，大佬表示"可以接受"，但Twitter上已经有人截图了。声誉±0，但话题度+∞。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'tell_rejection_story',
        text: '讲一个包含你最惨被拒故事的报告（有风险，但可能成为名场面）',
        outcomes: [
          {
            weight: 1,
            narrative: '你在PPT第三页放了一张截图，就是那封拒信，审稿人二号用了"superficial"。你花了四分钟讲那次被拒，台下的年轻研究者们开始笑，不是嘲笑，是那种"原来大佬也被这样对待过"的释怀式笑声。接下来四十分钟讲了什么、结论是什么，有人之后没记住，但那张拒信截图被转发了三百次，每一条转发都附了不同版本的"我也有一封这样的邮件"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 12 },
              { type: 'allStudents', stat: 'happiness', delta: 12 },
              { type: 'allStudents', stat: 'favor', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你讲了那次被拒，台下笑了，然后你过渡到正式内容——但时间控制出了问题，那个故事讲了八分钟，剩下的研究内容被压缩到了三十七分钟，最后两个实验没来得及展示。有人会后说"报告很有意思，但感觉结尾有点仓促"，这句话准确地描述了发生的事。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['late_game'],
  },

  late_industry_poach: {
    id: 'late_industry_poach',
    title: '大厂来挖{studentName}了',
    description: [
      '{studentName}来敲了你的门，手里拿着手机，屏幕对着你，脸上带着一种混合了兴奋和愧疚的表情，那种表情你见过，通常出现在人们即将说出一件让你高兴又让你难过的事情之前。',
      '"老师，我收到了一个offer。" 手机屏幕上是一封邮件，来自你知道的那个公司，那个所有人都知道的公司。薪水那一行你扫了一眼，把手机还给了{studentName}，往椅背上靠了靠。这个数字是你现在给{studentName}的补贴的十七倍，是学术界能提供的最高标准的大约八倍。{studentName}说："我想听听老师的意见。"',
    ],
    prompt: '{studentName}拿到大厂offer，你怎么做',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'anyStudent', stat: 'favor', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'encourage_to_go',
        text: '鼓励{studentName}去，做学术不是唯一的路',
        outcomes: [
          {
            weight: 1,
            narrative: '你说："去吧，这是一个好机会，你值得。" {studentName}愣了一秒，大概是没预料到你这么干脆。临走前说了句"老师，谢谢你这几年"，说得很认真，不是客套话，你听出来了。{studentName}走后，实验室少了一个人，多了一段让你之后在学生面前讲的故事。某次会议上你偶尔看到{studentName}的名字出现在一篇高引论文的致谢里，排在第一位。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'randomStudent', stat: 'favor', delta: 15 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'keep_in_academia',
        text: '劝{studentName}留在学术界，讲讲学术的价值',
        outcomes: [
          {
            weight: 2,
            narrative: '你跟{studentName}聊了一个多小时，讲了学术自由、研究方向的自主权、以及那种"你的名字永远附着在你的发现上"的满足感。{studentName}认真听了，最后说"让我再想想"。三天后告诉你决定留下来，语气里有一种刚做完决定的轻盈。半年后，{studentName}的论文进了最佳论文提名——你没有说"我早说了"，但你想到了这句话。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 12 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你讲了学术的价值，{studentName}认真听了，然后说："老师，我考虑清楚了，我还是想去。" 你点了点头，说好，祝顺利。{studentName}走后，你坐在椅子上想了一会儿，意识到那一个小时讲的，其实也是说给你自己听的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'randomStudent', stat: 'favor', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'make_a_deal',
        text: '提供更好的条件留住{studentName}（花10万）',
        fundingCost: 10,
        outcomes: [
          {
            weight: 2,
            narrative: '你给{studentName}提高了补贴，争取到了一个独立带项目的机会，还承诺第一作者优先权。{studentName}考虑了两天，说决定留下来，原因不全是钱，更多是"在这里我知道我在做什么，那边我不确定"。这是一笔你认为花得值的钱，虽然下个季度经费会有点紧。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 20 },
              { type: 'randomStudent', stat: 'happiness', delta: 12 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你提高了条件，{studentName}感谢了你的诚意，然后还是去了。大概这件事的结局从那封offer邮件到达的时候就已经定了，你们两个只是把道别仪式拉长了一点。你把那10万额度放回了经费计划里，调整了研究方向，继续往前。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 10 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
    tags: ['late_game'],
  },

  late_media_profile: {
    id: 'late_media_profile',
    title: '记者要来实验室',
    description: [
      '一位科技媒体记者发来邮件，说想写一篇关于你实验室的深度报道，计划来实验室待一天，观察日常运转，采访你和学生，"呈现真实的一线AI研究图景"。这听起来不错。',
      '然后你看到了他们建议的日期，发现那一天，以某种不可解释的方式，恰好是你们最具代表性的普通工作日：早上有一场可能会变得有点长的学生进度汇报，下午有一封需要当天处理的审稿意见，组里可能有一个还没收敛的实验，以及，你的午饭通常是在键盘前解决的。这一天如果被拍下来，要么非常好，要么非常不好。',
    ],
    prompt: '记者要来实验室写报道，你决定',
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 45 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'agree_and_prepare',
        text: '同意，提前做一些准备',
        outcomes: [
          {
            weight: 2,
            narrative: '你把那天的日程稍微整理了一下，叮嘱学生正常工作即可，不用刻意表演。记者来了，拍了很多照片，问了一些你没预料到的好问题，比如"你觉得这份工作最难的部分是什么"，你回答得很诚实，说了好一会儿。报道发出来之后，有几个本科生说因为那篇文章决定申请读博。你感到一种你很难命名的情绪，大约是责任感的另一个侧面。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 10 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你做了准备，当天一切顺利，记者满意地离开了。报道发出来时，你的导师——那位你读博期间的导师——发给你一条消息："看到报道了，写得不错。" 这六个字让你愣了一会儿，然后把窗口最小化，继续改论文。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 7 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'agree_no_prep',
        text: '同意，但不做任何准备，就是日常',
        outcomes: [
          {
            weight: 1,
            narrative: '记者到了，正好赶上一个学生在演示一个报错，错误信息足足占了半个屏幕，里面有一行"RuntimeError: CUDA out of memory"。记者问"这是什么"，那个学生解释了大约三分钟，越说越兴奋，最后引出了整个研究方向的核心问题。报道里有一整段描写这个场景，标题是"当报错变成了研究问题"，这是编辑加的。阅读量是你实验室有史以来被提及次数最高的一次。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 12 },
              { type: 'allStudents', stat: 'favor', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '记者到了，恰好是组里气氛最安静的一天，所有人都在单独对着屏幕，午饭是各自在工位解决的外卖，下午你处理了三封行政邮件，没有任何激动人心的事情发生。报道发出来，标题是《AI研究室的日常：比想象中安静得多》，评论里有人说"这篇文章劝退了我读博"，也有人说"这才是我想要的生活"。正好各一半。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'politely_decline',
        text: '礼貌拒绝，实验室还是低调一点好',
        outcomes: [
          {
            weight: 1,
            narrative: '你回复说感谢邀请，目前实验室处于一个关键研究节点，不适合接受外部访问，如有机会未来再合作。记者表示理解，说"期待你们的工作发表"。你把那天的日历清空，把原本要准备的时间花在了论文上，多写了一节，感觉很好。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['late_game'],
  },

  late_grant_renewal: {
    id: 'late_grant_renewal',
    title: '基金续期：账要算清楚',
    description: [
      '主要科研经费的续期申请到期了。申请材料的核心是一份对照表：原始申请书中的承诺事项，以及实际完成情况。你翻出了五年前写的那份申请书。',
      '你读了大概三页，然后停下来，发现里面有一个"预计在第二年完成"的子项，那个子项在第三年换了方向，在第四年彻底转变成了另一个问题，最终产出了你目前最重要的三篇论文，但和原计划的关系大约相当于一只蝴蝶和一条毛毛虫。还有两个预期目标确实没有实现，原因是当时的假设被更新的工作证伪了，这是正常的，但写在续期表格里需要解释。',
    ],
    prompt: '基金续期对照表需要填写，你选择',
    triggerConditions: [
      { type: 'lab', stat: 'funding', op: '>=', value: 20 },
      { type: 'time', field: 'year', op: '>=', value: 4 },
    ],
    options: [
      {
        id: 'honest_accounting',
        text: '如实填写，未完成的逐条说明原因',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了三天如实填写了每一项，包括两个未完成的目标，每个后面都附了详细的解释：领域进展导致假设失效，方向调整后的新成果等。评审委员会的反馈是："材料诚实，方向调整有充分学术理由，实际成果超出预期，建议续期。" 你把那份评审意见存进了一个单独的文件夹，里面目前只有这一个文件。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'lab', stat: 'funding', delta: 15 },
            ],
          },
          {
            weight: 1,
            narrative: '你如实填写，评审委员会对两个未完成事项提出了书面质疑，要求你在答辩时作出解释。你准备了二十页PPT，解释得清晰、有理、有数据支撑。委员会最终批了，但整个过程比直接成功多花了三周，消耗了你本来打算用来写新论文的时间。诚实的代价有时候是效率。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 12 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'strategic_framing',
        text: '战略性表述，把转向包装成"迭代演进"',
        outcomes: [
          {
            weight: 2,
            narrative: '你写道："原计划目标在实施过程中经过系统性评估，依据最新领域进展进行了方向迭代，最终产出了更具前沿价值的研究成果，包括……"后面跟了你最好的三篇论文列表。这是完全真实的，只是叙事策略选择了乐观视角。续期批了，速度比预期快了两周。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 15 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你的战略表述写得有点太战略了，评审委员中有一位对你的领域非常熟悉，在反馈里指出："对照原始申请书，部分目标描述与实际成果的关联有待进一步说明。" 你补了一轮材料，比如实填写多花了一周，最终结果是一样的，但你多了一段不舒服的中间过程。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 12 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'colleague_review',
        text: '先让一个信得过的同事帮你看一遍',
        outcomes: [
          {
            weight: 1,
            narrative: '你发给了一位共事多年的同事，附言是"帮我看看这几个地方怎么写比较好"。对方回来的稿子改了六个地方，每一处都比你的原版更准确也更合理——不是在帮你掩盖什么，而是帮你把真实的事情说清楚了。你修改后提交，评审顺利通过，附了一条"材料完整清晰"的评语。外部视角值那顿饭的钱。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 15 },
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['late_game'],
  },

  late_lab_anniversary: {
    id: 'late_lab_anniversary',
    title: '实验室五周年',
    description: [
      '你打开实验室的门，发现房间已经不是你离开时的样子。桌子被推到了边上，中间摆了一张桌布，上面有一个蛋糕，蛋糕上用糖霜画了你们实验室的Logo，不太精确，但能看出是谁画的。{studentName}站在旁边，表情介于"策划成功"和"等待被批评"之间。',
      '墙上投影了一个PPT，第一页是五年前实验室第一天的照片，那时候整个实验室只有两台电脑、一块白板、和你。白板上有一个公式，你盯着看了一会儿，认出来了，那是你当时觉得"这个方向可能行"的核心假设。那个假设后来被证明基本是对的，只是实现方式完全不同。照片里的你看起来比现在年轻，但更紧张。',
    ],
    prompt: '实验室五周年，大家都在等你',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 5 },
      { type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 },
    ],
    options: [
      {
        id: 'give_a_speech',
        text: '即兴讲几句话',
        outcomes: [
          {
            weight: 1,
            narrative: '你站在那个蛋糕前面，看了一眼在场的所有人，说了大概五分钟的话。你讲了第一年的艰难，讲了某次差点没过的中期评审，讲了那个现在已经离开的学生，说他当年把学习率设成1.0，然后后来拿了最佳论文。你说不知道接下来五年会怎样，但你知道这里做的事情是有意义的。{studentName}递给你第一块蛋糕，上面有个糖霜写的"5"，歪的。你吃掉了它。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 15 },
              { type: 'allStudents', stat: 'happiness', delta: 15 },
              { type: 'lab', stat: 'reputation', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'try_not_to_cry',
        text: '努力维持镇定',
        outcomes: [
          {
            weight: 1,
            narrative: 'PPT播到第七张，是某次全组第一次有论文被顶会接收的截图，那天组里所有人在群里一起等结果，通知来的时候是凌晨两点，你发了一个平时从不用的大表情包。你看着那个表情包出现在投影上，感到眼眶有点热，然后假装在检查一下手机。{studentName}假装没看见，非常配合地在这个时间点开始切蛋糕，制造出了足够多的声响。门带上的一瞬间，你隐约听到走廊里有人用力呼了口气。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 20 },
              { type: 'allStudents', stat: 'happiness', delta: 12 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'back_to_work',
        text: '宣布吃完蛋糕继续工作',
        outcomes: [
          {
            weight: 1,
            narrative: '你看了眼蛋糕，看了眼大家，说："谢谢，吃完接着干，截稿还有十天。" 全场愣了一秒，然后{studentName}笑出了声，接着所有人都笑了，那种笑是真实的，不带任何敷衍，因为这句话太像你了，真实到有点好笑，又有点让人安心。蛋糕吃完了，大家回到工位，但那天下午实验室里有一种说不清楚的轻盈。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 12 },
              { type: 'allStudents', stat: 'happiness', delta: 18 },
              { type: 'allStudents', stat: 'projectProgress', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['late_game'],
  },

};
