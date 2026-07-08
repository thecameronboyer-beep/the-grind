# SPEC — THE GRIND (v1)

React + Vite port of the working prototype at `reference/gym-bestie.html`,
renamed **THE GRIND**, with all user-facing values driven by a settings
object editable through a hidden dev mode — and a visual layer that goes
well beyond the prototype.

Two laws frame everything:

1. **The reference is the behavior spec, not the design ceiling.** Every
   string, emoji, prompt template, and interaction in it is a deliberate
   product decision. Match behavior exactly; elevate the visuals freely
   (see Design Bar).
2. **Structure is fixed; dev mode edits values, never structure.**

## Stack + constraints
- Vite + React, plain JavaScript. No TypeScript.
- No UI, state, animation, or markdown libraries. react + react-dom only.
- Vanilla CSS. Every color flows through CSS custom properties.
- Mobile-first, single column, max-width 480px. Target: Android Chrome.
- Deploys to GitHub Pages from repo `the-grind`:
  `base: '/the-grind/'` in vite.config.js (must match repo name).

## Settings object (exact shape — src/config/defaults.js)
```js
export const DEFAULTS = {
  app:    { name: "THE GRIND",
            eyebrow: "THE SOURCE-FILE SYSTEM",
            tagline: "one file · two prompts · infinite gains" },
  colors: { bg: "#0E0A17", card: "#191227", border: "#35284F",
            text: "#F2EEFB", muted: "#A79BC8",
            accent1: "#FF5CA8",   // mood row + PRE
            accent2: "#9F7CFF",   // effort row + POST
            accent3: "#7DE8F0" }, // food row + update station
  chips: {
    mood: [
      { emoji: "😡", label: "rage",      name: "rage" },
      { emoji: "😤", label: "locked in", name: "locked in" },
      { emoji: "🙂", label: "cruising",  name: "cruising" },
      { emoji: "😌", label: "easy",      name: "take it easy" },
      { emoji: "😴", label: "fumes",     name: "running on fumes" },
      { emoji: "😉", label: "?",         name: "" }
    ],
    effort: [
      { emoji: "🚶", label: "lowkey", name: "lowkey" },
      { emoji: "💪", label: "solid",  name: "solid" },
      { emoji: "💀", label: "cooked", name: "absolutely cooked" }
    ],
    food: [
      { emoji: "🧑‍🍳", label: "cook",    name: "Let Her Cook" },
      { emoji: "🍽️", label: "outside", name: "We Outside" },
      { emoji: "🧊", label: "fridge",  name: "Fridge Raid" }
    ]
  },
  buttons: { pre:  "⚡ PRE-WORKOUT — copy prompt",
             post: "🍴 POST-WORKOUT — copy prompt" },
  footer:  { laws: "THE SPLIT IS LAW · MEXICAN FIRST · COMMIT TO THE BIT",
             rac:  "🦝 raccoon ankles.  jk jk." }
};
```
Also:
- `src/config/defaultFile.js` — copy `DEFAULT_FILE` from the reference
  **character-for-character**, changing only "GYM BESTIE" to "THE GRIND"
  (it appears in the header line).
- `src/config/prompts.js` — the PRE / POST / update-prompt builder
  functions, ported verbatim from the reference; the update prompt's
  first sentence becomes "Update my source file for THE GRIND."
- Prompt templates are **not** editable in dev mode.

## Runtime rules
- `colors` map to CSS custom properties on `:root` at render.
- Components hardcode **zero** user-facing strings, emoji, or hexes —
  everything reads from settings.
- Every derived shade (glows, hovers, dims, gradients, borders) is
  computed from the eight tokens with `color-mix()` / relative color
  syntax. This is what keeps the Design Bar compatible with dev-mode
  recoloring. If accent1 becomes lime green, the whole design must
  still cohere.
- Prompt builders read chip emoji + name from settings. A chip with an
  empty `name` copies/sends just its emoji (this generalizes the 😉
  rule to any chip a user renames that way).
- Bracket-list fallbacks in PRE/POST are generated from the row's
  chips, skipping empty-name chips.
- localStorage keys: `grind-file`, `grind-settings`,
  `grind-settings-backup`. Settings and source file are separate; dev
  mode never touches the source file.

## Behavior parity checklist (replicate the reference exactly)
1. **SourceFile** — collapsible; textarea loads localStorage else
   default; debounced auto-save (~400ms) with a "saved ✓" flash;
   copy-file button; reset-to-default behind confirm(); auto-open on
   first run only.
2. **EmojiDeck** — rows mood(6) / effort(3) / food(3); single-select
   per row, tap toggles; any change copies the current combo in row
   order mood → effort → food and toasts it; deselecting to empty
   toasts "selection cleared" without copying; selection pill shows
   the combo with a clear button.
