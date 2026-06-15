# Skill 11 — Team: Onboarding Tabs (Nuevas altas / Activos)

## Goal
Extend `/admin/team` with a tab system. The existing consultant table becomes the **Activos** tab. A new **Nuevas altas** tab shows employees currently going through the onboarding automation, with a step-by-step progress tracker per employee.

## Design Reference
Follow the visual language of `team_management_expert_partner_1`. Tabs use an emerald underline for the active state. Step tracker uses small pill badges per step.

---

## Changes to existing files

### `AdminTeamComponent`
- Add a `activeTab: 'activos' | 'nuevas-altas'` signal
- Render a `<div class="tabs">` header with two tab buttons above the existing content
- Conditionally render the Activos table or the Nuevas altas table based on `activeTab`
- Do NOT break or modify any existing Activos logic

### Tab header styles
```css
.tabs { border-bottom: 1px solid var(--color-border); margin-bottom: var(--space-lg); }
.tab-btn { ... padding, no background, no border }
.tab-btn.active { border-bottom: 2px solid var(--color-emerald); color: var(--color-emerald); }
```
Animate tab content switch with a CSS fade: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }` applied to the content wrapper.

---

## New components

### `OnboardingTableComponent`
- Path: `features/admin/team/onboarding-table/`
- Input: `rows: OnboardingEmployee[]`
- Columns: Avatar + Nombre, Fecha de inicio, Puesto, Estado, Progreso de automatización
- The "Progreso" column renders a `StepTrackerComponent` inline
- Table: no vertical borders, row hover, sticky header

### `StepTrackerComponent`
- Path: `features/admin/team/step-tracker/`
- Input: `steps: OnboardingStep[]`
- Renders each step as a small pill: name + icon (✓ done, spinner in-progress, dot pending)
- Steps flow horizontally with a connecting line between them
- Done → emerald; In progress → amber; Pending → gray

---

## New service

### `OnboardingService`
- Path: `core/services/onboarding.service.ts`
- Method: `getNewHires(): Observable<OnboardingEmployee[]>`
- Returns mock array wrapped in `of(...).pipe(delay(200))`

---

## New interfaces (add to `core/models/`)

### `onboarding.model.ts`
```typescript
export type OnboardingStepStatus = 'pending' | 'in-progress' | 'done';

export interface OnboardingStep {
  label: string;   // e.g. 'Contrato', 'Alta SS', 'Accesos', 'Email corp.'
  status: OnboardingStepStatus;
}

export type OnboardingStatus = 'en-proceso' | 'completado' | 'pendiente';

export interface OnboardingEmployee {
  id: string;
  name: string;
  avatarInitials: string;
  startDate: string;       // 'YYYY-MM-DD'
  position: string;
  status: OnboardingStatus;
  steps: OnboardingStep[];
}
```

### Mock data — minimum 5 employees
Varied states to cover all combinations:
- 1 completado (all steps done)
- 2 en-proceso (some steps done, one in-progress)
- 2 pendiente (no steps started)

Fixed steps for all employees (same 4 steps, different statuses):
1. Contrato
2. Alta SS
3. Accesos IT
4. Email corporativo

---

## Status badge
Reuse `BadgeComponent`. Add types if not present:
- `en-proceso` → amber (`--color-amber` / `--color-amber-bg`)
- `completado` → green (`--color-emerald` / `--color-success-bg`)
- `pendiente` → gray (`--color-muted` / `--color-finance-bg`)

---

## Acceptance Criteria (same as feature_list.json)
1. Two tabs visible: Activos and Nuevas altas
2. Activos tab: existing consultant table works identically to pre-skill-11
3. Nuevas altas tab: table with avatar, name, start date, position, status badge, step tracker
4. StepTrackerComponent renders each step with correct color per status
5. OnboardingService returns ≥ 5 mock employees
6. Status badge: En proceso (amber), Completado (green), Pendiente (gray)
7. Tab switch has fade animation
8. Active tab has emerald underline
9. Activos filters and pagination still work
10. `/admin/team` renders without errors on both tabs
