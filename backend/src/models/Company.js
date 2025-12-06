import mongoose from 'mongoose';

/**
 * Company Model
 * Represents a company/business that uses the platform
 */
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please provide a valid website URL']
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
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  city: {
    type: String,
    trim: true,
    maxlength: [50, 'City cannot exceed 50 characters']
  },
  state: {
    type: String,
    trim: true,
    maxlength: [50, 'State cannot exceed 50 characters']
  },
  country: {
    type: String,
    trim: true,
    maxlength: [50, 'Country cannot exceed 50 characters'],
    default: 'India'
  },
  logo: {
    type: String, // Path to logo file
    default: null
  },
  primaryColor: {
    type: String,
    trim: true,
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
    default: '#000000'
  },
  secondaryColor: {
    type: String,
    trim: true,
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
    default: '#ffffff'
  }
}, {
  timestamps: true
});

// Indexes
companySchema.index({ email: 1 });
companySchema.index({ companyName: 1 });

// Virtual for full address
companySchema.virtual('fullAddress').get(function() {
  const parts = [this.address, this.city, this.state, this.country].filter(Boolean);
  return parts.join(', ');
});

// Ensure virtual fields are serialized
companySchema.set('toJSON', { virtuals: true });

const Company = mongoose.model('Company', companySchema);

export default Company;

