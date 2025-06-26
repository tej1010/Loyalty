import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { AdvancedAnalytics } from './pages/AdvancedAnalytics';
import { ReportsManagement } from './pages/ReportsManagement';
import { Customers } from './pages/Customers';
import { TopupPoints } from './pages/TopupPoints';
import { RedeemPoints } from './pages/RedeemPoints';
import { Transactions } from './pages/Transactions';
import { Account } from './pages/Account';
import { WorkersManagement } from './pages/WorkersManagement';
import { BranchesManagement } from './pages/BranchesManagement';
import { PointsConfigurationPage } from './pages/PointsConfiguration';
import { useAuth } from './context/AuthContext';

// Admin imports
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

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'merchant_owner') {
    return <MerchantDashboard />;
  } else if (user?.role === 'employee') {
    return <EmployeeDashboard />;
  }
  
  return <Dashboard />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AdminAuthProvider>
            <Routes>
              <Route path="/" element={<Navigate to="login" replace />} />
              <Route path="login" element={<AdminLogin />} />
              <Route path="forgot-password" element={<AdminForgotPassword />} />
              <Route path="dashboard" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              <Route path="users" element={
                <AdminProtectedRoute>
                  <AdminUsersManagement />
                </AdminProtectedRoute>
              } />
              <Route path="merchants" element={
                <AdminProtectedRoute>
                  <AdminMerchantsManagement />
                </AdminProtectedRoute>
              } />
              <Route path="outlets" element={
                <AdminProtectedRoute>
                  <AdminOutletsManagement />
                </AdminProtectedRoute>
              } />
              <Route path="transactions" element={
                <AdminProtectedRoute>
                  <AdminTransactions />
                </AdminProtectedRoute>
              } />
              <Route path="account" element={
                <AdminProtectedRoute>
                  <AdminAccount />
                </AdminProtectedRoute>
              } />
            </Routes>
          </AdminAuthProvider>
        } />

        {/* Main App Routes */}
        <Route path="/*" element={
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } />
              
              {/* Employee Only Routes */}
              <Route path="analytics" element={
                <ProtectedRoute>
                  <AdvancedAnalytics />
                </ProtectedRoute>
              } />
              <Route path="reports" element={
                <ProtectedRoute>
                  <ReportsManagement />
                </ProtectedRoute>
              } />
              
              {/* Merchant Owner Only Routes */}
              <Route path="workers" element={
                <ProtectedRoute>
                  <WorkersManagement />
                </ProtectedRoute>
              } />
              <Route path="points-config" element={
                <ProtectedRoute>
                  <PointsConfigurationPage />
                </ProtectedRoute>
              } />
              
              {/* Shared Routes */}
              <Route path="branches" element={
                <ProtectedRoute>
                  <BranchesManagement />
                </ProtectedRoute>
              } />
              <Route path="customers" element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              } />
              <Route path="topup" element={
                <ProtectedRoute>
                  <TopupPoints />
                </ProtectedRoute>
              } />
              <Route path="redeem" element={
                <ProtectedRoute>
                  <RedeemPoints />
                </ProtectedRoute>
              } />
              <Route path="transactions" element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } />
              <Route path="account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AuthProvider>
        } />
      </Routes>
    </Router>
  );
}