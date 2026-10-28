import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Phone, MapPin, Check, Clock } from 'lucide-react';
import { business, features } from '../../data/site';
import { imageFor } from '../../data/images';
import { usePageFocus } from '../../lib/usePageFocus';
import { useOpenStatus } from '../../lib/openStatus';
import Picture from '../ui/Picture';

// Only true, checkable facts
const chips = ['Old Trafford, M15', 'All makes & models', ...(features.mot ? ['MOT Centre'] : []), 'Free advice by phone'];

// Headline words, one array per line; the last line is yellow (except "on")
const lines = [['Car', 'repairs,'], ['servicing', '&', 'MOTs'], ['on', 'Chorlton', 'Road']];

const ease = [0.2, 0.7, 0.2, 1];

function StatusCard() {
  const status = useOpenStatus();
  if (!status) return <span className="block h-5 w-44" aria-hidden="true" />;
  if (status.state === 'unknown') return <span className="text-sm font-semibold text-white">Call {business.phone} for today&rsquo;s hours</span>;
  const open = status.state === 'open';
  return (
    <span className="flex items-center gap-2 text-sm font-semibold text-white">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-success motion-reduce:hidden" />}
        <span className={`relative h-2.5 w-2.5 rounded-full ${open ? 'bg-success' : 'bg-white/50'}`} />
      </span>
      {status.label}
    </span>
  );
}

// Full-bleed photo hero: slow zoom-out on the photo, headline rises word by word, then CTAs, chips and the info card.
// Reduced motion: plain fades, no movement.
export default function Hero() {
  const headingRef = usePageFocus();
  const still = useReducedMotion();
  const hero = imageFor('hero');

  const rise = (delay) =>
    still
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay } };

  let word = 0;

  return (
    <section className="on-dark relative isolate overflow-hidden bg-charcoal">
      {/* Photo: top band on phones, right-hand 70% on desktop so the sign sits beside the headline */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[23rem] overflow-hidden sm:h-[28rem] lg:inset-y-0 lg:left-[30%] lg:h-auto">
        <motion.div
          className="h-full w-full"
          initial={still ? false : { scale: 1.18 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.6, ease }}
        >
          <Picture image={hero} priority sizes="(min-width: 1024px) 70vw, 100vw" className="h-full w-full lg:!object-[0%_45%]" />
        </motion.div>
        {/* Fades the photo into the charcoal: downwards on phones, leftwards on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 via-40% to-charcoal lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/40 lg:via-35% lg:to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-charcoal/70 to-transparent lg:block" aria-hidden="true" />
      </div>

      <div className="container-x flex flex-col pb-14 pt-[17rem] sm:pt-[21rem] lg:min-h-[min(46rem,calc(100svh-7rem))] lg:justify-center lg:py-20">
        <div className="max-w-2xl">
          <motion.p {...rise(0.1)} className="eyebrow !text-white">
            Independent garage · Old Trafford, Manchester
          </motion.p>

          <h1 ref={headingRef} tabIndex={-1} className="mt-5 text-white" aria-label="Car repairs, servicing & MOTs on Chorlton Road">
            {lines.map((line, li) => (
              <span key={li} className="block" aria-hidden="true">
                {line.map((w) => {
                  const i = word++;
                  const yellow = li === lines.length - 1 && w !== 'on';
                  return (
                    <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                      <motion.span
                        className={`inline-block ${yellow ? 'text-brand' : ''}`}
                        initial={still ? { opacity: 0 } : { y: '110%' }}
                        animate={still ? { opacity: 1 } : { y: 0 }}
                        transition={{ duration: still ? 0.3 : 0.75, ease, delay: 0.2 + i * 0.07 }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-6 h-1 w-24 origin-left rounded-full bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: still ? 0 : 0.8, ease, delay: 0.9 }}
            aria-hidden="true"
          />

          <motion.p {...rise(0.95)} className="mt-6 max-w-xl text-[17px] text-white/85 sm:text-xl">
            We find the fault, explain it in plain English and give you the price before any work starts.
          </motion.p>

          <motion.div {...rise(1.1)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/book" className="btn-primary text-base shadow-hover">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book your car in
            </Link>
            <a href={business.phoneHref} className="btn-outline-light text-base backdrop-blur-sm">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {business.phone}
            </a>
          </motion.div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="About the garage">
            {chips.map((c, i) => (
              <motion.li
                key={c}
                {...rise(1.25 + i * 0.08)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
              >
                <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                {c}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Info card: under the text on phones, floating bottom-right on desktop */}
        <motion.div
          initial={still ? { opacity: 0 } : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: still ? 0.3 : 0.8, ease, delay: 1.4 }}
          className="mt-10 grid gap-3 rounded-media border border-white/15 bg-charcoal/60 p-5 shadow-hover backdrop-blur-md sm:max-w-sm lg:absolute lg:bottom-14 lg:right-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] lg:mt-0 lg:w-80"
        >
          <p className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-brand text-brand-ink">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <StatusCard />
          </p>
          <p className="flex items-center gap-3 text-sm text-white/85">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-white/10 text-brand">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            {business.address.street}, {business.address.postcode}
          </p>
        </motion.div>
      </div>

      <div className="hazard absolute inset-x-0 bottom-0 h-2" aria-hidden="true" />
    </section>
  );
}
