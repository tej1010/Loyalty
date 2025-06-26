import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const AdvancedAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const MetricCard: React.FC<{
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ElementType;
  }> = ({ title, value, change, changeType, icon: Icon }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${
            changeType === 'positive' ? 'text-emerald-600' :
            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
          </p>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </Card>
  );

  const ChartContainer: React.FC<{
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

  return (
    <Layout 
      title="Advanced Analytics" 
      subtitle="Deep insights and performance metrics"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="w-auto"
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="w-auto"
                />
              </div>
              
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="revenue">Revenue</option>
                <option value="customers">Customers</option>
                <option value="transactions">Transactions</option>
                <option value="branches">Branches</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" icon={RefreshCw} size="sm">
                Refresh
              </Button>
              <Button variant="outline" icon={Download} size="sm">
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$45,750"
            change="+22.5% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Customer Growth"
            value="2,847"
            change="+18.2% from last month"
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Transaction Volume"
            value="15,420"
            change="+12.8% from last month"
            changeType="positive"
            icon={BarChart3}
          />
          <MetricCard
            title="Avg. Transaction"
            value="$45.30"
            change="-2.1% from last month"
            changeType="negative"
            icon={TrendingUp}
          />
        </div>

        {/* Main Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trends */}
          <ChartContainer 
            title="Revenue Trends"
            actions={
              <>
                <Button variant="ghost" size="sm" icon={Eye}>
                  View Details
                </Button>
                <Button variant="ghost" size="sm" icon={Download}>
                  Export
                </Button>
              </>
            }
          >
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700">Revenue Analytics</p>
                <p className="text-sm text-gray-500">Monthly revenue breakdown with forecasting</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">$15,250</p>
                    <p className="text-gray-500">This Month</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">$12,480</p>
                    <p className="text-gray-500">Last Month</p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-600">+22.2%</p>
                    <p className="text-gray-500">Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </ChartContainer>

          {/* Customer Analytics */}
          <ChartContainer 
            title="Customer Analytics"
            actions={
              <>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>All Branches</option>
                  <option>Downtown</option>
                  <option>Mall</option>
                  <option>Airport</option>
                </select>
              </>
            }
          >
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg">
              <div className="text-center">
                <Users className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700">Customer Insights</p>
                <p className="text-sm text-gray-500">Registration trends and demographics</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">2,847</p>
                    <p className="text-gray-500">Total</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">156</p>
                    <p className="text-gray-500">This Week</p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-600">+18.5%</p>
                    <p className="text-gray-500">Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Patterns */}
          <ChartContainer title="Transaction Patterns">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 rounded-lg">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <p className="font-medium text-gray-700">Daily Patterns</p>
                <p className="text-sm text-gray-500">Peak hours and trends</p>
              </div>
            </div>
          </ChartContainer>

          {/* Branch Performance */}
          <ChartContainer title="Branch Performance">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <p className="font-medium text-gray-700">Performance Metrics</p>
                <p className="text-sm text-gray-500">Branch comparison</p>
              </div>
            </div>
          </ChartContainer>

          {/* Loyalty Trends */}
          <ChartContainer title="Loyalty Trends">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                <p className="font-medium text-gray-700">Engagement Metrics</p>
                <p className="text-sm text-gray-500">Customer loyalty analysis</p>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Branches */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Branches</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Downtown Branch', revenue: '$18,250', growth: '+25%', customers: 1250 },
                { name: 'Mall Branch', revenue: '$15,680', growth: '+18%', customers: 980 },
                { name: 'Airport Branch', revenue: '$11,820', growth: '+22%', customers: 617 }
              ].map((branch, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{branch.name}</p>
                    <p className="text-sm text-gray-500">{branch.customers} customers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{branch.revenue}</p>
                    <p className="text-sm text-emerald-600">{branch.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Insights */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
              <Button variant="ghost" size="sm">Generate Report</Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: 'Peak Transaction Hours',
                  insight: '2-4 PM shows highest activity across all branches',
                  impact: 'High',
                  type: 'trend'
                },
                {
                  title: 'Customer Retention',
                  insight: '85% of customers return within 30 days',
                  impact: 'Medium',
                  type: 'retention'
                },
                {
                  title: 'Redemption Patterns',
                  insight: 'Weekend redemptions 40% higher than weekdays',
                  impact: 'Medium',
                  type: 'behavior'
                }
              ].map((insight, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{insight.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{insight.insight}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                      insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {insight.impact}
                    </span>
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