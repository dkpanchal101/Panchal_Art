import React from 'react';
import { Users, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Family-Run Business",
      description: "Three generations of craftsmanship and dedication to quality."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Expert Craftsmanship",
      description: "Specialized in radium cutting and custom design work."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Timely Delivery",
      description: "We respect your deadlines and deliver projects on time."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Customer Satisfaction",
      description: "Your vision is our mission. We don't rest until you're happy."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              About Panchal Art
            </h1>
            <p className="text-xl text-muted mb-8">
              Crafting Excellence in Design Since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text mb-6">Our Story</h2>
                <p className="text-muted mb-6">
                  Panchal Art began as a small family workshop with a simple mission: to bring creative visions to life through exceptional craftsmanship. What started with traditional sign-making has evolved into a comprehensive design studio, but our commitment to quality and personal service remains unchanged.
                </p>
                <p className="text-muted">
                  Today, we specialize in radium cutting, custom lettering, car glass films, and digital design. Every project reflects our dedication to precision, creativity, and customer satisfaction. We're not just service providers – we're your partners in making your brand shine.
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-md">
                <img 
                  src="/Main Logo.png" 
                  alt="Craftsman working on custom design"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-muted text-center">
                  Master craftsman at work in our design studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-text mb-12">
              Why Choose Panchal Art?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-md">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="Rajesh Panchal - Founder"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-text mb-2">Kalpesh Panchal</h3>
                <p className="text-primary font-medium mb-2">Founder, Master Craftsman and Design Director</p> 
                <p className="text-muted text-sm">15+ years of experience in traditional and modern design techniques.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-md">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                  alt="Arjun Panchal - Operations Manager"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-text mb-2">Dharmshigh Parmar</h3>
                <p className="text-primary font-medium mb-2">Operations Manager</p>
                <p className="text-muted text-sm">Ensuring quality delivery and customer satisfaction on every project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;