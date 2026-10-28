import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import { usePageFocus } from '../lib/usePageFocus';

export default function NotFound() {
  const ref = usePageFocus();
  return (
    <>
      <Seo title="Page not found" path="/404" description="This page could not be found." noindex />
      <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="font-heading text-7xl font-semibold text-accent">404</p>
        <h1 ref={ref} tabIndex={-1} className="mt-4 text-4xl">This page has moved or never existed.</h1>
        <p className="mt-4 max-w-lg text-lg">Try one of these instead, or ask the chat assistant in the corner.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/services" className="btn-outline">Services</Link>
          <Link to="/appointment" className="btn-outline">Book appointment</Link>
        </div>
      </section>
    </>
  );
}
