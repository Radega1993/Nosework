# API Specification - Nosework Trial Community Platform

Este documento define todos los endpoints REST de la API, organizados por módulos y fases de desarrollo.

**Base URL:** `/api`  
**Autenticación:** JWT Bearer Token en header `Authorization: Bearer <token>`  
**Formato:** JSON en request y response  
**Versión:** v1 (implícita en la estructura de URLs)

---

## Autenticación y Autorización

### Middleware de Autenticación

Todos los endpoints protegidos requieren:
```
Authorization: Bearer <jwt_token>
```

El token JWT contiene:
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "user"
}
```

### Roles

- `user` - Guía (usuario básico)
- `organizador` - Organizador de eventos
- `administrador` - Administrador del sistema
- `juez` - Juez (futuro)

### Rate Limiting

**Estrategia mínima:** 100 requests/minuto por IP para endpoints públicos, 200 requests/minuto por usuario autenticado.

**Implementación futura:** Usar `express-rate-limit` o similar cuando se migre a backend dedicado.

---

## Endpoints de Autenticación

### POST /api/auth/register

Registrar nuevo usuario (guía).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "Usuario registrado con éxito",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Errores:**
- `400` - Campos faltantes o email inválido
- `409` - Email ya existe

**Validación:**
- Email: formato válido, único
- Password: mínimo 8 caracteres

---

### POST /api/auth/login

Iniciar sesión.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Errores:**
- `400` - Campos faltantes
- `401` - Credenciales incorrectas
- `404` - Usuario no encontrado

**Notas:**
- Token expira en 1 hora (configurable)
- Token se almacena en localStorage en el cliente

---

## Endpoints de Eventos

### GET /api/events

Obtener listado de eventos.

**Autenticación:** No requerida

**Query Parameters:**
- `status` (opcional) - Filtrar por estado: `open`, `closed`, `cancelled`
- `level` (opcional) - Filtrar por nivel: `base`, `avanzado`
- `type` (opcional) - Filtrar por tipo: `interior`, `exterior`, `vehiculos`, `contenedores`
- `club_id` (opcional) - Filtrar por club
- `date_from` (opcional) - Fecha desde (ISO 8601)
- `date_to` (opcional) - Fecha hasta (ISO 8601)

**Response (200 OK):**
```json
{
  "events": [
    {
      "id": 1,
      "date": "2025-03-15T10:00:00Z",
      "title": "Prueba Nosework Trial Barcelona",
      "description": "Prueba oficial de nivel Base",
      "location": "Barcelona",
      "address": "Calle Ejemplo 123",
      "city": "Barcelona",
      "postal_code": "08001",
      "club_id": 1,
      "type": "interior",
      "level": "base",
      "status": "open",
      "price": 25.00,
      "registration_start_date": "2025-02-01T00:00:00Z",
      "registration_end_date": "2025-03-10T23:59:59Z",
      "max_participants": 30,
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z"
    }
  ],
  "total": 1
}
```

**Estado actual:** ✅ Implementado (básico)

---

### GET /api/events/[id]

Obtener evento específico.

**Autenticación:** No requerida

**Response (200 OK):**
```json
{
  "event": {
    "id": 1,
    "date": "2025-03-15T10:00:00Z",
    "title": "Prueba Nosework Trial Barcelona",
    "description": "Prueba oficial de nivel Base",
    "location": "Barcelona",
    "club": {
      "id": 1,
      "name": "Club Nosework Barcelona",
      "slug": "club-nosework-barcelona"
    },
    "judges": [
      {
        "id": 1,
        "name": "Juan Pérez",
        "role": "main"
      }
    ],
    "registrations_count": 15,
    "max_participants": 30
  }
}
```

**Errores:**
- `404` - Evento no encontrado

**Estado actual:** ✅ Implementado

---

### POST /api/events

Crear nuevo evento.

**Autenticación:** Requerida (organizador, administrador)

**Request:**
```json
{
  "date": "2025-03-15T10:00:00Z",
  "title": "Prueba Nosework Trial Barcelona",
  "description": "Prueba oficial de nivel Base",
  "location": "Barcelona",
  "address": "Calle Ejemplo 123",
  "city": "Barcelona",
  "postal_code": "08001",
  "club_id": 1,
  "type": "interior",
  "level": "base",
  "price": 25.00,
  "registration_start_date": "2025-02-01T00:00:00Z",
  "registration_end_date": "2025-03-10T23:59:59Z",
  "max_participants": 30,
  "evaluation_coefficients": {
    "sistematica": 1.0,
    "focalizacion": 1.0,
    "intensidad": 1.0,
    "impresion_general": 1.0
  }
}
```

**Response (201 Created):**
```json
{
  "message": "Evento creado con éxito",
  "event": {
    "id": 1,
    "date": "2025-03-15T10:00:00Z",
    "title": "Prueba Nosework Trial Barcelona",
    "status": "open"
  }
}
```

**Errores:**
- `400` - Campos faltantes o inválidos
- `401` - No autenticado
- `403` - Sin permisos (no es organizador/admin)

**Validación:**
- `date`: fecha futura válida
- `title`: mínimo 5 caracteres
- `price`: número positivo o null
- `registration_end_date`: debe ser anterior a `date`

**Estado actual:** ✅ Implementado (básico)

---

### PUT /api/events

Actualizar evento existente.

**Autenticación:** Requerida (organizador del evento o administrador)

**Request:**
```json
{
  "id": 1,
  "date": "2025-03-15T10:00:00Z",
  "title": "Prueba Nosework Trial Barcelona (Actualizada)",
  "description": "Descripción actualizada",
  "status": "closed"
}
```

**Response (200 OK):**
```json
{
  "message": "Evento actualizado con éxito",
  "event": {
    "id": 1,
    "title": "Prueba Nosework Trial Barcelona (Actualizada)",
    "updated_at": "2025-01-20T10:00:00Z"
  }
}
```

**Errores:**
- `400` - Campos faltantes o inválidos
- `401` - No autenticado
- `403` - Sin permisos
- `404` - Evento no encontrado

**Estado actual:** ✅ Implementado (básico)

---

### DELETE /api/events?id=[id]

Eliminar evento.

**Autenticación:** Requerida (organizador del evento o administrador)

**Response (200 OK):**
```json
{
  "message": "Evento eliminado con éxito"
}
```

**Errores:**
- `400` - ID faltante
- `401` - No autenticado
- `403` - Sin permisos
- `404` - Evento no encontrado
- `409` - Evento tiene inscripciones activas (no se puede eliminar)

**Estado actual:** ✅ Implementado

---

## Endpoints de Inscripciones (Fase 4)

### GET /api/registrations

Obtener inscripciones del usuario autenticado.

**Autenticación:** Requerida (user)

**Query Parameters:**
- `status` (opcional) - Filtrar por estado: `pending`, `confirmed`, `cancelled`
- `event_id` (opcional) - Filtrar por evento

**Response (200 OK):**
```json
{
  "registrations": [
    {
      "id": 1,
      "event": {
        "id": 1,
        "title": "Prueba Nosework Trial Barcelona",
        "date": "2025-03-15T10:00:00Z"
      },
      "dog": {
        "id": 1,
        "name": "Max",
        "breed": "Labrador"
      },
      "level": "base",
      "status": "confirmed",
      "payment_status": "paid",
      "created_at": "2025-02-05T10:00:00Z"
    }
  ]
}
```

---

### POST /api/registrations

Crear nueva inscripción.

**Autenticación:** Requerida (user)

**Request:**
```json
{
  "event_id": 1,
  "dog_id": 1,
  "level": "base",
  "behavior_issues_noted": false,
  "behavior_issues_notes": null
}
```

**Response (201 Created):**
```json
{
  "message": "Inscripción creada con éxito",
  "registration": {
    "id": 1,
    "event_id": 1,
    "dog_id": 1,
    "level": "base",
    "status": "pending",
    "payment_status": "pending"
  }
}
```

**Errores:**
- `400` - Campos faltantes, perro no válido, evento no disponible
- `401` - No autenticado
- `409` - Ya inscrito en este evento
- `422` - Perro no cumple requisitos (edad, vacunas)

**Validación:**
- Verificar que el evento está abierto para inscripciones
- Verificar que el perro pertenece al usuario
- Verificar requisitos del perro (edad mínima, vacunas)
- Verificar que no está ya inscrito

---

### DELETE /api/registrations/[id]

Cancelar inscripción.

**Autenticación:** Requerida (user - solo sus propias inscripciones)

**Response (200 OK):**
```json
{
  "message": "Inscripción cancelada con éxito"
}
```

**Errores:**
- `401` - No autenticado
- `403` - No es tu inscripción
- `404` - Inscripción no encontrada
- `409` - No se puede cancelar (muy cerca de la fecha del evento)

---

## Endpoints de Resultados (Fase 3)

### GET /api/results

Obtener resultados.

**Autenticación:** No requerida

**Query Parameters:**
- `event_id` (opcional) - Filtrar por evento
- `dog_id` (opcional) - Filtrar por perro
- `handler_id` (opcional) - Filtrar por guía
- `level` (opcional) - Filtrar por nivel: `base`, `avanzado`
- `year` (opcional) - Filtrar por año

**Response (200 OK):**
```json
{
  "results": [
    {
      "id": 1,
      "event": {
        "id": 1,
        "title": "Prueba Nosework Trial Barcelona",
        "date": "2025-03-15T10:00:00Z"
      },
      "dog": {
        "id": 1,
        "name": "Max"
      },
      "handler": {
        "id": 1,
        "name": "Juan Pérez"
      },
      "level": "base",
      "score_sistematica": 8.5,
      "score_focalizacion": 9.0,
      "score_intensidad": 8.0,
      "score_impresion_general": 8.5,
      "total_score": 85.0,
      "time_seconds": 120,
      "mark_duration_seconds": 5,
      "position": 1,
      "judge_notes": "Excelente trabajo sistemático"
    }
  ],
  "total": 1
}
```

---

### POST /api/results

Crear resultado (juez u organizador).

**Autenticación:** Requerida (juez, organizador del evento, administrador)

**Request:**
```json
{
  "event_id": 1,
  "dog_id": 1,
  "handler_id": 1,
  "level": "base",
  "score_sistematica": 8.5,
  "score_focalizacion": 9.0,
  "score_intensidad": 8.0,
  "score_impresion_general": 8.5,
  "time_seconds": 120,
  "mark_duration_seconds": 5,
  "judge_notes": "Excelente trabajo sistemático",
  "sanction_applied": false
}
```

**Response (201 Created):**
```json
{
  "message": "Resultado creado con éxito",
  "result": {
    "id": 1,
    "total_score": 85.0,
    "position": 1
  }
}
```

**Validación:**
- Verificar que el juez está asignado al evento
- Verificar marca mínima de 3 segundos
- Calcular `total_score` según coeficientes del evento

---

## Endpoints de Perros (Fase 4)

### GET /api/dogs

Obtener perros del usuario autenticado.

**Autenticación:** Requerida (user)

**Response (200 OK):**
```json
{
  "dogs": [
    {
      "id": 1,
      "name": "Max",
      "breed": "Labrador",
      "birth_date": "2020-05-15",
      "gender": "male",
      "photo_url": "/uploads/dogs/max.jpg",
      "registration_number": "DOG-2024-001",
      "behavior_issues": false,
      "created_at": "2024-01-10T10:00:00Z"
    }
  ]
}
```

---

### POST /api/dogs

Registrar nuevo perro.

**Autenticación:** Requerida (user)

**Request:**
```json
{
  "name": "Max",
  "breed": "Labrador",
  "birth_date": "2020-05-15",
  "gender": "male",
  "behavior_issues": false,
  "behavior_issues_notes": null
}
```

**Response (201 Created):**
```json
{
  "message": "Perro registrado con éxito",
  "dog": {
    "id": 1,
    "name": "Max",
    "handler_id": 1
  }
}
```

**Validación:**
- `name`: mínimo 2 caracteres
- `birth_date`: fecha válida en el pasado
- `gender`: `male` o `female`

---

### PUT /api/dogs/[id]

Actualizar perro.

**Autenticación:** Requerida (user - solo sus perros)

**Request:**
```json
{
  "name": "Max (Actualizado)",
  "breed": "Labrador Retriever",
  "behavior_issues": true,
  "behavior_issues_notes": "Requiere espacio personal"
}
```

**Response (200 OK):**
```json
{
  "message": "Perro actualizado con éxito"
}
```

---

### DELETE /api/dogs/[id]

Eliminar perro.

**Autenticación:** Requerida (user - solo sus perros)

**Response (200 OK):**
```json
{
  "message": "Perro eliminado con éxito"
}
```

**Errores:**
- `409` - Perro tiene inscripciones activas

---

## Endpoints de Clubs (Fase 2)

### GET /api/clubs

Obtener listado de clubs.

**Autenticación:** No requerida

**Query Parameters:**
- `city` (opcional) - Filtrar por ciudad
- `level` (opcional) - Filtrar por nivel de integración

**Response (200 OK):**
```json
{
  "clubs": [
    {
      "id": 1,
      "name": "Club Nosework Barcelona",
      "slug": "club-nosework-barcelona",
      "city": "Barcelona",
      "address": "Calle Ejemplo 123",
      "email": "contacto@clubnoseworkbcn.com",
      "website": "https://clubnoseworkbcn.com",
      "level": "organiza_pruebas",
      "latitude": 41.3851,
      "longitude": 2.1734
    }
  ]
}
```

---

### GET /api/clubs/[slug]

Obtener club específico.

**Autenticación:** No requerida

**Response (200 OK):**
```json
{
  "club": {
    "id": 1,
    "name": "Club Nosework Barcelona",
    "slug": "club-nosework-barcelona",
    "description": "Club dedicado a Nosework Trial en Barcelona",
    "events_count": 5,
    "members_count": 25
  }
}
```

---

## Endpoints de Rankings (Fase 6)

### GET /api/rankings

Obtener rankings.

**Autenticación:** No requerida

**Query Parameters:**
- `type` (requerido) - Tipo: `dog`, `handler`, `club`
- `year` (opcional) - Año (default: año actual)
- `season` (opcional) - Temporada: `spring`, `summer`, `fall`, `winter`, `annual`
- `level` (opcional) - Nivel: `base`, `avanzado`

**Response (200 OK):**
```json
{
  "rankings": [
    {
      "position": 1,
      "dog": {
        "id": 1,
        "name": "Max"
      },
      "handler": {
        "id": 1,
        "name": "Juan Pérez"
      },
      "total_points": 450.5,
      "events_participated": 5,
      "events_won": 2
    }
  ],
  "year": 2025,
  "season": "annual",
  "level": "base"
}
```

---

## Endpoints de Administración (Fase 5)

### GET /api/admin/users

Obtener todos los usuarios (admin).

**Autenticación:** Requerida (administrador)

**Query Parameters:**
- `role` (opcional) - Filtrar por rol
- `search` (opcional) - Buscar por email o nombre

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "role": "user",
      "created_at": "2024-01-10T10:00:00Z",
      "profile": {
        "first_name": "Juan",
        "last_name": "Pérez"
      }
    }
  ],
  "total": 1
}
```

