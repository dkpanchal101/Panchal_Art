import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';

const About = () => {
  return (
    <section className="py-16 bg-bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <Reveal>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                About Us
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl font-bold text-text mb-6">
                Three Generations of Craftsmanship Excellence
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted text-lg mb-6">
                Panchal Art began as a small family workshop with a simple mission: to bring creative visions to life through exceptional craftsmanship. What started with traditional sign-making has evolved into a comprehensive design studio, but our commitment to quality and personal service remains unchanged.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted text-lg mb-8">
                Today, we specialize in radium cutting, custom lettering, car glass films, and digital design. Every project reflects our dedication to precision, creativity, and customer satisfaction. We're not just service providers – we're your partners in making your brand shine.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Reveal>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">Family-Run Business</h3>
                    <p className="text-muted text-sm">Three generations of expertise</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">Quality Assured</h3>
                    <p className="text-muted text-sm">40+ years of excellence</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Link
                to="/about"
                className="inline-flex items-center bg-primary text-primary-contrast px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Reveal>
          </div>

          {/* Image */}
          <div className="relative">
            <Reveal>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg"
                  alt="Master craftsman working on custom design"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </Reveal>
            
            {/* Floating card */}
            <Reveal delay={0.1}>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">40+</div>
                    <div className="text-sm text-muted">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted">Clients</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;