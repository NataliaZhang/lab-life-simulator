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
- All the language in the game should be in Chinese (except small technical terms like "AI", "debug", "agent"), but you can write code and comments in English.

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

Also run lint/typecheck if available.

When modifying engine logic, add or update small tests if the project already has a test setup.

## Change Style

- Make small, focused changes.
- Do not rewrite unrelated files.
- Do not introduce new frameworks unless explicitly requested.
- If adding a new feature, briefly document where its data and logic live.
- Do not read lots of code unless necessary to make the change. Focus on the relevant files.
- If not specified which files to change, prefer searching first and changing the minimal set of files needed.
- Do not read the entire history of the project unless necessary.