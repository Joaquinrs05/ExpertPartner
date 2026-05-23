# Feature Specification: Excel Import — Gestor de Altas y Bajas

**Feature Branch**: `16-excel-import-team`
**Created**: 2026-05-23
**Status**: Partially implemented (upload button exists, n8n workflow exists, Supabase insert pending)
**Related files**:
- `features/admin/team/admin-team.component.ts` — botón de upload ya implementado
- Webhook: `https://jrsgrowtth.ddns.net/webhook-test/gestor-altas-upload`

---

## Contexto

El admin gestiona altas y bajas de trabajadores mediante un Excel con tres columnas:

| Columna | Contenido | Notas |
|---|---|---|
| A — Trabajadores | Nombre completo (`APELLIDO APELLIDO NOMBRE`) | Siempre en mayúsculas |
| B — Fecha Alta | Fecha de incorporación (`DD/MM/YYYY`) | Siempre presente |
| C — Fecha Baja | Fecha de salida (`DD/MM/YYYY`) | Vacía = empleado activo |

El archivo tiene varias pestañas: **Hoja 1** (todos), **Nuevas Altas**, **Activos**.

El flujo n8n existente:
`Recibir Excel → Extraer Datos Excel → Preparar para IA → AI Agent (OpenAI) → Crear Google Sheet → Escribir Filas → Responder Webhook`

El AI Agent categoriza cada fila en "nueva alta" o "activo" y normaliza los datos.

---

## User Scenarios & Testing

### User Story 1 — Admin sube el Excel y los trabajadores se importan a Supabase (Priority: P1)

El admin hace click en "Importar Excel", selecciona el archivo, y los trabajadores aparecen en la tabla tras la importación.

**Independent Test**: Subir el Excel de prueba → esperar respuesta del webhook → recargar la tabla de equipo → los trabajadores importados aparecen.

**Acceptance Scenarios**:

1. **Given** el admin selecciona un `.xlsx` válido, **When** se sube, **Then** el estado cambia a `uploading` con el mensaje `"Subiendo '[nombre]'..."`.
2. **Given** n8n procesa el archivo correctamente, **When** el webhook responde, **Then** los trabajadores se insertan en Supabase tabla `consultants` y la tabla de equipo se refresca automáticamente.
3. **Given** la importación termina, **When** pasan 5 segundos, **Then** el toast desaparece y el estado vuelve a `idle`.

---

### User Story 2 — El admin ve un resumen del resultado de la importación (Priority: P1)

Tras la importación, el toast muestra cuántos trabajadores se han importado correctamente.

**Independent Test**: Importar un Excel con 10 trabajadores → toast muestra `"10 trabajadores importados correctamente"`.

**Acceptance Scenarios**:

1. **Given** n8n responde con el número de filas procesadas, **When** el frontend recibe la respuesta, **Then** el toast muestra `"X trabajadores importados correctamente."`.
2. **Given** el webhook falla o no responde, **When** hay error, **Then** el toast en rojo muestra `"Error al procesar el archivo. Inténtalo de nuevo."`.

---

### User Story 3 — Trabajadores con Fecha Baja no se añaden como activos (Priority: P2)

Los empleados que ya tienen fecha de baja se importan con estado `on_leave` o se omiten, no como disponibles.

**Independent Test**: Importar filas con Fecha Baja rellena → esos trabajadores aparecen con availability `on_leave`, los que no tienen fecha de baja aparecen como `available`.

**Acceptance Scenarios**:

1. **Given** una fila tiene Fecha Baja, **When** se importa, **Then** `availability` se establece como `on_leave`.
2. **Given** una fila no tiene Fecha Baja, **When** se importa, **Then** `availability` se establece como `available`.

---

## Requisitos funcionales

