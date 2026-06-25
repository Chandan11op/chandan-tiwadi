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
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const duration = 1600; // total animation time in ms
    const intervalTime = 25; // update interval in ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 300); // slight delay after reaching 100% for smooth entry
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
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
            initial={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)", transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="fixed inset-0 z-50 bg-darkBg flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background glowing effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-secondaryAccent/5 blur-[100px] pointer-events-none" />

            <div className="relative flex flex-col items-center">
              {/* Outer Circular Glow Track */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Ring 1 - Golden Pulse */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-accent/25 border-t-accent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                />
                
                {/* Ring 2 - Electric Blue Orbit */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-3 border border-dotted border-secondaryAccent/45 border-b-secondaryAccent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                />

                {/* Ring 3 - Innermost Glowing Accent */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-8 border border-accent/10 rounded-full bg-primary/30 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(59,130,246,0.08)]"
                />

                {/* Percentage Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                  <motion.span 
                    className="text-4xl md:text-5xl font-black text-gradient-mixed tracking-tighter font-sans tabular-nums"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {Math.round(progress)}
                  </motion.span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] -mt-1 font-sans">
                    %
                  </span>
                </div>
              </div>

              {/* Loader Status message */}
              <div className="h-6 flex items-center justify-center mt-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={
                      progress < 25 ? "init" : 
                      progress < 50 ? "comp" : 
                      progress < 75 ? "build" : 
                      progress < 100 ? "optim" : "welcome"
                    }
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs text-gray-400 font-bold uppercase tracking-[0.25em] text-center font-sans"
                  >
                    {progress < 25 ? "Initializing Systems..." :
                     progress < 50 ? "Compiling Assets..." :
                     progress < 75 ? "Building Experience..." :
                     progress < 100 ? "Optimizing Interface..." : "Welcome"}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Glowing Linear Progress Bar */}
              <div className="w-52 h-[3px] bg-white/5 rounded-full overflow-hidden mt-6 relative border border-white/5 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-secondaryAccent"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
                {/* Glow dot on tip */}
                <motion.div 
                  className="absolute top-0 w-3 h-full bg-white blur-[2px] shadow-[0_0_8px_#fff]"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
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
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-primary/90 border border-accent/30 text-gray-100 shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
