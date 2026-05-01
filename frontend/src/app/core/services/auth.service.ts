import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user.model';

interface MockUser extends User {
  password: string;
}

const MOCK_USERS: MockUser[] = [
  { id: '1', name: 'Admin User', email: 'admin@expertpartner.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'María García', email: 'employee@expertpartner.com', password: 'emp123', role: 'employee', employeeId: 'EMP-001' },
];

const STORAGE_KEY = 'ep_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly _currentUser = signal<User | null>(this.loadFromStorage());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly role = computed(() => this._currentUser()?.role ?? null);

  login(email: string, password: string): boolean {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...user } = found;
    this._currentUser.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  register(name: string, email: string, password: string, role: 'admin' | 'employee' = 'employee'): boolean {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) return false;
    const newUser: MockUser = { id: String(MOCK_USERS.length + 1), name, email, password, role };
    MOCK_USERS.push(newUser);
    const { password: _, ...user } = newUser;
    this._currentUser.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  private loadFromStorage(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
