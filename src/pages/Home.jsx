import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Navigation, CalendarCheck } from 'lucide-react';
import Seo from '../components/layout/Seo';
import Hero from '../components/home/Hero';
import Section, { SectionHeading, stagger, useFade } from '../components/ui/Section';
import ServiceCard from '../components/sections/ServiceCard';
import HoursTable from '../components/sections/HoursTable';
import MapEmbed from '../components/sections/MapEmbed';
import ReviewsBlock from '../components/sections/Reviews';
import CtaBand from '../components/ui/CtaBand';
import Picture from '../components/ui/Picture';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { business, addressLine } from '../data/site';
import { featuredServices } from '../data/services';
import { reasons, process, workshop } from '../data/about';
import { imageFor } from '../data/images';
import { waLink } from '../lib/whatsapp';

const quickActions = [
  { icon: Phone, label: 'Call us', sub: business.phone, href: business.phoneHref },
  business.whatsapp && { icon: WhatsAppIcon, label: 'WhatsApp', sub: 'Send a message', href: waLink(), external: true },
  { icon: Navigation, label: 'Directions', sub: business.address.postcode, href: business.mapLink, external: true },
  { icon: CalendarCheck, label: 'Book online', sub: 'Takes a minute', to: '/book' },
].filter(Boolean);

function QuickActions() {
  const cls = 'group flex min-h-[64px] items-center gap-3 px-4 py-4 transition-colors hover:bg-surface-2 sm:px-6';
  const body = (a) => (
    <>
      <a.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="leading-tight">
        <span className="block font-semibold text-ink group-hover:underline">{a.label}</span>
        <span className="block text-sm text-muted">{a.sub}</span>
      </span>
    </>
  );
  return (
    <nav aria-label="Quick actions" className="border-b border-line bg-surface">
      <ul className={`container-x grid grid-cols-2 divide-line ${quickActions.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} md:divide-x`}>
        {quickActions.map((a) => (
          <li key={a.label}>
            {a.to ? <Link to={a.to} className={cls}>{body(a)}</Link> : (
              <a href={a.href} className={cls} {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body(a)}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Home() {
  const fade = useFade();
  const band = imageFor('about');

  return (
    <>
      <Seo
        title="Car Repairs & Servicing in Old Trafford, Manchester"
        description={`MOTs, servicing, diagnostics, repairs and tyres at ${addressLine}. Clear quotes before any work. Call ${business.phone}.`}
        path="/"
      />
      <Hero />
      <QuickActions />

      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="What we do" title="Repairs and servicing for every make" text="From a quick tyre swap to engine work, we tell you what is wrong and what it costs first.">
            <Link to="/services" className="btn-outline shrink-0">
              All services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </SectionHeading>
          <motion.ul variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </motion.ul>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Three steps, no surprises" />
          <motion.ol variants={stagger} className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
            <span className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-line-strong/50 lg:block" aria-hidden="true" />
            <span className="absolute bottom-6 left-6 top-6 w-0.5 bg-line-strong/50 lg:hidden" aria-hidden="true" />
            {process.map((p, i) => (
              <motion.li key={p.title} variants={fade} className="relative flex gap-5 lg:flex-col">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand font-heading text-lg font-extrabold text-brand-ink ring-8 ring-surface-2">
                  {i + 1}
                </span>
                <div>
                  <h3 className="!text-xl">{p.title}</h3>
                  <p className="mt-2 max-w-xs text-muted">{p.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Section>

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Why drivers come back</p>
            <h2 className="mt-4">Straight talk from a local garage</h2>
            <p className="mt-4 text-lg text-muted">No jargon and no upselling. Just the work your car needs, explained clearly.</p>
          </div>
          <motion.ul variants={stagger} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {reasons.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={fade} className="border-t-2 border-ink pt-6">
                <Icon className="h-7 w-7" aria-hidden="true" />
                <h3 className="mt-4 !text-xl">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>

      {/* The one dark feature band */}
      <Section className="on-dark bg-charcoal !py-0">
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div className="overflow-hidden rounded-media">
            <Picture image={band} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full" />
          </div>
          <div>
            <p className="eyebrow !text-white">The workshop</p>
            <h2 className="mt-4 text-white">Look for the yellow sign</h2>
            {workshop.map((p) => <p key={p} className="mt-4 text-lg text-white/80">{p}</p>)}
            <Link to="/about" className="btn-primary mt-8">
              About the garage
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="Reviews" title="What customers say">
            <Link to="/reviews" className="link shrink-0">All reviews</Link>
          </SectionHeading>
          <ReviewsBlock limit={3} />
        </div>
      </Section>

      <Section className="border-t border-line bg-surface-2">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Find us" title="On Chorlton Road, Old Trafford" />
            <p className="-mt-6 text-lg">{addressLine}</p>
            <div className="mt-6">
              <HoursTable compact />
            </div>
            <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className="btn-dark mt-6">
              <Navigation className="h-5 w-5" aria-hidden="true" />
              Get directions
            </a>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
