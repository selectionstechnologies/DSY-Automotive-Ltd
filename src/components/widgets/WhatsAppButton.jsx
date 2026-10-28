import { motion } from 'framer-motion';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { waLink } from '../../lib/whatsapp';
import { hospital } from '../../data/site';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={waLink(`Assalam-o-Alaikum ${hospital.name}, I would like to ask about an appointment.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp, ${hospital.phone}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
      className="group fixed bottom-5 right-5 z-50 flex items-center sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none mr-3 hidden whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm font-medium text-ink opacity-0 shadow-card transition-opacity duration-300 group-hover:opacity-100 sm:block">
        WhatsApp {hospital.phone}
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-card transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:bg-whatsapp-dark">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </motion.a>
  );
}
