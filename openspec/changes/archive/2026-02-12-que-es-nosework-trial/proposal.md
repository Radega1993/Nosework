## Why

La página "Qué es Nosework Trial" (`/que-es-nosework-trial`) existe pero contiene información genérica y placeholder que no refleja las reglas reales del deporte según las normativas participantes. Los visitantes necesitan información precisa y completa sobre la modalidad para entender si les interesa participar. Esta página es crítica (P0 F1) como punto de entrada principal para nuevos usuarios.

## What Changes

- Actualizar el contenido de la página para reflejar las reglas reales del deporte:
  - Niveles correctos: **Base** y **Avanzado** (no "Grado 1, 2, 3...")
  - Olores específicos: Kong + aceite esencial de salvia (en avanzado puede añadirse olor de referencia)
  - Marca mínima: 3 segundos
  - Sistema de evaluación: sistemática, focalización, intensidad (+ impresión general)
  - Coeficientes ajustables por organizador si se anuncia
  - Perros con problemas de comportamiento pueden participar avisando
  - Sin pódiums tradicionales; sí reconocimientos alternativos
- Mejorar la sección de historia para explicar mejor el origen e inspiración
- Ampliar la explicación de beneficios con información más detallada y específica
- Actualizar la estructura del deporte con información precisa sobre niveles, tipos de búsqueda y categorías según el reglamento real
- Refinar las diferencias con otras modalidades para ser más específicas y precisas
- Asegurar que el contenido cumple con los requisitos REQ-F-005 a REQ-F-008 (P0 F1)

## Capabilities

### New Capabilities

- `que-es-nosework-trial-page`: Página informativa completa que explica qué es Nosework Trial, su historia, beneficios, estructura del deporte (niveles Base y Avanzado), y diferencias con otras modalidades. El contenido debe reflejar fielmente las reglas del deporte según las normativas participantes.

### Modified Capabilities

<!-- No se modifican specs existentes, solo se actualiza el contenido de una página -->

## Impact

- **Página existente**: `/pages/que-es-nosework-trial.js` - actualización de contenido
- **SEO**: La página ya tiene meta tags y Schema.org configurados correctamente, solo necesita contenido mejorado
- **Experiencia del usuario**: Los visitantes obtendrán información precisa y completa sobre la modalidad
- **i18n**: La página debe ser compatible con el sistema de i18n existente (rutas con prefijo de idioma `/es/`, `/ca/`, etc.)
- **Dependencias**: Ninguna nueva dependencia requerida
