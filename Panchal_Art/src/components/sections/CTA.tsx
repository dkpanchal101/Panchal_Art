import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-contrast mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-primary-contrast/90 mb-8">
            Let's discuss your project and create something amazing together. Get a free consultation and quote today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Request Call
            </button>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Now
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-primary-contrast/90">
            <div>
              <div className="text-2xl font-bold mb-2">Free Consultation</div>
              <p className="text-sm">Discuss your project requirements with our experts</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Custom Solutions</div>
              <p className="text-sm">Tailored designs that perfectly match your vision</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Quick Turnaround</div>
              <p className="text-sm">Fast delivery without compromising on quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;