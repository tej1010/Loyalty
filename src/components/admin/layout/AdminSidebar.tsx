import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  FileText, 
  User,
  Shield,
  LogOut,
  TrendingUp,
  UserCheck,
  Store
} from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users Management', href: '/admin/users', icon: Users },
  { name: 'Merchants Management', href: '/admin/merchants', icon: UserCheck },
  { name: 'Outlets Management', href: '/admin/outlets', icon: Store },
  { name: 'Transactions', href: '/admin/transactions', icon: TrendingUp },
  { name: 'My Account', href: '/admin/account', icon: User }
];

export const AdminSidebar: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">LoyaltyPro</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
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
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              System Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-600' 
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