import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { useReveal } from '../components/ui/Section';
import CtaBand from '../components/ui/CtaBand';
import { posts } from '../data/blog';
import { fmtDate } from '../lib/format';

export default function Blog() {
  const reveal = useReveal();
  return (
    <>
      <Seo
        title="Car-Care Tips from Our Old Trafford Garage"
        description="Plain-English car-care tips from DSY Automotive: warning lights, servicing intervals and brake warning signs."
        path="/blog"
      />
      <PageHero eyebrow="Car-care tips" title="Advice from the workshop" current="Car-care tips" intro="Short, practical guides to help you spot problems early and save money." icon={BookOpen} />
      <Section>
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <motion.li key={p.slug} {...reveal(i)}>
                <Link to={`/blog/${p.slug}`} className="group card flex h-full flex-col p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-hover sm:p-7">
                  <p className="text-sm text-muted"><time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.readMins} min read</p>
                  <h2 className="mt-3 !text-xl leading-snug sm:!text-2xl">{p.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] text-muted">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
