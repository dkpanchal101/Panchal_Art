import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'completed', 'cancelled'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
contactSchema.index({ email: 1 });
contactSchema.index({ phone: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for formatted date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', { virtuals: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
