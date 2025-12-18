import type { 
  Document, 
  Vendor, 
  Exception, 
  Approval, 
  KPI, 
  Activity, 
  Report,
  AuditEntry 
} from '../types';

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'Office Supplies Inc',
    vendorId: 'vendor-001',
    invoiceNumber: 'INV-2024-1234',
    invoiceDate: '2024-12-10',
    dueDate: '2024-12-25',
    amount: 1250.50,
    subtotal: 1150.00,
    tax: 100.50,
    status: 'pending_review',
    confidenceScore: 98,
    uploadedDate: '2024-12-15T09:30:00',
    uploadedBy: 'system',
    glAccount: '6100',
    costCenter: 'ADMIN',
    extractedFields: [
      { fieldName: 'Vendor', value: 'Office Supplies Inc', confidence: 98 },
      { fieldName: 'Invoice Number', value: 'INV-2024-1234', confidence: 99 },
      { fieldName: 'Invoice Date', value: '2024-12-10', confidence: 97 },
      { fieldName: 'Total', value: '1250.50', confidence: 99 }
    ],
    lineItems: [
      { id: 'li-001', description: 'Printer Paper (10 reams)', quantity: 10, unitPrice: 45.00, amount: 450.00 },
      { id: 'li-002', description: 'Toner Cartridges', quantity: 4, unitPrice: 125.00, amount: 500.00 },
      { id: 'li-003', description: 'File Folders', quantity: 20, unitPrice: 10.00, amount: 200.00 }
    ]
  },
  {
    id: 'doc-002',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'Cloud Services LLC',
    vendorId: 'vendor-002',
    invoiceNumber: 'CS-987654',
    invoiceDate: '2024-12-01',
    dueDate: '2024-12-31',
    amount: 5499.00,
    subtotal: 4999.00,
    tax: 500.00,
    status: 'pending_approval',
    confidenceScore: 95,
    uploadedDate: '2024-12-14T14:20:00',
    uploadedBy: 'john.doe',
    assignedTo: 'manager@company.com',
    glAccount: '6200',
    costCenter: 'IT'
  },
  {
    id: 'doc-003',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'ABC Manufacturing',
    vendorId: 'vendor-003',
    invoiceNumber: 'MFG-45678',
    invoiceDate: '2024-11-28',
    dueDate: '2024-12-28',
    amount: 12750.00,
    status: 'exception',
    confidenceScore: 72,
    uploadedDate: '2024-12-13T11:15:00',
    uploadedBy: 'system'
  },
  {
    id: 'doc-004',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'Utilities Corp',
    vendorId: 'vendor-004',
    invoiceNumber: 'UTIL-2024-12',
    invoiceDate: '2024-12-05',
    dueDate: '2024-12-20',
    amount: 892.35,
    status: 'approved',
    confidenceScore: 99,
    uploadedDate: '2024-12-12T08:45:00',
    uploadedBy: 'system',
    glAccount: '6300',
    costCenter: 'FACILITIES'
  },
  {
    id: 'doc-005',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'Marketing Agency Pro',
    vendorId: 'vendor-005',
    invoiceNumber: 'MKT-Q4-2024',
    invoiceDate: '2024-12-08',
    dueDate: '2024-12-23',
    amount: 8500.00,
    status: 'in_review',
    confidenceScore: 94,
    uploadedDate: '2024-12-15T16:00:00',
    uploadedBy: 'jane.smith',
    assignedTo: 'review.team@company.com',
    glAccount: '6400'
  },
  {
    id: 'doc-006',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'Office Supplies Inc',
    vendorId: 'vendor-001',
    invoiceNumber: 'INV-2024-1189',
    invoiceDate: '2024-11-25',
    dueDate: '2024-12-10',
    amount: 675.25,
    status: 'posted',
    confidenceScore: 99,
    uploadedDate: '2024-11-26T10:30:00',
    uploadedBy: 'system',
    erpId: 'ERP-98765',
    syncStatus: 'synced'
  },
  {
    id: 'doc-007',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'Legal Services Inc',
    vendorId: 'vendor-006',
    invoiceNumber: 'LEG-2024-456',
    invoiceDate: '2024-12-12',
    dueDate: '2024-12-27',
    amount: 15000.00,
    status: 'pending_approval',
    confidenceScore: 96,
    uploadedDate: '2024-12-15T13:20:00',
    uploadedBy: 'admin',
    assignedTo: 'cfo@company.com'
  },
  {
    id: 'doc-008',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4551b8dc?w=200&h=280',
    vendor: 'ABC Manufacturing',
    vendorId: 'vendor-003',
    invoiceNumber: 'MFG-45679',
    invoiceDate: '2024-12-14',
    dueDate: '2025-01-14',
    amount: 9875.50,
    status: 'pending_review',
    confidenceScore: 88,
    uploadedDate: '2024-12-16T07:15:00',
    uploadedBy: 'system'
  }
];

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'vendor-001',
    name: 'Office Supplies Inc',
    active: true,
    email: 'ap@officesupplies.com',
    phone: '555-0123',
    address: '123 Business Park, Suite 100, NY 10001',
    defaultGLAccount: '6100',
    paymentTerms: 'Net 15',
    totalInvoices: 45,
    accuracyRate: 98.5,
    autoCodingRules: [
      { id: 'rule-001', condition: 'Amount < 500', glAccount: '6100', costCenter: 'ADMIN', enabled: true },
      { id: 'rule-002', condition: 'Description contains "Toner"', glAccount: '6100', costCenter: 'IT', enabled: true }
    ]
  },
  {
    id: 'vendor-002',
    name: 'Cloud Services LLC',
    active: true,
    email: 'billing@cloudservices.com',
    phone: '555-0456',
    address: '456 Tech Avenue, San Francisco, CA 94105',
    defaultGLAccount: '6200',
    paymentTerms: 'Net 30',
    totalInvoices: 12,
    accuracyRate: 96.2,
    autoCodingRules: [
      { id: 'rule-003', condition: 'Always', glAccount: '6200', costCenter: 'IT', enabled: true }
    ]
  },
  {
    id: 'vendor-003',
    name: 'ABC Manufacturing',
    active: true,
    email: 'invoices@abcmfg.com',
    phone: '555-0789',
    defaultGLAccount: '5000',
    paymentTerms: 'Net 45',
    totalInvoices: 28,
    accuracyRate: 89.3,
    autoCodingRules: []
  },
  {
    id: 'vendor-004',
    name: 'Utilities Corp',
    active: true,
    email: 'billing@utilities.com',
    phone: '555-0111',
    defaultGLAccount: '6300',
    paymentTerms: 'Net 15',
    totalInvoices: 120,
    accuracyRate: 99.1
  },
  {
    id: 'vendor-005',
    name: 'Marketing Agency Pro',
    active: true,
    email: 'accounts@marketingpro.com',
    phone: '555-0222',
    defaultGLAccount: '6400',
    paymentTerms: 'Net 30',
    totalInvoices: 8,
    accuracyRate: 94.5
  },
  {
    id: 'vendor-006',
    name: 'Legal Services Inc',
    active: true,
    email: 'billing@legalservices.com',
    phone: '555-0333',
    defaultGLAccount: '6500',
    paymentTerms: 'Due on Receipt',
    totalInvoices: 15,
    accuracyRate: 97.8
  },
  {
    id: 'vendor-007',
    name: 'Inactive Vendor Co',
    active: false,
    totalInvoices: 5,
    accuracyRate: 85.0
  }
];

