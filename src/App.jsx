import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { features } from './data/site';

// Inner pages are split into their own chunks
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Mot = lazy(() => import('./pages/Mot'));
const OpeningHours = lazy(() => import('./pages/OpeningHours'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Faq = lazy(() => import('./pages/Faq'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Book = lazy(() => import('./pages/Book'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        {features.mot && <Route path="mot" element={<Mot />} />}
        <Route path="about" element={<About />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="opening-hours" element={<OpeningHours />} />
        <Route path="book" element={<Book />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="faq" element={<Faq />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
