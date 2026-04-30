# 📁 ExpertPartner — Estructura del Proyecto

> Proyecto Angular para la suite de gestión de consultoras.
> El backend se definirá en una fase posterior.

---

## 🗂️ Raíz del Repositorio

```
ExpertPartner/
│
├── 📄 README.md                  # Descripción general, pantallas y guía de implementación
├── 📄 structure.md               # Este archivo — mapa de carpetas del proyecto
├── 📄 CLAUDE.md                  # Instrucciones para la IA: contexto, reglas y convenciones
│
├── 📁 docs/                      # Documentación viva del proyecto
│   ├── design-system.md          # Colores, tipografía, espaciado, componentes
│   ├── screens/                  # Análisis detallado de cada pantalla
│   │   ├── 01-login.md
│   │   ├── 02-admin-dashboard.md
│   │   ├── 03-employee-dashboard.md
│   │   ├── 04-attendance.md
│   │   ├── 05-filtered-emails.md
│   │   └── 06-team-management.md
│   └── api-contracts.md          # Contratos de API (endpoints, modelos de datos)
│
├── 📁 skills/                    # Skills modulares para construcción incremental
│   ├── 01-setup-angular.md       # Cómo inicializar el proyecto Angular
│   ├── 02-design-tokens.md       # Implementar tokens CSS y tema global
│   ├── 03-layout-sidebar.md      # Crear el layout con sidebar y topbar
│   ├── 04-auth-login.md          # Pantalla de login y guards de ruta
│   ├── 05-admin-dashboard.md     # Dashboard del administrador
│   ├── 06-employee-dashboard.md  # Dashboard del empleado
│   ├── 07-attendance.md          # Control de asistencia (clock in/out)
│   ├── 08-filtered-emails.md     # Bandeja de emails filtrada
│   └── 09-team-management.md     # Gestión del equipo de consultores
│
├── 📁 stitch_consultancy_operations_hub/   # Diseños originales de referencia (screens + code)
│
└── 📁 frontend/                  # Aplicación Angular
    └── (ver estructura detallada abajo)
```

---

## 📁 frontend/ — Proyecto Angular

