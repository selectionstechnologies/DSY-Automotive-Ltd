import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { usePageFocus } from '../../lib/usePageFocus';
import { useFade } from './Section';
import Picture from './Picture';

// Banner at the top of every inner page, with breadcrumbs.
// crumbs: [{ label, to }]; the current page is appended from `current` or `title`.
// image: an entry from images.js; without one, the branded graphic panel is shown.
export default function PageHero({ eyebrow, title, intro, crumbs = [], current, image, icon: Icon, children }) {
  const headingRef = usePageFocus();
  const variants = useFade();
  const trail = [{ label: 'Home', to: '/' }, ...crumbs];

  return (
    <section className="border-b border-line bg-surface-2">
      <div className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16">
        <motion.div className="lg:col-span-7" initial="hidden" animate="visible" variants={variants}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              {trail.map((c) => (
                <li key={c.to} className="flex items-center gap-1.5">
                  <Link to={c.to} className="rounded-sm transition-colors hover:text-ink hover:underline">{c.label}</Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </li>
              ))}
              <li aria-current="page" className="font-medium text-ink">{current ?? title}</li>
            </ol>
          </nav>
          {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
          <h1 ref={headingRef} tabIndex={-1} className="mt-4 !text-[clamp(2.25rem,4.5vw,3.75rem)]">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>

        <div className="lg:col-span-5">
          {image ? (
            <div className="relative overflow-hidden rounded-media">
              <Picture image={image} sizes="(min-width: 1024px) 480px, 100vw" priority className="aspect-[4/3] w-full" />
            </div>
          ) : (
            <BrandPanel icon={Icon} />
          )}
        </div>
      </div>
    </section>
  );
}

// Branded graphic used where no relevant photo exists (never a random photo)
export function BrandPanel({ icon: Icon }) {
  return (
    <div className="relative hidden aspect-[4/3] overflow-hidden rounded-media bg-charcoal sm:block" aria-hidden="true">
      <div className="hazard absolute inset-x-0 top-0 h-3" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgb(var(--surface))_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full border-[28px] border-brand/90" />
      {Icon && (
        <span className="absolute left-8 top-12 flex h-20 w-20 items-center justify-center rounded-card bg-brand text-brand-ink">
          <Icon className="h-10 w-10" />
        </span>
      )}
      <p className="absolute bottom-8 left-8 font-heading text-2xl font-extrabold tracking-[0.12em] text-white">D.S.Y AUTOMOTIVE</p>
    </div>
  );
}
