import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Award, FolderGit } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImg from '../assets/portfolio_image.png';

export default function About() {
  const { bio, location, stats } = portfolioData.personalInfo;

  // Stat Icons Map helper
  const getIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'projects built':
        return <FolderGit className="w-5 h-5 text-secondaryAccent" />;
      case 'paid client project':
        return <Briefcase className="w-5 h-5 text-accent" />;
      case 'certifications':
        return <Award className="w-5 h-5 text-accent" />;
      default:
        return <Briefcase className="w-5 h-5 text-green-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="About" className="relative py-24 md:py-32 bg-darkBg overflow-hidden">
      {/* Background decoration */}
      <div className="glow-orb w-[300px] h-[300px] bg-primary top-1/2 left-0 -translate-y-1/2" />

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
            About <span className="text-gradient-gold">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-accent mx-auto mt-4 rounded-full shadow-[0_0_8px_#FFD700]"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center relative group"
          >
            {/* Background design elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-secondaryAccent/20 rounded-3xl blur-2xl group-hover:scale-105 transition-transform duration-500 -z-10" />
            
            {/* Outer border glow frame */}
            <div className="p-2.5 rounded-3xl bg-gradient-to-tr from-accent via-primary/50 to-secondaryAccent border border-glassBorder shadow-2xl relative">
              <img
                src={profileImg}
                alt="Chandan Gopal Tiwadi Profile"
                className="w-full max-w-[320px] md:max-w-[360px] aspect-square object-cover rounded-2xl shadow-inner border border-primary/20 transform group-hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
              />
            </div>
            
            {/* Small location tag overlay */}
            <div className="absolute -bottom-4 right-4 md:right-10 px-4 py-2 rounded-xl bg-primary/90 border border-glassBorder shadow-lg flex items-center gap-2 backdrop-blur-md">
              <MapPin className="w-4 h-4 text-accent animate-bounce" />
              <span className="text-xs font-semibold text-gray-200">{location}</span>
            </div>
          </motion.div>

          {/* Right: Text & Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-gray-100 mb-6"
            >
              Passionate Web Developer & <span className="text-accent">AI Enthusiast</span>
            </motion.h3>

            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed mb-10">
              {bio.map((para, idx) => (
                <motion.p key={idx} variants={itemVariants}>
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Stats Cards Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 rounded-2xl flex flex-col justify-center items-center text-center border border-glassBorder hover:border-accent/30 hover:-translate-y-1 hover:shadow-gold-glow transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-full bg-primary/80 mb-3 border border-glassBorder group-hover:scale-110 transition-transform">
                    {getIcon(stat.label)}
                  </div>
                  <span className="text-xl md:text-2xl font-black text-accent mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-gray-400 font-semibold leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
