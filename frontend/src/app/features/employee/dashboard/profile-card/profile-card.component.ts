import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';

interface EmployeeProfile {
  name: string;
  role: string;
  employeeId: string;
  joinedDate: string;
  baseOffice: string;
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly employee: EmployeeProfile = {
    name: 'Sarah Johnson',
    role: 'Senior Consultant',
    employeeId: 'CNS-0042',
    joinedDate: '2022-03-15',
    baseOffice: 'Madrid, Spain',
  };
}
