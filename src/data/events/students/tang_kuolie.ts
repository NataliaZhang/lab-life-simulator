/**
 * 唐扩列 专属事件
 *
 * 性格核心：真诚的社牛。不算计，就是喜欢认识人。
 * 他的人脉总在意想不到的时候派上用场。
 * 触发方式：放入 monthlyEventPool，由 filterTriggerable 决定出队时机。
 */

import type { GameEvent } from '../../../types';

export const tangKuolieEvents: Record<string, GameEvent> = {

  // ── 1. 第一次见面 ───────────────────────────────────────────────────────────
  tkl_first_meeting: {
    id: 'tkl_first_meeting',
    title: '来都来了，加个好友吧',
    description: [
      '唐扩列来实验室报到的第一天。你去走廊迎他，发现他已经靠在门框上，跟隔壁实验室两个同学聊得有声有色，手机来回换着扫码，像是在现场自发开了个接头会。',
      '进了办公室，你刚想聊研究方向，他掏出手机说："老师，你认识王教授吗？刚才楼道里加了他，他说咱们方向有交集，我帮你拉个三人群？"',
      '他说这话时脸上是百分之百真诚的热情。他完全没意识到，你还没说过一个字关于科研的内容。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'tang_kuolie', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'tkl_first_meeting_focus',
        text: '科研为主，人脉的事之后再说',
        outcomes: [
          {
            weight: 1,
            narrative: '他认真地把手机收起来，掏出笔记本准备记要点。你刚说了两句，他抬起头问："老师你们有没有企业合作渠道？我认识一个大厂研究员，上次活动认识的，方向很像，感觉挺靠谱的。" 你决定一步一步来。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'tkl_first_meeting_group',
        text: '可以，但别因为这个分心',
        outcomes: [
          {
            weight: 1,
            narrative: '他立刻拉了群，三秒后王教授回了条"幸会"。他满意地收起手机，抬起头说："老师你说，我认真听。" 你意识到，刚才那一切对他来说根本不叫分心——只是举手之劳，顺手的事。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'skills.social', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 2. 会议通讯录收割 ────────────────────────────────────────────────────────
  tkl_conference_harvest: {
    id: 'tkl_conference_harvest',
    title: '十七个微信',
    description: [
      '你让唐扩列去参加一个小型学术研讨会，目的是让他接触领域里的新工作，拓宽视野。',
      '他回来在你办公室坐下，汇报道："论文嘛……没留下特别深的印象。不过我加了十七个微信。"',
      '他把手机翻给你看：三个大厂研究员、两个高校教授、几个博士生，还有一个他备注了"具体方向不明，但感觉以后用得上"的神秘人士。他最后补了一句："茶歇时间其实很够的，你只要主动一点。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'tkl_conference_harvest_use',
        text: '人脉是生产力，整理起来备用',
        outcomes: [
          {
            weight: 1,
            narrative: '第二天他发来一份文档——按方向、机构、合作价值分了三类，每人后面附有聊天内容摘要。你看着这份整理有点发愣，问他什么时候做的。他说："昨晚，顺手。"',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'skills.social', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'tkl_conference_harvest_remind',
        text: '下次论文也带一下',
        outcomes: [
          {
            weight: 1,
            narrative: '他点点头说："老师说得对，我下次多记笔记。" 然后补了一句："不过那个大厂研究员说他们最近有个方向跟咱们很像，可以私下聊聊，我回了他个「方便的时候」，你觉得要不要约？" 你叹了口气，说约吧。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 3. 意外人脉 ──────────────────────────────────────────────────────────────
  tkl_surprise_connection: {
    id: 'tkl_surprise_connection',
    title: '这个事我好像认识能帮上忙的人',
    description: [
      '实验室遇到一个棘手的行政审批，按正常流程走要两三周，卡在某个环节纹丝不动。你在走廊随口抱怨了一句，唐扩列正好经过，停下来问了情况。',
      '"老师，这个事我好像认识能帮上忙的人，" 他说，语气平静得像在报天气，"上次开会加的，他好像是在那个部门做协调的。我发条消息问问？"',
      '消息发出，两小时后审批通过，附带一份说明文件。他把截图转给你，一个多余的字都没有。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'tang_kuolie', stat: 'favor', op: '>=', value: 35 },
    ],
    options: [
      {
        id: 'tkl_surprise_connection_thanks',
        text: '这孩子，是个人才',
        outcomes: [
          {
            weight: 1,
            narrative: '他摆了摆手，说："来都来了，举手之劳。" 你意识到这是他的口头禅，也是他行事的底层逻辑——认识人不是目的，帮上忙才叫数。他的通讯录是随时能激活的网络，不是名单。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'tkl_surprise_connection_curious',
        text: '他认识谁……？',
        outcomes: [
          {
            weight: 1,
            narrative: '他想了想，说："不知道，没数过。" 然后认真补充："但我记得每个人聊了什么，这个比较重要。" 你突然明白了他和普通社交达人的区别——他收集的不是联系方式，是对话。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'skills.social', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 4. 茶歇主线 ──────────────────────────────────────────────────────────────
  tkl_tea_break_main_quest: {
    id: 'tkl_tea_break_main_quest',
    title: '茶歇才是主线',
    description: [
      '唐扩列去参加了一次大型领域会议，你没抱太大期望，让他去见见世面就好。',
      '下午三点，他发来消息："老师，茶歇认识了一个企业的人，他们在找合作实验室，方向跟咱们高度匹配。我跟他聊了一会儿，他说想今天来拜访你，下午行吗？"',
      '那人四点整出现在你门口，介绍自己是某大厂研究院合作负责人，谈了半小时，方向对上了。临走他说："唐扩列这个学生不得了，五分钟把你们实验室介绍得清清楚楚，我们就是冲这个来的。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'tang_kuolie', stat: 'skills.social', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'tkl_tea_break_follow_up',
        text: '跟进合作，让他继续维系关系',
        outcomes: [
          {
            weight: 1,
            narrative: '你发邮件确认意向。唐扩列主动说他来跟进对接，一周内联络全部理顺，合同框架发过来的时候你才意识到这件事从头到尾他做了八成。他发消息说："老师你放心，我加完他微信那一刻就知道这个能成。"',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'skills.social', delta: 3 },
              { type: 'lab', stat: 'funding', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'tkl_tea_break_decline',
        text: '感谢他，但暂时不做横向合作',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，" 他说，没有追问，没有失落。两天后他告诉你把那个联系方式保留着了，说"说不定以后用得上"。你看着他若无其事的样子，感觉他的通讯录是某种会自动生长的活体资源库。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 5. 学术有点忽视 ──────────────────────────────────────────────────────────
  tkl_academic_neglect: {
    id: 'tkl_academic_neglect',
    title: '算我的道歉',
    description: [
      '最近两个月唐扩列参加了好几个活动——会议、饭局、校友聚会，你给他定的进度节点一个没完成，一直说"快了快了"。',
      '这天他主动来敲门，站在那里说："老师，我知道进度拖了，这是我的问题，最近太分散了。"',
      '他把一份文件推过来：合作机会清单，按优先级分类，每个联系人附有背景和可跟进方向，还有两封已经起草好的合作意向邮件草稿。"这个算我的道歉，" 他说，"你看看有没有用得上的。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'tang_kuolie', stat: 'projectProgress', op: '<=', value: 30 },
    ],
    options: [
      {
        id: 'tkl_academic_neglect_talk',
        text: '好好谈谈，科研才是主业',
        outcomes: [
          {
            weight: 1,
            narrative: '他认真听完，点了点头说："老师说得对，我下个月专门排一个研究周，活动全推掉。" 他做到了。那个月进度追上来一大截，期间只参加了一个他说"实在推不了"的茶话会，然后顺手带回来一条潜在合作线索。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'projectProgress', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'tkl_academic_neglect_accept',
        text: '先看看这份清单',
        outcomes: [
          {
            weight: 1,
            narrative: '你翻开清单，发现整理得相当系统，有几个联系人你之前自己也想接触过但没找到入口。你抬起头说："这个有用，但进度也得跟上。" 他说："明白，我这周集中搞。" 然后补了一句："那个邮件草稿你可以直接发，我帮你调好语气了。"',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 6. 他认识所有人 ──────────────────────────────────────────────────────────
  tkl_knows_everyone: {
    id: 'tkl_knows_everyone',
    title: '他我认识',
    description: [
      '你和唐扩列聊接下来的研究方向，提到了一位你一直想联系但找不到渠道的学者——在某个交叉领域做得很前沿，你们没有共同熟人。',
      '唐扩列想了大概三秒，掏出手机翻了翻，把屏幕转过来："他我认识，去年一个论坛加的，你看，这是他微信。上次他还发过他们组的预印本过来。"',
      '你看了眼头像，确认就是那个人。沉默了一秒。',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'tang_kuolie', stat: 'favor', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'tkl_knows_everyone_yes',
        text: '麻烦帮引荐一下',
        outcomes: [
          {
            weight: 1,
            narrative: '唐扩列当场发出消息，双方背景介绍得恰到好处，不过分也不客套。对方当天下午就回了，说可以安排线上交流。你想，自己原本估计至少要找三个中间人、绕两个月——他用一条消息搞定了。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'tkl_knows_everyone_self',
        text: '谢谢，这个我自己来联系',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，" 他说，把手机收回去，"那你联系的时候我可以帮你打个招呼，说咱们认识，他会更快回。" 你道了谢，心里嘀咕了一下：原来他已经想好了两套方案。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 7. 组织校友 ──────────────────────────────────────────────────────────────
  tkl_alumni_network: {
    id: 'tkl_alumni_network',
    title: '他自己组了个局',
    description: [
      '你有一段时间不知道唐扩列课外在忙什么，直到他发来消息："老师，上周我在学校组了个AI方向的小交流，来了二十几个校友，有在读的也有工作的，挺热闹的。"',
      '你问他为什么组这个。他说："来都来了嘛，大家都在这个圈子里，认识一下挺好的。" 你寻思这句话好像用在这里逻辑不太对，但他讲得太自然，你没法反驳。',
      '他接着说："有几个人问起咱们实验室，我介绍了一下，其中一个说他想捐台旧服务器，刚换代，还能用。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'tkl_alumni_network_appreciate',
        text: '干得漂亮，这件事做得很好',
        outcomes: [
          {
            weight: 1,
            narrative: '"没什么，" 他说，"就是觉得大家认识认识挺好的，没想到还顺带帮上忙了。" 服务器一周后到，他负责协调了整个交接。你发现他做这些事时没有半点功利感——他真的只是喜欢让人和人之间产生连接，其他的都是副产品。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 10 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'skills.social', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'lab', stat: 'funding', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'tkl_alumni_network_remind',
        text: '以后这类活动提前跟你说一声',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，下次提前说。" 他记下来了，而且真做到了——每次活动前发一条简短预告。你后来发现，加了这个习惯之后他反而组织得更频繁了，因为你偶尔会帮他推一推，来的人质量也更高了。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 8. 社交误判 ──────────────────────────────────────────────────────────────
  tkl_wrong_priority: {
    id: 'tkl_wrong_priority',
    title: '那次聚会其实也没那么重要',
    description: [
      '上周有次重要的项目中期汇报，唐扩列的表现比平时差了一截——思路不流畅，几个关键数据搅混了，问答环节也没发挥好。',
      '汇报结束，你把他留下来问情况。他低着头说："前一天参加了个聚会，到比较晚，没睡好。"',
      '他顿了一下，说："那次聚会其实也不是很重要，当时觉得会有用，结果没什么收获。我不应该去的。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', op: '<=', value: 45 },
    ],
    options: [
      {
        id: 'tkl_wrong_priority_criticize',
        text: '这次轻重没分清楚，直接说清楚',
        outcomes: [
          {
            weight: 1,
            narrative: '他接受了，没有辩解，说："老师说得对，下次这种情况我先来问你。" 此后一段时间他参加什么活动之前都来提一嘴，有时你帮他过滤一下，有时他讲完就知道自己其实已经想清楚了。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: -3 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'projectProgress', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'tkl_wrong_priority_lesson',
        text: '吸取教训就好，下次注意',
        outcomes: [
          {
            weight: 1,
            narrative: '"谢谢老师。" 他抬起头，表情恢复了正常。"我把汇报的数据重新整理了一遍发你，你看哪里有问题。" 你打开文件，发现他已经把混淆的那几个对比图全部重做了，附了一段说明。他的反应速度一直不慢——只是这次能量用错了方向。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'projectProgress', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 9. 关键引荐 ──────────────────────────────────────────────────────────────
  tkl_key_introduction: {
    id: 'tkl_key_introduction',
    title: '他认识评委',
    description: [
      '你正在准备一个重要的经费申请，时间紧，竞争大，心里没底。',
      '这天唐扩列打电话过来，语气一如既往地平静："老师，我有个朋友好像是这次基金的评委之一，论坛上认识的，聊得挺好的。你要不要我帮你引荐一下，见面聊聊？"',
      '他补了一句："就是纯认识一下，我不是说走后门——我就是觉得，多认识一个人总是好的。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 30 },
    ],
    options: [
      {
        id: 'tkl_key_introduction_yes',
        text: '见一下，认识认识没问题',
        outcomes: [
          {
            weight: 1,
            narrative: '唐扩列安排了一次简短的线下见面，介绍时只说了双方背景，什么都没多说。对方是个很正直的学者，聊了二十分钟，全是关于研究本身的话题。几个月后申请通过了，你不知道那次见面有没有起作用，也许没有。但那个领域里多了一个真正了解你在做什么的人，这本身已经够了。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'funding', delta: 6 },
            ],
          },
        ],
      },
      {
        id: 'tkl_key_introduction_no',
        text: '这样不太合适，走正常流程',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，我理解。" 他没有多说，只又补了一句："那个朋友我还是会跟的，跟申请没关系，就是挺聊得来的。" 你点了点头，心里觉得他对这件事的分寸，其实比你想象中清楚得多。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  // ── 10. 毕业回访 ─────────────────────────────────────────────────────────────
  // 🎓 毕业后回访 — 建议引擎在 graduation 后约 6 个月注入
  tkl_alumni_visit: {
    id: 'tkl_alumni_visit',
    title: '那家公司CEO跟你是校友',
    description: [
      '唐扩列毕业后去了一家科技公司做生态合作。据说入职三个月，整栋楼所有人都认识他，连门口的保安大叔都知道他名字。',
      '今天你收到他发来的邮件，主题是"合作项目邀请——实验室联合研究机会"。内容很正式：项目框架、时间线、预期产出、双方分工，显然是认真写的。',
      '正文最后一行是："老师，对了，那家公司的CEO查了一下，好像是您校友，我帮您引荐一下？来都来了嘛。"',
    ],
    prompt: '你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'tang_kuolie', stat: 'projectProgress', op: '>=', value: 95 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'tkl_alumni_visit_accept',
        text: '回邮件，合作和引荐都要',
        outcomes: [
          {
            weight: 1,
            narrative: '你回了邮件，说两件事都可以推进。他当天下午发来引荐消息，介绍语写得很好，把你们实验室的方向和CEO的背景都自然地串在一起，读完感觉像他们已经认识很久了。CEO回复得很快，说"久仰，改天见"。你放下手机，想到这个学生——出去了这么久，还是第一时间想着实验室，还是那句"来都来了"。有些人天生就是这样，走到哪里都在把人和人连起来，这不是策略，就是他。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 10 },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'funding', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'tkl_alumni_visit_project_only',
        text: '合作可以谈，校友引荐就算了',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的老师，" 他回复，然后附了一句，"那个校友引荐我帮您备着，您说一声随时可以。" 合作项目推进顺利，他在里面做联络协调，效率极高。有一次开会他顺口提到CEO，你才发现他早已私下认识对方了，但他一次都没有再提引荐的事——只是说"那个人挺有意思的，我们聊过几次"。他记得你说过算了，所以就真的算了。这个孩子，心里有数。',
            effects: [
              { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'funding', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

};
