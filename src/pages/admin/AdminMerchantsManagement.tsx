import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  UserX, 
  UserCheck, 
  CheckCircle, 
  XCircle,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Palette
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MerchantRequest } from '../../types/admin';

// Mock merchant requests data
const mockMerchantRequests: MerchantRequest[] = [
  {
    id: '1',
    personalInfo: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@coffeecorner.com',
      phoneNumber: '+1-555-0201'
    },
    businessInfo: {
      businessName: 'Coffee Corner LLC',
      address: '123 Main Street, Downtown, New York, NY 10001',
      contactInfo: '+1-555-0200',
      legalDocs: ['business-license.pdf', 'registration.pdf']
    },
    status: 'pending',
    submittedAt: '2024-12-15T10:30:00Z'
  },
  {
    id: '2',
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@techsolutions.com',
      phoneNumber: '+1-555-0301'
    },
    businessInfo: {
      businessName: 'Tech Solutions Inc',
      address: '456 Tech Avenue, Silicon Valley, CA 94000',
      contactInfo: '+1-555-0300',
      legalDocs: ['incorporation.pdf', 'tax-id.pdf']
    },
    status: 'approved',
    submittedAt: '2024-12-10T14:20:00Z',
    reviewedAt: '2024-12-12T09:15:00Z',
    reviewedBy: 'admin-1',
    commissionPercentage: 5,
    brandingColors: {
      primary: '#3B82F6',
      secondary: '#1E40AF'
    }
  },
  {
    id: '3',
    personalInfo: {
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike@fashionboutique.com',
      phoneNumber: '+1-555-0401'
    },
    businessInfo: {
      businessName: 'Fashion Boutique',
      address: '789 Fashion Street, Los Angeles, CA 90210',
      contactInfo: '+1-555-0400',
      legalDocs: ['business-permit.pdf']
    },
    status: 'rejected',
    submittedAt: '2024-12-08T16:45:00Z',
    reviewedAt: '2024-12-09T11:30:00Z',
    reviewedBy: 'admin-1',
    rejectionReason: 'Incomplete documentation provided'
  }
];

