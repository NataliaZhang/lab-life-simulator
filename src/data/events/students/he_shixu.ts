/**
 * 贺时序 专属事件
 *
 * 性格核心：礼貌、冷静、执行力强。她不是在管理你——
 * 她只是让你无法反驳地意识到，事情需要按时完成。
 * 触发方式：放入 monthlyEventPool，由 filterTriggerable 决定出队时机。
 */

import type { GameEvent } from '../../../types';

export const heShixuEvents: Record<string, GameEvent> = {

  // ── 1. 第一次见面 ───────────────────────────────────────────────────────────
  hsx_first_meeting: {
    id: 'hsx_first_meeting',
    title: '入组计划书',
    description: [
      '贺时序坐下来，把一份装订好的文件放在桌上。你翻开第一页——里程碑精确到月，每个阶段都有交付标准和验收方式，格式和专业项目管理软件导出的几乎一模一样。',
      '翻到最后一页，有一栏标着"导师确认时间节点"，下面空着，等你填。她翻了翻本子，语气和询问天气一样平静："老师，这一项您现在方便确认吗？填完我帮您同步到共享日历。"',
      '你这才意识到：你是这份计划书里的一个节点。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'hsx_first_meeting_fill',
        text: '乖乖填完（被纳入管控了）',
        outcomes: [
          {
            weight: 1,
            narrative: '你填上时间节点，贺时序立刻在旁边做了标注，合上文件，抬头说："谢谢老师，我会在每个里程碑前三天提醒您。" 你点了点头——然后慢慢意识到，你刚刚在没仔细看细节的情况下，签署了一份包含自己截止日期的合同。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'hsx_first_meeting_flexible',
        text: '不用死扣节点（尝试抵抗）',
        outcomes: [
          {
            weight: 1,
            narrative: '贺时序停顿了一下，翻了翻本子，语气依然平静："老师，我理解科研有不确定性，所以每个节点都预留了两周缓冲，如果需要还可以再加一周。" 她把文件翻到附录。详细的缓冲说明早就在那里了。你的抵抗，她已经预见并提前化解。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 2. 催导师DDL ─────────────────────────────────────────────────────────────
  hsx_ddl_reminder: {
    id: 'hsx_ddl_reminder',
    title: '您上次说这周',
    description: [
      '上周你答应帮贺时序看修改稿，说这周回复。你忘了。',
      '今天消息列表里多了一条，发送时间：上午九点整。"老师，您上次说这周会回复修改意见。这周还有三天，如果方便可以先给方向性建议，细节之后补。"',
      '没有一个催促的字眼。信息密度堪比精确制导。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
      { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', op: '>=', value: 5 },
    ],
    options: [
      {
        id: 'hsx_ddl_read_now',
        text: '立刻放下手头，今天就回',
        outcomes: [
          {
            weight: 1,
            narrative: '你把稿子翻出来，两小时后发去了详细意见。她回复："收到，谢谢。" 第二天早上修改版到了，改动清单整理得一目了然，每条意见后面附有对应位置。你给她发了催稿，结果是你帮她完成了她自己的节点。精准。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', delta: 3 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'hsx_ddl_delay',
        text: '协商延期',
        outcomes: [
          {
            weight: 1,
            narrative: '你解释说最近有事，下周给。她回复："好的，我在下周一日历上标注了一下，方便的话那天给我就行。" 你打开共享日历，下周一的格子里已经多了一条"导师修改稿反馈"，标注是她加的。你默默把那天的其他事情挪了一下。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: -2 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 3. 甘特图降临 ───────────────────────────────────────────────────────────
  hsx_gantt_chart: {
    id: 'hsx_gantt_chart',
    title: '甘特图',
    description: [
      '你在组会后随口问贺时序最近进度怎么样，她说"我发给您看一下"。',
      '你以为会收到一段文字。你收到了一张图：时间轴精确到天，颜色分区标注任务类型，完成部分实心色块，待完成虚线框，每个任务条末端标注交付物。',
      '图里有一个专门的色块，标注文字："导师审阅窗口"，定期出现，每次两到三天。她为你的反馈时间，建了一个专属任务条。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'hsx_gantt_accept',
        text: '承认这玩意儿确实好用',
        outcomes: [
          {
            weight: 1,
            narrative: '你回复夸赞说图做得很清楚。她翻了翻本子说："那下次我把您的窗口期固定成时间段，比较容易规划。" 你想说不用这么正式，但话到嘴边说了"好"。就这样，你的反馈时间被正式写进了她的项目管理系统。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'hsx_gantt_too_detailed',
        text: '不用搞这么细',
        outcomes: [
          {
            weight: 1,
            narrative: '她停顿了一下，回答："老师，这个图主要是方便我自己，任务堆积时可以快速判断哪个能延、哪个不能延。" 她翻了翻本子，补了一句："您的窗口期我可以标得宽松一点，不影响您。" 你没再说什么。这个理由，无法反驳。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: -5 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 4. 接管实验室日程 ────────────────────────────────────────────────────────
  hsx_takes_over: {
    id: 'hsx_takes_over',
    title: '实验室共享日历',
    description: [
      '你打开实验室共享日历，发现这个月多了很多条目：每个学生的组会汇报时间，每周仪器预约窗口，还有一条每月固定的"实验室例行维护日"。',
      '你点开一条查看编辑者：贺时序。再点一条：贺时序。包括你的"导师批改窗口"，每周固定两次，每次三小时，备注："如有其他安排请提前告知，我会调整。"',
      '你没有设置这些。她设置的。实验室日程，就这样在你不知情的情况下被整顿了。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'he_shixu', stat: 'favor', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'hsx_takes_over_accept',
        text: '实验室需要你这样的人才',
        outcomes: [
          {
            weight: 1,
            narrative: '你给她发消息说这个很有用，让她继续维护。她回复："好的，我每月初更新一次，有特殊情况随时告诉我。" 此后实验室时间安排效率明显上升。没有人问过"谁负责组会安排"，因为根本不需要问。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'energy', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'hsx_takes_over_discuss',
        text: '民主先行，先开个会商量',
        outcomes: [
          {
            weight: 1,
            narrative: '她翻了翻本子，点头说："好，我来组织一个十分钟的说明会，下周三组会之前。" 你还没说可以，日历里已经多了一条"日程管理说明（10分钟）"，所有人都收到了邀请。那次会后，全组一致通过，还有两人提出了补充建议，贺时序认真记下来，第二天更新完毕。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 5. 完美执行 ─────────────────────────────────────────────────────────────
  hsx_perfect_execution: {
    id: 'hsx_perfect_execution',
    title: '准时，超预期',
    description: [
      '你发现一件事：贺时序的任务从来不超时，交付物从来比预期完整。起初以为是巧合，后来认清了——这是体制。',
      '更诡异的是：你开始不自觉地先看她的进度，再据此调整对其他人的预期。她在推进，说明方向可行；她标了风险，说明那个风险十有八九是真的。',
      '你意识到，她已经成了你判断项目状态的活仪表盘——但你从来没告诉过她。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', op: '>=', value: 35 },
    ],
    options: [
      {
        id: 'hsx_execution_tell_her',
        text: '直说：你是实验室的定海神针',
        outcomes: [
          {
            weight: 1,
            narrative: '她停顿了一下，翻了翻本子，抬头说："谢谢老师，如果有我可以协调的地方请告诉我。" 语气和平时没有任何区别。但你注意到她低头做记录时多写了一行，字很小，你没能看清楚写的是什么。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 7 },
            ],
          },
        ],
      },
      {
        id: 'hsx_execution_challenge',
        text: '加码：给她一个难一倍的任务，测测上限',
        outcomes: [
          {
            weight: 1,
            narrative: '你提出了一个复杂约一倍的方向。她听完，翻了翻本子，沉默了整整两秒，然后说："可以，我先做一个可行性评估，下周三给您。需要把不确定因素也列出来吗？" 你说需要。她把本子合上，说了个"好"，然后开始工作了。两秒钟就是她的全部犹豫。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.theory', delta: 3 },
              { type: 'student', studentId: 'he_shixu', stat: 'projectProgress', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 6. 反向催稿 ─────────────────────────────────────────────────────────────
  hsx_reverse_push: {
    id: 'hsx_reverse_push',
    title: '推荐信框架',
    description: [
      '贺时序要投奖学金，需要你写推荐信，截止日期三周后。你心里记着，但没开始写。',
      '今天她发来一条消息："老师，推荐信三周后截止。我已经帮您起草了一个框架，列了几个可以展开的具体事例，您只需要填细节和签名，预计花您三十分钟。需要的话我发给您。"',
      '她没有在催你。她是在帮你消灭了所有拖延的借口。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'he_shixu', stat: 'favor', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'hsx_reverse_push_accept',
        text: '接受框架（感谢被安排）',
        outcomes: [
          {
            weight: 1,
            narrative: '文件到了，格式整洁，留白标注清晰，事例叙述角度选得准确。你花了二十五分钟填完，比她估的还短。发出去之后你给她发了句"写完了"，她回了个"谢谢老师"。你坐在椅子上想了一会儿——你帮了她，但她帮了你更多。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'hsx_reverse_push_self_write',
        text: '自己写，让她把材料发过来就行',
        outcomes: [
          {
            weight: 1,
            narrative: '她停顿了一下，说："好的，我把材料整理好发您，需要框架随时说。" 第二天她发来一份非常完整的材料包：项目列表、发表记录、自述提纲，全部带引用格式。你照着写了一封，写完发现结构和她的框架大差不差。她只是换了一种方式让你得到了同样的结果。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 7. 无法忍受混乱 ──────────────────────────────────────────────────────────
  hsx_chaos_intolerance: {
    id: 'hsx_chaos_intolerance',
    title: '实验室运营问题清单',
    description: [
      '最近实验室状态不太好，有人在等数据，有人在等反馈，有人不知道自己的任务优先级是什么。你也一直在处理各种临时情况，能量已经透支。',
      '贺时序来找你谈，坐下来，把一份文件放在桌上："老师，我整理了一份当前实验室运营的问题清单，您有时间看一下吗？"',
      '你翻开第一页，第一条："导师能量值可能不足（建议：减少临时事务，固定深度工作时间）"。后面还有六条。你是清单的第一项。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'lab', stat: 'energy', op: '<=', value: 35 },
    ],
    options: [
      {
        id: 'hsx_chaos_read',
        text: '认真看完，一起讨论怎么改',
        outcomes: [
          {
            weight: 1,
            narrative: '七条，条条说到点上，每条后面附了建议措施。你和她讨论了一会儿，定了三件可以马上改的事。她一边记笔记一边说："我这周帮您盯着，下周看看有没有改善。" 你点头，然后意识到：有人帮你把问题列成清单，本身就已经是最省力的帮助。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 10 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'hsx_chaos_dismiss',
        text: '谢谢好意，但这是管理层的事',
        outcomes: [
          {
            weight: 1,
            narrative: '她停顿了一下，平静地说："老师，我整理这个主要是想让自己的工作推进更顺畅，不是要给您加负担。如果觉得不合适，我可以只保留跟我直接相关的部分。" 她把文件收了回去。你坐在那里，慢慢回想她刚才说的那几条——其中两条你其实应该早点处理。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 2 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: -4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 8. 担心你加班 ────────────────────────────────────────────────────────────
  hsx_overtime_concern: {
    id: 'hsx_overtime_concern',
    title: '便利贴',
    description: [
      '你已经连续几天很晚才离开，有时是在写东西，有时是各种突发情况堆在一起。',
      '昨天傍晚贺时序离开的时候，你还在工位上。今天早上你到办公室，门上贴了一张便利贴，字很工整，蓝色字迹：',
      '"老师，可持续的工作节奏比短期冲刺的长期产出更高——这不是我说的，这是元分析论文的结论，需要的话我可以发给您DOI。希望您注意休息。——贺时序"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'he_shixu', stat: 'favor', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'hsx_overtime_moved',
        text: '被整破防了，发消息谢谢她',
        outcomes: [
          {
            weight: 1,
            narrative: '你给她发消息："谢谢你，便利贴看到了。" 她回复："DOI需要的话发给您，那篇文章数据挺扎实的。" 你笑了一下，把那张便利贴折好放进抽屉。当天下午你六点离开了——这一周最早的一次。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'hsx_overtime_soon_over',
        text: '解释：特殊情况，再熬两周',
        outcomes: [
          {
            weight: 1,
            narrative: '你说最近有个项目收尾，两周后就好了。她回复："好，我把下周您的导师审阅窗口推到后周，给您留出空间。" 你打开日历，相关条目已经移动好了，备注写着"待恢复"。你没说不用，因为你确实感谢这点喘息。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 9. 效率怪物 ─────────────────────────────────────────────────────────────
  hsx_high_efficiency: {
    id: 'hsx_high_efficiency',
    title: 'Pipeline优化报告',
    description: [
      '你收到贺时序的邮件，主题："实验pipeline优化说明（附基准测试）"，发送时间：昨天下午四点。',
      '她发现了一个可以减少三分之一运行时间的优化方案，用了一个下午完成修改和验证。邮件附了改动前后的基准测试对比，测试环境相同，样本量足够，结论清晰。',
      '优化后每次实验省将近两小时。她只用了半天，没有打扰任何人，然后发了封邮件告诉你。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'he_shixu', stat: 'skills.engineering', op: '>=', value: 60 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'hsx_efficiency_share',
        text: '全组通报表扬，推广这个方案',
        outcomes: [
          {
            weight: 1,
            narrative: '你在组群里分享了优化方案，注明是贺时序做的，附上了她的基准测试报告。当天就有两个人更新了自己的pipeline。有人私下问她技术细节，她一一回答，简洁准确。你注意到她在群里没说多余的话，只在必要时回复——事做完了，功领了，话不多说。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'projectProgress', delta: 1 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'hsx_efficiency_doc',
        text: '让她整理成技术文档，留给后人',
        outcomes: [
          {
            weight: 1,
            narrative: '她翻了翻本子："可以，下周补完，包括适用条件和注意事项。" 一周后文档来了，结构清晰，还列出了三种常见失效场景和对应处理方式。你把文档放进实验室知识库，脑子里闪过一个念头：这份文档可能会用比她在实验室的时间长得多。',
            effects: [
              { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'he_shixu', stat: 'skills.engineering', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 10. 毕业回访 ─────────────────────────────────────────────────────────────
  // 🎓 建议引擎在 graduation 后约 6 个月注入
  hsx_alumni_visit: {
    id: 'hsx_alumni_visit',
    title: '工业界混乱程度：1.7倍',
    triggerConditions: [{ type: 'studentStatus', studentId: 'he_shixu', status: 'graduated' }],
    description: [
      '毕业半年后，贺时序发来一封邮件，主题："第一个项目收尾报告（参考用）"。',
      '她去了一家科技公司做项目管理，第一个项目刚刚顺利交付，团队交付周期比部门平均值缩短了40%。邮件附了一份简化版复盘报告，说最后一段有参考价值。',
      '你翻到最后：她对比了实验室和工业界的项目管理，结论是"工业界的系统性混乱程度大约是实验室的1.7倍，但干预手段基本可以复用"。最后一行："顺便，我们公司有一个和高校合作的项目，联系方式在附件，您感兴趣的话看一下。"',
    ],
    prompt: '你选择：',
    options: [
      {
        id: 'hsx_alumni_collaborate',
        text: '回邮件，合作我感兴趣',
        outcomes: [
          {
            weight: 1,
            narrative: '你说很感兴趣，让她发详细信息。她当天就回了，合作项目说明文件格式完整，联系方式、时间节点、预期产出一清二楚。你看着这份文件，想起她在实验室那几年，想起她到哪里，好像都在做同样的事：让她周围的人不得不有条理。合作后来真的推进了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'lab', stat: 'funding', delta: 12 },
            ],
          },
        ],
      },
      {
        id: 'hsx_alumni_reply_congrats',
        text: '先恭喜她，问问她近况',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了封轻松的回信，恭喜她交付顺利，问她适应得怎么样。她回复："还行，主要是开会比较多，需要额外维护一张会议效率追踪表。" 然后附了一句："实验室那个共享日历系统还在用吗？新同学不会用可以让他们联系我。" 你看了看日历，那套系统现在还在运行，好好的。你有点想告诉她，但又觉得她其实早就知道了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

};
