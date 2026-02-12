# Sitemap - Nosework Trial Community Platform

Este documento define la estructura completa de URLs y navegación del sitio, incluyendo estrategia de i18n y reglas canónicas.

**Dominio base:** `https://noseworktrialcommunity.com` (o dominio final)  
**Idiomas soportados:** ES (default), CA, EN, EU  
**Estrategia i18n:** Prefijo de idioma en URL (`/es/`, `/ca/`, `/en/`, `/eu/`)

---

## Páginas Públicas

### Estructura Base (Español - Default)

#### Navegación Principal

```
/                                    → Inicio (Home)
/que-es-nosework-trial               → Qué es Nosework Trial
/reglamento                          → Reglamento oficial
/como-empezar                        → Cómo empezar (guía)
/competiciones                       → Información sobre competiciones
/eventos                             → Eventos y calendario
/resultados                          → Resultados de competiciones
/clubs                               → Directorio de clubs
/clubs/[slug]                        → Página individual de club
/formacion                           → Formación e instructores
/blog                                → Blog/Noticias
/blog/[slug]                         → Artículo individual del blog
/documentos                          → Documentos y recursos descargables
/about                               → Sobre la asociación
/contact                             → Contacto
```

### Páginas de Autenticación

```
/login                               → Iniciar sesión
/register                            → Registro de usuario
/forgot-password                     → Recuperar contraseña (Fase 4)
/reset-password                      → Restablecer contraseña (Fase 4)
```

### Área Privada (Dashboard)

**Regla de aterrizaje por rol**
- user (guía): /dashboard
- organizador: /dashboard/eventos
- administrador: /dashboard/usuarios
- juez: /dashboard/eventos-asignados


#### Dashboard de Guía (User)

```
/dashboard                            → Dashboard principal
/dashboard/perfil                     → Mi perfil
/dashboard/mis-perros                 → Mis perros
/dashboard/mis-perros/[slug]           → Ficha de perro individual
/dashboard/inscripciones              → Mis inscripciones
/dashboard/inscripciones/[slug]        → Detalle de inscripción
/dashboard/resultados                 → Mis resultados
/dashboard/licencia                   → Mi licencia
/dashboard/carnet                     → Carnet digital
```

#### Dashboard de Organizador

```
/dashboard                            → Dashboard organizador
/dashboard/eventos                     → Mis eventos
/dashboard/eventos/nuevo              → Crear evento
/dashboard/eventos/[slug]               → Editar evento
/dashboard/eventos/[slug]/inscripciones → Inscripciones del evento
/dashboard/eventos/[slug]/resultados    → Subir resultados
/dashboard/club                       → Gestión de mi club (si aplica)
```

#### Dashboard de Administrador

```
/dashboard                            → Dashboard admin
/dashboard/usuarios                    → Gestión de usuarios
/dashboard/clubs                      → Gestión de clubs
/dashboard/eventos                     → Gestión de todos los eventos
/dashboard/jueces                     → Gestión de jueces
/dashboard/rankings                   → Gestión de rankings
/dashboard/contenido                  → Gestión de contenido (blog, documentos)
/dashboard/estadisticas                → Estadísticas y reportes
```

#### Dashboard de Juez (Fase 6)

```
/dashboard                            → Dashboard juez
/dashboard/eventos-asignados          → Eventos asignados
/dashboard/eventos/[slug]/resultados   → Introducir resultados
/dashboard/documentos                 → Documentos internos
```

---

## Estrategia de Internacionalización (i18n)

### Estructura de URLs con i18n

**Opción seleccionada:** Prefijo de idioma en URL

```
/es/                                 → Español (default)
/ca/                                 → Catalán
/en/                                 → Inglés
/eu/                                 → Euskera
```

### Implementación

#### URLs sin prefijo (Legacy)
Las URLs sin prefijo existen solo como compatibilidad y deben redirigir 301 a su equivalente con /es/.

/                                    → 301 a /es/
/que-es-nosework-trial                → 301 a /es/que-es-nosework-trial
/reglamento                           → 301 a /es/reglamento


#### URLs con prefijo de idioma

