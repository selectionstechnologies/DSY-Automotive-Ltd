import { motion, useReducedMotion } from 'framer-motion';

// custom = position in its grid row, so cards in the same row cascade left to right
export const fadeUp = {
  hidden: { opacity: 0, y: 56, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: (i % 3) * 0.12 },
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

// Photos: wipe open from the bottom with a slight zoom as they scroll into view
export function useImageReveal() {
  const still = useReducedMotion();
  return still
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.3 } }
    : {
        initial: { clipPath: 'inset(100% 0 0 0)', scale: 1.12 },
        whileInView: { clipPath: 'inset(0% 0 0 0)', scale: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 1.1, ease: [0.2, 0.7, 0.2, 1] },
      };
}

// Section headings and blocks fade up once when they scroll into view
const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Section({ id, className = '', children, ...rest }) {
  const variants = useReducedMotion() ? fadeIn : sectionFade;
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
