import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, History } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import AnimatedCounter from '../ui/AnimatedCounter';

const About = () => {
  const milestones = [
    {
      year: "1985",
      title: "Hand-Lettering Workshop Founded",
      description: "Established in Gujarat with traditional sign painting craftsmanship and custom lettering techniques."
    },
    {
      year: "2005",
      title: "Radium Laser & CNC Modernization",
      description: "Pioneered high-accuracy retro-reflective radium cutting and CNC acrylic board fabrication."
    },
    {
      year: "2025",
      title: "Automotive Solar & Corporate Fleets",
      description: "Expanded into executive solar control tinting, high-DPI banners, and nationwide brand identity deployments."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-stone relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Reveal>
            <span className="eyebrow-pill mb-3">
              <History className="w-3.5 h-3.5 text-gold" /> Corporate Heritage
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Four Decades of Craftsmanship Lineage
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Merging hand-finished traditional accuracy with industrial laser cutting and high-performance materials.
            </p>
          </Reveal>
        </div>

        {/* Editorial Timeline & Image Collage Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Timeline Axis (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300/80 space-y-6">
              {milestones.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <div className="relative group">
                    {/* Node Circle */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-gold border-2 border-slate-900 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-subtle group-hover:border-gold/50 transition-colors">
                      <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-gold bg-gold/15 border border-gold/30 px-2.5 py-0.5 rounded-md inline-block mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-heading font-extrabold text-slate-900 text-base sm:text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <div className="pt-1">
                <Link to="/about">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary py-3 px-6 text-xs"
                  >
                    <span>Read Full Company Story</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Harmonized Image & Soft Stat Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="relative">
                
                {/* Main Workshop Background Image */}
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-900">
                  <img
                    src="/hero_section_img.png"
                    alt="Craftsmanship workshop showcase"
                    className="w-full h-80 sm:h-[380px] object-cover opacity-95 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                </div>

                {/* Overlapping Harmonized Stat Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-6 -left-4 right-4 p-4 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/90 shadow-xl text-slate-900"
                >
                  <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-200">
                    <div>
                      <div className="font-heading text-xl font-extrabold text-slate-900">
                        <AnimatedCounter value="40+" />
                      </div>
                      <div className="text-[10px] font-bold text-gold uppercase tracking-wider">Years</div>
                    </div>
                    <div>
                      <div className="font-heading text-xl font-extrabold text-slate-900">
                        <AnimatedCounter value="1,000+" />
                      </div>
                      <div className="text-[10px] font-bold text-gold uppercase tracking-wider">Projects</div>
                    </div>
                    <div>
                      <div className="font-heading text-xl font-extrabold text-slate-900">
                        <AnimatedCounter value="500+" />
                      </div>
                      <div className="text-[10px] font-bold text-gold uppercase tracking-wider">Clients</div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;