import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Scissors, Type, Car, Image, Palette, Monitor, CheckCircle2, ArrowRight, 
  Sparkles, ChevronRight, Layers, Cpu, HelpCircle, ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/ui/Reveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import SEO from '../components/ui/SEO';

const Services = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeMaterialTabs, setActiveMaterialTabs] = useState<{ [key: number]: string }>({});

  const handleGetQuote = () => {
    const quoteButton = document.querySelector('[data-quote-trigger]') as HTMLElement;
    if (quoteButton) {
      quoteButton.click();
    }
  };

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'radium', name: 'Radium & Laser' },
    { id: 'cnc', name: 'CNC & LED' },
    { id: 'automotive', name: 'Automotive Tinting' },
    { id: 'banners', name: 'Banners & Print' },
    { id: 'digital', name: 'Brand & Logo' }
  ];

  const services = [
    {
      id: 1,
      category: 'radium',
      icon: <Scissors className="w-5 h-5 text-gold" />,
      title: "Multi-Color Radium Boards & Precision Laser Cutting",
      shortTag: "Laser Cutting • Reflective Vinyl",
      description: "Computerized laser radium cutting utilizing 3M retro-reflective microprismatic vinyl stock. Designed for high-visibility commercial storefronts, highway safety boards, vehicle numbering, and custom architectural letterforms across Gujarat.",
      materials: [
        { id: '3m', name: '3M Microprismatic', spec: '99.4% Retro-Reflective Grade', life: '7+ Years Weatherproof' },
        { id: 'eng', name: 'Engineer Grade', spec: 'High-Visibility Commercial Vinyl', life: '5+ Years Outdoor' },
        { id: 'cast', name: 'Cast Metallic', spec: 'Custom Gold & Chrome Foil Accents', life: '10+ Years Premium' }
      ],
      features: ["Precision Laser Tolerance ±0.1mm", "3M Microprismatic Vinyl Stock", "Weatherproof & UV-resistant vinyl", "Professional on-site installation"],
      image: "/Radium.avif",
      stats: { leadTime: "24-48 Hours", warranty: "5 Years", precision: "±0.1 mm" }
    },
    {
      id: 2,
      category: 'cnc',
      icon: <Palette className="w-5 h-5 text-gold" />,
      title: "CNC Router Cutting & 3D Acrylic LED Display Boards",
      shortTag: "CNC Router • LED Backlit",
      description: "High-impact 3D illuminated signboards fabricated with 10mm cast acrylic, ACP sheet backdrops, and Samsung IP67 waterproof LED backlighting module arrays. Perfect for corporate offices, retail stores, and commercial complexes.",
      materials: [
        { id: 'acrylic', name: 'Cast Acrylic', spec: '10mm Heavy Duty Optical Sheet', life: '10+ Years Warranty' },
        { id: 'led', name: 'Samsung LED', spec: 'IP67 Waterproof Backlit Modules', life: '50,000 Op Hours' },
        { id: 'acp', name: 'ACP Sheet Base', spec: '3mm Weather-Shield Metallic ACP', life: 'Lifetime Frame Strength' }
      ],
      features: ["Energy-efficient LED backlighting", "Bespoke color matrix combinations", "Structural ACP frame durability", "Low maintenance display"],
      image: "/CNC banner.webp",
      stats: { leadTime: "3-5 Days", warranty: "10 Years", precision: "±0.05 mm" }
    },
    {
      id: 3,
      category: 'automotive',
      icon: <Car className="w-5 h-5 text-gold" />,
      title: "Automotive Car Glass Film Pasting & Solar Heat Barrier",
      shortTag: "Nano-Ceramic • 99% UV Barrier",
      description: "Executive automotive window tinting and protective solar control films applied in clean dust-free installation bays. Provides 99% UV rejection, 85% infrared cabin heat reduction, and optical privacy for luxury cars and commercial fleets.",
      materials: [
        { id: 'ceramic', name: 'Nano-Ceramic', spec: '99% UV & 85% IR Heat Rejection', life: 'Lifetime Non-Fading' },
        { id: 'privacy', name: 'Privacy Tint', spec: 'Single-way Transmission Grade', life: '7+ Years Scratch Shield' },
        { id: 'safety', name: 'Safety Film', spec: '4 Mil Anti-Shatter Glass Barrier', life: 'Impact Resistant' }
      ],
      features: ["99% UV radiation rejection", "Privacy & security tinting grades", "Significant cabin heat reduction", "Certified bubble-free installation"],
      image: "/automotive-window-film.jpeg",
      stats: { leadTime: "2-4 Hours", warranty: "Lifetime", precision: "Contour Fit" }
    },
    {
      id: 4,
      category: 'banners',
      icon: <Image className="w-5 h-5 text-gold" />,
      title: "Commercial Shop Banners & Event Stage Backdrops",
      shortTag: "Large Format • Heavy Flex",
      description: "Heavy-duty 540 GSM flex banner printing and Star Flex glossy displays printed with solvent high-DPI digital presses. Hemmed with brass eyelets for outdoor durability during exhibitions, stage events, and retail promotions.",
      materials: [
        { id: 'flex', name: '540 GSM Heavy Flex', spec: 'Tear-Proof High Tensile Stock', life: '3+ Years Weatherproof' },
        { id: 'star', name: 'Star Flex Gloss', spec: 'Vibrant CMYK High-DPI Print', life: 'Indoor/Outdoor Premium' },
        { id: 'mesh', name: 'Wind Mesh', spec: 'Air-Permeable Stage Backdrop', life: 'High Wind Resistant' }
      ],
      features: ["Weather resistant vinyl stock", "Vibrant high-DPI digital printing", "Custom hemmed sizing & eyelets", "Fast delivery & setup support"],
      image: "/Banner.png",
      stats: { leadTime: "12-24 Hours", warranty: "2 Years", precision: "High DPI" }
    },
    {
      id: 5,
      category: 'digital',
      icon: <Monitor className="w-5 h-5 text-gold" />,
      title: "Corporate Brand Identity & Digital Logo Design",
      shortTag: "Vector Design • Brand Book",
      description: "Complete brand design solutions from vector logo creation to 3D photorealistic architectural sign mockups. Scalable master files (AI, SVG, EPS) optimized for physical signage fabrication and digital branding.",
      materials: [
        { id: 'vector', name: 'Vector Master Files', spec: 'Scalable SVG, AI, EPS Formats', life: 'Infinite Resolution' },
        { id: 'brand', name: 'Brand Spec Sheet', spec: 'Pantone & RAL Color Matrix', life: 'Corporate Standard' },
        { id: 'mockup', name: '3D Mockup Proof', spec: 'Photorealistic Storefront Proof', life: 'Client Approval' }
      ],
      features: ["Corporate brand identity systems", "Scalable vector graphics & logos", "Print-ready CMYK assets", "Multi-format digital deliverables"],
      image: "/Logo.png",
      stats: { leadTime: "3-7 Days", warranty: "Full License", precision: "Vector Grid" }
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const processSteps = [
    { num: '01', title: 'Site Measurement', desc: 'On-site technical evaluation and dimension measurement across Gujarat.' },
    { num: '02', title: 'Vector Layout Proof', desc: 'Photorealistic design proof showing exact dimensions, backlighting, and colors.' },
    { num: '03', title: 'Laser & CNC Fabrication', desc: 'Computerized laser radium cutting, 3D acrylic layering, and light testing.' },
    { num: '04', title: 'Site Installation', desc: 'Master technician installation with structural safety guarantees.' }
  ];

  const faqs = [
    { q: "How long does custom radium laser cutting take in Gujarat?", a: "Standard radium laser cutting projects are ready within 24 to 48 hours. Larger commercial illuminated storefront boards take 3 to 5 business days." },
    { q: "What is 3M retro-reflective radium grade and how long does it last?", a: "We use industrial 3M retro-reflective vinyl stock designed to reflect light with 99.4% optical clarity at night. Guaranteed for 7+ years against peeling or fading." },
    { q: "Do you provide on-site measurement across Anand, Nadiad & Vadodara?", a: "Yes, our team provides complete site measurement, structural evaluation, and installation across Thasara, Anand, Nadiad, Vadodara, Ahmedabad, Kheda, and commercial hubs in Gujarat." },
    { q: "Can I upload a custom logo or CAD blueprint for quotation?", a: "Yes, you can upload your PDF, AI, DWG, or high-res image file directly through our online quote modal or email it to dkpanchal2023@gmail.com." }
  ];

  return (
    <div className="pt-20 bg-slate-950 text-slate-100 min-h-screen">
      <SEO 
        title="Signage & Radium Laser Cutting Services Spectrum"
        description="Comprehensive catalog of precision signage services by Panchal Art Gujarat: 3M radium laser cutting, 3D acrylic LED boards, CNC router signage, car glass tinting & 540 GSM flex banners."
        keywords="radium laser cutting service, 3D acrylic LED board manufacturer, car glass film pasting Gujarat, flex banner printing Thasara, Panchal Art services"
        canonical="https://panchalart.com/services"
      />
      
      {/* Compact Architectural Hero Banner */}
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
              <span className="text-gold font-bold">Services Spectrum</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              Engineering & Fabrication <span className="gold-text-gradient">Services Spectrum</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal">
              Explore custom radium laser cutting tolerances, 3D acrylic LED boards, material specifications, and turnaround timelines.
            </p>
          </Reveal>

          {/* Compact Statistics Bar */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-6 pt-5 border-t border-slate-800">
              <div className="bg-slate-850/80 p-2.5 rounded-xl border border-slate-800">
                <div className="font-heading text-xl font-extrabold gold-text-gradient">
                  <AnimatedCounter value="± 0.1 mm" />
                </div>
                <div className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Laser Tolerance</div>
              </div>

              <div className="bg-slate-850/80 p-2.5 rounded-xl border border-slate-800">
                <div className="font-heading text-xl font-extrabold gold-text-gradient">
                  <AnimatedCounter value="99.4%" />
                </div>
                <div className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Retro-Reflectivity</div>
              </div>

              <div className="bg-slate-850/80 p-2.5 rounded-xl border border-slate-800">
                <div className="font-heading text-xl font-extrabold gold-text-gradient">
                  <AnimatedCounter value="24 Hours" />
                </div>
                <div className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Fast Turnaround</div>
              </div>

              <div className="bg-slate-850/80 p-2.5 rounded-xl border border-slate-800">
                <div className="font-heading text-xl font-extrabold gold-text-gradient">
                  <AnimatedCounter value="10 Years" />
                </div>
                <div className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Frame Durability</div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Sleek Compact Filter Bar */}
      <section className="py-3 bg-slate-900 border-b border-slate-800 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-gold mr-1.5" />
              <span>Capabilities Spectrum:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {categories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-gold text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-850 text-slate-300 hover:bg-slate-800 hover:text-gold border border-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Compact Viewport-Fitted Service Cards */}
      <section className="py-10 md:py-14 bg-stone border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <AnimatePresence mode="wait">
              {filteredServices.map((service, index) => {
                const selectedMaterialId = activeMaterialTabs[service.id] || service.materials[0].id;
                const activeMat = service.materials.find(m => m.id === selectedMaterialId) || service.materials[0];

                return (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className={`grid lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-subtle hover:shadow-medium transition-all duration-300 ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    
                    {/* Image Column & Compact Stats (5 cols) */}
                    <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                      <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900 group">
                        <img 
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                        <div className="absolute top-3 left-3">
                          <span className="bg-slate-950/90 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md">
                            {service.shortTag}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2 rounded-lg border border-slate-800 text-[11px] text-white grid grid-cols-3 gap-1 text-center divide-x divide-slate-800">
                          <div>
                            <div className="text-[9px] text-slate-400 font-semibold uppercase">Lead Time</div>
                            <div className="font-heading font-extrabold text-gold text-xs">{service.stats.leadTime}</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 font-semibold uppercase">Precision</div>
                            <div className="font-heading font-extrabold text-white text-xs">{service.stats.precision}</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 font-semibold uppercase">Warranty</div>
                            <div className="font-heading font-extrabold text-emerald-400 text-xs">{service.stats.warranty}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content & Inspector Column (7 cols) */}
                    <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-3.5`}>
                      
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-900 border border-gold/30 shadow-sm flex-shrink-0">
                          {service.icon}
                        </div>
                        <div>
                          <span className="text-gold text-[10px] font-bold uppercase tracking-wider">Engineering Service 0{service.id}</span>
                          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                        {service.description}
                      </p>

                      {/* Compact Material Inspector Box */}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/90 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-200">
                          <span className="flex items-center">
                            <Layers className="w-3 h-3 text-gold mr-1" /> Material Inspector:
                          </span>
                          <span className="text-gold font-bold">{activeMat.name}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5">
                          {service.materials.map(mat => (
                            <button
                              key={mat.id}
                              onClick={() => setActiveMaterialTabs(prev => ({ ...prev, [service.id]: mat.id }))}
                              className={`py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                                selectedMaterialId === mat.id
                                  ? 'bg-slate-900 text-gold shadow-sm border border-gold/40'
                                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                              }`}
                            >
                              {mat.name}
                            </button>
                          ))}
                        </div>

                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] flex justify-between items-center">
                          <span className="text-slate-500">Grade: <strong className="text-slate-900">{activeMat.spec}</strong></span>
                          <span className="text-gold font-bold">{activeMat.life}</span>
                        </div>
                      </div>

                      {/* Features Grid & Action Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-800">
                          {service.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold mr-1.5 flex-shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <button 
                          onClick={handleGetQuote}
                          className="btn-primary py-2.5 px-5 text-[11px] flex-shrink-0"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </button>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4-Step Process Bar */}
      <section className="py-12 bg-ivory border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="eyebrow-pill mb-2">Process</span>
            <h2 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
              4-Step Fabrication Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle"
              >
                <div className="font-heading text-2xl font-extrabold gold-text-gradient mb-1">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm mb-1">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Technical FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-stone rounded-xl border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-heading font-bold text-slate-900 text-sm hover:text-gold transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 text-slate-700 text-xs leading-relaxed border-t border-slate-200/60 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Require Custom Fabrication Specifications?
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm mb-6">
            Speak directly with our master technicians in Gujarat for site measurement and fast quote generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleGetQuote}
              className="btn-primary py-3 px-6 text-xs"
            >
              Get Free Estimate
            </button>
            <button 
              onClick={() => {
                navigate('/gallery');
                window.scrollTo(0, 0);
              }}
              className="btn-secondary py-3 px-6 text-xs"
            >
              View Gallery
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
