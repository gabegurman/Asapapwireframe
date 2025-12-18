export type DocumentStatus = 
  | 'pending_review' 
  | 'in_review' 
  | 'pending_approval' 
  | 'approved' 
  | 'exception' 
  | 'posted' 
  | 'rejected';

export type ExceptionType = 
  | 'duplicate' 
  | 'missing_po' 
  | 'amount_mismatch' 
  | 'vendor_mismatch' 
  | 'low_confidence'
  | 'invalid_date'
  | 'coding_error';

export type ExceptionSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Document {
  id: string;
  thumbnail: string;
  vendor: string;
  vendorId?: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  status: DocumentStatus;
  confidenceScore: number;
  uploadedDate: string;
  uploadedBy: string;
  assignedTo?: string;
  subtotal?: number;
  tax?: number;
  glAccount?: string;
  costCenter?: string;
  lineItems?: LineItem[];
  extractedFields?: ExtractedField[];
  comments?: Comment[];
  erpId?: string;
  syncStatus?: 'synced' | 'pending' | 'error';
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  glAccount?: string;
  costCenter?: string;
}

export interface ExtractedField {
  fieldName: string;
  value: string;
  confidence: number;
  coordinates?: { x: number; y: number; width: number; height: number };
}

export interface Comment {
  id: string;
  user: string;
  timestamp: string;
  text: string;
}

export interface Vendor {
  id: string;
  name: string;
  active: boolean;
  email?: string;
  phone?: string;
  address?: string;
  defaultGLAccount?: string;
  paymentTerms?: string;
  autoCodingRules?: AutoCodingRule[];
  totalInvoices: number;
  accuracyRate: number;
  recentInvoices?: Document[];
}

export interface AutoCodingRule {
  id: string;
  condition: string;
  glAccount: string;
  costCenter?: string;
  enabled: boolean;
}

export interface Exception {
  id: string;
  documentId: string;
  document: Document;
  type: ExceptionType;
  severity: ExceptionSeverity;
  description: string;
  suggestedFix?: string;
  owner?: string;
  age: number; // days
  createdDate: string;
}

export interface Approval {
  id: string;
  document: Document;
  requiredApprover: string;
  priority: 'low' | 'medium' | 'high';
  slaHours: number;
  hoursRemaining: number;
  submittedDate: string;
  submittedBy: string;
}

export interface KPI {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Activity {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  documentId?: string;
  details?: string;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  icon: string;
  value?: string | number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  field: string;
  oldValue: string;
  newValue: string;
  action: 'created' | 'updated' | 'approved' | 'rejected' | 'posted';
}

export type Screen = 
  | 'dashboard' 
  | 'inbox' 
  | 'document-review' 
  | 'vendors' 
  | 'approvals' 
  | 'exceptions' 
  | 'bills' 
  | 'reports' 
  | 'settings';
