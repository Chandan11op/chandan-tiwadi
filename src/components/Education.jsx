import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, ZoomIn, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { getPublicEducation } from '../services/publicData';
import CinematicSmoke from './CinematicSmoke';

export default function Education() {
  const [educationData, setEducationData] = useState(portfolioData.education);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getPublicEducation().then((data) => {
      if (isMounted && data && data.length > 0) {
        setEducationData(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="Education" className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Background Volumetric Fog */}
      <CinematicSmoke intensity="subtle" align="right" className="opacity-70" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#2C3480]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C97E6] font-bold block mb-2">
            ACADEMIC FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
            Academic <span className="text-gradient-cobalt">Milestones</span>
          </h2>
          <div className="w-16 h-1 bg-[#2C3480] mx-auto rounded-full mt-3 shadow-[0_0_12px_#2C3480]" />
          <p className="text-sm md:text-base text-gray-400 mt-4 max-w-lg mx-auto font-normal leading-relaxed">
            Formal technical education, foundational computer science training, and key academic achievements.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-8 md:pl-10 border-l-2 border-[#2C3480]/40 space-y-12 ml-2 sm:ml-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-12"
          >
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Node Circle */}
                <span className="absolute -left-[41px] md:-left-[43px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-black border-2 border-[#2C3480] shadow-[0_0_15px_#2C3480] z-20">
                  <GraduationCap className="h-4 w-4 text-[#8C97E6]" />
                </span>

                {/* Card Body */}
                <div className="p-7 sm:p-9 rounded-3xl glass-card border border-white/[0.08] hover:border-[#2C3480]/70 hover:shadow-[0_8px_32px_rgba(44,52,128,0.25)] transition-all duration-300 flex flex-col md:flex-row gap-7 items-start text-left">
                  {edu.image && (
                    <div 
                      className="w-full md:w-48 h-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 group cursor-pointer relative bg-black/50"
                      onClick={() => setSelectedImage({ src: edu.image, title: edu.institution })}
                    >
                      <img 
                        src={edu.image} 
                        alt={edu.institution} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 w-full">
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                        {edu.institution}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#8C97E6] font-semibold bg-[#2C3480]/20 px-3 py-1 rounded-full border border-[#2C3480]/40 w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    {/* Degree & Score */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-sm sm:text-base font-semibold text-gray-200">
                        {edu.degree}
                      </span>
                      <span className="h-4 w-[1px] bg-white/20 hidden sm:inline" />
                      <span className="text-xs font-bold text-[#8C97E6] bg-[#2C3480]/30 px-3 py-1 rounded-full border border-[#2C3480]/50 shadow-[0_0_10px_rgba(44,52,128,0.3)]">
                        {edu.details}
                      </span>
                    </div>

                    {/* Relevant Courses */}
                    {edu.relevantCourses && (
                      <div className="pt-4 border-t border-white/[0.06]">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-[#4D5BC9]" />
                          <span>Relevant Coursework</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantCourses.map((course, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-xs font-medium text-gray-300 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-xl"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
                aria-label="Close modal"
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
