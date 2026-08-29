import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Portfolio from '../components/sections/Portfolio';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import SEO from '../components/ui/SEO';
import { MapPin, ShieldCheck, Award, Wrench } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <SEO 
        title="Precision Signage, Radium Laser Cutting & Car Glass Film"
        description="Panchal Art is Gujarat's premier master technician facility for 3M radium laser cutting, 3D acrylic LED boards, CNC router printing, automotive solar tinting & flex banners in Thasara, Anand, Nadiad & Vadodara."
        keywords="radium laser cutting Thasara, custom signage Anand, 3D acrylic LED board Nadiad, car glass film pasting Vadodara, flex banner printing Gujarat, Panchal Art"
        canonical="https://panchalart.com/"
      />
      
      <Hero />
      <Services />
      <About />
      <Portfolio />

      {/* Localized SEO Feature Grid Section */}
      <section className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="eyebrow-pill mb-2">
              <MapPin className="w-3.5 h-3.5 text-gold" /> Regional Coverage across Gujarat
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Gujarat's Trusted Signage & Laser Cutting Manufacturer
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
              Operating directly from our Thasara headquarters (in front of Railway Station), Panchal Art provides end-to-end site evaluation, 3D design proofing, precision CNC laser cutting, and site installation across Anand, Nadiad, Vadodara, Ahmedabad, Kheda, and regional commercial hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider">
                <Wrench className="w-4 h-4" />
                <span>Radium Laser Cutting & Vinyl</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-normal">
                High-precision 3M retro-reflective vinyl cutting with laser tolerances up to ±0.1mm. Engineered for storefront signs, highway safety markers, vehicle numbering, and corporate letterforms.
              </p>
            </div>

            <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>3D Acrylic & LED Signboards</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-normal">
                Computerized CNC routing for 10mm cast acrylic, ACP sheet backdrops, and Samsung IP67 waterproof LED backlighting designed for 50,000 hours of continuous glow operation.
              </p>
            </div>

            <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Automotive Solar Glass Films</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-normal">
                Executive multi-layer nano-ceramic solar window tinting providing 99% UV rejection and 85% infrared cabin heat reduction for luxury vehicles, SUVs, and commercial fleets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;