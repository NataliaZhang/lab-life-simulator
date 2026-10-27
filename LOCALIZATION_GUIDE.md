# Localization Guide

Lab Life Simulator ships in Chinese (source of truth) and English. This guide is the permanent reference for writing English text and for adding new bilingual content. Read it before touching anything in `src/data/en/` or `src/i18n/`.

The English goal: an English-speaking CS/ML grad student should be able to play without suspecting the writing was translated, while a bilingual player finds the same characters, jokes, information and emotional beats in both versions. The English is set at an international university in a deliberately unspecified country (§5).

---

## 1. Where things live

| What | Chinese (source) | English |
|---|---|---|
| General events | `src/data/events/<file>.ts` | `src/data/en/events/<file>.ts` (same file name) |
| A main student's events, profile card, half/max-favor events, New Year gift result | `src/data/events/students/<id>.ts`, `half_favor.ts`, `max_favor.ts`, `new_year.ts`, `studentPool.ts` | `src/data/en/characters/<id>.ts` (one "character pack" per student) |
| Project completion events | generated in `src/data/events/project_completions.ts` | generated in `src/data/en/events/project_completions.ts` |
| Traits / projects / achievements | `src/data/traits.ts`, `projects.ts`, `achievements.ts` | `src/data/en/traits.ts`, `projects.ts`, `achievements.ts` |
| UI and engine-generated text | inline before; now `src/i18n/messages/zh.ts` | `src/i18n/messages/en.ts` |

English files are **text-only overlays** keyed by the same stable IDs. Effects, weights, costs, conditions and chains live only in the Chinese data; never copy them into English files. Runtime merging happens in `src/i18n/content.ts` (`localizeEvent`, `getCandidateText`, ...). If an English entry is missing, the game falls back to Chinese, and the checker reports it.

Event overlay shape (`EventTranslation` in `src/types/i18n.ts`):

```ts
some_event_id: {
  title: '…',
  prompt: '…',                    // only if the Chinese event has one
  description: ['…', '…'],         // same number of paragraphs; '' spacers stay ''
  options: {
    option_id: {                   // same option IDs as Chinese
      text: '…',
      outcomes: ['…', '…'],        // one narrative per outcome, same order as Chinese
    },
  },
},
```

Run `npm run check:i18n` (whole game) or `npm run check:i18n -- <en file>` (one overlay). It verifies coverage, paragraph/option/outcome counts, placeholders, leftover Chinese and pinyin names.

## 2. Canonical names

### Main students (final, never change)

| ID | Chinese | English | Pronoun | Short form |
|---|---|---|---|---|
| lin_xiaojuan | 林小卷 | Jamie Lin | he | Jamie |
| gu_mianmian | 顾眠眠 | Mina Koo | she | Mina |
| ye_zhiqiu | 叶知秋 | Ada Yeh | she | Ada |
| bai_xiaoman | 白小满 | Sunny Bai | she | Sunny |
| bi_xiaotian | 毕小天 | Theo Bell | he | Theo |
| qian_duoduo | 钱多多 | Dorian Vale | he | Dorian |
| he_shixu | 贺时序 | Serena Ho | she | Serena |
| tang_kuolie | 唐扩列 | Nico Tang | he | Nico |
| mo_wenxuan | 莫问玄 | Orion Moreau | he | Orion |
| xie_zhiwei | 谢之微 | Zoe Hsieh | she | Zoe |

**First name vs. full name.** Once a student is established, English refers to them by first name everywhere: narration, dialogue, choices, results, stat pills, monthly summaries, notifications, achievements, and references inside other characters' events ("Jamie seems unusually productive today", "Mina · Rapport +5"). The full name is an identity label, used only where the UI presents *who the character is*:

- the admission candidate card and admit button, and the "X Joins the Lab" log entry that introduces them;
- member cards, the student detail profile, the ending-screen roster;
- Gallery character cards;
- in-story labels such as an email sender, a slide credit, or a self-introduction / first mention in a first-meeting scene.

In short: identity display → full name; reference to an established character → first name.

