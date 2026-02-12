# Requirements - Nosework Trial Community Platform

Este documento define todos los requisitos funcionales y no funcionales del proyecto, organizados por módulos y fases de desarrollo.

**Leyenda de Prioridades:**
- **[P0]**: Crítico - Bloquea MVP o funcionalidad esencial
- **[P1]**: Importante - Necesario para experiencia completa
- **[P2]**: Deseable - Mejora la experiencia pero no bloquea

**Fases:** F1 (MVP estático) → F7 (Ecosistema completo)

---

## 1. Requisitos Funcionales

### 1.1 Módulo: Contenido Público y Páginas Estáticas

#### 1.1.1 Página de Inicio
- **REQ-F-001** [P0] [F1] La página de inicio debe mostrar un hero con nombre de la modalidad "Nosework Trial", claim "Deporte de perros detectores y nosework deportivo" y CTAs hacia "Cómo empezar" y "Ver reglamento"
- **REQ-F-002** [P0] [F1] La página de inicio debe incluir una explicación corta de qué es la modalidad, para quién está dirigida y diferencias con otras disciplinas (FEPDE, nosework clásico, AKC Scent Work)
- **REQ-F-003** [P1] [F1] La página de inicio debe mostrar los próximos eventos destacados (3-5 eventos)
- **REQ-F-004** [P2] [F1] La página de inicio debe incluir una sección de logos de patrocinadores/partners (puede mostrar "Próximamente" inicialmente)

#### 1.1.2 Página "Qué es Nosework Trial"
- **REQ-F-005** [P0] [F1] La página debe explicar la historia de la disciplina, su origen e inspiración (detección deportiva, nosework, scent work)
- **REQ-F-006** [P0] [F1] La página debe listar los beneficios para el perro (confianza, trabajo mental, ejercicio, para todas las razas/edades) y para el guía (vínculo, actividad compartida, comunidad)
- **REQ-F-007** [P0] [F1] La página debe explicar la estructura del deporte: niveles (Base y Avanzado), categorías y tipos de búsqueda
- **REQ-F-008** [P0] [F1] La página debe explicar las diferencias frente a otras modalidades (FEPDE, AKC Scent Work, NACSW, nosework clásico)
- **REQ-F-009** [P1] [F2] La página debe incluir imágenes y vídeos ilustrativos

#### 1.1.3 Página de Reglamento
- **REQ-F-010** [P0] [F1] La página debe ofrecer el reglamento general en formato PDF descargable
- **REQ-F-011** [P0] [F1] La página debe mostrar el reglamento en versión HTML por secciones navegables
- **REQ-F-012** [P0] [F1] El reglamento HTML debe incluir sección de niveles/grados (Base y Avanzado) con requisitos de cada nivel
- **REQ-F-013** [P0] [F1] El reglamento HTML debe incluir sección de tipos de búsqueda (interior, exterior, vehículos, contenedores)
- **REQ-F-014** [P0] [F1] El reglamento HTML debe incluir sección de sistema de puntuación explicando cómo se puntúa, penalizaciones y tiempos límite
- **REQ-F-015** [P0] [F1] El reglamento HTML debe incluir sección de código ético y bienestar del perro
- **REQ-F-016** [P1] [F1] La página debe mostrar histórico de versiones del reglamento con fechas de cambios y changelog
- **REQ-F-017** [P0] [F1] El reglamento debe reflejar que los niveles son "Base" y "Avanzado" (no grados numéricos)
- **REQ-F-018** [P0] [F1] El reglamento debe especificar que los olores son: Kong + aceite esencial de salvia; en avanzado puede añadirse olor de referencia
- **REQ-F-019** [P0] [F1] El reglamento debe especificar que la marca mínima es de 3 segundos
- **REQ-F-020** [P0] [F1] El reglamento debe explicar que la evaluación incluye: sistemática, focalización, intensidad (+ impresión general), con coeficientes ajustables por organizador si se anuncia
- **REQ-F-021** [P0] [F1] El reglamento debe indicar que perros con problemas de comportamiento pueden participar avisando previamente
- **REQ-F-022** [P0] [F1] El reglamento debe especificar que juez/organizador puede sancionar (p.ej. 6 meses) y puede tener ayudantes
- **REQ-F-023** [P0] [F1] El reglamento debe indicar que no hay pódiums; sí reconocimientos alternativos

