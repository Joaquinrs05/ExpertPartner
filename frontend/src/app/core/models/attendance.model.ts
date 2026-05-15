export interface AttendanceLog {
  id: string;
  employeeId: string;
  date: string;
  clockIn: Date;
  clockOut: Date | null;
  breakMinutes: number;
  status: 'on_duty' | 'off_duty' | 'on_break';
}

export interface DayAttendance {
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number | null;
}

export interface EmployeeAttendanceRow {
  employeeId: string;
  name: string;
  status: 'clocked-in' | 'not-clocked' | 'completed';
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number | null;
  weekHistory: DayAttendance[];
}
