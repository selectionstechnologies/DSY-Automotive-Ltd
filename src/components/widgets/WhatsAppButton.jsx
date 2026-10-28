import { motion } from 'framer-motion';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { waLink } from '../../lib/whatsapp';
import { business } from '../../data/site';

// Desktop only (phones have the action bar). Hidden until business.whatsapp is set.
export default function WhatsAppButton() {
  if (!business.whatsapp) return null;
  return (
    <motion.a
      href={waLink(`Hello ${business.name}, I have a question about my car.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp, ${business.phone}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-7 right-7 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-charcoal text-white shadow-hover transition hover:-translate-y-0.5 lg:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
