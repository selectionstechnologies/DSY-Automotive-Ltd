import { business, features, addressLine } from './site';
import { services, serviceHref } from './services';
import { week } from './hours';
import { getStatus, fmtTime } from '../lib/openStatus';
import { waLink } from '../lib/whatsapp';

// Rule-based assistant: runs fully in the browser, no API, no key.
// A reply is { text, links?: [{ label, to }], actions?: [{ label, href, kind: 'whatsapp' | 'tel' | 'map' }] }

export const greeting = {
  text: `Hi, this is the ${business.name} assistant. I can help with opening hours, finding us, booking, services${features.mot ? ', MOTs' : ''} and quotes.`,
};

export const quickReplies = ['Open today?', 'Book my car in', ...(features.mot ? ['MOT'] : []), 'Services', 'Where are you?', 'Talk to a person'];

const call = { label: `Call ${business.phone}`, href: business.phoneHref, kind: 'tel' };
const wa = business.whatsapp ? [{ label: 'WhatsApp us', href: waLink(), kind: 'whatsapp' }] : [];
const map = { label: 'Get directions', href: business.mapLink, kind: 'map' };

const fmtDay = (h) =>
  h.confirm ? `${h.day}: call to confirm` : h.closed ? `${h.day}: closed` : `${h.day}: ${fmtTime(h.open)} to ${fmtTime(h.close)}`;

const intents = [
  {
    id: 'breakdown',
    priority: 100,
    keywords: ['breakdown', 'broken down', 'broke down', 'stuck', 'roadside', 'accident', 'crash', 'wont start', "won't start", 'smoke', 'fire', 'emergency'],
    reply: () => ({ text: "If you're stuck at the roadside, call us. If anyone is in danger, call 999.", actions: [call] }),
  },
  {
    id: 'greet',
    keywords: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening'],
    reply: () => ({ text: 'Hello! What can I help with today?' }),
  },
  {
    id: 'hours',
    keywords: ['open', 'opening', 'close', 'closed', 'closing', 'hours', 'time', 'times', 'today', 'saturday', 'sunday', 'weekend', 'monday', 'friday'],
    reply: () => ({
      text: `${getStatus().label}.\n\n${week.map(fmtDay).join('\n')}\n\nHours can change on bank holidays, so ring ahead if you are coming far.`,
      links: [{ label: 'Opening hours', to: '/opening-hours' }],
    }),
  },
  {
    id: 'location',
    keywords: ['where', 'address', 'location', 'find', 'directions', 'map', 'postcode', 'parking', 'park'],
    reply: () => ({ text: `We are at ${addressLine}, under the yellow D.S.Y. Automotive sign.`, actions: [map] }),
  },
  {
    id: 'book',
    keywords: ['book', 'booking', 'appointment', 'bring', 'drop', 'slot', 'available'],
    reply: () => ({
      text: 'You can book online in a minute, or give us a call. We confirm every booking by phone.',
      links: [{ label: 'Book your car in', to: '/book' }],
      actions: [call],
    }),
  },
  {
    id: 'quote',
    keywords: ['quote', 'price', 'cost', 'how much', 'cheap', 'estimate', 'charge'],
    reply: () => ({
      text: 'Prices depend on the car and the job, so we quote once we know what is wrong. We always give you the price before starting work. Call us with your registration for a rough idea.',
      actions: [call, ...wa],
    }),
  },
  ...(features.mot
    ? [{
        id: 'mot',
        priority: 2,
        keywords: ['mot', 'test', 'retest', 'mot due'],
        reply: () => ({
          text: 'Yes, we are an MOT Centre. If anything fails, we explain it and quote before any repair.',
          links: [{ label: 'About MOTs', to: '/mot' }, { label: 'Book an MOT', to: '/book?service=mot-testing' }],
        }),
      }]
    : []),
  {
    id: 'services',
    keywords: ['service', 'services', 'repair', 'repairs', 'fix', 'do you do', 'what do you'],
    reply: () => ({
      text: `We do ${services.map((s) => s.title.toLowerCase()).slice(0, 8).join(', ')} and more, on all makes and models.`,
      links: [{ label: 'All services', to: '/services' }],
    }),
  },
  {
    id: 'person',
    keywords: ['person', 'human', 'someone', 'talk', 'speak', 'call', 'phone', 'number', 'contact', 'whatsapp'],
    reply: () => ({ text: `The quickest way to reach us is by phone on ${business.phone}.`, actions: [call, ...wa] }),
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'cheers', 'ta'],
    reply: () => ({ text: 'No problem. Drive safe!' }),
  },
];

// Service-specific keywords, so "brakes" or "tyre" links straight to the right page
const serviceKeywords = {
  'car-servicing': ['servicing', 'full service', 'interim'],
  'oil-and-filter-change': ['oil', 'oil change', 'filter'],
  'engine-diagnostics': ['diagnostic', 'diagnostics', 'fault', 'code', 'limp'],
  'engine-repairs': ['engine', 'leak', 'misfire', 'overheating'],
  'timing-belt-and-chain': ['timing', 'cambelt', 'belt', 'chain'],
  'warning-lights': ['light', 'warning', 'dashboard', 'eml'],
  brakes: ['brake', 'brakes', 'pads', 'discs', 'squeal', 'grinding'],
  'clutch-replacement': ['clutch', 'gearbox', 'slipping'],
  'suspension-and-steering': ['suspension', 'steering', 'shock', 'spring', 'knocking'],
  tyres: ['tyre', 'tyres', 'tire', 'tires', 'puncture', 'part worn', 'wheel'],
  'exhaust-repairs': ['exhaust', 'loud', 'blowing'],
  'auto-electrics': ['electric', 'electrics', 'electrical', 'wiring', 'fuse'],
  battery: ['battery', 'flat', 'jump'],
  'air-conditioning': ['air con', 'aircon', 'a/c', 'regas', 're-gas', 'cold air'],
};

const normalize = (s) =>
  ` ${s.toLowerCase().replace(/[^a-z0-9'/\s-]/g, ' ').replace(/\s+/g, ' ').trim()} `;

const hits = (text, keywords) =>
  keywords.reduce((n, k) => (text.includes(` ${k} `) || (k.includes(' ') && text.includes(k)) ? n + 1 : n), 0);

export function getReply(raw) {
  const text = normalize(raw);

  const ranked = intents
    .map((i) => ({ i, score: hits(text, i.keywords) * (i.priority ?? 1) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.i.id === 'breakdown') return ranked[0].i.reply(text);

  const serviceSlug = Object.keys(serviceKeywords).find((slug) => hits(text, serviceKeywords[slug]) > 0);
  if (serviceSlug && (!ranked.length || ['services', 'book', 'quote'].includes(ranked[0].i.id))) {
    const s = services.find((x) => x.slug === serviceSlug);
    return {
      text: `${s.title}: ${s.short}`,
      links: [
        { label: s.title, to: serviceHref(s) },
        { label: 'Book this', to: `/book?service=${s.slug}` },
      ],
    };
  }

  if (ranked.length) return ranked[0].i.reply(text);

  return {
    text: 'Sorry, I did not quite get that. The team can answer anything else by phone.',
    actions: [call, ...wa],
  };
}
