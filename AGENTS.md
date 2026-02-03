# AGENTS.md

This repo is a small Vite + React 19 site with TypeScript.
There are no linting or test tools configured yet.
Use the guidance below when working as an agent in this codebase.

## Repository overview
- Entry HTML: `index.html` (loads `/index.tsx` and `/index.css`)
- Entry JS: `index.tsx` mounts `<App />`
- Main UI: `App.tsx` (single file app with subcomponents)
- Shared data: `constants.tsx`, `translations.ts`, `types.ts`
- Assets: stored directly under `src/` and referenced by string paths

## Commands (npm)
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Linting / formatting
- No lint or format scripts are defined in `package.json`.
- No eslint/prettier/biome configs are present.
- Follow existing style in the codebase (see below).

## Tests
- No test runner is configured.
- No test scripts are defined.

### Single test execution
- Not available (no test tooling configured).
- If you add tests, document the single-test command here.

## TypeScript / config notes
- `tsconfig.json` uses:
  - `target: ES2022`
  - `module: ESNext`
  - `moduleResolution: bundler`
  - `jsx: react-jsx`
  - `allowJs: true`
  - `noEmit: true`
- Path alias: `@/*` maps to repo root (`./*`).
- Vite config defines `process.env.GEMINI_API_KEY` at build time.

## Code style and conventions

### Formatting
- 2-space indentation.
- Semicolons are used everywhere.
- Single quotes for strings (JS/TS) and JSX attributes use double quotes.
- Keep lines readable; the codebase tends to wrap long JSX attributes.

### Imports
- Order: external libraries first, then local imports.
- Separate groups with a blank line.
- Use relative imports for local modules (`./types`, `./translations`).
- Prefer the `@` alias when imports would be deeply nested.

### File organization
- Keep the app mostly in `App.tsx` unless a refactor is requested.
- Shared enums and interfaces live in `types.ts`.
- Copy and content strings live in `translations.ts`.
- Asset lists and external links live in `constants.tsx`.

### Naming conventions
- React components: `PascalCase`.
- Variables and functions: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` for global constants.
- Types and interfaces: `PascalCase`.
- Boolean state: prefix with `is`/`has` (`isPlaying`, `isUnlocked`).

### React patterns
- Functional components with hooks only.
- Prefer explicit prop typing inline, e.g.
  `({ lang }: { lang: Language }) => { ... }`.
- Keep small subcomponents inside `App.tsx` unless reused elsewhere.
- Use `useEffect` for DOM listeners and clean up on unmount.

### Styling
- Tailwind classes are used directly in JSX.
- Custom fonts and base styles live in `index.html`.
- Animations are defined inline via `<style>` in `App.tsx`.
- Keep the visual language consistent (gold accent `#c5a059`, dark base).

### i18n
- Copy is keyed by `Language` enum (`ES`, `EN`).
- Add new strings to `translations.ts` in both languages.
- Prefer pulling text from translations rather than hardcoding in JSX.

### Assets
- Asset URLs in code are string paths like `src/fotos/1.jpg`.
- Follow the existing naming scheme for new images/audio/video.
- Keep asset metadata (alt text, importance) in `constants.tsx`.

### Error handling / logging
- Fail fast for impossible states (e.g. missing root element).
- Avoid noisy `console.log`; use it only when required.
- For async actions, catch errors and provide user-safe feedback.

### Security / secrets
- Do not hardcode real secrets in source files.
- `GEMINI_API_KEY` is injected via Vite `define` in `vite.config.ts`.
- If you touch `CONTACT_INFO.accessKey`, treat it as non-secret.

## Cursor / Copilot rules
- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` found.
- If any of these are added, mirror their requirements here.

## Practical guidance for agents
- Keep edits minimal and consistent with existing patterns.
- Avoid large refactors unless asked.
- If you add tooling (lint/tests), update this file accordingly.
- When adding files, prefer the repo root unless a `src/` convention exists.
