# Propuesta: Plataforma Web Nosework Trial Community

## Visión

Crear la plataforma web de referencia en España para la modalidad deportiva **Nosework Trial**, una disciplina independiente de trabajo de olfato canino que combina elementos de detección deportiva y nosework tradicional. La plataforma evolucionará desde un sitio web estático informativo hasta una aplicación web completa que gestione competiciones, inscripciones, resultados, clubs, licencias y rankings, posicionándose como la organización líder de este deporte en España.

**Importante:** Nosework Trial Community es una organización independiente, sin relación alguna con FEPDE (Federación Española de Perros de Detección y Especialidades) u otras federaciones existentes.

## Problema

Actualmente, la comunidad de Nosework Trial en España carece de:
- Una plataforma centralizada que explique la modalidad y sus reglas
- Un sistema de gestión de competiciones y eventos
- Herramientas para inscripciones online y gestión de resultados
- Un directorio de clubs y centros de entrenamiento
- Un sistema de rankings y reconocimientos oficiales
- Documentación accesible sobre reglamentos y normativas

Esto dificulta el crecimiento de la modalidad, la organización de eventos y la participación de nuevos guías y perros.

## Audiencia

### Primaria
- **Guías nuevos:** Personas interesadas en iniciarse en Nosework Trial con sus perros
- **Guías activos:** Participantes regulares que necesitan gestionar inscripciones y consultar resultados
- **Clubs y organizadores:** Entidades que organizan pruebas y necesitan herramientas de gestión

### Secundaria
- **Jueces:** Evaluadores que necesitan acceso a documentación y herramientas de puntuación
- **Instructores:** Formadores que requieren recursos y visibilidad
- **Medios y patrocinadores:** Entidades interesadas en conocer la modalidad

## Alcance por Fases

### Fase 1: Web Estática MVP (Actual)
**Objetivo:** Sitio web público informativo que explique la modalidad.

**Entregables:**
- Páginas esenciales: Inicio, Qué es Nosework Trial, Reglamento, Cómo empezar, Sobre la Asociación, Contacto
- Calendario básico de eventos
- Diseño responsive y optimización SEO básica
- Documentación de reglamentos (PDF + HTML)

**Estado:** 60% completado

### Fase 2: Contenido Ampliado + SEO
**Objetivo:** Posicionamiento en buscadores y contenido completo.

**Entregables:**
- Sección de Competiciones (formato de trial)
- Directorio de Clubs y centros
- Blog/Noticias con artículos SEO
- Optimización SEO avanzada (schema.org, sitemap, meta tags)
- Contenido multilingüe (ES, CA)

### Fase 3: Calendario Dinámico y Resultados
**Objetivo:** Gestión activa de eventos y resultados.

**Entregables:**
- Panel de administración de eventos
- Sistema de resultados (subida de PDFs/tablas)
- Galerías de fotos y vídeos
- Listados dinámicos de eventos pasados y futuros

### Fase 4: Área Privada de Guías + Inscripciones
**Objetivo:** Sistema de usuarios y inscripciones online.

**Entregables:**
- Registro y login de guías
- Perfiles de guía y gestión de perros
- Sistema de inscripciones online a pruebas
- Integración de pagos (manual inicial, TPV después)

### Fase 5: Paneles de Clubes y Organizadores
**Objetivo:** Descentralización de la gestión hacia clubs.

**Entregables:**
- Panel de club con gestión de datos
- Creación y edición de pruebas propias
- Gestión de inscripciones y pagos
- Subida de resultados

### Fase 6: Rankings, Licencias y Jueces
**Objetivo:** Ecosistema federativo completo.

**Entregables:**
- Sistema de licencias (guías y perros)
- Rankings anuales (por perro, guía, club)
- Módulo de jueces (listado público + panel privado)
- Carnet digital con QR

### Fase 7: Extras y Escalado
**Objetivo:** Funcionalidades avanzadas y optimización.

**Entregables:**
- Live scoring en pruebas
- Zona de formación online
- PWA móvil
- Integraciones avanzadas

## No Objetivos

- **No es una plataforma de e-commerce:** No vendemos productos, solo gestionamos eventos y membresías
- **No es una red social:** Aunque hay comunidad, no es el foco principal
- **No reemplaza entrenamiento presencial:** La plataforma informa y gestiona, no enseña técnicas avanzadas
- **No compite con FEPDE:** Somos una modalidad independiente con enfoque diferente
- **No es una app móvil nativa:** Priorizamos web responsive y PWA
- **No gestiona operaciones de rescate:** Solo deporte, no detección operativa

## Riesgos

### Técnicos
- **Migración SQLite → PostgreSQL:** Requiere planificación cuidadosa de datos
- **Escalabilidad de API Routes:** Puede necesitar migración a backend dedicado
- **Integración de pagos:** Complejidad regulatoria y seguridad

### De Negocio
- **Adopción por la comunidad:** Depende de la aceptación de clubs y guías
- **Mantenimiento de contenido:** Requiere recursos para actualizar reglamentos y eventos
- **Competencia:** Otras organizaciones pueden crear plataformas similares

### Legales
- **GDPR/LOPDGDD:** Cumplimiento de protección de datos
- **Propiedad intelectual:** Reglamentos y contenido deben estar claramente definidos

## Hitos Principales

### Sprint 1
- ✅ **Completar Fase 1:** Web estática MVP funcional
- 🎯 **Iniciar Fase 2:** Contenido SEO y blog

### Sprint 2
- 🎯 **Completar Fase 2:** Posicionamiento SEO establecido
- 🎯 **Iniciar Fase 3:** Sistema de resultados operativo

### Sprint 3
- 🎯 **Completar Fase 3:** Calendario y resultados dinámicos
- 🎯 **Iniciar Fase 4:** Área privada de usuarios

### Sprint 4
- 🎯 **Completar Fase 4:** Inscripciones online funcionando
- 🎯 **Iniciar Fase 5:** Paneles de clubes

### Sprint 5
- 🎯 **Fases 6-7:** Ecosistema completo y optimizaciones

## Propuesta de Valor Diferencial

Nosework Trial se diferencia de otras disciplinas de olfato canino porque:

- Sistema de evaluación estructurado basado en sistemática, focalización e intensidad
- Modalidad abierta y accesible para perros de todos los perfiles
- Enfoque deportivo no jerárquico y centrado en progreso individual
- Organización flexible sin estructura federativa rígida
- Reconocimientos alternativos en lugar de pódiums tradicionales

---

## Gobernanza Deportiva

Actualmente la gobernanza es gestionada por el equipo promotor de Nosework Trial Community.

Responsabilidades:

- Validación de reglamentos
- Homologación de pruebas
- Aprobación de clubs
- Designación de jueces
- Resolución de incidencias disciplinarias

Este modelo podrá evolucionar a un sistema participativo a medida que crezca la comunidad.

---

## Modelo Organizativo

Nosework Trial Community opera actualmente como iniciativa independiente en fase de desarrollo, con intención de formalizar su estructura legal en el futuro si el crecimiento lo requiere.

---

## Métricas de Éxito Iniciales

- 25 guías registrados en 3 meses
- 5 eventos publicados
- 3 clubs activos
- 500 visitas mensuales orgánicas

