/**
 * 顾眠眠 专属事件
 *
 * 性格核心：睡眠 = 低功耗思考。她从不是在偷懒——
 * 她只是把运算挪到了后台。
 * 触发方式：放入 monthlyEventPool，由 filterTriggerable 决定出队时机。
 */

import type { GameEvent } from '../../../types';

export const guMianmianEvents: Record<string, GameEvent> = {

  // ── 1. 第一次见面 ───────────────────────────────────────────────────────────
  gmm_first_meeting: {
    id: 'gmm_first_meeting',
    title: '顾眠眠的第一印象',
    description: [
      '你去找顾眠眠谈入组计划。她趴在工位上，帽衫帽子盖着整个脑袋，一只手搭在键盘上，显示器亮着，没有任何人类在此存活的迹象。',
      '你轻咳一声。她抬起头，眼神清醒程度让你当场怀疑人生，然后开口第一句话就是："老师是来问框架选型的吧，我觉得 JAX 这里有个坑，你看——" 她翻开自己的笔记本，翻到某页，直接开讲。',
      '你还没开口。你连椅子都没坐下。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'gmm_first_meeting_normal',
        text: '顺着她，假装这很正常',
        outcomes: [
          {
            weight: 1,
            narrative: '你们聊了好一会儿，她对框架的每一个判断都精准得令人发毛。聊完她打了个哈欠，把帽子重新盖回脑袋。"那老师没别的事我继续了。" 你离开的时候还是搞不清楚"继续"是继续工作还是继续睡，或者两件事在她那儿根本是同一件事。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'gmm_first_meeting_ask',
        text: '她究竟是人还是……',
        outcomes: [
          {
            weight: 1,
            narrative: '你问她刚才到底睡着了没有。她认真地想了想，回答："不确定。" 停顿一下，补充："但结论应该是对的。" 然后把帽衫重新盖上，进入下一轮"不确定的状态"。你站在那里，意识到自己连跟进问题都想不出来。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 2. 组会睡着 ─────────────────────────────────────────────────────────────
  gmm_group_meeting_nap: {
    id: 'gmm_group_meeting_nap',
    title: '组会里的后台进程',
    description: [
      '周五组会，汇报到一半。你扫了一眼顾眠眠，她靠在椅背上，眼睛闭着，下巴低了一个危险的角度，笔记本屏幕已经熄屏。周围三个人默契地没有叫她。',
      '汇报结束，全场准备散会。顾眠眠睁开眼，打了个哈欠，抬手说："第十七页那个消融实验，random seed 没 fix，图里的误差棒和正文对不上。"',
      '汇报人翻回第十七页。对不上。全场沉默了一下，沉默到有点超自然。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'gmm_group_meeting_ignore',
        text: '全当做梦，散会',
        outcomes: [
          {
            weight: 1,
            narrative: '走廊里有人小声问你："顾眠眠刚才是睡着了还是……" 你说不知道。对方点了点头，表情跟你一模一样，那种见鬼了又无法举证的表情。顾眠眠已经背包消失了，走得比所有人都快。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'gmm_group_meeting_praise',
        text: '当场封神：组会守护神',
        outcomes: [
          {
            weight: 1,
            narrative: '你说："顾眠眠，观察很仔细。" 她抬头，神情有点茫然，像是刚意识到自己说了话。"哦，" 她点头，"那我走了。" 汇报人已经在重跑实验，脸色不太好看。你心想，这大概是实验室里性价比最高的质量控制手段。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 3. 八卦先知 ─────────────────────────────────────────────────────────────
  gmm_gossip_oracle: {
    id: 'gmm_gossip_oracle',
    title: '她已经知道了',
    description: [
      '你今天早上刚听说一件敏感八卦，某位老师的项目快撑不住了，经费告急。消息是早上才传开的，知情人用手指头数得过来。',
      '下午你碰到顾眠眠，随口问了句"最近有什么动静没"，她打了个哈欠，说："那个项目啊，三个月前经费就有问题了。上个月他们还想来借服务器配额，你知道吧？"',
      '你不知道。你完全不知道。你知道的比她少了至少九十天。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'favor', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'gmm_gossip_ask_source',
        text: '她究竟是人还是……',
        outcomes: [
          {
            weight: 1,
            narrative: '你问她消息从哪来的。她歪头想了想，回答："不知道，可能梦里听说的。" 然后补了一句："服务器配额那边你要注意，他们可能还会来。" 说完她已经在原地眯眼了，站着就能挂起后台进程，当着你的面。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'gmm_gossip_use_intel',
        text: '立刻封她为首席情报官',
        outcomes: [
          {
            weight: 1,
            narrative: '你顺手问她还知道什么。她闭上眼，打了个哈欠，用一种介于梦境和清醒之间的语调，报出了另外两件你不知道的事，附带来源和时间线，准确到令人不安。你站在走廊认真记笔记，隐约觉得自己在采访一个不插电运行的信息系统。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 4. 梦里想到的 ───────────────────────────────────────────────────────────
  gmm_dream_solution: {
    id: 'gmm_dream_solution',
    title: '凌晨三点的绿色日志',
    description: [
      '早上九点，你看到顾眠眠的消息："老师那个 dataloader 死锁，昨晚做梦想到原因了，是 num_workers 和 shared memory 的竞争，我改了一下，你看看。"',
      '附件是终端截图，全绿，loss 曲线正常下降，时间戳凌晨三点二十分。',
      '你看了一眼这个 bug。这玩意儿卡了你们将近两周。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'gmm_dream_shocked',
        text: '梦境驱动开发，合法吗',
        outcomes: [
          {
            weight: 1,
            narrative: '"对，" 她回复，"梦里在跑实验，看到 worker 的 handle 没有正确释放，醒来就改了。" 你盯着这条消息看了好一会儿，最后回了个"……好的谢谢"。她没有继续回复，大概又睡了，把改好的代码留在现实里，人已经回去后台了。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'gmm_dream_record',
        text: '即刻建立睡眠驱动开发论',
        outcomes: [
          {
            weight: 1,
            narrative: '"好主意，" 她说，"我一直是这么用的。" 停顿，补充："不过梦里有时候会改出新 bug，所以醒来还是要跑一下测试。" 你意识到你正在认真讨论梦境 CI/CD 管道，而且这套逻辑完全自洽。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 5. 神秘消失两小时 ──────────────────────────────────────────────────────
  gmm_mystery_nap: {
    id: 'gmm_mystery_nap',
    title: '两小时空白',
    description: [
      '下午两点到四点，顾眠眠人间蒸发。工位空着，外套还挂在椅背上，手机没带走，杯子里的水是热的，一切迹象表明她不久前还存在过。',
      '四点整她推门进来，脸上有一道枕痕，头发乱了一个方向，手里夹着一叠 A4 纸，径直走回工位坐下。',
      '你凑过去看，完整的实验方案分析，有数据，有图，有结论，打印时间戳：15:47。她睡着的时候比你醒着的时候产出多。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'gmm_mystery_ask_where',
        text: '追问：两小时人去哪了',
        outcomes: [
          {
            weight: 1,
            narrative: '"睡了一下，" 她说，然后拿笔改了一处。"在哪睡的？" "走廊尽头有个沙发。" 你想了想，走廊尽头确实有个沙发，你来了这么久，今天才知道有人把它当床用。你回到自己工位，没有继续问了。有些基础设施你了解得还不如她。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 2 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'gmm_mystery_just_report',
        text: '蒸发事件存档，先看报告',
        outcomes: [
          {
            weight: 1,
            narrative: '你把报告拿过来通读了一遍。结构清晰，结论准确，你只改了两个标点。然后把它发给组里，邮件里没有提她这两小时去向不明。有些现象，记录就好，不必解释。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.theory', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 6. 代码审查 ─────────────────────────────────────────────────────────────
  gmm_code_quality: {
    id: 'gmm_code_quality',
    title: '那份没有注释的代码',
    description: [
      '顾眠眠提交了一个 PR。你打开一看：三百行，注释栏只有一行："功能见变量名。"',
      '但变量名确实见功能。`stale_grad_accumulator`、`fence_before_sync`、`shadow_buffer_offset`，每个名字都精确到不需要解释，函数拆分干净，边界条件处理完整，逻辑一眼读到底，像一本没有页码也能翻的书。',
      '提交时间戳：昨天凌晨一点半。昨天上午组会她一直闭着眼睛，你以为她不在状态。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', op: '>=', value: 70 },
    ],
    options: [
      {
        id: 'gmm_code_ask_comments',
        text: '规范第一，给我补注释',
        outcomes: [
          {
            weight: 1,
            narrative: '她回了个"好"，两小时后推了新提交，注释全部补齐，每一条都精准，写法和变量名一个风格。唯一的问题是 `handle_edge_case_7` 下面多出一行："这个情况我梦里见过两次。" 你盯着这行注释想了很久，最后决定保留。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'gmm_code_merge',
        text: '变量名即文档，合了',
        outcomes: [
          {
            weight: 1,
            narrative: '你 approve 了，留言"变量命名很好"。她回"谢谢老师"。其他人看到合并记录，打开代码读了很久，然后在群里发消息："她是什么时候写的这个？" 没有人回答得上来，因为凌晨一点半不是一个大家有印象的时间段。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 7. 帮人调bug ────────────────────────────────────────────────────────────
  gmm_debug_assist: {
    id: 'gmm_debug_assist',
    title: '五秒看图，一分钟出答案',
    description: [
      '一个 bug 卡了三天。日志翻了很多遍，堆栈打印了，复现路径试了好几种，没有任何进展。你拿着电脑去找顾眠眠。',
      '她接过电脑，扫了一眼报错，不过几秒。然后把电脑还给你，闭上眼睛，下巴低了下去，像是切换进了某种内部检索模式。',
      '片刻之后，她睁眼，说出了一个你从未想到的根本原因，精确到具体的调用路径和触发条件，比你自己的理解清楚了三个数量级。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'gu_mianmian', stat: 'favor', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'gmm_debug_thanks',
        text: '道谢，抱着答案去改bug',
        outcomes: [
          {
            weight: 1,
            narrative: '"不客气，" 她说，然后把帽衫帽子拉下来盖住脑袋，工位恢复了无人状态。你去改了 bug，十分钟搞定。你在心里默默感谢了一个此刻不确定是否还清醒的人。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'gmm_debug_how',
        text: '刨根问底：这玄学怎么运作',
        outcomes: [
          {
            weight: 1,
            narrative: '她歪头认真想了想："调用路径里有个 lock 没有 release，这种模式我见过，可能在某个梦里见过。" 你盯着她看了一会儿，然后决定今晚认真睡一觉，把它当作一种学习方法来试试。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.theory', delta: 5 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 8. DDL前神隐 ────────────────────────────────────────────────────────────
  gmm_missing_at_deadline: {
    id: 'gmm_missing_at_deadline',
    title: 'DDL前一天找不到人',
    description: [
      '截止日前一天，顾眠眠人间蒸发。工位空，帽衫不在，手机不在桌上，消息已送达没有回复。你问了一圈，有人说早上见过她，也有人说可能没来过，目击证词无法形成共识。',
      '实验室里弥漫着一种奇特的量子叠加状态：她既可能在实验室，也可能没在，在有人观察之前没有定论。',
      '提交截止前两小时，她推门进来，插上电脑，上传了一个数据包：全组最完整的实验结果，标注整齐，baseline 对比齐全，附一页总结，格式甚至比模板还规范。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'gu_mianmian', stat: 'projectProgress', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'gmm_deadline_ask',
        text: '必须搞清楚她昨天去哪了',
        outcomes: [
          {
            weight: 1,
            narrative: '"在家睡觉，" 她说，"睡了大概十六个小时，中间醒了两次跑了下实验，然后继续睡。" 你消化了一下这套工作流：睡前提交任务，醒来收结果，再睡。你意识到这是一种你从未见过的异步人类。她已经打开下一个文件了。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'gmm_deadline_praise',
        text: '去哪不重要，结果说话',
        outcomes: [
          {
            weight: 1,
            narrative: '你夸了她。"谢谢老师，" 她说，然后趴在桌上，三分钟内完成关机。你拿着那份报告看了很久，数据完整度全组第一。你在心里把"DDL前催顾眠眠"这条提醒永久删除了。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'projectProgress', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 9. 她知道一切 ───────────────────────────────────────────────────────────
  gmm_knows_everything: {
    id: 'gmm_knows_everything',
    title: '你没有告诉任何人',
    description: [
      '上周你和另一位老师私下谈了一次话，内容敏感，在一个无人的会议室，门关着，窗帘拉着，只有你们两个人。',
      '今天中午，顾眠眠在打哈欠，随口说了一句："老师，你跟隔壁组谈的那个仪器共享方案，你怎么看？"',
      '她说出了一个细节。那个细节只在你们当时的对话里出现过。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'favor', op: '>=', value: 70 },
    ],
    options: [
      {
        id: 'gmm_knows_ignore',
        text: '全当做梦，换话题',
        outcomes: [
          {
            weight: 1,
            narrative: '你若无其事地转移了话题，她也没有追问，继续打哈欠。你回到工位后坐了一会儿，在脑子里把那间会议室复盘了一遍，窗帘是拉着的，门是关着的，手机全程没有响过。最终你决定不再深想。有些事情，知道答案比不知道更让人不安。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'gmm_knows_ask',
        text: '必须当面问：她怎么知道的',
        outcomes: [
          {
            weight: 1,
            narrative: '她愣了一下，歪头认真想了想，然后说："我不知道……可能上周在哪儿睡着的时候听到了什么，不确定。" 她自己也搞不清楚信息的来源。你盯着她看了一会儿，决定接受这个答案，因为另一个可能的解释，你不太敢想到底。',
            effects: [
              { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
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
  gmm_alumni_visit: {
    id: 'gmm_alumni_visit',
    title: '凌晨四点的合作邀请',
    triggerConditions: [{ type: 'studentStatus', studentId: 'gu_mianmian', status: 'graduated' }],
    description: [
      '毕业过去半年了。你偶尔在期刊上看到顾眠眠的名字，频率比你预期高，都是第一作者。有人跟你说，她在那个研究院同样以睡觉闻名，组里没有人确定她什么时候是醒的，唯一确定的是，成果会主动出现。',
      '今天早上你打开邮件，看到她发来的一封信，主题是"合作邀请：仪器共享与联合建模方案"。邮件写得完整，有具体方案，有时间节点，有预期产出，CC了三个恰好合适的人。',
      '时间戳是今天凌晨四点零三分。正文最后一句话是："老师，如果方便的话回一下，我不急，我现在可能在睡。"',
    ],
    prompt: '你选择：',
    options: [
      {
        id: 'gmm_alumni_accept',
        text: '回邮件，接受合作',
        outcomes: [
          {
            weight: 1,
            narrative: '你发出回复，抄送相关人员。结果大半天音讯全无，直到傍晚，一份修订后的合作协议草稿出现在收件箱，格式完整，条款清晰，最后附了一行小字：”我睡醒了把方案细化了一下。” \n\n你决定，以后如果有急事找她，不要发”尽快回复”。直接发”睡醒回我”。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 15 },
            ],
          },
        ],
      },
      {
        id: 'gmm_alumni_reply_friendly',
        text: '先问问她近况',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封比较随意的回信，问她近况。她过了好几个小时才回复：”挺好的，目前发了三篇。那边的沙发比咱们走廊那个软多了。老师，我们那个沙发换了没？”\n\n 你去走廊看了一眼，没换，还是那张，只是那个会趴上去睡觉的女孩走了后，已经落了薄薄一层灰。\n\n你发消息说还在，她就回了一个开心的表情，好像知道这个就足够了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },


  gmm_whiteboard_mystery: {
    id: 'gmm_whiteboard_mystery',
    title: '顾眠眠：白板上的字消失了',
    description: [
      '上周你在白板上留了一串推导——实验室里公认"不可删，重要"的那种，旁边还贴了张便签写着"请勿擦"。今天早上你进来，白板干干净净，便签落在地上。',
      '顾眠眠坐在她的工位上，帽子盖着脑袋，周围气氛一如往常。你环顾四周，没有别的嫌疑人。',
      '"眠眠，白板……" 你开口。帽子微微一动，传出一句话："我拍了照片，发给你了，昨晚发现有个地方推错了，帮你改了一下，改完就顺手擦掉了。"',
      '你打开手机，确实有张照片，照片里有完整的推导，还有一段红笔修改，修改是对的。',
    ],
    prompt: '白板被顾眠眠秘密修改了，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'skills.theory', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'gmm_whiteboard_thank',
        text: '谢谢，这修改很好',
        outcomes: [{
          weight: 1,
          narrative: '你说"修改是对的，谢谢。" 帽子动了一下，传来一句"那就好。" 就这样结束了。你站在洁白如初的白板前，意识到某种更高效的协作模式可能在这里自发运行了好一阵子了，而你完全没有察觉。',
          effects: [
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
          ],
        }],
      },
      {
        id: 'gmm_whiteboard_curious',
        text: '等等，这个规律本身挺有意思的',
        outcomes: [{
          weight: 1,
          narrative: '你坐下来问她，这种"写在物理媒介上、被当成暂存空间然后消失"的模式是不是很普遍。顾眠眠从帽子里抬起头，想了一会儿，说"组里白板平均寿命大概三天"，然后拉出一个表格，上面是她无意间统计的白板内容存活时长数据，你当场宣布这应该做成一个研究。',
          effects: [
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 6 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'skills.theory', delta: 4 },
            { type: 'unlockIdea', projectId: 'whiteboard_erasure_theorem' },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  gmm_server_prophecy: {
    id: 'gmm_server_prophecy',
    title: '顾眠眠：服务器宕机，她早知道',
    description: [
      '服务器在下午三点宕机了，正好是你们的实验跑到一半的时候，进度全没了。大家在群里叫苦，运维那边说是未知错误，排查需要几小时。',
      '你去找顾眠眠问她的实验有没有备份。帽衫里传来一句话："我早上备份了。"',
      '"为什么早上备份？"',
      '"感觉今天会宕机。"',
      '你停顿了一下。"……感觉？"',
      '"嗯。CPU风扇响声频率不对，昨天有两次磁盘延迟刺峰，加上今天是周三，历史上周三宕机概率最高。" 帽子轻轻耸了下，"不算玄学，是统计。"',
    ],
    prompt: '顾眠眠用玄学名义讲统计，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'gu_mianmian', stat: 'projectProgress', op: '>=', value: 25 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'gmm_server_relief',
        text: '算你厉害，下次教教我',
        outcomes: [{
          weight: 1,
          narrative: '你说"你这个预感模型很准，下次提前说一声。" 她嗯了一声，第二天组里悄悄多了一条共享文档，里面有一张"宕机风险日历"，注明信息来源和置信区间。没有人知道什么时候创建的，也没有人的工作内容再因宕机丢失过。',
          effects: [
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 5 },
            { type: 'lab', stat: 'energy', delta: 3 },
          ],
        }],
      },
      {
        id: 'gmm_server_formalize',
        text: '这个统计值得研究',
        outcomes: [{
          weight: 1,
          narrative: '你问她能不能把这个判断过程系统化。她从帽衫里抬起头，想了一会儿，说"可以，我之前一直在记。" 她打开一个本地文档，里面是她一年多以来记录的服务器异常信号和宕机时间对照表，数据详尽得离谱。你当场打开项目文档，开始做结构化整理。没过多久，学校机房的老师路过，问你们在研究什么，顾眠眠用三句话解释了一遍，对方沉默了五秒，说："这个能不能给我们用？我们每次宕机都要赔各组实验用电费的。" 顾眠眠从帽衫里抬起头，报了一个服务费，精确到个位数。你和她对视了一下，她已经把帽子拉回去了。',
          effects: [
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 6 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'skills.engineering', delta: 3 },
            { type: 'unlockIdea', projectId: 'server_downtime_oracle' },
            { type: 'lab', stat: 'funding', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

};
