import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Code2, Rocket, Brain, Server } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const personal = portfolioData.personalInfo;

  // Icon mapping for stats
  const getStatIcon = (index) => {
    const icons = [
      <Code2 className="w-5 h-5 text-accent" />,
      <Rocket className="w-5 h-5 text-accentPurple" />,
      <Brain className="w-5 h-5 text-accent" />,
      <Server className="w-5 h-5 text-accentPurple" />
    ];
    return icons[index % icons.length];
  };

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="Hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 hero-bg"
    >
      {/* Background Glowing Blobs for extra depth */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accentPurple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center flex-grow">
        {/* Left Section: Text & Actions (takes max-w-2xl so it doesn't overlap the right mountain backdrop) */}
        <div className="max-w-2xl flex flex-col items-start text-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white font-sans mb-3"
          >
            Hi, I'm
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tight font-sans mb-4 text-gradient-gold"
          >
            {personal.name}
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl font-medium font-sans text-gray-300 mb-6"
          >
            Full Stack <span className="text-accent font-semibold">Developer</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            {personal.tagline}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#Projects"
              onClick={(e) => handleScrollToSection(e, 'Projects')}
              className="px-8 py-3.5 rounded-xl bg-accent text-white font-bold text-sm hover:shadow-blue-glow-hover hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#Contact"
              onClick={(e) => handleScrollToSection(e, 'Contact')}
              className="px-8 py-3.5 rounded-xl bg-transparent border border-white/10 text-gray-300 font-bold text-sm hover:border-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats Row Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-12 lg:mt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl glass-card border border-glassBorder shadow-card-glow"
        >
          {personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-gray-300 group-hover:scale-105 transition-transform">
                {getStatIcon(idx)}
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-2xl font-extrabold text-white tracking-tight leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
