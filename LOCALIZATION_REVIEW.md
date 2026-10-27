# Localization Review

Only genuine judgment calls are listed here, most important first. Each item gives the current English and one alternative. Everything else follows `LOCALIZATION_GUIDE.md` and needs no review.

Sections:
1. Chinese source edits made during localization (verify these first)
2. Game-wide decisions
3. Character taglines and farewells
4. Ambiguous source text (needs an author decision)
5. Notable rewrites (wordplay, culture, register)

---

## 1. Chinese source edits made during localization

These are fixes to the Chinese text, made because the translation exposed a bug. The gameplay is unchanged.

| Where | Change | Why |
|---|---|---|
| `qdd_pi_email_timing`, `qdd_mediocre_paper_filter` | 她 → 他 throughout (titles included) | Dorian is 他 everywhere else |
| `hsx_todo_theory`, `hsx_meeting_timing` | 他 → 她 throughout | Serena is 她 everywhere else |
| `graduation_check_2`, `graduation_check_3` | 他们 → TA | 他们 is plural; the student is one person of unknown gender |
| `graduation_check`, `graduation_check_2` description | removed a stray leading `"` | typo |
| `group_academic_bet` → `join_bet_2` | 替{student2Name}写 → 替{studentName}写 | you lost the bet on student 2, so you owe student 1 (mirror of `join_bet_1`) |
| `mwx_hyperparameter_ritual` | learning rate 0.000137 → 0.000138 (both languages) | the line says the digits sum to twelve; 1+3+7 = 11 |
| `crypto_tenant` | dropped "$2.1/GPU-hour" from the damage formula | the stated rate gives ≈ ¥21K, not the ¥88,000 the scene needs; the English never showed the rate |
| `half_favor_ye_zhiqiu` description[3] | 你们还是点了餐 → 你们接着看菜单 | the outcome ends with "we should order first" |
| `yzq_reviewer_rant` description[0] | 投稿被拒 → 结论是大修 | the outcome has a next round of reviews, so the paper wasn't rejected |
| `late_invited_talk` | 开发问题 → 开放问题 | typo ("open problems") |
| `variable_naming_law` (projects) | 倒U形 → U形 | both extremes have more bugs, so it's a U |
| `llm_everything` | "{studentName}认为LLM…" → "我认为LLM…" | the student was quoting themself in the third person, a leftover from a placeholder swap |
| member-change notice (`messages/zh.ts`) | "进度 -10" → "请重新分配负责人" | the engine applies no penalty when a student graduates or leaves |

Engine fix (not text): events whose text names `{studentName}` or `{student2Name}` could reach the screen with nobody bound, for example when every student had left, and then showed the raw placeholder in both languages. `bindRequiredStudents()` in `engine/eventQueue.ts` now binds an active student or skips the event.

Left for the author (possibly intentional): 助理助理 and 绑架凶手 (see §4).

---

## 2. Game-wide decisions

## [Funding unit — all files]
Chinese:
资金 37万 / 录取费：20万/人
Current English:
Funding $370K / Cost: $200K per student
Alternative:
Unitless "Funding 37", or "¥370K"
Issue:
1万 = $10K is applied everywhere, in the UI and in narrative. US-flavored dollars read naturally, and the totals happen to land in realistic US ranges (a PhD student at $100–200K/yr). Side effect: small everyday amounts are converted 1:1 from yuan, so a few look pricey in dollars ($30K NAS, $20K UPS, $300 nap chair).

## [Stat name — 好感]
Chinese:
好感 / 好感度
Current English:
Rapport
Alternative:
Affinity / Trust
Issue:
"Rapport" names an advisor–student relationship without romance. "Affinity" reads more like a dating sim.

