import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImg from '../assets/portfolio_image.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: 'About', href: '#About' },
    { label: 'Skills', href: '#Skills' },
    { label: 'Projects', href: '#Projects' },
    { label: 'Education', href: '#Education' },
    { label: 'Certifications', href: '#Certifications' },
    { label: 'Contact', href: '#Contact' }
  ];

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // If menu is open, don't hide navbar
      if (!isOpen) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      }
      setPrevScrollPos(currentScrollPos);

      // Track active section
      const scrollPosition = currentScrollPos + 160; // offset for navbar height
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

    window.addEventListener('scroll', handleScroll);
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
        prevScrollPos > 10
          ? 'bg-primary/95 backdrop-blur-md border-b border-glassBorder shadow-lg shadow-black/25 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#About"
          onClick={(e) => handleLinkClick(e, '#About')}
          className="flex items-center gap-3 group transition-transform duration-200"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-accent/40 group-hover:border-accent group-hover:scale-105 transition-all duration-300 shadow-gold-glow">
            <img
              src={profileImg}
              alt="Chandan Tiwadi Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-black tracking-wider text-gray-100 group-hover:text-accent transition-colors duration-300">
            {portfolioData.personalInfo.initials}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative py-2 font-medium text-sm transition-colors duration-200 hover:text-accent ${
                  isActive ? 'text-accent' : 'text-gray-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full animate-pulse shadow-[0_0_8px_#FFD700]" />
                )}
              </a>
            );
          })}
          <a
            href="#Contact"
            onClick={(e) => handleLinkClick(e, '#Contact')}
            className="px-5 py-2 rounded-full border border-accent text-accent font-semibold text-sm hover:bg-accent hover:text-primary transition-all duration-300 hover:shadow-gold-glow"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-accent focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-primary/98 backdrop-blur-lg border-t border-glassBorder transition-all duration-300 z-40 flex flex-col justify-center items-center space-y-8 px-6 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 73px)' }}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.substring(1);
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-xl font-semibold tracking-wide transition-colors duration-200 ${
                isActive ? 'text-accent border-b-2 border-accent pb-1' : 'text-gray-300 hover:text-accent'
              }`}
            >
              {link.label}
            </a>
          );
        })}
        <a
          href="#Contact"
          onClick={(e) => handleLinkClick(e, '#Contact')}
          className="px-8 py-3 rounded-full border border-accent text-accent font-semibold text-lg hover:bg-accent hover:text-primary transition-all duration-300 w-full text-center max-w-xs"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
