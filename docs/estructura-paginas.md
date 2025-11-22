# Estructura de Páginas y Contenido

Este documento define todas las páginas y secciones que debe tener la web de Nosework Trial Community, organizadas en bloques: **Núcleo público (MVP estático)** y **Capa avanzada (app completa)**.

## A. Núcleo Público (MVP Estático)

### 1. Inicio (`/`)

**Estado:** ✅ Implementado (básico) | ⚠️ Necesita mejoras

**Contenido requerido:**

#### Hero Section
- **Nombre de la modalidad:** "Nosework Trial" (o nombre final)
- **Claim:** "Deporte de perros detectores y nosework deportivo"
- **CTAs:**
  - "Cómo empezar" → `/como-empezar`
  - "Ver reglamento" → `/reglamento`
- **Imagen:** Hero con perro en acción

#### Explicación Corta
- Qué es la modalidad
- Para quién está dirigida
- Diferencias con otras disciplinas:
  - Detección deportiva FEPDE
  - Nosework clásico
  - AKC Scent Work
  - Otros

#### Próximos Eventos Destacados
- Listado de 3-5 próximos eventos
- Enlace a calendario completo
- **Estado:** ✅ Implementado (calendario básico)

#### Logos de Patrocinadores/Partners
- Sección "Patrocinadores" (aunque inicialmente sea "Próximamente")
- Grid de logos

#### Nuestra Filosofía
- **Estado:** ✅ Implementado (básico)
- Mejorar contenido y diseño

**SEO:**
- Title: "Nosework Trial – Deporte de perros detectores y olfato canino"
- Meta: "Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato. Pruebas oficiales, reglamento, calendario de competiciones y clubs en España."

---

### 2. Qué es Nosework Trial (`/que-es-nosework-trial`)

**Estado:** ❌ No implementado

**Contenido requerido:**

#### Historia de la Disciplina
- Origen e inspiración
- Relación con:
  - Detección deportiva
  - Nosework tradicional
  - Scent work

#### Beneficios
- Para el perro:
  - Confianza
  - Trabajo mental
  - Ejercicio
  - Para todas las razas/edades
- Para el guía:
  - Vínculo con el perro
  - Actividad compartida
  - Comunidad

#### Estructura del Deporte
- Niveles / grados (Grado 1, 2, 3...)
- Categorías (según diseño)
- Tipos de búsqueda:
  - Interior
  - Exterior
  - Vehículos
  - Contenedores
  - (Según diseño específico)

#### Diferencias con Otras Modalidades
- **FEPDE:** Detección deportiva
- **AKC Scent Work:** Nosework americano
- **NACSW:** Nosework norteamericano
- **Nosework clásico:** Sin competición

**SEO:**
- Title: "Qué es Nosework Trial – Nosework deportivo para todos los perros"
- Meta: "Conoce en detalle qué es Nosework Trial, cómo funciona el nosework deportivo, qué tipos de pruebas hay y qué perros pueden practicar este deporte de olfato."

---

### 3. Reglamento (`/reglamento`)

**Estado:** ⚠️ Página `normativas.js` existe pero básica

**Contenido requerido:**

#### Reglamento General
- **PDF descargable:** `/public/documents/reglamento-nosework-trial.pdf`
- **Versión HTML:** Por secciones navegables

#### Secciones del Reglamento
1. **Niveles / Grados**
   - Grado 1, 2, 3...
   - Requisitos de cada nivel
   - Progresión

2. **Tipos de Búsqueda**
   - Interior
   - Exterior
   - Vehículos
   - Contenedores
   - (Según diseño)

3. **Sistema de Puntuación**
   - Cómo se puntúa
   - Penalizaciones
   - Tiempos límite

4. **Títulos y Certificaciones**
   - Qué títulos se pueden obtener
   - Requisitos para cada título

5. **Código Ético / Bienestar del Perro**
   - Normas de bienestar animal
   - Comportamiento esperado
   - Sanciones

#### Histórico de Versiones
- Versiones anteriores del reglamento
- Fechas de cambios
- Changelog

**SEO:**
- Title: "Reglamento Nosework Trial – Normativa oficial"
- Meta: "Consulta el reglamento oficial de Nosework Trial. Normativa completa, niveles, tipos de búsqueda, sistema de puntuación y código ético."

---

### 4. Cómo Empezar (`/como-empezar`)

**Estado:** ⚠️ Página `join.js` existe pero básica

**Contenido requerido:**

