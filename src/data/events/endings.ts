/**
 * 结局事件
 *
 * 分为两类：
 *
 * 1. 特殊结局 — 随时触发，由 monthlyUpdate.checkSpecialEnding() 注入队列顶端
 *    - ending_funding_crisis   : 资金归零
 *    - ending_all_students_left: 全员离组
 *    部分 outcome 通过 phaseChange 字段触发 phase 变更，也有 outcome 使游戏继续。
 *
 * 2. 时间耗尽结局 — 第6年12月结束后，由 monthlyUpdate 按条件选择一个注入
 *    - ending_time_great   : 声望≥50 且 已毕业学生≥1
 *    - ending_time_steady  : 声望≥25 或 已毕业学生≥1
 *    - ending_time_struggle: 其余情况
 *    所有 outcome 均设 phaseChange: 'won'。
 *
 * 触发前，monthlyUpdate 会先向 storyLog 写入一条汇总系统日志，
 * 列出学生的最终属性和实验室状态，让玩家看到六年成果。
 */

import type { GameEvent } from '../../types';

export const endingEvents: Record<string, GameEvent> = {

  // ── 特殊结局：随时触发 ────────────────────────────────────────────────────

  ending_funding_crisis: {
    id: 'ending_funding_crisis',
    title: '经费耗尽',
    tagline: '若干年后，有人的致谢里还会提到这里。',
    description: [
      '账户余额归零。不是比喻——银行账户上真的是0.00万元。',
      '学院财务办公室发来了一封措辞客气但含义明确的邮件，询问实验室"后续运营规划"。你盯着这行字看了很久。',
      '你想起最初拿到第一笔启动资金时的感觉。那时候觉得够用好久。',
    ],
    prompt: '经费告急，最后一搏：',
    options: [
      {
        id: 'emergency_loan',
        text: '向学院申请应急垫付',
        outcomes: [
          {
            weight: 2,
            narrative: '学院网开一面，批了5万周转资金，条件是三个月内提交基金申请。你争取到了最后一次机会——能不能活下去，就看这三个月了。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '学院表示爱莫能助。没有经费，实验室无法维持运转。你通知了每一位学生，帮他们联系了接收导师。最后一天，办公室收拾到很晚。',
            effects: [
              { type: 'allStudents', stat: 'favor', delta: 5 },
            ],
            phaseChange: 'gameover',
          },
        ],
      },
      {
        id: 'accept_closure',
        text: '接受现实，有序关闭实验室',
        outcomes: [{
          weight: 1,
          narrative: '你给每位学生安排了转接，联系了信任的老师接收他们。关门前最后一顿饭，你没有说太多话，只是把杯子举起来。有些结局，有尊严地结束，也是一种体面。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 15 },
          ],
          phaseChange: 'gameover',
        }],
      },
    ],
    tags: ['ending'],
  },

  ending_all_students_left: {
    id: 'ending_all_students_left',
    title: '实验室空了',
    tagline: '组会还没结束。只是今天没有人来。',
    description: [
      '最后一位学生也走了。',
      '实验室里只剩下你。白板上还留着上次组会的板书，没有人擦掉它——因为没有下次组会了。',
      '你坐在工位前，屏幕亮着，上面是一个没有人继续的实验。你盯着它看了很久。',
    ],
    prompt: '一个人的实验室，你选择：',
    options: [
      {
        id: 'rebuild',
        text: '重新发布招募，从头再来',
        outcomes: [{
          weight: 1,
          narrative: '你发了招募通知，两个月后来了一位新生。他不知道这个实验室曾经发生过什么，只看到一位导师认真地讲研究方向。有些东西，不需要说出来。他留下来了。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 20 },
            { type: 'lab', stat: 'reputation', delta: 5 },
          ],
          phaseChange: 'won',
        }],
      },
      {
        id: 'solo',
        text: '一个人先继续，等待缘分',
        outcomes: [{
          weight: 1,
          narrative: '你决定独立写完积累已久的想法。没有组会打扰，没有进度汇报，你在三个月内完成了一篇意外扎实的理论文章。有时候安静也是一种资源。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 12 },
          ],
          phaseChange: 'won',
        }],
      },
    ],
    tags: ['ending'],
  },

  // ── 时间耗尽结局：第6年7月触发，由引擎按条件选择 ─────────────────────

  ending_time_great: {
    id: 'ending_time_great',
    title: '终身教职评审',
    tagline: '你的学生，已经开始指导他们自己的学生了。',
    description: [
      '第六年七月，tenure评审周到来。你整理好六年的材料——学生的毕业名单、论文列表、合作记录、声誉积累的每一条痕迹——装进一个文件夹，穿上那件只在面试和答辩时穿过的正装，走进系馆四楼的会议室。',
      '四十分钟的陈述，你没有冷场一次。委员会七位成员，有人频频点头，有人认真做笔记，坐在左侧角落的王教授翻你的发表记录翻了整整三遍，但全程没有提出任何质疑——你知道这是好兆头。有人问起你带过的学生现在在哪里，你一一说出了他们的去向，说到其中一位正在另一所学校建自己的实验室，王教授抬起头来，第一次看了你一眼，嘴角动了动。',
      '"请在外面等候。" 你走出去，在走廊的椅子上坐下来，旁边是那台坏了一半按键的饮水机。走廊很安静，隐约能听见会议室里低沉的讨论声。你数着时间——五分钟，十分钟，十八分钟。你没有拿出手机，因为手里拿着它也没用。',
      '第二十一分钟，门开了。系主任站在门口，表情平和，伸出手来。\n"恭喜。委员会一致通过。"',
      '你握了握他的手，说了声谢谢。走廊的灯光没变，饮水机还在滴水，一切都和二十一分钟前一样。只是有什么东西，落定了。',
    ],
    prompt: '六年，你怎么看待这段旅程？',
    options: [
      {
        id: 'reflect_proud',
        text: '"值了。"',
        outcomes: [{
          weight: 1,
          narrative: '你没有大声说出来，只是在心里把这两个字默念了一遍。然后打开新文档，开始写下一个问题。科研这件事，似乎永远不会真正"结束"。',
          phaseChange: 'won',
        }],
      },
      {
        id: 'reflect_humble',
        text: '"六年，才把问题想清楚了一点。"',
        outcomes: [{
          weight: 1,
          narrative: '你翻了翻六年前的笔记本，发现当时提出的问题，一半还没有答案。但你不再觉得这是焦虑的来源了——而是觉得，还有很多可以做。',
          phaseChange: 'won',
        }],
      },
    ],
    tags: ['ending'],
  },

  ending_time_steady: {
    id: 'ending_time_steady',
    title: '终身教职评审',
    tagline: '那两票投了什么，永远不会知道了。但通过了。',
    description: [
      '第六年七月，tenure评审周到来。你把材料整理好，第三次检查了幻灯片，发现第七页有个错别字，改掉，深呼吸，走进会议室。',
      '陈述进行到一半，那位以提问严苛著称的王教授举手打断："你的毕业生就业去向能具体说说吗？" 你说了，他点了点头，表情没有变化。另一位委员翻到你的发表记录的某一页，用铅笔在旁边画了什么——你看不清，只能继续往下讲。结束时有人问："学生规模为什么没有扩大？" 你如实回答了，说了经费、说了对质量的取舍。没有人追问，但你也说不清这是不是好事。',
      '"请在外面等候。" 走廊的椅子比想象中硬。等了十分钟，又等了十分钟，又是十分钟。你掏出手机看了五次，又把手机扣过去。会议室里的声音听不清楚，只有一次有人的语调明显升高，然后又压下去了。等到第三十八分钟，你开始在心里打腹稿，想好了如果结果不理想该怎么应对。',
      '门打开，系主任走出来，停顿了一下——就那一秒，你的心跳漏了一拍——然后说："委员会经过讨论，批准了你的tenure申请。三比二。"',
      '三比二。你点了点头，说了声谢谢。走回办公室的路上，你一直在想那两票投了什么，为什么，有没有可能不一样。想了很久，最后决定算了。通过了就是通过了。',
    ],
    prompt: '六年，你怎么看待这段旅程？',
    options: [
      {
        id: 'reflect_steady',
        text: '"踏实比聪明更管用。"',
        outcomes: [{
          weight: 1,
          narrative: '你相信这句话。不是因为你不够聪明，而是因为这六年里见过太多聪明人因为各种原因没能坚持下去。你坚持下来了，这就是一种答案。',
          phaseChange: 'won',
        }],
      },
      {
        id: 'reflect_mixed',
        text: '"有遗憾，但不后悔。"',
        outcomes: [{
          weight: 1,
          narrative: '有几件事你知道做得不够好。但如果重来一次，你大概还是会做差不多的选择——因为那些选择在当时都是认真做出来的。这就够了。',
          phaseChange: 'won',
        }],
      },
    ],
    tags: ['ending'],
  },

  ending_time_struggle: {
    id: 'ending_time_struggle',
    title: '终身教职评审',
    tagline: '该怕的都想过了。然后通过了。',
    description: [
      '第六年七月，tenure评审周到来。你把材料整理好，盯着幻灯片看了很久，发现第一页的学生毕业数量在那里，经费曲线在那里，声誉积累的折线图在那里——不算好看，但都是真实发生过的事。你把正装从衣柜里翻出来，发现袖口有道折痕，熨了半小时，走进了会议室。',
      '气氛比你想象的更沉。委员会的问题一个接一个：发表数量为什么不够？学生流失是什么原因？经费这么紧张，后续怎么规划？你答了能答的，有两个问题你只说了"这方面确实做得不足"，然后停下来，等着，没有补充。王教授把你的发表记录翻了又翻，没有画问号，也没有点头，只是看。你不知道这代表什么。陈述结束时没有掌声，只有人在本子上写了什么。',
      '"请在外面等候。" 走廊的椅子很硬，饮水机滴滴答答地漏水。等了二十分钟，又是二十分钟。走廊里偶尔有路过的博士生，看见你，眼神往别处移，快步走了。你曾经起身想去倒杯水，但担心错过通知，又坐回去。第四十七分钟，你已经把能想的坏结果都想了一遍，反而有点想笑——该怕的已经想过了，不如让它来。',
      '门终于开了。系主任走出来，脸上的表情你读不懂，停顿了整整三秒，然后开口："我们讨论了很久……" 又停了一下。\n"委员会决定，批准你的tenure申请。但建议你明年提交一份工作改进计划。"',
      '你说了声谢谢，握了握他的手。走回办公室，脱下正装，挂回衣柜。窗外是七月的校园，学生在草地上坐着，一切正常。你坐下来，开了一个新的文档，什么都还没有写。',
    ],
    prompt: '六年，你怎么看待这段旅程？',
    options: [
      {
        id: 'reflect_survived',
        text: '"活下来就是胜利。"',
        outcomes: [{
          weight: 1,
          narrative: '这句话听起来很悲观，但你说这话的时候带着某种理直气壮。你见过有人撑不住提前离开这个行业。你还在这里——这不是失败，这是坚持。',
          phaseChange: 'won',
        }],
      },
      {
        id: 'reflect_lessons',
        text: '"学到的最重要的事，一条都不在论文里。"',
        outcomes: [{
          weight: 1,
          narrative: '六年里你学到的，不全是科研。你学到了什么样的压力会摧毁人，什么样的关系值得守护，什么样的工作让你不后悔花时间。这些课，不在任何论文里。',
          phaseChange: 'won',
        }],
      },
    ],
    tags: ['ending'],
  },

};

// 特殊结局：随时可能触发，monthlyUpdate 每月检查
export const specialEndingIds: string[] = [
  'ending_funding_crisis',
  'ending_all_students_left',
];

// 时间耗尽结局：按条件由引擎在游戏结束时选择一个
export const timeEndingIds: string[] = [
  'ending_time_great',
  'ending_time_steady',
  'ending_time_struggle',
];

export const endingEventIds: string[] = [...specialEndingIds, ...timeEndingIds];
