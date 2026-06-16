import type { ProjectDefinition } from '../types/project';

// ─── Project Definitions ───────────────────────────────────────────────────
// All playable projects. Ideas are unlocked via event outcomes (unlockIdea effect).
// Projects are grouped by difficulty: tutorial (12%/mo), short (8-10%/mo), normal (5%/mo), long (3%/mo).
//
// Startup costs reflect project nature:
//   Energy only  → mainly PI/student time and effort (no external resources)
//   Funding only → requires compute, licenses, or external data access
//   Both         → needs significant PI investment AND external resources

export const projectDefinitions: ProjectDefinition[] = [

  // ── Tutorial Project（新手引导，12%/月，~8个月可完成）──────────────────────

  {
    id: 'meeting_minutes_assistant',
    name: '组会纪要小助手',
    description: '训练一个小模型，把组会录音自动整理成有条理的纪要。核心功能：让"大家讨论了很多"变得可以被追责。',
    completionSummary: '工具正式上线。纪要质量显著提升，各项决议一目了然——所有人开始用它证明自己"发言贡献最多"，组会时长因此增加了 20%。',
    ideaSources: ['组会纪要失踪事件'],
    startupEnergyCost: 5,   // 纯编码工作，靠自己时间就够了
    startupFundingCost: 0,
    theoryRequired: 10,
    engineeringRequired: 10,
    socialRequired: 10,
    baseMonthlyProgress: 12,
    fundingReward: 6,
    reputationReward: 2,
  },

  // ── Short Projects（8-10%/月，~10-13个月可完成）────────────────────────────

  {
    id: 'advisor_reply_predictor',
    name: '导师回复预测',
    description: '根据聊天记录预测导师何时回复消息。',
    completionSummary: '实验表明，97.3% 的导师回复延迟符合泊松分布，置信区间内存在显著"周五消失效应"，预测准确率 89%。',
    ideaSources: ['等待回复的漫长时光', '学生日常抱怨', '消息已读不回事件'],
    startupEnergyCost: 15,  // 挖历史聊天记录，靠自己时间
    startupFundingCost: 0,
    theoryRequired: 25,
    engineeringRequired: 25,
    socialRequired: 30,
    baseMonthlyProgress: 10,
    fundingReward: 12,
    reputationReward: 5,
  },

  {
    id: 'auto_rebuttal',
    name: '自动 Rebuttal',
    description: '利用历史审稿数据自动生成高质量 Rebuttal。',
    completionSummary: '我们提出的系统在十个顶会数据集上平均得分超越人类作者 23%，但 Reviewer #3 仍认为"逻辑不够严密"。',
    ideaSources: ['收到拒稿通知', '审稿会议事件', 'Reviewer #2 事件', '学生讨论事件'],
    startupEnergyCost: 0,
    startupFundingCost: 8,  // 需要购买 API 调用额度和历史审稿数据集
    theoryRequired: 30,
    engineeringRequired: 25,
    socialRequired: 25,
    baseMonthlyProgress: 10,
    fundingReward: 15,
    reputationReward: 6,
  },

  {
    id: 'campus_agent',
    name: '校园 Agent',
    description: '打造一个能替学生完成日常琐事的校园智能体。',
    completionSummary: '原型系统在九种教务场景下完成自动化操作，但在"盖章申请"流程中遭遇了现实世界的边界：必须本人到场。',
    ideaSources: ['行政繁琐事件', '教务系统崩溃事件', '学生抱怨会议'],
    startupEnergyCost: 20,  // 纯工程项目，主要靠学生写代码
    startupFundingCost: 0,
    theoryRequired: 30,
    engineeringRequired: 30,
    socialRequired: 25,
    baseMonthlyProgress: 8,
    fundingReward: 14,
    reputationReward: 6,
  },

  {
    id: 'meeting_translator',
    name: '组会翻译',
    description: '将组会发言实时翻译为人类可理解的语言。',
    completionSummary: '系统对 200 场组会录音的翻译准确率达 91%，其中最难处理的句型是"就是说……那个……你懂的"。',
    ideaSources: ['组会混乱事件', '学生互相听不懂事件', '导师发言解读'],
    startupEnergyCost: 10,  // 需要录音 + 调 API
    startupFundingCost: 5,
    theoryRequired: 25,
    engineeringRequired: 30,
    socialRequired: 30,
    baseMonthlyProgress: 8,
    fundingReward: 13,
    reputationReward: 5,
  },

  {
    id: 'email_politeness_tax',
    name: '邮件礼貌税',
    description: '分析称呼礼貌程度与邮件回复率之间的因果关系。',
    completionSummary: '每增加一个"辛苦了"可提升回复率 11%，但超过三个后效果递减，并触发收件人的"这人有目的"预警机制。',
    ideaSources: ['写邮件找人帮忙', '等回复太久', '学生邮件写法讨论'],
    startupEnergyCost: 15,  // 纯行为研究，整理自己的邮件就够了
    startupFundingCost: 0,
    theoryRequired: 25,
    engineeringRequired: 20,
    socialRequired: 35,
    baseMonthlyProgress: 10,
    fundingReward: 11,
    reputationReward: 5,
  },

  {
    id: 'night_code_effect',
    name: '夜间代码效应',
    description: '对比凌晨两点与上午十点写出代码的质量差异。',
    completionSummary: '夜间代码注释密度低 58%，变量命名创意性高 40%，且 73% 的"天才方案"在次日早晨会失去可读性。',
    ideaSources: ['学生熬夜 debug', '凌晨提交 commit 事件', '服务器日志时间分析'],
    startupEnergyCost: 15,  // 分析现有 git 日志即可，不需要外部资源
    startupFundingCost: 0,
    theoryRequired: 25,
    engineeringRequired: 30,
    socialRequired: 20,
    baseMonthlyProgress: 8,
    fundingReward: 12,
    reputationReward: 5,
  },

  // ── Normal Projects（5%/月，~20个月可完成）───────────────────────────────

  {
    id: 'code_archaeology',
    name: '代码考古学',
    description: '从历史提交记录中重建失传系统设计。',
    completionSummary: '从 134 个无文档遗留仓库中成功重建设计意图，准确率 71%，其中 12 个项目的原作者已无法联系确认。',
    ideaSources: ['祖传仓库事件', '神秘进程事件', '谢知微事件'],
    startupEnergyCost: 15,  // 需要大量人工标注 + 一些存储成本
    startupFundingCost: 8,
    theoryRequired: 35,
    engineeringRequired: 40,
    socialRequired: 25,
    baseMonthlyProgress: 5,
    fundingReward: 25,
    reputationReward: 9,
  },

  {
    id: 'reviewer_alignment',
    name: 'Reviewer 对齐',
    description: '训练模型模拟不同会议审稿人的偏好，提前对齐论文风格。',
    completionSummary: '经 2.3 万条历史审稿记录训练后，模型可以 82% 准确率预测审稿结论，但拒绝透露具体原因。',
    ideaSources: ['审稿意见解读事件', 'Reviewer #2 事件', '投稿结果事件'],
    startupEnergyCost: 0,
    startupFundingCost: 15, // OpenReview 数据许可 + GPU 训练费用
    theoryRequired: 40,
    engineeringRequired: 35,
    socialRequired: 30,
    baseMonthlyProgress: 5,
    fundingReward: 28,
    reputationReward: 10,
  },

  {
    id: 'coffee_social_network',
    name: '茶歇社交网络',
    description: '分析学术茶歇的社交结构，建模非正式合作关系的形成。',
    completionSummary: '分析 6 个月茶歇记录后发现，80% 的跨组合作起源于等咖啡机的 3 分钟，该时段 ROI 显著高于正式组会。',
    ideaSources: ['茶歇闲聊事件', '组会后聚餐事件', '学术会议社交事件'],
    startupEnergyCost: 25,  // 纯田野调查，观察记录就够了
    startupFundingCost: 0,
    theoryRequired: 30,
    engineeringRequired: 35,
    socialRequired: 40,
    baseMonthlyProgress: 5,
    fundingReward: 22,
    reputationReward: 9,
  },

  {
    id: 'ddl_reinforcement',
    name: 'DDL 强化学习',
    description: '用强化学习策略最大化在 deadline 前完成任务的总收益。',
    completionSummary: '智能体习得了一种被称为"最后两小时爆发"的最优策略，与对照组人类行为的行动序列相似度高达 91%。',
    ideaSources: ['赶截止日期事件', '学生熬夜事件', '惨烈的组会事件'],
    startupEnergyCost: 0,
    startupFundingCost: 15, // RL 训练需要大量 GPU 时间
    theoryRequired: 40,
    engineeringRequired: 40,
    socialRequired: 30,
    baseMonthlyProgress: 5,
    fundingReward: 30,
    reputationReward: 11,
  },

  {
    id: 'meme_propagation',
    name: '学术梗传播',
    description: '建模学术圈内部梗图的扩散机制与群体认同效应。',
    completionSummary: '学术圈内部梗图平均存活周期 18 天，跨越三个子领域后自发变异率达 40%，且变异方向不可预测。',
    ideaSources: ['学术社群事件', '实验室内网事件', '学生讨论事件'],
    startupEnergyCost: 25,  // 主要靠观察和手工标注，不需要多少钱
    startupFundingCost: 0,
    theoryRequired: 35,
    engineeringRequired: 30,
    socialRequired: 40,
    baseMonthlyProgress: 5,
    fundingReward: 24,
    reputationReward: 10,
  },

  {
    id: 'ai_paper_detection',
    name: 'AI 论文鉴定',
    description: '构建分类器检测学术论文是否由 AI 生成。',
    completionSummary: '检测器对 AI 生成论文准确率达 94%，但在检测"人类仿 AI 写作风格"时准确率降至 51%，接近随机猜测。',
    ideaSources: ['AI 浪潮事件', '论文质量争议事件', '学生提交作业事件'],
    startupEnergyCost: 0,
    startupFundingCost: 12, // 购买标注数据集 + 模型训练算力
    theoryRequired: 38,
    engineeringRequired: 40,
    socialRequired: 28,
    baseMonthlyProgress: 5,
    fundingReward: 26,
    reputationReward: 10,
  },

  {
    id: 'graduation_delay_predictor',
    name: '毕业进度预警',
    description: '从提交频率和消息回复速度预测学生是否会延期毕业。',
    completionSummary: '基于提交频率、消息回复延迟和签到时间的模型，可在 6 个月前以 79% 准确率预测延期毕业，导师普遍表示"早知道就好了"。',
    ideaSources: ['学生拖延事件', '毕业季焦虑事件', '组会进度汇报'],
    startupEnergyCost: 25,  // 分析实验室内部数据，不需要外部资源
    startupFundingCost: 0,
    theoryRequired: 35,
    engineeringRequired: 35,
    socialRequired: 30,
    baseMonthlyProgress: 5,
    fundingReward: 24,
    reputationReward: 9,
  },

  {
    id: 'citation_network_mining',
    name: '引用网络挖掘',
    description: '发现隐藏在引用关系中的学术小圈子结构。',
    completionSummary: '在 5000 篇论文构成的引用图中，发现了 17 个高度自洽的"引用帮派"，其中最大的包含 4 位作者，总互引次数超过 300。',
    ideaSources: ['文献调研事件', '论文引用争议', '数据集下载事件'],
    startupEnergyCost: 0,
    startupFundingCost: 15, // 需要购买 Semantic Scholar 全量数据 + 图计算集群
    theoryRequired: 42,
    engineeringRequired: 38,
    socialRequired: 28,
    baseMonthlyProgress: 5,
    fundingReward: 27,
    reputationReward: 10,
  },

  {
    id: 'hyperparameter_divination',
    name: '超参数玄学',
    description: '将炼丹过程形式化为贝叶斯优化，研究其与直觉调参的差异。',
    completionSummary: '对 1200 次调参记录分析后发现，专家与新手的最终调参结果无显著差异（p=0.07），但前者平均少喝了 2.3 杯咖啡。',
    ideaSources: ['GPU 跑实验事件', '炼丹失败事件', '莫问玄玄学事件'],
    startupEnergyCost: 15,  // 跑大量实验需要时间 + GPU 费用
    startupFundingCost: 8,
    theoryRequired: 40,
    engineeringRequired: 42,
    socialRequired: 25,
    baseMonthlyProgress: 5,
    fundingReward: 26,
    reputationReward: 10,
  },

  {
    id: 'whiteboard_erasure_theorem',
    name: '白板消失定理',
    description: '记录那些被擦掉前没来得及拍照的重要推导。',
    completionSummary: '调查显示，47% 的研究人员曾擦掉"非常重要"的内容，其中 23% 已无法复现，定理因此永久消失于学术史。',
    ideaSources: ['组会白板被擦事件', '突然有灵感事件', '实验室会议室争夺'],
    startupEnergyCost: 25,  // 发问卷、访谈、整理数据，不需要外部资金
    startupFundingCost: 0,
    theoryRequired: 35,
    engineeringRequired: 30,
    socialRequired: 35,
    baseMonthlyProgress: 5,
    fundingReward: 23,
    reputationReward: 9,
  },

  {
    id: 'server_downtime_oracle',
    name: '宕机先知',
    description: '用机器学习预测 GPU 集群何时崩溃。',
    completionSummary: '基于 GPU 利用率曲线、存储增长速率和当日天气的多模态模型，宕机预测提前量可达 4.7 小时，准确率 83%。',
    ideaSources: ['服务器崩溃事件', 'GPU 爆内存事件', '深夜宕机抢救事件'],
    startupEnergyCost: 20,  // 使用实验室自己的监控数据，主要是时间成本
    startupFundingCost: 0,
    theoryRequired: 38,
    engineeringRequired: 42,
    socialRequired: 25,
    baseMonthlyProgress: 5,
    fundingReward: 26,
    reputationReward: 10,
  },

  {
    id: 'conference_social_matching',
    name: '会议社交匹配',
    description: '在学术会议上为与会者智能推荐最值得认识的人。',
    completionSummary: '算法在三次模拟会议中匹配的合作者，后续论文产出比随机匹配高出 2.1 倍，但拒绝承认这是"缘分"。',
    ideaSources: ['学术会议社交事件', '茶歇遇到大佬', '唐扩列人脉事件'],
    startupEnergyCost: 15,  // 算法设计 + 购买会议注册者数据
    startupFundingCost: 8,
    theoryRequired: 32,
    engineeringRequired: 35,
    socialRequired: 42,
    baseMonthlyProgress: 5,
    fundingReward: 24,
    reputationReward: 10,
  },

  {
    id: 'meeting_game_theory',
    name: '组会博弈论',
    description: '用博弈论分析组会出勤与汇报的最优策略。',
    completionSummary: '纳什均衡分析表明，在组会中最优策略是"前 10 分钟认真听，一旦发现导师走神即切换为刷论文"。',
    ideaSources: ['组会出勤问题', '学生摸鱼策略讨论', '开会效率反思'],
    startupEnergyCost: 25,  // 纯理论研究 + 问卷，不需要钱
    startupFundingCost: 0,
    theoryRequired: 40,
    engineeringRequired: 28,
    socialRequired: 35,
    baseMonthlyProgress: 5,
    fundingReward: 22,
    reputationReward: 9,
  },

  {
    id: 'acknowledgment_network',
    name: '致谢关系图谱',
    description: '从论文致谢段落反向还原学术圈人际关系网络。',
    completionSummary: '从 12000 篇论文的致谢段落中，还原出 891 个节点的学术人情网络，其中最核心的节点是一位默默无闻的审稿编辑。',
    ideaSources: ['论文写致谢事件', '投稿感谢审稿人', '学术人际关系讨论'],
    startupEnergyCost: 15,  // 爬虫 + arXiv API 有速率限制，得花点钱买存储
    startupFundingCost: 5,
    theoryRequired: 35,
    engineeringRequired: 35,
    socialRequired: 38,
    baseMonthlyProgress: 5,
    fundingReward: 24,
    reputationReward: 10,
  },

  {
    id: 'abstract_compression',
    name: '摘要压缩极限',
    description: '在保留核心贡献的前提下，将论文压缩至 100 字。',
    completionSummary: '顶会论文平均可压缩至原长度 18% 而不损失核心贡献，但"局限性"部分消失率高达 94%——这或许并非巧合。',
    ideaSources: ['写摘要太难事件', '论文太长审稿人不看', '字数限制抓狂'],
    startupEnergyCost: 0,
    startupFundingCost: 12, // 购买 Semantic Scholar 引用数据 + 阅读量数据
    theoryRequired: 38,
    engineeringRequired: 30,
    socialRequired: 35,
    baseMonthlyProgress: 5,
    fundingReward: 23,
    reputationReward: 9,
  },

  // ── Long Projects（3%/月，~33个月可完成）─────────────────────────────────

  {
    id: 'procrastination_model',
    name: '拖延行为建模',
    description: '对学术人群的拖延决策过程进行因果建模与干预实验。',
    completionSummary: '计算模型将拖延行为分解为七个离散决策节点，其中最关键的一步是"打开文档后切去看了视频"（占比 38%）。',
    ideaSources: ['学生拖延事件', '组会拖更事件', '毕业季焦虑事件'],
    startupEnergyCost: 20,  // IRB 申请 + 行为追踪部署 + 参与者补偿
    startupFundingCost: 12,
    theoryRequired: 45,
    engineeringRequired: 40,
    socialRequired: 35,
    baseMonthlyProgress: 3,
    fundingReward: 45,
    reputationReward: 15,
  },

  {
    id: 'lucky_shirt_causality',
    name: '幸运T恤因果推断',
    description: '通过随机对照实验验证穿幸运衣物是否真的影响科研产出。',
    completionSummary: '双盲实验显示幸运服装对科研产出无显著影响（p=0.34），但 73% 的参与者表示实验结束后仍会继续穿。',
    ideaSources: ['迷信行为讨论', '幸运物品事件', '实验室玄学事件'],
    startupEnergyCost: 20,  // RCT 设计 + 追踪一个月 + 参与者激励费用
    startupFundingCost: 15,
    theoryRequired: 50,
    engineeringRequired: 40,
    socialRequired: 35,
    baseMonthlyProgress: 3,
    fundingReward: 50,
    reputationReward: 16,
  },

  {
    id: 'prompt_archaeology',
    name: 'Prompt 考古学',
    description: '从大模型的行为反推其训练时期的 Prompt 设计演变史。',
    completionSummary: '通过系统性诱导测试，成功还原了 GPT-3 时代 7 个不同版本系统提示的演变路径，其中最早版本措辞非常礼貌。',
    ideaSources: ['大模型奇怪输出事件', '学生调试 AI 事件', '技术讨论事件'],
    startupEnergyCost: 0,
    startupFundingCost: 20, // 大量 API 调用费用，几万次探测请求
    theoryRequired: 50,
    engineeringRequired: 45,
    socialRequired: 35,
    baseMonthlyProgress: 3,
    fundingReward: 48,
    reputationReward: 16,
  },

  {
    id: 'mediocre_paper_detector',
    name: '水会检测系统',
    description: '构建自动识别低质量学术论文的分类器。',
    completionSummary: '分类器在测试集上 F1 达 0.87，但当被要求对自身产出的分析报告进行分类时，给出了"存疑"并请求人工复核。',
    ideaSources: ['论文质量争议', '学术灌水讨论', '审稿工作量抱怨'],
    startupEnergyCost: 20,  // 需要人工标注大量论文质量 + GPU 训练
    startupFundingCost: 15,
    theoryRequired: 45,
    engineeringRequired: 45,
    socialRequired: 35,
    baseMonthlyProgress: 3,
    fundingReward: 46,
    reputationReward: 15,
  },

  {
    id: 'citation_bomb_defense',
    name: '引用炸弹防御',
    description: '检测并阻断学术圈中的组团互引行为。',
    completionSummary: '我们识别并追踪了 53 起引用操控事件，发现参与者的平均 H-index 因此提升 3.2 点，且无一人受到处分。',
    ideaSources: ['引用数量焦虑', '同行竞争事件', '学术诚信讨论'],
    startupEnergyCost: 0,
    startupFundingCost: 20, // 全量引用图数据库订阅 + 大规模图计算基础设施
    theoryRequired: 48,
    engineeringRequired: 42,
    socialRequired: 38,
    baseMonthlyProgress: 3,
    fundingReward: 47,
    reputationReward: 16,
  },

  {
    id: 'defense_breakdown_predictor',
    name: '答辩崩溃预测',
    description: '通过体征数据预测答辩现场崩溃概率。',
    completionSummary: '穿戴设备数据显示，心率骤升和声音颤抖在 87% 的情况下发生于委员会提问"那这个消融实验……"之后的 3 秒内。',
    ideaSources: ['学生答辩准备事件', '毕业焦虑高峰期', '答辩失败传说'],
    startupEnergyCost: 20,  // 购买穿戴设备 + 招募被试 + 大量时间陪练
    startupFundingCost: 15,
    theoryRequired: 45,
    engineeringRequired: 40,
    socialRequired: 40,
    baseMonthlyProgress: 3,
    fundingReward: 46,
    reputationReward: 15,
  },

  {
    id: 'academic_six_degrees',
    name: '学术六度空间',
    description: '计算任意两位学者之间合作关系的最短路径。',
    completionSummary: '分析 220 万篇论文后，CS 领域任意两位作者平均距离为 4.2，但图灵奖得主之间仅为 2.8——他们彼此都认识。',
    ideaSources: ['文献调研发现', '学术人脉分析', '会议上认识大佬'],
    startupEnergyCost: 0,
    startupFundingCost: 25, // 全量合著图数据 + 集群计算资源（220万篇论文不是小数）
    theoryRequired: 52,
    engineeringRequired: 48,
    socialRequired: 38,
    baseMonthlyProgress: 3,
    fundingReward: 60,
    reputationReward: 18,
  },

  {
    id: 'ai_review_alignment',
    name: 'AI 审稿对齐',
    description: '训练模型使其审稿风格与顶会历史接受偏好精确对齐。',
    completionSummary: 'RLHF 训练后的审稿模型接受率与目标会议历史接受率仅差 2.1%，但对自身所在机构产出的论文给出了满分。',
    ideaSources: ['审稿偏见讨论', 'Reviewer #2 事件', '投稿策略研究'],
    startupEnergyCost: 0,
    startupFundingCost: 25, // RLHF 训练开销相当大，还需要标注者
    theoryRequired: 55,
    engineeringRequired: 48,
    socialRequired: 38,
    baseMonthlyProgress: 3,
    fundingReward: 58,
    reputationReward: 18,
  },

  {
    id: 'late_submission_effect',
    name: '深夜提交效应',
    description: '研究提交时间戳与论文接受率之间的隐藏关联。',
    completionSummary: '对 8 万条提交记录分析表明，午夜前 5 分钟提交的论文接受率比正常时段高 6%，该效应不受时区影响，机制成谜。',
    ideaSources: ['赶截止日期提交', '最后一分钟上传', '提交时间迷信讨论'],
    startupEnergyCost: 35,  // OpenReview 数据是公开的，主要靠时间和细致分析
    startupFundingCost: 0,
    theoryRequired: 48,
    engineeringRequired: 42,
    socialRequired: 35,
    baseMonthlyProgress: 3,
    fundingReward: 55,
    reputationReward: 17,
  },

  {
    id: 'dolphin_llm',
    name: '海豚语言模型',
    description: '构建首个海豚-人类跨物种对话模型。',
    completionSummary: '在 280 小时声纹数据训练后，模型生成的对话内容获得海豚平均评分 3.7/5，实验人员无法区分真假海豚发音。',
    ideaSources: ['海豚 Workshop 事件', '毕小天事件', '奇怪论文事件', '跨学科讨论事件'],
    startupEnergyCost: 20,  // 联系海洋研究所 + 专用声纹设备 + 大量训练算力
    startupFundingCost: 20,
    theoryRequired: 55,
    engineeringRequired: 50,
    socialRequired: 45,
    baseMonthlyProgress: 3,
    fundingReward: 72,
    reputationReward: 22,
  },
];

// Lookup map for fast access by ID
export const projectById: Record<string, ProjectDefinition> = Object.fromEntries(
  projectDefinitions.map(p => [p.id, p]),
);
