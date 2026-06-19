import type { GameEvent } from '../../../types';

export const qianDuoduoEvents: Record<string, GameEvent> = {

  qdd_first_meeting: {
    id: 'qdd_first_meeting',
    title: '钱多多：灵魂第一问',
    description: [
      '钱多多是组里最新来的博士生。你第一次找他正式谈话，花了好一会儿介绍研究方向：技术路线、数据来源、现有的未解决问题，讲得条理清晰，相当专业。',
      '他认真听完，点了点头，然后问出了他的第一个问题："老师，这个技术做出来，用户是谁？"',
      '你以为他会问方法细节，或者相关文献。他没有。他从包里掏出一个有些磨损的小本本，说他课前粗略查了一下，随手做了个市场方向的初步判断，还顺手画了个MVP草图——产品，不是论文，是产品。他的大脑里，显然有一个常驻进程叫"用户画像分析"，停都停不下来。',
    ],
    prompt: '钱多多第一次见面就拿出了产品草图，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'qdd_first_meeting_academic',
        text: '学术第一，产品的事等毕业再说',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他，博士阶段的核心任务是把科学问题做扎实，落地是后面的事。钱多多听完，把小本本合上，说"老师说得对，我先把研究弄明白"。他收起了草图，但你注意到他在本本封面上标了一行字，写着"备用：等论文出来再看"。那个"备用"，让你有说不清的感受，仿佛他在自己的任务栏里给这个想法挂了个"挂起"状态，随时可以恢复。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: -3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', delta: 3 },
          ],
        }],
      },
      {
        id: 'qdd_first_meeting_curious',
        text: '……给我看看那个MVP',
        outcomes: [{
          weight: 1,
          narrative: '你接过本本翻开，草图画得粗糙，但逻辑清得出奇：用户是谁，他们卡在哪个环节，技术能在哪里介入，体验流画成一条线，末尾还标了个问号，注释写着"最难搞的点"。你抬头看他，说"用户分析这块想得还挺清楚的"。钱多多立刻抢回本本，开始在旁边补充新内容。你们聊了将近一小时，实验室的事一句没讲，他大脑里那个常驻进程跑得全程满载。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 7 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 2 },
            { type: 'lab', stat: 'energy', delta: -3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_group_meeting_derail: {
    id: 'qdd_group_meeting_derail',
    title: '钱多多：组会跑题',
    description: [
      '组会进行到一半，大家正在讨论实验数据，分析对照组结果为什么跟预期有偏差。气氛正常，讨论算是深入。',
      '然后钱多多开口了。他说："等等，我从另一个角度问一下，如果这个方法要商业化，定价模型应该怎么设计？按使用量收费还是订阅制？因为这个会影响我们最后选哪个指标来优化。"',
      '话题就此跑偏了好一阵子。有人开始分析竞品，有人估算市场规模，原本的实验数据被晾在白板上，像一道没人认领的课后作业。钱多多在中间画了一个商业模型图，画得极其认真，丝毫不觉得自己做了什么出格的事。',
    ],
    prompt: '组会被带偏了，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'qdd_group_meeting_stop',
        text: '敲桌子，把话题拉回来',
        outcomes: [{
          weight: 1,
          narrative: '你敲了敲桌子，说"商业化的问题有意思，今天先聚焦数据"。钱多多立刻停下，把白板上那幅商业模型图圈起来，标了"待讨论"，然后回到座位，认真看起了实验表格。组会回到正轨。但结束后你发现他把那张商业模型图拍下来发到了群里，附言："有空大家聊聊这个。" 他的后台进程，从未真正暂停。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: -3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -3 },
            { type: 'lab', stat: 'energy', delta: 3 },
          ],
        }],
      },
      {
        id: 'qdd_group_meeting_allow',
        text: '让他说完，这倒是个新角度',
        outcomes: [{
          weight: 1,
          narrative: '你示意他继续。钱多多把定价逻辑讲完，话锋一转，指出如果选订阅制，优化目标应该从单次准确率换成用户留存率，而这恰好和对照组那个"异常"数据有关：那个偏差在留存率视角下其实是合理的。组会多花了些时间，但大家对"我们为什么优化这个指标"有了更清楚的共识。有时候跑题是因为大脑在更高的层次上没有跑题。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 6 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.theory', delta: 3 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_user_interview: {
    id: 'qdd_user_interview',
    title: '钱多多：自己去做访谈了',
    description: [
      '钱多多来找你，说他上个周末做了些"课外工作"。你以为是额外的文献调研，他摊开笔记本——是用户访谈记录，密密麻麻二十个人的反馈摘要。',
      '他利用两个周末，在校园里找了二十个潜在目标用户，问他们现在用什么工具、卡在哪里、愿不愿为解决这个问题付出代价。最后还做了一份分类PPT：哪些人有"真实需求"，哪些人只是"觉得有趣"，清清楚楚。',
      '"老师，需求是真实的，"他说，"二十个人里十四个说，有这个工具他们会用。"他停了一下，补充道："我没问会不会付钱，问了数字会缩水，没意义。"他用户研究做得比很多产品经理都靠谱，而这只是他的周末活动。',
    ],
    prompt: '钱多多自行做了用户访谈，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', op: '>=', value: 15 },
    ],
    options: [
      {
        id: 'qdd_user_interview_praise',
        text: '这个主动性加分，好好聊聊',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他，主动去找真实用户的意识很少见，访谈设计也想得比较清楚。钱多多点头，说"我就是想搞清楚我们做的东西有没有人真的需要，不然论文发出去了，落不了地，感觉很浪费"。你一时有些语塞，这个逻辑在学术圈不太流行，但你找不到哪里错了。有些问题就是这样，简单到让人没法反驳。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 3 },
            { type: 'lab', stat: 'reputation', delta: 1 },
          ],
        }],
      },
      {
        id: 'qdd_user_interview_redirect',
        text: '思路不错，但现在先把研究做扎实',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他方向是对的，但现阶段最要紧的是把核心方法做扎实，用户验证等技术成熟了再系统推进。钱多多听完，把PPT收起来，说"那我先放这，等技术做出来再拿出来对比"。说完认认真真打开了文献库。你感觉他不是在敷衍你，他只是在内心把这件事挪到了任务队列的稍后位置，标记为"依赖：研究进度"。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', delta: 5 },
            { type: 'lab', stat: 'energy', delta: 2 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_startup_plan: {
    id: 'qdd_startup_plan',
    title: '钱多多：拉你入伙',
    description: [
      '钱多多约你单独谈，看起来准备了很久。他说他有一个创业计划，想用实验室的技术方向做一个真正落地的产品，已经找了两个联合创始人，设计、运营各一个，他负责产品和技术方向。',
      '"我想请老师做技术顾问，"他说，"不需要太多时间，主要是技术判断上帮我把关，让我们少踩坑。"他递过来一份文档，封面写着《项目概述：第一版》，底部标注了版本号：v0.7。',
      '你翻开文档——这不是创业计划书，是一份产品需求文档，写法相当正式：用户故事、功能优先级、技术约束，全都有。v0.7，也就是说这份文档他已经来来回回改了至少六七次。他对"认真"的定义，和别人不太一样。',
    ],
    prompt: '钱多多邀请你担任技术顾问，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'qian_duoduo', stat: 'favor', op: '>=', value: 45 },
    ],
    options: [
      {
        id: 'qdd_startup_plan_decline',
        text: '暂不上车',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他，以目前的情况，同时兼顾创业顾问角色容易分散精力，不太合适。钱多多点头，说"我理解，那就算了"，把文档收回去，没有多游说一句。出门前他说了一句："老师，等我们做出来了再给你看。"语气里没有委屈，只有某种平静的笃定，像是他早就预设了这个答案，把它归进了"合理阻力"那一栏，然后继续走。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: -5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -5 },
            { type: 'lab', stat: 'energy', delta: 5 },
          ],
        }],
      },
      {
        id: 'qdd_startup_plan_ask',
        text: '说说你的商业计划书',
        outcomes: [{
          weight: 1,
          narrative: '你翻开文档，指着"技术约束"那章问他："这里写的这个方案，你知道实现成本是多少吗？"他立刻打开笔记本，开始翻，他有一个专门记技术问题的本子，另一本记用户反馈，再另一本记商业逻辑。你们从技术方案聊到产品定位，聊到用户场景，聊了将近一小时。你发现他对"这个东西对什么人有帮助"这个问题，比对"这家公司能赚多少钱"清楚得多。你告诉他可以偶尔来聊，但以非正式的方式。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 3 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_pitch_practice: {
    id: 'qdd_pitch_practice',
    title: '钱多多：路演PPT第六页',
    description: [
      '钱多多在参加高校创业大赛，路演下周，他来找你帮他看PPT。',
      '你打开文件，做得相当专业：用户痛点、解决方案、技术差异点、市场规模，逻辑清楚，视觉干净，不像学生作品，更像一家正经公司做的材料。你翻到第六页，标题是"技术验证"，页面正中贴着一张实验结果图——是实验室最新一篇投稿里的核心数据，论文还没有发表。',
      '你把鼠标停在那张图上，没有说话。空气里有什么东西凝固了一下。',
    ],
    prompt: '路演PPT里出现了未发表的实验数据，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'qdd_pitch_help_edit',
        text: '帮他改，但这一页必须删掉',
        outcomes: [{
          weight: 1,
          narrative: '你直接告诉他，未发表的数据不能出现在公开场合——不是规矩问题，是保护实验室和他自己。钱多多皱了下眉，问"那这一页只剩方向描述，没有数据，能撑住吗？"你说可以，技术验证可以用"内测结果"配上定性用户反馈。他想了一下，点头，重新打开PPT开始改。改完之后那页比原来更简洁，逻辑没有削弱，他在压力下的执行力，比你预想的要好。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 3 },
            { type: 'lab', stat: 'reputation', delta: 2 },
          ],
        }],
      },
      {
        id: 'qdd_pitch_reject',
        text: '第六页有问题，重新想清楚再来',
        outcomes: [{
          weight: 1,
          narrative: '你说这一页有问题，未发表的数据不能用，让他重新想清楚这页怎么处理再来找你。钱多多没有辩解，直接说"好，我想想"，拿着电脑走了。两天后他再来，第六页已经换成了用户访谈的引用，他在校园里做的那二十份访谈，终于派上了用场，而且比那张实验图更有说服力。他自己也说"这个版本其实更好"。有时候被卡住，才会找到更好的路。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 5 },
            { type: 'lab', stat: 'energy', delta: -3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_investor_drama: {
    id: 'qdd_investor_drama',
    title: '钱多多：投资人突然造访',
    description: [
      '一个下午，一个陌生人跟着钱多多走进了实验室。钱多多介绍说，对方是他在某个活动上认识的天使投资人，"对我们做的方向很感兴趣，想顺便看看实验室"。你不记得有人提前告诉过你这件事。',
      '"顺便"。',
      '那位投资人握手、环顾、点头，然后问："实验室这个方向，商业化有没有具体规划？"组里有学生停下了手头工作，白板上还写着下午刚讨论的实验数据，你没有任何准备。钱多多站在旁边，表情算是镇定，但你能看出他已经意识到这个安排欠了很多考虑。',
    ],
    prompt: '投资人突然出现在实验室，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'lab', stat: 'reputation', op: '>=', value: 25 },
    ],
    options: [
      {
        id: 'qdd_investor_improvise',
        text: '硬撑，临场介绍一下研究方向',
        outcomes: [{
          weight: 1,
          narrative: '你简单介绍了实验室的研究方向，技术层面讲得清楚，商业化部分用了"探索阶段"一笔带过。投资人听完点头，说"做得很扎实"。参观结束后，你拉着钱多多说了两句：以后带任何外部人来实验室，必须提前告知。他点头，没有解释，说了句"老师，对不起，我考虑不周"，没有多余的话，承认得很干脆，干脆得让你有点无处发力。两周后那位投资人发邮件，说对实验室方向有兴趣，问能否签一份小额技术顾问协议。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: -5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -5 },
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'lab', stat: 'energy', delta: -5 },
            { type: 'lab', stat: 'funding', delta: 3 },
          ],
        }],
      },
      {
        id: 'qdd_investor_end_visit',
        text: '礼貌送客，改天约正式交流',
        outcomes: [{
          weight: 1,
          narrative: '你说今天下午组里有内部讨论，不太方便长时间接待，可以约改天正式交流。对方理解地点头，留了名片，和钱多多出门了。钱多多当晚发来一条消息："对不起老师，下次提前跟你说"，发完又补了一句"我不是故意的，只是有点冲动了"。你回了"下次注意"，然后把那张名片压在了桌角，暂时用不上，但也没扔。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: -3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -3 },
            { type: 'lab', stat: 'energy', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_product_insight: {
    id: 'qdd_product_insight',
    title: '钱多多：从用户痛点倒推',
    description: [
      '讨论下一步研究方向时，组里争论了很久。技术路线有两条，各有支持者，谁都说不服谁，气氛有点僵。',
      '钱多多一直没怎么说话。等大家停下来，他才开口："我换个角度想，如果是用户，他们最卡的那个步骤是什么？不是技术最难的，是他们最不想手动做的那个。从那个点往回推，我们应该选哪条路？"',
      '他在白板上画了一条用户操作流，标出三个"摩擦点"，把两条技术路线分别对齐到优先级最高的那个。结果出来了：第二条路线的覆盖范围更准。几个之前支持第一条的人，看完图之后改口了。有时候解法不在技术里，在用户流程图的某个转折处。',
    ],
    prompt: '钱多多的用户视角帮助理清了方向，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', op: '>=', value: 60 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'qdd_product_insight_adopt',
        text: '采纳这个角度，按他说的来',
        outcomes: [{
          weight: 1,
          narrative: '你说"这个分析方式有道理，按这个逻辑来"。钱多多没有太多表情，只是把那张用户流程图拍下来，后来整理进了项目文档里。调整后的方向在后续实验中减少了不少无效尝试。钱多多提起这件事，只说了一句："我觉得搞清楚用户是谁，比什么都重要。"话里没有自我标榜的意思，他只是陈述了一个他认为显而易见的事实。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 6 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', delta: 5 },
            { type: 'lab', stat: 'reputation', delta: 2 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
      {
        id: 'qdd_product_insight_praise_only',
        text: '分析不错，但方向还是按原计划',
        outcomes: [{
          weight: 1,
          narrative: '你说他这个分析框架很好，但综合考量之后方向维持原判。钱多多点头，说"好的老师，我只是提个参考"，把白板上那张图擦掉了。但你看到他在本子里把那三个摩擦点又抄了一遍，一字不差。他的想法没有消失，只是换了一个地方存档，等下一次有用的时候再调出来。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_anti_finance: {
    id: 'qdd_anti_finance',
    title: '钱多多：这个方向没意思',
    description: [
      '内部讨论时有人提了个建议，说实验室的技术可以在量化交易领域做一些应用，潜在回报相当可观。几个人觉得值得考虑。',
      '钱多多在那次讨论里没有说什么。但当晚他来找你，说他想单独聊几分钟，开门见山：他觉得量化交易这个方向没意思。',
      '"它只是让一部分钱转移到另一部分人口袋里，没有创造任何新的东西，"他说，"我们做的技术如果最后只是服务这个，我觉得是一种浪费。"他停了一下，加了一句："我反对的不是赚钱。我反对的是做没有用的东西。"他说这话的时候，眼神里有一种少见的认真，让你觉得这不是他第一次想这个问题。',
    ],
    prompt: '钱多多对量化交易方向表示反对，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'qian_duoduo', stat: 'favor', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'qdd_anti_finance_agree',
        text: '"能解决真实问题"是个合理的标准',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他，你理解他的逻辑，在选择研究应用方向的时候，"能解决什么真实问题"是一个合理的判断标准。钱多多听完，点了点头，说"谢谢老师，我就是想知道我的想法不是太奇怪"。他不是要你表态反对量化交易，他只是需要确认自己的判断框架站得住脚。这两件事你都明白了，而且他也知道你明白了。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 8 },
            { type: 'lab', stat: 'energy', delta: -2 },
          ],
        }],
      },
      {
        id: 'qdd_anti_finance_objective',
        text: '方向选择需要多维评估，不能只凭价值判断过滤',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他，应用方向的选择需要多维权衡，"有没有用"是一个角度，但可行性、资源匹配、团队能力也都要考虑，不能靠主观判断直接过滤掉一个领域。钱多多听完，沉默了几秒，说"我知道，我只是觉得如果有得选，我会选对真实用户有帮助的那个"。他没有继续争，但你感觉他的标准没有因为你说的话改变，他只是把它放进了自己的权衡表，排在了第一位，然后说好的，继续走他的路。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: -3 },
            { type: 'lab', stat: 'energy', delta: 2 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  qdd_real_impact: {
    id: 'qdd_real_impact',
    title: '钱多多：真实用户来了',
    description: [
      '钱多多发来一张截图，没有附任何说明。你打开——是某个垂直社区的帖子，他上传的一个小Demo开始被用户自发转发，评论区里有人说"我等这个东西等了三年"，有人说"这解决了我每天都要手动做的问题"，还有几条留言带着联系方式问能不能进内测。',
      '过了一分钟，他发来一条消息："老师，这是我读博以来最开心的一天。"',
      '他没有解释为什么。你打开那个帖子，读了读评论，觉得你大概理解他说的那种高兴是什么，不是因为数据好看，不是因为有人夸，是因为那些评论里的人，真的被帮到了。这对他来说，是比任何指标都要实在的证明。',
    ],
    prompt: '钱多多的Demo得到了真实用户的强烈反馈，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', op: '>=', value: 70 },
    ],
    options: [
      {
        id: 'qdd_real_impact_celebrate',
        text: '先高兴，这个反馈是真的',
        outcomes: [{
          weight: 1,
          narrative: '你回了他："看到了，这个反馈很真实，方向是对的。"他立刻回："老师我知道了！需求是真的！不是我自己猜的！"后面跟了一串感叹号，比他平时说话时的措辞活跃得多，像是长期压着的某种确认终于被解开了。你们没有继续聊，但那条对话你没有删。有时候，一件事情被真实的人需要，就已经是一个完整的意义了。没过多久，一家中小型企业发来合作邮件，说看到了demo，问有没有兴趣做一个小型定向合作。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 10 },
            { type: 'lab', stat: 'reputation', delta: 1 },
            { type: 'lab', stat: 'funding', delta: 2 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'skills.social', delta: 2 },
          ],
        }],
      },
      {
        id: 'qdd_real_impact_paper',
        text: '把这个反馈转化成论文里的用户验证',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他，用户的正向反馈是很好的信号，但要转化成论文里能引用的用户研究，这个证据才能正式成立。钱多多停顿了一下，回："老师，我能不能先高兴一会儿？"你看了一眼那条消息，回了个"可以"。他又过了一会儿才发下一条："好，我去设计一个正式的用户研究协议。"情绪和工作，他都会处理，顺序是先情绪，后工作，执行起来一点也不含糊。',
          effects: [
            { type: 'student', studentId: 'qian_duoduo', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'happiness', delta: 8 },
            { type: 'student', studentId: 'qian_duoduo', stat: 'projectProgress', delta: 5 },
            { type: 'lab', stat: 'reputation', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  // 🎓 毕业后回访 — 建议引擎在graduation后约6个月注入
  qdd_alumni_visit: {
    id: 'qdd_alumni_visit',
    title: '钱多多：融完天使回来了',
    triggerConditions: [{ type: 'studentStatus', studentId: 'qian_duoduo', status: 'graduated' }],
    description: [
      '毕业半年后，你收到一封邮件，发件人是钱多多。标题是：汇报近况 + 一个提议。',
      '他在信里说，他毕业后做了一家公司，核心产品是把实验室的技术真正落地到一个具体的场景里，最近完成了天使轮融资。他写得很简短，没有列金额，没有讲估值，只说了两件事：一，产品有了第一批付费用户；二，他想和实验室签一份正式的技术合作协议，一部分经费会回馈给实验室，作为这项技术来源的致谢。',
      '"不是为了名字出现在网站上，"他在邮件最后写道，"是因为这件事如果没有实验室做的基础，做不出来。我觉得应该有个正式的说法。"你读到这里，停了一下。你想起他当年问的那个第一个问题——"用户是谁"。他找到答案了，然后把答案做成了一个真实的产品，交到了真实的人手里。',
    ],
    prompt: '钱多多带着创业成果回来了，你选择：',
    options: [
      {
        id: 'qdd_alumni_cooperate',
        text: '推进协议，欢迎他回来',
        outcomes: [{
          weight: 1,
          narrative: '你回信说愿意推进。一个月后，协议签好，实验室收到了第一笔回馈经费。钱多多来签协议那天，带来了一份产品介绍——不是融资PPT，是一本用户手册，写着真实的人怎么用这个产品、解决了什么具体的问题。第一页有一行字："技术来源：感谢某某大学实验室的长期研究积累。"你把那本手册放在了办公室书架上。他当年问"用户是谁"，现在这本手册里都是答案。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 8 },
            { type: 'lab', stat: 'funding', delta: 15 },
          ],
        }],
      },
      {
        id: 'qdd_alumni_stay_in_touch',
        text: '协议先缓一缓，保持联系就好',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他协议可以等产品更成熟一些再推进，但很高兴知道他做得不错。他回复说"好的老师，随时"，附带了产品的内测链接，说如果实验室有人感兴趣可以试用，不用给反馈，顺便看看就行。你把链接转发进了组里，三个人当天就注册了账号。其中一个后来发消息说"这个东西还挺有用的"。钱多多没在评论区解释技术原理，他只是做了一个能用的东西，然后等人来用。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 4 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

};