## [Student names — first vs. full]
Chinese:
林小卷正式入组 / 林小卷·好感 +2
Current English:
Jamie Lin has officially joined the lab. / Jamie · Rapport +2
Alternative:
—
Issue:
English refers to students by first name. The full name is kept for identity labels: the admission card and admit button, the "Joins the Lab" log entry that introduces them, member cards, the detail profile, the ending roster, Gallery cards, and in-story labels such as an email sender or a first-meeting introduction. The admission log entry is the one judgment call; it uses the full name because it is the character's first appearance in the story.

## [Trait names that were renamed rather than translated]
Chinese:
靠谱学长 / 社交恐怖分子 / 人形磁铁 / 乐观心大
Current English:
Lab Anchor / Weaponized Extrovert / People Magnet / Unsinkable
Alternative:
Reliable Senior / Social Menace / Human Magnet / Big-Hearted Optimist
Issue:
"Reliable Senior" reads like an age group in English, and 学长 is male while the trait belongs to Ada. "Weaponized Extrovert" keeps the hyperbole of 恐怖分子 without implying anything sinister about Nico.

## [news_reviewer_3_found]
Chinese:
审稿人3号
Current English:
Reviewer 3
Alternative:
Reviewer 2 (the English academic meme for the hostile reviewer)
Issue:
I kept it faithful to the Chinese and the event ID. Switching to 2 would land harder with English players, and other events already use Reviewer 2 as the villain.

## [Game title]
Chinese:
实验室模拟器 (status bar) / Lab Life Simulator (start screen, page title)
Current English:
Lab Simulator (status bar) / Lab Life Simulator (start screen, page title)
Alternative:
"Lab Life Simulator" everywhere
Issue:
The status bar follows the Chinese name. The existing English brand is "Lab Life Simulator". Pick one if they should match.

---

## 3. Character taglines and farewells

## [Jamie Lin — tagline / farewell]
Chinese:
平时不见人，DDL前像开了二档 / 很多时候，连我自己都不信自己赶得上DDL。但有个信任我的老师，真棒啊。
Current English:
Seldom seen. Deadlines unlock his final form. / Most of the time, not even I believed I’d make the deadline. Having an advisor who did, though. That was pretty great.
Alternative:
Invisible all month. Unstoppable the night before. / …But I had an advisor who believed in me. That was pretty great.
Issue:
"Final form" is the English power-up meme for 开了二档, a bigger escalation than "second gear". "Who did" ties his advisor's trust specifically to the deadline. That fits his offhand voice but is narrower than 信任我.

## [Mina Koo — tagline / farewell]
Chinese:
我没睡着，我是在后台运行 / 我睡觉的时候，其实也在听。谢谢你让这里足够安静——安静到我愿意一直待在这里。
Current English:
Not asleep. Running in the background. / Even when I was asleep, I was listening. Thank you for making it quiet enough here. Quiet enough that I wanted to stay for good.
Alternative:
I’m not asleep. I’m running in the background. / When I’m asleep, I’m still listening. …Quiet enough that I never wanted to leave.
Issue:
The clipped tagline suits her low-power voice. "Never wanted to leave" is a stock phrase and a shade more sentimental.

## [Ada Yeh — tagline / farewell]
Chinese:
代码会过时，证明会永存 / 很多问题我都想证明，只有一件事不需要证明。跟着你做研究，是我最正确的选择。
Current English:
Code gets deprecated. Proofs are forever. / I want to prove almost everything. Only one thing has never needed a proof. Doing research with you was the most correct choice I ever made.
Alternative:
Code goes stale. Proofs don’t. / …Choosing to do research with you was simply correct.
Issue:
"Most correct" is deliberately a little non-idiomatic. It is the one moment Ada lets warmth override rigor.

