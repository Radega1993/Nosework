# Reglamento Page – Specification

Página pública del reglamento oficial de Nosework Trial. Cubre US-002, REQ-F-010..023, TASK-F1-013.

---

## ADDED Requirements

### Requirement: PDF descargable

La página SHALL ofrecer el reglamento general en formato PDF descargable desde un enlace visible (REQ-F-010).

#### Scenario: Usuario descarga el reglamento en PDF

- **WHEN** el usuario visita la página de reglamento y hace clic en el enlace de descarga del PDF
- **THEN** el navegador inicia la descarga del archivo PDF del reglamento oficial (o lo abre en nueva pestaña con opción de descargar)

---

### Requirement: Reglamento en HTML por secciones navegables

La página SHALL mostrar el reglamento en versión HTML dividido en secciones con anclas y navegación (índice) para saltar a cada sección (REQ-F-011).

#### Scenario: Navegación por índice a una sección

- **WHEN** el usuario hace clic en un enlace del índice correspondiente a una sección (p. ej. "Sistema de puntuación")
- **THEN** la página hace scroll hasta esa sección y la sección es visible y claramente identificable (H2 o id)

#### Scenario: Una sola H1 y jerarquía correcta

- **WHEN** se renderiza la página de reglamento
- **THEN** existe exactamente una H1 (título principal del reglamento) y las secciones usan H2/H3 de forma coherente para la jerarquía del contenido

---

### Requirement: Sección de niveles Base y Avanzado

El reglamento HTML SHALL incluir una sección dedicada a niveles/grados con los nombres "Base" y "Avanzado" (no grados numéricos), con requisitos o descripción de cada nivel (REQ-F-012, REQ-F-017).

#### Scenario: Contenido visible de niveles Base y Avanzado

- **WHEN** el usuario consulta la sección de niveles del reglamento
- **THEN** se muestran explícitamente los niveles "Base" y "Avanzado" (sin denominación tipo "Grado 1", "Grado 2") y se describe qué implica cada nivel

---

### Requirement: Sección de tipos de búsqueda

El reglamento HTML SHALL incluir una sección que describa los tipos de búsqueda: interior, exterior, vehículos y contenedores (REQ-F-013).

#### Scenario: Tipos de búsqueda listados

- **WHEN** el usuario consulta la sección de tipos de búsqueda
- **THEN** aparecen al menos interior, exterior, vehículos y contenedores, con breve descripción o referencia a cada uno

---

### Requirement: Sección de sistema de puntuación

El reglamento HTML SHALL incluir una sección que explique cómo se puntúa, penalizaciones y tiempos límite (REQ-F-014).

#### Scenario: Puntuación y límites visibles

- **WHEN** el usuario consulta la sección de sistema de puntuación
- **THEN** el texto explica el criterio de puntuación, menciona penalizaciones cuando apliquen y tiempos límite si los hay

---

### Requirement: Sección de código ético y bienestar del perro

El reglamento HTML SHALL incluir una sección dedicada al código ético y al bienestar del perro (REQ-F-015).

#### Scenario: Código ético y bienestar accesibles

- **WHEN** el usuario consulta la sección de código ético y bienestar
- **THEN** el contenido es visible y trata explícitamente código ético y/o bienestar del perro

---

### Requirement: Olores oficiales

El reglamento SHALL especificar que los olores son: Kong + aceite esencial de salvia; en nivel Avanzado puede añadirse olor de referencia (REQ-F-018).

#### Scenario: Olores descritos en el reglamento

- **WHEN** el usuario lee el reglamento (en la sección correspondiente o en niveles)
- **THEN** se indica Kong + aceite esencial de salvia como olores base y, para Avanzado, la posibilidad de olor de referencia

---

### Requirement: Marca mínima de 3 segundos

El reglamento SHALL especificar que la marca mínima es de 3 segundos (REQ-F-019).

#### Scenario: Marca mínima indicada

- **WHEN** el usuario consulta el reglamento (puntuación o criterios de evaluación)
- **THEN** se indica explícitamente que la marca mínima es de 3 segundos

---

### Requirement: Criterios de evaluación

El reglamento SHALL explicar que la evaluación incluye: sistemática, focalización, intensidad (y impresión general), y que los coeficientes pueden ser ajustables por el organizador si se anuncia (REQ-F-020).

#### Scenario: Criterios de evaluación visibles

- **WHEN** el usuario consulta la parte del reglamento sobre evaluación
- **THEN** se mencionan sistemática, focalización, intensidad (e impresión general) y la posibilidad de coeficientes ajustables por organizador si se anuncia

---

### Requirement: Participación con problemas de comportamiento

El reglamento SHALL indicar que los perros con problemas de comportamiento pueden participar avisando previamente (REQ-F-021).

#### Scenario: Condición de aviso previo visible

- **WHEN** el usuario consulta el reglamento sobre participación o requisitos
- **THEN** se indica que los perros con problemas de comportamiento pueden participar avisando previamente

---

### Requirement: Sanciones y ayudantes

El reglamento SHALL especificar que el juez u organizador puede sancionar (p. ej. 6 meses) y que puede tener ayudantes (REQ-F-022).

#### Scenario: Sanciones y ayudantes descritos

- **WHEN** el usuario consulta el reglamento sobre organización, jueces o disciplina
- **THEN** se indica que juez/organizador puede sancionar (con ejemplo de duración como 6 meses) y que puede haber ayudantes

---

### Requirement: Sin pódiums; reconocimientos alternativos

El reglamento SHALL indicar que no hay pódiums tradicionales y que sí hay reconocimientos alternativos (REQ-F-023).

#### Scenario: Reconocimientos descritos

- **WHEN** el usuario consulta el reglamento sobre resultados o premios
- **THEN** se indica que no hay pódiums y que sí existen reconocimientos alternativos

---

### Requirement: Versionado básico visible

La página SHALL mostrar versionado básico del reglamento: identificador de versión (p. ej. "v1.0") y fecha de la versión (REQ-F-016 parcial; histórico amplio y changelog quedan para fase posterior).

#### Scenario: Versión y fecha visibles

- **WHEN** el usuario visita la página de reglamento
- **THEN** en algún lugar visible (cabecera, pie de contenido o bloque dedicado) se muestra la versión del reglamento (p. ej. "v1.0") y la fecha de esa versión
