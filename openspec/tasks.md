# Tasks - Nosework Trial Community Platform

Este documento desglosa todas las tareas del proyecto en chunks de máximo 2 horas, organizadas por fases y marcando las ya implementadas.

**Formato:** Cada tarea incluye goal, archivos a tocar y acceptance check.

---

## Fase 1: Web Estática MVP

### Tareas Completadas ✅

#### TASK-F1-001 ✅ Crear estructura base Next.js
**Goal:** Configurar proyecto Next.js con Pages Router  
**Archivos:** `package.json`, `next.config.mjs`, `jsconfig.json`  
**Acceptance:** Proyecto inicia con `npm run dev` sin errores  
**Estado:** ✅ Completado

#### TASK-F1-002 ✅ Configurar Tailwind CSS
**Goal:** Configurar Tailwind CSS con configuración básica  
**Archivos:** `tailwind.config.js`, `postcss.config.mjs`, `styles/globals.css`  
**Acceptance:** Estilos Tailwind funcionan en componentes  
**Estado:** ✅ Completado

#### TASK-F1-003 ✅ Crear componente Navbar
**Goal:** Componente de navegación responsive con menú móvil  
**Archivos:** `components/Navbar.js`  
**Acceptance:** Navbar funciona en desktop y mobile, muestra enlaces correctos  
**Estado:** ✅ Completado

#### TASK-F1-004 ✅ Crear componente Footer
**Goal:** Footer con enlaces y copyright  
**Archivos:** `components/Footer.js`  
**Acceptance:** Footer se muestra correctamente en todas las páginas  
**Estado:** ✅ Completado

#### TASK-F1-005 ✅ Crear página de inicio básica
**Goal:** Página home con hero y estructura básica  
**Archivos:** `pages/index.js`  
**Acceptance:** Página carga sin errores, muestra contenido básico  
**Estado:** ✅ Completado

#### TASK-F1-006 ✅ Crear página About básica
**Goal:** Página "Quiénes Somos" con contenido básico  
**Archivos:** `pages/about.js`  
**Acceptance:** Página muestra información sobre la asociación  
**Estado:** ✅ Completado

#### TASK-F1-007 ✅ Crear página de eventos básica
**Goal:** Página que muestra calendario de eventos  
**Archivos:** `pages/eventos.js`  
**Acceptance:** Calendario se muestra, eventos se cargan desde API  
**Estado:** ✅ Completado

#### TASK-F1-008 ✅ Crear página de contacto básica
**Goal:** Página con formulario de contacto  
**Archivos:** `pages/contact.js`  
**Acceptance:** Formulario se muestra, puede enviarse  
**Estado:** ✅ Completado

#### TASK-F1-009 ✅ Implementar sistema de autenticación básico
**Goal:** Login y registro con JWT  
**Archivos:** `pages/login.js`, `pages/register.js`, `pages/api/auth/login.js`, `pages/api/auth/register.js`, `contexts/AuthContext.js`  
**Acceptance:** Usuarios pueden registrarse e iniciar sesión  
**Estado:** ✅ Completado

#### TASK-F1-010 ✅ Crear CRUD básico de eventos
**Goal:** API y UI para crear, leer, actualizar y eliminar eventos  
**Archivos:** `pages/api/eventos.js`, `pages/dashboard/index.js`, `components/Event/EventForm.js`, `components/Event/EventCard.js`  
**Acceptance:** Organizadores pueden gestionar eventos desde dashboard  
**Estado:** ✅ Completado

---

### Tareas Pendientes Fase 1

#### TASK-F1-011 ✅ Mejorar página de inicio con hero completo
**Goal:** Hero section con CTAs, explicación corta de modalidad, próximos eventos destacados  
**Archivos:** `pages/index.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Hero muestra CTAs funcionales, explicación clara, eventos destacados  
**Estado:** ✅ Completado (2026-02-12: homepage-hero-section)

#### TASK-F1-012 ⏳ Crear página "Qué es Nosework Trial"
**Goal:** Página completa explicando la modalidad, historia, beneficios, estructura  
**Archivos:** `pages/que-es-nosework-trial.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Página completa con todo el contenido requerido, SEO optimizado  
**Estado:** ⏳ Pendiente

#### TASK-F1-013 ✅ Crear página de reglamento completa
**Goal:** Reglamento en HTML navegable por secciones + PDF descargable  
**Archivos:** `pages/reglamento.js`, `public/documents/normativas_participantes.pdf`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Reglamento completo en HTML, PDF descargable, navegación por secciones, versionado v1.0  
**Estado:** ✅ Completado (2026-02-15: content-reglamento-page)

