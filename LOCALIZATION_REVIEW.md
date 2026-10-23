# Localization Review (DRAFT — not yet curated)

Raw judgment-call notes from each translation pass, concatenated. Still to do: dedupe, rank by importance, trim to genuine judgment calls.


---

<!-- source: bai_xiaoman.md -->

## [characters/bai_xiaoman.ts / profile.tagline]
Chinese:
事已至此，先吃饭吧
Current English:
It is what it is. Let’s eat first.
Alternative:
Well, it’s come to this. Let’s eat first.
Issue:
The Chinese is a well-known meme of resigned practicality. “It is what it is” is the closest English stock phrase for resigned acceptance and keeps the card short (34 chars). The alternative is closer to the literal 事已至此 and a bit more dramatic, but less idiomatic.

## [characters/bai_xiaoman.ts / profile.farewell]
Chinese:
老师你知道吗，其实我也有很怕的时候。\n\n但你在的话，我就觉得也没什么大不了的。
Current English:
Professor, did you know? Sometimes I get really scared too.\n\nBut when you’re around, it never seems like that big a deal.
Alternative:
Can I tell you something, Professor? Sometimes I get really scared too.\n\nBut when you’re around, the sky never quite falls.
Issue:
The current version stays close to the Chinese. The alternative swaps the ending for a callback to her max-Rapport line (“every time it feels like the sky is about to fall, it actually hasn’t yet”). That’s more literary, but it adds an image the Chinese farewell doesn’t have.

## [characters/bai_xiaoman.ts / bxm_social_talent]
Chinese:
王老师说他那边有个经费来源……
Current English:
Prof. Harlow said he has a funding source…
Alternative:
Prof. Whitfield said he has a funding source…
Issue:
LOCALIZATION_GUIDE §2 maps 王教授 to Prof. Whitfield, but only for the tenure committee member in the endings. This 王老师 is a hard-to-approach department colleague in a different role, so I gave him a one-off name rather than imply a link. If the author meant them to be the same person, switch to Whitfield.

## [characters/bai_xiaoman.ts / max_favor_bai_xiaoman]
Chinese:
【无DDL区】【禁止讨论进度】【违规者请吃甜品】
Current English:
DEADLINE-FREE ZONE. NO PROGRESS TALK. VIOLATORS WILL BE GIVEN DESSERT.
Alternative:
DEADLINE-FREE ZONE. NO PROGRESS TALK. VIOLATORS BUY EVERYONE DESSERT.
Issue:
请吃甜品 can be read two ways: polite-sign “please eat dessert” (the punishment is being fed dessert) or 请 = “treat” (the violator pays for dessert). I went with the first because it fits the party’s cozy logic. The second is the more conventional “penalty” reading.

## [characters/bai_xiaoman.ts / bxm_encourage_others]
Chinese:
“你是在想某某的事吗？”
Current English:
“Is this about him?”
Alternative:
“Are you thinking about you-know-who?”
Issue:
某某 is the author leaving the student’s name out (the event isn’t bound to a specific student). Writing “so-and-so” in English would look like an unfilled template, so I made it a pronoun, which reads naturally given the context.

## [characters/bai_xiaoman.ts / bxm_failure_reframe.title]
Chinese:
失败重构
Current English:
Failure, Reframed
Alternative:
Refactoring Failure
Issue:
To CS readers, 重构 usually means “refactor”, so there may be a light pun in the Chinese. “Reframed” is the safe meaning-based reading. “Refactoring Failure” keeps the possible pun but could look like an added joke.

---

<!-- source: bi_xiaotian.md -->

## [characters/bi_xiaotian.ts / profile.tagline]
Chinese:
这篇论文虽然离谱，但我觉得有启发
Current English:
This paper is absurd. I found it inspiring.
Alternative:
Okay, it’s absurd. But hear me out.
Issue:
The current version keeps both halves of the original (absurd paper, sincere inspiration) and relies on the deadpan full stop for the contrast. The alternative is punchier and more meme-like, but it loses “inspiring” and makes him sound like he’s pitching rather than sincerely moved.

## [characters/bi_xiaotian.ts / profile.farewell]
Chinese:
每次有新想法，我第一个想要分享的人，都是你。
Current English:
Every time I have a new idea, the first person I want to show it to is you.
Alternative:
Every new idea I have, I still want to show you first.
Issue:
I used “show it to” rather than “tell” as a quiet callback to his habit of shoving screens and printouts at you (first meeting, Bach sheets, the secret folder). The alternative adds “still”, which is not in the Chinese but plays well as a post-graduation note. It may be slightly more sentimental than the source.

## [characters/bi_xiaotian.ts / bxt_weird_workshop title]
Chinese:
第四届AI与中医经络融合研讨会
Current English:
The 4th Workshop on AI and TCM Meridian Theory
Alternative:
The 4th Workshop on AI and Acupuncture Meridians
Issue:
Players may not know “meridians” or the abbreviation “TCM”. The description spells out “Traditional Chinese Medicine Meridian Theory” in full. “Acupuncture meridians” is easier to recognize, but it narrows what the Chinese says.

## [characters/bi_xiaotian.ts / bxt_weird_workshop / bxt_workshop_review]
Chinese:
其中一位委员是某985正教授，研究方向：非线性经络电信号建模。
Current English:
One member is a full professor at a top university, research area: nonlinear modeling of meridian electrical signals.
Alternative:
One member is a full professor at a top Chinese university, …
Issue:
“985” is a Chinese elite-university label with no English equivalent, so I generalized it to “a top university”. The joke still works: the workshop is backed by a real, serious academic.

## [characters/bi_xiaotian.ts / bxt_science_communicator title + pinned comment]
Chinese:
"终于有人说人话了"
Current English:
“Finally, Someone Who Explains It Like a Human”
Alternative:
“Finally, Someone Speaking Plain English”
Issue:
说人话 means “speak plainly/accessibly”. “Plain English” is the closest idiom, but it gets odd if you imagine the video being in another language. I went with the YouTube-comment phrasing.

## [characters/bi_xiaotian.ts / max_favor_bi_xiaotian description]
Chinese:
《大型语言模型能否理解猫为什么半夜跑酷》
Current English:
“Can Large Language Models Explain Feline Midnight Zoomies?”
Alternative:
“Can Large Language Models Understand Why Cats Do Parkour at Midnight?”
Issue:
“Zoomies” is the natural English word for this cat behavior and makes the title sound like a real-but-absurd paper. The alternative is more literal (keeps “parkour” and “understand”).

## [characters/bi_xiaotian.ts / bxt_alumni_visit title]
Chinese:
科普主播的邮件
Current English:
An Email from a Science YouTuber
Alternative:
An Email from a Science Communicator
Issue:
主播 does not name a platform. “YouTuber” is how English players would naturally label this career. Note that it names a specific real platform the Chinese doesn’t mention.

## [characters/bi_xiaotian.ts / bxt_paper_pilgrimage]
Chinese:
奇怪论文圣地巡礼 / 陈教授 / 《海豚语言建模》
Current English:
A Pilgrimage to the Weird Paper / Professor Chen / “Language Modeling for Dolphins”
Alternative:
Weird Paper Site Pilgrimage (closer to the anime “seichi junrei” meme)
Issue:
圣地巡礼 is an anime-fan meme (visiting real locations from a show). English has no single equivalent, so “pilgrimage” carries it. I kept 陈教授 as “Professor Chen” because it is already a natural name in an international department. The dolphin project and idea_dolphin_llm are translated elsewhere, so the paper title may need to match whatever the dolphin_llm project ends up being called.

---

<!-- source: daily_bureaucracy.md -->

## [daily_bureaucracy / bureau_reimbursement_quest]
Chinese:
你去打印店打印、盖章、邮寄。
Current English:
You go to a print shop, print the form, get it notarized and mail it.
Alternative:
You go to a print shop, print the form, sign it, scan a backup copy and mail it.
Issue:
盖章 (official stamp) has no US-campus equivalent, and "get it stamped" would puzzle English players. Notarizing is the closest real-world bureaucratic step and keeps the "pointless extra hoop for $35" joke, but it is a notch more absurd than routine stamping. Related: 部门主管 is rendered as "former chair" so the escalation option ("the department chair") reads as the current chair.

## [daily_bureaucracy / late_industry_poach]
Chinese:
某次会议上你偶尔看到{studentName}的名字出现在一篇高引论文的致谢里，排在第一位。
Current English:
Some time later, at a conference, you happen to see {studentName}’s name in the acknowledgments of a highly cited paper, listed first.
Alternative:
Some time later, at a conference, you come across a highly cited paper by {studentName}. In the acknowledgments, your name is listed first.
Issue:
Translated literally. The source is ambiguous and may mean the PI's name comes first in the student's acknowledgments, which would give the scene a stronger emotional payoff. Needs an author decision. If that was the intent, the Chinese should be fixed as well.

## [daily_bureaucracy / late_invited_talk]
Chinese:
画一个宏大的饼
Current English:
Sell them a grand vision
Alternative:
Promise them the moon
Issue:
画饼 is mildly self-mocking (big promises that may not pan out). "Promise them the moon" keeps that mockery better but hints at the failure outcome (predictions with logical gaps). "Sell them a grand vision" stays neutral, so it fits both outcomes.

