# ExpertPartner — Lista de Mejoras y Cosas por Hacer

---

## 🐛 Bugs / Errores conocidos

- **Control horario: doble click en botones** — Se puede hacer clock-in varias veces seguidas en el mismo día sin haber hecho clock-out. El botón "Clock In" debe desactivarse si ya hay una sesión abierta (clockOut === null). El botón "Clock Out" debe desactivarse si no hay ninguna sesión abierta. Archivo: `employee-attendance.component.html` y `attendance.service.ts`.
- **WeeklyHours no se actualiza reactivamente** — `getWeeklyHours()` devuelve un `Observable` estático con `of()`, no reacciona al `BehaviorSubject`. Cuando el usuario hace clock-out, las horas semanales no se recalculan automáticamente. Debería derivarse del propio `logs$`.
- **`hasLoggedToday` no es reactivo** — El método lee el snapshot del BehaviorSubject en el momento puntual. Si cambia el estado desde otra pestaña o componente, la UI no se actualiza sola.
- **`getTodayLogs()` devuelve `Observable<AttendanceLog[]>` estático** — Usa `of()` en lugar de derivarse de `logs$`, por lo que no emite nuevos valores cuando cambia el estado. Debería ser `this.logs$.pipe(map(...))`.
- **Admin Attendance sin implementar** — La ruta `/admin/attendance` existe y está en el menú pero solo muestra "coming soon". Rompe la experiencia de navegación.
- **Admin Settings sin implementar** — Igual que admin attendance, solo tiene un stub vacío.
- **`filterConsultants()` en TeamService es redundante** — El componente `admin-team` ya filtra por su cuenta con `computed()`. El método `filterConsultants()` del servicio existe pero no se usa. Eliminar o centralizar.
- **`register()` en auth.service.ts** — El método existe pero no hay ruta `/register` protegida ni flujo de UI completo. O se completa o se elimina para evitar confusión.

---

## ⚠️ UX / Funcionalidad a mejorar

- **Recordatorio reconocimiento médico** — 40 días antes de la fecha de caducidad del reconocimiento médico de un empleado, debe enviarse un correo de recordatorio automático para que pase el reconocimiento de nuevo.
- **Control horario: bloqueo de botones** — En la pantalla de asistencia del empleado, el botón "Clock In" debe quedar deshabilitado si ya hay una jornada abierta (sesión sin clock-out), y el botón "Clock Out" debe quedar deshabilitado si no hay ninguna sesión abierta. Actualmente ambos botones están siempre activos.
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

- **Suscripciones manuales sin `takeUntilDestroyed`** — En `employee-attendance.component.ts` (líneas 68 y 73) se suscriben a Observables sin desuscribirse correctamente usando el operador `takeUntilDestroyed(this.destroyRef)`. Si el componente se destruye antes de que el Observable complete, puede haber memory leaks.
- **`getLogsSnapshot()` rompe el patrón reactivo** — En el componente de attendance se llama a `getLogsSnapshot()` para la inicialización. Debería cargarse desde `logs$` con `toSignal()` para mantener todo reactivo.
- **Imports con ruta relativa en AdminDashboard** — `admin-dashboard.component.ts` importa con `'../../../shared/components/kpi-card/...'` en lugar del alias `@shared/...`. Inconsistente con el resto del proyecto.
- **Mock data mezclada con lógica de servicio** — Los arrays `MOCK_CONSULTANTS`, `MOCK_EMAILS`, etc. están definidos dentro del mismo fichero del servicio. Moverlos a `core/mock-data/` para facilitar el futuro reemplazo por llamadas HTTP.
- **Sin interceptor HTTP implementado** — El fichero `interceptors/` existe (solo `.gitkeep`) pero el interceptor de auth no está creado. Cuando haya backend, los tokens JWT necesitarán ese interceptor.
- **`user.model.ts` incompleto** — La interfaz `User` no tiene el campo `employeeId` definido como campo propio del modelo (solo lo tienen algunos mocks). Esto obliga a usar `?.employeeId` con opcional encadenamiento y puede causar bugs silenciosos.
- **`Consultant.role` es `string` libre** — Debería ser un union type `'Senior Consultant' | 'Associate' | 'Manager' | 'Director'` para evitar valores inválidos y mejorar el autocompletado.
- **`AttendanceLog.clockIn` es `Date` pero viene del mock como objeto Date** — Cuando se guarde/cargue desde backend, llegará como string ISO. Preparar deserialización.
- **Comentarios en español en código TypeScript** — CLAUDE.md especifica que todo el código y comentarios deben estar en inglés. `auth.service.ts` línea 8 tiene un comentario en español.

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
