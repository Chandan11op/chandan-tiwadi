import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

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
    
    const config = portfolioData.emailConfig;
    
    // If EmailJS details are configured, use EmailJS to send notifications & styled autoresponses.
    // Otherwise, fall back to FormSubmit.co
    if (config && config.serviceId && config.templateIdNotify && config.templateIdAutoresponder && config.publicKey) {
      const notifyPromise = fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateIdNotify,
          user_id: config.publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            reply_to: formData.email
          }
        })
      });

      const autorespondPromise = fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateIdAutoresponder,
          user_id: config.publicKey,
          template_params: {
            to_name: formData.name,
            to_email: formData.email,
            reply_to: "chandan110906@gmail.com"
          }
        })
      });

      Promise.all([notifyPromise, autorespondPromise])
        .then(([res1, res2]) => {
          if (res1.ok && res2.ok) {
            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' });
          } else {
            setFormStatus('error');
          }
        })
        .catch(error => {
          console.error("EmailJS Error:", error);
          setFormStatus('error');
        });
    } else {
      // Fallback: FormSubmit.co
      fetch("https://formsubmit.co/ajax/chandan110906@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })
        .then(response => {
          if (response.ok) {
            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' });
          } else {
            setFormStatus('error');
          }
        })
        .catch(error => {
          console.error("FormSubmit Error:", error);
          setFormStatus('error');
        });
    }
  };

  const contactDetails = [
    { icon: <Mail className="w-5 h-5 text-accent" />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone className="w-5 h-5 text-secondaryAccent" />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, '')}` },
    { icon: <MapPin className="w-5 h-5 text-accent" />, label: 'Location', value: personal.location, href: null },
    { icon: <FaGithub className="w-5 h-5 text-secondaryAccent" />, label: 'GitHub', value: 'Chandan11op', href: personal.github }
  ];

  return (
    <section id="Contact" className="relative py-24 md:py-32 bg-primary/20 overflow-hidden">
      {/* Background decoration */}
      <div className="glow-orb w-[400px] h-[400px] bg-secondaryAccent top-1/4 right-0 translate-x-1/2" />
      <div className="glow-orb w-[300px] h-[300px] bg-primary bottom-0 left-0 -translate-x-1/3 -translate-y-1/3" />

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
            Let's <span className="text-gradient-gold">Connect</span>
          </motion.h2>
          <p className="text-sm md:text-base text-gray-400 mt-3 font-medium tracking-wide">
            Open to Full Stack Developer Internships & Entry-Level Roles
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-accent mx-auto mt-4 rounded-full shadow-[0_0_8px_#FFD700]"
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact details cards */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-glassBorder space-y-6">
              <h3 className="text-xl font-bold text-gray-100 pb-3 border-b border-white/5">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-primary/40 border border-white/5 hover:border-accent/20 hover:shadow-gold-glow transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-primary/80 border border-glassBorder group-hover:scale-105 transition-transform shrink-0">
                      {detail.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
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
                          className="text-sm md:text-base font-bold text-gray-200 hover:text-accent transition-colors truncate"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-sm md:text-base font-bold text-gray-200 truncate">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-glassBorder relative overflow-hidden">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="p-4 rounded-full bg-accent/15 border border-accent/20 text-accent mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-gray-100 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-8">
                      Thank you! Chandan has received your message and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2.5 rounded-full border border-accent text-accent font-semibold hover:bg-accent hover:text-primary transition-all duration-300 hover:shadow-gold-glow"
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
                    <h3 className="text-xl font-bold text-gray-100 pb-3 border-b border-white/5">
                      Send a Message
                    </h3>
                    
                    {/* Name input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
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
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-primary/40 border border-glassBorder text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-gold-glow transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
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
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-primary/40 border border-glassBorder text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-gold-glow transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
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
                        placeholder="Type your message details here..."
                        className="w-full px-4 py-3 rounded-xl bg-primary/40 border border-glassBorder text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-gold-glow transition-all duration-300 disabled:opacity-50 text-sm font-medium resize-none"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        Failed to send message. Please try again or email directly to chandan110906@gmail.com.
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 rounded-xl bg-accent text-primary font-bold text-sm hover:bg-yellow-400 hover:shadow-gold-glow-hover transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Send Message</span>
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
