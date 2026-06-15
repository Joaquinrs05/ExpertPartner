---
name: table-component
description: "Trigger: building any data table in ExpertPartner. Enforces no-vertical-borders rule, row hover, sticky header, and OnPush rendering with AsyncPipe."
metadata:
  author: expertpartner
  version: 1.0
  license: MIT
---

## Hard Rules

- No vertical borders — only 1px horizontal dividers between rows
- Row hover background: `#F1F5F9`
- Sticky `<thead>` with `position: sticky; top: 0; z-index: 1`
- Use `AsyncPipe` in template — no `.subscribe()` in component
- Use `TrackByFunction` on `*ngFor` to avoid full re-renders
- Column headers: `label-sm` scale (12px, weight 600, uppercase)

## CSS Template

```css
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  position: sticky;
  top: 0;
  background: var(--color-card);
  padding: var(--space-sm) var(--space-md);
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-muted);
  border-bottom: 1px solid var(--color-border);
}

tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background 150ms ease;
}

tbody tr:hover {
  background: #F1F5F9;
}

tbody td {
  padding: var(--space-sm) var(--space-md);
  font-size: 14px;
  color: var(--color-text);
}
```

## Component Scaffold

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.id) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.status }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ExampleTableComponent {
  readonly rows = input.required<ExampleModel[]>();
}
```

## Decision Gates

| Situation | Action |
|---|---|
| Data from service | Pass via `input()` from parent using `AsyncPipe` |
| Row click action | `output()` emitting the row model |
| Empty state | Add `@empty` block inside `@for` |
| Expandable row | Toggle `isExpanded` signal on row id, render detail below `<tr>` |
