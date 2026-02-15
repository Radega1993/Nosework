# Proposal: content-what-is-nosework-trial

## Why

La página "Qué es Nosework Trial" (/que-es-nosework-trial) debe cumplir US-001 y REQ-F-005..009 (TASK-F1-012): historia de la disciplina, beneficios para perro y guía, estructura del deporte (Base y Avanzado), diferencias con otras modalidades, y opcionalmente imágenes/vídeos. La página ya existe con contenido amplio; este cambio asegura que está completa, alineada a la normativa actual, con SEO optimizado y enlaces internos claros (reglamento, cómo empezar, eventos).

## What Changes

- Revisar y completar el contenido de `pages/que-es-nosework-trial.js` para cubrir de forma explícita REQ-F-005..008 (historia, beneficios, estructura, diferencias con FEPDE, AKC Scent Work, NACSW, nosework clásico).
- Asegurar una sola H1, jerarquía H2/H3 y SEO (meta title, description, canonical, Schema.org si aplica).
- Revisar o añadir enlaces internos a /reglamento, /como-empezar y /events (o equivalentes con prefijo según routing).
- REQ-F-009 (imágenes/vídeos) es P1 F2: incluir si hay assets disponibles o dejar preparado; en caso contrario documentar como opcional.

## Capabilities

### New Capabilities

- (ninguna nueva: la spec `que-es-nosework-trial-page` ya existe en openspec/specs/)

### Modified Capabilities

- `que-es-nosework-trial-page`: Ajustes de contenido y requisitos para completar US-001, REQ-F-005..009 y TASK-F1-012 (página completa, SEO, enlaces internos). Se creará delta spec en el cambio.

## Impact

- **Código:** `pages/que-es-nosework-trial.js` (contenido, enlaces, SEO).
- **Assets:** Opcional: imágenes o vídeos en `public/` si se añaden (REQ-F-009).
