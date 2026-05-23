import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultant, ConsultantRole } from '@core/models/consultant.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly _consultants = new BehaviorSubject<Consultant[]>([]);
  readonly consultants$ = this._consultants.asObservable();

  constructor() {
    this.load();
  }

  reload(): void {
    this.load();
  }

  private load(): void {
    from(
      this.supabase
        .from('trabajadores')
        .select('*')
        .order('full_name', { ascending: true })
    ).pipe(
      map(({ data }) => (data ?? []).map(row => this.mapRow(row)))
    ).subscribe(consultants => this._consultants.next(consultants));
  }

  getConsultants(): Observable<Consultant[]> {
    return this.consultants$;
  }

  addConsultant(consultant: Omit<Consultant, 'id'>): void {
    from(
      this.supabase.from('trabajadores').insert({
        employee_id: consultant.employeeId,
        full_name: consultant.fullName,
        role: consultant.role,
        level: consultant.level,
        avatar_url: consultant.avatarUrl,
        is_online: consultant.isOnline,
        availability: consultant.availability,
        eom_status: consultant.eomStatus,
        current_project: consultant.currentProject,
      }).select().single()
    ).pipe(
      map(({ data }) => data ? this.mapRow(data as Record<string, unknown>) : null)
    ).subscribe(newConsultant => {
      if (newConsultant) {
        this._consultants.next([...this._consultants.getValue(), newConsultant]);
      }
    });
  }

  private mapRow(row: Record<string, unknown>): Consultant {
    return {
      id: row['id'] as string,
      employeeId: row['employee_id'] as string,
      fullName: row['full_name'] as string,
      role: row['role'] as ConsultantRole,
      level: row['level'] as string,
      avatarUrl: row['avatar_url'] as string | null,
      isOnline: row['is_online'] as boolean,
      availability: row['availability'] as Consultant['availability'],
      eomStatus: row['eom_status'] as Consultant['eomStatus'],
      currentProject: row['current_project'] as string | null,
    };
  }
}
