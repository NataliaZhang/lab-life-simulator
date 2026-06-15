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

  // ── 毕业确认（所有学生共用，由 monthlyUpdate 在 enrolledAt+3 年6月注入）──────

  graduation_check: {
    id: 'graduation_check',
    title: '{studentName}的毕业请愿（第一次）',
    description: [
      '六月。{studentName}发来一条极其正式的消息："老师，我想预约个时间聊聊毕业的事。" 你回了个"好的"，心里隐约预感到接下来会发生什么。',
      '见面时，{studentName}把一本打印装订好的文档推到你面前——封面上印着《博士学位论文（初稿）》，页脚写着"第一稿·仅供导师审阅"。整体看起来准备得相当充分，装订甚至还用了彩色。',
      '"{studentName}坐直了身体，语气认真得有点像在做组会汇报："老师，我觉得差不多了。按时间线，今年六月可以完成答辩。"',
    ],
    prompt: '第一次毕业请愿，你怎么回应？',
    options: [
      {
        id: 'graduate_now',
        text: '支持，准备答辩吧',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}明显松了口气，用力点头，把论文抱紧了一点。接下来几个月进展顺利。答辩那天，你收到一条消息："通过了！谢谢老师！" 后面跟了七个感叹号。',
            effects: [
              { type: 'graduateStudent' },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'randomStudent', stat: 'favor', delta: 10 },
            ],
          },
        ],
      },
      {
        id: 'extend_one_year',
        text: '论文还可以打磨，再等一年',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}沉默了大约五秒，然后若无其事地把论文塞回背包。"好的老师，那我明年再来。" 语气平静得让你有点不安。',
            effects: [
              { type: 'extendGraduation' },
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  graduation_check_2: {
    id: 'graduation_check_2',
    title: '{studentName}的毕业请愿（第二次）',
    description: [
      '又是六月。你正在喝咖啡，{studentName}敲了敲门，把一本文档轻轻放在你桌上——和去年那本几乎一模一样，除了封面换成了蓝色。蓝色。',
      '"{studentName}用一种过于淡定的表情开口："老师，我加了三章，补了实验，跑了新的 baseline，还把第二章全重写了。这次应该够了。"',
      '你翻到最后一页，看了一眼。页脚还是写着："第一稿·仅供导师审阅"。',
    ],
    prompt: '第二次来请愿了，你怎么说？',
    options: [
      {
        id: 'graduate_now_2',
        text: '好了好了，这次毕业',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}立刻从椅子上站起来，差点把椅子带倒。答辩那天，他们穿了件正式衬衫，领带没系好，但眼睛是亮的。通过了。你去参加了庆功饭，吃到十一点。',
            effects: [
              { type: 'graduateStudent' },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'randomStudent', stat: 'favor', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'extend_two_years',
        text: '嗯……还差点，再补一年',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}把蓝色论文从你桌上拿回去，拍了拍封面，表情复杂地点了点头。"老师，没关系，明年见。" 门带上的一瞬间，你隐约听到走廊里有人用力呼了口气。',
            effects: [
              { type: 'extendGraduation' },
              { type: 'randomStudent', stat: 'favor', delta: -10 },
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  graduation_check_3: {
    id: 'graduation_check_3',
    title: '{studentName}的毕业请愿（最终章）',
    description: [
      '又是六月。这次{studentName}没有发消息预约——早上九点直接出现在你门口，背着个双肩包，表情很复杂，像是做好了某种准备。',
      '桌上放下的论文比之前厚了整整一倍。封面写着《博士学位论文（终稿·第三版·正式版·这次是真的）》。你翻了翻——大概四百页，后三分之一是附录，附录 F 是附录 C 的补充说明，附录 G 是对附录 F 的修订。',
      '{studentName}深吸一口气，开口前停顿了整整三秒。"老师……我最近收到了一个创业 offer。"',
    ],
    prompt: '第三次了。这次你怎么回应？',
    options: [
      {
        id: 'graduate_now_3',
        text: '别去，先把论文答辩完',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}看了你很久，最后叹了口气，把 offer 的邮件关掉了。答辩那天哭了两次——一次是讲到致谢，一次是委员会说"通过"。你送{studentName}走的时候，他们回头说："老师，其实我早就可以毕业了。" 你没说话。',
            effects: [
              { type: 'graduateStudent' },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'extend_three_years',
        text: '那就再延一年……？',
        outcomes: [
          {
            weight: 1,
            narrative: '话还没说完，{studentName}已经站起来了。"老师，我想清楚了。" 他们把那本四百页的论文留在你桌上，双肩包往肩上一甩，鞠了个躬，转身走了。三周后你收到邮件："{studentName}已正式离组，感谢导师三年培养。" 附了一个公司官网链接，用的就是他论文里的那个模型。',
            effects: [
              { type: 'leaveStudent' },
              { type: 'lab', stat: 'reputation', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

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
