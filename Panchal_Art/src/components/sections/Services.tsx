import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Type, Car, Image, Palette, Monitor, ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Radium Cutting & Custom Design",
      description: "Precision radium cutting for professional signage with custom shapes and sizes.",
      image: "/Radium.avif"
    },
    {
      icon: <Type className="w-8 h-8" />,
      title: "Stylish Name Printing",
      description: "Beautiful custom lettering for businesses, homes, and vehicles in various styles.",
      image: "/Banner.png"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "CNC cutting Banner",
      description: "Eye-catching multi-color radium boards with LED backlighting for maximum impact.",
      image: "/CNC banner.webp"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Car Glass Film Pasting",
      description: "Professional automotive window tinting for UV protection and privacy.",
      image: "/automotive-window-film.jpeg"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Shop & Stage Banners",
      description: "Durable banners and posters for events, promotions, and branding needs.",
      image: "/Banner.png"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Logo & Digital Design",
      description: "Complete branding solutions from concept to creation across all platforms.",
      image: "/Logo.png"
    }
  ];

  return (
    <section className="py-16 bg-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              What We Offer
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl font-bold text-text mb-6">
              Our Professional Services
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              From traditional craftsmanship to modern digital solutions, we offer comprehensive services to meet all your design and signage needs.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="group bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 p-3 bg-white/90 rounded-lg text-primary">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted mb-4">
                    {service.description}
                  </p>
                  <button className="text-primary font-medium hover:text-primary/80 transition-colors duration-300 flex items-center">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Reveal delay={0.1}>
            <Link
              to="/services"
              className="inline-flex items-center bg-primary text-primary-contrast px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Services;