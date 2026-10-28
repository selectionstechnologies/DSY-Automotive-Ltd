import { useState } from 'react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import ContactDetails, { MapEmbed } from '../components/sections/ContactDetails';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { hospital } from '../data/site';
import { waLink } from '../lib/whatsapp';

function QuickMessage() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2 || msg.trim().length < 5) {
      setError('Please add your name and a short message.');
      return;
    }
    setError('');
    window.open(waLink(`Assalam-o-Alaikum, this is ${name.trim()}.\n\n${msg.trim()}`), '_blank', 'noopener');
    setName('');
    setMsg('');
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-4 p-6 sm:p-8" aria-label="Send a message on WhatsApp">
      <h2 className="text-2xl">Send a quick message</h2>
      <div>
        <label htmlFor="c-name" className="mb-2 block text-sm font-semibold text-ink">Your name</label>
        <input id="c-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="c-msg" className="mb-2 block text-sm font-semibold text-ink">Message</label>
        <textarea id="c-msg" rows="4" maxLength={500} className="input resize-none" value={msg} onChange={(e) => setMsg(e.target.value)}
          aria-describedby={error ? 'c-error' : undefined} />
      </div>
      {error && <p id="c-error" role="alert" className="text-sm text-accent-dark">{error}</p>}
      <button type="submit" className="btn-whatsapp w-full">
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <Seo title="Contact" path="/contact" description={`Address, phone, WhatsApp and map for ${hospital.clinicName}, ${hospital.address}.`} />
      <PageHero eyebrow="Contact" title="Visit or get in touch" intro={`${hospital.clinicName}, ${hospital.area}. WhatsApp ${hospital.phone}.`} />
      <Section>
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <ContactDetails />
            <QuickMessage />
          </div>
          <MapEmbed className="lg:col-span-7" />
        </div>
      </Section>
    </>
  );
}
