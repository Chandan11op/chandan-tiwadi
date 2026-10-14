import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Cpu, 
  Database, 
  Wrench, 
  Sparkles, 
  BookOpen, 
  Globe, 
  Shield, 
  MessageSquare, 
  Code2, 
  Server, 
  Cloud, 
  Rocket, 
  Boxes,
  Workflow
} from 'lucide-react';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaReact, 
  FaNodeJs, 
  FaGithub, 
  FaGitAlt, 
  FaPython, 
  FaJava, 
  FaDocker, 
  FaAws 
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiVite, 
  SiTailwindcss, 
  SiExpress, 
  SiMysql, 
  SiMongodb, 
  SiSupabase, 
  SiPostman, 
  SiVercel, 
  SiOpenai, 
  SiGoogle, 
  SiNetlify, 
  SiCloudflare, 
  SiRender, 
  SiGodaddy, 
  SiHostinger, 
  SiAnthropic, 
  SiNextdotjs, 
  SiPostgresql, 
  SiRedis, 
  SiFirebase, 
  SiPrisma, 
  SiGraphql, 
  SiRedux, 
  SiBootstrap, 
  SiSass, 
  SiFigma, 
  SiLinux 
} from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';
import { getPublicSkills } from '../services/publicData';
import rightPortrait from '../assets/portfolio/right.png';
import CinematicSmoke from './CinematicSmoke';

