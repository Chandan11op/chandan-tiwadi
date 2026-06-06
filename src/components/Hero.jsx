import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import resumePdf from '../assets/Chandan Tiwadi.pdf';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = portfolioData.heroTitles;
  const personal = portfolioData.personalInfo;

  useEffect(() => {
    let timer;
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentTitle.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentTitle.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex, titles]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('Projects');
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-darkBg pt-20"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 215, 0, 0.03) 1.5px, transparent 1.5px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Background Glowing Blobs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="glow-orb w-[350px] h-[350px] bg-accent top-1/4 right-10 md:right-24"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="glow-orb w-[450px] h-[450px] bg-secondaryAccent bottom-1/4 left-10 md:left-24"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full bg-primary/40 border border-glassBorder text-accent font-semibold text-xs tracking-wider uppercase mb-6 shadow-gold-glow"
        >
          Welcome to my Space
        </motion.div>

        {/* Big Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4"
        >
          Hi, I'm <span className="text-gradient-gold">{personal.name}</span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-10 md:h-14 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-3xl font-medium text-gray-300">
            I am a{' '}
            <span className="text-gradient-blue font-bold typewriter-cursor text-accent">
              {currentText}
            </span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mb-16"
        >
          <a
            href="#Projects"
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-primary font-bold text-base hover:bg-yellow-400 hover:shadow-gold-glow-hover transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={resumePdf}
            download="Chandan_Tiwadi_Resume.pdf"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gray-500 text-gray-300 font-bold text-base hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Download Resume
            <Download className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex gap-6 justify-center items-center"
        >
          {[
            { icon: <FaGithub className="w-6 h-6" />, href: personal.github, label: 'GitHub' },
            { icon: <FaLinkedin className="w-6 h-6" />, href: personal.linkedin, label: 'LinkedIn' },
            { icon: <FaInstagram className="w-6 h-6" />, href: personal.instagram, label: 'Instagram' },
            { icon: <Mail className="w-6 h-6" />, href: `mailto:${personal.email}`, label: 'Email' }
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.label === 'Email' ? `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}` : social.href}
              onClick={(e) => {
                if (social.label === 'Email') {
                  e.preventDefault();
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(personal.email);
                  }
                  window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Email copied! Opening Gmail...' }));
                  setTimeout(() => {
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`, '_blank', 'noopener,noreferrer');
                  }, 800);
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-gray-400 hover:text-accent hover:-translate-y-1 transition-all duration-300 p-2.5 rounded-full hover:bg-primary/50 hover:shadow-gold-glow border border-transparent hover:border-glassBorder"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
