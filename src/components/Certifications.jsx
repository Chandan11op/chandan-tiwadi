import React from 'react';
import { motion } from 'framer-motion';
import { Award, Terminal, Layers, Globe, Cpu, FileCode2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const certificationsData = portfolioData.certifications;

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
              className="glass-card p-6 md:p-8 rounded-3xl border border-glassBorder hover:border-accent/20 hover:shadow-blue-glow transition-all duration-300 flex items-start gap-4"
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
