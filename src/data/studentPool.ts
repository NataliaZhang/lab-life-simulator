/**
 * 学生候选池 — 所有可招募的学生定义
 *
 * 简历中只展示：名字、标签、简介、天赋（不暴露原始属性数值）。
 * 具体属性在录取后才能在成员列表中查看。
 *
 * 最终属性 = baseSkills + 各天赋 bonuses。
 */

export interface StudentCandidate {
  id: string;
  name: string;
  pronoun: '他' | '她';
  tagline: string;    // 一句话标签
  bio: string;        // 2-3句简介，风格轻松
  traitIds: string[]; // 1-2 个天赋 ID
  firstMeetingEventId?: string; // 录取后立即注入的第一印象事件
  // 隐藏属性（招募前不显示，录取后由引擎得到最终值）
  baseSkills: { theory: number; engineering: number; social: number };
  baseFavor: number;
  baseHappiness: number;
  farewell?: string; // 好感度100时解锁，写给老师的心里话
}

export const allCandidates: StudentCandidate[] = [
  {
    id: 'lin_xiaojuan',
    name: '林小卷',
    pronoun: '他',
    tagline: '平时不见人，DDL前像开了二档',
    bio: '经常处于一种"项目进度令人担忧"的状态。平时消息回得慢、实验推进得慢、连走路都不太着急。唯独Deadline临近时会进入某种未知形态，连续几天不睡觉，把一个月的工作量压缩进48小时里完成。',
    traitIds: ['ddl_warrior', 'last_minute_genius'],
    firstMeetingEventId: 'lxj_first_meeting',
    baseSkills: { theory: 58, engineering: 48, social: 51 },
    baseFavor: 0,
    baseHappiness: 62,
    farewell: '很多时候，连我自己都不信自己赶得上DDL。\n\n但有个信任我的老师，真棒啊。',
  },
  // 【林小卷 隐藏人设】
  // 核心标签：DDL战神、拖延症晚期、最后一刻奇迹
  // 性格：外向、自来熟，平时看起来很松弛，甚至有点过于松弛。
  // 行为模式：DDL前进度堪忧；DDL期间突然爆种，像被论文之神短暂附体。
  // 笑点来源：永远说"快了"，但只有Deadline真的能让他快起来。
  // 写事件时：多写拖延、催进度、DDL冲刺、半夜补救、惊险过线。
  // 禁止写成理论高手、奇怪论文收藏家或沉默社恐。

  {
    id: 'gu_mianmian',
    name: '顾眠眠',
    pronoun: '她',
    tagline: '我没睡着，我是在后台运行',
    bio: '实验室公认睡眠时间最长的人。曾经在组会上睡着二十分钟，醒来后指出了报告里的关键Bug。没有人知道她到底是在睡觉，还是在进行某种低功耗思考。',
    traitIds: ['sleep_learning', 'dream_debugger'],
    firstMeetingEventId: 'gmm_first_meeting',
    baseSkills: { theory: 42, engineering: 78, social: 28 },
    baseFavor: 0,
    baseHappiness: 65,
    farewell: '我睡觉的时候，其实也在听。\n\n谢谢你让这里足够安静——安静到我愿意一直待在这里。',
  },
  // 【顾眠眠 隐藏人设】
  // 核心标签：睡眠学习法、梦中Debug、八卦雷达
  // 性格：佛系、温和、低存在感，但观察力极强。
  // 行为模式：经常睡觉；醒来时经常直接指出关键问题。
  // 笑点来源：没人知道她什么时候在睡，什么时候在思考。
  // 写事件时：多写睡觉、做梦、突然醒来解决问题、莫名知道所有八卦。
  // 禁止写成懒惰摆烂。

  {
    id: 'ye_zhiqiu',
    name: '叶知秋',
    pronoun: '她',
    tagline: '代码会过时，证明会永存',
    bio: '桌面上永远摊着几篇论文和一本写满批注的笔记本。听说曾经为了避免配置环境，硬生生把实验问题转化成了理论问题。做事认真到让人放心，也认真到让人怀疑人生。',
    traitIds: ['proof_addict', 'reliable_senior'],
    firstMeetingEventId: 'yzq_first_meeting',
    baseSkills: { theory: 89, engineering: 21, social: 44 },
    baseFavor: 0,
    baseHappiness: 48,
    farewell: '很多问题我都想证明，只有一件事不需要证明。\n\n跟着你做研究，是我最正确的选择。',
  },
  // 【叶知秋 隐藏人设】
  // 核心标签：理论怪物、逻辑警察、天然吐槽役
  // 性格：认真、靠谱、善意但过度严谨。
  // 行为模式：遇到模糊表达会本能追问；遇到理论问题极其自信。
  // 笑点来源：对任何不严谨说法都忍不住较真。
  // 写事件时：多写证明、逻辑漏洞、理论讨论、对工程问题的无奈。
  // 禁止写成刻薄或高冷。

  {
    id: 'bai_xiaoman',
    name: '白小满',
    pronoun: '她',
    tagline: '事已至此，先吃饭吧',
    bio: '无论项目炸成什么样，她都能先安慰所有人："至少我们知道这条路不通了。"曾经在服务器宕机、实验全红、Deadline只剩两天的情况下，认真提议先点奶茶，因为"人不能空着肚子崩溃"。',
    traitIds: ['optimistic_heart', 'morale_sunshine'],
    firstMeetingEventId: 'bxm_first_meeting',
    baseSkills: { theory: 36, engineering: 45, social: 82 },
    baseFavor: 0,
    baseHappiness: 84,
    farewell: '老师你知道吗，其实我也有很怕的时候。\n\n但你在的话，我就觉得也没什么大不了的。',
  },
  // 【白小满 隐藏人设】
  // 核心标签：乐观心大、实验室太阳、危机奶茶学
  // 性格：开朗、心大、很会安抚别人，遇事第一反应是"还能救"。
  // 行为模式：自己能力不一定最强，但能显著稳定团队情绪。
  // 笑点来源：越是灾难现场，越能提出生活化但莫名有效的解决方案。
  // 写事件时：多写安慰同学、组织聚餐、危机中点奶茶、把失败解释成"排除错误答案"。
  // 禁止写成傻白甜；她是乐观，不是没脑子。

  {
    id: 'bi_xiaotian',
    name: '毕小天',
    pronoun: '他',
    tagline: '这篇论文虽然离谱，但我觉得有启发',
    bio: '他总能从互联网深处挖出一些把人干沉默的论文标题，并认真解释其中的学术价值。别人看完只想关掉浏览器，他已经开始画后续工作路线图。',
    traitIds: ['weird_paper_collector', 'research_brainstormer'],
    firstMeetingEventId: 'bxt_first_meeting',
    baseSkills: { theory: 64, engineering: 32, social: 70 },
    baseFavor: 0,
    baseHappiness: 66,
    farewell: '每次有新想法，我第一个想要分享的人，都是你。',
  },
  // 【毕小天 隐藏人设】
  // 核心标签：奇怪论文收藏家、脑洞制造机、Workshop雷达
  // 性格：外向、兴奋点奇特，看到冷门方向会立刻精神。
  // 行为模式：总能发现最奇怪的研究方向，并认真讨论其价值。
  // 笑点来源：别人以为他在开玩笑，但他真的读完了论文，还写了related work。因为研究方向过于离谱，毕设被审核打回，导致延毕。
  // 写事件时：多写离谱论文、奇怪Workshop、跨学科脑洞、认真分析荒谬选题，他的想法偶尔还能真的有用。后期成为科普主播。
  {
    id: 'qian_duoduo',
    name: '钱多多',
    pronoun: '他',
    tagline: '所以谁会为它买单？',
    bio: '拥有一种奇怪的能力：总能在别人还在讨论实验结果的时候，率先开始思考用户是谁。组会结束后，别人记住的是结论，钱多多记住的是需求。没人知道他脑子里是不是装着一个24小时在线的产品经理。',
    traitIds: ['startup_saint', 'product_mindset'],
    firstMeetingEventId: 'qdd_first_meeting',
    baseSkills: { theory: 34, engineering: 61, social: 77 },
    baseFavor: 0,
    baseHappiness: 40,
    farewell: '以前我总想着怎么能做出有价值的东西。\n\n后来发现，有些遇见本身就很值。',
  },
  // 【钱多多 隐藏人设】
  // 核心标签：产品经理圣体、创业预备役、需求探测器
  // 性格：热情、自信、行动力强，喜欢拉着别人聊想法。
  // 行为模式：看到任何项目都会思考用户是谁、需求在哪。
  // 笑点来源：别人讨论技术时，他已经开始考虑落地场景。
  // 特殊执念：极度关注真实用户。
  //           "这个有人用吗？"
  //           是他的口头禅。
  // 创业观：喜欢产品，不喜欢空谈。
  //         经常把科研问题转化成现实问题。
  //         偶尔会拉整个实验室参加他的创业计划。
  // 后期揭示：其实很反感纯金融套利和量化捞钱。
  //           对他来说，赚钱不是目标，做出有价值的东西才是。
  // 写事件时：多写创业、用户访谈、产品设计、路演、投资人。
  //           经常把学术讨论带偏到现实世界。
  // 禁止写成拜金角色。

  {
    id: 'he_shixu',
    name: '贺时序',
    pronoun: '她',
    tagline: '老师，您答应我的部分写完了吗？',
    bio: '别人做科研靠灵感，她做科研靠计划。桌面上永远有最新版本的进度表，精确到分钟，而进度表里甚至包含导师本人。',
    traitIds: ['time_manager', 'schedule_is_justice'],
    firstMeetingEventId: 'hsx_first_meeting',
    baseSkills: { theory: 56, engineering: 69, social: 46 },
    baseFavor: 0,
    baseHappiness: 42,
    farewell: '我喜欢按部就班，跟随着计划表走。\n\n唯独毕业离开你的这一天，我一直不太想排进去。',
  },

  // 【贺时序 隐藏人设】
  // 核心标签：反向Push大师、事件管理大师、究极J人
  // 性格：礼貌、冷静、执行力强；不是强势吵闹，而是让人无法反驳。
  // 行为模式：看到没计划的事情会难受，会主动拆任务、定节点、追进度。
  // 笑点来源：导师本来想管理她，结果逐渐被她管理。
  // 经典行为："老师，这个有计划吗？"、"您上次说的下周，是这个周吗？"
  // 写事件时：多写提醒DDL、整理待办、反向催导师、把混乱场面变成流程表。
  // 禁止写成控制狂或讨厌角色；她是真心想让实验室活下来。

  {
    id: 'tang_kuolie',
    name: '唐扩列',
    pronoun: '他',
    tagline: '来都来了，加个好友吧。',
    bio: '参加学术会议最大的收获从来不是论文，而是通讯录。无论是教授、行政老师、企业代表还是路过的校友，只要给他五分钟，他就能聊成哥们儿。',
    traitIds: ['social_terrorist', 'network_magnet'],
    firstMeetingEventId: 'tkl_first_meeting',
    baseSkills: { theory: 36, engineering: 30, social: 92 },
    baseFavor: 0,
    baseHappiness: 62,
    farewell: '我加过很多人的联系方式，但最值得加的，是当初招我进组的那个你。',
  },

  // 【唐扩列 隐藏人设】
  // 核心标签：社交恐怖分子、人脉磁铁、会议之王
  // 性格：热情、自来熟、完全不怕冷场；社交能量高到让旁边的人想充电。
  // 行为模式：见到陌生人会自动开启聊天；参加会议时会把茶歇当主线任务。
  // 笑点来源：总能莫名其妙认识关键人物，并在几个月后触发意外后续。
  // 经典行为："来都来了，加个好友吧。"、"这个人我好像认识。"
  // 写事件时：多写会议、茶歇、Workshop、校友、企业代表、行政老师、合作机会。
  //           经常通过闲聊触发实习、合作、赞助、讲座邀请等后续事件。
  //           有时候会因为忙着和别人打成一片而耽误正事。
  // 禁止写成油腻销售；他是过分真诚的社牛，不是功利型交际花.

  {
    id: 'mo_wenxuan',
    name: '莫问玄',
    pronoun: '他',
    tagline: '代码跑不过，先换个方位。',
    bio: '书包里常年装着塔罗牌、铜钱和不知道从哪里请来的转运挂件。坚信科研虽然讲科学，但成功多少还是需要一点气运。',
    traitIds: ['research_mysticism', 'fortune_engineer'],
    firstMeetingEventId: 'mwx_first_meeting',
    baseSkills: { theory: 58, engineering: 44, social: 63 },
    baseFavor: 0,
    baseHappiness: 58,
    farewell: '入组前我抽了一张牌，是“贵人”。\n\n没告诉你的是，后来这张牌，一直立在我床头。',
  },

  // 【莫问玄 隐藏人设】
  // 核心标签：科研玄学家、塔罗工程师、气运研究员
  // 性格：乐观、自信、神神叨叨，会让别人也忍不住怀疑是不是真的。
  // 行为模式：遇到问题先分析原因，再分析风水。
  // 笑点来源：总能给任何科研问题附加一个玄学解释。
  // 经典行为："今天不宜投稿。"、"GPU朝向不太对。"、"我先抽张牌。"
  // 特殊执念：相信科研成功由实力、运气和仪式感共同决定。
  //           投稿前会抽塔罗。面试前会换幸运T恤。跑实验前会挑良辰吉时。
  // 写事件时：多写塔罗、风水、幸运物、占卜、仪式感。
  //           经常提出离谱解释，但偶尔真的说中了。
  //           会认真统计自己的玄学成功率。

  {
    id: 'xie_zhiwei',
    name: '谢之微',
    pronoun: '她',
    tagline: '我就看看，不会动的。',
    bio: '从小拆光了家里所有电器，长大后开始拆代码。总想看看设备是怎么工作的，系统是怎么跑起来的。至于看完之后会不会顺手改点什么，那就是另一回事了。',
    traitIds: ['curiosity_overload', 'optimization_addict'],
    firstMeetingEventId: 'xzw_first_meeting',
    baseSkills: { theory: 38, engineering: 86, social: 44 },
    baseFavor: 0,
    baseHappiness: 54,
    farewell: '我好像惹过不少麻烦。\n\n但每次回头，都发现你还在那里。',
  },

  // 【谢之微 隐藏人设】
  // 核心标签：代码体质、优化狂魔、技术事故制造机
  // 性格：好奇、专注、行动力极强，对技术问题有近乎本能的兴趣。
  // 行为模式：看到任何系统都会忍不住研究内部结构。看到低效代码会浑身难受。看到重复代码会想重构。
  // 笑点来源：本来只想看看，最后总会拆点什么。
  // 经典行为："我就看看，不会动的。""我顺手优化了一下。""原来的版本还在吗？"
  // 特殊执念：相信任何系统都能更优雅、更快、更合理。对历史包袱和临时补丁有生理不适。很难忍住不去重构别人的代码。
  // 写事件时：多写重构、优化、拆设备、研究底层实现。经常把小Bug修成大工程。修好一个问题的同时引入全新的架构。事故率不低，但技术水平确实很强。

];


export const initialPoolIds: string[] = allCandidates.map(c => c.id);

// These students are more "experienced" archetypes; exclude them from year-1 admission
// so the player encounters them only after the lab has some history.
export const year1RestrictedIds = new Set(['he_shixu', 'tang_kuolie', 'mo_wenxuan']);
