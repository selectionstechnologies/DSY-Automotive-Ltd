import { services } from './data/services';
import { posts } from './data/blog';

// Every URL that gets a pre-rendered HTML file and a sitemap entry
export const staticRoutes = [
  '/',
  '/about',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/timings',
  '/testimonials',
  '/faq',
  '/blog',
  ...posts.map((p) => `/blog/${p.slug}`),
  '/gallery',
  '/appointment',
  '/contact',
  '/privacy-policy',
  '/disclaimer',
];
