# Surgical Hospital Lahore: Website

A multi-page website for a consultant physician's clinic in Lahore. Patients can read about the doctor, browse services with full detail pages, check timings, read health tips, chat with an automated clinic assistant, and book an appointment that opens in WhatsApp with their details filled in.

> **Content status:** most text is **dummy** and marked `// TODO(client)` in `src/data/`. Replace it with the client's real information before launch (see the [pre-launch checklist](#pre-launch-checklist)).

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) + [Vite 5](https://vitejs.dev) | UI and build tooling |
| [React Router 6](https://reactrouter.com) | Page routing |
| [react-helmet-async](https://github.com/staylor/react-helmet-async) | Per-page title, meta and JSON-LD |
| [Tailwind CSS 3](https://tailwindcss.com) | Styling with design tokens |
| [Framer Motion](https://www.framer.com/motion/) | Page transitions, scroll and hover animations |
| [Lucide React](https://lucide.dev) | Icons (no emoji). The WhatsApp logo is an inline SVG. |
| [Vercel](https://vercel.com) | Hosting |

## Getting started

**Requirements:** Node.js 18 or newer.

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # client build + SSR build + prerender into dist/
npm run preview    # serve dist/ locally
```

### How the build works

`npm run build` runs three steps:

1. `vite build`: builds the browser bundle into `dist/`. Every inner page is its own lazy-loaded chunk.
2. `vite build --ssr src/entry-server.jsx`: builds a Node version of the app into `dist-server/`.
3. `node scripts/prerender.mjs`:
   - Renders every route in [src/routes.js](src/routes.js) to `dist/<route>/index.html`, each with its own title, description, canonical URL and Open Graph tags.
   - Writes `404.html`, `sitemap.xml` and `robots.txt`.
   - Deletes `dist-server/`.

In the browser, React then *hydrates* the pre-rendered HTML. Search engines and link previews get real content for every page, and refreshing any URL on Vercel works without rewrites.

## Pages

| Route | Page |
|-------|------|
| `/` | Home: hero, stats, about preview, 3 services, why choose us, 3 reviews, health tips, CTA |
| `/about` | Biography, qualifications, career timeline, memberships, talks and research |
| `/services` | All services |
| `/services/:slug` | Service detail: overview, conditions, steps, preparation, FAQs, booking sidebar |
| `/timings` | Weekly table (today highlighted), notes, what to bring, map |
| `/testimonials` | All patient reviews |
| `/faq` | Grouped accordion with FAQPage structured data |
| `/blog`, `/blog/:slug` | Health tips list and article page |
| `/gallery` | Clinic photos ("photo coming soon" tiles for missing ones) |
| `/appointment` | Booking form; `?service=<slug>` pre-selects a service |
| `/contact` | Contact cards, quick WhatsApp message form, map |
| `/privacy-policy`, `/disclaimer` | Legal pages |
| anything else | 404 page |

**Adding a page:**

1. Create it in `src/pages/`.
2. Add a `<Route>` in [src/App.jsx](src/App.jsx).
3. Add its path to [src/routes.js](src/routes.js) so it is pre-rendered and listed in the sitemap.
4. If it belongs in the menu, add it to `mainNav`/`moreNav` in [src/data/site.js](src/data/site.js).

## Project structure

```
src/
├── main.jsx              # Browser entry: hydrates pre-rendered HTML (or renders in dev)
├── entry-server.jsx      # Node entry used by the prerender script
├── App.jsx               # Route table
├── routes.js             # List of URLs to pre-render
├── index.css             # Tailwind layers, buttons, inputs, long-form text styles
├── assets/               # Doctor photos
├── lib/                  # whatsapp link helper, useToday, usePageFocus
├── data/                 # ALL content lives here, one file per area
│   ├── site.js           # Doctor info, phone/WhatsApp, nav, stats, features, socials
│   ├── services.js       # Services + full detail-page content
│   ├── about.js  timings.js  testimonials.js  faq.js  blog.js  gallery.js  legal.js
│   └── chatbot.js        # Chat assistant intents and replies
├── components/
│   ├── layout/           # Layout (page transitions), Navbar, Footer, Seo, ScrollToTop
│   ├── ui/               # Section, SectionHeading, PageHero, Accordion, CountUp, CtaBand, WhatsAppIcon
│   ├── sections/         # ServiceCard, TestimonialCard, TimingsTable, AppointmentForm, ContactDetails
│   ├── home/             # Hero
│   └── widgets/          # ChatBot, WhatsAppButton (floating, on every page)
└── pages/                # One file per route
scripts/prerender.mjs     # Static HTML, 404, sitemap and robots generation
docs/MULTI_PAGE_PLAN.md   # Gap analysis and conversion plan (implemented)
```

## Design system

### Color tokens

The palette is warm and editorial: bottle green, terracotta, sand and paper. All tokens are in [tailwind.config.js](tailwind.config.js). **Never hard-code hex values in components.**

| Token | Hex | Use |
|-------|-----|-----|
| `primary` / `primary-dark` / `primary-soft` | `#1F4D3F` / `#143429` / `#E3EBE6` | Buttons, links, icons / hover, footer / icon tiles |
| `accent` / `accent-dark` / `accent-soft` | `#B4472F` / `#8E3622` / `#F5E4DD` | Main CTA and badges only / hover, error text |
| `ink` | `#1B1A17` | Headings |
| `muted` | `#5F5A52` | Body text |
| `surface` | `#F3EDE3` | Alternate section background |
| `paper` | `#FBF9F5` | Page background |
| `line` | `#E4DCCF` | Hairline borders |
| `white` | `#FFFFFF` | Cards |
| `whatsapp` / `whatsapp-dark` | `#25D366` / `#1DA851` | WhatsApp buttons only |

All colors are solid; the design uses no gradients.

### Typography

- **Headings:** Fraunces 500/600, a soft serif (`font-heading`)
- **Body:** DM Sans 400/500/600 (`font-body`, the default)

### Motion

- Every transition is 300 ms ease.
- Pages cross-fade on navigation.
- Sections fade up on scroll (`whileInView`).
- Buttons lift slightly and darken on hover.
- Users whose system has "reduce motion" turned on get no animations.

## Chat assistant

[ChatBot.jsx](src/components/widgets/ChatBot.jsx) is a **rule-based assistant that runs entirely in the browser**. It uses no API, no API key, and sends no data anywhere.

- [src/data/chatbot.js](src/data/chatbot.js) holds the intents. Each intent has `keywords` (English and Roman Urdu) and a `reply` function. Replies can include page links and action buttons (WhatsApp, call, map).
- Timings, fees, services and the address are read from the other data files, so answers stay in sync with the site.
- Emergency keywords (chest pain, unconscious, bleeding, ...) always win and point to **1122**.
- Symptom words such as "sugar", "bp" or "bukhar" link to the matching service page and a pre-filled booking form.
- Unknown questions fall back to "chat with the clinic team on WhatsApp".
- The conversation is kept for the browser tab (sessionStorage). The bot also works when storage is blocked.

**To teach it something new:** add an object to the `intents` array with `id`, `keywords` and `reply`.

## WhatsApp

- The number is set once in `doctor.whatsapp` in [src/data/site.js](src/data/site.js), in international format with no `+` or spaces: `923327370469` (0332 7370469).
- It is used by the floating WhatsApp button, the booking form, the contact form, the CTA bands, service pages, the footer and the chat assistant.
- `doctor.phone` and `doctor.phoneHref` (Call buttons) currently use the same number.

## Appointment form

Validation rules:

- Name: at least 3 letters.
- Pakistani mobile number: `03xxxxxxxxx` or `+923xxxxxxxxx`.
- Date: must be in the future and on a day the clinic is open, based on the `timings` data.
- Time slot: must be offered on the chosen day.
- Service: required.
- Message: 500 characters or fewer.
- Consent checkbox: required, with a link to the privacy policy.

On submit it opens WhatsApp with a pre-filled booking message. The patient presses **Send** there. Nothing is stored on a server.

## Accessibility and SEO

- Skip link, visible focus rings, ARIA labels on icon buttons, `aria-invalid` and error messages on form fields.
- Breadcrumbs on every inner page. Focus moves to the page heading after each navigation.
- Accessible accordion and dialog markup.
- Per-page `<title>`, description, canonical URL and Open Graph tags.
- Structured data: `Physician` on the home page, `FAQPage` on the FAQ page.
- `sitemap.xml` and `robots.txt` are generated at build time.

