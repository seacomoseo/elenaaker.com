import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elenaaker.com',
  integrations: [
    react(),
    tailwind({
      // Use our existing index.css which has @tailwind directives
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    assets: 'assets',
  },
  // Serve /en for English, / for Spanish
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Build config is handled above
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