Code: each English profile stores `name` ("Jamie Lin") and `firstName` ("Jamie"). `nameOf()` / `useI18n().studentName()` return the reference form and `{studentName}` resolves to it; `fullNameOf()` / `studentFullName()` return the full form. Chinese returns the existing full Chinese name for both, so Chinese behavior is unchanged. Chinese nicknames (小卷, 小天, 小满 …) also become the first name. `npm run check:i18n` rejects full names in general event, trait, project and achievement text.

### Recurring minor characters

| Chinese | English | Notes |
|---|---|---|
| 张老师 / 张教授 (next-door professor who hosts the joint group meeting) | Prof. Brennan | mainline, xie_zhiwei. Dry, generous, tea-drinking. |
| 王教授 on the tenure committee | Prof. Whitfield | endings. Known for tough questions. |
| 系主任 | the department chair | never named |
| the player | you / the PI | never named; students do not use a name for you |

### Other background characters

Do not transliterate by default. Give one-off characters natural names from a plausible international CS department (Chinese, Korean, Japanese, Indian, European, American, …), or no name at all when the Chinese role label works better ("someone from the lab next door", "a postdoc from another university"). Don't give them a nationality or home country unless the story needs one. Similar Chinese surnames don't make two characters the same person unless the story links them. Never infer personality from a name's origin, never use names for ethnic humor. If a minor character recurs within a file, keep the name stable; if it recurs across files, add it to the table above.

## 3. Glossary

Consistency beats variety for mechanics. Use these exact terms in UI, stat pills and narrative that refers to the mechanic.

### Game mechanics

| Chinese | English | Notes |
|---|---|---|
| 资金 | Funding | Money unit: **1万 = $1K**. This normalizes the game economy and is not an exchange rate; never explain it to players. 5万 → $5K, 37万 → $37K, 150万 → $150K. Smaller amounts keep the same scale (yuan ÷ 10): 1000元 → $100, 300元 → $30, 38.9元 → $3.89. Apply it to every amount, narrative included. Amounts the Chinese already gives in dollars (35美元) stay as written. `money()` in `en.ts` does the UI. |
| 声望 | Reputation | |
| 精力 | Energy | 精力耗尽 → "out of energy" / "burned out" in prose |
| 好感 / 好感度 | Rapport | a student's trust in and warmth toward you |
| 心情 | Mood | |
| 理论 / 工程 / 社交 | Theory / Engineering / Social | the three skills |
| 天赋 | Trait | |
| 灵感 | Idea | 灵感库 → Ideas |
| 立项 | Launch (a project) | |
| 负责人 | Lead | 分配负责人 → Assign a lead; 换人 → Change lead; 解除 → Remove |
| 停滞 | Stalled | |
| 月推进 | progress per month | UI: "+8.0%/mo" |
| 效率 | Efficiency | |
| 结项 | wrap up / Project complete | |
| S/A/B/C 级项目 | S-tier / A-tier … project | |
| 招生季 | Admissions season | 录取 → Admit |
| 图鉴 | Gallery | tabs: Endings / Characters / Projects / Achievements |
| 成员 | Members | |
| 已毕业 / 已离组 / 在读 | Graduated / Left the lab / Enrolled | |
| 博N (year badge) | Y*N* | detail view: "PhD Year *N*" |
| 第N年M月 | Year N, Mon | |

### Academic life

