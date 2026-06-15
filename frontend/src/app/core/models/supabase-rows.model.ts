export interface AttendanceLogRow {
  id: string;
  employee_id: string;
  date: string;
  clock_in: string;
  clock_out: string | null;
  break_minutes: number;
  status: 'on_duty' | 'off_duty' | 'on_break';
}

export interface ConsultantRow {
  id: string;
  employee_id: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  is_online: boolean;
  availability: 'available' | 'project_assigned' | 'on_leave';
  current_project: string | null;
}

export interface EmailRow {
  id: string;
  subject: string;
  from_address: string;
  preview: string;
  category: 'URGENT' | 'FINANCE' | 'UPDATE';
  received_at: string;
  is_read: boolean;
  is_starred: boolean;
  body?: string;
}

export interface ProfileRow {
  id: string;
  name: string;
  employee_id: string | null;
}
