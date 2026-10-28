import { motion } from 'framer-motion';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { stagger } from '../components/ui/Section';
import CtaBand from '../components/ui/CtaBand';
import ServiceCard from '../components/sections/ServiceCard';
import { services } from '../data/services';
import { hospital } from '../data/site';

export default function Services() {
  return (
    <>
      <Seo title="Services" path="/services" description={`Services offered by ${hospital.title}: general consultation, diabetes, blood pressure, vaccinations, family medicine and health screening.`} />
      <PageHero
        eyebrow="Services"
        title="Care for everyday illness and long-term conditions"
        intro="Choose a service to see what it covers, what happens during the visit and how to prepare."
      />
      <Section>
        <div className="container-x">
          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </motion.div>
        </div>
      </Section>
      <CtaBand title="Not sure which service you need?" text="Book a general consultation and we will guide you from there." />
    </>
  );
}
