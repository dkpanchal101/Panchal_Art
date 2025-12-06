/**
 * API Configuration
 * Centralized API base URL configuration
 */

// Get API URL from environment variable or use default
// In Vite, environment variables must be prefixed with VITE_
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Get Company ID from environment variable
// This should be set to your company's MongoDB ObjectId
export const COMPANY_ID = import.meta.env.VITE_COMPANY_ID || '';

// API endpoints
export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/public/contact`,
  QUOTES: `${API_BASE_URL}/api/quotes`,
  GALLERY: (companyId: string) => `${API_BASE_URL}/api/public/gallery/${companyId}`,
  GALLERY_CATEGORIES: (companyId: string) => `${API_BASE_URL}/api/public/gallery/${companyId}/categories`,
  COMPANY: (companyId: string) => `${API_BASE_URL}/api/public/company/${companyId}`,
};

export default API_BASE_URL;

