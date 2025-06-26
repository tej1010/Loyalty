import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockTransactions } from '../data/mockData';

export const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'redemption'>('all');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      const matchesDateFilter = !dateFilter.from || !dateFilter.to ||
                               (new Date(transaction.dateTime) >= new Date(dateFilter.from) &&
                                new Date(transaction.dateTime) <= new Date(dateFilter.to));
      
      return matchesSearch && matchesType && matchesDateFilter;
    });
  }, [searchTerm, typeFilter, dateFilter]);

  const totalCredits = filteredTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.points, 0);

  const totalRedemptions = filteredTransactions
    .filter(t => t.type === 'redemption')
    .reduce((sum, t) => sum + t.points, 0);

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      ['Transaction ID', 'Date & Time', 'Customer', 'Type', 'Points', 'Cash Value', 'Balance After'].join(','),
      ...filteredTransactions.map(t => [
        t.id,
        new Date(t.dateTime).toLocaleString(),
        t.customerName,
        t.type,
        t.points,
        t.cashEquivalentValue,
        t.walletBalanceAfter
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout 
      title="Transaction Logs" 
      subtitle="View and manage customer transaction history"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{filteredTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points Added</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{totalCredits.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points Redeemed</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{totalRedemptions.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Points</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{(totalCredits - totalRedemptions).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
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
                placeholder="Search by customer name..."
                icon={Search}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'credit' | 'redemption')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits Only</option>
                <option value="redemption">Redemptions Only</option>
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

        {/* Transaction List */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cash Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance After
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">#{transaction.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.dateTime).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{transaction.customerName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        transaction.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}{transaction.points.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">${transaction.cashEquivalentValue.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600">
                        {transaction.walletBalanceAfter.toLocaleString()} pts
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
    </Layout>
  );
};