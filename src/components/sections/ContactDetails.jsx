import { MapPin, Phone, Mail } from 'lucide-react';
import { hospital } from '../../data/site';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { waLink } from '../../lib/whatsapp';

const items = [
  { icon: MapPin, label: 'Hospital address', value: hospital.address, href: hospital.mapLink, external: true },
  { icon: Phone, label: 'Phone', value: hospital.phone, href: hospital.phoneHref },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: hospital.phone, href: waLink(), external: true },
  hospital.email && { icon: Mail, label: 'Email', value: hospital.email, href: `mailto:${hospital.email}` },
].filter(Boolean);

export default function ContactDetails() {
  return (
    <address className="grid gap-3 not-italic">
      {items.map(({ icon: Icon, label, value, href, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group card flex items-start gap-4 p-5 transition-all duration-300 ease-in-out hover:border-primary hover:shadow-card"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm">{label}</span>
            <span className="block break-words font-semibold text-ink">{value}</span>
          </span>
        </a>
      ))}
    </address>
  );
}

export function MapEmbed({ className = '', frameClassName = 'h-80 lg:h-full lg:min-h-[26rem]' }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-line ${className}`}>
      <iframe
        title={`Map showing ${hospital.clinicName}, ${hospital.area}`}
        src={hospital.mapEmbed}
        className={`w-full border-0 ${frameClassName}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
