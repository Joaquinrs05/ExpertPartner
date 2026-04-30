---
name: Strategic Enterprise
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  table-header:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1440px
  sidebar-width: 260px
  gutter: 24px
---

## Brand & Style

This design system is engineered for high-stakes consultancy management, where clarity, authority, and precision are paramount. The brand personality is "The Expert Partner"—composed, reliable, and technologically advanced. It avoids unnecessary decoration in favor of functional elegance.

The chosen style is **Corporate / Modern**. It leverages a structured hierarchy, ample whitespace, and a sophisticated color interlocking system to organize complex data. The aesthetic evokes the feeling of a high-end physical workspace: quiet, organized, and focused on performance. It utilizes a refined "Enterprise SaaS" visual language that balances technical capability with executive-level polish.

## Colors

The palette is anchored by **Deep Navy (#0F172A)** and **Slate Greys**, establishing a foundation of stability and corporate rigor. These "Deep Blues" serve as the primary structural color for navigation and headings.

**Emerald Green (#10B981)** is utilized as the singular "Crisp Accent" for high-priority actions, success states, and growth indicators. This choice provides a high-contrast focal point against the cooler neutral tones, guiding the user toward conversion points and completed tasks. 

Neutral surfaces use a tiered system of off-whites and light slates to differentiate between the application background and interactive card surfaces, ensuring the UI feels layered rather than flat.

## Typography

The design system exclusively uses **Inter** for its exceptional legibility in data-heavy environments. The typographic scale is tightly controlled to maintain a professional "Information Density" without overwhelming the user.

- **Headlines:** Use tighter letter spacing and heavier weights to command attention on dashboards.
- **Body Text:** Optimized for long-form consultancy reports and project descriptions with a generous 1.6 line height for readability.
- **Data Labels:** Small, semi-bold, and slightly tracked-out uppercase labels are used for metadata and table headers to provide clear distinction from interactive data points.

## Layout & Spacing

This design system utilizes a **Fixed Grid** philosophy for primary content areas to ensure executive summaries and reports remain readable on ultra-wide monitors.

- **The Sidebar:** A fixed 260px vertical navigation on the left provides a persistent anchor. It uses a darker tonal value (Deep Navy) to separate navigation from the workspace.
- **Rhythm:** A strict 4px/8px baseline grid is used. Dashboards utilize a 24px gutter between cards to create a sense of "breathable data."
- **Padding:** Consistent 24px internal padding is applied to all cards and table containers to maintain the "Enterprise SaaS" feel.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of heavy drop shadows, this design system uses "Soft Elevation" to lift interactive components.

- **Level 0 (Base):** The main application background (#F8FAFC).
- **Level 1 (Surface):** White cards and containers. These use a 1px border (#E2E8F0) and no shadow for a clean, flat appearance.
- **Level 2 (Active/Floating):** Used for hover states on cards or dropdown menus. These utilize an ambient, diffused shadow: `0px 4px 12px rgba(15, 23, 42, 0.08)`.
- **Contrast Depth:** The navigation sidebar uses the primary color to create a hard depth break, signaling it as the highest level in the functional hierarchy.

## Shapes

The shape language is **Soft**, favoring subtle 0.25rem (4px) corner radii. This maintains a precise, geometric feel that suggests accuracy and professional discipline.

- **Buttons & Inputs:** 4px radius for a standardized, crisp look.
- **Data Cards:** May use 8px (rounded-lg) to provide a slightly softer container for large sets of complex data, making the information feel more approachable.
- **Status Tags:** Fully rounded "pill" shapes are reserved exclusively for status indicators (e.g., "Active," "Pending") to differentiate them from functional buttons.

## Components

### Elegant Tables
Tables are the heart of the system. They feature no vertical borders, only 1px horizontal dividers. Headers are sticky and use a light slate background. Rows include a subtle hover state (#F1F5F9) to assist eye-tracking across wide data sets.

### Data Cards
Cards represent project metrics or consultant profiles. They must feature a consistent header with a "Primary Action" (e.g., an 'Edit' icon or 'View' link) in the top right. Content should be segmented using 1px horizontal rules.

### Clear Navigation Sidebar
The sidebar uses a high-contrast dark background. Active states are indicated by a 4px vertical "Accent" bar on the left edge and a subtle background tint. Icons must be thin-stroke (2px) for a modern, architectural feel.

### Action Buttons
- **Primary:** Emerald Green background with white text. Reserved for the "Final" action in a workflow.
- **Secondary:** Transparent background with a Navy border and text. Used for auxiliary actions.
- **Ghost:** Text-only buttons used for less-critical navigation within data tables.

### Input Fields
Inputs use a white background with a 1px Slate-200 border. On focus, the border transitions to Emerald Green with a subtle 2px glow of the same color at 10% opacity.