export const AdminMerchantsManagement: React.FC = () => {
  const [merchants, setMerchants] = useState(mockMerchantRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantRequest | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState<MerchantRequest | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState<MerchantRequest | null>(null);

  const [approvalData, setApprovalData] = useState({
    commissionPercentage: 5,
    brandingColors: {
      primary: '#3B82F6',
      secondary: '#1E40AF'
    },
    businessLogo: ''
  });

  const [rejectionReason, setRejectionReason] = useState('');

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.businessInfo.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveMerchant = (merchantId: string) => {
    setMerchants(merchants.map(merchant => 
      merchant.id === merchantId 
        ? { 
            ...merchant, 
            status: 'approved' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'admin-1',
            ...approvalData
          }
        : merchant
    ));
    setShowApprovalModal(null);
    setApprovalData({
      commissionPercentage: 5,
      brandingColors: { primary: '#3B82F6', secondary: '#1E40AF' },
      businessLogo: ''
    });
  };

  const handleRejectMerchant = (merchantId: string) => {
    setMerchants(merchants.map(merchant => 
      merchant.id === merchantId 
        ? { 
            ...merchant, 
            status: 'rejected' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'admin-1',
            rejectionReason
          }
        : merchant
    ));
    setShowRejectionModal(null);
    setRejectionReason('');
  };

  const getStatusIcon = (status: MerchantRequest['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <div className="w-5 h-5 bg-yellow-400 rounded-full" />;
    }
  };

  const MerchantDetailsModal: React.FC<{ merchant: MerchantRequest; onClose: () => void }> = ({ merchant, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Merchant Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.personalInfo.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.personalInfo.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.personalInfo.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.personalInfo.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Business Name</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.businessInfo.businessName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.businessInfo.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contact Information</label>
                <p className="text-sm text-gray-900 mt-1">{merchant.businessInfo.contactInfo}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Legal Documents</label>
                <div className="mt-1 space-y-1">
                  {merchant.businessInfo.legalDocs.map((doc, index) => (
                    <p key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">{doc}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(merchant.status)}
                  <span className="text-sm text-gray-900 capitalize">{merchant.status}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Submitted At</label>
                <p className="text-sm text-gray-900 mt-1">{new Date(merchant.submittedAt).toLocaleString()}</p>
              </div>
              {merchant.reviewedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Reviewed At</label>
                  <p className="text-sm text-gray-900 mt-1">{new Date(merchant.reviewedAt).toLocaleString()}</p>
                </div>
              )}
              {merchant.commissionPercentage && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Commission %</label>
                  <p className="text-sm text-gray-900 mt-1">{merchant.commissionPercentage}%</p>
                </div>
              )}
            </div>
            {merchant.rejectionReason && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Rejection Reason</label>
                <p className="text-sm text-red-600 mt-1">{merchant.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ApprovalModal: React.FC<{ merchant: MerchantRequest; onClose: () => void }> = ({ merchant, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Approve Merchant</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commission Percentage <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={approvalData.commissionPercentage}
              onChange={(e) => setApprovalData(prev => ({ ...prev, commissionPercentage: parseFloat(e.target.value) }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Brand Color</label>
            <input
              type="color"
              value={approvalData.brandingColors.primary}
              onChange={(e) => setApprovalData(prev => ({ 
                ...prev, 
                brandingColors: { ...prev.brandingColors, primary: e.target.value }
              }))}
              className="block w-full h-10 rounded-lg border border-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Brand Color</label>
            <input
              type="color"
              value={approvalData.brandingColors.secondary}
              onChange={(e) => setApprovalData(prev => ({ 
                ...prev, 
                brandingColors: { ...prev.brandingColors, secondary: e.target.value }
              }))}
              className="block w-full h-10 rounded-lg border border-gray-300"
            />
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button
            onClick={() => handleApproveMerchant(merchant.id)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            Approve
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  const RejectionModal: React.FC<{ merchant: MerchantRequest; onClose: () => void }> = ({ merchant, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Reject Merchant</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Please provide a reason for rejection..."
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button
            onClick={() => handleRejectMerchant(merchant.id)}
            disabled={!rejectionReason.trim()}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Reject
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout 
      title="Merchants Management" 
      subtitle="Manage merchant accounts and approval requests"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search merchants..."
              icon={Search}
              className="w-64"
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{merchants.length}</p>
            <p className="text-sm text-gray-600">Total Requests</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {merchants.filter(m => m.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {merchants.filter(m => m.status === 'approved').length}
            </p>
            <p className="text-sm text-gray-600">Approved</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {merchants.filter(m => m.status === 'rejected').length}
            </p>
            <p className="text-sm text-gray-600">Rejected</p>
          </Card>
        </div>

        {/* Merchants Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{merchant.businessInfo.businessName}</p>
                          <p className="text-sm text-gray-500">ID: #{merchant.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {merchant.personalInfo.firstName} {merchant.personalInfo.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{merchant.personalInfo.email}</p>
                        <p className="text-sm text-gray-500">{merchant.personalInfo.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(merchant.status)}
                        <span className={`text-sm font-medium capitalize ${
                          merchant.status === 'approved' ? 'text-emerald-600' :
                          merchant.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {merchant.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(merchant.submittedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={Eye}
                          onClick={() => setSelectedMerchant(merchant)}
                        >
                          View
                        </Button>
                        {merchant.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              icon={CheckCircle}
                              onClick={() => setShowApprovalModal(merchant)}
                              className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              icon={XCircle}
                              onClick={() => setShowRejectionModal(merchant)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modals */}
        {selectedMerchant && (
          <MerchantDetailsModal
            merchant={selectedMerchant}
            onClose={() => setSelectedMerchant(null)}
          />
        )}

        {showApprovalModal && (
          <ApprovalModal
            merchant={showApprovalModal}
            onClose={() => setShowApprovalModal(null)}
          />
        )}

        {showRejectionModal && (
          <RejectionModal
            merchant={showRejectionModal}
            onClose={() => setShowRejectionModal(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};