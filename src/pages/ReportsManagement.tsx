import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Plus,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Report } from '../types';

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Customer Report',
    type: 'customer',
    dateRange: { from: '2024-11-01', to: '2024-11-30' },
    generatedBy: 'Alex Martinez',
    generatedAt: '2024-12-01T10:30:00Z',
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Transaction Analysis Q4',
    type: 'transaction',
    dateRange: { from: '2024-10-01', to: '2024-12-31' },
    generatedBy: 'Alex Martinez',
    generatedAt: '2024-12-15T14:20:00Z',
    status: 'generating'
  },
  {
    id: '3',
    title: 'Branch Performance Report',
    type: 'branch',
    dateRange: { from: '2024-11-01', to: '2024-11-30' },
    generatedBy: 'Alex Martinez',
    generatedAt: '2024-12-10T09:15:00Z',
    status: 'completed',
    downloadUrl: '#'
  }
];

export const ReportsManagement: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'customer' as Report['type'],
    dateRange: { from: '', to: '' }
  });

  const filteredReports = reports.filter(report => 
    filterType === 'all' || report.type === filterType
  );

  const handleCreateReport = () => {
    const report: Report = {
      id: Date.now().toString(),
      ...newReport,
      generatedBy: 'Alex Martinez',
      generatedAt: new Date().toISOString(),
      status: 'generating'
    };
    
    setReports([report, ...reports]);
    setNewReport({
      title: '',
      type: 'customer',
      dateRange: { from: '', to: '' }
    });
    setShowCreateModal(false);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === report.id 
          ? { ...r, status: 'completed' as const, downloadUrl: '#' }
          : r
      ));
    }, 3000);
  };

  const handleDeleteReport = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== reportId));
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'generating':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'generating':
        return 'Generating...';
      case 'failed':
        return 'Failed';
    }
  };

  const CreateReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Report</h2>
        
        <div className="space-y-4">
          <Input
            label="Report Title"
            value={newReport.title}
            onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter report title"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newReport.type}
              onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value as Report['type'] }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="customer">Customer Report</option>
              <option value="transaction">Transaction Report</option>
              <option value="revenue">Revenue Report</option>
              <option value="branch">Branch Report</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={newReport.dateRange.from}
                onChange={(e) => setNewReport(prev => ({ 
                  ...prev, 
                  dateRange: { ...prev.dateRange, from: e.target.value }
                }))}
                required
              />
              <Input
                type="date"
                value={newReport.dateRange.to}
                onChange={(e) => setNewReport(prev => ({ 
                  ...prev, 
                  dateRange: { ...prev.dateRange, to: e.target.value }
                }))}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button onClick={handleCreateReport} className="flex-1">
            Generate Report
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
      title="Reports Management" 
      subtitle="Generate and manage business reports"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Reports</option>
              <option value="customer">Customer Reports</option>
              <option value="transaction">Transaction Reports</option>
              <option value="revenue">Revenue Reports</option>
              <option value="branch">Branch Reports</option>
            </select>
          </div>
          
          <Button icon={Plus} onClick={() => setShowCreateModal(true)}>
            Create Report
          </Button>
        </div>

        {/* Quick Report Templates */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Daily Summary', type: 'Today\'s activity overview', icon: Calendar },
              { title: 'Weekly Performance', type: 'Last 7 days analysis', icon: FileText },
              { title: 'Monthly Report', type: 'Complete month breakdown', icon: FileText },
              { title: 'Customer Analytics', type: 'Customer behavior insights', icon: FileText }
            ].map((template, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <template.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{template.title}</p>
                    <p className="text-sm text-gray-500">{template.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reports List */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{report.title}</p>
                          <p className="text-sm text-gray-500">ID: {report.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(report.dateRange.from).toLocaleDateString()} - {new Date(report.dateRange.to).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(report.status)}
                        <span className="text-sm text-gray-900">{getStatusText(report.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(report.generatedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {report.generatedBy}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {report.status === 'completed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            icon={Download}
                          >
                            Download
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={Eye}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={Trash2}
                          onClick={() => handleDeleteReport(report.id)}
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

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <Card className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-4">
              {filterType !== 'all' 
                ? 'No reports match your current filter.' 
                : 'Get started by creating your first report.'
              }
            </p>
            <Button icon={Plus} onClick={() => setShowCreateModal(true)}>
              Create Your First Report
            </Button>
          </Card>
        )}

        {/* Create Report Modal */}
        {showCreateModal && (
          <CreateReportModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </Layout>
  );
};