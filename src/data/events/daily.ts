/**
 * 日常随机事件 — 每月从池中随机抽取
 *
 * 所有事件放入 dailyEventPool，由 monthlyUpdate 抽取（每月 70% 概率触发一条）。
 * 单次触发后进入"已见"集合，不再重复出现。
 *
 * 规则：这里的事件面向整个实验室，不应 hardcode 特定学生 ID。
 * 需要绑定特定学生的事件请放到 student_specific.ts。
 * 效果优先使用 randomStudent / allStudents。
 */

import type { GameEvent } from '../../types';

export const dailyEvents: Record<string, GameEvent> = {

  gpu_oom: {
    id: 'gpu_oom',
    title: 'CUDA out of memory',
    description: [
      '有位同学端着笔记本走进来，神情介于崩溃和平静之间。屏幕上：RuntimeError: CUDA out of memory. Tried to allocate 2.50 GiB。',
      '"batch size已经是1了。"',
    ],
    prompt: 'GPU又OOM了，你怎么办？',
    options: [
      {
        id: 'apply_gpu',
        text: '申请更多GPU配额（花5万）',
        fundingCost: 5,
        outcomes: [{
          weight: 1,
          narrative: '批了一台新卡，实验终于跑起来了。当晚发来消息：loss在降。你长舒一口气。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
          ],
        }],
      },
      {
        id: 'gradient_accum',
        text: '梯度累积走一个',
        outcomes: [
          {
            weight: 2,
            narrative: '梯度累积一通操作，显存问题解决了，速度稍慢了点，但能跑。同学回去继续调参了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '梯度累积设置错了，loss直接飞上天。同学神情更崩溃了，回来又找你了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'smaller_model',
        text: '先换个小模型跑通',
        outcomes: [{
          weight: 1,
          narrative: '换了个小模型，pipeline通了。虽然性能差点，但至少确认代码没问题，可以开始迁移正式模型了。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 2 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  student_allnighter: {
    id: 'student_allnighter',
    title: '凌晨三点还在群里',
    description: [
      '组会群里有条消息，时间戳是凌晨3:17，附了一张手写公式的截图。"快推出来了，老师看看对不对。"',
      '你打了个哈欠，打开电脑。',
    ],
    prompt: '凌晨三点有人还在推公式，你怎么回应？',
    options: [
      {
        id: 'stay_up_together',
        text: '陪她一起推（消耗精力）',
        energyCost: 20,
        outcomes: [{
          weight: 1,
          narrative: '你们通话到四点半，把公式彻底理清楚了。对方兴奋地说"原来如此"。你第二天上午睡过头，差点误了个会议。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 12 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
          ],
        }],
      },
      {
        id: 'send_home',
        text: '让她先去睡',
        outcomes: [
          {
            weight: 1,
            narrative: '你发消息让她休息，明天再推。对方叹了口气说"好的老师"，关了电脑。第二天思路反而更清晰了，公式顺利解出来。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
            conditions: [{ type: 'anyStudent', stat: 'favor', op: '>=', value: 50 }],
          },
          {
            weight: 1,
            narrative: '你发消息让她先休息。回了个"好的"，没有感叹号。公式最终独自推出来了，但感觉你不太上心。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 3 },
              { type: 'randomStudent', stat: 'favor', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'check_deadline',
        text: '先确认一下ddl',
        outcomes: [{
          weight: 1,
          narrative: '你问了一下timeline，发现其实不急。对方这才松了口气，回去睡了。第二天状态很好，效率高了很多。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  arxiv_scooped: {
    id: 'arxiv_scooped',
    title: 'arxiv撞车了',
    description: [
      '有人发来消息："老师，你看这篇……"',
      '你打开链接：某知名组昨天挂出了一篇arxiv，方法跟你们做的几乎一模一样，比你们早了三个星期。',
    ],
    prompt: '被抢先了，怎么办？',
    options: [
      {
        id: 'differentiate',
        text: '分析差异，找突破口',
        outcomes: [
          {
            weight: 2,
            narrative: '仔细对比后，你们发现自己的方法在某个子任务上有独特优势。换个角度投出去，审稿人说"提供了有价值的新视角"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '差异点找到了，但要做额外实验，工作量增加不少。大家有点疲惫，但代码质量提高了很多。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'concurrent_work',
        text: '发workshop，标注同期工作',
        outcomes: [{
          weight: 1,
          narrative: '发到workshop，注明同期独立完成。圈内人知道你们的工作，声望没有白白浪费。大家感觉工作被承认了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'allStudents', stat: 'happiness', delta: 5 },
          ],
        }],
      },
      {
        id: 'pivot',
        text: '认清现实，换方向',
        outcomes: [{
          weight: 1,
          narrative: '你宣布换方向，组里沉默了一会儿。那几个月的积累算是白费了，但有时候认清现实比死磕有意义。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: -10 },
            { type: 'allStudents', stat: 'favor', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  lab_birthday: {
    id: 'lab_birthday',
    title: '实验室一周年！',
    description: [
      '你突然意识到，实验室成立整整一年了。',
      '有学生做了个ppt回顾这一年，最后一页是全组的合影。',
    ],
    prompt: '一周年纪念，怎么过？',
    options: [
      {
        id: 'party',
        text: '请大家吃顿好的（花2万）',
        fundingCost: 2,
        outcomes: [{
          weight: 1,
          narrative: '烤肉加奶茶，吃了三个小时。大家聊科研聊生活，有人说这是来实验室以来最快乐的一天。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 12 },
            { type: 'allStudents', stat: 'happiness', delta: 15 },
          ],
        }],
      },
      {
        id: 'milestone_review',
        text: '开个总结会，设定新目标',
        outcomes: [{
          weight: 1,
          narrative: '认真开了一次总结会，每个人讲了自己这年最大的收获。大家对毕业都更有信心了。',
          effects: [
            { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            { type: 'allStudents', stat: 'favor', delta: 5 },
          ],
        }],
      },
      {
        id: 'red_packet',
        text: '发个小红包',
        outcomes: [{
          weight: 1,
          narrative: '每人200元红包，意想不到的小惊喜。有人秒抢，发了个大笑emoji。成本低，效果好。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 10 },
            { type: 'allStudents', stat: 'favor', delta: 8 },
            { type: 'lab', stat: 'funding', delta: -1 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  reviewer_two: {
    id: 'reviewer_two',
    title: '审稿人二号来了',
    description: [
      '审稿意见回来了。审稿人一号好评，三号中性。',
      '但审稿人二号写了整整一页，其中一条是："这篇论文的核心假设存在根本性缺陷，作者似乎对该领域最近的工作一无所知。"',
    ],
    prompt: '面对审稿人二号的炮火，你选择：',
    options: [
      {
        id: 'rebuttal_gracious',
        text: '光速滑跪，逐条回应',
        outcomes: [
          {
            weight: 2,
            narrative: '你写了一份礼貌详尽的rebuttal，指出对方误解了你们的方法。审稿人二号最后说"作者的回应解释了大部分问题"，给了个弱接受。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '写了rebuttal，审稿人二号看都没看就维持原分，直接拒了。有时候就是这样。改完换个会吧。',
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
            narrative: '你直接引用文献，有理有据地指出审稿人对你们方法的理解是错的。对方沉默，论文最终过了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
          {
            weight: 2,
            narrative: '语气稍硬，审稿人二号反而更不爽了，加了新意见，论文被拒。有时候fight并不是最优解。',
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
          narrative: '你决定不在这里浪费精力，吸收有用的意见，剩下的归入"审稿人问题"文件夹。改完换个会，换个运气。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 10 },
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  lab_meeting_drama: {
    id: 'lab_meeting_drama',
    title: '组会气氛有点微妙',
    description: [
      '这次组会，有人汇报到一半，另一位同学插了一句指出实验设计的问题。',
      '对方停顿了一下，回了句"我觉得没问题"，语气有点冷。空气凝固了几秒。',
    ],
    prompt: '组会现场尴尬了，你怎么处理？',
    options: [
      {
        id: 'mediate',
        text: '出来打个圆场',
        outcomes: [
          {
            weight: 2,
            narrative: '你接过话题，说两人都有道理，建议会后各自补充实验再讨论。气氛缓和了，两人后来私下道了歉。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你打了个圆场，但后来发现两人还是有点别扭。表面和解，暗流还在。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'let_them_resolve',
        text: '让他们自己讨论清楚',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"你们讨论一下"。两人激烈辩论了十分钟，最后一方承认有个小问题。碰撞出火花，学术进步。',
            effects: [
              { type: 'allStudents', stat: 'skills.theory', delta: 4 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
            conditions: [{ type: 'anyStudent', stat: 'favor', op: '>=', value: 50 }],
          },
          {
            weight: 1,
            narrative: '你说"你们讨论"，但两人都不说话了，陷入冷场。剩下的组会沉默地结束。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -10 },
              { type: 'allStudents', stat: 'favor', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'support_questioner',
        text: '支持提出质疑的同学',
        outcomes: [{
          weight: 1,
          narrative: '你认为质疑有道理，让被质疑的同学好好考虑。对方有点尴尬，但下次实验设计明显更严谨了。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 8 },
            { type: 'allStudents', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  nan_loss: {
    id: 'nan_loss',
    title: 'NaN loss了',
    description: [
      '有人来敲你的门，表情空洞："老师，loss变NaN了。"',
      '日志看了，找不到原因。你深吸一口气。',
    ],
    prompt: 'NaN loss，你的第一反应是：',
    options: [
      {
        id: 'rubber_duck',
        text: '让她讲一遍代码给你听',
        outcomes: [
          {
            weight: 2,
            narrative: '讲到第三段时，对方自己停下来了："啊……学习率太大了。" 橡皮鸭调试，屡试不爽。你没说一句话，问题解决了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '讲完了，你们也没找到。又debug了两个小时，最后是数值溢出。折腾了半天，但总算找到了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'gradient_clip',
        text: '先加个梯度裁剪试试',
        outcomes: [
          {
            weight: 2,
            narrative: 'gradient clipping加上去，训练稳了。不是最优解，但问题解决了，实验继续推进。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '加了裁剪，loss不NaN了但也不收敛了，变成一条直线。问题更复杂了，得重新排查。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'check_data',
        text: '先查数据有没有inf',
        outcomes: [{
          weight: 1,
          narrative: '果然有几条样本有无穷大的值。清洗数据之后，训练一帆风顺。这种bug最难找但最值得找。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
            { type: 'randomStudent', stat: 'projectProgress', delta: 4 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

};
