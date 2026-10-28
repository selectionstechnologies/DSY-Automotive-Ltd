import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp } from '../ui/Section';

// Hover: lifts, border turns green, icon background fills
export default function ServiceCard({ service, index }) {
  const { slug, icon: Icon, title, short } = service;
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={`/services/${slug}`}
        className="group card flex h-full flex-col p-6 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-primary hover:shadow-card sm:p-7"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors duration-300 ease-in-out group-hover:bg-primary group-hover:text-white">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-heading text-sm text-muted/70">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-6 text-xl">{title}</h3>
        <p className="mt-2 flex-1 text-[15px]">{short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
}
