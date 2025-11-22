# Fases de Desarrollo

Este documento detalla el roadmap completo del proyecto, organizado en fases con objetivos claros y entregables funcionales.

## Visión General

El proyecto se desarrolla en **fases incrementales**, comenzando con un MVP estático y evolucionando hacia una aplicación web completa con funcionalidades avanzadas de gestión federativa.

---

## Fase 0 – Branding y Arquitectura

**Duración estimada:** 1 semana  
**Estado:** ⚠️ Parcialmente completado

### Objetivo
Tener clara la identidad y la estructura del proyecto antes de comenzar el desarrollo.

### Tareas

#### 1. Definir Identidad
- [x] Nombre final de la modalidad: **Nosework Trial**
- [ ] Logotipo base
- [ ] Paleta de colores
- [ ] Tipografía
- [ ] Guía de estilo visual

#### 2. Definir Sitemap
- [x] Sitemap inicial del MVP estático
- [ ] Sitemap completo (fases avanzadas)
- [ ] Estructura de URLs

#### 3. Decidir Stack Técnico
- [x] Frontend: Next.js + React
- [x] Estilos: Tailwind CSS
- [x] Base de datos: SQLite (desarrollo) → PostgreSQL (producción)
- [x] Autenticación: JWT
- [ ] Backend futuro: Evaluar NestJS si escala

#### 4. Wireframes
- [ ] Wireframes básicos (papel/Figma)
- [ ] Prototipos de páginas principales
- [ ] Flujos de usuario

### Entregables
- ✅ Documento de arquitectura
- ✅ Documentación de estructura
- ⚠️ Wireframes (pendiente)
- ⚠️ Guía de estilo visual (pendiente)

---

## Fase 1 – Web Estática MVP

**Duración estimada:** 2-3 semanas  
**Estado:** ⚠️ En progreso (60% completado)

### Objetivo
Tener una web pública que explique la modalidad y se pueda enseñar a gente interesada.

### Páginas a Implementar

#### ✅ Completadas
- [x] Inicio (básico)
- [x] Sobre la Asociación (básico)
- [x] Contacto (básico)
- [x] Calendario/Eventos (básico)

#### ⚠️ Necesitan Mejoras
- [ ] **Inicio**
  - Mejorar hero con CTAs claros
  - Añadir explicación corta de la modalidad
  - Mejorar sección de próximos eventos
  - Añadir logos de patrocinadores

- [ ] **Sobre la Asociación**
  - Completar visión y valores
  - Añadir historia
  - Mejorar diseño

#### ❌ Pendientes
- [ ] **Qué es Nosework Trial** (`/que-es-nosework-trial`)
  - Historia de la disciplina
  - Beneficios
  - Estructura del deporte
  - Diferencias con otras modalidades

- [ ] **Reglamento** (`/reglamento`)
  - PDF descargable
  - Versión HTML por secciones
  - Histórico de versiones

- [ ] **Cómo Empezar** (`/como-empezar`)
  - Guía paso a paso
  - Requisitos mínimos
  - Material básico
  - Cómo encontrar club/entrenador
  - FAQ

### Tareas Técnicas

- [ ] Mejorar SEO básico en todas las páginas
- [ ] Optimizar imágenes
- [ ] Asegurar responsive 100%
- [ ] Configurar dominio y SSL
- [ ] Deploy inicial

### Entregable
**Web online, responsive, ligera y rápida, con dominio propio y SSL, que ya puedes compartir.**

---

## Fase 2 – Contenido Ampliado + SEO Base

**Duración estimada:** 2-3 semanas  
**Estado:** ❌ No iniciado

### Objetivo
Empezar a posicionar en Google y dar una imagen más "federativa".

### Contenido a Añadir

#### 1. Sección Competiciones
- [ ] Página `/competiciones`
- [ ] Explicación del formato de trial
- [ ] Qué se espera del guía y del perro
- [ ] Roles: organizador, juez, comisarios, staff
- [ ] Normativa para organizadores (resumen)

#### 2. Sección Clubs y Centros
- [ ] Mejorar página `/clubs`
- [ ] Base de datos de clubs
- [ ] Fichas individuales de clubs
- [ ] Mapa de ubicaciones
- [ ] Páginas individuales `/clubs/[slug]`

