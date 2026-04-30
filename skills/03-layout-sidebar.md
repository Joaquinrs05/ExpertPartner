# Skill 03 — Layout: Sidebar + Topbar + Shells

## Goal
Build the app shell components used by both portals.

## Status: ⬜ Pending

## Components to build

### `layout/sidebar/sidebar.component`
- Deep Navy background (`#0F172A`), fixed 260px width
- Logo + app name at top
- Navigation links with router active state
- Active state: 4px left emerald bar + tinted background
- Thin-stroke icons (2px)
- Admin sidebar: Dashboard, Emails, Team Management, Attendance, Settings
- Employee sidebar: My Dashboard, My Attendance + avatar/name/ID at bottom

### `layout/topbar/topbar.component`
- 64px height, white background, 1px bottom border
- Search input (left)
- Notification bell + user avatar (right)

### `layout/admin-shell/admin-shell.component`
- Grid layout: sidebar (260px fixed) + main area (flex-grow)
- Main area: topbar (64px) + `<router-outlet>`

### `layout/employee-shell/employee-shell.component`
- Same structure as admin-shell but uses the employee sidebar variant

## Responsive behavior
- Mobile (< 768px): sidebar collapses to bottom nav or hamburger menu
- Tablet (768px–1279px): sidebar collapses to icon-only (48px)
- Desktop (≥ 1280px): full sidebar 260px

## Output
- Both shells navigable with router-outlet rendering placeholder content
