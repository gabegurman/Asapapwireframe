import { useState } from 'react';
import { Clock, AlertCircle, Check, X, MessageSquare, User } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { mockApprovals } from '../../data/mockData';
import type { Approval } from '../../types';

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
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSLAColor = (hoursRemaining: number) => {
  if (hoursRemaining < 8) return 'text-red-600';
  if (hoursRemaining < 24) return 'text-yellow-600';
  return 'text-green-600';
};

export function Approvals() {
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(mockApprovals[0]);
  const [comment, setComment] = useState('');

  return (
    <div className="h-full flex">
      {/* Left Panel - Approval Queue */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-gray-900 mb-1">Approval Queue</h2>
          <p className="text-sm text-gray-600">{mockApprovals.length} pending approvals</p>
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-200">
            {mockApprovals.map((approval) => (
              <button
                key={approval.id}
                onClick={() => setSelectedApproval(approval)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedApproval?.id === approval.id ? 'bg-blue-50' : ''
                }`}
              >
                {/* Priority and SLA */}
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={getPriorityColor(approval.priority)}>
                    {approval.priority.toUpperCase()}
                  </Badge>
                  <div className={`flex items-center gap-1 text-sm ${getSLAColor(approval.hoursRemaining)}`}>
                    <Clock className="size-4" />
                    <span>{approval.hoursRemaining}h</span>
                  </div>
                </div>

                {/* Vendor and Invoice */}
                <h3 className="font-medium text-gray-900 mb-1">
                  {approval.document.vendor}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {approval.document.invoiceNumber}
                </p>

                {/* Amount */}
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {formatCurrency(approval.document.amount)}
                </p>

                {/* Submitted Info */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="size-3" />
                  <span>{approval.submittedBy}</span>
                  <span>•</span>
                  <span>{new Date(approval.submittedDate).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Approval Detail */}
      {selectedApproval && (
        <div className="flex-1 flex flex-col">
          {/* Document Preview */}
          <div className="flex-1 overflow-auto bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Document Image */}
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4">Document Preview</h2>
                <div className="bg-white rounded shadow-sm">
                  <img 
                    src={selectedApproval.document.thumbnail} 
                    alt="Invoice preview"
                    className="w-full"
                  />
                </div>
              </Card>

              {/* Extracted Data */}
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4">Extracted Information</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vendor</p>
                    <p className="font-medium text-gray-900">{selectedApproval.document.vendor}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Invoice Number</p>
                    <p className="font-medium text-gray-900">{selectedApproval.document.invoiceNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Invoice Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedApproval.document.invoiceDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Due Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedApproval.document.dueDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">GL Account</p>
                    <p className="font-medium text-gray-900">
                      {selectedApproval.document.glAccount || 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cost Center</p>
                    <p className="font-medium text-gray-900">
                      {selectedApproval.document.costCenter || 'Not assigned'}
                    </p>
                  </div>

                  <div className="col-span-2 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(selectedApproval.document.amount)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Approval Info */}
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4">Approval Details</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Submitted By</p>
                    <p className="font-medium text-gray-900">{selectedApproval.submittedBy}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Submitted Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedApproval.submittedDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Required Approver</p>
                    <p className="font-medium text-gray-900">{selectedApproval.requiredApprover}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">SLA Remaining</p>
                    <p className={`font-medium ${getSLAColor(selectedApproval.hoursRemaining)}`}>
                      {selectedApproval.hoursRemaining} hours
                    </p>
                  </div>
                </div>
              </Card>

              {/* Comment Thread */}
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4">Comments</h2>
                
                <div className="space-y-4 mb-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="size-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{selectedApproval.submittedBy}</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-gray-700">
                        Please review and approve this invoice. All information has been verified.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Textarea 
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button size="sm">
                    <MessageSquare className="size-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Check className="size-5 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" className="flex-1">
                  <X className="size-5 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="flex-1">
                  <AlertCircle className="size-5 mr-2" />
                  Request Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
