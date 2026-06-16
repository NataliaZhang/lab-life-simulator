/**
 * 新年礼物事件系列
 *
 * 由 monthlyUpdate 在每年1月（year >= 2）注入 new_year_gift。
 * 每个学生对应一个链式反应事件，反应分两档：情绪激动（+10/+10）与礼貌平淡（+3/+3）。
 * 不使用 {studentName} 占位符，学生姓名直接写入文本。
 */

import type { GameEvent } from '../../types';

export const newYearEvents: Record<string, GameEvent> = {

  // ── 主事件：选择送给谁 ───────────────────────────────────────────────────

  new_year_gift: {
    id: 'new_year_gift',
    title: '新年礼物',
    description: [
      '元旦快到了。你在某购物平台的"新年礼物推荐"里逛了二十分钟，把十七件东西加进购物车，又删到了一件。',
      '实验室里每个人这一年都不容易。如果只能挑一个，你准备送给谁？',
    ],
    prompt: '把礼物送给……',
    options: [
      {
        id: 'gift_lin_xiaojuan',
        text: '林小卷（花2万）',
        fundingCost: 2,
        requireStudentActive: 'lin_xiaojuan',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了林小卷的工位上。', nextEventIds: ['new_year_gift_result_lin_xiaojuan'] }],
      },
      {
        id: 'gift_gu_mianmian',
        text: '顾眠眠（花2万）',
        fundingCost: 2,
        requireStudentActive: 'gu_mianmian',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了顾眠眠的工位上。', nextEventIds: ['new_year_gift_result_gu_mianmian'] }],
      },
      {
        id: 'gift_ye_zhiqiu',
        text: '叶知秋（花2万）',
        fundingCost: 2,
        requireStudentActive: 'ye_zhiqiu',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了叶知秋的工位上。', nextEventIds: ['new_year_gift_result_ye_zhiqiu'] }],
      },
      {
        id: 'gift_bai_xiaoman',
        text: '白小满（花2万）',
        fundingCost: 2,
        requireStudentActive: 'bai_xiaoman',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了白小满的工位上。', nextEventIds: ['new_year_gift_result_bai_xiaoman'] }],
      },
      {
        id: 'gift_bi_xiaotian',
        text: '毕小天（花2万）',
        fundingCost: 2,
        requireStudentActive: 'bi_xiaotian',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了毕小天的工位上。', nextEventIds: ['new_year_gift_result_bi_xiaotian'] }],
      },
      {
        id: 'gift_qian_duoduo',
        text: '钱多多（花2万）',
        fundingCost: 2,
        requireStudentActive: 'qian_duoduo',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了钱多多的工位上。', nextEventIds: ['new_year_gift_result_qian_duoduo'] }],
      },
      {
        id: 'gift_he_shixu',
        text: '贺时序（花2万）',
        fundingCost: 2,
        requireStudentActive: 'he_shixu',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了贺时序的工位上。', nextEventIds: ['new_year_gift_result_he_shixu'] }],
      },
      {
        id: 'gift_tang_kuolie',
        text: '唐扩列（花2万）',
        fundingCost: 2,
        requireStudentActive: 'tang_kuolie',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了唐扩列的工位上。', nextEventIds: ['new_year_gift_result_tang_kuolie'] }],
      },
      {
        id: 'gift_mo_wenxuan',
        text: '莫问玄（花2万）',
        fundingCost: 2,
        requireStudentActive: 'mo_wenxuan',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了莫问玄的工位上。', nextEventIds: ['new_year_gift_result_mo_wenxuan'] }],
      },
      {
        id: 'gift_xie_zhiwei',
        text: '谢知微（花2万）',
        fundingCost: 2,
        requireStudentActive: 'xie_zhiwei',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了谢知微的工位上。', nextEventIds: ['new_year_gift_result_xie_zhiwei'] }],
      },
      {
        id: 'no_gift',
        text: '经费要留着做实验，算了',
        outcomes: [{ weight: 1, narrative: '你默默清空了购物车。过了一会儿，又打开，盯了几秒，再次关掉。大概就这样了。' }],
      },
    ],
    tags: ['new_year'],
  },

  // ── 链式反应：林小卷 ──────────────────────────────────────────────────────

  new_year_gift_result_lin_xiaojuan: {
    id: 'new_year_gift_result_lin_xiaojuan',
    title: '林小卷的反应',
    description: ['林小卷发现了礼盒，拿起来看了看。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '他捧着礼盒看了很久，说了句"谢谢老师"，声音有点小。你以为就这样结束了——结果他接下来二十分钟都在跟你讲一个和礼物完全没有关系的定理。你后来想，这大概是他兴奋的方式。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '林小卷礼貌地道了谢，把礼盒放在桌边，重新低下头盯住笔记本。礼物和他之间好像隔着一层玻璃，不近也不远。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：顾眠眠 ──────────────────────────────────────────────────────

  new_year_gift_result_gu_mianmian: {
    id: 'new_year_gift_result_gu_mianmian',
    title: '顾眠眠的反应',
    description: ['顾眠眠趴在桌上，睡眼惺忪地抬头，看见了礼盒。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她接过礼盒，愣了三秒，然后轻轻抱了一下——是真的抱了一下——随即若无其事地放开，说"谢谢老师，我去跑实验了"，耳根稍微红了一点。',
          effects: [
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '顾眠眠道了谢，把礼盒放好，然后趴回桌上了。两小时后你经过，发现她把礼盒当成了枕头。',
          effects: [
            { type: 'student', studentId: 'gu_mianmian', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'gu_mianmian', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：叶知秋 ──────────────────────────────────────────────────────

  new_year_gift_result_ye_zhiqiu: {
    id: 'new_year_gift_result_ye_zhiqiu',
    title: '叶知秋的反应',
    description: ['叶知秋看见礼盒，第一反应是皱了下眉。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她先说了句"老师这不合适"——但礼盒已经在她手里了。她翻来覆去检查了包装三分钟，正式说了声谢谢，然后问你是哪天买的，那天黄历上写的什么。',
          effects: [
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '叶知秋郑重地道谢，把礼盒摆在桌上靠右的固定位置——她的桌子每件东西都有固定位置——然后继续工作了，像什么都没发生一样。',
          effects: [
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：白小满 ──────────────────────────────────────────────────────

  new_year_gift_result_bai_xiaoman: {
    id: 'new_year_gift_result_bai_xiaoman',
    title: '白小满的反应',
    description: ['白小满看见礼盒，先是愣了一下。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她眼眶有点红，说了句"老师你还记得啊"，然后很快恢复表情，转过来问你最近有没有好好休息。你买了礼物送她，结果被她顺手关心了一圈。',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '白小满温温地道了谢，第二天你发现桌上多了一包你上周随口提过的零食，旁边一张便条："路过买的，没啥。"',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：毕小天 ──────────────────────────────────────────────────────

  new_year_gift_result_bi_xiaotian: {
    id: 'new_year_gift_result_bi_xiaotian',
    title: '毕小天的反应',
    description: ['毕小天接过礼盒，立刻把它翻过来看了看底部。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她开始讲新年礼物在不同文化中的演变，从汉代讲到现代商业化逻辑，讲了整整十五分钟，最后才想起来说"谢谢老师"。你觉得这应该算高兴。',
          effects: [
            { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '毕小天道了谢，礼盒在手里转了两圈，视线随即飘向旁边书架上一本无关的书，整个人的注意力悄悄跑掉了。',
          effects: [
            { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：钱多多 ──────────────────────────────────────────────────────

  new_year_gift_result_qian_duoduo: {
    id: 'new_year_gift_result_qian_duoduo',
    title: '钱多多的反应',
    description: ['钱多多接过礼盒，先看了一眼包装，快速估了个价。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她立刻分析起导师送礼的人际资本逻辑，结论是"情绪价值高、成本可控，ROI极佳"——但她眼睛亮着，手握得很紧。你觉得她是真的很高兴。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '钱多多专业地道了谢，顺手提了句她认识一个礼品批发渠道，下次可以帮你"优化采购成本"。你不确定这算不算一种回馈。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：贺时序 ──────────────────────────────────────────────────────

  new_year_gift_result_he_shixu: {
    id: 'new_year_gift_result_he_shixu',
    title: '贺时序的反应',
    description: ['贺时序看见礼盒，先是确认了一下它的位置是否妨碍工作流。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她接过礼盒，掏出手机，找到了某个清单里的"导师新年礼物——待确认"，打了个√。原来她已经预留了这件事。你不知道该被感动还是被震惊。',
          effects: [
            { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '贺时序正式道谢，记进了一条log，顺口说了句"这会计入本年度导师关怀指标"。你问那是她自己设的指标吗。她说是的。',
          effects: [
            { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：唐扩列 ──────────────────────────────────────────────────────

  new_year_gift_result_tang_kuolie: {
    id: 'new_year_gift_result_tang_kuolie',
    title: '唐扩列的反应',
    description: ['唐扩列接过礼盒，立刻举起来展示给旁边的人看。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '他开心地说他有个朋友专做礼品进口，下次可以帮你拿更好的货——他是真的很高兴，只是表达方式永远绕着人脉走。',
          effects: [
            { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '唐扩列客气地说了句"老师有心了"，然后聊起昨天认识的一个新朋友。礼盒好像是这段对话的一个引子，他已经在下一个话题了。',
          effects: [
            { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：莫问玄 ──────────────────────────────────────────────────────

  new_year_gift_result_mo_wenxuan: {
    id: 'new_year_gift_result_mo_wenxuan',
    title: '莫问玄的反应',
    description: ['莫问玄接过礼盒，闭眼感受了大概两秒。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她说"今年运势很好，我之前占卜过"。然后认真道谢，把礼盒摆在她认为是旺位的桌角。你到现在也分不清她是因为礼物开心，还是因为印证了预言开心。',
          effects: [
            { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '莫问玄礼貌地道了谢，问你买礼物那天是不是宜馈赠的日子。你说不知道。她若有所思地点了点头。',
          effects: [
            { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：谢知微 ──────────────────────────────────────────────────────

  new_year_gift_result_xie_zhiwei: {
    id: 'new_year_gift_result_xie_zhiwei',
    title: '谢知微的反应',
    description: ['谢知微抬起头，看见礼盒，沉默了三秒。'],
    prompt: '（TA的反应是……）',
    options: [{
      id: 'ack',
      text: '（继续）',
      outcomes: [
        {
          weight: 1,
          narrative: '她用很轻的声音说了"谢谢老师"，然后转回工位，把礼盒放在离手边最近的地方。对她来说，这已经是很明显的表态了。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '谢知微点头道谢，把礼盒放到桌上，继续工作了。两天后，实验室里那个一直松动的门把手被修好了，签名栏空着。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

};
