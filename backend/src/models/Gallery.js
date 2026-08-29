import mongoose from 'mongoose';

/**
 * Gallery Model
 * Represents gallery images for a company
 */
const gallerySchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: false,
    index: true
  },
  title: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String, // File path to uploaded local image
    required: [true, 'Image URL is required']
  },
  category: {
    type: String,
    required: false,
    default: 'General',
    trim: true,
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },
  isPublished: {
    type: Boolean,
    default: true,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false
  }
}, {
  timestamps: true
});

gallerySchema.index({ companyId: 1, isPublished: 1 });
gallerySchema.index({ companyId: 1, category: 1, isPublished: 1 });
gallerySchema.index({ companyId: 1, displayOrder: 1 });

gallerySchema.virtual('categoryDisplay').get(function() {
  return this.category;
});

gallerySchema.set('toJSON', { virtuals: true });

gallerySchema.statics.getPublishedByCompany = function(companyId, category = null) {
  const query = { isPublished: true };
  if (companyId) query.companyId = companyId;
  if (category && category !== 'ALL WORK' && category !== 'All Work') {
    query.category = category;
  }
  return this.find(query).sort({ displayOrder: 1, createdAt: -1 });
};

gallerySchema.statics.getStats = async function(companyId) {
  const query = companyId ? { companyId: typeof companyId === 'string' ? new mongoose.Types.ObjectId(companyId) : companyId } : {};
  
  const stats = await this.aggregate([
    { $match: query },
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
