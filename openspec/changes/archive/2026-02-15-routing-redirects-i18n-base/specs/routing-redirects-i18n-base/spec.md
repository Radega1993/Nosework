# routing-redirects-i18n-base – Specification

Cubre TASK-F1-020. Entregable: redirects 301 + decisión clara sobre prefijo /es (obligatorio o no).

---

## ADDED Requirements

### Requirement: Redirects 301 configurados

El proyecto SHALL configurar redirects HTTP 301 (permanentes) para normalizar URLs según la decisión de convención (con o sin prefijo /es). Las rutas afectadas SHALL incluir al menos las páginas principales: inicio, about, events/eventos, que-es-nosework-trial, reglamento, como-empezar, contact.

#### Scenario: Redirects en next.config

- **WHEN** se despliega la aplicación
- **THEN** los redirects están definidos en `next.config.mjs` (o equivalente) con `permanent: true` (301)
- **AND** las rutas origen y destino son coherentes con la decisión documentada (prefijo /es obligatorio u opcional)

#### Scenario: Rutas legacy o duplicadas

- **WHEN** existe una ruta "legacy" o alternativa (p. ej. /events vs /eventos, o /que-es-nosework-trial sin prefijo)
- **THEN** hay un redirect 301 desde la ruta no canónica hacia la canónica, según la decisión adoptada

---

### Requirement: Decisión sobre prefijo /es documentada

El proyecto SHALL documentar de forma explícita si las URLs canónicas en español usan prefijo /es o no.

#### Scenario: Decisión registrada

- **WHEN** un desarrollador consulta la documentación del cambio (design o README)
- **THEN** encuentra una decisión clara: "Prefijo /es obligatorio" (todas las URLs canónicas son /es/...) o "Prefijo /es opcional" (URLs canónicas sin prefijo; /es/* son alias por rewrites)
- **AND** los redirects y rewrites existentes son coherentes con esa decisión

#### Scenario: Coherencia canonical y sitemap

- **WHEN** las páginas y el sitemap exponen URLs canónicas
- **THEN** usan la misma convención que la decisión documentada (con o sin /es)
