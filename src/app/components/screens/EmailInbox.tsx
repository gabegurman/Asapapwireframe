import { useState } from 'react';
import { Mail, Paperclip, Star, Archive, Trash2, MoreVertical, Clock, Search as SearchIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import type { Screen } from '../../types';

interface Email {
  id: string;
  from: string;
  fromEmail: string;
  to: string;
  toEmail: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  attachments?: string[];
  category: 'invoices' | 'statements' | 'other';
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'Acme Hauling Services',
    fromEmail: 'billing@acmehauling.com',
    to: 'Your Company',
    toEmail: 'billing@yourcompany.com',
    subject: 'Invoice #INV-2024-0345 - December Services',
    preview: 'Please find attached our invoice for services rendered in December. Total amount due: $12,450.00...',
    date: '2024-12-19T10:30:00',
    read: false,
    starred: false,
    hasAttachment: true,
    attachments: ['INV-2024-0345.pdf'],
    category: 'invoices'
  },
  {
    id: '2',
    from: 'Metro Waste Solutions',
    fromEmail: 'accounts@metrowaste.com',
    to: 'Your Company',
    toEmail: 'accounts@yourcompany.com',
    subject: 'Monthly Statement - December 2024',
    preview: 'Your monthly account statement is now available. Please review the attached statement for all transactions...',
    date: '2024-12-19T09:15:00',
    read: false,
    starred: false,
    hasAttachment: true,
    attachments: ['Statement_Dec2024.pdf'],
    category: 'statements'
  },
  {
    id: '3',
    from: 'Elite Transport Co',
    fromEmail: 'invoicing@elitetransport.com',
    to: 'Your Company',
    toEmail: 'invoicing@yourcompany.com',
    subject: 'Invoice #ET-89234 Due 01/15/2025',
    preview: 'Thank you for your business. Please find the attached invoice for transport services. Payment terms: Net 30...',
    date: '2024-12-18T16:45:00',
    read: true,
    starred: true,
    hasAttachment: true,
    attachments: ['ET-89234.pdf', 'Delivery_Receipt.pdf'],
    category: 'invoices'
  },
  {
    id: '4',
    from: 'QuickBooks Support',
    fromEmail: 'noreply@quickbooks.com',
    to: 'Your Company',
    toEmail: 'support@yourcompany.com',
    subject: 'Your weekly summary report',
    preview: 'Here is your weekly summary of activities in QuickBooks. Total invoices processed: 45...',
    date: '2024-12-18T14:20:00',
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'other'
  },
  {
    id: '5',
    from: 'Sunrise Disposal',
    fromEmail: 'billing@sunrisedisposal.com',
    to: 'Your Company',
    toEmail: 'billing@yourcompany.com',
    subject: 'Invoice #SD-2024-1289',
    preview: 'Attached is your invoice for waste management services. Please remit payment within 30 days...',
    date: '2024-12-18T11:30:00',
    read: false,
    starred: false,
    hasAttachment: true,
    attachments: ['SD-2024-1289.pdf'],
    category: 'invoices'
  },
  {
    id: '6',
    from: 'Global Freight Services',
    fromEmail: 'statements@globalfreight.com',
    to: 'Your Company',
    toEmail: 'statements@yourcompany.com',
    subject: 'Account Statement Q4 2024',
    preview: 'Please review your quarterly account statement attached to this email. For questions, contact our billing department...',
    date: '2024-12-17T15:00:00',
    read: true,
    starred: false,
    hasAttachment: true,
    attachments: ['Q4_Statement.pdf'],
    category: 'statements'
  },
  {
    id: '7',
    from: 'City Haulers LLC',
    fromEmail: 'ap@cityhaulers.com',
    to: 'Your Company',
    toEmail: 'ap@yourcompany.com',
    subject: 'RE: Payment Confirmation',
    preview: 'Thank you for your recent payment. We have received and processed your payment for invoice #CH-5678...',
    date: '2024-12-17T10:15:00',
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'other'
  },
  {
    id: '8',
    from: 'Premier Logistics',
    fromEmail: 'billing@premierlogistics.com',
    to: 'Your Company',
    toEmail: 'billing@yourcompany.com',
    subject: 'Invoice #PL-2024-456 - URGENT',
    preview: 'This is a reminder that invoice #PL-2024-456 is now past due. Please arrange payment immediately...',
    date: '2024-12-16T13:45:00',
    read: false,
    starred: true,
    hasAttachment: true,
    attachments: ['PL-2024-456.pdf'],
    category: 'invoices'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

interface EmailInboxProps {
  category?: 'invoices' | 'statements' | 'other';
}

export function EmailInbox({ category }: EmailInboxProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmails = mockEmails
    .filter(email => category ? email.category === category : true)
    .filter(email => 
      searchQuery === '' ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getCategoryLabel = () => {
    if (!category) return 'All Mail';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="h-full flex">
      {/* Email List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-gray-900 mb-3">{getCategoryLabel()}</h2>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search mail..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-auto">
          {filteredEmails.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="size-12 mx-auto mb-2 text-gray-300" />
              <p>No emails found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedEmail?.id === email.id ? 'bg-blue-50' : ''
                  } ${!email.read ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      className={`mt-0.5 ${email.starred ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle starred state
                      }}
                    >
                      <Star className="size-4" fill={email.starred ? 'currentColor' : 'none'} />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-medium text-gray-900 truncate ${!email.read ? 'font-semibold' : ''}`}>
                          {email.from}
                        </p>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {formatDate(email.date)}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-1 truncate ${!email.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                        {email.subject}
                      </p>
                      
                      <p className="text-sm text-gray-500 truncate">
                        {email.preview}
                      </p>

                      {email.hasAttachment && (
                        <div className="flex items-center gap-1 mt-2">
                          <Paperclip className="size-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {email.attachments?.length} attachment{(email.attachments?.length || 0) > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email Detail */}
      {selectedEmail ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Email Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-xl text-gray-900 mb-4">{selectedEmail.subject}</h1>
                
                {/* From */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 mr-2">From:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedEmail.from}</span>
                  <span className="text-sm text-gray-500 ml-1">&lt;{selectedEmail.fromEmail}&gt;</span>
                </div>

                {/* To - Recipient Email (Federated Inbox) */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 mr-2">To:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedEmail.to}</span>
                  <span className="text-sm text-blue-600 ml-1">&lt;{selectedEmail.toEmail}&gt;</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                  <Clock className="size-4" />
                  <span>{new Date(selectedEmail.date).toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Archive className="size-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="size-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl">
              <div className="prose text-gray-700 mb-6">
                <p>{selectedEmail.preview}</p>
                <p className="mt-4">
                  This is a placeholder for the full email content. In a real implementation, 
                  the complete email body would be displayed here.
                </p>
              </div>

              {/* Attachments */}
              {selectedEmail.hasAttachment && selectedEmail.attachments && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Paperclip className="size-4 text-gray-600" />
                    <h3 className="font-medium text-gray-900">
                      {selectedEmail.attachments.length} Attachment{selectedEmail.attachments.length > 1 ? 's' : ''}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {selectedEmail.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-red-600 text-xs font-semibold">PDF</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{attachment}</p>
                            <p className="text-xs text-gray-500">PDF Document</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex gap-2">
              <Button>Process Invoice</Button>
              <Button variant="outline">Forward</Button>
              <Button variant="outline">Reply</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500">
            <Mail className="size-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Select an email to read</p>
          </div>
        </div>
      )}
    </div>
  );
}