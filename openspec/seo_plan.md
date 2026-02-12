# SEO Plan - Nosework Trial Community Platform

Este documento define la estrategia completa de SEO, incluyendo meta tags, schema.org, sitemap, canonical/hreflang y plan de contenido inicial.

**Objetivo SEO:** Ser la referencia en español para "nosework deportivo", "deporte olfato canino", "perros detectores deporte" y "nosework trial España".

---

## Meta Tags y Titles

### Patrón de Titles

**Formato:** `[Título Página] – [Marca] | [Contexto Opcional]`

**Longitud:** Máximo 60 caracteres (Google muestra ~50-60)

### Patrón de Meta Descriptions

**Formato:** Descripción clara y atractiva con call-to-action implícito

**Longitud:** Máximo 160 caracteres (Google muestra ~150-160)

---

## Templates de Meta Tags por Tipo de Página

### Página Principal (Home)

**Title:**
```
Nosework Trial – Deporte de olfato canino
```

**Meta Description:**
```
Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato. Pruebas oficiales, reglamento, calendario de competiciones y clubs en España.
```

---

### Página "Qué es Nosework Trial"

**Title:**
```
Qué es Nosework Trial – Nosework deportivo para todos los perros
```

**Meta Description:**
```
Conoce en detalle qué es Nosework Trial, cómo funciona el nosework deportivo, qué tipos de pruebas hay y qué perros pueden practicar este deporte de olfato.
```

---

### Página "Reglamento"

**Title:**
```
Reglamento Nosework Trial – Normativa oficial 2025
```

**Meta Description:**
```
Consulta el reglamento oficial de Nosework Trial. Normativa completa, niveles Base y Avanzado, tipos de búsqueda, sistema de puntuación y código ético.
```

---

### Página "Cómo Empezar"

**Title:**
```
Cómo Empezar en Nosework Trial – Guía para Principiantes 2025
```

**Meta Description:**
```
Guía completa para empezar en Nosework Trial. Requisitos, material necesario, cómo encontrar un club y preparar a tu perro para su primera competición.
```

---

### Página de Eventos

**Title:**
```
Calendario de Eventos Nosework Trial – Pruebas y Competiciones 2025
```

**Meta Description:**
```
Consulta el calendario completo de eventos y competiciones de Nosework Trial. Encuentra pruebas cerca de ti e inscríbete online.
```

---

### Página de Club Individual

**Title:**
```
[Nombre Club] – Club Nosework Trial en [Ciudad]
```

**Meta Description:**
```
[Descripción breve del club]. Entrenamientos, competiciones y formación en Nosework Trial. Contacta y únete a nuestro club.
```

---

### Artículo de Blog

**Title:**
```
[Título del Artículo] – Nosework Trial Community
```

**Meta Description:**
```
[Resumen del artículo en 1-2 frases]. Lee más sobre nosework deportivo y entrenamiento de perros detectores.
```

---

## Schema.org JSON-LD

### SportsOrganization (Organización Principal)

**Ubicación:** Todas las páginas principales (en `<head>`)

```json
{
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Nosework Trial Community",
  "alternateName": "NTC",
  "description": "Organización deportiva de Nosework Trial en España. Promovemos el nosework deportivo como modalidad inclusiva para todos los perros y sus guías.",
  "url": "https://noseworktrialcommunity.com",
  "logo": "https://noseworktrialcommunity.com/logo.png",
  "sport": "Nosework Trial",
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "sameAs": [
    "https://www.facebook.com/noseworktrialcommunity",
    "https://www.instagram.com/noseworktrialcommunity"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contacto@noseworktrialcommunity.com",
    "contactType": "customer service"
  }
}
```

---

### SportsEvent (Eventos)

**Ubicación:** Página de detalle de evento (`/eventos/[id]`)

```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "[Título del Evento]",
  "description": "[Descripción del evento]",
  "startDate": "2025-03-15T10:00:00+01:00",
  "endDate": "2025-03-15T18:00:00+01:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://noseworktrialcommunity.com/es/eventos/[id]",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "[Nombre del lugar]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[Dirección]",
      "addressLocality": "[Ciudad]",
      "postalCode": "[Código postal]",
      "addressCountry": "ES"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "[Nombre del club organizador]"
  },
  "sport": "Nosework Trial",
  "offers": {
    "@type": "Offer",
    "price": "25.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://noseworktrialcommunity.com/eventos/[id]/inscribirse"
  }
}
```

---

### Article (Artículos de Blog)

