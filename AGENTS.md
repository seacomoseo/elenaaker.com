# AGENTS.md

This repo is an **Astro 5.0 + React 19** SSG (Static Site Generation) site for **Elena Aker**, a luxury harpist.

## Brand & Audience
- **Elena Aker** is the stage name for María Elena Vázquez Quesada.
- Professional symphonic/Celtic harpist promoting in **Dubai** and internationally.
- Target: High-end luxury weddings, corporate events, 5-star hotels, institutional galas.
- Aesthetic: **Elegance, modernity, premium luxury** (not ethereal/spiritual).
- Tone: Sophisticated, professional, artistic.

## Visual Identity
- **Gold Accent**: `#c5a059` (primary).
- **Dark Base**: `#0a0a0a`.
- **Fonts**:
  - `Giga Sans`: Headings, logo text, display text.
  - `Montserrat`: Body text, UI elements.
- **Photography**: Color (no grayscale filters), dramatic lighting.

## Repository Architecture (Astro SSG)
- **Configuration**: `astro.config.mjs` (Tailwind, React integrations).
- **Layouts**: `src/layouts/Layout.astro` (Head management, SEO, JSON-LD, Context).
- **Pages**: `src/pages/` (Static routes: `index.astro`, `en/index.astro`, legal pages).
- **Components**: `src/components/` (React `.tsx` and Astro `.astro` components).
- **Translations**: `src/translations.ts` (All strings for i18n, including SEO metadata).
- **Constants**: `src/constants.tsx` (Asset paths, shared data).
- **Public Assets**: `/public/` (Images, fonts, `_headers`, `robots.txt`, `llms.txt`).

## Technical Specifics
- **SEO**: Dynamic `canonical`, `hreflang` and `og:url` tags calculated in `Layout.astro`.
- **JSON-LD**: Structured data for `Person` injected in the head.
- **Sitemap**: Dynamically generated via `src/pages/sitemap.xml.ts`.
- **Optimization**: `npm run build` triggers a post-processing script (`scripts/optimize.mjs`) that converts images to AVIF and updates local references.
- **Headers**: Cloudflare `_headers` file configured for long-term immutable caching of fonts and assets.

## Commands (npm)
- `npm run dev`: Development server.
- `npm run build`: Production build + Image optimization.
- `npm run preview`: Preview static build.

## Rules for Future Work
1. **Don't hardcode text**: All UI text and SEO metadata MUST be in `translations.ts`.
2. **Clean URLs**: Use paths without `.html` or trailing slashes (e.g., `/aviso-legal`, not `/aviso-legal/`).
3. **i18n**: Maintain parity between `Language.ES` and `Language.EN`. ES is primary.
4. **CSS**: Use Tailwind classes or `src/index.css`. Avoid ad-hoc inline styles.
5. **Assets**: New photos should go to `public/src/fotos/` and be referenced via `ASSETS`.
