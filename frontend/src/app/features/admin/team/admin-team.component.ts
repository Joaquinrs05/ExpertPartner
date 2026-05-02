import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamService } from '@core/services/team.service';
import { AuthService } from '@core/services/auth.service';
import { Consultant, ConsultantRole } from '@core/models/consultant.model';
import { ConsultantRowComponent } from './consultant-row/consultant-row.component';

interface NewConsultantForm {
  fullName: string;
  employeeId: string;
  role: ConsultantRole | '';
  level: string;
  availability: Consultant['availability'] | '';
  eomStatus: Consultant['eomStatus'] | '';
  currentProject: string;
}

const EMPTY_FORM: NewConsultantForm = {
  fullName: '',
  employeeId: '',
  role: '',
  level: '',
  availability: '',
  eomStatus: '',
  currentProject: '',
};

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [ConsultantRowComponent, FormsModule],
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

  // Modal
  showModal = signal(false);
  formError = signal('');
  form = signal<NewConsultantForm>({ ...EMPTY_FORM });

  // Import Excel
  importToast = signal<string | null>(null);

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

  openModal(): void {
    this.form.set({ ...EMPTY_FORM });
    this.formError.set('');
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  updateField<K extends keyof NewConsultantForm>(key: K, value: NewConsultantForm[K]): void {
    this.form.update(f => ({ ...f, [key]: value }));
  }

  submitForm(): void {
    const f = this.form();
    if (!f.fullName.trim() || !f.employeeId.trim() || !f.role || !f.level || !f.availability || !f.eomStatus) {
      this.formError.set('Please fill in all required fields.');
      return;
    }
    this.teamService.addConsultant({
      fullName: f.fullName.trim(),
      employeeId: f.employeeId.trim(),
      role: f.role as ConsultantRole,
      level: f.level,
      availability: f.availability as Consultant['availability'],
      eomStatus: f.eomStatus as Consultant['eomStatus'],
      currentProject: f.currentProject.trim() || null,
      avatarUrl: null,
      isOnline: false,
    });
    this.closeModal();
  }

  onImportExcel(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    (e.target as HTMLInputElement).value = '';
    if (!file) return;
    this.importToast.set(`"${file.name}" received. Processing will begin once connected to n8n.`);
    setTimeout(() => this.importToast.set(null), 5000);
  }
}
