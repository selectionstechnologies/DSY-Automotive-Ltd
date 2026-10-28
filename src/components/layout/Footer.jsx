import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Navigation } from 'lucide-react';
import { MapEmbed } from '../sections/ContactDetails';
import { hospital, mainNav, moreNav, legalNav, socials } from '../../data/site';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { waLink } from '../../lib/whatsapp';

const footLink = 'transition-colors duration-300 hover:text-white';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/70">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper font-heading text-lg font-semibold text-primary-dark">S</span>
            <span className="font-heading text-xl font-semibold text-white">{hospital.title}</span>
          </Link>
          <p className="mt-4 max-w-xs text-[15px]">{hospital.address}. Safe surgery and caring staff, under one roof.</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-primary-dark">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer pages" className="lg:col-span-2">
          <h2 className="font-heading text-base font-semibold text-white">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {mainNav.map((l) => (
              <li key={l.to}><Link to={l.to} className={footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer more" className="lg:col-span-2">
          <h2 className="font-heading text-base font-semibold text-white">More</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {[{ label: 'Book appointment', to: '/appointment' }, ...moreNav, ...legalNav].map((l) => (
              <li key={l.to}><Link to={l.to} className={footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-heading text-base font-semibold text-white">Visit the hospital</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{hospital.address}</li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={hospital.phoneHref} className={footLink}>{hospital.phone}</a>
            </li>
            {hospital.email && (
              <li className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${hospital.email}`} className={`${footLink} break-all`}>{hospital.email}</a>
              </li>
            )}
          </ul>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
            <WhatsAppIcon className="h-5 w-5" />
            Message on WhatsApp
          </a>
        </div>

        <div className="sm:col-span-2 lg:col-span-12">
          <MapEmbed className="border-white/10" frameClassName="h-64 sm:h-72" />
          <a href={hospital.mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-white transition-colors duration-300 hover:text-accent-soft">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get directions in Google Maps
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {hospital.title}. All rights reserved.</p>
          <p>Information on this site is not a substitute for a consultation.</p>
        </div>
      </div>
    </footer>
  );
}
