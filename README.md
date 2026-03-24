# ELENA AKER - Astro SSG

This repository is the official website for **Elena Aker**, a luxury harpist and composer. 

## Technology Stack
- **Framework**: Astro 5.0 (Static Site Generation)
- **UI Architecture**: Zero-JS by default (Pure Astro + Vanilla JS)
- **Styling**: Tailwind CSS + Custom CSS (`/src/index.css`)
- **TypeScript**: Full type safety

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Build Process & Post-processing
The project uses a custom `postbuild` script that:
1.  **Responsive Variants**: Generates responsive image variants during production builds via `scripts/optimize.mjs`.
2.  **Image Optimization**: Converts and optimizes images into AVIF format.
3.  **Asset Linking**: Dynamically updates HTML file references to point to the new optimized assets.
4.  **Sitemap**: Generates a clean `sitemap.xml` for SEO.

In `npm run dev`, the site serves the original source images to avoid `404` requests for build-only responsive variants.

## Assets & Fonts
- Images live in `/public/src/` and are optimized at build time.
- Fonts are self-hosted in `/public/fonts`.
- The current font set is intentionally trimmed for performance:
  - `Giga Sans`: `300`, `400`
  - `Corbel`: `400`, `700`
  - `Montserrat`: physical files `300`, `700` with CSS weight aliasing for `400` and `600`

## Deployment
Optimized for deployment on **Cloudflare Pages**. It includes a `public/_headers` file for advanced caching strategies (1-year immutable for fonts and assets).
