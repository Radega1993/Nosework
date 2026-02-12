/**
 * i18n utility functions for language detection, routing, and persistence
 * 
 * Provides utilities for handling language prefixes, detection, and persistence
 * in the Next.js Pages Router application.
 */

// Supported languages
export const SUPPORTED_LANGUAGES = ['es', 'ca'];

// Default language
export const DEFAULT_LANGUAGE = 'es';

// Language names for display
export const LANGUAGE_NAMES = {
  es: 'Español',
  ca: 'Català',
};

// Cookie name for language preference
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

// Route mapping: Spanish route names to physical page file names
// This maps user-facing Spanish URLs to actual Next.js page files
export const ROUTE_MAPPING = {
  '/eventos': '/events',
  // Add more mappings as needed
};

/**
 * Returns array of supported language codes
 * @returns {string[]} Array of supported language codes
 */
export function getSupportedLanguages() {
  return [...SUPPORTED_LANGUAGES];
}

/**
 * Returns the default language code
 * @returns {string} Default language code ('es')
 */
export function getDefaultLanguage() {
  return DEFAULT_LANGUAGE;
}

/**
 * Validates if a language code is supported
 * @param {string} lang - Language code to validate
 * @returns {boolean} True if language is supported, false otherwise
 */
export function isValidLanguage(lang) {
  if (!lang || typeof lang !== 'string') {
    return false;
  }
  return SUPPORTED_LANGUAGES.includes(lang.toLowerCase());
}

/**
 * Extracts language prefix from a URL path
 * @param {string} path - URL path (e.g., '/es/eventos', '/ca/about')
 * @returns {string|null} Language code if found, null otherwise
 */
export function getLanguageFromPath(path) {
  if (!path || typeof path !== 'string') {
    return null;
  }
  
  const match = path.match(/^\/(es|ca)(\/|$)/);
  return match ? match[1] : null;
}

/**
 * Adds language prefix to a path
 * @param {string} path - Path without language prefix (e.g., '/eventos', 'eventos')
 * @param {string} lang - Language code to add
 * @returns {string} Path with language prefix (e.g., '/es/eventos')
 */
export function addLanguagePrefix(path, lang = DEFAULT_LANGUAGE) {
  if (!path || typeof path !== 'string') {
    return `/${lang}/`;
  }
  
  // Ensure lang is valid
  const validLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove existing language prefix if present
  const pathWithoutLang = removeLanguagePrefix(`/${cleanPath}`);
  const cleanPathWithoutLang = pathWithoutLang.startsWith('/') ? pathWithoutLang.slice(1) : pathWithoutLang;
  
  return `/${validLang}/${cleanPathWithoutLang}`;
}

/**
 * Removes language prefix from a path
 * @param {string} path - Path with or without language prefix (e.g., '/es/eventos', '/eventos')
 * @returns {string} Path without language prefix (e.g., '/eventos')
 */
export function removeLanguagePrefix(path) {
  if (!path || typeof path !== 'string') {
    return '/';
  }
  
  // Handle root paths with language prefix: /es or /es/ -> /
  if (path === '/es' || path === '/ca' || path === '/es/' || path === '/ca/') {
    return '/';
  }
  
  // Remove language prefix if present
  const withoutPrefix = path.replace(/^\/(es|ca)(\/|$)/, '/');
  
  // Ensure path starts with /
  return withoutPrefix.startsWith('/') ? withoutPrefix : `/${withoutPrefix}`;
}

/**
 * Maps Spanish route names to physical page file names
 * @param {string} path - Path in Spanish (e.g., '/eventos')
 * @returns {string} Physical page path (e.g., '/events')
 */
export function mapRouteToPhysicalPath(path) {
  if (!path || typeof path !== 'string') {
    return '/';
  }
  
  // Check if path needs mapping
  if (ROUTE_MAPPING[path]) {
    return ROUTE_MAPPING[path];
  }
  
  // No mapping needed, return as is
  return path;
}

/**
 * Reads language from cookie in server-side context
 * @param {Object} req - Next.js request object (with cookies property)
 * @returns {string|null} Language code from cookie, or null if not found
 */
export function getLanguageFromCookie(req) {
  if (!req || !req.cookies) {
    return null;
  }
  
  const cookieValue = req.cookies[LOCALE_COOKIE_NAME];
  return isValidLanguage(cookieValue) ? cookieValue : null;
}

/**
 * Sets language cookie in server-side context
 * @param {Object} res - Next.js response object
 * @param {string} lang - Language code to set
 * @returns {void}
 */
export function setLanguageCookie(res, lang) {
  if (!res || !isValidLanguage(lang)) {
    return;
  }
  
  // Set cookie with 1 year expiration
  const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
  res.setHeader(
    'Set-Cookie',
    `${LOCALE_COOKIE_NAME}=${lang}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
  );
}

/**
 * Detects browser language from Accept-Language header
 * @param {Object} req - Next.js request object (with headers property)
 * @returns {string|null} Detected language code, or null if not found
 */
export function detectBrowserLanguage(req) {
  if (!req || !req.headers) {
    return null;
  }
  
  const acceptLanguage = req.headers['accept-language'];
  if (!acceptLanguage || typeof acceptLanguage !== 'string') {
    return null;
  }
  
  // Parse Accept-Language header
  // Format: "es-ES,es;q=0.9,en;q=0.8" or "ca,es;q=0.9"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = '1.0'] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(), // Extract base language code
        quality: parseFloat(q),
      };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (highest first)
  
  // Find first supported language
  for (const lang of languages) {
    if (isValidLanguage(lang.code)) {
      return lang.code;
    }
  }
  
  return null;
}

/**
 * Gets preferred language combining cookie and browser detection
 * Priority: cookie > browser detection > default
 * @param {Object} req - Next.js request object (with cookies and headers)
 * @returns {string} Preferred language code
 */
export function getPreferredLanguage(req) {
  // First check cookie (explicit user selection)
  const cookieLang = getLanguageFromCookie(req);
  if (cookieLang) {
    return cookieLang;
  }
  
  // Then check browser language
  const browserLang = detectBrowserLanguage(req);
  if (browserLang) {
    return browserLang;
  }
  
  // Fallback to default
  return DEFAULT_LANGUAGE;
}
