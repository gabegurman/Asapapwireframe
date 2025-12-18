import { useState } from 'react';
import { AlertTriangle, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { mockExceptions } from '../../data/mockData';
import type { Exception } from '../../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getExceptionTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'duplicate': 'Duplicate Invoice',
    'missing_po': 'Missing PO',
    'amount_mismatch': 'Amount Mismatch',
    'vendor_mismatch': 'Vendor Mismatch',
    'low_confidence': 'Low Confidence',
    'invalid_date': 'Invalid Date',
    'coding_error': 'Coding Error'
  };
  return labels[type] || type;
};

const getExceptionIcon = (type: string) => {
  switch (type) {
    case 'duplicate':
    case 'amount_mismatch':
    case 'vendor_mismatch':
      return AlertTriangle;
    case 'low_confidence':
    case 'coding_error':
      return AlertCircle;
    default:
      return AlertCircle;
  }
};

export function Exceptions() {
  const [selectedException, setSelectedException] = useState<Exception | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredExceptions = mockExceptions.filter(exc => {
    if (typeFilter !== 'all' && exc.type !== typeFilter) return false;
    if (severityFilter !== 'all' && exc.severity !== severityFilter) return false;
    return true;
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900">Exceptions</h1>
        <p className="text-gray-600 mt-1">Review and resolve document exceptions</p>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Exception Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="duplicate">Duplicate Invoice</SelectItem>
                <SelectItem value="low_confidence">Low Confidence</SelectItem>
                <SelectItem value="amount_mismatch">Amount Mismatch</SelectItem>
                <SelectItem value="vendor_mismatch">Vendor Mismatch</SelectItem>
                <SelectItem value="missing_po">Missing PO</SelectItem>
                <SelectItem value="invalid_date">Invalid Date</SelectItem>
                <SelectItem value="coding_error">Coding Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Severity</label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Assigned To</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="me">Assigned to Me</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Exceptions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exception Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Suggested Fix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredExceptions.map((exception) => {
                const Icon = getExceptionIcon(exception.type);
                
                return (
                  <tr key={exception.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                          <img 
                            src={exception.document.thumbnail} 
                            alt="Document"
                            className="size-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{exception.document.vendor}</p>
                          <p className="text-sm text-gray-600">{exception.document.invoiceNumber}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(exception.document.amount)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon className="size-5 text-orange-600" />
                        <span className="text-gray-900">{getExceptionTypeLabel(exception.type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={getSeverityColor(exception.severity)}>
                        {exception.severity.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-xs">
                        {exception.suggestedFix || 'Manual review required'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{exception.owner || 'Unassigned'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="size-4" />
                        <span>{exception.age}d</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedException(exception)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Exception Detail Drawer */}
      <Sheet open={!!selectedException} onOpenChange={(open) => !open && setSelectedException(null)}>
        <SheetContent className="w-[600px] sm:max-w-[600px]">
          {selectedException && (
            <>
              <SheetHeader>
                <SheetTitle>Exception Details</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Exception Info */}
                <Card className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    {(() => {
                      const Icon = getExceptionIcon(selectedException.type);
                      return <Icon className="size-6 text-orange-600 mt-1" />;
                    })()}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {getExceptionTypeLabel(selectedException.type)}
                      </h3>
                      <Badge variant="outline" className={getSeverityColor(selectedException.severity)}>
                        {selectedException.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700">{selectedException.description}</p>
                </Card>

                {/* Document Info */}
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Document Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Vendor</p>
                      <p className="font-medium text-gray-900">{selectedException.document.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Invoice Number</p>
                      <p className="font-medium text-gray-900">{selectedException.document.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium text-gray-900">
                        {formatCurrency(selectedException.document.amount)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* AI Suggestion */}
                {selectedException.suggestedFix && (
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-blue-900 mb-1">Suggested Fix</h3>
                        <p className="text-blue-800">{selectedException.suggestedFix}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Quick Actions</h3>
                  
                  {selectedException.type === 'duplicate' && (
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="size-4 mr-2" />
                      Mark as Not Duplicate
                    </Button>
                  )}
                  
                  {selectedException.type === 'low_confidence' && (
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="size-4 mr-2" />
                      Verify & Accept Extraction
                    </Button>
                  )}

                  {selectedException.type === 'amount_mismatch' && (
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="size-4 mr-2" />
                      Recalculate Totals
                    </Button>
                  )}

                  <Button variant="outline" className="w-full justify-start">
                    <X className="size-4 mr-2" />
                    Reject Document
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">Resolve Exception</Button>
                  <Button variant="outline" className="flex-1">Assign to Team</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