```
frontend/
│
├── 📄 angular.json               # Configuración de Angular CLI
├── 📄 package.json               # Dependencias del proyecto
├── 📄 tsconfig.json              # Configuración TypeScript
├── 📄 .editorconfig
│
└── 📁 src/
    ├── 📄 index.html             # HTML raíz (carga fuente Inter de Google Fonts)
    ├── 📄 main.ts                # Bootstrap de la aplicación
    ├── 📄 styles.css             # Estilos globales y tokens CSS
    │
    └── 📁 app/
        │
        ├── 📄 app.config.ts      # Configuración de la app (provideRouter, etc.)
        ├── 📄 app.routes.ts      # Rutas principales (lazy loading por módulos)
        │
        ├── 📁 core/                          # Servicios y lógica transversal
        │   ├── 📁 guards/
        │   │   ├── auth.guard.ts             # Redirige a /login si no autenticado
        │   │   └── role.guard.ts             # Redirige según rol (admin/employee)
        │   ├── 📁 interceptors/
        │   │   └── auth.interceptor.ts       # Añade token JWT a todas las peticiones
        │   ├── 📁 services/
        │   │   ├── auth.service.ts           # Login, logout, gestión de sesión
        │   │   ├── attendance.service.ts     # Clock in/out, historial de fichajes
        │   │   ├── email.service.ts          # Obtener y categorizar emails
        │   │   └── team.service.ts           # CRUD de consultores
        │   └── 📁 models/
        │       ├── user.model.ts             # Interface User + Profile
        │       ├── attendance.model.ts       # Interface AttendanceLog
        │       ├── email.model.ts            # Interface FilteredEmail
        │       └── consultant.model.ts       # Interface Consultant
        │
        ├── 📁 shared/                        # Componentes y utilidades reutilizables
        │   ├── 📁 components/
        │   │   ├── badge/                    # Badge de categoría (URGENT, LEAD, etc.)
        │   │   │   ├── badge.component.ts
        │   │   │   └── badge.component.css
        │   │   ├── avatar/                   # Avatar con iniciales o foto
        │   │   │   ├── avatar.component.ts
        │   │   │   └── avatar.component.css
        │   │   ├── progress-bar/             # Barra de progreso (weekly hours, etc.)
        │   │   │   ├── progress-bar.component.ts
        │   │   │   └── progress-bar.component.css
        │   │   ├── kpi-card/                 # Tarjeta de KPI (Total Employees, etc.)
        │   │   │   ├── kpi-card.component.ts
        │   │   │   └── kpi-card.component.css
        │   │   └── data-table/               # Tabla reutilizable con hover y sin bordes verticales
        │   │       ├── data-table.component.ts
        │   │       └── data-table.component.css
        │   └── 📁 pipes/
        │       ├── time-ago.pipe.ts          # "12 mins ago", "1 hour ago"
        │       └── truncate.pipe.ts          # Truncar texto largo con "..."
        │
        ├── 📁 layout/                        # Shell de la aplicación
        │   ├── 📁 admin-shell/
        │   │   ├── admin-shell.component.ts  # Layout admin (sidebar + topbar + router-outlet)
        │   │   └── admin-shell.component.css
        │   ├── 📁 employee-shell/
        │   │   ├── employee-shell.component.ts  # Layout employee (sidebar reducido + topbar)
        │   │   └── employee-shell.component.css
        │   ├── 📁 sidebar/
        │   │   ├── sidebar.component.ts      # Sidebar con navegación y estado activo
        │   │   └── sidebar.component.css     # Deep Navy, barra verde activa 4px
        │   └── 📁 topbar/
        │       ├── topbar.component.ts       # Búsqueda, notificaciones, avatar usuario
        │       └── topbar.component.css
        │
        └── 📁 features/                      # Módulos de funcionalidad (lazy loaded)
            │
            ├── 📁 auth/                      # ── PANTALLA 1: Login
            │   ├── login/
            │   │   ├── login.component.ts    # Formulario email + password
            │   │   └── login.component.css   # Tarjeta centrada, fondo con grid sutil
            │   └── auth.routes.ts
            │
            ├── 📁 admin/                     # ── PORTAL ADMINISTRADOR
            │   ├── admin.routes.ts           # Rutas del área admin
            │   │
            │   ├── 📁 dashboard/             # ── PANTALLA 2: Admin Dashboard
            │   │   ├── dashboard.component.ts
            │   │   ├── dashboard.component.css
            │   │   ├── 📁 activity-monitor/  # Tabla de clock in/out en tiempo real
            │   │   │   └── activity-monitor.component.ts
            │   │   └── 📁 express-inbox/     # Mini-bandeja de entrada prioritaria
            │   │       └── express-inbox.component.ts
            │   │
            │   ├── 📁 emails/                # ── PANTALLA 6: Filtered Emails
            │   │   ├── emails.component.ts
            │   │   ├── emails.component.css
            │   │   └── 📁 email-row/         # Fila individual de email con badge
            │   │       └── email-row.component.ts
            │   │
            │   ├── 📁 team/                  # ── PANTALLAS 7-8: Team Management
            │   │   ├── team.component.ts
            │   │   ├── team.component.css
            │   │   ├── 📁 consultant-row/    # Fila con foto, rol, disponibilidad, EOM
            │   │       └── consultant-row.component.ts
            │   │
            │   └── 📁 settings/
            │       ├── settings.component.ts
            │       └── settings.component.css
            │
            └── 📁 employee/                  # ── PORTAL EMPLEADO
                ├── employee.routes.ts
                │
                ├── 📁 dashboard/             # ── PANTALLA 3: Employee Dashboard
                │   ├── dashboard.component.ts
                │   ├── dashboard.component.css
                │   ├── 📁 clock-widget/      # Reloj en tiempo real + Clock In/Out
                │   │   └── clock-widget.component.ts
                │   ├── 📁 weekly-hours/      # Tarjeta de horas semanales + progress bar
                │   │   └── weekly-hours.component.ts
                │   └── 📁 profile-card/      # Tarjeta de perfil del empleado
                │       └── profile-card.component.ts
                │
                └── 📁 attendance/            # ── PANTALLAS 4-5: My Attendance
                    ├── attendance.component.ts
                    ├── attendance.component.css
                    └── 📁 activity-table/    # Historial de fichajes (Date, In, Out, Break, Total)
                        └── activity-table.component.ts
```

