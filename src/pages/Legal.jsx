import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import { privacy, disclaimer } from '../data/legal';
import { formatDate } from '../data/blog';

function LegalPage({ title, path, description, doc }) {
  return (
    <>
      <Seo title={title} path={path} description={description} />
      <PageHero eyebrow="Legal" title={title} intro={`Last updated ${formatDate(doc.updated)}.`} />
      <Section>
        <div className="container-x prose-body max-w-3xl text-lg">
          {doc.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p className="mt-3">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy" description="How information shared through this website and WhatsApp is used." doc={privacy} />;
}

export function Disclaimer() {
  return <LegalPage title="Medical Disclaimer" path="/disclaimer" description="Information on this website is general and does not replace a consultation." doc={disclaimer} />;
}
