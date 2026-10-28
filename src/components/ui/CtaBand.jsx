import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import Section from './Section';
import WhatsAppIcon from './WhatsAppIcon';
import { waLink } from '../../lib/whatsapp';
import { hospital } from '../../data/site';

export default function CtaBand({
  title = 'Ready when you are.',
  text = 'Book a slot online in a minute, or send a quick message and the hospital team will find a time that suits you.',
}) {
  return (
    <Section className="!py-12 sm:!py-16">
      <div className="container-x">
        <div className="grid gap-8 rounded-lg bg-primary-dark px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-white/75">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link to="/appointment" className="btn-accent">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book appointment
            </Link>
            <a href={waLink(`Assalam-o-Alaikum ${hospital.name}, I would like to book an appointment.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
