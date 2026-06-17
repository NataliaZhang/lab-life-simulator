/**
 * 半好感特殊故事 — 当某学生好感度首次达到50时触发的专属叙事事件
 *
 * 触发方式：由 monthlyUpdate.ts 直接注入，携带 studentId，
 * 所以描述/选项/结果中的 {studentName} 可安全使用。
 * 不含 triggerConditions；不出现在 monthlyEventPool。
 *
 * 设计定位：好感度50是关系刚刚打开的节点，不是里程碑。
 * 场景更日常随机，更多是你偶然撞见或注意到了什么，
 * 而不是学生主动策划的活动。突出各角色的萌点，轻松温馨。
 * 奖励略逊于满好感事件。
 */

import type { GameEvent } from '../../types';

export const halfFavorEvents: Record<string, GameEvent> = {

  // ── 林小卷 ────────────────────────────────────────────────────────────────
  half_favor_lin_xiaojuan: {
    id: 'half_favor_lin_xiaojuan',
    title: '{studentName}在骂他的代码',
    description: [
      '那天下午你回实验室取东西，走廊里隐约传来一阵压低的自言自语。你以为是有人打电话，走近了才发现是{studentName}对着屏幕在说话。',
      '「你他妈的为什么又是NaN。」他眉头皱着，语气介于恳求和指控之间，「你上午还好好的，你背叛我了吗。」停了一下，继续：「你把梯度藏哪里了？你说！」',
      '他完全没注意到你站在门口。你看了一会儿，发现他不只是在骂——他骂完之后会停下来认真看报错信息，骂完再看，骂完再看，像是把情绪发泄和debug同步进行，效率奇高。',
    ],
    prompt: '你要不要出声？',
    options: [
      {
        id: 'half_favor_lxj_cough',
        text: '轻咳一声，假装刚到',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}回头，瞬间切换成正常人脸。「哦老师你回来了。」语气非常正经，仿佛刚才什么都没发生。你也假装什么都没看见，各干各的。但他转回去的时候，你听见他压低声音对屏幕说了一句：「待会再跟你算账。」',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
          ],
        }],
      },
      {
        id: 'half_favor_lxj_ask',
        text: '直接问：你跟它谈崩了吗？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}转过来，对视一秒，然后认命地点了点头，「谈不拢，它不讲理。」他把椅子推开，「老师你来评理——我就改了一行代码，梯度从正常变成无穷大，这是我的问题吗？」你说大概不是你的问题。他郑重地转向屏幕：「听见了吧，不是我的问题，是你的。」',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 顾眠眠 ────────────────────────────────────────────────────────────────
  half_favor_gu_mianmian: {
    id: 'half_favor_gu_mianmian',
    title: '{studentName}睡前说了一句话',
    description: [
      '那天组会，一个问题讨论了将近二十分钟，转圈转不出去。你已经准备搁置，等下周再看。',
      '{studentName}靠在椅背上，眼皮一直是半闭状态，看起来基本上已经在梦里了。',
      '就在你想说「先到这里」的时候，她忽然开口，闭着眼睛，声音不大：「用滑动窗口处理不就好了。」',
      '全场安静了一下。你顺着想了想，确实是。大家刚想说什么，转头看——她已经真的睡着了，头轻轻靠在手背上。',
    ],
    prompt: '{studentName}睡着了，这个思路恰好能用，你：',
    options: [
      {
        id: 'half_favor_gmm_whiteboard',
        text: '在白板上写下这个方案，标注是她说的',
        outcomes: [{
          weight: 1,
          narrative: '组会结束，{studentName}慢慢睁开眼，看见白板上清清楚楚写着她的方案，旁边还有个圆圈标注：「顾眠眠，今日最佳发言」。她眼睛弯了一下，说：「能用就好。」拿起饮料，喝了一口，继续发呆。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 1 },
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
          ],
        }],
      },
      {
        id: 'half_favor_gmm_continue',
        text: '先推进，等她睡醒再告诉她',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}醒来时，你们已经往后走了两个问题。你告诉她那个思路确实有效，她「嗯」了一声，想了想，说：「我梦里好像也想到了，但我忘了我梦里想到的版本了。」你没有追问，但总觉得她的梦可能比清醒状态更有生产力。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 叶知秋 ────────────────────────────────────────────────────────────────
  half_favor_ye_zhiqiu: {
    id: 'half_favor_ye_zhiqiu',
    title: '{studentName}在纠正菜单',
    description: [
      '下午茶歇，你们坐在楼道边的小桌子，{studentName}拿着外卖菜单在点餐。',
      '她看了大概三分钟，然后把菜单放下，表情有点不对劲。「这份菜单，」她说，「对"招牌"这个词的使用有问题。这里标了四道招牌菜，但一家店不可能同时有四道招牌，这在逻辑上是矛盾的。」',
      '你说这只是宣传语，她点了点头，「我知道，」停了一下，「但如果你有四道招牌，就意味着你没有招牌。」',
      '你们还是点了餐。{studentName}把菜单翻了个面，继续说：「另外，这份菜单的排版违反了费茨定律，常点菜品应该放在视觉中心。」她说这话的语气，和汇报实验结果一模一样。',
    ],
    prompt: '{studentName}这种精确性让人头疼，但你：',
    options: [
      {
        id: 'half_favor_yzq_ask',
        text: '那你说应该怎么排？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}立刻拿回菜单，开始重新规划布局，说了很久，逻辑严密没有废话，最后给出「用户体验最优解」。你发现她在这件事上消耗的精力，可能比点餐本身多二十倍。但她讲完之后，表情是满足的。饭点到了，她看了一眼手机，「我们应该先点餐了。」',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
      {
        id: 'half_favor_yzq_tease',
        text: '这样下去饭馆要找你做顾问了',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}认真想了一下，「理论上，我可以提供菜单设计咨询，但他们可能不会付钱。」你说大概真的不会，她点头，「那算了。」然后继续翻菜单。过了一会儿，她又开口：「这里的蛋白质和碳水配比也不太合理。」你放弃了继续反应。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 白小满 ────────────────────────────────────────────────────────────────
  half_favor_bai_xiaoman: {
    id: 'half_favor_bai_xiaoman',
    title: '工位上多了一张纸条',
    description: [
      '早上来实验室，你发现桌上多了一张便利贴，浅粉色的，圆乎乎的字：「老师今天也辛苦了！这周组会大家都觉得很有收获，真的！」没有署名。',
      '你把那张便利贴拿起来看了一会儿。昨天的组会气氛其实有点沉，你自己也觉得没发挥好，收尾有些仓促。',
      '往组里扫了一圈，{studentName}正低头喝奶茶，背对着你，角度调得格外刻意。',
    ],
    prompt: '你：',
    options: [
      {
        id: 'half_favor_bxm_acknowledge',
        text: '谢谢你啊，小满',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}的肩膀明显抖了一下，然后慢慢转过来，表情相当坚定：「什么谢谢，我不知道你说什么。」你说你看到她抽屉里有同款便利贴了，她低头看了一眼，耳朵悄悄红了一圈，「那是……巧合。」停了一下，正色补充：「但不管是谁写的，反正是真心话。」',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
          ],
        }],
      },
      {
        id: 'half_favor_bxm_reply',
        text: '悄悄在便利贴下面加了一句，放回原处',
        outcomes: [{
          weight: 1,
          narrative: '你在便利贴下面加了一行：「老师也谢谢你们，这周大家都很拼。」放回桌上。下午，你发现旁边又多了一张，浅黄色的，写着：「嗯！！！」圆乎乎的字，还是没有署名。你数了数笔迹，决定不再假装不知道是谁写的了。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'allStudents', stat: 'happiness', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 毕小天 ────────────────────────────────────────────────────────────────
  half_favor_bi_xiaotian: {
    id: 'half_favor_bi_xiaotian',
    title: '{studentName}跑题了，但跑得很好',
    description: [
      '那天你们在讨论实验设计，{studentName}说：「老师，我想到了一个类比——」然后开始说。',
      '大约两分钟后，你已经完全不记得原来在讨论什么了。{studentName}正在讲一篇1987年的行为生态学论文，眼睛发光，手比划个不停，「你看这个模型，它解释的问题和咱们那个核心假设，从结构上来说是同构的——」',
      '他说到一半忽然停下来，「等等，我给你看这个，」翻出一张图表，「你看，这和你们的数据分布……」继续说了十分钟。',
      '讲完，他自己停下来，看了看你，再看看白板，「老师，我们原来在讨论什么来着？」',
    ],
    prompt: '你：',
    options: [
      {
        id: 'half_favor_bxt_tangent_good',
        text: '我也忘了，不过你那个类比很有意思',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}整个人肉眼可见地高兴起来，「真的吗！」他把那篇论文存进一个文件夹，命名为「可能相关/相关性待验证」，还加了问号。你问他这个文件夹里有多少篇了，他想了想，「一百三十七篇，但大概三十篇是真相关的。」你问怎么区分，他说：「靠感觉。」然后用一副这是显然答案的表情看着你。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
      {
        id: 'half_favor_bxt_new_direction',
        text: '你这个跑题比原来的有意思多了，要不顺着试试？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}低头想了两秒，「那……我们要不要换个方向？」他把白板上的内容拍了张照，重新开了一页，开始搭框架，又快又准，逻辑有点绕但自洽。等你们讨论完，他收好笔说：「老师，我发现我的好想法一般都不是想出来的，是跑偏出来的。」你觉得，这可能是真的。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 1 },
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 钱多多 ────────────────────────────────────────────────────────────────
  half_favor_qian_duoduo: {
    id: 'half_favor_qian_duoduo',
    title: '{studentName}误入路演状态',
    description: [
      '那天你只是随口问了一句：「这周组里要不要一起吃顿饭？」',
      '{studentName}「嗯」了一声，然后沉默了大约五秒。你以为他在想时间，结果他开口了：「这个方向是对的。我们需要提升组内凝聚力，具体来说——」',
      '你意识到有点不对，但他已经停不下来了。「第一，明确用餐需求，进行偏好调研；第二，选址需满足人均预算和出行成本的最优解；第三，时机应选在……」',
      '他说到一半自己也察觉到了，秒速切换成正常语气：「……去哪吃好呢。」',
    ],
    prompt: '你：',
    options: [
      {
        id: 'half_favor_qdd_detail',
        text: '你刚才说的那个选址方案，细化一下？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}面无表情地打开手机，片刻后向你展示了一个表格，列了附近十二家餐厅，标注了人均价格、距离、等位时间和组内已知偏好匹配度。「我有时候会顺手建这个，」他说，语气一本正经，「只是顺手。」你问顺手有多久了，他说大概一年。整个实验室的午饭开销，可能从未如此被认真对待过。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 1 },
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
      {
        id: 'half_favor_qdd_calm',
        text: '深呼吸，然后我们正常订餐',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}深吸一口气，点了点头，「好。」打开外卖app，选了三家，截图发群里，附一句「大家投票」。你以为这就结束了。五分钟后他发来一条：「以及，从数据看，我们应该每三周吃一次，间隔不规律会导致期待值下降。」后面跟了个括号：（仅供参考，非强制）。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 贺时序 ────────────────────────────────────────────────────────────────
  half_favor_he_shixu: {
    id: 'half_favor_he_shixu',
    title: '{studentName}的待办事项里有一条不一样的',
    description: [
      '那天你们坐在一起整理文件，{studentName}把平板放到桌上做参考，切了一下app，待办事项不小心打开了。',
      '你没有刻意去看，但就那一瞬间，你注意到了最上面那一条：「今天告诉一个人，他/她最近做得不错（3分钟，可利用走廊时间完成）」。',
      '{studentName}大概也意识到你看到了，把平板屏幕转了一个方向，继续整理文件，什么都没说。',
    ],
    prompt: '你：',
    options: [
      {
        id: 'half_favor_hsx_say_nothing',
        text: '假装没看见，继续整理文件',
        outcomes: [{
          weight: 1,
          narrative: '你们继续整理，什么都没提。快结束的时候，{studentName}合上平板，忽然说：「老师，上周那个汇报写得很扎实。」就这一句，然后继续收拾东西，脸上是一贯的平静。你忽然想起那条待办事项，笑了一下，说了声谢谢。她点了点头，算是接受了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 1 },
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
          ],
        }],
      },
      {
        id: 'half_favor_hsx_ask',
        text: '这条任务……是固定的吗？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}停了一下，然后平静地点头，「每天一条，执行了快两年了。」她把平板收起来，「研究发现，及时的正向反馈可以显著提升团队效率。」她又补了一句，声音比刚才小了一点：「而且，很多人做了很多事，但没有人告诉他们。」你想接话，她已经站起来去拿文件了。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 唐扩列 ────────────────────────────────────────────────────────────────
  half_favor_tang_kuolie: {
    id: 'half_favor_tang_kuolie',
    title: '{studentName}买早饭带回来了一个人',
    description: [
      '{studentName}说去楼下买早饭，说十分钟回来。二十分钟后，他出现在门口，旁边还跟着一个你没见过的人。',
      '「老师，」他举着豆浆，「我来介绍一下，这位是陈老师，上个月刚发了那篇你说你想读的论文，就是稀疏注意力机制那篇。」',
      '那位陈老师看起来也有点茫然，显然只是在买早饭时被搭上话，还没完全搞清楚发生了什么。',
      '「我说我老师可能感兴趣，陈老师说不介意聊聊，」{studentName}把豆浆发给大家，若无其事，「顺路嘛。」',
    ],
    prompt: '你：',
    options: [
      {
        id: 'half_favor_tkl_chat',
        text: '认真和陈老师聊天',
        outcomes: [{
          weight: 1,
          narrative: '聊了将近一个小时，从论文聊到研究方向。{studentName}坐在旁边喝豆浆，偶尔插一句，大多数时候在看手机。但每次话题断掉，他都会精准地补一句引子，对话就又接上了。陈老师走后，他抬起头，「聊得还行吧？」你说挺好，他点了点头，「我就说你们能聊到一起。」语气相当淡定，像是他早就算好了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'randomStudent', stat: 'happiness', delta: 10 },
            { type: 'randomStudent', stat: 'skills.social', delta: 3 },
          ],
        }],
      },
      {
        id: 'half_favor_tkl_how',
        text: '你是怎么在买早饭时认识人家的？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}想了想，「我就说这个豆浆不如昨天的好喝，他说是，我问他是哪个实验室的，他说计算机系，我说我老师也在计算机系做研究，然后就聊起来了。」他笑笑说：「我觉得，只要你愿意开口，身边的人都挺好聊的。」你和陈老师对视了一眼，发现对方好像也还在消化这个逻辑。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.social', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

  // ── 莫问玄 ────────────────────────────────────────────────────────────────
  half_favor_mo_wenxuan: {
    id: 'half_favor_mo_wenxuan',
    title: '{studentName}跑实验之前会做一件小事',
    description: [
      '你注意到{studentName}有个习惯：每次跑实验之前，他都会把椅子调高一格。',
      '就这样，不检查代码，不重读参数，坐到键盘前，椅子升高一格，然后按运行。这件事本身不影响任何东西，但他每次都认真地做，仪式感大过工学原理。',
      '某次你忍不住问了。他完全没有不好意思，认真地解释：「改变一个变量，排除椅子高度对结果的影响。」你盯着他，他补充：「我知道这不科学，但心情会影响操作质量，操作质量会影响结果。所以我需要一个信号，告诉自己：现在认真了。椅子比较方便。」',
    ],
    prompt: '你：',
    options: [
      {
        id: 'half_favor_mwx_better_ritual',
        text: '要不要换个更有气势的仪式？',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}认真地想了一会儿，「建议收到，但椅子目前效率最高。」他转回去打开代码，升了一下椅子，按运行。「而且，」他回头说，「我记录了一下，用这个仪式跑出来的实验成功率比不用时高，但样本量太小，p值不显著，我还在收集数据。」你不太确定该说什么，他已经转回去盯终端了。',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 12 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
      {
        id: 'half_favor_mwx_anchoring',
        text: '你说的有道理，这就是认知锚定',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}先是一愣，然后眼睛亮了，「对！就是这个意思，我一直觉得这件事说不清楚，现在有词了。」他在笔记本上认真写下「认知锚定」，加了圆圈。「谢谢老师。」他收好笔，又开心地按了一次椅子升降键，「感觉这个仪式升级了。」',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 1 },
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 3 },
          ],
        }],
      },
    ],
    tags: ['half_favor'],
  },

 // ── 谢知微 ────────────────────────────────────────────────────────────────
half_favor_xie_zhiwei: {
  id: 'half_favor_xie_zhiwei',
  title: '打印机好了',
  description: [
    '实验室那台打印机坏了很久。准确地说，也不能算坏——它还能用，只是每打印三页卡一次纸，每次都得拍两下，运气不好还要重新来。久而久之，大家甚至总结出了经验：左边拍一下，右边拍一下，成功率最高。',
    '所以当你某天把二十页材料一次性打印成功的时候，第一反应甚至不是高兴，而是疑惑。你盯着打印机看了两秒，又试着打印了一份，确认了一遍，它丝滑得像换了台机器。',
    '你在实验室里问了一圈，最后有人指了指角落：「好像是{studentName}弄的。」',
    '找到她的时候，她正蹲在地上整理一个拆开的插线板。听见你的问题，只是点点头：「嗯，顺手修了一下。」你追问怎么修的，她想了想：「拆开看了一下，换了个磨损的滚轮，清了灰，重新校了位置。」好像在说顺手扶正了一张椅子。',
    '你正准备说什么，她忽然补充了一句：「那个卡纸声音真的很烦。」停顿一下，又补一句：「而且每次看你们排队拍打印机，效率太低了。」',
  ],
  prompt: '你看着这位偷偷把打印机修好的学生：',
  options: [
    {
      id: 'half_favor_xzw_care',
      text: '所以你忍了三个月？',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}若无其事地回答：「前两个月不会修，后一个月比较忙。」说完继续低头拧螺丝。你差点笑出声，翻译一下就是，她其实惦记这台打印机惦记了整整三个月。',
        effects: [
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
        ],
      }],
    },
    {
      id: 'half_favor_xzw_thanks',
      text: '认真说一句谢谢',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}像是不太习惯被郑重感谢，过了几秒才小声说：「其实不只是打印机。」她指了指角落里重新整理好的网线，又指了指贴好标签的抽屉，「这些我也顺手弄了。」说到最后，她自己都忍不住笑了一下：「可不是做给你们看啊，反正我就是看到乱的东西就会手痒。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 1 },
          { type: 'randomStudent', stat: 'happiness', delta: 18 },
          { type: 'randomStudent', stat: 'skills.engineering', delta: 3 },
        ],
      }],
    },
  ],
  tags: ['half_favor'],
},

};
