import { motion } from 'framer-motion';
import { Building2, Stethoscope } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { SectionHeading, fadeUp, stagger } from '../components/ui/Section';
import CtaBand from '../components/ui/CtaBand';
import { hospital } from '../data/site';
import { bio, philosophy, facilities, departments } from '../data/about';
import buildingImg from '../assets/hospital-building.webp';

export default function About() {
  return (
    <>
      <Seo title="About" path="/about" description={`About ${hospital.title}: facilities, departments and care at ${hospital.address}.`} />
      <PageHero eyebrow="About the hospital" title={`About ${hospital.title}`} intro={`${hospital.specialty} at ${hospital.address}.`} />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <img src={buildingImg} alt={`${hospital.title} building, ${hospital.area}`} width="1360" height="1020"
              className="aspect-[4/3] w-full rounded-lg object-cover lg:sticky lg:top-28" />
          </div>
          <div className="space-y-5 text-lg lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Who we are</h2>
            {bio.map((p) => <p key={p}>{p}</p>)}
            <blockquote className="!mt-10 border-l-2 border-accent pl-6">
              <p className="font-heading text-2xl italic leading-snug text-ink">&ldquo;{philosophy}&rdquo;</p>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Facilities" title="Inside the hospital" />
            <motion.ul variants={stagger} className="divide-y divide-line border-y border-line">
              {facilities.map((f) => (
                <motion.li key={f.title} variants={fadeUp} className="flex gap-4 py-5">
                  <Building2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{f.title}</p>
                    <p className="text-[15px]">{f.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <SectionHeading eyebrow="Departments" title="Surgical specialties" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {departments.map((d) => (
                <li key={d} className="card flex items-center gap-3 p-4 font-semibold text-ink">
                  <Stethoscope className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
