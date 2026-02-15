## Context

El sistema actual de autenticación implementa funcionalidad básica con JWT y bcrypt, pero carece de medidas de seguridad robustas. Los endpoints de autenticación (`/api/auth/login`, `/api/auth/register`) no tienen rate limiting, la validación de inputs es básica, no hay sanitización, y los tokens JWT no se invalidan cuando un usuario cambia su contraseña. El middleware de autenticación (`middlewares/auth.js`) verifica tokens pero no maneja tokens invalidados ni implementa protecciones adicionales.

**Estado actual:**
- Login/register funcionan con JWT y bcrypt (10 rounds)
- Tokens almacenados en localStorage del cliente
- Middleware básico de autenticación y autorización por roles
- Validación mínima de inputs (solo verificación de campos requeridos)
- Sin rate limiting
- Sin protección CSRF
- Sin logging de auditoría para acciones críticas

**Restricciones:**
- Next.js Pages Router (no App Router)
- SQLite como base de datos MVP (sin Redis disponible inicialmente)
- Mantener compatibilidad con código existente
- No romper funcionalidad actual de autenticación

## Goals / Non-Goals

**Goals:**
- Implementar rate limiting efectivo en endpoints de autenticación para prevenir ataques de fuerza bruta
- Añadir validación robusta de inputs en cliente y servidor con esquemas reutilizables
- Implementar sanitización de datos de usuario para prevenir inyección
- Crear sistema de invalidación de tokens JWT cuando se cambia contraseña
- Añadir protección CSRF en formularios críticos
- Implementar logging de auditoría para acciones de autenticación críticas
- Mejorar seguridad de contraseñas con validación de fortaleza
- Añadir sistema de bloqueo temporal de cuentas tras intentos fallidos
- Implementar refresh tokens para mejor gestión de sesiones

**Non-Goals:**
- Migración a App Router de Next.js
- Implementación de 2FA (requisito futuro según REQ-NF-034, fuera de alcance de este cambio)
- Cambio de almacenamiento de tokens de localStorage a httpOnly cookies (consideración futura)
- Migración a PostgreSQL o Redis (mantener compatibilidad con SQLite MVP)
- Implementación de OAuth o autenticación social (fuera de alcance)

## Decisions

### 1. Rate Limiting: In-memory con límites por IP

**Decisión:** Implementar rate limiting en memoria usando `express-rate-limit` o solución similar compatible con Next.js API Routes, con límites por IP.

**Alternativas consideradas:**
- **Redis-based rate limiting**: Más escalable pero requiere infraestructura adicional no disponible en MVP
- **Base de datos SQLite**: Más persistente pero puede ser cuello de botella en SQLite

**Rationale:** Para MVP con SQLite, rate limiting en memoria es suficiente y evita dependencias adicionales. Los límites por IP protegen contra ataques básicos sin afectar usuarios legítimos. Se puede migrar a Redis cuando se escale a producción.

**Configuración propuesta:**
- Login: 5 intentos por 15 minutos por IP
- Register: 3 intentos por hora por IP
- Cambio de contraseña: 3 intentos por hora por usuario autenticado

### 2. Validación: Joi para esquemas de validación

**Decisión:** Usar `joi` para validación de esquemas en servidor, con validación en cliente usando la misma lógica o biblioteca compatible.

**Alternativas consideradas:**
- **Yup**: Más ligero pero menos features para validación compleja
- **Zod**: TypeScript-first, pero el proyecto usa JavaScript
- **Validación manual**: Más control pero más propenso a errores

**Rationale:** Joi es maduro, bien documentado, y permite esquemas reutilizables que se pueden compartir entre cliente y servidor. Facilita mantenimiento y consistencia.

### 3. Sanitización: DOMPurify para HTML, validator.js para otros datos

**Decisión:** Usar `dompurify` para sanitización de HTML y `validator` para validación y sanitización de otros tipos de datos (emails, URLs, etc.).

**Rationale:** DOMPurify es estándar para prevenir XSS en HTML. Validator.js complementa con validación de formatos comunes. Ambos son ligeros y bien mantenidos.

### 4. Invalidación de Tokens: Blacklist en base de datos

**Decisión:** Implementar blacklist de tokens en tabla SQLite `token_blacklist` con tokens invalidados y fecha de expiración.

**Alternativas consideradas:**
- **Refresh tokens con revocación**: Más complejo pero mejor UX a largo plazo
- **Tokens con versión de contraseña**: Incluir hash de contraseña en token, invalidar al cambiar

**Rationale:** Blacklist en base de datos es simple y efectivo para MVP. Los tokens expirados se pueden limpiar periódicamente. Se puede migrar a refresh tokens en el futuro si se necesita mejor UX.

