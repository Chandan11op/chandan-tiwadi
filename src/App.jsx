import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const showToast = (e) => {
      setToast({ show: true, message: e.detail });
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    };
    window.addEventListener('show-toast', showToast);
    return () => window.removeEventListener('show-toast', showToast);
  }, []);

  return (
    <div className="bg-darkBg min-h-screen text-gray-100 overflow-x-hidden selection:bg-accent selection:text-primary">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 bg-darkBg flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              {/* Animated Catchy Code Logo */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex items-center gap-1.5 z-10 select-none font-black text-4xl drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              >
                <span className="text-accent">&lt;</span>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-secondaryAccent font-bold"
                >
                  /
                </motion.span>
                <span className="text-accent">&gt;</span>
              </motion.div>
              {/* Spin circle around initials */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute inset-0 border-[3px] border-accent/5 border-t-accent border-r-secondaryAccent rounded-full -m-6 shadow-[0_0_15px_rgba(30,144,255,0.2)]"
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-12 select-none"
              >
                Loading Portfolio
              </motion.span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Certifications />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-primary/90 border border-accent/30 text-gray-100 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
