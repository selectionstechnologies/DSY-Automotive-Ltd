import { detailServices } from './data/services';
import { posts } from './data/blog';
import { features } from './data/site';

// Every URL that gets a pre-rendered HTML file and a sitemap entry
export const staticRoutes = [
  '/',
  '/services',
  ...detailServices.map((s) => `/services/${s.slug}`),
  ...(features.mot ? ['/mot'] : []),
  '/about',
  '/reviews',
  '/gallery',
  '/opening-hours',
  '/book',
  '/contact',
  '/blog',
  ...posts.map((p) => `/blog/${p.slug}`),
  '/faq',
  '/privacy-policy',
  '/terms',
];
