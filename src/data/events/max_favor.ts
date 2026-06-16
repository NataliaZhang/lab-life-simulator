/**
 * 满好感特殊故事 — 当某学生好感度首次达到100时触发的专属叙事事件
 *
 * 触发方式：由 monthlyUpdate.ts 直接注入，携带 studentId，
 * 所以描述/选项/结果中的 {studentName} 可安全使用。
 * 不含 triggerConditions；不出现在 monthlyEventPool。
 */

import type { GameEvent } from '../../types';

export const maxFavorEvents: Record<string, GameEvent> = {

  // ── 林小卷 ────────────────────────────────────────────────────────────────
  max_favor_lin_xiaojuan: {
    id: 'max_favor_lin_xiaojuan',
    title: '{studentName}：活了！！！我要去吃宵夜！！！',
    description: [
      '晚上十一点五十八分，投稿系统终于跳出那行熟悉的字：Submission Successful。三秒后，你的手机开始疯狂震动。',
      '第一条消息：「老师！！！！！！」第二条：「活了！！！！！！！」第三条：「出来！！！！！」第四条：「我已经在楼下了！！！！」',
      '你下楼的时候，{studentName}正在实验楼门口来回乱窜，看见你就举着手机冲过来，把投稿成功页面怼到你面前：「老师你看！！它收了！！系统真的收了！！！」',
      '不到十分钟，你们已经坐在烧烤摊。刚坐下，{studentName}就进入了复盘模式：「老师你知道最离谱的是什么吗？昨天晚上我都准备改行了。真的，我连卖烤冷面的摊位摆哪儿都想好了。结果今天中午实验突然通了，下午证明补上了，晚上论文交了。」',
      '他说着说着自己先笑了：「科研真是一种很神奇的职业。昨天觉得人生完了，今天觉得自己能改变世界。」',
      '他举起饮料和你碰了一下：「为这种极不稳定的精神状态干杯。」你们一边吃一边聊。从第一次组会聊到最近那次DDL，从实验室最离谱的bug聊到最离谱的Reviewer。大部分时候都是{studentName}在说，你偶尔插一句，他就能顺着再讲五分钟。',
      '聊到后来，他忽然安静了一下，低头戳着盘子里的烤土豆片，小声说：「其实有时候我也觉得自己挺离谱的。每次都觉得要完蛋了，每次又都能活下来。」',
      '说完他抬起头，眼睛亮亮的，像是刚想起什么重要的事。「老师，下篇论文你还带我玩吗？」',

    ],
    prompt: '{studentName}满脸期待地问你下篇论文怎么办？',
    options: [
      {
      id: 'max_favor_lxj_next_paper',
      text: '当然，下篇继续一起冲',
      outcomes: [{
        weight: 1,
        narrative: '「好耶！」{studentName}差点把饮料晃出来。「老师我就知道！」他立刻开始讲下一个想法，从问题定义一路讲到未来影响，中间逻辑漏洞百出，但本人完全不在意。你试图指出几个问题，他全部承认，然后继续往下讲。讲到最后，他举起杯子和你碰了一下：「反正下篇还有你。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 4 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
        ],
      }],
    },

    {
      id: 'max_favor_lxj_relax',
      text: '下篇以后再说，今晚先庆祝',
      outcomes: [{
        weight: 1,
        narrative: '「有道理！」{studentName}立刻把手机扣到桌面上。「项目暂停，科研暂停，今天只负责高兴。」接下来一个小时，他从Reviewer吐槽到实验室八卦，又模仿起组里每个人开组会的样子，逗得你差点被饮料呛到。结账的时候他抢着扫码，大手一挥：「没事，今天我觉得自己特别有钱。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 25 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
    ],
    tags: ['max_favor'],
  },

  // ── 顾眠眠 ────────────────────────────────────────────────────────────────
  max_favor_gu_mianmian: {
    id: 'max_favor_gu_mianmian',
    title: '{studentName}：一个很好晒太阳的地方',
    description: [
      '周三下午，{studentName}发来一条消息。',
      '内容很简单：「老师，我知道一个很好晒太阳的地方。」过了一会儿，又补了一句：「今天阳光特别好。」',
      '',
      '那个地方在学校西边的小草坡。你到的时候，{studentName}已经坐在那里了，旁边放着两瓶饮料和一袋零食。她冲你挥了挥手，把其中一瓶递过来，然后很自然地往旁边挪了点位置。',
      '',
      '下午的阳光暖洋洋地落下来。操场上传来断断续续的欢呼声，不知道是谁又打出了一记漂亮的安打。风吹过草地，带着一点晒过太阳的味道。你们有一搭没一搭地聊天，从实验聊到组会，从某篇论文聊到学校里新开的奶茶店。',
      '',
      '{studentName}平时话不算多，但今天似乎心情很好。她说起刚进组的时候，说起第一次汇报前紧张得睡不着觉，说起有一次实验卡了两周，最后居然是在睡醒之后想到了解法。说着说着，她自己也笑了：「感觉我读博最大的贡献，就是证明睡觉有用。」',
      '',
      '后来聊天慢慢停了下来。阳光很舒服，风也很舒服。你低头看手机回了几条消息，再抬起头的时候，发现{studentName}已经靠在长椅上睡着了。',
      '',
      '她怀里还抱着那袋零食，饮料放在脚边，睫毛在阳光下投出浅浅的影子。周围很安静，只有远处球场偶尔传来的声音。你忽然意识到，她把你叫来这里，好像也不是为了说什么特别重要的话。',
      '',
      '她只是想把这个下午分给你一点。'
    ],
    prompt: '{studentName}睡着了，你：',
    options: [
      {
        id: 'max_favor_gmm_wait',
        text: '就坐着，等她醒',
        outcomes: [{
          weight: 1,
          narrative: '你没有叫醒她，只是静静地坐在旁边看着。过了很久，{studentName}慢慢睁开眼睛，发现你还在，明显愣了一下。她抱着饮料发了会儿呆，然后轻轻笑起来：「老师，我刚刚做了个好梦。」',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 5 },
            { type: 'randomStudent', stat: 'happiness', delta: 20 },
            { type: 'randomStudent', stat: 'skills.social', delta: 5 },
          ],
        }],
      },
      {
        id: 'max_favor_gmm_snack',
        text: '打开零食袋，先吃起来',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}醒来的时候，太阳已经往西边偏了一些。她发现零食被拆开了，也不在意，抱着袋子慢慢吃起来。{studentName}想起什么说什么，东一句西一句，想到组里第一次汇报，想到某次实验卡住，想到那篇改了十几版的论文。她的话断断续续的，没什么调理，但你觉得你已经完全明白她的意思了。',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'skills.social', delta: 8 },
          ],
        }],
      },
      {
        id: 'max_favor_gmm_photo',
        text: '偷偷拍下这幅画面',
        outcomes: [{
          weight: 1,
          narrative: '阳光、草地、饮料，还有睡得毫无防备的{studentName}，实在很像校园宣传片。后来她醒来发现照片，耳朵一下红了：「老师，你删掉。」顿了顿又补充：「至少别发群里。」',
          effects: [
            { type: 'randomStudent', stat: 'happiness', delta: 20 },
            { type: 'randomStudent', stat: 'skills.social', delta: 10 },
          ],
        }],
      },
    ],
    tags: ['max_favor'],
  },

  // ── 叶知秋 ────────────────────────────────────────────────────────────────
