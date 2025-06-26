import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, MerchantOwner, BranchWorker, Employee } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  signUp: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demo purposes
const mockBranchWorker: BranchWorker = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@branch.com',
  phoneNumber: '+1-555-0123',
  branchId: 'branch-1',
  role: 'branch_worker',
  isActive: true,
  assignedBy: 'merchant-1'
};

const mockMerchantOwner: MerchantOwner = {
  id: 'merchant-1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah@loyaltypro.com',
  phoneNumber: '+1-555-0100',
  role: 'merchant_owner',
  isActive: true,
  businessInfo: {
    businessName: 'LoyaltyPro Business',
    address: '123 Business Street, City, State 12345',
    contactInfo: '+1-555-0100',
    businessImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
};

const mockEmployee: Employee = {
  id: 'employee-1',
  firstName: 'Alex',
  lastName: 'Martinez',
  email: 'alex.martinez@loyaltypro.com',
  phoneNumber: '+1-555-0200',
  role: 'employee',
  isActive: true,
  department: 'Operations',
  permissions: [
    'view_all_customers',
    'manage_transactions',
    'generate_reports',
    'view_analytics',
    'manage_branches',
    'view_workers'
  ],
  accessLevel: 'manager'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email === 'john.doe@branch.com' && password === 'password123') {
      setUser(mockBranchWorker);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockBranchWorker));
      return true;
    } else if (email === 'sarah@loyaltypro.com' && password === 'password123') {
      setUser(mockMerchantOwner);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockMerchantOwner));
      return true;
    } else if (email === 'alex.martinez@loyaltypro.com' && password === 'password123') {
      setUser(mockEmployee);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockEmployee));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
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

  const signUp = async (userData: any): Promise<boolean> => {
    // Mock API call for merchant registration
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};