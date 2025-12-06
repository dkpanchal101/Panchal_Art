import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS, COMPANY_ID } from '../config/api';

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
      // Validate Company ID is set
      if (!COMPANY_ID) {
        alert('Error: Company ID is not configured. Please contact the administrator.');
        console.error('COMPANY_ID is not set in environment variables');
        setIsSubmitting(false);
        return;
      }

      // Map service name to backend format
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
        companyId: COMPANY_ID,
        service: serviceMap[formData.service] || formData.service.toLowerCase().replace(/\s+/g, '-')
      };

      // Log the API endpoint for debugging
      console.log('Submitting to:', API_ENDPOINTS.CONTACT);
      console.log('Payload:', payload);
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL || 'Using default');
      console.log('Company ID:', COMPANY_ID || 'NOT SET - This will cause an error!');

      if (!COMPANY_ID) {
        alert('Error: Company ID is not configured. Please contact the administrator.');
        console.error('COMPANY_ID is not set in environment variables');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'cors', // Explicitly set CORS mode
      });

      // Check if response is ok before parsing JSON
      let data;
      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${text.substring(0, 100)}`);
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
        // Handle validation errors
        console.error('Form submission failed:', data);
        
        if (data.errors && Array.isArray(data.errors)) {
          // Show specific validation errors
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          alert(`Validation Errors:\n${errorMessages}`);
        } else {
          alert(data.message || 'Failed to submit form. Please try again.');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        apiUrl: API_ENDPOINTS.CONTACT,
        companyId: COMPANY_ID || 'NOT SET'
      });
      
      // Show more detailed error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Network error. Please check your connection and try again.';
      
      alert(`Error: ${errorMessage}\n\nPlease check:\n1. Backend is running at: ${API_ENDPOINTS.CONTACT}\n2. CORS is configured correctly\n3. Company ID is set`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Visit Our Studio",
      content: "In front of Railway Station, Thasara, 388250",
      subtext: "Open for consultations by appointment"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Call Us",
      content: "+91 9426362542",
      subtext: "Available for urgent inquiries"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Us",
      content: "dkpanchal2023@gmail.com",
      subtext: "We'll respond within 24 hours"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Working Hours",
      content: "Mon - Sat: 9:00 AM - 7:00 PM",
      subtext: "Sunday: 10:00 AM - 4:00 PM"
    }
  ];

  const services = [
    "Radium Cutting & Custom Design",
    "Stylish Name Printing & Lettering",
    "Multi-color Radium Boards & Cutting",
    "Car Glass Film Pasting",
    "Shop & Stage Banners & Posters",
    "Logo & Poster Design, Digital Design"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted mb-8">
              Ready to bring your vision to life? Get in touch with our team today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-text mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text mb-2">Message Sent!</h3>
                    <p className="text-muted">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                          placeholder="+91 9426362542"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-text mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                      >
                        <option value="">Select a service *</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-contrast px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-primary-contrast border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs text-muted text-center">
                      By submitting this form, you agree to our privacy policy. We don't store personal data without your consent.
                    </p>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-text mb-8">Get in Touch</h2>
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-1">
                          {info.title}
                        </h3>
                        <p className="text-text mb-1">
                          {info.content}
                        </p>
                        <p className="text-muted text-sm">
                          {info.subtext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact Options */}
                <div className="bg-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text mb-4">
                    Need Immediate Assistance?
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+919426362542"
                      className="flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now: +91 9426362542
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-accent hover:text-accent/80 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp Us
                    </a>
                    <a
                      href="mailto:hello@panchalart.com"
                      className="flex items-center text-muted hover:text-text transition-colors duration-300"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email Us
                    </a>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">In front of Railway Station, Thasara, 388250</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;