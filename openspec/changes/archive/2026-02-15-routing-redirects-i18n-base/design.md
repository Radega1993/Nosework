# Design: routing-redirects-i18n-base

## Context

En `next.config.mjs` ya hay redirects 301 (p. ej. /events → /es/eventos, /que-es-nosework-trial → /es/que-es-nosework-trial) y rewrites que hacen /es/* y /ca/* servir el mismo contenido que las rutas sin prefijo (/, /about, /events, etc.). TASK-F1-020 pide decisión clara: ¿prefijo /es obligatorio o no?

## Goals / Non-Goals

**Goals:** Documentar si las URLs canónicas llevan prefijo /es o no. Asegurar redirects 301 coherentes. No romper rewrites.

**Non-Goals:** Selector de idioma en UI, detección por navegador, nuevos idiomas.

## Decisions

### Decisión: Prefijo /es obligatorio para español

Se adopta **prefijo /es obligatorio**: las URLs canónicas en español son /es/... Las rutas sin prefijo (/, /about, /events, /reglamento, /que-es-nosework-trial, etc.) redirigen 301 a /es/... para una sola convención. Canonical y sitemap deben usar /es/... cuando corresponda. Los redirects actuales (events → /es/eventos, que-es-nosework-trial → /es/que-es-nosework-trial) van en esa línea; faltan redirects para about, reglamento, como-empezar, contact y demás páginas principales.

### Redirects a añadir

Añadir en next.config.mjs redirects 301 desde ruta sin prefijo a /es/... para: /about → /es/about, /reglamento → /es/reglamento, /como-empezar → /es/como-empezar, /contact → /es/contact, /normativas → /es/normativas, /community → /es/community, /join → /es/join. /events ya redirige a /es/eventos; comprobar si la ruta real es /events o /eventos y que el destino sea coherente (rewrites actuales tienen /es/eventos → /events, luego la página real es /events; el destino del redirect puede ser /es/eventos y el rewrite lo sirve desde /events). Mantener esa coherencia.

### Canonical y sitemap

Revisar que las páginas que usan SEOHead tengan canonical con prefijo /es (p. ej. /es/que-es-nosework-trial) si la decisión es /es obligatorio. Revisar sitemap para que genere URLs con /es/... para las páginas en español.

## Risks / Trade-offs

Si más adelante se cambia a canónicas sin prefijo, habrá que invertir redirects y actualizar canonical/sitemap.

## Migration Plan

Actualizar next.config.mjs con los redirects. Opcionalmente actualizar canonical en cada página y sitemap en este cambio o en uno posterior. Despliegue estándar.

## Decisión registrada (TASK-F1-020)

**URLs canónicas en español: con prefijo /es.** Las rutas sin prefijo (/, /about, /events, /reglamento, etc.) redirigen 301 a /es/... para una sola convención. Sitemap y canonical pueden seguir usando rutas sin prefijo hasta una pasada posterior; el usuario que accede sin prefijo es redirigido a /es/... por el servidor.