max_favor_ye_zhiqiu: {
  id: 'max_favor_ye_zhiqiu',
  title: '{studentName}：适合你的那一本',
  description: [
    '{studentName}发来消息：「老师，今天傍晚有空吗？我想带你去买一本笔记本。」你盯着这句话看了两秒，才想起来自己上周随口说过“最近想换本新的”。她居然记住了。',
    '傍晚的文具店人不多，窗边铺着一层橙色的光。{studentName}站在笔记本架前，表情认真得像在审稿。你说随便一本就好，她立刻抬头反驳：「随便，是错误率最高的选择。」',
    '她拿起一本素色封面的笔记本递给你。「这本。」你问为什么。她说：「纸厚，适合反复修改；格子大，适合先把不成熟的想法写下来；封面不花哨，适合你开会时假装自己很有条理。」你问：「你是不是在吐槽我？」她想了想：「是建议。」',
    '你指了指旁边一本更漂亮的：「那本呢？」{studentName}摇头：「不适合你。太好看了，你会舍不得在上面乱写。」她顿了顿，又补充：「而你需要一个可以被你乱写、划掉、重来、继续乱写的本子。」语气非常严谨，像是在给你匹配某种科研辅助设备。',
    '后来她又挑了几支笔，试写的时候字迹清清楚楚。你发现她今天其实心情很好：看到喜欢的纸张会很短地“嗯”一声，被你发现后又会立刻恢复平静。结账前，{studentName}还拿了一包便签纸放进篮子里。你问这个也是必要的吗。她点头：「必要。以后指出你逻辑跳跃的时候，可以贴得更明显一点。」',
  ],
  prompt: '结账时，{studentName}把你那本笔记本放到了收银台上。',
  options: [
    {
      id: 'max_favor_yzq_pay_for_both',
      text: '发挥结账手速，把两本都买了',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}试图阻止，失败了。她一路都在论证AA制度的合理性，你一路驳回。走到校门口时，她忽然把一本小册子塞进你手里：「礼尚往来。」你打开第一页，上面写着：导师常见逻辑漏洞，持续更新版。下面已经有第一条了。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 5 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_yzq_notice',
      text: '问她：你那本呢？',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}动作明显停顿了一下。「已经买完了。」「什么时候？」「刚才。」她说得理直气壮：「我不想欠导师人情。」你刚想说什么，低头发现那包便签纸被她偷偷塞进了你的袋子。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},

