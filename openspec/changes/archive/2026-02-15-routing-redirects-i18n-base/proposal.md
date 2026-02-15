# Proposal: routing-redirects-i18n-base

## Why

TASK-F1-020 exige consistencia de URLs: redirecciones legacy y base i18n con prefijo de idioma. El proyecto ya tiene en `next.config.mjs` redirects (p. ej. /events → /es/eventos, /que-es-nosework-trial → /es/que-es-nosework-trial) y rewrites que hacen que /es/* y /ca/* sirvan el mismo contenido que las rutas sin prefijo. Falta documentar la decisión de si el prefijo /es es obligatorio o no (canonical con o sin prefijo) y asegurar que el conjunto de redirects 301 cubre todas las páginas relevantes.

## What Changes

- Documentar la decisión de URL canónica: (A) URLs sin prefijo como canónicas (/, /about, /events, /reglamento, etc.) y /es/* como alias por rewrites, o (B) prefijo /es obligatorio para español y redirects 301 desde rutas sin prefijo hacia /es/...
- Revisar y completar redirects 301 en `next.config.mjs` para todas las rutas que deban ser consistentes (legacy y/o normalización a la opción elegida).
- Asegurar que sitemap, canonical y enlaces internos usan la misma convención que la decisión tomada.
- No implementar detección de idioma por navegador ni cambio de idioma en esta fase; solo base de rutas y redirects.

## Capabilities

### New Capabilities

- `routing-redirects-i18n-base`: Configuración de redirects 301 y decisión explícita sobre uso del prefijo /es (obligatorio u opcional). Incluye documentación en design y tareas de implementación/verificación.

### Modified Capabilities

- (ninguno que cambie requisitos de specs existentes; SEO/sitemap pueden actualizar canonical según la decisión)

## Impact

- **Código:** `next.config.mjs` (redirects), posiblemente `pages/sitemap.xml.js` y meta canonical en páginas si se cambia la convención.
- **Docs:** design.md de este cambio deja registrada la decisión /es obligatorio vs opcional.
