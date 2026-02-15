# About Page – Specification

Página "Sobre la asociación". Cubre REQ-F-029..032, TASK-F1-015. Entregable: About que inspire, credibilidad y "no somos FEPDE".

---

## Requirements

### Requirement: Quiénes son (equipo promotor, fundadores)

La página SHALL explicar quiénes son: equipo promotor, fundadores o personas detrás de Nosework Trial (REQ-F-029), con tono que inspire confianza y credibilidad.

#### Scenario: Sección quiénes somos visible

- **WHEN** el usuario visita /about
- **THEN** existe una sección identificable (p. ej. "Quiénes somos", "El equipo") que describe quién impulsa la modalidad o la asociación

#### Scenario: Credibilidad e inspiración

- **WHEN** el usuario lee la sección de quiénes son
- **THEN** el texto transmite credibilidad y un tono inspirador (no genérico ni vacío)

---

### Requirement: Visión, misión y valores

La página SHALL incluir visión, misión y valores (REQ-F-030).

#### Scenario: Visión, misión y valores presentes

- **WHEN** el usuario visita /about
- **THEN** se muestran de forma explícita al menos: visión, misión y valores (pueden ser secciones separadas o agrupadas)

---

### Requirement: Historia y contexto (origen, FEPDE, nosework)

La página SHALL incluir la historia: por qué nace la modalidad y contexto respecto a FEPDE, nosework, etc. (REQ-F-031). SHALL dejar claro que Nosework Trial es independiente de FEPDE ("no somos FEPDE").

#### Scenario: Historia visible

- **WHEN** el usuario visita /about
- **THEN** existe una sección de historia o origen que explica por qué nace la modalidad y su contexto

#### Scenario: Independencia de FEPDE

- **WHEN** el usuario lee el contenido sobre FEPDE o el contexto del deporte
- **THEN** queda claro que Nosework Trial no es FEPDE ni está bajo FEPDE (comunidad/entidad independiente)

---

### Requirement: Enlaces a estatutos o documentos legales

La página SHALL incluir enlaces a estatutos o documentos legales si existen (REQ-F-032, P1). Si no existen, puede mostrarse un mensaje tipo "disponibles próximamente" o omitirse hasta que existan.

#### Scenario: Enlaces legales si existen

- **WHEN** existen estatutos o documentos legales publicados
- **THEN** la página About incluye enlaces a ellos (p. ej. en pie de página de la sección o bloque dedicado)

#### Scenario: Sin documentos legales

- **WHEN** no existen aún estatutos/documentos públicos
- **THEN** la página puede incluir texto tipo "Documentos legales disponibles próximamente" o no mostrar bloque de enlaces legales