3. **PRE** — copies `{file}` + `"———"` + `"Today is {WEEKDAY}."` +
   `"Mood: {selected chip | bracket list}."` + the workout/playlist/
   hype ask from the reference; clears the mood selection after.
   Selected 😉 → `"Mood: 😉."`
4. **POST** — same shape with Trained / Effort / Food mode lines +
   `"Feed me."`; selected chips else bracket lists; clears effort +
   food after.
5. **UpdateStation** — four inputs: RULES, MY SPLIT, FOOD PROFILE,
   "MUSIC TASTE and MOOD MAPPING"; each button builds the
   change-only-this-section prompt from the reference verbatim (with
   the renamed first sentence); empty input → toast + focus, no copy;
   clear the input on success.
6. **Clipboard** — navigator.clipboard → execCommand fallback →
   full-screen manual-copy overlay with preselected textarea.
7. Toast; per-row accent glow on selected chips; footer laws +
   raccoon line; prefers-reduced-motion guard.

## Design Bar — make it look GOOD
The prototype looks like a competent prototype. THE GRIND should look
like a product someone screenshots. You have real creative license
here; use it.

**Identity (locked — this is brand, matching posters exist):**
void-purple dark base; three neon accents with their row assignments;
tracked all-caps section headers with hairline rules; the
chromatic-aberration title treatment; glow states on selection; the
deadpan raccoon footer.

**License (go):**
- **Typography.** Choose a distinctive display face + a clean UI face.
  Self-host in `public/fonts` (woff2 only, max 2 families, subset if
  reasonable). No runtime requests to third-party font CDNs.
- **Motion.** Micro-interactions: chip press + selection bloom, toast
  entrance, copy feedback, staggered section reveal on load. The 7th
  tap into dev mode deserves a payoff beat (a brief CRT-flicker /
  glitch moment fits the identity). Keep everything in the ~150–250ms
  feel range.
- **Texture.** Optional subtle film grain or scanlines at very low
  opacity if it stays classy — CSS or one tiny inline SVG, no canvas
  loops.
- **The overlooked surfaces.** First-run moment for the source file,
  the manual-copy fallback overlay, focus-visible states, pressed
  states, the selection pill, dev-mode form styling. Polish these too.

**Hard constraints:**
- CSS transitions/keyframes only; animate transform + opacity only
  (must hold 60fps on a mid-range Android phone).
- `prefers-reduced-motion` disables all nonessential motion.
- Body/reading text keeps ≥ 4.5:1 contrast against its background.
- Added assets (fonts included) < ~200KB total.
- The recolor rule from Runtime rules applies to every design flourish.

## Dev mode (the boring kind)
- Entry: 7 taps on the title. From tap 4, toast the countdown
  Android-developer-options style ("3 taps from dev mode…").
- Full-screen vertical form, grouped: APP / COLORS / MOOD CHIPS /
  EFFORT CHIPS / FOOD CHIPS / BUTTONS / FOOTER. Text inputs for
  strings and emoji (the phone keyboard is the emoji picker),
  `<input type="color">` for colors. Changes preview live.
- Buttons: SAVE (persist to `grind-settings`, close, toast), CLOSE
  (discard unsaved), RESET TO DEFAULTS (confirm() first).
- No add/delete/reorder anywhere. Counts are fixed: 6/3/3 chips,
  2 big buttons, 4 update sections.

## Copy/paste settings (build last)
In dev mode: "copy settings" copies pretty-printed settings JSON;
"paste settings" opens a textarea + apply. Apply validates: JSON.parse
in try/catch; top-level keys app/colors/chips/buttons/footer present;
chips.mood/effort/food lengths exactly 6/3/3; all leaf values strings.
On success: write previous settings to `grind-settings-backup`, apply,
toast with an UNDO action that restores the backup. On failure:
friendly reject toast, nothing changes.

## Pipeline
`.github/workflows/deploy.yml`: on push to main → npm ci,
npm run build, actions/upload-pages-artifact on `dist`,
actions/deploy-pages. Permissions: `pages: write`, `id-token: write`.

## Definition of done
- `npm run dev` and `npm run build` both clean.
- Behavior parity checklist verified against the reference.
- Dev-mode round trip: edit → save → reload persists; reset restores
  THE GRIND; pasting copied settings is a no-op; garbage paste is
  rejected with state intact.
- **Recolor test:** change bg + all three accents in dev mode to
  clashing values — the app stays coherent, no hardcoded leftovers.
- prefers-reduced-motion verified.
- README: dev commands; "enable Pages → Source: GitHub Actions" note;
  how dev mode opens; settings vs source-file separation; font choice
  + license note.

## Explicitly out of scope for v1
Editable prompt templates, add/remove rows/chips/buttons/sections,
navigator.share, PWA/manifest, recipe book, changelog. Later phases —
do not scaffold for them.