**Ubicación:** Páginas de artículos (`/blog/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Título del artículo]",
  "description": "[Descripción/Resumen]",
  "image": "[URL de imagen destacada]",
  "datePublished": "2025-01-15T10:00:00+01:00",
  "dateModified": "2025-01-15T10:00:00+01:00",
  "author": {
    "@type": "Person",
    "name": "[Nombre del autor]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nosework Trial Community",
    "logo": {
      "@type": "ImageObject",
      "url": "https://noseworktrialcommunity.com/logo.png"
    }
  }
}
```

---

### BreadcrumbList

**Ubicación:** Todas las páginas con profundidad > 1

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://noseworktrialcommunity.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Eventos",
      "item": "https://noseworktrialcommunity.com/eventos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Título del Evento]",
      "item": "https://noseworktrialcommunity.com/eventos/[id]"
    }
  ]
}
```

---

## Sitemap y Robots.txt

### Sitemap.xml

**Estructura:**

1. **Sitemap principal** (`/sitemap.xml`)
   - Páginas estáticas principales
   - Enlaces a sitemaps secundarios

2. **Sitemap de eventos** (`/sitemap-events.xml`)
   - Eventos públicos y futuros
   - Actualización: Diaria

3. **Sitemap de blog** (`/sitemap-blog.xml`)
   - Artículos publicados
   - Actualización: Semanal

4. **Sitemap de clubs** (`/sitemap-clubs.xml`)
   - Clubs activos
   - Actualización: Semanal

**Generación:**

Usar `next-sitemap` o generar dinámicamente:

```javascript
// pages/sitemap.xml.js
export default function Sitemap() {
  // Generar sitemap dinámicamente
  // Incluir todas las URLs públicas
}
```

**Prioridades:**

- `/` → 1.0
- `/que-es-nosework-trial` → 0.9
- `/reglamento` → 0.9
- `/como-empezar` → 0.8
- `/eventos` → 0.8
- `/eventos/[id]` → 0.7
- `/clubs` → 0.7
- `/blog` → 0.7
- `/blog/[slug]` → 0.6

---

### Robots.txt

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
Sitemap: https://noseworktrialcommunity.com/sitemap-clubs.xml
```

---

## Canonical y Hreflang

### Canonical URLs

**Regla (i18n):** el canonical SIEMPRE incluye prefijo de idioma.  
**Redirecciones:** cualquier URL sin prefijo debe redirigir 301 a `/es/...`.

**Español (default):**
```html
<link rel="canonical" href="https://noseworktrialcommunity.com/es/que-es-nosework-trial" />
```

**Otros idiomas:**
```html
<link rel="canonical" href="https://noseworktrialcommunity.com/ca/que-es-nosework-trial" />
```

---

### Hreflang Tags

**Implementación:** Todas las páginas con traducciones

```html
<link rel="alternate" hreflang="es" href="https://noseworktrialcommunity.com/es/que-es-nosework-trial" />
<link rel="alternate" hreflang="ca" href="https://noseworktrialcommunity.com/ca/que-es-nosework-trial" />
<link rel="alternate" hreflang="en" href="https://noseworktrialcommunity.com/en/que-es-nosework-trial" />
<link rel="alternate" hreflang="eu" href="https://noseworktrialcommunity.com/eu/que-es-nosework-trial" />
<link rel="alternate" hreflang="x-default" href="https://noseworktrialcommunity.com/es/que-es-nosework-trial" />
```

**Nota:** `x-default` apunta a `/es/` como idioma por defecto.

---

## Plan de Contenido Inicial

### 5 Páginas Pilar (Pillar Pages)

#### 1. Qué es Nosework Trial (`/que-es-nosework-trial`)

**Keywords objetivo:**
- "qué es nosework deportivo"
- "nosework trial españa"
- "deporte olfato canino"
- "nosework perros"

**Contenido:**
- Historia y origen
- Beneficios para perros y guías
- Estructura del deporte (niveles Base y Avanzado)
- Diferencias con otras modalidades
- Para quién está dirigido

**Longitud:** 2000-3000 palabras

---

#### 2. Reglamento (`/reglamento`)

**Keywords objetivo:**
- "reglamento nosework"
- "normativa nosework trial"
- "reglas nosework deportivo"

**Contenido:**
- Reglamento completo por secciones
- Niveles y requisitos
- Sistema de puntuación
- Código ético

**Longitud:** 3000-4000 palabras

---

#### 3. Cómo Empezar (`/como-empezar`)

**Keywords objetivo:**
- "cómo empezar nosework"
- "cómo iniciar detección deportiva"
- "empezar nosework con mi perro"

**Contenido:**
- Guía paso a paso
- Requisitos mínimos
- Material necesario
- Cómo encontrar club
- FAQ

**Longitud:** 2000-2500 palabras

---

#### 4. Competiciones (`/competiciones`)

**Keywords objetivo:**
- "competiciones nosework"
- "pruebas nosework españa"
- "eventos nosework trial"

**Contenido:**
- Formato de prueba
- Qué esperar
- Roles (organizador, juez, etc.)
- Normativa para organizadores

**Longitud:** 1500-2000 palabras

---

#### 5. Clubs y Centros (`/clubs`)

**Keywords objetivo:**
- "clubs nosework españa"
- "donde entrenar nosework"
- "centros nosework trial"

**Contenido:**
- Directorio de clubs
- Cómo encontrar un club
- Qué buscar en un club
- Niveles de integración

**Longitud:** 1500-2000 palabras

---

### 5 Artículos de Blog Iniciales

#### 1. "Ejercicios de nosework en casa para empezar en Nosework Trial"

**Keywords:** "ejercicios nosework en casa", "juegos olfato perro", "entrenar nosework casa"

