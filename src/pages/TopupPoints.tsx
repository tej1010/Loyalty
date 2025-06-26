import React, { useState } from 'react';
import { Search, Plus, QrCode, User } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

export const TopupPoints: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopup = async () => {
    if (!selectedCustomer || !pointsToAdd) return;
    
    setLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update customer balance (in real app, this would update the backend)
    selectedCustomer.walletBalance += parseInt(pointsToAdd);
    
    setLoading(false);
    setSelectedCustomer(null);
    setPointsToAdd('');
    
    // Show success message (in real app, you'd use a toast notification)
    alert(`Successfully added ${pointsToAdd} points to ${selectedCustomer.fullName}'s account!`);
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

  const TopupModal: React.FC<{ customer: Customer; onClose: () => void }> = ({ customer, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Add Points</h2>
          <p className="text-sm text-gray-600 mt-1">
            Adding points to {customer.fullName}'s account
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
                Current Balance: {customer.walletBalance.toLocaleString()} points
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Input
            label="Points to Add"
            type="number"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(e.target.value)}
            placeholder="Enter points amount"
            required
          />
          
          {pointsToAdd && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                New Balance: {(customer.walletBalance + parseInt(pointsToAdd || '0')).toLocaleString()} points
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Cash Equivalent: ${((parseInt(pointsToAdd || '0')) * 0.05).toFixed(2)}
              </p>
            </div>
          )}
          
          <div className="flex space-x-3">
            <Button
              onClick={handleTopup}
              loading={loading}
              disabled={!pointsToAdd}
              className="flex-1"
            >
              Add Points
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

  return (
    <Layout 
      title="Topup Points" 
      subtitle="Add points to customer loyalty accounts"
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
                      <p className="text-xs text-gray-500">Current Balance</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Topup Amounts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[100, 250, 500, 1000].map((amount) => (
              <div key={amount} className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <p className="text-2xl font-bold text-blue-600">{amount}</p>
                <p className="text-sm text-gray-600">points</p>
                <p className="text-xs text-gray-500">${(amount * 0.05).toFixed(2)} value</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Topups */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Topups</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {[
              { customer: 'Sarah Johnson', amount: 500, time: '5 minutes ago' },
              { customer: 'Michael Chen', amount: 250, time: '15 minutes ago' },
              { customer: 'Emily Rodriguez', amount: 1000, time: '1 hour ago' }
            ].map((topup, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{topup.customer}</p>
                    <p className="text-xs text-gray-500">Points Added</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-emerald-600">+{topup.amount.toLocaleString()} points</p>
                  <p className="text-xs text-gray-500">{topup.time}</p>
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
          <TopupModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </Layout>
  );
};