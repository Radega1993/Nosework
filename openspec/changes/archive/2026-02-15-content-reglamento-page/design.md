# Design: content-reglamento-page

## Context

La página `/reglamento` ya existe (`pages/reglamento.js`) con layout del design system (navy/gold, container-redesign, hero, SEOHead). Tiene bloque de descarga PDF (actualmente apunta a `/documents/normativas_participantes.pdf`), un índice con anclas y secciones (niveles, tipos de búsqueda, puntuación, títulos, código ético). Parte del texto actual usa "Grado 1 / Grado 2" en lugar de "Base" y "Avanzado", y no cubre de forma explícita todos los puntos de REQ-F-018..023. No hay versionado visible (versión + fecha). La fuente de verdad del contenido es la normativa interna (documento de participantes); este cambio alinea el HTML y la oferta de PDF con esa norma y añade versionado básico.

## Goals / Non-Goals

**Goals:**

- Contenido de `reglamento.js` alineado con REQ-F-010..023: niveles Base/Avanzado, tipos de búsqueda, puntuación, código ético, olores, marca mínima, evaluación, comportamiento, sanciones/ayudantes, reconocimientos (sin pódiums).
- Mantener reglamento en HTML por secciones con índice navegable y una sola H1.
- Enlace de descarga al PDF oficial del reglamento (mismo archivo o renombrado coherente).
- Mostrar en la página versionado básico: etiqueta de versión (p. ej. "v1.0") y fecha de la versión.

**Non-Goals:**

- Histórico de versiones con changelog detallado (REQ-F-016 P1; fase posterior).
- CMS o edición del reglamento desde panel de administración.
- Múltiples idiomas del contenido del reglamento en este cambio (i18n de la página ya existe a nivel de rutas).

## Decisions

1. **Contenido en el mismo componente (`pages/reglamento.js`)**  
   El contenido normativo se mantiene en JSX/HTML dentro de la página. No se introduce CMS ni base de datos para el texto del reglamento. Alternativa considerada: MDX o markdown en repo; se descarta por simplicidad y porque el volumen es una sola página.

2. **PDF del reglamento**  
   Usar un único PDF oficial. Si el actual `normativas_participantes.pdf` es el reglamento general, se mantiene la ruta o se expone también como `reglamento-nosework-trial.pdf` (copia o symlink) para claridad. La decisión final (ruta y nombre del archivo) puede quedar en implementación según convención del proyecto (p. ej. `public/documents/reglamento-nosework-trial.pdf`).

3. **Versionado básico**  
   Versión y fecha como constantes en `reglamento.js` (p. ej. `REGLEMENTO_VERSION = 'v1.0'`, `REGLEMENTO_DATE = '2025-02-01'`). Se renderizan en un bloque visible (debajo del hero o junto al enlace del PDF). Sin API ni base de datos; al actualizar el contenido se actualizan las constantes en el mismo commit.

4. **Estructura de secciones e ids**  
   Mantener ids de ancla coherentes con el índice actual (p. ej. `#niveles`, `#tipos-busqueda`, `#puntuacion`, `#codigo-etico`) y añadir/ajustar secciones si hace falta (p. ej. evaluación, sanciones, reconocimientos). Una H1, resto H2/H3 según jerarquía.

5. **Accesibilidad y SEO**  
   Sin cambios de patrón: misma página estática, SEOHead ya en uso. Comprobar que los encabezados y el orden de las secciones sigan siendo correctos para lectores de pantalla y SEO.

## Risks / Trade-offs

- **Contenido y PDF se desincronizan** → Mitigación: documentar en README o en la propia página que la versión mostrada corresponde al PDF indicado; en futuras actualizaciones, actualizar HTML y PDF (y versión/fecha) juntos.
- **Texto largo en un solo componente** → Mitigación: aceptable para una página de contenido; si crece mucho, se puede extraer secciones a componentes o constantes por sección en un siguiente cambio.

## Migration Plan

- No hay migración de datos. Despliegue: sustituir/actualizar `pages/reglamento.js` y, si se cambia la ruta del PDF, colocar el archivo en `public/documents/` y actualizar el enlace. Sin rollback especial más allá de revertir el commit.

## Open Questions

- Confirmar nombre y ruta definitiva del PDF en producción (`normativas_participantes.pdf` vs `reglamento-nosework-trial.pdf`) según criterio del equipo.
