import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { BadgeComponent, BadgeType } from '@shared/components/badge/badge.component';
import { Consultant } from '@core/models/consultant.model';

@Component({
  selector: 'app-consultant-row',
  standalone: true,
  imports: [AvatarComponent, BadgeComponent],
  templateUrl: './consultant-row.component.html',
  styleUrl: './consultant-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantRowComponent {
  consultant = input.required<Consultant>();
  edit = output<Consultant>();

  availabilityBadge = computed<BadgeType>(() => {
    const map: Record<Consultant['availability'], BadgeType> = {
      available: 'available',
      project_assigned: 'project-assigned',
      on_leave: 'on-leave',
    };
    return map[this.consultant().availability];
  });

}
