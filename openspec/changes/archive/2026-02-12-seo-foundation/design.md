## Context

El sitio actualmente tiene implementación SEO parcial e inconsistente:
- Algunas páginas tienen meta tags completos (index.js, events/[id].js), otras tienen meta tags básicos o incompletos
- Schema.org SportsOrganization está presente en homepage pero incompleto (falta logo, contactPoint, sameAs)
- Schema.org SportsEvent está implementado en eventos pero puede mejorarse
- Breadcrumbs están implementados inline en events/[id].js sin Schema.org BreadcrumbList
- No existe sitemap.xml ni robots.txt
- Canonical URLs están presentes en algunas páginas pero no estandarizados
- No hay componente reutilizable para meta tags, lo que dificulta mantenimiento y consistencia

**Stack técnico:** Next.js 15.1.6 (Pages Router), React 19, SQLite con better-sqlite3. El proyecto usa `next/head` para meta tags y no tiene dependencias adicionales para SEO.

**Restricciones:**
- Mantener compatibilidad con Pages Router (no App Router)
- No añadir dependencias pesadas innecesarias
- Performance: sitemap dinámico debe ser eficiente (posiblemente cacheable)
- URLs actuales no tienen prefijo de idioma `/es/` (i18n futuro)

## Goals / Non-Goals

**Goals:**
- Establecer base SEO sólida y consistente en todas las páginas públicas
- Crear sistema reutilizable de meta tags para facilitar mantenimiento
- Implementar sitemap.xml dinámico que incluya páginas estáticas y eventos
- Configurar robots.txt para controlar crawling
- Añadir Schema.org BreadcrumbList en páginas con profundidad > 1
- Estandarizar canonical URLs en todas las páginas
- Mejorar Schema.org SportsOrganization con campos completos

**Non-Goals:**
- Implementar hreflang tags (se hará cuando se implemente i18n completo)
- Generar sitemaps para blog/clubs (aún no existen estas páginas)
- Implementar redirecciones legacy (se hará en cambio separado)
- Optimización avanzada de imágenes para SEO (ya cubierto en otros cambios)
- Implementar structured data para páginas que aún no existen (blog, clubs)

## Decisions

### 1. Componente SEO Reutilizable vs. Utilidad de Meta Tags

**Decisión:** Crear componente `SEOHead` reutilizable que encapsule toda la lógica de meta tags y Schema.org.

**Alternativas consideradas:**
- **Utilidad que retorne objeto de meta tags:** Más flexible pero requiere duplicar `<Head>` en cada página
- **HOC (Higher Order Component):** Más complejo, no necesario para este caso
- **Hook personalizado:** Útil pero no cubre Schema.org que necesita estar en `<head>`

**Rationale:** Un componente `<SEOHead>` permite pasar props (title, description, ogImage, etc.) y centralizar toda la lógica de meta tags, Open Graph, Twitter Cards, canonical, y Schema.org. Esto facilita mantenimiento y asegura consistencia. El componente puede aceptar opciones avanzadas (schema personalizado, breadcrumbs) cuando sea necesario.

**Implementación:**
```javascript
// components/SEOHead.js
<SEOHead
  title="Page Title"
  description="Page description"
  canonical="/page-path"
  ogImage="/images/og-image.jpg"
  schema={customSchema}
  breadcrumbs={breadcrumbItems}
/>
```

### 2. Sitemap Dinámico: Next.js Pages Router vs. next-sitemap

**Decisión:** Implementar sitemap dinámico usando Next.js Pages Router (`pages/sitemap.xml.js`) sin dependencias externas.

**Alternativas consideradas:**
- **next-sitemap:** Librería popular pero añade dependencia y complejidad innecesaria para MVP
- **Sitemap estático en public/:** No permite incluir eventos dinámicos
- **API Route que genera XML:** Funciona pero Next.js tiene soporte nativo mejor

**Rationale:** Next.js Pages Router permite crear `pages/sitemap.xml.js` que se ejecuta en cada request y puede acceder a la base de datos para incluir eventos dinámicos. Para páginas estáticas, podemos usar un array de configuración. Esto evita dependencias externas y aprovecha las capacidades nativas de Next.js.

