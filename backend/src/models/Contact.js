import mongoose from 'mongoose';

/**
 * Customer Contact Model
 * Represents customer inquiries/contact form submissions
 */
const contactSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company ID is required'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please provide a valid phone number']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: [
      'radium-cutting',
      'printing',
      'banners',
      'car-glass',
      'logo-design',
      'boards'
    ]
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
contactSchema.index({ companyId: 1, isRead: 1 });
contactSchema.index({ companyId: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ phone: 1 });

// Virtual for formatted date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for service display name
contactSchema.virtual('serviceDisplay').get(function() {
  const serviceMap = {
    'radium-cutting': 'Radium Cutting',
    'printing': 'Printing',
    'banners': 'Banners',
    'car-glass': 'Car Glass',
    'logo-design': 'Logo Design',
    'boards': 'Boards'
  };
  return serviceMap[this.service] || this.service;
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', { virtuals: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
