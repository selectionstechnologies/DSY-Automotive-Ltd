import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  const base = useId();

  return (
    <div className="divide-y divide-line rounded-card border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3 className="font-body text-base font-semibold sm:text-[17px]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-6 px-5 py-4 text-left text-ink transition-colors hover:bg-surface-2 sm:px-6"
              >
                {item.q}
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-ui transition-colors ${isOpen ? 'bg-brand' : 'bg-surface-2'}`}>
                  <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} strokeWidth={1.75} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl px-5 pb-5 text-muted sm:px-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
