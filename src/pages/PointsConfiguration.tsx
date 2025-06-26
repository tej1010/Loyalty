import React, { useState } from 'react';
import { Settings, DollarSign, CreditCard, Users, Calendar, Save } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PointsConfiguration } from '../types';

export const PointsConfigurationPage: React.FC = () => {
  const [config, setConfig] = useState<PointsConfiguration>({
    pointsToRiyalRate: 0.05, // 1 point = 0.05 QAR
    maxPointBalance: 10000,
    maxDailyRedemption: 1000,
    maxCustomersLimit: 5000
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setSaved(true);
    
    // Reset saved state after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };

  const ConfigCard: React.FC<{
    title: string;
    description: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }> = ({ title, description, icon: Icon, children }) => (
    <Card>
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          {children}
        </div>
      </div>
    </Card>
  );

  return (
    <Layout 
      title="Points Configuration" 
      subtitle="Configure loyalty points system parameters"
    >
      <div className="max-w-4xl space-y-6">
        {/* Save Status */}
        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <Save className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-emerald-800 font-medium">Configuration saved successfully!</p>
            </div>
          </div>
        )}

        {/* Points Value Configuration */}
        <ConfigCard
          title="Points to Currency Rate"
          description="Set the exchange rate between loyalty points and Riyal currency"
          icon={DollarSign}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Points to QAR Rate"
                type="number"
                step="0.01"
                value={config.pointsToRiyalRate.toString()}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  pointsToRiyalRate: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0.05"
              />
              <p className="text-xs text-gray-500 mt-1">
                1 point = {config.pointsToRiyalRate} QAR
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>100 points = {(100 * config.pointsToRiyalRate).toFixed(2)} QAR</p>
                <p>500 points = {(500 * config.pointsToRiyalRate).toFixed(2)} QAR</p>
                <p>1000 points = {(1000 * config.pointsToRiyalRate).toFixed(2)} QAR</p>
              </div>
            </div>
          </div>
        </ConfigCard>

        {/* Balance Limits */}
        <ConfigCard
          title="Maximum Point Balance"
          description="Set the maximum number of points a customer can hold in their wallet"
          icon={CreditCard}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Max Point Balance"
                type="number"
                value={config.maxPointBalance.toString()}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  maxPointBalance: parseInt(e.target.value) || 0 
                }))}
                placeholder="10000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum points per customer wallet
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Current Setting:</h4>
              <p className="text-sm text-gray-600">
                Customers can hold up to <span className="font-medium">{config.maxPointBalance.toLocaleString()}</span> points
              </p>
              <p className="text-sm text-gray-600">
                Equivalent to <span className="font-medium">{(config.maxPointBalance * config.pointsToRiyalRate).toFixed(2)} QAR</span>
              </p>
            </div>
          </div>
        </ConfigCard>

        {/* Daily Redemption Limits */}
        <ConfigCard
          title="Daily Redemption Limit"
          description="Set the maximum points a customer can redeem per day"
          icon={Calendar}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Max Daily Redemption"
                type="number"
                value={config.maxDailyRedemption.toString()}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  maxDailyRedemption: parseInt(e.target.value) || 0 
                }))}
                placeholder="1000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Points per customer per day
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Current Setting:</h4>
              <p className="text-sm text-gray-600">
                Daily limit: <span className="font-medium">{config.maxDailyRedemption.toLocaleString()}</span> points
              </p>
              <p className="text-sm text-gray-600">
                Equivalent to <span className="font-medium">{(config.maxDailyRedemption * config.pointsToRiyalRate).toFixed(2)} QAR</span>
              </p>
            </div>
          </div>
        </ConfigCard>

        {/* Customer Limits */}
        <ConfigCard
          title="Customer Onboarding Limit"
          description="Set the maximum number of customers that can be onboarded for loyalty points"
          icon={Users}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Max Customers Limit"
                type="number"
                value={config.maxCustomersLimit.toString()}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  maxCustomersLimit: parseInt(e.target.value) || 0 
                }))}
                placeholder="5000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total customers allowed in the system
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Current Status:</h4>
              <p className="text-sm text-gray-600">
                Limit: <span className="font-medium">{config.maxCustomersLimit.toLocaleString()}</span> customers
              </p>
              <p className="text-sm text-gray-600">
                Current: <span className="font-medium">2,847</span> customers
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(2847 / config.maxCustomersLimit) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((2847 / config.maxCustomersLimit) * 100).toFixed(1)}% of limit used
                </p>
              </div>
            </div>
          </div>
        </ConfigCard>

        {/* Configuration Summary */}
        <Card>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points to QAR Rate:</span>
                    <span className="font-medium">1 point = {config.pointsToRiyalRate} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Point Balance:</span>
                    <span className="font-medium">{config.maxPointBalance.toLocaleString()} points</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Redemption Limit:</span>
                    <span className="font-medium">{config.maxDailyRedemption.toLocaleString()} points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Limit:</span>
                    <span className="font-medium">{config.maxCustomersLimit.toLocaleString()} customers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            loading={loading}
            icon={Save}
            size="lg"
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </Layout>
  );
};