#### 3. Sección Noticias/Blog
- [ ] Sistema de blog básico
- [ ] Páginas `/blog` y `/blog/[slug]`
- [ ] CMS básico o markdown
- [ ] 3-5 artículos SEO iniciales:
  - "Qué es el nosework deportivo"
  - "Cómo empezar en Nosework Trial paso a paso"
  - "Cómo preparar a tu perro para su primera competición"
  - "Material básico para practicar deportes de olfato"
  - "Ejercicios de nosework en casa"

#### 4. Optimización SEO On-Page
- [ ] Titles optimizados en todas las páginas
- [ ] Meta descriptions únicas
- [ ] H1/H2 estructurados
- [ ] URLs amigables
- [ ] Schema.org básico:
  - `SportsOrganization` para la organización
  - `Event` para cada prueba del calendario
- [ ] Sitemap.xml
- [ ] Robots.txt optimizado
- [ ] Imágenes con alt text

#### 5. Mejoras de Contenido
- [ ] Completar todas las páginas del MVP
- [ ] Añadir más imágenes
- [ ] Mejorar textos y copywriting

### Entregable
**Versión 2 de la web donde ya apareces en búsquedas de nicho y das sensación de proyecto serio y en crecimiento.**

---

## Fase 3 – Calendario Dinámico y Resultados

**Duración estimada:** 2-3 semanas  
**Estado:** ❌ No iniciado

### Objetivo
Que la web refleje actividad deportiva real.

### Funcionalidades

#### 1. Módulo de Eventos Mejorado
- [ ] Ampliar base de datos de eventos:
  - Localidad
  - Club organizador
  - Tipo de prueba
  - Nivel
  - Estado (abierto/cerrado inscripciones)
  - Precio
  - Información adicional
- [ ] Panel mínimo para crear pruebas (admin/organizador)
- [ ] Listado dinámico "Próximos eventos"
- [ ] Listado "Eventos pasados"
- [ ] Vista de detalle de evento
- [ ] Filtros y búsqueda

#### 2. Página de Resultados
- [ ] Página `/resultados`
- [ ] Sistema de subida de resultados
- [ ] Formatos:
  - PDFs
  - Tablas HTML
  - Datos estructurados (JSON)
- [ ] Listado por año
- [ ] Listado por prueba
- [ ] Búsqueda por perro/guía

#### 3. Galerías
- [ ] Página `/galerias`
- [ ] Sistema de álbumes
- [ ] Integración con:
  - Google Drive
  - Flickr
  - YouTube
  - Instagram
- [ ] Organización por prueba/año

#### 4. Mejoras de Base de Datos
- [ ] Migrar a PostgreSQL (producción)
- [ ] Esquema completo:
  ```sql
  - events (ampliado)
  - results
  - galleries
  - clubs (completo)
  ```

### Entregable
**Los deportistas pueden consultar fácilmente dónde competir y resultados pasados.**

---

## Fase 4 – Área Privada de Guías + Inscripciones Online Simple

**Duración estimada:** 3-4 semanas  
**Estado:** ⚠️ Base implementada (20%)

### Objetivo
Empezar a funcionar como verdadera app web.

### Funcionalidades

#### 1. Registro y Login Mejorado
- [x] Registro básico
- [x] Login básico
- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] Validación robusta (Joi/Yup)
- [ ] Términos y condiciones

#### 2. Perfil de Guía
- [ ] Página `/dashboard/perfil`
- [ ] Datos personales:
  - Nombre completo
  - Email
  - Teléfono
  - Dirección
  - Foto de perfil
- [ ] Licencia de guía:
  - Número de licencia
  - Fecha de emisión
  - Fecha de vencimiento
  - Estado
- [ ] Estado de membresía

#### 3. Gestión de Perros
- [ ] Página `/dashboard/mis-perros`
- [ ] Listado de perros
- [ ] Ficha individual:
  - Nombre
  - Fecha de nacimiento
  - Raza
  - Nº de licencia
  - Foto
  - Historial deportivo
  - Títulos obtenidos
- [ ] CRUD completo (crear, editar, eliminar)

