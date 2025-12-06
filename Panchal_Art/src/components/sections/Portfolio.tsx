import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Custom Restaurant Signage",
      category: "Radium Cutting",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
      description: "Professional radium cut signage with LED backlighting"
    },
    {
      id: 2,
      title: "Business Storefront Letters",
      category: "Lettering",
      image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg",
      description: "Elegant lettering installation for retail business"
    },
    {
      id: 3,
      title: "Event Banner Design",
      category: "Banners",
      image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg",
      description: "Large format banner for outdoor promotional event"
    },
    {
      id: 4,
      title: "Automotive Window Tinting",
      category: "Car Films",
      image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
      description: "Professional car window tinting with UV protection"
    },
    {
      id: 5,
      title: "Brand Logo Creation",
      category: "Digital Design",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      description: "Modern logo design for technology startup"
    },
    {
      id: 6,
      title: "Multi-Color Display Board",
      category: "Radium Cutting",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      description: "Vibrant multi-color radium board installation"
    }
  ];

  return (
    <section className="py-16 bg-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-4xl font-bold text-text mb-6">
            Recent Projects
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Discover our latest creations and see how we've helped businesses stand out with exceptional design and craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-text p-3 rounded-full hover:bg-primary hover:text-primary-contrast transition-colors duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-contrast px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text mb-2">
                  {item.title}
                </h3>
                <p className="text-muted mb-4">
                  {item.description}
                </p>
                <button className="text-primary font-medium hover:text-primary/80 transition-colors duration-300 flex items-center">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center bg-primary text-primary-contrast px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
          >
            View Full Portfolio
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;