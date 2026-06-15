/**
 * 结局事件 — 特定条件触发的游戏结局
 *
 * 与普通事件的区别：
 *   - tag 包含 'ending'，引擎在处理完该事件后应将 phase 置为 'won' 或 'gameover'
 *   - 由 monthlyUpdate 中的专项检查（非普通随机池）优先触发
 *   - 一旦进入结局事件队列，清空其他事件队列
 *
 * TODO: 引擎尚未集成结局触发逻辑，当前文件仅作数据框架。
 *       需要在 monthlyUpdate.ts 中添加 checkEndingConditions()，
 *       将满足条件的结局事件注入队列顶端，并在 gameReducer 的
 *       CHOOSE_OPTION 中检测 'ending' / 'gameover' tag 以变更 phase。
 *
 * 触发优先级（高 → 低）：
 *   1. ending_funding_crisis   — 随时，资金归零
 *   2. ending_all_students_left — 随时，全员离组（引擎侧检查 students.every(s => s.status !== 'active')）
 *   3. ending_prodigy_rise     — 声望突破 80 （TODO: 改成时间耗尽之后声望突破xx）
 *   4. 时间耗尽结局             — 已在 monthlyUpdate.ts 中硬编码，无需此文件（TODO: 统一到此文件中）
 * TODO：结局分为两种，一种是正常时间耗尽，会检测玩家各项属性，根据不同条件触发不同结局；另一种是特殊事件触发的结局，如经费耗尽、全员离组等，这些结局不需要等到时间耗尽才触发。
 * 在正常结局中，在触发结局前先做一个总结，展示学生的最终属性和成就（如发表了几篇文章，获得了哪些奖项等），让玩家对自己的经营成果有一个清晰的认识。然后再进入子结局。
 */

import type { GameEvent } from '../../types';

export const endingEvents: Record<string, GameEvent> = {

  // ── Bad endings ───────────────────────────────────────────────────────────

  ending_funding_crisis: {
    id: 'ending_funding_crisis',
    title: '经费耗尽',
    description: [
      '账户余额归零。',
      '学院财务办公室发来了一封很客气的邮件，询问实验室的"后续运营规划"。',
      '你看着空荡荡的账户，意识到这不是比喻——实验室真的快撑不下去了。',
    ],
    prompt: '经费告急，最后一搏：',
    triggerConditions: [{ type: 'lab', stat: 'funding', op: '<=', value: 0 }],
    options: [
      {
        id: 'emergency_loan',
        text: '向学院申请应急垫付',
        outcomes: [
          {
            weight: 2,
            narrative: '学院网开一面，垫付了5万周转资金，但要求你三个月内提交基金申请。你争取到了最后一次机会——能不能活下去，就看这三个月了。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '学院表示爱莫能助。没有经费，实验室无法维持运转。这一段旅程，以这种方式画上了句号。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -20 },
            ],
          },
        ],
        // TODO: weight 1 的 outcome 应触发 phase: 'gameover'
      },
      {
        id: 'accept_closure',
        text: '接受现实，有序关闭实验室',
        outcomes: [{
          weight: 1,
          narrative: '你给每位学生安排了转接，联系了其他老师接收他们。关门之前，你们一起吃了最后一顿饭。叶知秋哭了。有些结局，有尊严地结束，也算一种体面。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 10 },
          ],
        }],
        // TODO: 触发 phase: 'gameover'
      },
    ],
    tags: ['ending', 'gameover'],
  },

  ending_all_students_left: {
    id: 'ending_all_students_left',
    title: '实验室空了',
    description: [
      '最后一位学生也走了。',
      '实验室里只剩下你，白板上还留着上次组会的板书，没有人擦掉它。',
      '你坐在工位前，屏幕亮着，上面是一个还没完成的实验结果。',
    ],
    prompt: '一个人的实验室，你选择：',
    // 触发条件：引擎侧需检查 students.every(s => s.status !== 'active')
    // triggerConditions 暂不支持跨学生状态聚合，此处留空，由 monthlyUpdate 单独处理
    options: [
      {
        id: 'recruit_new',
        text: '重新招募学生，从头来过',
        outcomes: [{
          weight: 1,
          narrative: '你发了招募通知，一个月后来了两位新生。他们不知道这个实验室曾经发生过什么，只看到一位老师认真地在白板上讲解研究方向。也许，这就够了。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 20 },
          ],
        }],
        // TODO: 触发 phase: 'won'（艰难重生结局）
      },
      {
        id: 'solo_research',
        text: '一个人继续，等待缘分',
        outcomes: [{
          weight: 1,
          narrative: '你决定一个人先写论文，先把积累的想法做出来。没有学生的实验室意外地安静。你反而发表了职业生涯最好的一篇理论文章。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 8 },
          ],
        }],
        // TODO: 触发 phase: 'won'（孤独学者结局）
      },
    ],
    tags: ['ending'],
  },

  // ── Good endings ──────────────────────────────────────────────────────────

  ending_prodigy_rise: {
    id: 'ending_prodigy_rise',
    title: '声名鹊起',
    description: [
      '你的名字开始出现在领域内的各种讨论里。邀请演讲的邮件越来越多。',
      '有人在推特上说“这个组最近出的工作都很有意思”。',
      '你意识到，不知道从什么时候起，你已经不再是那个需要“假装知道自己在做什么”的新人了。',
    ],
    prompt: '站在新的起点，你选择：',
    triggerConditions: [{ type: 'lab', stat: 'reputation', op: '>=', value: 80 }],
    options: [
      {
        id: 'embrace_fame',
        text: '接受更多邀请，扩大影响力',
        outcomes: [{
          weight: 1,
          narrative: '你开始频繁出现在顶会的演讲名单上。学生们说，跟你一起被认识，是他们做科研最好的附加福利之一。这个结局，不算坏。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 10 },
            { type: 'allStudents', stat: 'happiness', delta: 10 },
          ],
        }],
        // TODO: 触发 phase: 'won'（学术大牛结局）
      },
      {
        id: 'stay_focused',
        text: '谢绝浮躁，专注做研究',
        outcomes: [{
          weight: 1,
          narrative: '你婉拒了大多数邀请，把时间还给了学生和实验。圈内人说你"低调，但出手就是干货"。你把这句话截图存了下来。',
          effects: [
            { type: 'allStudents', stat: 'favor', delta: 8 },
            { type: 'lab', stat: 'energy', delta: 20 },
          ],
        }],
        // TODO: 触发 phase: 'won'（专注学者结局）
      },
    ],
    tags: ['ending', 'won'],
  },

};

/**
 * 结局事件 ID 列表，供引擎侧检查触发条件时使用。
 * 不放入 monthlyEventPool，由 monthlyUpdate 中的 checkEndingConditions 单独处理。
 */
export const endingEventIds = [
  'ending_funding_crisis',
  'ending_all_students_left',
  'ending_prodigy_rise',
];
