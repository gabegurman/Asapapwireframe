import { useState } from 'react';
import { Users, CheckCircle, FileText, Building2, Plug, Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

export function Settings() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system configuration and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">
            <Users className="size-4 mr-2" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="approvals">
            <CheckCircle className="size-4 mr-2" />
            Approval Rules
          </TabsTrigger>
          <TabsTrigger value="ocr">
            <FileText className="size-4 mr-2" />
            OCR Settings
          </TabsTrigger>
          <TabsTrigger value="vendors">
            <Building2 className="size-4 mr-2" />
            Vendor Rules
          </TabsTrigger>
          <TabsTrigger value="erp">
            <Plug className="size-4 mr-2" />
            ERP Integration
          </TabsTrigger>
        </TabsList>

        {/* Users & Roles Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Users & Roles</h2>
              <p className="text-gray-600 mt-1">Manage user access and permissions</p>
            </div>
            <Button>
              <Plus className="size-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    { name: 'Admin User', email: 'admin@company.com', role: 'Administrator', active: true },
                    { name: 'John Doe', email: 'john.doe@company.com', role: 'AP Processor', active: true },
                    { name: 'Jane Smith', email: 'jane.smith@company.com', role: 'AP Processor', active: true },
                    { name: 'Manager User', email: 'manager@company.com', role: 'Approver', active: true },
                  ].map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{user.role}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.active ? 'default' : 'secondary'}>
                          {user.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="size-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Approval Rules Tab */}
        <TabsContent value="approvals" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Approval Rules</h2>
              <p className="text-gray-600 mt-1">Configure automatic approval routing</p>
            </div>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Rule
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { 
                name: 'Small Invoices Auto-Approval',
                condition: 'Amount < $500',
                action: 'Auto-approve and post',
                enabled: true
              },
              { 
                name: 'Manager Approval Required',
                condition: 'Amount between $500 - $5,000',
                action: 'Route to Department Manager',
                enabled: true
              },
              { 
                name: 'CFO Approval Required',
                condition: 'Amount > $5,000',
                action: 'Route to CFO',
                enabled: true
              },
              { 
                name: 'Legal Services Approval',
                condition: 'Vendor = Legal Services',
                action: 'Route to Legal Department',
                enabled: true
              },
            ].map((rule, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{rule.name}</h3>
                      <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                        {rule.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Condition</p>
                        <p className="text-gray-900 font-medium">{rule.condition}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Action</p>
                        <p className="text-gray-900 font-medium">{rule.action}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={rule.enabled} />
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* OCR Settings Tab */}
        <TabsContent value="ocr" className="space-y-6">
          <div>
            <h2 className="text-gray-900">OCR Settings</h2>
            <p className="text-gray-600 mt-1">Configure optical character recognition parameters</p>
          </div>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Confidence Thresholds</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="auto-approve-threshold">Auto-Approve Threshold (%)</Label>
                <Input 
                  id="auto-approve-threshold"
                  type="number"
                  defaultValue="95"
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Documents with confidence above this threshold can be auto-approved
                </p>
              </div>

              <div>
                <Label htmlFor="review-threshold">Manual Review Threshold (%)</Label>
                <Input 
                  id="review-threshold"
                  type="number"
                  defaultValue="85"
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Documents below this threshold require manual review
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium text-gray-900">Enable Duplicate Detection</p>
                  <p className="text-sm text-gray-600">Automatically flag potential duplicate invoices</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium text-gray-900">Enable Amount Validation</p>
                  <p className="text-sm text-gray-600">Verify line items match invoice total</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium text-gray-900">Enable Date Validation</p>
                  <p className="text-sm text-gray-600">Check for invalid or future dates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Field Extraction Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Extract Line Items</p>
                  <p className="text-sm text-gray-600">Automatically extract individual line items from invoices</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Extract Tax Information</p>
                  <p className="text-sm text-gray-600">Identify and extract tax amounts and rates</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Extract Payment Terms</p>
                  <p className="text-sm text-gray-600">Detect payment terms and due dates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Vendor Rules Tab */}
        <TabsContent value="vendors" className="space-y-6">
          <div>
            <h2 className="text-gray-900">Vendor Auto-Coding Rules</h2>
            <p className="text-gray-600 mt-1">Global vendor processing rules</p>
          </div>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Default Coding Rules</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Apply Vendor Default GL Account</p>
                  <p className="text-sm text-gray-600">Automatically use vendor's default GL account when available</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Enable Auto-Coding Rules</p>
                  <p className="text-sm text-gray-600">Apply vendor-specific auto-coding rules</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Create Vendor on First Invoice</p>
                  <p className="text-sm text-gray-600">Automatically create new vendor records</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ERP Integration Tab */}
        <TabsContent value="erp" className="space-y-6">
          <div>
            <h2 className="text-gray-900">ERP Integration</h2>
            <p className="text-gray-600 mt-1">Configure connection to your ERP system</p>
          </div>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Connection Settings</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="erp-system">ERP System</Label>
                <Select defaultValue="quickbooks">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quickbooks">QuickBooks Online</SelectItem>
                    <SelectItem value="netsuite">NetSuite</SelectItem>
                    <SelectItem value="sage">Sage Intacct</SelectItem>
                    <SelectItem value="xero">Xero</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input 
                  id="api-endpoint"
                  defaultValue="https://api.quickbooks.com/v3"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company-id">Company ID</Label>
                <Input 
                  id="company-id"
                  defaultValue="123456789"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded">
                <CheckCircle className="size-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Connected</p>
                  <p className="text-sm text-green-700">Last synced: 2 minutes ago</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Field Mapping</h3>
            
            <div className="space-y-4">
              {[
                { field: 'Vendor', maps: 'Vendor Name' },
                { field: 'Invoice Number', maps: 'RefNumber' },
                { field: 'Invoice Date', maps: 'TxnDate' },
                { field: 'Due Date', maps: 'DueDate' },
                { field: 'Amount', maps: 'TotalAmt' },
                { field: 'GL Account', maps: 'AccountRef' },
              ].map((mapping, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label>{mapping.field}</Label>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex-1">
                    <Input defaultValue={mapping.maps} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Sync Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-Sync Approved Invoices</p>
                  <p className="text-sm text-gray-600">Automatically post approved invoices to ERP</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Real-time Sync</p>
                  <p className="text-sm text-gray-600">Sync immediately after approval</p>
                </div>
                <Switch />
              </div>

              <div>
                <Label htmlFor="batch-sync">Batch Sync Schedule</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Every Hour</SelectItem>
                    <SelectItem value="daily">Daily at 11 PM</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button>Test Connection</Button>
            <Button variant="outline">Save Settings</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
