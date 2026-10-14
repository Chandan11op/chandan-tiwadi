import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, GraduationCap, Download, ArrowUpRight } from 'lucide-react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiMongodb, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';
import resumePdf from '../assets/Chandan Tiwadi.pdf';
import leftPortrait from '../assets/portfolio/left.png';
import { getPublicProfile, getPublicActiveResume } from '../services/publicData';
import CinematicSmoke from './CinematicSmoke';

export default function About() {
  const [personalInfo, setPersonalInfo] = useState(portfolioData.personalInfo);
  const [activeResumeUrl, setActiveResumeUrl] = useState(resumePdf);

  useEffect(() => {
    let isMounted = true;
    getPublicProfile().then((profile) => {
      if (isMounted && profile) setPersonalInfo(profile);
    });
    getPublicActiveResume().then((res) => {
      if (isMounted && res && res.file_url) setActiveResumeUrl(res.file_url);
    });
    return () => { isMounted = false; };
  }, []);

  const { bio, location, email, name } = personalInfo;

  const techStack = [
    { name: 'React.js', icon: <FaReact className="w-5 h-5 text-[#8C97E6]" /> },
    { name: 'Node.js', icon: <FaNodeJs className="w-5 h-5 text-[#4D5BC9]" /> },
    { name: 'JavaScript', icon: <SiJavascript className="w-5 h-5 text-white" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-[#8C97E6]" /> },
    { name: 'MongoDB', icon: <SiMongodb className="w-5 h-5 text-[#4D5BC9]" /> },
    { name: 'HTML5', icon: <FaHtml5 className="w-5 h-5 text-white" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="w-5 h-5 text-[#8C97E6]" /> },
    { name: 'Git & GitHub', icon: <FaGithub className="w-5 h-5 text-white" /> }
  ];

  return (
    <section id="About" className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Background Volumetric Atmospheric Smoke */}
      <CinematicSmoke intensity="subtle" align="left" className="opacity-70" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[#2C3480]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C97E6] font-bold block mb-2">
            PERSPECTIVE 02 • IDENTITY & BIOGRAPHY
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
                About <span className="text-gradient-cobalt">Chandan Tiwadi</span>
              </h2>
              <div className="w-16 h-1 bg-[#2C3480] rounded-full mt-3 shadow-[0_0_12px_#2C3480]" />
            </div>
            <p className="text-sm md:text-base text-gray-400 max-w-md font-normal leading-relaxed">
              Crafting modern digital architectures with disciplined code, clean aesthetics, and deliberate user experiences.
            </p>
          </div>
        </div>

        {/* 2-Column Spacious Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Biography & Information (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between text-left space-y-8"
          >
            {/* Editorial Bio Card */}
            <div className="p-7 sm:p-9 rounded-3xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mb-4 flex items-center gap-2">
                <span>The Story & Mission</span>
              </h3>
              
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                {bio.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Personal Details Quick Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 pt-8 border-t border-white/[0.06]">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#2C3480]/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-[#2C3480]/20 text-[#8C97E6] border border-[#2C3480]/40">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Full Name</p>
                    <p className="text-sm font-bold text-white">{name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#2C3480]/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-[#2C3480]/20 text-[#8C97E6] border border-[#2C3480]/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Email</p>
                    <p className="text-sm font-bold text-white truncate max-w-[170px] sm:max-w-[210px]">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#2C3480]/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-[#2C3480]/20 text-[#8C97E6] border border-[#2C3480]/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold text-white">{location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#2C3480]/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-[#2C3480]/20 text-[#8C97E6] border border-[#2C3480]/40">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Degree</p>
                    <p className="text-sm font-bold text-white">BSc in IT (3rd Year)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Tools & Resume Row */}
            <div className="p-6 sm:p-7 rounded-3xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C97E6] font-bold block mb-1">
                  OFFICIAL CREDENTIAL
                </span>
                <h4 className="text-lg font-bold text-white font-sans">
                  Ready to collaborate?
                </h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                  Download my up-to-date resume highlighting projects, academics, and technical proficiencies.
                </p>
              </div>

              <a
                href={activeResumeUrl}
                download="Chandan_Tiwadi_Resume.pdf"
                target={activeResumeUrl !== resumePdf ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2C3480] border border-[#4D5BC9]/50 text-white font-bold text-xs hover:bg-[#3E49A8] hover:shadow-[0_0_25px_rgba(62,73,168,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(44,52,128,0.3)] shrink-0"
              >
                <Download className="w-4 h-4 text-[#8C97E6]" />
                <span>Download Resume</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Left-Facing Portrait Focal Stage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[3/4] flex items-end justify-center select-none">
              
              {/* Cobalt Volumetric Fog Bloom behind Portrait */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[360px] h-[440px] rounded-full bg-[#2C3480]/40 blur-[75px] pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[260px] h-[320px] rounded-full bg-[#4D5BC9]/30 blur-[60px] pointer-events-none" />

              {/* Portrait: left.png (Chandan looking to the left across into his bio) */}
              <img
                src={leftPortrait}
                alt="Chandan Tiwadi - Profile View (Facing Left Towards Biography)"
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter contrast-[1.03] brightness-[1.01]"
              />

              {/* Bottom Vignette Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-20" />

              {/* Perspective Label Badge */}
              <div className="absolute bottom-3 z-30 px-3.5 py-1 rounded-full bg-black/85 border border-white/10 backdrop-blur-md flex items-center gap-2 pointer-events-none shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C97E6] animate-pulse shadow-[0_0_8px_#8C97E6]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-300">
                  PROFILE • BIOGRAPHY FOCUS
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Core Tech Stack Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 p-6 sm:p-7 rounded-3xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C97E6] font-bold">
                CORE TECHNICAL FOUNDATION
              </span>
              <h4 className="text-lg font-bold text-white font-sans">
                Primary Technologies in Daily Practice
              </h4>
            </div>
            
            {/* Social handles */}
            <div className="flex items-center gap-2.5">
              {[
                { icon: <FaLinkedin className="w-3.5 h-3.5" />, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: <FaGithub className="w-3.5 h-3.5" />, href: personalInfo.github, label: 'GitHub' },
                { icon: <FaXTwitter className="w-3.5 h-3.5" />, href: personalInfo.twitter, label: 'Twitter' },
                { icon: <FaInstagram className="w-3.5 h-3.5" />, href: personalInfo.instagram, label: 'Instagram' },
                { icon: <Mail className="w-3.5 h-3.5" />, href: `mailto:${email}`, label: 'Email' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#2C3480] text-gray-400 hover:text-white hover:bg-[#2C3480]/20 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#2C3480]/50 hover:bg-[#2C3480]/10 flex flex-col items-center justify-center text-center group hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="mb-2 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <span className="text-xs font-semibold text-gray-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