#### 1.1.4 Página "Cómo Empezar"
- **REQ-F-024** [P0] [F1] La página debe incluir una guía paso a paso "Soy guía nuevo, ¿qué hago?"
- **REQ-F-025** [P0] [F1] La página debe listar los requisitos mínimos para competir (edad del perro, vacunas, comportamiento)
- **REQ-F-026** [P0] [F1] La página debe listar el material básico necesario (arnés, correa, etc.)
- **REQ-F-027** [P0] [F1] La página debe explicar cómo encontrar un club/entrenador
- **REQ-F-028** [P1] [F1] La página debe incluir una sección FAQ con preguntas frecuentes

#### 1.1.5 Página "Sobre la Asociación"
- **REQ-F-029** [P0] [F1] La página debe explicar quiénes son (equipo promotor, fundadores)
- **REQ-F-030** [P0] [F1] La página debe incluir visión, misión y valores
- **REQ-F-031** [P0] [F1] La página debe incluir la historia (por qué nace la modalidad, contexto respecto a FEPDE, nosework, etc.)
- **REQ-F-032** [P1] [F1] La página debe incluir enlaces a estatutos/documentos legales (si existen)

#### 1.1.6 Página de Contacto
- **REQ-F-033** [P0] [F1] La página debe incluir un formulario de contacto funcional
- **REQ-F-034** [P0] [F1] La página debe mostrar email de contacto y redes sociales
- **REQ-F-035** [P1] [F1] La página debe mostrar ubicación principal (si existe)

### 1.2 Módulo: Eventos y Calendario

#### 1.2.1 Calendario de Eventos
- **REQ-F-036** [P0] [F1] El sistema debe mostrar un calendario con eventos programados
- **REQ-F-037** [P0] [F1] Cada evento debe mostrar: nombre, fecha, localidad y club organizador
- **REQ-F-038** [P1] [F1] El calendario debe permitir filtrar por fecha, localidad y tipo de evento
- **REQ-F-039** [P1] [F2] El calendario debe mostrar eventos pasados y futuros por separado
- **REQ-F-040** [P2] [F2] El calendario debe permitir exportar eventos a calendario personal (iCal)

#### 1.2.2 Gestión de Eventos (CRUD)
- **REQ-F-041** [P0] [F3] Los organizadores deben poder crear eventos con campos: fecha, título, descripción, localidad, tipo, nivel, precio, fechas de inscripción
- **REQ-F-042** [P0] [F3] Los organizadores deben poder editar sus propios eventos
- **REQ-F-043** [P0] [F3] Los organizadores deben poder eliminar sus propios eventos
- **REQ-F-044** [P0] [F3] Los administradores deben poder gestionar todos los eventos
- **REQ-F-045** [P1] [F3] Los eventos deben tener estados: 'open', 'closed', 'cancelled'
- **REQ-F-046** [P1] [F3] Los eventos deben poder asociarse a un club organizador

### 1.3 Módulo: Competiciones

#### 1.3.1 Información de Competiciones
- **REQ-F-047** [P0] [F2] Debe existir una página que explique el formato de prueba Nosework Trial
- **REQ-F-048** [P0] [F2] La página debe explicar qué se espera del guía y del perro en un trial
- **REQ-F-049** [P0] [F2] La página debe explicar los roles: organizador, juez, comisarios, staff
- **REQ-F-050** [P1] [F2] La página debe incluir normativa específica para organizadores de pruebas (versión resumida con enlace al documento completo)

### 1.4 Módulo: Resultados

#### 1.4.1 Visualización de Resultados
- **REQ-F-051** [P0] [F3] Debe existir una página de resultados con listado por año y por prueba
- **REQ-F-052** [P0] [F3] Los resultados deben mostrar enlaces a clasificaciones finales (PDF o HTML)
- **REQ-F-053** [P1] [F3] Los resultados deben poder filtrarse por nivel (Base/Avanzado), tipo de prueba, fecha y club
- **REQ-F-054** [P1] [F3] Los resultados deben mostrar información de cada participante: perro, guía, puntuación, tiempo, posición

