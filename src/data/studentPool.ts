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
  tagline: string;    // 一句话标签
  bio: string;        // 2-3句简介，风格轻松
  traitIds: string[]; // 1-2 个天赋 ID
  // 隐藏属性（招募前不显示，录取后由引擎叠加 trait bonuses 得到最终值）
  baseSkills: { theory: number; engineering: number; social: number };
  baseFavor: number;
  baseHappiness: number;
}

export const allCandidates: StudentCandidate[] = [
  {
    id: 'lin_xiaojuan',
    name: '林小卷',
    tagline: '公式推到天亮，bug留给明天',
    bio: '本科数学系跨考CS，据说用推公式的方法debug。组里的理论担当，凌晨三点还在群里发截图是她的日常操作。',
    traitIds: ['innate_theorist', 'night_owl'],
    baseSkills: { theory: 55, engineering: 40, social: 42 },
    baseFavor: 50,
    baseHappiness: 68,
  },
  {
    id: 'gu_mianmian',
    name: '顾眠眠',
    tagline: '不是在训练，就是在睡着去训练的路上',
    bio: '工程能力极强，但永远睡不够。三年前就想研究分布式训练，三年后终于把环境配好了，中间那段时间她本人说全在睡觉。',
    traitIds: ['born_engineer', 'zen_scholar'],
    baseSkills: { theory: 58, engineering: 60, social: 38 },
    baseFavor: 42,
    baseHappiness: 52,
  },
  {
    id: 'ye_zhiqiu',
    name: '叶知秋',
    tagline: '甘特图是生命的尺度',
    bio: '入学第一天就交来了一份详细的五年规划，字迹工整，引用格式规范。是那种"证明思路"比"证明结果"更值得发表的人。',
    traitIds: ['algorithm_whisperer', 'team_player'],
    baseSkills: { theory: 58, engineering: 54, social: 53 },
    baseFavor: 38,
    baseHappiness: 60,
  },
  // {
  //   id: 'chen_mo',
  //   name: '陈默',
  //   tagline: '沉默是最优解，代码说明一切',
  //   bio: '进实验室三个月，说的话加起来不超过二十句，但提交的代码是全组最整洁的。唯一一次主动发言，是指出同组人的变量名拼写错误。',
  //   traitIds: ['born_engineer', 'perfectionist'],
  //   baseSkills: { theory: 48, engineering: 62, social: 35 },
  //   baseFavor: 55,
  //   baseHappiness: 65,
  // },
  // {
  //   id: 'su_xiaotong',
  //   name: '苏晓彤',
  //   tagline: '认识世界上每一个值得认识的人',
  //   bio: '本科在学生会做了四年，认识了半个学校的人。跨考CS的理由是"感觉很酷，而且我听说实验室可以申请经费订咖啡"。',
  //   traitIds: ['social_butterfly', 'team_player'],
  //   baseSkills: { theory: 45, engineering: 40, social: 52 },
  //   baseFavor: 38,
  //   baseHappiness: 65,
  // },
  // {
  //   id: 'fang_yuan',
  //   name: '方远',
  //   tagline: '道可道，非常道；代码可代码，非常代码',
  //   bio: '读了七年哲学后忽然决定转CS，理由是"二者本质相通"。研究方法是先睡觉再解决问题，但结果经常正确，让人无话可说。',
  //   traitIds: ['zen_scholar', 'algorithm_whisperer'],
  //   baseSkills: { theory: 50, engineering: 45, social: 45 },
  //   baseFavor: 42,
  //   baseHappiness: 45,
  // },
  // {
  //   id: 'he_siyu',
  //   name: '贺思雨',
  //   tagline: 'debug是世界上最好的社交活动',
  //   bio: '在实验室认识最多人的不是社牛，而是贺思雨——因为哪里有bug哪里就有她。久而久之大家都认识她了，她的微信成了全组最活跃的那个。',
  //   traitIds: ['bug_hunter', 'social_butterfly'],
  //   baseSkills: { theory: 50, engineering: 55, social: 47 },
  //   baseFavor: 38,
  //   baseHappiness: 60,
  // },
];

export const initialPoolIds: string[] = allCandidates.map(c => c.id);
