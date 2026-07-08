# CLAUDE.md

## Project
THE GRIND — a mobile-first React + Vite web app: a copy-paste prompt
companion for Gemini. One user, Android Chrome, deployed on GitHub
Pages. Built for a non-dev owner whose change requests must stay
one-line config edits.

## Sources of truth
- `reference/gym-bestie.html` — working prototype. For any question
  about behavior, wording, prompt text, or interaction detail: open it
  and match it.
- `SPEC.md` — what to build: architecture, settings shape, dev mode,
  design bar, definition of done.
- Conflict rule: the reference wins on **behavior**; SPEC wins on
  **naming, architecture, and design license**.
- Never modify anything in `reference/` or the *.md docs.

## How to work
- Commit in reviewable phases: scaffold + pipeline → parity port →
  design elevation → dev mode → settings copy/paste. One commit per
  phase; `npm run build` must pass before each commit.
- Plain JavaScript. No TypeScript. No dependencies beyond
  react/react-dom and Vite defaults — no UI kits, state libs, routers,
  animation libs, or markdown libs. Self-hosted woff2 fonts in
  `public/fonts` are the only added assets.
- Vanilla CSS with custom properties for every color. All derived
  shades via color-mix()/relative color from the eight settings tokens
  — components hardcode zero hexes, strings, or emoji.
- Every user-facing value lives in `src/config/`. If a change request
  like "make the buttons pink" or "rename the app" would touch a
  component file, the structure is wrong.
- Keep components small and boring. No cleverness the owner can't
  skim on a phone.

## Guardrails
- localStorage access always wrapped (try/catch or the useLocalStorage
  hook) — the app must run where storage is blocked.
- Clipboard chain: navigator.clipboard → execCommand fallback →
  manual-copy overlay. Never assume clipboard success silently.
- The out-of-scope list in SPEC.md is deliberate. Don't build past it.
