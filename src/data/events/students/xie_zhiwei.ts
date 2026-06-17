import type { GameEvent } from '../../../types';

export const xieZhiweiEvents: Record<string, GameEvent> = {

  xzw_first_meeting: {
    id: 'xzw_first_meeting',
    title: '我就看看',
    description: [
      '你去楼下接她，发现她蹲在门口的网络设备柜前，像小动物发现了会发光的洞口，半个脑袋都快探进去了。"这个型号我查过，"她抬头冲你眨了眨眼，手指还恋恋不舍地搭在柜门边上，"我就想看看它里面怎么挂载配置的，真的不动。"保安大叔抱着保温杯，表情像是在判断要不要报警。',
      '进了办公室，她刚坐下，眼神就被你的电脑屏幕吸住了。她努力把手放到膝盖上，指尖却自己动了动。"老师，"她小声说，"你的浏览器好像快被标签页淹没了。"她又补了一句，语气特别诚恳："我可以只看一眼，不清也行。"',
    ],
    prompt: '你怎么回应她？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '<=', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'xzw_first_meeting_decline',
        text: '先谈正事，屏幕别看了',
        outcomes: [
          {
            weight: 1,
            narrative: '她立刻坐直，把小本子翻开，笔帽咔哒一声扣好。"好，我们说正事。"她看起来乖得很，只有视线偶尔从本子边缘溜出去，碰到屏幕又立刻缩回来。你讲到项目安排时，她在纸角悄悄画了一个小小的浏览器图标，又很快用手掌盖住。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_first_meeting_allow',
        text: '清吧，确实快卡死了',
        outcomes: [
          {
            weight: 1,
            narrative: '她眼睛一下亮起来，像终于被允许拆礼物的小孩。"那我很轻地清一下。"她说完就卷起袖子，动作轻快得像在给一只脾气很差的猫梳毛。标签页分组、扩展精简、缓存清理、启动项瘦身，全都被她顺手理了一遍。收尾时她把电脑推回来，吐了吐舌头："我本来只想关几个标签，后来它们看起来太可怜了。"',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_just_look: {
    id: 'xzw_just_look',
    title: '顺手重构了一下',
    description: [
    '服务器日志格式乱掉了，你让她"帮忙看一眼"。这是你今天说过的最危险的话。',
    '过了一阵，她发来消息："问题解决了！另外，日志系统我也顺手理了一下。"后面跟着一个乖巧的笑脸。',
    '你打开仓库。她不只是修了格式——时间戳、级别分类、输出结构、文档说明全都重写了一遍。你拉了一下 git log，发现她从深夜一直折腾到凌晨。',
    '提交说明第一行写着：只是小小地收拾了一下。第二行：另外把配置项拆分了一下，原来有点耦合。第三行：看到有几个重复逻辑，顺手合并了。第四行：研究过程中发现日志系统其实还挺有意思。',
    '你把 git log 关掉了。有些东西不适合一次知道太多。',
  ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'xzw_just_look_limit',
        text: '马上检查她还动了什么',
        outcomes: [
          {
            weight: 1,
            narrative: '你深吸一口气，打开了其他目录。构建脚本还在。数据库连接还在。用户鉴权——还在，但注释里有一行新的：这里有个小隐患，可以改但我先忍住了。\n\n你盯着"可以改但我先忍住了"这几个字看了很久。\n\n你去找她，说：以后动任何东西，先发消息。她点头，"好的。那我先报备一下噢，我刚刚又发现一个有意思的问题。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'xzw_just_look_accept',
        text: '正式授权她成为"本实验室首席代码洁癖官"',
        outcomes: [
          {
            weight: 1,
            narrative: '"真的吗！？"她眼睛亮了，但很快收敛了情绪，以一种非常职业的语气说："那我会先列一个改动清单给你确认。"\n\n清单第二天早上出现在你的收件箱，共三十七条，按照"影响范围"和"紧迫性"做了优先级排序，附了一份甘特图。\n\n实验室的代码在接下来两个月里以你完全看不懂节奏发生了深刻变化。唯一的问题是，你越来越分不清她到底是在做研究，还是在满足自己的好奇心。结果是好的，你决定不再深究具体发生了什么。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_accidentally_broke: {
    id: 'xzw_accidentally_broke',
    title: '原来的版本还在吗',
    description: [
      '她把训练脚本优化了，跑得明显快了，发消息时还带着一串小烟花表情。你也挺高兴，直到你发现新脚本的checkpoint格式变了。',
      '旧结果读不进来了。',
      '你问她怎么回事。她那边很快弹出"正在输入"，又消失，又弹出来。最后发来一句："老师，原来的版本……还在吗？"后面跟了一个小心探头的表情。',
    ],
    prompt: '你怎么处理这件事？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'xzw_accidentally_broke_criticize',
        text: '代码可以重来，四个月的数据重来不了',
        outcomes: [
          {
            weight: 3,
            narrative: '她抱着电脑连连点头，头发上的小发卡都跟着晃。"我知道了，我现在救。"她当天写了格式转换脚本，把大部分旧结果捞了回来。最后她把脚本推上去，附带一个兼容性检查，还在说明里认真写道：以后改格式前先问老师，不可以手痒。你看着这行字，不确定这条规则是写给自己看的，还是写给你看的。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: -2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '她立刻开始补救，键盘敲得像小仓鼠在抢修水管。可惜旧格式比想象中更乱，最后只救回了一部分。她把失败样例整理出来，给每一种都标了原因，末尾还加了一条新的仓库规则：任何格式变更必须附转换脚本。她看着规则，轻轻戳了戳屏幕："这条是给我自己的。"',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: -4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'xzw_accidentally_broke_solve_together',
        text: '先捞数据，检讨等结果出来再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你们一起写转换脚本。她一边改一边把旧格式的奇怪分支全部画成图，画到后面自己都皱起鼻子："它以前居然是这样长大的。"\n\n数据大部分救回来了。你提醒她，兼容性改动必须提前说。她认真点头，然后在仓库里新建了 BREAKING_CHANGES 文件，第一行写：手痒之前先看这里。\n\n你后来发现这个文件她已经加了五条预备内容，标注"待批准"。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: -4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_elegant_solution: {
    id: 'xzw_elegant_solution',
    title: '优雅',
    description: [
      '没有人给她安排这个任务。她只是路过一个核心模块，点进去看了看，然后就没能忍住。',
      '等你发现时，模块已经被她重新整理了一遍：代码更短，跑得更快，测试也补齐了。她把PR标题写得很无辜：小幅整理。',
      '"原来的版本也能用，"她解释，手指在桌沿轻轻蹭了蹭，"就是有几段重复逻辑一直在那里，我看见它们排排坐，心里有点痒。"',
    ],
    prompt: '你怎么回应这个重写？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'xzw_elegant_solution_code_review',
        text: '让她给组里开个分享会',
        outcomes: [
          {
            weight: 1,
            narrative: '她抱着电脑上去讲，一开始还把投影线插反了，自己低头笑了一下。讲到代码结构时，她整个人立刻亮起来，从设计决策讲到测试覆盖，越讲越顺。有人问她为什么想到这样拆模块，她认真回答："因为它们本来就不该挤在一起。"全组听完，默默打开了自己的旧代码。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.social', delta: 2 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_elegant_solution_main_task',
        text: '主线任务什么时候做的……',
        outcomes: [
          {
            weight: 1,
            narrative: '"那个已经做完啦。"她把主线结果递给你，又把重构PR推过来，像小朋友同时交出作业和手工。"这个是等实验的时候做的，不耽误。"你看着她亮晶晶的眼神，意识到对她来说，别人刷手机的碎片时间，她用来给代码做大扫除。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_equipment_obsession: {
    id: 'xzw_equipment_obsession',
    title: '我就想看看里面是什么',
    description: [
      '实验室新来了一台设备，刚开箱，保护膜还没撕完。',
      '你路过时，谢知微正蹲在旁边看拆解视频，手机架在纸箱上，整个人像守着一颗刚捡到的蛋。',
      '"我就想看看里面是什么结构。"她抬头看你，眼神清澈得过分，手里却已经拿起了螺丝刀。"不拆也可以，我先比一下螺丝口。"设备保修贴纸完好，但它的命运显然已经受到了威胁。',
    ],
    prompt: '你怎么处理这件事？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', op: '>=', value: 45 },
    ],
    options: [
      {
        id: 'xzw_equipment_obsession_no',
        text: '还在保修期，不许拆',
        outcomes: [
          {
            weight: 1,
            narrative: '"好。"她乖乖把螺丝刀放回去，还用两根手指把它推远了一点，表示自己真的没有动手。然后她绕着设备转了一圈，又蹲下来看散热口。"我不拆，我用眼睛拆。"你决定暂时相信这句话，同时把工具箱挪到了更高的柜子里。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_equipment_obsession_later',
        text: '过了保修期你想怎么研究都行',
        outcomes: [
          {
            weight: 1,
            narrative: '"真的？"她立刻拿出手机，把保修到期日记进日历，事件标题写得非常朴素：可以拆。你看着她认真设置提醒，忽然觉得这台设备的未来已经被安排好了。她收起手机，心满意足地拍了拍纸箱："你先好好工作，之后我再来认识你。"',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_optimization_spree: {
    id: 'xzw_optimization_spree',
    title: '顺手优化了五个',
    description: [
      '这周你没给她额外任务，她应该在推进自己的研究。周五下午，她发来一份清单。',
      '实验室几个常用工具，全被她摸过一遍。每个后面都有benchmark、改动说明和一小段风险提示。',
      '"跑实验的时候手边空着。"她解释得很自然，"然后我看见有个循环可以少绕一下。改完这个，又发现旁边那个也有点别扭。"她发来一个不好意思的表情："就一个接一个了。"',
    ],
    prompt: '你怎么回应这场优化风暴？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 35 },
    ],
    options: [
      {
        id: 'xzw_optimization_spree_report_first',
        text: '等等，你这周不是有自己的实验要跑吗',
        outcomes: [
          {
            weight: 1,
            narrative: '她抬起头，神情无辜。然后从桌上推过来另一个文件夹："跑完了，在等结果的空档做的。"\n\n你打开一看，实验进度正常，日志整整齐齐。这五个优化全是她在 GPU 跑着的时候"顺手"填进去的。她轻声补了一句："我不会发呆的，闲下来会难受。"\n\n你决定不再质疑了。但你把"提前报备"这个规则还是悄悄发进了组规。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_optimization_spree_praise',
        text: '以后你就负责全组的工程质量',
        outcomes: [
          {
            weight: 1,
            narrative: '她愣了三秒。然后把这句话原原本本记进备忘录，开了一个新的私人文档，标题是：工程质量改进 roadmap（草稿）。\n\n两天后，你收到一份 17 页的表格，每一行都是她想动的东西，分了优先级，标注了预计工时和潜在风险。第 16 行附注写着："这 3 个我已经改了，请见 PR。"\n\n你意识到自己说了一句很贵的话。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 2 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_debug_instinct: {
    id: 'xzw_debug_instinct',
    title: '我大概知道在哪',
    description: [
      '一个bug让全组卡了好几天。日志翻了，实验重跑了，大家都快开始怀疑人生。',
      '谢知微路过时，本来只是探头看了一眼。然后她抱着杯子坐下来，把日志往回拉了几屏，眉毛一点点皱起来。',
      '"这里怪怪的。"她指着两条挤在一起的记录，语气像发现地板下藏着一只小猫，"它们不应该同时出现。可能是竞争条件，在这个函数附近。"',
    ],
    prompt: '你怎么回应她的判断？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', op: '>=', value: 70 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'xzw_debug_instinct_trust',
        text: '直接叫大家都去那个函数找',
        outcomes: [
          {
            weight: 1,
            narrative: '全组转过去，bug藏在她说的位置，一行没加锁的写操作，精确到行。有人回头看她："你怎么知道的？"\n\n"感觉。"她认真地说。\n\n从那天起，组里卡了三天查不出来的问题，第一个反应不再是翻日志，而是："去问谢知微。"她已经把另一个类似结构圈出来了，小声问你："这个也有点像，我可以顺手一起改吗？"',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: 4 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_debug_instinct_verify',
        text: '你先去自己复现一下',
        outcomes: [
          {
            weight: 1,
            narrative: '她去了。二十分钟后回来，bug在。她还带回来一份复现步骤文档和一个修复 patch，格式规范得像交作业。"我怕自己直接改会顺手改多，先来确认一下。"她说，手在键盘边缘停着，等你点头。\n\n你点头。她才放下来，开始敲。\n\n你后来想，如果没让她先复现，那个 patch 后面可能会附一个"顺手把旁边的也一起改了"。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_version_control: {
    id: 'xzw_version_control',
    title: '我顺手把历史整理了一下',
    description: [
      '你让她修一个小bug，预计很快就能结束。',
      '她发来pull request：bug修好了。附带说明："我顺手把仓库历史收拾了一下，还写了一个贡献指南。"',
      '你打开仓库，发现废弃分支少了一大片，README旁边多了CONTRIBUTING.md。她在PR里补了一句："删之前都有备份！这次我记得了！"',
    ],
    prompt: '你怎么回应这次"顺手"？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', op: '>=', value: 55 },
    ],
    options: [
      {
        id: 'xzw_version_control_thank',
        text: '谢了，这些事早该做了',
        outcomes: [
          {
            weight: 1,
            narrative: '"对吧！"她一下来了精神，开始解释乱分支以后会怎样干扰排查，还把贡献指南里的几条规则讲给你听。她讲得很认真，像在介绍自己刚整理好的抽屉。你把文档发给全组，标题写：以后按这个来。她看到后，偷偷在文档末尾加了一句：如需修改，欢迎开issue。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 9 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.social', delta: 2 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_version_control_warn',
        text: '以后能不能给别人留点活干',
        outcomes: [
          {
            weight: 1,
            narrative: '她愣了一下，然后笑了，有点不好意思地把耳机摘下来一边。"好，下次我先说。"她把这句话记进备忘录，旁边画了一个小警示牌。\n\n然后她把备份截图、恢复方法和改动范围一并发给你，像交出一份"我真的没有乱来"的证明。\n\n你翻完这份证明，发现她每一步都有备份。你沉默了一下，心想：她没有给别人留活干，但她给别人留了很多后路。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_accidental_discovery: {
    id: 'xzw_accidental_discovery',
    title: '我只是看看别人怎么做的',
    description: [
      '她发来一页技术备忘录，标题是："可能有用，也可能只是我想多了。"',
      '内容写得很细：她在看另一个领域的实现时，发现他们处理某类数据的方式和你们当前瓶颈很像。她整理了原理、适用条件，以及迁移过来大概要改哪些地方。',
      '"我真的只是看看别人怎么做的。"她解释，"然后它看起来一直在向我招手。"',
    ],
    prompt: '你怎么处理这个意外发现？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'xzw_accidental_discovery_evaluate',
        text: '下周组会讨论，让大家一起看',
        outcomes: [
          {
            weight: 2,
            narrative: '你把备忘录发给组里讨论，大家越看越觉得有戏。你告诉她这个方向值得试时，她眼睛慢慢睁大："真的有用啊？"她不是装谦虚，她确实只是追着好奇心摸过去，没想到摸到了一条新路。后来这个想法帮你们省掉了不少试错时间，她也从此更理直气壮地"只是看看"了。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你认真看完，发现几个关键假设在你们这里不成立。你把原因讲给她，她立刻把备忘录改名成"不适用但学到了"，还在旁边标注了失败原因。"那也不亏。"她说，顺手把相关资料归档进了组里的知识库。这个方向没走通，但下次有人问起，她已经把坑画好了。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'xzw_accidental_discovery_defer',
        text: '先把自己的研究做完，这个以后再看',
        outcomes: [
          {
            weight: 1,
            narrative: '"好，那我先存起来。"她给备忘录加上"待评估"标签，还贴心地写了摘要，方便以后捡回来。后来事情一件接一件，那份文档一直躺在角落。等你在别人的论文里看到类似思路时，脑子里冒出的第一句话是：谢知微当时好像真的捡到过这块石头。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_alumni_visit: {
    id: 'xzw_alumni_visit',
    title: '第一个月的传说',
    description: [
      // 建议引擎在graduation后约6个月注入
      '她毕业后去了一家基础设施公司，专门做系统优化。你觉得这个选择很适合她，也替那家公司稍微捏了把汗。',
      '半年后，她发来邮件，开头说："工作很有意思，大家人也很好。"后面轻描淡写地提到：她入职第一个月，把核心服务延迟降了一大截，同时因为"顺手"改了几个她觉得不够优雅的模块，引发了一次小规模线上事故。',
      '"他们现在叫我小拆弹专家，"她写道，"但我觉得不完全准确，因为有时候炸弹是我自己做出来的。"',
      '邮件末尾说：她整理了一套开源工具，想以实验室名义一起发布。她说这些工具有一部分是在这里做研究时攒下来的，想还给这里。',
    ],
    prompt: '你怎么回复她？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 95 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'xzw_alumni_visit_agree',
        text: '同意，问她需要什么支持',
        outcomes: [
          {
            weight: 1,
            narrative: '她很快回复："谢谢老师，我先自己整理，弄好给你看。"过了一段时间，仓库地址发来：工具干净，文档清楚，示例也贴心得像给后来者铺了一排小石头。实验室名字出现在作者列表里。你看着那个署名，想起她第一次蹲在设备柜前说"我就看看"，觉得她好像一直没变，只是拆的东西越来越大，也越来越有用。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_alumni_visit_ask_detail',
        text: '先看看工具内容，没问题再说',
        outcomes: [
          {
            weight: 1,
            narrative: '她发来工具列表和说明，连哪些代码来自实验室、哪些是毕业后重写的都标得清清楚楚。你看完确认没有问题，回复同意。她回："好！我把README里的实验室链接也检查过了。"你打开草稿，链接正确，格式整齐，甚至还有贡献指南。你笑了一下：她果然还是会顺手多做一点。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

};