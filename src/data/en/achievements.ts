import type { AchievementTranslation } from '../../types/i18n';

// English text for src/data/achievements.ts, keyed by achievement ID.
// The Chinese titles are compact four-character phrases and idioms; the English aims for
// the same feel in a short title rather than a literal gloss.
export const achievementsEn: Record<string, AchievementTranslation> = {
  // ── Opening ───────────────────────────────────────────────────────────────
  lab_own:       { title: 'It Starts Here',   criteria: 'Get a lab of your own' },
  lab_decorated: { title: 'A Fresh Start',    criteria: 'Decorate the lab' },

  // ── Max Rapport (single student) ─────────────────────────────────────────
  max_favor_lin_xiaojuan: { title: 'Late-Night Glow',            criteria: 'Reach max Rapport with Jamie Lin' },
  max_favor_gu_mianmian:  { title: 'An Afternoon of Sunlit Naps', criteria: 'Reach max Rapport with Mina Koo' },
  max_favor_ye_zhiqiu:    { title: 'More Than the Page Can Hold', criteria: 'Reach max Rapport with Ada Yeh' },
  max_favor_bai_xiaoman:  { title: 'Long Live Dessert',          criteria: 'Reach max Rapport with Sunny Bai' },
  max_favor_bi_xiaotian:  { title: 'Absurd, Yet Sound',          criteria: 'Reach max Rapport with Theo Bell' },
  max_favor_qian_duoduo:  { title: 'Not for Sale',               criteria: 'Reach max Rapport with Dorian Vale' },
  max_favor_he_shixu:     { title: 'A File Still Open',          criteria: 'Reach max Rapport with Serena Ho' },
  max_favor_tang_kuolie:  { title: 'Everyone Knows Your Name',   criteria: 'Reach max Rapport with Nico Tang' },
  max_favor_mo_wenxuan:   { title: 'A Most Auspicious Reading',  criteria: 'Reach max Rapport with Orion Moreau' },
  max_favor_xie_zhiwei:   { title: 'On the Same Frequency',      criteria: 'Reach max Rapport with Zoe Hsieh' },

  // ── Max Rapport (everyone) ───────────────────────────────────────────────
  max_favor_all: { title: 'So Glad I Met You All', criteria: 'Reach max Rapport with every character' },

  // ── Endings ──────────────────────────────────────────────────────────────
  tenure_granted:      { title: 'The Clouds Part',      criteria: 'Get tenure' },
  bad_ending:          { title: 'Unfinished Business',  criteria: 'Reach any bad ending' },
  ending_time_wealthy: { title: 'Another Road',         criteria: 'Reach the industry ending' },

  // ── Everyday moments ─────────────────────────────────────────────────────
  first_gift:       { title: 'Happy New Year', criteria: 'Give a student a New Year gift' },
  pi_fifth_burnout: { title: 'Brief Power Outage', criteria: 'Run out of Energy 5 times in one run' },
};
