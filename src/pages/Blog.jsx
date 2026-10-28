import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section, { fadeUp, stagger } from '../components/ui/Section';
import { posts, formatDate } from '../data/blog';
import { hospital } from '../data/site';

export default function Blog() {
  return (
    <>
      <Seo title="Health Tips" path="/blog" description={`Practical health articles from ${hospital.title} on diabetes, blood pressure and everyday illness.`} />
      <PageHero eyebrow="Health tips" title="Notes from the hospital" intro="Short, practical reads on the questions patients ask most." />
      <Section>
        <div className="container-x">
          <motion.div variants={stagger} className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link to={`/blog/${p.slug}`} className="group card flex h-full flex-col p-7 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary hover:shadow-card">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{p.category}</span>
                  <h2 className="mt-3 text-2xl leading-snug transition-colors duration-300 group-hover:text-primary">{p.title}</h2>
                  <p className="mt-3 flex-1 text-[15px]">{p.excerpt}</p>
                  <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                    {formatDate(p.date)} · {p.readTime}
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </>
  );
}
