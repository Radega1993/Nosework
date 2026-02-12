## Context

**Estado actual:**
- El sitio web usa Next.js 15.1.6 con Pages Router (no App Router)
- No existe middleware de Next.js actualmente
- Las URLs actuales no tienen prefijos de idioma (ej: `/events`, `/que-es-nosework-trial`)
- El sistema SEO (`components/SEOHead.js`, `utils/seo.js`) genera canonical URLs sin prefijos de idioma
- El sitemap (`pages/sitemap.xml.js`) genera URLs sin prefijos
- No hay sistema de i18n implementado
- Los requisitos especifican soporte para ES (default), CA, EN, EU, pero inicialmente solo ES y CA

**Restricciones:**
- Next.js Pages Router (no App Router) - el middleware funciona pero con limitaciones
- Mantener compatibilidad con código existente
- No romper URLs existentes sin redirecciones apropiadas
- Las páginas actuales están en `/pages/` sin estructura de carpetas por idioma

**Stakeholders:**
- Usuarios finales que necesitan contenido en su idioma preferido
- SEO: motores de búsqueda que necesitan URLs consistentes y canonical URLs correctas
- Desarrolladores: necesitan sistema mantenible y escalable

## Goals / Non-Goals

**Goals:**
- Implementar sistema de routing con prefijos de idioma (`/es/`, `/ca/`) usando Next.js middleware
- Redirigir URLs legacy a sus equivalentes con prefijo de idioma (ej: `/events` → `/es/eventos`)
- Redirigir URLs sin prefijo a `/es/...` por defecto
- Crear componente selector de idioma funcional
- Detectar idioma preferido del navegador en primera visita
- Actualizar canonical URLs para incluir prefijos de idioma
- Actualizar sitemap para generar URLs con prefijos
- Persistir selección de idioma en cookie/localStorage
- Mantener compatibilidad con código existente (páginas, componentes, APIs)

**Non-Goals:**
- Traducción de contenido (solo estructura de URLs y routing)
- Implementación completa de next-intl o biblioteca i18n pesada (implementación custom ligera)
- Soporte para EN y EU en esta fase (solo ES y CA)
- Cambio de estructura de carpetas de páginas (mantener `/pages/` sin subcarpetas por idioma)
- Migración de contenido existente a diferentes idiomas

## Decisions

### 1. Enfoque de i18n: Middleware custom vs next-intl

**Decisión:** Implementación custom ligera usando Next.js middleware en lugar de next-intl.

**Alternativas consideradas:**
- **next-intl**: Biblioteca completa con muchas características (traducciones, formateo, etc.)
- **next-i18next**: Requiere configuración compleja y estructura de carpetas específica
- **Implementación custom**: Control total, ligera, adecuada para solo routing sin traducciones

**Rationale:**
- Solo necesitamos routing con prefijos, no sistema completo de traducciones
- next-intl añade complejidad y dependencias innecesarias para esta fase
- Implementación custom es más ligera y fácil de mantener
- Podemos migrar a next-intl más adelante si necesitamos traducciones completas

### 2. Estructura de routing: Middleware + Rewrites vs solo Rewrites

**Decisión:** Usar Next.js middleware para manejar prefijos de idioma y redirecciones, combinado con rewrites en `next.config.mjs` para redirecciones legacy.

**Alternativas consideradas:**
- **Solo rewrites en next.config.mjs**: Limitado, no puede acceder a cookies/headers para detección de idioma
- **Solo middleware**: Más flexible pero rewrites son más eficientes para redirecciones simples

**Rationale:**
- Middleware permite detección de idioma del navegador y manejo de cookies
- Rewrites son más eficientes para redirecciones legacy estáticas
- Combinación ofrece mejor rendimiento y flexibilidad

### 3. Persistencia de idioma: Cookie vs localStorage

**Decisión:** Usar cookie `NEXT_LOCALE` (httpOnly: false para acceso desde cliente) como fuente de verdad, con fallback a localStorage para compatibilidad.

**Alternativas consideradas:**
- **Solo localStorage**: No accesible desde middleware/server-side
- **Solo cookie**: Requiere configuración adicional pero accesible desde middleware

**Rationale:**
- Cookie accesible desde middleware para routing server-side
- localStorage como fallback para compatibilidad con código cliente existente
- Cookie httpOnly: false permite acceso desde JavaScript cuando sea necesario

### 4. Manejo de páginas sin prefijo: Redirección 301 vs Rewrite

**Decisión:** Redirección 301 (permanente) para URLs sin prefijo hacia `/es/...` usando middleware.

**Alternativas consideradas:**
- **Rewrite interno**: Más rápido pero no actualiza URL en navegador
- **Redirección 302**: Temporal, menos SEO-friendly

**Rationale:**
- Redirección 301 es SEO-friendly y comunica que el cambio es permanente
- Actualiza URL en navegador para consistencia
- Middleware puede manejar esto eficientemente

### 5. Canonical URLs: Actualizar getCanonicalUrl vs pasar idioma explícitamente

**Decisión:** Actualizar `getCanonicalUrl()` para detectar automáticamente el idioma del contexto (router) y añadir prefijo.

