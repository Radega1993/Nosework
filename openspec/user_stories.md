# User Stories - Nosework Trial Community Platform

Este documento define las historias de usuario organizadas por roles y prioridad, siguiendo el formato estándar con criterios de aceptación.

**Formato:** "As a <role>, I want <goal> so that <benefit>."

**Roles:** visitante, guia (user), organizador, administrador, juez

**Prioridades:** [P0] Crítico | [P1] Importante | [P2] Deseable

---

## Historias de Usuario P0 (Críticas)

### Rol: Visitante

#### US-001 [P0] [F1] Ver información sobre Nosework Trial
**Como** visitante  
**Quiero** ver una explicación clara de qué es Nosework Trial  
**Para** entender la modalidad y decidir si me interesa participar

**Criterios de Aceptación:**
- **Given** que soy un visitante en la página de inicio
- **When** accedo a la sección "Qué es Nosework Trial"
- **Then** veo información sobre:
  - Historia y origen de la disciplina
  - Beneficios para perros y guías
  - Estructura del deporte (niveles Base y Avanzado)
  - Diferencias con otras modalidades (FEPDE, AKC Scent Work, etc. solo como referencia comparativa)

#### US-002 [P0] [F1] Consultar el reglamento oficial
**Como** visitante  
**Quiero** poder consultar el reglamento oficial de Nosework Trial  
**Para** conocer las normas y requisitos antes de participar

**Criterios de Aceptación:**
- **Given** que soy un visitante
- **When** accedo a la página de reglamento
- **Then** puedo:
  - Ver el reglamento completo en formato HTML navegable
  - Descargar el reglamento en PDF
  - Ver información sobre niveles (Base y Avanzado), tipos de búsqueda, sistema de puntuación
  - Ver el código ético y bienestar del perro
  - Ver que no hay pódiums tradicionales, sino reconocimientos alternativos

#### US-003 [P0] [F1] Encontrar información sobre cómo empezar
**Como** visitante interesado  
**Quiero** ver una guía paso a paso sobre cómo empezar en Nosework Trial  
**Para** saber qué pasos seguir para comenzar a participar

**Criterios de Aceptación:**
- **Given** que soy un visitante interesado
- **When** accedo a la página "Cómo empezar"
- **Then** veo:
  - Guía paso a paso "Soy guía nuevo, ¿qué hago?"
  - Requisitos mínimos orientativos (edad del perro, vacunas y comportamiento), indicando que los requisitos exactos dependen de cada evento
  - Material básico necesario
  - Cómo encontrar un club/entrenador
  - FAQ con preguntas frecuentes

#### US-004 [P0] [F1] Ver el calendario de eventos próximos
**Como** visitante  
**Quiero** ver un calendario con los eventos programados  
**Para** saber cuándo y dónde hay pruebas disponibles

**Criterios de Aceptación:**
- **Given** que soy un visitante
- **When** accedo a la página de eventos/calendario
- **Then** veo:
  - Listado de eventos próximos con fecha, título, localidad y club organizador
  - Calendario visual con eventos marcados
  - Información básica de cada evento

#### US-005 [P0] [F1] Contactar con la organización
**Como** visitante  
**Quiero** poder contactar con la organización  
**Para** hacer preguntas o solicitar información adicional

**Criterios de Aceptación:**
- **Given** que soy un visitante
- **When** accedo a la página de contacto
- **Then** puedo:
  - Enviar un formulario de contacto
  - Ver email de contacto y redes sociales
  - Ver ubicación principal (si existe)

#### US-005B [P0] [F1] Consultar privacidad y cookies
**Como** visitante  
**Quiero** poder consultar políticas de privacidad y cookies  
**Para** entender cómo se gestionan mis datos y cumplir normativa

**Criterios de Aceptación:**
- **Given** que soy un visitante
- **When** accedo al footer
- **Then** puedo acceder a:
  - Política de privacidad
  - Política de cookies (si aplica)
  - Términos y condiciones

### Rol: Guía (User)

#### US-006 [P0] [F4] Registrarme como guía
**Como** visitante interesado  
**Quiero** registrarme en la plataforma  
**Para** poder acceder a funcionalidades de guía (inscripciones, perfil, etc.)

