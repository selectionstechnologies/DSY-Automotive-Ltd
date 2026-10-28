import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import Seo from '../components/layout/Seo';
import { business } from '../data/site';
import { usePageFocus } from '../lib/usePageFocus';

export default function NotFound() {
  const headingRef = usePageFocus();
  return (
    <>
      <Seo title="Page not found" description="This page could not be found." path="/404" noindex />
      <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="font-heading text-7xl font-extrabold text-brand-strong" aria-hidden="true">404</p>
        <h1 ref={headingRef} tabIndex={-1} className="mt-4 !text-4xl sm:!text-5xl">This page has broken down</h1>
        <p className="mt-4 max-w-lg text-lg text-muted">The link may be old or mistyped. Head back home, or give us a call.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to home
          </Link>
          <a href={business.phoneHref} className="btn-outline">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {business.phone}
          </a>
        </div>
      </section>
    </>
  );
}
