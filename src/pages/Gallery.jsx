import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { stagger, useFade } from '../components/ui/Section';
import Picture from '../components/ui/Picture';
import CtaBand from '../components/ui/CtaBand';
import { galleryImages } from '../data/images';

// Real photos only. No placeholder tiles.
export default function Gallery() {
  const fade = useFade();
  return (
    <>
      <Seo
        title="Photos of Our Garage in Old Trafford, Manchester"
        description="Photos of the DSY Automotive garage on Chorlton Road, Old Trafford."
        path="/gallery"
      />
      <PageHero eyebrow="Gallery" title="The garage" intro="Our workshop on Chorlton Road, under the yellow D.S.Y. Automotive sign." icon={Camera} />
      <Section>
        <div className="container-x">
          <motion.ul variants={stagger} className={`grid gap-5 ${galleryImages.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {galleryImages.map((img) => (
              <motion.li key={img.id} variants={fade}>
                <figure>
                  <Picture image={img} sizes={galleryImages.length > 1 ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 1200px) 1168px, 100vw'} className="aspect-[4/3] w-full rounded-media" />
                  <figcaption className="mt-3 text-sm text-muted">{img.alt}</figcaption>
                </figure>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
