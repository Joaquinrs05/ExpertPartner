import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [AvatarComponent, TranslatePipe],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeProfileComponent {
  private readonly authService = inject(AuthService);

  readonly user = this.authService.currentUser;
  photoUrl = signal('');

  firstName = computed(() => {
    const parts = (this.user()?.name ?? '').trim().split(/\s+/);
    return parts[0] ?? '';
  });

  lastName = computed(() => {
    const parts = (this.user()?.name ?? '').trim().split(/\s+/);
    return parts.slice(1).join(' ');
  });

  onPhotoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.photoUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }
}
