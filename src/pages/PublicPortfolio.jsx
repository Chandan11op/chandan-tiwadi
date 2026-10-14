import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function PublicPortfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Cinematic Intro Loader with Cobalt Brand Progress
  useEffect(() => {
    const duration = 1200;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Toast event listener
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
    <div className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-[#2C3480] selection:text-white font-sans">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(12px)", transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background glowing effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#2C3480]/25 blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#4D5BC9]/20 blur-[100px] pointer-events-none" />

            <div className="relative flex flex-col items-center">
              {/* Outer Circular Glow Track */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Ring 1 - Outer Cobalt Pulse */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-[#2C3480]/50 border-t-[#8C97E6] rounded-full shadow-[0_0_25px_rgba(44,52,128,0.4)]"
                />
                
                {/* Ring 2 - Inner Orbit */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  className="absolute inset-3 border border-dotted border-[#4D5BC9]/60 border-b-[#2C3480] rounded-full shadow-[0_0_20px_rgba(77,91,201,0.4)]"
                />

                {/* Ring 3 - Innermost Glowing Core */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-8 border border-[#2C3480]/40 rounded-full bg-black/70 backdrop-blur-sm shadow-[inset_0_0_25px_rgba(44,52,128,0.4)]"
                />

                {/* Percentage Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                  <motion.span 
                    className="text-4xl md:text-5xl font-black text-white tracking-tighter font-sans tabular-nums"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {Math.round(progress)}
                  </motion.span>
                  <span className="text-[10px] text-[#8C97E6] font-bold uppercase tracking-[0.25em] -mt-1 font-mono">
                    %
                  </span>
                </div>
              </div>

              {/* Status Message */}
              <div className="h-6 mt-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={
                      progress < 25 ? "init" : 
                      progress < 50 ? "comp" : 
                      progress < 75 ? "build" : 
                      progress < 100 ? "optim" : "welcome"
                    }
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs text-gray-300 font-bold uppercase tracking-[0.25em] text-center font-mono"
                  >
                    {progress < 25 ? "Initializing Architecture..." :
                     progress < 50 ? "Loading Portrait Perspectives..." :
                     progress < 75 ? "Igniting Volumetric Smoke..." :
                     progress < 100 ? "Finalizing Experience..." : "Welcome"}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Glowing Linear Progress Bar */}
              <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden mt-6 relative border border-white/5 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2C3480] via-[#4D5BC9] to-[#8C97E6]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
                {/* Glow dot on tip */}
                <motion.div 
                  className="absolute top-0 w-3 h-full bg-white blur-[2px] shadow-[0_0_10px_#fff]"
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
            <main className="w-full">
              {/* Every Section has its spacious, full, edge-to-edge container */}
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

      {/* Interactive Toast Notifications */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-black/90 border border-[#2C3480]/60 text-white shadow-[0_0_25px_rgba(44,52,128,0.35)] flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-[#8C97E6] animate-ping" />
            <span className="text-sm font-semibold tracking-wide font-sans">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
