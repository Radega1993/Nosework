# SEO Foundation Documentation

Esta documentación describe los componentes y utilidades SEO implementados en el sitio.

## Componentes

### SEOHead

Componente reutilizable para gestionar todos los meta tags SEO de una página.

**Ubicación:** `components/SEOHead.js`

**Props:**
- `title` (string, requerido): Título de la página
- `description` (string, requerido): Descripción meta (se trunca automáticamente a 160 caracteres)
- `canonical` (string, requerido): Ruta canónica relativa (ej: "/events", "/events/1")
- `ogImage` (string, opcional): URL de imagen Open Graph (por defecto: "/images/og-image.jpg")
- `schema` (Object|Array, opcional): Schema.org JSON-LD personalizado
- `breadcrumbs` (Array, opcional): Array de items de breadcrumb para generar Schema.org BreadcrumbList
- `additionalMeta` (Object, opcional): Meta tags adicionales como pares clave-valor

**Ejemplo de uso:**

```jsx
import SEOHead from "@/components/SEOHead";

export default function MyPage() {
  return (
    <>
      <SEOHead
        title="Mi Página – Nosework Trial"
        description="Descripción de mi página para SEO"
        canonical="/my-page"
        ogImage="/images/custom-og-image.jpg"
        additionalMeta={{
          keywords: "keyword1, keyword2"
        }}
      />
      {/* Resto del contenido */}
    </>
  );
}
```

**Con Schema.org:**

```jsx
import SEOHead from "@/components/SEOHead";
import { getSportsOrganizationSchema } from "@/utils/seo";

export default function HomePage() {
  const schema = getSportsOrganizationSchema();
  
  return (
    <>
      <SEOHead
        title="Nosework Trial – Deporte de olfato canino"
        description="Descubre Nosework Trial..."
        canonical="/"
        schema={schema}
      />
      {/* Resto del contenido */}
    </>
  );
}
```

**Con Breadcrumbs:**

```jsx
import SEOHead from "@/components/SEOHead";

export default function EventDetailPage({ event }) {
  return (
    <>
      <SEOHead
        title={`${event.title} - Nosework Trial`}
        description={event.description}
        canonical={`/events/${event.id}`}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Eventos", href: "/events" },
          { label: event.title, href: `/events/${event.id}` }
        ]}
      />
      {/* Resto del contenido */}
    </>
  );
}
```

### Breadcrumbs

Componente para renderizar breadcrumbs visuales y Schema.org BreadcrumbList automáticamente.

**Ubicación:** `components/Breadcrumbs.js`

**Props:**
- `items` (Array, requerido): Array de objetos con `label` (string) y `href` (string)

**Ejemplo de uso:**

```jsx
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MyPage() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Sección", href: "/section" },
    { label: "Página Actual", href: "/section/page" }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      {/* Resto del contenido */}
    </>
  );
}
```

**Características:**
- Renderiza navegación visual con `<nav>` y `<ol>` semántico
- Genera automáticamente Schema.org BreadcrumbList JSON-LD
- URLs absolutas en Schema.org usando `getCanonicalUrl()`
- Accesible (keyboard navigation, aria-labels)
- El último item se marca con `aria-current="page"`

## Utilidades

### getCanonicalUrl(path)

Genera URLs canónicas absolutas consistentes.

**Ubicación:** `utils/seo.js`

**Parámetros:**
- `path` (string): Ruta relativa (con o sin barra inicial)

**Retorna:**
- `string`: URL absoluta con dominio

**Ejemplo:**

```js
import { getCanonicalUrl } from "@/utils/seo";

const canonical = getCanonicalUrl("/events");
// Retorna: "https://www.noseworktrialcommunity.com/events"

const canonical2 = getCanonicalUrl("events");
// Retorna: "https://www.noseworktrialcommunity.com/events"
```

**Nota:** Usa la variable de entorno `NEXT_PUBLIC_SITE_URL` o el dominio por defecto.

### getSportsOrganizationSchema(options)

Genera Schema.org SportsOrganization JSON-LD completo.

**Ubicación:** `utils/seo.js`

**Parámetros:**
- `options` (Object, opcional): Overrides para campos del schema

**Retorna:**
- `Object`: Schema.org SportsOrganization listo para JSON-LD

**Ejemplo:**

```js
import { getSportsOrganizationSchema } from "@/utils/seo";

// Usar valores por defecto
const schema = getSportsOrganizationSchema();

// Personalizar campos
const customSchema = getSportsOrganizationSchema({
  name: "Mi Organización",
  contactEmail: "custom@email.com",
  sameAs: ["https://twitter.com/miorg"]
});
```

