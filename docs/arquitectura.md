# Arquitectura y Stack Técnico

## Stack Tecnológico

### Frontend

#### Next.js 15.1.6
- **Framework:** Next.js con Pages Router
- **Razón:** SSR/SSG, optimización automática, API routes integradas
- **Configuración:** `next.config.mjs` básico (ampliable)

#### React 19.0.0
- **Versión:** React 19 (última versión estable)
- **Patrón:** Componentes funcionales con hooks
- **Estado:** Context API para estado global (AuthContext)

#### Tailwind CSS 3.4.17
- **Framework CSS:** Utility-first
- **Configuración:** `tailwind.config.js`
- **PostCSS:** Configurado en `postcss.config.mjs`

### Backend

#### Next.js API Routes
- **Endpoints:** `/pages/api/*`
- **Ventajas:** Mismo proyecto, sin servidor separado
- **Consideración futura:** Migrar a backend dedicado (NestJS) si escala

#### SQLite (better-sqlite3)
- **Base de datos actual:** SQLite con better-sqlite3
- **Uso:** Desarrollo y MVP
- **Migración futura:** PostgreSQL para producción

#### Autenticación
- **JWT:** jsonwebtoken para tokens
- **Hash:** bcryptjs para contraseñas
- **Almacenamiento:** localStorage (cliente)

### Herramientas de Desarrollo

- **ESLint:** Configurado con Next.js
- **Turbopack:** Habilitado en dev (`--turbopack`)
- **Path Aliases:** `@/*` configurado en `jsconfig.json`

## Arquitectura del Proyecto

### Estructura de Directorios

```
nosework-website/
├── components/              # Componentes React reutilizables
│   ├── Button.js
│   ├── Navbar.js
│   ├── Footer.js
│   ├── PrivateRoute.js
│   └── Event/              # Componentes específicos de eventos
│       ├── EventCard.js
│       ├── EventForm.js
│       └── EventModal.js
│
├── contexts/                # Contextos de React
│   └── AuthContext.js      # Contexto de autenticación
│
├── hooks/                   # Custom hooks
│   ├── useAuth.js
│   └── useEvents.js
│
├── middlewares/             # Middlewares de API
│   └── auth.js              # Autenticación y autorización
│
├── pages/                    # Páginas Next.js (Pages Router)
│   ├── _app.js              # App wrapper
│   ├── index.js             # Home
│   ├── about.js
│   ├── events.js
│   ├── login.js
│   ├── register.js
│   ├── dashboard/           # Área privada
│   │   └── index.js
│   └── api/                 # API Routes
│       ├── auth/
│       │   ├── login.js
│       │   └── register.js
│       ├── events.js
│       └── events/[id].js
│
├── public/                   # Archivos estáticos
│   ├── images/
│   ├── documents/
│   └── ...
│
├── styles/                   # Estilos globales
│   ├── globals.css
│   └── Calendar.css
│
├── utils/                    # Utilidades
│   ├── db.js                # Conexión a BD
│   ├── generateToken.js     # Generación JWT
│   └── api.js               # Helpers de API
│
└── docs/                     # Documentación
```

## Patrones de Diseño

### Autenticación

**Patrón:** JWT con Context API

```javascript
// Flujo de autenticación
1. Usuario hace login → POST /api/auth/login
2. Servidor valida credenciales → Genera JWT
3. Cliente almacena token en localStorage
4. AuthContext decodifica token y mantiene estado
5. Middleware auth.js valida token en requests protegidos
```

**Roles:**
- `user` - Usuario básico
- `organizador` - Puede crear/editar eventos
- `administrador` - Acceso completo

### Gestión de Estado

**Global:** Context API (AuthContext)
**Local:** useState hooks en componentes
**Futuro:** Considerar Redux/Zustand si escala

### API Routes

**Patrón:** RESTful básico

```
GET    /api/events          → Listar eventos
POST   /api/events          → Crear evento (auth)
PUT    /api/events          → Actualizar evento (auth)
DELETE /api/events?id=1     → Eliminar evento (auth)
GET    /api/events/[id]     → Obtener evento específico
```

**Middleware:** 
- `authenticateToken` - Verifica JWT
- `authorizeRoles` - Verifica roles

## Base de Datos

### Esquema Actual

#### Tabla `users`
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,  -- Hash bcrypt
    role TEXT DEFAULT 'user'
)
```

#### Tabla `events`
```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL
)
```

### Esquema Propuesto (Futuro)

Ver [Fases de Desarrollo](./fases-desarrollo.md) para el esquema completo propuesto.

## Seguridad

### Implementado

- ✅ Hash de contraseñas (bcryptjs)
- ✅ JWT para autenticación
- ✅ Middleware de autorización por roles
- ✅ Validación básica de inputs

### Pendiente

- ⚠️ Variables de entorno para secrets
- ⚠️ Rate limiting
- ⚠️ Validación más robusta (Joi/Yup)
- ⚠️ CORS configurado
- ⚠️ Sanitización de inputs
- ⚠️ HTTPS en producción

## Rendimiento

### Optimizaciones Actuales

- Next.js SSR/SSG automático
- Imágenes optimizadas (next/image)
- Code splitting automático

### Mejoras Futuras

- Implementar ISR (Incremental Static Regeneration)
- Cache de API responses
- Lazy loading de componentes
- Optimización de imágenes
- CDN para assets estáticos

## Escalabilidad

### Limitaciones Actuales

1. **SQLite:** No ideal para múltiples escrituras concurrentes
2. **API Routes:** Puede saturarse con mucho tráfico
3. **Estado:** Context API puede ser lento con muchos componentes

### Plan de Escalado

**Fase 1-2:** Mantener arquitectura actual
**Fase 3+:** 
- Migrar a PostgreSQL
- Considerar backend dedicado (NestJS)
- Implementar cache (Redis)
- CDN para assets

## Deployment

### Opciones Recomendadas

1. **Vercel** (Recomendado para Next.js)
   - Deploy automático desde Git
   - SSL incluido
   - Optimizaciones Next.js

2. **Netlify**
   - Similar a Vercel
   - Buen soporte para Jamstack

3. **VPS propio**
   - Más control
   - Requiere configuración manual
   - PostgreSQL + PM2

### Variables de Entorno Necesarias

```env
# Producción
JWT_SECRET=tu_secret_super_seguro
DATABASE_URL=postgresql://...
NODE_ENV=production

# Desarrollo
JWT_SECRET=dev_secret
NODE_ENV=development
```

## Testing (Pendiente)

### Estrategia Propuesta

1. **Unit Tests:** Jest + React Testing Library
2. **Integration Tests:** Tests de API routes
3. **E2E Tests:** Playwright o Cypress
4. **Coverage:** Objetivo 80%+

## Monitoreo y Logging

### Pendiente

- Error tracking (Sentry)
- Analytics (Google Analytics / Plausible)
- Logging estructurado
- Performance monitoring

## Consideraciones Técnicas

### Migración a App Router (Futuro)

Next.js 13+ introduce App Router. Considerar migración cuando:
- Se necesiten Server Components
- Se quiera usar React Server Actions
- Se busque mejor rendimiento

**Por ahora:** Pages Router es suficiente y estable.

### TypeScript (Opcional)

Considerar migración a TypeScript para:
- Mejor autocompletado
- Detección temprana de errores
- Mejor documentación del código

**Decisión:** Evaluar según necesidades del equipo.

---

**Última actualización:** Enero 2025