export default function Skills() {
  const [skillsData, setSkillsData] = useState(portfolioData.skills);

  useEffect(() => {
    let isMounted = true;
    getPublicSkills().then((data) => {
      if (isMounted && data && data.length > 0) {
        setSkillsData(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Specific skill item icon mapping with automatic brand matching
  const getSkillIcon = (name) => {
    const n = name.toLowerCase().trim();

    // Frontend & Web Tech
    if (n.includes('html5') || n.includes('html')) return <FaHtml5 className="w-4 h-4 text-[#E34F26]" />;
    if (n.includes('css3') || n.includes('css')) return <FaCss3Alt className="w-4 h-4 text-[#1572B6]" />;
    if (n.includes('javascript') || n === 'js') return <SiJavascript className="w-4 h-4 text-[#F7DF1E] rounded-sm" />;
    if (n.includes('typescript') || n === 'ts') return <SiTypescript className="w-4 h-4 text-[#3178C6] rounded-sm" />;
    if (n.includes('react')) return <FaReact className="w-4 h-4 text-[#61DAFB]" />;
    if (n.includes('next')) return <SiNextdotjs className="w-4 h-4 text-white" />;
    if (n.includes('vite')) return <SiVite className="w-4 h-4 text-[#646CFF]" />;
    if (n.includes('tailwind')) return <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />;
    if (n.includes('redux')) return <SiRedux className="w-4 h-4 text-[#764ABC]" />;
    if (n.includes('bootstrap')) return <SiBootstrap className="w-4 h-4 text-[#7952B3]" />;
    if (n.includes('sass') || n.includes('scss')) return <SiSass className="w-4 h-4 text-[#CC6699]" />;

    // Backend & Languages
    if (n.includes('node')) return <FaNodeJs className="w-4 h-4 text-[#339933]" />;
    if (n.includes('express')) return <SiExpress className="w-4 h-4 text-white" />;
    if (n.includes('python')) return <FaPython className="w-4 h-4 text-[#3776AB]" />;
    if (n.includes('java') && !n.includes('javascript')) return <FaJava className="w-4 h-4 text-[#EA2D2E]" />;
    if (n.includes('graphql')) return <SiGraphql className="w-4 h-4 text-[#E10098]" />;
    if (n.includes('prisma')) return <SiPrisma className="w-4 h-4 text-[#4A5568]" />;

    // Databases
    if (n.includes('mysql')) return <SiMysql className="w-4 h-4 text-[#4479A1]" />;
    if (n.includes('mongodb') || n.includes('mongo')) return <SiMongodb className="w-4 h-4 text-[#47A248]" />;
    if (n.includes('postgres') || n.includes('postgresql')) return <SiPostgresql className="w-4 h-4 text-[#4169E1]" />;
    if (n.includes('redis')) return <SiRedis className="w-4 h-4 text-[#DC382D]" />;
    if (n.includes('firebase')) return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />;
    if (n.includes('supabase')) return <SiSupabase className="w-4 h-4 text-[#3ECF8E]" />;

    // Deployment, Cloud & Hosting
    if (n.includes('vercel')) return <SiVercel className="w-4 h-4 text-white" />;
    if (n.includes('netlify')) return <SiNetlify className="w-4 h-4 text-[#00C7B7]" />;
    if (n.includes('cloudflare')) return <SiCloudflare className="w-4 h-4 text-[#F38020]" />;
    if (n.includes('render')) return <SiRender className="w-4 h-4 text-[#46E3B7]" />;
    if (n.includes('godaddy') || n.includes('go daddy')) return <SiGodaddy className="w-4 h-4 text-[#1BDBDB]" />;
    if (n.includes('hostinger')) return <SiHostinger className="w-4 h-4 text-[#673DE6]" />;
    if (n.includes('aws')) return <FaAws className="w-4 h-4 text-[#FF9900]" />;
    if (n.includes('docker')) return <FaDocker className="w-4 h-4 text-[#2496ED]" />;
    if (n.includes('linux')) return <SiLinux className="w-4 h-4 text-[#FCC624]" />;

    // Tools, Git & IDEs
    if (n.includes('git') && !n.includes('github')) return <FaGitAlt className="w-4 h-4 text-[#F05032]" />;
    if (n.includes('github')) return <FaGithub className="w-4 h-4 text-white" />;
    if (n.includes('postman')) return <SiPostman className="w-4 h-4 text-[#FF6C37]" />;
    if (n.includes('figma')) return <SiFigma className="w-4 h-4 text-[#F24E1E]" />;
    if (n.includes('vs code') || n.includes('vscode')) return <Code2 className="w-4 h-4 text-[#007ACC]" />;

    // AI Dev Tools & LLMs
    if (n.includes('chatgpt') || n.includes('openai')) return <SiOpenai className="w-4 h-4 text-[#10A37F]" />;
    if (n.includes('gemini') || n.includes('google')) return <SiGoogle className="w-4 h-4 text-[#4285F4]" />;
    if (n.includes('claude') || n.includes('anthropic')) return <SiAnthropic className="w-4 h-4 text-[#D97706]" />;
    if (n.includes('cursor')) return <Cpu className="w-4 h-4 text-[#8C97E6]" />;
    if (n.includes('antigravity')) return <Sparkles className="w-4 h-4 text-[#4D5BC9]" />;
    if (n.includes('grok')) return <Sparkles className="w-4 h-4 text-[#1DA1F2]" />;
    if (n.includes('copilot') || n.includes('codex')) return <Code2 className="w-4 h-4 text-[#2496ED]" />;

    // Core Concepts & Technical Principles
    if (n.includes('data structure') || n.includes('dsa') || n.includes('algorithm')) return <Boxes className="w-4 h-4 text-[#8C97E6]" />;
    if (n.includes('network')) return <Globe className="w-4 h-4 text-[#4D5BC9]" />;
    if (n.includes('dbms') || n.includes('database')) return <Database className="w-4 h-4 text-[#3ECF8E]" />;
    if (n.includes('software') || n.includes('engineering')) return <Workflow className="w-4 h-4 text-[#8C97E6]" />;
    if (n.includes('auth') || n.includes('shield') || n.includes('security')) return <Shield className="w-4 h-4 text-emerald-400" />;
    if (n.includes('comm') || n.includes('real-time') || n.includes('socket')) return <MessageSquare className="w-4 h-4 text-cyan-400" />;
    if (n.includes('api') || n.includes('rest')) return <Server className="w-4 h-4 text-[#8C97E6]" />;
    if (n.includes('responsive')) return <Layout className="w-4 h-4 text-[#8C97E6]" />;
    if (n.includes('deploy') || n.includes('host')) return <Rocket className="w-4 h-4 text-[#4D5BC9]" />;
    
    return <Code2 className="w-4 h-4 text-[#8C97E6]" />;
  };

  // Category Icon helper with cobalt and clean accents
  const getCategoryIcon = (category) => {
    const c = category.toLowerCase().trim();
    if (c.includes('frontend')) return <Layout className="w-5 h-5 text-[#8C97E6]" />;
    if (c.includes('backend')) return <Cpu className="w-5 h-5 text-[#4D5BC9]" />;
    if (c.includes('database')) return <Database className="w-5 h-5 text-[#8C97E6]" />;
    if (c.includes('tool') || c.includes('platform')) return <Wrench className="w-5 h-5 text-[#4D5BC9]" />;
    if (c.includes('ai') || c.includes('ide')) return <Sparkles className="w-5 h-5 text-[#8C97E6]" />;
    if (c.includes('concept') || c.includes('core')) return <BookOpen className="w-5 h-5 text-[#4D5BC9]" />;
    if (c.includes('deploy') || c.includes('host') || c.includes('cloud')) return <Server className="w-5 h-5 text-[#8C97E6]" />;
    return <Boxes className="w-5 h-5 text-[#8C97E6]" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="Skills" className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Background Atmospheric Smoke */}
      <CinematicSmoke intensity="subtle" align="right" className="opacity-70" />
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#2C3480]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* NARRATIVE PERSPECTIVE BANNER (Right-Facing Portrait) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 p-7 sm:p-9 lg:p-10 rounded-3xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)] relative overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2C3480]/20 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Right-Facing Portrait (4 cols) */}
            <div className="lg:col-span-4 flex justify-center items-end relative select-none">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] flex items-end justify-center">
                {/* Cobalt Rim Light behind portrait */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[240px] h-[300px] rounded-full bg-[#2C3480]/40 blur-[55px] pointer-events-none" />
                
                {/* Portrait: right.png (Facing right into technical skills) */}
                <img
                  src={rightPortrait}
                  alt="Chandan Tiwadi - Profile View (Facing Right Towards Technical Skills)"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] filter contrast-[1.03] brightness-[1.01]"
                />

                {/* Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20" />

                {/* Badge */}
                <div className="absolute bottom-2 z-30 px-3 py-1 rounded-full bg-black/85 border border-white/10 backdrop-blur-md flex items-center gap-2 pointer-events-none shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D5BC9] animate-pulse shadow-[0_0_8px_#4D5BC9]" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-300">
                    TECHNICAL FOCUS
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Editorial Journey & Heading (8 cols) */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C97E6] font-bold block mb-2">
                PERSPECTIVE 03 • ENGINEERING CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
                Technical <span className="text-gradient-cobalt">Mastery</span>
              </h2>
              <div className="w-16 h-1 bg-[#2C3480] rounded-full mt-3 mb-5 shadow-[0_0_12px_#2C3480]" />

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mb-6 font-normal">
                A disciplined software engineering foundation rooted in clean architecture, type safety, modular frontend composition, and performant RESTful APIs. Continuously evolving with modern full-stack workflows and emerging AI developer ecosystems.
              </p>

              {/* Architectural Highlights Pills */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Frontend Architecture',
                  'REST & Backend Services',
                  'Database Schema Design',
                  'AI-Augmented Workflows',
                  'Cloud & Serverless Hosting'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-300 bg-white/[0.03] border border-white/10 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C97E6]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Spacious 3-Column Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {skillsData.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-[#2C3480]/70 hover:shadow-[0_8px_30px_rgba(44,52,128,0.3)] transition-all duration-300 flex flex-col justify-start"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/[0.06]">
                <div className="p-2.5 rounded-xl bg-[#2C3480]/20 border border-[#2C3480]/40 text-[#8C97E6]">
                  {getCategoryIcon(skillGroup.category)}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide font-sans">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skills Badges List */}
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 bg-white/[0.02] border border-white/10 hover:border-[#2C3480]/60 hover:text-white hover:bg-[#2C3480]/15 transition-all duration-200 cursor-default flex items-center gap-2"
                  >
                    {getSkillIcon(skill)}
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
