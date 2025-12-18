import { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, ExternalLink, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { mockDocuments, mockAuditEntries } from '../../data/mockData';
import type { Document } from '../../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'posted': return 'bg-green-100 text-green-800 border-green-200';
    case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSyncStatusColor = (status?: string) => {
  switch (status) {
    case 'synced': return 'bg-green-100 text-green-800 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'error': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function Bills() {
  const [selectedBill, setSelectedBill] = useState<Document | null>(null);

  // Filter for posted/approved bills
  const bills = mockDocuments.filter(d => 
    d.status === 'posted' || d.status === 'approved'
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900">Bills & Transactions</h1>
        <p className="text-gray-600 mt-1">Posted and approved invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Posted Today</p>
            <FileText className="size-5 text-gray-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">34</p>
          <p className="text-sm text-green-600 mt-1">+12 from yesterday</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Posted</p>
            <CheckCircle className="size-5 text-green-500" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">
            {bills.filter(b => b.status === 'posted').length}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Pending Sync</p>
            <Clock className="size-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">2</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Sync Errors</p>
            <AlertCircle className="size-5 text-red-500" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">0</p>
        </Card>
      </div>

      {/* Bills Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GL Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ERP ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sync Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                        <img 
                          src={bill.thumbnail} 
                          alt="Document"
                          className="size-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-gray-900">{bill.vendor}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{bill.invoiceNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{formatCurrency(bill.amount)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{formatDate(bill.invoiceDate)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{bill.glAccount || '-'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getStatusColor(bill.status)}>
                      {bill.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{bill.erpId || 'Pending'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getSyncStatusColor(bill.syncStatus)}>
                      {bill.syncStatus ? bill.syncStatus.charAt(0).toUpperCase() + bill.syncStatus.slice(1) : 'Pending'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedBill(bill)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transaction Detail Panel */}
      <Sheet open={!!selectedBill} onOpenChange={(open) => !open && setSelectedBill(null)}>
        <SheetContent className="w-[700px] sm:max-w-[700px] overflow-y-auto">
          {selectedBill && (
            <>
              <SheetHeader>
                <SheetTitle>Transaction Details</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Transaction Summary */}
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Transaction Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Vendor</p>
                      <p className="font-medium text-gray-900">{selectedBill.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Invoice Number</p>
                      <p className="font-medium text-gray-900">{selectedBill.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Invoice Date</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedBill.invoiceDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Due Date</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedBill.dueDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedBill.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge variant="outline" className={getStatusColor(selectedBill.status)}>
                        {selectedBill.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Posting Results */}
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">ERP Integration</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Successfully Posted</p>
                          <p className="text-sm text-green-700">Transaction synced to ERP system</p>
                        </div>
                      </div>
                      {selectedBill.erpId && (
                        <Badge variant="outline" className="bg-white">
                          {selectedBill.erpId}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm text-gray-600">GL Account</p>
                        <p className="font-medium text-gray-900">{selectedBill.glAccount || 'Not assigned'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cost Center</p>
                        <p className="font-medium text-gray-900">{selectedBill.costCenter || 'Not assigned'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sync Status</p>
                        <Badge variant="outline" className={getSyncStatusColor(selectedBill.syncStatus)}>
                          {selectedBill.syncStatus ? selectedBill.syncStatus.charAt(0).toUpperCase() + selectedBill.syncStatus.slice(1) : 'Pending'}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sync Date</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedBill.uploadedDate)}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <ExternalLink className="size-4 mr-2" />
                      View in ERP System
                    </Button>
                  </div>
                </Card>

                {/* Audit Timeline */}
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Full Audit Timeline</h3>
                  
                  <div className="space-y-4">
                    {mockAuditEntries.map((entry, index) => (
                      <div key={entry.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`size-2 rounded-full ${
                            index === 0 ? 'bg-green-600' : 'bg-gray-300'
                          }`}></div>
                          {index < mockAuditEntries.length - 1 && (
                            <div className="w-px flex-1 bg-gray-200 my-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900">{entry.action}</p>
                            <p className="text-sm text-gray-500">
                              {formatDateTime(entry.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">by {entry.user}</p>
                          {entry.field && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">{entry.field}:</span>{' '}
                              {entry.oldValue && (
                                <>
                                  <span className="line-through text-gray-400">{entry.oldValue}</span>
                                  {' → '}
                                </>
                              )}
                              <span className="text-green-600">{entry.newValue}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Resync to ERP
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
