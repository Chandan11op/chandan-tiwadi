import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, GraduationCap, Download } from 'lucide-react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';
import resumePdf from '../assets/Chandan Tiwadi.pdf';
<>
</>
export default function About() {
  const { bio, location, email, name } = portfolioData.personalInfo;

  const techStack = [
    { name: 'React', icon: <FaReact className="w-7 h-7 text-[#61DAFB]" /> },
    { name: 'Node.js', icon: <FaNodeJs className="w-7 h-7 text-[#339933]" /> },
    { name: 'MongoDB', icon: <SiMongodb className="w-7 h-7 text-[#47A248]" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-7 h-7 text-[#06B6D4]" /> },
    { name: 'JavaScript', icon: <SiJavascript className="w-7 h-7 text-[#F7DF1E] rounded" /> },
    { name: 'HTML5', icon: <FaHtml5 className="w-7 h-7 text-[#E34F26]" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="w-7 h-7 text-[#1572B6]" /> },
    { name: 'Git & GitHub', icon: <FaGithub className="w-7 h-7 text-white" /> }
  ];

  return (
    <section id="About" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: About Me Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-8 rounded-2xl glass-card border border-glassBorder shadow-card-glow text-left"
          >
            <h2 className="text-3xl font-extrabold text-white mb-2 font-sans relative inline-block">
              About Me
              <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-accent rounded-full mt-1" />
            </h2>
            <div className="h-4" />

            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              {bio.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Personal details info list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Name</p>
                  <p className="text-sm font-bold text-white">{name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-2 rounded-lg bg-accentPurple/10 text-accentPurple">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Email</p>
                  <p className="text-sm font-bold text-white truncate max-w-[170px]">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-2 rounded-lg bg-accentPurple/10 text-accentPurple">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-sm font-bold text-white">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Education</p>
                  <p className="text-sm font-bold text-white">BSc in IT</p>
                </div>
              </div>
            </div>

            {/* Download Resume CV Button */}
            <a
              href={resumePdf}
              download="Chandan_Tiwadi_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent font-bold text-xs hover:bg-accent hover:text-white transition-all duration-300 shadow-blue-glow"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>

          {/* Right Column: Tech Stack & Connections */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Tech Stack Cards Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl glass-card border border-glassBorder shadow-card-glow"
            >
              <h2 className="text-2xl font-extrabold text-white mb-6 font-sans relative inline-block">
                Tech Stack
                <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-accentPurple rounded-full mt-1" />
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#070b13] border border-white/5 hover:border-accent/30 flex flex-col items-center justify-center text-center group hover:-translate-y-1 hover:shadow-blue-glow transition-all duration-300"
                  >
                    <div className="mb-2 group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </div>
                    <span className="text-[11px] font-bold text-gray-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Let's Connect Social Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl glass-card border border-glassBorder shadow-card-glow"
            >
              <h3 className="text-xl font-bold text-white mb-4 font-sans">
                Let's Connect
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                I'm always open to discussing new opportunities and exciting projects.
              </p>

              <div className="flex items-center gap-4">
                {[
                  { icon: <FaLinkedin className="w-5 h-5" />, href: portfolioData.personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: <FaGithub className="w-5 h-5" />, href: portfolioData.personalInfo.github, label: 'GitHub' },
                  { icon: <FaXTwitter className="w-5 h-5" />, href: portfolioData.personalInfo.twitter, label: 'Twitter' },
                  { icon: <FaInstagram className="w-5 h-5" />, href: portfolioData.personalInfo.instagram, label: 'Instagram' },
                  { icon: <Mail className="w-5 h-5" />, href: `mailto:${email}`, label: 'Email' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-xl bg-[#070b13] border border-white/5 hover:border-accent/40 text-gray-300 hover:text-white hover:shadow-blue-glow transition-all duration-300 flex items-center justify-center"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
