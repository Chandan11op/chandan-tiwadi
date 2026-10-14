import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import frontPortrait from '../assets/portfolio/front.png';
import resumePdf from '../assets/Chandan Tiwadi.pdf';
import { getPublicActiveResume } from '../services/publicData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('Hero');
  const [activeResumeUrl, setActiveResumeUrl] = useState(resumePdf);

  useEffect(() => {
    let isMounted = true;
    getPublicActiveResume().then((res) => {
      if (isMounted && res && res.file_url) {
        setActiveResumeUrl(res.file_url);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const navLinks = [
    { label: 'About', href: '#About' },
    { label: 'Skills', href: '#Skills' },
    { label: 'Projects', href: '#Projects' },
    { label: 'Education', href: '#Education' },
    { label: 'Certifications', href: '#Certifications' },
    { label: 'Contact', href: '#Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (!isOpen) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      }
      setPrevScrollPos(currentScrollPos);

      // Track active section
      const scrollPosition = currentScrollPos + 180;
      if (currentScrollPos < 200) {
        setActiveSection('Hero');
        return;
      }

      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
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
      setActiveSection(targetId);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        prevScrollPos > 15
          ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand / Logo */}
        <a
          href="#Hero"
          onClick={(e) => handleLinkClick(e, '#Hero')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3480] rounded-xl p-1"
          aria-label="Chandan Tiwadi Portfolio Home"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#2C3480]/60 bg-black shadow-[0_0_15px_rgba(44,52,128,0.4)] group-hover:border-[#3E49A8] group-hover:shadow-[0_0_20px_rgba(62,73,168,0.6)] transition-all duration-300">
            <img
              src={frontPortrait}
              alt="Chandan Tiwadi"
              className="w-full h-full object-cover object-top scale-110 group-hover:scale-120 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-extrabold tracking-tight text-white group-hover:text-white transition-colors duration-200 font-sans">
              Chandan Tiwadi
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#8C97E6] -mt-0.5">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-7 items-center font-sans">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2C3480] ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#2C3480] rounded-full shadow-[0_0_10px_#2C3480]" />
                )}
              </a>
            );
          })}

          {/* Download CV Action */}
          <a
            href={activeResumeUrl}
            download="Chandan_Tiwadi_Resume.pdf"
            target={activeResumeUrl !== resumePdf ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-[#2C3480]/60 text-white font-bold text-xs hover:bg-[#2C3480] hover:border-[#3E49A8] hover:shadow-[0_0_20px_rgba(44,52,128,0.5)] transition-all duration-300 flex items-center gap-1.5 bg-[#2C3480]/15"
          >
            <Download className="w-3.5 h-3.5 text-[#8C97E6]" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-[#2C3480] focus:outline-none focus:ring-2 focus:ring-[#2C3480]"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-[65px] left-0 right-0 bottom-0 bg-black/95 backdrop-blur-2xl border-t border-white/10 transition-all duration-300 z-40 flex flex-col justify-center items-center space-y-7 px-6 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 65px)' }}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.substring(1);
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-lg font-bold tracking-widest uppercase transition-colors duration-200 ${
                isActive ? 'text-white border-b-2 border-[#2C3480] pb-1' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          );
        })}
        <a
          href={activeResumeUrl}
          download="Chandan_Tiwadi_Resume.pdf"
          target={activeResumeUrl !== resumePdf ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl border border-[#2C3480] text-white font-bold text-sm hover:bg-[#2C3480] transition-all duration-300 w-full text-center max-w-xs bg-[#2C3480]/20 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(44,52,128,0.3)]"
        >
          <Download className="w-4 h-4 text-[#8C97E6]" />
          <span>Download Resume</span>
        </a>
      </div>
    </nav>
  );
}
