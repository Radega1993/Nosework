## Context

La página actual `/events` muestra solo un calendario básico (`react-calendar`) y eventos cuando se selecciona una fecha. No existe página de detalle de evento (`/events/[id]`). La API `/api/events` devuelve todos los eventos sin filtros ni paginación. El esquema de base de datos actual (`events`) tiene solo campos básicos (`id`, `date`, `title`, `description`), aunque la especificación del proyecto define campos ampliados (`location`, `level`, `type`, `status`, `price`, etc.) que aún no están implementados.

Los visitantes necesitan explorar eventos de forma más intuitiva y acceder a información detallada para decidir participación. Esto es crítico para mejorar UX y aumentar participación.

**Restricciones:**
- Base de datos MVP: SQLite con better-sqlite3
- Frontend: Next.js 15.1.6 (Pages Router), React 19, TailwindCSS 3.4.17
- SEO-first: Requiere Schema.org markup y meta tags optimizados
- Performance: Core Web Vitals priorizado
- Accesibilidad: WCAG 2.1 AA objetivo

## Goals / Non-Goals

**Goals:**
- Mejorar página de listado `/events` con filtros, búsqueda, y múltiples vistas (calendario, lista, grid)
- Crear página de detalle `/events/[id]` con información completa y SEO optimizado
- Mejorar API con soporte para filtros, búsqueda, y paginación
- Crear componentes reutilizables (`EventCard`, `EventFilters`, `EventDetail`, `EventSearch`)
- Mantener o mejorar Core Web Vitals (LCP, TBT, CLS)
- Asegurar WCAG 2.1 AA accesibilidad
- Implementar Schema.org markup (SportsEvent) para SEO

**Non-Goals:**
- Modificar esquema de base de datos (trabajar con campos disponibles actualmente)
- Implementar funcionalidad de inscripción (fuera de alcance)
- Internacionalización (i18n) - solo español por ahora
- Sistema de gestión de imágenes avanzado (usar imágenes estáticas o URLs externas)
- Autenticación/autorización en páginas públicas (solo lectura pública)

## Decisions

### Decision 1: Arquitectura de Componentes
**Decision:** Crear componentes modulares y reutilizables: `EventCard`, `EventFilters`, `EventSearch`, `EventDetail`, y refactorizar `pages/events.js` para usar estos componentes.

**Rationale:**
- Reutilización: `EventCard` puede usarse en homepage (`FeaturedEvents`), listado, y otras páginas
- Mantenibilidad: Cambios en diseño de eventos se hacen en un solo lugar
- Testabilidad: Componentes pequeños son más fáciles de testear
- Consistencia visual: Mismo diseño de tarjetas en toda la aplicación

**Alternatives Considered:**
- Componente monolítico: Rechazado por falta de reutilización
- Inline JSX: Rechazado por dificultad de mantenimiento

### Decision 2: Estrategia de Filtrado y Búsqueda
**Decision:** Implementar filtrado y búsqueda en el cliente (client-side) inicialmente, con opción de migrar a server-side si el volumen de eventos crece significativamente.

**Rationale:**
- Simplicidad: No requiere cambios complejos en API inicialmente
- Performance aceptable: Para < 100 eventos, filtrado cliente es rápido
- Menos carga en servidor: Filtrado cliente reduce queries a BD
- Mejor UX: Filtros instantáneos sin esperar respuesta del servidor

**Alternatives Considered:**
- Server-side filtering desde inicio: Rechazado por complejidad innecesaria para MVP
- Híbrido (filtros simples en cliente, complejos en servidor): Considerado para futuro, no necesario ahora

**Migration Path:** Si eventos superan 100-200, migrar a server-side filtering con query parameters en API.

### Decision 3: Paginación vs Carga Infinita
**Decision:** Implementar paginación tradicional (páginas numeradas) en lugar de carga infinita.

**Rationale:**
- SEO-friendly: URLs con parámetros de página (`?page=2`) son indexables
- Accesibilidad: Navegación por teclado más clara con botones de página
- Control del usuario: Usuarios pueden saltar a página específica
- Simplicidad: Más fácil de implementar y mantener

**Alternatives Considered:**
- Carga infinita (infinite scroll): Rechazado por problemas de SEO y accesibilidad
- "Cargar más" button: Considerado pero paginación tradicional es más estándar

### Decision 4: Vista Múltiple (Calendario, Lista, Grid)
**Decision:** Implementar toggle entre vistas: Calendario (existente), Lista, y Grid. Calendario como vista por defecto en móvil, Grid en desktop.

**Rationale:**
- Flexibilidad: Diferentes usuarios prefieren diferentes vistas
- Calendario existente: Mantener funcionalidad actual que ya funciona
- Grid para exploración visual: Mejor para descubrir eventos
- Lista para información densa: Útil cuando hay muchos eventos

**Alternatives Considered:**
- Solo Grid: Rechazado por perder funcionalidad de calendario existente
- Solo Lista: Rechazado por ser menos visual

### Decision 5: Endpoint de Detalle de Evento
**Decision:** Crear `pages/api/events/[id].js` si no existe, o mejorarlo para incluir información completa (club organizador, información de inscripción, etc.).

**Rationale:**
- Separación de responsabilidades: Endpoint específico para detalle es más eficiente
- SEO: Página de detalle permite meta tags específicos por evento
- Performance: Solo carga datos necesarios para un evento
- Escalabilidad: Fácil añadir más información en el futuro

**Alternatives Considered:**
- Usar mismo endpoint `/api/events` con filtro por ID: Rechazado por menos eficiente y menos semántico

### Decision 6: Estado de Filtros en URL
**Decision:** Sincronizar filtros y búsqueda con query parameters en URL (`?level=base&type=interior&search=...`).