#### 4. Inscripción Online a Pruebas
- [ ] Página `/inscripcion/[id-prueba]`
- [ ] Seleccionar perro
- [ ] Seleccionar categoría
- [ ] Seleccionar nivel
- [ ] Información adicional
- [ ] Confirmación
- [ ] Generar listado de inscritos para organizador

#### 5. Mis Inscripciones
- [ ] Página `/dashboard/inscripciones`
- [ ] Próximas pruebas
- [ ] Historial de competiciones
- [ ] Resultados personales
- [ ] Títulos obtenidos

#### 6. Pagos (Inicialmente Manual)
- [ ] Sistema de pagos manual:
  - Transferencia bancaria
  - Bizum
  - PayPal (manual)
- [ ] Marcar pago recibido (organizador)
- [ ] Confirmación de pago (guía)
- [ ] Preparar para integración TPV (Fase 5)

### Mejoras de Base de Datos
```sql
-- Nuevas tablas
- dogs (perros)
- registrations (inscripciones)
- payments (pagos)
- user_profiles (perfiles de usuario)
```

### Entregable
**Sistema donde los guías se inscriben online y tú/los clubs ya no gestionáis todo por WhatsApp y Excel.**

---

## Fase 5 – Paneles de Clubes y Organizadores

**Duración estimada:** 3-4 semanas  
**Estado:** ❌ No iniciado

### Objetivo
Descentralizar la gestión hacia clubs.

### Funcionalidades

#### 1. Rol "Club/Organizador"
- [ ] Sistema de roles mejorado
- [ ] Registro de clubs
- [ ] Aprobación de clubs (admin)
- [ ] Asignar usuarios a clubs

#### 2. Panel de Club
- [ ] Página `/dashboard/club`
- [ ] Editar datos del club:
  - Nombre
  - Localidad
  - Contacto
  - Web/redes
  - Logo
- [ ] Crear/editar pruebas propias
- [ ] Ver inscripciones a sus pruebas
- [ ] Marcar pagos recibidos
- [ ] Subir resultados
- [ ] Gestión de jueces asignados
- [ ] Estadísticas del club

#### 3. Gestión de Pruebas (Club)
- [ ] Crear prueba completa:
  - Fechas
  - Localidad
  - Precios
  - Categorías
  - Niveles
  - Fechas de inscripción
- [ ] Editar prueba
- [ ] Cerrar/abrir inscripciones
- [ ] Exportar listado de inscritos

#### 4. Integración de Pagos Online
- [ ] Integrar TPV:
  - Stripe
  - RedSys
  - PayPal
- [ ] Procesamiento automático
- [ ] Confirmaciones automáticas
- [ ] Reembolsos

### Mejoras de Base de Datos
```sql
-- Nuevas tablas
- clubs (completo)
- club_members (miembros de club)
- judges (jueces)
- judge_assignments (asignaciones)
```

### Entregable
**Los clubs gestionan sus pruebas y la federación/organización revisa desde un panel central.**

---

## Fase 6 – Rankings, Licencias y Jueces

**Duración estimada:** 3-4 semanas  
**Estado:** ❌ No iniciado

### Objetivo
Completar el ecosistema federativo.

### Funcionalidades

#### 1. Módulo de Licencias
- [ ] Página `/dashboard/licencias`
- [ ] Gestión de licencias de guía:
  - Número de licencia
  - Fecha de emisión
  - Fecha de vencimiento
  - Estado
  - Renovación
- [ ] Registros de perros:
  - Número de registro
  - Datos del perro
  - Estado
- [ ] Pago y renovación de licencias
- [ ] Carnet digital:
  - Carnet de guía (PDF con QR)
  - Carnet de perro (PDF con QR)
  - Descarga

#### 2. Rankings Oficial
- [ ] Página `/ranking`
- [ ] Rankings por:
  - Perro
  - Guía
  - Club
  - Año/temporada
- [ ] Filtros:
  - Por nivel
  - Por tipo de prueba
  - Por categoría
  - Por rango de fechas
- [ ] Página de títulos:
  - Títulos obtenidos
  - Certificaciones
  - Historial