---

## 🎨 Tokens CSS Globales (`styles.css`)

```css
/* src/styles.css */
:root {
  /* Colores */
  --color-navy:        #0F172A;   /* Sidebar */
  --color-emerald:     #10B981;   /* Accent / CTAs */
  --color-surface:     #F8FAFC;   /* Fondo app */
  --color-card:        #FFFFFF;   /* Cards */
  --color-border:      #E2E8F0;   /* Bordes */
  --color-text:        #191C1E;   /* Texto primario */
  --color-muted:       #45464D;   /* Texto secundario */
  --color-urgent:      #EF4444;   /* Badge URGENT */
  --color-lead:        #3B82F6;   /* Badge LEAD GEN */
  --color-finance:     #6B7280;   /* Badge FINANCE */

  /* Espaciado */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;

  /* Layout */
  --sidebar-width:     260px;
  --topbar-height:     64px;

  /* Tipografía */
  --font-family:       'Inter', sans-serif;

  /* Radios */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-full: 9999px;

  /* Sombras */
  --shadow-card:    0 4px 12px rgba(15, 23, 42, 0.08);
  --shadow-login:   0 8px 32px rgba(0, 0, 0, 0.08);
}
```

---

## 🛣️ Rutas de la Aplicación

```
/login                    → LoginComponent (pública)

/admin/dashboard          → Admin Dashboard        [guard: auth + role=admin]
/admin/emails             → Filtered Emails        [guard: auth + role=admin]
/admin/team               → Team Management        [guard: auth + role=admin]
/admin/attendance         → Attendance (admin view) [guard: auth + role=admin]
/admin/settings           → Settings               [guard: auth + role=admin]

/employee/dashboard       → Employee Dashboard     [guard: auth + role=employee]
/employee/attendance      → My Attendance          [guard: auth + role=employee]

/                         → Redirige según rol
**                        → Redirige a /login
```

---

## 🔄 Flujo de Autenticación

```
Usuario entra a cualquier ruta
        ↓
   auth.guard.ts
        ↓
  ¿Tiene sesión?
   /         \
  NO          SÍ
  ↓            ↓
/login     role.guard.ts
               ↓
         ¿Rol = admin?
          /         \
        SÍ           NO
        ↓             ↓
  /admin/...    /employee/...
```

---

## 📋 Orden de Construcción (Skills)

| # | Skill | Pantallas | Estado |
|---|---|---|---|
| 01 | Setup Angular + tokens CSS | — | ⬜ Pendiente |
| 02 | Design System (tokens, tipografía) | — | ⬜ Pendiente |
| 03 | Layout: Sidebar + Topbar | Todas | ⬜ Pendiente |
| 04 | Auth: Login + Guards | Login | ⬜ Pendiente |
| 05 | Admin Dashboard | Admin Dashboard | ⬜ Pendiente |
| 06 | Employee Dashboard | Employee Dashboard | ⬜ Pendiente |
| 07 | Attendance (Clock In/Out) | Attendance 1 y 2 | ⬜ Pendiente |
| 08 | Filtered Emails | Filtered Emails | ⬜ Pendiente |
| 09 | Team Management | Team Mgmt 1 y 2 | ⬜ Pendiente |
