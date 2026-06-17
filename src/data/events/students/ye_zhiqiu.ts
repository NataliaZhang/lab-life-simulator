import type { GameEvent } from '../../../types';

export const yeZhiqiuEvents: Record<string, GameEvent> = {

  yzq_first_meeting: {
    id: 'yzq_first_meeting',
    title: '两页纸的自我介绍',
    description: [
      '叶知秋准时出现在你办公室门口，准确说是"精确准时"，她后来坦白提前两分钟到了楼道，蹲在外面等到整点才敲门，"因为提前敲门会对老师的时间预算造成不受控的扰动"。',
      '她从包里掏出一份打印文档，双手递过来，封面赫然写着：《入组自我评估报告（初版）》，共两页，有目录，目录下方还有一行小字："版本更新日志见内页"。',
      '"老师，我想先确认一件事。"她翻到第一页，用钢笔笔帽指着"工程能力"一栏，"这里的定义域是否涵盖系统设计？若仅指编码实现，我的评分需要向下修正，依据在第二页注释三，有附加说明。"',
    ],
    prompt: '你怎么回应这份报告？',
    triggerConditions: [
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', op: '<=', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'yzq_first_meeting_explain',
        text: '开展术语对齐专项会议：系统设计算工程',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋翻到第二页，在注释三旁边用铅笔写下"定义已确认，V1.0"，然后抬头说："好的，评分维持原样。老师，这份报告我已在组里共享文件夹存档，路径我发消息给你。"你望着她离开的背影，忽然意识到：这个学生大概会把"吃午饭"也整理成一份执行报告。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 5 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 4 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'yzq_first_meeting_defer',
        text: '悬置定义争议，先聊研究方向',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋把报告折好，神情礼貌而克制，说："好的，我会在V1.1版本里把术语定义单独列一节，方便下次对齐。"你注意到她说的是"下次对齐"。你以为你绕开了这个问题，但你只是把它推迟了。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_definition_battle: {
    id: 'yzq_definition_battle',
    title: '"大概率"的精确含义',
    description: [
      '组会进行了一段时间，你说了句"这个方向大概率是对的，我们就按这个推进"，顺手准备翻下一页。',
      '叶知秋礼貌地举起手，像一个永远不会迟到的逻辑警察刚刚拦下一辆闯红灯的概念。"老师，打扰一下——请问「大概率」有量化定义吗？主观贝叶斯置信度，还是频率学派意义下的极限？因为两者对实验设计的影响是不同的……"',
      '整个讨论从此在"大概率"这三个字里面盘旋了二十分钟。她的问题本身无可挑剔。时机只是……非常精准。',
    ],
    prompt: '你怎么处理这二十分钟？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'yzq_definition_battle_engage',
        text: '接受挑战：现场把"大概率"定义成公理',
        outcomes: [
          {
            weight: 1,
            narrative: '你们在白板上把核心假设重新捋了一遍，叶知秋把符号和边界条件写满了半块白板。会后她发来一份整理好的定义文档，主题是"会议共识（含置信水平约定）"，附言："感谢今天的讨论，文档已归档，后续写作可直接引用第2.1节。"那个方向后来确实因此少踩了几个大坑。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 3 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'yzq_definition_battle_redirect',
        text: '友情提示：我们还有议程',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋把手放下，在笔记本里飞速写了什么，随后安静地坐到散会。第二天早上你收到一条消息："老师，关于「大概率」我整理了三种可能的操作性定义，有空请确认，否则下周汇报用哪个口径我无法确定。"她没有生气，只是她的问题不会因为你说"我们先推进"而消失。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_theory_saves_day: {
    id: 'yzq_theory_saves_day',
    title: '隐含条件',
    description: [
      '实验结果出现了诡异偏差，全组盯着代码挖bug，日志翻了好几遍，程序重跑了，没人找到答案。',
      '叶知秋没有动电脑。她把原始推导的PDF打印出来，从第一页开始往后翻，铅笔在每个公式旁批注前提条件，像一位法医在案发现场还原时间线。',
      '过了一阵，她把打印纸推到桌子中间，指着第三页一行不起眼的假设："这个条件在我们的数据集上并不总是满足。去掉它，所有观测结果完全自洽。"组里沉默了片刻。',
    ],
    prompt: '你怎么回应这个发现？',
    triggerConditions: [
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', op: '>=', value: 60 },
      { type: 'minStudentCount' as const, value: 3 },
    ],
    options: [
      {
        id: 'yzq_theory_saves_day_record',
        text: '立刻存档，把这个条件升格为方法论核心命题',
        outcomes: [
          {
            weight: 1,
            narrative: '你们当天把这个隐含条件整理成独立命题，附上证明和适用范围。叶知秋主笔，写完发来附言："建议作为方法论第一个脚注，因为后续所有结论都依赖此处。"审稿人后来专门批注：方法论严谨性令人印象深刻。叶知秋看到这条评语，在笔记本上记下："外部验证：严谨性。"',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'yzq_theory_saves_day_praise',
        text: '先表扬，细节下周再整',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋点点头，把打印纸叠好收进文件夹，说："好的，我先把完整证明写出来，方便下周直接用。"你说不用那么急，她说："顺手的，今晚写完。"次日早上你打开收件箱：四页推导文档，标注清晰，无一处跳步。她的"顺手"和普通人的"认真"在量级上大约差两个数量级。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 7 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_env_crisis: {
    id: 'yzq_env_crisis',
    title: '能不能把这个问题理论化',
    description: [
      '叶知秋敲门进来，表情如同一位刚刚亲历了漫长庭审的律师，高度疲惫，高度克制，高度压抑着某种已经接近沸点的情绪。',
      '"老师，环境配不起来。"她把手机屏幕转向你：密密麻麻的报错信息，每隔几行就有一条新颜色的fatal。"版本冲突，依赖循环，Docker里跑不起来，本地装了报错，服务器权限不够。我试了很多方案。"',
      '她深吸一口气，然后用一种异常平静的语气提出了一个请求："老师——我可不可以把这个问题理论化？用数学方式形式化实验设置，完全绕开具体实现？"',
    ],
    prompt: '你怎么处理这场环境灾难？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 4 },
    ],
    options: [
      {
        id: 'yzq_env_crisis_fix',
        text: '亲自动手，工程救援',
        outcomes: [
          {
            weight: 1,
            narrative: '你陪她花了一个下午把环境配好，途中踩了两个闻所未闻的坑。叶知秋全程用笔记本记录每一步操作，最后整理成一份"环境配置备忘录（附排错日志及根因分析）"，末尾加了一条致谢："感谢老师的工程支援。"你盯着"工程支援"四个字，感到一种复杂的情绪在胃里慢慢发酵。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 5 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.engineering', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'yzq_env_crisis_theorize',
        text: '数学的归数学，环境的……算了',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋的表情迅速完成了从"高度痛苦"到"高度专注"的切换，像是有人关掉了一个一直在报警的传感器。一周后她发来二十页理论框架，附言："实验部分已用构造性证明替代，结论的强度实际上更高。"你意识到，这从来就不是逃避，她只是终于找到了正确的坐标系。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_checklist: {
    id: 'yzq_checklist',
    title: '三十二条检查清单',
    description: [
      '你让叶知秋帮忙审一份项目申请材料，估计两三小时，随口说了句"帮我看看有没有明显问题就行"。',
      '她当天下午把材料发回来。附件有两个：一是标注版原文，二是一份独立文档，标题是《材料审查清单（共32条，含8个维度交叉验证）》。',
      '第三十一条写的是："是否已确认第一条"。第三十二条写的是："是否已确认第三十一条"。这是一份会自我递归的清单。',
    ],
    prompt: '你怎么对待这份三十二条清单？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'yzq_checklist_follow',
        text: '逐条过：清单就是用来走的',
        outcomes: [
          {
            weight: 1,
            narrative: '你花了两小时把三十二条挨个核对，第七条的数据引用问题确实存在，第十九条格式建议颇有道理。材料质量肉眼可见地提升了。你回复"清单非常有用"，她回："如您觉得合适，我可以把通用版本沉淀为组里的标准作业流程。"你说好。就这样，组里多了一套三十二条的质量管控体系，起点是你一句随口的"帮我看看"。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'yzq_checklist_skip',
        text: '回"谢谢好的"，只看标注原文',
        outcomes: [
          {
            weight: 1,
            narrative: '材料交上去后，申请委员会回来说第七条数据引用格式有误，需修改重提。你翻出清单，第七条写得清清楚楚，连修改建议都附上了。叶知秋没有说任何抱怨的话，只是在你发出修改版之后，发来一条消息："已收到。下次需要我在清单里把高优先级条目标红吗？"',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 3 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: -2 },
              { type: 'lab', stat: 'reputation', delta: -1 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_logic_police: {
    id: 'yzq_logic_police',
    title: '这个类比在第二步就不成立了',
    description: [
      '你在给叶知秋讲一个概念，用了一个日常类比，觉得相当形象，准备就此收尾，翻页。',
      '她把笔放下，看了你一眼，然后开口："老师，这个类比在第二步就不成立了。原概念里的映射是单射，但您类比对象里对应的关系不满足这个性质，所以后续推论……"',
      '她讲了一阵，把你的类比从第一步解构到第五步，指出三处不严格的地方，然后给出了一个替代版本，精确，无歧义，完全没有你原来那个版本的烟火气。',
    ],
    prompt: '你怎么回应这场类比解构？',
    triggerConditions: [
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'yzq_logic_police_accept',
        text: '认栽，采用精确版类比',
        outcomes: [
          {
            weight: 1,
            narrative: '"你说得对，我们用你的版本。"叶知秋把替代类比写进组里的概念文档，注明"原类比因映射性质不符已替换，V2.0"。下次你讲同一个概念，感觉少了点烟火气，但组里再也没有人把那个步骤理解歪过。有时候严谨本身就是最好的类比。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 7 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'yzq_logic_police_defend',
        text: '捍卫直觉：类比够用就行，不用完全严格',
        outcomes: [
          {
            weight: 1,
            narrative: '"老师，"她停顿了一下，"我理解直觉的价值。但如果这个类比被引用来支持后续论点，不严格的部分可能会传播误解。"她没有进一步坚持，只是在笔记本上写了什么，你没看见内容。此后每次你用类比讲概念，她都会在旁边安静地补充一句"严格来说"。每次，不落。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 4 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_cant_code: {
    id: 'yzq_cant_code',
    title: '构造性证明代替实验',
    description: [
      '你给叶知秋布置了一组对照实验，说好两周交结果。任务说明写得很清楚：跑实验，出数字。',
      '两周后报告来了，二十八页。前二十四页是完整数学分析，结论严格，边界情况全覆盖，无懈可击。',
      '第二十五页标题是："实验部分（构造性）"。没有代码，没有数据图，有一个形式化构造证明：如果实验可以被运行，其结果必然满足某某性质。结论完整，正确，无可挑剔。就是没有任何可以实际运行的东西。',
    ],
    prompt: '你怎么评价这份报告？',
    triggerConditions: [
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.engineering', op: '<=', value: 30 },
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'yzq_cant_code_praise_theory',
        text: '先肯定理论，然后要求可运行的版本',
        outcomes: [
          {
            weight: 1,
            narrative: '"理论部分做得很扎实，"你说，"但最终要有能跑出来的数字。"叶知秋点头："我明白。我会请工程方向的同学配合来做这部分。"她把"工程"两个字说得格外清晰，像是在使用一门虽然不流利但态度认真的外语。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 6 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 3 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'yzq_cant_code_push',
        text: '直说：代码这周必须有',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋翻到"实验部分（构造性）"那页，沉默地看了一会儿，然后抬头："好的老师，我这周把环境再试一遍。"一周后你收到代码：能跑，有结果，注释密度堪称文学作品，每行都附了对应的数学符号和推导编号。运行效率一般，结果完全正确，旁边还有一行注释："此处实现与定理3.2第四步等价，见附录B。"',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 2 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: -4 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.engineering', delta: 5 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_reliable_delivery: {
    id: 'yzq_reliable_delivery',
    title: '第十三天',
    description: [
      '你给叶知秋安排了一个两周的任务，随口加了一句"不用太赶，完成就好"。',
      '第十三天下午，她出现在办公室门口，把一份文件放到你桌上，面色如常："老师，任务完成了。"',
      '你翻开：正文完整，完全符合预期，然后是附录A、附录B，以及一份"延伸分析"。内容大约比你要求的多了三分之一，包含两个你没有问到、但确实很关键的边界情况。',
    ],
    prompt: '你怎么回应这份提前完成的任务？',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', op: '>=', value: 60 },
    ],
    options: [
      {
        id: 'yzq_reliable_delivery_praise',
        text: '表扬：附录部分非常有价值',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋点点头，表情平静，像是在确认一件计划内的事情。"如有需要，附录B我可以单独整理成独立文档存档。"你说好，她说"今晚发给你"，然后离开了。你盯着那份文件看了一会儿，感到一种罕见的、被人完全托住的踏实。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 10 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 8 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 6 },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'yzq_reliable_delivery_ask',
        text: '好奇发问：第十三天，是怎么做到的？',
        outcomes: [
          {
            weight: 1,
            narrative: '"我第一天把任务拆成了十个子任务，"叶知秋说，"给每个子任务分配了时间预算，最后留一天用于整合和检查。所以第十三天完成是计划内的。附录部分是检查阶段发现的遗漏点，没有占用额外时间窗口。"你点点头，在心里悄悄更新了一下"高效"的定义。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 6 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 5 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_proof_breakthrough: {
    id: 'yzq_proof_breakthrough',
    title: 'QED',
    description: [
      '这个收敛性证明卡了将近两个学期。之前两个人尝试过，在同一个地方撞墙两次，之后大家心照不宣地把它归入"战略性搁置"文件夹。',
      '某个周五下午，叶知秋发来一条消息，附件是手写扫描件，二十七页，字迹工整，每步都有前提标注，推导链完整无断点。',
      '最后一行写着"QED"，旁边用圆珠笔画了一个小勾，低调得像是在核对待办事项，随手划掉了一件本来不可能完成的事。',
    ],
    prompt: '你怎么回应这个突破？',
    triggerConditions: [
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'skills.theory', op: '>=', value: 80 },
    ],
    options: [
      {
        id: 'yzq_proof_breakthrough_publish',
        text: '立刻整理发表，这个值得单独一篇',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋花了几天把手写稿转成LaTeX，排版一丝不苟，每个符号都和手稿对应。投稿前她要求安排两位独立验证者逐步核对，这是她自己提出的要求。论文出来后一个月内收到三封同行邮件，都说他们也在这个问题上卡过很久。叶知秋对此的评价是："那说明证明是有非平凡价值的。"',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 15 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 12 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 15 },
              { type: 'lab', stat: 'reputation', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'yzq_proof_breakthrough_verify',
        text: '先独立验证，确认无误再庆祝',
        outcomes: [
          {
            weight: 1,
            narrative: '"这是正确的做法，"叶知秋说，"我自己核对了很多遍，但独立验证是必要的协议。"你找了组里理论最强的人把证明过了一遍，两天，结论：正确，零漏洞。那位同学私下告诉你："第十四步那个构造挺妙，我没想到可以那么拼。"叶知秋听到反馈后，在笔记本上记了一行："外部评价：第十四步构造——妙。"',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 12 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'happiness', delta: 10 },
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', delta: 12 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

  yzq_alumni_visit: {
    id: 'yzq_alumni_visit',
    title: '措辞是否太直接',
    description: [
      '叶知秋毕业后去了某理论方向的顶级实验室做博后。走之前说会"保持联络"，你当时以为是客套，后来发现她是认真的，大约每两个月一封邮件，每封都带着具体的问题或者有用的资料，从不发只有"老师好"的消息。',
      '这次邮件的标题是："想请老师帮忙确认一下措辞"。',
      '正文：她在新组帮忙审了一篇合作论文，发现了三处证明漏洞，想写审稿意见，但她不确定措辞是否太直接，附件是她的详细审查报告，每处漏洞附完整反例和修复建议。她在最后一行加了一句："如果语气有不妥的地方，请老师帮我调整。"',
    ],
    prompt: '你怎么回复叶知秋？',
    triggerConditions: [
      { type: 'student', studentId: 'ye_zhiqiu', stat: 'projectProgress', op: '>=', value: 95 },
      { type: 'time', field: 'year', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'yzq_alumni_visit_affirm',
        text: '回复：报告严谨克制，直接发吧',
        outcomes: [
          {
            weight: 1,
            narrative: '叶知秋回复："好的，谢谢老师确认。我把第二处漏洞的描述稍微软化了一下，加了「建议核实」四个字，其余保持原样。"三天后她发来消息：审稿意见已发，对方作者回复"非常感谢，这些问题确实存在"。你把这封邮件存进了一个专门的文件夹。她还是她，只是从你的组飞去了更远的地方，依然认真，依然精准，依然会在发出每一份批评性文字之前，先问一句"老师，这样是否太直接"。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
      {
        id: 'yzq_alumni_visit_soften',
        text: '建议再软化语气，学术圈要维护关系',
        outcomes: [
          {
            weight: 1,
            narrative: '"我理解老师的考量，"她回复，"我会在每处漏洞前加「建议进一步核实」。但漏洞本身我还是会完整列出，读者有权知道证明的边界。"你看着这封邮件，想到她毕竟还是来问过你的，想到她在附件最后写的那句"如果语气有不妥请老师帮我调整"。对叶知秋来说，那已经是最大程度的温柔了。',
            effects: [
              { type: 'student', studentId: 'ye_zhiqiu', stat: 'favor', delta: 5 },
              { type: 'lab', stat: 'reputation', delta: 4 },
            ],
          },
        ],
      },
    ],
    tags: ['student_specific'],
  },

};
