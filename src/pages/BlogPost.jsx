import { Link, useParams } from 'react-router-dom';
import { CalendarCheck, BookOpen } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import NotFound from './NotFound';
import { fmtDate } from '../lib/format';
import { SITE_URL, business } from '../data/site';
import { getPost } from '../data/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;
  const path = `/blog/${post.slug}`;

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={path}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            image: `${SITE_URL}/og-image.jpg`,
            mainEntityOfPage: `${SITE_URL}${path}`,
            author: { '@type': 'Organization', name: business.name },
            publisher: { '@id': `${SITE_URL}/#business` },
          },
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Car-care tips', path: '/blog' }, { name: post.title, path }]),
        ]}
      />
      <PageHero eyebrow={`${fmtDate(post.date)} · ${post.readMins} min read`} title={post.title} crumbs={[{ label: 'Car-care tips', to: '/blog' }]} current="Article" icon={BookOpen} />

      <Section className="!pt-10 sm:!pt-14">
        <article className="container-x">
          <div className="prose-body">
            <aside className="rounded-card border-l-4 border-brand bg-surface p-5 shadow-card" aria-label="Summary">
              <p className="text-sm font-semibold uppercase tracking-[0.12em]">In short</p>
              <p className="mt-2">{post.summary}</p>
            </aside>
            {post.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p?.map((t) => <p key={t} className="mt-4">{t}</p>)}
                {s.list && <ul className="mt-4">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}

            <div className="on-dark !mt-14 rounded-media bg-charcoal p-6 sm:p-8">
              <h2 className="!mt-0 !text-2xl text-white">Want us to take a look?</h2>
              <p className="mt-2 text-white/80">Book your car in and we will check it and give you a clear price before any work.</p>
              <Link to="/book" className="btn-primary mt-6">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book your car in
              </Link>
            </div>
          </div>
        </article>
      </Section>
    </>
  );
}
