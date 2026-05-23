import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttendanceLog, EmployeeAttendanceRow } from '@core/models/attendance.model';

const toDateStr = (d: Date): string => d.toISOString().slice(0, 10);

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly _logs = new BehaviorSubject<AttendanceLog[]>([]);
  readonly logs$ = this._logs.asObservable();

  clockIn(employeeId: string): void {
    const current = this._logs.getValue();
    const newLog: AttendanceLog = {
      id: Date.now().toString(),
      employeeId,
      date: toDateStr(new Date()),
      clockIn: new Date(),
      clockOut: null,
      breakMinutes: 0,
      status: 'on_duty',
    };
    this._logs.next([...current, newLog]);
  }

  clockOut(employeeId: string): void {
    const current = this._logs.getValue();
    const lastOpen = [...current].reverse().find(
      l => l.employeeId === employeeId && l.clockOut === null
    );
    if (!lastOpen) return;
    this._logs.next(
      current.map(l =>
        l.id === lastOpen.id ? { ...l, clockOut: new Date(), status: 'off_duty' } : l
      )
    );
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

  getTeamAttendance(_date: string): Observable<EmployeeAttendanceRow[]> {
    return of([]);
  }
}
