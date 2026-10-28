import { Link, useParams } from 'react-router-dom';
import { Check, CalendarCheck, ArrowRight } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Accordion from '../components/ui/Accordion';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import NotFound from './NotFound';
import { services, getService } from '../data/services';
import { hospital } from '../data/site';
import { waLink } from '../lib/whatsapp';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <NotFound />;
  const Icon = s.icon;
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <Seo title={s.title} path={`/services/${s.slug}`} description={`${s.title} with ${hospital.title}. ${s.short}`} />
      <PageHero eyebrow="Service" title={s.title} intro={s.short} crumbs={[{ label: 'Services', to: '/services' }]}>
        <span className="hidden h-20 w-20 items-center justify-center rounded-full bg-primary text-white lg:ml-auto lg:flex">
          <Icon className="h-9 w-9" aria-hidden="true" />
        </span>
      </PageHero>

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <article className="space-y-14 lg:col-span-8">
            <div className="space-y-5 text-lg">
              <h2 className="text-3xl">Overview</h2>
              {s.overview.map((p) => <p key={p}>{p}</p>)}
            </div>

            <div>
              <h2 className="text-3xl">Conditions we see</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl">What to expect</h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.expect.map((step, i) => (
                  <li key={step.title} className="card p-5">
                    <span className="font-heading text-sm text-accent">Step {i + 1}</span>
                    <p className="mt-1 font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-[15px]">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-3xl">How to prepare</h2>
              <ul className="mt-6 space-y-3">
                {s.preparation.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-3xl">Questions</h2>
              <Accordion items={s.faqs} />
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-lg bg-primary-dark p-6 text-white">
                <h2 className="text-2xl text-white">Book this service</h2>
                <p className="mt-2 text-white/75">Consultation fee {hospital.fee}. Pick a date and we will confirm on WhatsApp.</p>
                <div className="mt-5 grid gap-3">
                  <Link to={`/appointment?service=${s.slug}`} className="btn-accent">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Book appointment
                  </Link>
                  <a href={waLink(`Assalam-o-Alaikum, I have a question about ${s.title}.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <WhatsAppIcon className="h-5 w-5" />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
              <nav aria-label="Other services" className="card p-6">
                <h2 className="text-lg">Other services</h2>
                <ul className="mt-3 divide-y divide-line">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link to={`/services/${o.slug}`} className="group flex items-center justify-between py-3 text-[15px] text-ink transition-colors duration-300 hover:text-primary">
                        {o.title}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
