import { Clock, Phone } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import HoursTable from '../components/sections/HoursTable';
import MapEmbed from '../components/sections/MapEmbed';
import OpenBadge from '../components/ui/OpenBadge';
import CtaBand from '../components/ui/CtaBand';
import { business, addressLine } from '../data/site';
import { hoursNotes } from '../data/hours';

export default function OpeningHours() {
  return (
    <>
      <Seo
        title="Opening Hours, Garage on Chorlton Road M15"
        description={`DSY Automotive opening hours at ${addressLine}. Call ${business.phone} to check before you travel.`}
        path="/opening-hours"
      />
      <PageHero eyebrow="Opening hours" title="When we are open" intro="Call ahead for a quick job and we will tell you the best time to come in." icon={Clock}>
        <OpenBadge className="text-base" />
      </PageHero>
      <Section>
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="!text-3xl">This week</h2>
            <div className="mt-6"><HoursTable /></div>
            <ul className="mt-6 space-y-2 text-muted">
              {hoursNotes.map((n) => <li key={n}>{n}</li>)}
            </ul>
            <a href={business.phoneHref} className="btn-primary mt-6">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {business.phone}
            </a>
          </div>
          <div className="lg:col-span-6">
            <h2 className="!text-3xl">Where to find us</h2>
            <p className="mt-2 text-muted">{addressLine}</p>
            <div className="mt-6"><MapEmbed className="h-80 lg:h-[26rem]" /></div>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
