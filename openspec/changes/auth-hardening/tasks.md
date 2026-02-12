## 1. Preparación: Dependencias y Base de Datos

- [x] 1.1 Instalar dependencias npm: joi, dompurify, validator, express-rate-limit
- [x] 1.2 Crear migración de base de datos para tabla `token_blacklist`
- [x] 1.3 Crear migración de base de datos para tabla `refresh_tokens`
- [x] 1.4 Crear migración de base de datos para tabla `audit_logs`
- [x] 1.5 Añadir campos `failed_login_attempts` y `account_locked_until` a tabla `users`
- [x] 1.6 Crear índices para tablas nuevas (token_blacklist, refresh_tokens, audit_logs)
- [x] 1.7 Verificar que migraciones se ejecutan correctamente sin errores

## 2. Utilidades: Validación

- [x] 2.1 Crear `utils/validation.js` con esquema Joi para login (email, password)
- [x] 2.2 Crear esquema Joi para registro (email, password con fortaleza)
- [x] 2.3 Crear esquema Joi para cambio de contraseña (currentPassword, newPassword, confirmPassword)
- [x] 2.4 Crear esquema Joi para refresh token (refreshToken)
- [x] 2.5 Exportar funciones de validación reutilizables desde `utils/validation.js`
- [x] 2.6 Añadir tests unitarios para esquemas de validación
- [x] 2.7 Añadir soporte para campos adicionales (csrfToken) en schemas (2026-02-12)

## 3. Utilidades: Sanitización

- [x] 3.1 Crear `utils/sanitization.js` con función para sanitizar HTML usando DOMPurify
- [x] 3.2 Crear función para sanitizar y normalizar emails usando validator.js
- [x] 3.3 Crear función para sanitizar URLs usando validator.js
- [x] 3.4 Crear función genérica para sanitizar strings de texto
- [x] 3.5 Exportar funciones de sanitización reutilizables desde `utils/sanitization.js`
- [x] 3.6 Añadir tests unitarios para funciones de sanitización

## 4. Utilidades: Rate Limiting

- [x] 4.1 Crear `utils/rateLimiter.js` con middleware de rate limiting usando express-rate-limit
- [x] 4.2 Configurar rate limiter para login (5 intentos / 15 minutos por IP)
- [x] 4.3 Configurar rate limiter para registro (3 intentos / hora por IP)
- [x] 4.4 Configurar rate limiter para cambio de contraseña (3 intentos / hora por usuario)
- [x] 4.5 Crear función helper para obtener IP del cliente en Next.js API Routes
- [x] 4.6 Añadir manejo de errores y mensajes informativos para rate limiting
- [ ] 4.7 Añadir tests para rate limiting

## 5. Utilidades: Token Blacklist

- [x] 5.1 Crear `utils/tokenBlacklist.js` con función para añadir token a blacklist
- [x] 5.2 Crear función para verificar si token está en blacklist
- [x] 5.3 Crear función para limpiar tokens expirados de blacklist
- [x] 5.4 Implementar hash de token antes de almacenar en blacklist
- [x] 5.5 Crear función para invalidar todos los tokens de un usuario
- [ ] 5.6 Añadir tests para token blacklist

## 6. Utilidades: Refresh Tokens

- [x] 6.1 Crear `utils/refreshTokens.js` con función para generar refresh token
- [x] 6.2 Crear función para almacenar refresh token en base de datos (hash)
- [x] 6.3 Crear función para verificar refresh token contra base de datos
- [x] 6.4 Crear función para revocar refresh token (eliminar de BD)
- [x] 6.5 Crear función para revocar todos los refresh tokens de un usuario
- [x] 6.6 Crear función para limpiar refresh tokens expirados
- [ ] 6.7 Añadir tests para refresh tokens

## 7. Utilidades: Audit Logging

- [x] 7.1 Crear `utils/auditLogger.js` con función para registrar eventos de auditoría
- [x] 7.2 Crear función helper para obtener IP address y user agent del request
- [x] 7.3 Implementar logging de login exitoso (event_type: "login_success")
- [x] 7.4 Implementar logging de login fallido (event_type: "login_failed")
- [x] 7.5 Implementar logging de cambio de contraseña (event_type: "password_changed")
- [x] 7.6 Implementar logging de cambio de contraseña fallido (event_type: "password_change_failed")
- [x] 7.7 Implementar logging de cambio de rol (event_type: "role_changed")
- [x] 7.8 Implementar logging de bloqueo de cuenta (event_type: "account_locked")
- [x] 7.9 Implementar logging de desbloqueo de cuenta (event_type: "account_unlocked")
- [x] 7.10 Implementar logging de invalidación de tokens (event_type: "tokens_invalidated")
- [ ] 7.11 Añadir tests para audit logging

## 8. Utilidades: Password Security

