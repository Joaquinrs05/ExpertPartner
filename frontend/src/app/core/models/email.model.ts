export interface FilteredEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  category: 'URGENT' | 'LEAD_GEN' | 'FINANCE' | 'UPDATE';
  isStarred: boolean;
  isRead: boolean;
  receivedAt: Date;
}
