import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Seo, { hospitalJsonLd } from '../components/layout/Seo';
import Hero from '../components/home/Hero';
import Section, { SectionHeading, fadeUp, stagger } from '../components/ui/Section';
import CtaBand from '../components/ui/CtaBand';
import ServiceCard from '../components/sections/ServiceCard';
import TestimonialCard from '../components/sections/TestimonialCard';
import { hospital, features } from '../data/site';
import { bio, philosophy } from '../data/about';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { posts, formatDate } from '../data/blog';
import buildingImg from '../assets/hospital-building.webp';

export default function Home() {
  return (
    <>
      <Seo
        description={`${hospital.title}, ${hospital.address}. Surgery, consultations and patient care. Book on WhatsApp ${hospital.phone}.`}
        jsonLd={hospitalJsonLd}
      />
      <Hero />

      {/* About preview */}
      <Section className="bg-surface">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <img src={buildingImg} alt={`${hospital.title} building, ${hospital.area}`} width="1360" height="1020" loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover" />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">About</p>
            <h2 className="text-3xl leading-tight sm:text-4xl">Surgical care you can trust, in Johar Town.</h2>
            <p className="mt-5 text-lg">{bio[0]}</p>
            <blockquote className="mt-8 border-l-2 border-accent pl-6">
              <p className="font-heading text-xl italic leading-snug text-ink sm:text-2xl">&ldquo;{philosophy}&rdquo;</p>
            </blockquote>
            <Link to="/about" className="link-arrow mt-8">
              More about the hospital <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Services preview */}
      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="Services" title="What we can help with" text="From a stubborn fever to years of diabetes care.">
            <Link to="/services" className="link-arrow shrink-0">
              All {services.length} services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </SectionHeading>
          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Why choose us */}
      <Section className="border-y border-line bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Why patients stay" title="The small things, done properly" />
          <motion.div variants={stagger} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <motion.div key={title} variants={fadeUp} className="border-t-2 border-primary pt-6">
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-[15px]">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Testimonials preview */}
      <Section>
        <div className="container-x">
          <SectionHeading eyebrow="Patient stories" title="In their own words">
            <Link to="/testimonials" className="link-arrow shrink-0">
              Read all reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </SectionHeading>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Health tips preview */}
      <Section className="bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Health tips" title="Notes from the hospital">
            <Link to="/blog" className="link-arrow shrink-0">
              All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </SectionHeading>
          <motion.ul variants={stagger} className="grid divide-y divide-line border-y border-line">
            {posts.map((p) => (
              <motion.li key={p.slug} variants={fadeUp}>
                <Link to={`/blog/${p.slug}`} className="group grid gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span className="text-sm sm:col-span-3">{formatDate(p.date)} · {p.category}</span>
                  <span className="font-heading text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-primary sm:col-span-8">{p.title}</span>
                  <ArrowRight className="hidden h-5 w-5 justify-self-end text-primary transition-transform duration-300 group-hover:translate-x-1 sm:col-span-1 sm:block" aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