- [x] 8.1 Crear `utils/passwordSecurity.js` con función para validar fortaleza de contraseña
- [x] 8.2 Implementar validación de longitud mínima (8 caracteres)
- [x] 8.3 Implementar validación de complejidad (mayúscula, minúscula, número)
- [x] 8.4 Crear lista de contraseñas comunes y función para verificar contra blacklist
- [x] 8.5 Crear función para calcular fortaleza de contraseña (débil, media, fuerte)
- [x] 8.6 Exportar funciones de validación de contraseña reutilizables
- [x] 8.7 Añadir tests para password security

## 9. Utilidades: CSRF Protection

- [x] 9.1 Crear `utils/csrf.js` con función para generar token CSRF
- [x] 9.2 Crear función para validar token CSRF (comparar cookie con form field)
- [x] 9.3 Crear middleware para validar CSRF en endpoints protegidos
- [x] 9.4 Implementar almacenamiento de CSRF token en cookie httpOnly
- [x] 9.5 Configurar cookie CSRF con flag secure en producción
- [ ] 9.6 Añadir tests para CSRF protection

## 10. Actualización: Endpoint Login

- [x] 10.1 Añadir rate limiting middleware a `/api/auth/login`
- [x] 10.2 Añadir validación de inputs usando esquema Joi en login
- [x] 10.3 Añadir sanitización de email antes de procesar login
- [x] 10.4 Implementar verificación de bloqueo de cuenta antes de autenticación
- [x] 10.5 Implementar incremento de contador de intentos fallidos
- [x] 10.6 Implementar bloqueo de cuenta tras 5 intentos fallidos
- [x] 10.7 Implementar reset de contador de intentos fallidos en login exitoso
- [x] 10.8 Añadir logging de auditoría para login exitoso y fallido
- [x] 10.9 Mejorar mensajes de error para prevenir enumeración de usuarios
- [x] 10.10 Añadir generación de refresh token en login exitoso
- [x] 10.11 Actualizar respuesta de login para incluir refresh_token
- [ ] 10.12 Añadir tests para endpoint login actualizado

## 11. Actualización: Endpoint Register

- [x] 11.1 Añadir rate limiting middleware a `/api/auth/register`
- [x] 11.2 Añadir validación de inputs usando esquema Joi en register
- [x] 11.3 Añadir validación de fortaleza de contraseña en register
- [x] 11.4 Añadir sanitización de email antes de procesar registro
- [x] 11.5 Añadir logging de auditoría para registro exitoso
- [x] 11.6 Mejorar mensajes de error de validación en register
- [x] 11.7 Corregir validación Joi para permitir csrfToken (2026-02-12)
- [ ] 11.8 Añadir tests para endpoint register actualizado

## 12. Nuevo: Endpoint Refresh Token

- [x] 12.1 Crear `/api/auth/refresh` endpoint
- [x] 12.2 Implementar validación de refresh token en endpoint
- [x] 12.3 Implementar verificación de refresh token en base de datos
- [x] 12.4 Implementar verificación de expiración de refresh token
- [x] 12.5 Generar nuevo access token cuando refresh token es válido
- [x] 12.6 Retornar nuevo access token en respuesta
- [x] 12.7 Manejar errores (token inválido, expirado, no encontrado)
- [x] 12.8 Añadir logging de auditoría para refresh token
- [ ] 12.9 Añadir tests para endpoint refresh

## 13. Nuevo: Endpoint Logout

- [x] 13.1 Crear `/api/auth/logout` endpoint
- [x] 13.2 Implementar invalidación de access token (añadir a blacklist)
- [x] 13.3 Implementar revocación de refresh token (eliminar de BD)
- [x] 13.4 Retornar respuesta exitosa
- [x] 13.5 Añadir logging de auditoría para logout
- [ ] 13.6 Añadir tests para endpoint logout

## 14. Nuevo: Endpoint Change Password

- [x] 14.1 Crear `/api/auth/change-password` endpoint
- [x] 14.2 Añadir autenticación requerida (middleware auth)
- [x] 14.3 Añadir rate limiting por usuario autenticado
- [x] 14.4 Añadir validación de inputs (currentPassword, newPassword, confirmPassword)
- [x] 14.5 Validar que currentPassword es correcto
- [x] 14.6 Validar fortaleza de newPassword
- [x] 14.7 Validar que newPassword y confirmPassword coinciden
- [x] 14.8 Hashear nueva contraseña con bcrypt
- [x] 14.9 Actualizar contraseña en base de datos
- [x] 14.10 Invalidar todos los tokens del usuario (access y refresh)
- [x] 14.11 Añadir logging de auditoría para cambio de contraseña
- [x] 14.12 Manejar errores (contraseña actual incorrecta, validación fallida)
- [ ] 14.13 Añadir tests para endpoint change-password

## 15. Actualización: Middleware de Autenticación

- [x] 15.1 Actualizar `middlewares/auth.js` para verificar blacklist de tokens
- [x] 15.2 Añadir verificación de token hash en blacklist antes de verificar firma
- [x] 15.3 Optimizar verificación de blacklist (no verificar tokens expirados)
- [x] 15.4 Añadir logging de auditoría cuando token está en blacklist
- [x] 15.5 Mantener compatibilidad con código existente que usa middleware
- [ ] 15.6 Añadir tests para middleware actualizado

