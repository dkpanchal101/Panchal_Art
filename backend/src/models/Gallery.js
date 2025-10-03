import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Image title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['radium', 'banners', 'car-films', 'logos', 'posters'],
    index: true
  },
  
  // Image details
  image: {
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    cloudinaryUrl: {
      type: String,
      required: true
    },
    cloudinaryPublicId: {
      type: String,
      required: true
    },
    dimensions: {
      width: Number,
      height: Number
    }
  },
  
  // Display settings
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  
  // SEO and metadata
  alt: {
    type: String,
    trim: true,
    maxlength: [200, 'Alt text cannot exceed 200 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  
  // Admin details
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ isFeatured: -1, sortOrder: 1 });
gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ tags: 1 });

// Virtual for formatted date
gallerySchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for category display name
gallerySchema.virtual('categoryDisplay').get(function() {
  const categoryMap = {
    'radium': 'Radium Cutting',
    'banners': 'Banners',
    'car-films': 'Car Films',
    'logos': 'Logos',
    'posters': 'Posters'
  };
  return categoryMap[this.category] || this.category;
});

// Virtual for image URL with transformations
gallerySchema.virtual('thumbnailUrl').get(function() {
  if (this.image.cloudinaryUrl) {
    // Generate thumbnail URL with Cloudinary transformations
    return this.image.cloudinaryUrl.replace('/upload/', '/upload/w_400,h_300,c_fill,q_auto/');
  }
  return this.image.cloudinaryUrl;
});

// Ensure virtual fields are serialized
gallerySchema.set('toJSON', { virtuals: true });

// Static method to get images by category
gallerySchema.statics.getByCategory = function(category) {
  const query = { isActive: true };
  if (category && category !== 'all') {
    query.category = category;
  }
  return this.find(query).sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 });
};

// Static method to get featured images
gallerySchema.statics.getFeatured = function(limit = 6) {
  return this.find({ isActive: true, isFeatured: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(limit);
};

// Method to increment view count
gallerySchema.methods.incrementView = function() {
  this.viewCount += 1;
  return this.save();
};

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
