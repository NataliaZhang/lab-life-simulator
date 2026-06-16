export interface TraitDef {
  id: string;
  name: string;
  description: string;
}

export const traitDefs: Record<string, TraitDef> = {

  innate_theorist: {
    id: 'innate_theorist',
    name: '天生理论家',
    description: '据说这种人在娘胎里就在推公式。入学考试数学满分，但让他调个超参可能要花三小时。对工程细节不太感兴趣，对抽象结构感兴趣到发光。',
  },

  born_engineer: {
    id: 'born_engineer',
    name: '代码体质',
    description: '从小拆光了家里所有电器，长大后开始拆代码。给他一个bug，能顺手把整个repo重构了。',
  },

  social_butterfly: {
    id: 'social_butterfly',
    name: '天生社牛',
    description: '第一天进实验室就认识了半个学院。传说本科时靠人脉解决了三次代码review，没一次是靠技术。理论能力有点……欠缺，但人缘无敌。',
  },

  grind_king: {
    id: 'grind_king',
    name: '时间管理大师',
    description: '早上七点到，晚上十二点走，周末不休息。理论和代码双线进化，效率高得可怕。唯一的问题是每次看见他你都很担心他还剩多少寿命。',
  },

  algorithm_whisperer: {
    id: 'algorithm_whisperer',
    name: '算法直觉',
    description: '看到陌生算法三秒就能估出时间复杂度，被导师问到从不答不上来。但问他怎么想到的，他只会说"感觉对"，然后确实对了。',
  },

  bug_hunter: {
    id: 'bug_hunter',
    name: 'Bug天敌',
    description: '天生对Bug有第六感，盯着日志看五分钟就能定位问题。组里其他人早就把他的微信设置成了专属铃声，半夜发消息也接受。',
  },

  zen_scholar: {
    id: 'zen_scholar',
    name: '佛系学者',
    description: '永远不着急，但速度也不慢，让人完全搞不清他的工作时间线。面对deadline也岁月静好。据说之前导师催稿时他还在研究星座，但论文按时交了。',
  },

  perfectionist: {
    id: 'perfectionist',
    name: '完美主义',
    description: '代码写完要重构三次，论文改到删掉99%才满意。出活很慢，但出来都是精品，导师虽然等得心焦，最后都没话说。',
  },

  team_player: {
    id: 'team_player',
    name: '团队粘合剂',
    description: '天然的气氛担当，组里闹矛盾找他，code review找他，连外卖点什么都找他。毕业之后据说有三个同组人去了同一家公司，原因是"因为他在那"。',
  },

  night_owl: {
    id: 'night_owl',
    name: '夜猫子',
    description: '白天看起来昏昏欲睡，凌晨十二点之后进入最佳状态。所有的神来之笔都发生在消息时间戳是凌晨三点的那些对话里。白天请不要指望他。',
  },

  ddl_warrior: {
    id: 'ddl_warrior',
    name: 'DDL战士',
    description: '截止日期前三天，此人仿佛被外星技术附体。平时拖拖拉拉，Deadline前进化成另一个物种。曾有人凌晨五点在实验室走廊撞见他。',
  },

  last_minute_genius: {
    id: 'last_minute_genius',
    name: '灵感爆发',
    description: '48小时内能完成别人一个月的工作量，前提是必须已经快到了。平时状态持续处于"在酝酿"阶段。导师催得越急，输出质量越高，原理至今成谜。',
  },

  sleep_learning: {
    id: 'sleep_learning',
    name: '睡眠学习法',
    description: '睡觉的时候在想问题，做梦的时候在验证假设。清醒时反应慢半拍，但从不走弯路。组里公认"如果顾眠眠说行，那大概率行"，尽管她说话时眼睛经常是闭着的。',
  },

  dream_debugger: {
    id: 'dream_debugger',
    name: '梦中调试器',
    description: '某种程度上，Bug遇上她就像遇上了天敌。曾经睡着二十分钟，醒来直接指出了让全组卡了一周的问题所在。工程直觉可能来自某个别人没发现的平行宇宙。',
  },

  proof_addict: {
    id: 'proof_addict',
    name: '证明成瘾',
    description: '看到没有严格证明的命题会浑身不适。代码运行正确不够，要证明它为什么正确。曾把一个工程问题硬生生转成理论问题以"避免配置环境"，同组人无言以对。',
  },

  reliable_senior: {
    id: 'reliable_senior',
    name: '靠谱学长',
    description: '交代给的事情不用跟进，到时间自然出现在你桌上，还附带一份检查清单。让人放心到产生一种"只要叶知秋没说不行，这件事就没问题"的迷信。',
  },

  optimistic_heart: {
    id: 'optimistic_heart',
    name: '乐观心大',
    description: '灾难现场的精神支柱。服务器崩了、实验全红、Deadline只剩两天，她的第一反应是"没关系，至少我们知道这条路不通了"。',
  },

  morale_sunshine: {
    id: 'morale_sunshine',
    name: '实验室太阳',
    description: '存在能显著稳定团队情绪，崩溃时刻提出"先吃饭"这种看似逃避但通常正确的决策。所有人都知道找她谈话之后会好受一点，原理不明。',
  },

  weird_paper_collector: {
    id: 'weird_paper_collector',
    name: '奇怪论文收藏家',
    description: '总能从互联网深处挖出让人沉默的论文标题，并认真读完全文。别人以为他在开玩笑，但related work已经写了三页。',
  },

  research_brainstormer: {
    id: 'research_brainstormer',
    name: '脑洞制造机',
    description: '对任何研究方向都能立刻生成五个后续方向，质量参差不齐但数量稳定。组会上偶尔说出真正有价值的想法，但周围人已经无法分辨了。',
  },

  startup_saint: {
    id: 'startup_saint',
    name: '创业预备役',
    description: '看到任何项目都会思考用户是谁、需求在哪、商业模式如何闭环。"这个有人用吗"是口头禅，但他真正在意的不是钱，是有没有人真的需要这个东西。',
  },

  product_mindset: {
    id: 'product_mindset',
    name: '产品经理体质',
    description: '能把任何科研讨论自动翻译成现实需求。组会结束后别人记住的是结论，他记住的是潜在用户画像。经常把学术讨论带偏到落地场景，但偶尔反而帮大家想清楚了。',
  },

  time_manager: {
    id: 'time_manager',
    name: '进度管理大师',
    description: '不只管理自己的时间，会顺手把导师的时间一起管理了。您答应我的部分写完了吗？',
  },

  social_terrorist: {
    id: 'social_terrorist',
    name: '社交恐怖分子',
    description: '五分钟内能和任何陌生人聊成哥们儿，不挑对象，不怕冷场，社交能量高到让旁边的人想蹭一蹭充个电。会议上的茶歇是他的主线任务。',
  },

  network_magnet: {
    id: 'network_magnet',
    name: '人脉磁铁',
    description: '参加学术会议最大的收获永远是通讯录。',
  },

  research_mysticism: {
    id: 'research_mysticism',
    name: '科研玄学家',
    description: '相信科研成功由实力、运气和仪式感共同决定，并认真统计玄学成功率。投稿前抽塔罗，跑实验前选良辰吉时，还会给GPU调整摆放方位。',
  },

  fortune_engineer: {
    id: 'fortune_engineer',
    name: '气运工程师',
    description: '对玄学方法有工程师式的严谨：记录每次预言与结果，持续优化占卜策略。偶尔真的说中了，这件事本身已经成为实验室的不解之谜。',
  },

  curiosity_overload: {
    id: 'curiosity_overload',
    name: '好奇心过载',
    description: '看到任何系统都忍不住研究内部结构。"就看看，不会动的"是她最难实现的承诺。动手能力极强，事故率也相应提升。',
  },

  optimization_addict: {
    id: 'optimization_addict',
    name: '优化狂魔',
    description: '对低效代码有生理不适反应，把"顺手优化"当成日常动作。修好一个bug的同时可能引入全新的架构，属于把小问题修成大工程的典型案例。',
  },

};
