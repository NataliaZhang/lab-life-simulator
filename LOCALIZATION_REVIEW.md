# Localization Review

Open items that still need an author decision. Settled decisions belong in `LOCALIZATION_GUIDE.md`; resolve an item, then delete it here.

---

## [daily_bureaucracy / late_alumni_success] TODO
Chinese:
你还记得{studentName}…… / 现任学生先是各自在群里点开了消息…… / 再多的秘密，就只适合毕业之后再说了。 / 记得请全组吃饭，你请。
Current English:
You still remember {studentName}… / Your current students each open the message… / Any more secrets will have to wait until after graduation. / Don’t forget to take the whole group out to dinner.
Alternative:
(a) Bind a graduated student. (b) Rewrite both languages so the winner is a current senior student.
Issue:
This is a content/logic issue in both languages, not a translation one. The event is drawn from the regular pool, so it always binds an active student, and its Rapport effects (`randomStudent`) land on that student. The text treats them partly as an alum (你还记得, 现任学生) and partly as current (毕业之后再说, 请全组吃饭). Option (a) needs an engine change: pool events have no way to bind a graduate (alumni visits are injected per student in `monthlyUpdate.ts`), and `randomStudent` effects would then hit a different student than the one in the text. Option (b) is text-only. For now the English mirrors the Chinese.
