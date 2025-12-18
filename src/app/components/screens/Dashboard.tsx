import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { mockKPIs, mockActivities, mockDocuments } from '../../data/mockData';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending_review': return 'bg-yellow-100 text-yellow-800';
    case 'in_review': return 'bg-blue-100 text-blue-800';
    case 'pending_approval': return 'bg-purple-100 text-purple-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'exception': return 'bg-red-100 text-red-800';
    case 'posted': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatStatus = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

export function Dashboard() {
  const workQueue = mockDocuments.filter(d => 
    ['pending_review', 'in_review', 'pending_approval', 'exception'].includes(d.status)
  );

  const needsReview = workQueue.filter(d => d.status === 'pending_review').length;
  const needsApproval = workQueue.filter(d => d.status === 'pending_approval').length;
  const exceptions = workQueue.filter(d => d.status === 'exception').length;

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your accounts payable workflow</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {mockKPIs.map((kpi, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{kpi.label}</p>
                <p className="text-3xl font-semibold text-gray-900">{kpi.value}</p>
              </div>
              {kpi.trend && (
                <div className={`flex items-center gap-1 text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 
                  kpi.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {kpi.trend === 'up' && <TrendingUp className="size-4" />}
                  {kpi.trend === 'down' && <TrendingDown className="size-4" />}
                  {kpi.trend === 'neutral' && <Minus className="size-4" />}
                  {kpi.change !== undefined && Math.abs(kpi.change)}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Work Queues Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* My Work Queue */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">My Work Queue</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:border-yellow-300 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Needs Review</p>
                <p className="text-sm text-gray-600">Documents pending initial review</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  {needsReview}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-300 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Needs Approval</p>
                <p className="text-sm text-gray-600">Waiting for manager approval</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                  {needsApproval}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:border-red-300 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Exceptions</p>
                <p className="text-sm text-gray-600">Requires manual intervention</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                  {exceptions}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="size-2 rounded-full bg-blue-600"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {activity.user}
                    {activity.details && ` • ${activity.details}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
