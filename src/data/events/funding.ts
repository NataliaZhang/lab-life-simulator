/**
 * 经费危机事件
 *
 * 当实验室经费低于5万时，由 monthlyUpdate 注入 funding_crisis_grant。
 * 从第二年起生效，同一事件至少间隔6个月才能再次触发。
 */

import type { GameEvent } from '../../types';

export const fundingEvents: Record<string, GameEvent> = {

  funding_crisis_grant: {
    id: 'funding_crisis_grant',
    title: '本子时间到了',
    description: [
      '账户余额：不足5万。',
      '这个数字让你想起了一件很久以前就该做的事：写本子。学名"科研经费申请书"，字数通常五到十万字，内容是"你打算用三年时间做什么"，格式要求是"用没有人想读的方式写出来"，审核结果是"运气好的话有人扫一眼摘要"。',
      '你打开一个新文档，标题输了三个字，停顿了几秒，删了两个字，又打了一个字，最后重新打回三个字。',
    ],
    prompt: '这次写本子，你打算用多少生命换钱？',
    options: [
      {
        id: 'grant_full',
        text: '破釜沉舟，肝出一篇大本子',
        energyCost: 40,
        outcomes: [{
          weight: 1,
          narrative: '你在办公室泡了三天，输出了八万字。其中两万字是你自己的新想法，三万字是合理化这些想法的"理论框架"，剩下三万字是描述你将如何"整合前沿交叉学科进行系统性深度研究，形成具有重要理论意义与实践价值的重大成果"。本子投出去了。几个月后，评审意见回来：优先资助。你不确定是哪段话起了决定性作用，但那三万字大概功不可没。',
          effects: [
            { type: 'lab', stat: 'funding', delta: 15 },
          ],
        }],
      },
      {
        id: 'grant_medium',
        text: '够用就行，凑合写一篇',
        energyCost: 15,
        outcomes: [{
          weight: 1,
          narrative: '你把去年那篇本子拿出来，把标题里的年份改了，摘要换了两个词，在"创新点"一栏加了一句"引入当前最前沿的大语言模型技术"，这行字大概被加进了全国同期八百份申请书里。结果：过了，钱到账了。够用，将就。',
          effects: [
            { type: 'lab', stat: 'funding', delta: 5 },
          ],
        }],
      },
      {
        id: 'grant_minimal',
        text: '急救一下，先交一份应急版',
        outcomes: [
          {
            weight: 2,
            narrative: '你在系里的"青年补充科研专项"表格里找到一个截止日刚好是明天的申请通道，字数要求500字。你用三十分钟填完了，关键字密度每段不低于三个"创新""聚焦""赋能"。体量虽小，总比没有强。',
            effects: [
              { type: 'lab', stat: 'funding', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '你找到了一个"青年补充科研专项"的入口，填表，提交，系统回复"材料已受理"。两个月后，系统再次发邮件："感谢申请，本批次已结束受理。"你翻了翻时间戳，发现受理邮件和结束受理邮件之间差了三分钟。',
            effects: [],
          },
        ],
      },
    ],
    tags: ['funding'],
  },

};