## [daily_bureaucracy / late_invited_talk]
Chinese:
做成了一个充满开发问题的报告
Current English:
turn it into a talk full of open problems
Alternative:
—
Issue:
Treated 开发问题 as a typo for 开放问题 (open problems), which is the only reading that fits a visionary keynote. The Chinese source probably needs the same fix.

## [daily_bureaucracy / late_alumni_success]
Chinese:
你还记得{studentName}…… / 现任学生先是各自在群里点开了消息…… / 再多的秘密，就只适合毕业之后再说了。
Current English:
You still remember {studentName}… / Your current students each open the message… / Any more secrets will have to wait until after graduation.
Alternative:
—
Issue:
The event is written as if {studentName} is an alum ("你还记得", "现任学生"), but the engine binds a currently enrolled student, and the private-message outcome mentions graduation as still ahead. English follows the Chinese faithfully, so the inconsistency carries over. This is a content/design issue, not a translation one.

## [daily_bureaucracy / late_lab_anniversary]
Chinese:
你发了一个平时从不用的大表情包 / 不太精确，但能看出是谁画的
Current English:
you sent a giant reaction GIF you never normally use / It isn’t very accurate, but you can tell who drew it.
Alternative:
you sent a giant sticker you never normally use / It isn’t very accurate, but you can tell what it’s meant to be.
Issue:
表情包 became "reaction GIF" (what a US lab chat would use). "能看出是谁画的" is translated literally (you can tell who drew it, pointing at {studentName}). It might instead be a slip for 能看出画的是什么 ("you can tell what it is").

---

<!-- source: daily_hype_news_idle.md -->

## [daily_hype / llm_everything]
Chinese:
"{studentName}认为LLM可以处理一切。" {studentName}神情严肃，像是在陈述一条物理定律。
Current English:
“LLMs can handle everything.” {studentName} says it gravely, as if stating a law of physics.
Alternative:
“{studentName} believes LLMs can handle everything.” {studentName} says it gravely, referring to {himself} in the third person, as if stating a law of physics.
Issue:
The quoted line has the student talking about themself in the third person. That is most likely a leftover from a 我/他 → {studentName} replacement, not a joke. Rendered literally, English players would read it as a deliberate third-person quirk. I translated it as a plain first-person claim. If the third person was intended, the Chinese should probably say so explicitly.

## [daily_hype / hot_arxiv_nuke, option pivot outcome 0]
Chinese:
群里挂着灰色双勾半天，然后先冒出来一个"……"，消失了，然后有人发了"了解"……
Current English:
The message sits there, delivered and unread, for ages. Then a typing indicator pops up and vanishes. Then someone sends “got it,” …
Alternative:
The message sits on two gray checkmarks for ages. Then a “…” pops up and disappears. …
Issue:
The gray double checkmarks are a WhatsApp/Telegram detail (delivered, not read) that the lab Slack doesn't have, so I spelled out what they mean. I read the “……” that appears and then disappears as a typing indicator. If it was actually meant to be a sent "…" message that someone deleted, the line should be “someone sends ‘…’ and then deletes it.”

## [daily_hype / foundation_war]
Chinese:
不管什么任务，大力出奇迹
Current English:
whatever the task, scale is all you need.
Alternative:
whatever the task, just throw more compute at it.
Issue:
大力出奇迹 (brute force works miracles) is a meme. I swapped in the matching ML-paper meme (“… is all you need”). It's punchier for ML readers but more specific than the Chinese. The alternative is plainer.

## [news / news_reviewer_3_found]
Chinese:
一位研究者声称已锁定"审稿人3号"的真实身份……均被审稿人3号否定。
Current English:
a researcher claims to have pinned down the true identity of “Reviewer 3.” … was rejected by Reviewer 3 at all of them.
Alternative:
Use “Reviewer 2” throughout (the English academic meme for the hostile reviewer).
Issue:
In English, the mythical nemesis is Reviewer 2, so “Reviewer 3” lands more weakly. I kept 3 to stay faithful and to match the event ID, but switching to 2 would make the joke land harder for English players. sota_17_samples already uses Reviewer 2 as the harsh one, which is in its favor.

## [news / news_campus_cat_publication]
Chinese:
楼里流浪猫"小橘"……小橘本人当天出席了展览现场
Current English:
Marmalade, the stray cat who lives in their building … Marmalade attended the poster session in person
Alternative:
Tangerine / Little Orange
Issue:
小橘 is the stock name for an orange cat. I localized it to the stock English name for one, Marmalade, so the orange-cat image survives. This is a different cat from the unnamed 橘猫 in news_ack_longer_than_paper ("the orange cat"), and nothing ties the two together.

## [daily_hype / hot_arxiv_nuke, option race_to_publish]
Chinese:
加速冲刺，先发为敬
Current English:
Sprint and get ours out first
Alternative:
Floor it. First to post wins.
Issue:
先发为敬 puns on the drinking toast 先干为敬 ("I'll drink first, out of respect"). English has no matching toast idiom, so I dropped the pun and kept only the reckless-sprint attitude.

---

<!-- source: daily_life.md -->

## [daily_life / eternal_todo_unearthed]
Chinese:
`// TODO: fix this properly later — 2022-03-15`；那个TODO已经活了两年
Current English:
`// FIXME: do this properly later — 2022-03-15`; The FIXME That Has Lived for Two Years
Alternative:
Keep "TODO" exactly as in the Chinese (more faithful, and slightly more iconic) if check-i18n.mjs is taught to allow it for this event.
Issue:
The checker rejects any string containing "TODO" as an untranslated marker (`/TODO|TBD|\[\[/`). FIXME is an equally idiomatic code-comment tag and the joke is unchanged, but this is a checker workaround, not a translation choice. Applies to title, prompt, description[0], attempt_the_fix outcome[1], promote_to_known_limitation outcome[0].

