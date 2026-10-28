# DSY Automotive: Website

Website for **DSY Automotive Ltd**, an independent garage and MOT Centre at 88–90 Chorlton Road, Old Trafford, Manchester M15 4AN.

React 18 + Vite + Tailwind CSS + framer-motion + react-router, with every route pre-rendered to static HTML for fast loading and SEO.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run images    # rebuild responsive photos, og-image.jpg and apple-touch-icon.png
npm run build     # client build + SSR build + prerender (HTML per route, sitemap.xml, robots.txt)
npm run preview   # serve dist/
```

Deploys to Vercel as a static site (see `vercel.json`). Unknown URLs get `dist/404.html`.

## Where things live

All business details and copy live in `src/data/`. Components only read from there.

| File | What it holds |
| --- | --- |
| `site.js` | `business` (name, phone, address, map links, company details), `SITE_URL`, `features` flags, navigation |
| `hours` (js) | Weekly opening hours (`week`). Drives the open/closed badge (UK time), hours tables, JSON-LD and booking date checks |
| `services.js` | Services, groups, featured cards, FAQs per service |
| `mot.js` | MOT page content (shown while `features.mot` is true) |
| `images.js` | Every photo: id, alt text, focal point and where it is used |
| `reviews.js` | Real Google reviews only, with permission. Empty = link out to Google |
| `faq.js`, `blog.js`, `about.js`, `legal.js`, `chatbot.js` | Page content and the rule-based chat assistant |

Look for `TODO(client)` comments for everything still to confirm with the client.

## Photos

1. Put the master photo in `src/assets/photos/` (kebab-case name, number plates blurred).
2. Add an entry to `src/data/images.js`.
3. Run `npm run images`. AVIF + WebP files are written to `public/photos/` at 640/1024/1600/2400w (never upscaled).

## Booking and contact forms

There is no backend. `src/lib/submitBooking.js` is the single submit handler: WhatsApp if `business.whatsapp` is set, otherwise an SMS link on phones, or a copyable message plus a call button on desktop. Replace that function with an API call later.

## Privacy

No cookies, analytics or third-party scripts beyond Google Fonts. The Google Maps iframe only loads after the visitor clicks "Load map".
