# Test Plan - Nosework Trial Community Platform

Este documento define la estrategia de testing del proyecto, incluyendo tests unitarios, de integración y E2E.

**Cobertura objetivo:** Mínimo 70% para código crítico (auth, API, validaciones)

---

## Estrategia de Testing

### Niveles de Testing

1. **Unit Tests:** Funciones y utilidades individuales
2. **Integration Tests:** APIs y flujos completos
3. **E2E Tests:** Flujos de usuario completos

### Herramientas

**Recomendadas:**
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **Supertest** - Testing de APIs
- **Playwright** o **Cypress** - E2E testing

---

## Unit Tests

### Auth Utils

#### TEST-UNIT-AUTH-001: generateToken
**Archivo:** `utils/generateToken.js`  
**Tests:**
- Genera token válido con payload correcto
- Token incluye expiración
- Token puede ser verificado

**Código de ejemplo:**
```javascript
describe('generateToken', () => {
  it('should generate valid JWT token', () => {
    const payload = { id: 1, email: 'test@example.com', role: 'user' };
    const token = generateToken(payload);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
  
  it('should include expiration', () => {
    const payload = { id: 1 };
    const token = generateToken(payload);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.exp).toBeDefined();
  });
});
```

#### TEST-UNIT-AUTH-002: bcrypt password hashing
**Archivo:** `pages/api/auth/register.js`  
**Tests:**
- Contraseña se hashea correctamente
- Hash es diferente de password original
- Hash puede ser verificado con compareSync

---

### API Events

#### TEST-UNIT-API-001: GET /api/eventos
**Archivo:** `pages/api/eventos.js`  
**Tests:**
- Retorna lista de eventos
- Retorna formato JSON correcto
- Maneja errores de BD correctamente

**Código de ejemplo:**
```javascript
describe('GET /api/eventos', () => {
  it('should return list of events', async () => {
    const res = await request(app)
      .get('/api/eventos')
      .expect(200);
    
    expect(res.body).toHaveProperty('events');
    expect(Array.isArray(res.body.events)).toBe(true);
  });
});
```

#### TEST-UNIT-API-002: POST /api/eventos (autenticado)
**Archivo:** `pages/api/eventos.js`  
**Tests:**
- Crea evento con datos válidos
- Requiere autenticación
- Requiere rol organizador/admin
- Valida campos requeridos
- Retorna error si faltan campos

#### TEST-UNIT-API-003: PUT /api/eventos
**Archivo:** `pages/api/eventos.js`  
**Tests:**
- Actualiza evento existente
- Solo organizador del evento o admin puede actualizar
- Valida datos de entrada

#### TEST-UNIT-API-004: DELETE /api/eventos
**Archivo:** `pages/api/eventos.js`  
**Tests:**
- Elimina evento existente
- Solo organizador del evento o admin puede eliminar
- Retorna error si evento no existe

---

### Validaciones

#### TEST-UNIT-VALID-001: Validación de email
**Archivo:** Utilidad de validación  
**Tests:**
- Email válido pasa validación
- Email inválido falla validación
- Email vacío falla validación

#### TEST-UNIT-VALID-002: Validación de contraseña
**Archivo:** Utilidad de validación  
**Tests:**
- Contraseña mínimo 8 caracteres
- Contraseña fuerte pasa validación
- Contraseña débil falla validación

---

## Integration Tests

### Auth Flow

#### TEST-INT-AUTH-001: Registro completo
**Flujo:**
1. POST /api/auth/register con datos válidos
2. Verificar usuario creado en BD
3. Verificar contraseña hasheada
4. Verificar respuesta correcta

**Acceptance:**
- Usuario se crea correctamente
- Contraseña está hasheada (no en texto plano)
- Respuesta incluye datos del usuario (sin password)

#### TEST-INT-AUTH-002: Login completo
**Flujo:**
1. Crear usuario de prueba
2. POST /api/auth/login con credenciales correctas
3. Verificar token JWT retornado
4. Verificar token es válido

