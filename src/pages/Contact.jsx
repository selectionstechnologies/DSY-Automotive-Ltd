import { Phone } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import ContactCards from '../components/sections/ContactCards';
import MapEmbed from '../components/sections/MapEmbed';
import BookingForm from '../components/sections/BookingForm';
import { business, addressLine } from '../data/site';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Our Garage in Old Trafford, Manchester"
        description={`Call DSY Automotive on ${business.phone} or visit us at ${addressLine}.`}
        path="/contact"
      />
      <PageHero eyebrow="Contact" title="Get in touch" intro="The quickest way to reach us is a phone call. You can also send a message below." icon={Phone} />
      <Section className="!pt-10 sm:!pt-14">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ContactCards />
            <div className="mt-6"><MapEmbed className="h-80" /></div>
          </div>
          <div className="lg:col-span-6">
            <h2 className="!text-3xl">Send a message</h2>
            <p className="mb-6 mt-2 text-muted">Ask a question or request a quote. We reply by phone.</p>
            <BookingForm variant="contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
