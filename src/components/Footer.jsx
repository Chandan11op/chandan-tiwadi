import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUp, Edit3 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';
import { getPublicProfile } from '../services/publicData';

export default function Footer() {
  const [personal, setPersonal] = useState(portfolioData.personalInfo);

  useEffect(() => {
    let isMounted = true;
    getPublicProfile().then((data) => {
      if (isMounted && data) setPersonal(data);
    });
    return () => { isMounted = false; };
  }, []);

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
    <footer className="relative bg-black border-t border-white/[0.08] py-14 md:py-20 overflow-hidden text-center">
      {/* Subtle Cobalt Glow from bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2C3480]/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Scroll To Top Button */}
        <button
          onClick={handleScrollToTop}
          className="p-3.5 rounded-full bg-black/80 border border-white/10 hover:border-[#2C3480] text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(44,52,128,0.5)] transition-all duration-300 mb-8 cursor-pointer group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-[#8C97E6]" />
        </button>

        {/* Brand Logo / Identity */}
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 font-sans">
          Chandan <span className="text-gradient-cobalt">Tiwadi</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-8 max-w-sm">
          Turning ideas into modern, scalable digital experiences.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs sm:text-sm text-gray-400 hover:text-white font-semibold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 items-center mb-8">
          {[
            { icon: <FaGithub className="w-4 h-4" />, href: personal.github, label: 'GitHub' },
            { icon: <FaLinkedin className="w-4 h-4" />, href: personal.linkedin, label: 'LinkedIn' },
            { icon: <FaXTwitter className="w-4 h-4" />, href: personal.twitter, label: 'Twitter' },
            { icon: <FaInstagram className="w-4 h-4" />, href: personal.instagram, label: 'Instagram' },
            { icon: <Mail className="w-4 h-4" />, href: `mailto:${personal.email}`, label: 'Email' }
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
              className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#2C3480] text-gray-400 hover:text-white hover:bg-[#2C3480]/20 transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Direct WhatsApp Action & Admin Link */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href={`https://wa.me/${personal.phone.replace(/[\s+()-]/g, '')}?text=Hey%20Chandan%20Tiwadi`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 font-semibold text-xs"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Edit Portfolio Portal Shortcut */}
          <Link
            to="/admin-portal"
            title="Edit Portfolio (Admin Login)"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#2C3480] text-gray-400 hover:text-white transition-all duration-300 text-xs font-semibold"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#8C97E6]" />
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.06] pt-8 w-full max-w-md space-y-1">
          <p className="text-xs text-gray-400 font-medium">
            Designed & Engineered by <span className="text-white font-bold">{personal.name}</span>
          </p>
          <p className="text-[11px] text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Chandan Tiwadi. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
