import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultant, ConsultantRole } from '@core/models/consultant.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly zone = inject(NgZone);
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
    ).subscribe(consultants => this.zone.run(() => this._consultants.next(consultants)));
  }

  getConsultants(): Observable<Consultant[]> {
    return this.consultants$;
  }

  updateConsultant(id: string, changes: Omit<Consultant, 'id'>): void {
    this.supabase.from('trabajadores').update({
      employee_id: changes.employeeId,
      full_name: changes.fullName,
      role: changes.role,
      availability: changes.availability,
      current_project: changes.currentProject,
    }).eq('id', id).then(({ error }) => {
      if (!error) setTimeout(() => this.load(), 300);
    });
  }

  addConsultant(consultant: Omit<Consultant, 'id'>): void {
    from(
      this.supabase.from('trabajadores').insert({
        employee_id: consultant.employeeId,
        full_name: consultant.fullName,
        role: consultant.role,
        avatar_url: consultant.avatarUrl,
        is_online: consultant.isOnline,
        availability: consultant.availability,
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
      avatarUrl: row['avatar_url'] as string | null,
      isOnline: row['is_online'] as boolean,
      availability: row['availability'] as Consultant['availability'],
      currentProject: row['current_project'] as string | null,
    };
  }
}
