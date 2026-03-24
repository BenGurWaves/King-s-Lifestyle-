import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['bible', 'discipline', 'relationships', 'purpose', 'fitness']),
    datePublished: z.string(),
    dateModified: z.string(),
    image: z.string().optional(),
    relatedSlugs: z.array(z.string()).default([]),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
  }),
});

export const collections = { articles };
