import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// When you buy jfergitlife.com later, change `site` to 'https://jfergitlife.com'
// and remove the `base` line. That's the entire migration.
export default defineConfig({
  site: 'https://jfergitlife.github.io',
  // base: '/portfolio/', // uncomment ONLY if you deploy to a project repo, not the user-site repo
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
});