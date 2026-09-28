import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    status: z.enum(['in progress', 'finished']),
    stack: z.array(z.string()),
    order: z.number(),
    hook: z.string(),
    code: z.url().optional(),
    video: z.string().optional(),
    poster: z.string().optional(),
    video_caption: z.string().optional(),
  }),
});

export const collections = { projects };
