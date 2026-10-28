import { HelpCircle } from 'lucide-react';
import Seo, { faqJsonLd } from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Accordion from '../components/ui/Accordion';
import CtaBand from '../components/ui/CtaBand';
import { faqs } from '../data/faq';

export default function Faq() {
  return (
    <>
      <Seo
        title="Car Repair FAQs, Garage in Old Trafford"
        description="Answers about booking, quotes, waiting times, parking near Chorlton Road and the makes we work on at DSY Automotive."
        path="/faq"
        jsonLd={faqJsonLd(faqs)}
      />
      <PageHero eyebrow="FAQ" title="Questions we get asked" current="FAQ" intro="Cannot see your question? Give us a call." icon={HelpCircle} />
      <Section>
        <div className="container-x max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
