# THE GRIND

A copy-paste prompt companion for Gemini. One source file, two big
prompts, infinite gains. Mobile-first React + Vite, deployed on
GitHub Pages.

## Dev commands

```
npm install     # once
npm run dev     # local dev server
npm run build   # production build into dist/ (must stay clean)
npm run preview # serve the production build locally
```

## Deploying

Every push to `main` builds and deploys via GitHub Actions
(`.github/workflows/deploy.yml`).

**One-time setup:** repo → Settings → Pages → Source: **GitHub
Actions**. If the workflow ever runs before that's set, re-run it
from the Actions tab.

The site lives at `https://<user>.github.io/the-grind/` — the `base`
in `vite.config.js` must match the repo name.

## Dev mode

Tap the title **7 times** (a countdown toast starts at tap 4).
Edit any value — app text, all eight colors, chip emoji/labels/names,
button labels, footer lines. Changes preview live; **SAVE** persists,
**CLOSE** discards, **RESET TO DEFAULTS** brings THE GRIND back.

**copy settings / paste settings** moves the whole theme as one JSON
blob (e.g. copy → ask Gemini to re-theme it → paste back). A bad
paste is rejected and changes nothing; a good paste can be undone
from the toast.

Dev mode edits values only — the structure (6/3/3 chips, 2 buttons,
4 update sections) is fixed.

## Settings vs the source file

Two separate things, stored separately:

- **The source file** (`grind-file`) — the text that gets pasted
  into Gemini. Edited in the 📄 SOURCE FILE box, auto-saves as you
  type. Dev mode never touches it.
- **Settings** (`grind-settings`) — how the app looks and what the
  chips/buttons say. Only dev mode changes these.

Resetting one never affects the other. Everything lives in this
browser's localStorage — back the source file up in Keep.

## Fonts

Self-hosted in `public/fonts` (latin subsets, ~41 KB total, no
third-party requests at runtime):

- [Anton](https://fonts.google.com/specimen/Anton) — display
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — UI

Both licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/).
