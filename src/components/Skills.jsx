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
  Terminal, 
  Layers, 
  Workflow, 
  HardDrive, 
  Boxes 
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
    if (n.includes('prisma')) return <SiPrisma className="w-4 h-4 text-[#2D3748]" />;

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
    if (n.includes('cursor')) return <Cpu className="w-4 h-4 text-[#8b5cf6]" />;
    if (n.includes('antigravity')) return <Sparkles className="w-4 h-4 text-[#3b82f6]" />;
    if (n.includes('grok')) return <Sparkles className="w-4 h-4 text-[#1DA1F2]" />;
    if (n.includes('codex') || n.includes('copilot')) return <Code2 className="w-4 h-4 text-[#2496ED]" />;

    // Core Concepts & Technical Principles
    if (n.includes('data structure') || n.includes('dsa') || n.includes('algorithm')) return <Boxes className="w-4 h-4 text-accent" />;
    if (n.includes('network')) return <Globe className="w-4 h-4 text-blue-400" />;
    if (n.includes('dbms') || n.includes('database')) return <Database className="w-4 h-4 text-[#3ECF8E]" />;
    if (n.includes('software') || n.includes('engineering')) return <Workflow className="w-4 h-4 text-accentPurple" />;
    if (n.includes('auth') || n.includes('shield') || n.includes('security')) return <Shield className="w-4 h-4 text-emerald-400" />;
    if (n.includes('comm') || n.includes('real-time') || n.includes('socket')) return <MessageSquare className="w-4 h-4 text-cyan-400" />;
    if (n.includes('api') || n.includes('rest')) return <Server className="w-4 h-4 text-accent" />;
    if (n.includes('responsive')) return <Layout className="w-4 h-4 text-accent" />;
    if (n.includes('deploy') || n.includes('host')) return <Rocket className="w-4 h-4 text-purple-400" />;
    
    return <Code2 className="w-4 h-4 text-accent" />;
  };

  // Category Icon helper matching your categories
  const getCategoryIcon = (category) => {
    const c = category.toLowerCase().trim();
    if (c.includes('frontend')) return <Layout className="w-6 h-6 text-accent" />;
    if (c.includes('backend')) return <Cpu className="w-6 h-6 text-secondaryAccent" />;
    if (c.includes('database')) return <Database className="w-6 h-6 text-blue-400" />;
    if (c.includes('tool') || c.includes('platform')) return <Wrench className="w-6 h-6 text-accent" />;
    if (c.includes('ai') || c.includes('ide')) return <Sparkles className="w-6 h-6 text-amber-400" />;
    if (c.includes('concept') || c.includes('core')) return <BookOpen className="w-6 h-6 text-secondaryAccent" />;
    if (c.includes('deploy') || c.includes('host') || c.includes('cloud')) return <Server className="w-6 h-6 text-emerald-400" />;
    return <Boxes className="w-6 h-6 text-accent" />;
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
