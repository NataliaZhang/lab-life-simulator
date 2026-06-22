export interface TraitDef {
  id: string;
  name: string;
  description: string;
  effect: string;
}

export const traitDefs: Record<string, TraitDef> = {

  ddl_warrior: {
    id: 'ddl_warrior',
    name: 'DDL战士',
    description: '截止日期前三天，此人仿佛被外星技术附体。平时拖拖拉拉，Deadline前进化成另一个物种。',
    effect: '负责的项目进度超过75%后，月推进翻倍',
  },

  last_minute_genius: {
    id: 'last_minute_genius',
    name: '灵感爆发',
    description: '平时状态持续处于酝酿中。导师催得越急，输出质量越高。',
    effect: '负责项目时，每月好感+2',
  },

  sleep_learning: {
    id: 'sleep_learning',
    name: '睡眠学习法',
    description: '睡觉的时候在想问题，做梦的时候在验证假设。清醒时反应慢半拍，但从不走弯路。',
    effect: '每月随机技能属性+2',
  },

  dream_debugger: {
    id: 'dream_debugger',
    name: '梦中调试器',
    description: '曾经睡着二十分钟，醒来直接解决一个让全组卡了一周的bug。工程直觉可能来自某个别人没发现的平行宇宙。',
    effect: '负责工程类项目时月推进+3%，否则月推进-1%',
  },

  proof_addict: {
    id: 'proof_addict',
    name: '证明成瘾',
    description: '看到没有严格证明的命题会浑身不适。代码运行正确不够，要证明它为什么正确。曾把一个工程问题硬生生转成理论问题以避免配置环境。',
    effect: '负责需要工程能力的项目时，工程能力要求降低30点，但月推进-1%',
  },

  reliable_senior: {
    id: 'reliable_senior',
    name: '靠谱学长',
    description: '组里的定海神针。遇到证明卡壳、推导走偏，找他准没错。不是最快的那个，但每次都能给出一个让人松一口气的思路。',
    effect: '每月随机为其他一位学生提升2点理论',  // 若其他学生不存在，则无事发生
  },

  optimistic_heart: {
    id: 'optimistic_heart',
    name: '乐观心大',
    description: '灾难现场的精神支柱。服务器崩了、实验全红，第一反应是"没关系，至少我们知道这条路不通了"。',
    effect: '负责的项目被迫中断换人时进度不扣减',
  },

  morale_sunshine: {
    id: 'morale_sunshine',
    name: '实验室太阳',
    description: '存在能显著稳定团队情绪，崩溃时刻提出"先吃饭"这种看似逃避但通常正确的决策。',
    effect: '每月全体学生心情+1',
  },

  weird_paper_collector: {
    id: 'weird_paper_collector',
    name: '奇怪论文收藏家',
    description: '总能从互联网深处挖出让人沉默的论文标题，并认真读完全文。别人以为他在开玩笑，但related work已经写了三页。',
    effect: '每月理论+2',
  },

  research_brainstormer: {
    id: 'research_brainstormer',
    name: '脑洞制造机',
    description: '对任何研究方向都能立刻生成五个后续方向，质量参差不齐但数量稳定。偶尔会说出真正有价值的想法，但周围人已经无法分辨了。',
    effect: '灵感事件触发频率+40%，精力消耗额外+1',
  },

  startup_saint: {
    id: 'startup_saint',
    name: '创业预备役',
    description: '看到任何项目都会思考用户是谁、需求在哪、商业模式如何闭环。"这个有人用吗"是口头禅。',
    effect: '负责的项目完成时，资金额外+5',
  },

  product_mindset: {
    id: 'product_mindset',
    name: '产品经理体质',
    description: '能把任何科研讨论自动翻译成现实需求。组会结束后别人记住的是结论，他记住的是潜在用户画像。',
    effect: '负责的项目完成时，声望额外+3',
  },

  time_manager: {
    id: 'time_manager',
    name: '时间管理大师',
    description: '不只管理自己的时间，会顺手把导师的时间一起管理了。您答应我的部分写完了吗？',
    effect: '导师负责的项目月推进变为1.5倍，但精力消耗+60%',  //精力消耗仅指PI负责项目造成的每月精力消耗，例如原本是15点，变成24点
  },

  schedule_is_justice: {
    id: 'schedule_is_justice',
    name: '计划即正义',
    description: '没有计划的加班是混乱，有计划的加班是项目管理。',
    effect: '每次主动消耗精力时，工程+1', // 包括选择含 energyCost 的选项以及需要精力的项目立项时，工程加1，但不包含 PI 每月负责项目时的精力消耗
  },

  social_terrorist: {
    id: 'social_terrorist',
    name: '社交恐怖分子',
    description: '五分钟内能和任何陌生人聊成哥们儿，不挑对象，不怕冷场，社交能量高到让旁边的人想蹭一蹭充个电。',
    effect: '每月随机使另一位学生好感+2', // 若没有其他学生，则无事发生
  },

  network_magnet: {
    id: 'network_magnet',
    name: '人形磁铁',
    description: '参加学术会议最大的收获永远是通讯录，把茶歇当作主线任务。',
    effect: '负责的项目月推进-1%，但完成后声望额外+5',  // 月推进-1%指额外减少绝对值。例如原本月推进为5%，变为4%
  },

  research_mysticism: {
    id: 'research_mysticism',
    name: '科研玄学家',
    description: '相信科研成功由实力、运气和仪式感共同决定。投稿前抽塔罗，跑实验前选良辰吉时，还会给GPU调整摆放方位。关键是有时候真会灵。',
    effect: '负责的项目月推进在心情高于50时变为1.4倍，在心情低于20变为0.8倍',
  },

  fortune_engineer: {
    id: 'fortune_engineer',
    name: '气运工程师',
    description: '对玄学方法有工程师式的严谨：记录每次预言与结果，持续优化占卜策略。',
    effect: '每月第2次心情变化时，工程+3',
  },

  curiosity_overload: {
    id: 'curiosity_overload',
    name: '好奇心过载',
    description: '好奇心是科研的起点，也是事故的起点。',
    effect: '每月工程+2，但精力-1',
  },

  optimization_addict: {
    id: 'optimization_addict',
    name: '优化狂魔',
    description: '对低效代码有生理不适反应，把顺手优化当成日常动作。给她一个bug，能顺手把整个repo重构了。',
    effect: '每月随机使一个进行中的项目进度+3%',  // 不要求是自己负责的项目，但不能是停滞、待分配的项目。若没有项目符合，则无事发生
  },

};
