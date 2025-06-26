import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, QrCode, Calendar, Clock } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

export const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      const matchesSearch = customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDateFilter = !dateFilter.from || !dateFilter.to ||
                               (new Date(customer.dateOfRegistration) >= new Date(dateFilter.from) &&
                                new Date(customer.dateOfRegistration) <= new Date(dateFilter.to));
      
      return matchesSearch && matchesDateFilter;
    });
  }, [searchTerm, dateFilter]);

  const CustomerModal: React.FC<{ customer: Customer; onClose: () => void }> = ({ customer, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Customer Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-sm text-gray-900 mt-1">{customer.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900 mt-1">{customer.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <p className="text-sm text-gray-900 mt-1">{customer.phoneNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <p className="text-sm text-gray-900 mt-1">{new Date(customer.dateOfBirth).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Loyalty Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Loyalty Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{customer.walletBalance}</p>
                <p className="text-sm text-gray-600">Points Balance</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{customer.transactionCount}</p>
                <p className="text-sm text-gray-600">Total Transactions</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{customer.inactiveFor}</p>
                <p className="text-sm text-gray-600">Inactive For</p>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
            <div className="space-y-3">
              {customer.firstTransaction && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">First Transaction</p>
                    <p className="text-xs text-gray-500">{customer.firstTransaction.branch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">+{customer.firstTransaction.amount} points</p>
                    <p className="text-xs text-gray-500">{new Date(customer.firstTransaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              {customer.lastTransaction && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Transaction</p>
                    <p className="text-xs text-gray-500">{customer.lastTransaction.branch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">+{customer.lastTransaction.amount} points</p>
                    <p className="text-xs text-gray-500">{new Date(customer.lastTransaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Loyalty Card QR Code</h3>
            <div className="inline-block p-4 bg-gray-50 rounded-lg">
              <img
                src={customer.loyaltyCardQRCode}
                alt="Customer QR Code"
                className="w-32 h-32"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      title="Customer Management" 
      subtitle="View and manage customer information for your branch"
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search customers by name or email..."
                icon={Search}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={dateFilter.from}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
                  className="w-auto"
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="date"
                  value={dateFilter.to}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
                  className="w-auto"
                />
              </div>
              
              <Button
                variant="outline"
                icon={Filter}
                onClick={() => setDateFilter({ from: '', to: '' })}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-blue-600">{filteredCustomers.length}</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-emerald-600">
              {filteredCustomers.reduce((sum, customer) => sum + customer.transactionCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Transactions</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-orange-600">
              {filteredCustomers.reduce((sum, customer) => sum + customer.walletBalance, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Points</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-purple-600">
              {filteredCustomers.filter(c => c.inactiveFor.includes('day')).length}
            </p>
            <p className="text-sm text-gray-600">Active This Week</p>
          </Card>
        </div>

        {/* Customer List */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.fullName}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(customer.dateOfRegistration).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{customer.transactionCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-emerald-600">
                        {customer.walletBalance.toLocaleString()} points
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        Inactive {customer.inactiveFor}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={Eye}
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={QrCode}
                        >
                          QR
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Customer Details Modal */}
        {selectedCustomer && (
          <CustomerModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </Layout>
  );
};