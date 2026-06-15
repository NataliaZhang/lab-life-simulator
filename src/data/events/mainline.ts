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
      '未来六年，你将在这里申请经费、指导学生、熬夜改论文、和 Reviewer 斗智斗勇——也可能在某个凌晨三点怀疑自己为什么没有去卖奶茶。',
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
          effects: [{ type: 'lab', stat: 'funding', delta: 30 }],
        }],
      },
      {
        id: 'save_money',
        text: '先存着再说',
        outcomes: [{
          weight: 1,
          narrative: '你决定暂时不动这笔钱。科研史上有无数项目死于缺钱，而你打算至少先活过第一个学期。看着账户里的数字，你获得了一种短暂而脆弱的安全感。',
          effects: [{ type: 'lab', stat: 'funding', delta: 50 }],
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
            { type: 'lab', stat: 'reputation', delta: 1 },
          ],
        }],
      },
    ],
    tags: ['opening'],
  },

  // ── 科研推进链：可疑实验结果（单学生视角）─────────────────────────────────

  suspicious_results: {
    id: 'suspicious_results',
    title: '数据有点……可疑',
    description: [
      '{studentName}发来实验结果，各项指标好得出奇——比SOTA高了整整10个点。',
      '你盯着数字看了三分钟，心里有点虚。这个世界线里，哪有这么好的事？',
    ],
    prompt: '结果好得离谱，你选择：',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'double_check',
        text: '让{studentName}仔细复查',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}查了一遍，发现是测试集泄漏了。改正后真实提升只有3个点，仍然不错。一场学术危机被悄悄避免了。',
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
          narrative: '你和{studentName}花了两周写完投出去了。然后审稿人二号来了："请在附录中说明评估协议。" 你盯着邮件沉默了三秒。',
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
      '{studentName}把所有代码重新梳理了一遍，写了一份三页的检查报告。',
      '结论：确实有数据处理问题，但核心方法是对的，结果有效只是被高估了。',
    ],
    prompt: '复查完毕，你怎么收尾？',
    // 链式事件：bound student 继承自 suspicious_results
    options: [
      {
        id: 'write_clean',
        text: '用真实结果老老实实写',
        outcomes: [{
          weight: 1,
          narrative: '最终论文数据真实，审稿人觉得实验完整，给了好评。{studentName}也松了口气——这是她参与的第一篇正式论文。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 4 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
          ],
        }],
      },
      {
        id: 'report_oversight',
        text: '在组内通报，引以为戒',
        outcomes: [{
          weight: 1,
          narrative: '你在组会上把这件事完整讲了出来。{studentName}有点不好意思，但整理完之后说"理解了很多之前没想清楚的东西"。以后数据复查习惯好了很多。',
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
    title: '顶会截止日前三天',
    description: [
      '距ICML截止还有72小时。',
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
            narrative: '{studentName}没有等你，自己通宵把实验跑完，还顺手润色了abstract。你收到草稿时意外地惊喜——这篇她基本独立完成了。',
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
          narrative: '你发消息告诉{studentName}这次先撤。对方沉默了十秒，然后回了"好的，那我把代码整理一下"。你感觉到对方松了口气，尽管什么都没说。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'favor', delta: 3 },
            { type: 'lab', stat: 'reputation', delta: -1 },
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
              { type: 'randomStudent', stat: 'happiness', delta: 18 },
              { type: 'randomStudent', stat: 'favor', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: 'Rejected。你把审稿意见整理好发给{studentName}。{studentName}看完说"没关系，我们改"——语气比你预想的要平静，让你心里好受了一些。',
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
      '国自然青年基金申请书截止日还有一周。',
      '这是你入职后第一次申请，五万字还差得远。整个过程只能靠你一个人扛。',
    ],
    prompt: '距截止一周，你怎么应对？',
    options: [
      {
        id: 'write_hard',
        text: '全力以赴亲自写（消耗精力）',
        energyCost: 40,
        outcomes: [
          {
            weight: 2,
            narrative: '熬了六天六夜，总算在截止前提交了。申请书质量还不错，导师看了觉得有希望。精力耗尽，但值得。',
            effects: [{ type: 'lab', stat: 'reputation', delta: 3 }],
            nextEventIds: ['grant_result'],
          },
          {
            weight: 1,
            narrative: '写了七天，越写越乱，最后申请书逻辑有点混乱。提交了，但没什么信心。下次要早点开始。',
            effects: [],
            nextEventIds: ['grant_result'],
          },
        ],
      },
      {
        id: 'hire_help',
        text: '找专业助理润色（花3万）',
        fundingCost: 3,
        outcomes: [{
          weight: 1,
          narrative: '找了个科研助理帮整理材料、润色文字。最终提交的申请书整洁专业，你省下了不少精力。',
          effects: [{ type: 'lab', stat: 'energy', delta: 15 }],
          nextEventIds: ['grant_result'],
        }],
      },
      {
        id: 'skip_this_year',
        text: '今年先不投了',
        outcomes: [{
          weight: 1,
          narrative: '今年先放弃，安心做科研。消息传出去，有些同事觉得可惜，但也有人理解。明年再战，手里先把成果积累好。',
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
      '项目管理平台有了新消息。',
      '你双手微微有点抖地点开。',
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
            narrative: '中了！24万直接打进账户。你把消息发进组里，每个人都发来庆祝。经费保障了，压力小了很多。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 24 },
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '没中。你平静地把结果发出去："这次没过，明年继续。" 组里回复都很克制，但你能感觉到大家松了口气——至少老师没有崩溃。',
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
          narrative: '不论结果，你开始规划下一步。中了就用好，没中就总结。科研是长跑，心态要稳。',
          effects: [{ type: 'lab', stat: 'energy', delta: 10 }],
        }],
      },
    ],
    tags: ['chain'],
  },

  // ── 时间锚定：第2年8月，由 monthlyUpdate 强制注入 ─────────────────────────

  lab_birthday: {
    id: 'lab_birthday',
    title: '实验室成立一周年',
    description: [
      '你翻了一下日历，才意识到——整整一年了。',
      '去年八月，这间办公室还是一块空白的白板加几张没拆封的桌子。现在，{studentName}坐在角落里盯着屏幕，桌上放着泡面、论文草稿和一杯凉透了的茶。',
      '你没有刻意庆祝，但你注意到{studentName}今天来得比平时早，似乎也意识到了什么。',
    ],
    prompt: '一周年，你打算：',
    options: [
      {
        id: 'party',
        text: '出去吃一顿，算老师请客',
        fundingCost: 2,
        outcomes: [{
          weight: 1,
          narrative: '你们找了一家烤肉店，点了比平时多一倍的菜。{studentName}边吃边说"这一年感觉又长又短"。你说"以后只会更快"。两人都沉默了一会儿，然后继续吃肉。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 15 },
            { type: 'randomStudent', stat: 'happiness', delta: 18 },
          ],
        }],
      },
      {
        id: 'milestone_review',
        text: '认真聊聊这一年，定下新目标',
        outcomes: [{
          weight: 1,
          narrative: '你们在白板前站了一个多小时，把这一年做的事写了出来，然后一起圈出了下一年想突破的问题。{studentName}说"写出来才发现做了挺多的"。你笑了笑，没说话。',
          effects: [
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent', stat: 'favor', delta: 8 },
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
          ],
        }],
      },
      {
        id: 'keep_working',
        text: '该干嘛干嘛，科研不等人',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}中午发来一条消息："老师，今天是不是咱们实验室一周年？" 你回了个"嗯"，然后继续改论文。对方回了个表情，没再说话。这种事，以后还有很多年。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: -5 },
            { type: 'randomStudent', stat: 'happiness', delta: -3 },
            { type: 'lab', stat: 'energy', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['mainline'],
  },

};
