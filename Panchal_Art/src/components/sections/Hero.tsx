import React from 'react';
import { ArrowRight, Play, Sparkles, Award, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image with Fallback */}
      <div className="absolute inset-0 z-0">
        {/* Try to load the image, with fallback */}
        <img
          src="/hero_section_img.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Hide image if it fails to load, fallback gradient will show
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30"></div>
        {/* Pattern overlay for texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-pulse"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl">
          {/* Badge */}
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary/90 backdrop-blur-sm text-primary-contrast rounded-full text-sm font-semibold shadow-lg">
                <Award className="w-4 h-4" />
                Trusted Since 2010 • 20+ Years of Excellence
              </span>
            </motion.div>
          </Reveal>

          {/* Main Heading */}
          <Reveal delay={0.1}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
            >
              Crafting Your Vision with
              <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Precision & Style
              </span>
            </motion.h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.2}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed"
            >
              From radium cutting to custom designs, we bring your brand to life with exceptional craftsmanship and attention to detail. 
              <span className="block mt-2 text-primary font-semibold">
                Your trusted partner in professional signage and design.
              </span>
            </motion.p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <button
                onClick={handleGetQuote}
                className="group relative bg-primary text-primary-contrast px-10 py-5 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-primary/50 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={handleViewServices}
                className="group border-2 border-white/80 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white hover:text-text transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-white/10 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                View Our Services
              </button>
            </motion.div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {[
                { 
                  icon: <Sparkles className="w-8 h-8 text-primary" />,
                  value: '1000+', 
                  label: 'Projects Completed',
                  color: 'from-primary to-accent'
                },
                { 
                  icon: <Award className="w-8 h-8 text-accent" />,
                  value: '20+', 
                  label: 'Years Experience',
                  color: 'from-accent to-primary'
                },
                { 
                  icon: <Users className="w-8 h-8 text-primary" />,
                  value: '500+', 
                  label: 'Happy Clients',
                  color: 'from-primary to-accent'
                },
                { 
                  icon: <Clock className="w-8 h-8 text-accent" />,
                  value: '24h', 
                  label: 'Quick Response',
                  color: 'from-accent to-primary'
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:bg-white/15"
                >
                  <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base font-medium">{stat.label}</div>
                  {/* Hover effect glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 backdrop-blur-sm bg-white/10">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-white rounded-full"
            ></motion.div>
          </div>
          <span className="text-white/70 text-xs mt-2">Scroll</span>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-0"></div>
    </section>
  );
};

export default Hero;