**Acceptance:**
- Login exitoso con credenciales correctas
- Token JWT válido retornado
- Token contiene información correcta del usuario

#### TEST-INT-AUTH-003: Login fallido
**Flujo:**
1. POST /api/auth/login con credenciales incorrectas
2. Verificar error 401
3. Verificar mensaje de error apropiado

**Acceptance:**
- Error 401 con credenciales incorrectas
- Mensaje de error claro

---

### Protected Routes

#### TEST-INT-PROTECT-001: Acceso a ruta protegida sin token
**Flujo:**
1. GET /api/eventos (POST) sin Authorization header
2. Verificar error 401

**Acceptance:**
- Error 401 sin token
- Mensaje "Token requerido"

#### TEST-INT-PROTECT-002: Acceso con token inválido
**Flujo:**
1. GET /api/eventos (POST) con token inválido
2. Verificar error 403

**Acceptance:**
- Error 403 con token inválido
- Mensaje "Token inválido"

#### TEST-INT-PROTECT-003: Acceso con token válido pero rol incorrecto
**Flujo:**
1. Crear usuario con rol "user"
2. Intentar POST /api/eventos (requiere organizador/admin)
3. Verificar error 403

**Acceptance:**
- Error 403 con rol incorrecto
- Mensaje "Acceso denegado"

#### TEST-INT-PROTECT-004: Acceso exitoso con token y rol correctos
**Flujo:**
1. Crear usuario con rol "organizador"
2. POST /api/eventos con token válido
3. Verificar éxito (201)

**Acceptance:**
- Acceso exitoso con credenciales correctas
- Evento se crea correctamente

---

### Events Flow

#### TEST-INT-EVENTS-001: Crear evento completo
**Flujo:**
1. Login como organizador
2. POST /api/eventos con datos completos
3. Verificar evento creado en BD
4. GET /api/eventos/[id] verificar datos

**Acceptance:**
- Evento se crea con todos los campos
- Datos se guardan correctamente en BD
- Evento es recuperable por ID

#### TEST-INT-EVENTS-002: Actualizar evento
**Flujo:**
1. Crear evento como organizador
2. PUT /api/eventos con datos actualizados
3. Verificar cambios en BD

**Acceptance:**
- Evento se actualiza correctamente
- Solo campos enviados se actualizan
- updated_at se actualiza

#### TEST-INT-EVENTS-003: Eliminar evento
**Flujo:**
1. Crear evento
2. DELETE /api/eventos?id=[id]
3. Verificar evento eliminado de BD
4. GET /api/eventos/[id] debe retornar 404

**Acceptance:**
- Evento se elimina correctamente
- No es recuperable después de eliminar

---

## E2E Tests (End-to-End)

### Smoke Tests - Páginas Públicas

#### TEST-E2E-SMOKE-001: Home page carga correctamente
**Flujo:**
1. Navegar a `/es/` (y añade un check de redirección si visitas /)
2. Verificar página carga
3. Verificar elementos principales visibles (navbar, hero, footer)

**Acceptance:**
- Página carga sin errores
- Elementos principales visibles
- No errores en consola

#### TEST-E2E-SMOKE-002: Navegación funciona
**Flujo:**
1. Desde home, click en cada enlace del navbar
2. Verificar cada página carga correctamente

**Acceptance:**
- Todas las páginas cargan
- URLs correctas
- Sin errores 404

#### TEST-E2E-SMOKE-003: Calendario de eventos muestra eventos
**Flujo:**
1. Navegar a `/eventos`
2. Verificar calendario se muestra
3. Verificar eventos se cargan

**Acceptance:**
- Calendario visible
- Eventos se muestran
- Interacción funciona

---

### Auth Flow E2E

#### TEST-E2E-AUTH-001: Registro de usuario completo
**Flujo:**
1. Navegar a `/register`
2. Llenar formulario con datos válidos
3. Submit
4. Verificar redirección o mensaje de éxito
5. Verificar usuario puede hacer login

