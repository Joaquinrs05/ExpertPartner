export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  category: 'URGENT' | 'FINANCE' | 'UPDATE';
  isStarred: boolean;
  isRead: boolean;
  receivedAt: Date;
  body?: string;
}