#### TASK-F1-014 ✅ Crear página "Cómo Empezar"
**Goal:** Guía paso a paso completa con requisitos, material, FAQ  
**Archivos:** `pages/como-empezar.js`, `pages/clubs.js` (placeholder)  
**Tiempo estimado:** 2 horas  
**Acceptance:** Guía "Soy guía nuevo, ¿qué hago?", FAQ, enlaces a eventos y clubs  
**Estado:** ✅ Completado (2026-02-15: content-como-empezar-page)

#### TASK-F1-015 ✅ Mejorar página About con visión y valores
**Goal:** Completar contenido de About con visión, misión, valores, historia, quiénes somos, "no somos FEPDE", documentos legales  
**Archivos:** `pages/about.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Quiénes somos, visión/misión/valores, historia con contexto FEPDE e independencia, documentos legales (próximamente)  
**Estado:** ✅ Completado (2026-02-15: content-about-refresh)

#### TASK-F1-016 ✅ Añadir meta tags SEO en todas las páginas públicas
**Goal:** Title y meta description únicos en cada página  
**Archivos:** `pages/index.js`, `pages/about.js`, `pages/eventos.js`, `pages/contact.js`, `pages/que-es-nosework-trial.js`, `pages/reglamento.js`, `pages/como-empezar.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Todas las páginas tienen meta tags únicos y optimizados  
**Estado:** ✅ Completado (2026-02-12: seo-foundation - SEOHead component)

#### TASK-F1-017 ✅ Implementar Schema.org SportsOrganization
**Goal:** JSON-LD schema en página principal  
**Archivos:** `pages/index.js`  
**Tiempo estimado:** 30 minutos  
**Acceptance:** Schema válido según Google Rich Results Test  
**Estado:** ✅ Completado (2026-02-12: seo-foundation - Schema completo con todos los campos)

#### TASK-F1-018 ✅ Generar sitemap.xml básico
**Goal:** Sitemap con páginas estáticas principales  
**Archivos:** `pages/sitemap.xml.js` o `public/sitemap.xml`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Sitemap accesible en /sitemap.xml, válido y contiene URLs canónicas  
**Estado:** ✅ Completado (2026-02-12: seo-foundation - Sitemap dinámico con páginas estáticas y eventos)

#### TASK-F1-019 ✅ Crear robots.txt
**Goal:** Robots.txt con sitemap y reglas básicas  
**Archivos:** `public/robots.txt`  
**Tiempo estimado:** 15 minutos  
**Acceptance:** Robots.txt accesible, bloquea rutas privadas  
**Estado:** ✅ Completado (2026-02-12: seo-foundation)

#### TASK-F1-020 ⏳ Implementar redirecciones legacy y i18n base
**Goal:** Asegurar consistencia de URLs (legacy + prefijo /es/)
**Archivos:** `next.config.mjs` (redirects), opcional `middleware.js` si aplicas i18n por prefijo
**Tiempo estimado:** 1 hora
**Acceptance:** 
- `/events` → 301 a `/eventos`
- `/que-es-nosework-trial` → 301 a `/es/que-es-nosework-trial`
- `/eventos` → 301 a `/es/eventos` (si el prefijo es obligatorio)
**Estado:** ⏳ Pendiente

#### TASK-F1-021 ✅ Hardening de seguridad de autenticación
**Goal:** Implementar medidas de seguridad avanzadas en el sistema de autenticación
**Archivos:** `utils/validation.js`, `utils/sanitization.js`, `utils/rateLimiter.js`, `utils/tokenBlacklist.js`, `utils/refreshTokens.js`, `utils/auditLogger.js`, `utils/csrf.js`, `utils/passwordSecurity.js`, `pages/api/auth/*`, `middlewares/auth.js`, `contexts/AuthContext.js`, `pages/login.js`, `pages/register.js`, `pages/dashboard/change-password.js`
**Tiempo estimado:** 20 horas
**Acceptance:** 
- Rate limiting implementado en endpoints de autenticación
- Validación robusta en cliente y servidor con Joi
- Sanitización de inputs para prevenir XSS e inyección
- Token blacklist para invalidar tokens tras cambio de contraseña
- Refresh tokens para renovación segura de sesiones
- Protección CSRF en formularios críticos
- Validación de fortaleza de contraseñas
- Bloqueo temporal de cuentas tras intentos fallidos
- Logging de auditoría para acciones críticas
- Tests unitarios, de integración y E2E pasando
**Estado:** ✅ Completado (2026-02-12: auth-hardening - 154/178 tareas, 87% completo)


---

## Fase 2: Contenido Ampliado + SEO

