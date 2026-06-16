import type { GameEvent } from '../../../types';

export const xieZhiweiEvents: Record<string, GameEvent> = {

  xzw_first_meeting: {
    id: 'xzw_first_meeting',
    title: '我就看看',
    description: [
      '你去楼下接她，发现她蹲在门口的网络设备柜前面，眼睛亮得像猫看到激光点，头快要钻进去了。"这个型号我查过，"她头也不抬，"配置文件写在Flash里，我就想看看它到底是怎么挂载的。"保安大叔在三米外投来困惑的目光。',
      '进了办公室，她扫了一眼你的桌面，停顿了两秒——那两秒里你能清晰地感受到某种克制在发生——然后用一种极其中性的语气开口："老师，你有54个标签页开着，内存快撑不住了。我顺手帮你清一下？设置也可以优化一下，以后不容易堆成这样。"',
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
            narrative: '她点点头，视线以肉眼可见的速度从屏幕上扯回来，坐正，拿出小本子。"那我们说正事。"转换速度快得令人叫绝。但你注意到，在你说话的间隙，她的眼神还是往那54个标签页的方向飘了两次——每次都精确地飘，又精确地收回来。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 3 },
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
            narrative: '她表情从"克制"切换到"专注"，只用了零点五秒。十分钟后，你的电脑焕然一新：标签页清理、扩展精简、缓存调优、启动项瘦身，还顺手推荐了一个标签分组插件。"原来的配置不合理，"她解释，"不怪你，浏览器默认就这样。"你意识到：这个学生每次说"顺手"，背后都藏着一套完整的解决方案。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 2 },
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
      '服务器日志格式乱掉了，你让她"帮忙看一眼"，估计半小时能搞定。这是你犯的第一个错误：对谢知微说"看一眼"。',
      '两个小时后，消息来了："问题解决了。对了，我顺手把日志系统重构了一下——原来的时间戳格式不统一，级别分类也有点混乱，不够优雅。新版可读性好很多。"',
      '你打开仓库：她改了十一个文件。十一个。为了"看一眼"。',
    ],
    prompt: '你怎么回应？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'xzw_just_look_limit',
        text: '划清边界：任务范围就是任务范围',
        outcomes: [
          {
            weight: 1,
            narrative: '"好的，我知道了。"她停顿，"那这次的改动要还原吗？"你说不用，新版确实好用。她回了个"好"，沉默。你能感觉到她在大脑里认真地把这条边界写进了配置文件——但这条边界的有效期，你心里没底。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'xzw_just_look_accept',
        text: '结果好就行，下次提前说一声',
        outcomes: [
          {
            weight: 1,
            narrative: '"好，下次先告诉你。"她听起来很认真，随即又补了一句："日志格式我整理成了一个规范文档，放在docs里了，方便以后维护。"你打开文档：命名规则、等级定义、时间格式，全都写清楚了，比很多正式项目的文档都完整。一次"帮忙看看"，就这样变成了组里沿用至今的日志规范。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
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
      '她把训练脚本优化了，速度快了将近30%，发消息的时候听起来很高兴。你也挺高兴的——直到你跑了一次，发现新脚本的checkpoint格式变了。',
      '不向后兼容。三个月的中间结果，全部无法读取。',
      '你问她。她沉默了大约十五秒。然后回来了四个字："……原来的版本还在吗？"',
    ],
    prompt: '你怎么处理这件事？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 10 },
    ],
    options: [
      {
        id: 'xzw_accidentally_broke_criticize',
        text: '数据比优雅更重要！',
        outcomes: [
          {
            weight: 3,
            narrative: '她没有辩解。"我知道了，我去看看能不能写转换脚本。"她用了整整一天，把旧格式数据大部分成功恢复。末尾发来消息："我在脚本里加了兼容性检查，以后改格式之前会自动提示。"事故解决了。但她沉默了好几天——那种沉默不是赌气，是真的在消化。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: -2 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: -6 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '她没有辩解，但你看得出这件事击中了她。转换脚本写了一天，数据只恢复了一部分，三个月的部分中间结果永久不见了。她后来在commit信息里写："修复格式兼容性；此后所有格式变更必须附兼容说明。"有些教训，亲历了才算真的学会。',
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
        text: '先别说话，开始救数据',
        outcomes: [
          {
            weight: 1,
            narrative: '你们一起趴了一天半，写了一个格式转换脚本，数据大部分救回来了。你事后跟她说："优化没问题，但改兼容性的东西之前先吱一声。"她认真点头，然后说："我在仓库里加一个BREAKING_CHANGES日志文件，以后这类改动都记在里面。"你说好。这个文件她后来维护得极其仔细。',
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
      '没有任何人给她安排任务。她花了一周，把一个核心模块从头重写了：代码量少了60%，性能涨了40%，测试全过。',
      '你打开新代码，读了几分钟，感到一种奇怪的眩晕——不是因为写得不好，而是因为好得让人怀疑你们用的是同一门编程语言。',
      '"原来那个版本太冗余了，看着难受，"她的解释非常简洁，"我重写了一下，顺手加了单元测试。"顺手。',
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
            narrative: '她讲了四十分钟，从设计决策到具体实现，条理清晰，问题接住得干脆。讲完后组里沉默了一会儿，有人说："原来代码可以这么写……"她听到这句话，表情没什么变化，但你注意到她把这条反馈认真记进了本子。有些人被夸了会飘，她不会——她只是在更新自己的基准线。',
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
            narrative: '"主线任务周一就做完了，"她说，表情极度平静，"后来还有时间，就顺手把这个改了。"你沉默了三秒，开始重新估算她的实际产能。"顺手"对她而言不是托辞，是字面意义上的——就是手边没事干，顺着手势把整个模块重构了。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: 5 },
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
      '实验室新来了一台设备，刚开箱、还没开机，快递纸板都没拆完。',
      '你路过，发现她站在设备旁边，手机屏幕朝上，正在看这个型号的拆解视频，眼神专注得像在拆一道数学题。',
      '"我就想看看里面是什么结构，"她说，语气里没有一克心虚，"这个散热方案有点意思。"设备保修贴纸完好，但你感觉到了某种悬在空气里的危险。',
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
            narrative: '"好，那我就不拆。"她把手机放下，但没走——而是继续把设备外壳看了整整三分钟，才转身离开。那三分钟里，你感受到了一种被精确克制住的力量，像是核反应堆外壳在轻微震颤。你后来发现，她把那个拆解视频下载下来存到了本地，归档在一个叫"待研究"的文件夹里。',
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
            narrative: '"好，我记住了。"她掏出手机，打开备忘录，你瞥见她新建了一条："[设备型号] 保修到某年某月——到期后拆解。"她是真的打算等的。你突然意识到，这台设备的保修期结束那天，它的命运早已被写入了某人的日历。',
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
      '这周你没给她额外任务，她应该在推进自己的研究。正常来说，到周五她会发来一条进度更新。',
      '周五下午，消息来了，是一个清单：实验室五个核心工具，全改了，各有10%到40%不等的性能提升，附上benchmark数字和改动说明。',
      '"跑实验的时候手边闲着，"她解释，"低效代码看着太难受了，顺手改了。研究进度没受影响。"五个工具。顺手。跑实验的间隙。',
    ],
    prompt: '你怎么回应这场优化风暴？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 35 },
    ],
    options: [
      {
        id: 'xzw_optimization_spree_report_first',
        text: '感谢，但这类改动要提前报备',
        outcomes: [
          {
            weight: 1,
            narrative: '"好，下次改之前先说。"她认真点头，随即问："改动说明发消息还是开issue？"你说开issue，她当天就把五个改动全部整理成了规范的issue记录——比大部分人的正式汇报写得都详细：背景、改动范围、benchmark对比、潜在风险，一应俱全。你把格式截图发给了组里其他人当参考。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
        ],
      },
      {
        id: 'xzw_optimization_spree_praise',
        text: '直接表扬，这些改动真的有价值',
        outcomes: [
          {
            weight: 1,
            narrative: '她听到表扬，表情没有太大变化，只是点了点头说："还有两个我觉得还可以再优化，但我先把研究做完，不着急。"你意识到对她而言，优化工具和吃饭喝水的性质差不多——是一种近乎生理性的需求，不是在刷存在感。低效代码对她来说真的会不舒服，就像别人对噪音过敏一样。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 1 },
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
      '一个bug让全组卡了将近四天。代码翻了无数遍，加了几十条日志，重跑了各种组合，没有人找到根本原因。气氛开始微妙。',
      '她路过，坐下来，把日志文件拉出来，安静地盯着看了十五分钟。没有动键盘。',
      '然后开口："我大概知道在哪——竞争条件，高并发时两个线程同时写一块缓冲区。"她指了一个函数名，"应该在这附近。"她说话的语气，像是在说今天天气还不错。',
    ],
    prompt: '你怎么回应她的判断？',
    triggerConditions: [
      { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', op: '>=', value: 70 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'xzw_debug_instinct_ask_how',
        text: '先问她怎么看出来的',
        outcomes: [
          {
            weight: 1,
            narrative: '"日志里有一个时间戳重叠，"她说，"在某个频率下，两条不该同时出现的记录挤在一起了。大部分情况看不出来，但高负载下频率够高就会触发。"你们去找了那个函数——bug就在那里，一个没加锁的写操作，藏了四天。全组沉默片刻。她补充说："我顺手加了锁，你们看一下逻辑对不对。"',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 3 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'xzw_debug_instinct_praise',
        text: '先去找那个函数，找到了再夸',
        outcomes: [
          {
            weight: 1,
            narrative: 'Bug就在那里。就是她说的那个位置，一行没加锁的写操作。你回头看她，她已经在写修复方案了。"我顺手加了锁，"她说，"另一个地方有个类似的结构，我也一起改了。"你说这次真的帮了大忙，她点了点头，表情平静，像是终于解开了一道让她浑身不舒服的悬案。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'skills.engineering', delta: 2 },
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
      '你让她修一个小bug，预计半小时。',
      '一小时后她发来pull request：bug修好了，附带一条说明——"我顺手把仓库的commit历史整理了一下，删了二十三个废弃分支，还写了一个贡献指南，放在CONTRIBUTING.md里了。"',
      '你没让她做这些。你打开仓库看了一眼：确实比以前干净了很多。非常多。你盯着那二十三这个数字想了一会儿。',
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
            narrative: '"历史乱的话以后排查问题会很麻烦，"她说，"贡献指南只写了框架，你们觉得有需要再补。"你读了一下：分支命名规范、提交信息格式、review流程，全都写进去了，写得比你见过的大部分开源项目文档都清楚。你把这份文档抄送给了全组，标题写的是：以后按这个来。',
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
        text: '下次超出任务范围先说一声',
        outcomes: [
          {
            weight: 1,
            narrative: '"好，我记住了。"她想了想，补了一句："删分支之前我截图备份过，如果有用的话可以恢复。"你愣了一下：她不是莽撞，她有自己完整的做事流程，只是这套流程里"顺手做更多"是默认选项。明确告诉她边界在哪，她会记住——直到下一次"顺手"的冲动足够强。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 4 },
              { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 2 },
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
      '她发来一页技术备忘录，标题写着"可能有用——供参考"。',
      '内容是：她在"只是看看"另一个领域的实现时，注意到他们处理某类数据的方式和你们当前的瓶颈高度相关。她整理了原理、适用条件，以及如果迁移过来需要改哪些部分。',
      '"我不确定值不值得做，"她说，"但你们看一下，如果有用可以考虑。"这份文档是她等跑实验的时候顺手写的。',
    ],
    prompt: '你怎么处理这个意外发现？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'xie_zhiwei', stat: 'projectProgress', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'xzw_accidental_discovery_evaluate',
        text: '认真评估，这可能是个新方向',
        outcomes: [
          {
            weight: 2,
            narrative: '你把备忘录发给组里讨论，花了两天评估可行性。结论是：核心思路可用，需要适配，但值得试。你告诉她，她的表情是"哦，真的有用"——不是"我早就知道"——她确实只是顺手看了看，没有期待它会成真。这次意外发现最后省掉了几个月的试错时间。',
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
            narrative: '你认真看了一遍，发现几个关键假设在你们的场景下不成立。你把具体原因解释给她听，她听得很认真，在备忘录上做了标注："不适用——原因：X。"然后说："好，那继续原来的路。"她不会因为方向没被采纳就闷闷不乐——对她来说那只是一次排除，而排除也是有用的信息。',
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
            narrative: '"好，我知道了。"她把备忘录存档，注明"待评估"。你后来偶尔会想起那份文档，但事情总是一件接一件。半年后，你在一篇同行的论文里看到了几乎一样的思路，细节描述和她当时发给你的那页纸高度重合。你盯着那篇论文看了一会儿，没有说话。',
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
      '她毕业后去了一家基础设施公司，专门做系统优化——你觉得这个选择非常适合她。',
      '半年后，一封邮件来了，开头说："一切都好，工作很有意思。"然后顺带提了一句：她入职第一个月，把核心服务的请求延迟降了35%。与此同时，她"顺手"改了三个她认为"不够优雅"的模块，引发了一次小规模线上事故，从此作为新人传说在组里流传——标题大概是"天才选手一键优化顺便触发事故"。',
      '"我觉得这个标题不完全公平，"她在邮件里写，"那三个模块本来就该改。"',
      '邮件末尾说：她在整理一套开源工具，想以实验室名义发布，问你是否同意。她说：这些工具有一部分是在这里做研究的时候攒下来的，想还给这里。',
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
            narrative: '她回复很快："谢谢老师，不需要额外支持，我自己搞定，到时候把链接发给你。"三周后，仓库地址来了：工具整理得干净，文档写得清楚，第一天就有人star了。实验室的名字出现在开源项目的作者列表里，你看着那个署名，发现这件事让你比预想的更高兴——有人在更远的地方，还记得这里。',
            effects: [
              { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
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
            narrative: '她发来工具列表和说明，你看了一遍：没有敏感数据，代码质量很高，文档比你预期完整得多。你回复说同意，她说"好"，然后补了一句："我在README里标注了实验室网站链接，格式如果有问题告诉我。"你打开草稿——链接是正确的，格式也对，她已经确认过了。你关上邮件，想了想，觉得她果然还是她。',
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