// ── 白小满 ────────────────────────────────────────────────────────────────
max_favor_bai_xiaoman: {
  id: 'max_favor_bai_xiaoman',
  title: '{studentName}：今天不许讨论DDL',
  description: [
    '那天早上你刚进实验室，就看见{studentName}站在门口堵你。她一手提着奶茶，一手提着甜品袋，表情严肃得像准备宣布重大事项：「老师，今天不许工作。」你还没来得及开口，她已经把奶茶塞进你手里。',
    '实验室角落不知道什么时候被她布置成了临时茶话会。布丁、小蛋糕、曲奇、糖果摆了一桌，旁边还立着张手写纸条：【无DDL区】【禁止讨论进度】【违规者请吃甜品】。你问她这是怎么回事，她理直气壮地说：「因为最近大家都太累啦。而且老师你也很累。」',
    '她很快把话题带跑，开始讲最近发生的各种趣事：隔壁实验室把服务器名字起成神兽大全，某个同学把实验结果和外卖订单一起发给了导师，还有上次组会投影坏掉之后全员围着白板开会的传奇场面。你们一边吃一边笑，桌上的甜品一点点少下去。',
    '后来聊到某次特别难熬的投稿季。你问她那时候为什么还能每天那么开心。{studentName}想了想，说：「因为我发现一个规律。每次觉得天要塌下来的时候，其实都还没塌。」她咬了一口蛋糕，又指了指桌上的甜品：「而且就算真的塌了，至少还能先吃一口再说嘛。」',
    '阳光从窗户照进来，落在奶茶杯和甜品盒上。{studentName}笑得眉眼弯弯，像是把整个实验室的疲惫都轻轻抚平了。你忽然觉得，这大概就是她一直以来最厉害的能力：她总能把日子过得比困难大一点。',
  ],
  prompt: '{studentName}用叉子戳了戳最后一块蛋糕，问你：好不好吃呀？',
  options: [
    {
      id: 'max_favor_bxm_good',
      text: '好吃！下次再订这家',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}立刻打开收藏夹：「我就知道老师会喜欢！」里面密密麻麻全是甜品店备注：「这个适合论文接收，这个适合发工资，这个适合被Reviewer打哭之后恢复心情。」你忽然怀疑，她是不是给人生所有情况都准备好了对应甜品。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_bxm_you',
      text: '因为是你挑的，所以当然好吃',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}眨了眨眼，忽然低头喝奶茶。过了几秒，她才小声说：「那当然啦。」然后又努力装作若无其事地补充：「我挑了很久的。」她把最后那块蛋糕推到你面前：「既然老师这么会说话，那奖励你多吃一块噢。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 25 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},

  // ── 毕小天 ────────────────────────────────────────────────────────────────
