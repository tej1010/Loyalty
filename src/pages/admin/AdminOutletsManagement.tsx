import React, { useState } from 'react';
import { Search, Filter, Eye, UserX, UserCheck, Building, MapPin } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Branch } from '../../types';

// Mock branches data for admin view
const mockAdminBranches: Branch[] = [
  {
    id: 'branch-1',
    name: 'Downtown Branch',
    city: 'New York',
    state: 'NY',
    address: '123 Main Street, Downtown, New York, NY 10001',
    assignedWorkerId: '1',
    assignedWorkerName: 'John Doe',
    merchantId: 'merchant-1',
    isActive: true,
    createdAt: '2024-01-15',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'branch-2',
    name: 'Mall Branch',
    city: 'New York',
    state: 'NY',
    address: '456 Mall Avenue, Shopping District, New York, NY 10002',
    assignedWorkerId: '2',
    assignedWorkerName: 'Jane Smith',
    merchantId: 'merchant-1',
    isActive: true,
    createdAt: '2024-02-01',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'branch-3',
    name: 'Airport Branch',
    city: 'Los Angeles',
    state: 'CA',
    address: '789 Airport Road, Terminal 1, Los Angeles, CA 90001',
    merchantId: 'merchant-2',
    isActive: false,
    createdAt: '2024-02-15'
  },
  {
    id: 'branch-4',
    name: 'Fashion Store Main',
    city: 'Los Angeles',
    state: 'CA',
    address: '321 Fashion Street, Beverly Hills, CA 90210',
    assignedWorkerId: '3',
    assignedWorkerName: 'Bob Wilson',
    merchantId: 'merchant-3',
    isActive: true,
    createdAt: '2024-03-01'
  }
];

// Mock merchants for filtering
const mockMerchants = [
  { id: 'merchant-1', name: 'Coffee Corner LLC' },
  { id: 'merchant-2', name: 'Tech Solutions Inc' },
  { id: 'merchant-3', name: 'Fashion Boutique' }
];

export const AdminOutletsManagement: React.FC = () => {
  const [branches, setBranches] = useState(mockAdminBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMerchant = merchantFilter === 'all' || branch.merchantId === merchantFilter;
    const matchesCity = cityFilter === 'all' || branch.city === cityFilter;
    const matchesState = stateFilter === 'all' || branch.state === stateFilter;
    
    return matchesSearch && matchesMerchant && matchesCity && matchesState;
  });

  const handleToggleActive = (branchId: string) => {
    setBranches(branches.map(branch => 
      branch.id === branchId ? { ...branch, isActive: !branch.isActive } : branch
    ));
  };

  const getMerchantName = (merchantId: string) => {
    return mockMerchants.find(merchant => merchant.id === merchantId)?.name || 'Unknown Merchant';
  };

  const uniqueCities = [...new Set(branches.map(branch => branch.city))];
  const uniqueStates = [...new Set(branches.map(branch => branch.state))];

  const BranchDetailsModal: React.FC<{ branch: Branch; onClose: () => void }> = ({ branch, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Branch Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Branch Image */}
          {branch.image && (
            <div className="text-center">
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Branch Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Branch ID</label>
                <p className="text-sm text-gray-900 mt-1 font-mono">#{branch.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Branch Name</label>
                <p className="text-sm text-gray-900 mt-1">{branch.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">City</label>
                <p className="text-sm text-gray-900 mt-1">{branch.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">State</label>
                <p className="text-sm text-gray-900 mt-1">{branch.state}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <p className="text-sm text-gray-900 mt-1">{branch.address}</p>
              </div>
            </div>
          </div>

          {/* Merchant Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Merchant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Merchant Name</label>
                <p className="text-sm text-gray-900 mt-1">{getMerchantName(branch.merchantId)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Assigned Worker</label>
                <p className="text-sm text-gray-900 mt-1">
                  {branch.assignedWorkerName || 'Not Assigned'}
                </p>
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    branch.isActive 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Created Date</label>
                <p className="text-sm text-gray-900 mt-1">{new Date(branch.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout 
      title="Outlets Management" 
      subtitle="Manage merchant outlets and branches across all locations"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search branches..."
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

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{filteredBranches.length}</p>
            <p className="text-sm text-gray-600">Total Outlets</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {filteredBranches.filter(b => b.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Active Outlets</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {filteredBranches.filter(b => !b.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Inactive Outlets</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {filteredBranches.filter(b => b.assignedWorkerName).length}
            </p>
            <p className="text-sm text-gray-600">With Workers</p>
          </Card>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <Card key={branch.id} className="overflow-hidden">
              {branch.image && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {branch.city}, {branch.state}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    branch.isActive 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Merchant:</span>
                    <span className="font-medium text-gray-900">{getMerchantName(branch.merchantId)}</span>
                  </div>
                  
                  {branch.assignedWorkerName ? (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Worker:</span>
                      <span className="font-medium text-gray-900">{branch.assignedWorkerName}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Worker:</span>
                      <span className="text-orange-600 font-medium">Unassigned</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900">{new Date(branch.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Eye}
                    onClick={() => setSelectedBranch(branch)}
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={branch.isActive ? UserX : UserCheck}
                    onClick={() => handleToggleActive(branch.id)}
                  >
                    {branch.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBranches.length === 0 && (
          <Card className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No outlets found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </Card>
        )}

        {/* Branch Details Modal */}
        {selectedBranch && (
          <BranchDetailsModal
            branch={selectedBranch}
            onClose={() => setSelectedBranch(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};