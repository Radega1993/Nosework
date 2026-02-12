## Why

El sitio actualmente tiene implementación SEO parcial: algunas páginas tienen meta tags y Schema.org básico (homepage tiene SportsOrganization, eventos tienen SportsEvent), pero faltan elementos fundamentales como sitemap.xml, robots.txt, y meta tags consistentes en todas las páginas públicas. Sin una base SEO sólida y consistente, el sitio no puede ser indexado eficientemente por los motores de búsqueda, lo que limita su visibilidad orgánica y capacidad de atraer nuevos usuarios interesados en Nosework Trial. Esta base SEO es crítica para cumplir con el objetivo de ser la referencia en español para "nosework deportivo" y "deporte olfato canino".

## What Changes

- **Crear sitemap.xml dinámico**:
  - Generar sitemap principal con páginas estáticas
  - Generar sitemap de eventos dinámicamente desde base de datos
  - Incluir prioridades y frecuencias de actualización
  - Soportar múltiples sitemaps (sitemap-index)

- **Crear robots.txt**:
  - Permitir crawling de páginas públicas
  - Bloquear rutas privadas (/dashboard, /api, /admin)
  - Referenciar sitemaps

- **Estandarizar meta tags en todas las páginas públicas**:
  - Asegurar que todas las páginas tengan title, description, Open Graph tags
  - Crear componente o utilidad reutilizable para meta tags
  - Aplicar meta tags según templates del seo_plan.md

- **Implementar Schema.org BreadcrumbList**:
  - Añadir breadcrumbs con schema en páginas con profundidad > 1
  - Integrar con breadcrumbs visuales existentes

- **Estandarizar canonical URLs**:
  - Asegurar canonical en todas las páginas
  - Manejar URLs con/sin trailing slash consistentemente

- **Mejorar Schema.org SportsOrganization**:
  - Completar campos faltantes (logo, contactPoint, sameAs)
  - Asegurar que esté presente en todas las páginas principales

## Capabilities

### New Capabilities
- `sitemap-generation`: Generación dinámica de sitemap.xml con páginas estáticas y eventos dinámicos
- `robots-txt`: Configuración de robots.txt para controlar crawling
- `seo-meta-tags`: Sistema consistente de meta tags para todas las páginas públicas
- `schema-breadcrumbs`: Implementación de Schema.org BreadcrumbList para navegación estructurada

### Modified Capabilities
- `homepage-hero`: Mejorar Schema.org SportsOrganization con campos completos
- `event-detail-page`: Asegurar canonical URL y breadcrumbs schema consistentes
- `events-list-page`: Asegurar canonical URL y meta tags consistentes

## Impact

**Código afectado:**
- `pages/sitemap.xml.js` - Crear generador dinámico de sitemap
- `public/robots.txt` - Crear archivo robots.txt
- `pages/_app.js` o componente SEO - Crear sistema de meta tags reutilizable
- Todas las páginas públicas - Añadir/actualizar meta tags según templates
- Páginas con breadcrumbs - Añadir Schema.org BreadcrumbList

**Dependencias:**
- Posiblemente `next-sitemap` o implementación propia de sitemap
- No se requieren nuevas dependencias para robots.txt o meta tags

**Sistemas afectados:**
- SEO: Mejora significativa en indexabilidad y estructura de datos
- Performance: Sitemap dinámico requiere acceso a base de datos
- Mantenibilidad: Sistema centralizado de meta tags facilita mantenimiento