max_favor_bi_xiaotian: {
  id: 'max_favor_bi_xiaotian',
  title: '{studentName}：绝密文件夹（终于解封版）',
  description: [
    '{studentName}神神秘秘地把你拉进会议室，确认门关好了，又确认窗帘拉上了，然后从背包最底层掏出一个鼓鼓囊囊的文件夹。封面上贴着手写标签：《重要研究资料》。你刚想感叹他的严谨，就看见下面还有一行小字：《严禁普通人观看》。',
    '文件夹打开的瞬间，你就知道事情不对劲了。第一页：《大型语言模型能否理解猫为什么半夜跑酷》。第二页：《利用奶茶销量预测论文接收率》。第三页：《如果Reviewer改由水獭担任，学术界会不会变得更好》。每篇后面都写满了批注和参考文献，认真程度令人害怕。',
    '{studentName}越讲越兴奋，像在介绍自己的私人博物馆。「老师你看这篇！这个作者真的研究了三年鸽子导航！还有这篇，他们居然真的做了实验！」他时不时拍桌子，时不时站起来比划，快乐得完全忘记了时间。',
    '你一开始只是觉得好笑，后来却慢慢听进去了。那些看起来离谱的题目底下，竟然都有问题意识、实验设计和一点点不讲道理的真诚。{studentName}不是在收集笑话，他是在收集世界上那些还没被允许变得正经的想法。',
    '讲到最后，他忽然声音弱了下来，从文件夹最底下抽出一页纸放到你面前。「这个不是别人写的，」他说，「这个是我写的。」刚才还滔滔不绝的人忽然变得有点紧张，手指搭在文件夹边缘，轻轻敲了两下。「老师，你觉得这个方向……真的有意思吗？」',
  ],
  prompt: '{studentName}把那页纸推到你面前，等你回答。',
  options: [
    {
      id: 'max_favor_bxt_submit',
      text: '当然有意思，改完就投',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}先是愣住，然后肉眼可见地开心起来。「我就知道！」他说得太快，暴露了自己其实一直在等这句话。下一秒他已经开始规划投稿计划，从补实验讲到未来工作。你忽然意识到，他不是来求一个许可的，他是来找一个愿意和他一起相信这些奇怪想法的人。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 2 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_bxt_why',
      text: '为什么一直藏着呢？',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}低声回答：「因为这个方向太怪了，我怕别人觉得我只是在玩。」事实上那页密密麻麻的推导和文献，实在不像玩笑。你轻轻拍了拍他的肩膀，给了他一个鼓励的微笑。他也笑起来：「不过现在没关系了。至少已经有一个人愿意认真看完。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},

  max_favor_qian_duoduo: {
  id: 'max_favor_qian_duoduo',
  title: '{studentName}：实验室Demo Day（仅限一位投资人）',
  description: [
    '你的手机弹出一条会议邀请。发件人：{studentName}。主题：《实验室Demo Day · 内部专场》。时间：今天下午三点。地点：大会议室。备注只有一句话：「请准时，不准提前进场。」',
    '整个邀请充满一种不容拒绝的专业感。你甚至怀疑自己是不是被拉进了某个创业项目的融资路演。',
    '三点整，你推开会议室的门。投影已经打开，桌上摆着饮料和零食，甚至还贴着一张打印出来的日程表。{studentName}站在讲台旁边，衬衫塞得整整齐齐，看见你进来，点了点头：「唯一投资人已到场，会议正式开始。」',
    '接下来的四十分钟堪称离谱。组里的每个项目都被他包装成了创业产品：研究问题变成用户需求，实验结果变成核心指标，论文投稿变成市场验证。他甚至给每个同学都设计了一页介绍和一句宣传语，而且明显是认真聊过之后才写出来的。这些细节，得花多少时间才能收集齐啊。',
    '路演进行到最后一页的时候，{studentName}忽然停住了。屏幕上没有图表，没有数据，也没有增长曲线。只有一行小字：最有价值的资产，不在服务器里。',
    '下面还有第二行：在人身上。',
    '会议室忽然安静下来。{studentName}轻咳一声，飞快切到下一页：「好的，以上就是全部内容，现在进入Q&A环节。」但你注意到，他的耳朵略微有点红。',
  ],
  prompt: '作为本次Demo Day唯一的投资人，你决定：',
  options: [
    {
      id: 'max_favor_qdd_invest',
      text: '宣布追加投资',
      outcomes: [{
        weight: 1,
        narrative: '你举起饮料：「我决定继续投资这个团队。」{studentName}迅速一本正经地接上话：「感谢投资人认可，本项目将继续长期运营。」停顿两秒后，他没忍住笑了。「不过说真的，老师，能把这些人聚在一起，本来就是个很厉害的项目了。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_qdd_asset',
      text: '指着最后那页',
      outcomes: [{
        weight: 1,
        narrative: '你敲了敲桌子：「最后那页，是整场最好的部分。」{studentName}犹豫了两秒，又把那页切了回来。他不好意思地挠挠头：「其实我改了三次。」他说，「前面那几十页都只花了一晚上。」然后他把准备好的零食推到你面前：「老师，这是本次路演赠送给唯一观众的伴手礼。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 5 },
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},

// ── 贺时序 ────────────────────────────────────────────────────────────────
max_favor_he_shixu: {
  id: 'max_favor_he_shixu',
  title: '{studentName}：归档编号 001',
  description: [
    '你的邮箱收到一封会议邀请。发件人：{studentName}。主题：《实验室年度归档整理》。时间精确到分钟，附件五个，备注三条，最后还标注了建议提前五分钟到场。你都不用看名字就知道，这一定是她发的。',
    '下午到会议室时，里面没有别人。桌上放着一本厚厚的黑色笔记本。{studentName}把它推过来，说：「年度归档汇报。」你翻开第一页，是实验室成立当天。第二页是第一次组会。第三页是第一次被Reviewer二号打爆。每件事都有日期、经过、结果，甚至还有评分和备注。某次组会：效率7/10，老师跑题二十分钟，但意外解决核心问题。某次投稿：流程混乱，但结局良好。你越翻越觉得离谱。',
    '因为里面有很多事情，你自己都不记得了。某次凌晨一点，你顺手帮学生改完论文后关掉实验室最后一盏灯；某次大雨，你把忘带伞的学生送到楼下；某次组会提前结束，只因为发现大家都累得快睡着了。那些你做完就忘的事情，都被她工工整整写进了本子里。',
    '翻到后面时，你忽然发现有个单独分类。标题是：《导师观察记录》。里面全是你的口头禅、奇怪习惯和经典语录。甚至还有统计图。比如「下周」实际指代时间分布，「再看看」最终变成新项目的概率，以及「问题不大」之后通常会出多大问题。',
    '你抬起头看她。{studentName}推了推眼镜，语气平静：「样本积累够了，值得单独建档。」说完又补充一句：「而且很多事情如果没人记，很快就会消失。」她低头看向那本已经快写满的编年史，「我觉得它们不应该消失。」',
  ],
  prompt: '你继续往后翻，发现最后几页还是空白的：',
  options: [
    {
      id: 'max_favor_hsx_memory',
      text: '这些你都记得啊……',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}想了想：「重要的事情会记得。」说完又补充：「而且老师提供了很多样本。」她一本正经得像在汇报实验结果。你低头继续翻那本编年史，忽然意识到，原来这些年发生过的事情，有人一直认真地替大家保存着。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 5 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_hsx_future',
      text: '指着空白页问：后面的呢？',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}略显疑惑地看了你一眼：「后面是明年的。」她说得理所当然，仿佛这件事根本没有第二种可能。「模板已经建好了，目录也排好了。」说完她打开手机给你看备份文件，连未来几年的卷号都已经编号完成。你看着那些尚未写下内容的空白页，忽然觉得它们一点都不空。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},
// ── 唐扩列 ────────────────────────────────────────────────────────────────
max_favor_tang_kuolie: {
  id: 'max_favor_tang_kuolie',
  title: '{studentName}：老师，我给你组了个局',
  description: [
    '周五下午，你刚准备下班，{studentName}发来消息：「老师，六点来一下，我组了个小局。」你问是什么局。他秒回：「都是好人，都想认识你。别担心，我控场。」这句话听起来太像主持人开场白，你还没来得及拒绝，地址已经发过来了。',
    '六点整，你推开包厢门，十几个人同时抬头跟你打招呼。隔壁实验室的学生、企业研究员、毕业校友、行政老师、某个你只在邮件里见过的合作方，全都坐在里面。更离谱的是，他们都知道你的实验室，知道你们最近的项目，甚至有人第一句话就是：「老师，Reviewer二号那个故事是真的吗？」',
    '{studentName}完全不觉得这有什么问题。他坐在桌边，像一台人脉交换机：「这个做系统，这个做理论，这个以后可以合作，这个有服务器资源，这个特别会写基金。」他把每个人介绍得热热闹闹，又恰到好处，像早就把今晚的路线图在脑子里跑过一遍。',
    '饭局中途，有人开玩笑问：「你怎么天天安利你老师？」{studentName}一边给大家续饮料，一边自然得不能再自然地说：「因为我老师真的很厉害啊。」他说得太顺口了，顺口到你一时没反应过来，旁边几个人已经开始笑着点头附和。',
    '散场后，你们一起往回走。夜风有点凉，{studentName}还在低头回消息，把刚才认识的人分进不同群聊。你忽然意识到，他不是单纯喜欢认识人。他是在用自己的方式，把他觉得重要的人，认真介绍给这个世界。',
  ],
  prompt: '路灯下，{studentName}还在低头整理联系人。',
  options: [
    {
      id: 'max_favor_tkl_proud',
      text: '夸我夸得那么顺口，是不是练过？',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}抬头瞥了你一眼，理直气壮：「是真话啊，有什么需要练的。」说完又低头备注联系人，像刚才只是陈述了一个常识。走了几步他又忍不住补充：「我在外面提到我们组的时候，是真的会觉得很有面子。」',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 15 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_tkl_world',
      text: '谢谢你把我介绍给这么多人',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}摆摆手：「这有什么好谢的。」他走了两步，又笑着说：「我只是觉得，认识你的人应该再多一点。」说完，他把你拉进一个新群，群名叫“未来合作机会”。你看着那个群名，忽然觉得今晚的风都轻了一点。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 5 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.social', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},

  // ── 莫问玄 ────────────────────────────────────────────────────────────────
  max_favor_mo_wenxuan: {
    id: 'max_favor_mo_wenxuan',
    title: '{studentName}：实验室年度转运仪式（附科学说明）',
    description: [
      '你办公室门缝里塞进来一张手写请柬，正楷，深蓝色墨水：「敬邀参加实验室年度转运仪式，时间：今日，地点：大会议室，参与者：老师（唯一指定），主持人：莫问玄。着装不限，心诚则灵。」',
      '你去了。会议室里，他把电池驱动蜡烛（他在蜡烛旁边放了一张便利贴，写着「消防安全第一」）、深蓝色布、一副塔罗牌摆好，仪式感是实打实的。他请你洗牌、切牌、抽牌，全程一丝不苟，嘴里念的是他自己发明的解读框架，能自洽，不能证伪。',
      '解读结束，他总结：「今年运势整体向好，但需防服务器在关键时刻崩溃——这个有历史数据支撑，不完全是玄学。」你想笑，他说得那么认真，你忍住了。',
      '收牌的时候，他把布叠好，切换了语气，说：「老师，我知道这不科学。我自己统计过准确率，p值不显著。」他停了一下，「但有时候，人是需要一个仪式，才能给自己发令枪，你明白吗？」',
      '「做这个，不是因为我真的相信牌，」他把布袋收好，「因为认真对待一件事的那个人，才是真正值得相信的东西。今天请你见证，是因为，你就是我说的那种人。」',
    ],
    prompt: '{studentName}收拾完，等你说点什么：',
    options: [
      {
        id: 'max_favor_mwx_reopen',
        text: '能不能再抽一张',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}愣了两秒，眼睛亮了，「当然可以。」他把布重新展开，请你再抽，认认真真地解读，这次比第一次还投入，嘴里的框架越说越细，你发现他其实是在认真解释他的推理逻辑，只是用了牌的外壳。解读结束，他收好，说：「两次结果一致，统计意义不高，但象征意义显著。」他抬起头，笑了，「谢谢老师陪我做完了整套。」',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 5 },
            { type: 'randomStudent', stat: 'happiness', delta: 15 },
            { type: 'randomStudent', stat: 'skills.theory', delta: 5 },
          ],
        }],
      },
      {
        id: 'max_favor_mwx_ritual',
        text: '做人确实需要仪式感',
        outcomes: [{
          weight: 1,
          narrative: '{studentName}看着你，好像在确认你不是在敷衍他，然后用力点了点头，说：「很多人觉得不科学就等于没用，但不科学不等于没有效果，对吧。」他把布袋拍了拍，放进包里，「我每次做这个，不是要让牌告诉我结果，是要让自己进入可以认真去做事的状态。今年的仪式，有老师见证了，运势加成至少翻倍。」',
          effects: [
            { type: 'lab', stat: 'reputation', delta: 3 },
            { type: 'randomStudent', stat: 'happiness', delta: 20 },
            { type: 'randomStudent', stat: 'skills.social', delta: 5 },
          ],
        }],
      },
    ],
    tags: ['max_favor'],
  },

  // ── 谢知微 ────────────────────────────────────────────────────────────────
max_favor_xie_zhiwei: {
  id: 'max_favor_xie_zhiwei',
  title: '{studentName}：老师，我带你看个东西',
  description: [
    '晚上九点多，你刚准备回家，{studentName}忽然发来消息：「老师，你还在学校吗？」还没等你回复，第二条已经到了：「来机房一下不？」第三条紧跟着：「没什么事，就陪我聊聊天。」',
    '你到的时候，她已经在那里等着了。机房灯开着，服务器低低地嗡鸣。{studentName}站在门口，看起来有点高兴，又努力装得和平时一样平静。「跟我来。」她说。',
    '走进去以后，你发现很多地方都变了。机柜旁边多了标签，线缆重新整理过，连备用键盘和网线都被分类收纳进透明盒子里。最离谱的是角落居然摆着一盆小绿植。见你注意到了，{studentName}立刻解释：「服务器旁边不能养，所以放在安全距离之外。」显然研究不少。',
    '她带着你绕了一圈，每经过一台机器都能说出它最近发生过什么事。「这台上个月半夜崩过。」「这台风扇有异响，我换掉了。」「这台现在状态最好。」语气熟练得像在介绍自己的朋友。直到最后，她停在最里面那个机柜前，拍了拍侧面。',
    '「老师，」她忽然说，「其实我最开始不那么喜欢这里。」她低头笑了一下，「刚来的时候什么都不会，看见这些机器就头疼。」她轻轻地说：「后来慢慢全弄懂了，就开始舍不得了。现在每次晚上来这里，都觉得很安心。」',
  ],
  prompt: '{studentName}站在那排机柜前，等着你的反应：',
  options: [
    {
      id: 'max_favor_xzw_home',
      text: '看来有人已经在这里安家咯',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}本来想反驳，张了张嘴，最后却点了点头。「有一点吧。」她承认得很小声。过了一会儿又补充：「不过不是机器的原因。」你还没来得及追问，她已经转身去检查机柜温度了，只剩耳朵有点红。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 3 },
          { type: 'randomStudent', stat: 'happiness', delta: 25 },
          { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
        ],
      }],
    },
    {
      id: 'max_favor_xzw_thanks',
      text: '谢谢你把这里照顾得这么好',
      outcomes: [{
        weight: 1,
        narrative: '{studentName}愣了一下，像是完全没预料到你会这么说。她低头摆弄了两下手里的记号笔，才轻声回答：「应该的。」她的声音开始变得细如蚊蝇，「而且有人会发现的话，整理这些就更值了。」机房依旧嗡嗡作响，但你清清楚楚地听到了她的话。',
        effects: [
          { type: 'lab', stat: 'reputation', delta: 5 },
          { type: 'randomStudent', stat: 'happiness', delta: 20 },
          { type: 'randomStudent', stat: 'skills.engineering', delta: 5 },
        ],
      }],
    },
  ],
  tags: ['max_favor'],
},

};
