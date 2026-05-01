import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamService } from '@core/services/team.service';
import { AuthService } from '@core/services/auth.service';
import { ConsultantRowComponent } from './consultant-row/consultant-row.component';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [ConsultantRowComponent],
  templateUrl: './admin-team.component.html',
  styleUrl: './admin-team.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTeamComponent {
  private readonly teamService = inject(TeamService);
  private readonly authService = inject(AuthService);

  readonly pageSize = 10;

  allConsultants = toSignal(this.teamService.consultants$, { initialValue: [] });
  searchQuery = signal('');
  selectedRole = signal('');
  selectedStatus = signal('');
  currentPage = signal(1);

  canImport = computed(() => this.authService.currentUser()?.role === 'admin');

  filteredConsultants = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const role = this.selectedRole();
    const status = this.selectedStatus();
    return this.allConsultants().filter((c) => {
      const matchesQuery =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.employeeId.toLowerCase().includes(q);
      const matchesRole = !role || c.role === role;
      const matchesStatus = !status || c.availability === status;
      return matchesQuery && matchesRole && matchesStatus;
    });
  });

  paginatedConsultants = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredConsultants().slice(start, start + this.pageSize);
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredConsultants().length / this.pageSize))
  );

  pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  showingLabel = computed(() => {
    const total = this.filteredConsultants().length;
    if (total === 0) return 'No consultants found';
    const start = (this.currentPage() - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage() * this.pageSize, total);
    return `Showing ${start} to ${end} of ${total} consultants`;
  });

  onSearch(e: Event): void {
    this.searchQuery.set((e.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  onRoleChange(e: Event): void {
    this.selectedRole.set((e.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  onStatusChange(e: Event): void {
    this.selectedStatus.set((e.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  goToPage(p: number): void {
    const clamped = Math.max(1, Math.min(p, this.totalPages()));
    this.currentPage.set(clamped);
  }
}
