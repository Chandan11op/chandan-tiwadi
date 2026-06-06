import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const personal = portfolioData.personalInfo;

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
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

  const navLinks = [
    { label: 'About', href: '#About' },
    { label: 'Skills', href: '#Skills' },
    { label: 'Projects', href: '#Projects' },
    { label: 'Education', href: '#Education' },
    { label: 'Certifications', href: '#Certifications' },
    { label: 'Contact', href: '#Contact' }
  ];

  return (
    <footer className="relative bg-primary/45 border-t border-glassBorder/60 py-12 md:py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Scroll To Top Button */}
        <button
          onClick={handleScrollToTop}
          className="p-3 rounded-full bg-primary border border-glassBorder hover:border-accent text-gray-400 hover:text-accent hover:-translate-y-1 hover:shadow-gold-glow transition-all duration-300 mb-8 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" />
        </button>

        {/* Brand Logo / Initials */}
        <h3 className="text-2xl font-black text-accent tracking-widest mb-6">
          {personal.initials}
        </h3>

        {/* Repeated Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs md:text-sm text-gray-400 hover:text-accent font-semibold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 items-center mb-8">
          {[
            { icon: <FaGithub className="w-5 h-5" />, href: personal.github, label: 'GitHub' },
            { icon: <FaLinkedin className="w-5 h-5" />, href: personal.linkedin, label: 'LinkedIn' },
            { icon: <FaInstagram className="w-5 h-5" />, href: personal.instagram, label: 'Instagram' },
            { icon: <Mail className="w-5 h-5" />, href: `mailto:${personal.email}`, label: 'Email' }
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
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright and Credits */}
        <div className="text-center space-y-1.5 border-t border-white/5 pt-6 w-full max-w-md">
          <p className="text-xs text-gray-400 font-semibold tracking-wide">
            Built with ❤️ by <span className="text-accent">{personal.name}</span>
          </p>
          <p className="text-[10px] text-gray-500 font-medium tracking-wide">
            &copy; 2025 Chandan Tiwadi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