**Campos incluidos por defecto:**
- `@context`: "https://schema.org"
- `@type`: "SportsOrganization"
- `name`: "Nosework Trial Community"
- `alternateName`: "NTC"
- `description`: Descripción completa
- `url`: URL base del sitio
- `logo`: URL del logo
- `sport`: "Nosework Trial"
- `areaServed`: País (España)
- `sameAs`: Redes sociales
- `contactPoint`: Punto de contacto

## Sitemaps

### Sitemap Principal

**Ubicación:** `pages/sitemap.xml.js`

Genera sitemap XML con páginas estáticas y referencia a sitemaps secundarios.

**Incluye:**
- Homepage (priority: 1.0, changefreq: daily)
- Páginas principales (priority: 0.9, changefreq: weekly)
- Páginas secundarias (priority: 0.7-0.8, changefreq: monthly/daily)

**Accesible en:** `/sitemap.xml`

### Sitemap de Eventos

**Ubicación:** `pages/sitemap-events.xml.js`

Genera sitemap XML dinámico desde la base de datos.

**Incluye:**
- Eventos futuros
- Eventos de los últimos 30 días
- Excluye eventos cancelados

**Accesible en:** `/sitemap-events.xml`

## Robots.txt

**Ubicación:** `public/robots.txt`

Configuración para controlar el crawling de motores de búsqueda.

**Reglas:**
- Permite: todas las páginas públicas (`Allow: /`)
- Bloquea: `/dashboard/`, `/api/`, `/admin/`
- Referencia sitemaps principales

**Accesible en:** `/robots.txt`

## Migración de Páginas

Para migrar una página existente a usar SEOHead:

1. **Importar SEOHead:**
```jsx
import SEOHead from "@/components/SEOHead";
```

2. **Reemplazar Head inline:**
```jsx
// Antes
<Head>
  <title>Mi Página</title>
  <meta name="description" content="..." />
  {/* ... más meta tags ... */}
</Head>

// Después
<SEOHead
  title="Mi Página – Nosework Trial"
  description="..."
  canonical="/my-page"
/>
```

3. **Añadir breadcrumbs si corresponde:**
```jsx
import Breadcrumbs from "@/components/Breadcrumbs";

<Breadcrumbs
  items={[
    { label: "Inicio", href: "/" },
    { label: "Mi Página", href: "/my-page" }
  ]}
/>
```

## Templates de Meta Tags

Los templates de meta tags por tipo de página están documentados en `openspec/seo_plan.md`.

### Ejemplos por tipo de página:

**Homepage:**
- Title: "Nosework Trial – Deporte de olfato canino"
- Description: "Descubre Nosework Trial, la modalidad deportiva..."

**Página de eventos:**
- Title: "Calendario de Eventos Nosework Trial – Pruebas y Competiciones 2025"
- Description: "Consulta el calendario completo de eventos..."

**Página de evento individual:**
- Title: "[Event Title] - Nosework Trial"
- Description: Descripción del evento (truncada a 160 caracteres)

## Verificación

### Herramientas recomendadas:

1. **Google Rich Results Test:** Validar Schema.org markup
   - https://search.google.com/test/rich-results

2. **Facebook Sharing Debugger:** Verificar Open Graph tags
   - https://developers.facebook.com/tools/debug/

3. **Twitter Card Validator:** Verificar Twitter Cards
   - https://cards-dev.twitter.com/validator

4. **Lighthouse:** Auditar SEO score
   ```bash
   npm run test:lighthouse
   ```

5. **XML Sitemap Validator:** Validar sitemaps
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Notas Importantes

- **Canonical URLs:** Siempre usar rutas relativas en el prop `canonical`. El componente las convierte a absolutas automáticamente.
- **Descripciones:** Se truncan automáticamente a 160 caracteres. Asegúrate de que las primeras 160 caracteres sean informativas.
- **Schema.org:** Puedes pasar múltiples schemas usando un array: `schema={[schema1, schema2]}`
- **Breadcrumbs:** El componente Breadcrumbs genera automáticamente el Schema.org BreadcrumbList. No es necesario pasarlo también a SEOHead si usas el componente Breadcrumbs.

## Variables de Entorno

- `NEXT_PUBLIC_SITE_URL`: URL base del sitio (opcional, por defecto: https://www.noseworktrialcommunity.com)

## Referencias

- [Schema.org SportsOrganization](https://schema.org/SportsOrganization)
- [Schema.org SportsEvent](https://schema.org/SportsEvent)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
