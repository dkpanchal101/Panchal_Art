import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(ENDPOINTS.ME);
      if (response.data && response.data.success && response.data.data.user) {
        setUser(response.data.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, { email, password });
      const { token, data } = response.data;

      if (token && data && data.user) {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('token', token);
        setUser(data.user);
        return { success: true, message: 'Authentication successful!' };
      } else {
        return { success: false, message: response.data.message || 'Login failed.' };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Authentication error. Please check credentials.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
