// TODO(client): placeholder domain, confirm before launch (used for canonical URLs, Open Graph and sitemap.xml)
export const SITE_URL = 'https://www.dsyautomotive.co.uk';

export const business = {
  name: 'DSY Automotive',
  legalName: 'DSY Automotive Ltd',
  tagline: 'Honest car repairs, servicing, MOTs and tyres on Chorlton Road.',
  phone: '07881 773472',
  phoneHref: 'tel:+447881773472',
  phoneIntl: '+44 7881 773472',
  // Shown on the shop sign but not on the Google profile
  landline: '0161 226 8717', // TODO(client): confirm this landline is still in use
  landlineHref: 'tel:+441612268717',
  whatsapp: '', // TODO(client): '447881773472' if this mobile is on WhatsApp
  email: '', // TODO(client): hidden everywhere while empty
  address: {
    street: '88–90 Chorlton Road',
    locality: 'Old Trafford, Stretford',
    city: 'Manchester',
    postcode: 'M15 4AN',
    country: 'United Kingdom',
  },
  geo: { lat: null, lng: null }, // TODO(client): fill from Google Maps, omitted from JSON-LD while null
  mapLink: 'https://www.google.com/maps/search/?api=1&query=DSY+Automotive+Ltd+88-90+Chorlton+Rd+Manchester+M15+4AN',
  mapEmbed: 'https://www.google.com/maps?q=88-90%20Chorlton%20Road%2C%20Manchester%20M15%204AN&output=embed',
  companyNumber: '', // TODO(client): from Companies House
  registeredOffice: '', // TODO(client)
  googleReviewsUrl: '', // TODO(client): the "Read reviews" link from the Google profile
  socials: [], // TODO(client): [{ label, href }], hidden while empty
};

export const addressLine = `${business.address.street}, ${business.address.locality}, ${business.address.city} ${business.address.postcode}`;

export const areaServed = ['Old Trafford', 'Stretford', 'Hulme', 'Chorlton', 'Whalley Range', 'Trafford', 'Manchester M15', 'Manchester M16', 'Manchester M32'];

// Anything we cannot prove stays off the site until the flag is true
export const features = {
  mot: true, // the blue MOT Centre / Vehicle Testing Station sign is on the shop front photo
  prices: false, // TODO(client)
  warranty: false, // TODO(client)
  courtesyCar: false, // TODO(client)
  collection: false, // TODO(client): collection & delivery
  cardPayments: false, // TODO(client): payment methods
};

export const mainNav = [
  { label: 'Services', to: '/services' },
  ...(features.mot ? [{ label: 'MOT', to: '/mot' }] : []),
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Opening hours', to: '/opening-hours' },
  { label: 'Contact', to: '/contact' },
];

export const moreNav = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Car-care tips', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
];

export const legalNav = [
  { label: 'Privacy policy', to: '/privacy-policy' },
  { label: 'Terms', to: '/terms' },
];
