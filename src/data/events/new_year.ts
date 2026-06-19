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
      '元旦快到了。你在某购物平台的"新年礼物推荐"里逛了二十分钟，把一堆时尚小垃圾加进购物车，又删到了一件。',
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
        text: '谢之微（花2万）',
        fundingCost: 2,
        requireStudentActive: 'xie_zhiwei',
        outcomes: [{ weight: 1, narrative: '礼物包装成红色礼盒，悄悄放在了谢之微的工位上。', nextEventIds: ['new_year_gift_result_xie_zhiwei'] }],
      },
      {
        id: 'no_gift',
        text: '经费要留着做实验，算了',
        outcomes: [{ weight: 1, narrative: '你默默清空了购物车。过了一会儿，又打开，盯了几秒，再次关掉。大概就这样了。' }],
      },
    ],
    tags: ['new_year'],
    prioritizeNext: true,
  },

  // ── 链式反应：林小卷 ──────────────────────────────────────────────────────

  new_year_gift_result_lin_xiaojuan: {
    id: 'new_year_gift_result_lin_xiaojuan',
    title: '林小卷的反应',
    description: ['林小卷发现了礼盒，拿起来看了看。'],
    prompt: '林小卷的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '林小卷拆开礼盒后，忽然掏出手机开始打字。你问他在干什么。他头也不抬：「立遗嘱。」你愣住了。他继续敲键盘：「如果今天晚上被车撞了，这就是我人生最后一个新年礼物。」你刚准备骂人，他自己先绷不住笑出了声。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '林小卷礼貌地道了谢，把礼盒放在桌边，重新低下头盯住笔记本，不知道是不是又在赶哪个DDL。',
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
    prompt: '顾眠眠的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '顾眠眠盯着礼盒看了好几秒，像是刚睡醒还没加载完。她拆开包装，把礼盒抱进怀里。\n\n你正想说话，她忽然站起来，小声说：「老师，我先回宿舍一下。」你问怎么了，她抱着盒子往外走，声音轻飘飘的：「有点开心。」\n\n第二天你路过她工位时发现包装纸被叠得整整齐齐收在抽屉里，礼物摆在最显眼的位置。',
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
    description: ['叶知秋的目光落到礼盒上。'],
    prompt: '叶知秋的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '叶知秋第一反应是：「老师，这属于非必要支出。」第二反应是问价格。第三反应才是说谢谢。\n\n她抱着礼盒研究了十几分钟，从包装结构分析到材料选择。\n\n晚上你收到一份PDF，标题是《关于导师送礼行为的可行性分析》。前面五页全是论证，最后一页是一句话结论：我很喜欢。谢谢老师。',
          effects: [
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '叶知秋郑重地道谢，把礼盒摆在桌上靠右的固定位置。她的桌子每件东西都有固定位置。然后她继续工作了，效率也一点儿没被耽误。',
          effects: [
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 3 },
            { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 5}
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
    prompt: '白小满的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '她抱着礼盒开心得转了一圈，接着开始追问你什么时候买的、怎么挑的、是不是路过的时候看到的。\n\n后来整整一个月，你总能在桌上发现莫名其妙出现的小东西：喜欢的饮料、新出的零食、下雨天多出来的一把伞。每次问是谁放的，她都歪着脑袋：「不知道呀，可能是小精灵哦。」',
          effects: [
            { type: 'student', studentId: 'bai_xiaoman', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'bai_xiaoman', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '白小满甜甜地道了谢，第二天你发现桌上多了一包你上周随口提过的零食，旁边一张可爱的感谢便条。',
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
    description: ['毕小天接过礼盒，立刻把它翻过来看了看。'],
    prompt: '毕小天的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '毕小天眼睛一亮，开始滔滔不绝地讲礼物背后的历史渊源、文化演变和设计逻辑，讲了二十分钟才突然想起来：「啊对，谢谢老师。其实我本来准备自己买的，嗯……但老师送的比较好。」',
          effects: [
            { type: 'student', studentId: 'bi_xiaotian', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'bi_xiaotian', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '毕小天道了谢，礼盒在手里转了两圈，视线随即飘向旁边书架上一本无关的书，注意力悄悄跑掉了。',
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
    description: ['钱多多接过礼盒。'],
    prompt: '钱多多的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '钱多多拆开礼盒之后第一反应是：「老师，这个预算从哪来的？」第二反应是研究包装，第三反应才是意识到这是送给自己的。\n\n然后他忽然掏出手机开始发发朋友圈。你说至于吗。他笑嘻嘻抬头：「老师，这种事情不发朋友圈，以后老了靠什么回忆青春？」\n\n当天晚上，你刷到他的动态：九宫格。礼物占八张，你只占一张。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '钱多多拆开礼盒时迅速估了个价，居然相差无几。他专业熟练地道了谢，顺手提了句他认识一个礼品批发渠道，下次可以帮你"优化采购成本"。你不确定这算不算一种回馈。',
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
    description: ['贺时序看见礼盒的时候，正在整理新学期计划表。'],
    prompt: '贺时序的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '贺时序接过礼盒，惊喜地道谢，然后埋头在本子上勾勾画画。你管不住好奇地凑过去看，本子上写着《实验室成员新年计划》，你的名字赫然在第一页。\n\n她发现被你看见了，索性直接翻开，说：「本来准备过几天实施的。」里面密密麻麻列着给不同人的新年安排。\n\n她把文件夹合上，轻咳一声：「现在需要重新规划一下优先级。」',
          effects: [
            { type: 'student', studentId: 'he_shixu', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'he_shixu', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '贺时序正式道谢，随手记进了一条log，顺口说了句"这会计入本年度导师关怀指标"，并且问你上周答应看的论文读了没。',
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
    description: ['唐扩列接过礼盒。'],
    prompt: '唐扩列的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '唐扩列拆开礼盒后迅速拍照发了一堆聊天群。晚上你收到一打条消息，全是「听说你给学生送礼物了」。\n\n你去找罪魁祸首，对方理直气壮：「老师你不懂，这是品牌建设。而且，我真的特别想炫耀一下。」’',
          effects: [
            { type: 'student', studentId: 'tang_kuolie', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'tang_kuolie', stat: 'happiness', delta: 10 },
            { type: 'lab', stat: 'reputation', delta: 5}
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
    description: ['莫问玄接过礼盒，闭眼感受了一会儿。'],
    prompt: '莫问玄的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '莫问玄抱着礼盒闭眼感受了一会儿，然后忽然掏出塔罗牌抽了一张。「我就知道。」他一脸自信地把牌展示给你：「今天抽到的是圣杯九，愿望实现的意思。」\n\n你问愿望是什么，他难得有点不好意思：「不能说，说出来就不灵了。但大概已经实现一部分了。」',
          effects: [
            { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '莫问玄礼貌地道了谢，问你买礼物那天是不是宜馈赠的日子。你被问住了。',
          effects: [
            { type: 'student', studentId: 'mo_wenxuan', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'mo_wenxuan', stat: 'happiness', delta: 3 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

  // ── 链式反应：谢之微 ──────────────────────────────────────────────────────

  new_year_gift_result_xie_zhiwei: {
    id: 'new_year_gift_result_xie_zhiwei',
    title: '谢之微的反应',
    description: ['谢之微看见礼盒的时候，正在拆一台不知道哪里搬来的主机。'],
    prompt: '谢之微的反应是……',
    options: [{
      id: 'ack',
      text: '观察',
      outcomes: [
        {
          weight: 1,
          narrative: '她把螺丝刀放下，擦干净手，小心拆开礼盒包装，然后把包装纸也整整齐齐叠好收起来。\n\n你本来以为这件事到此结束，结果第二天早上，你办公室电脑的启动速度快了一倍，总是松动的插线板都被固定好了。你问是不是她干的，她只朝你眨了眨眼，笑得像只小猫。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 10 },
          ],
        },
        {
          weight: 1,
          narrative: '谢之微点了点头，把礼盒放到桌上，继续工作了——但特意把礼盒挪到了她视线最好的地方。\n\n两天后，实验室那个一直松动的门把手被修好了。走廊换气扇的异响消失了。你不记得什么时候开始有那个响声，但它确实不见了。\n\n她没有提这件事。',
          effects: [
            { type: 'student', studentId: 'xie_zhiwei', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'xie_zhiwei', stat: 'happiness', delta: 5 },
          ],
        },
      ],
    }],
    tags: ['chain'],
  },

};
