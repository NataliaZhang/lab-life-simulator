/**
 * 属性触发事件 — 学生或实验室属性越过阈值时触发
 *
 * 触发机制：所有事件放入 monthlyEventPool，每月由 filterTriggerable
 * 检查 triggerConditions，条件不满足则从当月候选池中移除。
 * 触发时，filterTriggerable 会将最"告急"的学生绑定到 QueuedEvent.studentId，
 * 引擎在展示时用该 studentId 替换描述/叙述中的 {studentName}。
 *
 * 分类：
 *   学生属性触发 — student_sick, favor_complaint, transfer_risk
 *   实验室属性触发 — collaboration_offer
 */

import type { GameEvent } from '../../types';

export const conditionalEvents: Record<string, GameEvent> = {

  // ── 学生属性触发 ──────────────────────────────────────────────────────────

  student_sick: {
    id: 'student_sick',
    title: '{studentName}病了',
    description: [
      '{studentName}发来消息说去校医院了，发烧38度，语气克制，尽量显得不是什么大事。',
      '你看了眼最近的状态记录——已经连续好几周心情很差，熬到现在身体终于提出了正式抗议。',
    ],
    prompt: '{studentName}生病了，你怎么回应？',
    triggerConditions: [{ type: 'anyStudent', stat: 'happiness', op: '<', value: 30 }],
    options: [
      {
        id: 'medical_subsidy',
        text: '帮报个医疗补贴（花1万）',
        fundingCost: 1,
        outcomes: [{
          weight: 1,
          narrative: '你帮报销了医药费，顺带叮嘱好好休息、不用惦记进度。{studentName}回来之后有点不知所措，问你"老师，这钱真的可以报吗"——确认了两遍。之后状态好了很多，像一台被正确充上电的设备。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 15 },
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
          ],
        }],
      },
      {
        id: 'let_rest',
        text: '让好好休息，不用来实验室',
        outcomes: [{
          weight: 1,
          narrative: '你发消息说"养病为主，实验室的事不急，真的不急"——你特意加了"真的"，怕对方当客套话。{studentName}休息了三天，回来时眼睛有神了，步伐里带着一种久违的松弛感。这种体贴，比任何科研反馈都记得久。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'favor', delta: 8 },
          ],
        }],
      },
      {
        id: 'continue_work',
        text: '让在家线上跟进进度',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}在38度发烧的情况下，认认真真开了视频会、回了消息、跟进了三个任务。病没养好，心情雪上加霜，身体发出的那封辞职信正在措辞升级中。从那之后，对方看你的眼神多了一层非常难以描述的东西。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: -10 },
            { type: 'randomStudent', stat: 'favor', delta: -12 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

  favor_complaint: {
    id: 'favor_complaint',
    title: '{studentName}在背后说你坏话',
    description: [
      '你偶然在某论坛上刷到一个匿名帖子，细节具体得令人心跳加速——组会时间、服务器型号、导师的口头禅——只有组里的人才能知道这些。',
      '结合细节，基本可以确定是{studentName}写的，虽然没有指名道姓，但吐槽的是实验室的管理风格，遣词措辞相当克制，说明对方积累情绪已经很久了。',
    ],
    prompt: '{studentName}的好感度告警，你选择：',
    triggerConditions: [{ type: 'anyStudent', stat: 'favor', op: '<=', value: 40 }],
    options: [
      {
        id: 'talk_privately',
        text: '找{studentName}私聊',
        outcomes: [
          {
            weight: 2,
            narrative: '你找到{studentName}，没有提帖子，只是问："最近有什么困难吗，我们聊聊。" 对方愣了一下，然后说了很多——说了大概四十分钟，你听了大概三十五分钟。沟通结束后，两人都感觉轻了很多，像是把一块压着的石头翻开了一面。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 15 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '聊了之后才发现，双方各自在脑子里构建了一个完全不同的对方。误解解开了一半，另一半需要时间。但至少，{studentName}知道你在乎了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'adjust_management',
        text: '悄悄调整管理方式',
        outcomes: [{
          weight: 1,
          narrative: '你减少了催进度的频率，开始用"最近怎么样"替代"进展怎么样"。一个月后，组里气氛悄悄好转，像开窗通了风。{studentName}某天发来消息说"老师最近感觉不一样了"，你没有解释，只回了个"嗯"。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 8 },
            { type: 'allStudents', stat: 'happiness', delta: 5 },
          ],
        }],
      },
      {
        id: 'ignore_it',
        text: '当没看见',
        outcomes: [{
          weight: 1,
          narrative: '你假装没看到。一周后，帖子下面的回复从十几条涨到了七十多条，有人开始@你的名字，有人把帖子截图发到了更大的群——你甚至在别的实验室导师发给你的消息里看到了那个链接。{studentName}的好感度继续以稳定的速度下滑。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: -5 },
            { type: 'lab', stat: 'reputation', delta: -3 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

  transfer_risk: {
    id: 'transfer_risk',
    title: '{studentName}在考虑转组',
    description: [
      '{studentName}发来一封邮件，每一句话都礼貌得像是经过多次修改，但最后一段的意思非常清楚：对方在认真考虑转组的可能性。',
      '理由是"个人原因和发展方向的差异"——这是一句在所有正式场合都无懈可击的话，它什么都没说，但什么都说了。',
    ],
    prompt: '{studentName}想转组，你的回应：',
    triggerConditions: [{ type: 'anyStudent', stat: 'favor', op: '<=', value: 20 }],
    options: [
      {
        id: 'retain_with_raise',
        text: '提高待遇挽留（花2万）',
        fundingCost: 2,
        outcomes: [
          {
            weight: 2,
          narrative: '你约了一次面谈，表示完全支持对方的发展，同时把补贴提高了一档。{studentName}低头看了一会儿手里的咖啡杯，说"我再想想"——这三个字里有一种质地，你听得出来，不是敷衍，是真的在权衡。三天后，消息来了：决定留下来。好感度重新开始回暖，像一株被及时浇水的植物。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 20 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你提高了待遇，诚意十足。但{studentName}还是走了——礼貌地、体面地、坚定地走了。有些问题不是钱能解决的，有些裂缝在开始之前就已经存在了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'honest_conversation',
        text: '认真谈一次，看看问题在哪',
        outcomes: [
          {
            weight: 2,
            narrative: '你们谈了整整一个小时十五分钟。{studentName}说的问题里，有些你能改，有些是双方匹配度的问题，有些你自己以前确实没意识到。谈完之后，{studentName}说"我想留下来试试"——不是因为你解决了所有问题，而是因为你认真听了。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 18 },
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '谈完了，双方都对彼此有了更清晰的认识——清晰到足以确认这段合作关系不太适合继续。{studentName}最终还是离开了，但走得坦然，临走前说"谢谢老师这一年"，没有任何锋芒，这反而是最好的结局。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'let_go',
        text: '尊重对方，放行',
        outcomes: [{
          weight: 1,
          narrative: '你回邮件说完全理解，不需要解释更多，祝{studentName}找到更合适的方向。对方走了，在组里留下了一个清白的口碑。听说后来在别的组干得不错——你在某次会议上偶尔听人提起，心里竟然有点高兴。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 5 },
            { type: 'lab', stat: 'reputation', delta: 1 },
          ],
        }],
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
            narrative: '合作协议签了。有一位学生被选为联合培养，去对方实验室待了半年，回来的时候眼界宽了一圈，技能涨了不止一圈。你的名字开始和一个比你更响的名字出现在同一篇论文里——这种搭便车，心安理得。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 8 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '合作协议签了，执行起来才发现两边的研究风格差异相当大——对方喜欢高度结构化，你们习惯灵活迭代。光协调这件事就消耗了大量精力。声望涨了一点，但你连续两周失眠，觉得自己在用健康换履历。',
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
          narrative: '你礼貌地回复说时机不对，目前组里有几件重要的事要专注完成。对方回复说"理解，保持联系"，四个字，句号。你把邮件存档，继续自己的节奏。组里的氛围因为少了外部压力而出人意料地放松了一些。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

};
