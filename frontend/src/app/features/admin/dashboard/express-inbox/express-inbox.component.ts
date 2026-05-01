import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeComponent, BadgeType } from '../../../../shared/components/badge/badge.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

interface EmailEntry {
  sender: string;
  category: 'urgent' | 'lead' | 'finance' | 'update';
  subject: string;
  preview: string;
  receivedAt: Date;
}

const MOCK_EMAILS: EmailEntry[] = [
  {
    sender: 'Alexandra Booth',
    category: 'urgent',
    subject: 'Contract renewal deadline approaching',
    preview: 'Please review the attached contract before Friday. The client has requested changes to section 4 and 5.',
    receivedAt: new Date(Date.now() - 10 * 60000),
  },
  {
    sender: 'Global Tech Partners',
    category: 'lead',
    subject: 'New partnership opportunity in APAC',
    preview: 'We have identified a significant opportunity in the Asia-Pacific market that aligns with your consulting expertise.',
    receivedAt: new Date(Date.now() - 90 * 60000),
  },
  {
    sender: 'Finance Department',
    category: 'finance',
    subject: 'Q2 budget allocation summary',
    preview: 'Attached is the quarterly budget allocation report. Please approve the consultant project expenses by end of week.',
    receivedAt: new Date(Date.now() - 3 * 3600000),
  },
  {
    sender: 'HR Team',
    category: 'update',
    subject: 'Policy update: Remote work guidelines',
    preview: 'Following the board meeting, we have updated our remote work policy. All employees must acknowledge the new terms.',
    receivedAt: new Date(Date.now() - 27 * 3600000),
  },
  {
    sender: 'Michael Ortega',
    category: 'lead',
    subject: 'Referral: Fintech startup consultation',
    preview: 'A former client referred a fintech startup looking for strategic consulting. Initial call scheduled for next week.',
    receivedAt: new Date(Date.now() - 50 * 3600000),
  },
];

@Component({
  selector: 'app-express-inbox',
  standalone: true,
  imports: [BadgeComponent, TimeAgoPipe, TruncatePipe],
  templateUrl: './express-inbox.component.html',
  styleUrl: './express-inbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpressInboxComponent {
  readonly emails = MOCK_EMAILS;

  asBadgeType(category: EmailEntry['category']): BadgeType {
    return category as BadgeType;
  }
}
