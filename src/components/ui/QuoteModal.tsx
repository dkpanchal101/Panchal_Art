import React, { useState } from 'react';
import { X, Upload, Send, CheckCircle } from 'lucide-react';

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
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('service', formData.service);
      submitData.append('description', formData.description);
      
      // Append file if exists
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        body: submitData, // Don't set Content-Type header - let browser set it with boundary
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
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
        // Handle validation errors
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

  // Global click handler for "Get Quote" buttons
  React.useEffect(() => {
    const handleGetQuoteClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.textContent?.includes('Get Quote')) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleGetQuoteClick);
    return () => document.removeEventListener('click', handleGetQuoteClick);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-text">Request Quote</h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-primary text-primary-contrast' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text mb-2">Quote Request Sent!</h3>
              <p className="text-muted">
                We'll review your requirements and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text mb-4">Basic Information</h3>
                  
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
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-primary text-primary-contrast px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                  >
                    Next Step
                  </button>
                </div>
              )}

              {/* Step 2: Service Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text mb-4">Service Details</h3>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-text mb-2">
                      Service Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                      placeholder="Describe your project requirements..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-primary text-primary-contrast px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Upload & Submit */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text mb-4">Upload Reference</h3>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-text mb-2">
                      Upload Image (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-300">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">
                        {formData.image ? formData.image.name : 'Upload reference image or design'}
                      </p>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4">
                    <h4 className="font-semibold text-text mb-2">What happens next?</h4>
                    <ul className="text-sm text-muted space-y-1">
                      <li>• We'll review your requirements</li>
                      <li>• Our team will prepare a detailed quote</li>
                      <li>• You'll receive the quote within 24 hours</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-primary-contrast px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-primary-contrast border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Quote Request
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