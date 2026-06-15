/**
 * 学生专属事件 — 与特定学生成长轨迹绑定
 *
 * 触发方式：
 *   - 技能里程碑：triggerConditions 检测对应学生技能突破阈值
 *   - 剧情推进：进度达到特定比例后触发（progress 阈值）
 * 放入 monthlyEventPool，由 filterTriggerable 决定是否出队。
 */

import type { GameEvent } from '../../types';

export const studentSpecificEvents: Record<string, GameEvent> = {

  // ── 叶知秋 ────────────────────────────────────────────────────────────────

  thesis_timeline: {
    id: 'thesis_timeline',
    title: '叶知秋的毕业时间线',
    description: [
      '叶知秋敲开你的门，手里拿着一份打印好的甘特图。',
      '她算了一下，按现在的进度可以明年毕业。但如果把某个方向的实验再做一遍，质量更高，要多花半年。她想听你的意见。',
    ],
    prompt: '叶知秋的毕业规划，你怎么建议？',
    options: [
      {
        id: 'push_quality',
        text: '再做半年，追求质量',
        outcomes: [
          {
            weight: 2,
            narrative: '叶知秋补做了实验，论文质量明显提升，最终投了顶刊。她说"谢谢老师当初的建议"，发了朵玫瑰表情。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '叶知秋努力了半年，但实验没带来预期的提升。她有点疲惫，但没有抱怨。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'graduate_on_time',
        text: '按时毕业最重要',
        outcomes: [{
          weight: 1,
          narrative: '你支持她按时毕业，叶知秋明显松了口气。论文工作量合理，质量扎实，她顺利完成了答辩。',
          effects: [
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 10 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 8 },
          ],
        }],
      },
      {
        id: 'let_her_decide',
        text: '你来决定，我支持你',
        outcomes: [{
          weight: 1,
          narrative: '叶知秋想了两天，选择了再做半年。她说她想要高质量的毕业作品。自主决策，她更有动力了。',
          effects: [
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 12 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 8 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 林小卷 ────────────────────────────────────────────────────────────────

  lin_theory_breakthrough: {
    id: 'lin_theory_breakthrough',
    title: '林小卷：理论突破了',
    description: [
      '林小卷发来一份推导笔记，密密麻麻三十页。她在最后一行写了一个"QED"，旁边还画了个小星星。',
      '结论是她之前卡住的收敛性证明——推出来了。',
    ],
    prompt: '林小卷拿下了关键理论证明，你怎么回应？',
    triggerConditions: [
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', op: '>=', value: 85 },
    ],
    options: [
      {
        id: 'celebrate_and_publish',
        text: '整理成论文，赶快投出去',
        outcomes: [{
          weight: 1,
          narrative: '你把笔记整理成了一篇理论文章的框架，推给了组里讨论。林小卷有点受宠若惊，她没想到自己的推导能成为论文核心。这一仗，打得漂亮。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 15 },
            { type: 'lab', stat: 'reputation', delta: 4 },
          ],
        }],
      },
      {
        id: 'verify_carefully',
        text: '先让大家仔细验证一遍',
        outcomes: [
          {
            weight: 2,
            narrative: '你叫上叶知秋一起检查。发现了两处小瑕疵，修正之后结论更扎实了。林小卷说这是她做得最认真的一件事。',
            effects: [
              { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 5 },
              { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '验证发现有一个假设条件没有严格证明，还需要补充工作。林小卷有点沮丧，但方向是对的。',
            effects: [
              { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: -5 },
              { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 顾眠眠 ────────────────────────────────────────────────────────────────

  gu_engineering_milestone: {
    id: 'gu_engineering_milestone',
    title: '顾眠眠：系统真的跑起来了',
    description: [
      '顾眠眠把你拉到她的工位，打开了一个终端窗口。',
      '她的分布式训练框架第一次完整地跑通了，四张卡全部满负荷。她努力保持镇定，但嘴角已经压不住了。',
    ],
    prompt: '顾眠眠的工程成果完成了，你打算怎么用？',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', op: '>=', value: 85 },
    ],
    options: [
      {
        id: 'open_source',
        text: '开源出去，积累声望',
        outcomes: [{
          weight: 1,
          narrative: '你们把代码整理了一下发到了GitHub。两周内拿到了200个star，顾眠眠的名字出现在了一些讨论帖里。她说这是她第一次感觉自己做的东西被世界看见了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 6 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 12 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 10 },
          ],
        }],
      },
      {
        id: 'use_internally',
        text: '先内部推广，全组用起来',
        outcomes: [{
          weight: 1,
          narrative: '你把框架推给了全组，效率提升明显。顾眠眠当起了"技术支持"，意外发现自己还挺擅长讲解代码。',
          effects: [
            { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'skills.social', delta: 6 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 8 },
          ],
        }],
      },
      {
        id: 'write_system_paper',
        text: '写成系统论文投出去',
        outcomes: [
          {
            weight: 2,
            narrative: '你们把系统设计、实验对比写成了一篇系统文章。审稿人说"工程贡献清晰，实验充分"。顾眠眠拿到了第一篇一作。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'projectProgress', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '写成论文投出去，被拒了，理由是"缺乏理论贡献"。顾眠眠有点气，但坚持要改完再投。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: -8 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

};