**Acceptance:**
- Formulario funciona
- Registro exitoso
- Usuario puede hacer login después

#### TEST-E2E-AUTH-002: Login completo
**Flujo:**
1. Navegar a `/login`
2. Ingresar credenciales válidas
3. Submit
4. Verificar redirección a dashboard
5. Verificar usuario autenticado (navbar muestra logout)

**Acceptance:**
- Login exitoso
- Redirección correcta
- Estado de autenticación correcto

#### TEST-E2E-AUTH-003: Logout
**Flujo:**
1. Login como usuario
2. Click en "Cerrar Sesión"
3. Verificar redirección a home
4. Verificar usuario no autenticado

**Acceptance:**
- Logout funciona
- Token eliminado
- Usuario desautenticado

---

### Events Flow E2E

#### TEST-E2E-EVENTS-001: Crear evento completo
**Flujo:**
1. Login como organizador
2. Navegar a dashboard
3. Click "Crear Evento"
4. Llenar formulario completo
5. Submit
6. Verificar evento aparece en listado
7. Verificar evento aparece en calendario público

**Acceptance:**
- Formulario funciona
- Evento se crea
- Aparece en listado y calendario
- Datos correctos

#### TEST-E2E-EVENTS-002: Editar evento
**Flujo:**
1. Login como organizador
2. Crear evento
3. Editar evento desde dashboard
4. Cambiar título y descripción
5. Guardar
6. Verificar cambios reflejados

**Acceptance:**
- Edición funciona
- Cambios se guardan
- Se reflejan en UI

#### TEST-E2E-EVENTS-003: Eliminar evento
**Flujo:**
1. Login como organizador
2. Crear evento
3. Eliminar evento desde dashboard
4. Confirmar eliminación
5. Verificar evento desaparece de listado

**Acceptance:**
- Eliminación funciona
- Confirmación requerida
- Evento eliminado correctamente

---

## Test Data y Fixtures

### Usuarios de Prueba

```javascript
const testUsers = {
  regular: {
    email: 'user@test.com',
    password: 'password123',
    role: 'user'
  },
  organizer: {
    email: 'organizer@test.com',
    password: 'password123',
    role: 'organizador'
  },
  admin: {
    email: 'admin@test.com',
    password: 'password123',
    role: 'administrador'
  }
};
```

### Eventos de Prueba

```javascript
const testEvent = {
  date: '2025-12-31T10:00:00Z',
  title: 'Evento de Prueba',
  description: 'Descripción de prueba',
  location: 'Barcelona',
  level: 'base',
  type: 'interior'
};
```

---

## Configuración de Tests

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'utils/**/*.js',
    'pages/api/**/*.js',
    'middlewares/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

### Setup File

```javascript
// tests/setup.js
// Configurar variables de entorno de test
process.env.JWT_SECRET = 'test-secret';
process.env.NODE_ENV = 'test';

// Setup de BD de test (SQLite en memoria)
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npm run test:e2e
```

---

## Checklist de Implementación

### Fase 1 (MVP)

- [ ] Configurar Jest y herramientas de testing
- [ ] Tests unitarios para auth utils
- [ ] Tests unitarios para API events básicos
- [ ] Tests de integración para auth flow
- [ ] Tests de integración para protected routes
- [ ] E2E smoke tests para páginas públicas
- [ ] E2E tests para login/register flow
- [ ] E2E tests para crear/editar evento flow

### Fase 2+

- [ ] Tests para nuevas funcionalidades según se implementen
- [ ] Aumentar cobertura a 80%+
- [ ] Tests de performance
- [ ] Tests de accesibilidad

---

## Métricas de Cobertura

### Objetivos

- **Código crítico (auth, API):** 80%+
- **Utilidades:** 70%+
- **Componentes UI:** 60%+
- **Global:** 70%+

### Herramientas

- **Jest coverage** - Cobertura de código
- **Coverage reports** - Visualización de cobertura

---

**Última actualización:** Enero 2025
