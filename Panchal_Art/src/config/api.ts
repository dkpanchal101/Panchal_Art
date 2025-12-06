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
  GALLERY: `${API_BASE_URL}/api/gallery`,
  GALLERY_ADMIN_ADD: `${API_BASE_URL}/api/gallery/admin/add`,
  GALLERY_BY_COMPANY: (companyId: string) => `${API_BASE_URL}/api/public/gallery/${companyId}`,
  GALLERY_CATEGORIES: (companyId: string) => `${API_BASE_URL}/api/public/gallery/${companyId}/categories`,
  COMPANY: (companyId: string) => `${API_BASE_URL}/api/public/company/${companyId}`,
  GET_COMPANY_ID: `${API_BASE_URL}/api/setup/company-id`,
};

// Function to get company ID from backend if not set
export const getCompanyId = async (): Promise<string> => {
  // If already set, return it
  if (COMPANY_ID) {
    return COMPANY_ID;
  }
  
  // Try to fetch from backend
  try {
    const response = await fetch(API_ENDPOINTS.GET_COMPANY_ID);
    const data = await response.json();
    if (data.success && data.companyId) {
      return data.companyId;
    }
  } catch (error) {
    console.error('Failed to fetch company ID from backend:', error);
  }
  
  return '';
};

export default API_BASE_URL;

