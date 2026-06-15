/**
 * 日常随机事件 — 每月从池中随机抽取
 *
 * 规则：这里的事件面向整个实验室，不应 hardcode 特定学生 ID。
 * 需要绑定特定学生的事件使用 triggerConditions: anyStudent + {studentName} 占位符。
 * 效果使用 randomStudent（会优先命中 boundStudentId）。
 */

import type { GameEvent } from '../../types';

// 用于绑定任意在读学生的通用触发条件
const BIND_ANY_STUDENT = [{ type: 'anyStudent' as const, stat: 'projectProgress' as const, op: '>=' as const, value: 0 }];

export const dailyEvents: Record<string, GameEvent> = {

  gpu_oom: {
    id: 'gpu_oom',
    title: 'CUDA内存炸了',
    description: [
      '{studentName}端着笔记本走进来，屏幕对着你，脸上那种表情介于"我没事"和"我快没了"之间。CUDA内存又炸了。不是第一次，大概也不是最后一次。',
      '"batch size已经是1了。" 说完这句话，{studentName}开始盯着墙壁出神，像一个人刚意识到自己买了无限续杯但已经喝不下去了。',
    ],
    prompt: 'GPU又OOM了，你怎么办？',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'apply_gpu',
        text: '申请更多GPU配额（花5万）',
        fundingCost: 5,
        outcomes: [{
          weight: 1,
          narrative: '采购流程走了一周，新卡终于到位。当晚{studentName}发来一条消息：loss在降。你盯着这四个字，在心里默默击掌了一下，然后回了一个"好"，假装这是日常——但你嘴角的弧度出卖了你。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
          ],
        }],
      },
      {
        id: 'gradient_accum',
        text: '梯度累积走一个',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了十分钟讲完梯度累积的原理，{studentName}若有所思地点了点头，回去改了配置。速度稍微慢了点，但显存问题解决了。有时候绕路也是一条路。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '梯度累积没设对，accumulation step算错了，loss直接冲上天际，曲线像是在画一座喷发中的火山。{studentName}回来找你的时候，脸上已经没有任何表情了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
            ],
          },
        ],
      },
      {
        id: 'smaller_model',
        text: '先换个小模型跑通',
        outcomes: [{
          weight: 1,
          narrative: '换了个小模型，pipeline通了，各组件运转正常，代码本身没有问题。{studentName}如释重负——至少不是自己写的代码有bug，这对一个研究生来说是至关重要的心理安慰。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 8 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 2 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  student_allnighter: {
    id: 'student_allnighter',
    title: '凌晨三点还在群里',
    description: [
      '组会群里有条消息，时间戳是凌晨3:17，发消息的是{studentName}，附了一张手写公式的截图，字迹还算工整，说明人还清醒。"快推出来了，老师看看对不对。"',
      '你打了个哈欠，打开电脑，心想这到底是天才的信号还是需要你干预的警报。',
    ],
    prompt: '凌晨三点{studentName}还在推公式，你怎么回应？',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'stay_up_together',
        text: '陪对方一起推（消耗精力）',
        energyCost: 20,
        outcomes: [{
          weight: 1,
          narrative: '你们语音通话到四点半，把公式彻底推清楚了。{studentName}发来"原来是这样！！！"，你能感觉到对方当时大概跳起来了。第二天你睡过头，差点误了个系里的例会——好在会上没什么实质内容。',
          effects: [
            { type: 'randomStudent', stat: 'favor', delta: 12 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
          ],
        }],
      },
      {
        id: 'send_home',
        text: '让对方先去睡',
        outcomes: [
          {
            weight: 1,
            narrative: '你发消息说先休息，明天思路更清晰。{studentName}回了个"好的老师！"，三个字，语气里透着真实的如释重负。第二天对方发来消息说，睡醒之后推了十分钟就推出来了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
            conditions: [{ type: 'anyStudent', stat: 'favor', op: '>=', value: 50 }],
          },
          {
            weight: 1,
            narrative: '你发消息让{studentName}先休息。对方回了个"好的"——两个字，零感叹号，句末连句号都省了，信息量极其丰富。公式最终独自推出来了，但{studentName}的眼神里从此多了一丝你很难描述的东西。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 3 },
              { type: 'randomStudent', stat: 'favor', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'check_deadline',
        text: '先确认一下ddl',
        outcomes: [{
          weight: 1,
          narrative: '你问了一下timeline，发现下个节点还有三周。{studentName}愣了一秒，然后发来一个"……"，随后是："那我去睡了"。你不知道对方是解脱还是尴尬，但第二天效率确实高了很多。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'favor', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  reviewer_two: {
    id: 'reviewer_two',
    title: '审稿人二号来了',
    description: [
      '审稿意见回来了。审稿人一号好评，三号中性。',
      '但审稿人二号写了整整一页，其中一条是："这篇论文的核心假设存在根本性缺陷，作者似乎对该领域最近的工作一无所知。"',
    ],
    prompt: '面对审稿人二号的炮火，你选择：',
    triggerConditions: [{ type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 }],
    options: [
      {
        id: 'rebuttal_gracious',
        text: '光速滑跪，逐条回应',
        outcomes: [
          {
            weight: 2,
            narrative: '你写了一份措辞礼貌到近乎卑微的rebuttal，每条意见都认真回应，每个误解都耐心解释，甚至感谢了审稿人的"宝贵意见"。审稿人二号最终说"作者的回应解释了大部分问题"，给了个弱接受。你和{studentName}在群里发了个熟练工式的庆祝表情，然后继续改论文。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你写了rebuttal，逐条回应，有理有据，态度诚恳。审稿人二号看都没看，维持原分，直接拒了。这种事在学术界有个公认的解释，叫"运气不好"。改完换个会吧，换个运气。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'rebuttal_strong',
        text: '重拳出击，指出误解',
        outcomes: [
          {
            weight: 1,
            narrative: '你引用了六篇文献，用两页纸条理清晰地证明审稿人的理解是错的。对方沉默了——大概是去查了文献，确认自己看错了。论文最终过了。组里有人说你"打架很厉害"，你没有否认。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
          {
            weight: 2,
            narrative: '你的rebuttal语气稍微硬了一点。审稿人二号把它理解为"挑衅"，随即补充了三条新意见，每一条都比上一条更刁钻，像是在进行一场个人恩怨的延续。论文被拒。{studentName}发来消息问"老师，我们是不是认识了什么仇人？"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'ignore_and_resubmit',
        text: '不想争，改完换个会投',
        outcomes: [{
          weight: 1,
          narrative: '你决定不在这个人身上浪费情感资源。有用的意见吸收，剩下的归入你硬盘里那个名叫"审稿人问题"的文件夹——这个文件夹已经有七个子文件夹了。改完换个会，换个心情，换个运气。',
          effects: [
            { type: 'lab', stat: 'energy', delta: 10 },
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  lab_meeting_drama: {
    id: 'lab_meeting_drama',
    title: '组会气氛有点微妙',
    description: [
      '{studentName}在组会上汇报到一半，{student2Name}插了一句，指出实验设计可能有问题。',
      '{studentName}停顿了一下，回了句"我觉得没问题"，语气有点冷。整个会议室的空气凝固了大概三秒，所有人都开始专心盯着自己的笔记本屏幕。',
    ],
    prompt: '组会现场尴尬了，你怎么处理？',
    triggerConditions: [
      { type: 'minStudentCount', value: 2 },
      ...BIND_ANY_STUDENT,
    ],
    options: [
      {
        id: 'mediate',
        text: '出来打个圆场',
        outcomes: [
          {
            weight: 2,
            narrative: '你接过话题，说{studentName}和{student2Name}的思路都有道理，建议两人会后各自补充实验再讨论。气氛像被人轻轻戳破，慢慢恢复了正常。两人后来在走廊里碰到，私下道了歉——你没有旁观，但听说了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 3 },
              { type: 'randomStudent2', stat: 'happiness', delta: 5 },
              { type: 'randomStudent2', stat: 'favor', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你打了个圆场，大家表面上继续往下讲。但你注意到{studentName}和{student2Name}之后的每次交流都比之前客气了零点五倍——那种客气，叫做礼貌性疏远。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
              { type: 'randomStudent2', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'let_them_resolve',
        text: '让他们自己讨论清楚',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"你们讨论一下"。{studentName}和{student2Name}激烈辩论了十分钟，互相引文献、画图、写公式，最后{studentName}承认了一个设计上的小问题。这种碰撞出来的共识比你仲裁的结论扎实十倍。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
              { type: 'randomStudent2', stat: 'skills.theory', delta: 3 },
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
            ],
            conditions: [{ type: 'anyStudent', stat: 'favor', op: '>=', value: 50 }],
          },
          {
            weight: 1,
            narrative: '你说"你们讨论"。{studentName}和{student2Name}同时转头看向你，然后同时转开。四十分钟里，两个人各自盯着屏幕，偶尔翻个ppt，唯一的声音是有人的椅子转了一下。门带上的一瞬间，你隐约听到走廊里有人用力呼了口气。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'randomStudent2', stat: 'happiness', delta: -8 },
              { type: 'randomStudent2', stat: 'favor', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'support_questioner',
        text: '支持{student2Name}的质疑',
        outcomes: [{
          weight: 1,
          narrative: '你说{student2Name}的质疑有道理，让{studentName}认真考虑一下。{studentName}点了点头，嘴角抿了一下，显然在努力不让脸上的不服气太明显。但下次汇报时，实验设计严谨了整整一个量级，{student2Name}当场说"这次无懈可击了"。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: -5 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            { type: 'randomStudent2', stat: 'favor', delta: 10 },
            { type: 'randomStudent2', stat: 'happiness', delta: 8 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

  nan_loss: {
    id: 'nan_loss',
    title: 'NaN loss了',
    description: [
      '{studentName}来敲你的门，表情空洞，像一个人在凌晨重启了三遍路由器之后发现是欠费停网的那种神情："老师，loss变NaN了。"',
      '日志翻了，堆栈看了，学习率检查了，数据随机看了两条，找不到原因。你深吸一口气，开始觉得这个问题拥有某种形而上的邪恶。',
    ],
    prompt: 'NaN loss，你的第一反应是：',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'rubber_duck',
        text: '让对方讲一遍代码给你听',
        outcomes: [
          {
            weight: 2,
            narrative: '讲到第三段，{studentName}自己停下来了，对着空气发出了一种介于"啊"和"哦"之间的声音："……学习率太大了。" 橡皮鸭调试法又一次拯救了人类。你没说一句话，问题解决了。这是你今天最高效的一个小时。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '讲完了，你们也没找到。又联合debug了整整两个小时，翻遍了所有你能想到的地方，最后发现是数值溢出——藏在一个谁都没注意的数据预处理步骤里。{studentName}盯着那行代码看了很久，说："它一直都在这里。"',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'gradient_clip',
        text: '先加个梯度裁剪试试',
        outcomes: [
          {
            weight: 2,
            narrative: 'gradient clipping加上去，训练稳了，loss乖乖地往下走。治标没治本，但先跑起来再说。{studentName}松了口气，继续推进实验了，打算之后再回来彻查根本原因——大概率不会了。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '加了裁剪，NaN消失了，但loss从此变成一条直线，纹丝不动，像是在用另一种方式表达绝望。{studentName}盯着那条曲线看了很久，问："老师，这是不是更糟了？" 你说："是的。"',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'check_data',
        text: '先查数据有没有inf',
        outcomes: [{
          weight: 1,
          narrative: '果然——有几条样本含有无穷大的值，安静地藏在数据集里，一直等着这个时机发挥作用。清洗之后，{studentName}的训练曲线优雅得像教科书示例。这种bug最难找，但每次找到都有一种侦探破案的满足感。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
            { type: 'randomStudent', stat: 'projectProgress', delta: 4 },
          ],
        }],
      },
    ],
    tags: ['daily'],
  },

};