**Estructura:**
- `pages/sitemap.xml.js` - Sitemap principal (sitemap-index) que referencia sitemaps secundarios
- `pages/sitemap-events.xml.js` - Sitemap de eventos dinámico desde BD
- Futuro: `pages/sitemap-blog.xml.js`, `pages/sitemap-clubs.xml.js` cuando existan

**Performance:** El sitemap se genera en cada request. Para producción, considerar cacheo (ISR con revalidate) o generación estática en build time si los eventos no cambian frecuentemente.

### 3. Robots.txt: Estático vs. Dinámico

**Decisión:** Crear `public/robots.txt` estático.

**Alternativas consideradas:**
- **API Route `/api/robots.txt`:** Permite lógica dinámica pero no es necesario para este caso
- **Middleware de Next.js:** Más complejo, robots.txt estático es suficiente

**Rationale:** Robots.txt no necesita ser dinámico para este proyecto. Las reglas son simples: permitir páginas públicas, bloquear rutas privadas, referenciar sitemaps. Un archivo estático en `public/robots.txt` es la solución más simple y eficiente.

### 4. Breadcrumbs: Componente Reutilizable vs. Inline

**Decisión:** Crear componente `Breadcrumbs` reutilizable que incluya Schema.org BreadcrumbList automáticamente.

**Alternativas consideradas:**
- **Mantener breadcrumbs inline:** Duplica código y dificulta mantenimiento
- **Utilidad que genera Schema.org:** Útil pero requiere duplicar HTML visual

**Rationale:** Un componente `<Breadcrumbs items={[...]} />` puede renderizar tanto el HTML visual (nav con ol) como el Schema.org JSON-LD en el mismo lugar. Esto asegura que breadcrumbs visuales y schema siempre estén sincronizados.

**Implementación:**
```javascript
// components/Breadcrumbs.js
<Breadcrumbs
  items={[
    { label: "Inicio", href: "/" },
    { label: "Eventos", href: "/events" },
    { label: event.title, href: `/events/${id}` }
  ]}
/>
```

### 5. Schema.org SportsOrganization: Mejorar Existente vs. Componente Global

**Decisión:** Mejorar el Schema.org SportsOrganization existente en `index.js` y crear utilidad para incluirlo en otras páginas principales cuando sea necesario.

**Alternativas consideradas:**
- **Componente global que siempre lo incluye:** Puede ser redundante en páginas que no lo necesitan
- **Hook que lo añade automáticamente:** Más complejo de lo necesario

**Rationale:** SportsOrganization debe estar principalmente en homepage y páginas principales. Mejorar el existente en `index.js` y crear una utilidad `getSportsOrganizationSchema()` permite reutilizarlo donde sea necesario sin sobrecargar todas las páginas.

### 6. Canonical URLs: Utilidad Centralizada vs. Manual

**Decisión:** Crear utilidad `getCanonicalUrl(path)` que genere URLs canónicas consistentes y usarla en `SEOHead`.

**Alternativas consideradas:**
- **Hardcodear en cada página:** Propenso a errores e inconsistencias
- **Middleware que añade automáticamente:** Más complejo, puede interferir con otras lógicas

**Rationale:** Una utilidad centralizada asegura formato consistente (con/sin trailing slash, dominio base, etc.) y facilita futuras migraciones (p.ej., añadir prefijo `/es/` cuando se implemente i18n). El componente `SEOHead` puede usar esta utilidad automáticamente.

**Implementación:**
```javascript
// utils/seo.js
export function getCanonicalUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.noseworktrialcommunity.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
```

### 7. Prioridades y Frecuencias en Sitemap

**Decisión:** Usar prioridades y frecuencias según `seo_plan.md`: homepage (1.0, daily), páginas principales (0.9, weekly), eventos (0.7, daily), etc.

**Rationale:** Las prioridades ayudan a los motores de búsqueda a entender qué contenido es más importante. Las frecuencias indican con qué frecuencia se espera que cambie el contenido, ayudando a optimizar el crawling.

## Risks / Trade-offs

