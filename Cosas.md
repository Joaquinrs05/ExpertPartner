# ExpertPartner — Lista de Mejoras y Cosas por Hacer

---

## 🐛 Bugs / Errores conocidos

> No hay bugs pendientes conocidos. Los que estaban documentados aquí han sido resueltos.

---

## ⚠️ UX / Funcionalidad a mejorar

- **Recordatorio reconocimiento médico** — 40 días antes de la fecha de caducidad del reconocimiento médico de un empleado, debe enviarse un correo de recordatorio automático para que pase el reconocimiento de nuevo.
- **Redirección tras login según rol** — Actualmente la ruta raíz redirige a `/login`. Un usuario ya logueado que navegue a `/` debería ir directamente a su dashboard sin pasar por el login. El `authGuard` ya tiene la info, pero falta esa lógica en la ruta raíz.
- **Sin feedback visual en el login al fallar** — Cuando el email o contraseña son incorrectos, debería mostrarse un mensaje de error claro en el formulario.
- **Emails: abrir email completo** — El click en una fila de email solo marca como leído pero no abre ninguna vista de detalle. Falta una vista de email individual o un panel lateral (slide-over).
- **Emails: filtrado por categoría** — No hay forma de filtrar emails por categoría (URGENT, LEAD_GEN, FINANCE, UPDATE) desde la UI. Se podría añadir un filtro de pestañas o chips.
- **Paginación en emails** — Si hay muchos emails no hay paginación. Añadir paginación o scroll infinito igual que en Team Management.
- **Team: botón "New Consultant" sin acción** — El botón existe en el header pero no hace nada. Falta un modal o formulario para añadir consultores.
- **Team: botón "Import Excel" sin acción** — Visible solo para admin pero no tiene lógica asociada. Marcar como coming soon o implementar.
- **Dashboard admin: KPIs hardcodeados** — Los valores de los KPI cards están hardcodeados en el template. Deberían calcularse desde los servicios reales (team, attendance, emails).
- **No hay página 404 personalizada** — El wildcard `**` redirige al login silenciosamente. Mejor mostrar una página 404 clara.

---

## 🏗️ Deuda técnica / Arquitectura

- **Mock data mezclada con lógica de servicio** — Los arrays `MOCK_CONSULTANTS`, `MOCK_EMAILS`, etc. están definidos dentro del mismo fichero del servicio. Moverlos a `core/mock-data/` para facilitar el futuro reemplazo por llamadas HTTP.
- **Sin interceptor HTTP implementado** — El fichero `interceptors/` existe (solo `.gitkeep`) pero el interceptor de auth no está creado. Cuando haya backend, los tokens JWT necesitarán ese interceptor.
- **`user.model.ts` — `employeeId` opcional** — La interfaz `User` declara `employeeId` como opcional (`?`), lo que obliga a usar optional chaining en todo el código. Cuando haya backend, decidir si es un campo obligatorio para el rol `employee` y aplicar narrowing por rol.
- **`AttendanceLog.clockIn` es `Date` en mock, string en backend** — Cuando se cargue desde backend llegará como string ISO. Preparar capa de deserialización en el servicio antes de integrar HTTP.

---

## 🚀 Features futuras (de CLAUDE.md + ideas nuevas)

- **Backend / Supabase** — Conectar todos los servicios a una base de datos real. Sustituir los `of(MOCK_DATA)` por `HttpClient` calls.
- **Autenticación real** — JWT, refresh tokens, sesiones seguras. Eliminar contraseñas en texto plano del frontend.
- **Clasificación de emails con IA** — Usar OpenAI/Gemini para categorizar automáticamente los emails entrantes como URGENT, LEAD_GEN, FINANCE, UPDATE.
- **Reconocimiento médico** — Añadir campo `medicalExamDate` al modelo de empleado. Implementar lógica de alerta 40 días antes con notificación por email.
- **Onboarding/offboarding de empleados** — Flujo guiado para dar de alta y baja consultores en el sistema.
- **Import desde Excel** — Permitir al admin subir un `.xlsx` con consultores o registros de asistencia.
- **WebSockets / tiempo real** — Mostrar estado online/offline de consultores en tiempo real en la tabla de Team.
- **Módulo de proyectos** — Vista de proyectos activos, consultores asignados y fechas de entrega.
- **Notificaciones in-app** — Sistema de notificaciones dentro de la plataforma (nuevos emails, cambios de estado, etc.).
- **Exportar informes de asistencia** — Permitir descargar el historial de asistencia en PDF o CSV.
- **Modo oscuro** — Los tokens de color ya están en CSS custom properties, lo que facilita añadir un tema dark con `prefers-color-scheme` o un toggle manual.
- **Internacionalización (i18n)** — La app mezcla textos en inglés y referencias a España (reconocimiento médico). Decidir idioma oficial y aplicar `@angular/localize`.
