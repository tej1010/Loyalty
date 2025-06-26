import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Plus, 
  Minus, 
  FileText, 
  User,
  QrCode,
  LogOut,
  Building,
  Settings,
  UserCheck,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const branchWorkerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Topup Points', href: '/topup', icon: Plus },
  { name: 'Redeem Points', href: '/redeem', icon: Minus },
  { name: 'Transaction Logs', href: '/transactions', icon: FileText },
  { name: 'My Account', href: '/account', icon: User }
];

const merchantOwnerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workers Management', href: '/workers', icon: UserCheck },
  { name: 'Branches Management', href: '/branches', icon: Building },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Topup Points', href: '/topup', icon: Plus },
  { name: 'Redeem Points', href: '/redeem', icon: Minus },
  { name: 'Transaction Logs', href: '/transactions', icon: FileText },
  { name: 'Points Configuration', href: '/points-config', icon: Settings },
  { name: 'My Account', href: '/account', icon: User }
];

const employeeNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Advanced Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports Management', href: '/reports', icon: FileText },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Branches Overview', href: '/branches', icon: Building },
  { name: 'Topup Points', href: '/topup', icon: Plus },
  { name: 'Redeem Points', href: '/redeem', icon: Minus },
  { name: 'Transaction Logs', href: '/transactions', icon: TrendingUp },
  { name: 'My Account', href: '/account', icon: User }
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'merchant_owner':
        return merchantOwnerNavigation;
      case 'employee':
        return employeeNavigation;
      default:
        return branchWorkerNavigation;
    }
  };

  const getRoleDisplayName = () => {
    switch (user?.role) {
      case 'merchant_owner':
        return 'Merchant Owner';
      case 'employee':
        return 'Employee';
      default:
        return 'Branch Worker';
    }
  };

  const getPanelName = () => {
    switch (user?.role) {
      case 'merchant_owner':
        return 'Merchant Panel';
      case 'employee':
        return 'Employee Panel';
      default:
        return 'Branch Panel';
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">LoyaltyPro</h1>
            <p className="text-xs text-gray-500">{getPanelName()}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {getRoleDisplayName()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};