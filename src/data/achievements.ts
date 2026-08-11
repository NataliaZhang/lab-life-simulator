/**
 * 成就定义 — 图鉴中的"成就"栏目内容。
 *
 * 成就 ID 与触发它的 max_favor 事件 ID 保持一致（见 engine/achievements.ts），
 * 其余成就使用自定义 ID。新增成就只需在此追加定义，并在
 * engine/achievements.ts 的 checkAchievementUnlocks() 中补充触发条件。
 */

import type { AchievementDefinition } from '../types/achievement';

export const achievements: AchievementDefinition[] = [
  // ── 开局 ──────────────────────────────────────────────────────────────────
  {
    id: 'lab_own',
    image: 'img/students/illustration/lab_empty.PNG',
    title: '从这里开始',
    criteria: '获得属于自己的实验室',
  },
  {
    id: 'lab_decorated',
    image: 'img/students/illustration/lab_decorated.PNG',
    title: '焕然一新',
    criteria: '装饰实验室',
  },

  // ── 好感度满值（单人）────────────────────────────────────────────────────
  {
    id: 'max_favor_lin_xiaojuan',
    image: 'img/students/illustration/max_favor/lin_xiaojuan.PNG',
    title: '烟火正好',
    criteria: '林小卷好感度满值',
  },
  {
    id: 'max_favor_gu_mianmian',
    image: 'img/students/illustration/max_favor/gu_mianmian.PNG',
    title: '半日晴眠',
    criteria: '顾眠眠好感度满值',
  },
  {
    id: 'max_favor_ye_zhiqiu',
    image: 'img/students/illustration/max_favor/ye_zhiqiu.PNG',
    title: '纸短情长',
    criteria: '叶知秋好感度满值',
  },
  {
    id: 'max_favor_bai_xiaoman',
    image: 'img/students/illustration/max_favor/bai_xiaoman.PNG',
    title: '甜点万岁',
    criteria: '白小满好感度满值',
  },
  {
    id: 'max_favor_bi_xiaotian',
    image: 'img/students/illustration/max_favor/bi_xiaotian.PNG',
    title: '荒诞成理',
    criteria: '毕小天好感度满值',
  },
  {
    id: 'max_favor_qian_duoduo',
    image: 'img/students/illustration/max_favor/qian_duoduo.PNG',
    title: '非卖之物',
    criteria: '钱多多好感度满值',
  },
  {
    id: 'max_favor_he_shixu',
    image: 'img/students/illustration/max_favor/he_shixu.PNG',
    title: '未完待续的档案',
    criteria: '贺时序好感度满值',
  },
  {
    id: 'max_favor_tang_kuolie',
    image: 'img/students/illustration/max_favor/tang_kuolie.PNG',
    title: '天下谁人不识君',
    criteria: '唐扩列好感度满值',
  },
  {
    id: 'max_favor_mo_wenxuan',
    image: 'img/students/illustration/max_favor/mo_wenxuan.PNG',
    title: '此卦大吉',
    criteria: '莫问玄好感度满值',
  },
  {
    id: 'max_favor_xie_zhiwei',
    image: 'img/students/illustration/max_favor/xie_zhiwei.PNG',
    title: '同频共振',
    criteria: '谢之微好感度满值',
  },

  // ── 好感度满值（全员）────────────────────────────────────────────────────
  {
    id: 'max_favor_all',
    image: 'img/students/illustration/group.png',
    title: '幸好遇见你们',
    criteria: '解锁全部角色好感度满值',
  },

  // ── 结局 ──────────────────────────────────────────────────────────────────
  {
    id: 'tenure_granted',
    image: 'img/students/illustration/tenure_granted.PNG',
    title: '守得云开见月明',
    criteria: '成功通过 tenure',
  },
  {
    id: 'bad_ending',
    image: 'img/students/illustration/bad_ending.jpg',
    title: '未竟之事',
    criteria: '触发任意失败结局',
  },
  {
    id: 'ending_time_wealthy',
    image: 'img/students/illustration/industry.jpg',
    title: '另一条道路',
    criteria: '触发进军业界结局',
  },

  // ── 日常互动 ──────────────────────────────────────────────────────────────
  {
    id: 'first_gift',
    image: 'img/students/illustration/gift_box.jpg',
    title: '新年快乐',
    criteria: '给学生送新年礼物',
  },
  {
    id: 'pi_fifth_burnout',
    image: 'img/students/illustration/hospital.PNG',
    title: '偶尔断电',
    criteria: '同一局内精力耗尽5次',
  },
];

export const achievementById: Record<string, AchievementDefinition> =
  Object.fromEntries(achievements.map(a => [a.id, a]));
