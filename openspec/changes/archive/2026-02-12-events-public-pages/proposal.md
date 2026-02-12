## Why

Las páginas públicas de eventos actuales (`/events`) tienen funcionalidad limitada: solo muestran un calendario básico y eventos cuando se selecciona una fecha. No existe una página de detalle de evento (`/events/[id]`) accesible públicamente. Los visitantes necesitan poder explorar eventos de forma más intuitiva (vista de lista/grid, filtros, búsqueda) y acceder a información detallada de cada evento para decidir si participar. Esto es crítico para mejorar la experiencia del usuario y aumentar la participación en eventos.

## What Changes

- **Mejorar página de listado de eventos (`/events`)**:
  - Añadir vista de lista/grid además del calendario
  - Implementar filtros (fecha, nivel, tipo, ubicación, estado)
  - Añadir búsqueda por texto (título, descripción)
  - Implementar paginación o carga infinita
  - Mejorar diseño responsive y accesibilidad
  - Añadir Schema.org markup para SEO (SportsEvent)

- **Crear página de detalle de evento (`/events/[id]`)**:
  - Mostrar información completa del evento (fecha, ubicación, nivel, tipo, descripción extendida)
  - Mostrar información del club organizador
  - Mostrar información de inscripción (fechas, precio, plazas disponibles)
  - Añadir botón CTA para inscripción (si aplica)
  - Implementar breadcrumbs y navegación
  - Añadir Schema.org markup completo (SportsEvent)
  - Optimizar SEO con meta tags específicos por evento

- **Mejorar API de eventos**:
  - Añadir endpoint `GET /api/events/[id]` si no existe o mejorarlo
  - Añadir soporte para filtros y búsqueda en `GET /api/events`
  - Añadir paginación en respuesta de API

- **Componentes reutilizables**:
  - Crear componente `EventCard` para mostrar eventos en listado
  - Crear componente `EventFilters` para filtros
  - Crear componente `EventDetail` para página de detalle
  - Crear componente `EventSearch` para búsqueda

## Capabilities

### New Capabilities
- `events-list-page`: Página pública mejorada de listado de eventos con filtros, búsqueda, y múltiples vistas (calendario, lista, grid)
- `event-detail-page`: Página pública de detalle de evento individual con información completa, SEO optimizado, y Schema.org markup

### Modified Capabilities
- `featured-events-display`: Actualizar para usar el nuevo componente `EventCard` y asegurar consistencia visual con las páginas públicas

## Impact

**Código afectado:**
- `pages/events.js` - Refactorizar completamente para añadir filtros, búsqueda, y vistas múltiples
- `pages/events/[id].js` - Crear nueva página de detalle de evento
- `pages/api/events.js` - Añadir soporte para filtros, búsqueda, y paginación
- `pages/api/events/[id].js` - Mejorar o crear endpoint de detalle de evento
- Nuevos componentes: `components/Event/EventCard.js`, `components/Event/EventFilters.js`, `components/Event/EventDetail.js`, `components/Event/EventSearch.js`

**Dependencias:**
- Posiblemente añadir librería de paginación o implementar propia
- Considerar librería de filtros o implementar propia

**Sistemas afectados:**
- Base de datos: Puede requerir índices adicionales para búsqueda eficiente
- SEO: Nuevas páginas requieren meta tags y Schema.org markup
- Performance: Paginación y filtros requieren optimización de queries
