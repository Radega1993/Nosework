## Why

Actualmente, el sitio web no tiene un sistema de internacionalización (i18n) implementado y carece de redirecciones para URLs legacy. Esto impide:
1. **Soporte multilingüe**: No hay forma de servir contenido en diferentes idiomas (ES, CA, EN, EU) según los requisitos REQ-F-130 a REQ-F-135.
2. **Consistencia de URLs**: URLs legacy como `/events` no redirigen a `/eventos`, causando problemas de SEO y experiencia de usuario.
3. **Canonical URLs con prefijos**: El sistema SEO actual (seo-foundation) espera URLs con prefijos de idioma (`/es/...`), pero estas no están implementadas.

Este cambio establece la base de i18n necesaria para cumplir con los requisitos de Fase 2 y prepara el sitio para contenido multilingüe futuro.

## What Changes

- **Implementar sistema de routing con prefijos de idioma**: URLs con formato `/es/...`, `/ca/...` usando Next.js middleware o rewrites
- **Redirecciones legacy**: Redirigir URLs antiguas a sus equivalentes en español (ej: `/events` → `/eventos`, `/que-es-nosework-trial` → `/es/que-es-nosework-trial`)
- **Redirección por defecto**: Cualquier URL sin prefijo de idioma debe redirigir 301 a `/es/...`
- **Componente selector de idioma**: UI para cambiar entre idiomas disponibles (ES, CA inicialmente)
- **Detección automática de idioma**: Detectar idioma preferido del navegador y redirigir apropiadamente
- **Actualización de canonical URLs**: Asegurar que todas las canonical URLs incluyan el prefijo de idioma correcto
- **Actualización de sitemap**: Generar URLs con prefijos de idioma en el sitemap

## Capabilities

### New Capabilities
- `legacy-redirects`: Sistema de redirecciones 301 para URLs legacy hacia sus equivalentes en español o con prefijo de idioma
- `i18n-routing`: Sistema de routing con prefijos de idioma (`/es/`, `/ca/`) usando Next.js middleware/rewrites
- `language-switcher`: Componente UI para cambiar entre idiomas disponibles, persistencia en cookie/localStorage
- `language-detection`: Detección automática del idioma preferido del navegador y redirección inicial

### Modified Capabilities
- `seo-meta-tags`: Actualizar para generar canonical URLs con prefijos de idioma y añadir hreflang tags cuando haya traducciones disponibles
- `sitemap-generation`: Actualizar para generar URLs con prefijos de idioma en el sitemap dinámico

## Impact

**Código afectado:**
- `next.config.mjs` - Añadir redirects y rewrites para i18n
- `middleware.js` (nuevo) - Middleware de Next.js para manejar prefijos de idioma y redirecciones
- `components/LanguageSwitcher.js` (nuevo) - Componente selector de idioma
- `utils/i18n.js` (nuevo) - Utilidades para manejo de idiomas (detección, persistencia, helpers)
- `components/Navbar.js` - Integrar LanguageSwitcher
- `components/SEOHead.js` o equivalente - Actualizar para generar canonical URLs con prefijos
- `pages/sitemap.xml.js` - Actualizar para incluir prefijos de idioma en URLs

**APIs:**
- No hay cambios en APIs existentes, solo en routing de páginas

**Dependencias:**
- Posible necesidad de `next-intl` o implementación custom con Next.js middleware (evaluar en design)

**SEO:**
- Mejora de canonical URLs con prefijos de idioma
- Preparación para hreflang tags cuando haya traducciones
- Redirecciones 301 correctas para URLs legacy mejoran SEO

**Breaking Changes:**
- **BREAKING**: Todas las URLs sin prefijo de idioma redirigirán a `/es/...`. Esto puede afectar bookmarks y enlaces externos, pero es necesario para consistencia.
