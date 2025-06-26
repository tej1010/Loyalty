export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  branchId?: string;
  role: 'branch_worker' | 'merchant_owner' | 'employee';
  profileImage?: string;
  isActive: boolean;
}

export interface MerchantOwner extends User {
  role: 'merchant_owner';
  businessInfo: {
    businessImage?: string;
    businessName: string;
    address: string;
    contactInfo: string;
    legalDocs?: string[];
  };
}

export interface BranchWorker extends User {
  role: 'branch_worker';
  branchId: string;
  assignedBy: string;
}

export interface Employee extends User {
  role: 'employee';
  department: string;
  permissions: string[];
  managerId?: string;
  accessLevel: 'standard' | 'senior' | 'manager';
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  dateOfRegistration: string;
  transactionCount: number;
  firstTransaction: {
    amount: number;
    branch: string;
    date: string;
  } | null;
  lastTransaction: {
    amount: number;
    branch: string;
    date: string;
  } | null;
  inactiveFor: string;
  walletBalance: number;
  loyaltyCardQRCode: string;
  branchId: string;
  branchName: string;
  assignedWorkerName: string;
  isActive: boolean;
}

export interface Branch {
  id: string;
  name: string;
  image?: string;
  city: string;
  state: string;
  address: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  merchantId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'credit' | 'redemption';
  points: number;
  cashEquivalentValue: number;
  walletBalanceAfter: number;
  dateTime: string;
  branchId: string;
  branchName: string;
  assignedWorkerName: string;
  adminCommissionValue: number;
}

export interface DashboardStats {
  totalCustomers: number;
  todayTransactions: number;
  monthlyTransactions: number;
  qrCodeUrl: string;
}

export interface MerchantDashboardStats {
  totalBranches: number;
  totalWorkers: number;
  totalCreditsIssued: number;
  totalCreditsRedeemed: number;
  totalTransactions: number;
  totalRevenue: number;
  commissionPercentage: number;
}

export interface EmployeeDashboardStats {
  totalCustomers: number;
  totalBranches: number;
  totalWorkers: number;
  totalTransactions: number;
  todayTransactions: number;
  monthlyRevenue: number;
  averageTransactionValue: number;
  customerGrowthRate: number;
}

export interface PointsConfiguration {
  pointsToRiyalRate: number;
  maxPointBalance: number;
  maxDailyRedemption: number;
  maxCustomersLimit: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface Report {
  id: string;
  title: string;
  type: 'customer' | 'transaction' | 'revenue' | 'branch';
  dateRange: {
    from: string;
    to: string;
  };
  generatedBy: string;
  generatedAt: string;
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
}