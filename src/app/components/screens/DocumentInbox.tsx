import { useState } from 'react';
import { Filter, Search, CheckSquare, FileText, MoreVertical, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockDocuments } from '../../data/mockData';
import type { Document, DocumentStatus } from '../../types';

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'pending_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in_review': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending_approval': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'approved': return 'bg-green-100 text-green-800 border-green-200';
    case 'exception': return 'bg-red-100 text-red-800 border-red-200';
    case 'posted': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
  }
};

const formatStatus = (status: DocumentStatus) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

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

const getConfidenceColor = (score: number) => {
  if (score >= 95) return 'text-green-600';
  if (score >= 85) return 'text-yellow-600';
  return 'text-red-600';
};

export function DocumentInbox() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(mockDocuments[0]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDocs = statusFilter === 'all' 
    ? mockDocuments 
    : mockDocuments.filter(d => d.status === statusFilter);

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredDocs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDocs.map(d => d.id)));
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Filters */}
      <div className="w-70 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-gray-900 mb-4">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="exception">Exceptions</SelectItem>
                  <SelectItem value="posted">Posted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Vendor</label>
              <Input placeholder="Search vendors..." />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Amount Range</label>
              <div className="flex gap-2">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
              <Input type="date" className="mb-2" />
              <Input type="date" />
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Views</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              My Documents
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              High Priority
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              This Week
            </button>
          </div>
        </div>
      </div>

      {/* Center Panel - Document List */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Actions Bar */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
          <Checkbox 
            checked={selectedIds.size === filteredDocs.length && filteredDocs.length > 0}
            onCheckedChange={toggleAll}
          />
          {selectedIds.size > 0 && (
            <>
              <span className="text-sm text-gray-600">{selectedIds.size} selected</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Submit</Button>
                <Button size="sm" variant="outline">Mark Exception</Button>
                <Button size="sm" variant="outline">Assign</Button>
              </div>
            </>
          )}
          <div className="ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input 
                placeholder="Search documents..." 
                className="pl-9 w-64"
              />
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="w-12 px-4 py-3"></th>
                <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocs.map((doc) => (
                <tr 
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    selectedDoc?.id === doc.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <Checkbox 
                      checked={selectedIds.has(doc.id)}
                      onCheckedChange={() => toggleSelection(doc.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="size-16 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                      <img 
                        src={doc.thumbnail} 
                        alt="Document preview"
                        className="size-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{doc.vendor}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900">{doc.invoiceNumber}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{formatCurrency(doc.amount)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-600">{formatDate(doc.invoiceDate)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={getStatusColor(doc.status)}>
                      {formatStatus(doc.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <p className={`font-medium ${getConfidenceColor(doc.confidenceScore)}`}>
                      {doc.confidenceScore}%
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="size-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel - Document Preview */}
      {selectedDoc && (
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Preview Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Document Preview</h3>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ZoomOut className="size-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ZoomIn className="size-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <RotateCw className="size-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Image */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <div className="bg-white rounded shadow-sm">
              <img 
                src={selectedDoc.thumbnail} 
                alt="Document preview"
                className="w-full"
              />
            </div>
          </div>

          {/* Quick Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Vendor</p>
                <p className="font-medium text-gray-900">{selectedDoc.vendor}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Invoice Number</p>
                <p className="font-medium text-gray-900">{selectedDoc.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Amount</p>
                <p className="font-medium text-gray-900">{formatCurrency(selectedDoc.amount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge variant="outline" className={getStatusColor(selectedDoc.status)}>
                  {formatStatus(selectedDoc.status)}
                </Badge>
              </div>
            </div>
            <Button className="w-full mt-4">Open Full Review</Button>
          </div>
        </div>
      )}
    </div>
  );
}
