export type ConsultantRole = 'Jefe de Obra' | 'Aparejador' | 'Encargado' | 'Oficial' | 'Peón' | 'Administrativo' | 'Técnico PRL' | 'Project Manager';

export interface Consultant {
  id: string;
  employeeId: string;
  fullName: string;
  role: ConsultantRole;
  avatarUrl: string | null;
  isOnline: boolean;
  availability: 'available' | 'project_assigned' | 'on_leave';
  currentProject: string | null;
}
