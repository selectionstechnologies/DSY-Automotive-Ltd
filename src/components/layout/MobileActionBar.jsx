import { Link } from 'react-router-dom';
import { Phone, Navigation, CalendarCheck } from 'lucide-react';
import { business } from '../../data/site';

// Sticky bottom bar on phones and tablets: Call · Directions · Book. Padded for the iOS home indicator.
export default function MobileActionBar() {
  const item = 'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold transition-colors';
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(var(--text)/0.2)] lg:hidden">
      <div className="flex">
        <a href={business.phoneHref} className={`${item} text-ink hover:bg-surface-2`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
        <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-line text-ink hover:bg-surface-2`}>
          <Navigation className="h-5 w-5" aria-hidden="true" />
          Directions
        </a>
        <Link to="/book" className={`${item} bg-brand text-brand-ink hover:bg-brand-strong`}>
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Book
        </Link>
      </div>
    </nav>
  );
}
