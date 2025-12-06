import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, XCircle, Loader2, LogIn } from 'lucide-react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const categories = [
    'All Work',
    'radium-cutting',
    'printing',
    'banners',
    'car-glass',
    'logo-design',
    'boards'
  ];

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      try {
        // Verify token by calling /api/admin/auth/me
        const response = await fetch(API_ENDPOINTS.ADMIN_ME, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('adminToken');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('token', data.token); // Also store as 'token' for compatibility
        setIsAuthenticated(true);
        setShowLoginForm(false);
        setMessage({ type: 'success', text: 'Login successful!' });
        setLoginData({ email: '', password: '' });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Login failed. Please check your credentials.' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An error occurred during login. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      if (response.ok && data.success) {
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
        // Handle authentication errors
        if (response.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('token');
          setMessage({ 
            type: 'error', 
            text: data.message || 'Your session has expired. Please log in again.' 
          });
          setShowLoginForm(true);
        } else {
          setMessage({ 
            type: 'error', 
            text: data.message || 'Failed to upload image. Please try again.' 
          });
        }
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

  if (isCheckingAuth) {
    return (
      <div className="pt-20 min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || showLoginForm) {
    return (
      <div className="pt-20 min-h-screen bg-bg">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-text mb-8 text-center">
                Admin Login
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

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="admin@panchalart.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-contrast py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Login
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-text">
                Upload Gallery Image
              </h1>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  localStorage.removeItem('token');
                  setIsAuthenticated(false);
                  setShowLoginForm(true);
                }}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>

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