#### Guía Paso a Paso
1. **"Soy guía nuevo, ¿qué hago?"**
   - Paso 1: Entender qué es Nosework Trial
   - Paso 2: Encontrar un club/instructor
   - Paso 3: Material básico necesario
   - Paso 4: Primeros entrenamientos
   - Paso 5: Primera competición

#### Requisitos Mínimos
- Edad del perro
- Vacunas y salud
- Comportamiento básico
- Licencia (si aplica)

#### Material Básico
- Arnés
- Correa
- Recompensas
- Otros materiales específicos

#### Cómo Encontrar un Club / Entrenador
- Listado de clubs
- Mapa de ubicaciones
- Enlace a página de clubs

#### FAQ Básica
- Preguntas frecuentes
- Respuestas claras
- Enlaces a más información

**SEO:**
- Title: "Cómo Empezar en Nosework Trial – Guía para Principiantes"
- Meta: "Guía completa para empezar en Nosework Trial. Requisitos, material necesario, cómo encontrar un club y preparar a tu perro para su primera competición."

---

### 5. Competiciones (`/competiciones`)

**Estado:** ❌ No implementado (existe `/events` pero diferente propósito)

**Contenido requerido:**

#### Formato de Prueba Nosework Trial
- Explicación del formato
- Duración típica
- Estructura de una prueba

#### Qué se Espera del Guía
- Comportamiento
- Preparación
- Responsabilidades

#### Qué se Espera del Perro
- Comportamiento
- Preparación
- Niveles

#### Roles en una Prueba
- **Organizador:** Responsabilidades
- **Juez:** Función y autoridad
- **Comisarios:** Apoyo
- **Staff:** Logística

#### Normativa para Organizadores
- Versión resumida
- Enlace a documento completo
- Requisitos para organizar

**SEO:**
- Title: "Competiciones Nosework Trial – Formato y Normativa"
- Meta: "Conoce el formato de las competiciones de Nosework Trial, qué se espera de guías y perros, y la normativa para organizadores."

---

### 6. Calendario de Eventos (`/calendario`)

**Estado:** ✅ Implementado en `/events` (básico)

**Contenido requerido:**

#### Listado de Eventos Programados
- **Información mínima por evento:**
  - Nombre del evento
  - Fecha y hora
  - Localidad
  - Club organizador
  - Enlace a más info
  - Estado (abierto/cerrado inscripciones)

#### Filtros
- Por fecha
- Por localidad
- Por club
- Por tipo de prueba

#### Eventos Amigos / Demostraciones
- Sección para eventos no oficiales
- Diferenciación visual

**Mejoras necesarias:**
- Más campos en base de datos
- Vista de detalle de evento
- Sistema de inscripciones (Fase 4)

**SEO:**
- Title: "Calendario Nosework Trial 2025 – Próximas Pruebas"
- Meta: "Consulta el calendario completo de pruebas y eventos de Nosework Trial. Fechas, localidades y clubs organizadores."

---

### 7. Resultados (`/resultados`)

**Estado:** ❌ No implementado

**Contenido requerido:**

#### Listado por Año
- Selector de año
- Listado de pruebas

#### Listado por Prueba
- Resultados de cada prueba
- Clasificaciones finales
- Enlaces a PDFs o tablas HTML

#### Búsqueda
- Por perro
- Por guía
- Por prueba
- Por fecha

**SEO:**
- Title: "Resultados Nosework Trial – Clasificaciones y Rankings"
- Meta: "Consulta los resultados de todas las competiciones de Nosework Trial. Clasificaciones, rankings y títulos obtenidos."

---

### 8. Galerías (`/galerias`)

**Estado:** ❌ No implementado

**Contenido requerido:**

#### Álbumes por Prueba
- Fotos de cada trial
- Enlaces externos a:
  - Google Drive
  - Flickr
  - YouTube
  - Instagram

#### Organización
- Por año
- Por prueba
- Por club

**SEO:**
- Title: "Galerías Nosework Trial – Fotos y Vídeos"
- Meta: "Galería de fotos y vídeos de las competiciones de Nosework Trial. Revive los mejores momentos de cada prueba."

---

### 9. Clubs y Centros Adheridos (`/clubs`)

**Estado:** ⚠️ Listado básico en `/about`

**Contenido requerido:**

#### Mapa / Listado de Clubs
- Mapa interactivo (Google Maps / Leaflet)
- Listado con filtros

#### Ficha de Cada Club
- Nombre
- Localidad
- Contacto (email, teléfono)
- Web / Redes sociales
- Nivel de integración:
  - Organizan pruebas
  - Tienen instructores certificados
  - Solo entrenamiento