---

### PUT /api/admin/users/[id]

Actualizar usuario (admin).

**Autenticación:** Requerida (administrador)

**Request:**
```json
{
  "role": "organizador"
}
```

**Response (200 OK):**
```json
{
  "message": "Usuario actualizado con éxito"
}
```

---

## Formato de Errores

Todos los errores siguen este formato:

```json
{
  "error": "Mensaje de error descriptivo",
  "code": "ERROR_CODE",
  "details": {
    "field": "Campo específico con error",
    "message": "Detalle adicional"
  }
}
```

**Códigos HTTP:**
- `200` - OK
- `201` - Created
- `400` - Bad Request (validación)
- `401` - Unauthorized (no autenticado)
- `403` - Forbidden (sin permisos)
- `404` - Not Found
- `409` - Conflict (recurso ya existe o conflicto de estado)
- `422` - Unprocessable Entity (validación de negocio)
- `500` - Internal Server Error

---

## Validación de Entrada

### Estrategia

1. **Cliente:** Validación básica con HTML5 y JavaScript
2. **Servidor:** Validación completa y sanitización

### Librerías Recomendadas

- **Joi** o **Yup** para validación de esquemas
- **validator.js** para validaciones específicas
- **sanitize-html** para sanitización de HTML

### Ejemplo de Validación

```javascript
// Ejemplo con Joi
const eventSchema = Joi.object({
  date: Joi.date().iso().required(),
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).required(),
  level: Joi.string().valid('base', 'avanzado').required(),
  price: Joi.number().positive().allow(null)
});
```

---

## Rate Limiting

### Estrategia Mínima

- **Endpoints públicos:** 100 req/min por IP
- **Endpoints autenticados:** 200 req/min por usuario
- **Endpoints de escritura:** 50 req/min por usuario

### Implementación Futura

Cuando se migre a backend dedicado, usar `express-rate-limit`:

```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de requests
});
```

---

**Última actualización:** Enero 2025
