import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = signal('');
  password = signal('');
  loading = signal(false);
  emailError = signal(false);
  passwordError = signal(false);
  authError = signal('');

  async submit(): Promise<void> {
    this.emailError.set(!this.email().trim());
    this.passwordError.set(!this.password().trim());
    if (this.emailError() || this.passwordError()) return;

    this.loading.set(true);
    this.authError.set('');

    const ok = await this.auth.login(this.email(), this.password());
    this.loading.set(false);

    if (ok) {
      const role = this.auth.role();
      this.router.navigate([role === 'admin' ? '/admin/dashboard' : '/employee/dashboard']);
    } else {
      this.authError.set('Email o contraseña incorrectos.');
    }
  }
}