#### Página Individual de Club (`/clubs/[slug]`)
- Información completa
- Próximos eventos del club
- Instructores
- Galería

**SEO:**
- Title: "Clubs Nosework Trial España – Dónde Entrenar"
- Meta: "Encuentra clubs y centros adheridos a Nosework Trial en España. Mapa, contacto y servicios de cada club."

---

### 10. Formación / Instructores (`/formacion`)

**Estado:** ❌ No implementado

**Contenido requerido:**

#### Programa de Instructores
- Descripción del programa
- Niveles de certificación
- Proceso de certificación

#### Listado de Instructores Acreditados
- Biografía
- Zona de actuación
- Contacto
- Especialidades

#### Cursos y Formación
- Cursos disponibles
- Formación online (futuro)
- Materiales

**SEO:**
- Title: "Formación Nosework Trial – Instructores Certificados"
- Meta: "Programa de formación e instructores certificados de Nosework Trial. Cursos, certificaciones y profesionales acreditados."

---

### 11. Sobre la Asociación / Modalidad (`/sobre`)

**Estado:** ✅ Implementado en `/about` (básico)

**Contenido requerido:**

#### Quiénes Somos
- Equipo promotor
- Fundadores
- Historia

#### Visión, Misión y Valores
- **Misión:** ✅ Implementado (básico)
- **Visión:** Añadir
- **Valores:** Añadir

#### Historia
- Por qué nace la modalidad
- Contexto respecto a:
  - FEPDE
  - Nosework
  - Otras federaciones

#### Estatutos / Documentos Legales
- Si es asociación/federación
- Enlaces a documentos

**SEO:**
- Title: "Sobre Nosework Trial – Asociación y Modalidad"
- Meta: "Conoce la historia, misión y valores de Nosework Trial. El equipo promotor y la visión de la modalidad."

---

### 12. Contacto (`/contacto`)

**Estado:** ✅ Implementado (básico)

**Contenido requerido:**

#### Formulario de Contacto
- Nombre
- Email
- Asunto
- Mensaje
- **Estado:** ✅ Implementado

#### Información de Contacto
- Email principal
- Redes sociales
- Ubicación principal (si hay)
- Horarios de atención

**SEO:**
- Title: "Contacto Nosework Trial – Preguntas y Consultas"
- Meta: "Contacta con Nosework Trial. Formulario de contacto, email y redes sociales."

---

### 13. Noticias / Blog (`/blog`)

**Estado:** ❌ No implementado

**Contenido requerido:**

#### Sistema de Blog
- Listado de artículos
- Páginas individuales (`/blog/[slug]`)
- Categorías y tags
- Búsqueda

#### Tipos de Artículos
1. **Explicaciones Técnicas**
   - Cómo entrenar olfato
   - Empezar en nosework
   - Técnicas avanzadas

2. **Crónicas de Eventos**
   - Resúmenes de pruebas
   - Fotos y vídeos
   - Resultados destacados

3. **Cambios de Reglamento**
   - Notas oficiales
   - Explicación de cambios

4. **Noticias Generales**
   - Nuevos clubs
   - Eventos especiales
   - Anuncios

#### SEO por Artículo
- Títulos optimizados
- Meta descriptions
- Imágenes con alt text
- Enlaces internos

**Ejemplo de artículo:**
- Título: "Ejercicios de nosework en casa para empezar en Nosework Trial"
- Keywords: "ejercicios nosework en casa", "juegos de olfato perro"

---

## B. Capa Avanzada (App Web Completa)

### 14. Área Privada de Usuarios (Guías)

#### 14.1 Registro de Usuario (`/register`)
**Estado:** ✅ Implementado (básico)

**Mejoras necesarias:**
- Validación más robusta
- Verificación de email
- Términos y condiciones

#### 14.2 Mi Perfil (`/dashboard/perfil`)
**Estado:** ⚠️ Dashboard básico existe

**Contenido requerido:**
- Datos personales
- Licencia de guía
- Estado de membresía
- Foto de perfil

#### 14.3 Mis Perros (`/dashboard/mis-perros`)
**Estado:** ❌ No implementado

**Contenido requerido:**
- Listado de perros
- Ficha individual:
  - Nombre
  - Fecha de nacimiento
  - Raza
  - Nº de licencia
  - Historial deportivo
  - Títulos obtenidos
  - Foto

#### 14.4 Mis Inscripciones (`/dashboard/inscripciones`)
**Estado:** ❌ No implementado