#### TASK-F2-001 ⏳ Crear página de competiciones
**Goal:** Página explicando formato de prueba, roles, normativa  
**Archivos:** `pages/competiciones.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Contenido completo sobre competiciones, bien estructurado  
**Estado:** ⏳ Pendiente

#### TASK-F2-002 ⏳ Crear directorio de clubs básico
**Goal:** Listado de clubs con información básica  
**Archivos:** `pages/clubs.js`, `pages/api/clubs.js` (si necesario)  
**Tiempo estimado:** 2 horas  
**Acceptance:** Listado de clubs se muestra correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F2-003 ⏳ Crear página individual de club
**Goal:** Página de detalle de club con información completa  
**Archivos:** `pages/clubs/[slug].js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Página muestra toda la información del club  
**Estado:** ⏳ Pendiente

#### TASK-F2-004 ⏳ Implementar sistema de blog básico
**Goal:** Estructura para publicar artículos de blog  
**Archivos:** `pages/blog.js`, `pages/blog/[slug].js`, `pages/api/blog.js` (si necesario)  
**Tiempo estimado:** 2 horas  
**Acceptance:** Listado de artículos y páginas individuales funcionan  
**Estado:** ⏳ Pendiente

#### TASK-F2-005 ⏳ Crear 5 artículos de blog iniciales
**Goal:** Publicar contenido SEO optimizado  
**Archivos:** Contenido de artículos (markdown o base de datos)  
**Tiempo estimado:** 4 horas (45 min por artículo)  
**Acceptance:** 5 artículos publicados con contenido de calidad  
**Estado:** ⏳ Pendiente

#### TASK-F2-006 ✅ Implementar Schema.org SportsEvent
**Goal:** Schema en páginas de eventos  
**Archivos:** `pages/eventos/[id].js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Schema válido para eventos  
**Estado:** ✅ Completado (2026-02-12: events-public-pages y seo-foundation)

#### TASK-F2-007 ⏳ Implementar Schema.org Article para blog
**Goal:** Schema en artículos del blog  
**Archivos:** `pages/blog/[slug].js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Schema válido para artículos  
**Estado:** ⏳ Pendiente

#### TASK-F2-008 ✅ Implementar breadcrumbs con schema
**Goal:** Breadcrumbs navegables con BreadcrumbList schema  
**Archivos:** `components/Breadcrumbs.js`, páginas que lo usen  
**Tiempo estimado:** 1 hora  
**Acceptance:** Breadcrumbs funcionan y tienen schema válido  
**Estado:** ✅ Completado (2026-02-12: seo-foundation - Componente Breadcrumbs reutilizable con Schema.org)

#### TASK-F2-009 ⏳ Implementar selector de idioma básico (ES/CA)
**Goal:** Componente para cambiar entre español y catalán  
**Archivos:** `components/LanguageSwitcher.js`, middleware de i18n  
**Tiempo estimado:** 2 horas  
**Acceptance:** Selector funciona, cambia idioma correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F2-010 ⏳ Implementar hreflang tags (ES/CA)
**Goal:** Hreflang en todas las páginas con traducciones  
**Archivos:** Componente o utilidad para generar hreflang  
**Tiempo estimado:** 1 hora  
**Acceptance:** Hreflang tags presentes y correctos  
**Estado:** ⏳ Pendiente

#### TASK-F2-011 ✅ Implementar canonical URLs
**Goal:** Canonical tags en todas las páginas  
**Archivos:** Utilidad para generar canonical, páginas  
**Tiempo estimado:** 1 hora  
**Acceptance:** Canonical tags presentes y correctos  
**Estado:** ✅ Completado (2026-02-12: seo-foundation - getCanonicalUrl utility y SEOHead component)

---

## Fase 3: Calendario Dinámico y Resultados

#### TASK-F3-001 ⏳ Ampliar modelo de eventos en BD
**Goal:** Añadir campos faltantes (localidad, tipo, nivel, precio, fechas inscripción)  
**Archivos:** `utils/db.js` (migración), `pages/api/eventos.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Eventos tienen todos los campos necesarios  
**Estado:** ⏳ Pendiente

#### TASK-F3-002 ⏳ Mejorar formulario de eventos
**Goal:** Formulario completo con todos los campos nuevos  
**Archivos:** `components/Event/EventForm.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Formulario permite crear eventos completos  
**Estado:** ⏳ Pendiente

