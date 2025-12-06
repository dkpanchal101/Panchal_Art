import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://drive.google.com/file/d/1iroQ-u0cvlMzHWIJ4fXCbTyqDmGPqeFB/view?usp=drive_link"
          alt="Professional signage and design work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <Reveal>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/90 text-primary-contrast rounded-full text-sm font-medium mb-4">
                Trusted Since 2010
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Crafting Your Vision with
              <span className="text-primary block">Precision & Style</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              From radium cutting to custom designs, we bring your brand to life with exceptional craftsmanship and attention to detail.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-primary text-primary-contrast px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group">
                Get Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-text transition-all duration-300 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                View Services
              </button>
            </div>
          </Reveal>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1000+', label: 'Projects Completed' },
              { value: '20+', label: 'Years Experience' },
              { value: '500+', label: 'Happy Clients' },
              { value: '24h', label: 'Quick Response' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.2 + i * 0.05}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;