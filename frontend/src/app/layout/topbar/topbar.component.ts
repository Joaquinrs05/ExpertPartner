import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  private readonly authService = inject(AuthService);
  readonly langService = inject(LanguageService);

  sidebarToggle = output<void>();

  readonly user = this.authService.currentUser;
  readonly role = this.authService.role;

  readonly initials = computed(() => {
    const parts = (this.user()?.name ?? '').trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  });

  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }

  onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }
}
