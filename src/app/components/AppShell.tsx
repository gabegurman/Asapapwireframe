import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  Building2, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Receipt, 
  BarChart3, 
  Settings,
  Search,
  Upload,
  Bell,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import type { Screen } from '../types';

interface AppShellProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: ReactNode;
}

const navigationItems = [
  { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inbox' as Screen, label: 'Inbox', icon: Inbox, badge: 23 },
  { id: 'vendors' as Screen, label: 'Vendors', icon: Building2 },
  { id: 'bills' as Screen, label: 'Bills', icon: FileText },
  { id: 'approvals' as Screen, label: 'Approvals', icon: CheckCircle, badge: 12 },
  { id: 'exceptions' as Screen, label: 'Exceptions', icon: AlertTriangle, badge: 8 },
  { id: 'reports' as Screen, label: 'Reports', icon: BarChart3 },
  { id: 'settings' as Screen, label: 'Settings', icon: Settings },
];

export function AppShell({ currentScreen, onNavigate, children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Receipt className="size-6 text-blue-600" />
            <span className="font-semibold text-gray-900">ASAP AP</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="size-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <Badge 
                      variant={isActive ? 'default' : 'secondary'} 
                      className="ml-auto"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="size-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4">
          {/* Search */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input 
                placeholder="Search invoices, vendors..." 
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button>
              <Upload className="size-4 mr-2" />
              Upload
            </Button>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="size-5 text-gray-600" />
              <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
