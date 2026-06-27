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
      'ICOP的审稿意见到了。一号条件接受，三号语气友善。',
      '二号写道："作者提出的方案技术上尚可，但本文的核心局限在于：它无法处理需要通用智能才能解决的情形。建议作者在提交修改稿之前，首先解决通用人工智能问题。在获得令人满意的AGI方案之前，本人建议拒稿。"',
      '你把这段话重读了三遍，确认不是翻译软件的问题，也不是对方的玩笑。',
    ],
    prompt: '二号审稿人建议你先解决AGI，再来改稿——你决定',
    options: [
      {
        id: 'rebuttal_deadpan',
        text: '逐条答辩，奉陪到底',
        outcomes: [
          {
            weight: 2,
            narrative: '你写了一份逐条回应的申辩稿（业内称"rebuttal"，就是对着审稿意见一条一条正式反驳）。关于AGI那条，你用四段话平静地解释了为什么这篇论文不需要先解决AGI。\n\n大会程序主席大概被这份气质震惊了，随即拍板接受。群里的第一条消息是香槟表情，第二条是截图，第三条是"我要把这份申辩裱起来"。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你写了一份有理有据的申辩，附带对"通用人工智能"定义的文献梳理，温和指出该标准适用于全体AI论文。二号没有回应。\n\n论文以"审稿人分歧较大"为由送到了第四位审稿人那里。第四位写了两条意见：第一条是"为什么不考虑扩散模型"，第二条是"格式有问题"。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'laugh_resubmit',
        text: '已读，不回，换会',
        outcomes: [
          {
            weight: 2,
            narrative: '你把那条意见截图存进了专用文件夹，命名"二号经典收藏"，然后关掉投稿系统，打开新目标。改投IISC，两个月后论文过了，一号写道："本文思路清晰，实验充分。"\n\n你对着屏幕点了点头，感觉世界大体是公平的，只是有些会议活在另一个物理层上。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你换投了GRF。GRF的三号写道："本文方法有效，但缺乏对更广泛场景的泛化能力的讨论——在极端情况下，是否需要更强的推理能力？"\n\n你盯着这条意见看了很久，感觉ICOP那个二号换了个马甲，跟着你跑到了另一个会。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -8 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'actually_address',
        text: '好，那就解决AGI',
        energyCost: 40,
        outcomes: [
          {
            weight: 1,
            narrative: '你查阅了大量文献，认真梳理了AGI的定义与主流路径，写了一份附录，提出一个"轻量级通用性框架"，逻辑自洽，措辞严谨，塞进了申辩稿。\n\n二号回复："这部分内容超出了本次审稿的评估范围。"\n\n论文被拒。附录后来单独投了一篇论文，过了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 10 },
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
    title: '审稿人顺手发来了一份购物清单',
    description: [
      '三号审稿人写道："本文文献综述不够充分，严重忽视了该领域的重要工作。"随后附了一份参考文献清单。',
      '你逐条检索，发现清单上绝大多数论文来自同一位作者——姑且称他为X教授。你随手查了一下本次会议的主办机构，结果耐人寻味。',
      '也许只是巧合。',
    ],
    prompt: '三号附上的清单高度可疑，你决定',
    options: [
      {
        id: 'cite_all',
        text: '全引，来者不拒',
        outcomes: [
          {
            weight: 2,
            narrative: '你把清单全引了，措辞整进相关段落，格式整洁，上下文衔接尚可。论文过了。\n\n你和组里达成了一种默契，叫做"学术生存主义"：有用的引用读完，没用的放进去，不问对方是谁。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你把清单全引了，论文过了。但没过多久，有学者在学术论坛发了一篇分析，梳理了近期某批论文的引用来源，画了一张关系图，你的论文在图里出现了。\n\n你盯着那个节点看了很久，决定这件事什么都不知道。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -2 },
              { type: 'allStudents', stat: 'skills.social', delta: 2 },
            ],
          },
        ],
      },
      {
        id: 'cite_selectively',
        text: '只引相关的，腰杆硬',
        outcomes: [
          {
            weight: 2,
            narrative: '你仔细看完清单，找出真正与本文相关的几篇，整进综述，写了两句说明关联。三号在修改审中写道："作者文献引用仍不充分，但整体工作尚可接受。"\n\n论文勉强过了，像是被夹子夹着放进了接受列表。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'energy', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你只引了相关的几篇，在申辩里解释了选择标准。三号回复"这与我的建议明显不一致"，维持负面评价，论文以弱拒收场。\n\n组里有人低声问了一句"老师，他们是不是同一个人"，你没有回答，因为你不知道怎么回答。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -1 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'counter_rebuttal',
        text: '在申辩里把规律戳穿',
        outcomes: [
          {
            weight: 1,
            narrative: '你在申辩里礼貌但清楚地写道："我们注意到推荐文献中有相当比例来自同一位作者，在确认相关性之后，我们选择性引用了其中直接相关的部分，并在正文中做出说明。"\n\n大会程序主席三天后发来通知：论文进入重新评审流程，由新审稿人接手，最终接受。有同事问你怎么操作的，你无辜地说："就是正常写申辩。"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 6 },
              { type: 'allStudents', stat: 'happiness', delta: 10 },
            ],
          },
          {
            weight: 2,
            narrative: '你在申辩里委婉指出了文献分布的规律，措辞极为克制，没有直接点名。三号随即追加了两条新意见，都与文献引用无关，但都是负面的。程序主席回复："综合审稿意见，本文暂不接受。"\n\n你把这份申辩存档，想着总有一天能用上。大概率用不上。',
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
    title: '这篇稿，消失了',
    description: [
      '投稿系统显示：Under Review。你投进OWRC的稿已经保持这个状态好几个月，没有任何意见出现。',
      '你发了几封询问邮件，措辞依次从客气到更客气。无人回复。你去查了一下，OWRC的主会场已经两个月前开完了，论文集已上线，但你的稿子既不在接受列表里，也不在拒稿列表里。',
      '它就这么悬在系统里——既未被接受，也未被拒绝，像一封没人打算回复的信，困在投稿系统发明的最奇特的中间态：量子投稿。',
    ],
    prompt: '稿件像蒸发了一样，你决定',
    triggerConditions: [{ type: 'time', field: 'year', op: '>=', value: 2 }],
    options: [
      {
        id: 'final_inquiry',
        text: '发一封最后通牒',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封主题明确、措辞精准的邮件，抄送了会议主席。三天后，你收到了投稿系统的自动回复："您的咨询已收到，我们将尽快处理。"然后又是三周已读不回。\n\n之后来了一封人工邮件，说"经查，您的稿件在系统更新中丢失，建议重新提交"。你盯着这行字反复读，感到人类的文明在某个节点出了岔子。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了邮件。这一次程序主席回复了："非常抱歉，审稿人临时退出，您的论文被延误，我们现在重启流程，预计两周内有结果。"\n\n六周后，意见到了：条件接受。你把这段经历讲给同事听，对方问："那你这论文算在哪年发的？"你想了很久，没有答案。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'withdraw_resubmit',
        text: '撤稿，立刻重投',
        outcomes: [
          {
            weight: 2,
            narrative: '你点了撤稿。等确认期间，你把论文格式换成了新会议的模板，排版调整好，参考文献对齐，一切就绪。重投之后两个月拿到接受通知。\n\n原来那个会议的系统后来发来邮件："您的论文已撤回，感谢您的参与。"你没有回复。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你撤稿，重投到另一个会。新会的一号写道："这篇论文我好像在哪里见过类似的工作，建议作者说明与现有工作的区别。"\n\n你很想告诉他，那篇"类似的工作"就是你自己的论文，它在另一个系统里量子叠加了好几个月。但你没有，你写了申辩，耐心解释了区别。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'quantum_acceptance',
        text: '接受，量子叠加态也是一种存在',
        outcomes: [
          {
            weight: 1,
            narrative: '你决定不再追问了。论文就这样悬在系统里，既非接受，也非拒绝，处于一种只有投稿系统才能实现的哲学状态。\n\n你在简历某个角落用括号写了"（审稿中）"，然后打开了下一篇论文的草稿。有时候，最好的应对是继续往前走。',
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
      '这是第四个会议说出这句话。第一个是IISC，第二个是HMCS，第三个是OWRC，第四个的主题是"AI与现实世界"——范围宽泛得在召集书里写得清清楚楚。',
      '你把四份拒信并排放在屏幕上，逐字确认：每一份都有这个短语。这篇论文的"范围"，在这个世界的某处一定是正确的，你只是还没找到那个地方。',
    ],
    prompt: '第四次超出范围，你决定',
    triggerConditions: [{ type: 'time', field: 'year', op: '>=', value: 2 }],
    options: [
      {
        id: 'find_right_venue',
        text: '认真调研，找对口的会',
        outcomes: [
          {
            weight: 2,
            narrative: '你花了半天时间，把近几年的接受论文逐篇分类，找出了一个不起眼但风格相符的workshop。改了格式，投进去。\n\n两个月后接受，审稿人写道："这篇论文与本次研讨会的主题非常契合。"你把这句话截图，放进了专门存放"反转"的文件夹。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你认真调研，找出了几个可能合适的目标，投了最匹配的一个。审稿人写道："本文技术贡献尚可，但本会议更关注实证研究，建议考虑偏理论的会议。"\n\n你翻出第一封拒信——那个会议说"建议考虑更偏应用的场景"。你关掉了所有标签页，喝了杯水。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'pivot_framing',
        text: '技术不变，故事重写',
        outcomes: [
          {
            weight: 2,
            narrative: '你重写了引言和摘要，把"方法论贡献"改写为"实际系统影响"，调整了关键词，技术内容一字未动。\n\n投进另一个会，这次过了。审稿人写道："这项工作很好地契合了本会议的核心主题。"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'allStudents', stat: 'skills.social', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你改写了引言，精心调整了定位。投稿之后，审稿人写道："本文包装不够诚实，核心贡献定位模糊。"\n\n你意识到你把包装改得太过明显，让人一眼看出在包装。下次要更自然一点。',
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
            narrative: '你把论文挂到了arxiv，写了一段简洁的说明，附上完整实验数据。没多久，有人转发了链接，评论是"这篇没发表的工作比好几篇正式论文都扎实"。\n\n你没有转发，但把那条评论收藏了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'lab', stat: 'energy', delta: 5 },
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
      '审稿意见到了，二号的第三条写道："作者在处理长尾数据分布时的采样策略存在偏差，这在内部的对比实验中也有所体现——但这个问题在公开版本的方案里尚未被讨论过。"',
      '你重新读了一遍。那组内部对比实验从未对外公开，采样策略的细节应该只有组里的人知道。',
      '二号了解一些他不该了解的东西。',
    ],
    prompt: '审稿人二号知道的比他应该知道的多，你决定',
    options: [
      {
        id: 'report_to_ac',
        text: '举报，找程序主席',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一封正式邮件给大会程序主席，列出了具体细节，说明审稿人可能接触过非公开信息，请求调查利益冲突。主席回复说会核查，论文送交新的审稿人，最终条件接受。\n\n没有人告诉你调查结果是什么，也没有人解释那些细节是怎么出现在意见里的。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 4 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
          {
            weight: 1,
            narrative: '你向程序主席报告了。主席回复说"将认真对待您的反馈"，然后两周没有消息，之后来了一封审稿结论邮件，维持原有审稿人意见，结论是拒稿。\n\n你搞不清楚那封举报邮件有没有被人看过。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: -5 },
            ],
          },
        ],
      },
      {
        id: 'use_strategically',
        text: '心知肚明，正面接招',
        outcomes: [
          {
            weight: 2,
            narrative: '你在申辩里对那个具体问题进行了详尽的补充实验，写得非常有针对性，仿佛你早就知道这会是核心争议——因为你确实知道。二号在修改审里说"作者已充分回应"，给了弱接受。\n\n你没有对外提过这件事，它成了一段只存在于你记忆里的经历。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.engineering', delta: 3 },
            ],
          },
          {
            weight: 1,
            narrative: '你写了一份异常精准的申辩，直接回应了那组内部实验的问题。二号回复："作者的回应令人生疑，精准度超出正常范围。"\n\n论文被拒，理由是"存在某些程序性疑虑"。没有人解释这意味着什么。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: -4 },
              { type: 'lab', stat: 'energy', delta: -15 },
            ],
          },
        ],
      },
      {
        id: 'pretend_not_to_notice',
        text: '装没看见，正常交申辩',
        outcomes: [
          {
            weight: 1,
            narrative: '你写了一份正常的申辩，没有提那些细节，按常规逐条回应了审稿意见。论文过了，二号的那条意见被归入"已解决"。\n\n你把原始截图存进了一个文件夹，文件夹名叫"备用"——这是第一个文件，不知道下面还会不会有东西放进来。',
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
    title: '摘要字号多了一号',
    description: [
      'HMCS发来初审拒稿——连正式审稿都没有进入，直接在格式阶段被挡回来了。理由："根据本会议投稿要求，摘要应使用10pt字体，作者提交版本使用了11pt字体，不符合格式规定，不予送审。"',
      '摘要一共四行，字号差了一号。',
      '你顺手翻了一下HMCS的格式要求文档，发现规定林林总总：摘要必须10pt，伦理声明不得少于两百字，伦理声明模板不可修改。最后你合上文档，感到一种肃穆的敬畏。',
    ],
    prompt: '因为摘要字号多了一号被初审拒掉，你决定',
    options: [
      {
        id: 'fix_and_resubmit',
        text: '改字号，三秒重投',
        outcomes: [
          {
            weight: 2,
            narrative: '你把摘要字号改为10pt，导出PDF，确认格式无误，重新提交。这次进入了正常审稿流程，两个月后条件接受，没有一条意见涉及格式。\n\n你偶尔想起那次修改，觉得那是你整个科研生涯性价比最高的三分钟。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你改了字号重投。确认页面提示："请注意，重复提交可能被视为同一论文的第二次投稿，请确认符合会议规定。"\n\n你查遍官网，没有找到"同一论文重投"的相关规定。鼓起勇气提交了，好在论文进入了正常流程。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'write_response',
        text: '写申诉，批判形式主义',
        energyCost: 20,
        outcomes: [
          {
            weight: 1,
            narrative: '你写了两页申诉，从学术评审的意义讲起，引用了几篇关于同行评审制度本身的研究，委婉指出字号差一号对审稿质量的影响可能接近于零。\n\n程序委员会主席回复："感谢您的意见，我们会将此纳入下届会议的规则讨论。本届不作例外处理。"',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
        ],
      },
      {
        id: 'take_the_day_off',
        text: '今天不了，明天再说',
        outcomes: [
          {
            weight: 1,
            narrative: '你关掉了投稿系统，打开了一部纪录片，看了好一阵，然后去散了个步。第二天，你改完了格式，没有任何心理负担地重新提交。\n\n论文最终通过，审稿意见里有一条表扬是：摘要写得简洁。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 15 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
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
      '审稿意见里，二号写道："本文的核心贡献已被另一项近期工作覆盖，建议拒稿并请作者参阅。"随后附上了引用。',
      '你去查了那篇引用。它是昨天下午三点整才上传到arxiv的。而这是你半年前投进GRF的稿子，GRF的审稿周期出了名的漫长。',
      '你盯着时间戳看了好一会儿，开始思考人类对"优先权"这个概念的理解是否存在某种根本性的哲学错误。',
    ],
    prompt: '被一篇昨天才上传的论文判定为"已被超越"，你决定',
    options: [
      {
        id: 'argue_chronology',
        text: '摆时间线，这不科学',
        outcomes: [
          {
            weight: 2,
            narrative: '你在申辩里附上了投稿系统的时间戳截图，把两篇论文的提交时间并排呈现，用一句话指出："本文提交时间早于引用工作上传时间整整半年，在时间顺序上，本文工作应当具有独立性和优先性。"\n\n大会程序主席大概觉得这个逻辑无从反驳，换了一位审稿人，论文过了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
          },
          {
            weight: 1,
            narrative: '你提交了清晰的时间线证明。二号回复："尽管如此，鉴于该工作已公开，本文需要更明确地说明差异化贡献。"你更新了相关章节，把差异写清楚，花了两周。\n\n论文最终接受，新增的那段把论文变得更完整了——代价只是你脑子里那段无声的抗议。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'add_citation_carry_on',
        text: '加引用，和气地划清界限',
        outcomes: [
          {
            weight: 2,
            narrative: '你加上了那篇引用，写了半页说明两篇论文的具体差异——你发现差异比你想象的大，这让你好受了一些。论文通过了。\n\n你在最终版的致谢里保留了原来的写作时间记录，算是一种没人会注意到的自我声明。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'lab', stat: 'energy', delta: -1 },
            ],
          },
          {
            weight: 1,
            narrative: '你加了引用，写了差异说明，重新提交。一号说"本文与引用工作差异化贡献仍不够清晰"。你把两篇论文重新对比读了一遍，差异其实相当明显，只是被你写得太学术，让人看不出来。\n\n你改写了引言，换了组词，审稿终于通过了。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -15 },
              { type: 'allStudents', stat: 'skills.social', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'review_their_paper',
        text: '先查他投到了哪',
        outcomes: [
          {
            weight: 1,
            narrative: '你发现那篇论文投到了另一个你也在评审名单上的会议。你没有主动索取，但当系统把它分配到你的审稿列表时，你按下了接受键，写了一份认真、客观、相当严格的意见，每一条都有文献支撑，逻辑无懈可击。\n\n不出意料，你的论文同时被接受了。你感觉某种平衡在宇宙层面被恢复了。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

  desk_reject_48h: {
    id: 'desk_reject_48h',
    title: '周三早上，同一封邮件',
    description: [
      '周一往ICOP投了一篇稿。周三早上，收到一封标题为"ICOP投稿相关事宜"的邮件，你点开来。',
      '第一段是拒稿："经过编辑初审，您的投稿与本次会议的发表范围不够契合，无法进入同行评审流程，特此通知。"',
      '第二段是邀请函："我们诚挚邀请您担任本次会议程序委员会委员，协助评审投稿论文。您深厚的研究积累将为本届会议的审稿工作带来重要价值。"两段文字，同一封邮件。',
    ],
    prompt: '你把邮件读完，决定',
    options: [
      {
        id: 'email_clarification',
        text: '发邮件，讨个说法',
        outcomes: [
          {
            weight: 1,
            narrative: '你发了邮件，礼貌地请求了解论文在哪个维度上不符合要求，以便改进。收到了一封模板回复："由于审稿量较大，编辑组无法为每一份初审结果提供详细说明。"\n\n你把这封邮件存进了那个叫"学术界运作机制"的文件夹，子文件夹数量这个月又多了一个。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -5 },
              { type: 'allStudents', stat: 'happiness', delta: -3 },
            ],
          },
          {
            weight: 1,
            narrative: '你发了邮件。编辑回复说："您的论文与我们目前的重点方向存在一定距离，具体体现在……"随后列了两条真实的反馈。你读完，发现其中一条是误解，另一条是合理意见。\n\n你修改了论文，下次投稿前专门对照了那条反馈，最终通过了。那封邮件意外地成了整个过程里最有用的东西。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 5 },
              { type: 'allStudents', stat: 'skills.theory', delta: 3 },
              { type: 'allStudents', stat: 'projectProgress', delta: 5 },
            ],
          },
        ],
      },
      {
        id: 'pivot_next_venue',
        text: '不能破防，换个会投',
        outcomes: [
          {
            weight: 2,
            narrative: '你打开了一直维护的备选会议列表，每个旁边标着截止日期、录用率、适合的论文类型。锁定下一个目标，改格式，三天内重新投出去。\n\n两个月后拿到接受通知。效率有时候是一种防御机制。',
            effects: [
              { type: 'lab', stat: 'reputation', delta: 3 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
              { type: 'allStudents', stat: 'projectProgress', delta: 8 },
            ],
          },
          {
            weight: 1,
            narrative: '你立刻打开备选列表，选了第二名，当晚改好格式准备提交，发现这个会议的截止日期是昨天。\n\n只能把标签页关掉，打开第三名，反复确认日期，第二天重新提交。',
            effects: [
              { type: 'lab', stat: 'energy', delta: -10 },
              { type: 'allStudents', stat: 'happiness', delta: 3 },
            ],
          },
        ],
      },
      {
        id: 'post_arxiv',
        text: '留在arXiv不管它',
        outcomes: [
          {
            weight: 1,
            narrative: '你把稿子传到arXiv，五分钟后论文号到账。然后往下翻这封邮件，看到了程序委员会那段邀请，想了一下，回复了"接受"——既然来了，就评。\n\n三个月后你审了七篇投到ICOP的稿，其中一篇和你这个被拦在门口的稿子研究方向几乎一模一样，你给了条件接受。',
            effects: [
              { type: 'lab', stat: 'energy', delta: 8 },
              { type: 'lab', stat: 'reputation', delta: 2 },
              { type: 'allStudents', stat: 'happiness', delta: 5 },
            ],
          },
        ],
      },
    ],
    tags: ['daily'],
  },

};