#### 3. Módulo de Jueces
- [ ] Listado público de jueces (`/jueces`)
- [ ] Perfil de juez (`/jueces/[id]`):
  - Biografía
  - Zona de actuación
  - Idiomas
  - Pruebas juzgadas
- [ ] Panel privado de juez (`/dashboard/juez`):
  - Acceso a documentos internos
  - Subir actas de resultados
  - Introducir puntuaciones (preparar para live scoring)

#### 4. Sistema de Puntuación
- [ ] Cálculo automático de puntos
- [ ] Actualización de rankings
- [ ] Asignación de títulos
- [ ] Notificaciones de logros

### Mejoras de Base de Datos
```sql
-- Nuevas tablas
- licenses (licencias)
- dog_registrations (registros de perros)
- rankings (rankings calculados)
- titles (títulos obtenidos)
- judge_profiles (perfiles de jueces)
```

### Entregable
**Sistema completo: ya tenéis estructura tipo federación moderna de deporte canino.**

---

## Fase 7 – Extras y Escalado

**Duración estimada:** 4-6 semanas  
**Estado:** ❌ No iniciado

### Objetivo
Funcionalidades avanzadas y optimización.

### Funcionalidades Opcionales

#### 1. Live Scoring en Pruebas
- [ ] Sistema de puntuación en tiempo real
- [ ] App móvil para jueces
- [ ] Visualización pública de resultados
- [ ] Notificaciones push

#### 2. Zona de Formación Online
- [ ] Plataforma de cursos online
- [ ] Material para instructores
- [ ] Exámenes online
- [ ] Certificaciones digitales
- [ ] Integración con plataforma de cursos externa (si existe)

#### 3. App Móvil (PWA)
- [ ] Convertir web en PWA
- [ ] Funcionalidades offline
- [ ] Notificaciones push
- [ ] Acceso rápido a:
  - Calendario
  - Rankings
  - Licencias
  - Inscripciones

#### 4. Mejoras de UX/UI
- [ ] Búsqueda global
- [ ] Filtros avanzados
- [ ] Mejoras de accesibilidad
- [ ] Modo oscuro
- [ ] Internacionalización (i18n):
  - Español
  - Catalán (opcional)

#### 5. Analytics y Reportes
- [ ] Dashboard de estadísticas (admin)
- [ ] Reportes de actividad
- [ ] Analytics de uso
- [ ] Exportación de datos

#### 6. Optimizaciones
- [ ] Cache avanzado (Redis)
- [ ] CDN para assets
- [ ] Optimización de imágenes
- [ ] Lazy loading
- [ ] Code splitting avanzado

#### 7. Seguridad Avanzada
- [ ] Rate limiting
- [ ] Validación robusta
- [ ] Auditoría de seguridad
- [ ] Backup automático
- [ ] Disaster recovery

### Entregable
**Sistema completo, optimizado y escalable, listo para crecimiento.**

---

## Resumen de Fases

| Fase | Duración | Estado | Prioridad |
|------|----------|--------|-----------|
| Fase 0 | 1 semana | ⚠️ Parcial | Alta |
| Fase 1 | 2-3 semanas | ⚠️ 60% | **Crítica** |
| Fase 2 | 2-3 semanas | ❌ | Alta |
| Fase 3 | 2-3 semanas | ❌ | Media |
| Fase 4 | 3-4 semanas | ⚠️ 20% | Alta |
| Fase 5 | 3-4 semanas | ❌ | Media |
| Fase 6 | 3-4 semanas | ❌ | Media |
| Fase 7 | 4-6 semanas | ❌ | Baja |

**Total estimado:** 19-28 semanas (5-7 meses)

---

## Priorización

### Crítico (Hacer Ahora)
1. Completar Fase 1 (MVP estático)
2. Iniciar Fase 2 (SEO y contenido)

### Importante (Próximos 2-3 meses)
3. Fase 3 (Calendario y resultados)
4. Fase 4 (Área privada e inscripciones)

### Deseable (Mediano plazo)
5. Fase 5 (Paneles de clubes)
6. Fase 6 (Rankings y licencias)

### Opcional (Largo plazo)
7. Fase 7 (Extras y escalado)

---

**Última actualización:** Enero 2025