## [Sunny Bai — tagline / farewell]
Chinese:
事已至此，先吃饭吧 / 老师你知道吗，其实我也有很怕的时候。但你在的话，我就觉得也没什么大不了的。
Current English:
It is what it is. Let’s eat first. / Professor, did you know? Sometimes I get really scared too. But when you’re around, it never seems like that big a deal.
Alternative:
Well, it’s come to this. Let’s eat first. / …But when you’re around, the sky never quite falls.
Issue:
"It is what it is" is the English stock phrase closest to the 事已至此 meme. The alternative farewell calls back her max-Rapport scene but adds an image the Chinese doesn't have.

## [Theo Bell — tagline / farewell]
Chinese:
这篇论文虽然离谱，但我觉得有启发 / 每次有新想法，我第一个想要分享的人，都是你。
Current English:
This paper is absurd. I found it inspiring. / Every time I have a new idea, the first person I want to show it to is you.
Alternative:
Okay, it’s absurd. But hear me out. / Every new idea I have, I still want to show you first.
Issue:
The alternative tagline is punchier but makes him sound like he's pitching rather than sincerely moved. "Show it to" echoes his habit of pushing printouts at you.

## [Dorian Vale — tagline / farewell]
Chinese:
所以谁会为它买单？ / 以前我总想着怎么能做出有价值的东西。后来发现，有些遇见本身就很值。
Current English:
So who’s actually going to use this? / I was always thinking about how to build something of value. Later I realized some things are worth it without being built at all. Meeting you, for one.
Alternative:
So who’s buying? / I always asked whether something was worth building. I never had to ask whether meeting you was worth it.
Issue:
A literal "Who's going to pay for it?" makes him sound money-driven, which his design rules out. The current tagline turns it into his catchphrase instead. The farewell has to name "meeting you" because English can't keep 有些遇见 implicit.

## [Serena Ho — tagline / farewell]
Chinese:
老师，您答应我的部分写完了吗？ / 我喜欢按部就班，跟随着计划表走。唯独毕业离开你的这一天，我一直不太想排进去。
Current English:
Professor, is the part you promised me done? / I like doing things in order, the way the schedule says. There was only one day I kept putting off scheduling: the day I graduate and say goodbye to you.
Alternative:
Professor, how’s the part you promised me coming along? / …The only day I never wanted to put on it was the day I leave you.
Issue:
"Kept putting off" adds a quiet irony, since she procrastinates on nothing else. "Leave you" can sound like a breakup in English.

## [Nico Tang — tagline / farewell / catchphrase]
Chinese:
来都来了，加个好友吧。 / 我加过很多人的联系方式，但最值得加的，是当初招我进组的那个你。
Current English:
While we’re here, let’s swap contacts. / I’ve added a lot of people over the years. The one most worth adding was you, back when you first took me into the lab.
Alternative:
We’re here anyway. Let’s swap contacts. / I’ve saved a lot of contacts. The one I’d never delete is the person who took me into this lab.
Issue:
来都来了 is always "while we’re here", so later scenes can quote it as his catchphrase, including one where the narrator notes it doesn't quite make sense.

## [Orion Moreau — tagline / farewell]
Chinese:
代码跑不过，先换个方位。 / 入组前我抽了一张牌，是“贵人”。没告诉你的是，后来这张牌，一直立在我床头。
Current English:
Code won’t run? Check which way it’s facing. / Before I joined the lab, I drew a card. It was “The Benefactor.” What I never told you is that the card has stood by my bed ever since.
Alternative:
If the code won’t run, try moving the desk first. / …“The Patron.”
Issue:
贵人 isn't a real tarot card. "The Benefactor" sounds like one and needs no explanation.

## [Zoe Hsieh — tagline / farewell]
Chinese:
我就看看，不会动的。 / 我好像惹过不少麻烦。但每次回头，都发现你还在那里。
Current English:
I’m just looking. I won’t touch anything. / I guess I caused my share of trouble. But every time I looked back, you were still there.
Alternative:
Just looking. Won’t touch a thing. / I broke a lot of things here, I think. But every time I looked back to check, you were still there.
Issue:
The alternative farewell leans on her "do we still have the old version?" callback, which is more pointed but less plain than the Chinese.

