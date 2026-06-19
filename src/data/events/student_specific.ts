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
    title: '{studentName}的毕业请愿',
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
              { type: 'lab', stat: 'reputation', delta: 10 },
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
            narrative: '{studentName}盯着那本论文看了一会儿，然后若无其事地把它塞回背包，动作缓慢得像在拆弹。"好的老师，那我明年再来。" 语气低沉得有点不对劲，让你心虚地想打开那本论文重新看一遍。',
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
    title: '{studentName}的第二次毕业请愿',
    description: [
      '又是六月。你正在喝咖啡，{studentName}敲了敲门，把一本文档轻轻放在你桌上——和去年那本几乎一模一样，除了封面换成了蓝色。蓝色。',
      '"{studentName}忐忑不安地开口："老师，我给毕设论文加了三章，补了实验，跑了新的 baseline，还把第二章全重写了。这次应该够了吧。"',
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
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'extend_two_years',
        text: '嗯……还差点，再补一年吧',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}把蓝色论文从你桌上拿回去，拍了拍封面，表情复杂地点了点头。"老师，没关系，明年见。" 门带上的一瞬间，你隐约听到走廊里有人用力呼了口气。',
            effects: [
              { type: 'extendGraduation' },
              { type: 'randomStudent', stat: 'favor', delta: -10 },
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  graduation_check_3: {
    id: 'graduation_check_3',
    title: '{studentName}的第三次毕业请愿',
    description: [
      '又是六月。这次{studentName}没有发消息预约——早上九点直接出现在你门口，背着个双肩包，表情很复杂，像是做好了某种准备。',
      '桌上放下的论文比之前厚了整整一倍。封面写着《博士学位论文（终稿·正式版·这次是真的）》。你翻了翻——大概四百页，后三分之一是附录，附录 F 是附录 C 的补充说明，附录 G 是对附录 F 的修订。',
      '{studentName}深吸一口气，开口前停顿了一下。"老师……我的论文已经写好了，最近还刚收到了一个创业 offer，万事俱备，只等毕业就可以开工了。"',
    ],
    prompt: '第三次了。这次你怎么回应？',
    options: [
      {
        id: 'graduate_now_3',
        text: '好好准备答辩吧',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}像一个被长期关在监狱里不见天日的人，突然被提前通知今天有望出狱，连行李都还没收拾好。\n\n答辩那天{studentName}哭了两次——一次是讲到致谢，一次是委员会说"通过"。你送行的时候，{studentName}回头说："老师，我觉得，其实我早就可以毕业了。" 你张了张嘴，想说什么，最终咽了回去。有些话在那一刻说出来太沉重了，收着比较好。',
            effects: [
              { type: 'graduateStudent' },
              { type: 'lab', stat: 'reputation', delta: 2 },
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
            narrative: '话还没说完，{studentName}已经站起来了。"老师，我想清楚了。" 他们把那本四百页的论文留在你桌上，双肩包往肩上一甩，鞠了个躬，转身走了。三周后你收到邮件："{studentName}已正式离组，感谢导师三年培养。"\n\n学校论坛上有人把你的组标在了学院地图上，标注：陈年博士生培养区。',
            effects: [
              { type: 'leaveStudent' },
              { type: 'lab', stat: 'reputation', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -15 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  

};
