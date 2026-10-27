# CLAUDE.md

## Project

This is a small React + TypeScript + Vite web game: a light academic lab management simulator.

The game is event-driven. The main gameplay loop is:

1. Maintain a GameState.
2. Keep pending events in an internal event queue.
3. Show one event at a time.
4. Apply the selected outcome to GameState.
5. Append the event and result to the story log.
6. When the queue is empty, allow the player to advance to the next month.
7. Run monthly updates: project progress, student changes, achievements, and new event triggers.

## Project System

Projects are a long-term progression layer running in parallel with the event system.

**Lifecycle:** `unlockIdea` effect (from event outcomes) → `GameState.projectIdeas[]` → player
clicks "立项" in ProjectsPanel (`START_PROJECT` action, costs energy or funding) →
`activeProjects[]` → monthly progress via `processMonthlyProjects()` → at 100% moves to
`completedProjects[]` and queues a `project_complete_{id}` completion event.

**Key files:**
- `src/types/project.ts` — `ProjectDefinition`, `ActiveProject`, `CompletedProject` types
- `src/data/projects.ts` — 12 handcrafted project definitions; `projectById` lookup map
- `src/data/events/project_ideas.ts` — events that grant `unlockIdea` effects
- `src/data/events/project_completions.ts` — completion events (one per project) with rewards
- `src/engine/projectEngine.ts` — all pure project logic: `startProject`, `assignLeader`,
  `removeLeader`, `canAssignStudent`, `calcEfficiencyMultiplier`, `processMonthlyProjects`
- `src/components/ProjectsPanel.tsx` — full-screen overlay: Ideas / 进行中 / 已完成 sections

**Leader assignment** (`ASSIGN_PROJECT_LEADER` → `assignLeader()`):
- Leader is a student ID or `'pi'`. No leader → project stalls (no monthly progress).
- Forced swap keeps 70% of current progress (−30%), unless the outgoing leader has `optimistic_heart`.
- On student graduation/leave, `removeLeaderOnStudentLeave()` stalls the project with no progress
  penalty (the departure isn't the PI's choice).

**Efficiency formula** (student leaders only):
`multiplier = clamp(1 + 0.75 × avg(skill/required − 1), 1.0, 1.75)` across required dimensions.
`monthlyGain = baseMonthlyProgress × multiplier` (before trait modifiers).
`proof_addict` reduces effective engineering requirement by 30 inside this formula and in
`canAssignStudent`.

**PI self-management:** PI costs 15 energy/month per project. If energy is insufficient the project
stalls and the leader is cleared. `time_manager` trait raises cost to 24 energy but gives ×1.5
monthly progress.

**Trait modifiers** (applied in `processMonthlyProjects` and completion handler):
- Progress: `ddl_warrior` (×2 when >80%), `dream_debugger` (±% by project type),
  `research_mysticism` (×1.2/×0.8 by mood), `network_magnet` (−1% per month)
- Completion bonuses: `startup_saint` (+3 funding), `product_mindset` (+2 rep),
  `network_magnet` (+4 rep)

## Implementation Rules

- Keep game logic out of React components.
- Put simulation logic under src/engine/.
- Put reusable type definitions under src/types/.
- Put content data under src/data/.
- React components should mostly render state and call engine functions.
- Prefer pure functions for state updates.
- Avoid hidden mutations unless clearly isolated.
- Keep events data-driven; do not hardcode event content in UI components.
- Use TypeScript types strictly. Do not use any unless unavoidable.
- Keep UI mobile-friendly.
- Chinese is the source language for all game text (small technical terms like "AI", "debug", "agent" may stay English); code and comments may be in English. Every player-facing string also needs English — see Localization below.

## Localization

The game ships in Chinese and English. `LOCALIZATION_GUIDE.md` is the reference (setting, names, glossary and money scale, voices, style); read it before writing English.

- Chinese data in `src/data/` stays the source of truth. English lives in `src/data/en/` as text-only overlays keyed by the same IDs: `events/<file>.ts` mirrors `src/data/events/<file>.ts`; `characters/<id>.ts` holds a main student's profile and all their personal events.
- UI and engine strings: `src/i18n/messages/zh.ts` and `en.ts` (en is typed against zh). Runtime lookup: `src/i18n/content.ts`, `placeholders.ts`, `I18nProvider.tsx`. Types: `src/types/i18n.ts`.
- The engine writes story-log text in both languages at once (`bothLocales()` → `LocalizedText`), so never build log text from the current UI language.
- Student names: `nameOf()` / `studentName()` give the reference form (English first name); `fullNameOf()` / `studentFullName()` are for identity surfaces only (admission card, member card, profile, gallery).
- Adding content: write the Chinese, add the English overlay with the same event/option IDs and outcome order, then run `npm run check:i18n`.

