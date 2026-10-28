import { motion, useReducedMotion } from 'framer-motion';

// custom = position in its grid row, so cards in the same row cascade left to right
export const fadeUp = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: (i % 3) * 0.09 },
  }),
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

// Props for one card or list item that animates in by itself when it scrolls into view (once).
// Usage: const reveal = useReveal(); <motion.li {...reveal(i)}>
export function useReveal() {
  const variants = useFade();
  return (i = 0) => ({
    variants,
    custom: i,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.2, margin: '0px 0px -40px 0px' },
  });
}

// Section headings and blocks fade up once when they scroll into view
export default function Section({ id, className = '', children, ...rest }) {
  const variants = useFade();
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
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
    <div className={`mb-8 flex flex-col gap-5 sm:mb-14 sm:gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={`max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {eyebrow && <p className={`eyebrow mb-3 sm:mb-4 ${light ? '!text-white' : ''}`}>{eyebrow}</p>}
        <Tag className={light ? 'text-white' : ''}>{title}</Tag>
        {text && <p className={`mt-3 text-base sm:mt-4 sm:text-lg ${light ? 'text-white/80' : 'text-muted'}`}>{text}</p>}
      </div>
      {children}
    </div>
  );
}
