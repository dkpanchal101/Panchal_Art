import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

const AdminGallery = () => {
  const [formData, setFormData] = useState({
    image: null as File | null,
    title: '',
    category: 'All Work'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const categories = [
    'All Work',
    'radium-cutting',
    'printing',
    'banners',
    'car-glass',
    'logo-design',
    'boards'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      setMessage({ type: 'error', text: 'Please select an image file' });
      return;
    }

    // Get JWT token from localStorage
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    
    if (!token) {
      setMessage({ type: 'error', text: 'You must be logged in to upload images. Please log in first.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
      if (formData.title) {
        formDataToSend.append('title', formData.title);
      }
      if (formData.category) {
        formDataToSend.append('category', formData.category);
      }

      const response = await fetch(API_ENDPOINTS.GALLERY_ADMIN_ADD, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
        // Reset form
        setFormData({
          image: null,
          title: '',
          category: 'All Work'
        });
        setPreview(null);
        // Reset file input
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Failed to upload image. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An error occurred while uploading. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-text mb-8 text-center">
              Upload Gallery Image
            </h1>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-text mb-2">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-300">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/jpeg,image/jpg,image/png"
                    required
                    className="hidden"
                  />
                  {preview ? (
                    <div className="space-y-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: null }));
                          setPreview(null);
                          const fileInput = document.getElementById('image') as HTMLInputElement;
                          if (fileInput) fileInput.value = '';
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                      <label
                        htmlFor="image"
                        className="inline-block bg-primary text-primary-contrast px-6 py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors duration-300"
                      >
                        Choose File
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter image title"
                  maxLength={100}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'All Work' ? 'All Work' : cat.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.image}
                className="w-full bg-primary text-primary-contrast py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Image
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;

