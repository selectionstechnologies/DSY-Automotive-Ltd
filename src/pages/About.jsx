import { motion } from 'framer-motion';
import Seo, { breadcrumbJsonLd } from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { SectionHeading, useReveal } from '../components/ui/Section';
import CtaBand from '../components/ui/CtaBand';
import Picture from '../components/ui/Picture';
import { areaServed } from '../data/site';
import { story, workshop, reasons, process } from '../data/about';
import { imageFor } from '../data/images';

export default function About() {
  const reveal = useReveal();
  const photo = imageFor('about');
  return (
    <>
      <Seo
        title="About Our Garage in Old Trafford, Manchester"
        description="DSY Automotive is an independent garage on Chorlton Road, Old Trafford, looking after local drivers from Hulme, Stretford, Chorlton and Whalley Range."
        path="/about"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])}
      />
      <PageHero eyebrow="About the garage" title="A local garage that tells it straight" current="About" intro={story[0]} />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-media lg:sticky lg:top-28">
              <Picture image={photo} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full" />
            </div>
          </div>
          <div className="space-y-5 text-lg lg:col-span-6">
            <h2>Who we are</h2>
            {story.map((p) => <p key={p} className="text-muted">{p}</p>)}
            <h2 className="!mt-12">The workshop</h2>
            {workshop.map((p) => <p key={p} className="text-muted">{p}</p>)}
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="Simple, fair and clear" />
          <ol className="grid gap-6 md:grid-cols-3">
            {process.map((p, i) => (
              <motion.li key={p.title} {...reveal(i)} className="card p-6">
                <span className="font-heading text-4xl font-extrabold text-ink/15">0{i + 1}</span>
                <h3 className="mt-2 !text-xl">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </motion.li>
            ))}
          </ol>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <motion.li key={title} {...reveal(i)}>
                <Icon className="h-7 w-7" aria-hidden="true" />
                <h3 className="mt-3 !text-lg">{title}</h3>
                <p className="mt-1 text-[15px] text-muted">{text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="Area served" title="Drivers from across south Manchester" text="We are a short drive from most of M15, M16 and M32." />
          <ul className="flex flex-wrap gap-2">
            {areaServed.map((a) => (
              <li key={a} className="rounded-full border border-line bg-surface px-4 py-2 font-medium">{a}</li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