// Mock Exceptions
export const mockExceptions: Exception[] = [
  {
    id: 'exc-001',
    documentId: 'doc-003',
    document: mockDocuments[2],
    type: 'low_confidence',
    severity: 'high',
    description: 'OCR confidence below threshold (72%). Manual review required.',
    suggestedFix: 'Review vendor name and invoice number extraction',
    owner: 'ap.team@company.com',
    age: 3,
    createdDate: '2024-12-13T11:15:00'
  },
  {
    id: 'exc-002',
    documentId: 'doc-003',
    document: mockDocuments[2],
    type: 'duplicate',
    severity: 'critical',
    description: 'Possible duplicate of invoice MFG-45678 from ABC Manufacturing',
    suggestedFix: 'Compare with document doc-456 from Nov 2024',
    owner: 'john.doe',
    age: 3,
    createdDate: '2024-12-13T11:20:00'
  },
  {
    id: 'exc-003',
    documentId: 'doc-008',
    document: mockDocuments[7],
    type: 'amount_mismatch',
    severity: 'medium',
    description: 'Line items total ($9,825.50) does not match invoice total ($9,875.50)',
    suggestedFix: 'Verify tax calculation or line item amounts',
    age: 0,
    createdDate: '2024-12-16T07:20:00'
  }
];

