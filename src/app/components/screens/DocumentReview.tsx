import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, AlertCircle, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { mockDocuments } from '../../data/mockData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export function DocumentReview() {
  const [document] = useState(mockDocuments[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600 bg-green-50';
    if (confidence >= 85) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="h-full flex">
      {/* Left Column - Document Viewer (60%) */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Viewer Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button variant="outline" size="sm">
                <ChevronRight className="size-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ZoomOut className="size-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomIn className="size-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCw className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Document Image with OCR Highlights */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="relative">
              <img 
                src={document.thumbnail} 
                alt="Invoice document"
                className="w-full"
              />
              {/* OCR Highlight Boxes - Example */}
              <div className="absolute top-[15%] left-[10%] w-[40%] h-[8%] border-2 border-blue-500 bg-blue-500/10 rounded cursor-pointer hover:bg-blue-500/20">
                <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Vendor
                </div>
              </div>
              <div className="absolute top-[30%] right-[10%] w-[30%] h-[6%] border-2 border-green-500 bg-green-500/10 rounded cursor-pointer hover:bg-green-500/20">
                <div className="absolute -top-6 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Invoice #
                </div>
              </div>
              <div className="absolute bottom-[20%] right-[10%] w-[25%] h-[8%] border-2 border-purple-500 bg-purple-500/10 rounded cursor-pointer hover:bg-purple-500/20">
                <div className="absolute -top-6 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  Total
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Extraction Form (40%) */}
      <div className="w-[40%] bg-white border-l border-gray-200 flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Document Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-900">Document Review</h2>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Pending Review
                </Badge>
              </div>
              <p className="text-sm text-gray-600">ID: {document.id}</p>
            </div>

            {/* Vendor Information Section */}
            <Card className="p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-4">Vendor Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      id="vendor"
                      value={document.vendor}
                      className="flex-1"
                    />
                    <Badge className={getConfidenceColor(document.confidenceScore)}>
                      {document.confidenceScore}%
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        id="invoice-number"
                        value={document.invoiceNumber}
                      />
                      <Badge className="text-green-600 bg-green-50">99%</Badge>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input 
                      id="invoice-date"
                      type="date"
                      value={document.invoiceDate}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input 
                    id="due-date"
                    type="date"
                    value={document.dueDate}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Amounts Section */}
            <Card className="p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-4">Amounts</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subtotal">Subtotal</Label>
                    <Input 
                      id="subtotal"
                      value={document.subtotal?.toFixed(2)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tax">Tax</Label>
                    <Input 
                      id="tax"
                      value={document.tax?.toFixed(2)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="total">Total</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      id="total"
                      value={document.amount.toFixed(2)}
                      className="flex-1 font-semibold"
                    />
                    <Badge className="text-green-600 bg-green-50">99%</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Coding Section */}
            <Card className="p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-4">Coding</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gl-account">GL Account</Label>
                  <Select defaultValue={document.glAccount}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6100">6100 - Office Supplies</SelectItem>
                      <SelectItem value="6200">6200 - Technology</SelectItem>
                      <SelectItem value="6300">6300 - Utilities</SelectItem>
                      <SelectItem value="6400">6400 - Marketing</SelectItem>
                      <SelectItem value="6500">6500 - Professional Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cost-center">Cost Center / Job</Label>
                  <Select defaultValue={document.costCenter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN - Administration</SelectItem>
                      <SelectItem value="IT">IT - Information Technology</SelectItem>
                      <SelectItem value="FACILITIES">FACILITIES - Facilities</SelectItem>
                      <SelectItem value="SALES">SALES - Sales</SelectItem>
                      <SelectItem value="MARKETING">MARKETING - Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Line Items Section */}
            {document.lineItems && document.lineItems.length > 0 && (
              <Card className="p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Line Items</h3>
                  <Button variant="outline" size="sm">Expand All</Button>
                </div>
                
                <div className="space-y-2">
                  {document.lineItems.map((item, index) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Line {index + 1}</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        <span>Unit Price: {formatCurrency(item.unitPrice)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Validation Messages */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded">
                <Check className="size-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Vendor matched</p>
                  <p className="text-sm text-green-700">Vendor found in system with high confidence</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
                <AlertCircle className="size-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Auto-coding applied</p>
                  <p className="text-sm text-blue-700">GL Account and Cost Center set based on vendor rules</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Save Draft</Button>
            <Button variant="outline" className="flex-1">Mark Exception</Button>
          </div>
          <div className="flex gap-2 mt-2">
            <Button className="flex-1">Submit for Approval</Button>
            <Button variant="secondary" className="flex-1">Auto-Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
