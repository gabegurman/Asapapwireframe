import { useState } from 'react';
import { Search, Plus, TrendingUp, Building2, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { mockVendors } from '../../data/mockData';
import type { Vendor } from '../../types';

export function Vendors() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(mockVendors[0]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const filteredVendors = showActiveOnly 
    ? mockVendors.filter(v => v.active) 
    : mockVendors;

  return (
    <div className="h-full flex">
      {/* Left Panel - Vendor List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Vendors</h2>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search vendors..." 
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch 
              id="active-only"
              checked={showActiveOnly}
              onCheckedChange={setShowActiveOnly}
            />
            <Label htmlFor="active-only" className="text-sm">Active only</Label>
          </div>
        </div>

        {/* Vendor List */}
        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-200">
            {filteredVendors.map((vendor) => (
              <button
                key={vendor.id}
                onClick={() => setSelectedVendor(vendor)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedVendor?.id === vendor.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-gray-400" />
                    <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                  </div>
                  {!vendor.active && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-600">
                      Inactive
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Total Invoices</p>
                    <p className="font-medium text-gray-900">{vendor.totalInvoices}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Accuracy</p>
                    <p className="font-medium text-green-600">{vendor.accuracyRate}%</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Vendor Detail */}
      {selectedVendor && (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Vendor Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-gray-900 mb-2">{selectedVendor.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedVendor.active ? 'default' : 'secondary'}>
                    {selectedVendor.active ? 'Active' : 'Inactive'}
                  </Badge>
                  {selectedVendor.defaultGLAccount && (
                    <Badge variant="outline">
                      GL: {selectedVendor.defaultGLAccount}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline">
                  <Trash2 className="size-4 mr-2" />
                  Deactivate
                </Button>
              </div>
            </div>

            {/* Vendor Info Card */}
            <Card className="p-6 mb-6">
              <h2 className="text-gray-900 mb-4">Vendor Information</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="size-4 text-gray-400" />
                    <p className="text-gray-900">
                      {selectedVendor.email || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Phone</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="size-4 text-gray-400" />
                    <p className="text-gray-900">
                      {selectedVendor.phone || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="col-span-2">
                  <Label>Address</Label>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="size-4 text-gray-400 mt-1" />
                    <p className="text-gray-900">
                      {selectedVendor.address || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Default GL Account</Label>
                  <p className="text-gray-900 mt-1">
                    {selectedVendor.defaultGLAccount || 'Not set'}
                  </p>
                </div>

                <div>
                  <Label>Payment Terms</Label>
                  <p className="text-gray-900 mt-1">
                    {selectedVendor.paymentTerms || 'Not set'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Auto-Coding Rules */}
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Auto-Coding Rules</h2>
                <Button size="sm">
                  <Plus className="size-4 mr-2" />
                  Add Rule
                </Button>
              </div>

              {selectedVendor.autoCodingRules && selectedVendor.autoCodingRules.length > 0 ? (
                <div className="space-y-3">
                  {selectedVendor.autoCodingRules.map((rule) => (
                    <div 
                      key={rule.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{rule.condition}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>GL: {rule.glAccount}</span>
                          {rule.costCenter && <span>Cost Center: {rule.costCenter}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={rule.enabled} />
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No auto-coding rules configured</p>
                  <p className="text-sm mt-1">Add rules to automatically code invoices from this vendor</p>
                </div>
              )}
            </Card>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Total Invoices</p>
                  <Building2 className="size-5 text-gray-400" />
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {selectedVendor.totalInvoices}
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Accuracy Rate</p>
                  <TrendingUp className="size-5 text-green-500" />
                </div>
                <p className="text-3xl font-semibold text-green-600">
                  {selectedVendor.accuracyRate}%
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Auto-Coded</p>
                  <TrendingUp className="size-5 text-blue-500" />
                </div>
                <p className="text-3xl font-semibold text-blue-600">
                  {selectedVendor.autoCodingRules?.filter(r => r.enabled).length || 0}
                </p>
              </Card>
            </div>

            {/* Recent Invoices */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Recent Invoices</h2>
              
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">INV-2024-{1000 + i}</p>
                      <p className="text-sm text-gray-600">Dec {15 - i}, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${(Math.random() * 5000 + 500).toFixed(2)}
                      </p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Posted
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
