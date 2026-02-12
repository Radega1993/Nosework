import Head from "next/head";
import { getCanonicalUrl } from "@/utils/seo";

/**
 * SEOHead component - Reusable component for managing SEO meta tags
 * 
 * This component centralizes all SEO-related meta tags including:
 * - Basic meta tags (title, description)
 * - Canonical URLs
 * - Open Graph tags for social media sharing
 * - Twitter Card tags
 * - Schema.org JSON-LD markup
 * - Breadcrumb Schema.org markup
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <SEOHead
 *   title="Page Title – Nosework Trial"
 *   description="Page description for SEO"
 *   canonical="/page-path"
 * />
 * 
 * // With Schema.org and breadcrumbs
 * <SEOHead
 *   title="Event Title - Nosework Trial"
 *   description="Event description"
 *   canonical="/events/1"
 *   schema={eventSchema}
 *   breadcrumbs={[
 *     { label: "Inicio", href: "/" },
 *     { label: "Eventos", href: "/events" },
 *     { label: "Event Title", href: "/events/1" }
 *   ]}
 * />
 * ```
 * 
 * @param {string} title - Page title (required). Will be used for <title>, og:title, and twitter:title
 * @param {string} description - Meta description (required). Will be truncated to 160 characters automatically
 * @param {string} canonical - Canonical URL path (required). Should be relative path like "/page" or "/events/1"
 * @param {string} [ogImage="/images/og-image.jpg"] - Open Graph image URL (optional). Defaults to /images/og-image.jpg
 * @param {Object|Array} [schema=null] - Custom Schema.org JSON-LD markup (optional). Can be single object or array of schemas
 * @param {Array} [breadcrumbs=null] - Breadcrumb items for Schema.org BreadcrumbList (optional). Array of {label: string, href: string}
 * @param {Object} [additionalMeta={}] - Additional meta tags as key-value pairs (optional). e.g., {keywords: "keyword1, keyword2"}
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/images/og-image.jpg",
  schema = null,
  breadcrumbs = null,
  additionalMeta = {},
}) {
  // Truncate description to 160 characters
  const truncatedDescription =
    description && description.length > 160
      ? description.substring(0, 157) + "..."
      : description;

  // Generate canonical URL
  const canonicalUrl = getCanonicalUrl(canonical);

  // Generate Open Graph URL (same as canonical)
  const ogUrl = canonicalUrl;

  // Generate breadcrumb schema if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: getCanonicalUrl(item.href),
        })),
      }
    : null;

  // Combine schemas (breadcrumbs + custom schema)
  const schemas = [];
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }
  if (schema) {
    if (Array.isArray(schema)) {
      schemas.push(...schema);
    } else {
      schemas.push(schema);
    }
  }

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{title}</title>
      {truncatedDescription && (
        <meta name="description" content={truncatedDescription} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      {truncatedDescription && (
        <meta property="og:description" content={truncatedDescription} />
      )}
      <meta property="og:image" content={getCanonicalUrl(ogImage)} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {truncatedDescription && (
        <meta name="twitter:description" content={truncatedDescription} />
      )}
      <meta name="twitter:image" content={getCanonicalUrl(ogImage)} />

      {/* Additional meta tags */}
      {Object.entries(additionalMeta).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      {/* Schema.org JSON-LD */}
      {schemas.map((schemaObj, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
        />
      ))}
    </Head>
  );
}
