import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent,
  Calendar,
  Filter
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: { value: number; isPositive: boolean };
}> = ({ title, value, icon: Icon, color, trend }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
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
}> = ({ title, children }) => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="flex items-center space-x-2">
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:border-blue-500 focus:outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
        <Button variant="ghost" size="sm" icon={Filter}>
          Filter
        </Button>
      </div>
    </div>
    {children}
  </Card>
);

export const MerchantDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Mock data
  const stats = {
    totalBranches: 5,
    totalWorkers: 12,
    totalCreditsIssued: 125000,
    totalCreditsRedeemed: 87500,
    totalTransactions: 2847,
    totalRevenue: 15750.50,
    commissionPercentage: 5
  };

  return (
    <Layout 
      title="Merchant Dashboard" 
      subtitle="Overview of your loyalty program performance"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Branches"
            value={stats.totalBranches}
            icon={Building}
            color="bg-blue-600"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Workers"
            value={stats.totalWorkers}
            icon={Users}
            color="bg-emerald-600"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            color="bg-orange-600"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Commission Rate"
            value={`${stats.commissionPercentage}%`}
            icon={Percent}
            color="bg-purple-600"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Credits Issued"
            value={stats.totalCreditsIssued}
            icon={TrendingUp}
            color="bg-emerald-600"
            trend={{ value: 22, isPositive: true }}
          />
          <StatCard
            title="Credits Redeemed"
            value={stats.totalCreditsRedeemed}
            icon={TrendingDown}
            color="bg-red-600"
            trend={{ value: 18, isPositive: true }}
          />
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions}
            icon={Calendar}
            color="bg-blue-600"
            trend={{ value: 25, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transactions Overview */}
          <ChartCard title="Transactions Overview">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Credits vs Redemptions over time</p>
              </div>
            </div>
          </ChartCard>

          {/* New Customers */}
          <ChartCard title="New Customer Registrations">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Customer signups over time</p>
              </div>
            </div>
          </ChartCard>

          {/* Credits Loaded */}
          <ChartCard title="Credits Loaded">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Points credited with QAR equivalent</p>
              </div>
            </div>
          </ChartCard>

          {/* Credits Redeemed */}
          <ChartCard title="Credits Redeemed">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingDown className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Redemption activity in QAR</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Quick Actions */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Building className="w-6 h-6" />
              <span>Manage Branches</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="w-6 h-6" />
              <span>Manage Workers</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <TrendingUp className="w-6 h-6" />
              <span>View Transactions</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <DollarSign className="w-6 h-6" />
              <span>Points Config</span>
            </Button>
          </div>
        </Card>

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
                action: 'Added 500 points',
                customer: 'Sarah Johnson',
                time: '2 minutes ago',
                type: 'credit'
              },
              {
                branch: 'Mall Branch',
                worker: 'Jane Smith',
                action: 'Redeemed 300 points',
                customer: 'Michael Chen',
                time: '15 minutes ago',
                type: 'redemption'
              },
              {
                branch: 'Airport Branch',
                worker: 'Bob Wilson',
                action: 'New customer registered',
                customer: 'Emily Rodriguez',
                time: '1 hour ago',
                type: 'registration'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'credit' ? 'bg-emerald-100' :
                    activity.type === 'redemption' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'credit' ? (
                      <TrendingUp className={`w-4 h-4 text-emerald-600`} />
                    ) : activity.type === 'redemption' ? (
                      <TrendingDown className={`w-4 h-4 text-red-600`} />
                    ) : (
                      <Users className={`w-4 h-4 text-blue-600`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.worker} - {activity.branch}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.action} for {activity.customer}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};