# Implementation Plan: Admin Dashboard

**Branch**: `05-admin-dashboard` | **Date**: 2026-05-23 | **Spec**: `specs/05-admin-dashboard/spec.md`

---

## Summary

Build the admin dashboard with KPI cards, Activity Monitor table, and Express Inbox panel. Introduces shared components (`KpiCardComponent`, `BadgeComponent`) and shared pipes (`TimeAgoPipe`, `TruncatePipe`) that will be reused across the app.

---

## Technical Context

**Framework**: Angular 17+ standalone components
**Styling**: Pure CSS with `styles.css` tokens
**Data**: `of(MOCK_DATA).pipe(delay(200))` from `AttendanceService` and `EmailService`
**Change Detection**: `OnPush` on all components
**Dependencies**: Skill 03 (layout shell) must be complete — dashboard renders inside `AdminShellComponent`

---

## Constitution Check

| Article | Status | Notes |
|---|---|---|
| I — Standalone | PASS | All new components standalone |
| II — No UI libs | PASS | Pure CSS, no library badges |
| III — No `any` | PASS | `AttendanceEvent`, `EmailPreview` interfaces defined |
| IV — Mock as observables | PASS | Services use `of()` + `delay(200)` |
| IX — OnPush | PASS | All components |

---

## Project Structure

```
frontend/src/app/
├── core/
│   ├── models/
│   │   ├── attendance.model.ts          ← AttendanceEvent interface
│   │   └── email.model.ts               ← EmailPreview interface
│   └── services/
│       ├── attendance.service.ts        ← Mock getRecentActivity()
│       └── email.service.ts             ← Mock getEmailPreviews()
├── shared/
│   ├── components/
│   │   ├── badge/
│   │   │   ├── badge.component.ts       ← Input: type → CSS class + label
│   │   │   └── badge.component.css
│   │   └── kpi-card/
│   │       ├── kpi-card.component.ts    ← Inputs: title, value, badge, badgeType
│   │       └── kpi-card.component.css
│   └── pipes/
│       ├── time-ago.pipe.ts             ← Date → "X mins ago"
│       └── truncate.pipe.ts             ← string → truncated + "…"
└── features/
    └── admin/
        └── dashboard/
            ├── dashboard.component.ts   ← Orchestrates layout, injects services
            ├── dashboard.component.css  ← Two-column layout
            ├── activity-monitor/
            │   ├── activity-monitor.component.ts
            │   └── activity-monitor.component.css
            └── express-inbox/
                ├── express-inbox.component.ts
                └── express-inbox.component.css
```

---

## Component API

```typescript
// KpiCardComponent inputs
title: string
value: string
badgeType: 'total' | 'live'

// BadgeComponent input
type: 'urgent' | 'lead' | 'finance' | 'clock-in' | 'clock-out' | 'live' | 'total' | 'update'

// TimeAgoPipe
transform(value: Date): string  // "12 mins ago" | "1 hour ago" | "Yesterday"

// TruncatePipe
transform(value: string, limit: number): string
```

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  [KPI: Total Active]    [KPI: Currently Working]    │
│  [+ Add Employee]  [Review Emails]                  │
├──────────────────────────┬──────────────────────────┤
│   Activity Monitor (60%) │   Express Inbox (40%)    │
│   ─────────────────────  │   ─────────────────────  │
│   Name  │ Badge │ Time   │   Badge  Sender  Time    │
│   ...                    │   Subject preview...     │
│   View All Activity →    │   Open Full Inbox ↗      │
└──────────────────────────┴──────────────────────────┘
```

Mobile: stacks vertically (Activity Monitor first, then Express Inbox).
