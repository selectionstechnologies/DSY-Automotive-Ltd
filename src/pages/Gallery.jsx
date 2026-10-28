import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { fadeUp, stagger } from '../components/ui/Section';
import { gallery } from '../data/gallery';
import { hospital } from '../data/site';

export default function Gallery() {
  return (
    <>
      <Seo title="Gallery" path="/gallery" description={`A look inside ${hospital.clinicName}, ${hospital.area}.`} />
      <PageHero eyebrow="Gallery" title="Inside the hospital" intro="A look at Surgical Hospital, 102-J, Johar Town, Lahore." />
      <Section>
        <div className="container-x">
          <motion.ul variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <motion.li key={g.caption} variants={fadeUp}>
                <figure>
                  {g.src ? (
                    <img src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover object-top" />
                  ) : (
                    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-surface text-sm">
                      <ImageIcon className="h-7 w-7 text-muted/60" aria-hidden="true" />
                      Photo coming soon
                    </div>
                  )}
                  <figcaption className="mt-3 text-[15px] font-medium text-ink">{g.caption}</figcaption>
                </figure>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>
    </>
  );
}
