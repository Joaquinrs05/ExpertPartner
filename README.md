# ExpertPartner

> Suite de gestión para empresas — paneles independientes para administradores y empleados, con control horario, bandeja de correo filtrada y gestión de equipo.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)]()

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Arrancar el proyecto](#arrancar-el-proyecto)
- [Credenciales de prueba](#credenciales-de-prueba)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts disponibles](#scripts-disponibles)
- [Sistema de diseño](#sistema-de-diseño)
- [Roadmap](#roadmap)

---

## Descripción

**ExpertPartner** es una aplicación web pensada como hub de operaciones para empresas. La plataforma ofrece dos portales separados con enrutado por rol:

- **Portal Admin** — dashboard con KPIs, monitor de actividad, bandeja de correos filtrada por categoría, gestión de equipo y panel de asistencias.
- **Portal Empleado** — dashboard personal, fichaje (clock in / clock out), historial semanal y perfil.

El proyecto se desarrolla por iteraciones siguiendo un sistema de _skills_ documentadas (ver [`skills/`](skills/)) y un flujo multi-agente para implementación y revisión.

---

## Características

- Autenticación con roles (`admin` / `employee`) y guards funcionales
- Layout con shells separados, sidebar fijo y topbar contextual
- Dashboards con KPI cards, gráficos y tablas con cabeceras _sticky_
- Control horario con vistas diferenciadas (jornada iniciada / fuera de turno)
- Bandeja de correo con badges por categoría (URGENT, LEAD GEN, FINANCE)
- Gestión de equipo con tabla filtrable y paginación
- Internacionalización con `@ngx-translate`
- Integración con Supabase para persistencia
- Diseño _mobile-first_ con tokens CSS y tipografía Inter
- Componentes 100% **standalone** y `OnPush` change detection

---

## Stack tecnológico

| Capa      | Tecnología                         |
| --------- | ---------------------------------- |
| Framework | Angular 21 (standalone components) |
| Lenguaje  | TypeScript 5.9 (strict)            |
| Estilos   | CSS puro con custom properties     |
| Estado    | Servicios + RxJS `BehaviorSubject` |
| Routing   | Angular Router con lazy loading    |
| Backend   | Supabase                           |
| i18n      | `@ngx-translate/core`              |
| Formato   | Prettier                           |

---

## Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- **Node.js** ≥ 20.x ([descargar](https://nodejs.org/))
- **npm** ≥ 10.9 (incluido con Node)
- **Angular CLI** (opcional, global): `npm install -g @angular/cli`

Comprueba las versiones:

```bash
node --version
npm --version
```

---

## Instalación

1. **Clona el repositorio**

   ```bash
   git clone <url-del-repo>
   cd ExpertPartner/frontend
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura Supabase** (si aplica)

   Las credenciales se cargan desde `src/environments/`. Asegúrate de tener tu `environment.ts` con el `supabaseUrl` y `supabaseKey` correctos antes de levantar el servidor.

---

## Arrancar el proyecto

Desde la carpeta `frontend/`:

```bash
npm start
```

Esto lanza el servidor de desarrollo en [http://localhost:4200](http://localhost:4200). La aplicación se recarga automáticamente al guardar cambios.

### Compilar para producción

```bash
npm run build
```

Los artefactos se generan en `frontend/dist/`.

### Modo watch (build incremental)

```bash
npm run watch
```

## Estructura del proyecto

```
frontend/
└── src/
    ├── styles.css                  ← Tokens globales y resets
    ├── app/
    │   ├── app.config.ts
    │   ├── app.routes.ts
    │   ├── core/
    │   │   ├── guards/             ← auth.guard, role.guard
    │   │   ├── interceptors/
    │   │   ├── services/           ← auth, attendance, email, team
    │   │   └── models/             ← Interfaces TypeScript
    │   ├── shared/
    │   │   ├── components/         ← badge, avatar, kpi-card, data-table
    │   │   └── pipes/
    │   ├── layout/
    │   │   ├── admin-shell/
    │   │   ├── employee-shell/
    │   │   ├── sidebar/
    │   │   └── topbar/
    │   └── features/
    │       ├── auth/               ← login
    │       ├── admin/              ← dashboard, emails, team, settings
    │       └── employee/           ← dashboard, attendance
```

### Rutas principales

| Ruta                   | Acceso                 |
| ---------------------- | ---------------------- |
| `/login`               | Pública                |
| `/admin/dashboard`     | `auth + role=admin`    |
| `/admin/emails`        | `auth + role=admin`    |
| `/admin/team`          | `auth + role=admin`    |
| `/admin/attendance`    | `auth + role=admin`    |
| `/admin/settings`      | `auth + role=admin`    |
| `/employee/dashboard`  | `auth + role=employee` |
| `/employee/attendance` | `auth + role=employee` |

---

## Scripts disponibles

| Comando               | Descripción                                    |
| --------------------- | ---------------------------------------------- |
| `npm start`           | Servidor de desarrollo en `localhost:4200`     |
| `npm run build`       | Build de producción en `dist/`                 |
| `npm run watch`       | Build en modo watch (desarrollo)               |
| `npm test`            | Ejecuta los tests (no implementados aún)       |
| `npm run ng -- <cmd>` | Pasa un comando directamente al CLI de Angular |

---

## Sistema de diseño

El proyecto usa una paleta y tipografía coherentes definidas como **CSS custom properties** en [`src/styles.css`](frontend/src/styles.css).

### Paleta principal

| Token             | Color     | Uso                          |
| ----------------- | --------- | ---------------------------- |
| `--color-navy`    | `#0F172A` | Fondo del sidebar            |
| `--color-emerald` | `#10B981` | CTAs, estados activos, éxito |
| `--color-surface` | `#F8FAFC` | Fondo general                |
| `--color-card`    | `#FFFFFF` | Tarjetas y contenedores      |
| `--color-urgent`  | `#EF4444` | Badge URGENT                 |
| `--color-lead`    | `#3B82F6` | Badge LEAD GEN               |

### Espaciado (base 4px)

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 40px;
```

### Tipografía

Familia **Inter** cargada desde Google Fonts. Escalas de `12px` (labels) a `36px` (h1).

> Más detalle en [`CLAUDE.md`](CLAUDE.md) → sección _Design System_.

---

## Roadmap

- [x] Layout base, sidebar y topbar
- [x] Login con mock auth y guards
- [x] Dashboard admin y dashboard empleado
- [x] Conexión Supabase
- [x] Internacionalización
- [ ] Asistencias completas (ambas variantes)
- [ ] Bandeja de correos filtrada
- [ ] Gestión de equipo con import Excel
- [ ] Tests unitarios
- [ ] Notificaciones en tiempo real

Consulta [`feature_list.json`](feature_list.json) para el estado actualizado de cada feature.

---

## Licencia

Proyecto privado — uso interno.
