import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import CinematicSmoke from './CinematicSmoke';

export default function Contact() {
  const personal = portfolioData.personalInfo;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');

    const form = e.target;
    const formPayload = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formPayload,
    })
      .then((res) => {
        if (res.ok) {
          setFormStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setFormStatus('error');
        }
      })
      .catch((error) => {
        console.error('Web3Forms submission error:', error);
        setFormStatus('error');
      });
  };

  const contactDetails = [
    { icon: <Mail className="w-5 h-5 text-[#8C97E6]" />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone className="w-5 h-5 text-[#4D5BC9]" />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, '')}` },
    { icon: <MapPin className="w-5 h-5 text-[#8C97E6]" />, label: 'Location', value: personal.location, href: null },
    { icon: <FaGithub className="w-5 h-5 text-[#4D5BC9]" />, label: 'GitHub', value: 'Chandan11op', href: personal.github }
  ];

  return (
    <section id="Contact" className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Background Volumetric Smoke */}
      <CinematicSmoke intensity="subtle" align="right" className="opacity-70" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#2C3480]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-left">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C97E6] font-bold block mb-2">
            INITIATE COMMUNICATION
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
                Let's <span className="text-gradient-cobalt">Connect</span>
              </h2>
              <div className="w-16 h-1 bg-[#2C3480] rounded-full mt-3 shadow-[0_0_12px_#2C3480]" />
            </div>
            <p className="text-sm md:text-base text-gray-400 max-w-md font-normal leading-relaxed">
              Available for full-stack engineering roles, technical contracting, and software development inquiries.
            </p>
          </div>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Details & WhatsApp (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="p-7 sm:p-9 rounded-3xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)] space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans pb-3 border-b border-white/[0.06]">
                Direct Coordinates
              </h3>

              <div className="space-y-3.5">
                {contactDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#2C3480]/50 hover:bg-[#2C3480]/10 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-[#2C3480]/20 border border-[#2C3480]/40 group-hover:scale-105 transition-transform shrink-0">
                      {detail.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono">
                        {detail.label}
                      </span>
                      {detail.href ? (
                        <a
                          href={detail.label === 'Email' ? `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}` : detail.href}
                          onClick={(e) => {
                            if (detail.label === 'Email') {
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
                          target={detail.label === 'Phone' ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base font-bold text-white hover:text-[#8C97E6] transition-colors truncate"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-sm sm:text-base font-bold text-white truncate">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant WhatsApp Quick Action */}
              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={`https://wa.me/${personal.phone.replace(/[\s+()-]/g, '')}?text=Hey%20Chandan%20Tiwadi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-2.5 text-xs font-bold"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Start a Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Web3Forms Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-9 rounded-3xl glass-card border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)] relative overflow-hidden text-left">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="p-4 rounded-full bg-[#2C3480]/20 border border-[#2C3480] text-[#8C97E6] mb-6 shadow-[0_0_25px_#2C3480]"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 font-sans">
                      Message Transmitted
                    </h3>
                    <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-8">
                      Thank you! Chandan has received your message and will respond to your inquiry shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-3 rounded-xl border border-[#2C3480] text-white font-bold text-xs hover:bg-[#2C3480] transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Web3Forms required hidden fields */}
                    <input type="hidden" name="access_key" value="d656db94-098e-4b86-8370-2dd1e667f37b" />
                    <input type="hidden" name="autoresponse" value="Thank you for reaching out! I appreciate you contacting me. I have received your message and will get back to you shortly.&#10;&#10;Best regards,&#10;Chandan" />

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans pb-3 border-b border-white/[0.06]">
                      Send a Direct Message
                    </h3>
                    
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={formStatus === 'submitting'}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#4D5BC9] focus:shadow-[0_0_20px_rgba(77,91,201,0.3)] transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={formStatus === 'submitting'}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#4D5BC9] focus:shadow-[0_0_20px_rgba(77,91,201,0.3)] transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        disabled={formStatus === 'submitting'}
                        placeholder="Describe your project, team opportunity, or inquiry..."
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#4D5BC9] focus:shadow-[0_0_20px_rgba(77,91,201,0.3)] transition-all duration-300 disabled:opacity-50 text-sm font-medium resize-none"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        Failed to send message. Please try again or email directly to {personal.email}.
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 rounded-xl bg-[#2C3480] border border-[#4D5BC9]/50 text-white font-bold text-sm hover:bg-[#3E49A8] hover:shadow-[0_0_30px_rgba(62,73,168,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(44,52,128,0.3)]"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#8C97E6]" />
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8C97E6]" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
