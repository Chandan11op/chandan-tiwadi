import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Terminal, Layers, Globe, Cpu, FileCode2, ZoomIn, Brain } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const certificationsData = portfolioData.certifications;
  const [selectedImage, setSelectedImage] = useState(null);

  // Icon selector based on badgeIcon value
  const getBadgeIcon = (icon) => {
    switch (icon) {
      case 'js':
        return <FileCode2 className="w-6 h-6 text-accent" />;
      case 'python':
        return <Terminal className="w-6 h-6 text-secondaryAccent" />;
      case 'ui':
        return <Layers className="w-6 h-6 text-blue-400" />;
      case 'html':
        return <Globe className="w-6 h-6 text-accent" />;
      case 'c':
        return <Cpu className="w-6 h-6 text-secondaryAccent" />;
      case 'ai':
        return <Brain className="w-6 h-6 text-purple-400" />;
      default:
        return <Award className="w-6 h-6 text-accent" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="Certifications" className="relative py-24 md:py-32 bg-darkBg overflow-hidden">
      {/* Background decoration */}
      <div className="glow-orb w-[300px] h-[300px] bg-primary bottom-10 left-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight inline-block"
          >
            My <span className="text-gradient-gold">Certifications</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-accent mx-auto mt-4 rounded-full shadow-blue-glow"
          />
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="glass-card rounded-3xl border border-glassBorder hover:border-accent/20 hover:shadow-blue-glow transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              onClick={() => setSelectedImage({ src: cert.image, title: cert.title })}
            >
              {cert.image && (
                <div className="relative w-full h-48 overflow-hidden border-b border-glassBorder group shrink-0">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8 flex items-start gap-4 flex-1">
                {/* Badge Icon wrapper */}
                <div className="p-3 rounded-2xl bg-primary/80 border border-glassBorder shadow-inner shrink-0">
                  {getBadgeIcon(cert.badgeIcon)}
                </div>

                {/* Certification detail */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                    {cert.year}
                  </span>
                  <h3 className="text-lg font-bold text-gray-100 leading-snug pt-1.5">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-semibold">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/20 bg-darkBg/60 p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[75vh] rounded-xl object-contain mx-auto"
              />
              <div className="text-center mt-3 text-sm text-gray-300 font-semibold px-4">
                {selectedImage.title}
              </div>
              <button 
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors border border-white/10"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
