import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Filter, Loader2, Upload } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface GalleryImage {
  _id: string;
  imageUrl: string;
  title?: string;
  category: string;
  description?: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'All Work', name: 'All Work' },
    { id: 'radium-cutting', name: 'Radium Cutting' },
    { id: 'banners', name: 'Banners' },
    { id: 'car-glass', name: 'Car Glass' },
    { id: 'logo-design', name: 'Logo Design' },
    { id: 'boards', name: 'Boards' },
    { id: 'printing', name: 'Printing' }
  ];

  // Fetch gallery images from API
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

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Get unique categories from gallery images
  const availableCategories = categories.filter(cat => 
    cat.id === 'all' || galleryImages.some(img => img.category === cat.id)
  );

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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-text">
                Our Portfolio
              </h1>
              <Link
                to="/admin/gallery"
                className="flex items-center gap-2 bg-primary text-primary-contrast px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300 text-sm font-medium"
                title="Upload New Image"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload</span>
              </Link>
            </div>
            <p className="text-xl text-muted mb-8">
              Explore our collection of custom designs and professional installations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Filter className="w-5 h-5 text-muted mr-2" />
              <span className="text-muted font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {availableCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-contrast'
                      : 'bg-gray-100 text-muted hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted">Loading gallery images...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-primary text-primary-contrast rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted text-lg">No images found in this category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map(image => (
                  <div
                    key={image._id}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(image._id)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={image.imageUrl}
                        alt={image.title || 'Gallery image'}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.title && (
                            <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                          )}
                          {image.description && (
                            <p className="text-sm">{image.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <img
              src={selectedImageData.imageUrl}
              alt={selectedImageData.title || 'Gallery image'}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4">
              {selectedImageData.title && (
                <h3 className="text-xl font-semibold mb-2">{selectedImageData.title}</h3>
              )}
              {selectedImageData.description && (
                <p className="text-gray-300">{selectedImageData.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Before/After Slider Demo */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-text mb-12">
              Before & After Transformations
            </h2>
            <div className="relative bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-96 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg"
                  alt="Before transformation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg"
                  alt="After transformation"
                  className="absolute inset-0 w-1/2 h-full object-cover border-r-4 border-white"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-text mb-2">
                  Radium Board Installation
                </h3>
                <p className="text-muted">
                  Transform your storefront with professional radium signage
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;