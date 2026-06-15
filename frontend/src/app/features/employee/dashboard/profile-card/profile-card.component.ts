import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { EmployeeProfile } from '@core/models/employee-profile.model';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarComponent, RouterLink, TranslatePipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly employee: EmployeeProfile = {
    name: 'Sarah Johnson',
    role: 'Jefe de Obra',
    employeeId: 'CNS-0042',
    joinedDate: '2022-03-15',
    baseOffice: 'Madrid, Spain',
  };
}
