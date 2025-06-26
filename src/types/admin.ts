export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: 'admin';
  isActive: boolean;
}

export interface MerchantRequest {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  businessInfo: {
    businessName: string;
    address: string;
    contactInfo: string;
    legalDocs: string[];
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  commissionPercentage?: number;
  brandingColors?: {
    primary: string;
    secondary: string;
  };
  businessLogo?: string;
}

export interface AdminDashboardStats {
  totalMerchants: number;
  pendingMerchantRequests: number;
  totalBranches: number;
  totalCreditsLoaded: number;
  totalCreditsRedeemed: number;
  totalCustomers: number;
  totalCommissionCollected: number;
  pendingCommissionAmount: number;
}

export interface AdminTransaction extends Transaction {
  merchantName: string;
  payStatus: 'paid' | 'unpaid';
}

export interface CommissionPayment {
  id: string;
  transactionIds: string[];
  merchantId: string;
  merchantName: string;
  totalAmount: number;
  paidAt: string;
  paidBy: string;
}