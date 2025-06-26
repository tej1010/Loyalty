import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  BarChart3,
  FileText,
  Filter,
  Download
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

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

export const EmployeeDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Mock employee dashboard stats
  const stats = {
    totalCustomers: 2847,
    totalBranches: 5,
    totalWorkers: 12,
    totalTransactions: 15420,
    todayTransactions: 156,
    monthlyRevenue: 25750.50,
    averageTransactionValue: 45.30,
    customerGrowthRate: 18.5
  };

  return (
    <Layout 
      title="Employee Dashboard" 
      subtitle="Comprehensive overview and analytics for operations management"
    >
      <div className="space-y-6">
        {/* Primary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={Users}
            color="bg-blue-600"
            trend={{ value: 18.5, isPositive: true }}
            subtitle="Across all branches"
          />
          <StatCard
            title="Active Branches"
            value={stats.totalBranches}
            icon={Building}
            color="bg-emerald-600"
            trend={{ value: 12, isPositive: true }}
            subtitle="Operational locations"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toFixed(2)}`}
            icon={DollarSign}
            color="bg-orange-600"
            trend={{ value: 22, isPositive: true }}
            subtitle="Current month"
          />
          <StatCard
            title="Today's Transactions"
            value={stats.todayTransactions}
            icon={Calendar}
            color="bg-purple-600"
            trend={{ value: 8, isPositive: true }}
            subtitle="Real-time count"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions}
            icon={BarChart3}
            color="bg-indigo-600"
            trend={{ value: 25, isPositive: true }}
            subtitle="All time"
          />
          <StatCard
            title="Avg Transaction Value"
            value={`$${stats.averageTransactionValue}`}
            icon={TrendingUp}
            color="bg-teal-600"
            trend={{ value: 5.2, isPositive: true }}
            subtitle="Per transaction"
          />
          <StatCard
            title="Active Workers"
            value={stats.totalWorkers}
            icon={Users}
            color="bg-rose-600"
            trend={{ value: 15, isPositive: true }}
            subtitle="Across branches"
          />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Analytics */}
          <ChartCard 
            title="Revenue Analytics"
            actions={
              <>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:border-blue-500 focus:outline-none">
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
                <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Revenue Trend Analysis</p>
                <p className="text-sm text-gray-500">Monthly revenue breakdown with projections</p>
              </div>
            </div>
          </ChartCard>

          {/* Customer Growth */}
          <ChartCard 
            title="Customer Growth"
            actions={
              <>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:border-blue-500 focus:outline-none">
                  <option>By month</option>
                  <option>By week</option>
                  <option>By branch</option>
                </select>
                <Button variant="ghost" size="sm" icon={Filter}>
                  Filter
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Customer Acquisition</p>
                <p className="text-sm text-gray-500">New customer registrations over time</p>
              </div>
            </div>
          </ChartCard>

          {/* Transaction Volume */}
          <ChartCard 
            title="Transaction Volume"
            actions={
              <>
                <Button variant="ghost" size="sm" icon={BarChart3}>
                  View Details
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Daily Transaction Volume</p>
                <p className="text-sm text-gray-500">Credits vs redemptions analysis</p>
              </div>
            </div>
          </ChartCard>

          {/* Branch Performance */}
          <ChartCard 
            title="Branch Performance"
            actions={
              <>
                <Button variant="ghost" size="sm" icon={Building}>
                  Manage
                </Button>
              </>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-center">
                <Building className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Branch Comparison</p>
                <p className="text-sm text-gray-500">Performance metrics by location</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Quick Actions */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <FileText className="w-6 h-6" />
              <span className="text-xs">Generate Report</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="w-6 h-6" />
              <span className="text-xs">View Customers</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Building className="w-6 h-6" />
              <span className="text-xs">Manage Branches</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">View Analytics</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs">Transactions</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Download className="w-6 h-6" />
              <span className="text-xs">Export Data</span>
            </Button>
          </div>
        </Card>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  branch: 'Downtown Branch',
                  worker: 'John Doe',
                  action: 'Large transaction processed',
                  details: '2,500 points credited to Sarah Johnson',
                  time: '5 minutes ago',
                  type: 'transaction',
                  priority: 'high'
                },
                {
                  branch: 'Mall Branch',
                  worker: 'Jane Smith',
                  action: 'New customer registered',
                  details: 'Michael Chen completed onboarding',
                  time: '15 minutes ago',
                  type: 'registration',
                  priority: 'normal'
                },
                {
                  branch: 'Airport Branch',
                  worker: 'Bob Wilson',
                  action: 'Daily limit reached',
                  details: 'Customer redemption limit exceeded',
                  time: '1 hour ago',
                  type: 'alert',
                  priority: 'medium'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.priority === 'high' ? 'bg-red-100' :
                    activity.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'transaction' ? (
                      <DollarSign className={`w-4 h-4 ${
                        activity.priority === 'high' ? 'text-red-600' :
                        activity.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    ) : activity.type === 'registration' ? (
                      <Users className="w-4 h-4 text-blue-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.branch} • {activity.worker} • {activity.time}
                    </p>
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
                  title: 'High Transaction Volume',
                  message: 'Downtown branch exceeded daily transaction threshold',
                  type: 'warning',
                  time: '10 minutes ago'
                },
                {
                  title: 'Customer Limit Approaching',
                  message: '95% of customer onboarding limit reached',
                  type: 'info',
                  time: '2 hours ago'
                },
                {
                  title: 'System Maintenance',
                  message: 'Scheduled maintenance window tonight 2-4 AM',
                  type: 'info',
                  time: '1 day ago'
                }
              ].map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'error' ? 'bg-red-50 border-red-400' :
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
    </Layout>
  );
};