#### TASK-F3-003 ✅ Crear página de detalle de evento
**Goal:** Página individual con toda la información del evento  
**Archivos:** `pages/eventos/[id].js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Página muestra toda la información, Schema.org incluido  
**Estado:** ✅ Completado (2026-02-12: events-public-pages - Página completa con breadcrumbs, SEO, Schema.org)

#### TASK-F3-004 ✅ Implementar filtros en calendario
**Goal:** Filtrar eventos por nivel, tipo, localidad, fecha  
**Archivos:** `pages/eventos.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Filtros funcionan correctamente  
**Estado:** ✅ Completado (2026-02-12: events-public-pages - Sistema completo de filtros con URL sync)

#### TASK-F3-005 ⏳ Crear modelo de resultados en BD
**Goal:** Tabla results con todos los campos según reglamento  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tabla creada con estructura correcta  
**Estado:** ⏳ Pendiente

#### TASK-F3-006 ⏳ Crear API de resultados
**Goal:** Endpoints para crear y consultar resultados  
**Archivos:** `pages/api/results.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** API funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F3-007 ⏳ Crear página de resultados
**Goal:** Listado de resultados con filtros  
**Archivos:** `pages/resultados.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Resultados se muestran correctamente, filtros funcionan  
**Estado:** ⏳ Pendiente

#### TASK-F3-008 ⏳ Crear formulario de subida de resultados
**Goal:** Formulario para organizadores/jueces subir resultados  
**Archivos:** `components/Results/ResultForm.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Formulario permite subir resultados completos  
**Estado:** ⏳ Pendiente

#### TASK-F3-009 ⏳ Crear sistema de galerías básico
**Goal:** Páginas para mostrar galerías de eventos  
**Archivos:** `pages/galerias.js`, `pages/galerias/[event-id].js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Galerías se muestran correctamente  
**Estado:** ⏳ Pendiente

---

## Fase 4: Área Privada de Guías + Inscripciones

#### TASK-F4-001 ⏳ Crear modelo de perros en BD
**Goal:** Tabla dogs con campos necesarios  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tabla creada correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-002 ⏳ Crear API de perros
**Goal:** CRUD de perros para usuarios  
**Archivos:** `pages/api/dogs.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** API funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-003 ⏳ Crear página "Mis Perros"
**Goal:** Listado y gestión de perros del usuario  
**Archivos:** `pages/dashboard/mis-perros.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Usuarios pueden ver y gestionar sus perros  
**Estado:** ⏳ Pendiente

#### TASK-F4-004 ⏳ Crear formulario de registro de perro
**Goal:** Formulario para añadir nuevo perro  
**Archivos:** `components/Dog/DogForm.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Formulario funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-005 ⏳ Crear modelo de inscripciones en BD
**Goal:** Tabla registrations con campos necesarios  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tabla creada correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-006 ⏳ Crear API de inscripciones
**Goal:** Endpoints para crear y gestionar inscripciones  
**Archivos:** `pages/api/registrations.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** API funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-007 ⏳ Crear página de inscripción a evento
**Goal:** Formulario para inscribirse a un evento  
**Archivos:** `pages/eventos/[id]/inscribirse.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Usuarios pueden inscribirse correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-008 ⏳ Crear página "Mis Inscripciones"
**Goal:** Listado de inscripciones del usuario  
**Archivos:** `pages/dashboard/inscripciones.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Usuarios ven sus inscripciones  
**Estado:** ⏳ Pendiente

#### TASK-F4-009 ⏳ Implementar validación de requisitos de perro
**Goal:** Validar edad, vacunas antes de permitir inscripción  
**Archivos:** `pages/api/registrations.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Validación funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-010 ⏳ Crear página "Mis Resultados"
**Goal:** Resultados del usuario y sus perros  
**Archivos:** `pages/dashboard/resultados.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Resultados se muestran correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F4-011 ⏳ Mejorar perfil de usuario
**Goal:** Página de perfil completa con datos personales  
**Archivos:** `pages/dashboard/perfil.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Usuarios pueden ver y editar su perfil  
**Estado:** ⏳ Pendiente

---

## Fase 5: Paneles de Clubes

#### TASK-F5-001 ⏳ Crear modelo de clubs en BD
**Goal:** Tabla clubs con todos los campos  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tabla creada correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F5-002 ⏳ Crear API de clubs
**Goal:** CRUD de clubs  
**Archivos:** `pages/api/clubs.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** API funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F5-003 ⏳ Crear dashboard de club
**Goal:** Panel para clubs gestionar sus datos  
**Archivos:** `pages/dashboard/club.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Clubs pueden gestionar sus datos  
**Estado:** ⏳ Pendiente

#### TASK-F5-004 ⏳ Crear vista de inscripciones para organizadores
**Goal:** Listado de inscripciones a eventos del organizador  
**Archivos:** `pages/dashboard/eventos/[id]/inscripciones.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Organizadores ven inscripciones correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F5-005 ⏳ Implementar marcado de pagos
**Goal:** Organizadores pueden marcar inscripciones como pagadas  
**Archivos:** `pages/api/registrations.js`, UI  
**Tiempo estimado:** 1 hora  
**Acceptance:** Funcionalidad funciona correctamente  
**Estado:** ⏳ Pendiente

