import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ShieldCheck, Award } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-800/80">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-gold/30 p-[1px] shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <span className="font-heading font-black text-lg gold-text-gradient">P</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                  PANCHAL <span className="gold-text-gradient">ART</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-300 tracking-widest -mt-1">
                  Precision Signage & Design
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal">
              Delivering high-precision radium cutting, custom architectural lettering, car glass films, and executive branding solutions since 1985.
            </p>

            <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300 pt-1">
              <span className="inline-flex items-center text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                <Award className="w-3.5 h-3.5 mr-1.5" /> 40+ Years of Craftsmanship
              </span>
            </div>

            <div className="flex space-x-3 pt-2">
              {[
                { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com", label: "Facebook" },
                { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
                { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com", label: "Twitter" }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-gold hover:border-gold/50 hover:bg-slate-850 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-100 border-l-2 border-gold pl-3">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services Spectrum', href: '/services' },
                { name: 'Project Gallery', href: '/gallery' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-slate-300 hover:text-gold transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-gold mr-2 transition-colors duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Expertise (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-100 border-l-2 border-gold pl-3">
              Specialized Services
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                'Radium Cutting & Precision Signs',
                'Architectural Lettering & Logos',
                'Automotive Window Tinting',
                'CNC Cutting & Display Boards',
                'Event & Shop Banners',
                'Digital Brand Identity & Graphics'
              ].map((service, idx) => (
                <li key={idx} className="text-slate-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2.5"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact HQ (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-100 border-l-2 border-gold pl-3">
              Headquarters
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-xs leading-relaxed font-normal">
                  In front of Railway Station, Thasara - 388250, Gujarat, India
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a 
                  href="tel:+919426362542" 
                  className="text-xs font-bold text-slate-200 hover:text-gold transition-colors duration-200"
                >
                  +91 9426362542
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a 
                  href="mailto:dkpanchal2023@gmail.com" 
                  className="text-xs text-slate-200 hover:text-gold transition-colors duration-200 truncate font-semibold"
                >
                  dkpanchal2023@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium space-y-4 md:space-y-0">
          <p>© {currentYear} Panchal Art. All Rights Reserved. Built with Precision Craftsmanship.</p>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link to="/gallery" className="hover:text-slate-200 transition-colors">Quality Standard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;