#### 1.4.2 Modelo de Datos de Resultados (Reglas del Deporte)
- **REQ-F-055** [P0] [F3] El modelo de resultados debe soportar nivel: Base o Avanzado
- **REQ-F-056** [P0] [F3] El modelo de resultados debe almacenar puntuaciones por criterios: sistemática, focalización, intensidad, impresión general
- **REQ-F-057** [P0] [F3] El modelo de resultados debe permitir coeficientes ajustables por organizador (si se anuncian)
- **REQ-F-058** [P0] [F3] El modelo de resultados debe almacenar tiempo de marca mínima (3 segundos)
- **REQ-F-059** [P0] [F3] El modelo de resultados debe almacenar notas del juez
- **REQ-F-060** [P0] [F3] El sistema NO debe mostrar pódiums tradicionales
- **REQ-F-061** [P0] [F3] El sistema debe soportar reconocimientos alternativos (no pódiums)

#### 1.4.3 Gestión de Resultados
- **REQ-F-062** [P0] [F3] Los organizadores deben poder subir resultados de sus eventos (PDF o datos estructurados)
- **REQ-F-063** [P0] [F3] Los jueces deben poder introducir resultados directamente en el sistema
- **REQ-F-064** [P1] [F5] Los jueces deben poder introducir puntuaciones en directo durante la prueba (live scoring)

### 1.5 Módulo: Galerías

#### 1.5.1 Visualización de Galerías
- **REQ-F-065** [P0] [F3] Debe existir una página de galerías con álbumes de fotos/vídeos por trial
- **REQ-F-066** [P0] [F3] Las galerías deben poder enlazar a Drive, Flickr, YouTube, Instagram
- **REQ-F-067** [P1] [F3] Las galerías deben mostrar thumbnail y descripción

### 1.6 Módulo: Clubs y Centros

#### 1.6.1 Directorio de Clubs
- **REQ-F-068** [P0] [F2] Debe existir un directorio de clubs que practican Nosework Trial
- **REQ-F-069** [P0] [F2] Cada club debe tener una ficha con: nombre, localidad, contacto, web/redes
- **REQ-F-070** [P0] [F2] Cada club debe mostrar su nivel de integración (si organizan pruebas, si tienen instructores certificados, etc.)
- **REQ-F-071** [P1] [F2] El directorio debe incluir un mapa con ubicaciones de clubs
- **REQ-F-072** [P1] [F2] El directorio debe permitir filtrar por localidad y tipo de servicios

#### 1.6.2 Gestión de Clubs
- **REQ-F-073** [P0] [F5] Los clubs deben poder gestionar sus datos (nombre, contacto, descripción, logo)
- **REQ-F-074** [P0] [F5] Los clubs deben poder crear y editar pruebas propias
- **REQ-F-075** [P0] [F5] Los clubs deben poder ver inscripciones a sus pruebas
- **REQ-F-076** [P0] [F5] Los clubs deben poder subir resultados de sus pruebas

### 1.7 Módulo: Formación e Instructores

#### 1.7.1 Información de Formación
- **REQ-F-077** [P1] [F2] Debe existir una página que explique el programa de instructores (aunque sea aspiracional inicialmente)
- **REQ-F-078** [P1] [F2] La página debe explicar los niveles de certificación
- **REQ-F-079** [P1] [F2] La página debe mostrar listado de instructores acreditados (cuando existan)

### 1.8 Módulo: Blog/Noticias

#### 1.8.1 Sistema de Blog
- **REQ-F-080** [P0] [F2] Debe existir una sección de blog/noticias
- **REQ-F-081** [P0] [F2] El blog debe permitir publicar artículos sobre: explicaciones técnicas, crónicas de eventos, cambios de reglamento
- **REQ-F-082** [P1] [F2] El blog debe soportar categorías y tags
- **REQ-F-083** [P1] [F2] El blog debe permitir comentarios (opcional, moderados)

### 1.9 Módulo: Autenticación y Usuarios

#### 1.9.1 Registro y Login
- **REQ-F-084** [P0] [F4] El sistema debe permitir registro de usuarios (guías)
- **REQ-F-085** [P0] [F4] El sistema debe permitir login con email y contraseña
- **REQ-F-086** [P0] [F4] El sistema debe usar JWT para autenticación
- **REQ-F-087** [P0] [F4] El sistema debe usar bcrypt para hash de contraseñas
- **REQ-F-088** [P0] [F4] El sistema debe soportar roles: user (guía), organizador, administrador, juez (futuro)
- **REQ-F-089** [P1] [F4] El sistema debe permitir recuperación de contraseña

