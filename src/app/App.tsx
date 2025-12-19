import { useState } from 'react';
import type { Screen } from './types';
import { AppShell } from './components/AppShell';
import { Dashboard } from './components/screens/Dashboard';
import { EmailInbox } from './components/screens/EmailInbox';
import { DocumentInbox } from './components/screens/DocumentInbox';
import { DocumentReview } from './components/screens/DocumentReview';
import { Vendors } from './components/screens/Vendors';
import { Bills } from './components/screens/Bills';
import { Approvals } from './components/screens/Approvals';
import { Exceptions } from './components/screens/Exceptions';
import { Reports } from './components/screens/Reports';
import { Settings } from './components/screens/Settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'inbox':
        return <EmailInbox />;
      case 'inbox-invoices':
        return <EmailInbox category="invoices" />;
      case 'inbox-statements':
        return <EmailInbox category="statements" />;
      case 'inbox-other':
        return <EmailInbox category="other" />;
      case 'invoices':
        return <DocumentInbox />;
      case 'document-review':
        return <DocumentReview />;
      case 'vendors':
        return <Vendors />;
      case 'bills':
        return <Bills />;
      case 'approvals':
        return <Approvals />;
      case 'exceptions':
        return <Exceptions />;
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