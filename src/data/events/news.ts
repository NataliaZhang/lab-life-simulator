/**
 * 新闻简报事件 — 学术圈离谱新闻 & 校园八卦
 *
 * 被动事件：只有 description，无 prompt / options / outcomes。
 * 引擎检测到 options 为空时自动跳过弹窗。
 * 放入 monthlyEventPool，和常规事件一起随机触发，但每条只出现一次。
 */

import type { GameEvent } from '../../types';

export const newsEvents: Record<string, GameEvent> = {

  news_blank_paper_accepted: {
    id: 'news_blank_paper_accepted',
    title: '学术快讯',
    description: [
      '有人向某期刊投了一篇完全空白的论文，标题是《关于某领域的深度探讨》，摘要是"详见正文"，正文只有"见附录"，附录空白。论文顺利通过审稿，编辑在录用邮件里写道："内容精练，建议微调排版。"',
    ],
    tags: ['news'],
  },

  news_squirrel_server: {
    id: 'news_squirrel_server',
    title: '校园快讯',
    description: [
      '隔壁楼的计算机系通报：一只松鼠进入机房，咬断了三根网线，导致某实验室的服务器下线四小时。系主任在公告里补充："建议大家在门缝处加装挡板，同时不要在机房存放坚果类食品。"',
    ],
    tags: ['news'],
  },

  news_ack_longer_than_paper: {
    id: 'news_ack_longer_than_paper',
    title: '学术快讯',
    description: [
      'ICOP今年录用论文引发热议：正文四页，致谢七页半，感谢对象包括"快递小哥、宿舍楼管阿姨，以及那只在实验室待了三周的橘猫"。组委会表示从未见过此类情况，但确认不违反格式要求。',
    ],
    tags: ['news'],
  },

  news_thesis_on_thesis: {
    id: 'news_thesis_on_thesis',
    title: '学术快讯',
    description: [
      '某校一名博士生顺利通过答辩，其博士论文题为《如何更高效地完成博士论文：一项基于自身经历的行动研究》。导师在评语里写道："研究方法严谨，效度存疑，但不失为一次勇敢的尝试。"',
    ],
    tags: ['news'],
  },

  news_predatory_impact: {
    id: 'news_predatory_impact',
    title: '学术快讯',
    description: [
      '某掠夺性期刊宣布其"影响因子"达到87.3，超越《Nature》，随即引发广泛关注。该期刊的官网域名注册时间为三周前，编委会全员来自同一IP地址。目前已有两所大学将其列入推荐发表名单。',
    ],
    tags: ['news'],
  },

  news_ai_writes_ai_paper: {
    id: 'news_ai_writes_ai_paper',
    title: '学术快讯',
    description: [
      '一篇关于"AI写作能力局限性"的论文被曝光，全文由AI生成。作者在回应中解释："这是一种双盲测试设计，用来验证读者的判断能力。"审稿人表示"没有发现任何问题，写得很流畅"。',
    ],
    tags: ['news'],
  },

  news_elevator_grant: {
    id: 'news_elevator_grant',
    title: '校园快讯',
    description: [
      '本校某学院申请到了一笔专项经费，用途是"研究电梯等待时间对科研工作者心理健康的影响"。项目周期三年，经费来源为"人机交互与校园设施优化联合基金"。电梯本身暂无修缮计划。',
    ],
    tags: ['news'],
  },

  news_coffee_retraction: {
    id: 'news_coffee_retraction',
    title: '学术快讯',
    description: [
      '一篇曾在社交媒体广泛传播的研究——"每天喝咖啡可提升科研产出37%"——宣布撤稿。原因是研究者承认自己统计的是"咖啡杯空置次数"，误以为等同于"饮用次数"。原文引用量：2,847次。',
    ],
    tags: ['news'],
  },

  news_password_paper: {
    id: 'news_password_paper',
    title: '学术快讯',
    description: [
      '一位退休教授在整理旧电脑时发现一篇未发表手稿，内容是某领域的突破性研究。经过仔细阅读，他发现那是他1998年写的论文草稿，当时因为"觉得不够好"而束之高阁。该领域的后续主流方向与其高度重合。',
    ],
    tags: ['news'],
  },

  news_campus_cat_publication: {
    id: 'news_campus_cat_publication',
    title: '校园快讯',
    description: [
      '生命科学学院的学生把楼里流浪猫"小橘"的日常行为整理成了一份非正式观察报告，在年会上以海报形式展出，标题为《基于自然环境的机会性觅食行为研究》。小橘本人当天出席了展览现场，并在多份海报上踩了脚印。',
    ],
    tags: ['news'],
  },

  news_reviewer_3_found: {
    id: 'news_reviewer_3_found',
    title: '学术快讯',
    description: [
      '学界传来震动：一位研究者声称已锁定"审稿人3号"的真实身份——经过多年文本分析、语言模式比对和时区推断，他发布了长达四十页的调查报告。该报告目前被投稿给了三个期刊，均被审稿人3号否定。',
    ],
    tags: ['news'],
  },

  news_conference_hotel: {
    id: 'news_conference_hotel',
    title: '学术快讯',
    description: [
      '某国际学术会议因场地问题临时更换至一家卡拉OK酒店举办。会议如期进行，会议室隔壁的包厢全程播放着背景音乐。有与会者在推文里写道："这是我听过伴奏最丰富的keynote报告。"',
    ],
    tags: ['news'],
  },

};