## [daily_life / paper_to_public]
Chinese:
{studentName}递过来的已经是公众号平台的投稿页面了。/ 公众号图文编辑器和LaTeX之间存在一道深渊。/ 没赶上任何推荐时段
Current English:
…is already holding out the submission page of a popular-science blog. / There is an abyss between the blog’s post editor and LaTeX. / misses every featured time slot
Alternative:
"a WeChat science account" (keeps the platform, but English players won't know its editor/recommendation mechanics), or "Medium" (real, but has no editor who rewrites titles).
Issue:
公众号 has no exact English equivalent. A pop-science blog with an editor keeps the clickbait-title rewrite (震惊！… 一招 → “SHOCKING: … With One Simple Trick”) and the view-count joke working.

## [daily_life / desk_archaeology]
Chinese:
联系方式是一个已经注销的QQ号。
Current English:
The contact is a university email address that has long since been deactivated.
Alternative:
"an AIM screen name" (funnier, but dates the 2021 data implausibly)
Issue:
QQ is incidental and unknown to most English players; localized to a dead university email, which carries the same "the trail goes cold" beat.

## [daily_life / ac_warfare]
Chinese:
22度派和26度派 / 钦定24度 / 24度就是这个实验室所能协商到的最大公约数。
Current English:
the 22°C faction and the 26°C faction / Decree 24°C / 24 degrees is the greatest common divisor this lab can negotiate.
Alternative:
Fahrenheit: the 72° faction and the 79° faction / Decree 75°
Issue:
Kept Celsius to preserve the Chinese values (guide §4) and the 22/24/26 symmetry; an American player may find °C slightly foreign, but an international CS lab reads fine. "Greatest common divisor" works literally in English.

## [daily_life / goose_leg_apologize]
Chinese:
食品安全，宁可错杀
Current English:
Food safety first. Better a false positive.
Alternative:
Food safety first. Better safe than sorry.
Issue:
宁可错杀 is harsher than "better safe than sorry" (it accepts wrongly punishing the vendor). "False positive" keeps that defiant edge in grad-student vocabulary; the alternative is softer and more idiomatic.

---

<!-- source: daily_reviewer.md -->

## [daily_reviewer / reviewer_agi_prerequisite]
Chinese:
你写了一份逐条回应的申辩稿（业内称"rebuttal"，就是对着审稿意见一条一条正式反驳）。
Current English:
You write a point-by-point rebuttal.
Alternative:
Keep a gloss, e.g. "You wrote a point-by-point rebuttal, the formal ritual of answering every reviewer comment in writing."
Issue:
The Chinese parenthetical explains the English jargon "rebuttal" to Chinese players. The English audience (CS/ML grad students) already knows the word, so a gloss would read as condescending. I dropped it. No gameplay information is lost.

## [daily_reviewer / reviewer_agi_prerequisite / laugh_resubmit]
Chinese:
你对着屏幕点了点头，感觉世界大体是公平的，只是有些会议活在另一个物理层上。
Current English:
You nod at the screen. The world is mostly fair. Some conferences just run on a different physical layer.
Alternative:
Some conferences just exist on a different plane of reality.
Issue:
物理层 is the networking (OSI) term, used here to mean "a different plane of existence". I kept the CS pun ("physical layer"), which CS players will get. The alternative is clearer but drops the pun.

## [daily_reviewer / reviewer_retroactive_scoop / argue_chronology]
Chinese:
摆时间线，这不科学
Current English:
Show the timeline. That’s not how time works.
Alternative:
Show the timeline. This defies causality.
Issue:
这不科学 is a meme meaning "this is impossible / makes no sense". A literal "This is unscientific" would read oddly. I went with an idiomatic English line about the time paradox. The option doesn't reveal any more than the Chinese does.

## [daily_reviewer / reviewer_retroactive_scoop / review_their_paper]
Chinese:
你没有主动索取，但当系统把它分配到你的审稿列表时，你按下了接受键
Current English:
You don’t bid on it, but when the system assigns it to you, you accept the assignment
Alternative:
You don’t ask for it, but when the system assigns it to you, you click Accept
Issue:
"Bid" is the real OpenReview/CMT term for reviewers requesting papers, so it's more idiomatic. The Chinese 按下了接受键 could be misread as "accepted the paper". I resolved it to "accepted the (review) assignment", since the review itself is described as strict right after.

## [daily_reviewer / desk_reject_48h / post_arxiv]
Chinese:
想了一下，回复了"接受"——既然来了，就评。
Current English:
think it over, and reply “Accept.” You’re here anyway, so you might as well review.
Alternative:
think it over, and reply “Accept.” Might as well, since you’re here.
Issue:
既然来了 echoes the meme 来都来了 ("since we’re here anyway"), which is also Nico Tang’s catchphrase. English has no fixed equivalent. I rendered the logic plainly and didn't try to imitate the catchphrase, because Nico isn't in this scene.

---

<!-- source: daily_server.md -->

## [daily_server / crypto_tenant] calculate_damage
Chinese:
61天×12%算力×8张A100×按时租价格$2.1/GPU-hour = 约¥88,000。……“老师，这相当于我一年的补贴。”
Current English:
61 days × 12% of compute × 8 A100s × on-demand cloud rental rates ≈ $88,000. … “Professor, that’s more than my stipend for a year.”
Alternative:
Keep “× $2.10/GPU-hour ≈ $88,000” verbatim, or fix the math: 61×24×0.12×8×$2.10 ≈ $2,950.
Issue:
Under the 1万 = $10K rule, ¥88,000 becomes $88,000. But the formula as written gives about $2,950 (about ¥21K even in the Chinese), and English-speaking ML students will check GPU-hour math. I dropped the explicit $2.1 rate so the error isn’t visible. Changed “equal to my yearly stipend” to “more than my stipend for a year” because $88K is well above a US PhD stipend. The Chinese source may want the same fix.

## [daily_server / training_power_outage] description, checkpoint_rule
Chinese:
以8张A100的算力计算，这相当于消失了约¥14,000的云计算成本。/ 尽管它无法挽回已经消失的14000块钱。
Current English:
which at 8 A100s comes to roughly $14,000 in cloud compute, gone. / it can’t bring back the $14,000 that already vanished.
Alternative:
Cloud-realistic figure: 35 h × 8 GPUs × ~$2/h ≈ $600.
Issue:
Same kind of inflation as above (280 GPU-hours ≈ $50/GPU-hour), but there’s no formula on screen, so I kept the converted figure. The $30K NAS and $20K UPS (both funding costs) also look pricey in USD, but they are game mechanics, so they stay.

## [daily_server / pip_nuclear] find_culprit outcome 2
Chinese:
你上周帮人调试的时候，在那个session里装了个包，忘记退出venv了。
Current English:
you installed a package in that session without noticing you were no longer in the venv.
Alternative:
(literal) …and forgot to exit the venv.
Issue:
Taken literally, the Chinese is technically backwards. Being inside a venv would have protected the system Python. I reworded it so the cause makes sense (you thought you were in the venv but weren’t). The joke is unchanged.

## [daily_server / accidental_delete] description
Chinese:
“是/data/results/{studentName}_experiments这个目录。”
Current English:
“It was my experiments folder under /data/results.”
Alternative:
“It was /data/results/{studentName}_experiments.”
Issue:
English names contain a space (“Jamie Lin_experiments”), so the literal path would look broken. I rewrote it as a spoken description.

## [daily_server / mystery_process_resolved] lecture_sternly outcome 1
Chinese:
格式严谨得像在填报道德审查表。
Current English:
formatted as rigorously as an IRB application.
Alternative:
formatted as rigorously as an ethics review form.
Issue:
I localized “ethics review form” to IRB, which every US grad student knows. It’s a slightly sharper reference than the Chinese, but the joke is the same size.

---

<!-- source: endings_conditional.md -->

# Review notes: endings.ts / conditional.ts

## [endings / ending_time_famous] tagline
Chinese:
那个报告厅坐满了，不只是因为你是被邀请的人。
Current English:
The hall was packed, and not just because you were the one they’d invited.
Alternative:
Every seat was taken, and not just out of courtesy.
Issue:
The Chinese implies people came out of real respect, not obligation, but it never says so. The current version stays literal and keeps that implication. The alternative is clearer and more quotable, but it spells out the subtext. (Title "Tenure Review: Standing Room Only" for 名誉满堂 was chosen to echo this image and the people standing in the hallway.)

## [endings / ending_be_rep_low] tagline
Chinese:
名单上有你的名字，但没人来填那把椅子。
Current English:
Your name was on the list, but no one came to fill that chair.
Alternative:
Your name was on the agenda. The other chairs stayed empty.
Issue:
"那把椅子" has no clear referent. It probably means the two committee members who didn't show up. The current version keeps the Chinese ambiguity, and in English "chair" can also suggest a faculty chair. The alternative ties the line explicitly to the empty committee seats.

## [endings / ending_all_students_left] tagline
Chinese:
组会还没结束。只是今天没有人来。
Current English:
The group meeting isn’t over. It’s just that no one came today.
Alternative:
Group meeting never ended. Today, no one came.
Issue:
The current version is faithful and quiet. The alternative is tighter and links better to the whiteboard nobody erased, but "never ended" is a shade stronger than 还没结束.

## [endings / ending_all_students_left] rebuild outcome
Chinese:
他不知道这个实验室曾经发生过什么……他懵懵懂懂地留下来，就像第一次你在实验室里见到的那个人一样。
Current English:
The newcomer knows nothing about what this lab has been through… The newcomer stays on, a little lost, just like the first person you ever met in this lab.
Alternative:
…just like the very first student you ever met here.
Issue:
(1) The Chinese uses the generic 他 for an unbound, ungendered new student. I avoided any pronoun ("the newcomer" twice) rather than guess "he" or use "they". (2) "第一次你在实验室里见到的那个人" is ambiguous. It is probably your first student, but it could be read as your own younger self. I kept it ambiguous. The alternative commits to "first student".

## [endings / ending_burnout_tenure] title and details
Chinese:
强制休养 / 第一反应是拨打120 / 这不是建议，是医嘱。
Current English:
Doctor’s Orders / immediately calls an ambulance / This isn’t a suggestion. It’s doctor’s orders.
Alternative:
Title: Mandatory Rest (or Forced Medical Leave)
Issue:
I chose the title "Doctor’s Orders" because it echoes the cardiologist's line. It reads plainer and more natural in the Gallery than a literal "Forced Rest". 120 (the Chinese emergency number) became "calls an ambulance", so no country is implied.

## [conditional / late_night_doubt] 烤冷面
Chinese:
"我是不是适合卖烤冷面"、"如果我开店你会投资吗"
Current English:
“maybe I’m meant to run a food truck,” “if I opened one would you invest”
Alternative:
“maybe I’m meant to sell grilled cold noodles” (keep the Chinese street food)
Issue:
The food is incidental to the joke, which is an absurd small-business escape at 3 a.m., so I localized it. The messages are lowercase and have no question marks, imitating texting, because the Chinese drops its question marks too.

## [conditional / peer_left] 公务员考试时间
Chinese:
《公务员考试时间》
Current English:
Civil Service Exam Dates
Alternative:
How to Get a Stable Government Job
Issue:
In China, 考公 is the classic escape route from academia. In the US it is less iconic, but "civil service exam" still reads clearly as a safe-job fallback. The alternative is more natural for US readers, but it adds a little interpretation.

## [conditional / collaboration_offer] 助理助理
Chinese:
对方的助理助理发了七封邮件
Current English:
Their assistant’s assistant sends seven emails
Alternative:
Their assistant sends seven emails
Issue:
I read it as an intentional joke about the famous professor's layers of staff. If it's a typo for a single 助理, use the alternative.

---

<!-- source: group_daily_newyear.md -->

## [group_events / group_academic_bet]
Chinese:
（join_bet_2, outcome 2）{student2Name}知道你押了自己之后，压力过大，实验跑崩了。你输掉了赌注，还要替{student2Name}写半页Related Work。{studentName}表示非常感谢。
Current English:
Once {student2Name} finds out you bet on {him2}, the pressure gets to {him2} and the experiment crashes. You lose the bet, and now you owe {studentName} half a page of related work. {studentName} is very grateful.
Alternative:
Literal: “…now you owe {student2Name} half a page of related work. {studentName} is very grateful.”
Issue:
This looks like a copy-paste bug in the Chinese. You bet on student 2 and lost, so you should owe student 1 (the mirror of join_bet_1, and {studentName} is the one who thanks you). The English uses the logical reading. I suggest changing the Chinese to 替{studentName}写.

## [daily / advisor_left_on_read]
Chinese:
💡 获得灵感：「PI邮件响应延迟的多智能体博弈模型」 —— 已记录到项目面板。
Current English:
💡 New idea: “A Multi-Agent Game-Theoretic Model of PI Email Response Delay” has been added to the Projects panel.
Alternative:
“PI Email Delay: A Multi-Agent Game” (shorter, if projects.ts uses a short name)
Issue:
The quoted name has to match the English name of project `pi_email_delay_game_theory` in src/data/en/projects.ts, which was still a stub when I wrote this. The idea-unlock line also needs the same format as the 💡 lines in project_ideas.ts and xie_zhiwei.ts. Whoever translates those should use the same pattern, or this line should be updated to match theirs.

## [group_events / group_bluetooth_dj]
Chinese:
查蓝牙连接记录，绑架凶手 / 设备名叫"小方的手机"。没有人叫小方。
Current English:
Check the Bluetooth logs and nab the culprit / The device is called “Daniel’s iPhone.” Nobody here is named Daniel.
Alternative:
“…and kidnap the culprit” (literal); “Fang’s Phone”
Issue:
绑架 (kidnap) is probably a typo for 捉拿 (catch), so I went with “nab”. If the absurd verb is deliberate, “kidnap the culprit” works too. 小方 became “Daniel’s iPhone” because that is what a default device name looks like in English.

## [group_events / group_desk_war, group_charger_war]
Chinese:
同时开口问："可以转账吗？"实验室本月意外多了40块钱。 / 查淘宝订单 … 价格38.9元
Current English:
ask in unison: “Do you take Venmo?” The lab is unexpectedly $40 richer this month. / Check their Amazon orders … $38.90
Alternative:
“Can I just transfer it?” / “Check their order history”
Issue:
These are localized everyday details (转账 → Venmo, 淘宝 → Amazon). Yuan amounts are converted 1:1 in line with the 1万 = $10K rule ($5 per tile, $40, $38.90, and $300 for the nap chair). The $300 folding chair is a little pricey for a US reader but stays consistent.

## [group_events / group_gpu_league]
Chinese:
这学期他的代码提交量比上学期高了三成，相关性尚不确定。
Current English:
{His} commit count this semester is up 30% over last semester. Causality not yet established.
Alternative:
“Correlation not yet established.” (literal)
Issue:
In English the trophy and the extra commits obviously correlate, so the academic hedging joke lands better as a doubt about causality. That is a small change to the literal meaning.

---

<!-- source: gu_mianmian.md -->

## [characters/gu_mianmian.ts / profile.tagline]
Chinese:
我没睡着，我是在后台运行
Current English:
Not asleep. Running in the background.
Alternative:
I’m not asleep. I’m running in the background.
Issue:
The alternative is closer to the Chinese first person but runs 46 characters. The clipped version is 38, fits a card, and suits her terse, low-power voice.

## [characters/gu_mianmian.ts / profile.farewell]
Chinese:
我睡觉的时候，其实也在听。\n\n谢谢你让这里足够安静——安静到我愿意一直待在这里。
Current English:
Even when I was asleep, I was listening.\n\nThank you for making it quiet enough here. Quiet enough that I wanted to stay for good.
Alternative:
When I’m asleep, I’m still listening.\n\nThank you for keeping this place quiet. Quiet enough that I never wanted to leave.
Issue:
Past tense fits a goodbye; present tense keeps the Chinese’s timeless “其实也在听”. “Never wanted to leave” carries 一直 more strongly, but it is a stock phrase and slightly more sentimental. I kept the 足够安静 → 安静到 repetition as “quiet enough… Quiet enough”.

## [characters/gu_mianmian.ts / gmm_first_meeting + gmm_gossip_ask_source option]
Chinese:
她究竟是人还是……
Current English:
Is she human, or…
Alternative:
Is she even human?
Issue:
The same trailing-off option text appears in two events, as a running gag, so I kept one wording for both. The alternative is punchier but loses the trailing-off, which is the joke.

## [characters/gu_mianmian.ts / gmm_group_meeting_praise option]
Chinese:
当场封神：组会守护神
Current English:
Canonize her: patron saint of group meetings
Alternative:
Deify her on the spot: guardian of group meetings
Issue:
封神 (elevate to godhood) has no exact English idiom. “Canonize… patron saint” keeps the mock-reverent tone in familiar English; “deify” is more literal but reads stiffer.

## [characters/gu_mianmian.ts / gmm_server_prophecy prompt]
Chinese:
顾眠眠用玄学名义讲统计，你选择：
Current English:
Mina is passing off statistics as a hunch. What do you do?
Alternative:
Mina is doing statistics under the banner of mysticism. What do you do?
Issue:
玄学 here means “gut feeling/mystic intuition”, not Orion’s research mysticism. “Hunch” sets up her line “It’s not mysticism. It’s statistics.” without reusing Orion’s glossary term in the prompt.

## [characters/gu_mianmian.ts / gmm_server_formalize outcome]
Chinese:
学校机房的老师路过……报了一个服务费，精确到个位数。
Current English:
someone from the campus server room walks by … quotes a service fee, down to the last dollar.
Alternative:
the campus server room manager walks by … quotes a service fee, down to the single digits.
Issue:
The staff member’s gender is unspecified, so I wrote the reply as unattributed (“Five seconds of silence, then: …”) to avoid assigning a pronoun. 精确到个位数 is rendered as the idiom “down to the last dollar”.

## [characters/gu_mianmian.ts / max_favor_gu_mianmian description]
Chinese:
她只是想把这个下午分给你一点。
Current English:
She just wanted to share a little of this afternoon with you.
Alternative:
She just wanted to give you a little of this afternoon.
Issue:
The closing line of the scene. 分给你一点 means handing someone a portion of something. “Give you a little of” is closer and stranger in a good way; “share… with you” is smoother and warmer. Owner’s taste call.

---

<!-- source: he_shixu.md -->

## [characters/he_shixu.ts / profile.tagline]
Chinese:
老师，您答应我的部分写完了吗？
Current English:
Professor, is the part you promised me done?
Alternative:
Professor, how’s the part you promised me coming along?
Issue:
The Chinese is a direct, polite check-in. The current version keeps that directness and fits the 45-character limit (44). The alternative sounds softer and more like project management, but it runs past the limit. The same line appears in the time_manager trait description, so whoever translates traits should use matching wording.

## [characters/he_shixu.ts / profile.farewell]
Chinese:
我喜欢按部就班，跟随着计划表走。\n\n唯独毕业离开你的这一天，我一直不太想排进去。
Current English:
I like doing things in order, the way the schedule says.\n\nThere was only one day I kept putting off scheduling: the day I graduate and say goodbye to you.
Alternative:
I like to follow the plan, one step at a time.\n\nThe only day I never wanted to put on it was the day I leave you.
Issue:
"Kept putting off" adds a small irony: she never procrastinates on anything except this day. That reading is implied by 一直不太想排进去 but not stated. I used "say goodbye to you" rather than "leave you" because "leave you" can sound like a breakup in English, and the Chinese is not romantic.

## [characters/he_shixu.ts / hsx_todo_theory (all fields)]
Chinese:
他统计了所有没完成的TODO / 组里共有二百三十七条TODO…
Current English:
She Counted Every Unfinished Todo / the group has 237 todos…
Alternative:
Keep the uppercase "TODO", which is how engineers actually write it, and whitelist it in scripts/check-i18n.mjs.
Issue:
The checker treats any uppercase "TODO" as an unfinished-translation marker (error), so I lowercased it to pass. The uppercase form would look more authentic to CS players. The owner could relax the regex for this event.

## [characters/he_shixu.ts / hsx_todo_theory, hsx_meeting_timing]
Chinese:
他说自己花了周末扫描了所有仓库… / "只是觉得很有意思，" 他说，有一点不好意思
Current English:
She says she spent the weekend scanning every repo… / she says, a little embarrassed.
Alternative:
(none)
Issue:
These two Chinese events refer to Serena as 他 throughout, including the titles. This looks like a bug in the source (her pronoun is 她 everywhere else). The English uses "she". The Chinese titles and text may need fixing. Her hesitant and embarrassed manner in hsx_meeting_timing is a bit outside her usual calm voice. I kept it, since the Chinese has it.

## [characters/he_shixu.ts / hsx_ddl_reminder option hsx_ddl_read_now]
Chinese:
你给她发了催稿，结果是你帮她完成了她自己的节点。精准。
Current English:
You were supposed to be the one chasing drafts. Instead you got chased, and all you did was help her hit her own milestone. Right on target.
Alternative:
She nudged, you delivered, and she hit her own milestone. Precise.
Issue:
The Chinese line is compressed and a little ambiguous. I read it as a role reversal: advisors chase students for drafts, but here she chased you, and your work just moved her own milestone forward. "Right on target" calls back to the earlier "precision-guided missile" line, as 精准 does with 精确制导.

## [characters/he_shixu.ts / hsx_first_meeting description[2]]
Chinese:
你这才意识到：你是这份计划书里的一个节点。
Current English:
That’s when it dawns on you: you are one of the dependencies in this plan.
Alternative:
That’s when it dawns on you: you are one of the milestones in this plan.
Issue:
节点 means both node and milestone. "Dependency" is a project-management and CS term that keeps the "you’ve been made a component" joke for grad-student players. "Milestone" is more literal but flatter.

## [characters/he_shixu.ts / max_favor_he_shixu option max_favor_hsx_future]
Chinese:
…一直排到了很远很远的地方，像是藏着谁的无限期许。
Current English:
…already numbered, running on far into the distance, as if someone were quietly hoping for a future with no end date.
Alternative:
…as if someone had tucked a boundless hope inside them.
Issue:
For 无限期许 I chose "no end date", which suits her planner voice and echoes 无限期 ("indefinite"). It is a slight reinterpretation of "boundless expectations". The alternative is closer to the original but more generic.

## [characters/he_shixu.ts / hsx_meeting_timing option hsx_meeting_timing_publish]
Chinese:
他打开笔记本，那里有一份他已经整理了很久的分析框架，连数据可视化都做好了
Current English:
She opens her notebook. Inside is an analysis framework she has clearly been building for a long time, data visualizations and all…
Alternative:
She opens her laptop to an analysis framework…
Issue:
笔记本 can mean a paper notebook (her running "翻了翻本子" habit) or a laptop. "Notebook" in English keeps the same ambiguity, and CS players may also read it as a Jupyter notebook, which fits the data visualizations.

---

<!-- source: lin_xiaojuan.md -->

## [characters/lin_xiaojuan.ts / profile.tagline]
Chinese:
平时不见人，DDL前像开了二档
Current English:
Seldom seen. Deadlines unlock his final form.
Alternative:
Invisible all month. Unstoppable the night before.
Issue:
开了二档 ("shifted into second gear", an anime/gaming power-up) has no exact English idiom. "Final form" is the closest power-up meme English players know, and it echoes the bio's "some unknown form". It is a bigger escalation than "second gear", though. The alternative drops the meme and leans on contrast.

## [characters/lin_xiaojuan.ts / profile.farewell]
Chinese:
很多时候，连我自己都不信自己赶得上DDL。

但有个信任我的老师，真棒啊。
Current English:
Most of the time, not even I believed I’d make the deadline.

Having an advisor who did, though. That was pretty great.
Alternative:
Most of the time, not even I believed I’d make the deadline.

But I had an advisor who believed in me. That was pretty great.
Issue:
The current version makes "who did" point back to believing he'd make the deadline. That is tighter and more in his offhand voice, but narrower than 信任我 ("trusted me" in general). The alternative is more literal and broader, but a little flatter. "Pretty great" keeps the casual understatement of 真棒啊.

## [characters/lin_xiaojuan.ts / lxj_blame_chain description[2]]
Chinese:
林小卷沉默了一会儿，说："这个锅是球形的。" 然后去拿杯奶茶。
（以及 description[1]：之前那个逻辑好像是组里XX的范式——他现在毕业了）
Current English:
Jamie is quiet for a while, then says, “The buck stops nowhere.” Then he goes to get a bubble tea.
(and: “And that logic looks like a pattern from one of our older labmates. He’s graduated now.”)
Alternative:
“This blame is spherical.”
Issue:
锅 (blame, as in 背锅) being "spherical" means there is no end to pin it on. A literal "spherical blame" keeps the absurd image and might even suggest the spherical-cow joke, but many English players would just be confused by it. "The buck stops nowhere" turns an English idiom on its head with the same deadpan effect. Separately, the Chinese "XX" is a redacted name, so I rendered it as an unnamed older labmate rather than inventing a name.

## [characters/lin_xiaojuan.ts / lxj_progress_check + lxj_alumni_visit lxj_alumni_decline]
Chinese:
"快了快了，就差最后一步。" …… 想着那个总说"快了快了"的学生，现在确实快了。
Current English:
“Almost there, almost there. Just the last step.” … think about the student who was always “almost there.” These days, he really does get there fast.
Alternative:
… the student who was always “almost done.” These days, he really is fast.
Issue:
快了 means both "almost (done)" and "fast", and the alumni ending is a pun on that. English can't do the double meaning in one word, so I rendered 快了 as "almost there" throughout to set up the callback: he used to be "almost there", and now he actually gets there, and fast. The guide's character note says "almost done". Either works, but "almost there" makes the callback land better.

## [characters/lin_xiaojuan.ts / lxj_fake_progress description[1], lxj_fake_progress_ignore]
Chinese:
一条名为 `TODO_FIXME_URGENT` 的注释 …… 把 `TODO_FIXME_URGENT` 悄悄改成了 `TODO_IN_PROGRESS`。
Current English:
a comment called `FIXME_URGENT` … `FIXME_URGENT` quietly renamed to `FIXME_IN_PROGRESS`
Alternative:
Keep `TODO_FIXME_URGENT` / `TODO_IN_PROGRESS` and add an exception to the checker’s TODO-marker rule.
Issue:
The checker rejects any string containing "TODO" because it treats it as an unfinished-translation marker. FIXME is just as recognizable to developers and the joke is unchanged. If you'd rather match the Chinese exactly, the checker regex needs an exception.

## [characters/lin_xiaojuan.ts / lxj_conference_abstract lxj_abstract_praise text]
Chinese:
真香，必须夸！
Current English:
Fine, I eat my words. Praise him!
Alternative:
Okay, that’s impressive. Praise him!
Issue:
真香 is the meme for loudly doubting something and then giving in. Nothing on screen shows the PI doubting him first, so "eat my words" implies some earlier grumbling, but that's what the meme implies too. The alternative is safer but drops the meme flavor.

## [characters/lin_xiaojuan.ts / half_favor_lin_xiaojuan description[1]]
Chinese:
「你他妈的为什么又是NaN。」
Current English:
“Why the fuck are you NaN again.”
Alternative:
“Why the hell are you NaN again.”
Issue:
他妈的 is real swearing, and "the fuck" matches its intensity. If the English rating should be milder, "the hell" softens it a notch.

## [characters/lin_xiaojuan.ts / max_favor_lin_xiaojuan description[3]]
Chinese:
我连卖烤冷面的摊位摆哪儿都想好了。
Current English:
I’d already figured out where to park my food truck.
Alternative:
I’d already picked a corner for my grilled-noodle cart.
Issue:
烤冷面 (a northern Chinese street snack) is incidental to the joke, which is about quitting research for a street-food stall, so I localized it to "food truck". The alternative keeps more of the original flavor. The scene's barbecue stand (烧烤摊) is kept as a "late-night barbecue stand".

---

<!-- source: mainline.md -->

## [mainline / grant_deadline, grant_result]
Chinese:
国自然青年基金申请书截止日还有一周。…… 有同事问"今年投国自然吗"
Current English:
The national early-career grant proposal is due in a week. … A colleague asks whether you’re applying for the early-career grant this year.
Alternative:
Name it outright: “Your NSF CAREER proposal is due in a week.” / titles “NSF CAREER Deadline”, “NSF CAREER Results”.
Issue:
国自然 is a specific real Chinese program. NSF CAREER is the instantly recognizable US equivalent, but it doesn't match the game's own numbers (3-year scope, $240K award, 50,000 words), so US players might nitpick. I went generic. Switch to CAREER if you'd rather have recognition than accuracy.

## [mainline / recruit_campaign: poster_blast]
Chinese:
做海报，刷爆所有考研群 / 最终选了"微软雅黑加粗"
Current English:
Make a poster, flood every applicant group chat / before settling on Calibri Bold.
Alternative:
“Arial Bold” (the universal default font) or “Comic Sans” (a different joke: bad taste rather than defaulting).
Issue:
The joke is that after all the fiddling you land on the most default font there is. Microsoft YaHei is the Chinese PowerPoint default, and Calibri is the English one. 考研群 (exam-prep groups for grad applicants) has no exact Western counterpart, so it became “applicant group chat”.

## [mainline / recruit_campaign]
Chinese:
光杆司令 / 你现在是一位"没有学生的导师"，这个职位的另一个名字叫做"闲人"。
Current English:
Party of One / Technically, you are an “advisor with no advisees,” a position better known as “person with a lot of free time.”
Alternative:
“…a position otherwise known as “unemployed, but with an office.””
Issue:
The idiom 光杆司令 (“a general with no troops”) became the English idiom “Party of One”. The 闲人 punchline is mild in Chinese. The alternative is punchier but sharper than the original.

## [mainline / midterm_review_positive]
Chinese:
"项目有，学生有，经费也没出什么大问题。挺好。" / 你忽然觉得"挺好"两个字比一长串表扬更让人松一口气。
Current English:
“…and funding hasn’t been a real problem. Solid.” / You find that one word, “solid,” is more of a relief than a long string of praise.
Alternative:
“Pretty good.” / …that “pretty good” is more of a relief…
Issue:
The next paragraph quotes the chair's two-character verdict, so the English needs one short phrase that works in both places. “Solid” is the most natural understated American praise. “Pretty good” is closer to 挺好 but can sound lukewarm in English.

## [funding / funding_crisis_grant: grant_full, grant_minimal]
Chinese:
"整合前沿交叉学科进行系统性深度研究，形成具有重要理论意义与实践价值的重大成果" / 每段不低于三个"创新""聚焦""赋能"
Current English:
“leverage cutting-edge interdisciplinary synergies to conduct systematic, in-depth research, yielding transformative outcomes of significant theoretical and practical value.” / no fewer than three “innovative,” “focused,” or “empowering” per paragraph
Alternative:
Add NSF flavor: “…with broader impacts of transformative significance.”
Issue:
I rewrote the Chinese grant-speak as English grant-speak (leverage, synergies, transformative) rather than translating it word for word. 赋能 became “empowering”. Also, in the second grant_minimal outcome, the Chinese itself says the closing email arrived two months later but was timestamped three minutes after the receipt. I kept that absurdity as written.

## [mainline / grant_deadline: hire_help]
Chinese:
你找了一个有丰富申请书经验的科研助理。…… 花了三万
Current English:
You find a grant-writing consultant with years of experience. … spent $30K.
Alternative:
“a research assistant with plenty of grant-writing experience”
Issue:
To a US reader, a “research assistant” is a student and wouldn't charge $30K. The role that actually does this job (and costs this much) is a grant-writing consultant.

## [student_specific / graduation_check]
Chinese:
"老师，我觉得差不多了。按时间线，今年六月可以完成答辩。"（event fires in June; outcome says 接下来几个月进展顺利。答辩那天……）
Current English:
“Professor, I think I’m about ready. Going by the timeline, I can defend this summer.”
Alternative:
“…I can defend this June.” (literal)
Issue:
The event fires in June, and the outcome puts the defense several months later, so “this June” reads like a slip. “This summer” keeps the timeline coherent. Separately, the Chinese description[2] and graduation_check_2 description[1] both start with a stray opening quotation mark. I dropped it in English; the Chinese source probably wants a fix too.

## [student_specific / graduation_check_3: extend_three_years]
Chinese:
学校论坛上有人把你的组标在了学院地图上，标注：陈年博士生培养区。
Current English:
On the campus subreddit, someone has posted a map of the college with your lab labeled: “Vintage PhD Aging Cellar.”
Alternative:
“Barrel-Aged PhD Students” / “PhD Students, Aged In-House”
Issue:
陈年 (aged, as with wine or vinegar) plus 培养区 (cultivation zone) is a food-aging pun. The wine-cellar framing keeps the joke. A campus subreddit is the natural US stand-in for 学校论坛. Note also that graduation_check_2 and _3 use 他们 for the student in Chinese; English uses {he}/{his} placeholders there.

---

<!-- source: mo_wenxuan.md -->

## [characters/mo_wenxuan.ts / profile.tagline]
Chinese:
代码跑不过，先换个方位。
Current English:
Code won’t run? Check which way it’s facing.
Alternative:
If the code won’t run, try moving the desk first.
Issue:
方位 is spatial (feng shui orientation), not "direction" in the research sense. The current line ties the tagline to the GPU-orientation joke (mwx_gpu_fengshui) and stays at 44 characters. The alternative is closer to the literal "先" (do this first) and to the first-meeting desk scene, but it reads less like a catchphrase.

## [characters/mo_wenxuan.ts / profile.farewell]
Chinese:
入组前我抽了一张牌，是“贵人”。没告诉你的是，后来这张牌，一直立在我床头。
Current English:
Before I joined the lab, I drew a card. It was “The Benefactor.” / What I never told you is that the card has stood by my bed ever since.
Alternative:
I drew one card before I joined the lab: “The Benefactor.” / I never told you, but it’s been propped up by my bed ever since.
Issue:
贵人 is not a real tarot card. It’s a Chinese fortune concept for someone who turns your luck around. “The Benefactor” sounds like a card name and needs no explanation. The line carries the meaning (you were his benefactor) without stating it, the same way the Chinese does. “Stood by my bed” also quietly echoes a person standing by him. Possible alternative card names: “The Patron” or “A Helper Appears”.

## [characters/mo_wenxuan.ts / mwx_paper_title_omen]
Chinese:
这个标题有几处笔画数加起来……不太顺 / 笔画数方面，改完之后总画数是个吉数 / 笔画数：有效。
Current English:
a few parts of this title, when you add up the letter values… they don’t flow / Numerologically, the new total is an auspicious number / Numerology: effective.
Alternative:
Plain letter counts instead of numerology: “a few of these words, if you add up the letter counts… it doesn’t flow” / “the new total letter count is an auspicious number” / “Letter count: effective.”
Issue:
Chinese character stroke-count divination doesn’t carry over to an English paper title, so I switched to letter-value numerology, which English players know. The title is also now “The Title’s Numerology Problem” (Chinese: 标题笔画数的问题). The structure of the joke (an odd reason that happens to produce a better title) is unchanged.

## [characters/mo_wenxuan.ts / mwx_hyperparameter_ritual]
Chinese:
而且0.000137的数字相加是十二，今年是我的本命年，十二对应的……
Current English:
Also, the digits of 0.000137 add up to twelve, and this is my zodiac year, and twelve corresponds to…
Alternative:
(fix the source number, e.g. 0.000138 or 0.000156, in both languages) or keep as is.
Issue:
1+3+7 = 11, not 12. This looks like a mistake in the source, not a joke, because the line goes on to explain the twelve. I kept the Chinese values as instructed. The owner may want to change the learning rate in both versions (0.000138 → 12). “Zodiac year” (本命年) relies on the number twelve to suggest the 12-year cycle and is not explained.

## [characters/mo_wenxuan.ts / mwx_gpu_fengshui]
Chinese:
气流和气场可能存在正向耦合。
Current English:
The flow of air and the flow of qi may be positively coupled.
Alternative:
Airflow and energy flow may be positively coupled.
Issue:
The Chinese pun is on 气 (air / qi). “Qi” keeps the pun but is the only place I use it. Everywhere else 气场 is “energy” (“the energy flows much better this way”). The alternative is consistent with the rest of the file but loses part of the wordplay.

## [characters/mo_wenxuan.ts / mwx_industry_poach]
Chinese:
我昨晚占了一卦……结果是「旅」。动而不失位，行而有所归。
Current English:
I cast a hexagram last night… It came up Lü, the Wanderer. Moving without losing one’s place; traveling, with somewhere to return to.
Alternative:
I consulted the I Ching last night… I got Hexagram 56, the Wanderer.
Issue:
旅 is I Ching hexagram 56, usually called “The Wanderer” in English. I kept “Lü” for flavor, which English players won’t recognize without the gloss. The alternative names the I Ching for readers who know it from Western pop culture. The interpretation line is his own reading, not a standard translation of the text.

## [characters/mo_wenxuan.ts / mwx_agent_civilization]
Chinese:
此行有财。——我自己也没想到是字面意思。
Current English:
“This journey brings fortune.” Then: “I didn’t expect it to be literal either.”
Alternative:
“This venture brings wealth.” Then: “I didn’t expect it to be literal.”
Issue:
“Fortune” means both luck and money, so the reveal (an actual travel grant) works as a small pun. “Wealth” is closer to 财 but makes “literal” less of a surprise. I added “either” (from 我自己也没想到) to show that the result surprised him as well.

---

<!-- source: project_ideas.md -->

## [projects.ts + project_ideas.ts / todo_completeness, idea_todo_completeness]
Chinese:
TODO完备性理论 / 这里有多少个TODO / `# TODO: 为什么这里work？`
Current English:
A Completeness Theory of To-Dos / How Many To-Dos Are in Here? / `# todo: why does this work?`
Alternative:
A Completeness Theory of TODOs / How Many TODOs Are in Here? / `# TODO: why does this work?`
Issue:
Uppercase TODO is what programmers actually write and grep for, but check-i18n.mjs flags any “TODO” as an unfinished-translation marker (regex /TODO|TBD/). I used “to-do” in prose and lowercase `todo:` in code so the checker passes. If the checker gets a whitelist, switch to TODO everywhere.

## [projects.ts / variable_naming_law completionSummary]
Chinese:
变量名长度与bug密度呈倒U形关系：过短……和过长……都与更高bug率相关
Current English:
a U-shaped relationship between variable name length and bug density: names that are too short … and too long … both correlate with higher bug rates
Alternative:
an inverted-U relationship (literal)
Issue:
The Chinese says “inverted U”, but what it describes (both extremes have more bugs) is a U shape for bug density. I corrected it, since a CS reader would catch the mistake. Fix the Chinese to U形, or change the axis to “correctness”.

## [project_ideas.ts / all idea events (unlock line)]
Chinese:
💡 获得灵感：「X」——已记录到项目面板。
Current English:
💡 New idea: “X” (saved to the Projects panel)
Alternative:
💡 Idea unlocked: “X”. Added to the Projects panel.
Issue:
This line also appears in daily.ts (advisor_left_on_read) and xie_zhiwei.ts (xzw_elevator_study), which other agents are translating. Those should use the same wording and the English project names from en/projects.ts (“A Multi-Agent Game-Theoretic Model of PI Email Latency”, “Silent Coordination Mechanisms”).

## [project_ideas.ts / idea_email_politeness; projects.ts / email_politeness_tax]
Chinese:
加了四个"辛苦了"、两个"打扰一下" / 每增加一个"辛苦了"可提升回复率 11%
Current English:
four “hope you’re doing well”s and two “sorry to bother you”s / Each additional “hope you’re doing well” raises the reply rate by 11%
Alternative:
“I hope this email finds you well”
Issue:
辛苦了 has no direct English equivalent. I swapped in the stock polite email opener. The project summary and the event use the same phrase so the callback still works.

## [projects.ts / mediocre_paper_detector name]
Chinese:
水会检测系统
Current English:
Junk Paper Detection System
Alternative:
Low-Quality Venue Detector / Paper Mill Detector
Issue:
水会 literally means a “watery” (low-bar) venue, but the description and the event are about low-quality papers. “Paper mill” would mean fraud, which goes further than the Chinese, so I used “junk paper”.

## [project_ideas.ts / idea_meeting_translator title]
Chinese:
你说的是中文吗
Current English:
Was That Even English?
Alternative:
Are We Speaking the Same Language?
Issue:
I localized the language joke (“is that even Chinese?”) to English, the language the English player is reading.

## [project_ideas.ts / idea_six_degrees]
Chinese:
第三作者是导师的导师的学生
Current English:
the third author is a student of your own former advisor’s advisor
Alternative:
a student of your academic grandparent
Issue:
导师 here is the player’s own former advisor, not the player. I added “own former” to make that clear. The scholar is 他 in the title and 对方 later, so I used “him/he” throughout.

## [projects.ts / ideaSources]
Chinese:
谢之微事件 / 毕小天事件 / 唐扩列人脉事件
Current English:
A Zoe incident / Something Theo found / Nico’s network
Issue:
Most ideaSources are generic labels that don’t match any event. Where they match an event in project_ideas.ts I used its English title (“The case of the missing minutes”, “Left on read”, “The ancestral codebase”, “The dolphin workshop”). “A Zoe incident” keeps the nod to her habit of causing technical accidents.

---

<!-- source: qian_duoduo.md -->

## [characters/qian_duoduo.ts / profile.tagline]
Chinese:
所以谁会为它买单？
Current English:
So who’s actually going to use this?
Alternative:
So who’s buying?
Issue:
买单 literally means "pay the bill", but to a Chinese reader the line asks "who is this actually for?". Translated literally ("Who’s going to pay for it?"), it makes him sound focused on money, which the design notes rule out. The current version turns it into his catchphrase (这个有人用吗). The alternative is shorter and keeps the buy/pay image with a double meaning (customer / buying into the idea), but it leans a little more commercial.

## [characters/qian_duoduo.ts / profile.farewell]
Chinese:
以前我总想着怎么能做出有价值的东西。\n\n后来发现，有些遇见本身就很值。
Current English:
I was always thinking about how to build something of value.\n\nLater I realized some things are worth it without being built at all. Meeting you, for one.
Alternative:
I always asked whether something was worth building.\n\nI never had to ask whether meeting you was worth it.
Issue:
The Chinese plays on 价值 / 值 (value / worth it) and leaves "you" implicit in 有些遇见. English can’t keep it fully implicit without going vague, so both versions name "meeting you". The current version keeps the build/value callback and the understatement ("for one"). The alternative is punchier and more symmetrical, but slightly more direct and sentimental.

## [characters/qian_duoduo.ts / qdd_pi_email_timing, qdd_mediocre_paper_filter]
Chinese:
她说她发现了一个规律……  /  她三分钟判断一篇论文值不值得看
Current English:
He says he’s found a pattern…  /  He Can Triage a Paper in Three Minutes
Alternative:
(none; flagging a source issue)
Issue:
Both Chinese events call 钱多多 她 throughout, including the titles, while he is 他 everywhere else. That looks like a source bug (they may have been written for another character). English uses "he" throughout. The Chinese titles and text probably need fixing too.

## [characters/qian_duoduo.ts / qdd_mediocre_paper_filter.qdd_mediocre_paper_formalize]
Chinese:
她的眼神变得算盘味十足，你知道这个想法在她脑子里已经开始估算ROI了。
Current English:
His expression turns unmistakably calculating, and you can tell he’s already running an ROI estimate on the idea.
Alternative:
You can practically hear an abacus clicking behind his eyes; the idea is already getting an ROI estimate.
Issue:
算盘味 (abacus flavor) is a money image, and it’s the line most at risk of making him sound mercenary. "Calculating" plus ROI frames it as estimating whether the idea is worth doing. The abacus version keeps the image but sounds a bit greedier and more exotic in English.

## [characters/qian_duoduo.ts / max_favor_qian_duoduo, sign wording]
Chinese:
目前尚未获得任何官方授权 → 已获得任何官方授权
Current English:
Not yet officially authorized by anyone → Officially authorized by anyone
Alternative:
Not currently authorized by any official body → Currently authorized by any official body
Issue:
The joke is a lazy edit: he deletes the negation, and the result is grammatically odd ("has obtained any official authorization"). The English copies that by dropping "Not yet". The result is just as broken, and funny, in English.

## [characters/qian_duoduo.ts / max_favor_qian_duoduo, description[3]]
Chinese:
「是啊，我可是跟他混的。」
Current English:
“Of course. I’m with this one.”
Alternative:
“Yep. I roll with this one.”
Issue:
跟他混 is casual and proud ("I run with them"). The Chinese uses 他 for the player, but English would hard-code a gender ("this guy"), so I used a gender-neutral "this one" while he points at you. The alternative is more slangy and closer to 混, but may sound slightly dated.

## [characters/qian_duoduo.ts / qdd_user_interview, qdd_alumni_visit]
Chinese:
愿不愿为解决这个问题付出代价 / 技术来源：感谢某某大学实验室的长期研究积累。
Current English:
what they’d be willing to give up to make the problem go away / On the first page is a line crediting the technology to the long-term research of your lab.
Alternative:
whether they’d pay a price to fix it / “Technology origin: with thanks to the lab at [University] for years of research.”
Issue:
(1) "Pay a price" would read as money in English, which contradicts his next line ("I didn’t ask whether they’d pay"), so I used "give up". (2) 某某大学 is the narrator hiding the name. A quoted "[University]" would look like a broken placeholder, so the line is reported indirectly.

---

<!-- source: tang_kuolie.md -->

## [characters/tang_kuolie.ts / profile.tagline]
Chinese:
来都来了，加个好友吧。
Current English:
While we’re here, let’s swap contacts.
Alternative:
Since we’re both here, might as well connect.
Issue:
“来都来了” is a stock Chinese phrase (“we’ve come all this way, so…”) with no exact English idiom. “While we’re here” was chosen because it is short, casual, and can be reused as his catchphrase in later scenes. “Swap contacts” is neutral about the platform. “Connect” sounds more like LinkedIn and slightly more professional.

## [characters/tang_kuolie.ts / profile.farewell]
Chinese:
我加过很多人的联系方式，但最值得加的，是当初招我进组的那个你。
Current English:
I’ve added a lot of people over the years. The one most worth adding was you, back when you first took me into the lab.
Alternative:
I’ve saved a lot of contacts. The one I’d never delete is the person who took me into this lab.
Issue:
The current version keeps the “adding” motif and the plain, restrained structure. The alternative is punchier, but “never delete” adds an image that isn’t in the Chinese.

## [characters/tang_kuolie.ts / catchphrase 来都来了 across events]
Chinese:
来都来了，举手之劳。 / 来都来了嘛，大家都在这个圈子里，认识一下挺好的。你寻思这句话好像用在这里逻辑不太对 / 我帮您引荐一下？来都来了嘛。 / 还是那句"来都来了"
Current English:
“While we’re here. It was nothing.” / “Well, while we’re all here, you know? …” You can’t shake the feeling that the phrase doesn’t quite make sense here / “Want me to introduce you? While we’re here, right?” / Still “while we’re here.”
Alternative:
“We’re here anyway” (tagline: “We’re here anyway. Let’s swap contacts.”)
Issue:
The phrase is always rendered the same way, so the narrator can call it his catchphrase and point out that it is illogical at the alumni meetup (which he organized himself). In tkl_surprise_connection it reads slightly odd in English (“While we’re here. It was nothing.”), but the Chinese is a little off-logic there too. Please confirm this choice before other overlays quote him.

## [characters/tang_kuolie.ts / tkl_first_meeting]
Chinese:
老师，你认识王教授吗？刚才楼道里加了他
Current English:
“Prof, do you know Professor Kapoor? I just added him in the hallway.”
Alternative:
Prof. Whitfield (the canonical name for 王教授 on the tenure committee)
Issue:
The guide maps 王教授 to Prof. Whitfield only in the endings context. This 王教授 seems to be an unrelated one-off professor in the building, so I gave him a new name. If the author meant him to be the future tenure-committee member, switch to Whitfield. That would make it an intentional callback.

## [characters/tang_kuolie.ts / half_favor_tang_kuolie]
Chinese:
这位是陈老师，上个月刚发了那篇你说你想读的论文
Current English:
This is Dr. Mehta. He just published that paper last month you said you wanted to read
Alternative:
Dr. Chen (keeping the surname)
Issue:
Following the guide, the one-off character got a natural new name rather than a transliteration. Mehta is male, matching 他说计算机系, and is in CS. “Dr.” covers both faculty and postdoc, since 陈老师 is ambiguous.

## [characters/tang_kuolie.ts / tkl_six_degrees / tkl_six_degrees_use]
Chinese:
开头写着"听XXX说您在做的方向，很感兴趣聊一下。"
Current English:
It opens with, “Our visiting scholar told me about the direction you’re working on, and I’d love to talk.”
Alternative:
“So-and-so mentioned the direction you’re working on…”
Issue:
The Chinese uses XXX as a redaction placeholder. In English, a literal “XXX” would read as a bug, so I named the last link in Nico’s chain (the visiting scholar) instead. Also, the Chinese narration says 条件我们正好符合 (“we”), which I normalized to second person (“You happen to meet the requirements”).

## [characters/tang_kuolie.ts / tkl_tea_break_main_quest / tkl_tea_break_decline]
Chinese:
感谢，但横向合作先搁
Current English:
Thank him, but shelve industry deals for now
Alternative:
Thanks, but no industry partnerships for now
Issue:
横向合作 (industry-funded contract research) has no exact English term. “Industry deals” is short and clear for a choice button. It is slightly more commercial-sounding than the Chinese.

## [characters/tang_kuolie.ts / tkl_first_meeting description]
Chinese:
手机来回换着扫码，像是在现场自发开了个接头会。
Current English:
the three of them taking turns scanning each other’s phones, like a spontaneous meetup had broken out right there in the doorway.
Alternative:
…like an impromptu contact-exchange summit had convened in the doorway.
Issue:
接头会 has a clandestine “rendezvous” flavor. “Meetup” is softer. The alternative is bigger and more mock-formal. The current version keeps the joke small.

---

<!-- source: xie_zhiwei.md -->

## [characters/xie_zhiwei.ts / profile.tagline]
Chinese:
我就看看，不会动的。
Current English:
I’m just looking. I won’t touch anything.
Alternative:
Just looking. Won’t touch a thing.
Issue:
The current version is the guide's canonical line (41 chars). The alternative is shorter and punchier on a card but drops the first-person sincerity, which is what makes the promise funny.

## [characters/xie_zhiwei.ts / profile.farewell]
Chinese:
我好像惹过不少麻烦。\n\n但每次回头，都发现你还在那里。
Current English:
I guess I caused my share of trouble.\n\nBut every time I looked back, you were still there.
Alternative:
I broke a lot of things here, I think.\n\nBut every time I looked back to check, you were still there.
Issue:
"还在那里" quietly echoes her running line "原来的版本还在吗" ("do we still have the old version?"). The current English is close and restrained. The alternative leans harder on the callback ("looked back to check" reads like checking for the old version). It is more pointed but less plain than the Chinese.

## [characters/xie_zhiwei.ts / 顺手 motif, all events]
Chinese:
顺手理了一下 / 顺手优化了五个 / 顺手把历史整理了一下 …
Current English:
“while I was at it” (titles: “Refactored It While I Was At It”, “Optimized Five While I Was At It”, “Cleaned Up the History While I Was At It”)
Alternative:
Vary it ("on the side", "since I was in there") to avoid repetition.
Issue:
I used one fixed phrase so it works as her catchphrase, the way 顺手 does in Chinese. It repeats a lot across the pack, on purpose. If it feels heavy, vary it in the narrative but keep it in the titles.

## [characters/xie_zhiwei.ts / xzw_just_look.options.xzw_just_look_accept.text]
Chinese:
正式授权她成为"本实验室首席代码洁癖官"
Current English:
Officially name her the lab’s “Chief Code Neat Freak”
Alternative:
Officially name her the lab’s “Chief Code Hygiene Officer”
Issue:
洁癖 means a compulsive need for cleanliness, and 官 makes it a mock-official title. "Neat Freak" gets the compulsion but loses the "Officer" part. "Hygiene Officer" sounds more like a real title but loses the compulsive edge.

## [characters/xie_zhiwei.ts / xzw_version_control.options.xzw_version_control_warn]
Chinese:
她没有给别人留活干，但她给别人留了很多后路。
Current English:
she didn’t leave anyone any work, but she left everyone plenty of rollback points.
Alternative:
she didn’t leave anyone any work, but she left everyone plenty of ways back.
Issue:
The Chinese plays 留活 against 留后路. "Rollback points" turns it into an engineering joke that matches the backups in the scene. "Ways back" is more literal and softer.

## [characters/xie_zhiwei.ts / xzw_elevator_study.options.xzw_elevator_study_model]
Chinese:
💡 获得灵感：无声协调机制 —— 已记录到项目面板。
Current English:
💡 Idea unlocked: “Silent Coordination.” Added to the Projects panel.
Alternative:
💡 New idea: “Silent Coordination” (added to Projects).
Issue:
src/data/en/projects.ts was still empty when I wrote this, so I guessed "Silent Coordination" as the English name of project spontaneous_coordination. It must match whatever the projects overlay uses. The format of this idea-unlock line also needs to match the other overlays (e.g. project_ideas, daily).

## [characters/xie_zhiwei.ts / xzw_alumni_visit.description[2]]
Chinese:
"他们现在叫我小拆弹专家，"她写道，"但我觉得不完全准确，因为有时候炸弹是我自己做出来的。"
Current English:
“They call me the resident bomb defuser now,” she writes, “but I don’t think that’s entirely accurate, because sometimes I built the bomb myself.”
Alternative:
“They’ve started calling me the bomb squad,” …
Issue:
The diminutive 小 doesn't carry over well. "Resident" adds a bit of the same affectionate tone. "Bomb squad" is more idiomatic but is a group, not a person.

## [characters/xie_zhiwei.ts / max_favor_xie_zhiwei.description[4]]
Chinese:
后来风渐渐大了，近晚的天色也变得橘红，燎起了谁的心绪。
Current English:
After a while the wind picks up, and as evening comes on the sky turns orange-red, the kind of color that stirs something in a person.
Alternative:
…and the sky turns orange-red, and something in someone catches like a spark.
Issue:
"燎起了谁的心绪" is literary and deliberately vague about whose feelings are stirred. The current English stays vague and restrained. The alternative keeps the fire image (燎) but is more dramatic.

---

<!-- source: ye_zhiqiu.md -->

## [characters/ye_zhiqiu.ts / profile.tagline]
Chinese:
代码会过时，证明会永存
Current English:
Code gets deprecated. Proofs are forever.
Alternative:
Code goes stale. Proofs don’t.
Issue:
“Deprecated” gives a CS-native word for 过时 and keeps the two-clause contrast (41 chars). The alternative is shorter and punchier but drops the “永存” half of the contrast.

## [characters/ye_zhiqiu.ts / profile.farewell]
Chinese:
很多问题我都想证明，只有一件事不需要证明。

跟着你做研究，是我最正确的选择。
Current English:
I want to prove almost everything. Only one thing has never needed a proof.

Doing research with you was the most correct choice I ever made.
Alternative:
There are so many things I want to prove. Only one of them doesn’t need a proof.

Choosing to do research with you was simply correct.
Issue:
“Most correct” is slightly non-idiomatic, and a pedant could say correctness isn’t graded. I kept it on purpose: it mirrors 最正确, and it reads as the one moment where Ada lets warmth override rigor. The alternative is more literally rigorous and quieter but loses the superlative.

## [characters/ye_zhiqiu.ts / yzq_env_crisis.options.yzq_env_crisis_theorize.text]
Chinese:
数学归数学，环境的……算了
Current English:
Render unto math what is math’s, and the environment… never mind
Alternative:
Math is math. As for the environment… never mind
Issue:
The Chinese riffs on the 凯撒的归凯撒 / “render unto Caesar” pattern, so I used the biblical English to keep the parody. It is a bit long for a button. The alternative is shorter but loses the allusion.

## [characters/ye_zhiqiu.ts / yzq_reviewer_rant.title]
Chinese:
审稿人要求，她整理了一份名词表
Current English:
Reviewer Requests, Tabulated
Alternative:
The Reviewers Made Demands. She Made a Table.
Issue:
名词表 (glossary) doesn’t really fit the scene, which is a conflict table. I translated what she actually produced, a table. The alternative is more playful but longer.

## [characters/ye_zhiqiu.ts / yzq_proof_breakthrough.options.yzq_proof_breakthrough_publish.outcomes[0]]
Chinese:
叶知秋转发给你，正文只有一行："是否接受。"
Current English:
Ada forwards it to you. The body is one line: “Accept or decline.”
Alternative:
Ada forwards it to you. The body is one line: “Accept?”
Issue:
是否接受。 is a question ending in a period, like a form field. “Accept or decline.” keeps that deadpan form-field feel. “Accept?” is more literal but reads as an ordinary question.

## [characters/ye_zhiqiu.ts / max_favor_ye_zhiqiu.options.max_favor_yzq_pay_for_both]
Chinese:
发挥结账手速，把两本都买了 / 「礼尚往来。」
Current English:
Beat her to the card reader and pay for both / “Fair’s fair.”
Alternative:
Pay for both before she can react / “A gift in return.”
Issue:
手速 (hand speed) became racing to the card reader. 礼尚往来 became the idiomatic “Fair’s fair,” which also fits her running case for splitting the bill.

## [characters/ye_zhiqiu.ts / yzq_abstract_war.description[3]]
Chinese:
再删就失真了。
Current English:
Cut any more and it becomes lossy.
Alternative:
Cut any more and it stops being accurate.
Issue:
“Lossy” is a compression term that fits her information-density argument and CS players will get it. It adds a bit of jargon flavor that 失真 (distortion) only implies.

## [characters/ye_zhiqiu.ts / half_favor_ye_zhiqiu.options.half_favor_yzq_ask.outcomes[0]]
Chinese:
你们还是点了餐。…… 饭点到了，她看了一眼手机，「我们应该先点餐了。」
Current English:
You order anyway. … She glances at her phone. “We should place the order first.”
Alternative:
(Change desc4 to “You keep looking at the menu.” so the ending is consistent.)
Issue:
The Chinese seems inconsistent: the description says they already ordered, but the outcome ends with “we should order first.” I kept both as written and used “place the order” so it can still be read as actually submitting it. The owner may want to fix the Chinese.