**Estructura propuesta:**
```sql
CREATE TABLE token_blacklist (
    token_hash TEXT PRIMARY KEY,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Protección CSRF: Tokens CSRF en sesión/cookies

**Decisión:** Implementar tokens CSRF usando cookies httpOnly para almacenar el token CSRF, generado en servidor y validado en formularios críticos.

**Rationale:** Cookies httpOnly son más seguras que almacenar tokens en localStorage para CSRF. Compatible con Next.js y no requiere cambios arquitectónicos mayores.

### 6. Bloqueo de Cuentas: Bloqueo temporal en tabla users

**Decisión:** Añadir campos `failed_login_attempts` y `account_locked_until` a tabla `users` para implementar bloqueo temporal.

**Rationale:** Simple y efectivo. El bloqueo se resetea automáticamente tras el tiempo de bloqueo o al iniciar sesión exitosamente.

**Configuración propuesta:**
- Bloquear tras 5 intentos fallidos
- Duración de bloqueo: 15 minutos inicialmente, incrementar exponencialmente

### 7. Refresh Tokens: Implementación básica con tabla dedicada

**Decisión:** Implementar refresh tokens en tabla `refresh_tokens` con tokens de larga duración (7 días) y access tokens de corta duración (15 minutos).

**Alternativas consideradas:**
- **Solo access tokens con expiración larga**: Menos seguro
- **Solo access tokens con expiración corta sin refresh**: Peor UX

**Rationale:** Balance entre seguridad y UX. Los refresh tokens permiten renovar sesiones sin re-autenticación frecuente, mientras que access tokens cortos limitan el daño si se comprometen.

**Estructura propuesta:**
```sql
CREATE TABLE refresh_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token_hash TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 8. Logging de Auditoría: Tabla audit_logs en SQLite

**Decisión:** Crear tabla `audit_logs` para registrar acciones críticas de autenticación y autorización.

**Rationale:** Cumple con REQ-NF-030. SQLite es suficiente para MVP, se puede migrar a sistema de logging dedicado en producción.

**Eventos a registrar:**
- Intentos de login (exitosos y fallidos)
- Cambios de contraseña
- Cambios de rol
- Bloqueos de cuenta
- Invalidación de tokens

## Risks / Trade-offs

**Riesgo: Rate limiting en memoria puede ser bypassed con múltiples IPs**
- **Mitigación:** Implementar rate limiting adicional por usuario autenticado cuando sea posible. Monitorear patrones sospechosos.

**Riesgo: Blacklist de tokens puede crecer indefinidamente en SQLite**
- **Mitigación:** Implementar limpieza periódica de tokens expirados. Considerar migración a Redis en producción.

**Riesgo: Bloqueo de cuentas puede afectar usuarios legítimos**
- **Mitigación:** Comunicar claramente el bloqueo al usuario. Permitir recuperación mediante email si es necesario. Configurar tiempos de bloqueo razonables.

**Riesgo: Refresh tokens comprometidos pueden ser usados hasta expiración**
- **Mitigación:** Implementar revocación de refresh tokens. Monitorear actividad sospechosa. Considerar rotación de refresh tokens.

**Trade-off: Validación robusta puede afectar performance**
- **Mitigación:** Validación en cliente reduce carga en servidor. Cachear esquemas de validación cuando sea posible.

**Trade-off: Más complejidad en código de autenticación**
- **Mitigación:** Modularizar código en utilidades reutilizables. Documentar bien. Tests exhaustivos.

## Migration Plan

### Fase 1: Preparación (Sin cambios en producción)
1. Crear nuevas tablas en base de datos (token_blacklist, refresh_tokens, audit_logs)
2. Añadir campos a tabla users (failed_login_attempts, account_locked_until)
3. Instalar dependencias (joi, dompurify, validator, express-rate-limit)

### Fase 2: Implementación de Utilidades
1. Crear `utils/validation.js` con esquemas Joi
2. Crear `utils/sanitization.js` con funciones de sanitización
3. Crear `utils/rateLimiter.js` con middleware de rate limiting
4. Crear `utils/tokenBlacklist.js` para gestión de blacklist
5. Crear `utils/auditLogger.js` para logging de auditoría

### Fase 3: Actualización de Endpoints
1. Actualizar `/api/auth/login` con rate limiting, validación, logging, bloqueo de cuentas
2. Actualizar `/api/auth/register` con validación robusta, sanitización, validación de contraseña
3. Crear `/api/auth/refresh` para refresh tokens
4. Crear `/api/auth/logout` para invalidar tokens
5. Crear `/api/auth/change-password` con invalidación de tokens

### Fase 4: Actualización de Middleware
1. Actualizar `middlewares/auth.js` para verificar blacklist de tokens
2. Añadir middleware de validación CSRF

### Fase 5: Actualización de Cliente
1. Actualizar `contexts/AuthContext.js` para manejar refresh tokens
2. Actualizar `pages/login.js` y `pages/register.js` con validación en cliente y CSRF

### Fase 6: Testing y Verificación
1. Tests unitarios para utilidades
2. Tests de integración para endpoints
3. Tests de seguridad (rate limiting, validación, sanitización)
4. Verificación manual de flujos completos

### Rollback Strategy
- Mantener código anterior comentado durante implementación
- Feature flags para activar/desactivar nuevas funcionalidades
- Migración de base de datos reversible (ALTER TABLE con verificación)

## Open Questions

1. **¿Implementar rotación de refresh tokens automática?** - Mejor seguridad pero más complejidad
2. **¿Añadir notificaciones por email para bloqueos de cuenta?** - Mejor UX pero requiere sistema de emails
3. **¿Implementar recuperación de cuenta automática tras bloqueo?** - Mejor UX pero puede ser vector de ataque
4. **¿Configurar rate limiting diferente por entorno (dev/staging/prod)?** - Más flexible pero más configuración
5. **¿Añadir métricas y alertas para intentos de ataque?** - Mejor seguridad pero requiere infraestructura adicional
