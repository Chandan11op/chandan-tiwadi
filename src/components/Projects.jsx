import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Code2, ChevronDown, ChevronUp, Sparkles, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { getPublicProjects } from '../services/publicData';
import CinematicSmoke from './CinematicSmoke';

export default function Projects() {
  const [projectsData, setProjectsData] = useState(portfolioData.projects);
  const [expandedIds, setExpandedIds] = useState({});

  useEffect(() => {
    let isMounted = true;
    getPublicProjects().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProjectsData(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="Projects" className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Background Volumetric Smoke */}
      <CinematicSmoke intensity="subtle" align="left" className="opacity-70" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#2C3480]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-left">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C97E6] font-bold block mb-2">
            PROVEN IMPLEMENTATIONS
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
                Featured <span className="text-gradient-cobalt">Projects</span>
              </h2>
              <div className="w-16 h-1 bg-[#2C3480] rounded-full mt-3 shadow-[0_0_12px_#2C3480]" />
            </div>
            <p className="text-sm md:text-base text-gray-400 max-w-md font-normal leading-relaxed">
              Real-world systems, client solutions, and modern software architectures built for performance, security, and scalability.
            </p>
          </div>
        </div>

        {/* Projects Grid: Spacious 2-Column Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch"
        >
          {projectsData.map((project) => {
            const isExpanded = Boolean(expandedIds[project.id]);
            const isLongDescription = project.description && project.description.length > 130;

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-7 sm:p-9 rounded-3xl glass-card border border-white/[0.08] hover:border-[#2C3480]/80 hover:shadow-[0_12px_36px_rgba(44,52,128,0.35)] transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div className="flex-1 flex flex-col">
                  {/* Card Header & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#2C3480]/60 bg-[#2C3480]/20 text-[#8C97E6] w-fit shadow-[0_0_15px_rgba(44,52,128,0.25)] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#8C97E6]" />
                      <span>{project.badge}</span>
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#8C97E6]" />
                      <span>{project.period}</span>
                    </div>
                  </div>

                  {/* Title & Type */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 group-hover:text-[#8C97E6] transition-colors font-sans">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-5 flex items-center gap-1.5 font-mono">
                    <Code2 className="w-3.5 h-3.5 text-[#4D5BC9]" />
                    <span>{project.type}</span>
                  </p>

                  {/* Description with Expand / View More */}
                  <div className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    <p className={`transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {project.description}
                    </p>
                    {isLongDescription && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8C97E6] hover:text-white transition-colors mt-2 cursor-pointer"
                      >
                        <span>{isExpanded ? 'View Less' : 'View More'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                    {project.tech.map((techItem, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-xl text-xs font-medium border border-white/10 bg-white/[0.03] text-gray-300 group-hover:border-[#2C3480]/50 transition-colors duration-200"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06] mt-auto">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-all duration-200 text-xs font-bold"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C3480] border border-[#4D5BC9]/50 hover:bg-[#3E49A8] text-white hover:shadow-[0_0_20px_rgba(62,73,168,0.5)] transition-all duration-200 text-xs font-bold shadow-[0_0_12px_rgba(44,52,128,0.3)] ml-auto"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
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
