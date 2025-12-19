import { ReactNode, useState } from 'react';
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
  User,
  ChevronDown,
  ChevronRight
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

interface NavigationItem {
  id: Screen;
  label: string;
  icon: any;
  badge?: number;
  subItems?: {
    id: Screen;
    label: string;
    badge?: number;
    color?: string;
  }[];
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: 'inbox' as Screen, 
    label: 'Inbox', 
    icon: Inbox,
    subItems: [
      { id: 'inbox-invoices' as Screen, label: 'Invoices', badge: 23, color: 'bg-blue-500' },
      { id: 'inbox-statements' as Screen, label: 'Statements', badge: 8, color: 'bg-green-500' },
      { id: 'inbox-other' as Screen, label: 'Other', badge: 5, color: 'bg-gray-500' }
    ]
  },
  { id: 'invoices' as Screen, label: 'Invoices', icon: FileText },
  { id: 'vendors' as Screen, label: 'Vendors', icon: Building2 },
  { id: 'bills' as Screen, label: 'Bills', icon: Receipt },
  { id: 'approvals' as Screen, label: 'Approvals', icon: CheckCircle, badge: 8 },
  { id: 'exceptions' as Screen, label: 'Exceptions', icon: AlertTriangle, badge: 5 },
  { id: 'reports' as Screen, label: 'Reports', icon: BarChart3 },
  { id: 'settings' as Screen, label: 'Settings', icon: Settings },
];

export function AppShell({ currentScreen, onNavigate, children }: AppShellProps) {
  const [expandedItems, setExpandedItems] = useState<Set<Screen>>(new Set(['inbox']));

  const toggleExpanded = (itemId: Screen) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const isItemActive = (item: NavigationItem) => {
    if (item.subItems) {
      return item.subItems.some(sub => sub.id === currentScreen);
    }
    return currentScreen === item.id;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900">JARVIS</span>
            <span className="text-xs text-gray-500">ASAP Marketplace</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item);
              const isExpanded = expandedItems.has(item.id);
              
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.subItems) {
                        toggleExpanded(item.id);
                      } else {
                        onNavigate(item.id);
                      }
                    }}
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
                    {item.badge !== undefined && !item.subItems && (
                      <Badge 
                        variant={isActive ? 'default' : 'secondary'} 
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.subItems && (
                      <ChevronDown 
                        className={`size-4 ml-auto transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                      />
                    )}
                  </button>

                  {/* Sub-items */}
                  {item.subItems && isExpanded && (
                    <div className="mt-1 space-y-1">
                      {item.subItems.map(subItem => {
                        const isSubActive = currentScreen === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onNavigate(subItem.id)}
                            className={`
                              w-full flex items-center gap-3 pl-11 pr-3 py-1.5 rounded-lg transition-colors text-sm
                              ${isSubActive
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }
                            `}
                          >
                            <div className={`size-2 rounded-full ${subItem.color || 'bg-gray-400'}`} />
                            <span className="flex-1 text-left">{subItem.label}</span>
                            {subItem.badge !== undefined && (
                              <span className={`text-xs ${isSubActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                {subItem.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
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