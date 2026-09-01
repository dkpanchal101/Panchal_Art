import React from 'react';
import { Star, Quote, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import AnimatedCounter from '../ui/AnimatedCounter';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Raj Patel",
      role: "Managing Director, Apex Retail",
      location: "Mumbai",
      text: "Outstanding quality work! Our multi-location store signage was delivered with incredible precision and reflective radium clarity.",
      rating: 5,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      verifiedBadge: "Verified Retail Client"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Operations Head, Luxury Fleet",
      location: "Pune",
      text: "The automotive solar tinting service for our corporate fleet was top tier. Flawless installation and noticeable heat reduction.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      verifiedBadge: "Verified Fleet Partner"
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Commercial Director",
      location: "Delhi",
      text: "Extremely fast turnaround and high-precision custom lettering for our regional headquarters. Highly recommended team!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      verifiedBadge: "Verified Corporate Client"
    },
    {
      id: 4,
      name: "Sneha Joshi",
      role: "Brand Strategist",
      location: "Bangalore",
      text: "Their digital logo design and CNC banner execution captured our corporate identity perfectly with modern aesthetics.",
      rating: 5,
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      verifiedBadge: "Verified Agency Client"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Storefront Franchisee",
      location: "Ahmedabad",
      text: "The LED radium display board looks incredible at night. Superior craftsmanship, material quality, and customer support.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      verifiedBadge: "Verified Storefront Client"
    },
    {
      id: 6,
      name: "Kavita Reddy",
      role: "Event Producer",
      location: "Hyderabad",
      text: "Heavy-duty outdoor event banners delivered under tight deadlines. Exceeded all our technical expectations.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      verifiedBadge: "Verified Event Organizer"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow-pill mb-4">
              Client Endorsements
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-5">
              Trusted by Corporate & Retail Procurement Leaders
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Read verified case studies and testimonials from corporate clients across Gujarat and nationwide.
            </p>
          </Reveal>
        </div>

        {/* Editorial Split Layout: Sticky Procurement Ledger + Testimonials Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Left Column: Procurement Trust Metrics Card (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <div className="bg-slate-950 text-white rounded-3xl p-7 border border-slate-800 shadow-2xl space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-1">
                    Procurement Assurance
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    Quality Performance Index
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="font-heading text-3xl font-extrabold gold-text-gradient mb-0.5">
                      <AnimatedCounter value="4.9 / 5.0" />
                    </div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Overall Client Rating</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="font-heading text-3xl font-extrabold gold-text-gradient mb-0.5">
                      <AnimatedCounter value="98.6%" />
                    </div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">On-Time Delivery Guarantee</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="font-heading text-3xl font-extrabold gold-text-gradient mb-0.5">
                      <AnimatedCounter value="500+" />
                    </div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Verified Commercial Clients</div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 font-medium flex items-center">
                  <ShieldCheck className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                  <span>100% Satisfaction & Material Replacement Standard</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Testimonials Case Study Cards Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Reveal key={testimonial.id} delay={idx * 0.05}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="card-financial-light flex flex-col justify-between h-full relative"
                >
                  <Quote className="w-10 h-10 text-gold/15 absolute top-6 right-6" />

                  <div>
                    {/* Verified Pill Badge */}
                    <div className="mb-3">
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {testimonial.verifiedBadge}
                      </span>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                      ))}
                    </div>

                    {/* Feedback Text */}
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center pt-4 border-t border-slate-100">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gold/30 mr-3 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm">{testimonial.name}</h4>
                      <p className="text-slate-500 text-[11px]">{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>

                </motion.div>
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;