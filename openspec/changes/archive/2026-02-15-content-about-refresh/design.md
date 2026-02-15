# Design: content-about-refresh

## Context

La página `/about` ya existe con diseño del design system (navy hero, container-redesign). Tiene secciones: Misión, Visión, Valores (6 valores), Historia (varios párrafos que mencionan FEPDE, NACSW, SDDA) y una lista estática "Nuestros Clubes". No hay sección explícita "Quiénes somos" / equipo promotor o fundadores. La historia no explicita que Nosework Trial no es FEPDE. No hay enlaces a estatutos/documentos legales. Este cambio refresca el contenido para REQ-F-029..032 y el mensaje "no somos FEPDE".

## Goals / Non-Goals

**Goals:**

- Añadir o reforzar sección "Quiénes somos" (equipo promotor/fundadores) con tono inspirador y creíble.
- Mantener visión, misión y valores; pulir redacción si mejora claridad e inspiración.
- Reescribir o ampliar Historia: origen de la modalidad, contexto FEPDE y nosework, y mensaje claro de que Nosework Trial es una iniciativa/comunidad independiente (no somos FEPDE).
- Incluir enlaces a estatutos/documentos legales si existen, o bloque "Documentos legales (próximamente)".

**Non-Goals:**

- Cambiar estructura visual o componentes del design system.
- Implementar listado dinámico de clubs (la lista actual puede quedarse como está o enlazar a /clubs en otro cambio).

## Decisions

1. **Contenido en el mismo componente**  
   Todo el texto en `pages/about.js`. Sin CMS. Si en el futuro hay estatutos, se enlazarán a archivos en `public/documents/` o URL externa.

2. **Orden de secciones**  
   Propuesta: Hero → Quiénes somos (nuevo o reforzado) → Misión → Visión → Valores → Historia (actualizada con "no somos FEPDE") → [Documentos legales si aplica] → Nuestros Clubes (opcional mantener). El orden exacto puede ajustarse para que "Quiénes somos" y "Historia" refuercen credibilidad al inicio o después de misión/visión.

3. **Mensaje "no somos FEPDE"**  
   Incluir en la sección Historia (o en una subsección/nota) una frase explícita tipo: "Nosework Trial es una iniciativa independiente; no somos FEPDE ni estamos vinculados a FEPDE." Evitar tono negativo; centrarse en identidad propia.

4. **Equipo promotor / fundadores**  
   Si no hay nombres concretos, usar texto genérico pero creíble: "equipo promotor", "personas detrás de la modalidad", "comunidad fundadora", etc. Si el equipo prefiere anonimato o descripción por roles, reflejarlo sin inventar datos.

5. **Documentos legales**  
   Si no hay PDFs de estatutos: añadir bloque "Documentos legales" con texto "Disponibles próximamente" o "En proceso de publicación". Si ya existen, enlazar a `/documents/estatutos.pdf` o similar.

## Risks / Trade-offs

- **Contenido genérico** si no se dispone de datos reales de equipo/fundadores → Mitigación: redacción que transmita credibilidad sin inventar nombres; dejar preparado el bloque para rellenar después.

## Migration Plan

Solo cambios en `pages/about.js`. Sin migración de datos. Despliegue estándar.

## Open Questions

- Confirmar con el equipo si hay nombres o roles que deban figurar en "Quiénes somos" y si ya existen estatutos/documentos legales para enlazar.
