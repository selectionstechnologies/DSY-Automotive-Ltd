import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, Check, ExternalLink, ClipboardCheck } from 'lucide-react';
import Seo, { faqJsonLd, breadcrumbJsonLd } from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { SectionHeading, useReveal } from '../components/ui/Section';
import Accordion from '../components/ui/Accordion';
import CtaBand from '../components/ui/CtaBand';
import { business } from '../data/site';
import { mot } from '../data/mot';
import { imageFor } from '../data/images';

// Typewriter line in the page banner
const typed = { prefix: 'Every MOT checks', phrases: ['brakes and steering', 'tyres and wheels', 'lights and signals', 'seat belts', 'emissions'] };

export default function Mot() {
  const reveal = useReveal();
  return (
    <>
      <Seo
        title="MOT Testing in Old Trafford, Manchester M15"
        description="MOT Centre on Chorlton Road, Old Trafford. Book your MOT and get a clear quote for any repairs before work starts."
        path="/mot"
        jsonLd={[faqJsonLd(mot.faqs), breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'MOT', path: '/mot' }])]}
      />
      <PageHero eyebrow="MOT Centre" title="MOT testing on Chorlton Road" current="MOT" intro={mot.intro} image={imageFor('service:mot')} icon={ClipboardCheck} typed={typed}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/book?service=mot-testing" className="btn-primary">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book your MOT
          </Link>
          <a href={business.phoneHref} className="btn-outline">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {business.phone}
          </a>
        </div>
      </PageHero>

      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Your MOT, step by step" />
          <ol className="grid gap-6 md:grid-cols-3">
            {mot.steps.map((st, i) => (
              <motion.li key={st.title} {...reveal(i)} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-heading text-lg font-extrabold text-brand-ink">{i + 1}</span>
                <h3 className="mt-5 !text-xl">{st.title}</h3>
                <p className="mt-2 text-muted">{st.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface-2">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What is checked</p>
            <h2 className="mt-4 !text-3xl">The main MOT checks</h2>
            <p className="mt-4 text-muted">The MOT is a legal check of your car&rsquo;s safety and emissions. It does not cover the engine, clutch or gearbox condition, which is why a service is still worth doing.</p>
            <a href="https://www.gov.uk/check-mot-history" target="_blank" rel="noopener noreferrer" className="link mt-6 inline-flex items-center gap-1.5">
              Check your MOT due date on GOV.UK
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mot.checks.map((c) => (
              <li key={c} className="flex gap-3 rounded-card border border-line bg-surface p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="container-x max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="MOT questions" />
          <Accordion items={mot.faqs} />
        </div>
      </Section>

      <CtaBand title="MOT due soon? Book it in." service="mot-testing" />
    </>
  );
}