**Criterios de Aceptación:**
- **Given** que soy un visitante no registrado
- **When** completo el formulario de registro con email y contraseña
- **Then**:
  - Mi cuenta se crea correctamente
  - Recibo confirmación por email
  - Puedo iniciar sesión con mis credenciales
  - Mi rol por defecto es "user" (guía)

#### US-007 [P0] [F4] Iniciar sesión en mi cuenta
**Como** guía registrado  
**Quiero** iniciar sesión en la plataforma  
**Para** acceder a mi área privada y funcionalidades

**Criterios de Aceptación:**
- **Given** que soy un guía registrado
- **When** ingreso mi email y contraseña correctos
- **Then**:
  - Inicio sesión exitosamente
  - Recibo un token JWT que se almacena en localStorage
  - Soy redirigido a mi dashboard o página solicitada
  - Puedo acceder a rutas protegidas

#### US-008 [P0] [F4] Gestionar mi perfil personal
**Como** guía  
**Quiero** ver y editar mi perfil personal  
**Para** mantener mis datos actualizados

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** accedo a mi perfil
- **Then** puedo:
  - Ver mis datos personales (nombre, email, teléfono, dirección)
  - Editar mis datos personales
  - Subir foto de perfil
  - Ver mi historial de competiciones

#### US-009 [P0] [F4] Gestionar mis perros
**Como** guía  
**Quiero** registrar y gestionar mis perros  
**Para** poder inscribirlos en competiciones

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** accedo a la sección "Mis perros"
- **Then** puedo:
  - Registrar un nuevo perro (nombre, raza, fecha nacimiento, género)
  - Ver listado de mis perros
  - Editar información de mis perros
  - Ver historial deportivo de cada perro
  - Indicar si un perro tiene problemas de comportamiento (según reglamento)

#### US-010 [P0] [F4] Inscribirme a una prueba
**Como** guía  
**Quiero** inscribirme online a una prueba disponible  
**Para** participar en competiciones sin gestionar todo por WhatsApp/email

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado con al menos un perro registrado
- **When** selecciono una prueba disponible y me inscribo
- **Then**:
  - Selecciono el perro que participará
  - Selecciono el nivel (Base o Avanzado)
  - El sistema solicita una declaración responsable de cumplimiento de requisitos (edad, vacunas u otros requisitos indicados por el evento)
  - Si el evento requiere verificación documental, el sistema lo indica y la validación será manual por el organizador (fase futura)
  - El sistema no bloquea la inscripción por falta de documentos en F4
  - Puedo indicar si mi perro tiene problemas de comportamiento
  - Recibo confirmación automática por email
  - Aparezco en el listado de inscritos para el organizador

#### US-011 [P0] [F4] Ver mis inscripciones
**Como** guía  
**Quiero** ver mis inscripciones activas y pasadas  
**Para** tener control de mis participaciones

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** accedo a "Mis inscripciones"
- **Then** veo:
  - Próximas pruebas en las que estoy inscrito
  - Historial de competiciones pasadas
  - Estado de cada inscripción (pendiente, confirmada, cancelada)
  - Estado de pago de cada inscripción

#### US-012 [P0] [F4] Ver resultados de mis competiciones
**Como** guía  
**Quiero** ver los resultados de las competiciones en las que participé  
**Para** conocer mi rendimiento y progreso

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** accedo a "Mis resultados"
- **Then** veo:
  - Listado de competiciones en las que participé
  - Puntuación obtenida por cada prueba
  - Desglose de criterios (sistemática, focalización, intensidad, impresión general)
  - Tiempo empleado
  - Posición (si aplica, sin pódiums tradicionales)
  - Notas del juez

### Rol: Organizador

#### US-013 [P0] [F3] Crear un evento/prueba
**Como** organizador  
**Quiero** crear un nuevo evento/prueba  
**Para** publicar competiciones y permitir inscripciones

**Criterios de Aceptación:**
- **Given** que soy un organizador autenticado
- **When** creo un nuevo evento
- **Then** puedo especificar:
  - Fecha y hora
  - Título y descripción
  - Localidad y dirección
  - Tipo de prueba (interior, exterior, vehículos, contenedores)
  - Niveles disponibles (Base, Avanzado)
  - Precio de inscripción
  - Fechas de apertura y cierre de inscripciones
  - Coeficientes de evaluación si son diferentes al estándar
