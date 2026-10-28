import { Helmet } from 'react-helmet-async';
import { SITE_URL, hospital } from '../../data/site';

export default function Seo({ title, description, path = '/', image = '/og-image.webp', noindex = false, jsonLd }) {
  const fullTitle = title ? `${title} | ${hospital.name}` : `${hospital.title} | ${hospital.area}`;
  const url = `${SITE_URL}${path}`;
  const img = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={hospital.title} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export const hospitalJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: hospital.title,
  medicalSpecialty: 'Surgical',
  telephone: '+92 332 7370469',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: hospital.address,
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
};
