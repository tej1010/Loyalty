import React from 'react';
import { Users, TrendingUp, TrendingDown, QrCode, Calendar, Clock } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockDashboardStats } from '../data/mockData';

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

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = stats.qrCodeUrl;
    link.download = 'branch-qr-code.png';
    link.click();
  };

  return (
    <Layout 
      title="Dashboard" 
      subtitle="Welcome back! Here's what's happening at your branch today."
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={Users}
            color="bg-blue-600"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Today's Transactions"
            value={stats.todayTransactions}
            icon={Calendar}
            color="bg-emerald-600"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Monthly Transactions"
            value={stats.monthlyTransactions}
            icon={TrendingUp}
            color="bg-orange-600"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Active Sessions"
            value={23}
            icon={Clock}
            color="bg-purple-600"
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        {/* QR Code Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Branch QR Code</h3>
              <p className="text-sm text-gray-600 mb-6">
                Share this QR code with customers for easy registration
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <img
                  src={stats.qrCodeUrl}
                  alt="Branch QR Code"
                  className="w-32 h-32 mx-auto"
                />
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadQR}
                  className="w-full"
                  icon={QrCode}
                >
                  Download QR Code
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  Share Link
                </Button>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  customer: 'Sarah Johnson',
                  action: 'Points Added',
                  amount: '+500 points',
                  time: '2 minutes ago',
                  type: 'credit'
                },
                {
                  customer: 'Michael Chen',
                  action: 'Points Redeemed',
                  amount: '-300 points',
                  time: '15 minutes ago',
                  type: 'redemption'
                },
                {
                  customer: 'Emily Rodriguez',
                  action: 'New Registration',
                  amount: 'Welcome bonus',
                  time: '1 hour ago',
                  type: 'registration'
                },
                {
                  customer: 'David Wilson',
                  action: 'Points Added',
                  amount: '+750 points',
                  time: '2 hours ago',
                  type: 'credit'
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
                      <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      activity.type === 'credit' ? 'text-emerald-600' :
                      activity.type === 'redemption' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {activity.amount}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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