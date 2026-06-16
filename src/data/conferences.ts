/**
 * 游戏原创会议体系 — 所有会议名称应从此处取用，禁止在事件文本里直接写真实会议名。
 *
 * 设计原则：
 *   第一眼像真实学术会议，第二眼有点不对劲，玩久了发现整个学术圈都有自己的怪毛病。
 * 笑点来自会议文化，而不是名字本身。
 */

export interface ConferenceProfile {
  abbr: string;
  fullName: string;          // 中文全称
  tier: 'top' | 'a' | 'b';
  topics: string;            // 官方主题（一句话）
  culture: string;           // 圈内公认的文化现象
  meme: string;              // 流传最广的梗
  reviewerLore: string;      // 审稿怪谈
}

export const CONFERENCES: Record<string, ConferenceProfile> = {

  // ── 顶级会议 ─────────────────────────────────────────────────────────────

  ICOP: {
    abbr: 'ICOP',
    fullName: '国际开放问题大会',
    tier: 'top',
    topics: '智能系统的基础开放问题',
    culture: '每年讨论同一批问题，每年都有新论文宣称"终于解决了"',
    meme: 'ICOP Best Paper 的真正归宿是成为下一年最大的挑战对象',
    reviewerLore: '3号审稿人从1997年起从未缺席，所有人都知道，没有人能证明',
  },

  GRF: {
    abbr: 'GRF',
    fullName: '泛化与鲁棒性论坛',
    tier: 'top',
    topics: '机器学习的泛化能力与鲁棒性理论',
    culture: '每年必有一篇宣称彻底解决泛化问题，保质期通常不超过八个月',
    meme: 'GRF Best Paper 引用曲线：指数上升 → 断崖 → 消失，教科书级',
    reviewerLore: '有一位审稿人连续十六年要求"与人类表现对比"，即便投稿的是摘要生成',
  },

  // ── A 类会议 ──────────────────────────────────────────────────────────────

  OWRC: {
    abbr: 'OWRC',
    fullName: '开放世界推理大会',
    tier: 'a',
    topics: '不明确——官方描述每届修改一次',
    culture: '没有人能准确说出它到底收什么，但每届都有人中',
    meme: '投OWRC等于盲盒，区别在于盲盒有说明书',
    reviewerLore: '审稿意见经常出现"与您的研究无关，但您应当读一下这篇论文"',
  },

  HMCS: {
    abbr: 'HMCS',
    fullName: '人机协同学术峰会',
    tier: 'a',
    topics: '人工智能与人类协作的边界与方法',
    culture: '所有论文都主张AI无法取代人类，所有论文都用AI写成',
    meme: '摘要里没有"赋能"和"协同"，可能会被当场desk reject',
    reviewerLore: '审稿表"伦理影响"栏强制填写200字；该栏从未被阅读，不填则自动拒稿',
  },

  IISC: {
    abbr: 'IISC',
    fullName: '国际智能系统大会',
    tier: 'a',
    topics: '智能系统的工程实现与落地应用',
    culture: '能跑的系统就有机会，不管理论多薄',
    meme: '会议酒店每届都在郊区，每届都出人意料，结果届届皆同',
    reviewerLore: '审稿人对实验细节要求极高，但从不指出具体缺什么',
  },

};

// 事件文本中直接取用的缩写常量，保持拼写一致
export const CONF = {
  ICOP:  'ICOP',   // 顶级 — 国际开放问题大会
  GRF:   'GRF',    // 顶级 — 泛化与鲁棒性论坛（高压截止文化）
  OWRC:  'OWRC',   // A类 — 开放世界推理大会（方向不明）
  HMCS:  'HMCS',   // A类 — 人机协同学术峰会（AI浪潮口味）
  IISC:  'IISC',   // A类 — 国际智能系统大会（工程导向）
} as const;
