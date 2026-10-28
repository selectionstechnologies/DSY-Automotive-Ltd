import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Accordion from '../components/ui/Accordion';
import CtaBand from '../components/ui/CtaBand';
import { faqGroups } from '../data/faq';
import { hospital } from '../data/site';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }))
  ),
};

export default function Faq() {
  return (
    <>
      <Seo title="FAQ" path="/faq" description={`Answers about booking, fees, reports and follow-up at ${hospital.clinicName}.`} jsonLd={faqJsonLd} />
      <PageHero eyebrow="FAQ" title="Common questions" intro="Can't find your answer? Ask the chat assistant or message us on WhatsApp." />
      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ categories" className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-28 space-y-2">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="text-[15px] transition-colors duration-300 hover:text-primary">{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14 lg:col-span-9">
            {faqGroups.map((g) => (
              <div key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, '-')} className="scroll-mt-28">
                <h2 className="mb-4 text-2xl">{g.title}</h2>
                <Accordion items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
