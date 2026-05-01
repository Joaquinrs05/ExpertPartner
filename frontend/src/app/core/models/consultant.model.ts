export type ConsultantRole = 'Senior Consultant' | 'Associate' | 'Manager' | 'Director';

export interface Consultant {
  id: string;
  employeeId: string;
  fullName: string;
  role: ConsultantRole;
  level: string;
  avatarUrl: string | null;
  isOnline: boolean;
  availability: 'available' | 'project_assigned' | 'on_leave';
  eomStatus: 'approved' | 'timesheets_pending' | 'awaiting_review';
  currentProject: string | null;
}
