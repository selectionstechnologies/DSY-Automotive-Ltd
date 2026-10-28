import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, AlertCircle } from 'lucide-react';
import Seo, { faqJsonLd, breadcrumbJsonLd } from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { SectionHeading, useReveal } from '../components/ui/Section';
import Accordion from '../components/ui/Accordion';
import ServiceCard from '../components/sections/ServiceCard';
import CtaBand from '../components/ui/CtaBand';
import NotFound from './NotFound';
import { business } from '../data/site';
import { getService, relatedServices } from '../data/services';
import { imageFor } from '../data/images';

export default function ServiceDetail() {
  const { slug } = useParams();
  const reveal = useReveal();
  const s = getService(slug);
  if (!s || s.page) return <NotFound />;

  const path = `/services/${s.slug}`;
  const crumbs = [{ label: 'Services', to: '/services' }];

  return (
    <>
      <Seo
        title={`${s.seoName ?? s.title} in Old Trafford, M15`}
        description={`${s.short} ${s.title} at DSY Automotive, Chorlton Road, Old Trafford. Clear quote before any work.`}
        path={path}
        jsonLd={[
          faqJsonLd(s.faqs),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.title, path }]),
        ]}
      />
      <PageHero eyebrow={s.group} title={s.title} intro={s.intro} crumbs={crumbs} image={imageFor(`service:${s.slug}`)} icon={s.icon}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={`/book?service=${s.slug}`} className="btn-primary">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book {s.title.toLowerCase()}
          </Link>
          <a href={business.phoneHref} className="btn-outline">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {business.phone}
          </a>
        </div>
      </PageHero>

      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Warning signs</p>
            <h2 className="mt-4 !text-3xl">Signs you need it</h2>
            <ul className="mt-8 space-y-3">
              {s.signs.map((sign, i) => (
                <motion.li key={sign} {...reveal(i)} className="flex gap-3 rounded-card border border-line bg-surface p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{sign}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Our process</p>
            <h2 className="mt-4 !text-3xl">What we do</h2>
            <ol className="mt-8 space-y-6">
              {s.steps.map((step, i) => (
                <motion.li key={step} {...reveal(i)} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-heading font-extrabold text-brand-ink">{i + 1}</span>
                  <p className="pt-1.5">{step}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface-2">
        <div className="container-x max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${s.title}: your questions`} />
          <Accordion items={s.faqs} />
        </div>
      </Section>

      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="Related" title="You might also need" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices(s.slug).map((r, i) => <ServiceCard key={r.slug} service={r} index={i} />)}
          </ul>
        </div>
      </Section>

      <CtaBand title={`Book ${s.title.toLowerCase()}`} service={s.slug} />
    </>
  );
}
