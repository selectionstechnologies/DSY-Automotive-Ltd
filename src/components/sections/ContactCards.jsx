import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { business, addressLine } from '../../data/site';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import OpenBadge from '../ui/OpenBadge';
import { waLink } from '../../lib/whatsapp';

const items = [
  { icon: Phone, label: 'Mobile', value: business.phone, href: business.phoneHref },
  business.landline && { icon: Phone, label: 'Landline', value: business.landline, href: business.landlineHref },
  business.whatsapp && { icon: WhatsAppIcon, label: 'WhatsApp', value: business.phone, href: waLink(), external: true },
  business.email && { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
  { icon: MapPin, label: 'Address', value: addressLine, href: business.mapLink, external: true },
  { icon: Clock, label: 'Opening hours', value: 'See this week', href: '/opening-hours', badge: true },
].filter(Boolean);

export default function ContactCards() {
  return (
    <address className="grid gap-3 not-italic sm:grid-cols-2">
      {items.map(({ icon: Icon, label, value, href, external, badge }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group card flex items-start gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-hover"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-brand text-brand-ink">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-muted">{label}</span>
            <span className="block break-words font-semibold text-ink group-hover:underline">{value}</span>
            {badge && <OpenBadge className="mt-1" />}
          </span>
        </a>
      ))}
    </address>
  );
}
