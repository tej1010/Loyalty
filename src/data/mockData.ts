import { Customer, Transaction, DashboardStats, MerchantDashboardStats } from '../types';

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 2847,
  todayTransactions: 156,
  monthlyTransactions: 3892,
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://loyaltyapp.com/register/branch-1'
};

export const mockMerchantDashboardStats: MerchantDashboardStats = {
  totalBranches: 5,
  totalWorkers: 12,
  totalCreditsIssued: 125000,
  totalCreditsRedeemed: 87500,
  totalTransactions: 2847,
  totalRevenue: 15750.50,
  commissionPercentage: 5
};

export const mockCustomers: Customer[] = [
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
    isActive: true
  }
];

export const mockTransactions: Transaction[] = [
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
    adminCommissionValue: 1.25
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
    adminCommissionValue: 0.75
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
    adminCommissionValue: 1.00
  }
];