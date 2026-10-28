import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { hospital, mainNav, moreNav } from '../../data/site';
import { getTiming } from '../../data/timings';
import { useToday } from '../../lib/useToday';

function TopBar() {
  const today = useToday();
  const t = today && getTiming(today);
  const hours = t && [t.morning, t.evening].filter(Boolean).join(', ');
  return (
    <div className="hidden bg-primary-dark text-sm text-white/80 md:block">
      <div className="container-x flex h-10 items-center justify-between">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-white/60" aria-hidden="true" />
          {hospital.address}
        </p>
        <div className="flex items-center gap-6">
          {t && <span>{hours ? `Open today: ${hours}` : 'Closed today'}</span>}
          <a href={hospital.phoneHref} className="flex items-center gap-2 text-white transition-colors duration-300 hover:text-accent-soft">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {hospital.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

const linkCls = ({ isActive }) =>
  `relative py-1 text-[15px] font-medium transition-colors duration-300 ease-in-out hover:text-primary ${
    isActive ? 'text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-accent' : 'text-ink'
  }`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ease-in-out ${
          solid ? 'border-line bg-paper shadow-card' : 'border-transparent bg-paper/0'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between sm:h-[4.5rem]" aria-label="Main navigation">
          <Link to="/" className="group flex items-center gap-3" aria-label={`${hospital.name}, home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-paper transition-colors duration-300 group-hover:bg-primary-dark">
              S
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg font-semibold text-ink">{hospital.name}</span>
              <span className="block text-xs text-muted">{hospital.area}</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {mainNav.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkCls}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/appointment" className="btn-accent hidden py-2.5 lg:inline-flex">
            Book appointment
          </Link>

          <button
            type="button"
            className="rounded-md p-2 text-ink transition-colors duration-300 hover:bg-surface lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-line bg-paper lg:hidden"
            >
              <ul className="container-x grid gap-1 py-4">
                {[{ label: 'Home', to: '/' }, ...mainNav, ...moreNav].map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-3 font-medium transition-colors duration-300 hover:bg-surface ${
                          isActive ? 'bg-surface text-primary' : 'text-ink'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Link to="/appointment" className="btn-accent w-full">Book appointment</Link>
                  <a href={hospital.phoneHref} className="btn-outline w-full">Call {hospital.phone}</a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
