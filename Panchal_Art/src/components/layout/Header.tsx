import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Settings, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleGetQuote = () => {
    const quoteButton = document.querySelector('[data-quote-trigger]') as HTMLElement;
    if (quoteButton) {
      quoteButton.click();
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-card py-3' 
          : 'bg-slate-900/75 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-slate-800 border border-gold/30 p-[1px] shadow-sm group-hover:border-gold/60 transition-colors duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="font-heading font-black text-lg gold-text-gradient tracking-tighter">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-extrabold tracking-tight text-white group-hover:text-gold transition-colors duration-300">
                PANCHAL <span className="gold-text-gradient">ART</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest -mt-1">
                Precision Signage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-850/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-slate-950 bg-gold font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Cluster */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919426362542"
              className="flex items-center text-xs font-semibold text-slate-300 hover:text-gold transition-colors duration-300 bg-slate-850 px-3.5 py-2 rounded-xl border border-slate-800 hover:border-slate-700"
            >
              <Phone className="w-3.5 h-3.5 mr-2 text-gold" />
              <span>+91 9426362542</span>
            </a>

            {isAuthenticated && (
              <Link
                to="/admin/gallery"
                className="p-2 text-slate-400 hover:text-gold hover:bg-slate-850 rounded-xl transition-colors duration-300 border border-slate-800"
                title="Admin Panel"
              >
                <Settings className="w-4 h-4" />
              </Link>
            )}

            <button 
              onClick={handleGetQuote}
              className="btn-primary py-2.5 px-5 text-xs shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              <span>Get Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-850 text-slate-200 border border-slate-800 hover:text-gold transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-800 shadow-2xl animate-fade-in">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gold text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-850 hover:text-gold'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-600'}`} />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <a
                  href="tel:+919426362542"
                  className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-slate-850 text-slate-300 text-xs font-semibold border border-slate-800 hover:border-slate-700"
                >
                  <Phone className="w-4 h-4 mr-2 text-gold" />
                  <span>Call: +91 9426362542</span>
                </a>

                {isAuthenticated && (
                  <Link
                    to="/admin/gallery"
                    className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-slate-850 text-slate-300 text-xs font-semibold border border-slate-800 hover:text-gold"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Admin Portal</span>
                  </Link>
                )}

                <button 
                  onClick={handleGetQuote}
                  className="btn-primary w-full py-3 text-xs"
                >
                  Request Consultation Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;