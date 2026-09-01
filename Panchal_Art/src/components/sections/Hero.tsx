import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, Award, Users, Clock, Cpu, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import AnimatedCounter from '../ui/AnimatedCounter';

const Hero = () => {
  const navigate = useNavigate();
  const [activeSpec, setActiveSpec] = useState<'radium' | 'cnc' | 'tint'>('radium');

  const handleGetQuote = () => {
    const quoteButton = document.querySelector('[data-quote-trigger]') as HTMLElement;
    if (quoteButton) {
      quoteButton.click();
    }
  };

  const handleViewServices = () => {
    navigate('/services');
    window.scrollTo(0, 0);
  };

  const specDetails = {
    radium: {
      title: "Radium Laser Cutting",
      tolerance: "± 0.10 mm",
      reflectivity: "99.4% Retro-Reflective",
      material: "3M Microprismatic Vinyl",
      durability: "7+ Years Outdoor"
    },
    cnc: {
      title: "CNC LED Acrylic Boards",
      tolerance: "± 0.05 mm Cut",
      reflectivity: "Multi-layer Backlit",
      material: "Cast Acrylic & ACP Sheet",
      durability: "10+ Years Heavy Duty"
    },
    tint: {
      title: "Automotive Solar Tinting",
      tolerance: "Contour Fitted",
      reflectivity: "99% UV & 85% IR Barrier",
      material: "Nano-Ceramic Film",
      durability: "Lifetime Scratch Shield"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 pt-24 pb-12 md:pt-28 md:pb-16 border-b border-slate-800">
      
      {/* Background Vignette & Subtle Architectural Grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_section_img.png"
          alt="Workshop Heritage"
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-125 transition-opacity duration-1000"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
        
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.10, 0.15, 0.10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 right-0 w-[450px] h-[450px] bg-gold rounded-full blur-[130px] pointer-events-none"
        ></motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Action Area (7 cols) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-4"
          >
            
            {/* Trust Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <span className="eyebrow-pill shadow-lg text-[11px] py-1 px-3">
                <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>Established 1985 • 40+ Years Heritage</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Architectural Signage &
              <span className="block mt-1 gold-text-gradient font-black">
                Precision Radium Craft
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-base text-slate-200 max-w-xl leading-relaxed font-normal"
            >
              From custom radium laser cutting and storefront lettering to automotive glass films and LED display boards, we engineer distinctive visual branding for businesses.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetQuote}
                className="btn-primary py-3 px-6 text-xs group"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewServices}
                className="btn-secondary py-3 px-6 text-xs group"
              >
                <Play className="w-3.5 h-3.5 mr-2 text-gold group-hover:scale-110 transition-transform" />
                <span>Explore Services</span>
              </motion.button>
            </motion.div>

            {/* Executive Metrics Bar */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-800"
            >
              {[
                { 
                  icon: <Sparkles className="w-3.5 h-3.5 text-gold" />,
                  value: '1,000+', 
                  label: 'Projects Delivered'
                },
                { 
                  icon: <Award className="w-3.5 h-3.5 text-gold" />,
                  value: '40+', 
                  label: 'Years Heritage'
                },
                { 
                  icon: <Users className="w-3.5 h-3.5 text-gold" />,
                  value: '500+', 
                  label: 'Corporate Clients'
                },
                { 
                  icon: <Clock className="w-3.5 h-3.5 text-gold" />,
                  value: '24 Hours', 
                  label: 'Response Time'
                },
              ].map((stat, idx) => (
                <div key={idx} className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-1 mb-0.5">
                    {stat.icon}
                  </div>
                  <div className="font-heading text-lg sm:text-xl font-extrabold text-white">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-slate-300 text-[10px] font-semibold truncate">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Column: Architectural Technical Spec Card (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="card-financial-dark border-gold/35 bg-slate-850 shadow-2xl relative overflow-hidden backdrop-blur-xl p-5 sm:p-6">
              
              {/* Header Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-gold" />
                  <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-white">
                    Technical Spec Lens
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Activity className="w-2.5 h-2.5 mr-1 animate-pulse" /> Live Queue
                </span>
              </div>

              {/* Spec Selector Buttons */}
              <div className="grid grid-cols-3 gap-1.5 mb-4 p-1 bg-slate-950 rounded-xl border border-slate-800">
                {[
                  { id: 'radium', label: 'Radium' },
                  { id: 'cnc', label: 'CNC LED' },
                  { id: 'tint', label: 'Car Tint' }
                ].map(spec => (
                  <button
                    key={spec.id}
                    onClick={() => setActiveSpec(spec.id as any)}
                    className={`py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      activeSpec === spec.id
                        ? 'bg-gold text-slate-950 font-extrabold shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {spec.label}
                  </button>
                ))}
              </div>

              {/* Spec Matrix Details */}
              <div className="space-y-2.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Focus:</span>
                  <span className="font-heading font-bold text-gold">{specDetails[activeSpec].title}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-850">
                  <span className="text-slate-300 font-semibold">Cut Tolerance:</span>
                  <span className="font-mono text-white font-bold">{specDetails[activeSpec].tolerance}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-850">
                  <span className="text-slate-300 font-semibold">Reflectivity:</span>
                  <span className="font-mono text-emerald-400 font-bold">{specDetails[activeSpec].reflectivity}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-850">
                  <span className="text-slate-300 font-semibold">Base Stock:</span>
                  <span className="text-white font-semibold truncate max-w-[150px] text-right">{specDetails[activeSpec].material}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-850">
                  <span className="text-slate-300 font-semibold">Durability:</span>
                  <span className="text-gold font-bold">{specDetails[activeSpec].durability}</span>
                </div>
              </div>

              {/* Callout Footer */}
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-semibold pt-0.5">
                <span className="flex items-center">
                  <Layers className="w-3 h-3 text-gold mr-1" /> ISO 9001 Material Standard
                </span>
                <span className="text-gold font-bold uppercase tracking-wider">Verified Spec</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;