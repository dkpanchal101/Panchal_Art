import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, XCircle, Loader2, LogIn, Lock, Sparkles, LogOut, Image as ImageIcon } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

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

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.ADMIN_ME, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
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
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setShowLoginForm(false);
        setMessage({ type: 'success', text: 'Authentication successful! Welcome to Admin Portal.' });
        setLoginData({ email: '', password: '' });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Authentication failed. Invalid administrator credentials.' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An error occurred during authentication. Please check your network connection.' 
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
      setMessage({ type: 'error', text: 'Please select an image file to upload.' });
      return;
    }

    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    
    if (!token) {
      setMessage({ type: 'error', text: 'Authentication token missing. Please log in again.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
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
        setMessage({ type: 'success', text: 'Gallery asset uploaded and published successfully!' });
        setFormData({
          image: null,
          title: '',
          category: 'All Work'
        });
        setPreview(null);
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        if (response.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('token');
          setMessage({ 
            type: 'error', 
            text: data.message || 'Session expired. Please log in again.' 
          });
          setShowLoginForm(true);
        } else {
          setMessage({ 
            type: 'error', 
            text: data.message || 'Failed to upload gallery asset. Please try again.' 
          });
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Network error occurred during upload. Please check connection.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="pt-20 min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-gold mx-auto mb-3" />
          <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Verifying Security Credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || showLoginForm) {
    return (
      <div className="pt-20 min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-8 shadow-card text-white">
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-gold/40 p-[1px] mx-auto mb-4 shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[15px] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gold" />
                </div>
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-white">
                Admin Control Portal
              </h1>
              <p className="text-slate-300 text-xs mt-1">Panchal Art Internal Asset Management</p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center ${
                  message.type === 'success'
                    ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                    : 'bg-red-950/80 border border-red-800 text-red-300'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-red-400" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="input-financial"
                  placeholder="admin@panchalart.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Secure Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="input-financial"
                  placeholder="••••••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 text-xs flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    <span>Authorize Access</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-850 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-card">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="eyebrow-pill mb-1">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> CMS Gallery Publisher
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
                Upload New Portfolio Asset
              </h1>
            </div>
            
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setShowLoginForm(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-red-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span>Logout</span>
            </button>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center ${
                message.type === 'success'
                  ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                  : 'bg-red-950/80 border border-red-800 text-red-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 mr-2.5 flex-shrink-0 text-red-400" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Dropzone */}
            <div>
              <label htmlFor="image" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                Image File <span className="text-gold">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-800 hover:border-gold/50 rounded-2xl p-8 text-center bg-slate-900 transition-colors">
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
                      alt="Upload Preview"
                      className="max-h-64 mx-auto rounded-xl shadow-lg border border-slate-800 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image: null }));
                        setPreview(null);
                        const fileInput = document.getElementById('image') as HTMLInputElement;
                        if (fileInput) fileInput.value = '';
                      }}
                      className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider"
                    >
                      Remove Selected Image
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gold mx-auto mb-3 opacity-80" />
                    <p className="text-slate-200 text-sm font-semibold mb-1">
                      Drag & drop image file or browse from device
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      Supported Formats: PNG, JPG, JPEG up to 5MB
                    </p>
                    <label
                      htmlFor="image"
                      className="inline-block bg-slate-800 hover:bg-slate-750 text-gold border border-slate-800 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Browse Device
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Asset Title */}
            <div>
              <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                Asset Title (Optional)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Commercial Storefront Radium Lettering"
                maxLength={100}
                className="input-financial"
              />
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                Portfolio Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input-financial"
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

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.image}
              className="btn-primary w-full py-4 text-xs flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Publishing Asset...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Publish to Public Gallery</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
