import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  // Step 1: Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please provide a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  
  // Step 2: Service Selection
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: [
      'Radium Cutting & Custom Design',
      'Stylish Name Printing & Lettering',
      'Multi-color Radium Boards & Cutting',
      'Car Glass Film Pasting',
      'Shop & Stage Banners & Posters',
      'Logo & Poster Design, Digital Design'
    ]
  },
  
  // Step 3: Project Details
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  // File attachment
  image: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    cloudinaryUrl: String,
    cloudinaryPublicId: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  
  // Quote details
  estimatedPrice: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  estimatedDuration: {
    type: String, // e.g., "3-5 days", "1 week"
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'approved', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Admin notes and communication
  adminNotes: {
    type: String,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  quoteSentAt: {
    type: Date
  },
  followUpDate: {
    type: Date
  },
  
  // Client communication
  clientResponse: {
    type: String,
    maxlength: [500, 'Client response cannot exceed 500 characters']
  },
  clientResponseAt: {
    type: Date
  },
  
  // Technical details
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
quoteSchema.index({ email: 1 });
quoteSchema.index({ phone: 1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ priority: 1 });
quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ followUpDate: 1 });

// Virtual for quote reference number
quoteSchema.virtual('quoteNumber').get(function() {
  return `QT${this.createdAt.getFullYear()}${String(this.createdAt.getMonth() + 1).padStart(2, '0')}${this._id.toString().slice(-4).toUpperCase()}`;
});

// Virtual for formatted date
quoteSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual to check if quote is overdue for follow-up
quoteSchema.virtual('isOverdue').get(function() {
  if (!this.followUpDate) return false;
  return new Date() > this.followUpDate && this.status === 'quoted';
});

// Ensure virtual fields are serialized
quoteSchema.set('toJSON', { virtuals: true });

// Pre-save middleware to set follow-up date
quoteSchema.pre('save', function(next) {
  if (this.isNew && this.status === 'pending') {
    // Set follow-up date to 2 days from now for new quotes
    this.followUpDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  }
  next();
});

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