#### 1.9.2 Perfiles de Usuario
- **REQ-F-090** [P0] [F4] Los usuarios deben poder ver y editar su perfil (datos personales)
- **REQ-F-091** [P0] [F4] Los usuarios deben poder gestionar sus perros (alta, edición, baja)
- **REQ-F-092** [P0] [F4] Cada perro debe tener: nombre, fecha nacimiento, raza, nº de licencia (cuando exista), historial deportivo
- **REQ-F-093** [P1] [F4] Los usuarios deben poder subir foto de perfil y de perros

### 1.10 Módulo: Inscripciones

#### 1.10.1 Sistema de Inscripciones
- **REQ-F-094** [P0] [F4] Los guías deben poder inscribirse online a pruebas disponibles
- **REQ-F-095** [P0] [F4] Al inscribirse, el guía debe seleccionar perro y categoría/nivel
- **REQ-F-096** [P0] [F4] El sistema debe generar confirmación automática por email
- **REQ-F-097** [P0] [F4] El sistema debe generar listado de inscritos para el organizador
- **REQ-F-098** [P0] [F4] El sistema debe validar que el perro cumple requisitos (edad, vacunas) antes de permitir inscripción
- **REQ-F-099** [P0] [F4] El sistema debe permitir que guías indiquen si su perro tiene problemas de comportamiento (requisito del reglamento)
- **REQ-F-100** [P1] [F4] El sistema debe permitir cancelación de inscripción con políticas de reembolso

#### 1.10.2 Pagos
- **REQ-F-101** [P0] [F4] El sistema debe mostrar precio de inscripción por evento
- **REQ-F-102** [P1] [F4] El sistema debe integrar pasarela de pago online (Stripe/RedSys/PayPal)
- **REQ-F-103** [P0] [F4] Inicialmente, el sistema debe permitir pagos manuales (transferencia, bizum) con confirmación manual del organizador

### 1.11 Módulo: Licencias

#### 1.11.1 Gestión de Licencias
- **REQ-F-104** [P0] [F6] El sistema debe gestionar licencias de guía (número, estado de vigencia, fecha de emisión/renovación)
- **REQ-F-105** [P0] [F6] El sistema debe gestionar registros de perros (número de licencia, estado de vigencia)
- **REQ-F-106** [P0] [F6] El sistema debe permitir pago y renovación de licencias
- **REQ-F-107** [P1] [F6] El sistema debe generar carnet digital de guía con QR
- **REQ-F-108** [P1] [F6] El sistema debe generar carnet digital de perro con QR
- **REQ-F-109** [P1] [F6] El sistema debe permitir descarga de carnets en PDF

### 1.12 Módulo: Rankings

#### 1.12.1 Sistema de Rankings
- **REQ-F-110** [P0] [F6] El sistema debe generar rankings por perro (anual, por temporada)
- **REQ-F-111** [P0] [F6] El sistema debe generar rankings por guía (anual, por temporada)
- **REQ-F-112** [P0] [F6] El sistema debe generar rankings por club (anual, por temporada)
- **REQ-F-113** [P1] [F6] Los rankings deben poder filtrarse por nivel (Base/Avanzado), tipo de prueba, fecha
- **REQ-F-114** [P1] [F6] El sistema debe mostrar página de títulos obtenidos (equivalente a "titling" en otras organizaciones)

### 1.13 Módulo: Jueces

#### 1.13.1 Gestión de Jueces
- **REQ-F-115** [P0] [F6] Debe existir un listado público de jueces con biografía, zona, idiomas
- **REQ-F-116** [P0] [F6] Los jueces deben tener acceso a documentos internos (panel privado)
- **REQ-F-117** [P0] [F6] Los jueces deben poder subir actas de resultados
- **REQ-F-118** [P1] [F6] Los jueces deben poder introducir puntuaciones en directo (live scoring)
- **REQ-F-119** [P0] [F6] El sistema debe permitir que jueces/organizadores registren sanciones (p.ej. 6 meses) según reglamento
- **REQ-F-120** [P0] [F6] El sistema debe permitir que jueces registren ayudantes asignados a pruebas