- **And** el evento aparece en el calendario público

#### US-014 [P0] [F3] Gestionar mis eventos
**Como** organizador  
**Quiero** editar y eliminar mis eventos  
**Para** mantener la información actualizada

**Criterios de Aceptación:**
- **Given** que soy un organizador autenticado
- **When** accedo a mis eventos
- **Then** puedo:
  - Ver listado de eventos que he creado
  - Editar cualquier campo de mis eventos
  - Cambiar estado (abierto, cerrado, cancelado)
  - Eliminar eventos (con confirmación)

#### US-014B [P0] [F3] Publicar o despublicar un evento
**Como** organizador  
**Quiero** publicar o despublicar un evento  
**Para** controlar cuándo es visible públicamente y evitar que se indexen eventos incompletos

**Criterios de Aceptación:**
- **Given** que soy un organizador autenticado
- **When** cambio el estado de visibilidad del evento
- **Then** puedo:
  - Marcar el evento como "borrador" (no visible)
  - Publicar el evento (visible en calendario público)
  - Despublicar el evento (deja de ser visible públicamente)
- **And** el sistema debe evitar indexación SEO de eventos en borrador (noindex)

#### US-015 [P0] [F3] Ver inscripciones a mis eventos
**Como** organizador  
**Quiero** ver quién se ha inscrito a mis eventos  
**Para** gestionar la organización de la prueba

**Criterios de Aceptación:**
- **Given** que soy un organizador autenticado
- **When** accedo a un evento que he creado
- **Then** veo:
  - Listado de inscritos con nombre del guía y perro
  - Nivel seleccionado (Base/Avanzado)
  - Estado de pago de cada inscripción
  - Notas sobre problemas de comportamiento si fueron indicadas
  - Posibilidad de marcar pagos como confirmados

#### US-016 [P0] [F3] Subir resultados de mi evento
**Como** organizador  
**Quiero** subir los resultados de mi evento  
**Para** que los participantes puedan consultarlos

**Criterios de Aceptación:**
- **Given** que soy un organizador autenticado
- **When** subo resultados de un evento
- **Then** puedo:
  - Subir PDF con resultados
  - O introducir resultados manualmente (perro, guía, puntuación, tiempo, criterios)
  - Especificar nivel (Base/Avanzado)
  - Añadir notas del juez
  - Los resultados aparecen en la página pública de resultados

### Rol: Administrador

#### US-017 [P0] [F5] Gestionar usuarios
**Como** administrador  
**Quiero** gestionar usuarios del sistema  
**Para** mantener la seguridad y organización

**Criterios de Aceptación:**
- **Given** que soy un administrador autenticado
- **When** accedo al panel de administración de usuarios
- **Then** puedo:
  - Ver listado de todos los usuarios
  - Editar datos de usuarios
  - Cambiar roles de usuarios (user, organizador, administrador, juez)
  - Eliminar usuarios (con confirmación)
  - Ver estadísticas de usuarios

#### US-018 [P0] [F5] Gestionar clubs
**Como** administrador  
**Quiero** gestionar clubs del sistema  
**Para** mantener el directorio actualizado

**Criterios de Aceptación:**
- **Given** que soy un administrador autenticado
- **When** accedo al panel de administración de clubs
- **Then** puedo:
  - Ver listado de todos los clubs
  - Aprobar nuevos clubs
  - Editar información de clubs
  - Eliminar clubs (con confirmación)
  - Verificar nivel de integración de cada club

#### US-019 [P0] [F5] Gestionar eventos globalmente
**Como** administrador  
**Quiero** gestionar todos los eventos del sistema  
**Para** moderar y mantener calidad

**Criterios de Aceptación:**
- **Given** que soy un administrador autenticado
- **When** accedo al panel de administración de eventos
- **Then** puedo:
  - Ver todos los eventos (de todos los organizadores)
  - Editar cualquier evento
  - Aprobar eventos antes de publicación (si se requiere)
  - Eliminar eventos inapropiados

### Rol: Juez

