/**
 * Sanitization utilities
 *
 * Provides functions to sanitize user input to prevent XSS, SQL injection,
 * and other security vulnerabilities.
 */

import DOMPurify from "dompurify";
import validator from "validator";

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML string
 */
export function sanitizeHTML(html) {
  if (typeof window !== "undefined") {
    // Client-side: use DOMPurify
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [], // No HTML tags allowed by default
      ALLOWED_ATTR: [],
    });
  }
  // Server-side: basic HTML tag removal
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Sanitize and normalize email address
 *
 * @param {string} email - Email address to sanitize
 * @returns {string} Sanitized and normalized email (trimmed, lowercased)
 */
export function sanitizeEmail(email) {
  if (!email || typeof email !== "string") {
    return "";
  }
  const trimmed = email.trim();
  const normalized = trimmed.toLowerCase();
  // Validate email format
  if (validator.isEmail(normalized)) {
    return normalized;
  }
  return trimmed; // Return trimmed even if invalid (validation will catch it)
}

/**
 * Sanitize URL to prevent malicious schemes
 *
 * @param {string} url - URL to sanitize
 * @returns {string} Sanitized URL or empty string if invalid
 */
export function sanitizeURL(url) {
  if (!url || typeof url !== "string") {
    return "";
  }
  const trimmed = url.trim();
  // Validate URL format and allow only http/https schemes
  if (validator.isURL(trimmed, { protocols: ["http", "https"] })) {
    return trimmed;
  }
  return ""; // Return empty if invalid
}

/**
 * Sanitize generic text string
 * Removes potentially dangerous characters and trims whitespace
 *
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export function sanitizeText(text) {
  if (!text || typeof text !== "string") {
    return "";
  }
  // Remove HTML tags
  let sanitized = text.replace(/<[^>]*>/g, "");
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, "");
  // Trim whitespace
  sanitized = sanitized.trim();
  return sanitized;
}

/**
 * Sanitize object recursively
 * Applies sanitization to all string values in an object
 *
 * @param {Object} obj - Object to sanitize
 * @param {Object} options - Sanitization options
 * @param {boolean} options.sanitizeHTML - Whether to sanitize HTML (default: false)
 * @returns {Object} Sanitized object
 */
export function sanitizeObject(obj, options = {}) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  
  const sanitized = {};
  const { sanitizeHTML: shouldSanitizeHTML = false } = options;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      if (key === "email") {
        sanitized[key] = sanitizeEmail(value);
      } else if (key === "url" || key.includes("url")) {
        sanitized[key] = sanitizeURL(value);
      } else if (shouldSanitizeHTML) {
        sanitized[key] = sanitizeHTML(value);
      } else {
        sanitized[key] = sanitizeText(value);
      }
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeText(item) : item
      );
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value, options);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}
