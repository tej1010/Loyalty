import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin } from '../types/admin';

interface AdminAuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Mock admin data
const mockAdmin: Admin = {
  id: 'admin-1',
  firstName: 'System',
  lastName: 'Administrator',
  email: 'admin@loyaltypro.com',
  phoneNumber: '+1-555-0001',
  role: 'admin',
  isActive: true
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email === 'admin@loyaltypro.com' && password === 'admin123') {
      setAdmin(mockAdmin);
      setIsAuthenticated(true);
      localStorage.setItem('admin', JSON.stringify(mockAdmin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  const value = {
    admin,
    isAuthenticated,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};