/**
 * English content overlays — text only, keyed by the same IDs as the Chinese source data.
 *
 * Layout:
 *   events/<file>.ts      mirrors src/data/events/<file>.ts for general events
 *   characters/<id>.ts    one pack per main student: profile card + every personal event
 *                         (student-file events, half_favor_<id>, max_favor_<id>, new_year_gift_result_<id>)
 *   traits / projects / achievements.ts   static definitions
 *
 * Project completion events are generated from projectsEn (see events/project_completions.ts).
 */

import type { CandidateTranslation, CharacterPack, EventTranslations } from '../../types/i18n';

import { idleEventsEn } from './events/idle';
import { newsEventsEn } from './events/news';
import { mainlineEventsEn } from './events/mainline';
import { dailyEventsEn } from './events/daily';
import { dailyLifeEventsEn } from './events/daily_life';
import { groupEventsEn } from './events/group_events';
import { studentSpecificEventsEn } from './events/student_specific';
import { conditionalEventsEn } from './events/conditional';
import { endingsEventsEn } from './events/endings';
import { dailyServerEventsEn } from './events/daily_server';
import { dailyReviewerEventsEn } from './events/daily_reviewer';
import { dailyHypeEventsEn } from './events/daily_hype';
import { dailyBureaucracyEventsEn } from './events/daily_bureaucracy';
import { projectIdeasEventsEn } from './events/project_ideas';
import { newYearEventsEn } from './events/new_year';
import { fundingEventsEn } from './events/funding';
import { projectCompletionEventsEn } from './events/project_completions';

import { linXiaojuanEn } from './characters/lin_xiaojuan';
import { guMianmianEn } from './characters/gu_mianmian';
import { yeZhiqiuEn } from './characters/ye_zhiqiu';
import { baiXiaomanEn } from './characters/bai_xiaoman';
import { biXiaotianEn } from './characters/bi_xiaotian';
import { qianDuoduoEn } from './characters/qian_duoduo';
import { heShixuEn } from './characters/he_shixu';
import { tangKuolieEn } from './characters/tang_kuolie';
import { moWenxuanEn } from './characters/mo_wenxuan';
import { xieZhiweiEn } from './characters/xie_zhiwei';

export { traitsEn } from './traits';
export { projectsEn } from './projects';
export { achievementsEn } from './achievements';

export const characterPacksEn: Record<string, CharacterPack> = {
  lin_xiaojuan: linXiaojuanEn,
  gu_mianmian: guMianmianEn,
  ye_zhiqiu: yeZhiqiuEn,
  bai_xiaoman: baiXiaomanEn,
  bi_xiaotian: biXiaotianEn,
  qian_duoduo: qianDuoduoEn,
  he_shixu: heShixuEn,
  tang_kuolie: tangKuolieEn,
  mo_wenxuan: moWenxuanEn,
  xie_zhiwei: xieZhiweiEn,
};

export const candidatesEn: Record<string, CandidateTranslation> = Object.fromEntries(
  Object.entries(characterPacksEn).map(([id, pack]) => [id, pack.profile]),
);

export const eventsEn: EventTranslations = {
  ...idleEventsEn,
  ...newsEventsEn,
  ...mainlineEventsEn,
  ...dailyEventsEn,
  ...dailyLifeEventsEn,
  ...groupEventsEn,
  ...studentSpecificEventsEn,
  ...conditionalEventsEn,
  ...endingsEventsEn,
  ...dailyServerEventsEn,
  ...dailyReviewerEventsEn,
  ...dailyHypeEventsEn,
  ...dailyBureaucracyEventsEn,
  ...projectIdeasEventsEn,
  ...newYearEventsEn,
  ...fundingEventsEn,
  ...projectCompletionEventsEn,
  ...Object.assign({}, ...Object.values(characterPacksEn).map(p => p.events)) as EventTranslations,
};