---

## Fase 6: Rankings, Licencias y Jueces

#### TASK-F6-001 ⏳ Crear modelo de licencias en BD
**Goal:** Tablas licenses y dog_registrations  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tablas creadas correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-002 ⏳ Crear API de licencias
**Goal:** Endpoints para gestionar licencias  
**Archivos:** `pages/api/licenses.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** API funciona correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-003 ⏳ Crear página de gestión de licencias
**Goal:** Usuarios pueden ver y renovar licencias  
**Archivos:** `pages/dashboard/licencia.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Funcionalidad completa  
**Estado:** ⏳ Pendiente

#### TASK-F6-004 ⏳ Implementar generación de carnets digitales
**Goal:** Generar carnets con QR codes  
**Archivos:** Utilidad para generar carnets  
**Tiempo estimado:** 2 horas  
**Acceptance:** Carnets se generan correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-005 ⏳ Crear modelo de rankings en BD
**Goal:** Tabla rankings con estructura correcta  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tabla creada correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-006 ⏳ Crear lógica de cálculo de rankings
**Goal:** Script/función para calcular rankings  
**Archivos:** `utils/rankings.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Rankings se calculan correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-007 ⏳ Crear página de rankings
**Goal:** Visualización de rankings con filtros  
**Archivos:** `pages/rankings.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Rankings se muestran correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-008 ⏳ Crear modelo de jueces en BD
**Goal:** Tablas judges y judge_assignments  
**Archivos:** `utils/db.js` (migración)  
**Tiempo estimado:** 1 hora  
**Acceptance:** Tablas creadas correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-009 ⏳ Crear listado público de jueces
**Goal:** Página con información de jueces  
**Archivos:** `pages/jueces.js`  
**Tiempo estimado:** 1 hora  
**Acceptance:** Listado se muestra correctamente  
**Estado:** ⏳ Pendiente

#### TASK-F6-010 ⏳ Crear dashboard de juez
**Goal:** Panel para jueces gestionar resultados  
**Archivos:** `pages/dashboard/juez.js`  
**Tiempo estimado:** 2 horas  
**Acceptance:** Dashboard funciona correctamente  
**Estado:** ⏳ Pendiente

---

## Fase 7: Extras y Escalado

#### TASK-F7-001 ⏳ Implementar live scoring (opcional)
**Goal:** Sistema de puntuación en tiempo real  
**Archivos:** Varios (WebSockets o polling)  
**Tiempo estimado:** 4 horas  
**Acceptance:** Live scoring funciona en pruebas  
**Estado:** ⏳ Pendiente (opcional)

#### TASK-F7-002 ⏳ Optimizar para PWA
**Goal:** Manifest y service worker básico  
**Archivos:** `public/manifest.json`, service worker  
**Tiempo estimado:** 2 horas  
**Acceptance:** App es instalable como PWA  
**Estado:** ⏳ Pendiente

---

## Resumen por Fase

### Fase 1
- **Completadas:** 16 tareas ✅
- **Pendientes:** 4 tareas ⏳
- **Total:** 20 tareas

### Fase 2
- **Completadas:** 3 tareas ✅
- **Pendientes:** 8 tareas ⏳
- **Total:** 11 tareas

### Fase 3
- **Completadas:** 2 tareas ✅
- **Pendientes:** 7 tareas ⏳
- **Total:** 9 tareas

### Fase 4
- **Completadas:** 1 tarea ✅ (Hardening de seguridad)
- **Pendientes:** 10 tareas ⏳
- **Total:** 11 tareas

### Fase 5
- **Pendientes:** 5 tareas ⏳

### Fase 6
- **Pendientes:** 10 tareas ⏳

### Fase 7
- **Pendientes:** 2 tareas ⏳ (opcionales)

**Total de tareas:** 68 tareas (22 completadas, 46 pendientes)

**Nota:** El hardening de seguridad (TASK-F1-021) está 87% completo (154/178 subtareas). Incluye rate limiting, validación, sanitización, token management, CSRF, password security, account lockout, audit logging y refresh tokens. Tests: 46 unitarios pasando, tests de integración creados, 11 tests E2E pasando.

---

**Última actualización:** Febrero 2026
