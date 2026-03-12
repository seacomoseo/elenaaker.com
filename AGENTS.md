# AGENTS.md

This repo is a Vite + React 19 site with TypeScript for **Elena Aker**, a luxury harpist.

## Brand & Audience
- **Elena Aker** is a stage name for María Elena Vázquez Quesada
- She is a professional symphonic and Celtic harpist promoting in **Dubai** and internationally
- Target audience: high-end clientele (luxury weddings, corporate events, 5-star hotels, institutional galas)
- The site must convey **elegance, modernity, and premium luxury** — not spiritual/ethereal aesthetics
- Copy tone: sophisticated, professional, artistic — understated confidence

## Visual Identity
- **Gold accent**: `#c5a059` (primary brand color)
- **Dark base**: `#0a0a0a` (background)
- **Fonts**:
  - `Giga Sans` — headings, logo text "ELENA AKER", display text
  - `Corbel` — subtitles, badges, secondary display text
  - `Montserrat` — body text, UI elements (via Google Fonts)
- **Photography**: prefer color (no grayscale filter), dramatic lighting, elegant settings
- **Icon**: Harp illustration (`public/src/icon.png`) used as favicon
- No hardcoded external logo image — "ELENA AKER" rendered as text with Giga Sans

## Repository overview
- Entry HTML: `index.html` (loads `/index.tsx`, `/index.css`, custom fonts)
- Entry JS: `index.tsx` mounts `<App />`
- Main UI: `App.tsx` (single file app with subcomponents)
- Shared data: `constants.tsx`, `translations.ts`, `types.ts`
- Styles: `index.css` (custom CSS) + Tailwind CDN
- Fonts: `public/fonts/` (Giga Sans, Corbel TTF files)
- Assets: `public/src/` (photos, audio, video, album art, press images)

## Commands (npm)
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Linting / formatting
- No lint or format scripts are defined.
- Follow existing style (see below).

## Tests
- No test runner is configured.

## TypeScript / config notes
- `tsconfig.json` uses: `target: ES2022`, `module: ESNext`, `jsx: react-jsx`
- Path alias: `@/*` maps to repo root (`./*`)
- Vite dev server on port 3000

## Code style and conventions

### Formatting
- 2-space indentation, semicolons, single quotes for JS strings
- Keep lines readable; wrap long JSX attributes

### Imports
- External libraries first, then local imports with blank line separator
- Use relative imports for local modules (`./types`, `./translations`)

### File organization
- Keep the app mostly in `App.tsx` unless a refactor is requested
- Shared enums/interfaces in `types.ts`
- Content strings in `translations.ts` (keyed by `Language` enum)
- Asset paths, albums, reviews, contact info in `constants.tsx`

### Naming conventions
- React components: `PascalCase`
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/interfaces: `PascalCase`
- Boolean state: prefix with `is`/`has`/`show`

### React patterns
- Functional components with hooks only
- Explicit prop typing inline
- Keep subcomponents inside `App.tsx`
- Use `useEffect` for DOM listeners, clean up on unmount

### Styling
- Tailwind classes via CDN, used directly in JSX
- Custom fonts via `@font-face` in `index.html`
- Custom CSS classes in `index.css`
- Use `font-display` for Giga Sans headings, `font-subtitle` for Corbel

### i18n
- Copy keyed by `Language` enum (`ES`, `EN`)
- All strings in `translations.ts` in both languages
- ES is primary language, EN is secondary
- Never hardcode visible text in JSX — always use translations

### Assets
- Photos: `public/src/fotos/`
- Album art: `public/src/discos/`
- Press images: `public/src/prensa/`
- Audio: `public/src/` and `public/src/audio/`
- Video: `public/src/`
- Downloads: `public/` (e.g., `material-publicitario.zip`)

### Security / secrets
- `GEMINI_API_KEY` injected via Vite `define`
- `CONTACT_INFO.accessKey` is a simple access key for press material download

## Practical guidance for agents
- Keep edits minimal and consistent with existing patterns
- All text changes must update both ES and EN in `translations.ts`
- Maintain the luxury/modern aesthetic in any visual changes
- When adding photos, use color (not grayscale) unless the original is B&W
- Test responsive layouts (especially the floating audio player on mobile)
