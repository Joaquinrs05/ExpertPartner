import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttendanceLog, EmployeeAttendanceRow } from '@core/models/attendance.model';

const today = new Date();
const d = (daysAgo: number): Date => {
  const d = new Date(today);
  d.setDate(today.getDate() - daysAgo);
  return d;
};
const withTime = (base: Date, h: number, m: number): Date => {
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
};
const toDateStr = (d: Date): string => d.toISOString().slice(0, 10);

const MOCK_LOGS: AttendanceLog[] = [
  {
    id: '1', employeeId: 'EMP-001', date: toDateStr(d(5)),
    clockIn: withTime(d(5), 9, 0), clockOut: withTime(d(5), 17, 30),
    breakMinutes: 30, status: 'off_duty',
  },
  {
    id: '2', employeeId: 'EMP-001', date: toDateStr(d(4)),
    clockIn: withTime(d(4), 8, 45), clockOut: withTime(d(4), 17, 15),
    breakMinutes: 45, status: 'off_duty',
  },
  {
    id: '3', employeeId: 'EMP-001', date: toDateStr(d(3)),
    clockIn: withTime(d(3), 9, 10), clockOut: withTime(d(3), 17, 40),
    breakMinutes: 30, status: 'off_duty',
  },
  {
    id: '4', employeeId: 'EMP-001', date: toDateStr(d(2)),
    clockIn: withTime(d(2), 9, 0), clockOut: withTime(d(2), 18, 0),
    breakMinutes: 60, status: 'off_duty',
  },
  {
    id: '5', employeeId: 'EMP-001', date: toDateStr(d(1)),
    clockIn: withTime(d(1), 8, 30), clockOut: withTime(d(1), 16, 30),
    breakMinutes: 30, status: 'off_duty',
  },
];

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly _logs = new BehaviorSubject<AttendanceLog[]>([...MOCK_LOGS]);
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
