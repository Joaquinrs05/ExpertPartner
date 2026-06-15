---
name: badge-component
description: "Trigger: rendering any status badge, category pill, or label chip. Enforces pill shape, token-based colors, and the canonical badge type union for ExpertPartner."
metadata:
  author: expertpartner
  version: 1.0
  license: MIT
---

## Hard Rules

- All badges use `border-radius: 9999px` (pill shape)
- Colors come exclusively from CSS token pairs — never hardcode hex values
- The canonical `BadgeType` union must be extended (not duplicated) when adding new badge types
- `BadgeComponent` in `shared/components/badge/` is the single badge implementation — do not create one-off badge styles in feature components

## Canonical Badge Types

```typescript
export type BadgeType =
  | 'urgent'       // --color-urgent + --color-urgent-bg
  | 'lead'         // --color-lead + --color-lead-bg
  | 'finance'      // --color-finance + --color-finance-bg
  | 'update'       // --color-muted + #F3F4F6
  | 'clock-in'     // white + #10B981 (emerald)
  | 'clock-out'    // white + #EF4444 (urgent)
  | 'live'         // white + emerald + pulse animation
  | 'total'        // --color-muted + #F3F4F6
  | 'available'    // emerald text + emerald-bg
  | 'on-leave'     // --color-muted + #F3F4F6
  | 'project-assigned'  // --color-lead + --color-lead-bg
  | 'approved'     // emerald
  | 'pending'      // amber: #D97706 + #FEF3C7
  | 'in-progress'  // --color-lead + --color-lead-bg;
```

## CSS Pattern

```css
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge--urgent    { color: var(--color-urgent);  background: var(--color-urgent-bg); }
.badge--lead      { color: var(--color-lead);    background: var(--color-lead-bg); }
.badge--finance   { color: var(--color-finance); background: var(--color-finance-bg); }
.badge--live      { color: #fff; background: var(--color-emerald); animation: pulse 2s infinite; }
```

## Component Usage

```html
<!-- In any template -->
<ep-badge [type]="'urgent'" />
<ep-badge [type]="employee.status" />
```

## Decision Gates

| Situation | Action |
|---|---|
| New badge needed | Add type to `BadgeType` union + CSS class in `badge.component.css` |
| Badge with icon | Add optional `icon = input<string>()` to `BadgeComponent` |
| Badge in table cell | Wrap in `<td>` — no extra wrapper div |
