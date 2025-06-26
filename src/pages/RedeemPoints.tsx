import React, { useState } from 'react';
import { Search, Minus, QrCode, User, AlertCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

export const RedeemPoints: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRedeem = async () => {
    if (!selectedCustomer || !pointsToRedeem) return;
    
    setLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update customer balance (in real app, this would update the backend)
    selectedCustomer.walletBalance -= parseInt(pointsToRedeem);
    
    setLoading(false);
    setSelectedCustomer(null);
    setPointsToRedeem('');
    
    // Show success message (in real app, you'd use a toast notification)
    alert(`Successfully redeemed ${pointsToRedeem} points from ${selectedCustomer.fullName}'s account!`);
  };

  const QRScanner: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Scan QR Code</h2>
          <p className="text-sm text-gray-600 mb-6">
            Position the customer's loyalty card QR code within the frame
          </p>
          
          {/* Mock QR Scanner View */}
          <div className="bg-gray-100 rounded-lg p-8 mb-6">
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => {
                // Mock successful scan
                setSelectedCustomer(mockCustomers[0]);
                onClose();
              }}
              className="w-full"
            >
              Simulate Successful Scan
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const RedemptionModal: React.FC<{ customer: Customer; onClose: () => void }> = ({ customer, onClose }) => {
    const insufficientBalance = pointsToRedeem && parseInt(pointsToRedeem) > customer.walletBalance;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Minus className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Redeem Points</h2>
            <p className="text-sm text-gray-600 mt-1">
              Redeeming points from {customer.fullName}'s account
            </p>
          </div>

          {/* Customer Info */}
          <Card className="mb-6 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{customer.fullName}</p>
                <p className="text-sm text-gray-500">{customer.email}</p>
                <p className="text-sm font-medium text-emerald-600">
                  Available Balance: {customer.walletBalance.toLocaleString()} points
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Input
              label="Points to Redeem"
              type="number"
              value={pointsToRedeem}
              onChange={(e) => setPointsToRedeem(e.target.value)}
              placeholder="Enter points amount"
              error={insufficientBalance ? 'Insufficient balance' : ''}
              required
            />
            
            {pointsToRedeem && !insufficientBalance && (
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  Remaining Balance: {(customer.walletBalance - parseInt(pointsToRedeem || '0')).toLocaleString()} points
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Cash Value: ${((parseInt(pointsToRedeem || '0')) * 0.05).toFixed(2)}
                </p>
              </div>
            )}
            
            {insufficientBalance && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Insufficient Balance</p>
                  <p className="text-xs text-yellow-600">
                    Customer only has {customer.walletBalance.toLocaleString()} points available.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button
                onClick={handleRedeem}
                loading={loading}
                disabled={!pointsToRedeem || insufficientBalance}
                className="flex-1"
                variant="danger"
              >
                Redeem Points
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      title="Redeem Points" 
      subtitle="Process point redemptions for customers"
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-3">
            <Button
              icon={QrCode}
              onClick={() => setShowScanner(true)}
            >
              Scan QR Code
            </Button>
            <Button
              variant="outline"
              icon={Search}
            >
              Search Customer
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Find Customer</h3>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              icon={Search}
            />
            
            {searchTerm && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {filteredCustomers.length} customer(s) found
                </p>
                
                {filteredCustomers.slice(0, 5).map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.fullName}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-600">
                        {customer.walletBalance.toLocaleString()} points
                      </p>
                      <p className="text-xs text-gray-500">Available Balance</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Common Redemption Amounts */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Common Redemption Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { points: 100, value: 5.00, item: 'Small Item' },
              { points: 250, value: 12.50, item: 'Medium Item' },
              { points: 500, value: 25.00, item: 'Large Item' },
              { points: 1000, value: 50.00, item: 'Premium Item' }
            ].map((redemption) => (
              <div key={redemption.points} className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <p className="text-2xl font-bold text-red-600">{redemption.points}</p>
                <p className="text-sm text-gray-600">points</p>
                <p className="text-xs text-gray-500">${redemption.value.toFixed(2)} value</p>
                <p className="text-xs text-gray-400 mt-1">{redemption.item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Redemptions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Redemptions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {[
              { customer: 'Michael Chen', amount: 300, time: '10 minutes ago', value: 15.00 },
              { customer: 'Emily Rodriguez', amount: 500, time: '25 minutes ago', value: 25.00 },
              { customer: 'David Wilson', amount: 250, time: '45 minutes ago', value: 12.50 }
            ].map((redemption, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Minus className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{redemption.customer}</p>
                    <p className="text-xs text-gray-500">Points Redeemed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">-{redemption.amount.toLocaleString()} points</p>
                  <p className="text-xs text-gray-500">${redemption.value.toFixed(2)} • {redemption.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Modals */}
        {showScanner && (
          <QRScanner onClose={() => setShowScanner(false)} />
        )}
        
        {selectedCustomer && (
          <RedemptionModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </Layout>
  );
};