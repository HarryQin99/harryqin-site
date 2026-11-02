import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.string(),
      order: z.number(),
      role: z.string(),
      period: z.string(),
      lead: z.string(),
      links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverCaption: z.string().optional(),
    }),
});

export const collections = { projects };
