export interface TraitDef {
  id: string;
  name: string;
  description: string; // flamboyant, hints at stat direction — no raw numbers shown
  bonuses: {
    theory?: number;
    engineering?: number;
    social?: number;
    favor?: number;
    happiness?: number;
  };
}

export const traitDefs: Record<string, TraitDef> = {

  innate_theorist: {
    id: 'innate_theorist',
    name: '天生理论家',
    description: '据说这种人在娘胎里就在推公式。入学考试数学满分，但让他调个超参可能要花三小时。对工程细节不太感兴趣，对抽象结构感兴趣到发光。',
    bonuses: { theory: 18, engineering: -5 },
  },

  born_engineer: {
    id: 'born_engineer',
    name: '代码体质',
    description: '从小拆光了家里所有电器，长大后开始拆代码。给他一个bug，能顺手把整个repo重构了。不太喜欢写证明，但系统永远跑得又快又稳。',
    bonuses: { engineering: 15, theory: -5 },
  },

  social_butterfly: {
    id: 'social_butterfly',
    name: '天生社牛',
    description: '第一天进实验室就认识了半个学院。传说本科时靠人脉解决了三次代码review，没一次是靠技术。理论能力有点……欠缺，但人缘无敌。',
    bonuses: { social: 18, theory: -5 },
  },

  grind_king: {
    id: 'grind_king',
    name: '时间管理大师',
    description: '早上七点到，晚上十二点走，周末不休息。理论和代码双线进化，效率高得可怕。唯一的问题是每次看见他你都很担心他还剩多少寿命。',
    bonuses: { theory: 8, engineering: 8, happiness: -15 },
  },

  algorithm_whisperer: {
    id: 'algorithm_whisperer',
    name: '算法直觉',
    description: '看到陌生算法三秒就能估出时间复杂度，被导师问到从不答不上来。但问他怎么想到的，他只会说"感觉对"，然后确实对了。',
    bonuses: { theory: 12, engineering: 8 },
  },

  bug_hunter: {
    id: 'bug_hunter',
    name: 'Bug天敌',
    description: '天生对Bug有第六感，盯着日志看五分钟就能定位问题。组里其他人早就把他的微信设置成了专属铃声，半夜发消息也接受。',
    bonuses: { engineering: 12, favor: 5 },
  },

  zen_scholar: {
    id: 'zen_scholar',
    name: '佛系学者',
    description: '永远不着急，但速度也不慢，让人完全搞不清他的工作时间线。面对deadline也岁月静好。据说之前导师催稿时他还在研究星座，但论文按时交了。',
    bonuses: { happiness: 18, favor: 8, engineering: -5 },
  },

  perfectionist: {
    id: 'perfectionist',
    name: '完美主义',
    description: '代码写完要重构三次，论文改到删掉99%才满意。出活很慢，但出来都是精品，导师虽然等得心焦，最后都没话说。初期磨合成本较高。',
    bonuses: { theory: 10, favor: -5, happiness: -10 },
  },

  team_player: {
    id: 'team_player',
    name: '团队粘合剂',
    description: '天然的气氛担当，组里闹矛盾找他，code review找他，连外卖点什么都找他。毕业之后据说有三个同组人去了同一家公司，原因是"因为他在那"。',
    bonuses: { social: 15, favor: 12 },
  },

  night_owl: {
    id: 'night_owl',
    name: '夜猫子',
    description: '白天看起来昏昏欲睡，凌晨十二点之后进入最佳状态。所有的神来之笔都发生在消息时间戳是凌晨三点的那些对话里。白天请不要指望他。',
    bonuses: { engineering: 12, happiness: -8 },
  },

};
