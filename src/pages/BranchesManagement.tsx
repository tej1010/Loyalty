import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Building, MapPin } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Branch, BranchWorker } from '../types';

// Mock data
const mockBranches: Branch[] = [
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
    city: 'New York',
    state: 'NY',
    address: '789 Airport Road, Terminal 1, New York, NY 10003',
    merchantId: 'merchant-1',
    isActive: true,
    createdAt: '2024-02-15'
  }
];

const mockWorkers: BranchWorker[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@branch.com',
    phoneNumber: '+1-555-0123',
    branchId: 'branch-1',
    role: 'branch_worker',
    isActive: true,
    assignedBy: 'merchant-1'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@branch.com',
    phoneNumber: '+1-555-0124',
    branchId: 'branch-2',
    role: 'branch_worker',
    isActive: true,
    assignedBy: 'merchant-1'
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@branch.com',
    phoneNumber: '+1-555-0125',
    branchId: '',
    role: 'branch_worker',
    isActive: true,
    assignedBy: 'merchant-1'
  }
];

export const BranchesManagement: React.FC = () => {
  const [branches, setBranches] = useState(mockBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const [newBranch, setNewBranch] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
    assignedWorkerId: '',
    image: ''
  });

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter === 'all' || branch.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const availableWorkers = mockWorkers.filter(worker => 
    !branches.some(branch => branch.assignedWorkerId === worker.id) || 
    worker.id === newBranch.assignedWorkerId
  );

  const handleAddBranch = () => {
    const assignedWorker = mockWorkers.find(w => w.id === newBranch.assignedWorkerId);
    const branch: Branch = {
      id: Date.now().toString(),
      ...newBranch,
      assignedWorkerName: assignedWorker ? `${assignedWorker.firstName} ${assignedWorker.lastName}` : undefined,
      merchantId: 'merchant-1',
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setBranches([...branches, branch]);
    setNewBranch({
      name: '',
      city: '',
      state: '',
      address: '',
      assignedWorkerId: '',
      image: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteBranch = (branchId: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(branch => branch.id !== branchId));
    }
  };

  const uniqueCities = [...new Set(branches.map(branch => branch.city))];

  const AddBranchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Branch</h2>
        
        <div className="space-y-4">
          <Input
            label="Branch Name"
            value={newBranch.name}
            onChange={(e) => setNewBranch(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={newBranch.city}
              onChange={(e) => setNewBranch(prev => ({ ...prev, city: e.target.value }))}
              required
            />
            <Input
              label="State"
              value={newBranch.state}
              onChange={(e) => setNewBranch(prev => ({ ...prev, state: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={newBranch.address}
              onChange={(e) => setNewBranch(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter complete branch address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Worker
            </label>
            <select
              value={newBranch.assignedWorkerId}
              onChange={(e) => setNewBranch(prev => ({ ...prev, assignedWorkerId: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a worker (optional)</option>
              {availableWorkers.map(worker => (
                <option key={worker.id} value={worker.id}>
                  {worker.firstName} {worker.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button onClick={handleAddBranch} className="flex-1">
            Add Branch
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      title="Branches Management" 
      subtitle="Manage your business branches and locations"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search branches..."
              icon={Search}
              className="w-64"
            />
            
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Branch
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{branches.length}</p>
            <p className="text-sm text-gray-600">Total Branches</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {branches.filter(b => b.assignedWorkerId).length}
            </p>
            <p className="text-sm text-gray-600">With Assigned Workers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {branches.filter(b => !b.assignedWorkerId).length}
            </p>
            <p className="text-sm text-gray-600">Unassigned</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{uniqueCities.length}</p>
            <p className="text-sm text-gray-600">Cities</p>
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
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" icon={Edit}>
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      icon={Trash2}
                      onClick={() => handleDeleteBranch(branch.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">{branch.address}</p>
                  
                  {branch.assignedWorkerName ? (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Assigned Worker:</span>
                      <span className="font-medium text-gray-900">{branch.assignedWorkerName}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className="text-orange-600 font-medium">Unassigned</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900">{new Date(branch.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBranches.length === 0 && (
          <Card className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || cityFilter !== 'all' 
                ? 'Try adjusting your search criteria.' 
                : 'Get started by adding your first branch.'
              }
            </p>
            {!searchTerm && cityFilter === 'all' && (
              <Button icon={Plus} onClick={() => setShowAddModal(true)}>
                Add Your First Branch
              </Button>
            )}
          </Card>
        )}

        {/* Modals */}
        {showAddModal && (
          <AddBranchModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </Layout>
  );
};