**Longitud:** 1500-2000 palabras

**Estructura:**
- Introducción
- Material básico necesario
- 5-7 ejercicios paso a paso
- Consejos de seguridad
- Progresión hacia competición

---

#### 2. "Guía completa: Cómo preparar a tu perro para su primera competición de nosework"

**Keywords:** "preparar perro competición nosework", "primera prueba nosework"

**Longitud:** 2000-2500 palabras

**Estructura:**
- Preparación física y mental
- Entrenamiento específico
- Qué esperar el día de la prueba
- Consejos para guías principiantes

---

#### 3. "Diferencias entre Nosework Trial, FEPDE y otras modalidades de detección deportiva"

**Keywords:** "nosework trial vs fepde", "diferencias detección deportiva"

**Longitud:** 2000-2500 palabras

**Estructura:**
- Comparativa detallada
- Cuándo elegir cada modalidad
- Requisitos y niveles

---

#### 4. "Beneficios del nosework deportivo para perros mayores y con problemas de comportamiento"

**Keywords:** "nosework perros mayores", "nosework problemas comportamiento"

**Longitud:** 1500-2000 palabras

**Estructura:**
- Beneficios específicos
- Adaptaciones necesarias
- Casos de éxito

---

#### 5. "Crónica: Primera competición oficial de Nosework Trial en España"

**Keywords:** "competición nosework trial", "evento nosework españa"

**Longitud:** 1000-1500 palabras

**Estructura:**
- Resumen del evento
- Resultados destacados
- Testimonios
- Fotos y vídeos

---

## Mapa de Enlaces Internos

### Estrategia

Cada página debe enlazar a:
- Páginas relacionadas (mínimo 3-5 enlaces internos)
- Páginas pilar relevantes
- Artículos de blog relacionados

### Ejemplo: Artículo de Blog

**Enlaces internos a incluir:**
- "Qué es Nosework Trial" (página pilar)
- "Cómo Empezar" (página pilar)
- "Reglamento" (página pilar)
- Otros artículos relacionados (2-3)
- "Clubs" (si menciona entrenamiento)

### Ejemplo: Página de Evento

**Enlaces internos a incluir:**
- "Cómo Empezar" (para nuevos participantes)
- "Reglamento" (normativa)
- Club organizador (si existe página)
- "Inscripciones" (CTA)

---

## Optimización Técnica SEO

### Performance (Core Web Vitals)

- **LCP < 2.5s:** Optimizar imágenes, usar next/image
- **FID < 100ms:** Minimizar JavaScript, code splitting
- **CLS < 0.1:** Dimensiones fijas para imágenes, evitar layout shift

### URLs Amigables

- Usar slugs descriptivos: `/que-es-nosework-trial` ✅
- Evitar IDs: `/eventos/123` ❌
- Preferir: `/eventos/prueba-barcelona-marzo-2025` ✅

### Imágenes

- Alt text descriptivo en todas las imágenes
- Optimización (WebP, lazy loading)
- Tamaños responsive

### Estructura HTML Semántica

- Usar `<header>`, `<main>`, `<footer>`, `<nav>`
- Jerarquía correcta de headings (H1 → H2 → H3)
- Un solo H1 por página

---

## Estrategia de Contenido Continuo

### Frecuencia de Publicación

- **Blog:** 2-4 artículos por mes
- **Eventos:** Publicar tan pronto como se confirmen
- **Resultados:** Publicar dentro de 48h del evento

### Temas para Futuros Artículos

1. Técnicas avanzadas de entrenamiento
2. Perfiles de clubs destacados
3. Entrevistas con guías y jueces
4. Cambios de reglamento y actualizaciones
5. Casos de éxito y testimonios
6. Material y equipamiento recomendado
7. Salud y bienestar del perro en competición

---

## Métricas y Seguimiento

### KPIs SEO

- Posicionamiento en keywords objetivo
- Tráfico orgánico mensual
- Tasa de conversión desde búsquedas orgánicas
- Tiempo en página
- Tasa de rebote

### Herramientas

- Google Search Console
- Google Analytics 4 (con consentimiento GDPR)
- Ahrefs/SEMrush (opcional, para keywords)

---

## Checklist de Implementación

### Fase 1 (MVP)

- [ ] Meta tags en todas las páginas públicas
- [ ] Schema.org SportsOrganization en home
- [ ] Sitemap.xml básico
- [ ] Robots.txt
- [ ] URLs amigables

### Fase 2 (Contenido + SEO)

- [ ] Schema.org SportsEvent en eventos
- [ ] Schema.org Article en blog
- [ ] Breadcrumbs con schema
- [ ] Hreflang tags (ES, CA)
- [ ] Canonical URLs
- [ ] 5 páginas pilar completas
- [ ] 5 artículos de blog iniciales
- [ ] Enlaces internos estratégicos

### Fase 3+

- [ ] Hreflang completo (ES, CA, EN, EU)
- [ ] Sitemaps dinámicos actualizados
- [ ] Optimización continua de contenido
- [ ] Link building estratégico

---

**Última actualización:** Enero 2025
