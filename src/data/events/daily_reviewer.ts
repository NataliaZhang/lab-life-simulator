/**
 * 同行评审 / 投稿喜剧事件
 *
 * 规则：这些事件面向整个实验室，不绑定特定学生。
 * 叙述从 PI 视角展开，效果使用 lab 或 randomStudent。
 */

import type { GameEvent } from '../../types';

export const reviewerEvents: Record<string, GameEvent> = {

  reviewer_agi_prerequisite: {
    id: 'reviewer_agi_prerequisite',
    title: '先解决AGI再来投稿',
    description: [
      '审稿意见到了。审稿人一号给了条件接受，审稿人三号简短但友善。',
      '审稿人二号写道："作者提出的方案在技术上尚可，但本文的核心局限在于：它无法处理需要通用智能才能解决的情形。建议作者在提交修改稿之前，首先解决通用人工智能问题。在获得令人满意的AGI方案之前，本人建议拒稿。"',
      '你把这段话重新读了一遍，然后又读了一遍，确认这不是翻译软件的问题。',
    ],
    prompt: '审稿人二号建议你先解决AGI，你选择',
    options: [
      {
        id: 'rebuttal_deadpan',
        text: '写一份一本正经的rebuttal，逐字回应',
        outcomes: [
          {
            weight: 2,
            narrative: '你在rebuttal里写道："感谢审稿人二号的意见。AGI确实是一个重要的开放问题，但本文的目标范围……"你用了整整四段话，冷静、克制、一字不差地解释了为什么这篇论文不需要先解决AGI。Area Chair大概被这份rebuttal的气质震惊了，随即拍板接受。论文过了。有人愣了两秒，然后群里炸了——第一条消息是一个不知道从哪翻出来的香槟表情，第二条是截图，第三条是"我要把这份rebuttal裱起来"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你写了一份四页的rebuttal，逻辑严密，有理有据，附带对"通用人工智能"定义的文献梳理，并温和指出该标准适用于全部AI论文。审稿人二号没有回应。论文被以"审稿人分歧较大"为由送到了第四位审稿人那里。第四位审稿人写了两条意见，第一条是"为什么不考虑扩散模型"，第二条是"格式有问题"。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'laugh_resubmit',
        text: '不想争，整理一下换个会投',
        outcomes: [
          {
            weight: 2,
            narrative: '你把这条审稿意见截图保存到了专用文件夹，命名为"2号经典收藏"，然后关掉投稿系统，打开新的投稿目标。新投的会论文过了，审稿人一号写道："本文思路清晰，实验充分。"你对着屏幕点了点头，感觉世界大体上是公平的，只是时区不一样。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你换了个会投。新会的审稿人三号写道："本文方法有效，但缺乏对更广泛场景的泛化能力的讨论——在极端情况下，是否需要更强的推理能力？"你盯着这条意见看了很久，感觉审稿人二号换了一个马甲回来了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'actually_address',
        text: '认真研究一下AGI，看能不能解决',
        energyCost: 40,
        outcomes: [
          {
            weight: 1,
            narrative: '你查阅了三周的文献，认真梳理了AGI的定义、主流路径、代表性论文，写了一份十二页的附录，在里面提出了一个"轻量级通用性框架"，逻辑自洽，措辞严谨。你把它加进rebuttal，提交。审稿人二号回复："这部分内容超出了本次审稿的评估范围。"论文被拒。你的附录另外投了一篇论文，过了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -30 },
              { type: 'allStudents', stat: 'skills.theory', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  reviewer_citation_demand: {
    id: 'reviewer_citation_demand',
    title: '文献综述不够——附名单',
    description: [
      '审稿意见里，审稿人三号写道："本文的文献综述不够充分，严重忽视了该领域的重要工作。"随后附上了一份参考文献清单，共14篇。',
      '你逐条检索，发现其中11篇出自同一位作者——T. R. Blankenship。你查了一下审稿系统里的AC机构信息，发现本次会议设在Blankenshire大学。这也许是巧合。',
    ],
    prompt: '审稿人要求引用一份高度可疑的文献清单，你选择',
    options: [
      {
        id: 'cite_all',
        text: '全部引用，不做区分',
        outcomes: [
          {
            weight: 2,
            narrative: '你把14篇全引了，措辞加在相关段落，格式整洁，上下文衔接尚可。论文过了。你和组里达成了一种默契的共识，叫做"学术生存主义"：有用的引用读完，没用的放进去，不问对方叫什么名字。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你把14篇全引了。论文过了。但下一个月里，Blankenship的论文有三篇在学界的引用排行里突然跳升，有人在某个学术论坛上列了一份"疑似citation ring"的分析报告，附上了引用来源图，你的论文在图里出现了。你盯着那个节点看了很久，决定这件事什么都不知道。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'allStudents', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'cite_selectively',
        text: '只引用真正相关的三篇',
        outcomes: [
          {
            weight: 2,
            narrative: '你仔细看完14篇，找出三篇与本文真正相关的，整合进文献综述，写了两句话说明它们的关联。审稿人三号在修改审中写道："作者的文献引用仍不充分，但整体工作尚可接受。"论文勉强过了，像是被用夹子夹着放进了接受列表。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你只引了三篇相关的，在rebuttal里解释了选择标准。审稿人三号回复说"这与我的建议明显不一致"，维持了负面评价，论文以弱拒收场。组里有人低声问了一句"老师，他们是不是同一个人"，你没有回答，因为你不知道怎么回答。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -1 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'counter_rebuttal',
        text: '在rebuttal里指出这个规律（有风险）',
        outcomes: [
          {
            weight: 1,
            narrative: '你在rebuttal里礼貌但清楚地写道："我们注意到推荐文献中有较高比例来自同一位作者，在确认相关性之后，我们选择性地引用了其中直接相关的部分，并在正文中做出了说明。"AC在三天后发来通知：论文进入重新评审流程，由另一位审稿人接手。最终接受。有同事问你是怎么操作的，你说"就是正常写rebuttal"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 2,
            narrative: '你在rebuttal里委婉指出了文献分布的规律，措辞非常克制，没有直接点名。审稿人三号随即追加了两条新意见，都和文献引用无关，但都是负面的。AC的回复是："综合审稿意见，本文暂不接受。"你把这份rebuttal存档，想着总有一天能用上。大概率用不上。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -3 },
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  reviewer_ghost: {
    id: 'reviewer_ghost',
    title: '五个月过去了，什么都没有',
    description: [
      '投稿系统显示：Under Review。这个状态已经持续了五个月。审稿意见一条都没有出现。',
      '你发了三封询问邮件，措辞依次从客气到更客气。AC没有回复。你去查了一下，发现这个会议的主会场已经在两个月前开完了，论文集已经上线，但你的稿件既不在接受列表里，也不在拒稿列表里。',
      '它就这么悬在系统里，像一封没人打算回复的信，被放进了一个人类发明的最奇特的中间态：量子投稿。',
    ],
    prompt: '稿件在系统里消失了一样，你决定',
    triggerConditions: [{ type: 'time', field: 'year', op: '>=', value: 2 }],
    options: [
      {
        id: 'final_inquiry',
        text: '发最后一封措辞精准的询问邮件',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封两百字的邮件，主题明确，措辞精准，抄送了会议主席。三天后，你收到了一封来自投稿系统的自动回复："您的咨询已收到，我们将尽快处理。"然后又是三个星期的已读不回，之后来了一封人工邮件，说"经查，您的稿件已在系统更新中丢失，建议重新提交"。你盯着这行字读了两遍，感到人类的文明在某个节点出了问题。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了邮件。这一次，AC回复了，回复内容是："非常抱歉，由于审稿人临时退出，您的论文被延误了。我们现在重启审稿流程，预计两周内有结果。"六周后，意见到了：条件接受。你把这段经历讲给同事听，对方问"那你这个论文算是在哪年发的"，你想了很久，没有答案。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'withdraw_resubmit',
        text: '撤稿，立刻重投到另一个会',
        outcomes: [
          {
            weight: 2,
            narrative: '你点了撤稿。投稿系统需要三个工作日确认。你在等待期间把论文的格式转换成了新目标会议的模板，排版改了两处，参考文献按新格式对齐，一切就绪。新投了一个会，两个月后拿到了接受通知。原来那个会议的系统后来给你发了一封邮件，说"您的论文已撤回，感谢您的参与"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你点了撤稿，重投到了另一个会。新会的审稿人一号写道："这篇论文我好像在哪里见过类似的工作，建议作者说明与现有工作的区别。"你很想告诉他，那篇"类似的工作"就是你自己的论文，在另一个系统里量子叠加了五个月。但你没有，你写了一份rebuttal，耐心解释了区别。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'quantum_acceptance',
        text: '接受它，量子叠加态也是一种存在',
        outcomes: [
          {
            weight: 1,
            narrative: '你决定不再追问了。论文就这样悬在系统里，既未被接受也未被拒绝，处于一种只有投稿系统才能实现的哲学状态。你在简历的一个角落里用括号写了"（审稿中，持续第6个月）"，然后打开了下一篇论文的草稿。有时候，最好的审稿结果是继续往前走。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 10 },
              { type: 'allStudents', stat: 'happiness', delta: 2 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  reviewer_scope_again: {
    id: 'reviewer_scope_again',
    title: '第四次：超出本会议范围',
    description: [
      '拒稿通知到了。审稿人写道："本文工作技术上扎实，然而与本会议的研究方向不够契合，超出本会议范围。"',
      '这是第四个会议说出这句话。第一个是系统方向的会，第二个是应用方向的会，第三个是跨学科的会，第四个的主题是"AI与现实世界"，范围之广在召集书里写得相当清楚。',
      '你把四份拒稿信并排放在屏幕上，确认了一下：每一份都有这个短语。这篇论文的范围，在这个世界的某个地方，是完全正确的——只是你还没找到那个地方。',
    ],
    prompt: '第四次被告知超出范围，你决定',
    triggerConditions: [{ type: 'time', field: 'year', op: '>=', value: 2 }],
    options: [
      {
        id: 'find_right_venue',
        text: '系统调研一下真正合适的投稿目标',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了半天时间，把近三年的接受论文逐篇分类，找出了一个不起眼但接受风格相符的workshop。改了格式，投了进去。两个月后接受，审稿人写道："这篇论文和本次研讨会的主题非常契合。"你把这句话截图下来，放进了那个专门存放"反转"的文件夹。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你认真调研了半天，找出了五个可能合适的目标。投了其中最匹配的一个。审稿人写道："本文技术贡献尚可，但本会议更关注实证研究，建议作者考虑更偏理论的会议。"你翻出了第一封拒信——那个会议说"建议考虑更偏应用的场景"。你关掉了所有标签页，喝了杯水。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'pivot_framing',
        text: '重写引言，把范围重新包装',
        outcomes: [
          {
            weight: 2,
            narrative: '你重写了引言和摘要，把"方法论贡献"改写为"实际系统影响"，调整了关键词组合，把论文用一套新的叙事框架重新包装了一遍，技术内容一字未动。投进同一个领域的另一个会，这次过了。审稿人写道："这项工作很好地契合了本会议的核心主题。"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'allStudents', stat: 'skills.social', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你改写了引言，精心调整了定位，花了两天时间让它听起来像另一个类型的论文。投稿之后，审稿人写道："本文包装不够诚实，核心贡献定位模糊。"你意识到你把包装改得太过明显了，让人一眼看出有包装。下次要更自然一点。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'lab', stat: 'energy', delta: -8 },
            ],
          },
        ],
      },
      {
        id: 'scope_is_construct',
        text: '接受"范围"是一种社会建构，不再较劲',
        outcomes: [
          {
            weight: 1,
            narrative: '你把论文挂到了arxiv，写了一段简洁的摘要，附上了完整实验。三个月后，有人在推特上引用了它，说"这篇没发表的工作比XX会的好几篇正式论文都扎实"。你没有转发，但你保存了那条推文。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 15 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  reviewer_insider: {
    id: 'reviewer_insider',
    title: '他知道的比应该知道的多',
    description: [
      '审稿意见到了，审稿人二号的第三条意见是："作者在处理长尾数据分布时的采样策略存在偏差，这在对应的消融实验中也有所体现——但这个问题在公开版本的方案里尚未被讨论过。"',
      '你重新读了一遍。那个消融实验，只存在于你内部的Google Doc里，从未对外公开。采样策略的具体细节，只有组里的人知道。',
      '审稿人二号了解一些只有内部人员才能知道的东西。',
    ],
    prompt: '审稿人二号知道的比他应该知道的多，你决定',
    options: [
      {
        id: 'report_to_ac',
        text: '向AC报告可能存在的利益冲突',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封邮件给AC，语气正式，列出了几个具体的细节描述，说明审稿人可能接触过非公开信息，请求调查利益冲突。AC回复说会核查，并将论文送交新的审稿人。新的审稿人给了条件接受。没有人告诉你调查结果是什么，也没有人解释那些细节是怎么出现在审稿意见里的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你向AC报告了。AC回复说"将认真对待您的反馈"，随后两周没有消息，之后来了一封审稿结论邮件，维持原有三位审稿人的意见，结论是拒稿。你搞不清楚那封报告邮件有没有被人看过。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -20 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'use_strategically',
        text: '在rebuttal里用这条信息倒推审稿人的立场，针对性回应',
        outcomes: [
          {
            weight: 2,
            narrative: '你在rebuttal里对那个具体问题进行了详尽的补充实验，写得非常有针对性，仿佛你早就知道这会是核心争议点——因为你确实知道。审稿人二号在修改审里说"作者已充分回应"，给了弱接受。你没有对外提过这件事，它成了一段只存在于你内存里的经历。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你写了一份非常有针对性的rebuttal，直接回应了那个消融实验的问题，仿佛你预判了对方的预判。审稿人二号回复："作者的回应有些异常精准，令人生疑。"论文被拒，理由是"存在某些程序性疑虑"。没有人解释这意味着什么。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -4 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'pretend_not_to_notice',
        text: '装作没发现，正常提交rebuttal',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一份正常的rebuttal，没有提那些细节，按常规逐条回应了审稿意见。论文过了，审稿人二号的那条意见被归入了"已解决"。你把原始截图存进了一个文件夹，文件夹名叫"备用"，没有子文件夹，这是第一次不知道下面会不会再有东西放进来。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  reviewer_format_rejection: {
    id: 'reviewer_format_rejection',
    title: '摘要字号差了一号',
    description: [
      'Desk rejection。理由："根据本会议投稿要求，摘要部分应使用10pt字体，作者提交版本使用了11pt字体，不符合格式规定，故不予送审。"',
      '摘要一共四行，约六十个词。字号差了一号。',
    ],
    prompt: '因为摘要字号多了一号被拒，你决定',
    options: [
      {
        id: 'fix_and_resubmit',
        text: '改好字号，立刻重投',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了三分钟把摘要字号改为10pt，导出PDF，确认格式无误，重新提交。这一次进入了正常审稿流程。两个月后，论文以条件接受收场，审稿人的意见里没有一条涉及格式。你偶尔想起那三分钟，觉得那是你整个科研生涯性价比最高的一次修改。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你改了字号重投。系统在确认页面提示："请注意，重复提交可能被视为同一论文的第二次投稿，请确认符合会议规定。"你读了这段话三遍，查了会议官网，没有找到"同一论文重投"的相关规定。最终鼓起勇气提交了，进入正常流程。这个心理代价，按理不应该存在。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'write_response',
        text: '写一封言辞恳切的申诉，探讨形式与实质的关系',
        energyCost: 20,
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封两页的邮件，从学术评审的意义谈起，引用了三篇关于peer review制度的meta研究，委婉地指出字号差一号对审稿质量的影响可能接近于零。程序委员会主席回复说："感谢您的意见，我们会将此纳入下届会议的规则讨论。本届不作例外处理。"你把这封邮件打印出来，放进了一个物理文件夹。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -20 },
              { type: 'lab', stat: 'reputation', delta: 1 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'take_the_day_off',
        text: '今天休息一天，明天再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了投稿系统，打开了一部纪录片，看了两个小时，然后去散了个步。第二天，你用十分钟改完了格式，重新提交，没有任何心理负担。论文最终通过了，审稿意见里有一条表扬摘要写得简洁。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 15 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  reviewer_retroactive_scoop: {
    id: 'reviewer_retroactive_scoop',
    title: '昨天下午三点上传的论文',
    description: [
      '审稿意见里，审稿人二号写道："本文的核心贡献已被[Chen et al., 2026]的工作覆盖，建议拒稿并请作者参阅相关工作。"',
      '你去查了那篇引用。它是昨天下午三点整上传到arxiv的。你六个月前投的稿。',
      '你盯着时间戳看了很久，开始思考人类对"优先权"这个概念的理解是否存在某种根本性的哲学错误。',
    ],
    prompt: '被一篇昨天才上传的论文判定为"已被超越"，你决定',
    options: [
      {
        id: 'argue_chronology',
        text: '在rebuttal里清楚列出时间线，指出逻辑问题',
        outcomes: [
          {
            weight: 2,
            narrative: '你在rebuttal里附上了投稿系统的时间戳截图，把两篇论文的提交时间并排呈现，用一句话指出："本文提交时间早于引用工作上传时间整整六个月，在时间顺序上，本文工作应当具有独立性和优先性。"AC大概觉得这个逻辑无从反驳，换了一位审稿人，论文过了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 1,
            narrative: '你提交了清晰的时间线证明。审稿人二号回复说："尽管如此，鉴于该工作已公开，本文需要更明确地说明与之的差异化贡献。"你更新了相关章节，把差异写清楚，花了两周时间。论文最终接受，新增的那一段把论文变得更完整了——代价只是你脑子里那段无声的抗议。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'add_citation_carry_on',
        text: '加上引用，写清楚差异，不做争论',
        outcomes: [
          {
            weight: 2,
            narrative: '你加上了那篇引用，写了半页说明两篇论文的具体差异——你发现差异比你想象的大，这让你好受了一些。论文通过了。你在最终版的acknowledgments里保留了原来的写作时间记录，算是一种没人会注意到的自我声明。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你加了引用，写了差异说明，重新提交。审稿人一号看完更新的版本，说"本文与引用工作过于相似，差异化贡献仍然不够清晰"。你把两篇论文重新对比读了一遍，差异其实相当明显，只是被你写得太学术了，让人看不出来。你改写了引言，换了一组词汇。第三次审稿通过了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'review_their_paper',
        text: '查一下那篇论文有没有投到什么地方，看能不能争取审稿机会',
        outcomes: [
          {
            weight: 1,
            narrative: '你发现Chen et al.的论文投到了另一个你也在PC list上的会议。你没有主动去要那篇稿，但当分配系统把它推到你的审稿列表上时，你接受了，写了一份认真、客观、相当严格的审稿意见，每一条都有文献支撑，逻辑无懈可击。论文接受了。你感觉某种平衡在宇宙层面被恢复了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -10 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  desk_reject_48h: {
    id: 'desk_reject_48h',
    title: '周三早上，拒稿了',
    description: [
      '周一投的稿。周三早上，投稿系统发来邮件："我们遗憾地通知您，经过编辑初审，您的论文与本刊的发表范围不够契合，因此无法进入同行评审流程。"',
      '没有具体理由。你在这个会议上发过两篇论文，其中一篇还是口头报告。',
    ],
    prompt: '48小时desk reject，你决定',
    options: [
      {
        id: 'email_clarification',
        text: '发邮件询问具体原因',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了邮件，措辞礼貌，请求了解论文在哪个维度上不符合要求，以便未来改进。收到了一封模板回复："由于审稿量较大，编辑组无法为每一份初审结果提供详细说明。"你把这封邮件存进了那个叫"学术界运作机制"的文件夹，子文件夹数量这个月又多了一个。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了邮件询问，编辑回复说："您的论文与我们目前的重点方向存在一定距离，具体体现在……"然后列了两条真实的反馈。你读完，发现其中一条是误解，另一条是合理意见。你修改了论文，下一次投稿前专门对照了那条反馈，最终通过了。意外地，那封邮件成了这整个过程里最有用的东西。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'pivot_next_venue',
        text: '立刻打开备选列表，今天就锁定下一个目标',
        outcomes: [
          {
            weight: 2,
            narrative: '你打开了备选会议列表——你一直维护着这个列表，每个会议旁边标注了ddl、录用率、和适合的论文类型。锁定了下一个目标，修改格式，三天内重新投出去。两个月后，这篇论文拿到了接受通知。效率有时候是一种防御机制。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'projectProgress', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你立刻打开备选列表，选了第二名，当天晚上改完格式提交了。凌晨一点，在确认提交之前，你发现这个会议的ddl是昨天。你把标签页关掉，打开第三名，检查了三遍ddl，第二天重新提交。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'professional_email',
        text: '写一封你非常满意的专业邮件，然后关掉，不发',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封两百字的邮件，陈述了这篇论文与会议主题的契合度，列举了你此前在该会议的发表记录，措辞专业、克制、完全无懈可击。你读了三遍，觉得它很好。然后你把它保存到草稿箱，关掉了邮件客户端，打开了新的投稿目标。草稿箱里现在有七封这样的邮件。没有一封发出去过。这大概是正确的选择。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 10 },
              { type: 'lab', stat: 'reputation', delta: 1 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

};
