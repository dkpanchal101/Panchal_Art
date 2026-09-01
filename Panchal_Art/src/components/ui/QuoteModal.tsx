import React, { useState } from 'react';
import { X, Upload, Send, CheckCircle, Sparkles } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const QuoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    description: '',
    image: null as File | null
  });

  const services = [
    "Radium Cutting & Custom Design",
    "Stylish Name Printing & Lettering",
    "Multi-color Radium Boards & Cutting",
    "Car Glass Film Pasting",
    "Shop & Stage Banners & Posters",
    "Logo & Poster Design, Digital Design"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('service', formData.service);
      submitData.append('description', formData.description);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await fetch(API_ENDPOINTS.QUOTES, {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
          setCurrentStep(1);
          setFormData({
            name: '',
            phone: '',
            email: '',
            service: '',
            description: '',
            image: null
          });
        }, 3000);
      } else {
        console.error('Quote submission failed:', data.message);
        alert(data.message || 'Failed to submit quote request. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      description: '',
      image: null
    });
  };

  React.useEffect(() => {
    const handleGetQuoteClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.textContent?.includes('Get Quote') || target.hasAttribute('data-quote-trigger')) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleGetQuoteClick);
    return () => document.removeEventListener('click', handleGetQuoteClick);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      
      {/* Hidden button with data-quote-trigger for manual trigger references */}
      <button data-quote-trigger className="hidden" onClick={() => setIsOpen(true)}></button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-card max-w-lg w-full max-h-[90vh] overflow-y-auto text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h2 className="font-heading font-extrabold text-xl text-white">Request Quotation</h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-slate-850 rounded-full transition-colors text-slate-400 hover:text-gold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= step 
                    ? 'bg-gold text-slate-950 font-black shadow-sm' 
                    : 'bg-slate-850 text-slate-500 border border-slate-800'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                    currentStep > step ? 'bg-gold' : 'bg-slate-800'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            <span>Identity</span>
            <span>Service</span>
            <span>Submit</span>
          </div>
        </div>

        {/* Modal Form Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-10">
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="font-heading font-extrabold text-2xl text-white mb-2">Quotation Request Received</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Thank you! Our technical estimators will prepare a custom quotation within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-200 mb-4 border-b border-slate-800 pb-2">
                    Step 1: Contact Identity
                  </h3>
                  
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-financial"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-financial"
                      placeholder="+91 9426362542"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-financial"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary w-full py-3.5 text-xs"
                    >
                      Continue to Service Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Service Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-200 mb-4 border-b border-slate-800 pb-2">
                    Step 2: Service Requirements
                  </h3>
                  
                  <div>
                    <label htmlFor="modal-service" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Service Category *
                    </label>
                    <select
                      id="modal-service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="input-financial"
                    >
                      <option value="">Select a service category</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="modal-description" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Project Description & Specs *
                    </label>
                    <textarea
                      id="modal-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="input-financial"
                      placeholder="Specify dimensions, vinyl colors, material preference, or site details..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="btn-secondary flex-1 py-3 text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary flex-1 py-3 text-xs"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Reference Upload & Submission */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-200 mb-4 border-b border-slate-800 pb-2">
                    Step 3: Reference Upload & Submit
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Upload Reference Asset (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-800 hover:border-gold/50 rounded-2xl p-6 text-center bg-slate-950 transition-colors">
                      <Upload className="w-8 h-8 text-gold mx-auto mb-2 opacity-80" />
                      <p className="text-slate-400 text-xs mb-3 truncate">
                        {formData.image ? formData.image.name : 'Attach blueprint, sample photo, or logo file'}
                      </p>
                      <input
                        type="file"
                        id="modal-image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="modal-image"
                        className="inline-block bg-slate-850 hover:bg-slate-800 text-gold border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                    <p className="font-bold text-slate-200 mb-1 flex items-center">
                      <Sparkles className="w-3.5 h-3.5 text-gold mr-1.5" /> Fast Estimation Protocol
                    </p>
                    <p>• Engineering team reviews material requirements</p>
                    <p>• Transparent quotation emailed & texted within 24 hours</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="btn-secondary flex-1 py-3.5 text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary flex-1 py-3.5 text-xs flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default QuoteModal;