**Contenido requerido:**
- Próximas pruebas
- Historial de competiciones
- Resultados personales
- Títulos obtenidos

---

### 15. Módulo de Inscripciones Online

#### 15.1 Alta de Pruebas (`/dashboard/organizador/pruebas`)
**Estado:** ⚠️ Gestión básica de eventos existe

**Contenido requerido:**
- Crear prueba
- Editar prueba
- Configurar:
  - Fechas de inscripción
  - Precios
  - Categorías disponibles
  - Niveles

#### 15.2 Formulario de Inscripción (`/inscripcion/[id-prueba]`)
**Estado:** ❌ No implementado

**Contenido requerido:**
- Seleccionar perro
- Seleccionar categoría
- Seleccionar nivel
- Información adicional
- Confirmación

#### 15.3 Pasarela de Pago
**Estado:** ❌ No implementado

**Opciones:**
- Stripe
- RedSys
- PayPal
- Transferencia manual (inicial)

#### 15.4 Confirmación y Emails
**Estado:** ❌ No implementado

**Contenido requerido:**
- Email de confirmación automático
- Recordatorios
- Información de la prueba

---

### 16. Módulo de Clubes / Organizadores

#### 16.1 Panel de Club (`/dashboard/club`)
**Estado:** ❌ No implementado

**Funcionalidades:**
- Gestionar datos del club
- Crear y editar pruebas
- Ver inscripciones
- Marcar pagos
- Subir resultados
- Gestión de jueces asignados

---

### 17. Módulo de Jueces

#### 17.1 Perfil de Juez (`/jueces/[id]`)
**Estado:** ❌ No implementado

**Contenido:**
- Biografía
- Zona de actuación
- Idiomas
- Pruebas juzgadas

#### 17.2 Panel de Juez (`/dashboard/juez`)
**Estado:** ❌ No implementado

**Funcionalidades:**
- Acceso a documentos internos
- Subir actas de resultados
- Introducir puntuaciones (futuro live scoring)

---

### 18. Ranking Oficial (`/ranking`)

**Estado:** ❌ No implementado

**Contenido requerido:**

#### Rankings por:
- Perro
- Guía
- Club
- Año / temporada

#### Filtros:
- Por nivel
- Por tipo de prueba
- Por categoría
- Por rango de fechas

#### Página de Títulos
- Títulos obtenidos
- Certificaciones
- Historial

---

### 19. Licencias y Membresía

#### 19.1 Gestión de Licencias (`/dashboard/licencias`)
**Estado:** ❌ No implementado

**Funcionalidades:**
- Licencias de guía
- Registros de perros
- Pago y renovación
- Estado de vigencia

#### 19.2 Carnet Digital
**Estado:** ❌ No implementado

**Funcionalidades:**
- Carnet digital de guía
- Carnet digital de perro
- QR codes
- Descarga PDF

---

### 20. Documentos y Recursos (`/documentos`)

**Estado:** ⚠️ Básico (PDF de normativas)

**Contenido requerido:**

#### Descargas:
- Reglamentos actualizados
- Formularios:
  - Solicitud de prueba
  - Alta de club
  - Solicitud de juez
- Plantillas para organizadores
- Histórico de versiones

---

### 21. Zona de Formación Online (Opcional)

**Estado:** ❌ No implementado

**Funcionalidades futuras:**
- Cursos online para guías
- Material para instructores
- Exámenes online
- Certificaciones digitales

---

### 22. Backoffice de Administración

**Estado:** ❌ No implementado

**Funcionalidades:**
- Gestión de usuarios
- Gestión de clubs
- Gestión de jueces
- Gestión de eventos
- Gestión de rankings
- Panel de revisión de contenidos
- Estadísticas y reportes

---

## Resumen de Estado

### ✅ Implementado (Básico)
- Inicio
- About/Sobre
- Events/Calendario
- Contacto
- Login/Register
- Dashboard básico
- Gestión de eventos (CRUD)

### ⚠️ Parcialmente Implementado
- Normativas (necesita contenido completo)
- Join/Participa (necesita contenido completo)

### ❌ No Implementado
- Qué es Nosework Trial
- Cómo empezar (completo)
- Competiciones
- Resultados
- Galerías
- Clubs (completo)
- Formación/Instructores
- Blog/Noticias
- Área privada completa
- Inscripciones online
- Paneles de clubes
- Módulo de jueces
- Rankings
- Licencias
- Documentos (completo)
- Backoffice

---

**Última actualización:** Enero 2025

