import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Filter, Loader2, Upload, Sparkles, ExternalLink, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../hooks/useAuth';
import Reveal from '../components/ui/Reveal';

interface GalleryImage {
  _id: string;
  imageUrl: string;
  title?: string;
  category: string;
  description?: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const { isAuthenticated } = useAuth();

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'radium-cutting', name: 'Radium Cutting' },
    { id: 'banners', name: 'Banners' },
    { id: 'car-glass', name: 'Car Glass' },
    { id: 'logo-design', name: 'Logo Design' },
    { id: 'boards', name: 'Boards' },
    { id: 'printing', name: 'Printing' }
  ];

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_ENDPOINTS.GALLERY);
        const data = await response.json();

        if (data.success && data.data.gallery) {
          setGalleryImages(data.data.gallery);
        } else {
          setError('Failed to load gallery images');
        }
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const handleGetQuote = () => {
    const quoteButton = document.querySelector('[data-quote-trigger]') as HTMLElement;
    if (quoteButton) {
      quoteButton.click();
    }
  };

  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'All Work' || img.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      (img.title && img.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (img.category && img.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (img.description && img.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === 'all' || catId === 'All Work') return galleryImages.length;
    return galleryImages.filter(img => img.category === catId).length;
  };

  const openLightbox = (imageId: string) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img._id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]._id);
  };

  const selectedImageData = selectedImage 
    ? galleryImages.find(img => img._id === selectedImage)
    : null;

  return (
    <div className="pt-20 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Compact Architectural Hero Banner */}
      <section className="relative py-12 md:py-16 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_section_img.png"
            alt=""
            className="w-full h-full object-cover opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>
          
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <Reveal>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-300 mb-3">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-gold font-bold">Project Gallery</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
              <span className="eyebrow-pill shadow-xl">
                <Sparkles className="w-3.5 h-3.5" /> Project Portfolio
              </span>
              
              {isAuthenticated && (
                <Link
                  to="/admin/gallery"
                  className="btn-primary py-1 px-3 text-[11px] shadow-md"
                  title="Upload New Image"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  <span>Upload Asset</span>
                </Link>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              Workmanship & <span className="gold-text-gradient">Project Gallery</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal">
              Filter through our catalog of custom radium laser cuts, storefront signs, and automotive tinting.
            </p>
          </Reveal>

          {/* Compact Search Bar */}
          <Reveal delay={0.2}>
            <div className="max-w-md mx-auto mt-6">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects (e.g. 'radium', 'car', 'led')..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-lg outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Sticky Compact Category Filter Bar */}
      <section className="py-3 bg-slate-900 border-b border-slate-800 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-gold mr-1.5" />
              <span>Category ({filteredImages.length}):</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {categories.map(category => {
                const isActive = selectedCategory === category.id;
                const count = getCategoryCount(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-gold text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-850 text-slate-300 hover:bg-slate-800 hover:text-gold border border-slate-800'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-950 text-gold font-bold' : 'bg-slate-800 text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Compact Gallery Grid */}
      <section className="py-10 md:py-14 bg-stone border-b border-slate-200/80 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 text-slate-600">
              <Loader2 className="w-8 h-8 animate-spin text-gold mb-2" />
              <span className="text-xs font-semibold uppercase tracking-wider">Loading project gallery...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="p-4 bg-red-50 rounded-xl border border-red-200 mb-3">
                <p className="text-red-600 text-xs font-medium">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary text-xs"
              >
                Reload Gallery
              </button>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-subtle">
              <p className="text-slate-600 text-xs font-medium mb-2">No projects match your filter query.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="btn-primary text-xs mt-2"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map(image => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                    key={image._id}
                    className="group cursor-pointer card-financial-light p-0 overflow-hidden"
                    onClick={() => openLightbox(image._id)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={image.imageUrl}
                        alt={image.title || 'Gallery image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                      
                      <div className="absolute top-3 left-3">
                        <span className="bg-slate-900/90 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          {image.category}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-lg bg-gold text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      <h3 className="font-heading font-bold text-slate-900 text-sm group-hover:text-gold transition-colors truncate">
                        {image.title || 'Custom Fabrication Project'}
                      </h3>
                      {image.description && (
                        <p className="text-slate-600 text-[11px] mt-1 line-clamp-2 font-normal">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

      {/* Lightbox Inspection Modal */}
      <AnimatePresence>
        {selectedImage && selectedImageData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-card text-white">
              
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 text-slate-300 hover:text-gold bg-slate-950/80 p-2 rounded-full border border-slate-800 transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-200 hover:text-gold bg-slate-950/80 p-2.5 rounded-full border border-slate-800 transition-all hover:scale-110 z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-200 hover:text-gold bg-slate-950/80 p-2.5 rounded-full border border-slate-800 transition-all hover:scale-110 z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="bg-slate-950 flex items-center justify-center p-3 min-h-[360px]">
                <img
                  src={selectedImageData.imageUrl}
                  alt={selectedImageData.title || 'Gallery item'}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
                />
              </div>

              <div className="bg-slate-900 p-4 sm:p-5 border-t border-slate-800 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-gold text-[10px] font-bold uppercase tracking-wider mb-0.5 block">
                    Category: {selectedImageData.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-white">
                    {selectedImageData.title || 'Custom Fabrication Project'}
                  </h3>
                  {selectedImageData.description && (
                    <p className="text-slate-300 text-xs mt-0.5">
                      {selectedImageData.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    closeLightbox();
                    handleGetQuote();
                  }}
                  className="btn-primary py-2.5 px-5 text-xs flex-shrink-0"
                >
                  Inquire About Project
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Before / After Slider */}
      <section className="py-12 bg-ivory border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <span className="eyebrow-pill mb-2">
              Comparison
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Before & After Transformation
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-card">
            
            <div className="relative h-80 sm:h-[400px] overflow-hidden select-none">
              
              <img
                src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg"
                alt="After Installation"
                className="absolute inset-0 w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute top-3 right-3 bg-slate-950/90 text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-gold/30 backdrop-blur-md">
                AFTER: Panchal Art Board
              </div>

              <div 
                className="absolute top-0 bottom-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg"
                  alt="Before Installation"
                  className="w-full h-full object-cover filter contrast-110 max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-3 left-3 bg-slate-950/90 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md">
                  BEFORE: Original Facade
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />

              <div 
                className="absolute top-0 bottom-0 w-1 bg-gold pointer-events-none shadow-2xl z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-gold text-slate-950 rounded-full flex items-center justify-center shadow-xl font-bold border-2 border-slate-950">
                  <ChevronLeft className="w-3.5 h-3.5 inline -mr-1" />
                  <ChevronRight className="w-3.5 h-3.5 inline -ml-1" />
                </div>
              </div>

            </div>
            
            <div className="p-4 bg-slate-900 text-center border-t border-slate-800">
              <p className="text-slate-300 text-xs font-normal">
                Drag slider left or right to compare optical night-reflection and structural quality.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Gallery;