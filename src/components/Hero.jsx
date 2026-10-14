import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Code2, Rocket, Brain, Server, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { getPublicProfile, getPublicProjects, getPublicCertificates } from '../services/publicData';
import frontPortrait from '../assets/portfolio/front.png';
import CinematicSmoke from './CinematicSmoke';

export default function Hero() {
  const [personal, setPersonal] = useState(portfolioData.personalInfo);
  const [dynamicStats, setDynamicStats] = useState(portfolioData.personalInfo.stats);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getPublicProfile(),
      getPublicProjects(),
      getPublicCertificates()
    ]).then(([profileData, projectsData, certsData]) => {
      if (!isMounted) return;
      if (profileData) setPersonal(profileData);

      const totalBuilt = projectsData?.length || 0;
      const clientCount = projectsData?.filter(p => p.type === 'Client Project' || p.badge?.toLowerCase().includes('client')).length || 0;
      const certsCount = certsData?.length || 0;

      setDynamicStats([
        { value: `${totalBuilt > 0 ? totalBuilt : 4}+`, label: "Projects Built" },
        { value: `${clientCount > 0 ? clientCount : 1}`, label: "Paid Client Project" },
        { value: `${certsCount > 0 ? certsCount : 7}+`, label: "Certifications" },
        { value: profileData?.isAvailable !== false ? "Available" : "Busy", label: profileData?.availabilityText || "Currently Hiring" }
      ]);
    });
    return () => { isMounted = false; };
  }, []);

  const getStatIcon = (index) => {
    const icons = [
      <Code2 className="w-5 h-5 text-[#8C97E6]" />,
      <Rocket className="w-5 h-5 text-[#4D5BC9]" />,
      <Brain className="w-5 h-5 text-[#8C97E6]" />,
      <Server className="w-5 h-5 text-[#2C3480]" />
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

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { clientX, clientY } = e;
    const xRatio = clientX / window.innerWidth - 0.5;
    const yRatio = clientY / window.innerHeight - 0.5;
    setMousePos({ x: xRatio * 10, y: yRatio * 8 });
  };

  return (
    <section
      id="Hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-12 bg-black"
    >
      {/* 1. VISIBLE BILLOWING VOLUMETRIC SMOKE BACKGROUND */}
      <CinematicSmoke intensity="hero" align="right" className="opacity-90" />
      <CinematicSmoke intensity="subtle" align="left" className="opacity-60" />

      {/* 2. MAIN HERO VIEWPORT (SPACIOUS 1280PX CONTAINER) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center w-full">
          
          {/* Left Column: Editorial Introduction (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Pill & Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C3480]/20 border border-[#2C3480]/50 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(44,52,128,0.35)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C97E6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C97E6]"></span>
                </span>
                <span>Available for Opportunities</span>
              </div>

              <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400 hidden sm:inline">
                DEVELOPER • BUILDER • PROBLEM SOLVER
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-sans leading-[1.06] mb-6"
            >
              Turning Ideas Into{' '}
              <span className="text-gradient-cobalt block sm:inline">
                Digital Experiences.
              </span>
            </motion.h1>

            {/* Supporting Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg max-w-xl mb-9 leading-relaxed font-normal"
            >
              I'm <strong className="text-white font-semibold">Chandan Tiwadi</strong>, a developer passionate about building modern websites, applications, and technology-driven solutions with React, Node.js, and emerging AI technologies.
            </motion.p>

            {/* Primary Calls to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#Projects"
                onClick={(e) => handleScrollToSection(e, 'Projects')}
                className="px-8 py-4 rounded-xl bg-[#2C3480] text-white font-bold text-sm hover:bg-[#3E49A8] hover:shadow-[0_0_30px_rgba(62,73,168,0.7)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group border border-[#4D5BC9]/60 shadow-[0_0_20px_rgba(44,52,128,0.5)]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#Contact"
                onClick={(e) => handleScrollToSection(e, 'Contact')}
                className="px-8 py-4 rounded-xl bg-black/60 border border-white/15 text-white font-bold text-sm hover:border-[#2C3480] hover:bg-[#2C3480]/20 hover:shadow-[0_0_25px_rgba(44,52,128,0.4)] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-[#8C97E6]" />
                <span>Let's Connect</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Portrait Focal Point (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x,
                y: mousePos.y
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] aspect-[3/4] flex items-end justify-center select-none"
            >
              {/* Volumetric Rim Light Glow behind Head & Shoulders */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[380px] h-[450px] rounded-full bg-[#2C3480]/45 blur-[70px] pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[340px] rounded-full bg-[#4D5BC9]/35 blur-[55px] pointer-events-none" />

              {/* Front Portrait Image */}
              <img
                src={frontPortrait}
                alt="Chandan Tiwadi - Full Stack Web Developer (Frontal Portrait)"
                loading="eager"
                decoding="async"
                className="relative z-10 w-full h-full object-contain object-bottom portrait-bottom-vignette drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter contrast-[1.03] brightness-[1.01]"
              />

              {/* Bottom Blend Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20" />

              {/* Elegant Perspective Badge */}
              <div className="absolute bottom-2 z-30 px-3.5 py-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-md flex items-center gap-2 pointer-events-none shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C3480] animate-pulse shadow-[0_0_8px_#2C3480]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-300">
                  PERSPECTIVE 01 • INTRODUCTION
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 3. DYNAMIC STATS ROW CONTAINER (BALANCED SPACING) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
        >
          {dynamicStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-[#2C3480]/40 hover:bg-[#2C3480]/10 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-lg bg-black/70 border border-white/10 text-white group-hover:scale-105 group-hover:border-[#2C3480]/60 transition-all">
                {getStatIcon(idx)}
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none mb-1 font-sans">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Prompt */}
        <div className="flex justify-center mt-6">
          <a
            href="#About"
            onClick={(e) => handleScrollToSection(e, 'About')}
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors gap-1 group focus:outline-none"
            aria-label="Scroll down to About section"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C97E6]">
              Scroll To Explore
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#8C97E6] group-hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}

