import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Consultant } from '@core/models/consultant.model';

const MOCK_CONSULTANTS: Consultant[] = [
  { id: '1', employeeId: 'CNS-001', fullName: 'Sarah Johnson', role: 'Senior Consultant', level: 'L5 - Enterprise', avatarUrl: null, isOnline: true, availability: 'available', eomStatus: 'approved', currentProject: 'Acme Corp' },
  { id: '2', employeeId: 'CNS-002', fullName: 'Marcus Chen', role: 'Director', level: 'L5 - Enterprise', avatarUrl: null, isOnline: false, availability: 'project_assigned', eomStatus: 'timesheets_pending', currentProject: 'TechVision' },
  { id: '3', employeeId: 'CNS-003', fullName: 'Aisha Tariq', role: 'Manager', level: 'L4 - Lead', avatarUrl: null, isOnline: true, availability: 'available', eomStatus: 'awaiting_review', currentProject: null },
  { id: '4', employeeId: 'CNS-004', fullName: 'David Mueller', role: 'Associate', level: 'L2 - Mid', avatarUrl: null, isOnline: true, availability: 'project_assigned', eomStatus: 'approved', currentProject: 'Global Bank' },
  { id: '5', employeeId: 'CNS-005', fullName: 'Elena Vasquez', role: 'Senior Consultant', level: 'L4 - Lead', avatarUrl: null, isOnline: false, availability: 'on_leave', eomStatus: 'approved', currentProject: null },
  { id: '6', employeeId: 'CNS-006', fullName: 'James Okafor', role: 'Associate', level: 'L1 - Junior', avatarUrl: null, isOnline: true, availability: 'available', eomStatus: 'timesheets_pending', currentProject: null },
  { id: '7', employeeId: 'CNS-007', fullName: 'Priya Nair', role: 'Manager', level: 'L4 - Lead', avatarUrl: null, isOnline: false, availability: 'project_assigned', eomStatus: 'approved', currentProject: 'Omega Retail' },
  { id: '8', employeeId: 'CNS-008', fullName: 'Thomas Berger', role: 'Senior Consultant', level: 'L3 - Senior', avatarUrl: null, isOnline: true, availability: 'project_assigned', eomStatus: 'awaiting_review', currentProject: 'Nordic Finance' },
  { id: '9', employeeId: 'CNS-009', fullName: 'Camille Dubois', role: 'Associate', level: 'L2 - Mid', avatarUrl: null, isOnline: false, availability: 'on_leave', eomStatus: 'timesheets_pending', currentProject: null },
  { id: '10', employeeId: 'CNS-010', fullName: 'Raj Patel', role: 'Director', level: 'L5 - Enterprise', avatarUrl: null, isOnline: true, availability: 'available', eomStatus: 'approved', currentProject: 'Horizon Health' },
  { id: '11', employeeId: 'CNS-011', fullName: 'Sofia Moreno', role: 'Senior Consultant', level: 'L3 - Senior', avatarUrl: null, isOnline: false, availability: 'project_assigned', eomStatus: 'approved', currentProject: 'CityWorks' },
  { id: '12', employeeId: 'CNS-012', fullName: 'Lucas Fontaine', role: 'Associate', level: 'L1 - Junior', avatarUrl: null, isOnline: true, availability: 'available', eomStatus: 'awaiting_review', currentProject: null },
  { id: '13', employeeId: 'CNS-013', fullName: 'Hana Kobayashi', role: 'Manager', level: 'L3 - Senior', avatarUrl: null, isOnline: true, availability: 'available', eomStatus: 'timesheets_pending', currentProject: 'EastBridge' },
  { id: '14', employeeId: 'CNS-014', fullName: 'Omar Hassan', role: 'Senior Consultant', level: 'L4 - Lead', avatarUrl: null, isOnline: false, availability: 'on_leave', eomStatus: 'approved', currentProject: null },
  { id: '15', employeeId: 'CNS-015', fullName: 'Anna Lindstrom', role: 'Director', level: 'L5 - Enterprise', avatarUrl: null, isOnline: true, availability: 'project_assigned', eomStatus: 'awaiting_review', currentProject: 'ScanGroup' },
];

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly _consultants = new BehaviorSubject<Consultant[]>(MOCK_CONSULTANTS);
  readonly consultants$ = this._consultants.asObservable();

  getConsultants(): Observable<Consultant[]> {
    return this.consultants$;
  }

  filterConsultants(query: string, role: string, status: string): Observable<Consultant[]> {
    const q = query.toLowerCase();
    const filtered = this._consultants.getValue().filter((c) => {
      const matchesQuery =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.employeeId.toLowerCase().includes(q);
      const matchesRole = !role || c.role === role;
      const matchesStatus = !status || c.availability === status;
      return matchesQuery && matchesRole && matchesStatus;
    });
    return of(filtered);
  }
}
