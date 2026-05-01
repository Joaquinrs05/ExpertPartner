import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilteredEmail } from '@core/models/email.model';

const ago = (minutes: number): Date => new Date(Date.now() - minutes * 60000);

const MOCK_EMAILS: FilteredEmail[] = [
  {
    id: '1', senderName: 'David Chen', senderEmail: 'david.chen@acmecorp.com',
    subject: 'Contract Revisions Needed ASAP',
    preview: 'Hi, the legal team flagged several clauses in the NDA. We need to address these before the Monday deadline or risk losing the deal.',
    category: 'URGENT', isStarred: true, isRead: false, receivedAt: ago(12),
  },
  {
    id: '2', senderName: 'Sarah Jenkins', senderEmail: 'sarah.j@acmecorp.com',
    subject: 'Q3 Consulting Inquiry - Strategic Planning',
    preview: 'We are looking for a strategic consulting partner to help us navigate our Q3 expansion. Our budget is flexible and timeline is Q4.',
    category: 'LEAD_GEN', isStarred: false, isRead: false, receivedAt: ago(45),
  },
  {
    id: '3', senderName: 'Billing Dept', senderEmail: 'billing@expertpartner.com',
    subject: 'Invoice #88492 - Paid',
    preview: 'Payment confirmed for Invoice #88492 totalling €12,500. Funds will appear in your account within 2 business days.',
    category: 'FINANCE', isStarred: false, isRead: true, receivedAt: ago(120),
  },
  {
    id: '4', senderName: 'Internal HR', senderEmail: 'hr@expertpartner.com',
    subject: 'Team offsite confirmed for June',
    preview: 'The team offsite has been confirmed for June 14–16 in Marbella. Please book your travel by May 30th. Hotel details attached.',
    category: 'UPDATE', isStarred: false, isRead: true, receivedAt: ago(240),
  },
  {
    id: '5', senderName: 'Marcus Webb', senderEmail: 'mwebb@globalfinance.io',
    subject: 'Urgent: Escalation on Project Delta',
    preview: 'Client is unsatisfied with the latest deliverable. We need a call this afternoon to resolve the escalation before it reaches the board.',
    category: 'URGENT', isStarred: true, isRead: false, receivedAt: ago(30),
  },
  {
    id: '6', senderName: 'Elena Romero', senderEmail: 'elena.r@nextstep.es',
    subject: 'Partnership Opportunity - Iberia Region',
    preview: 'We have been following ExpertPartner closely and believe there is a strong synergy in the Iberia market. Would love to explore a referral arrangement.',
    category: 'LEAD_GEN', isStarred: false, isRead: false, receivedAt: ago(300),
  },
  {
    id: '7', senderName: 'Finance Team', senderEmail: 'finance@expertpartner.com',
    subject: 'Q1 Expenses Report Ready',
    preview: 'The Q1 expenses report has been compiled and is ready for your review. Total spend came in 4% under budget.',
    category: 'FINANCE', isStarred: false, isRead: true, receivedAt: ago(1440),
  },
  {
    id: '8', senderName: 'Platform Team', senderEmail: 'platform@expertpartner.com',
    subject: 'Scheduled maintenance window this Sunday',
    preview: 'We will be performing database maintenance this Sunday 2am–4am CET. Expect brief downtime for all internal tools.',
    category: 'UPDATE', isStarred: false, isRead: true, receivedAt: ago(2880),
  },
  {
    id: '9', senderName: 'Tom Bradley', senderEmail: 'tbradley@vestacapital.com',
    subject: 'Request for Proposal - Digital Transformation',
    preview: 'Vesta Capital is seeking a consulting firm to lead our digital transformation initiative. Full RFP attached. Budget: €200k.',
    category: 'LEAD_GEN', isStarred: true, isRead: false, receivedAt: ago(90),
  },
];

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly _emails = new BehaviorSubject<FilteredEmail[]>([...MOCK_EMAILS]);
  readonly emails$ = this._emails.asObservable();

  toggleStar(id: string): void {
    this._emails.next(
      this._emails.getValue().map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e)
    );
  }

  markAsRead(id: string): void {
    this._emails.next(
      this._emails.getValue().map(e => e.id === id ? { ...e, isRead: true } : e)
    );
  }
}
