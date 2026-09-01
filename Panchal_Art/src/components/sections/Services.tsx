import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Type, Car, Image, Palette, Monitor, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/services');
    window.scrollTo(0, 0);
  };

  const featuredServices = [
    {
      icon: <Scissors className="w-5 h-5 text-gold" />,
      title: "Radium Cutting & Custom Design",
      description: "High-precision radium laser cutting for commercial signage, reflective safety graphics, and custom architectural lettering.",
      features: ["Precision Laser Tolerance ±0.1mm", "3M Microprismatic Vinyl Stock", "7+ Years Weather Resistance"],
      image: "/Radium.avif"
    },
    {
      icon: <Palette className="w-5 h-5 text-gold" />,
      title: "CNC Cutting & LED Display Boards",
      description: "Precision CNC cut acrylic & metallic boards with multi-layer radium accents and energy-efficient LED backlighting.",
      features: ["Cast Acrylic & Anodized Aluminum", "Multi-Layer Backlit Contrast", "10+ Years Heavy-Duty Life"],
      image: "/CNC banner.webp"
    }
  ];

  const secondaryServices = [
    {
      icon: <Car className="w-5 h-5 text-gold" />,
      title: "Car Glass Film Pasting",
      description: "Executive automotive window tinting, heat barrier film application, and 99% UV rejection solar control.",
      image: "/automotive-window-film.jpeg"
    },
    {
      icon: <Type className="w-5 h-5 text-gold" />,
      title: "Stylish Name Printing",
      description: "Custom typography and vinyl lettering solutions tailored for corporate storefronts and executive offices.",
      image: "/Banner.png"
    },
    {
      icon: <Monitor className="w-5 h-5 text-gold" />,
      title: "Logo & Brand Digital Design",
      description: "Comprehensive corporate brand identity creation, scalable vector graphics, and multi-surface logo solutions.",
      image: "/Logo.png"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Reveal>
            <span className="eyebrow-pill mb-3">
              Capabilities Spectrum
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Engineering Excellence in Signage & Design
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Merging traditional craftsmanship with state-of-the-art cutting technology to deliver high-impact visual assets.
            </p>
          </Reveal>
        </div>

        {/* Featured Spotlight Row (2 Large Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {featuredServices.map((service, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <motion.div 
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={handleServiceClick}
                className="group card-financial-light flex flex-col h-full cursor-pointer p-0 overflow-hidden border-slate-300/80 shadow-subtle hover:border-gold"
              >
                
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-950/90 border border-white/10 rounded-lg flex items-center justify-center text-gold shadow-md backdrop-blur-md">
                      {service.icon}
                    </div>
                    <span className="bg-slate-950/90 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md">
                      Featured Focus
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow justify-between bg-white space-y-3">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>

                    <div className="space-y-1.5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center text-[11px] font-semibold text-slate-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-gold mr-1.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider group-hover:text-gold transition-colors">
                    <span>Inspect Specifications</span>
                    <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {secondaryServices.map((service, index) => (
            <Reveal key={index} delay={index * 0.08 + 0.15}>
              <motion.div 
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={handleServiceClick}
                className="group card-financial-light flex flex-col h-full cursor-pointer p-0 overflow-hidden"
              >
                
                <div className="relative h-40 overflow-hidden bg-slate-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 w-8 h-8 bg-slate-950/90 border border-white/10 rounded-lg flex items-center justify-center text-gold shadow-md backdrop-blur-md">
                    {service.icon}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="font-heading text-base font-bold text-slate-900 mb-1.5 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900 uppercase tracking-wider group-hover:text-gold transition-colors">
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center">
          <Reveal delay={0.1}>
            <Link to="/services">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary py-3 px-6 text-xs"
              >
                <span>View Full Service Catalog</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Services;