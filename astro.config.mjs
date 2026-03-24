import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://akingslifestyle.com',
  build: {
    assets: '_assets',
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
