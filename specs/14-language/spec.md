# Feature Specification: Language / i18n

**Feature Branch**: `14-language`
**Created**: 2026-05-23
**Status**: Implemented
**Files**: `core/services/language.service.ts`

---

## User Scenarios & Testing

### User Story 1 — User switches the app language (Priority: P1)

The user toggles between Spanish and English and the UI re-renders in the selected language immediately.

**Independent Test**: Call `LanguageService.toggle()` — `current` signal switches between `'es'` and `'en'`, `TranslateService.use()` is called, and `localStorage` is updated.

**Acceptance Scenarios**:

1. **Given** current language is `'es'`, **When** `toggle()` is called, **Then** language becomes `'en'` and is persisted to `localStorage`.
2. **Given** current language is `'en'`, **When** `toggle()` is called, **Then** language becomes `'es'`.
3. **Given** the user reloads the page, **When** `LanguageService` initialises, **Then** it reads the saved language from `localStorage` and restores it.

---

### User Story 2 — Language defaults to Spanish (Priority: P2)

If no language is saved, the app starts in Spanish.

**Acceptance Scenarios**:

1. **Given** no entry in `localStorage` for `ep_lang`, **When** `LanguageService` initialises, **Then** `current` is `'es'`.
2. **Given** an unrecognised value in `localStorage`, **When** `loadSaved()` runs, **Then** it defaults to `'es'`.

---

## Requirements

- **FR-001**: `LanguageService` MUST be `providedIn: 'root'`.
- **FR-002**: `current` MUST be a `signal<Lang>` where `Lang = 'es' | 'en'`.
- **FR-003**: `setLang()` MUST call `TranslateService.use()`, update `current`, and persist to `localStorage` key `'ep_lang'`.
- **FR-004**: `toggle()` MUST call `setLang()` with the opposite of `current()`.
- **FR-005**: All UI text MUST use `TranslatePipe` from `@ngx-translate/core`.

---

## Success Criteria

- **SC-001**: Language preference survives page refresh.
- **SC-002**: No hardcoded Spanish/English strings in component templates — all via `TranslatePipe`.

---

## Assumptions

- Translation files live in `assets/i18n/es.json` and `assets/i18n/en.json`.
- Only two languages are supported: `'es'` and `'en'`.
