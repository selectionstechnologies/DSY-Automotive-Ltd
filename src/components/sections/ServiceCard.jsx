import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../ui/Section';
import { serviceHref } from '../../data/services';

// Whole card is the link; animates in by itself on scroll. Phones: compact row (icon beside text).
// Hover: lifts 2px, arrow slides right. Press: settles back.
export default function ServiceCard({ service, index = 0 }) {
  const { icon: Icon, title, short } = service;
  const reveal = useReveal();
  return (
    <motion.li {...reveal(index)} className="list-none">
      <Link
        to={serviceHref(service)}
        className="group card flex h-full gap-4 p-5 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-hover active:translate-y-0 active:scale-[0.99] sm:flex-col sm:gap-0 sm:p-7"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-brand text-brand-ink transition-transform duration-200 group-hover:-rotate-6 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="!text-lg sm:mt-6 sm:!text-xl">{title}</h3>
          <p className="mt-1 flex-1 text-[15px] text-muted sm:mt-2">{short}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink sm:mt-5">
            Find out more
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
