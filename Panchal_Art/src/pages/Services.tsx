import React from 'react';
import { Scissors, Type, Car, Image, Palette, Monitor } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="w-12 h-12 text-primary" />,
      title: "Radium Cutting & Custom Design & Multi-color Radium Boards & Cutting",
      description: "Precision radium cutting for signs, boards, and custom displays. Our state-of-the-art cutting technology ensures clean, professional edges every time.",
      features: ["Precision laser cutting", "Custom shapes & sizes", "Weather-resistant materials", "Installation service"],
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg"
    },
    {
      icon: <Type className="w-12 h-12 text-primary" />,
      title: "Stylish Name Printing & Lettering",
      description: "Beautiful custom lettering for businesses, homes, and vehicles. From elegant scripts to bold modern fonts, we bring your words to life.",
      features: ["Various font styles", "Vinyl lettering", "3D raised letters", "Color matching"],
      image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg"
    },
    {
      icon: <Palette className="w-12 h-12 text-primary" />,
      title: "School Banner",
      description: "Eye-catching multi-color radium boards perfect for storefronts, restaurants, and retail spaces. Vibrant colors that capture attention day and night.",
      features: ["LED backlighting", "Color combinations", "Energy efficient", "Long-lasting"],
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
    },
    {
      icon: <Car className="w-12 h-12 text-primary" />,
      title: "Car Glass Film Pasting",
      description: "Professional automotive window tinting and protective films. UV protection, privacy, and style enhancement for your vehicle.",
      features: ["UV protection", "Privacy tinting", "Heat reduction", "Professional installation"],
      image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg"
    },
    {
      icon: <Image className="w-12 h-12 text-primary" />,
      title: "Shop & Stage Banners & Posters",
      description: "High-quality banners and posters for events, promotions, and branding. Durable materials that withstand weather and maintain vibrant colors.",
      features: ["Weather resistant", "Large format printing", "Custom sizing", "Fast turnaround"],
      image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg"
    },
    {
      icon: <Monitor className="w-12 h-12 text-primary" />,
      title: "Logo & Poster Design, Digital Design",
      description: "Complete branding solutions from concept to creation. Digital designs that work across all platforms and print media.",
      features: ["Brand identity", "Digital artwork", "Print-ready files", "Multiple formats"],
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted mb-8">
              Comprehensive design and manufacturing solutions for all your visual communication needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className={`mb-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex items-center gap-12`}>
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h2 className="text-2xl lg:text-3xl font-bold text-text ml-4">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-muted mb-6 text-lg">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="bg-primary text-primary-contrast px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-contrast mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-contrast/80 text-lg mb-8">
              Contact us today for a free consultation and quote. Let's bring your vision to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
