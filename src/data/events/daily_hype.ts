/**
 * AI炒作与研究热点事件 — 大语言模型时代的科研日常
 *
 * 规则：绑定学生的事件使用 BIND_ANY_STUDENT + {studentName}。
 * 不涉及具体学生的事件直接从实验室/PI视角叙述。
 */

import type { GameEvent } from '../../types';

const BIND_ANY_STUDENT = [{ type: 'anyStudent' as const, stat: 'projectProgress' as const, op: '>=' as const, value: 0 }];

export const hypeEvents: Record<string, GameEvent> = {

  llm_everything: {
    id: 'llm_everything',
    title: 'LLM万能论',
    description: [
      '{studentName}拿着一张A3打印的系统设计图走进你的办公室，展开来铺在桌上。这已经不是{studentName}第一次提出"用LLM替换一切"这个观点了，但这是第一次拿出了完整的架构图：数据预处理模块换成GPT-4 API调用，模型主体换成GPT-4 API调用，评测指标换成GPT-4 API调用，图表说明文字生成器也换成GPT-4 API调用。整张图纸上，每个方框里都写着同一个词。',
      '"{studentName}认为LLM可以处理一切。" {studentName}神情严肃，像是在陈述一条物理定律。你看着那张图，数了一下API调用的方框：十一个。你想到的第一件事是每月账单。',
    ],
    prompt: '面对这份LLM全家桶方案，你选择',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'engage_seriously',
        text: '认真讨论方案的可行性',
        energyCost: 15,
        outcomes: [
          {
            weight: 2,
            narrative: '你们花了整整一个下午逐模块分析。讨论到第三个模块时，{studentName}自己开始在图上打叉——"这个不行，延迟太高"，"这个不行，determinism没法保证"，"这个……好像还行"。最后留下了两个合理的LLM接入点，其余模块回归传统方案。\n\n{studentName}重新画了一张图，比原来好了很多。你心想：第十七次终于有了点结果。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 6 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
          {
            weight: 1,
            narrative: '讨论非常热烈。{studentName}越辩越兴奋，你越辩越疲惫。两小时后你们在"LLM评测指标"这个子问题上陷入了哲学层面的分歧，谁都没能说服谁。{studentName}回去了，说"我再想想"。那张A3图纸还在你桌上，你把它叠起来，放进了右下角那个抽屉。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'explain_why_not',
        text: '科学解释为什么不行',
        outcomes: [
          {
            weight: 2,
            narrative: '你指出了三个核心问题：可复现性、成本、以及"用语言模型评测语言模型的输出"这个循环论证的逻辑漏洞。{studentName}皱着眉头盯着架构图看了一会儿，然后说"……但理论上可以用不同的模型"。你说"可以，这是你的下一个实验方向"。{studentName}走了，架构图留在了你桌上，作为一个已解决问题的纪念碑。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 4 },
              { type: 'randomStudent', stat: 'favor', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你把三个问题说得非常清楚，{studentName}认真听完，点了点头，回去了。第二天你发现{studentName}的设计图里依然有七个LLM调用方框，只是多了一行注释："待解决的问题见老师意见"。这叫挂起而非关闭。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 2 },
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'let_them_try',
        text: '放手让他们跑一个原型',
        fundingCost: 3,
        outcomes: [
          {
            weight: 1,
            narrative: '你说"行，跑一个prototype看看"。{studentName}的眼睛亮了。三周后，原型系统确实跑通了，也确实有点用，但API账单上有一行触目惊心的数字。更麻烦的是，{studentName}现在认为这说明LLM可以处理一切，并打算写一篇"全LLM pipeline实证研究"的论文。这个领域的大门，你亲手打开的。',
            effects: [
              { type: 'randomStudent', stat: 'projectProgress', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: 15 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你说"行，跑一个prototype"。{studentName}摩拳擦掌地去了。两周后带回来一个结论：GPT-4在评测指标这一环节幻觉率达到23%，在数据预处理环节遇到了非英语字符就开始随机删除列，而图表说明文字生成器坚持把所有图都描述成"一张显示数据趋势的图"。账单：两千三百元。{studentName}欲言又止地问："老师，我们下一步是……"你说："写一篇LLM局限性分析。"',
            effects: [
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  agent_gospel: {
    id: 'agent_gospel',
    title: '智能体福音',
    description: [
      '{studentName}最近找到了信仰。这个信仰叫多智能体系统。组会上，不论讨论什么问题，{studentName}的解法都是"再加几个agent"：实验效果不好——"需要一个负责自我反思的agent"；代码有bug——"需要一个专门debug的agent"；上周组会迟到——"应该有个时间管理agent提醒我"。',
      '{studentName}开始把自己的研究愿景称为"The Agentic Future"，并已经在一个Markdown文档里写下了三千字的愿景声明，标题是《走向完全自主的科研范式》。你不确定这是天才的先兆还是需要干预的信号。',
    ],
    prompt: '面对{studentName}的智能体信仰，你选择',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'gently_redirect',
        text: '温和地把话题引回实际问题',
        outcomes: [
          {
            weight: 2,
            narrative: '你问了一个问题："你当前数据集里最难处理的那类样本，加一个agent能解决哪个具体子问题？" {studentName}认真想了想，然后说："……可能加个数据增强的agent？"你说"很好，这个具体，去做"。三天后{studentName}来跟你说，发现核心问题根本不是数据的问题。信仰稍微冷却了一些，但技术判断力提升了。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 7 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 4 },
              { type: 'randomStudent', stat: 'favor', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '你温和地引导{studentName}聚焦实际问题，{studentName}点头如捣蒜地表示"完全理解，我就是这个意思"——然后在下周组会上带来了一个六层嵌套agent架构图，说这就是解决实际问题的方案。你意识到有些信仰是引导不走的，只能等它自己碰壁。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'let_it_play_out',
        text: '让信仰自然发展，看它去哪',
        outcomes: [
          {
            weight: 1,
            narrative: '{studentName}实现了一个有十二个agent的系统。系统运行时，token消耗量是单模型方案的四十倍，延迟高达八秒，效果比baseline差了两个百分点。{studentName}盯着评测结果，把椅子往后推了一下，两手捂着脸坐了很久，然后打开文档，把"完全自主"改成了"半自主"，把洋洋洒洒的愿景声明删去了大半。你觉得这比任何说教都有效。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 10 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '{studentName}的多智能体系统在一个特定子任务上意外地跑出了不错的结果。{studentName}立刻发来消息，语气里压抑不住激动："老师！我觉得我发现了什么！" 你打开实验结果仔细看了看，发现确实有一点东西。信仰有时候是有道理的，你不得不承认。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 15 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'learn_from_enthusiasm',
        text: '认真阅读那份三千字愿景文档',
        energyCost: 10,
        outcomes: [
          {
            weight: 2,
            narrative: '你读完了那份文档。里面大部分是热情有余、论据不足的宏观叙事，但有一段对"工具调用失败时的恢复策略"的描述出乎意料地具体，甚至有点创新性。你把那段单独截出来，发给{studentName}说"这个值得深挖"。{studentName}愣了一下，然后明显振作了起来——被认真对待，是最好的燃料。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 12 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你读完了三千字愿景文档。读完之后你有了两个收获：第一，{studentName}的写作能力很不错；第二，你现在也有点相信multi-agent了。你迅速打开一篇反驳性论文，用力把自己从悬崖边上拉了回来。',
            effects: [
              { type: 'randomStudent', stat: 'favor', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  hot_arxiv_nuke: {
    id: 'hot_arxiv_nuke',
    title: '顶级实验室发核弹了',
    description: [
      '昨晚十一点，一篇arxiv出现了。今早七点，你的手机已经因为消息轰炸震了个不停。某顶级实验室发布了一项工作，做的事情跟你们组过去八个月的方向几乎完全重合——但更快、更便宜、效果更好。论文现在有五百个转推，评论里有人说"这个问题彻底解决了"。',
      '你们的代码仓库里，上周还在跑的实验此刻正在服务器上安静地运行着，不知道自己已经成了一段历史。',
    ],
    prompt: '被顶级实验室正面碾压，你的应对策略是',
    options: [
      {
        id: 'differentiate',
        text: '精读论文，找他们没做到的地方',
        energyCost: 20,
        outcomes: [
          {
            weight: 2,
            narrative: '你把那篇论文仔细读了好几遍，在每一节都做了标注。读到第四部分时，你发现了一个裂缝：他们的方法在低资源场景下会严重退化，而这正是你们一直在研究的设置。你打开会议群发消息："今晚组会，有好消息。" 危机，是另一个方向的入口。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '你读了整整一天。他们的方法非常完整，漏洞很少，但有一个应用场景他们确实没覆盖到——这个场景的数据集还没人做。这需要三个月额外工作量。你把这个发现发给了组里，群里消息气泡消失了好几分钟，然后有人回了一个"好的"。工作继续。',
            effects: [
              { type: 'allStudents', stat: 'skills.theory', delta: 4 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'lab', stat: 'energy', delta: -20 },
            ],
          },
        ],
      },
      {
        id: 'race_to_publish',
        text: '加速，把手头结果先整理发出去',
        energyCost: 30,
        outcomes: [
          {
            weight: 1,
            narrative: '你们用四天时间把能写的先写出来，投到了一个workshop，注明"与某实验室同期独立完成"。会议上有人认出了你们的工作，说"我知道你们，你们那个low-resource设置很有意思"。时机虽然差了，痕迹留下来了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
            ],
          },
          {
            weight: 2,
            narrative: '你们火速整理结果，四天后投出了一个arxiv preprint。但那篇原版论文在这四天里又多了八百个转推，审稿人拿到你们稿子的第一条意见是："这个问题已经被[引用]解决了"。你在显示器前坐了很久，感觉就像在马拉松终点线前五百米听到广播说比赛已经结束了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -12 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 4 },
              { type: 'lab', stat: 'energy', delta: -25 },
            ],
          },
        ],
      },
      {
        id: 'pivot',
        text: '当机立断，宣布换方向',
        outcomes: [
          {
            weight: 2,
            narrative: '你在群里发消息：方向调整，今晚讨论新目标。群里挂着灰色双勾半天，然后先冒出来一个"……"，消失了，然后有人发了"了解"，另一个人发了"好的"，第三个人发了"老师我这边实验还有结果没跑完，要不要等等"。你说等等。两周后，新方向开始了，之前的代码没有删——有些工作注定是积累。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
          {
            weight: 1,
            narrative: '你宣布换方向。组里有一个学生找你单独谈了一次：他们过去六个月的工作全部跟这个方向绑定，换方向意味着实质性重来。你们谈了很久，最后找到了一个能保留核心工作的过渡方案，但代价是这个学生的时间线延后了几个月。有些代价是真实的。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
              { type: 'randomStudent', stat: 'favor', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  sota_17_samples: {
    id: 'sota_17_samples',
    title: '17条样本的SOTA',
    description: [
      '{studentName}冲进你的办公室，语气里压不住激动："老师！我们在benchmark上打到SOTA了！" 你放下手里的东西，问：什么benchmark，提升了多少。答：提升了0.3%。你说不错，样本量多少。答：17条测试样本。',
      '{studentName}已经在笔记本里打开了论文草稿，"State of the Art"那一节已经写好了，加粗的，字号比正文大两号。你端着咖啡，看着那个标题，感觉自己需要再喝一杯。',
    ],
    prompt: '面对这个0.3%的17样本SOTA，你选择',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'celebrate_carefully',
        text: '先表扬，再引导思考统计显著性',
        outcomes: [
          {
            weight: 2,
            narrative: '你说"结果很好，但咱们先算一下置信区间"。{studentName}打开Python算了一下，置信区间横跨正负两个百分点，p值约等于0.4。大家都低头盯着那个数字，有人开始用笔在纸边上画小方块。你说"数据收集方向对了，下一步扩大测试集规模，这是正确的路"。{studentName}把"State of the Art"那一节改成了"Preliminary Results"，字号调回正常大小了。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
              { type: 'randomStudent', stat: 'happiness', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你先表扬了一下，{studentName}高兴起来了。你说"但我们来想想置信区间"，{studentName}算完之后神情微妙，说"……也许我们需要更多数据"。你说对。{studentName}临走时把那份草稿折起来放进了包里，没有删掉，大概是留着以后缅怀。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 6 },
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'explain_significance',
        text: '直接讲统计显著性和样本量',
        outcomes: [
          {
            weight: 2,
            narrative: '你在白板上写了置信区间公式，从头讲了一遍。{studentName}认真听完，转头看了看窗外，手指在桌上轻轻敲了几下，然后问："老师，那我们这个结果……"你说"是preliminary finding，但是扩大测试集这件事本身就是下一步的工作贡献"。{studentName}点了点头，把论文草稿关掉，打开了数据集构建的代码。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 10 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 3 },
              { type: 'randomStudent', stat: 'happiness', delta: -8 },
            ],
          },
          {
            weight: 1,
            narrative: '你讲完之后，{studentName}点了点头，问了个问题："老师，那17条样本的benchmark是谁发布的，他们当时是怎么通过审稿的？" 你停顿了一下，发现这是个很好的问题，然后你们花了好一阵讨论学术发表的历史问题，偏题偏得非常愉快。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'workshop_it',
        text: '就这样投个workshop（17条样本也是样本）',
        outcomes: [
          {
            weight: 1,
            narrative: '你说"先投个workshop，让圈内人知道这个方向在做，同时收集更多数据"。{studentName}重振旗鼓，把那个"State of the Art"节改成"Preliminary Study"，投出去了。Workshop录用了，评委说"有趣的初步探索，希望看到更大规模的验证"。{studentName}回来问你这算不算认可。你说算，但标准是暂时降低的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 1 },
              { type: 'randomStudent', stat: 'happiness', delta: 10 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
              { type: 'randomStudent', stat: 'skills.theory', delta: -2 },
            ],
          },
          {
            weight: 1,
            narrative: '你说先投个workshop。审稿人一号说"promising direction"，审稿人二号直接说"n=17 is statistically inadequate for any meaningful conclusion"，并附上了一段五百字的统计学科普。论文拒了。{studentName}回来的时候神情复杂，说"老师，审稿人二号说得好像……没错"。你说：对，他说得对，但不用谢谢他。',
            effects: [
              { type: 'randomStudent', stat: 'skills.theory', delta: 8 },
              { type: 'randomStudent', stat: 'happiness', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  industry_pilgrimage: {
    id: 'industry_pilgrimage',
    title: '企业来访日',
    description: [
      '某大型科技公司联系了实验室，说要来进行"一次非正式的探索性交流，了解前沿研究方向，探讨潜在合作可能性"。联系人的签名有六行，职级名称里有三个大写字母缩写。',
      '消息在组里一公开，实验室发生了一场不动声色的转变。有人昨天还穿着印有猫表情包的帽衫，今天换上了有领子的衣服。有人开始在白板上写"Impact"和"Scalability"，用的是粗麦克笔。有人问你："老师，PPT要不要我来做？" 这是这位同学进组以来第一次主动提出帮助。',
    ],
    prompt: '企业参访，你的应对策略是',
    triggerConditions: [
      { type: 'lab', stat: 'reputation', op: '>=', value: 20 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'professional_presentation',
        text: '准备一套正式汇报，展示研究成果',
        energyCost: 20,
        outcomes: [
          {
            weight: 2,
            narrative: '你们准备了二十分钟的演讲，数据整洁，结论清晰，代码已经跑通了demo。对方的人听完之后发了几张名片，说"这个方向我们很感兴趣，下个月再安排一次深入交流"。学生们在走廊里小声讨论"他们说的实习机会是认真的吗"。你心想大概是认真的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
              { type: 'allStudents', stat: 'skills.social', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: 'PPT做了四十页，demo跑了一半突然报错，你用了三分钟定位到是环境配置问题。对方的人没有表现出明显的不耐烦，但沟通到最后他们说"我们会保持联系"——这句话在学术界和工业界都是礼貌性结束的通用语。实验室的领子在来访者走出大楼之后五分钟内基本都解开了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
              { type: 'allStudents', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'casual_honest',
        text: '轻松对话，如实介绍研究进展',
        outcomes: [
          {
            weight: 2,
            narrative: '你把PPT关了，直接说"我们就聊聊吧"。对方的工程师立刻放松了下来，说"太好了，我们不太喜欢正式汇报"。你们聊了一个半小时，从技术细节聊到工业场景的差距，聊到一半时有人拉来了白板开始画架构图。走的时候，对方说"这是我们今年来访里最有收获的一次"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'favor', delta: 6 },
              { type: 'allStudents', stat: 'skills.social', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你坦诚地介绍了研究进展，包括还没解决的问题和目前的局限性。对方的商务人员面色微微凝固，但技术人员反而来劲了，开始提问"你们有没有想过用X方案处理这个局限"，讨论从此非常实质。真诚有时候是最有效的演讲策略。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'panic_clean',
        text: '早上八点紧急清洁实验室（全员动员）',
        energyCost: 15,
        outcomes: [
          {
            weight: 1,
            narrative: '八点开始打扫，白板擦干净了，外卖盒清走了，那台坏了六个月的打印机被推到了看不见的角落，有人甚至买了一盆绿植放在入口。来访者进来第一句话是"实验室环境很整洁"。你松了口气。但来访开始五分钟后，有人发现实验结果没有准备好——环境清洁了，内容是临时的。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -5 },
              { type: 'allStudents', stat: 'favor', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 1 },
            ],
          },
          {
            weight: 1,
            narrative: '紧急打扫过程中，有人不小心把一台外接硬盘碰落地了。硬盘里有最近三周的实验日志。你们当场停止打扫，转为集体祈祷硬盘还在。来访期间，你一边在讲研究进展，一边在脑子里估算数据恢复的概率。好消息：硬盘没坏。坏消息：那台绿植是有人随便从走廊外面拿来的，来访结束后被人领走了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  vibe_research: {
    id: 'vibe_research',
    title: 'Vibe Coding大揭秘',
    description: [
      '今天的组会进行到一半，{studentName}用一种非常随意的语气说了一句话，然后就继续往下讲了，好像说的是天气："对了，我最近两个月的代码基本上是AI生成的。我描述需求，它写代码，我跑实验，结果还不错。"',
      '整个房间里有一瞬间的静止。你的目光落在那份结果报告上——三千行代码，四组对照实验，数字确实不错。问题是你不知道那三千行代码到底做了什么，{studentName}大概也只知道一半。',
    ],
    prompt: '面对这份AI全自动生成的三千行代码，你选择',
    triggerConditions: BIND_ANY_STUDENT,
    options: [
      {
        id: 'academic_integrity',
        text: '认真讨论学术诚信与工具使用边界',
        energyCost: 10,
        outcomes: [
          {
            weight: 2,
            narrative: '你问了三个问题：代码里的核心算法逻辑你能不能解释清楚？实验结果你能复现吗？如果审稿人问到实现细节你怎么回答？\n\n{studentName}听着听着开始刷手机，又放下皱眉看着桌面，说"核心逻辑我理解，但有几个模块确实是黑盒"。你们花了一下午把那几个黑盒打开，有一处有个细微的错误，不影响结论，但值得注意。边界定清楚了：工具可以用，但不能不理解。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你认真讨论了边界和规范，{studentName}认真听完，表示理解。但你注意到，讨论结束后{studentName}补充说："所以没有违规，对吧？" 你说对。\n\n{studentName}立刻打开了Claude，开始描述下一个模块的需求。有些对话的落点，和你预期的不一样。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 5 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'embrace_productivity',
        text: '工具效率高就好',
        outcomes: [
          {
            weight: 1,
            narrative: '你说结果不错就先往下走，但要求{studentName}能够解释每个关键模块。{studentName}点头，补充说："我已经全部能讲了，就是写起来太烦，让AI帮我写了"。你意识到你们讨论的根本不是同一个问题——你以为是理解，{studentName}以为是键盘操作。生产力提升了，这个认知差距不知道算不算代价。',
            effects: [
              { type: 'randomStudent', stat: 'happiness', delta: 8 },
              { type: 'randomStudent', stat: 'skills.engineering', delta: 2 },
            ],
          },
          {
            weight: 1,
            narrative: '你表示工具没问题，先看结果。结果是好的。但三周后在组会上，你让{studentName}解释某个数据增强模块的设计选择，{studentName}愣了一下，迅速拿起手机假装看什么，放下，又拿起来，最后说"……我查一下"。你没说什么，但你在心里记了一笔：下次要提前问。',
            effects: [
              { type: 'randomStudent', stat: 'projectProgress', delta: 8 },
              { type: 'randomStudent', stat: 'favor', delta: -5 },
              { type: 'randomStudent', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'run_carefully',
        text: '先把三千行代码仔细跑一遍，不放心',
        energyCost: 20,
        outcomes: [
          {
            weight: 2,
            narrative: '你和{studentName}一起，用两天时间把三千行代码过了一遍，单元测试、边界case、数值稳定性全部检查了一遍。发现了两处潜在问题，一处无关紧要，一处如果数据量再大十倍会导致内存溢出。结论：代码质量出乎意料地好，但那个内存问题早发现早好。{studentName}说："AI写代码比我写的还规范。"你没有接话。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 8 },
              { type: 'randomStudent', stat: 'projectProgress', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: 6 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '你仔细审查了代码，发现核心逻辑里有一处数学计算用了近似算法，在{studentName}的数据集上恰好表现良好，但换一批数据会系统性地偏差。神秘的好结果有了解释：实验设置和代码缺陷恰好相互掩盖。你把这个发现告诉{studentName}，两个人面对面坐着，一起看着那个数字，想着接下来要重新做的实验。',
            effects: [
              { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
              { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
              { type: 'randomStudent', stat: 'projectProgress', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  replication_crisis: {
    id: 'replication_crisis',
    title: '复现危机',
    description: [
      '另一个实验室发来邮件，措辞客气，但内容令人有点不舒服：他们在尝试复现你们发表的结果，已经试了三个月，始终无法在15%误差范围内接近你们的数字。他们想要你的完整训练细节。',
      '你打开当年跑那组实验的目录。文件夹里有七个名字不同但内容很像的文件，分别叫做：final.ipynb、final_v2.ipynb、final_FINAL.ipynb、final_FINAL_v2.ipynb、final_FINAL_v3.ipynb、final_FINAL_v3_USE_THIS.ipynb，以及一个叫做use_this_one_actually.ipynb的文件。\n\n你点开final_FINAL_v3_USE_THIS.ipynb，第一个cell的注释写着"记得改这里的seed"。',
    ],
    prompt: '面对复现危机，你选择',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'help_fully',
        text: '全力帮助对方复现，开放所有细节',
        energyCost: 15,
        outcomes: [
          {
            weight: 2,
            narrative: '你花了两天整理了完整的复现指南，包括随机种子、数据预处理的每一步、硬件配置，以及那个notebook里那句"记得改这里的seed"到底是什么意思。\n\n对方成功复现了，发来感谢邮件，说"你们是我们联系过的最透明的实验室之一"，并在他们的论文里多致谢了你们一段。这种合作，不是所有人都愿意做的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 8 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '你全力配合，逐步排查。复现过程中你们发现一个超参数在原始论文里描述有歧义，不同解读会导致不同结果，两种结果都是合理的，但差距大概在12%左右。\n\n对方把这个发现也写进了他们的论文，以"实验设置的歧义性讨论"的形式。你叹了口气，至少这确实推动了领域里的一个小问题。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'investigate_yourself',
        text: '先自己复现一遍，确认结果是否可靠',
        energyCost: 15,
        outcomes: [
          {
            weight: 2,
            narrative: '你花了整整一周，从头到尾自己复现了那组实验。结果出来了，跟论文里的数字差了8%，但都在合理范围内。找到差异来源：当时用的一个数据增强策略在代码更新后行为略有改变，但你当时没有记录版本号。你给对方写了一封很长的回信，解释了全部细节，并附上了修正版本的复现指南。对方在下一篇论文里说你们"展示了高度的学术透明度"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 6 },
            ],
          },
          {
            weight: 1,
            narrative: '你自己尝试复现，跑了三天，数字和论文的差距高达18%，也超出误差范围了。\n\n你仔细检查，发现是当时的测试集和现在版本的数据集有一个差异，但差异发生的那次commit没有详细说明。\n\n你给对方的回信写了一个小时，语气非常诚恳，并附上了详细的环境配置要求。\n\n此后你们组的每个实验都开始记录完整的dependency版本。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 8 },
            ],
          },
        ],
      },
      {
        id: 'send_what_you_have',
        text: '把现有的代码文件发过去，附上说明',
        outcomes: [
          {
            weight: 2,
            narrative: '你把final_FINAL_v3_USE_THIS.ipynb发了过去，诚实地注明"部分细节可能需要进一步确认"。\n\n对方回邮件说谢谢，随后三周没有任何动静，你的邮件客户端每天都显示"已读"，就是没有额外回复。\n\n某个周一早上突然来了一封新邮件：他们找到了差异所在，是数据预处理步骤的顺序问题，你们的描述和代码不完全一致。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
            ],
          },
          {
            weight: 1,
            narrative: '你把代码文件发了过去。三天后对方回邮件说里面有两个cell输出了不同的结果，问哪个是对的。\n\n你打开代码文件，发现这是两次不同实验的残留，都还在，但标注不清楚。你花了一个小时才重新搞清楚哪个是正确版本。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 5 },
              { type: 'lab', stat: 'energy', delta: -5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

  foundation_war: {
    id: 'foundation_war',
    title: '基座之战',
    description: [
      '组里已经分裂成两派好几个星期了，但到今天的组会上终于公开化了。一派认为所有未来工作都应该从通用基础模型出发，不管什么任务，大力出奇迹；另一派认为领域专属预训练是唯一正确答案，通用模型在垂直场景里是个笑话。两派都引用了大量论文，两派引用的论文完全不重叠。',
      '组会已经变成了一场辩论赛，白板上写满了对比数据，有人把对方的论文摊开在桌上用以反驳，有人的声音明显比平时高了半个音阶。你坐在会议桌的一端，意识到如果你不做什么，这可能会持续到天黑。',
    ],
    prompt: '实验室内战，你的应对方式是',
    triggerConditions: [{ type: 'minStudentCount', value: 3 }],
    options: [
      {
        id: 'declare_position',
        text: '表明立场，给出明确方向',
        outcomes: [
          {
            weight: 1,
            narrative: '你说你倾向于基础模型路线，原因是数据规模和通用迁移能力。支持你立场的那组人立刻安静下来露出了胜利者的神情；另一组人安静下来，脸上有一种努力维持学术中立的表情。\n\n组会结束了，方向明确了，但你感觉到其中一半人是带着一口没咽下去的气离开的，这口气或许会在下一个实验结果出来时找到出口。',
            effects: [
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
              { type: 'randomStudent', stat: 'favor', delta: -8 },
              { type: 'randomStudent', stat: 'happiness', delta: -6 },
            ],
          },
          {
            weight: 1,
            narrative: '你说你认为领域预训练在当前资源下更可行，给出了三点理由。另一派的人提出了反驳，你点头说"这个问题下周再讨论"，结束了会议。\n\n三天后你收到一封邮件，是一篇新发布的论文，正好支持了你的立场，发邮件的是当时持反对意见的学生。这应该算是一种迂回的接受。',
            effects: [
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'stay_neutral',
        text: '保持中立，让他们充分辩论',
        outcomes: [
          {
            weight: 2,
            narrative: '你说"这是个好问题，大家继续"，然后靠在椅背上，让他们辩了另外四十分钟。\n\n白板写满了，争到最后两派都承认对方有一些说法是对的。\n\n你在白板角上写下这个问题，说："这是下个季度的实验"。方向从吵架里诞生了。',
            effects: [
              { type: 'allStudents', stat: 'skills.theory', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5},
            ],
          },
          {
            weight: 1,
            narrative: '你保持中立，让他们辩。辩论进行了一个小时，结论没有出现，但双方情绪都上来了。组会在一种不太舒服的气氛中结束，门带上的一瞬间，你隐约听到走廊里有人用力呼了口气。\n\n中立不等于和平，有时候只是把问题推后了。',
            effects: [
              { type: 'allStudents', stat: 'happiness', delta: -8 },
              { type: 'allStudents', stat: 'favor', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'design_experiment',
        text: '设计一个实验来解决这个问题',
        energyCost: 15,
        outcomes: [
          {
            weight: 2,
            narrative: '你打断了辩论，在白板上写下实验设计的框架：相同数据、相同任务、两种预训练策略，评测三个指标。你说："六周后，数据说话。" 两派人同时停止了辩论，转而开始讨论实验设计的合理性——这次他们在一起讨论，而不是互相对立。六周后，结果出来了，有意思，但不简单，足够写一篇论文了。',
            effects: [
              { type: 'allStudents', stat: 'skills.engineering', delta: 4 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
          {
            weight: 1,
            narrative: '你提出用实验来判断，两派都同意。实验方案设计花了两个组会，过程中两派对benchmark选择又产生了新的分歧——用谁的benchmark，评什么指标，本身就是一个新的争论点。你意识到科研的真正乐趣可能就是：每解决一个问题，生长出两个新问题。这组实验大概会比预期复杂很多。',
            effects: [
              { type: 'allStudents', stat: 'skills.theory', delta: 7 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['daily', 'hype'],
  },

};
