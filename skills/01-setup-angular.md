# Skill 01 — Angular Project Setup

## Goal
Initialize the Angular 17+ project inside `frontend/`, configure TypeScript strict mode, install dependencies, and wire up global CSS tokens.

## Status: ⬜ Pending

## Steps

### 1. Initialize Angular project
```bash
cd frontend
ng new expertpartner --standalone --routing --style=css --strict
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure `tsconfig.json`
- `strict: true`
- `strictTemplates: true`
- Path aliases: `@core/*`, `@shared/*`, `@features/*`, `@layout/*`

### 4. Set up `src/styles.css`
Add all CSS custom properties (design tokens) from CLAUDE.md.

### 5. Set up `src/index.html`
Load Inter font from Google Fonts.

### 6. Configure `app.config.ts`
Wire up `provideRouter` with the routes from `app.routes.ts`.

### 7. Configure `app.routes.ts`
Define lazy-loaded routes for auth, admin, and employee feature modules.

## Output
- Running dev server: `ng serve` → `http://localhost:4200`
- Empty app with global tokens available
- Folder structure matching `structure.md`