### [Risk] Sitemap Dinámico Puede Ser Lento con Muchos Eventos
**Mitigación:** 
- Limitar eventos en sitemap a futuros y recientes (últimos 30 días)
- Considerar paginación de sitemap si hay >50,000 URLs
- Implementar cacheo (ISR con revalidate: 3600) si es necesario

### [Risk] Componente SEOHead Puede Ser Menos Flexible que Meta Tags Inline
**Mitigación:** 
- Diseñar `SEOHead` con props opcionales y soporte para schema personalizado
- Permitir pasar meta tags adicionales si es necesario
- Documentar casos de uso avanzados

### [Risk] Breadcrumbs Requieren Mantenimiento Manual de Items
**Mitigación:** 
- Documentar estructura esperada de items
- Crear ejemplos de uso en diferentes tipos de páginas
- Considerar utilidad helper para generar items automáticamente en el futuro

### [Risk] Canonical URLs Pueden Cambiar con i18n Futuro
**Mitigación:** 
- Usar utilidad centralizada `getCanonicalUrl()` que puede actualizarse fácilmente
- Documentar que cuando se implemente i18n, se añadirá prefijo de idioma
- No hardcodear URLs canónicas en componentes

### [Trade-off] Sitemap Dinámico vs. Estático en Build Time
**Trade-off:** Sitemap dinámico es más flexible pero requiere acceso a BD en cada request. Estático es más rápido pero requiere rebuild cuando cambian eventos.

**Decisión:** Empezar con dinámico (más flexible para MVP). Si performance es problema, migrar a generación estática en build time con revalidación ISR.

## Migration Plan

### Fase 1: Componentes y Utilidades Base
1. Crear `components/SEOHead.js` con soporte completo de meta tags
2. Crear `components/Breadcrumbs.js` con Schema.org
3. Crear `utils/seo.js` con utilidades (getCanonicalUrl, getSportsOrganizationSchema)
4. Actualizar `pages/index.js` para usar `SEOHead` y mejorar SportsOrganization

### Fase 2: Sitemap y Robots.txt
1. Crear `public/robots.txt` con reglas básicas
2. Crear `pages/sitemap.xml.js` (sitemap-index)
3. Crear `pages/sitemap-events.xml.js` con eventos dinámicos
4. Verificar que sitemaps sean accesibles y válidos

### Fase 3: Migrar Páginas Existentes
1. Migrar `pages/events.js` a usar `SEOHead`
2. Migrar `pages/events/[id].js` a usar `SEOHead` y `Breadcrumbs`
3. Migrar páginas públicas restantes (about, contact, que-es-nosework-trial, etc.) a usar `SEOHead`
4. Añadir breadcrumbs donde corresponda (páginas con profundidad > 1)

### Fase 4: Verificación y Testing
1. Verificar que todos los meta tags estén presentes con herramientas (Google Rich Results Test, Open Graph Debugger)
2. Validar sitemaps con Google Search Console
3. Verificar robots.txt con Google Search Console
4. Ejecutar tests de Lighthouse para SEO score
5. Verificar Schema.org con Google Rich Results Test

### Rollback Strategy
- Si hay problemas con `SEOHead`, se puede revertir a `Head` inline manteniendo los cambios de sitemap/robots.txt
- Si sitemap dinámico causa problemas de performance, puede generarse estáticamente en build time
- Robots.txt es independiente y puede revertirse fácilmente

## Open Questions

1. **¿Incluir eventos pasados en sitemap?** → Decisión: Solo eventos futuros y recientes (últimos 30 días) para mantener sitemap relevante
2. **¿Cachear sitemap o generar en cada request?** → Decisión inicial: Generar en cada request. Si hay problemas de performance, implementar ISR con revalidate
3. **¿Qué hacer con páginas que aún no existen (blog, clubs) en sitemap?** → Decisión: No incluirlas hasta que existan. El sitemap puede expandirse fácilmente cuando se añadan estas páginas
4. **¿Prefijo de idioma `/es/` en canonical URLs ahora o esperar a i18n?** → Decisión: No incluir prefijo ahora. Cuando se implemente i18n, actualizar `getCanonicalUrl()` para incluir prefijo automáticamente
