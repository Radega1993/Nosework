# Design: content-what-is-nosework-trial

## Context

La página `/que-es-nosework-trial` ya existe con diseño del design system, SEOHead, Schema.org Article, y secciones: introducción, historia (NTC), beneficios (perro y guía), estructura (niveles Base/Avanzado, olores, evaluación, inclusividad, reconocimientos), diferencias con otras modalidades (FEPDE, nosework clásico, AKC/NACSW, características NTC) y CTA con enlaces a "Guía para Principiantes" (como-empezar) y "Ver Reglamento" (reglamento). Usa `useLocalizedLink` para hrefs. Falta enlace explícito a eventos en el CTA. El contenido ya cubre REQ-F-005..008; este cambio asegura completitud, SEO y añade enlace a eventos.

## Goals / Non-Goals

**Goals:**

- Verificar y, si hace falta, retocar contenido para REQ-F-005..008 (historia, beneficios, estructura, diferencias).
- Mantener o mejorar SEO (title, description, canonical, Schema.org).
- Añadir enlace interno a eventos (p. ej. en el bloque CTA) además de como-empezar y reglamento.
- Una H1, jerarquía H2/H3 coherente.

**Non-Goals:**

- REQ-F-009 (imágenes/vídeos): opcional; si no hay assets, no bloquear este cambio.
- Cambiar routing o i18n (es otro cambio).

## Decisions

1. **Contenido en el mismo componente**  
   Todo en `pages/que-es-nosework-trial.js`. Sin CMS.

2. **Enlace a eventos**  
   Añadir un tercer botón o enlace en la sección CTA hacia /events (o localizedHref("/events")): "Ver eventos" o "Calendario de eventos".

3. **Canonical y prefijos**  
   Mantener canonical según la decisión de routing (sin prefijo o con /es según TASK-F1-020). Si el cambio de routing define URLs canónicas con prefijo, actualizar canonical en un mismo despliegue o en el cambio de routing.

4. **Imágenes/vídeos (REQ-F-009)**  
   No obligatorio en este cambio. Si hay imágenes en `public/`, se pueden insertar en una sección; si no, dejar para una iteración posterior.

## Risks / Trade-offs

- Ninguno significativo.

## Migration Plan

Solo cambios en `que-es-nosework-trial.js`. Despliegue estándar.