| Chinese | English | Notes |
|---|---|---|
| 导师 | advisor (students talking about theirs); PI (institutional or management context) | the player is "you" |
| 老师 (vocative) | usually drop it; "Professor" when respectful or emotional; "Prof" for casual students | never "Teacher" |
| 师兄 / 师姐 / 学长 | a senior labmate, an older student, or just a name | never "senior brother/sister" unless the scene is about that relationship |
| 组会 | group meeting | 联合组会 → joint group meeting |
| 汇报 | update / presentation | by context |
| 投稿 / 中稿 / 发表 / 拒稿 | submit / accepted / published / rejected | not interchangeable |
| 审稿人 / 审稿意见 | reviewer / reviews, reviewer comments | The recurring hostile reviewer is always **Reviewer 2** (Chinese 审稿人2号), never "#2" or another number. Ordinary reviewers in a list keep their numbers. |
| rebuttal, desk reject, camera-ready, related work, workshop | keep as is | |
| 大修 / 小修 | major / minor revision | |
| 顶会 | top-tier conference / top venue | |
| 本子 / 申请书 / 基金 | grant proposal / grant | |
| 经费 | funding / grant money | |
| 中期考核 | mid-tenure review | |
| tenure 评审 | tenure review / tenure committee | |
| 答辩 / 预答辩 / 开题 | defense / pre-defense / thesis proposal | |
| 延毕 | delay graduation / take an extra year | |
| 系主任 / 学院 / 行政 / 财务处 / 报销 | department chair / the college, the dean's office / admin / finance office / reimbursement | |
| 大厂 | big tech | |
| 茶歇 | coffee break | |
| DDL | deadline | keep "DDL" only if a character is quoting a label |
| 服务器 / 集群 / 卡 | server / cluster / GPUs | |
| 炼丹 / 调参 | training runs / hyperparameter tuning (or "alchemy" if the joke is about it) | |
| 玄学 | research mysticism (Orion) / black magic (unexplained ML behavior) | |
| 群 / 群里 | the group chat / the lab Slack | |
| 微信 / 朋友圈 / 加好友 | message, text / posted online / swap contacts | name a platform only if the scene depends on it (§5) |
| 公众号 / QQ号 | science blog or channel / an old chat account | |
| 国自然青年基金 | early-career research grant | never NSF CAREER; never "Chinese" |
| 985 / 211 高校 | a top university | |
| 盖章 | get it stamped / one more approval | never "notarized" |
| 科普主播 | science communicator | "Science YouTuber" only when the scene is clearly about videos |
| 外卖 / 奶茶 / 食堂 | takeout / bubble tea / dining hall | Sunny's bubble tea is a running motif; always "bubble tea" |
| 新年 | New Year | |

### Fixed renderings

These recur on purpose. Keep them identical wherever the Chinese reuses the phrase.

