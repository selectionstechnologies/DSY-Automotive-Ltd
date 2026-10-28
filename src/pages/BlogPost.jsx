import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import CtaBand from '../components/ui/CtaBand';
import NotFound from './NotFound';
import { getPost, formatDate } from '../data/blog';

function Block({ b }) {
  if (b.type === 'h2') return <h2>{b.text}</h2>;
  if (b.type === 'ul') return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  return <p>{b.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  return (
    <>
      <Seo title={post.title} path={`/blog/${post.slug}`} description={post.excerpt} />
      <PageHero
        eyebrow={`${post.category} · ${post.readTime}`}
        title={post.title}
        intro={post.excerpt}
        crumbs={[{ label: 'Health Tips', to: '/blog' }]}
        current="Article"
      />
      <Section>
        <article className="container-x max-w-3xl">
          <p className="text-sm">Published {formatDate(post.date)}</p>
          <div className="prose-body mt-8 text-lg">
            {post.body.map((b, i) => <Block key={i} b={b} />)}
          </div>
          <p className="mt-12 rounded-md bg-surface p-5 text-[15px]">
            This article is general information and not a substitute for medical advice. Please book a consultation for advice about your own health.
          </p>
          <Link to="/blog" className="link-arrow mt-10">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All health tips
          </Link>
        </article>
      </Section>
      <CtaBand />
    </>
  );
}
