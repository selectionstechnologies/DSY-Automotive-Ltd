import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Navigation } from 'lucide-react';
import { business, addressLine, mainNav, moreNav, legalNav } from '../../data/site';
import { week } from '../../data/hours';
import { fmtTime } from '../../lib/openStatus';
import Logo from '../ui/Logo';

const footLink = 'rounded-sm text-white/75 transition-colors hover:text-white hover:underline';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-charcoal pb-24 text-white/75 lg:pb-0">
      <div className="hazard h-1.5" aria-hidden="true" />
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="inline-block rounded-ui" aria-label={`${business.name}, home`}>
            <Logo tone="light" className="h-10 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-[15px]">{business.tagline}</p>
          {business.socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {business.socials.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className={footLink}>{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer pages" className="lg:col-span-2">
          <h2 className="font-heading !text-base text-white">Garage</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {[{ label: 'Book your car in', to: '/book' }, ...mainNav].map((l) => (
              <li key={l.to}><Link to={l.to} className={footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer more" className="lg:col-span-2">
          <h2 className="font-heading !text-base text-white">More</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {[...moreNav, ...legalNav].map((l) => (
              <li key={l.to}><Link to={l.to} className={footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-heading !text-base text-white">Find us</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{addressLine}</li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={business.phoneHref} className={footLink}>{business.phone}</a>
            </li>
            {business.email && (
              <li className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${business.email}`} className={`${footLink} break-all`}>{business.email}</a>
              </li>
            )}
          </ul>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
            {week.map((h) => (
              <div key={h.day} className="contents">
                <dt>{h.day.slice(0, 3)}</dt>
                <dd className="text-white">{h.confirm ? 'Call to confirm' : h.closed ? 'Closed' : `${fmtTime(h.open)} – ${fmtTime(h.close)}`}</dd>
              </div>
            ))}
          </dl>
          <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand hover:underline">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get directions
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x space-y-1 py-6 text-sm">
          <p>
            &copy; {year} {business.legalName}.
            {business.companyNumber && ` Registered in England & Wales, Company No. ${business.companyNumber}.`}
            {business.registeredOffice && ` Registered office: ${business.registeredOffice}.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