| Chinese | English | Notes |
|---|---|---|
| 来都来了 (Nico) | while we’re here | his catchphrase, including where the narrator notes it doesn't quite fit |
| 顺手 (Zoe) | while I was at it | her motif; don't vary it |
| 快了快了 (Jamie) | almost there, almost there | sets up the alumni callback "These days, he really does get there fast." |
| 贵人 (Orion's card) | The Benefactor | |
| 大力出奇迹 | scale is all you need | |
| 锅是球形的 | the buck stops nowhere | |
| 光杆司令 / 挺好。/ 微软雅黑加粗 | Party of One / Solid. / Calibri Bold | |
| 陈年博士生培养区 | Vintage PhD Aging Cellar | |
| rebuttal (with a Chinese gloss) | rebuttal | drop glosses that explain English jargon to Chinese players |

Fictional conferences keep their abbreviations: ICOP, GRF, OWRC, HMCS, IISC (see `src/data/conferences.ts` for their lore). Real names (Python, Google, Minecraft, arXiv, Overleaf …) stay.

## 4. English style

- **American English** spelling and idiom: contemporary, conversational, the way a CS PhD student actually talks and writes. This is a dialect choice, not a setting (§5).
- **Second person, present tense** for narration ("You sigh and open the PDF."). Chinese has no tense, so this has to be a deliberate choice; use past tense only for things that happened before the scene (flashbacks, "last week she…").
- **Dialogue punctuation:** curly quotes “ ” for dialogue, ’ for apostrophes (also avoids escaping inside single-quoted TS strings). Chinese 「」 become “ ”. "……" becomes "…".
- **Em dashes:** sparingly. Prefer commas and periods.
- **Exclamation marks:** never more than the Chinese has. Jamie's frantic all-caps texting in his max-favor scene is in character; ordinary narration is not.
- **Numbers:** keep the Chinese values. Don't add precision the Chinese doesn't have. Times: "3 a.m.", "11:58 p.m.".
- **Paragraphs:** keep `\n\n` breaks where the Chinese has them; dialogue may be restructured inside a paragraph.
- **Choice text:** short, active, sounds like something a player would click ("Ask your advisor for help", not "Seek assistance from the advisor"). Preserve each option's attitude (eager, reluctant, reckless, petty …).
- **Avoid AI-English tics:** stacks of "Apparently,", "Naturally,", "Somehow,", "Turns out", "Plot twist:", "because of course", "as one does", calling things "chaos", tacking a punchline onto a neutral sentence. Fine once in a while; never as the house voice.

## 5. Setting, jokes and culture

### Setting: international academia, country unspecified

The English version takes place at a fictional international research university in a country that is deliberately never named. The students have international names, and the world around them should support that. It should feel neither specifically Chinese nor specifically American: **localize the experience, not the country.**

- Keep the joke, the narrative function and the academic meaning. Keep concrete details where you can, so the writing doesn't go bland.
- Neutralize geographic details that are incidental: 国自然青年基金 → an early-career research grant; 某985高校 → a top university; 公众号 → a science blog; 已注销的QQ号 → a long-dead chat account; 加微信 → swap contacts; 烤冷面摊 → a street-food stand; 川菜馆 → a little place nearby.
- Localize toward neutral, never toward America: no NSF, Ivy League, Venmo, subreddits, food trucks, HOAs, IRBs, notarization, US paper sizes or other US university and legal machinery.
- Don't point out that something is Chinese either ("a top Chinese university").
- Keep a culturally specific concept when the concept itself is the joke, the character or the scene: the AI and TCM meridian theory workshop; Orion's mysticism, which borrows from several traditions and belongs to none; Sunny's bubble tea; hot pot as a group outing.
- Platforms: ask whether the platform's identity matters. It usually doesn't ("the group chat", "posted online"). Global tools (GitHub, arXiv, Overleaf, Slack, YouTube) are fine.
- Units don't place the game anywhere. Celsius stays (the 22/24/26 °C factions need the numbers).

### Jokes

1. Work out **why** the Chinese line is funny (deadpan, escalation, understatement, academic absurdity, contrast, self-deprecation, wordplay, a meme, treating something trivial seriously or vice versa).
2. Reproduce **the same kind and size** of joke in English. A small joke stays small. A plain informative line stays plain. Don't invent new punchlines to fill a "quiet" sentence; the quiet sentences make the absurd ones land.
3. For culture-specific expressions (画饼, 摆烂, 内卷, 躺平, 卷王, 社牛, J人 …) there is no fixed mapping. Decide what the line accomplishes, use an English academic equivalent if one exists, otherwise rewrite naturally. Never explain the joke inside the line.
4. If a culturally specific detail matters to the scene, keep it plainly and don't explain it. If it is incidental, neutralize it as described under Setting.
5. Never make the English more cynical, cruel, romantic, sentimental or dramatic than the Chinese. "导师似乎不太满意" is "Your advisor didn't seem thrilled", not "Your advisor thinks you're useless".

## 6. Never leak hidden information

Read each event in order (trigger → description → prompt → options → outcomes → follow-ups) before writing any of it. Option text must reveal exactly as much as the Chinese option text: no more about consequences, costs, or which choice is "right". Preserve ambiguity, foreshadowing and surprise. If the Chinese option is cryptic, the English option is cryptic.

## 7. Placeholders

| Placeholder | Resolves to |
|---|---|
| `{studentName}` / `{student2Name}` | bound student's name (English: first name, e.g. Jamie) |
| `{he}` `{him}` `{his}` `{himself}` `{He}` `{His}` | he/she, him/her, his/her, himself/herself for the first bound student |
| `{he2}` `{him2}` `{his2}` `{himself2}` `{He2}` `{His2}` | same for the second bound student |
| `{projectMonths}` | months a project took ("several" if unknown) |

- Only use student placeholders in events whose Chinese text already uses `{studentName}` / `{student2Name}` (that guarantees a bound student; see the placeholder rule in `CLAUDE.md`). The checker enforces this.
- Chinese often avoids pronouns for a randomly bound student; English usually can't. Use the pronoun placeholders, never "they" as a guess, never a hard-coded he/she in a generic event.
- In a character pack the student is known, so write "he"/"she" directly (the `{studentName}` placeholder still works and is fine to keep).
- Sentence-initial possessive of a name: "{studentName}’s" works.

## 8. Character voices

Each student needs a distinct English voice. The hidden design notes in `src/data/studentPool.ts` are authoritative.

- **Jamie Lin**: chronic procrastinator, relaxed and sociable, terrifying output right before deadlines, everything is "almost done". Normal Jamie and deadline Jamie are two different organisms. Casual, easygoing, a little too unbothered. Not a theory genius, not quiet, not a perfectionist.
- **Mina Koo**: sleeps constantly, gentle, low-key, extremely observant, solves problems on waking, somehow knows all the gossip. Not lazy. The joke is ambiguity: asleep, or running in low-power mode? Short, quiet, understated sentences that land unexpectedly sharp.
- **Ada Yeh**: theory powerhouse, rigorous, reliable, instinctively spots logical gaps, kind rather than arrogant. She takes imprecise claims seriously enough to interrogate them. Precise, slightly formal, still warm. Never mean, condescending or cold.
- **Sunny Bai**: optimistic, emotionally resilient, the lab's morale stabilizer. Responds to research disasters with perfectly reasonable everyday priorities (bubble tea, eat first). Warm, cheerful, practical. Optimistic, not naive.
- **Theo Bell**: collector of bizarre papers, genuinely curious interdisciplinary brainstormer, finds absurd workshops, takes strange directions completely seriously, and sometimes they work. He is never joking when people think he is. Sounds genuinely intellectually excited.
- **Dorian Vale**: product-minded, entrepreneurial, energetic, obsessed with real users and real needs. Catchphrase energy: "Does anyone actually use this?" Not greedy or money-obsessed; he dislikes empty financial arbitrage and wants to build useful things. Pragmatic, persuasive, action-oriented. (His Chinese name is a money pun; his character deliberately subverts it, so no abacus or money imagery in his English.)
- **Serena Ho**: extreme planner, calm, polite, frighteningly organized, excellent execution. She reverse-manages her advisor ("Professor, is there a plan for this?", "When you said 'next week' last week, did you mean this week?"). Never aggressive or controlling; the joke is that she is calm, reasonable and impossible to argue with.
- **Nico Tang**: absurdly social, instantly comfortable with strangers, treats conference coffee breaks as the main program, somehow already knows the person the lab will need. Genuinely friendly, never a sleazy networker. Energetic, casual, socially effortless.
- **Orion Moreau**: research mysticism (tarot, feng shui, lucky objects, rituals), strangely confident. Debugs the code, then checks whether the GPU is facing the wrong direction. He treats this as perfectly reasonable; don't wink at the reader. Sometimes his predictions are right.
- **Zoe Hsieh**: brilliant engineer, compulsively curious, optimization addict, can't leave internals alone, turns small fixes into architecture projects. "I'm just looking. I won't touch anything." → "So… do we still have the old version?" Confident, technical, curious, slightly dangerous.

## 9. Profile text (taglines, bios, farewells)

- **Taglines** are short and quotable, fit on a card, and give an English player the same instant read of the character that the Chinese tagline gives a Chinese player. Equivalence of impression, not of words.
- **Bios** keep the original's length and rhythm: setup → escalation → punchline or defining observation.
- **Farewells** (unlocked at Rapport 100) get literary treatment: restraint, the character's own voice, a callback to who they are, no melodrama, no generic inspiration, not romantic unless the Chinese is. Watch for accidental romance: "the day I graduate and say goodbye to you", not "the day I leave you". They may be structured differently from the Chinese if the emotional effect is equivalent.

## 10. Adding new content

1. Write the Chinese event as usual in `src/data/events/…`.
2. Add the English overlay with the same event ID, option IDs and outcome order: general events in `src/data/en/events/<same file>.ts`; a main student's personal events in `src/data/en/characters/<id>.ts`.
3. New student: add a character pack and register it in `src/data/en/index.ts`.
4. New trait / project / achievement: add the English entry under `src/data/en/`.
5. New UI or engine text: add a key to both `src/i18n/messages/zh.ts` and `en.ts` (the English catalog is typed against the Chinese one, so a missing key fails `tsc`). Engine log text is produced in both languages via `bothLocales()`; don't hardcode a language in components or engine code.
6. Recurring background character across files → add to the table in §2.
7. Run `npm run check:i18n` and `npm run build`.