### 1.14 Módulo: Documentos y Recursos

#### 1.14.1 Descargas
- **REQ-F-121** [P0] [F2] Debe existir una sección de documentos descargables: reglamentos actualizados, formularios (solicitud de prueba, alta de club, solicitud de juez), plantillas para organizadores
- **REQ-F-122** [P1] [F2] Debe existir histórico de versiones de reglamento (como hace FCI/FCI Agility)

### 1.15 Módulo: Backoffice Administración

#### 1.15.1 Panel de Administración
- **REQ-F-123** [P0] [F5] Los administradores deben poder gestionar usuarios (ver, editar, eliminar, cambiar roles)
- **REQ-F-124** [P0] [F5] Los administradores deben poder gestionar clubs (aprobar, editar, eliminar)
- **REQ-F-125** [P0] [F5] Los administradores deben poder gestionar jueces (aprobar, editar, eliminar)
- **REQ-F-126** [P0] [F5] Los administradores deben poder gestionar eventos (aprobar, editar, eliminar)
- **REQ-F-127** [P0] [F5] Los administradores deben poder gestionar rankings
- **REQ-F-128** [P1] [F5] Los administradores deben poder revisar contenidos (noticias, reglamentos) antes de publicación
- **REQ-F-129** [P1] [F5] Los administradores deben poder ver estadísticas y reportes

### 1.16 Módulo: Internacionalización (i18n)

#### 1.16.1 Soporte Multilingüe
- **REQ-F-130** [P0] [F2] El sistema debe soportar español (ES) como idioma por defecto
- **REQ-F-131** [P1] [F2] El sistema debe soportar catalán (CA) como segundo idioma
- **REQ-F-132** [P2] [F7] El sistema debe soportar inglés (EN) y euskera (EU)
- **REQ-F-133** [P0] [F2] El sistema debe incluir selector de idioma en la interfaz
- **REQ-F-134** [P0] [F2] El sistema debe usar URLs con prefijo de idioma (/es/, /ca/) o parámetro de idioma
- **REQ-F-135** [P0] [F2] El sistema debe tener fallback a español si traducción no existe

---

## 2. Requisitos No Funcionales

### 2.1 Rendimiento

