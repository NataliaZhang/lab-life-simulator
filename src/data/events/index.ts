/**
 * 事件聚合器 — 合并所有分类事件，对外暴露统一接口
 *
 * 外部使用方不需要知道事件来自哪个文件，
 * 只需 import { events, openingEventIds, monthlyEventPool } from '../data/events'
 */

import { mainlineEvents } from './mainline';
import { dailyEvents } from './daily';
import { studentSpecificEvents } from './student_specific';
import { conditionalEvents } from './conditional';
import { endingEvents } from './endings';

import type { GameEvent } from '../../types';

export { endingEventIds } from './endings';

export const events: Record<string, GameEvent> = {
  ...mainlineEvents,
  ...dailyEvents,
  ...studentSpecificEvents,
  ...conditionalEvents,
  ...endingEvents,
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
  'arxiv_scooped',
  'lab_birthday',
  'reviewer_two',
  'lab_meeting_drama',
  'nan_loss',

  // 学生专属（triggerConditions 控制时机）
  'thesis_timeline',
  'lin_theory_breakthrough',
  'gu_engineering_milestone',

  // 属性触发（triggerConditions 控制时机）
  'student_sick',
  'favor_complaint',
  'transfer_risk',
  'collaboration_offer',
];
