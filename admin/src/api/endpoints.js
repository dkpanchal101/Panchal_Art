const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/admin/auth/login`,
  ME: `${API_BASE_URL}/admin/auth/me`,
  LOGOUT: `${API_BASE_URL}/admin/auth/logout`,
  UPDATE_PASSWORD: `${API_BASE_URL}/admin/auth/update-password`,

  // Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/admin/dashboard/stats`,

  // Company
  COMPANY: `${API_BASE_URL}/admin/company`,
  COMPANY_LOGO: `${API_BASE_URL}/admin/company/logo`,

  // Gallery
  GALLERY_LIST: `${API_BASE_URL}/admin/gallery`,
  GALLERY_ADD: `${API_BASE_URL}/admin/gallery`,
  GALLERY_ITEM: (id) => `${API_BASE_URL}/admin/gallery/${id}`,
  GALLERY_PUBLISH: (id) => `${API_BASE_URL}/admin/gallery/${id}/publish`,

  // Quotes
  QUOTES_LIST: `${API_BASE_URL}/quotes`,
  QUOTE_ITEM: (id) => `${API_BASE_URL}/quotes/${id}`,

  // Contacts / Inquiries
  INQUIRIES_LIST: `${API_BASE_URL}/admin/inquiries`,
  INQUIRY_ITEM: (id) => `${API_BASE_URL}/admin/inquiries/${id}`,
  INQUIRY_READ: (id) => `${API_BASE_URL}/admin/inquiries/${id}/read`,
};

export default API_BASE_URL;
