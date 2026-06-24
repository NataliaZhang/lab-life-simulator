import type { GameEvent } from '../../../types';

export const xieZhiweiEvents: Record<string, GameEvent> = {

  xzw_first_meeting: {
    id: 'xzw_first_meeting',
    title: '我就看看',
    description: [
      '你去楼下接谢之微，发现她蹲在门口的网络设备柜前，像小动物发现了会发光的洞口，半个脑袋都快探进去了。"这个型号我查过，"她抬头冲你眨了眨眼，手指还恋恋不舍地搭在柜门边上，"我就想看看它里面怎么挂载配置的，真的不动。"保安大叔抱着保温杯，表情像是在判断要不要报警。',
      '进了办公室，谢之微刚坐下，眼神就被你的电脑屏幕吸住了。她努力把手放到膝盖上，指尖却自己动了动。"老师，"谢之微小声说，"你的浏览器好像快被标签页淹没了。"她又补了一句，语气特别诚恳："我可以只看一眼，不清也行。"',
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
            narrative: '谢之微立刻坐直，把小本子翻开，笔帽咔哒一声扣好。"好，我们说正事。"她看起来乖得很，只有视线偶尔从本子边缘溜出去，碰到屏幕又立刻缩回来。你讲到项目安排时，她在纸角悄悄画了一个小小的浏览器图标，又很快用手掌盖住。',
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
    '服务器日志格式乱掉了，你让谢之微"帮忙看一眼"。这是你今天说过的最危险的话。',
    '过了一阵，谢之微发来消息："问题解决了！另外，日志系统我也顺手理了一下。"后面跟着一个乖巧的笑脸。',
    '你打开仓库。她不只是修了格式——时间戳、级别分类、输出结构、文档说明全都重写了一遍。你拉了一下 git log，发现她从深夜一直折腾到凌晨。',
    '提交说明第一行写着：只是小小地收拾了一下。第二行：另外把配置项拆分了一下，原来有点耦合。第三行：看到有几个重复逻辑，顺手合并了。第四行：研究过程中发现日志系统其实还挺有意思。',
    '你把 git log 关掉了。有些东西不适合一次知道太多。',
  ],
    prompt: '你怎么回应谢之微？',
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
            narrative: '你深吸一口气，打开了其他目录。构建脚本还在。数据库连接还在。用户鉴权——还在，但注释里有一行新的：这里有个小隐患，可以改但我先忍住了。\n\n你盯着"可以改但我先忍住了"看了很久。\n\n你去找她，说：以后动任何东西，先发消息。她点头，"好的。那我先报备一下噢，我刚刚又发现一个有意思的问题。',
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
      '谢之微把训练脚本优化了，跑得明显快了，发消息时还带着一串小烟花表情。你也挺高兴，直到你发现新脚本的checkpoint格式变了。',
      '旧结果读不进来了。',
      '你问谢之微怎么回事。她那边很快弹出"正在输入"，又消失，又弹出来。最后发来一句："老师，原来的版本……还在吗？"后面跟了一个小心探头的表情。',
    ],
    prompt: '你怎么处理这件事？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'xzw_accidentally_broke_criticize',
        text: '代码能重来，四个月数据不能',
        outcomes: [
          {
            weight: 3,
            narrative: '谢之微抱着电脑连连点头，头发上的小发卡都跟着晃。"我知道了，我现在救。"她当天写了格式转换脚本，把大部分旧结果捞了回来。最后她把脚本推上去，附带一个兼容性检查，还在说明里认真写道：以后改格式前先问老师，不可以手痒。你看着这行字，不确定这条规则是写给自己看的，还是写给你看的。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: -2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '谢之微立刻开始补救，键盘敲得像小仓鼠在抢修水管。可惜旧格式比想象中更乱，最后只救回了一部分。她把失败样例整理出来，给每一种都标了原因，末尾还加了一条新的仓库规则：任何格式变更必须附转换脚本。她看着规则，轻轻戳了戳屏幕："这条是给我自己的。"',
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
        text: '先捞数据，检讨稍后',
        outcomes: [
          {
            weight: 1,
            narrative: '你们一起写转换脚本。谢之微一边改一边把旧格式的奇怪分支全部画成图，画到后面自己都皱起鼻子："它以前居然是这样长大的。"\n\n数据大部分救回来了。你提醒她，兼容性改动必须提前说。她认真点头，然后在仓库里新建了 BREAKING_CHANGES 文件，第一行写：手痒之前先看这里。\n\n你后来发现这个文件她已经加了五条预备内容，标注"待批准"。',
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
      '没有人给谢之微安排这个任务。她只是路过一个核心模块，点进去看了看，然后就没能忍住。',
      '等你发现时，模块已经被谢之微重新整理了一遍：代码更短，跑得更快，测试也补齐了。她把PR标题写得很无辜：小幅整理。',
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
            narrative: '谢之微抱着电脑上去讲，一开始还把投影线插反了，自己低头笑了一下。讲到代码结构时，她整个人立刻亮起来，从设计决策讲到测试覆盖，越讲越顺。有人问她为什么想到这样拆模块，她认真回答："因为它们本来就不该挤在一起。"全组听完，默默打开了自己的旧代码。',
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
        text: '主线任务……什么时候做的',
        outcomes: [
          {
            weight: 1,
            narrative: '"那个已经做完啦。"谢之微把主线结果递给你，又把重构PR推过来，像小朋友同时交出作业和手工。"这个是等实验的时候做的，不耽误。"你看着她亮晶晶的眼神，意识到对她来说，别人刷手机的碎片时间，她用来给代码做大扫除。',
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
      '你路过时，谢之微正蹲在旁边看拆解视频，手机架在纸箱上，整个人像守着一颗刚捡到的蛋。',
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
            narrative: '"好。"谢之微乖乖把螺丝刀放回去，还用两根手指把它推远了一点，表示自己真的没有动手。然后她绕着设备转了一圈，又蹲下来看散热口。"我不拆，我用眼睛拆。"你决定暂时相信这句话，同时把工具箱挪到了更高的柜子里。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_equipment_obsession_later',
        text: '过了保修期随便研究',
        outcomes: [
          {
            weight: 1,
            narrative: '"真的？"谢之微立刻拿出手机，把保修到期日记进日历，事件标题写得非常朴素：可以拆。你看着她认真设置提醒，忽然觉得这台设备的未来已经被安排好了。她收起手机，心满意足地拍了拍纸箱："你先好好工作，之后我再来认识你。"',
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
      '这周你没给谢之微额外任务，她应该在推进自己的研究。周五下午，她发来一份清单。',
      '实验室几个常用工具，全被她摸过一遍。每个后面都有benchmark、改动说明和一小段风险提示。',
      '"跑实验的时候手边空着。"谢之微解释得很自然，"然后我看见有个循环可以少绕一下。改完这个，又发现旁边那个也有点别扭。"她发来一个不好意思的表情："就一个接一个了。"',
    ],
    prompt: '你怎么回应这场优化风暴？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 35 },
    ],
    options: [
      {
        id: 'xzw_optimization_spree_report_first',
        text: '等等，你自己的实验呢',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微抬起头，神情无辜。然后从桌上推过来另一个文件夹："跑完了，在等结果的空档做的。"\n\n你打开一看，实验进度正常，日志整整齐齐。这五个优化全是她在 GPU 跑着的时候"顺手"填进去的。她轻声补了一句："我不会发呆的，闲下来会难受。"\n\n你决定不再质疑了。但你把"提前报备"这个规则还是悄悄发进了组规。',
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
        text: '以后你就是工程质量负责人',
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
      '谢之微路过时，本来只是探头看了一眼。然后她抱着杯子坐下来，把日志往回拉了几屏，眉毛一点点皱起来。',
      '"这里怪怪的。"她指着两条挤在一起的记录，语气像发现地板下藏着一只小猫，"它们不应该同时出现。可能是竞争条件，在这个函数附近。"',
    ],
    prompt: '你怎么回应谢之微的判断？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', op: '>=', value: 70 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'xzw_debug_instinct_trust',
        text: '直接叫大家去那函数找',
        outcomes: [
          {
            weight: 1,
            narrative: '全组转过去，bug藏在谢之微说的位置，一行没加锁的写操作，精确到行。有人回头看她："你怎么知道的？"\n\n"感觉。"她认真地说。\n\n从那天起，组里卡了三天查不出来的问题，第一个反应不再是翻日志，而是："去问谢之微。"她已经把另一个类似结构圈出来了，小声问你："这个也有点像，我可以顺手一起改吗？"',
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
            narrative: '谢之微去了。二十分钟后回来，bug在。她还带回来一份复现步骤文档和一个修复 patch，格式规范得像交作业。"我怕自己直接改会顺手改多，先来确认一下。"她说，手在键盘边缘停着，等你点头。\n\n你点头。她才放下来，开始敲。\n\n你后来想，如果没让她先复现，那个 patch 后面可能会附一个"顺手把旁边的也一起改了"。',
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
      '你让谢之微修一个小bug，预计很快就能结束。',
      '她发来pull request：bug修好了。附带说明："我顺手把仓库历史收拾了一下，还写了一个贡献指南。"',
      '你打开仓库，发现废弃分支少了一大片，README旁边多了CONTRIBUTING.md。谢之微在PR里补了一句："删之前都有备份！这次我记得了！"',
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
            narrative: '"对吧！"谢之微一下来了精神，开始解释乱分支以后会怎样干扰排查，还把贡献指南里的几条规则讲给你听。她讲得很认真，像在介绍自己刚整理好的抽屉。你把文档发给全组，标题写：以后按这个来。她看到后，偷偷在文档末尾加了一句：如需修改，欢迎开issue。',
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
        text: '以后给别人留点活',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微愣了一下，然后笑了，有点不好意思地把耳机摘下来一边。"好，下次我先说。"她把这句话记进备忘录，旁边画了一个小警示牌。\n\n然后她把备份截图、恢复方法和改动范围一并发给你，像交出一份"我真的没有乱来"的证明。\n\n你翻完这份证明，发现她每一步都有备份。你沉默了一下，心想：她没有给别人留活干，但她给别人留了很多后路。',
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
      '谢之微发来一页技术备忘录，标题是："可能有用，也可能只是我想多了。"',
      '内容写得很细：谢之微在看另一个领域的实现时，发现他们处理某类数据的方式和你们当前瓶颈很像。她整理了原理、适用条件，以及迁移过来大概要改哪些地方。',
      '"我真的只是看看别人怎么做的。"谢之微解释，"然后它看起来一直在向我招手。"',
    ],
    prompt: '你怎么处理这个意外发现？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'xzw_accidental_discovery_evaluate',
        text: '下周组会，分享给大家',
        outcomes: [
          {
            weight: 2,
            narrative: '你把备忘录发给组里讨论，大家越看越觉得有戏。你告诉谢之微这个方向值得试时，她眼睛慢慢睁大："真的有用啊？"她不是装谦虚，她确实只是追着好奇心摸过去，没想到摸到了一条新路。后来这个想法帮你们省掉了不少试错时间，她也从此更理直气壮地"只是看看"了。',
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
            narrative: '你认真看完，发现几个关键假设在你们这里不成立。你把原因讲给谢之微，她立刻把备忘录改名成"不适用但学到了"，还在旁边标注了失败原因。"那也不亏。"她说，顺手把相关资料归档进了组里的知识库。这个方向没走通，但下次有人问起，她已经把坑画好了。',
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
        text: '先把自己的研究做完',
        outcomes: [
          {
            weight: 1,
            narrative: '"好，那我先存起来。"谢之微给备忘录加上"待评估"标签，还贴心地写了摘要，方便以后捡回来。后来事情一件接一件，那份文档一直躺在角落。等你在别人的论文里看到类似思路时，脑子里冒出的第一句话是：谢之微当时好像真的捡到过这块石头。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_robot_dog: {
    id: 'xzw_robot_dog',
    title: '顺便做一点机器人研究',
    description: [
      '谢之微抱着电脑来找你。"老师，我想申请一个机器狗。"',
      '你问为什么，她脱口而出："我想知道它遇到楼梯会怎么想。"',
      '她停了一下，补了一句："顺便做一点机器人研究。"',
      '你总觉得后半句是临时加上的。',
    ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', op: '>=', value: 20 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'xzw_robot_dog_approve',
        fundingCost: 3,
        text: '批准采购',
        outcomes: [
          {
            weight: 1,
            narrative: '机器狗到货了。第一周它学会了上楼梯。第二周开始在冰箱附近定点巡逻。第三周你发现谢之微把一面小镜子架在了走廊里，正在记录它是否会在镜子前停下来。\n\n你问研究进展。"正在跑实验。"她说。你看了一眼实验日志，标题写着：机器狗自我认知初探。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 10 },
            ],
          },
        ],
      },
      {
        id: 'xzw_robot_dog_borrow',
        text: '隔壁不是有一个吗，先去借',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微真的借来了，答应了注意轻放的交代。两周后，隔壁张老师过来，语气克制：“请问……你们为什么给它装了一条机械臂？”',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_robot_dog_duck',
        text: '为什么不是机器鸭',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微认真地思考了三秒钟。"机器鸭……浮力好处理，但羽毛展开机构会很复杂，而且鸭叫声的资料比较少。"她没有在开玩笑。\n\n你们在这个问题上一起待了十五分钟，最后谢之微说："我去查一下有没有现成的。"没有。但她整理了一份《机器鸭设计难点备忘》，以备不时之需。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_window_rain: {
    id: 'xzw_window_rain',
    title: '我在等实验跑完',
    description: [
      '实验在跑，谢之微应该在旁边守着。',
      '你过去找她，发现她盯着窗户，似乎不是在发呆。仔细看，她其实是在观察的雨滴怎么流。',
      '"你看，"她指着两条水痕，"它们明明往同一个方向，但从来不合并。"',
    ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 3 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', op: '>=', value: 25 },
    ],
    options: [
      {
        id: 'xzw_window_rain_engage',
        text: '我刚好也想知道',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微眼睛一下亮起来，开始讲她的各种猜测：水流轨迹、液面张力、接触角。\n\n她讲完，神情变得很满足，像把一个盘旋了很久的问题从脑子里放出去了。实验日志还在好好跑，什么都没耽误。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'xzw_window_rain_back_to_work',
        text: '有实验要盯，别分心',
        outcomes: [
          {
            weight: 1,
            narrative: '"好。"谢之微合上备忘录，把注意力拉回屏幕。沉默了一会儿，她轻声说："但如果它们是在绕开什么……"她反应过来，用力闭嘴，把视线钉在日志上。\n\n下班时，备忘录又多了两条记录。她用等待间隙估算了表面张力的数值范围，末尾附注：非工作时间观察，不占用研究资源。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: -2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'xzw_window_rain_official',
        text: '这算实验观察吗',
        outcomes: [
          {
            weight: 1,
            narrative: '"对对，这算。"她把备忘录重命名成"非正式实验记录 vol.3"，在最上面加了一行：研究问题：雨滴为什么不合并。\n\n然后她低头把格式整了整，抬起头说："这样就合规了。"你看着她给自己的发呆行为补了一份实验设计，忍住没有提醒她这是一个计算机系而非物理系的实验室。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 1 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_elevator_study: {
    id: 'xzw_elevator_study',
    title: '我只是顺手记了一下',
    description: [
      '谢之微迟到了七分钟，进来时神情还有些思绪没收回来。',
      '"老师，"她放下包，"楼里有六部电梯，但所有人都只等最左边三部。右边三部经常空着来，没有人进。"',
      '她打开手机，共十四天、每天上班高峰期，约两百条进出记录。你问她什么时候记的。"等左边的电梯的时候，"她说，"正好有空。"',
    ],
    prompt: '你怎么回应谢之微的电梯研究？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', op: '>=', value: 40 },
    ],
    options: [
      {
        id: 'xzw_elevator_study_model',
        text: '问她打算用这个数据做什么',
        outcomes: [
          {
            weight: 1,
            narrative: '"还不知道，"她想了想，"但可以建一个排队博弈模型，分析大家怎么在没有人提议的情况下形成这个共识的。"她已经打开文档开始写研究问题。\n\n你后来在组会上提到，这种无组织的群体协调很像分布式系统里的某类问题。谢之微抬起头，眼神一下亮了，把电脑往前推了推："对对对，这就是我想说的。"\n\n💡 获得灵感：无声协调机制 —— 已记录到项目面板。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.social', delta: 1 },
              { type: 'unlockIdea', projectId: 'spontaneous_coordination' },
            ],
          },
        ],
      },
      {
        id: 'xzw_elevator_study_optimal',
        text: '问她有没有找到最优等法',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微把手机往前推了推，翻到最后一页。"第四部，"她说，"用的独立调度系统，响应快三到五秒，大部分人不知道。"\n\n她停了一下，补了一句："但如果大家都去等第四部，它就又慢了。"你看着她把一个等电梯问题讲出了博弈论的味道，发现这是她真正算过的。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_meeting_seats: {
    id: 'xzw_meeting_seats',
    title: '没人规定但大家都这样',
    description: [
      '组会结束，谢之微收东西收得很慢，最后一个出门。',
      '在走廊等你时，她说："老师，你有没有发现，我们组会三个月了，每次每个人坐的位置都一样。"',
      '她打开手机，给你看了一张示意图——每次组会的座位用最简单的圆圈和名字标注，几乎没有变动过一次。"没有人说过这个规定，"她说，"但大家都在维持它。我想知道为什么。"',
    ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'month', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'xzw_meeting_seats_experiment',
        text: '那你下次故意坐别的位置试试',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微眼睛亮了，随即恢复平静："好，但我要先想清楚变量控制。"\n\n下次组会，她提前来，坐到了另一个位置。大家陆续进来，有人愣了一下，有人侧身换了方向，最后整个座位格局微妙地整体旋转了大约九十度。\n\n谢之微在备忘录里写：系统具有鲁棒性，单一扰动不足以破坏结构。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.social', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_meeting_seats_inside',
        text: '你也在里面',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微低头翻开图，认真对照了一下。"对，我也是。"她抬起头，像发现了什么了不得的事，"我原来以为我在观察，但我也是被观察的数据。"\n\n她把这条写进备忘录，标题改成：观察者也是数据。你看着这个标题，想起好几篇量子力学的论文，决定不继续想了。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_meeting_seats_social',
        text: '这是社会学课题吗',
        outcomes: [
          {
            weight: 1,
            narrative: '"不是，"她说，"但感觉可以是。"她把手机收起来，往前走了两步，"如果把座位换成任何可以被占据的位置——地铁、食堂、停车场——这个问题就可以推广到很多地方。"\n\n她没有继续说下去，但脑子显然还在转。也许今晚她会把这个想法写成三页笔记，也许睡过去了明天什么都不记得。你觉得这两种可能性概率相当。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 1 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_coffee_machine: {
    id: 'xzw_coffee_machine',
    title: '我就想知道那个声音从哪来',
    description: [
      '实验室的咖啡机有一段时间会发出奇怪声音。有人说是气泡，有人说是磨损，最后大家都习惯了。',
      '"我只把盖子打开看一眼，"谢之微事先向你报告，手里拿着说明书，"不动零件。"你点了头。',
      '四十分钟后，她发来消息：声音来源找到了，顺便修好了。后面附了一张A4纸的拆解图，每个零件都有标注，画风认真得像实验报告封面。',
    ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 4 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', op: '>=', value: 30 },
    ],
    options: [
      {
        id: 'xzw_coffee_machine_how',
        text: '问她怎么修的',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微走过来，把A4纸摊开，指着一个气路密封："声音来自这里，用时间久了会有微小间隙。我用棉签沾了一点食用硅脂填了一下。"她补了一句："说明书第37页有这个维护步骤，大家一般不读第37页。"\n\n你看着她，想不出该说什么，最后只说了一个字："好。"她把A4纸折起来，推进了笔记本夹层。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_coffee_machine_list',
        text: '问她还有什么感兴趣的',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微把A4纸翻过去，背面还有内容。"微波炉，"她说，"我想知道转盘转速和功率有没有关系。还有投影仪焦距，官方参数写的范围比实际小，我试过了。"\n\n你数了一下，背面共七条，三条已经画了勾。谢之微补了一句："我只是路过的时候会看一眼。"你决定相信这句话，因为咖啡机确实不响了，而且没有任何损失。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'xzw_coffee_machine_approval',
        text: '以后动东西先申请',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的。"谢之微立刻掏出手机，发来一条消息，主题：申请修理咖啡机（已完成）。你把这条申请通过了，加了一句"以后先申请再动"。她截图存档，回复："下次我会按顺序来。"\n\n之后你一直没有收到任何新的申请。但咖啡机彻底好了，微波炉有一天也安静了，投影仪的调焦不知道什么时候变顺了。没有任何申请记录。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 2 },
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
    triggerConditions: [{ type: 'studentStatus', studentId: 'xie_zhiwei', status: 'graduated' }],
    description: [
      // 引擎在graduation后注入
      '谢之微毕业后去了一家基础设施公司，专门做系统优化。你觉得这个选择很适合她，也替那家公司稍微捏了把汗。',
      '半年后，谢之微发来邮件，开头说："工作很有意思，大家人也很好。"后面轻描淡写地提到：谢之微入职第一个月，把核心服务延迟降了一大截，同时因为"顺手"改了几个她觉得不够优雅的模块，引发了一次小规模线上事故。',
      '"他们现在叫我小拆弹专家，"她写道，"但我觉得不完全准确，因为有时候炸弹是我自己做出来的。"',
      '邮件末尾说：谢之微整理了一套开源工具，想以实验室名义一起发布。她说这些工具有一部分是在这里做研究时攒下来的，想还给这里。',
    ],
    prompt: '你怎么回复谢之微？',
    options: [
      {
        id: 'xzw_alumni_visit_agree',
        text: '同意，让她主导就好',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微很快回复："谢谢老师，我先自己整理，弄好给你看。"过了一段时间，仓库地址发来：工具干净，文档清楚，示例也贴心得像给后来者铺了一排小石头。实验室名字出现在作者列表里。你看着那个署名，想起她第一次蹲在设备柜前说"我就看看"，觉得她好像一直没变，只是拆的东西越来越大，也越来越有用。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 12 },
            ],
          },
        ],
      },
      {
        id: 'xzw_alumni_visit_ask_detail',
        text: '先看内容，没问题再发',
        outcomes: [
          {
            weight: 1,
            narrative: '谢之微发来工具列表和说明，连哪些代码来自实验室、哪些是毕业后重写的都标得清清楚楚。你看完确认没有问题，回复同意。谢之微回："好！我把README里的实验室链接也检查过了。"你打开草稿，链接正确，格式整齐，甚至还有贡献指南。你笑了一下：她果然还是会顺手多做一点。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_prompt_archaeology: {
    id: 'xzw_prompt_archaeology',
    title: '谢之微：她在仓库里找到了很古老的prompt',
    description: [
      '谢之微在整理旧代码仓库，找到了一个两年前创建的文件夹，里面是一批prompt，最早的一条写于系统连接AI功能的第一周，内容是："请你帮我解释一下什么是注意力机制，语气亲切一点。"',
      '她把整个文件夹翻完，发现prompt的风格从非常礼貌、充满试探，逐渐演变成简洁、专业，甚至有点命令式。',
      '"这是一个人学习用AI的全过程，" 她说，把笔记本推过来，"我记了一下演变的阶段，每个阶段的提问策略都不太一样。这挺有意思的。"',
      '她说话的时候声音很轻，但记录得很细，每个阶段都有引用，时间都对得上。',
    ],
    prompt: '谢之微在研究prompt的历史演变，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', op: '>=', value: 45 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'xzw_prompt_archaeology_archive',
        text: '留档，以后说不定有用',
        outcomes: [{
          weight: 1,
          narrative: '你说"这个值得留着，放到组里的文档里。" 谢之微整理了一份完整的存档，按时间轴排列，加了简短的注释，文档做得比你预期精细很多。她发完说"我也整理了其他几个同类文件夹"，附件里还有四份类似的分析，看来她早就做了，等的只是一个说出来的时机。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 6 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
          ],
        }],
      },
      {
        id: 'xzw_prompt_archaeology_research',
        text: '把这个做成研究',
        outcomes: [{
          weight: 1,
          narrative: '"prompt的演化轨迹可以反映用户的AI认知发展过程，" 你说，"这个数据如果规模化，研究价值很高。" 谢之微停了一下，问"可以用匿名的公开仓库来做吗？" 你说当然可以。她点头，说她知道几个Github上有大量历史commit的AI工具项目，可以用来做语料，然后低头开始记——她的笔记本里已经有一半了，今天聊的只是另一半。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 4 },
            { type: 'unlockIdea', projectId: 'prompt_archaeology' },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  xzw_citation_bomb: {
    id: 'xzw_citation_bomb',
    title: '谢之微：这篇论文的参考文献有点可疑',
    description: [
      '谢之微在调研一个方向，发现了一篇引用量异常高的论文，但里面的实验她怎么看都觉得平平。她对着引用列表看了很久，来找你说了一件事。',
      '"这篇论文的引用来源，有三十七篇出自同一个小型会议，那个会议只有两届，主办者之一是这篇论文的共同作者。"',
      '你问她有没有确认过那三十七篇文章的内容。',
      '"都看了，" 她说，"其中二十一篇互相引用，引用理由很薄。" 她说话很平，不像在八卦，像在汇报审计结果，只是语气稍微有点沉。',
    ],
    prompt: '谢之微发现了可疑的引用模式，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', op: '>=', value: 50 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'xzw_citation_bomb_note',
        text: '记下来，研究里不引这篇',
        outcomes: [{
          weight: 1,
          narrative: '你说"那我们自己的文章里不引，别的不管。" 谢之微点头，把那篇论文标了红色注释："引用来源存疑，不建议直接引用。" 然后继续整理文献。你注意到她的文献库维护得极其干净，每一篇都有她自己的质量标注。不声不响地，已经做了很久了。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 3 },
          ],
        }],
      },
      {
        id: 'xzw_citation_bomb_investigate',
        text: '把这个模式做成检测方法',
        outcomes: [{
          weight: 1,
          narrative: '"如果这种引用网络操作是可以检测出来的，那就值得做一套方法论，" 你说，"你已经有数据了。" 谢之微想了一下，说"我还发现了另外两个类似的案例，当时觉得可能是我多想了，没有说。" 她打开文件夹，那两个案例整理得同样详细，同样有时间戳，像是等待有人来问的书信。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.theory', delta: 5 },
            { type: 'unlockIdea', projectId: 'citation_bomb_defense' },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

};