**Alternativas consideradas:**
- **Pasar idioma explícitamente**: Más verboso, requiere cambios en todos los usos
- **Hook useRouter para detectar**: Requiere contexto React, no funciona en server-side

**Rationale:**
- Detección automática reduce cambios en código existente
- Usar `useRouter()` en componentes cliente y contexto en server-side
- Mantiene API existente de `getCanonicalUrl()` compatible

### 6. Sitemap: Generar múltiples URLs por página vs solo español

**Decisión:** Generar URLs solo en español (`/es/...`) en esta fase, preparar estructura para múltiples idiomas cuando haya traducciones.

**Alternativas consideradas:**
- **Generar URLs para todos los idiomas**: No tiene sentido sin contenido traducido
- **Solo español sin prefijo**: Inconsistente con nuevo sistema

**Rationale:**
- Solo hay contenido en español actualmente
- Estructura preparada para añadir más idiomas cuando haya traducciones
- Consistente con sistema de prefijos

## Risks / Trade-offs

**Riesgo: Middleware puede afectar performance**
- **Mitigación:** Middleware solo ejecuta lógica mínima (verificación de cookie, redirección). Usar rewrites para redirecciones estáticas cuando sea posible.

**Riesgo: Redirecciones 301 pueden romper bookmarks y enlaces externos**
- **Mitigación:** Documentar cambios, mantener redirecciones legacy activas indefinidamente. Comunicar cambios a usuarios si es necesario.

**Riesgo: Complejidad añadida al routing puede causar bugs**
- **Mitigación:** Tests exhaustivos de redirecciones y routing. Documentar claramente el flujo. Mantener código simple y bien comentado.

**Trade-off: Implementación custom vs biblioteca**
- **Trade-off:** Más control pero más código propio que mantener
- **Mitigación:** Código bien documentado y estructurado. Plan para migrar a next-intl si crece la complejidad.

**Riesgo: Canonical URLs incorrectas durante transición**
- **Mitigación:** Actualizar todas las páginas que usan SEOHead simultáneamente. Verificar con herramientas SEO después del despliegue.

**Riesgo: Conflicto entre detección automática y selección manual de idioma**
- **Mitigación:** Priorizar cookie de selección manual sobre detección automática. Resetear cookie solo si no existe.

## Migration Plan

### Fase 1: Preparación (Sin cambios en producción)
1. Crear `middleware.js` con lógica básica de detección de idioma
2. Crear `utils/i18n.js` con utilidades de manejo de idioma
3. Crear `components/LanguageSwitcher.js` (sin integrar aún)
4. Actualizar `utils/seo.js` para soportar prefijos de idioma
5. Tests unitarios para utilidades i18n

### Fase 2: Redirecciones Legacy (next.config.mjs)
1. Añadir redirects en `next.config.mjs` para URLs legacy conocidas
2. Verificar que todas las redirecciones funcionan correctamente
3. Tests de redirecciones

### Fase 3: Middleware de Routing
1. Implementar middleware completo con:
   - Detección de idioma del navegador
   - Redirección de URLs sin prefijo a `/es/...`
   - Manejo de cookie de idioma
2. Actualizar todas las páginas para usar prefijos de idioma en links internos
3. Tests de routing con diferentes escenarios

### Fase 4: Actualización SEO
1. Actualizar `getCanonicalUrl()` para incluir prefijos
2. Actualizar todas las páginas que usan `SEOHead` para pasar rutas correctas
3. Actualizar `pages/sitemap.xml.js` para generar URLs con prefijos
4. Verificar canonical URLs con herramientas SEO

### Fase 5: Integración UI
1. Integrar `LanguageSwitcher` en `Navbar`
2. Actualizar todos los links internos para incluir prefijo de idioma
3. Tests E2E de cambio de idioma

### Fase 6: Verificación y Despliegue
1. Verificar todas las redirecciones funcionan
2. Verificar canonical URLs correctas
3. Verificar sitemap correcto
4. Desplegar en staging
5. Verificar con herramientas SEO (Google Search Console)
6. Desplegar en producción

**Rollback Strategy:**
- Si hay problemas críticos, revertir cambios en `next.config.mjs` y `middleware.js`
- Las páginas existentes seguirán funcionando sin prefijos (fallback)
- Documentar cambios para rollback rápido

## Open Questions

1. **¿Debemos mantener URLs sin prefijo funcionando como fallback?**
   - Decisión: No, redirigir siempre a `/es/...` para consistencia SEO

2. **¿Cómo manejar rutas de API (`/api/*`)?**
   - Decisión: APIs no necesitan prefijos de idioma, excluir del middleware

3. **¿Qué hacer con rutas protegidas (`/dashboard/*`)?**
   - Decisión: Mantener sin prefijo de idioma, son rutas privadas sin necesidad de i18n

4. **¿Cómo manejar eventos dinámicos (`/events/[id]`)?**
   - Decisión: Usar rewrites para mapear `/es/eventos/[id]` → `/events/[id]` internamente

5. **¿Debemos generar hreflang tags ahora o esperar a tener traducciones?**
   - Decisión: Preparar estructura pero no generar tags hasta tener contenido traducido
