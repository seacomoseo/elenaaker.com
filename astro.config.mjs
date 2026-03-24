import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://elenaaker.com',
  integrations: [tailwind({
    // Use our existing index.css which has @tailwind directives
    applyBaseStyles: false,
  }), partytown({
    config: {
      forward: ['dataLayer.push', 'gtag'],
    },
  })],
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