import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { EmailService } from '@core/services/email.service';
import { BadgeComponent, BadgeType } from '../../../../shared/components/badge/badge.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-express-inbox',
  standalone: true,
  imports: [AsyncPipe, BadgeComponent, TimeAgoPipe, TruncatePipe, TranslatePipe],
  templateUrl: './express-inbox.component.html',
  styleUrl: './express-inbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpressInboxComponent {
  private readonly emailService = inject(EmailService);

  readonly emails$ = this.emailService.getEmails().pipe(
    map(emails => emails.slice(0, 5))
  );

  categoryBadge(category: string): BadgeType {
    return category.toLowerCase() as BadgeType;
  }
}
