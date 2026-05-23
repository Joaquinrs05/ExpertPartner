# Implementation Plan: [FEATURE NAME]

**Branch**: `[##-feature-name]` | **Date**: [DATE] | **Spec**: `specs/[##-feature-name]/spec.md`

---

## Summary

[One paragraph: what this feature builds, what approach it takes, what depends on it.]

---

## Technical Context

**Framework**: [e.g., Angular 17+ standalone]
**Styling**: [e.g., Pure CSS with styles.css tokens]
**Data**: [e.g., of(MOCK_DATA).pipe(delay(200)) from XService]
**Change Detection**: [e.g., OnPush on all components]
**Dependencies**: [Which prior skill must be complete first]

---

## Constitution Check

| Article | Status | Notes |
|---|---|---|
| I — [Article name] | PASS / FAIL | [Notes] |
| II — [Article name] | PASS / FAIL | [Notes] |

---

## Project Structure

```
frontend/src/app/
├── [path/to/new-file.ts]      ← [What it does]
└── [path/to/other-file.ts]    ← [What it does]
```

---

## Data Model

```typescript
// [path/to/model.ts]
export interface [ModelName] {
  [field]: [type];
}
```

---

## Component / Service API

```typescript
// Key inputs, outputs, or public methods
```

---

## Layout

```
[ASCII sketch of the screen layout — optional but helpful for complex screens]
```
