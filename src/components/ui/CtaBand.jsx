import { Link } from 'react-router-dom';
import { CalendarCheck, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Section, { useReveal } from './Section';
import { business } from '../../data/site';

export default function CtaBand({
  title = 'Car not feeling right? Bring it in.',
  text = 'Book online in a minute or give us a call. We find the problem and give you a price before any work starts.',
  service,
}) {
  const reveal = useReveal();
  return (
    <Section className="!py-12 sm:!py-16">
      <div className="container-x">
        <motion.div {...reveal(0)} className="on-dark relative grid gap-8 overflow-hidden rounded-media bg-charcoal px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:items-center">
          <div className="hazard absolute inset-y-0 left-0 w-2" aria-hidden="true" />
          <div className="lg:col-span-7">
            <h2 className="text-white">{title}</h2>
            <p className="mt-3 text-white/75">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link to={service ? `/book?service=${service}` : '/book'} className="btn-primary">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book your car in
            </Link>
            <a href={business.phoneHref} className="btn-outline-light">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {business.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