- **FR-001**: El frontend envía el archivo como `FormData` con campo `file` al webhook via `POST`.
- **FR-002**: n8n extrae los datos del Excel (columnas A, B, C de todas las hojas o solo Hoja 1).
- **FR-003**: El AI Agent normaliza el nombre (`APELLIDO APELLIDO NOMBRE` → formato legible) y categoriza cada fila.
- **FR-004**: n8n inserta cada trabajador en Supabase tabla `consultants` con los campos mapeados (ver tabla abajo).
- **FR-005**: El webhook responde con `{ imported: number }` para que el frontend muestre el conteo.
- **FR-006**: Tras respuesta exitosa, `TeamService` recarga los consultores desde Supabase.
- **FR-007**: El botón de importar solo es visible para usuarios con rol `admin` (ya implementado con `canImport`).

### Mapeo Excel → Supabase `consultants`

| Campo Excel | Campo Supabase | Lógica |
|---|---|---|
| Columna A (nombre) | `full_name` | Normalizar capitalización |
| Columna B (Fecha Alta) | `eom_status` o campo custom `hire_date` | Guardar como fecha ISO |
| Columna C (Fecha Baja) | `availability` | Vacío → `available`, relleno → `on_leave` |
| — | `role` | Default: `'Associate'` (sin dato en Excel) |
| — | `level` | Default: `'L1 - Junior'` |
| — | `employee_id` | Autogenerado (`CNS-XXX`) o dejarlo vacío |
| — | `is_online` | Default: `false` |
| — | `current_project` | Default: `null` |

---

## Validaciones (pendientes de implementar)

Estas validaciones deben añadirse en una fase posterior:

- **VAL-001**: Detectar duplicados por `full_name` — si ya existe, actualizar en lugar de insertar.
- **VAL-002**: Validar que Fecha Alta tenga formato de fecha válido — saltar filas malformadas.
- **VAL-003**: Ignorar filas completamente vacías.
- **VAL-004**: Limitar el tamaño del archivo a 10MB.
- **VAL-005**: Aceptar solo `.xlsx` y `.xls` — rechazar otros formatos con mensaje claro.
- **VAL-006**: Si Fecha Baja < Fecha Alta, marcar la fila como error y reportarla.

---

## Cambios necesarios en n8n

El workflow actual ya extrae y categoriza. Lo que falta:

1. **Añadir nodo Supabase Insert** después del AI Agent para insertar cada fila en `consultants`.
2. **Modificar la respuesta del webhook** para incluir `{ imported: number, errors: number }` en lugar de solo los datos del Google Sheet.
3. **(Opcional)** Añadir un nodo de deduplicación antes del insert: `SELECT id FROM consultants WHERE full_name = $name` → si existe, hacer `UPDATE` en lugar de `INSERT`.

---

## Cambios necesarios en el frontend

1. **`AdminTeamComponent.onExcelUpload()`** — leer `response.imported` y mostrar el conteo en el toast.
2. **`TeamService`** — añadir método `reload()` que llame de nuevo a Supabase y actualice el `BehaviorSubject`.
3. **Llamar a `TeamService.reload()`** tras respuesta exitosa del webhook.

---

## Success Criteria

- **SC-001**: Subir el Excel de 30 trabajadores → todos aparecen en la tabla en menos de 30 segundos.
- **SC-002**: El toast muestra el número exacto de trabajadores importados.
- **SC-003**: Trabajadores con Fecha Baja se crean con `availability = 'on_leave'`, no como `available`.
- **SC-004**: Si se sube el mismo Excel dos veces, no se crean duplicados (VAL-001).

---

## Assumptions

- El Excel siempre tiene al menos las columnas A, B, C en ese orden.
- n8n tiene acceso a Supabase mediante las credenciales ya configuradas.
- El campo `full_name` es suficiente como identificador único para deduplicación (no hay dos personas con exactamente el mismo nombre completo).
- El Google Sheet que crea n8n es un artefacto de auditoría — no es la fuente de verdad, Supabase sí lo es.
