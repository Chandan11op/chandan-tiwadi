import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Cpu, ZoomIn, X, BookOpen, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { getPublicCertificates } from '../services/publicData';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import CertificateSkeleton from './skeletons/CertificateSkeleton';
import CinematicSmoke from './CinematicSmoke';

export default function Certifications() {
  const [certificationsData, setCertificationsData] = useState(portfolioData.certifications);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getPublicCertificates()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setCertificationsData(data);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Level and icon selector based on badge level value
  const getBadgeDetails = (icon) => {
    const raw = (icon || '').trim();
    const lower = raw.toLowerCase();

    if (lower === 'basic' || lower.includes('basic')) {
      return {
        label: raw || 'Basic',
        pillClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
        icon: <BookOpen className="w-5 h-5 text-sky-400" />
      };
    }
    if (lower === 'intermediate' || lower.includes('intermediate') || lower === 'js' || lower === 'ui') {
      return {
        label: raw === 'js' || raw === 'ui' ? 'Intermediate' : (raw || 'Intermediate'),
        pillClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        icon: <Cpu className="w-5 h-5 text-[#8C97E6]" />
      };
    }
    if (lower === 'expert' || lower.includes('expert') || lower === 'ai' || lower.includes('advanced')) {
      return {
        label: raw === 'ai' ? 'Expert' : (raw || 'Expert'),
        pillClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        icon: <Zap className="w-5 h-5 text-amber-400" />
      };
    }
    if (lower.includes('professional') || lower === 'award' || lower.includes('pro')) {
      return {
        label: raw === 'award' ? 'Professional Certificate' : (raw || 'Professional Certificate'),
        pillClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        icon: <Award className="w-5 h-5 text-emerald-400" />
      };
    }
    if (lower === 'python' || lower === 'html' || lower === 'c') {
      return {
        label: 'Basic',
        pillClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
        icon: <BookOpen className="w-5 h-5 text-sky-400" />
      };
    }
    return {
      label: raw || 'Certificate',
      pillClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      icon: <Award className="w-5 h-5 text-[#8C97E6]" />
    };
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
        {loading ? (
          <CertificateSkeleton count={6} />
        ) : certificationsData.length === 0 ? (
          <div className="p-12 rounded-3xl glass-card border border-white/5 text-center text-gray-400">
            <p className="text-base font-semibold">No certifications currently available.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
          >
            {certificationsData.map((cert, idx) => {
              const badgeInfo = getBadgeDetails(cert.badge_icon || cert.badgeIcon);
              return (
                <motion.div
                  key={cert.id || idx}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="rounded-3xl glass-card border border-white/[0.08] hover:border-[#2C3480]/80 hover:shadow-[0_8px_32px_rgba(44,52,128,0.3)] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group text-left"
                  onClick={() => setSelectedImage({ src: cert.image || cert.file_url, title: cert.title })}
                >
                  {(cert.image || cert.file_url) && (
                    <div className="relative w-full h-52 overflow-hidden border-b border-white/[0.06] bg-black/60 shrink-0">
                      <img 
                        src={getOptimizedImageUrl(cert.image || cert.file_url, { width: 800 })} 
                        alt={`${cert.title} - Certificate earned by Chandan Tiwadi`} 
                        loading="lazy"
                        decoding="async"
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
                      {badgeInfo.icon}
                    </div>

                    {/* Certification Detail */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-[#8C97E6] tracking-widest uppercase bg-[#2C3480]/25 px-2.5 py-0.5 rounded-full border border-[#2C3480]/50 font-mono">
                          {cert.year}
                        </span>
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border font-sans ${badgeInfo.pillClass}`}>
                          {badgeInfo.label}
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
              );
            })}
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal for Certificate Previews */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-black/95 rounded-3xl border border-white/20 p-2 sm:p-4 flex flex-col shadow-[0_0_50px_rgba(44,52,128,0.5)]"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 mb-2">
                <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {selectedImage.title}
                </h4>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl flex items-center justify-center bg-black/40">
                <img
                  src={getOptimizedImageUrl(selectedImage.src, { width: 1920 })}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