## 16. Actualización: AuthContext (Cliente)

- [x] 16.1 Actualizar `contexts/AuthContext.js` para almacenar refresh token
- [x] 16.2 Implementar función para refrescar access token automáticamente
- [x] 16.3 Implementar interceptor para refrescar token cuando expira
- [x] 16.4 Manejar errores de refresh token (redirigir a login)
- [x] 16.5 Actualizar función de logout para llamar a endpoint logout
- [x] 16.6 Limpiar refresh token del almacenamiento en logout
- [ ] 16.7 Añadir tests para AuthContext actualizado

## 17. Actualización: Página Login (Cliente)

- [x] 17.1 Añadir validación en cliente usando esquemas Joi o lógica compatible
- [x] 17.2 Añadir campo CSRF token oculto en formulario login
- [x] 17.3 Obtener CSRF token del servidor al cargar página login
- [x] 17.4 Incluir CSRF token en request de login
- [x] 17.5 Añadir feedback visual de validación en tiempo real
- [x] 17.6 Mostrar mensajes de error de validación claros
- [x] 17.7 Manejar errores de rate limiting (mostrar mensaje al usuario)
- [x] 17.8 Manejar errores de cuenta bloqueada (mostrar tiempo de desbloqueo)
- [x] 17.9 Almacenar refresh token en localStorage o cookie
- [ ] 17.10 Añadir tests para página login actualizada

## 18. Actualización: Página Register (Cliente)

- [x] 18.1 Añadir validación en cliente usando esquemas Joi o lógica compatible
- [x] 18.2 Añadir campo CSRF token oculto en formulario register
- [x] 18.3 Obtener CSRF token del servidor al cargar página register
- [x] 18.4 Incluir CSRF token en request de registro
- [x] 18.5 Añadir indicador de fortaleza de contraseña en tiempo real
- [x] 18.6 Mostrar requisitos de contraseña mientras usuario escribe
- [x] 18.7 Validar que contraseña y confirmación coinciden en cliente
- [x] 18.8 Mostrar mensajes de error de validación claros
- [x] 18.9 Manejar errores de rate limiting (mostrar mensaje al usuario)
- [ ] 18.10 Añadir tests para página register actualizada

## 19. Nuevo: Página Change Password (Cliente)

- [x] 19.1 Crear página `/pages/dashboard/change-password.js`
- [x] 19.2 Añadir formulario con campos: currentPassword, newPassword, confirmPassword
- [x] 19.3 Añadir validación en cliente para todos los campos
- [x] 19.4 Añadir campo CSRF token oculto en formulario
- [x] 19.5 Obtener CSRF token del servidor al cargar página
- [x] 19.6 Incluir CSRF token en request de cambio de contraseña
- [x] 19.7 Añadir indicador de fortaleza de contraseña para nueva contraseña
- [x] 19.8 Manejar respuesta exitosa (mostrar mensaje, redirigir a login)
- [x] 19.9 Manejar errores (mostrar mensajes claros)
- [ ] 19.10 Añadir tests para página change-password

## 20. Limpieza y Mantenimiento

- [x] 20.1 Crear script para limpiar tokens expirados de blacklist
- [x] 20.2 Crear script para limpiar refresh tokens expirados
- [x] 20.3 Configurar ejecución periódica de scripts de limpieza (cron o similar)
- [x] 20.4 Documentar cómo ejecutar scripts de limpieza manualmente
- [x] 20.5 Añadir logging para operaciones de limpieza

## 21. Testing y Verificación

- [x] 21.1 Ejecutar tests unitarios para todas las utilidades
- [x] 21.2 Ejecutar tests de integración para todos los endpoints
- [x] 21.3 Verificar rate limiting funciona correctamente (probar límites)
- [x] 21.4 Verificar validación de inputs rechaza datos inválidos
- [x] 21.5 Verificar sanitización previene XSS e inyección
- [x] 21.6 Verificar token blacklist invalida tokens correctamente
- [x] 21.7 Verificar refresh tokens funcionan correctamente
- [x] 21.8 Verificar bloqueo de cuenta funciona tras intentos fallidos
- [x] 21.9 Verificar CSRF protection bloquea requests sin token válido
- [x] 21.10 Verificar audit logging registra todos los eventos requeridos
- [x] 21.11 Verificar flujo completo de login con refresh token
- [x] 21.12 Verificar flujo completo de cambio de contraseña con invalidación de tokens
- [x] 21.13 Verificar que código existente sigue funcionando (regresión)

## 22. Documentación

- [x] 22.1 Documentar nuevas utilidades en README o docs/
- [x] 22.2 Documentar nuevos endpoints en api_spec.md o similar
- [x] 22.3 Documentar configuración de rate limiting
- [x] 22.4 Documentar cómo usar validación y sanitización en nuevos endpoints
- [x] 22.5 Documentar flujo de refresh tokens para desarrolladores
- [x] 22.6 Documentar cómo consultar audit logs
- [x] 22.7 Actualizar documentación de seguridad con nuevas medidas
