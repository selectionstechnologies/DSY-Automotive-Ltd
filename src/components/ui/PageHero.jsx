import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { usePageFocus } from '../../lib/usePageFocus';
import { business } from '../../data/site';
import { imageFor } from '../../data/images';
import { useFade } from './Section';
import Picture from './Picture';
import OpenBadge from './OpenBadge';

// Full-bleed photo banner at the top of every inner page, with breadcrumbs.
// crumbs: [{ label, to }]; the current page is appended from `current` or `title`.
// image: an entry from images.js (defaults to the shop front). focal: CSS object-position, to vary the crop per page.
// icon: shown in the floating card on desktop.
export default function PageHero({ eyebrow, title, intro, crumbs = [], current, image, focal, icon: Icon, children }) {
  const headingRef = usePageFocus();
  const fade = useFade();
  const still = useReducedMotion();
  const photo = image ?? imageFor('hero');
  const trail = [{ label: 'Home', to: '/' }, ...crumbs];
  const anim = (i) => ({ variants: fade, custom: i, initial: 'hidden', animate: 'visible' });

  return (
    <section className="on-dark relative isolate overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={still ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <Picture
          image={focal ? { ...photo, focal } : photo}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full"
        />
      </motion.div>
      {/* Overlay keeps white text above 4.5:1 on any part of the photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/80 via-charcoal/85 to-charcoal/95 lg:bg-gradient-to-r lg:from-charcoal/95 lg:via-charcoal/85 lg:to-charcoal/35" aria-hidden="true" />
      <div className="hazard absolute inset-x-0 bottom-0 h-1.5" aria-hidden="true" />

      <div className="container-x grid gap-10 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:min-h-[30rem] lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-7">
          <motion.nav {...anim(0)} aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
              {trail.map((c) => (
                <li key={c.to} className="flex items-center gap-1.5">
                  <Link to={c.to} className="rounded-sm transition-colors hover:text-white hover:underline">{c.label}</Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </li>
              ))}
              <li aria-current="page" className="font-medium text-white">{current ?? title}</li>
            </ol>
          </motion.nav>
          {eyebrow && <motion.p {...anim(1)} className="eyebrow mt-8 !text-white sm:mt-10">{eyebrow}</motion.p>}
          <motion.h1 {...anim(1)} ref={headingRef} tabIndex={-1} className="mt-4 !text-[clamp(2.125rem,4.5vw,3.75rem)] text-white">
            {title}
          </motion.h1>
          {intro && <motion.p {...anim(2)} className="mt-4 max-w-2xl text-base text-white/85 sm:mt-5 sm:text-lg">{intro}</motion.p>}
          {children && <motion.div {...anim(2)} className="mt-7 sm:mt-8">{children}</motion.div>}
        </div>

        {/* Floating info card, desktop only */}
        <motion.aside
          {...anim(2)}
          className="hidden justify-self-end rounded-media border border-white/15 bg-charcoal/70 p-6 shadow-hover backdrop-blur-md lg:col-span-4 lg:col-start-9 lg:block lg:w-full lg:max-w-sm"
          aria-label="Garage details"
        >
          {Icon && (
            <span className="flex h-14 w-14 items-center justify-center rounded-card bg-brand text-brand-ink">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
          )}
          <p className="mt-5 font-heading text-xl font-extrabold tracking-[0.12em] text-white">D.S.Y AUTOMOTIVE</p>
          <p className="mt-2 flex items-start gap-2 text-sm text-white/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {business.address.street}, {business.address.postcode}
          </p>
          <OpenBadge tone="light" className="mt-3" />
        </motion.aside>
      </div>
    </section>
  );
}
