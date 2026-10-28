import { useState } from 'react';
import { Wrench } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import ServiceCard from '../components/sections/ServiceCard';
import CtaBand from '../components/ui/CtaBand';
import { services, groups } from '../data/services';
import { features } from '../data/site';

// Typewriter line in the page banner
const typed = { prefix: 'We handle', phrases: [...(features.mot ? ['MOT testing'] : []), 'full and interim services', 'brakes and clutches', 'engine diagnostics', 'new & part worn tyres', 'air con re-gas'] };

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function Services() {
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? groups : [active];

  return (
    <>
      <Seo
        title="Car Services & Repairs in Old Trafford, M15"
        description="MOTs, servicing, diagnostics, brakes, clutches, tyres, exhausts and auto electrics on Chorlton Road, Old Trafford. All makes and models."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title="Everything your car needs, under one roof"
        intro="Pick a service to see the warning signs and what we do. Not sure what is wrong? Book a check and we will find out."
        current="Services"
        typed={typed}
        icon={Wrench}
      />

      <Section>
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <nav aria-label="Filter services" className="min-w-0 lg:col-span-3">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
              {['All', ...groups].map((g) => (
                <li key={g} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(g)}
                    aria-pressed={active === g}
                    className={`min-h-[44px] w-full whitespace-nowrap rounded-ui border px-4 text-left text-[15px] font-medium transition-colors lg:whitespace-normal ${
                      active === g ? 'border-ink bg-brand text-brand-ink' : 'border-line bg-surface text-ink hover:border-ink'
                    }`}
                  >
                    {g === 'All' ? 'All services' : g}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-14 lg:col-span-9">
            {shown.map((g) => (
              <section key={g} aria-labelledby={`group-${slugify(g)}`}>
                <h2 id={`group-${slugify(g)}`} className="!text-2xl sm:!text-3xl">{g}</h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {services.filter((s) => s.group === g).map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