---

## 4. Ambiguous source text (needs an author decision)

## [daily_bureaucracy / late_industry_poach]
Chinese:
你偶尔看到{studentName}的名字出现在一篇高引论文的致谢里，排在第一位。
Current English:
you happen to see {studentName}’s name in the acknowledgments of a highly cited paper, listed first.
Alternative:
you come across a highly cited paper by {studentName}. In the acknowledgments, your name is listed first.
Issue:
The literal reading is translated. The source may mean your name heads the student's acknowledgments, which would be the stronger emotional payoff. If so, fix the Chinese too.

## [daily_bureaucracy / late_alumni_success]
Chinese:
你还记得{studentName}…… / 现任学生先是各自在群里点开了消息……
Current English:
You still remember {studentName}… / Your current students each open the message…
Alternative:
—
Issue:
The text treats the student as an alum, but the event binds a currently enrolled student. This is a content design issue in both languages.

## [Named minor characters]
Chinese:
王教授 (Nico's first meeting) / 王老师 (bxm_social_talent) / 王教授 (tenure committee, endings) / 陈老师 (Nico's half-favor) / 陈教授 (Theo's dolphin paper)
Current English:
Prof. Kapoor / Prof. Harlow / Prof. Whitfield / Dr. Mehta / Professor Chen
Alternative:
Make any of the first two Prof. Whitfield if they were meant to be the same person
Issue:
I treated each one as a different person, because nothing in the scenes links them. Only 张老师 → Prof. Brennan (joint group meeting) is a confirmed recurring character.

## [endings / ending_be_rep_low] tagline
Chinese:
名单上有你的名字，但没人来填那把椅子。
Current English:
Your name was on the list, but no one came to fill that chair.
Alternative:
Your name was on the agenda. The other chairs stayed empty.
Issue:
"那把椅子" has no clear referent. It is probably the committee members who didn't show up. The current version keeps the ambiguity.

## [endings / ending_all_students_left] rebuild outcome
Chinese:
就像第一次你在实验室里见到的那个人一样。
Current English:
just like the first person you ever met in this lab.
Alternative:
just like the very first student you ever met here.
Issue:
This could mean your first student or your younger self. It is kept ambiguous.

## [characters/bai_xiaoman.ts / max_favor_bai_xiaoman]
Chinese:
【违规者请吃甜品】
Current English:
VIOLATORS WILL BE GIVEN DESSERT.
Alternative:
VIOLATORS BUY EVERYONE DESSERT.
Issue:
请 could mean "please eat" (the punishment is dessert) or "treat" (the violator pays). The cozy reading was chosen.

## [daily_bureaucracy / late_lab_anniversary]
Chinese:
不太精确，但能看出是谁画的
Current English:
It isn’t very accurate, but you can tell who drew it.
Alternative:
…but you can tell what it’s meant to be.
Issue:
This may be a slip for 能看出画的是什么.

## [conditional / collaboration_offer] and [group_events / group_bluetooth_dj]
Chinese:
对方的助理助理发了七封邮件 / 查蓝牙连接记录，绑架凶手
Current English:
Their assistant’s assistant sends seven emails / Check the Bluetooth logs and nab the culprit
Alternative:
Their assistant sends seven emails / …and kidnap the culprit
Issue:
Each could be a typo (助理, 捉拿) or a deliberate joke. The English reads 助理助理 as a joke and 绑架 as a typo. The Chinese is unchanged.

## [daily_hype / hot_arxiv_nuke]
Chinese:
群里挂着灰色双勾半天，然后先冒出来一个"……"，消失了
Current English:
The message sits there, delivered and unread, for ages. Then a typing indicator pops up and vanishes.
Alternative:
…Then someone sends “…” and deletes it.
Issue:
The "……" that appears and then disappears was read as a typing indicator.

---

## 5. Notable rewrites (wordplay, culture, register)

## [characters/lin_xiaojuan.ts / lxj_progress_check → lxj_alumni_visit]
Chinese:
快了快了 … 想着那个总说"快了快了"的学生，现在确实快了。
Current English:
“Almost there, almost there.” … the student who was always “almost there.” These days, he really does get there fast.
Alternative:
“almost done” … These days, he really is fast.
Issue:
快了 means both "almost" and "fast". English can't pun in one word, so "almost there" is used throughout to set up the callback.

## [characters/lin_xiaojuan.ts / lxj_blame_chain]
Chinese:
这个锅是球形的。
Current English:
The buck stops nowhere.
Alternative:
This blame is spherical.
Issue:
"Spherical blame" (no edge to pin it on) confuses English readers. Inverting an English idiom gives the same deadpan effect.

## [characters/lin_xiaojuan.ts / half_favor_lin_xiaojuan]
Chinese:
「你他妈的为什么又是NaN。」
Current English:
“Why the fuck are you NaN again.”
Alternative:
“Why the hell are you NaN again.”
Issue:
This matches the intensity of 他妈的. Use the alternative if the English rating should be milder.

## [Jamie max_favor / conditional late_night_doubt — 烤冷面]
Chinese:
卖烤冷面的摊位 / 我是不是适合卖烤冷面
Current English:
my food truck / maybe I’m meant to run a food truck
Alternative:
my grilled-noodle cart (keep the dish)
Issue:
The dish is incidental to the joke (quitting research for street food), so it was localized.

## [mainline / grant_deadline]
Chinese:
国自然青年基金
Current English:
the national early-career grant
Alternative:
NSF CAREER
Issue:
CAREER is instantly recognizable but doesn't match the game's numbers (3-year scope, $240K). Generic avoids nitpicks.

## [mainline / recruit_campaign, midterm_review_positive]
Chinese:
最终选了"微软雅黑加粗" / 光杆司令 / "挺好。"
Current English:
before settling on Calibri Bold / Party of One / “Solid.”
Alternative:
Arial Bold / A General with No Army / “Pretty good.”
Issue:
These are localized equivalents: the most default font, an English idiom, and understated praise. "Pretty good" can sound lukewarm in English.

## [characters/bi_xiaotian.ts / bxt_weird_workshop, bxt_science_communicator, bxt_alumni_visit]
Chinese:
AI与中医经络融合研讨会 / 某985正教授 / "终于有人说人话了" / 科普主播
Current English:
Workshop on AI and TCM Meridian Theory / a full professor at a top university / “Finally, Someone Who Explains It Like a Human” / Science YouTuber
Alternative:
AI and Acupuncture Meridians / a top Chinese university / “Finally, Someone Speaking Plain English” / Science Communicator
Issue:
"985" has no English equivalent. "YouTuber" names a platform the Chinese doesn't.

## [characters/mo_wenxuan.ts / mwx_paper_title_omen, mwx_industry_poach, mwx_gpu_fengshui]
Chinese:
笔画数 / 占了一卦……「旅」 / 气流和气场可能存在正向耦合
Current English:
letter-value numerology / It came up Lü, the Wanderer / The flow of air and the flow of qi may be positively coupled.
Alternative:
letter counts / I got Hexagram 56, the Wanderer / Airflow and energy flow…
Issue:
Stroke-count divination doesn't transfer to an English title, so it became numerology. "Qi" appears only here, to keep the 气 pun.

## [characters/tang_kuolie.ts / tkl_six_degrees]
Chinese:
听XXX说您在做的方向
Current English:
Our visiting scholar told me about the direction you’re working on
Alternative:
So-and-so mentioned…
Issue:
A literal "XXX" redaction looks like a bug in English, so the last link in Nico's chain was named instead.

## [characters/qian_duoduo.ts / qdd_mediocre_paper_filter]
Chinese:
她的眼神变得算盘味十足
Current English:
His expression turns unmistakably calculating
Alternative:
You can practically hear an abacus clicking behind his eyes
Issue:
The abacus image risks making Dorian sound mercenary, which the design rules out.

## [characters/he_shixu.ts / hsx_first_meeting]
Chinese:
你是这份计划书里的一个节点。
Current English:
you are one of the dependencies in this plan.
Alternative:
one of the milestones in this plan.
Issue:
节点 is both node and milestone. "Dependency" keeps the "you've been made a component" joke for CS players.

## [characters/xie_zhiwei.ts / 顺手 motif]
Chinese:
顺手理了一下 / 顺手优化了五个
Current English:
“while I was at it” (fixed phrase, also in titles)
Alternative:
Vary it ("since I was in there").
Issue:
One fixed phrase makes it her catchphrase, as 顺手 is in Chinese. It repeats on purpose.

## [characters/gu_mianmian.ts / max_favor_gu_mianmian closing line]
Chinese:
她只是想把这个下午分给你一点。
Current English:
She just wanted to share a little of this afternoon with you.
Alternative:
She just wanted to give you a little of this afternoon.
Issue:
The alternative is closer and stranger in a good way. The current one is smoother and warmer.

## [characters/ye_zhiqiu.ts / yzq_env_crisis option]
Chinese:
数学归数学，环境的……算了
Current English:
Render unto math what is math’s, and the environment… never mind
Alternative:
Math is math. As for the environment… never mind
Issue:
This keeps the 凯撒的归凯撒 parody, but it's long for a button.

## [daily_reviewer / reviewer_agi_prerequisite]
Chinese:
你写了一份逐条回应的申辩稿（业内称"rebuttal"，就是对着审稿意见一条一条正式反驳）。
Current English:
You write a point-by-point rebuttal.
Alternative:
Keep a gloss.
Issue:
The Chinese explains the English jargon to Chinese players. English players already know the word, so the gloss was dropped.

## [daily_hype / foundation_war, hot_arxiv_nuke]
Chinese:
大力出奇迹 / 加速冲刺，先发为敬
Current English:
scale is all you need / Sprint and get ours out first
Alternative:
just throw more compute at it / Floor it. First to post wins.
Issue:
The first swaps in the matching ML meme. The second drops an untranslatable toast pun (先干为敬).

## [daily_life / paper_to_public, desk_archaeology, ac_warfare]
Chinese:
公众号 / 已经注销的QQ号 / 22度派和26度派
Current English:
a popular-science blog / a deactivated university email / the 22°C and 26°C factions
Alternative:
a WeChat science account / an AIM screen name / 72°F and 79°F
Issue:
Platforms were localized. Celsius was kept to preserve the values and the 22/24/26 symmetry.

## [daily_bureaucracy / bureau_reimbursement_quest, late_invited_talk]
Chinese:
盖章 / 画一个宏大的饼
Current English:
get it notarized / Sell them a grand vision
Alternative:
sign it and scan a backup / Promise them the moon
Issue:
US campuses have no official stamp. "Promise them the moon" hints at the failure outcome, so the neutral wording was used.

## [student_specific / graduation_check_3]
Chinese:
学校论坛……标注：陈年博士生培养区。
Current English:
On the campus subreddit … your lab labeled: “Vintage PhD Aging Cellar.”
Alternative:
“Barrel-Aged PhD Students”
Issue:
This keeps the food-aging pun of 陈年.

## [project_ideas / idea_email_politeness; projects / mediocre_paper_detector, idea_meeting_translator]
Chinese:
辛苦了 / 水会检测系统 / 你说的是中文吗
Current English:
hope you’re doing well / Junk Paper Detection System / Was That Even English?
Alternative:
I hope this email finds you well / Paper Mill Detector / Are We Speaking the Same Language?
Issue:
These are functional equivalents. "Paper mill" would imply fraud, which goes further than 水会.
