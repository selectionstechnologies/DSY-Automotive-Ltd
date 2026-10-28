import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { usePageFocus } from '../../lib/usePageFocus';

// Banner at the top of every inner page, with breadcrumbs.
// crumbs: [{ label, to }] — the current page is appended automatically from `title`.
export default function PageHero({ eyebrow, title, intro, crumbs = [], current, children }) {
  const headingRef = usePageFocus();
  const trail = [{ label: 'Home', to: '/' }, ...crumbs];

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-x py-12 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            {trail.map((c) => (
              <li key={c.to} className="flex items-center gap-1.5">
                <Link to={c.to} className="transition-colors duration-300 hover:text-primary">{c.label}</Link>
                <ChevronRight className="h-3.5 w-3.5 text-muted/60" aria-hidden="true" />
              </li>
            ))}
            <li aria-current="page" className="font-medium text-ink">{current ?? title}</li>
          </ol>
        </nav>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 ref={headingRef} tabIndex={-1} className="text-4xl leading-[1.1] sm:text-5xl">
              {title}
            </h1>
            {intro && <p className="mt-5 max-w-2xl text-lg">{intro}</p>}
          </motion.div>
          {children && <div className="lg:col-span-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
