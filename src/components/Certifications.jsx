import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Terminal, Layers, Globe, Cpu, FileCode2, ZoomIn, Brain, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { getPublicCertificates } from '../services/publicData';
import CinematicSmoke from './CinematicSmoke';

export default function Certifications() {
  const [certificationsData, setCertificationsData] = useState(portfolioData.certifications);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getPublicCertificates().then((data) => {
      if (isMounted && data && data.length > 0) {
        setCertificationsData(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Icon selector based on badgeIcon value
  const getBadgeIcon = (icon) => {
    switch (icon) {
      case 'js':
        return <FileCode2 className="w-5 h-5 text-[#8C97E6]" />;
      case 'python':
        return <Terminal className="w-5 h-5 text-[#4D5BC9]" />;
      case 'ui':
        return <Layers className="w-5 h-5 text-[#8C97E6]" />;
      case 'html':
        return <Globe className="w-5 h-5 text-[#4D5BC9]" />;
      case 'c':
        return <Cpu className="w-5 h-5 text-[#8C97E6]" />;
      case 'ai':
        return <Brain className="w-5 h-5 text-[#4D5BC9]" />;
      default:
        return <Award className="w-5 h-5 text-[#8C97E6]" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="Certifications" className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Background Volumetric Smoke */}
      <CinematicSmoke intensity="subtle" align="left" className="opacity-70" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#2C3480]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C97E6] font-bold block mb-2">
            VALIDATED COMPETENCY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
            Professional <span className="text-gradient-cobalt">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-[#2C3480] mx-auto rounded-full mt-3 shadow-[0_0_12px_#2C3480]" />
          <p className="text-sm md:text-base text-gray-400 mt-4 max-w-lg mx-auto font-normal leading-relaxed">
            Industry and institutional credentials verifying competence across software engineering, web development, and algorithms.
          </p>
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-3xl glass-card border border-white/[0.08] hover:border-[#2C3480]/80 hover:shadow-[0_8px_32px_rgba(44,52,128,0.3)] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group text-left"
              onClick={() => setSelectedImage({ src: cert.image, title: cert.title })}
            >
              {cert.image && (
                <div className="relative w-full h-52 overflow-hidden border-b border-white/[0.06] bg-black/60 shrink-0">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="p-3 rounded-full bg-[#2C3480]/80 border border-white/20 text-white shadow-[0_0_20px_#2C3480]">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-7 flex items-start gap-4 flex-1">
                {/* Badge Icon */}
                <div className="p-3 rounded-2xl bg-[#2C3480]/20 border border-[#2C3480]/40 shrink-0">
                  {getBadgeIcon(cert.badgeIcon)}
                </div>

                {/* Certification Detail */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#8C97E6] tracking-widest uppercase bg-[#2C3480]/25 px-2.5 py-0.5 rounded-full border border-[#2C3480]/50 font-mono">
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#8C97E6] transition-colors font-sans">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/20 bg-black/90 p-4 shadow-[0_0_50px_rgba(44,52,128,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[75vh] rounded-2xl object-contain mx-auto"
              />
              <div className="text-center mt-3 text-sm text-gray-300 font-semibold px-4 font-sans">
                {selectedImage.title}
              </div>
              <button 
                className="absolute top-5 right-5 text-white bg-black/80 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors border border-white/20 cursor-pointer"
                onClick={() => setSelectedImage(null)}
                aria-label="Close certificate lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
