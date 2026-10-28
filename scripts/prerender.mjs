// Post-build step: renders every route to static HTML inside dist/, plus 404.html and sitemap.xml.
// Run via `npm run build` (after the client and SSR builds).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const serverEntry = path.resolve('dist-server/entry-server.js');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, staticRoutes, SITE_URL } = await import(pathToFileURL(serverEntry).href);

const fill = ({ html, head }) =>
  template.replace('<!--app-head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);

for (const url of staticRoutes) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, fill(await render(url)));
  console.log(`  prerendered ${url}`);
}

// Vercel serves dist/404.html (with a 404 status) for any unknown URL
fs.writeFileSync(path.join(dist, '404.html'), fill(await render('/__not-found__')));
console.log('  prerendered 404.html');

const today = new Date().toISOString().split('T')[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map((u) => `  <url><loc>${SITE_URL}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`  wrote sitemap.xml (${staticRoutes.length} URLs) and robots.txt`);

fs.rmSync(path.resolve('dist-server'), { recursive: true, force: true });
