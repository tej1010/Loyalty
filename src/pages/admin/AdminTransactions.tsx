import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { AdminTransaction } from '../../types/admin';

// Mock admin transactions data
const mockAdminTransactions: AdminTransaction[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Sarah Johnson',
    type: 'credit',
    points: 500,
    cashEquivalentValue: 25.00,
    walletBalanceAfter: 1250,
    dateTime: '2024-12-10T14:30:00Z',
    branchId: 'branch-1',
    branchName: 'Downtown Branch',
    assignedWorkerName: 'John Doe',
    adminCommissionValue: 1.25,
    merchantName: 'Coffee Corner LLC',
    payStatus: 'unpaid'
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Michael Chen',
    type: 'redemption',
    points: 300,
    cashEquivalentValue: 15.00,
    walletBalanceAfter: 2100,
    dateTime: '2024-12-12T10:15:00Z',
    branchId: 'branch-2',
    branchName: 'Mall Branch',
    assignedWorkerName: 'Jane Smith',
    adminCommissionValue: 0.75,
    merchantName: 'Coffee Corner LLC',
    payStatus: 'paid'
  },
  {
    id: '3',
    customerId: '3',
    customerName: 'Emily Rodriguez',
    type: 'credit',
    points: 400,
    cashEquivalentValue: 20.00,
    walletBalanceAfter: 850,
    dateTime: '2024-12-08T16:45:00Z',
    branchId: 'branch-3',
    branchName: 'Airport Branch',
    assignedWorkerName: 'Bob Wilson',
    adminCommissionValue: 1.00,
    merchantName: 'Tech Solutions Inc',
    payStatus: 'unpaid'
  },
  {
    id: '4',
    customerId: '4',
    customerName: 'David Wilson',
    type: 'credit',
    points: 750,
    cashEquivalentValue: 37.50,
    walletBalanceAfter: 1500,
    dateTime: '2024-12-14T09:20:00Z',
    branchId: 'branch-4',
    branchName: 'Fashion Store Main',
    assignedWorkerName: 'Alice Brown',
    adminCommissionValue: 1.88,
    merchantName: 'Fashion Boutique',
    payStatus: 'paid'
  }
];

// Mock merchants for filtering
const mockMerchants = [
  { id: 'merchant-1', name: 'Coffee Corner LLC' },
  { id: 'merchant-2', name: 'Tech Solutions Inc' },
  { id: 'merchant-3', name: 'Fashion Boutique' }
];

export const AdminTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState(mockAdminTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'redemption'>('all');
  const [payStatusFilter, setPayStatusFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.branchName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      const matchesPayStatus = payStatusFilter === 'all' || transaction.payStatus === payStatusFilter;
      const matchesMerchant = merchantFilter === 'all' || transaction.merchantName === mockMerchants.find(m => m.id === merchantFilter)?.name;
      const matchesDateFilter = !dateFilter.from || !dateFilter.to ||
                               (new Date(transaction.dateTime) >= new Date(dateFilter.from) &&
                                new Date(transaction.dateTime) <= new Date(dateFilter.to));
      
      return matchesSearch && matchesType && matchesPayStatus && matchesMerchant && matchesDateFilter;
    });
  }, [searchTerm, typeFilter, payStatusFilter, merchantFilter, dateFilter, transactions]);

  const totalCommissionEarnings = filteredTransactions.reduce((sum, t) => sum + t.adminCommissionValue, 0);
  const paidCommission = filteredTransactions.filter(t => t.payStatus === 'paid').reduce((sum, t) => sum + t.adminCommissionValue, 0);
  const unpaidCommission = filteredTransactions.filter(t => t.payStatus === 'unpaid').reduce((sum, t) => sum + t.adminCommissionValue, 0);

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    }
  };

  const handleMarkAsPaid = () => {
    setTransactions(transactions.map(transaction => 
      selectedTransactions.includes(transaction.id) 
        ? { ...transaction, payStatus: 'paid' as const }
        : transaction
    ));
    setSelectedTransactions([]);
  };

  const handleExport = () => {
    const csvContent = [
      ['Transaction ID', 'Date & Time', 'Customer', 'Merchant', 'Branch', 'Type', 'Points', 'Cash Value', 'Commission', 'Pay Status'].join(','),
      ...filteredTransactions.map(t => [
        t.id,
        new Date(t.dateTime).toLocaleString(),
        t.customerName,
        t.merchantName,
        t.branchName,
        t.type,
        t.points,
        t.cashEquivalentValue,
        t.adminCommissionValue,
        t.payStatus
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin-transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout 
      title="Transactions Management" 
      subtitle="Monitor all transactions and commission payments across merchants"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">${totalCommissionEarnings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Commission</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">${paidCommission.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unpaid Commission</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">${unpaidCommission.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{filteredTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 max-w-md">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transactions..."
                icon={Search}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits Only</option>
                <option value="redemption">Redemptions Only</option>
              </select>

              <select
                value={payStatusFilter}
                onChange={(e) => setPayStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="all">All Pay Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>

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
              
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={dateFilter.from}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
                  className="w-auto"
                />
                <span className="text-gray-500 text-sm">to</span>
                <Input
                  type="date"
                  value={dateFilter.to}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
                  className="w-auto"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  icon={Filter}
                  onClick={() => {
                    setTypeFilter('all');
                    setPayStatusFilter('all');
                    setMerchantFilter('all');
                    setDateFilter({ from: '', to: '' });
                    setSearchTerm('');
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="outline"
                  icon={Download}
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedTransactions.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">
                  {selectedTransactions.length} transaction(s) selected
                </p>
                <p className="text-xs text-blue-700">
                  Total commission: ${filteredTransactions
                    .filter(t => selectedTransactions.includes(t.id))
                    .reduce((sum, t) => sum + t.adminCommissionValue, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleMarkAsPaid}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Mark as Paid
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedTransactions([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Transactions Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Merchant & Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pay Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={() => handleSelectTransaction(transaction.id)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-mono text-gray-900">#{transaction.id}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.dateTime).toLocaleDateString()} at {new Date(transaction.dateTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.customerName}</p>
                        <p className="text-xs text-gray-500">Balance: {transaction.walletBalanceAfter} pts</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.merchantName}</p>
                        <p className="text-xs text-gray-500">{transaction.branchName}</p>
                        <p className="text-xs text-gray-400">by {transaction.assignedWorkerName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'credit' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {transaction.type === 'credit' ? 'Credit' : 'Redemption'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {transaction.type === 'credit' ? '+' : '-'}{transaction.points.toLocaleString()} pts
                      </p>
                      <p className="text-xs text-gray-500">${transaction.cashEquivalentValue.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600">${transaction.adminCommissionValue.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Commission</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.payStatus === 'paid' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {transaction.payStatus === 'paid' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {transaction.payStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};