import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultant, ConsultantRole } from '@core/models/consultant.model';
import { ConsultantRow } from '@core/models/supabase-rows.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly zone = inject(NgZone);
  private readonly _consultants = new BehaviorSubject<Consultant[]>([]);
  readonly consultants$ = this._consultants.asObservable();

  private readonly _init = this.load();

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
      map(({ data }) => (data as ConsultantRow[] ?? []).map(row => this.mapRow(row)))
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
      map(({ data }) => data ? this.mapRow(data as ConsultantRow) : null)
    ).subscribe(newConsultant => {
      if (newConsultant) {
        this._consultants.next([...this._consultants.getValue(), newConsultant]);
      }
    });
  }

  private mapRow(row: ConsultantRow): Consultant {
    return {
      id: row.id,
      employeeId: row.employee_id,
      fullName: row.full_name,
      role: row.role as ConsultantRole,
      avatarUrl: row.avatar_url,
      isOnline: row.is_online,
      availability: row.availability,
      currentProject: row.current_project,
    };
  }
}
