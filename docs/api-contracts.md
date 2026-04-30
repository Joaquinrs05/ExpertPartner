# API Contracts

> This file will define the backend API endpoints and data models when the backend phase begins.
> For now, all data is mocked in Angular services.

## Status: ⬜ Pending (Phase 2 — Backend)

## Planned Endpoints

### Auth
```
POST /auth/login        { email, password } → { token, user }
POST /auth/logout
GET  /auth/me           → User
```

### Attendance
```
GET  /attendance?employeeId=&date=   → AttendanceLog[]
POST /attendance/clock-in            { employeeId } → AttendanceLog
PUT  /attendance/:id/clock-out       → AttendanceLog
GET  /attendance/weekly?employeeId=  → { totalHours, target }
```

### Emails
```
GET  /emails             → FilteredEmail[]
PUT  /emails/:id/star    → FilteredEmail
PUT  /emails/:id/read    → FilteredEmail
```

### Team
```
GET  /consultants        → Consultant[]
POST /consultants        { ...data } → Consultant
PUT  /consultants/:id    → Consultant
DELETE /consultants/:id
```

## Data Models
See `core/models/` in the Angular project for current TypeScript interfaces.
