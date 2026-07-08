# SETUP — handing THE GRIND to Claude Code (Fable 5)

## 0. What's in this kit
- `SPEC.md` — the build spec (behavior parity + raised design bar +
  dev mode)
- `CLAUDE.md` — repo conventions; Claude Code reads this automatically
  at session start
- `reference/gym-bestie.html` — the working prototype = behavioral
  source of truth
- `SETUP.md` — this file (for you, not the agent)

## 1. Create the repo
New GitHub repo named exactly **`the-grind`** (public = free Pages).
Put this kit's contents at the repo root, then:

```
git init
git add .
git commit -m "kit: spec + reference prototype"
git branch -M main
git remote add origin git@github.com:YOUR-USERNAME/the-grind.git
git push -u origin main
```

## 2. Turn on Pages (before the first deploy)
Repo → Settings → Pages → Source: **GitHub Actions**.
If the deploy workflow ever runs before this is set, just re-run it
from the Actions tab afterward.

## 3. Launch Claude Code on Fable 5
Fable 5 needs Claude Code **v2.1.170 or later** and is not the default
model. In your terminal:

```
npm install -g @anthropic-ai/claude-code   # if not installed yet
claude update                              # get past v2.1.170
cd the-grind
claude
/model fable                               # switch to Fable 5
/status                                    # confirm the model
```

(Alternative: launch directly with `claude --model claude-fable-5`.)
Docs: https://code.claude.com/docs/en/model-config

## 4. Kickoff prompt (paste as-is)
```
Read CLAUDE.md and SPEC.md, then study reference/gym-bestie.html — it
is the behavioral source of truth.

Goal: THE GRIND live — a Vite + React app at full behavior parity
with the reference, visually elevated per SPEC.md's Design Bar, with
the dev mode and settings copy/paste from the spec, deploying to
GitHub Pages on every push to main. Work until `npm run build` is
clean and every item in SPEC.md's Definition of Done holds, including
the recolor test.

Commit in reviewable phases: scaffold + pipeline, parity port, design
elevation, dev mode, settings copy/paste. The out-of-scope list is
deliberate — don't build past it.

On design you have real license: the reference is the behavior spec,
not the design ceiling. Show me what you can do.
```

### Driving Fable 5 (per Anthropic's own guidance)
- Describe the **outcome**, not the steps — the prompt above already
  does this; resist micromanaging mid-run.
- It verifies its own work more than smaller models — skip the "make
  sure to test" reminders.
- If it stalls on something ambiguous, restate the goal, not the fix.

## 5. Review + ship loop
- Review each phase's commit diff. Skim for: all values in
  `src/config/`, no stray dependencies in package.json, workflow
  present, nothing touched in `reference/`.
- Push to main → Actions tab goes green → open
  `https://YOUR-USERNAME.github.io/the-grind/` on your phone.

## 6. Phone check (10 min, on the live URL)
Parity:
- [ ] Source file opens on first visit, auto-saves (reload keeps edits)
- [ ] Tap 💀 then 🧑‍🍳 → clipboard holds "💀 🧑‍🍳"
- [ ] PRE with 😤 selected → paste in Gemini shows file + "Today is
      DAY." + "Mood: 😤 locked in."
- [ ] POST with nothing selected → bracket lists present
- [ ] Update station: FOOD with text → change-only-FOOD prompt + full
      file; empty input → toast
- [ ] 7 taps on title (countdown toast from tap 4) → dev mode; rename
      app, change a color, SAVE, reload → persists
- [ ] Copy settings → paste settings → apply = no visible change;
      pasting garbage = friendly reject
- [ ] RESET TO DEFAULTS brings THE GRIND back

Design:
- [ ] Feels smooth — no jank while scrolling or tapping chips
- [ ] Recolor test: set clashing colors in dev mode → still coherent
- [ ] Reduced motion (Android: Settings → Accessibility → Remove
      animations) → app calms down accordingly

## 7. Jam-day notes
- Her real source file lives only in the app (+ a Keep backup) —
  never commit it to the repo.
- Demo order: open the URL → add to home screen → she recolors it in
  dev mode → the party trick: copy settings, paste into Gemini, "make
  it [her theme]", paste back. UNDO exists, so let her go wild.
- Post-v1 menu, in order: navigator.share straight into Gemini, PWA
  install, recipes.md book, changelog ("v1.1 — her idea").
