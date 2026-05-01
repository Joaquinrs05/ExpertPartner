export interface AttendanceLog {
  id: string;
  employeeId: string;
  date: string;
  clockIn: Date;
  clockOut: Date | null;
  breakMinutes: number;
  status: 'on_duty' | 'off_duty' | 'on_break';
}
