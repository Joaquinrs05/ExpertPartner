# Feature Specification: Admin — Nómina File Import

**Feature Branch**: `13-imports`
**Created**: 2026-05-23
**Status**: Implemented
**Files**: `features/admin/imports/admin-imports.component.ts`, `core/services/imports.service.ts`, `core/models/import-file.model.ts`

---

## User Scenarios & Testing

### User Story 1 — Admin uploads a nómina file for processing (Priority: P1)

The admin selects a payroll file and the system sends it to two n8n webhooks simultaneously (Nómina 640 and Nómina 642), then shows the resulting download links.

**Independent Test**: Upload any file — upload state goes `idle → uploading → success`. Two result links appear (url_640, url_642) if the webhooks respond.

**Acceptance Scenarios**:

1. **Given** a file is selected, **When** upload starts, **Then** state becomes `uploading` and message shows `"Subiendo '[filename]'..."`.
2. **Given** both webhooks respond with URLs, **When** both complete, **Then** `result640` and `result642` signals are set and history reloads.
3. **Given** upload succeeds, **When** 5 seconds pass, **Then** state resets to `idle`.
4. **Given** a webhook call fails, **When** error is caught, **Then** `onDone` still fires and the other result is shown.

---

### User Story 2 — Admin reviews past upload history (Priority: P2)

A table shows the last 50 uploaded files with filename, date, and links to the generated documents.

**Independent Test**: On page load, history table populates from `import_history` Supabase table (or shows empty state).

**Acceptance Scenarios**:

1. **Given** the component initialises, **When** `ngOnInit` runs, **Then** `loadHistory()` queries Supabase and populates `history` signal.
2. **Given** a new upload completes, **When** history reloads, **Then** the new entry appears at the top.

---

## Requirements

- **FR-001**: File input MUST reset after selection (`input.value = ''`) to allow re-uploading the same file.
- **FR-002**: Both webhooks (`/webhook/Nomina640`, `/webhook/Nomina642`) MUST be called in parallel via `HttpClient.post`.
- **FR-003**: Both webhook calls MUST complete (success or error) before state transitions to `success`.
- **FR-004**: History MUST be loaded from Supabase table `import_history`, ordered by `uploaded_at DESC`, limited to 50.
- **FR-005**: `uploadState` MUST follow: `idle → uploading → success → idle` (5s auto-reset).
- **FR-006**: `result640` and `result642` links MUST only render when non-null.

### Key Entities

- **HistoryEntry**: `{ id, original_name, uploaded_at, url_640: string | null, url_642: string | null }`
- **UploadState**: `'idle' | 'uploading' | 'success' | 'error'`

---

## Success Criteria

- **SC-001**: Parallel webhook calls complete independently — one failure doesn't block the other.
- **SC-002**: History table updates immediately after each upload without page refresh.
- **SC-003**: Upload button is disabled / shows spinner during `uploading` state.

---

## Assumptions

- Webhooks are n8n flows running locally or on a hosted n8n instance.
- Supabase `import_history` table exists with the columns defined in `HistoryEntry`.
- No file type validation this phase — any file is accepted.
