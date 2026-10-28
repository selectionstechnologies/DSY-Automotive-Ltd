import { Helmet } from 'react-helmet-async';
import { SITE_URL, business, areaServed } from '../../data/site';
import { week } from '../../data/hours';

const DAY_URL = (d) => `https://schema.org/${d}`;

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': `${SITE_URL}/#business`,
  name: business.name,
  legalName: business.legalName,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: business.phoneIntl,
  ...(business.email && { email: business.email }),
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.locality,
    postalCode: business.address.postcode,
    addressCountry: 'GB',
  },
  ...(business.geo.lat != null && {
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  }),
  // Only confirmed opening times; "Call to confirm" days are left out
  openingHoursSpecification: week
    .filter((h) => h.open && !h.closed)
    .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: DAY_URL(h.day), opens: h.open, closes: h.close })),
  areaServed: areaServed.map((name) => ({ '@type': 'Place', name })),
  ...(business.socials.length && { sameAs: business.socials.map((s) => s.href) }),
};

export const faqJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

// trail: [{ name, path }] from Home to the current page
export const breadcrumbJsonLd = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}${c.path}` })),
});

// title: the page title without the brand; " | DSY Automotive" is appended
export default function Seo({ title, description, path = '/', image = '/og-image.jpg', type = 'website', noindex = false, jsonLd = [] }) {
  const fullTitle = `${title} | ${business.name}`;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const img = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const schemas = [businessJsonLd, ...[].concat(jsonLd)];

  return (
    <Helmet>
      <html lang="en-GB" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
