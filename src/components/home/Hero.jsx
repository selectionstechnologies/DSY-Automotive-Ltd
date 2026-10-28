import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, MapPin, Check } from 'lucide-react';
import { business, features } from '../../data/site';
import { imageFor } from '../../data/images';
import { usePageFocus } from '../../lib/usePageFocus';
import { useOpenStatus } from '../../lib/openStatus';
import { useFade } from '../ui/Section';
import Picture from '../ui/Picture';

// Only true, checkable facts
const chips = ['Old Trafford, M15', 'All makes & models', ...(features.mot ? ['MOT Centre'] : []), 'Free advice by phone'];

function StatusCard() {
  const status = useOpenStatus();
  // Reserve the space during prerender so nothing shifts when the status arrives
  if (!status || status.state === 'unknown') {
    return status ? (
      <p className="text-sm font-semibold text-ink">Call {business.phone} to check today&rsquo;s hours</p>
    ) : (
      <p className="h-5 w-40" aria-hidden="true" />
    );
  }
  const open = status.state === 'open';
  return (
    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
      <span className={`h-2.5 w-2.5 rounded-full ${open ? 'bg-success' : 'bg-muted'}`} aria-hidden="true" />
      {status.label}
    </p>
  );
}

export default function Hero() {
  const headingRef = usePageFocus();
  const fade = useFade();
  const hero = imageFor('hero');
  const anim = (i) => ({ variants: fade, initial: 'hidden', animate: 'visible', transition: { delay: i * 0.06 } });

  return (
    <section className="overflow-hidden border-b border-line">
      <div className="container-x grid gap-8 pb-14 pt-4 sm:pt-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16">
        {/* Photo first on mobile, right column on desktop */}
        <div className="relative lg:order-2 lg:col-span-6">
          <div className="relative">
            <div className="hazard absolute -right-2 bottom-8 top-8 hidden w-4 rounded-r-card sm:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-media bg-surface-2">
              <Picture image={hero} priority sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute left-3 top-3 rounded-card bg-surface px-4 py-3 shadow-hover sm:left-5 sm:top-5">
              <StatusCard />
            </div>
            <div className="on-dark absolute bottom-3 right-3 flex max-w-[16rem] items-start gap-2 rounded-card bg-charcoal/95 px-4 py-3 text-sm text-white shadow-hover sm:bottom-5 sm:right-6">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{business.address.street}, {business.address.postcode}</span>
            </div>
          </div>
        </div>

        <div className="lg:order-1 lg:col-span-6">
          <motion.p {...anim(0)} className="eyebrow">Independent garage · Old Trafford, Manchester</motion.p>
          <motion.h1 {...anim(1)} ref={headingRef} tabIndex={-1} className="mt-5">
            Car repairs, servicing &amp; MOTs on <span className="bg-[linear-gradient(transparent_62%,rgb(var(--brand))_62%)] px-1">Chorlton Road</span>
          </motion.h1>
          <motion.p {...anim(2)} className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            We find the fault, explain it in plain English and give you the price before any work starts.
          </motion.p>

          <motion.div {...anim(3)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/book" className="btn-primary text-base">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book your car in
            </Link>
            <a href={business.phoneHref} className="btn-outline text-base">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {business.phone}
            </a>
          </motion.div>

          <motion.ul {...anim(4)} className="mt-8 flex flex-wrap gap-2" aria-label="About the garage">
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink">
                <Check className="h-4 w-4 text-success" aria-hidden="true" />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
