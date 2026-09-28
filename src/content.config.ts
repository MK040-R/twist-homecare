import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts: one Markdown file per post in src/content/blog/. The file name is the URL.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      date: z.coerce.date(),
      readingTime: z.string(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
