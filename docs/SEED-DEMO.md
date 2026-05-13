# Datos de demostración (seed) — `database.db`

Este documento describe el contenido que crea el script **`scripts/seed-demo-db.mjs`** para probar la aplicación de punta a punta (auth, clubes, eventos, membresías, invitaciones, solicitudes, inscripciones, panel admin, calendario público).

## Cómo ejecutarlo

Desde la raíz del repositorio (donde está `database.db`):

```bash
npm run db:seed
```

Equivale a:

```bash
node scripts/seed-demo-db.mjs --force
```

**Importante:** `--force` elimina primero **todas** las filas asociadas a usuarios cuyo email coincide con `*@demo.nosework.local` (usuarios, perfiles, clubes de esos dueños, eventos ligados, inscripciones, ubicaciones, tags, invitaciones, solicitudes, membresías, tokens de refresco y logs de auditoría de esos usuarios). Haz una copia de `database.db` si necesitas conservar datos.

El script inicializa el esquema vía `getDBConnection()` (mismas migraciones que al arrancar la app).

## Contraseña única (login web)

Todas las cuentas demo comparten:

| Campo        | Valor            |
|-------------|------------------|
| Contraseña  | `SeedDemo2026!`  |

Cumple las reglas de fortaleza del registro (mayúsculas, minúsculas, número, longitud).

**Validación de email:** las cuentas `@demo.nosework.local` usan el TLD reservado `.local`. La validación Joi en [`utils/validation.js`](../utils/validation.js) usa `email({ tlds: false })` para login, registro y email público de clubes, de modo que esas direcciones pasan el mensaje «formato válido» igual que un dominio público habitual.

---

## Usuarios y roles

| Email | Rol en BD | Para probar |
|-------|-----------|-------------|
| `admin@demo.nosework.local` | `administrador` | Panel admin, aprobar clubes, listados globales, crear eventos “sin club”. |
| `organizer@demo.nosework.local` | `organizador` | Misma capacidad de staff que admin en muchas APIs; evento **global** sin `club_id`. |
| `owner@demo.nosework.local` | `user` | Dueño de dos clubes: uno **approved** y uno **pending**; crea/gestiona eventos del club. |
| `member@demo.nosework.local` | `user` | Miembro **activo** del club aprobado; perro “Rex Seed”; inscripción de ejemplo. |
| `applicant@demo.nosework.local` | `user` | **Solicitud de ingreso** pendiente al club aprobado (join request). |
| `invitee@demo.nosework.local` | `user` | **Invitación** pendiente al club aprobado. |
| `solo@demo.nosework.local` | `user` | Sin club ni membresías; inscrito en el evento global abierto (flujo “cualquier usuario”). |

---

## Clubes

### Club Demo Madrid (`slug`: `club-seed-demo-madrid`)

- **Estado:** `approved`
- **Dueño:** `owner@demo.nosework.local`
- **Listado público:** `accepts_public_listing = 1` (aparece en directorio para visitantes según reglas de la API).
- **Ubicación:** fila en `club_locations` (Madrid, coordenadas aproximadas).
- **Servicio:** tag `nosework_trial` en `club_service_tags`.

**Relaciones útiles:**

| Tipo | Usuario | Descripción |
|------|---------|-------------|
| Membresía activa | `member@demo.nosework.local` | Puede ver/inscribirse en eventos `members_only` de este club. |
| Solicitud pendiente | `applicant@demo.nosework.local` | El dueño puede aprobar/rechazar desde el dashboard del club. |
| Invitación pendiente | `invitee@demo.nosework.local` | El invitado puede aceptar/rechazar desde “mis invitaciones”. |

### Club Demo Pendiente (`slug`: `club-seed-demo-pendiente`)

- **Estado:** `pending` (pendiente de revisión admin).
- **Dueño:** el mismo `owner@demo.nosework.local`.
- **Listado público:** `0` (no orientado a listado público).

Sirve para probar el flujo de **moderación de clubes** y que los eventos de un club no aprobado **no** salgan en el calendario público como abiertos (según la lógica de visibilidad actual).

---

## Perros

| Nombre   | Dueño (handler) | Uso |
|----------|-----------------|-----|
| Rex Seed | `member@demo.nosework.local` | Inscripción con `dog_id` en evento abierto del club. |

---

## Eventos

Fechas orientadas a pruebas: una **pasada** (resultados), varias **futuras**.

| Título (aprox.) | Organizador | Club | Audiencia (`audience`) | Notas de prueba |
|-----------------|-------------|------|------------------------|-----------------|
| Prueba pasada (resultados) | Dueño | Madrid | `open` | Incluye fila en `event_results` (página de resultados del evento). |
| Jornada abierta nacional (demo) | Organizador staff | *null* | `open` | Evento **sin club**; inscripción de `solo@…` para probar usuario sin membresía. |
| Taller abierto Club Madrid (demo) | Dueño | Madrid | `open` | Calendario público + inscripción con perro (member). |
| Entreno solo socios Club Madrid (demo) | Dueño | Madrid | `members_only` | Solo miembros activos (o dueño); anonimato no ve detalle si no aplica. |
| Evento club pendiente de aprobación | Dueño | Club pendiente | `open` | Visibilidad en listados públicos limitada por estado del club. |

Los IDs concretos de eventos y clubes **cambian** en cada ejecución del seed; usa títulos, slugs o el panel para localizarlos.

---

## Inscripciones (`event_registrations`)

| Usuario | Evento | Perro |
|---------|--------|-------|
| `member@demo.nosework.local` | Taller abierto Club Madrid | Rex Seed (`dog_id` rellenado) |
| `solo@demo.nosework.local` | Jornada abierta nacional | Sin perro (`dog_id` NULL) |

Sirven para el dashboard deportista (“próximas inscripciones”) y para comprobar duplicados (409) al volver a inscribirse.

---

## Matriz rápida: qué probar con cada cuenta

| Área | Cuenta recomendada |
|------|-------------------|
| Login / JWT / refresh | Cualquiera |
| Dashboard admin (clubs, users, memberships) | `admin@demo.nosework.local` |
| Crear evento sin club (staff) | `admin` o `organizer` |
| CRUD eventos como dueño de club | `owner@demo.nosework.local` |
| Inscripción evento abierto sin ser del club | `solo@demo.nosework.local` |
| Inscripción evento solo miembros | `member@demo.nosework.local` |
| No inscripción solo miembros (debe fallar) | `solo@…` en evento `members_only` |
| Invitaciones | `invitee@…` (bandeja) y `owner@…` (gestión) |
| Solicitudes al club | `applicant@…` y `owner@…` |
| Directorio de clubes (público) | Sin sesión o usuario normal (club aprobado + listing) |
| Resultados publicados | Evento “Prueba pasada” → ruta de resultados del evento |

---

## Detalles técnicos

- **Dominio reservado:** solo se borran datos ligados a `@demo.nosework.local` al re-ejecutar el seed con `--force`.
- **Hashes de contraseña:** `bcrypt` (10 rondas), igual que `pages/api/auth/register.js`.
- **Imports internos:** `utils/db.js` y `utils/clubDirectoryMigrations.js` usan rutas relativas para que Node pueda cargar el esquema al ejecutar el `.mjs` sin Next.

Si añades nuevas tablas o FKs hacia `users`/`clubs`/`events`, actualiza `wipeDemoData` en `scripts/seed-demo-db.mjs` para que el re-seed siga siendo seguro.
