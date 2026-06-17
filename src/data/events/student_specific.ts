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
            narrative: '{studentName}先是愣了一下，然后用力点了点头，把论文抱得紧了一些，仿佛怕你反悔。接下来几个月进展顺利。\n\n答辩那天，你收到一条消息："通过了！谢谢老师！！" 全组一同庆祝，大家都很高兴。',
            effects: [
              { type: 'graduateStudent' },
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 5}
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
            narrative: '{studentName}盯着那本论文看了一会儿，然后若无其事地把它塞回背包，动作缓慢而精确，像在拆弹。"好的老师，那我明年再来。" 语气镇定得有点不对劲，让你心虚地想打开那本论文重新看一遍。',
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
              { type: 'allStudents', stat: 'happiness', delta: 8 },
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
      '{studentName}深吸一口气，开口前停顿了一下。"老师……我最近收到了一个创业 offer。"',
    ],
    prompt: '第三次了。这次你怎么回应？',
    options: [
      {
        id: 'graduate_now_3',
        text: '别去，先把论文答辩完',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}看了你很久，最后叹了口气，把 offer 的邮件关掉了。答辩那天哭了两次——一次是讲到致谢，一次是委员会说"通过"。你送{studentName}走的时候，他们回头说："老师，其实我早就可以毕业了。" 你点了点头，想说什么，最终没说——有些话在那一刻说出来会太重，收着比较好。',
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
              { type: 'lab', stat: 'reputation', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 叶知秋 ────────────────────────────────────────────────────────────────

  // TODO

  // ── 林小卷 ────────────────────────────────────────────────────────────────

  lin_theory_breakthrough: {
    id: 'lin_theory_breakthrough',
    title: '林小卷：理论突破了',
    description: [
      '林小卷发来一份推导笔记，密密麻麻三十页，每一行都是手写，字迹比平时工整，像是在誊正。他在最后一行写了一个"QED"，旁边还画了个小星星。',
      '结论是他卡了将近两个月的收敛性证明——推出来了。你往前翻了翻，第八页有一处他用红笔圈出来的关键步骤，旁边写着三个感叹号。',
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
          narrative: '你把笔记整理成了一篇理论文章的骨架，发给组里讨论。林小卷有点茫然地盯着自己名字出现在论文标题下方，说："老师，这个真的可以投吗？" 你说可以。他愣了一下，然后发出了一种只有推完三十页证明的人才能发出的、非常轻的笑声。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 10 },
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
            narrative: '你叫上叶知秋一起检查，发现了两处细节——一处是符号定义不够严格，一处是引理引用缺了个条件。修正之后，证明更加无懈可击了。林小卷说这是他做过最认真的一件事，叶知秋说"能挑出毛病才是真的读懂了"，两人对视了一眼，达成了某种默契。',
            effects: [
              { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 5 },
              { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '验证过程中发现有一个假设条件没有严格证明，整个推导悬在半空中。林小卷盯着那个地方看了很久，拿起笔在空白处写了几行，划掉，又写，又划掉，然后重新拿出了一张白纸。方向是对的，只是还差最后一步。',
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
      '顾眠眠把你拉到她的工位，打开了一个终端窗口，然后退后了半步，像在给你展示一件作品。',
      '她的分布式训练框架第一次完整地跑通了，四张卡全部满负荷运转，日志刷得飞快，全是绿色的字。她努力保持镇定，但嘴角已经压不住了——嘴角赢了，脸的其他部分还在抵抗。',
    ],
    prompt: '顾眠眠的工程成果完成了，你打算怎么用？',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', op: '>=', value: 85 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'open_source',
        text: '开源出去，积累声望',
        outcomes: [{
          weight: 1,
          narrative: '你们整理了代码、写了README、录了一个三分钟的demo视频，发到了GitHub。两周内拿到了200个star，有人在讨论区说"这个实现比我见过的同类项目都干净"。顾眠眠把那条评论截了图，设成了屏保——她否认了，但你亲眼看见的。随后一家企业发邮件问能否商业授权，最后谈成了一笔小额技术许可费。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 5 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 8 },
            { type: 'lab', stat: 'funding', delta: 2 },
          ],
        }],
      },
      {
        id: 'use_internally',
        text: '先内部推广，全组用起来',
        outcomes: [{
          weight: 1,
          narrative: '你把框架推给了全组，组里训练速度明显提升。顾眠眠被动成为了技术支持，每天被人拉着问配置问题，一开始有点烦，后来发现自己解释起来越来越流畅。她无意间发现了自己有讲明白复杂事物的天赋，这件事让她在心里偷乐了好几天，表面上还是一副"这不是常识吗"的神情。',
          effects: [
            { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'skills.social', delta: 4 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 6 },
          ],
        }],
      },
      {
        id: 'write_system_paper',
        text: '写成系统论文投出去',
        outcomes: [
          {
            weight: 2,
            narrative: '你们把系统设计思路、工程挑战、对比实验写成了一篇系统文章。审稿人说"工程贡献清晰，实验充分，工作扎实"。顾眠眠拿到了她的第一篇一作，消息出来的时候，她在终端里默默多敲了几行空命令，掩盖手抖。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'projectProgress', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '论文被拒了，理由是"缺乏理论贡献"。顾眠眠把审稿意见打印出来贴在显示器旁边，旁边写了一行字："等着看。" 她没有解释这句话的意思，但从那之后开始看理论文章了。',
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
