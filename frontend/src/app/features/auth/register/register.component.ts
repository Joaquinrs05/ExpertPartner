import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  loading = signal(false);
  nameError = signal(false);
  emailError = signal(false);
  passwordError = signal(false);
  confirmError = signal(false);
  authError = signal('');

  submit(): void {
    this.nameError.set(!this.name().trim());
    this.emailError.set(!this.email().trim());
    this.passwordError.set(this.password().length < 6);
    this.confirmError.set(this.password() !== this.confirmPassword());
    if (this.nameError() || this.emailError() || this.passwordError() || this.confirmError()) return;

    this.loading.set(true);
    this.authError.set('');

    setTimeout(() => {
      const ok = this.auth.register(this.name(), this.email(), this.password());
      this.loading.set(false);
      if (ok) {
        this.router.navigate(['/employee/dashboard']);
      } else {
        this.authError.set('An account with this email already exists.');
      }
    }, 200);
  }
}