```
/es/que-es-nosework-trial           → Español
/ca/que-es-nosework-trial           → Catalán
/en/que-es-nosework-trial           → Inglés
/eu/que-es-nosework-trial           → Euskera
```

### Reglas Canónicas

#### Canonical URLs

- **Español (default):** Siempre con prefijo `/es/`
- **Otros idiomas:** Con prefijo `/ca/`, `/en/`, `/eu/`
- **Las URLs sin prefijo:** Deben redirigir 301 a /es/

**Ejemplo:**
```html
<!-- En página /es/que-es-nosework-trial -->
<link rel="canonical" href="https://noseworktrialcommunity.com/es/que-es-nosework-trial" />


<!-- En página /ca/que-es-nosework-trial -->
<link rel="canonical" href="https://noseworktrialcommunity.com/ca/que-es-nosework-trial" />
```

#### Hreflang Tags

Todas las páginas deben incluir hreflang para SEO multilingüe:

```html
<link rel="alternate" hreflang="es" href="https://noseworktrialcommunity.com/es/que-es-nosework-trial" />
<link rel="alternate" hreflang="ca" href="https://noseworktrialcommunity.com/ca/que-es-nosework-trial" />
<link rel="alternate" hreflang="en" href="https://noseworktrialcommunity.com/en/que-es-nosework-trial" />
<link rel="alternate" hreflang="eu" href="https://noseworktrialcommunity.com/eu/que-es-nosework-trial" />
<link rel="alternate" hreflang="x-default" href="https://noseworktrialcommunity.com/es/que-es-nosework-trial" />
```

### Fallback de Idioma

- Si una traducción no existe, mostrar contenido en español (idioma por defecto)
- Mostrar banner/nota indicando que el contenido está en español

---

## Rutas Dinámicas

### Eventos

```
/eventos                             → Listado de eventos
/eventos/[slug]                      → Detalle de evento
/eventos/[slug]/inscribirse          → Inscripción a evento (requiere auth)
```

### Clubs

```
/clubs                               → Directorio de clubs
/clubs/[slug]                        → Página individual de club
/clubs/[slug]/eventos                → Eventos del club
```

### Resultados

```
/resultados                          → Listado de resultados
/resultados/[evento-id]              → Resultados de un evento específico
/resultados/perro/[dog-id]           → Resultados de un perro
/resultados/guia/[handler-id]        → Resultados de un guía
```

### Rankings

```
/rankings                            → Rankings principales
/rankings/perros                     → Ranking por perros
/rankings/guias                      → Ranking por guías
/rankings/clubs                      → Ranking por clubs
/rankings/[year]                     → Rankings por año
/rankings/[year]/[season]            → Rankings por temporada
```

### Blog

```
/blog                                → Listado de artículos
/blog/[slug]                         → Artículo individual
/blog/categoria/[category]           → Artículos por categoría
/blog/tag/[tag]                      → Artículos por tag
```

---

## Rutas de API

Todas las rutas de API están bajo `/api` y no requieren i18n:

```
/api/auth/login
/api/auth/register
/api/events
/api/events/[slug]
/api/registrations
/api/results
/api/dogs
/api/clubs
/api/rankings
...
```

---

## Sitemap XML

### Estructura del Sitemap

El sitemap.xml debe generarse dinámicamente e incluir:

1. **Páginas estáticas** (todas las versiones de idioma)
2. **Eventos** (públicos y futuros)
3. **Clubs** (activos)
4. **Artículos del blog** (publicados)
5. **Páginas de resultados** (por evento)

### Prioridades y Frecuencias

```
/                                    → priority: 1.0, changefreq: daily
/que-es-nosework-trial              → priority: 0.9, changefreq: monthly
/reglamento                          → priority: 0.9, changefreq: monthly
/como-empezar                        → priority: 0.8, changefreq: monthly
/eventos                             → priority: 0.8, changefreq: daily
/eventos/[slug]                        → priority: 0.7, changefreq: weekly
/clubs                               → priority: 0.7, changefreq: weekly
/blog                                → priority: 0.7, changefreq: daily
/blog/[slug]                         → priority: 0.6, changefreq: monthly
/resultados                          → priority: 0.6, changefreq: daily
```

