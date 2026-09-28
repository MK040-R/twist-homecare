// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace with the real domain before launch. Used for canonical URLs, the sitemap and share tags.
export const SITE_URL = 'https://twist-homecare.example';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({ filter: (page) => !page.endsWith('/404') }),
  ],
  vite: {
    server: {
      // In dev, the signup endpoint runs in `wrangler dev` on port 8787.
      proxy: { '/api': 'http://localhost:8787' },
    },
  },
});
