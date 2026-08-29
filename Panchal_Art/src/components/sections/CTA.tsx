import React from 'react';
import { Phone, MessageCircle, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';

const CTA = () => {
  const handleGetQuote = () => {
    const quoteButton = document.querySelector('[data-quote-trigger]') as HTMLElement;
    if (quoteButton) {
      quoteButton.click();
    }
  };

  return (
    <section className="py-20 md:py-24 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Ambient Lighting Gradients */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-[140px] pointer-events-none"
      ></motion.div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Consultation Desk Container */}
        <div className="bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Reveal>
              <span className="eyebrow-pill mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Architectural Consultation Desk
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                Ready to Transform Your Corporate & Brand Presence?
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Connect directly with our master technicians for on-site measurement, material selection, and transparent cost estimation.
              </p>
            </Reveal>
          </div>

          {/* Action Channel Buttons */}
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetQuote}
                className="btn-primary w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2" />
                Request Consultation Quote
              </motion.button>
              
              <a
                href="https://wa.me/919426362542"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                  Instant WhatsApp Inquiry
                </motion.button>
              </a>
            </div>
          </Reveal>

          {/* Technical Guarantee Checklist Grid */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800 text-left">
              <motion.div 
                whileHover={{ y: -2 }}
                className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800"
              >
                <div className="font-heading text-sm font-bold text-gold mb-1.5 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-gold" /> Free Technical Estimate
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Detailed material breakdown and site advice with zero obligation.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800"
              >
                <div className="font-heading text-sm font-bold text-gold mb-1.5 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-gold" /> Laser Precision Cutting
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Bespoke dimensions, reflective radium grades, and CNC router shaping.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800"
              >
                <div className="font-heading text-sm font-bold text-gold mb-1.5 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gold" /> Guaranteed Turnaround
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Streamlined fabrication schedule ensuring on-time delivery across Gujarat.</p>
              </motion.div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};

export default CTA;