/**
 * 主线事件 — 开局序列 + 核心科研推进链
 *
 * 开局序列：lab_opening → startup_grant（固定顺序，放在 openingEventIds）
 * 推进链：suspicious_results → investigation_result
 *          conference_ddl   → submission_result
 *          grant_deadline   → grant_result
 * 链式事件仅通过 nextEventIds 注入队列，不放入 monthlyEventPool。
 */

import type { GameEvent } from '../../types';

export const mainlineEvents: Record<string, GameEvent> = {

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
        outcomes: [
          {
            weight: 1,
            narrative: '你把钥匙揣进口袋，走进实验室。无论如何，故事开始了。',
          },
        ],
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
        outcomes: [
          {
            weight: 1,
            narrative: '你花了20万元订购服务器。采购流程复杂得像在申请签证。但当确认邮件发来的那一刻，你忽然有了一种真正拥有实验室的感觉。剩余经费：30万元。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 30 },
            ],
          },
        ],
      },
      {
        id: 'save_money',
        text: '先存着再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你决定暂时不动这笔钱。科研史上有无数项目死于缺钱，而你打算至少先活过第一个学期。看着账户里的数字，你获得了一种短暂而脆弱的安全感。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 50 },
            ],
          },
        ],
      },
      {
        id: 'renovate_lab',
        text: '先改善实验室环境',
        outcomes: [
          {
            weight: 1,
            narrative: '你购置了一批办公家具、显示器和咖啡机。虽然科研水平没有任何提升，但实验室终于从"闲置房间"升级成了"看起来像能发论文的地方"。剩余经费：40万元。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 40 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
    ],
    tags: ['opening'],
  },

  suspicious_results: {
    id: 'suspicious_results',
    title: '数据有点……可疑',
    description: [
      '学生发来实验结果，各项指标好得出奇——比SOTA高了整整10个点。',
      '你盯着数字看了三分钟，心里有点虚。这个世界线里，哪有这么好的事？',
    ],
    prompt: '结果好得离谱，你选择：',
    options: [
      {
        id: 'double_check',
        text: '让她仔细复查',
        outcomes: [{
          weight: 1,
          narrative: '查了，发现是测试集泄漏了。改正后真实提升只有3个点，仍然不错。一场学术危机被悄悄避免了。',
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
          narrative: '写了两周投出去了。然后审稿人二号来了："请在附录中说明评估协议。" 你盯着邮件沉默了三秒。',
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
      '学生把所有代码重新梳理了一遍，写了一份三页的检查报告。',
      '结论：确实有数据处理问题，但核心方法是对的，结果有效只是被虚报了。',
    ],
    prompt: '复查完毕，你怎么收尾？',
    options: [
      {
        id: 'write_clean',
        text: '用真实结果老老实实写',
        outcomes: [{
          weight: 1,
          narrative: '最终论文数据真实，审稿人觉得实验完整，给了好评。学术声誉稳了。',
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
          narrative: '你在组会上把这件事分享了，大家都更仔细了。以后数据问题少多了，全员理论能力也有所提升。',
          effects: [
            { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            { type: 'allStudents', stat: 'favor', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

  conference_ddl: {
    id: 'conference_ddl',
    title: '顶会截止日前三天',
    description: [
      '距ICML截止还有72小时。',
      '组里实验还没跑完，论文写了一半，有人用红眼睛盯着甘特图。',
      '接下来怎么冲，取决于你。',
    ],
    prompt: '最后冲刺，你的策略是？',
    options: [
      {
        id: 'lead_charge',
        text: '亲自带头冲（消耗精力）',
        energyCost: 35,
        outcomes: [
          {
            weight: 2,
            narrative: '你们连轴三天，最后十分钟提交成功。全组群发疯狂emoji。有人说愿意跟你合作下一篇。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 8 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
            nextEventIds: ['submission_result'],
          },
          {
            weight: 1,
            narrative: '三天没睡，实验结果不理想，勉强投出去了。质量一般，但至少提交了。全组都很疲惫。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -12 },
            ],
            nextEventIds: ['submission_result'],
          },
        ],
      },
      {
        id: 'delegate',
        text: '放手让学生自己冲',
        outcomes: [
          {
            weight: 1,
            narrative: '好感度够，学生们心甘情愿通宵。你收到论文时发现完成度出乎意料地高，连abstract都润色好了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
            conditions: [{ type: 'anyStudent', stat: 'favor', op: '>=', value: 55 }],
            nextEventIds: ['submission_result'],
          },
          {
            weight: 1,
            narrative: '好感度不足，学生们口头答应，实际上忘记跑最后一组对比实验。最后仓促提交，质量堪忧。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -15 },
              { type: 'allStudents', stat: 'favor', delta: -5 },
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
          narrative: '放弃决定发出去后，群里一片沉默，然后有人发来"感谢老师体谅"。大家都缓了口气，下次再出发。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 15 },
            { type: 'allStudents', stat: 'favor', delta: 5 },
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
    prompt: '结果出来了，你怎么面对团队？',
    options: [
      {
        id: 'celebrate_accept',
        text: '中了就庆祝，没中就分析',
        outcomes: [
          {
            weight: 2,
            narrative: '中了！有人截图发朋友圈，有人发了烟花表情，有人已经在更新CV。你请大家吃了顿好的，声望+5。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 15 },
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: 'Rejected。你整理了审稿意见，决定改完再投。有人说"没关系，我们改"，让你心情好了一点。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
        ],
      },
      {
        id: 'analyze_reviews',
        text: '不管结果，先分析审稿意见',
        outcomes: [{
          weight: 1,
          narrative: '不管接受还是拒稿，你带团队认真分析了每条意见。接受就改进，拒绝就找方向。最有成长的处理方式。',
          effects: [
            { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            { type: 'allStudents', stat: 'favor', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

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
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
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
          effects: [
            { type: 'lab', stat: 'energy', delta: 15 },
          ],
          nextEventIds: ['grant_result'],
        }],
      },
      {
        id: 'skip_this_year',
        text: '今年先不投了',
        outcomes: [{
          weight: 1,
          narrative: '今年先放弃，安心做科研。消息传出去，有些同事觉得可惜，但也有人理解。明年再战，手里先把成果积累好。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 30 },
          ],
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
    options: [
      {
        id: 'share_result',
        text: '跟学生分享结果',
        outcomes: [
          {
            weight: 2,
            narrative: '中了！24万直接打进账户。你把消息发进群，大家发了一大串庆祝表情。经费保障了，人人松了口气。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 24 },
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '没中。你淡定地发进群："没过，明年继续。" 有人回了"下次一定能中"，让你心情好了一点。',
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
          narrative: '不论结果，你开始规划下一步。中了就用好，没中就总结。科研是长跑，心态要稳。精力小涨。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 10 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

};
