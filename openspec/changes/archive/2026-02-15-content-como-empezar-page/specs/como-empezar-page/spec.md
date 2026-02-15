# Cómo Empezar Page – Specification

Página pública de guía para nuevos guías. Cubre US-003, REQ-F-024..028, TASK-F1-014.

---

## ADDED Requirements

### Requirement: Guía paso a paso "Soy guía nuevo, ¿qué hago?"

La página SHALL incluir una guía paso a paso presentada como orientación para guías nuevos (REQ-F-024). El título o introducción SHALL reflejar la idea "Soy guía nuevo, ¿qué hago?" de forma visible.

#### Scenario: Guía paso a paso visible

- **WHEN** el usuario visita la página /como-empezar
- **THEN** existe una sección con pasos numerados o secuencia clara que guía al usuario desde el inicio hasta participar en una prueba o encontrar recursos

#### Scenario: Título o claim para guía nuevo

- **WHEN** el usuario lee la página
- **THEN** en la guía o en su encabezado aparece un texto equivalente a "Soy guía nuevo, ¿qué hago?" o "Guía para principiantes / nuevos guías"

---

### Requirement: Requisitos mínimos para competir

La página SHALL listar los requisitos mínimos orientativos para competir: edad del perro, vacunas y comportamiento (REQ-F-025). SHALL indicar que los requisitos exactos pueden depender de cada evento.

#### Scenario: Requisitos listados

- **WHEN** el usuario consulta la sección de requisitos
- **THEN** se muestran al menos: edad del perro, vacunas, y comportamiento

#### Scenario: Dependencia del evento

- **WHEN** el usuario lee los requisitos
- **THEN** se indica que los requisitos exactos pueden variar según el evento u organizador

---

### Requirement: Material básico necesario

La página SHALL listar el material básico necesario para empezar (arnés, correa, etc.) (REQ-F-026).

#### Scenario: Material listado

- **WHEN** el usuario consulta la sección de material
- **THEN** aparecen al menos arnés y correa, más otros elementos básicos

---

### Requirement: Cómo encontrar un club o entrenador

La página SHALL explicar cómo encontrar un club o entrenador (REQ-F-027) y SHALL ofrecer un enlace al listado de clubs (o texto "próximamente" si la ruta no existe).

#### Scenario: Explicación visible

- **WHEN** el usuario consulta la sección de clubs/entrenador
- **THEN** el contenido explica cómo buscar un club o entrenador

#### Scenario: Enlace a clubs o placeholder

- **WHEN** el usuario busca acceder al listado de clubs
- **THEN** existe un enlace a /clubs o un mensaje de que el listado estará disponible próximamente

---

### Requirement: Sección FAQ

La página SHALL incluir una sección FAQ con preguntas frecuentes (REQ-F-028, P1).

#### Scenario: FAQ visible

- **WHEN** el usuario visita la página
- **THEN** existe una sección "Preguntas frecuentes" con al menos una pregunta y respuesta

---

### Requirement: Enlaces a eventos y clubs

La página SHALL incluir enlaces a /events y a /clubs (o placeholder para clubs).

#### Scenario: Enlace a eventos

- **WHEN** el usuario está en /como-empezar
- **THEN** puede acceder a eventos mediante un enlace a /events

#### Scenario: Enlace o mención a clubs

- **WHEN** el usuario está en /como-empezar
- **THEN** existe un enlace a /clubs o mención de listado de clubs (futuro)
