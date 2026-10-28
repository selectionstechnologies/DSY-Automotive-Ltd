// TEMPLATE: owner must have this reviewed
import { FileText, Lock } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import { privacy, terms } from '../data/legal';
import { fmtDate } from '../lib/format';

function LegalPage({ doc, title, intro, path, description, icon }) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <PageHero eyebrow="Legal" title={title} intro={intro} icon={icon} />
      <Section className="!pt-10 sm:!pt-14">
        <div className="container-x">
          <div className="prose-body">
            <p className="text-sm text-muted">Last updated <time dateTime={doc.updated}>{fmtDate(doc.updated)}</time></p>
            {doc.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((t) => <p key={t} className="mt-4">{t}</p>)}
                {s.list && <ul className="mt-4">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage doc={privacy} title="Privacy policy" path="/privacy-policy" icon={Lock}
      intro="What we collect when you contact us, how it reaches us, and your rights."
      description="How DSY Automotive handles the details you send through the booking and contact forms." />
  );
}

export function Terms() {
  return (
    <LegalPage doc={terms} title="Terms of business" path="/terms" icon={FileText}
      intro="Quotes, extra work, payment, parts and vehicles left with us."
      description="DSY Automotive terms of business for repairs, servicing and MOTs." />
  );
}
