# Proposal: content-reglamento-page

## Why

La página `/reglamento` debe cumplir US-002 y REQ-F-010..023: ofrecer el reglamento oficial en HTML navegable por secciones, PDF descargable y versionado básico. Actualmente la página existe con estructura y diseño alineados al rediseño UI, pero el contenido y la norma no están alineados con la fuente de verdad (normativas participantes): niveles "Base" y "Avanzado", olores, marca mínima 3 s, evaluación, código ético, sanciones y reconocimientos. Además falta versionado explícito (v1.0 y fecha) para trazabilidad.

## What Changes

- Contenido de la página `/reglamento` alineado con REQ-F-010..023: secciones HTML navegables (niveles Base/Avanzado, tipos de búsqueda, puntuación, código ético y bienestar, sin pódiums / reconocimientos alternativos, olores, marca mínima, evaluación, participación con problemas de comportamiento, sanciones y ayudantes).
- Descarga de reglamento en PDF (mantener o definir asset oficial, p. ej. `reglamento-nosework-trial.pdf`).
- Versionado básico visible en la página: versión (p. ej. "v1.0") y fecha de la versión.
- Índice/anclas actualizados para navegación por secciones; una sola H1, jerarquía H2/H3 coherente.
- Opcional para este cambio: bloque de "histórico de versiones" mínimo (fecha + versión), dejando changelog detallado para una fase posterior (REQ-F-016 es P1).

## Capabilities

### New Capabilities

- `reglamento-page`: Página pública `/reglamento` con reglamento oficial en HTML por secciones navegables, PDF descargable y versionado básico (versión + fecha); contenido alineado con normativa (Base/Avanzado, olores, marca mínima, evaluación, código ético, sanciones, reconocimientos).

### Modified Capabilities

- (ninguno: no se modifican requisitos de otras specs existentes)

## Impact

- **Código:** `pages/reglamento.js` (contenido, secciones, enlace PDF, bloque de versionado).
- **Assets:** PDF del reglamento en `public/` (p. ej. `public/documents/reglamento-nosework-trial.pdf` o reutilizar `normativas_participantes.pdf` si es el documento oficial).
- **Docs/OpenSpec:** Nueva spec `reglamento-page`; tareas en este cambio referencian US-002, REQ-F-010..023, TASK-F1-013.
