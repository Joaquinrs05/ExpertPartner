import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { User } from '@core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly router = inject(Router);

  private readonly _currentUser = signal<User | null>(this.loadFromStorage());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly role = computed(() => this._currentUser()?.role ?? null);

  async login(email: string, password: string): Promise<boolean> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return false;

    const profile = await this.fetchProfile(data.user.id);
    if (!profile) return false;

    this._currentUser.set(profile);
    localStorage.setItem('ep_user', JSON.stringify(profile));
    return true;
  }

  async register(name: string, email: string, password: string, role: 'admin' | 'employee' = 'employee'): Promise<boolean> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } },
    });
    if (error || !data.user) return false;

    const profile = await this.fetchProfile(data.user.id);
    if (!profile) return false;

    this._currentUser.set(profile);
    localStorage.setItem('ep_user', JSON.stringify(profile));
    return true;
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this._currentUser.set(null);
    localStorage.removeItem('ep_user');
    this.router.navigate(['/login']);
  }

  private async fetchProfile(userId: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id, name, email, role, employee_id')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      id: data['id'],
      name: data['name'],
      email: data['email'],
      role: data['role'] as 'admin' | 'employee',
      employeeId: data['employee_id'] ?? undefined,
    };
  }

  private loadFromStorage(): User | null {
    try {
      const raw = localStorage.getItem('ep_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
