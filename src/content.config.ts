import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    reading_time: z.number().int().positive(),
    pull_quote: z.string(),
    perspectives: z
      .array(z.object({ voice: z.string(), claim: z.string(), body: z.string() }))
      .optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