- **REQ-NF-001** [P0] [F1] La web debe tener Core Web Vitals optimizados (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **REQ-NF-002** [P0] [F1] Las páginas públicas deben cargar en menos de 2 segundos en conexión 3G
- **REQ-NF-003** [P0] [F1] El sitio debe usar SSG/SSR adecuado según tipo de contenido (estático vs dinámico)
- **REQ-NF-004** [P1] [F2] Las imágenes deben estar optimizadas (WebP, lazy loading, tamaños responsive)
- **REQ-NF-005** [P1] [F3] Las consultas a base de datos deben estar optimizadas con índices apropiados

### 2.2 Seguridad

- **REQ-NF-006** [P0] [F1] ✅ Los secrets (JWT secret, DB credentials) deben estar en variables de entorno, nunca en código
- **REQ-NF-007** [P0] [F1] ✅ Todas las contraseñas deben estar hasheadas con bcrypt (mínimo 10 rounds)
- **REQ-NF-008** [P0] [F1] ✅ Todas las entradas de usuario deben ser validadas y sanitizadas (2026-02-12: auth-hardening)
- **REQ-NF-009** [P0] [F1] ✅ Las API routes deben implementar rate limiting mínimo (p.ej. 100 req/min por IP) (2026-02-12: auth-hardening - 5 intentos/15min login, 3/hora registro)
- **REQ-NF-010** [P0] [F1] El sitio debe usar HTTPS en producción
- **REQ-NF-011** [P0] [F1] ✅ Las rutas protegidas deben verificar autenticación y autorización por roles
- **REQ-NF-012** [P1] [F2] ✅ El sistema debe implementar protección CSRF en formularios (2026-02-12: auth-hardening)
- **REQ-NF-013** [P1] [F2] ✅ El sistema debe implementar validación de entrada en cliente y servidor (2026-02-12: auth-hardening - Joi schemas)

### 2.3 Escalabilidad

- **REQ-NF-014** [P1] [F3] La base de datos debe estar preparada para migración de SQLite a PostgreSQL
- **REQ-NF-015** [P1] [F5] El sistema debe soportar al menos 1000 usuarios concurrentes
- **REQ-NF-016** [P2] [F7] El sistema debe estar preparado para escalar horizontalmente si es necesario

### 2.4 Accesibilidad

- **REQ-NF-017** [P0] [F1] El sitio debe cumplir WCAG 2.1 nivel AA para páginas públicas
- **REQ-NF-018** [P0] [F1] Todas las imágenes deben tener texto alternativo descriptivo
- **REQ-NF-019** [P0] [F1] El sitio debe ser navegable completamente con teclado
- **REQ-NF-020** [P0] [F1] El sitio debe tener contraste de color adecuado (mínimo 4.5:1 para texto normal)
- **REQ-NF-021** [P1] [F1] El sitio debe ser compatible con lectores de pantalla

### 2.5 Usabilidad

- **REQ-NF-022** [P0] [F1] El sitio debe ser completamente responsive (móvil, tablet, desktop)
- **REQ-NF-023** [P0] [F1] La navegación debe ser intuitiva y clara
- **REQ-NF-024** [P0] [F1] Los formularios deben tener validación en tiempo real y mensajes de error claros
- **REQ-NF-025** [P1] [F2] El sitio debe tener búsqueda funcional (al menos en blog y eventos)

### 2.6 Mantenibilidad

- **REQ-NF-026** [P0] [F1] ✅ El código debe seguir convenciones de Next.js y React
- **REQ-NF-027** [P0] [F1] ✅ El código debe estar documentado con comentarios donde sea necesario (2026-02-12: docs/SECURITY.md creado)
- **REQ-NF-028** [P1] [F2] ✅ El proyecto debe tener tests unitarios para funciones críticas (auth, API) (2026-02-12: 46 tests unitarios pasando)
- **REQ-NF-029** [P1] [F2] ✅ El proyecto debe tener tests de integración para flujos principales (2026-02-12: tests de integración creados y pasando)


### 2.7 Loggs

- **REQ-NF-030** [P0][F4] El sistema debe registrar logs de auditoría para acciones críticas (creación eventos, pagos, sanciones, cambios de rol)
- **REQ-NF-031** [P1][F5] El sistema debe mantener historial de cambios de datos sensibles
- **REQ-NF-032** [P1][F5] Los administradores deben poder consultar logs de actividad

### 2.8 Más seguridad

- **REQ-NF-033** [P0][F4] El sistema debe invalidar JWT tras cambio de contraseña
- **REQ-NF-034** [P1][F5] El sistema debe permitir 2FA para administradores y jueces

### 2.9 Más escalabilidad

- **REQ-NF-035** [P1][F3] El sistema debe implementar caché para endpoints públicos de eventos y resultados


---

## 3. Requisitos Legales y de Cumplimiento

### 3.1 Protección de Datos (GDPR/LOPDGDD)

- **REQ-L-001** [P0] [F1] El sitio debe mostrar política de privacidad accesible
- **REQ-L-002** [P0] [F1] El sitio debe mostrar política de cookies si se usan cookies de tracking
- **REQ-L-003** [P0] [F1] El sistema debe obtener consentimiento explícito para procesamiento de datos personales
- **REQ-L-004** [P0] [F1] Los usuarios deben poder acceder, rectificar y eliminar sus datos personales
- **REQ-L-005** [P0] [F1] El sistema debe registrar consentimientos de usuarios
- **REQ-L-006** [P1] [F2] El sistema debe permitir exportación de datos personales en formato estándar
- **REQ-L-007** [P1] [F2] El sistema debe implementar derecho al olvido (eliminación completa de datos)

### 3.2 Términos y Condiciones

- **REQ-L-008** [P0] [F1] El sitio debe mostrar términos y condiciones de uso
- **REQ-L-009** [P0] [F4] Los usuarios deben aceptar términos y condiciones al registrarse

### 3.3 Propiedad Intelectual

- **REQ-L-010** [P0] [F1] El sitio debe mostrar información de copyright y propiedad intelectual
- **REQ-L-011** [P0] [F1] El reglamento y contenido oficial debe estar claramente marcado como propiedad de Nosework Trial Community

---

## 4. Requisitos de Analytics y SEO

### 4.1 SEO On-Page

- **REQ-SEO-001** [P0] [F1] Todas las páginas deben tener title tag único y descriptivo (máx. 60 caracteres)
- **REQ-SEO-002** [P0] [F1] Todas las páginas deben tener meta description única (máx. 160 caracteres)
- **REQ-SEO-003** [P0] [F1] Todas las páginas deben tener H1 único y descriptivo
- **REQ-SEO-004** [P0] [F1] Las URLs deben ser amigables y descriptivas (sin IDs, con palabras clave)
- **REQ-SEO-005** [P0] [F1] El sitio debe tener sitemap.xml generado automáticamente
- **REQ-SEO-006** [P0] [F1] El sitio debe tener robots.txt configurado correctamente
- **REQ-SEO-007** [P0] [F1] El sitio debe implementar schema.org JSON-LD para SportsOrganization
- **REQ-SEO-008** [P0] [F2] El sitio debe implementar schema.org JSON-LD para SportsEvent en cada evento
- **REQ-SEO-009** [P0] [F2] El sitio debe implementar canonical URLs para evitar contenido duplicado
- **REQ-SEO-010** [P1] [F2] El sitio debe implementar hreflang tags para versiones multilingües (ES, CA)

### 4.2 Contenido SEO

- **REQ-SEO-011** [P0] [F2] El sitio debe tener al menos 5 páginas pilar optimizadas para keywords principales:
  - "nosework trial"
  - "nosework deportivo"
  - "deporte olfato canino"
  - "perros detectores deporte"
  - "nosework trial España"
- **REQ-SEO-012** [P0] [F2] El blog debe tener al menos 5 artículos SEO optimizados para long-tail keywords
- **REQ-SEO-013** [P1] [F2] El contenido debe incluir enlaces internos estratégicos entre páginas relacionadas

### 4.3 Analytics

- **REQ-SEO-014** [P1] [F2] Si se implementa Google Analytics, debe requerir consentimiento de cookies (GDPR)
- **REQ-SEO-015** [P1] [F2] El sistema debe poder medir métricas básicas: páginas vistas, eventos, conversiones (inscripciones)

---

## Resumen de Requisitos por Fase

### Fase 1 (MVP Estático)
- **Funcionales:** 35 requisitos [P0]
- **No Funcionales:** 11 requisitos [P0]
- **Legales:** 4 requisitos [P0]
- **SEO:** 7 requisitos [P0]
- **Total F1:** 57 requisitos críticos

### Fase 2 (Contenido + SEO)
- **Funcionales:** 15 requisitos adicionales [P0-P1]
- **No Funcionales:** 4 requisitos adicionales [P1]
- **Legales:** 3 requisitos adicionales [P1]
- **SEO:** 6 requisitos adicionales [P0-P1]
- **Total F2:** 28 requisitos adicionales

### Fase 3 (Calendario Dinámico + Resultados)
- **Funcionales:** 20 requisitos adicionales [P0-P1]
- **No Funcionales:** 1 requisito adicional [P1]
- **Total F3:** 21 requisitos adicionales

### Fase 4 (Área Privada + Inscripciones)
- **Funcionales:** 20 requisitos adicionales [P0-P1]
- **Legales:** 1 requisito adicional [P0]
- **Total F4:** 21 requisitos adicionales

### Fase 5 (Paneles de Clubes)
- **Funcionales:** 7 requisitos adicionales [P0-P1]
- **No Funcionales:** 1 requisito adicional [P1]
- **Total F5:** 8 requisitos adicionales

### Fase 6 (Rankings + Licencias + Jueces)
- **Funcionales:** 17 requisitos adicionales [P0-P1]
- **Total F6:** 17 requisitos adicionales

### Fase 7 (Extras)
- **Funcionales:** 2 requisitos adicionales [P2]
- **No Funcionales:** 1 requisito adicional [P2]
- **Total F7:** 3 requisitos adicionales

---

**Última actualización:** Enero 2025  
**Total de requisitos documentados:** 135 requisitos funcionales + 29 no funcionales + 11 legales + 15 SEO = **190 requisitos**
