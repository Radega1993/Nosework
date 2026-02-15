# Proposal: content-como-empezar-page

## Why

La página `/como-empezar` debe cumplir US-003 y REQ-F-024..028: guía paso a paso "Soy guía nuevo, ¿qué hago?", requisitos mínimos (edad, vacunas, comportamiento), material básico, cómo encontrar club/entrenador, y FAQ. El entregable incluye enlaces a eventos y (en el futuro) a clubs. La página ya existe con estructura y diseño; este cambio alinea el contenido con la normativa, unifica la guía bajo el claim "Soy guía nuevo, ¿qué hago?", asegura enlaces a /events y prepara el enlace a clubs (ruta futura o placeholder).

## What Changes

- Contenido de la página `/como-empezar` alineado con REQ-F-024..028.
- Guía paso a paso explícitamente titulada o presentada como "Soy guía nuevo, ¿qué hago?" (o equivalente visible).
- Requisitos mínimos: edad del perro, vacunas, comportamiento; indicar que los requisitos exactos pueden depender de cada evento.
- Material básico: arnés, correa, etc., ya presente; revisar y completar si falta algo.
- Sección "Cómo encontrar un club/entrenador" con enlace a listado de clubs (ruta /clubs o placeholder "próximamente" si aún no existe).
- Sección FAQ con preguntas frecuentes (REQ-F-028 P1).
- Enlaces claros a eventos (/events) y a clubs (actual o futuro) desde la guía y el CTA.

## Capabilities

### New Capabilities

- `como-empezar-page`: Página pública `/como-empezar` con guía paso a paso, requisitos mínimos, material básico, cómo encontrar club/entrenador, FAQ y enlaces a eventos y (futuro) clubs.

### Modified Capabilities

- (ninguno)

## Impact

- **Código:** `pages/como-empezar.js` (contenido, títulos, enlaces, posible ruta /clubs o texto "próximamente").
- **Rutas:** Enlace a /events (existente); enlace a /clubs según disponibilidad (página futura o placeholder).
