/**
 * 事件聚合器 — 合并所有分类事件，对外暴露统一接口
 *
 * 外部使用方不需要知道事件来自哪个文件，
 * 只需 import { events, openingEventIds, monthlyEventPool } from '../data/events'
 */

import { idleEvents } from './idle';
import { newsEvents } from './news';
import { mainlineEvents } from './mainline';
import { dailyEvents } from './daily';
import { labLifeEvents } from './daily_life';
import { groupEvents } from './group_events';
import { studentSpecificEvents } from './student_specific';
import { conditionalEvents } from './conditional';
import { endingEvents } from './endings';
import { serverEvents } from './daily_server';
import { reviewerEvents } from './daily_reviewer';
import { hypeEvents } from './daily_hype';
import { bureaucracyEvents } from './daily_bureaucracy';
import { linXiaojuanEvents } from './students/lin_xiaojuan';
import { guMianmianEvents } from './students/gu_mianmian';
import { yeZhiqiuEvents } from './students/ye_zhiqiu';
import { baiXiaomanEvents } from './students/bai_xiaoman';
import { biXiaotianEvents } from './students/bi_xiaotian';
import { qianDuoduoEvents } from './students/qian_duoduo';
import { heShixuEvents } from './students/he_shixu';
import { tangKuolieEvents } from './students/tang_kuolie';
import { moWenxuanEvents } from './students/mo_wenxuan';
import { xieZhiweiEvents } from './students/xie_zhiwei';

import type { GameEvent } from '../../types';

export { endingEventIds, specialEndingIds, timeEndingIds } from './endings';
export { idleEventIds } from './idle';

export const events: Record<string, GameEvent> = {
  ...idleEvents,
  ...newsEvents,
  ...mainlineEvents,
  ...dailyEvents,
  ...labLifeEvents,
  ...groupEvents,
  ...studentSpecificEvents,
  ...conditionalEvents,
  ...endingEvents,
  ...serverEvents,
  ...reviewerEvents,
  ...hypeEvents,
  ...bureaucracyEvents,
  ...linXiaojuanEvents,
  ...guMianmianEvents,
  ...yeZhiqiuEvents,
  ...baiXiaomanEvents,
  ...biXiaotianEvents,
  ...qianDuoduoEvents,
  ...heShixuEvents,
  ...tangKuolieEvents,
  ...moWenxuanEvents,
  ...xieZhiweiEvents,
};

// ── 开局序列（固定顺序，不随机）─────────────────────────────────────────────
export const openingEventIds: string[] = [
  'lab_opening',
  'startup_grant',
];

