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
      '{studentName}发来消息说去校医院了，发烧38度。',
      '你看了眼她最近的状态记录，暗暗叫苦——已经连续好几周心情很差了，身体撑不住了。',
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
          narrative: '你帮报销了医药费，还叮嘱好好休息。{studentName}回来之后说"老师真的是好人"，好感度明显上升。',
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
          narrative: '你发消息说"养病为主，实验室的事不急"。{studentName}休息了三天，回来精神好多了。这种体贴，她记在心里。',
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
          narrative: '{studentName}勉强跟进了几个任务。病没养好，心情更差，而且明显感觉你不关心她的状态。',
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
      '你偶然在某论坛上看到一个匿名帖子，细节描述只有组里的学生知道。',
      '结合细节，基本可以确定是{studentName}写的——虽然没有指名道姓，但内容在吐槽实验室的管理风格。',
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
            narrative: '你找到{studentName}，直接问"你还好吗？最近有什么困难？" 对方愣了一下，然后说了很多。沟通后，关系好了不少。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 15 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '聊了之后才发现双方都有些误解。关系缓和了，但还需要时间。',
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
          narrative: '你减少催进度的频率，多问"最近怎么样了"。一个月后，组里气氛明显好了，{studentName}的状态也改善了。',
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
          narrative: '你假装没看到。一段时间后，帖子下面的回复越来越多，有人开始@你的名字……{studentName}的好感度继续下滑。',
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
      '{studentName}发来邮件，措辞非常礼貌，但最后一段让你意识到——她在认真考虑转组的可能性。',
      '理由是"个人原因和发展方向的差异"。',
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
            narrative: '你表示支持{studentName}的发展，同时提高了补贴。她犹豫后决定再给自己一个机会，好感度大幅回升。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 20 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你提高了待遇，但{studentName}还是走了——有些问题不是钱能解决的。',
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
            narrative: '你们谈了一个多小时。{studentName}说的问题，有些你能改，有些确实不合适。最后她决定留下来，给这段关系一次机会。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 18 },
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '谈完了，双方都更了解彼此。{studentName}最终还是决定转走，但走得体面，没有撕破脸。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'let_go',
        text: '尊重她，放行',
        outcomes: [{
          weight: 1,
          narrative: '你回邮件说完全理解，祝{studentName}找到更合适的方向。她走了，但在组里留了个好印象。听说后来在别的组干得不错。',
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
      '你收到了一封邮件，署名是某知名实验室的教授，说看了你最近的工作，有意向合作联合培养。',
      '对方比你知名度高得多，机会难得。',
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
            narrative: '合作协议签了，有学生被选为联合培养。她接触到了新的资源，技能大涨。你的声望也搭了对方的顺风车。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 8 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '合作谈妥，但执行起来比想象复杂——两边方向差异比较大，协调成本不低。声望涨了一点，但精力也消耗了。',
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
          narrative: '你要求明确了资源分配、署名顺序等细节。谈判花了一个月，最终达成合理协议。这种谨慎值得。',
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
          narrative: '你礼貌地回复说时机不对。对方表示理解。你专注自己的节奏，团队稳定，短期内损失了一些机会。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['conditional'],
  },

};