## Placeholder Resolution Rule — CRITICAL

`{studentName}` and `{student2Name}` in any event text (description, prompt, option text,
outcome narrative) will only resolve if the event is queued with a bound student ID.
**If the bound ID is missing, the placeholder renders literally.**

### When a student IS bound

A `studentId` is set on a queued event in exactly three ways:

1. **`triggerConditions` present** — `filterTriggerable()` calls `findTriggeringStudents()`,
   which always picks a random active student even if no `anyStudent` condition exists.
   Any condition array (e.g. a `time` gate) is enough.
2. **Chain event via `nextEventIds`** — inherits the parent event's bound student.
3. **Direct injection by `monthlyUpdate.ts`** — e.g. graduation checks, `lab_birthday`.

### The rule

> Any event that uses `{studentName}` or `{student2Name}` MUST fall into one of the
> three categories above. Events in the **monthly pool without triggerConditions will
> never have a bound student.**

As a safety net, `bindRequiredStudents()` (engine/eventQueue.ts) binds a random active student
to any event whose text needs one, and skips the event if no student is available. Still follow
the rule: the safety net only guarantees *a* student, not the one whose stats triggered the event.

English text may also use pronoun placeholders for the bound student: `{he}` `{him}` `{his}`
`{himself}` (and capitalized / `…2` forms), resolved to he/she from the student's profile.

### Checklist before writing a pool event

- Uses `{studentName}`? → add at least one `triggerConditions` entry.
  Minimum: `[{ type: 'anyStudent', stat: 'projectProgress', op: '>=', value: 0 }]`
- Only triggered via `nextEventIds`? → confirm the parent event has a bound student
  (parent must itself have `triggerConditions` or be injected with a `studentId`).
- Injected by `monthlyUpdate.ts` with explicit `studentId`? → safe to use `{studentName}`.
- No `{studentName}` anywhere? → no constraint.

### Diagnosing

Run this in the project root to find violating events:

```bash
python3 - << 'EOF'
import re, glob
for fp in glob.glob('src/data/events/*.ts'):
    txt = open(fp).read()
    top = list(re.finditer(r'^\s{2}([a-z_]+): \{', txt, re.MULTILINE))
    for i, m in enumerate(top):
        blk = txt[m.start(): top[i+1].start() if i+1 < len(top) else len(txt)]
        if ('{studentName}' in blk or '{student2Name}' in blk) and 'triggerConditions' not in blk:
            print(f"{fp}: '{m.group(1)}' — uses placeholder but has no triggerConditions")
EOF
```

## Content Rules

- Students are fixed handcrafted characters, not randomly generated.
- Events may have multiple options or a single option.
- Events may have randomized outcomes with weights.
- Event outcomes should include both narrative text and mechanical effects.
- Numerical effects matter; do not treat the game as pure fiction.
- Avoid adding large new systems unless they support the event loop.

## Coding Rule
- Work in a virtual environment when you need to install dependencies or run commands. Do not install anything globally.
- Write clean descriptive comments.

## Save System

- Use localStorage for now.
- Save enough state to fully restore the current run.
- Keep global progression separate from per-run state.
- Do not add a backend.

## Testing / Validation

After changes, run:

bash npm run build 

If you touched game text, also run `npm run check:i18n` (English coverage, structure, placeholders, names).

Also run lint/typecheck if available.

When modifying engine logic, add or update small tests if the project already has a test setup.

Tests use Vitest (`npm test`) and live in `src/engine/__tests__/`. They deliberately cover only
persistence and rules where a regression would be silent: gallery storage/merge/backup codes,
achievement backfill vs. live unlock rules, and run-save compatibility.
`fixtures/save-v11-pre-localization.json` is a real save written by commit a67a398. If a test
there fails after a GameState change, add a load-time default rather than editing the fixture.

## Change Style

- Make small, focused changes.
- Do not rewrite unrelated files.
- Do not introduce new frameworks unless explicitly requested.
- If adding a new feature, briefly document where its data and logic live.
- Do not read lots of code unless necessary to make the change. Focus on the relevant files.
- If not specified which files to change, prefer searching first and changing the minimal set of files needed.
- Do not read the entire history of the project unless necessary.