**Rationale:**
- Compartibilidad: URLs con filtros pueden compartirse
- SEO: URLs con parámetros pueden indexarse (con canonical apropiado)
- Navegación: Botones atrás/adelante del navegador funcionan correctamente
- Estado persistente: Filtros se mantienen al recargar página

**Alternatives Considered:**
- Estado solo en React state: Rechazado por perder compartibilidad y estado al recargar
- SessionStorage: Considerado pero URL params es más estándar y SEO-friendly

### Decision 7: Schema.org Markup
**Decision:** Implementar Schema.org `SportsEvent` markup en ambas páginas (listado y detalle) usando JSON-LD.

**Rationale:**
- SEO: Rich snippets en resultados de búsqueda
- Estándar: Schema.org es el estándar reconocido por Google
- JSON-LD: Más fácil de mantener que microdata
- Información estructurada: Ayuda a motores de búsqueda entender contenido

**Alternatives Considered:**
- Microdata: Rechazado por ser más verboso y difícil de mantener
- Sin markup estructurado: Rechazado por perder oportunidades de SEO

### Decision 8: Manejo de Campos Faltantes en BD
**Decision:** Trabajar con campos disponibles actualmente (`id`, `date`, `title`, `description`) y hacer componentes preparados para campos futuros (`location`, `level`, `type`, etc.) usando valores por defecto o condicionales.

**Rationale:**
- MVP primero: No bloquear implementación esperando migración de BD
- Forward-compatible: Componentes funcionan cuando campos se añadan
- Degradación elegante: Mostrar información disponible sin errores

**Alternatives Considered:**
- Esperar migración de BD: Rechazado por bloquear funcionalidad
- Simular campos faltantes: Considerado pero mejor trabajar con datos reales

## Risks / Trade-offs

### Risk 1: Performance con Muchos Eventos
**Risk:** Si hay muchos eventos (> 100), filtrado cliente puede ser lento.

**Mitigation:**
- Implementar paginación desde inicio (limita eventos renderizados)
- Usar `useMemo` para optimizar filtrado
- Considerar virtualización si lista es muy larga
- Plan de migración a server-side filtering si necesario

### Risk 2: Campos de BD Limitados
**Risk:** Esquema actual solo tiene campos básicos, faltan campos importantes (`location`, `level`, `type`).

**Mitigation:**
- Componentes preparados para campos futuros con valores por defecto
- Mostrar información disponible sin errores
- Documentar campos esperados en specs para migración futura

### Risk 3: SEO con Paginación
**Risk:** Múltiples páginas de resultados pueden crear contenido duplicado.

**Mitigation:**
- Usar canonical URLs apropiadas
- Implementar meta robots para páginas > 1 si necesario
- Asegurar contenido único en primera página

### Risk 4: Complejidad de Estado
**Risk:** Manejar múltiples filtros, búsqueda, paginación, y vista puede crear estado complejo.

**Mitigation:**
- Usar `useReducer` o librería de estado si necesario
- Sincronizar con URL params para simplificar estado
- Separar lógica en hooks personalizados (`useEventFilters`, `useEventPagination`)

### Risk 5: Accesibilidad de Filtros
**Risk:** Múltiples filtros pueden ser difíciles de navegar con teclado y screen readers.

**Mitigation:**
- Usar elementos semánticos (`<fieldset>`, `<legend>`)
- Asegurar orden lógico de tabindex
- Añadir ARIA labels apropiados
- Probar con screen readers (NVDA, VoiceOver)

## Migration Plan

### Fase 1: Preparación
1. Crear componentes base (`EventCard`, `EventFilters`, `EventSearch`)
2. Crear hooks personalizados para lógica de filtrado (`useEventFilters`)
3. Mejorar API `/api/events` con soporte para query parameters (opcional, para futuro)

### Fase 2: Página de Listado
1. Refactorizar `pages/events.js` para usar nuevos componentes
2. Implementar toggle de vistas (Calendario, Lista, Grid)
3. Implementar filtros y búsqueda cliente-side
4. Implementar paginación
5. Añadir Schema.org markup para listado
6. Optimizar SEO meta tags

### Fase 3: Página de Detalle
1. Crear `pages/events/[id].js`
2. Crear o mejorar `pages/api/events/[id].js`
3. Crear componente `EventDetail`
4. Implementar Schema.org markup completo para detalle
5. Añadir breadcrumbs y navegación
6. Optimizar SEO meta tags específicos por evento

### Fase 4: Integración y Testing
1. Actualizar `FeaturedEvents` para usar `EventCard`
2. Testing E2E con Playwright
3. Testing de accesibilidad con axe-core
4. Verificar SEO con Lighthouse
5. Testing de performance

### Rollback Strategy
- Mantener backup de `pages/events.js` original
- Feature flag opcional para activar/desactivar nueva implementación
- Deploy gradual si necesario (A/B testing)

## Open Questions

1. **¿Cuántos eventos esperamos tener inicialmente?** → Determina si filtrado cliente es suficiente o necesitamos server-side desde inicio.

2. **¿Qué campos de evento son críticos para mostrar en listado vs detalle?** → Ayuda a priorizar qué información mostrar en cada vista.

3. **¿Necesitamos imágenes de eventos?** → Si sí, necesitamos definir estrategia de almacenamiento (static assets, CDN, uploads).

4. **¿Qué información del club organizador mostrar?** → Determina si necesitamos JOIN con tabla `clubs` o solo mostrar nombre si está en `events.club_id`.

5. **¿Implementar SSR/SSG para páginas de eventos?** → Para mejor SEO y performance, pero añade complejidad. Considerar `getServerSideProps` o `getStaticProps` con ISR.

6. **¿Necesitamos analytics específicos para eventos?** → Tracking de clicks en eventos, filtros usados, etc.
