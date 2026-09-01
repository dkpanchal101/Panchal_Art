import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, Eye, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../ui/Reveal';

const Portfolio = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const portfolioItems = [
    {
      id: 1,
      title: "Architectural Radium Signage",
      category: "Radium Cutting",
      image: "/Radium.avif",
      description: "Custom laser-cut precision radium signage with high-contrast backlighting",
      specs: { location: "Mumbai HQ", material: "3M Prismatic Vinyl", duration: "3 Days" }
    },
    {
      id: 2,
      title: "Storefront Metallic Lettering",
      category: "Lettering",
      image: "/Banner.png",
      description: "Executive 3D lettering installation for commercial headquarters",
      specs: { location: "Pune Retail", material: "Cast Acrylic & Metal", duration: "2 Days" }
    },
    {
      id: 3,
      title: "Exhibition Stage Backdrops",
      category: "Banners",
      image: "/Banner.png",
      description: "Large format high-definition vinyl banner for corporate showcase",
      specs: { location: "Ahmedabad Arena", material: "Heavy Duty Flex", duration: "24 Hours" }
    },
    {
      id: 4,
      title: "Executive Car Glass Tinting",
      category: "Car Films",
      image: "/Film Pasting.jpg",
      description: "Automotive privacy tinting with 99% UV rejection solar control film",
      specs: { location: "Gujarat Fleet", material: "Nano-Ceramic Film", duration: "4 Hours" }
    },
    {
      id: 5,
      title: "Corporate Brand Identity",
      category: "Digital Design",
      image: "/Logo.png",
      description: "Vector logo creation & branding design for commercial enterprise",
      specs: { location: "Corporate HQ", material: "Vector Scalable CMYK", duration: "5 Days" }
    },
    {
      id: 6,
      title: "Multi-Color Display Board",
      category: "Display Boards",
      image: "/Radium.avif",
      description: "High-visibility multi-color radium cut display board assembly",
      specs: { location: "Thasara Complex", material: "LED Backlit Board", duration: "2 Days" }
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow-pill mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Project Inspection Board
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Recent Engineering & Design Installations
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
              Hover over any project asset to inspect procurement metadata, material specifications, and deployment location.
            </p>
          </Reveal>
        </div>

        {/* Portfolio Inspection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  navigate('/gallery');
                  window.scrollTo(0, 0);
                }}
                className="group card-financial-dark flex flex-col h-full cursor-pointer p-0 overflow-hidden relative border-slate-800 hover:border-gold/50"
              >
                
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-950/90 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Dynamic Inspection Overlay Badge */}
                  <AnimatePresence>
                    {hoveredId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-md p-3 rounded-xl border border-gold/40 text-xs shadow-2xl space-y-1"
                      >
                        <div className="flex justify-between items-center text-slate-300 font-semibold">
                          <span className="flex items-center text-slate-400">
                            <MapPin className="w-3 h-3 text-gold mr-1" /> {item.specs.location}
                          </span>
                          <span className="font-mono text-gold">{item.specs.duration}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          Stock: <span className="text-white font-medium">{item.specs.material}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-slate-900/60">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-gold transition-colors">
                    <span>Inspect Portfolio Metadata</span>
                    <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Section Bottom Action */}
        <div className="text-center">
          <Reveal delay={0.1}>
            <Link to="/gallery">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
              >
                <span>Explore Complete Gallery</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;