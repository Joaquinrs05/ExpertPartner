---
name: mock-service
description: "Trigger: creating or modifying any Angular service that returns data. Enforces the mock-data pattern with of() + delay(), BehaviorSubject for shared state, and interface-typed models."
metadata:
  author: expertpartner
  version: 1.0
  license: MIT
---

## Hard Rules

- All methods that return data must return `Observable<T>` — never raw values
- Mock data uses `of(MOCK_ARRAY).pipe(delay(200))` to simulate async
- Mutable shared state uses `BehaviorSubject<T>` — expose as `readonly stream$ = this.subject.asObservable()`
- No `any` — every mock array must have a typed interface in `core/models/`
- No HTTP calls until backend is ready — swapping `of()` for `HttpClient` is the migration path

## Service Scaffold

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { inject } from '@angular/core';
import { ExampleModel } from '@core/models/example.model';

const MOCK_DATA: ExampleModel[] = [
  { id: '1', name: 'Example' },
];

@Injectable({ providedIn: 'root' })
export class ExampleService {
  private readonly subject = new BehaviorSubject<ExampleModel[]>(MOCK_DATA);
  readonly items$ = this.subject.asObservable();

  getAll(): Observable<ExampleModel[]> {
    return of(MOCK_DATA).pipe(delay(200));
  }

  update(id: string, changes: Partial<ExampleModel>): void {
    const current = this.subject.getValue();
    this.subject.next(
      current.map(item => item.id === id ? { ...item, ...changes } : item)
    );
  }
}
```

## Decision Gates

| Need | Pattern |
|---|---|
| Read-only list | `getAll(): Observable<T[]>` with `of()` |
| Reactive shared state | `BehaviorSubject` + `.asObservable()` |
| Mutate a single item | `.getValue()` → map → `.next()` |
| Filter client-side | Pure function, not stored in service state |
| Add item | `[...current, newItem]` passed to `.next()` |

## Mock Data Conventions

- Place mock arrays as `const MOCK_X: X[]` at the top of the service file
- IDs: use human-readable strings (`'CNS-001'`, `'EMP-01'`)
- Dates: use `new Date('2026-05-12T09:00:00')` — never string dates in model fields typed as `Date`
