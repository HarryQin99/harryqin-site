// @ts-check
import { defineConfig } from 'astro/config';

// Vercel sets this at build time; it gives og:image an absolute production URL.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// https://astro.build/config
export default defineConfig({
  site: vercelHost ? `https://${vercelHost}` : undefined,
});
