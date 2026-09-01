import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyDetails from './pages/CompanyDetails';
import GalleryManager from './pages/GalleryManager';
import QuoteManager from './pages/QuoteManager';
import ContactManager from './pages/ContactManager';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-warning mb-2" role="status"></div>
          <div className="fs-7 text-muted uppercase">Verifying Admin Credentials...</div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="company" element={<CompanyDetails />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="quotes" element={<QuoteManager />} />
        <Route path="contacts" element={<ContactManager />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
