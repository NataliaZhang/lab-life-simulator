import type { GameEvent } from '../../../types';

export const linXiaojuanEvents: Record<string, GameEvent> = {

  lxj_first_meeting: {
    id: 'lxj_first_meeting',
    title: '林小卷：迟到的大明星驾到',
    description: [
      '第一次见面定在了下午三点，林小卷迟到了整整十五分钟。你坐在办公室里，刚开始考虑发消息催人，门轰然打开了——他手里端着一杯珍珠奶茶，吸管含在嘴里，表情如沐春风，完全活在另一个时区。',
      '他把奶茶放在你桌对面，拉开椅子，以一种叫人无从发火的镇定坐了下来，然后用聊天气的语气开口："老师好，我是林小卷，新来的，以后多关照。" 停顿了一下，把奶茶往前推了推："这家真不错，要不要来一口？"',
      '你端着自己的咖啡杯，看着他毫无破绽的笑容，思考起一个终极问题：这小子，到底有没有社恐这种东西？',
    ],
    prompt: '对于林小卷这个新人，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', op: '<', value: 5 },
      { type: 'time', field: 'year', op: '==', value: 1 },
    ],
    options: [
      {
        id: 'lxj_first_meeting_strict',
        text: '当场宣布：迟到文化，到此为止',
        outcomes: [{
          weight: 1,
          narrative: '你清了清嗓子，正式点名迟到问题。林小卷立刻收起笑容，点头点得极其诚恳，"老师说得对，下次一定"，像背课文一样流畅。组会散场后，他跑来问你组里有没有推荐的奶茶店，你盯着他认真掏手机备注的背影，意识到他那几句话可能全程只走到了耳朵边缘。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: -5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: -5 },
            { type: 'lab', stat: 'energy', delta: -3 },
          ],
        }],
      },
      {
        id: 'lxj_first_meeting_easy',
        text: '随他去，出活比签到重要',
        outcomes: [{
          weight: 1,
          narrative: '你挥挥手，示意他坐好接着开会。林小卷立刻把奶茶往旁边一推，翻开一本笔记本，你瞥了一眼，封面密密麻麻写满了想法，字迹凌乱但数量惊人，每一行都像是某个凌晨二点的突发奇想。看来他不是没在思考，只是思考发生的时间一直不太对。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 7 },
            { type: 'lab', stat: 'energy', delta: 3 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.social', delta: 2 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_progress_check: {
    id: 'lxj_progress_check',
    title: '林小卷："快了快了"之量子态进度',
    description: [
      '你已经是第三次问林小卷进度了。每一次，他都用同一个语气、同一张平静的脸回答："快了快了，就差最后一步。" 那"最后一步"听起来触手可及，却像地平线一样，永远比你以为的再远一点。',
      '这句话他已经说了整整两个月。你悄悄打开日历，做了个不太乐观的数学题，然后合上日历，选择眼不见心不烦。与此同时，他的"最后一步"依然在量子叠加态中悠然存在，既完成又未完成，直到有人去观测它。',
    ],
    prompt: '面对林小卷的薛定谔进度，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '==', value: 1 },
      { type: 'time', field: 'month', op: '>=', value: 3 },
    ],
    options: [
      {
        id: 'lxj_progress_check_push',
        text: '放大招：日更进度汇报，精确到小时',
        outcomes: [{
          weight: 1,
          narrative: '你要求他当场列出详细时间表。林小卷拿出笔，在纸上写了三行，对着天花板沉思了一会儿，又加了两行，然后把纸推过来，时间节点精确到小时，子任务拆得事无巨细。你盯着那张纸愣了一秒：这份计划根本不是现写的，他早就有，只是没打算主动拿出来。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: -5 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
      {
        id: 'lxj_progress_check_wait',
        text: '躺平，静待奇迹',
        outcomes: [{
          weight: 1,
          narrative: '你叹了口气，决定再观察一段时间。林小卷察觉到追问停止，立刻松了口气，翻开笔记本刷刷写起来，你凑近一看，记的是一个和项目毫无关系的新想法。不过仔细一瞧，这个新想法和项目有大约百分之三十的交集。也许这就叫螺旋式靠近。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 3 },
            { type: 'lab', stat: 'energy', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_ddl_miracle: {
    id: 'lxj_ddl_miracle',
    title: '林小卷：DDL前十分钟，传说降临',
    description: [
      '截止日期前48小时，林小卷蒸发了。微信已读不回，邮件已读不复，实验室工位空着像个标本，连他最常去的奶茶店老板都说两天没见到人。你一度开始思考要不要报警。',
      '提交截止前整整十分钟，手机震动——是一个压缩包链接，后面跟着一行字："老师，发过去了，麻烦帮我看看格式对不对。" 你颤着手打开文件：代码完整，注释清晰，实验结果比预期还要漂亮，文档甚至配了图表，参考文献格式一条不差。',
      '他在哪里完成了这些、消耗了多少咖啡因、睡没睡觉，这些问题你打算以后再问。现在你只需要深呼吸一口气，然后把文件提交上去。',
    ],
    prompt: '林小卷又一次在悬崖边展翅翱翔，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', op: '>=', value: 20 },
      { type: 'time', field: 'year', op: '>=', value: 1 },
    ],
    options: [
      {
        id: 'lxj_ddl_miracle_admire',
        text: '封神！给他颁发DDL战神勋章',
        outcomes: [{
          weight: 1,
          narrative: '你发消息："这次完成得相当好。" 过了一会儿收到回复：一个大拇指表情，然后是"谢谢老师，我去睡了"。接下来两天他彻底消失，据室友说一觉睡了好久，打破了实验室纪录，那个纪录之前也是他自己创下的。传奇打破传奇，闭环完美。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 3 },
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.engineering', delta: 2 },
          ],
        }],
      },
      {
        id: 'lxj_ddl_miracle_criticize',
        text: '今天必须谈谈人生',
        outcomes: [{
          weight: 1,
          narrative: '你约他谈话，认真讲了一刻钟关于科研节奏与可持续发展的道理。林小卷全程点头，表情诚恳到令人心疼。谈话结束，他说"老师说得很对，我认真反思"，然后问你下一个截止日期是什么时候，拿出手机备注好，表情已经在规划下一次冲刺了。你看着他走出门，意识到这堵墙可能真的不是你能推倒的。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: -5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: -5 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_midnight_message: {
    id: 'lxj_midnight_message',
    title: '林小卷：凌晨两点的天才发言',
    description: [
      '凌晨两点，手机屏幕亮了。林小卷。你以为出了什么紧急状况，点开一看：一条长达八百字的消息在屏幕上炸开，像一颗话痨手雷。那不是求救——是感悟。',
      '他用一种混乱得近乎艺术的逻辑，描述了对某个研究问题的突发顿悟，中途出现三处"等等我重说一遍"，最后附了一张手绘草图的照片，图里有箭头、圆圈、一个画歪的三角形，旁边潦草写着"大概是这个意思"。',
      '逻辑虽然像一团炒过的线，但你读完发现里面藏着两三个真正有价值的亮点，思路放在白天完全能站住脚。如果整理清楚，说不定能做点什么。',
    ],
    prompt: '林小卷的凌晨灵感弹窗轰炸，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', op: '>=', value: 50 },
    ],
    options: [
      {
        id: 'lxj_midnight_message_respond',
        text: '当场召开凌晨紧急研讨会',
        outcomes: [{
          weight: 1,
          narrative: '你放下手机，打开电脑，把他那团思绪仔细梳理了一遍，发现核心概念是真的有价值的。你们来回消息到天快亮，把那团混沌一点点捋成了一根看得见方向的线。第二天林小卷顶着两个硬币大的黑眼圈出现，说"老师你也没睡？" 你们对视了一眼，同时伸手按下了咖啡机。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 7 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 3 },
            { type: 'lab', stat: 'energy', delta: -8 },
          ],
        }],
      },
      {
        id: 'lxj_midnight_message_later',
        text: '已读，明天再说，先去睡',
        outcomes: [{
          weight: 1,
          narrative: '你回了消息："明天聊。" 第二天林小卷如约而至，把那个想法又讲了一遍，白天版本逻辑清晰了不止一倍，明显是睡醒之后自己又整理了一轮。有些想法就像发酵面团，需要在黑暗里静置一夜才能膨胀成可以烤的形状。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 3 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 3 },
            { type: 'lab', stat: 'energy', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_conference_abstract: {
    id: 'lxj_conference_abstract',
    title: '林小卷：五点截止，四点五十八分交卷',
    description: [
      '会议摘要截止今天下午五点。早上十一点，林小卷还在组会上认真讨论别人的实验方案，对截止时间毫无感知，仿佛生活在夏令时比全世界慢三小时的独立时区。',
      '下午四点半，他轻描淡写地说"老师我去写摘要了"，然后消失。你刷了几次邮件，寂静如深夜。心里默默盘算起紧急联系方案。',
      '四点五十八分，摘要准时弹进收件箱。你打开一读：语言简洁有力，核心问题一针见血，亮点段落甚至带着一点文学质感，像是有人打磨了整整一周。审稿人回评："表达清晰，立意新颖。" 就这么半小时不到写出来的东西。',
    ],
    prompt: '林小卷又完成了一次教科书级DDL冲刺，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
    ],
    options: [
      {
        id: 'lxj_abstract_praise',
        text: '真香，必须夸！',
        outcomes: [{
          weight: 1,
          narrative: '你发消息："写得很好，审稿人评价也高。" 林小卷回了一个正在喝奶茶的猫咪表情包，紧接着："谢谢老师，我也觉得还不错。" 这种不加掩饰的自信让你一时语塞——但摘要确实写得好，你不得不在心里承认，这个人和"谦虚"之间大概隔着整个银河系。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 7 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 7 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.social', delta: 3 },
            { type: 'lab', stat: 'reputation', delta: 3 },
          ],
        }],
      },
      {
        id: 'lxj_abstract_warn',
        text: '结果好不等于方法对，必须讲清楚',
        outcomes: [{
          weight: 1,
          narrative: '你认真告诉他，这次只是运气好，下次万一翻车怎么办。林小卷听完，想了想，说："那我下次提前半小时开始。" 你深吸一口气，慢慢呼出来，决定换个角度看人生。至少摘要是真的写得好，而这个事实已经无法被任何方法论所撤销。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: -3 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: -5 },
            { type: 'lab', stat: 'energy', delta: -3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_fake_progress: {
    id: 'lxj_fake_progress',
    title: '林小卷：进度汇报，注水两成半',
    description: [
      '林小卷在月度汇报里宣布项目进度已达百分之七十，语气自信满满，PPT做得图文并茂，配色甚至挺好看。你听着听着，发现几个关键实验只展示了结果截图，方法细节全程蒸发。',
      '会后你打开他的代码仓库，最近一次提交停在三周前。实验脚本里有三个函数体清一色写着 `pass`，一条名为 `TODO_FIXME_URGENT` 的注释已经存活了整整两个月，风吹不动，雨打不散。',
      '你低头看了一眼刚签收的进度单：百分之七十。再看代码：更接近百分之四十。两个数字之间，隔着一个林小卷的乐观估计。',
    ],
    prompt: '发现进度掺了水，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', op: '>=', value: 30 },
    ],
    options: [
      {
        id: 'lxj_fake_progress_ignore',
        text: '无声暗示：把代码仓库链接甩过去',
        outcomes: [{
          weight: 1,
          narrative: '你什么都没说，只把代码仓库链接发给他，备注"有空看看"。林小卷沉默了一会儿，然后仓库出现了一次新提交：填上了两个 `pass`，把 `TODO_FIXME_URGENT` 悄悄改成了 `TODO_IN_PROGRESS`。进步微小，但至少是真实发生过的。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 3 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 3 },
            { type: 'lab', stat: 'energy', delta: -3 },
          ],
        }],
      },
      {
        id: 'lxj_fake_progress_confront',
        text: '开门见山：这三个pass是什么意思',
        outcomes: [{
          weight: 1,
          narrative: '你把代码截图发过去，问"这三个 pass 怎么回事"。沉默了好一会儿，林小卷发来消息："老师，实际上……大概四十五？" 后面跟了一个苦笑表情，然后："我这周搞定两个，你给我一周。" 一周后，仓库出现了两次提交，进度单数字更新，这次是真实的。人在被戳穿之后往往比正常状态跑得更快。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: -8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: -8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 8 },
            { type: 'lab', stat: 'energy', delta: -5 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_lost_in_lab: {
    id: 'lxj_lost_in_lab',
    title: '林小卷：深夜，一个人，一杯凉咖啡',
    description: [
      '你深夜回实验室取文件，以为早没人了，推门一看——林小卷坐在工位上。不是在敲代码，不是在看文献，是对着一个半写的函数发呆，光标孤零零地闪着，像在等什么命令。',
      '他听到动静转过头，看了你一秒，用碰见熟人打招呼的语气说："老师你也还在啊。" 没有尴尬，没有慌张，只有一点还没收回来的出神。',
      '桌上的咖啡已经凉了。旁边有一张白纸，写着几行字，被他的手臂压住了一半。你没有多问，但你注意到了。',
    ],
    prompt: '深夜，你撞见了发呆的林小卷，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 2 },
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', op: '<=', value: 50 },
    ],
    options: [
      {
        id: 'lxj_lost_chat',
        text: '拉把椅子坐下，随便聊聊',
        outcomes: [{
          weight: 1,
          narrative: '你拉了把椅子，什么都没问，只是说"最近怎么样"。林小卷沉默了一下，然后开口，说了好一会儿，从项目卡死的地方说到对自己的怀疑，再说到一个他从来没跟人讲过的想法。说完他缓了口气，把那张白纸翻过来推给你——上面写着：我到底适不适合做科研。你们又聊了好一阵。你离开的时候，那杯凉咖啡已经不见了，换成了一杯热的。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 8 },
            { type: 'lab', stat: 'energy', delta: -5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
      {
        id: 'lxj_lost_rest',
        text: '今天先回去睡，明天见',
        outcomes: [{
          weight: 1,
          narrative: '你告诉他今天先回去，明天再说。林小卷点了点头，把那张白纸叠起来塞进口袋，开始收书包。出门前他停了一下，回头说："老师，谢谢。" 没有解释谢什么。有时候不需要解释，时机对了，一句就够了。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 8 },
            { type: 'lab', stat: 'energy', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_sudden_expert: {
    id: 'lxj_sudden_expert',
    title: '林小卷：等等，这里有个大漏洞',
    description: [
      '林小卷敲门进来，说"老师，我发现了一个问题"，语气比平时高出整整一个八度。你示意他坐——他没坐。他走到白板前，拿起笔，开始写。',
      '他指出了组里一直在用的理论框架里的一个裂缝：在某个边界条件下，核心假设会悄悄失效，而所有现有实验恰好全部绕开了那个边界，所以没有一个人发现过。他讲了好一阵，逻辑环环相扣，你中途插了两个问题，他都答上来了，没有丝毫停顿。',
      '你意识到他是对的。这个漏洞可能牵连领域内好几篇论文的核心结论，也可能是一个全新方向的入口。白板上那些字，安静地待在那里，等你做决定。',
    ],
    prompt: '林小卷炸出了一个理论漏洞，你选择：',
    triggerConditions: [
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', op: '>=', value: 65 },
    ],
    options: [
      {
        id: 'lxj_expert_publish',
        text: '直接冲！今天就开始写论文',
        outcomes: [{
          weight: 1,
          narrative: '你们当天就开始整理，把那个漏洞做成了一篇分析文章。林小卷第一次作为思路核心参与写作，落笔停不下来，连自己都没料到能写得这么顺。文章投出后，审稿人回评里有一句话他截图保存了，发给你看："这个观察非常敏锐。" 截图附带了一条消息："老师看。"',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 10 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 12 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 6 },
            { type: 'lab', stat: 'reputation', delta: 5 },
          ],
        }],
      },
      {
        id: 'lxj_expert_verify',
        text: '先构造反例，把漏洞钉死再说',
        outcomes: [{
          weight: 1,
          narrative: '你叫他先跑一套专门设计的测试案例，把边界失效的情况坐实。林小卷花了几天构造了一批反例，漏洞不仅被确认，还比他最初描述的更普遍，覆盖了更多情形。这让文章从"发现问题"升级成"证明问题并给出修复方向"，分量重了不止一个量级。他兴奋地说"老师这比我想的还大"，白板上的字又多了一圈。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 5 },
            { type: 'lab', stat: 'reputation', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  lxj_graduation_panic: {
    id: 'lxj_graduation_panic',
    title: '林小卷：毕业论文？我有计划的',
    description: [
      '距离毕业论文提交整整一个月，你约林小卷谈话，开门见山问他论文写到哪里了。他回答："刚开始。" 你眨了眨眼，确认自己没听错。',
      '他接着说："不过老师，我有计划。" 手机屏幕转过来：一张备忘录截图，标题《毕业论文一个月冲刺计划》，分四个阶段，每个阶段有子任务，有颜色标注，连"收集打印装订材料"都列进去了，看起来严密得像军事行动。',
      '你注意到备忘录的创建时间，就在今天下午，距离现在还不到一小时。他一听说你要约谈，立刻跑去写了这份计划。',
    ],
    prompt: '林小卷距毕业论文只剩一个月，计划刚刚临时抱佛脚创建，你选择：',
    triggerConditions: [
      { type: 'time', field: 'year', op: '>=', value: 3 },
      { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', op: '>=', value: 80 },
    ],
    options: [
      {
        id: 'lxj_grad_trust',
        text: '赌一把，按计划执行',
        outcomes: [{
          weight: 1,
          narrative: '你拍拍他的肩膀："好，按计划来，每周给我看一次进展。" 接下来一个月，他每周准时出现，带来的章节每次都比你预期多，质量也过得去。最后几天连续熬夜，但论文准时提交，还比格式要求多了好多页。答辩委员会说"内容扎实"，林小卷回来转告你，表情高度克制，但脚在地板上悄悄踩了一个小舞步，以为你没看见。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: 12 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: 10 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 10 },
            { type: 'lab', stat: 'energy', delta: -5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
      {
        id: 'lxj_grad_intervene',
        text: '不行，必须每天汇报进度',
        outcomes: [{
          weight: 1,
          narrative: '你要求他每天下午五点发一份当日进展，字数不少于三百字。前三天他发了规规矩矩的文字报告，第四天发来一段语音，第五天发来一张白板照片。内容是真实的，格式是自由发挥的。高压之下他确实写得更快，只是到最后，汇报形式变成了每天主动来敲你的门，比发报告麻烦，但效率出奇地高。',
          effects: [
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'favor', delta: -5 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'happiness', delta: -8 },
            { type: 'student', studentId: 'lin_xiaojuan', stat: 'projectProgress', delta: 8 },
            { type: 'lab', stat: 'energy', delta: -8 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

  // 🎓 毕业后回访 — 建议引擎在graduation后约6个月注入
  lxj_alumni_visit: {
    id: 'lxj_alumni_visit',
    title: '林小卷：毕业后来信',
    triggerConditions: [{ type: 'studentStatus', studentId: 'lin_xiaojuan', status: 'graduated' }],
    description: [
      '你的收件箱里出现了一个熟悉的名字：林小卷。邮件标题是"老师好，顺便汇报一下近况"。你点开，发现"顺便"后面跟着将近两千字。',
      '他说他进了某大厂，入职前就凭一个项目冲刺拿到了超预期绩效，组里DDL文化让他如鱼得水，他写道"第一次觉得工作节奏是为自己量身定制的"。升职比同批入职的快了整整半年。信的中间，他提到当年毕业答辩前最后那段日子，"其实挺感谢老师没放弃我的"——只有这一句，没有展开，没有煽情，一句话转了个弯，继续聊项目。',
      '邮件最后，他问你有没有兴趣合作一个行业项目，预算到位，方向也契合。他附上了初步方案的文档链接。文档创建时间：昨晚接近午夜，也就是今天发这封邮件之前几分钟写完的。有些人，真的永远不会变。',
    ],
    prompt: '林小卷毕业之后带来了合作机会，你选择：',
    options: [
      {
        id: 'lxj_alumni_collaborate',
        text: '接，老学生来了得支持',
        outcomes: [{
          weight: 1,
          narrative: '你回复说可以，问他什么时候方便细聊。没多久他回来了，附上视频会议链接，时间定在明天早上九点，你高度怀疑那个链接在邮件发出之前就已经创建好了。合作正式启动，实验室拿到一笔行业资金。你看着他名字出现在合作协议上，想起那个端着奶茶迟到进组会的新人，觉得时间这件事有时候挺有意思的。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 8 },
            { type: 'lab', stat: 'funding', delta: 12 },
          ],
        }],
      },
      {
        id: 'lxj_alumni_decline',
        text: '婉拒，近期排不开',
        outcomes: [{
          weight: 1,
          narrative: '你礼貌地说组里最近任务比较满，暂时接不了新合作。林小卷回复"好的老师，有机会再说"，然后附了一句："组里最近在忙什么方向，我顺便帮你留意一下人。" 你盯着这条消息看了一会儿，他毕业不到一年，已经在给你介绍人了。你把邮件存进"日后跟进"文件夹，想着那个总说"快了快了"的学生，现在确实快了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['student_specific'],
  },

};