### Generación del Sitemap

**Next.js:** Usar `next-sitemap` o generar dinámicamente en `/pages/sitemap.xml.js`

**Ejemplo:**
```javascript
// pages/sitemap.xml.js
export default function Sitemap() {
  // Generar sitemap dinámicamente
  // Incluir todas las URLs públicas con sus variantes de idioma
}
```

---

## Robots.txt

```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /admin/

# Sitemaps
Sitemap: https://noseworktrialcommunity.com/sitemap.xml
Sitemap: https://noseworktrialcommunity.com/sitemap-events.xml
Sitemap: https://noseworktrialcommunity.com/sitemap-blog.xml
```

---

## Navegación y Menús

### Menú Principal (Navbar)

**Páginas públicas:**
- Inicio
- Qué es
- Reglamento
- Cómo Empezar
- Eventos
- Clubs
- Blog
- Contacto

**Selector de idioma:** Dropdown con banderas/idiomas disponibles

**Usuario autenticado:**
- Menú principal (igual)
- Dropdown "Mi Cuenta" con:
  - Mi Perfil
  - Mis Perros
  - Mis Inscripciones
  - Mis Resultados
  - Mi Licencia
  - Cerrar Sesión

**Organizador:**
- Menú principal
- Dropdown "Mi Cuenta"
- Enlace "Dashboard Organizador"

**Administrador:**
- Menú principal
- Dropdown "Mi Cuenta"
- Enlace "Panel Administración"

### Menú Footer

**Secciones:**
- Enlaces rápidos (mismo menú principal)
- Información legal:
  - Política de Privacidad
  - Términos y Condiciones
  - Cookies
- Redes sociales
- Contacto
- Selector de idioma

---

## Breadcrumbs

Todas las páginas deben incluir breadcrumbs para SEO y navegación:

```
Inicio > Qué es Nosework Trial
Inicio > Eventos > Prueba Barcelona 2025
Inicio > Clubs > Club Nosework Barcelona
Inicio > Blog > Categoría > Artículo
Inicio > Resultados > Evento > Resultados
```

---

## Redirecciones y URLs Legacy

### Redirecciones 301

Si se cambian URLs en el futuro, mantener redirecciones:

```
/normativas → /reglamento
/participa → /como-empezar
/comunidad → /clubs
/about → /es/sobre
/contact → /es/contacto
/events → /es/eventos
```

### Manejo de URLs con IDs vs Slugs

**Preferencia:** Usar slugs siempre que sea posible

```
/clubs/club-nosework-barcelona    ✅ Preferido
/clubs/1                          ❌ Evitar (pero soportar para compatibilidad)
```

---

## Estado de Implementación

### ✅ Implementadas

- `/` - Inicio
- `/about` - Sobre
- `/events` - Eventos
- `/contact` - Contacto
- `/login` - Login
- `/register` - Registro
- `/dashboard` - Dashboard básico

### ⚠️ Parcialmente Implementadas

- `/normativas` → Debe redirigir a `/reglamento`

### ❌ Pendientes

- `/que-es-nosework-trial`
- `/reglamento` (versión completa)
- `/como-empezar`
- `/competiciones`
- `/resultados`
- `/clubs`
- `/clubs/[slug]`
- `/formacion`
- `/blog`
- `/blog/[slug]`
- `/documentos`
- Todas las rutas de dashboard avanzadas
- Implementación de i18n completa

---

## Consideraciones Técnicas

### Next.js Pages Router

- Usar `getStaticPaths` y `getStaticProps` para páginas estáticas
- Usar `getServerSideProps` para contenido dinámico
- Implementar middleware para detección de idioma y redirección

### Middleware de Idioma

```javascript
// middleware.js
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Detectar idioma preferido del navegador
  // Redirigir a versión correcta si es necesario
  // Mantener español como default
}
```

### Generación de Sitemap

- Generar sitemap.xml dinámicamente
- Incluir todas las variantes de idioma
- Actualizar automáticamente cuando se crean nuevos eventos/blog posts

---

**Última actualización:** Enero 2025
