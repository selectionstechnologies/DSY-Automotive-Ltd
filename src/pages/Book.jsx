import { CalendarCheck, Phone, FileCheck, ShieldCheck } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import BookingForm from '../components/sections/BookingForm';
import HoursTable from '../components/sections/HoursTable';
import { business } from '../data/site';

const notes = [
  { icon: CalendarCheck, text: 'We call you to confirm the day and time.' },
  { icon: FileCheck, text: 'You get a price before any work starts.' },
  { icon: ShieldCheck, text: 'Your details are only used to arrange this booking.' },
];

export default function Book() {
  return (
    <>
      <Seo
        title="Book a Repair, Service or MOT in Old Trafford"
        description={`Book your car in at DSY Automotive, Chorlton Road, Old Trafford. Pick a service and a date, and we will call to confirm. Or ring ${business.phone}.`}
        path="/book"
      />
      <PageHero eyebrow="Book" title="Book your car in" current="Book" intro="Tell us about the car and when suits you. It takes about a minute." icon={CalendarCheck} />
      <Section className="!pt-10 sm:!pt-14">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BookingForm />
          </div>
          <aside className="space-y-6 lg:col-span-4" aria-label="Booking information">
            <ul className="card space-y-4 p-6">
              {notes.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="card p-6">
              <h2 className="!text-xl">Rather talk?</h2>
              <p className="mt-2 text-muted">Ring us and we will book you in on the phone.</p>
              <a href={business.phoneHref} className="btn-dark mt-4 w-full">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {business.phone}
              </a>
            </div>
            <HoursTable compact />
          </aside>
        </div>
      </Section>
    </>
  );
}
