import mongoose from 'mongoose';

/**
 * Gallery Model
 * Represents gallery images for a company
 */
const gallerySchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company ID is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String, // File path to uploaded image
    required: [true, 'Image URL is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'radium-cutting',
      'printing',
      'banners',
      'car-glass',
      'logo-design',
      'boards'
    ],
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },
  isPublished: {
    type: Boolean,
    default: false,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
gallerySchema.index({ companyId: 1, isPublished: 1 });
gallerySchema.index({ companyId: 1, category: 1, isPublished: 1 });
gallerySchema.index({ companyId: 1, displayOrder: 1 });

// Virtual for category display name
gallerySchema.virtual('categoryDisplay').get(function() {
  const categoryMap = {
    'radium-cutting': 'Radium Cutting',
    'printing': 'Printing',
    'banners': 'Banners',
    'car-glass': 'Car Glass',
    'logo-design': 'Logo Design',
    'boards': 'Boards'
  };
  return categoryMap[this.category] || this.category;
});

// Ensure virtual fields are serialized
gallerySchema.set('toJSON', { virtuals: true });

// Static method to get published images by company
gallerySchema.statics.getPublishedByCompany = function(companyId, category = null) {
  const query = { companyId, isPublished: true };
  if (category) {
    query.category = category;
  }
  return this.find(query).sort({ displayOrder: 1, createdAt: -1 });
};

// Static method to get gallery stats
gallerySchema.statics.getStats = async function(companyId) {
  // Convert to ObjectId if it's a string
  const companyObjectId = typeof companyId === 'string' 
    ? new mongoose.Types.ObjectId(companyId) 
    : companyId;
  
  const stats = await this.aggregate([
    { $match: { companyId: companyObjectId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        published: {
          $sum: { $cond: ['$isPublished', 1, 0] }
        },
        byCategory: {
          $push: {
            category: '$category',
            isPublished: '$isPublished'
          }
        }
      }
    }
  ]);

  if (!stats.length) {
    return {
      total: 0,
      published: 0,
      unpublished: 0,
      byCategory: {}
    };
  }

  const result = stats[0];
  const categoryCounts = {};

  result.byCategory.forEach(item => {
    if (!categoryCounts[item.category]) {
      categoryCounts[item.category] = { total: 0, published: 0 };
    }
    categoryCounts[item.category].total++;
    if (item.isPublished) {
      categoryCounts[item.category].published++;
    }
  });

  return {
    total: result.total,
    published: result.published,
    unpublished: result.total - result.published,
    byCategory: categoryCounts
  };
};

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