// Mock Approvals
export const mockApprovals: Approval[] = [
  {
    id: 'appr-001',
    document: mockDocuments[1],
    requiredApprover: 'manager@company.com',
    priority: 'medium',
    slaHours: 48,
    hoursRemaining: 32,
    submittedDate: '2024-12-14T14:20:00',
    submittedBy: 'john.doe'
  },
  {
    id: 'appr-002',
    document: mockDocuments[6],
    requiredApprover: 'cfo@company.com',
    priority: 'high',
    slaHours: 24,
    hoursRemaining: 8,
    submittedDate: '2024-12-15T13:20:00',
    submittedBy: 'admin'
  }
];

// Mock KPIs
export const mockKPIs: KPI[] = [
  { label: 'Documents Pending Review', value: 23, change: -5, trend: 'down' },
  { label: 'Exceptions', value: 8, change: 2, trend: 'up' },
  { label: 'Pending Approvals', value: 12, change: 0, trend: 'neutral' },
  { label: 'Posted Today', value: 34, change: 12, trend: 'up' }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'act-001',
    timestamp: '2024-12-16T09:45:00',
    action: 'Document approved',
    user: 'manager@company.com',
    documentId: 'doc-004',
    details: 'UTIL-2024-12'
  },
  {
    id: 'act-002',
    timestamp: '2024-12-16T09:30:00',
    action: 'Document posted to ERP',
    user: 'System',
    documentId: 'doc-006',
    details: 'INV-2024-1189'
  },
  {
    id: 'act-003',
    timestamp: '2024-12-16T09:15:00',
    action: 'Exception created',
    user: 'System',
    documentId: 'doc-003',
    details: 'Low confidence - MFG-45678'
  },
  {
    id: 'act-004',
    timestamp: '2024-12-16T08:50:00',
    action: 'Document submitted for approval',
    user: 'john.doe',
    documentId: 'doc-002',
    details: 'CS-987654'
  },
  {
    id: 'act-005',
    timestamp: '2024-12-16T08:30:00',
    action: 'Vendor rule updated',
    user: 'admin',
    details: 'Office Supplies Inc - Auto-coding enabled'
  }
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: 'rep-001',
    name: 'Touchless Rate',
    description: 'Percentage of documents processed without manual intervention',
    icon: 'target',
    value: '76%'
  },
  {
    id: 'rep-002',
    name: 'Avg Processing Time',
    description: 'Average time from upload to posting',
    icon: 'clock',
    value: '2.3 hrs'
  },
  {
    id: 'rep-003',
    name: 'Exceptions by Type',
    description: 'Breakdown of exception categories',
    icon: 'alert-circle',
    value: '8 active'
  },
  {
    id: 'rep-004',
    name: 'Vendor Accuracy',
    description: 'Top vendors by OCR accuracy',
    icon: 'trending-up',
    value: '94.2%'
  }
];

// Mock Audit Entries
export const mockAuditEntries: AuditEntry[] = [
  {
    id: 'audit-001',
    timestamp: '2024-12-15T09:30:00',
    user: 'system',
    field: 'Document Created',
    oldValue: '-',
    newValue: 'doc-001',
    action: 'created'
  },
  {
    id: 'audit-002',
    timestamp: '2024-12-15T10:15:00',
    user: 'john.doe',
    field: 'GL Account',
    oldValue: '6000',
    newValue: '6100',
    action: 'updated'
  },
  {
    id: 'audit-003',
    timestamp: '2024-12-15T10:20:00',
    user: 'john.doe',
    field: 'Cost Center',
    oldValue: '-',
    newValue: 'ADMIN',
    action: 'updated'
  },
  {
    id: 'audit-004',
    timestamp: '2024-12-15T14:45:00',
    user: 'manager@company.com',
    field: 'Status',
    oldValue: 'pending_approval',
    newValue: 'approved',
    action: 'approved'
  },
  {
    id: 'audit-005',
    timestamp: '2024-12-15T15:00:00',
    user: 'system',
    field: 'ERP Sync',
    oldValue: '-',
    newValue: 'ERP-98765',
    action: 'posted'
  }
];
