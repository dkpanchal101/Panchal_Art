import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Clock, Heart, Sparkles, ChevronRight, ShieldCheck, MapPin, Wrench } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/ui/SEO';

const About = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-gold" />,
      title: "3M Retro-Reflective Grade",
      description: "We utilize genuine 3M microprismatic retro-reflective vinyl engineered for 99.4% night visibility and 7+ years outdoor weather resistance."
    },
    {
      icon: <Wrench className="w-6 h-6 text-gold" />,
      title: "Computerized CNC Precision",
      description: "Laser cutting tolerances up to ±0.1mm for sharp letterforms, 3D acrylic layering, and ACP sheet backdrops."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold" />,
      title: "Samsung IP67 LED Modules",
      description: "Energy-efficient waterproof backlighting modules tested for 50,000 continuous glow hours with low maintenance."
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Guaranteed Turnaround",
      description: "Rapid 24-48 hour turnaround on radium laser cuts and 3-5 days on commercial illuminated display boards."
    }
  ];

  return (
    <div className="pt-20 bg-slate-950 text-slate-100 min-h-screen">
      <SEO 
        title="About Panchal Art - 40+ Years Signage & Laser Cutting Heritage in Gujarat"
        description="Learn about Panchal Art's 40-year legacy in Thasara, Gujarat. Founded in 1985, we specialize in high-precision radium laser cutting, 3D acrylic LED signboards & automotive solar control films."
        keywords="Panchal Art history, signage manufacturer Gujarat, Kalpesh Panchal, Dharmshigh Parmar, Thasara sign shop, radium laser cutting company Gujarat"
        canonical="https://panchalart.com/about"
      />
      
      {/* Rich Architectural Hero Banner */}
      <section className="relative py-12 md:py-16 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_section_img.png"
            alt=""
            className="w-full h-full object-cover opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>
          
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <Reveal>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-300 mb-3">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-gold font-bold">About Us</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <span className="eyebrow-pill mb-3 shadow-xl">
              <Sparkles className="w-3.5 h-3.5" /> Corporate Heritage Since 1985
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              About <span className="gold-text-gradient">Panchal Art</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal">
              Pioneering custom signage engineering, radium laser cutting, and brand identity design in Thasara, Gujarat for over 40 years.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SEO-Rich Story Section */}
      <section className="py-12 md:py-16 bg-ivory border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Content (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-gold text-xs font-bold uppercase tracking-wider block">Our Gujarat Heritage</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Craftsmanship Lineage Passed Down Through Generations
                </h2>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                  Founded in 1985 in front of the Thasara Railway Station in Gujarat, Panchal Art began as a traditional hand-painted signboard studio dedicated to typographic accuracy and durable oil paint lettering. Over the past four decades, we have continuously modernized our facility to incorporate state-of-the-art industrial technology.
                </p>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                  Today, Panchal Art is equipped with high-precision CNC routers, laser radium cutting plotters, large-format 540 GSM flex printing presses, and specialized clean bays for automotive solar control window film application.
                </p>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                  We proudly serve corporate offices, retail chains, healthcare facilities, automotive owners, and government contractors across Thasara, Anand, Nadiad, Vadodara, Ahmedabad, Kheda, and greater Gujarat.
                </p>
              </div>

              {/* Logo / Image Box (5 cols) */}
              <div className="md:col-span-5">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md text-center">
                  <img 
                    src="/Main Logo.png" 
                    alt="Panchal Art Brand Mark - Signage Gujarat"
                    className="w-full h-48 object-contain rounded-xl mb-3 bg-slate-900 p-4 border border-slate-800"
                  />
                  <p className="text-xs text-slate-700 font-bold uppercase tracking-wider">
                    Official Panchal Art Mark of Precision
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    In front of Railway Station, Thasara - 388250, Gujarat
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4-Pillar Quality Standards Grid */}
      <section className="py-12 bg-stone border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Our 4 Technical Quality Pillars
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm font-normal">
              Engineered standards that differentiate Panchal Art craftsmanship across Gujarat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, index) => (
              <div key={index} className="card-financial-light p-5 bg-white border border-slate-200/80 shadow-subtle">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-gold/30 flex items-center justify-center mb-4 shadow-sm">
                  {pillar.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-slate-700 text-xs leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Showcase */}
      <section className="py-12 md:py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow-pill mb-2">
              Master Technicians
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Leadership & Quality Assurance
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm font-normal">
              Directing our technical execution and quality assurance on every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Kalpesh Panchal */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle text-center group hover:border-gold/50 transition-all">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="Kalpesh Panchal - Founder Panchal Art"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gold/40 shadow-lg group-hover:scale-105 transition-transform"
              />
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-0.5">Kalpesh Panchal</h3>
              <p className="text-gold font-extrabold text-xs uppercase tracking-wider mb-3">Founder & Design Director</p>
              <p className="text-slate-700 text-xs leading-relaxed font-normal">
                20+ years of mastery in traditional letterforms, laser radium cutting plotters, and custom storefront architectural design across Gujarat.
              </p>
            </div>

            {/* Dharmshigh Parmar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle text-center group hover:border-gold/50 transition-all">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                alt="Dharmshigh Parmar - Operations Manager Panchal Art"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gold/40 shadow-lg group-hover:scale-105 transition-transform"
              />
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-0.5">Dharmshigh Parmar</h3>
              <p className="text-gold font-extrabold text-xs uppercase tracking-wider mb-3">Operations & Quality Manager</p>
              <p className="text-slate-700 text-xs leading-relaxed font-normal">
                Overseeing client relations, site installation teams, structural safety, and material quality assurance in Anand, Nadiad & Vadodara.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;