import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Save } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminAccount: React.FC = () => {
  const { admin, changePassword } = useAdminAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: admin?.firstName || '',
    lastName: admin?.lastName || '',
    email: admin?.email || '',
    phoneNumber: admin?.phoneNumber || ''
  });

  // Password change form state
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleProfileSave = async () => {
    setLoading(true);
    setErrors({});

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsEditing(false);
    setLoading(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = async () => {
    setLoading(true);
    setErrors({});

    // Validation
    if (passwordData.new !== passwordData.confirm) {
      setErrors({ confirm: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (passwordData.new.length < 8) {
      setErrors({ new: 'Password must be at least 8 characters long' });
      setLoading(false);
      return;
    }

    try {
      const success = await changePassword(passwordData.current, passwordData.new);
      if (success) {
        setPasswordData({ current: '', new: '', confirm: '' });
        alert('Password changed successfully!');
      } else {
        setErrors({ current: 'Current password is incorrect' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <AdminLayout 
      title="My Account" 
      subtitle="Manage your admin profile and account settings"
    >
      <div className="max-w-2xl space-y-6">
        {/* Profile Information */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-500">Update your personal details</p>
              </div>
            </div>
            
            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={profileData.firstName}
                onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                disabled={!isEditing}
                required
              />
              <Input
                label="Last Name"
                value={profileData.lastName}
                onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
            
            <Input
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              required
            />
            
            <Input
              label="Phone Number"
              value={profileData.phoneNumber}
              onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              disabled={!isEditing}
              required
            />

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleProfileSave}
                  loading={loading}
                  icon={Save}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setProfileData({
                      firstName: admin?.firstName || '',
                      lastName: admin?.lastName || '',
                      email: admin?.email || '',
                      phoneNumber: admin?.phoneNumber || ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Account Details */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              <p className="text-sm text-gray-500">Your admin account information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Admin ID</label>
              <p className="text-sm text-gray-900 mt-1 font-mono">#{admin?.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <p className="text-sm text-gray-900 mt-1 capitalize">System Administrator</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Access Level</label>
              <p className="text-sm text-gray-900 mt-1">Full System Access</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Account Status</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mt-1">
                Active
              </span>
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.current}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                  placeholder="Enter current password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.current ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.current && (
                <p className="text-sm text-red-600">{errors.current}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.new}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                  placeholder="Enter new password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.new ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.new && (
                <p className="text-sm text-red-600">{errors.new}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                  placeholder="Confirm new password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.confirm ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && (
                <p className="text-sm text-red-600">{errors.confirm}</p>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={handlePasswordChange}
                loading={loading}
                disabled={!passwordData.current || !passwordData.new || !passwordData.confirm}
                icon={Lock}
                className="bg-red-600 hover:bg-red-700"
              >
                Change Password
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};