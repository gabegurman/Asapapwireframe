import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { Dashboard } from './components/screens/Dashboard';
import { DocumentInbox } from './components/screens/DocumentInbox';
import { DocumentReview } from './components/screens/DocumentReview';
import { Vendors } from './components/screens/Vendors';
import { Approvals } from './components/screens/Approvals';
import { Exceptions } from './components/screens/Exceptions';
import { Bills } from './components/screens/Bills';
import { Reports } from './components/screens/Reports';
import { Settings } from './components/screens/Settings';
import type { Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'inbox':
        return <DocumentInbox />;
      case 'document-review':
        return <DocumentReview />;
      case 'vendors':
        return <Vendors />;
      case 'approvals':
        return <Approvals />;
      case 'exceptions':
        return <Exceptions />;
      case 'bills':
        return <Bills />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppShell currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </AppShell>
  );
}
