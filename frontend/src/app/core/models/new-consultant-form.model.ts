import { Consultant, ConsultantRole } from './consultant.model';

export interface NewConsultantForm {
  fullName: string;
  employeeId: string;
  role: ConsultantRole | '';
  availability: Consultant['availability'] | '';
  currentProject: string;
}
