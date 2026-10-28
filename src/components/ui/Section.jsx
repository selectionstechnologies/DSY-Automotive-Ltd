import { motion, useReducedMotion } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

// Reduced motion: fade only, no movement
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const useFade = () => (useReducedMotion() ? fadeIn : fadeUp);

// Every section fades up once when it scrolls into view
export default function Section({ id, className = '', children, ...rest }) {
  const variants = useFade();
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeading({ eyebrow, title, text, align = 'left', as: Tag = 'h2', light = false, children }) {
  const center = align === 'center';
  return (
    <div className={`mb-10 flex flex-col gap-6 sm:mb-14 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={`max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {eyebrow && <p className={`eyebrow mb-4 ${light ? '!text-white' : ''}`}>{eyebrow}</p>}
        <Tag className={light ? 'text-white' : ''}>{title}</Tag>
        {text && <p className={`mt-4 text-lg ${light ? 'text-white/80' : 'text-muted'}`}>{text}</p>}
      </div>
      {children}
    </div>
  );
}
