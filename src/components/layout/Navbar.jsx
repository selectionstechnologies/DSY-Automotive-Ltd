import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { business, addressLine, mainNav, moreNav } from '../../data/site';
import Logo from '../ui/Logo';
import OpenBadge from '../ui/OpenBadge';

function TopBar() {
  return (
    <div className="on-dark hidden bg-charcoal text-sm text-white/80 md:block">
      <div className="container-x flex h-10 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {addressLine}
        </p>
        <div className="flex items-center gap-6">
          <OpenBadge tone="light" className="!font-medium" />
          <a href={business.phoneHref} className="flex items-center gap-2 font-semibold text-white hover:text-brand">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

// Active link: red underline (one of the few red accents on a screen)
const linkCls = ({ isActive }) =>
  `relative py-2 text-[15px] font-medium transition-colors hover:text-ink ${
    isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent' : 'text-ink/75'
  }`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-shadow ${scrolled || open ? 'border-line shadow-card' : 'border-transparent'}`}>
        <nav className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]" aria-label="Main">
          <Link to="/" className="shrink-0 rounded-ui" aria-label={`${business.name}, home`}>
            <Logo className="h-9 w-auto sm:h-10" />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {mainNav.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkCls}>{l.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/book" className="btn-primary !min-h-[44px] py-2.5">Book your car in</Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-ui text-ink transition-colors hover:bg-surface-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-line bg-paper lg:hidden"
            >
              <ul className="container-x grid gap-1 py-4">
                {[{ label: 'Home', to: '/' }, ...mainNav, ...moreNav].map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `flex min-h-[48px] items-center rounded-ui px-3 font-medium transition-colors hover:bg-surface-2 ${
                          isActive ? 'bg-surface-2 text-ink shadow-[inset_3px_0_0_rgb(var(--accent))]' : 'text-ink'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Link to="/book" className="btn-primary w-full">Book your car in</Link>
                  <a href={business.phoneHref} className="btn-outline w-full">Call {business.phone}</a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
