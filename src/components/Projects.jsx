import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Code2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const projectsData = portfolioData.projects;

  // Render glow classes based on highlightColor
  const getGlowStyles = (color) => {
    switch (color) {
      case 'gold':
        return {
          cardClass: 'border-accent/30 hover:border-accent/60 shadow-[0_0_15px_rgba(255,215,0,0.08)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]',
          badgeClass: 'bg-accent/15 text-accent border-accent/20',
          techBadgeClass: 'border-accent/10 text-accent/90 hover:border-accent/30'
        };
      case 'blue':
        return {
          cardClass: 'border-blue-500/30 hover:border-blue-500/60 shadow-[0_0_15px_rgba(30,144,255,0.08)] hover:shadow-[0_0_25px_rgba(30,144,255,0.3)]',
          badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
          techBadgeClass: 'border-blue-500/10 text-blue-400/90 hover:border-blue-500/30'
        };
      case 'electric-blue':
        return {
          cardClass: 'border-secondaryAccent/30 hover:border-secondaryAccent/60 shadow-[0_0_15px_rgba(30,144,255,0.08)] hover:shadow-[0_0_25px_rgba(30,144,255,0.3)]',
          badgeClass: 'bg-secondaryAccent/15 text-secondaryAccent border-secondaryAccent/20',
          techBadgeClass: 'border-secondaryAccent/10 text-secondaryAccent/90 hover:border-secondaryAccent/30'
        };
      default:
        return {
          cardClass: 'border-white/5 hover:border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
          badgeClass: 'bg-white/5 text-gray-300 border-white/10',
          techBadgeClass: 'border-white/5 text-gray-300 hover:border-white/20'
        };
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="Projects" className="relative py-24 md:py-32 bg-darkBg overflow-hidden">
      {/* Background orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-primary top-1/3 left-1/4" />
      
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
            My <span className="text-gradient-gold">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-accent mx-auto mt-4 rounded-full shadow-[0_0_8px_#FFD700]"
          />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {projectsData.map((project) => {
            const glowStyles = getGlowStyles(project.highlightColor);
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`glass-card p-6 md:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${glowStyles.cardClass}`}
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border w-fit ${glowStyles.badgeClass}`}>
                      {project.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>{project.period}</span>
                    </div>
                  </div>

                  {/* Title & Type */}
                  <h3 className="text-2xl font-extrabold text-gray-100 mb-1 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-accent" />
                    {project.type}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((techItem, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium border bg-primary/40 transition-colors duration-200 ${glowStyles.techBadgeClass}`}
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-300 hover:text-accent transition-colors duration-200 group/link"
                      >
                        <FaGithub className="w-4 h-4 group-hover/link:rotate-6 transition-transform" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-bold text-accent hover:text-yellow-400 transition-colors duration-200 group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
