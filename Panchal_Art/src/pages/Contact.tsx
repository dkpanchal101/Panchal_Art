import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles, MessageCircle, ChevronRight } from 'lucide-react';
import { API_ENDPOINTS, getCompanyId } from '../config/api';
import Reveal from '../components/ui/Reveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [companyId, setCompanyId] = useState<string>('');

  useEffect(() => {
    const fetchCompanyId = async () => {
      const id = await getCompanyId();
      setCompanyId(id);
    };
    fetchCompanyId();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let currentCompanyId = companyId;
      if (!currentCompanyId) {
        currentCompanyId = await getCompanyId();
        setCompanyId(currentCompanyId);
      }

      if (!currentCompanyId) {
        alert('Error: Unable to get Company ID. Please try again or contact the administrator.');
        console.error('Company ID could not be retrieved');
        setIsSubmitting(false);
        return;
      }

      const serviceMap: { [key: string]: string } = {
        'Radium Cutting & Custom Design': 'radium-cutting',
        'Stylish Name Printing & Lettering': 'printing',
        'Multi-color Radium Boards & Cutting': 'boards',
        'Car Glass Film Pasting': 'car-glass',
        'Shop & Stage Banners & Posters': 'banners',
        'Logo & Poster Design, Digital Design': 'logo-design'
      };

      const payload = {
        ...formData,
        companyId: currentCompanyId,
        service: serviceMap[formData.service] || formData.service.toLowerCase().replace(/\s+/g, '-')
      };

      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'cors',
      });

      let data;
      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response. Status: ${response.status}`);
      }

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
      }

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        console.error('Form submission failed:', data);
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          alert(`Validation Errors:\n${errorMessages}`);
        } else {
          alert(data.message || 'Failed to submit form. Please try again.');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Network error. Please check your connection and try again.';
      
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-gold" />,
      title: "Headquarters & Workshop",
      content: "In front of Railway Station, Thasara - 388250, Gujarat",
      subtext: "Open for consultations & site measurements"
    },
    {
      icon: <Phone className="w-5 h-5 text-gold" />,
      title: "Direct Telephone",
      content: "+91 9426362542",
      subtext: "Mon - Sat: 9:00 AM to 7:00 PM"
    },
    {
      icon: <Mail className="w-5 h-5 text-gold" />,
      title: "Electronic Inquiries",
      content: "dkpanchal2023@gmail.com",
      subtext: "Technical specs & quotation requests"
    },
    {
      icon: <Clock className="w-5 h-5 text-gold" />,
      title: "Operating Hours",
      content: "Monday - Saturday: 9:00 AM - 7:00 PM",
      subtext: "Sunday: 10:00 AM - 4:00 PM"
    }
  ];

  const servicesList = [
    "Radium Cutting & Custom Design",
    "Stylish Name Printing & Lettering",
    "Multi-color Radium Boards & Cutting",
    "Car Glass Film Pasting",
    "Shop & Stage Banners & Posters",
    "Logo & Poster Design, Digital Design"
  ];

  return (
    <div className="pt-20">
      
      {/* Rich Architectural Hero Banner */}
      <section className="relative py-20 md:py-28 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        
        {/* Background Image Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_section_img.png"
            alt=""
            className="w-full h-full object-cover opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
          
          {/* Architectural Subtle Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>

          {/* Ambient Gold Glow Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Breadcrumb Path */}
          <Reveal>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-300 mb-6">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-gold font-bold">Contact Us</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <span className="eyebrow-pill mb-4 shadow-xl">
              <Sparkles className="w-3.5 h-3.5" /> Direct Consultation
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Connect With Our <span className="gold-text-gradient">Fabrication Engineers</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
              Send us your project specifications for instant technical assessment, material options, and a detailed cost quotation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 md:py-28 bg-stone border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Contact Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-subtle">
              <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-2">
                Submit Consultation Request
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-8 font-normal">
                Fill out the required fields below to receive a customized project proposal.
              </p>

              {isSubmitted ? (
                <div className="text-center py-16 bg-stone rounded-2xl border border-slate-200 p-8">
                  <CheckCircle className="w-14 h-14 text-gold mx-auto mb-4" />
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">Request Received</h3>
                  <p className="text-slate-700 text-sm max-w-md mx-auto">
                    Thank you for reaching out to Panchal Art. One of our project managers will review your submission and contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary text-xs mt-6"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-stone border border-slate-200 text-slate-900 text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-stone border border-slate-200 text-slate-900 text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                        placeholder="+91 9426362542"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-stone border border-slate-200 text-slate-900 text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Service Category *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-stone border border-slate-200 text-slate-900 text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                    >
                      <option value="">Select a service category *</option>
                      {servicesList.map((srv, idx) => (
                        <option key={idx} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Project Specifications & Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-stone border border-slate-200 text-slate-900 text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                      placeholder="Describe dimensions, location, material preference, or special requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-xs flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span>Submit Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Information Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-card space-y-6">
                <h2 className="font-heading text-xl font-extrabold text-white border-b border-slate-800 pb-4">
                  Headquarters Information
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm text-slate-100">
                          {info.title}
                        </h3>
                        <p className="text-gold text-xs font-bold mt-0.5">
                          {info.content}
                        </p>
                        <p className="text-slate-300 text-xs mt-1 font-normal">
                          {info.subtext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant WhatsApp Quick Card */}
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white">
                <h3 className="font-heading font-bold text-sm text-white mb-2 flex items-center">
                  <MessageCircle className="w-4 h-4 text-emerald-400 mr-2" /> Immediate Assistance
                </h3>
                <p className="text-slate-300 text-xs mb-4 font-normal">
                  Need urgent quotes or site measurements in Gujarat? Connect directly via phone or WhatsApp.
                </p>
                <div className="flex gap-3">
                  <a
                    href="tel:+919426362542"
                    className="flex-1 py-2.5 text-center bg-slate-850 hover:bg-slate-800 text-slate-100 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-800"
                  >
                    Call Studio
                  </a>
                  <a
                    href="https://wa.me/919426362542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-center">
                <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="font-heading font-bold text-white text-sm">Thasara Workshop Location</p>
                <p className="text-slate-300 text-xs mt-1 font-normal">In front of Railway Station, Thasara-388250, Gujarat</p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;