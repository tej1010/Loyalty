import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminForgotPassword } from './pages/admin/AdminForgotPassword';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersManagement } from './pages/admin/AdminUsersManagement';
import { AdminMerchantsManagement } from './pages/admin/AdminMerchantsManagement';
import { AdminOutletsManagement } from './pages/admin/AdminOutletsManagement';
import { AdminTransactions } from './pages/admin/AdminTransactions';
import { AdminAccount } from './pages/admin/AdminAccount';

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          
          {/* Protected Routes */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <AdminProtectedRoute>
              <AdminUsersManagement />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/merchants" element={
            <AdminProtectedRoute>
              <AdminMerchantsManagement />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/outlets" element={
            <AdminProtectedRoute>
              <AdminOutletsManagement />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/transactions" element={
            <AdminProtectedRoute>
              <AdminTransactions />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/account" element={
            <AdminProtectedRoute>
              <AdminAccount />
            </AdminProtectedRoute>
          } />
          
          {/* Redirect admin root to dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}