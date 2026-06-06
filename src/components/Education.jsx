import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const educationData = portfolioData.education;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="Education" className="relative py-24 md:py-32 bg-primary/10 overflow-hidden">
      {/* Background decoration */}
      <div className="glow-orb w-[300px] h-[300px] bg-primary top-10 right-0 translate-x-1/3" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight inline-block"
          >
            My <span className="text-gradient-gold">Education</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-accent mx-auto mt-4 rounded-full shadow-[0_0_8px_#FFD700]"
          />
        </div>

        {/* Timeline container */}
        <div className="relative pl-8 md:pl-10 timeline-line">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline node circle */}
                <span className="absolute -left-[32px] md:-left-[34px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary border-2 border-accent shadow-gold-glow z-20">
                  <GraduationCap className="h-4.5 w-4.5 text-accent" />
                </span>

                {/* Card body */}
                <div className="glass-card p-6 md:p-8 rounded-3xl border border-glassBorder hover:border-accent/20 hover:shadow-gold-glow transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-100">
                      {edu.institution}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-accent font-semibold bg-accent/5 px-3 py-1 rounded-full border border-accent/10 w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  {/* Degree & Score */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-semibold text-gray-300">
                      {edu.degree}
                    </span>
                    <span className="h-4 w-[1px] bg-gray-600 hidden sm:inline" />
                    <span className="text-xs font-bold text-secondaryAccent bg-secondaryAccent/10 px-2.5 py-0.5 rounded border border-secondaryAccent/20">
                      {edu.details}
                    </span>
                  </div>

                  {/* Relevant Courses */}
                  {edu.relevantCourses && (
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-accent" />
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCourses.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[11px] font-semibold text-gray-300 bg-primary/60 border border-glassBorder px-2.5 py-1 rounded-md"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
