/**
 * 月度闲置事件 — 本月无事件触发时随机展示一条
 *
 * 被动事件：只有 description，无 prompt / options / outcomes。
 * 引擎检测到 options 为空时自动跳过弹窗。
 * 由 monthlyUpdate.ts 在 newQueue 为空时注入，不放入 monthlyEventPool。
 */

import type { GameEvent } from '../../types';

export const idleEventIds: string[] = [
  'idle_quiet_month',
  'idle_sunny_afternoon',
  'idle_lab_hum',
  'idle_coffee_break',
  'idle_hallway_glimpse',
];

export const idleEvents: Record<string, GameEvent> = {

  idle_quiet_month: {
    id: 'idle_quiet_month',
    title: '风平浪静',
    description: [
      '这个月什么都没发生。论文没爆炸，服务器没死机，审稿人也没来骚扰。你坐在椅子上，感受着难得的平静，心想这大概就是"正常"的感觉——但实验室已经太久没有正常了，一时间有点不适应。',
    ],
    tags: ['idle'],
  },

  idle_sunny_afternoon: {
    id: 'idle_sunny_afternoon',
    title: '下午三点的阳光',
    description: [
      '阳光从窗户斜射进来，精准地落在你的显示器上，制造了一个没法直视的光斑。你挪了挪椅子，发现整个实验室此刻出奇地安静：键盘声、风扇声、隔壁打印机的嗡鸣声，一切都在，却不嘈杂。这个月就这样过去了。',
    ],
    tags: ['idle'],
  },

  idle_lab_hum: {
    id: 'idle_lab_hum',
    title: '服务器的嗡鸣',
    description: [
      '实验室不变的声音，始终是服务器机柜的嗡鸣。不论外面发生什么，它都在转。这个月它转得格外顺，没有任何异常告警，日志文件干净得像一张新纸。你看着屏幕发了会儿呆，觉得这也是一种好日子。',
    ],
    tags: ['idle'],
  },

  idle_coffee_break: {
    id: 'idle_coffee_break',
    title: '咖啡间隙',
    description: [
      '你去倒了杯咖啡，回来的时候发现自己顺路检查了走廊、看了一眼告示栏、在楼梯口站了一会儿。没什么事，就是站着。这个月大抵如此，平稳推进，没有惊喜也没有意外。科研就是这样，大多数时候是咖啡和等待。',
    ],
    tags: ['idle'],
  },

  idle_hallway_glimpse: {
    id: 'idle_hallway_glimpse',
    title: '走廊一瞥',
    description: [
      '经过走廊时，你瞥见隔壁实验室的人在开会，PPT上全是密密麻麻的公式，所有人的表情都很凝重。你悄悄加快了脚步。这个月你们实验室没有这种会议。这个月，很好。',
    ],
    tags: ['idle'],
  },

};
