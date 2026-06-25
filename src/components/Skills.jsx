import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Database, Wrench, Sparkles, BookOpen, Globe, Shield, MessageSquare, Code2 } from 'lucide-react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiVite, SiTailwindcss, SiExpress, SiMysql, SiMongodb, SiSupabase, SiPostman, SiVercel, SiOpenai, SiGoogle } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const skillsData = portfolioData.skills;

  // Specific skill item icon mapping
  const getSkillIcon = (name) => {
    const normalized = name.toLowerCase();
    if (normalized.includes('html5') || normalized.includes('html')) return <FaHtml5 className="w-4 h-4 text-[#E34F26]" />;
    if (normalized.includes('css3') || normalized.includes('css')) return <FaCss3Alt className="w-4 h-4 text-[#1572B6]" />;
    if (normalized.includes('javascript') || normalized.includes('js')) return <SiJavascript className="w-4 h-4 text-[#F7DF1E] rounded-sm" />;
    if (normalized.includes('react')) return <FaReact className="w-4 h-4 text-[#61DAFB]" />;
    if (normalized.includes('vite')) return <SiVite className="w-4 h-4 text-[#646CFF]" />;
    if (normalized.includes('tailwind')) return <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />;
    if (normalized.includes('node')) return <FaNodeJs className="w-4 h-4 text-[#339933]" />;
    if (normalized.includes('express')) return <SiExpress className="w-4 h-4 text-white" />;
    if (normalized.includes('mysql')) return <SiMysql className="w-4 h-4 text-[#4479A1]" />;
    if (normalized.includes('mongodb')) return <SiMongodb className="w-4 h-4 text-[#47A248]" />;
    if (normalized.includes('supabase')) return <SiSupabase className="w-4 h-4 text-[#3ECF8E]" />;
    if (normalized.includes('git') && !normalized.includes('github')) return <FaGitAlt className="w-4 h-4 text-[#F05032]" />;
    if (normalized.includes('github')) return <FaGithub className="w-4 h-4 text-white" />;
    if (normalized.includes('vs code')) return <Code2 className="w-4 h-4 text-[#007ACC]" />;
    if (normalized.includes('postman')) return <SiPostman className="w-4 h-4 text-[#FF6C37]" />;
    if (normalized.includes('vercel')) return <SiVercel className="w-4 h-4 text-white" />;
    if (normalized.includes('chatgpt')) return <SiOpenai className="w-4 h-4 text-[#10A37F]" />;
    if (normalized.includes('gemini')) return <SiGoogle className="w-4 h-4 text-[#4285F4]" />;
    if (normalized.includes('claude')) return <Sparkles className="w-4 h-4 text-[#D97706]" />;
    if (normalized.includes('cursor')) return <Cpu className="w-4 h-4 text-[#8b5cf6]" />;
    if (normalized.includes('antigravity')) return <Sparkles className="w-4 h-4 text-[#3b82f6]" />;
    
    // Concept fallbacks
    if (normalized.includes('api') || normalized.includes('rest')) return <Code2 className="w-4 h-4 text-accent" />;
    if (normalized.includes('responsive') || normalized.includes('design')) return <Layout className="w-4 h-4 text-accent" />;
    if (normalized.includes('structure') || normalized.includes('dbms') || normalized.includes('database')) return <Database className="w-4 h-4 text-accent" />;
    if (normalized.includes('network')) return <Globe className="w-4 h-4 text-accent" />;
    if (normalized.includes('auth') || normalized.includes('shield')) return <Shield className="w-4 h-4 text-accent" />;
    if (normalized.includes('comm') || normalized.includes('real-time')) return <MessageSquare className="w-4 h-4 text-accent" />;
    if (normalized.includes('software')) return <Code2 className="w-4 h-4 text-accent" />;
    
    return <Code2 className="w-4 h-4 text-accent" />;
  };

  // Category Icon helper
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Layout className="w-6 h-6 text-accent" />;
      case 'backend':
        return <Cpu className="w-6 h-6 text-secondaryAccent" />;
      case 'databases':
        return <Database className="w-6 h-6 text-blue-400" />;
      case 'tools & platforms':
        return <Wrench className="w-6 h-6 text-accent" />;
      case 'ai dev tools':
        return <Sparkles className="w-6 h-6 text-accent" />;
      case 'core concepts':
        return <BookOpen className="w-6 h-6 text-secondaryAccent" />;
      default:
        return <Cpu className="w-6 h-6 text-gray-300" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="Skills" className="relative py-24 md:py-32 bg-primary/20 overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,144,255,0.05)_0%,transparent_70%)]" />
      <div className="glow-orb w-[350px] h-[350px] bg-secondaryAccent bottom-0 right-0 translate-y-1/3 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight inline-block"
          >
            Technical <span className="text-gradient-gold">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-accent mx-auto mt-4 rounded-full shadow-blue-glow"
          />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {skillsData.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-6 md:p-8 rounded-3xl border border-glassBorder hover:border-accent/20 hover:shadow-blue-glow transition-all duration-300 flex flex-col justify-start"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/5">
                <div className="p-3 rounded-2xl bg-primary/80 border border-glassBorder shadow-inner">
                  {getCategoryIcon(skillGroup.category)}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-100 tracking-wide">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skills Badges list */}
              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-300 bg-primary/60 border border-glassBorder hover:border-accent/40 hover:text-accent hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-default flex items-center gap-2"
                  >
                    {getSkillIcon(skill)}
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
