/**
 * SEO utility functions for generating canonical URLs and Schema.org markup
 * 
 * These utilities ensure consistent SEO implementation across the site.
 */

import {
  getLanguageFromPath,
  addLanguagePrefix,
  DEFAULT_LANGUAGE,
} from './i18n';

/**
 * Generates an absolute canonical URL for a given path
 * 
 * Uses NEXT_PUBLIC_SITE_URL environment variable or defaults to production domain.
 * Ensures consistent URL format (with leading slash, no trailing slash unless required).
 * Automatically detects and adds language prefix if not present.
 * 
 * @example
 * ```js
 * // Client-side (with router context)
 * getCanonicalUrl("/events") 
 * // Returns: "https://www.noseworktrialcommunity.com/es/eventos" (if current page is /es/...)
 * 
 * // Server-side or explicit language
 * getCanonicalUrl("/events", "es")
 * // Returns: "https://www.noseworktrialcommunity.com/es/eventos"
 * ```
 * 
 * @param {string} path - The path (with or without leading slash)
 * @param {string|Object} [langOrRouter] - Optional language code (e.g., "es") or Next.js router object for automatic detection
 * @returns {string} Absolute canonical URL with domain and language prefix
 */
export function getCanonicalUrl(path, langOrRouter = null) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.noseworktrialcommunity.com";
  
  // Clean path
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Detect language
  let lang = DEFAULT_LANGUAGE;
  
  // Check if path already has language prefix
  const pathLang = getLanguageFromPath(cleanPath);
  if (pathLang) {
    lang = pathLang;
  } else if (langOrRouter) {
    // If langOrRouter is a string, use it as language code
    if (typeof langOrRouter === 'string') {
      lang = langOrRouter;
    } 
    // If langOrRouter is a router object (from useRouter), try to detect from current path
    else if (langOrRouter && typeof langOrRouter === 'object' && langOrRouter.asPath) {
      const routerLang = getLanguageFromPath(langOrRouter.asPath) || 
                        getLanguageFromPath(langOrRouter.pathname);
      if (routerLang) {
        lang = routerLang;
      }
    }
  }
  
  // Add language prefix if not already present
  if (!pathLang) {
    cleanPath = addLanguagePrefix(cleanPath, lang);
  }
  
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generates Schema.org SportsOrganization JSON-LD markup
 * 
 * Creates a complete SportsOrganization schema with all recommended fields.
 * Can be customized by passing options to override default values.
 * 
 * @example
 * ```js
 * // Use defaults
 * const schema = getSportsOrganizationSchema();
 * 
 * // Override specific fields
 * const schema = getSportsOrganizationSchema({
 *   name: "Custom Name",
 *   contactEmail: "custom@email.com"
 * });
 * ```
 * 
 * @param {Object} [options={}] - Optional overrides for schema fields:
 *   - `name` (string): Organization name
 *   - `alternateName` (string): Alternate name/abbreviation
 *   - `description` (string): Organization description
 *   - `url` (string): Organization website URL
 *   - `logo` (string): Logo URL
 *   - `sport` (string): Sport name
 *   - `areaServed` (Object): Area served (Country schema)
 *   - `sameAs` (Array): Social media profile URLs
 *   - `contactPoint` (Object): Contact point schema
 *   - `contactEmail` (string): Contact email (used in contactPoint)
 * @returns {Object} Schema.org SportsOrganization object ready for JSON-LD
 */
export function getSportsOrganizationSchema(options = {}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.noseworktrialcommunity.com";

  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: options.name || "Nosework Trial Community",
    alternateName: options.alternateName || "NTC",
    description:
      options.description ||
      "Organización deportiva de Nosework Trial en España. Promovemos el nosework deportivo como modalidad inclusiva para todos los perros y sus guías.",
    url: options.url || baseUrl,
    logo: options.logo || `${baseUrl}/logo.png`,
    sport: options.sport || "Nosework Trial",
    areaServed: options.areaServed || {
      "@type": "Country",
      name: "España",
    },
    sameAs: options.sameAs || [
      "https://www.facebook.com/noseworktrialcommunity",
      "https://www.instagram.com/noseworktrialcommunity",
    ],
    contactPoint: options.contactPoint || {
      "@type": "ContactPoint",
      email: options.contactEmail || "contacto@noseworktrialcommunity.com",
      contactType: "customer service",
    },
  };
}
