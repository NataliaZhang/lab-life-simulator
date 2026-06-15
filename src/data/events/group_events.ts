/**
 * 全组事件 — 含"全组"/"大家"等集体语言的事件
 *
 * 触发条件：全部要求 minStudentCount: 3
 * 这里的事件才可以用"全组"、"大家"、"所有人"等集体描述。
 * 单学生版本的类似事件在 mainline.ts 或 daily.ts。
 */

import type { GameEvent } from '../../types';

const REQUIRE_GROUP = [{ type: 'minStudentCount' as const, value: 3 }];

export const groupEvents: Record<string, GameEvent> = {

  // ── 全组会议冲刺（对应 mainline 的 conference_ddl，≥3人版）────────────────

  group_conference_ddl: {
    id: 'group_conference_ddl',
    title: '顶会截止日前三天',
    description: [
      '距ICML截止还有72小时。',
      '整个组都进入了备战状态：有人在跑实验，有人在写论文，有人在盯着loss曲线发呆。',
      '接下来怎么冲，取决于你。',
    ],
    prompt: '最后冲刺，你的策略是？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'lead_charge',
        text: '亲自带头，全组一起冲（消耗精力）',
        energyCost: 35,
        outcomes: [
          {
            weight: 2,
            narrative: '你们连轴三天，最后十分钟提交成功。群里炸了，有人截图、有人发emoji、有人说"感觉这辈子都不用睡觉了"。这种感觉，值得。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
            nextEventIds: ['group_submission_result'],
          },
          {
            weight: 1,
            narrative: '三天没睡，实验结果不理想，勉强投出去了。全组都很疲惫，群里两天都没什么人说话。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -12 },
            ],
            nextEventIds: ['group_submission_result'],
          },
        ],
      },
      {
        id: 'split_tasks',
        text: '分工明确，各司其职',
        outcomes: [
          {
            weight: 2,
            narrative: '你把任务清晰分配下去，每个人负责一个模块。大家心里有数，效率出奇地高。论文提交时完成度超出预期。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
            nextEventIds: ['group_submission_result'],
          },
          {
            weight: 1,
            narrative: '任务分了，但有几个模块没人认领，最后质量参差不齐。论文提交了，但你心里不太踏实。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'favor', delta: -3 },
            ],
            nextEventIds: ['group_submission_result'],
          },
        ],
      },
      {
        id: 'postpone',
        text: '这次不投了，下次再来',
        outcomes: [{
          weight: 1,
          narrative: '你在群里发通知，决定撤稿。大家先是各自盯着屏幕消化了一下，然后有人发"理解，下次一定"，另一个人加了个点赞，气氛意外地缓和——大家都是读博的，这种事不用多解释。',
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

  group_submission_result: {
    id: 'group_submission_result',
    title: '投稿结果出来了',
    description: [
      '几个月过去了，系统邮件终于来了。',
      '你屏住呼吸点开……',
    ],
    prompt: '结果出来了，你怎么面对全组？',
    // 链式事件，继承 group_conference_ddl 的触发条件（≥3人）
    options: [
      {
        id: 'celebrate_accept',
        text: '中了就庆祝，没中就全组复盘',
        outcomes: [
          {
            weight: 2,
            narrative: '中了！群里瞬间炸了——有人截图发朋友圈，有人在更新简历，有人已经在想下一篇。你请全组吃了顿好的，聊到快十二点。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'happiness', delta: 18 },
              { type: 'allStudents', stat: 'favor', delta: 6 },
              { type: 'lab', stat: 'funding', delta: -2 },
            ],
          },
          {
            weight: 1,
            narrative: 'Rejected。你组织了一次复盘，大家一条一条看审稿意见。气氛有点沉，但你感觉到这个组在磨合中变得更紧密了一些。',
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
        text: '不管结果，先全组分析审稿意见',
        outcomes: [{
          weight: 1,
          narrative: '你组织全组认真读每条意见，各自讲理解，各自提改进方向。有两个人激烈讨论了起来——这正是你想要的。',
          effects: [
            { type: 'allStudents', stat: 'skills.theory', delta: 4 },
            { type: 'allStudents', stat: 'favor', delta: 4 },
          ],
        }],
      },
    ],
    tags: ['chain'],
  },

  // ── arxiv撞车（涉及"大家""组里"，≥3人） ──────────────────────────────────

  arxiv_scooped: {
    id: 'arxiv_scooped',
    title: 'arxiv撞车了',
    description: [
      '你收到了一条消息："老师，你看这篇……"',
      '你打开链接：某知名组昨天挂出了一篇arxiv，方法跟你们做的几乎一模一样，比你们早了三个星期。',
    ],
    prompt: '被抢先了，怎么办？',
    triggerConditions: REQUIRE_GROUP,
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

  // ── 全组庆典（≥3人） ──────────────────────────────────────────────────────

  group_celebration: {
    id: 'group_celebration',
    title: '难得的全组聚会',
    description: [
      '不知道是谁提议的，大家一致同意出去玩一天。',
      '日历一查，居然已经好几个月没有全组一起出去过了。科研真的太能吃人了。',
    ],
    prompt: '全组活动，你提议去哪里？',
    triggerConditions: REQUIRE_GROUP,
    options: [
      {
        id: 'escape_room',
        text: '密室逃脱（解谜派PI上线）',
        fundingCost: 1,
        outcomes: [
          {
            weight: 2,
            narrative: '密室里每个人的性格暴露无遗——有人冲在最前面，有人盯着细节，有人在角落独自推理。最后一分钟逃出来，大家都笑得很开心。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 10 },
              { type: 'allStudents', stat: 'happiness', delta: 12 },
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '密室没逃出来，但大家笑话彼此笑到最后。你发现你的学生在压力下的思路跟科研时完全一致——有人是你以为的那样，有人出乎意料。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 10 },
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
          narrative: '三个小时的火锅，从论文聊到未来，从学术界聊到人生规划。有人说了不少平时不会说的话。吃饱喝足，大家都很尽兴。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 12 },
            { type: 'allStudents', stat: 'happiness', delta: 15 },
          ],
        }],
      },
      {
        id: 'hike',
        text: '爬山散心（省钱版）',
        outcomes: [{
          weight: 1,
          narrative: '爬山的时候，有人开始聊很久没聊过的研究想法，有人讲了一个冷笑话让全组停在山腰笑了五分钟。不需要花钱，就是个好日子。',
          effects: [
            { type: 'allStudents', stat: 'happiness', delta: 12 },
            { type: 'allStudents', stat: 'favor', delta: 8 },
            { type: 'lab', stat: 'energy', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

};
