import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, EyeOff, User } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BranchWorker, Branch } from '../types';

// Mock data
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
    branchId: 'branch-3',
    role: 'branch_worker',
    isActive: false,
    assignedBy: 'merchant-1'
  }
];

const mockBranches: Branch[] = [
  { id: 'branch-1', name: 'Downtown Branch', city: 'New York', state: 'NY', address: '123 Main St', merchantId: 'merchant-1', isActive: true, createdAt: '2024-01-01' },
  { id: 'branch-2', name: 'Mall Branch', city: 'New York', state: 'NY', address: '456 Mall Ave', merchantId: 'merchant-1', isActive: true, createdAt: '2024-01-02' },
  { id: 'branch-3', name: 'Airport Branch', city: 'New York', state: 'NY', address: '789 Airport Rd', merchantId: 'merchant-1', isActive: true, createdAt: '2024-01-03' }
];

export const WorkersManagement: React.FC = () => {
  const [workers, setWorkers] = useState(mockWorkers);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState<BranchWorker | null>(null);

  const [newWorker, setNewWorker] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    branchId: '',
    profileImage: ''
  });

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === 'all' || worker.branchId === branchFilter;
    return matchesSearch && matchesBranch;
  });

  const handleAddWorker = () => {
    const worker: BranchWorker = {
      id: Date.now().toString(),
      ...newWorker,
      role: 'branch_worker',
      isActive: true,
      assignedBy: 'merchant-1'
    };
    setWorkers([...workers, worker]);
    setNewWorker({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      branchId: '',
      profileImage: ''
    });
    setShowAddModal(false);
  };

  const handleToggleActive = (workerId: string) => {
    setWorkers(workers.map(worker => 
      worker.id === workerId ? { ...worker, isActive: !worker.isActive } : worker
    ));
  };

  const handleDeleteWorker = (workerId: string) => {
    if (confirm('Are you sure you want to delete this worker?')) {
      setWorkers(workers.filter(worker => worker.id !== workerId));
    }
  };

  const getBranchName = (branchId: string) => {
    return mockBranches.find(branch => branch.id === branchId)?.name || 'Unknown Branch';
  };

  const AddWorkerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Worker</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={newWorker.firstName}
              onChange={(e) => setNewWorker(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
            <Input
              label="Last Name"
              value={newWorker.lastName}
              onChange={(e) => setNewWorker(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
          
          <Input
            label="Email Address"
            type="email"
            value={newWorker.email}
            onChange={(e) => setNewWorker(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          
          <Input
            label="Phone Number"
            value={newWorker.phoneNumber}
            onChange={(e) => setNewWorker(prev => ({ ...prev, phoneNumber: e.target.value }))}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Branch <span className="text-red-500">*</span>
            </label>
            <select
              value={newWorker.branchId}
              onChange={(e) => setNewWorker(prev => ({ ...prev, branchId: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select a branch</option>
              {mockBranches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button onClick={handleAddWorker} className="flex-1">
            Add Worker
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
      title="Workers Management" 
      subtitle="Manage branch workers and their assignments"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search workers..."
              icon={Search}
              className="w-64"
            />
            
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Branches</option>
              {mockBranches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>
          
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Worker
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{workers.length}</p>
            <p className="text-sm text-gray-600">Total Workers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{workers.filter(w => w.isActive).length}</p>
            <p className="text-sm text-gray-600">Active Workers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{workers.filter(w => !w.isActive).length}</p>
            <p className="text-sm text-gray-600">Inactive Workers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{mockBranches.length}</p>
            <p className="text-sm text-gray-600">Total Branches</p>
          </Card>
        </div>

        {/* Workers Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Worker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
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
                {filteredWorkers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {worker.firstName} {worker.lastName}
                          </p>
                          <p className="text-sm text-gray-500">ID: {worker.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{worker.email}</p>
                        <p className="text-sm text-gray-500">{worker.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{getBranchName(worker.branchId)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        worker.isActive 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {worker.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={Edit}
                          onClick={() => setEditingWorker(worker)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={worker.isActive ? EyeOff : Eye}
                          onClick={() => handleToggleActive(worker.id)}
                        >
                          {worker.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={Trash2}
                          onClick={() => handleDeleteWorker(worker.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modals */}
        {showAddModal && (
          <AddWorkerModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </Layout>
  );
};