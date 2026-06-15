/**
 * 事件聚合器 — 合并所有分类事件，对外暴露统一接口
 *
 * 外部使用方不需要知道事件来自哪个文件，
 * 只需 import { events, openingEventIds, monthlyEventPool } from '../data/events'
 */

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

import type { GameEvent } from '../../types';

export { endingEventIds, specialEndingIds, timeEndingIds } from './endings';

export const events: Record<string, GameEvent> = {
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

  // 后期解锁事件（time/reputation 条件控制）
  'late_alumni_success',
  'late_invited_talk',
  'late_industry_poach',
  'late_media_profile',
  'late_grant_renewal',
  'late_lab_anniversary',
];
