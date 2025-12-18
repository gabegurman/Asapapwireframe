import { useState } from 'react';
import { BarChart3, Target, Clock, AlertCircle, TrendingUp, Download, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockReports, mockAuditEntries } from '../../data/mockData';

// Mock chart data
const touchlessRateData = [
  { month: 'Jul', rate: 68 },
  { month: 'Aug', rate: 71 },
  { month: 'Sep', rate: 73 },
  { month: 'Oct', rate: 74 },
  { month: 'Nov', rate: 75 },
  { month: 'Dec', rate: 76 },
];

const processingTimeData = [
  { week: 'W1', time: 2.8 },
  { week: 'W2', time: 2.6 },
  { week: 'W3', time: 2.4 },
  { week: 'W4', time: 2.3 },
];

const exceptionTypeData = [
  { name: 'Low Confidence', value: 35, color: '#f59e0b' },
  { name: 'Duplicate', value: 25, color: '#ef4444' },
  { name: 'Amount Mismatch', value: 20, color: '#3b82f6' },
  { name: 'Missing PO', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

const vendorAccuracyData = [
  { vendor: 'Utilities Corp', accuracy: 99 },
  { vendor: 'Office Supplies', accuracy: 98 },
  { vendor: 'Legal Services', accuracy: 98 },
  { vendor: 'Cloud Services', accuracy: 96 },
  { vendor: 'Marketing Pro', accuracy: 95 },
  { vendor: 'ABC Mfg', accuracy: 89 },
];

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function Reports() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Report Tiles */}
          <div className="grid grid-cols-4 gap-6">
            {mockReports.map((report) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'target': return Target;
                  case 'clock': return Clock;
                  case 'alert-circle': return AlertCircle;
                  case 'trending-up': return TrendingUp;
                  default: return BarChart3;
                }
              };
              
              const Icon = getIcon(report.icon);
              
              return (
                <Card 
                  key={report.id} 
                  className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="size-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  {report.value && (
                    <p className="text-2xl font-semibold text-gray-900">{report.value}</p>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Touchless Processing Rate</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={touchlessRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Touchless Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Average Processing Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="time" fill="#10b981" name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Exceptions by Type</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={exceptionTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {exceptionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Vendor Accuracy Ranking</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendorAccuracyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="vendor" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="accuracy" fill="#8b5cf6" name="Accuracy %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">Documents Processed</h3>
              <p className="text-3xl font-semibold text-gray-900">1,247</p>
              <p className="text-sm text-green-600 mt-1">+18% from last month</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">Average Accuracy</h3>
              <p className="text-3xl font-semibold text-gray-900">94.2%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% from last month</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">Cost Savings</h3>
              <p className="text-3xl font-semibold text-gray-900">$12,450</p>
              <p className="text-sm text-gray-600 mt-1">vs manual processing</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-gray-900 mb-4">Monthly Processing Volume</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={[
                { month: 'Jan', volume: 980 },
                { month: 'Feb', volume: 1050 },
                { month: 'Mar', volume: 1120 },
                { month: 'Apr', volume: 1080 },
                { month: 'May', volume: 1150 },
                { month: 'Jun', volume: 1200 },
                { month: 'Jul', volume: 1180 },
                { month: 'Aug', volume: 1220 },
                { month: 'Sep', volume: 1190 },
                { month: 'Oct', volume: 1230 },
                { month: 'Nov', volume: 1240 },
                { month: 'Dec', volume: 1247 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#3b82f6" name="Documents Processed" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Full Audit Trail</h2>
              <Button variant="outline" size="sm">
                <Download className="size-4 mr-2" />
                Export Audit Log
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {mockAuditEntries.map((entry) => {
                    const getActionColor = (action: string) => {
                      switch (action) {
                        case 'created': return 'bg-blue-100 text-blue-800 border-blue-200';
                        case 'updated': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                        case 'approved': return 'bg-green-100 text-green-800 border-green-200';
                        case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
                        case 'posted': return 'bg-purple-100 text-purple-800 border-purple-200';
                        default: return 'bg-gray-100 text-gray-800 border-gray-200';
                      }
                    };

                    return (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{formatDateTime(entry.timestamp)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{entry.user}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={getActionColor(entry.action)}>
                            {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{entry.field}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {entry.oldValue && entry.oldValue !== '-' && (
                              <>
                                <span className="text-gray-400 line-through">{entry.oldValue}</span>
                                <span className="text-gray-400 mx-2">→</span>
                              </>
                            )}
                            <span className="text-green-600 font-medium">{entry.newValue}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
