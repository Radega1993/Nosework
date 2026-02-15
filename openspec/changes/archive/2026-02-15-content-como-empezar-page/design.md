# Design: content-como-empezar-page

## Context

La página `/como-empezar` ya existe (`pages/como-empezar.js`) con layout del design system: hero, secciones (introducción, pasos 1–5, requisitos, material, cómo encontrar club, FAQ, CTA). Enlaces actuales: /que-es-nosework-trial, /clubs, #material, /events. La ruta /clubs puede no existir aún; el entregable pide enlaces a eventos (existentes) y (futuro) clubs. Este cambio alinea el contenido con REQ-F-024..028 y asegura el claim "Soy guía nuevo, ¿qué hago?", requisitos orientativos con nota de dependencia por evento, material, club/entrenador y FAQ.

## Goals / Non-Goals

**Goals:**

- Contenido alineado con REQ-F-024..028: guía paso a paso con claim "Soy guía nuevo, ¿qué hago?", requisitos mínimos (edad, vacunas, comportamiento) con nota "según evento", material básico, cómo encontrar club/entrenador, FAQ.
- Enlaces a /events y a /clubs (o placeholder "próximamente" si no hay página de clubs).
- Una H1, jerarquía H2/H3 coherente, accesibilidad del índice/anclas si se añade.

**Non-Goals:**

- Implementar la página /clubs en este cambio (solo enlace o placeholder).
- CMS o edición del contenido desde panel de administración.

## Decisions

1. **Contenido en el mismo componente**  
   Mantener todo en `pages/como-empezar.js`. Ajustar títulos y textos para que la guía se presente explícitamente como "Soy guía nuevo, ¿qué hago?" (p. ej. en el H2 de la sección de pasos o en la intro).

2. **Requisitos mínimos**  
   Mantener listas actuales (perro: edad, vacunas, salud, comportamiento; guía: edad, conocimiento reglamento, etc.) y añadir una frase tipo "Los requisitos exactos pueden depender de cada evento; consulta la convocatoria."

3. **Enlace a clubs**  
   Si existe ruta /clubs, usar enlace directo. Si no existe, enlazar a /clubs igualmente y que la página muestre "Próximamente" o redirigir cuando se implemente; o usar un CTA que diga "Listado de clubs (próximamente)" sin enlace. Decisión de implementación: preferir enlace a /clubs y página placeholder si hace falta.

4. **FAQ**  
   La página ya tiene sección FAQ; verificar que esté claramente titulada (p. ej. "Preguntas frecuentes") y que tenga al menos varias preguntas relevantes.

5. **Referencia a "Grado 1"**  
   Alinear con reglamento: usar "nivel Base" en lugar de "Grado 1" donde se mencione la primera participación (consistencia con content-reglamento-page).

## Risks / Trade-offs

- **Enlace a /clubs roto** si la página no existe → Mitigación: crear página placeholder /clubs con mensaje "Próximamente" o implementar listado en otro cambio.

## Migration Plan

Solo cambios de contenido y enlaces en `como-empezar.js`. Sin migración de datos. Despliegue estándar.

## Open Questions

- Confirmar si /clubs existe o se crea página placeholder en este cambio.
