import { Suspense } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import MobileActionBar from './MobileActionBar';
import ChatBot from '../widgets/ChatBot';
import WhatsAppButton from '../widgets/WhatsAppButton';

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink" aria-hidden="true" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  // useOutlet keeps the leaving page's element intact while it fades out
  const outlet = useOutlet();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-ui focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-brand-ink"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Suspense fallback={<PageLoader />}>{outlet}</Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileActionBar />
      <ChatBot />
      <WhatsAppButton />
    </>
  );
}
