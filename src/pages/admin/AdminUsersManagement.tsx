import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, UserX, UserCheck, Download, Calendar } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Customer } from '../../types';

// Mock customers data for admin view
const mockAdminCustomers: Customer[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phoneNumber: '+1-555-0101',
    dateOfBirth: '1990-05-15',
    dateOfRegistration: '2024-01-15',
    transactionCount: 23,
    firstTransaction: {
      amount: 500,
      branch: 'Downtown Branch',
      date: '2024-01-20'
    },
    lastTransaction: {
      amount: 200,
      branch: 'Downtown Branch',
      date: '2024-12-10'
    },
    inactiveFor: '5 days',
    walletBalance: 1250,
    loyaltyCardQRCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=customer-1',
    branchId: 'branch-1',
    branchName: 'Downtown Branch',
    assignedWorkerName: 'John Doe',
    isActive: true
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'michael.chen@email.com',
    phoneNumber: '+1-555-0102',
    dateOfBirth: '1985-08-22',
    dateOfRegistration: '2024-02-03',
    transactionCount: 31,
    firstTransaction: {
      amount: 1000,
      branch: 'Mall Branch',
      date: '2024-02-05'
    },
    lastTransaction: {
      amount: 750,
      branch: 'Mall Branch',
      date: '2024-12-12'
    },
    inactiveFor: '3 days',
    walletBalance: 2100,
    loyaltyCardQRCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=customer-2',
    branchId: 'branch-2',
    branchName: 'Mall Branch',
    assignedWorkerName: 'Jane Smith',
    isActive: true
  },
  {
    id: '3',
    fullName: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phoneNumber: '+1-555-0103',
    dateOfBirth: '1992-12-08',
    dateOfRegistration: '2024-03-10',
    transactionCount: 18,
    firstTransaction: {
      amount: 300,
      branch: 'Airport Branch',
      date: '2024-03-12'
    },
    lastTransaction: {
      amount: 400,
      branch: 'Airport Branch',
      date: '2024-12-08'
    },
    inactiveFor: '7 days',
    walletBalance: 850,
    loyaltyCardQRCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=customer-3',
    branchId: 'branch-3',
    branchName: 'Airport Branch',
    assignedWorkerName: 'Bob Wilson',
    isActive: false
  }
];

// Mock merchants for filtering
const mockMerchants = [
  { id: 'merchant-1', name: 'Coffee Corner LLC' },
  { id: 'merchant-2', name: 'Tech Solutions Inc' },
  { id: 'merchant-3', name: 'Fashion Boutique' }
];

export const AdminUsersManagement: React.FC = () => {
  const [customers, setCustomers] = useState(mockAdminCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMerchant = merchantFilter === 'all'; // In real app, filter by merchant
      
      return matchesSearch && matchesMerchant;
    });
  }, [searchTerm, merchantFilter, customers]);

  const handleToggleActive = (customerId: string) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, isActive: !customer.isActive } : customer
    ));
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Customer ID', 'Full Name', 'Email', 'Phone', 'Date of Birth', 'Registration Date', 'Merchant', 'Transaction Count', 'Wallet Balance', 'Status'].join(','),
      ...filteredCustomers.map(c => [
        c.id,
        c.fullName,
        c.email,
        c.phoneNumber,
        c.dateOfBirth,
        c.dateOfRegistration,
        'Coffee Corner LLC', // Mock merchant name
        c.transactionCount,
        c.walletBalance,
        c.isActive ? 'Active' : 'Inactive'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const CustomerModal: React.FC<{ customer: Customer; onClose: () => void }> = ({ customer, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
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
                <label className="text-sm font-medium text-gray-700">Customer ID</label>
                <p className="text-sm text-gray-900 mt-1 font-mono">#{customer.id}</p>
              </div>
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
              <div>
                <label className="text-sm font-medium text-gray-700">Registration Date</label>
                <p className="text-sm text-gray-900 mt-1">{new Date(customer.dateOfRegistration).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Merchant Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Merchant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Merchant Name</label>
                <p className="text-sm text-gray-900 mt-1">Coffee Corner LLC</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Branch Name</label>
                <p className="text-sm text-gray-900 mt-1">{customer.branchName}</p>
              </div>
            </div>
          </div>

          {/* Transaction Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{customer.transactionCount}</p>
                <p className="text-sm text-gray-600">Total Transactions</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{customer.walletBalance}</p>
                <p className="text-sm text-gray-600">Wallet Balance</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{customer.inactiveFor}</p>
                <p className="text-sm text-gray-600">Inactive For</p>
              </div>
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
    <AdminLayout 
      title="Users Management" 
      subtitle="Manage customer accounts across all merchants"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              icon={Search}
              className="w-64"
            />
            
            <select
              value={merchantFilter}
              onChange={(e) => setMerchantFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Merchants</option>
              {mockMerchants.map(merchant => (
                <option key={merchant.id} value={merchant.id}>{merchant.name}</option>
              ))}
            </select>
          </div>
          
          <Button
            icon={Download}
            onClick={handleExport}
            className="bg-red-600 hover:bg-red-700"
          >
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{filteredCustomers.length}</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {filteredCustomers.filter(c => c.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Active Customers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {filteredCustomers.filter(c => !c.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Inactive Customers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {filteredCustomers.reduce((sum, c) => sum + c.walletBalance, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Points</p>
          </Card>
        </div>

        {/* Customers Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Merchant
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
                        <p className="text-sm text-gray-500 font-mono">ID: #{customer.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{customer.email}</p>
                        <p className="text-sm text-gray-500">{customer.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Coffee Corner LLC</p>
                        <p className="text-sm text-gray-500">{customer.branchName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.transactionCount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-emerald-600">
                        {customer.walletBalance.toLocaleString()} pts
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.isActive 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
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
                          icon={customer.isActive ? UserX : UserCheck}
                          onClick={() => handleToggleActive(customer.id)}
                        >
                          {customer.isActive ? 'Deactivate' : 'Activate'}
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
    </AdminLayout>
  );
};