// ── 每月随机池 ────────────────────────────────────────────────────────────────
// 注：chain 事件（investigation_result 等）只通过 nextEventIds 注入，不在此列表中
// 注：ending 事件由 monthlyUpdate 中的 checkEndingConditions 单独处理，不在此列表中
export const monthlyEventPool: string[] = [
  // 主线 — 核心科研推进
  'suspicious_results',
  'conference_ddl',
  'grant_deadline',

  // 日常随机
  'gpu_oom',
  'student_allnighter',
  'reviewer_two',
  'lab_meeting_drama',
  'nan_loss',
  'advisor_left_on_read',

  // 实验室日常生活（小事变大事系列）
  'coffee_machine_crisis',
  'whiteboard_immortal',
  'mystery_fridge_encounter',
  'ac_warfare',
  'visitor_worst_timing',
  'eternal_todo_unearthed',
  'desk_archaeology',
  'lab_stray_cat',
  'printing_apocalypse',

  // 全组事件（triggerConditions: minStudentCount: 3，含"大家""组里"等集体语言）
  'group_conference_ddl',
  'group_celebration',
  'arxiv_scooped',

  // 学生专属（triggerConditions 控制时机）
  'lin_theory_breakthrough',
  'gu_engineering_milestone',

  // 属性触发（triggerConditions 控制时机）
  'student_sick',
  'favor_complaint',
  'transfer_risk',
  'collaboration_offer',

  // 服务器灾难事件（GPU/存储/环境）
  'mystery_process',
  'server_day_1000',
  'storage_crisis',
  'pip_nuclear',
  'midnight_maintenance',
  'crypto_tenant',
  'conda_three_envs',
  'permission_denied',
  'accidental_delete',
  'training_power_outage',
  'disk_full_silent',

  // 同行评审喜剧
  'reviewer_agi_prerequisite',
  'reviewer_citation_demand',
  'reviewer_ghost',
  'reviewer_scope_again',
  'reviewer_insider',
  'reviewer_format_rejection',
  'reviewer_retroactive_scoop',
  'desk_reject_48h',

  // AI浪潮与科研戏剧
  'llm_everything',
  'agent_gospel',
  'hot_arxiv_nuke',
  'industry_pilgrimage',
  'vibe_research',
  'replication_crisis',
  'foundation_war',

  // 行政官僚事件
  'bureau_template_apocalypse',
  'bureau_submission_portal_dies',
  'bureau_ethics_review_ml',
  'bureau_meeting_email',
  'bureau_reimbursement_quest',
  'bureau_room_booking_fail',

  // 新闻快讯（被动事件，无弹窗，看完自动跳过）
  'news_blank_paper_accepted',
  'news_squirrel_server',
  'news_ack_longer_than_paper',
  'news_thesis_on_thesis',
  'news_predatory_impact',
  'news_ai_writes_ai_paper',
  'news_elevator_grant',
  'news_coffee_retraction',
  'news_password_paper',
  'news_campus_cat_publication',
  'news_reviewer_3_found',
  'news_conference_hotel',

  // 后期解锁事件（time/reputation 条件控制）
  'late_alumni_success',
  'late_invited_talk',
  'late_industry_poach',
  'late_media_profile',
  'late_grant_renewal',
  'late_lab_anniversary',

  // 学生专属事件 — 林小卷（lxj_first_meeting 由录取时直接注入，不在此池）
  'lxj_progress_check',
  'lxj_ddl_miracle',
  'lxj_midnight_message',
  'lxj_conference_abstract',
  'lxj_fake_progress',
  'lxj_lost_in_lab',
  'lxj_sudden_expert',
  'lxj_graduation_panic',
  'lxj_alumni_visit',

  // 学生专属事件 — 顾眠眠（gmm_first_meeting 由录取时直接注入）
  'gmm_group_meeting_nap',
  'gmm_gossip_oracle',
  'gmm_dream_solution',
  'gmm_mystery_nap',
  'gmm_code_quality',
  'gmm_debug_assist',
  'gmm_missing_at_deadline',
  'gmm_knows_everything',
  'gmm_alumni_visit',

  // 学生专属事件 — 叶知秋（yzq_first_meeting 由录取时直接注入）
  'yzq_definition_battle',
  'yzq_theory_saves_day',
  'yzq_env_crisis',
  'yzq_checklist',
  'yzq_logic_police',
  'yzq_cant_code',
  'yzq_reliable_delivery',
  'yzq_proof_breakthrough',
  'yzq_alumni_visit',

  // 学生专属事件 — 白小满（bxm_first_meeting 由录取时直接注入）
  'bxm_crisis_mediator',
  'bxm_failure_reframe',
  'bxm_morale_boost',
  'bxm_tea_strategy',
  'bxm_social_talent',
  'bxm_genuine_struggle',
  'bxm_encourage_others',
  'bxm_optimism_tested',
  'bxm_alumni_visit',

  // 学生专属事件 — 毕小天（bxt_first_meeting 由录取时直接注入）
  'bxt_arxiv_discovery',
  'bxt_weird_workshop',
  'bxt_related_work',
  'bxt_serious_insight',
  'bxt_thesis_crisis',
  'bxt_science_communicator',
  'bxt_interdisciplinary_find',
  'bxt_yanbi',
  'bxt_alumni_visit',

  // 学生专属事件 — 钱多多（qdd_first_meeting 由录取时直接注入）
  'qdd_group_meeting_derail',
  'qdd_user_interview',
  'qdd_startup_plan',
  'qdd_pitch_practice',
  'qdd_investor_drama',
  'qdd_product_insight',
  'qdd_anti_finance',
  'qdd_real_impact',
  'qdd_alumni_visit',

  // 学生专属事件 — 贺时序（hsx_first_meeting 由录取时直接注入）
  'hsx_ddl_reminder',
  'hsx_gantt_chart',
  'hsx_takes_over',
  'hsx_perfect_execution',
  'hsx_reverse_push',
  'hsx_chaos_intolerance',
  'hsx_overtime_concern',
  'hsx_high_efficiency',
  'hsx_alumni_visit',

  // 学生专属事件 — 唐扩列（tkl_first_meeting 由录取时直接注入）
  'tkl_conference_harvest',
  'tkl_surprise_connection',
  'tkl_tea_break_main_quest',
  'tkl_academic_neglect',
  'tkl_knows_everyone',
  'tkl_alumni_network',
  'tkl_wrong_priority',
  'tkl_key_introduction',
  'tkl_alumni_visit',

  // 学生专属事件 — 莫问玄（mwx_first_meeting 由录取时直接注入）
  'mwx_tarot_before_submit',
  'mwx_lucky_timing',
  'mwx_gpu_fengshui',
  'mwx_interview_ritual',
  'mwx_bad_omen',
  'mwx_statistics',
  'mwx_skeptic_debate',
  'mwx_paper_title_omen',
  'mwx_alumni_visit',

  // 学生专属事件 — 谢知微（xzw_first_meeting 由录取时直接注入）
  'xzw_just_look',
  'xzw_accidentally_broke',
  'xzw_elegant_solution',
  'xzw_equipment_obsession',
  'xzw_optimization_spree',
  'xzw_debug_instinct',
  'xzw_version_control',
  'xzw_accidental_discovery',
  'xzw_alumni_visit',
];
