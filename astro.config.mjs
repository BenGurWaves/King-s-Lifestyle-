import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://akingslifestyle.com',
  integrations: [sitemap(), mdx()],
  build: {
    assets: '_assets',
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
