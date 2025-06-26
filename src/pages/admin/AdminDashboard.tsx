import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  UserCheck,
  Calendar,
  AlertCircle,
  Filter,
  Download
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AdminDashboardStats } from '../../types/admin';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: { value: number; isPositive: boolean };
  subtitle?: string;
}> = ({ title, value, icon: Icon, color, trend, subtitle }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.value}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </Card>
);

const ChartCard: React.FC<{
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ title, children, actions }) => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="flex items-center space-x-2">
        {actions}
      </div>
    </div>
    {children}
  </Card>
);

export const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Mock admin dashboard stats
  const stats: AdminDashboardStats = {
    totalMerchants: 25,
    pendingMerchantRequests: 8,
    totalBranches: 75,
    totalCreditsLoaded: 2500000,
    totalCreditsRedeemed: 1850000,
    totalCustomers: 15420,
    totalCommissionCollected: 125750.50,
    pendingCommissionAmount: 45250.75
  };

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="System overview and management statistics"
    >
      <div className="space-y-6">
        {/* Primary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Merchants"
            value={stats.totalMerchants}
            icon={UserCheck}
            color="bg-blue-600"
            trend={{ value: 15, isPositive: true }}
            subtitle="Active merchants"
          />
          <StatCard
            title="Pending Requests"
            value={stats.pendingMerchantRequests}
            icon={AlertCircle}
            color="bg-orange-600"
            subtitle="Awaiting approval"
          />
          <StatCard
            title="Total Branches"
            value={stats.totalBranches}
            icon={Building}
            color="bg-emerald-600"
            trend={{ value: 22, isPositive: true }}
            subtitle="Across all merchants"
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={Users}
            color="bg-purple-600"
            trend={{ value: 28, isPositive: true }}
            subtitle="Registered users"
          />
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Credits Loaded"
            value={stats.totalCreditsLoaded}
            icon={TrendingUp}
            color="bg-emerald-600"
            trend={{ value: 18, isPositive: true }}
            subtitle="Total points issued"
          />
          <StatCard
            title="Credits Redeemed"
            value={stats.totalCreditsRedeemed}
            icon={TrendingDown}
            color="bg-red-600"
            trend={{ value: 12, isPositive: true }}
            subtitle="Total points redeemed"
          />
          <StatCard
            title="Commission Collected"
            value={`$${stats.totalCommissionCollected.toFixed(2)}`}
            icon={DollarSign}
            color="bg-indigo-600"
            trend={{ value: 25, isPositive: true }}
            subtitle="Total revenue"
          />
          <StatCard
            title="Pending Commission"
            value={`$${stats.pendingCommissionAmount.toFixed(2)}`}
            icon={Calendar}
            color="bg-yellow-600"
            subtitle="Awaiting payment"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transactions Overview */}
          <ChartCard 
            title="Transactions Overview"
            actions={
              <>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:border-red-500 focus:outline-none">
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
                <Button variant="ghost" size="sm" icon={Download}>
                  Export
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Transaction Analytics</p>
                <p className="text-sm text-gray-500">Credits vs redemptions across all merchants</p>
              </div>
            </div>
          </ChartCard>

          {/* Customer Growth */}
          <ChartCard 
            title="Customer Growth"
            actions={
              <>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:border-red-500 focus:outline-none">
                  <option>All Merchants</option>
                  <option>Top Performers</option>
                  <option>New Merchants</option>
                </select>
                <Button variant="ghost" size="sm" icon={Filter}>
                  Filter
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
              <div className="text-center">
                <Users className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Customer Registration</p>
                <p className="text-sm text-gray-500">New customer signups across merchants</p>
              </div>
            </div>
          </ChartCard>

          {/* Credits Loaded */}
          <ChartCard 
            title="Credits Loaded"
            actions={
              <>
                <Button variant="ghost" size="sm" icon={TrendingUp}>
                  View Details
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Points Credited</p>
                <p className="text-sm text-gray-500">Value of points loaded in QAR</p>
              </div>
            </div>
          </ChartCard>

          {/* Credits Redeemed */}
          <ChartCard 
            title="Credits Redeemed"
            actions={
              <>
                <Button variant="ghost" size="sm" icon={TrendingDown}>
                  View Details
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-center">
                <TrendingDown className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Redemption Activity</p>
                <p className="text-sm text-gray-500">Value of points redeemed in QAR</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Merchant Requests */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Merchant Requests</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Coffee Corner LLC',
                  email: 'admin@coffeecorner.com',
                  submittedAt: '2 hours ago',
                  businessType: 'Restaurant'
                },
                {
                  name: 'Tech Solutions Inc',
                  email: 'contact@techsolutions.com',
                  submittedAt: '5 hours ago',
                  businessType: 'Technology'
                },
                {
                  name: 'Fashion Boutique',
                  email: 'info@fashionboutique.com',
                  submittedAt: '1 day ago',
                  businessType: 'Retail'
                }
              ].map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{request.name}</p>
                      <p className="text-xs text-gray-500">{request.email} • {request.businessType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{request.submittedAt}</p>
                    <div className="flex space-x-1 mt-1">
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Alerts */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: 'High Commission Pending',
                  message: 'Multiple merchants have pending commission payments',
                  type: 'warning',
                  time: '30 minutes ago'
                },
                {
                  title: 'New Merchant Registrations',
                  message: '8 new merchant requests awaiting approval',
                  type: 'info',
                  time: '2 hours ago'
                },
                {
                  title: 'System Performance',
                  message: 'All systems operating normally',
                  type: 'success',
                  time: '1 day ago'
                }
              ].map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'error' ? 'bg-red-50 border-red-400' :
                  alert.type === 'success' ? 'bg-emerald-50 border-emerald-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};