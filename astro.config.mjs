import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://mustafa-ahmad-olive.vercel.app',
  integrations: [mdx()],
  markdown: { syntaxHighlight: false },
});
