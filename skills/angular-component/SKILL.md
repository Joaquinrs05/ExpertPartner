---
name: angular-component
description: "Trigger: creating any component, pipe, or directive. Enforces standalone, OnPush, inject(), input()/output() signals, and AsyncPipe rules for ExpertPartner."
metadata:
  author: expertpartner
  version: 1.0
  license: MIT
---

## Hard Rules

- `standalone: true` on every component, pipe, and directive — no NgModules ever
- `changeDetection: ChangeDetectionStrategy.OnPush` on every component
- Use `inject()` — never constructor injection
- Use `input()` / `output()` signals for component I/O; fall back to `@Input()`/`@Output()` only when the signal API doesn't cover the case
- Use `AsyncPipe` in templates — no manual `.subscribe()` in component class
- Use `NgOptimizedImage` for every `<img>` tag
- No `any` types — define an interface in `core/models/` if one doesn't exist

## Component Scaffold

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ep-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  readonly title = input.required<string>();
}
```

## File Placement

| Type | Path |
|---|---|
| Feature component | `app/features/<portal>/<feature>/<name>.component.ts` |
| Shared component | `app/shared/components/<name>/<name>.component.ts` |
| Pipe | `app/shared/pipes/<name>.pipe.ts` |
| Model interface | `app/core/models/<name>.model.ts` |
| Service | `app/core/services/<name>.service.ts` |

## Decision Gates

| Situation | Action |
|---|---|
| Component used in 2+ features | Move to `shared/components/` |
| Data fetched async | Use `AsyncPipe` + `Observable` in service |
| Local UI state only | `signal()` in component class |
| Shared state across components | `BehaviorSubject` in service |