#### US-020 [P0] [F6] Acceder a documentos internos
**Como** juez  
**Quiero** acceder a documentos internos y recursos  
**Para** tener toda la información necesaria para juzgar

**Criterios de Aceptación:**
- **Given** que soy un juez autenticado
- **When** accedo a mi panel de juez
- **Then** puedo:
  - Ver documentos internos (guías de evaluación, criterios detallados)
  - Acceder a recursos de formación
  - Ver normativas actualizadas

#### US-021 [P0] [F6] Introducir resultados de una prueba
**Como** juez  
**Quiero** introducir resultados directamente en el sistema  
**Para** agilizar la publicación de resultados

**Criterios de Aceptación:**
- **Given** que soy un juez asignado a un evento
- **When** introduzco resultados
- **Then** puedo:
  - Introducir puntuaciones por criterios (sistemática, focalización, intensidad, impresión general)
  - Especificar tiempo empleado
  - Añadir notas del juez
  - Registrar sanciones si aplican (según reglamento)
  - Registrar ayudantes asignados
  - Los resultados se publican automáticamente

#### US-021B [P0] [F6] Registrar una sanción disciplinaria
**Como** juez u organizador autorizado  
**Quiero** registrar una sanción disciplinaria con motivo y duración  
**Para** aplicar medidas según normativa y mantener coherencia en el deporte

**Criterios de Aceptación:**
- **Given** que soy juez u organizador autorizado
- **When** registro una sanción
- **Then** debo poder indicar:
  - Persona sancionada (guía) y/o perro asociado
  - Motivo de la sanción
  - Duración (fechas inicio/fin)
  - Evidencia o notas (opcional)
- **And** la sanción queda registrada con trazabilidad (quién la creó y cuándo)

#### US-021C [P0] [F6] Consultar sanciones activas
**Como** administrador  
**Quiero** consultar sanciones activas e históricas  
**Para** revisar casos, aplicar criterios consistentes y garantizar trazabilidad

**Criterios de Aceptación:**
- **Given** que soy administrador autenticado
- **When** consulto sanciones
- **Then** puedo filtrar por:
  - Estado (activa / expirada)
  - Fecha
  - Guía / perro
  - Evento relacionado (si aplica)
- **And** puedo ver el historial completo del caso


---

## Historias de Usuario P1 (Importantes)

### Rol: Visitante

#### US-022 [P1] [F2] Buscar clubs cerca de mi ubicación
**Como** visitante  
**Quiero** buscar clubs cerca de mi ubicación  
**Para** encontrar dónde puedo entrenar

**Criterios de Aceptación:**
- **Given** que soy un visitante
- **When** accedo al directorio de clubs
- **Then** puedo:
  - Ver clubs en un mapa
  - Filtrar por localidad
  - Ver información de contacto de cada club
  - Ver qué servicios ofrece cada club

#### US-023 [P1] [F2] Leer artículos del blog
**Como** visitante  
**Quiero** leer artículos sobre nosework y entrenamiento  
**Para** aprender más sobre la modalidad

**Criterios de Aceptación:**
- **Given** que soy un visitante
- **When** accedo al blog
- **Then** puedo:
  - Ver listado de artículos publicados
  - Leer artículos completos
  - Filtrar por categorías
  - Buscar artículos por palabras clave

### Rol: Guía

#### US-024 [P1] [F4] Cancelar una inscripción
**Como** guía  
**Quiero** poder cancelar una inscripción  
**Para** gestionar cambios en mis planes

**Criterios de Aceptación:**
- **Given** que soy un guía con una inscripción activa
- **When** cancelo mi inscripción
- **Then**:
  - La inscripción se marca como cancelada
  - Se aplican políticas de reembolso según el evento
  - Recibo confirmación por email
  - El organizador es notificado

#### US-025 [P1] [F6] Ver mi ranking personal
**Como** guía  
**Quiero** ver mi posición en los rankings  
**Para** conocer mi progreso en la temporada

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** accedo a rankings
- **Then** puedo:
  - Ver ranking por guía del año actual
  - Ver ranking histórico de temporadas anteriores
  - Filtrar por nivel (Base/Avanzado)
  - Ver mis títulos obtenidos

