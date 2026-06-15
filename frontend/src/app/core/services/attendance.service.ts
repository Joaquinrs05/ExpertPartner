import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttendanceLog, EmployeeAttendanceRow } from '@core/models/attendance.model';
import { AttendanceLogRow, ProfileRow } from '@core/models/supabase-rows.model';
import { SupabaseService } from './supabase.service';

const toDateStr = (d: Date): string => d.toISOString().slice(0, 10);

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly zone = inject(NgZone);
  private readonly _logs = new BehaviorSubject<AttendanceLog[]>([]);
  readonly logs$ = this._logs.asObservable();

  private readonly _init = this.load();

  reload(): void {
    this.load();
  }

  private load(): void {
    from(
      this.supabase
        .from('attendance_logs')
        .select('*')
        .order('clock_in', { ascending: false })
    ).pipe(
      map(({ data }) => (data as AttendanceLogRow[] ?? []).map(row => this.mapRow(row)))
    ).subscribe(logs => this.zone.run(() => this._logs.next(logs)));
  }

  clockIn(employeeId: string): void {
    const now = new Date();
    from(
      this.supabase
        .from('attendance_logs')
        .insert({
          employee_id: employeeId,
          date: toDateStr(now),
          clock_in: now.toISOString(),
          clock_out: null,
          break_minutes: 0,
          status: 'on_duty',
        })
        .select()
        .single()
    ).pipe(
      map(({ data }) => data ? this.mapRow(data as AttendanceLogRow) : null)
    ).subscribe(log => {
      if (log) this.zone.run(() => this._logs.next([log, ...this._logs.getValue()]));
    });
  }

  clockOut(employeeId: string): void {
    const current = this._logs.getValue();
    const lastOpen = current.find(l => l.employeeId === employeeId && l.clockOut === null);
    if (!lastOpen) return;

    const now = new Date();
    from(
      this.supabase
        .from('attendance_logs')
        .update({ clock_out: now.toISOString(), status: 'off_duty' })
        .eq('id', lastOpen.id)
        .select()
        .single()
    ).pipe(
      map(({ data }) => data ? this.mapRow(data as AttendanceLogRow) : null)
    ).subscribe(updated => {
      if (updated) {
        this.zone.run(() => this._logs.next(current.map(l => l.id === updated.id ? updated : l)));
      }
    });
  }

  getTodayLogs(employeeId: string): Observable<AttendanceLog[]> {
    const todayStr = toDateStr(new Date());
    return this.logs$.pipe(
      map(logs => logs.filter(l => l.employeeId === employeeId && l.date === todayStr))
    );
  }

  getWeeklyHours(employeeId: string): Observable<number> {
    return this.logs$.pipe(
      map(logs => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const total = logs
          .filter(l => l.employeeId === employeeId && l.clockOut !== null)
          .filter(l => new Date(l.clockIn) >= startOfWeek)
          .reduce((sum, l) => {
            const ms = l.clockOut!.getTime() - l.clockIn.getTime();
            return sum + ms / 3600000 - l.breakMinutes / 60;
          }, 0);
        return Math.round(total * 10) / 10;
      })
    );
  }

  hasTodayLog$(employeeId: string): Observable<boolean> {
    const todayStr = toDateStr(new Date());
    return this.logs$.pipe(
      map(logs => logs.some(l => l.employeeId === employeeId && l.date === todayStr))
    );
  }

  hasOpenSession$(employeeId: string): Observable<boolean> {
    const todayStr = toDateStr(new Date());
    return this.logs$.pipe(
      map(logs => logs.some(l => l.employeeId === employeeId && l.date === todayStr && l.clockOut === null))
    );
  }

  getTeamAttendance(date: string): Observable<EmployeeAttendanceRow[]> {
    return from(
      Promise.all([
        this.supabase.from('profiles').select('id, name, employee_id').eq('role', 'employee'),
        this.supabase.from('attendance_logs').select('*').eq('date', date).order('clock_in', { ascending: true }),
      ])
    ).pipe(
      map(([profilesResult, logsResult]) => {
        const profiles = (profilesResult.data ?? []) as ProfileRow[];
        const logs = (logsResult.data ?? []) as AttendanceLogRow[];
        const rows: EmployeeAttendanceRow[] = [];

        for (const profile of profiles) {
          const empId = profile.employee_id ?? profile.id;
          const { name } = profile;
          const profileLogs = logs.filter(l => l.employee_id === (profile.employee_id ?? profile.id));

          if (profileLogs.length === 0) {
            rows.push({ employeeId: empId, name, status: 'not-clocked', clockIn: null, clockOut: null, totalHours: null, weekHistory: [] });
            continue;
          }

          const hasOpenSession = profileLogs.some(l => !l.clock_out);
          const firstIn = profileLogs[profileLogs.length - 1].clock_in;
          const lastCompletedLog = [...profileLogs].reverse().find(l => !!l.clock_out);
          const lastOut = lastCompletedLog ? lastCompletedLog.clock_out : null;

          const totalHours = profileLogs.reduce((sum, l) => {
            if (!l.clock_out) return sum;
            const ms = new Date(l.clock_out).getTime() - new Date(l.clock_in).getTime();
            return sum + ms / 3600000;
          }, 0);

          const status = hasOpenSession
            ? 'clocked-in'
            : totalHours >= 8 ? 'completed' : 'clocked-in';

          const sessions = profileLogs.map(l => {
            const hasOut = !!l.clock_out;
            const sessionMs = hasOut
              ? new Date(l.clock_out!).getTime() - new Date(l.clock_in).getTime()
              : null;
            return {
              date: l.date,
              clockIn: l.clock_in,
              clockOut: hasOut ? l.clock_out : null,
              totalHours: sessionMs !== null ? Math.round((sessionMs / 3600000) * 10) / 10 : null,
            };
          });

          rows.push({
            employeeId: empId,
            name,
            status,
            clockIn: firstIn,
            clockOut: lastOut,
            totalHours: Math.round(totalHours * 10) / 10,
            weekHistory: sessions,
          });
        }

        return rows;
      })
    );
  }

  private mapRow(row: AttendanceLogRow): AttendanceLog {
    return {
      id: row.id,
      employeeId: row.employee_id,
      date: row.date,
      clockIn: new Date(row.clock_in),
      clockOut: row.clock_out ? new Date(row.clock_out) : null,
      breakMinutes: row.break_minutes ?? 0,
      status: row.status,
    };
  }
}
