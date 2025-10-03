import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import QuoteModal from './components/ui/QuoteModal';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <Home />
            </motion.div>
          }
        />
        <Route path="/about" element={<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><About /></motion.div>} />
        <Route path="/services" element={<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><Services /></motion.div>} />
        <Route path="/gallery" element={<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><Gallery /></motion.div>} />
        <Route path="/contact" element={<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><Contact /></motion.div>} />
        <Route path="*" element={<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><NotFound /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text">
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
        <QuoteModal />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;