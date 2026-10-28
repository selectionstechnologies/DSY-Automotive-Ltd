import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useFade } from '../ui/Section';
import { serviceHref } from '../../data/services';

// Whole card is the link. Hover: lifts 2px, arrow slides right.
export default function ServiceCard({ service }) {
  const { icon: Icon, title, short } = service;
  return (
    <motion.li variants={useFade()} className="list-none">
      <Link
        to={serviceHref(service)}
        className="group card flex h-full flex-col p-6 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-hover active:translate-y-0 sm:p-7"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-card bg-brand text-brand-ink">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 !text-xl">{title}</h3>
        <p className="mt-2 flex-1 text-[15px] text-muted">{short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Find out more
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
    </motion.li>
  );
}