#### US-026 [P1] [F6] Gestionar mi licencia
**Como** guía  
**Quiero** gestionar mi licencia de guía  
**Para** mantenerla activa y renovarla cuando sea necesario

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** accedo a "Mi licencia"
- **Then** puedo:
  - Ver estado de mi licencia (activa, expirada, próxima a expirar)
  - Ver número de licencia
  - Renovar mi licencia online
  - Descargar carnet digital con QR

### Rol: Organizador

#### US-027 [P1] [F5] Gestionar datos de mi club
**Como** organizador de un club  
**Quiero** gestionar los datos de mi club  
**Para** mantener la información actualizada

**Criterios de Aceptación:**
- **Given** que soy un organizador asociado a un club
- **When** accedo a la gestión de mi club
- **Then** puedo:
  - Editar nombre, descripción, contacto
  - Subir/actualizar logo
  - Actualizar redes sociales
  - Gestionar miembros del club

#### US-028 [P1] [F6] Asignar jueces a mis eventos
**Como** organizador  
**Quiero** asignar jueces a mis eventos  
**Para** organizar correctamente las pruebas

**Criterios de Aceptación:**
- **Given** que soy un organizador creando/editando un evento
- **When** asigno jueces
- **Then** puedo:
  - Seleccionar juez principal de una lista
  - Asignar ayudantes/jueces secundarios
  - Ver disponibilidad de jueces
  - Los jueces reciben notificación de asignación

### Rol: Administrador

#### US-029 [P1] [F5] Ver estadísticas y reportes
**Como** administrador  
**Quiero** ver estadísticas del sistema  
**Para** entender el crecimiento y actividad

**Criterios de Aceptación:**
- **Given** que soy un administrador autenticado
- **When** accedo al panel de estadísticas
- **Then** veo:
  - Número de usuarios registrados
  - Número de eventos por mes/año
  - Número de inscripciones
  - Clubs activos
  - Gráficos de crecimiento

---

## Historias de Usuario P2 (Deseables)

### Rol: Guía

#### US-030 [P2] [F7] Recibir notificaciones de nuevos eventos
**Como** guía  
**Quiero** recibir notificaciones cuando se publiquen nuevos eventos  
**Para** no perderme oportunidades de participar

**Criterios de Aceptación:**
- **Given** que soy un guía autenticado
- **When** se publica un nuevo evento
- **Then** recibo:
  - Notificación por email (si estoy suscrito)
  - Notificación en la plataforma
  - Puedo configurar preferencias de notificaciones

#### US-031 [P2] [F7] Ver live scoring durante una prueba
**Como** guía  
**Quiero** ver resultados en tiempo real durante una prueba  
**Para** seguir el desarrollo de la competición

**Criterios de Aceptación:**
- **Given** que soy un guía participando en una prueba
- **When** el juez introduce resultados en directo
- **Then** puedo ver:
  - Resultados actualizados en tiempo real
  - Clasificación provisional
  - Resultados de otros participantes

### Rol: Organizador

#### US-032 [P2] [F7] Exportar listado de inscritos
**Como** organizador  
**Quiero** exportar el listado de inscritos  
**Para** gestionar la organización fuera de la plataforma

**Criterios de Aceptación:**
- **Given** que soy un organizador
- **When** exporto inscripciones de un evento
- **Then** puedo descargar:
  - Excel/CSV con datos de inscritos
  - PDF con listado formateado

---

## Resumen por Rol y Fase

### Visitante
- **F1:** 5 historias [P0]
- **F2:** 2 historias [P1]
- **Total:** 7 historias

### Guía (User)
- **F4:** 7 historias [P0]
- **F6:** 2 historias [P1]
- **F7:** 2 historias [P2]
- **Total:** 11 historias

### Organizador
- **F3:** 4 historias [P0]
- **F5:** 1 historia [P1]
- **F6:** 1 historia [P1]
- **F7:** 1 historia [P2]
- **Total:** 7 historias

### Administrador
- **F5:** 3 historias [P0]
- **F5:** 1 historia [P1]
- **Total:** 4 historias

### Juez
- **F6:** 2 historias [P0]
- **Total:** 2 historias

**Total general:** 31 historias de usuario documentadas

---

**Última actualización:** Enero 2025
