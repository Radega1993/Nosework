/**
 * CSRF protection utilities
 *
 * Generates and validates CSRF tokens to prevent Cross-Site Request Forgery attacks.
 */

import crypto from "crypto";

/**
 * Generate a random CSRF token
 *
 * @returns {string} Random token string
 */
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Set CSRF token in httpOnly cookie
 *
 * @param {Object} res - Next.js API response object
 * @param {string} token - CSRF token to set
 */
export function setCSRFTokenCookie(res, token) {
  const isProduction = process.env.NODE_ENV === "production";
  
  res.setHeader(
    "Set-Cookie",
    `csrf-token=${token}; HttpOnly; Path=/; SameSite=Strict${
      isProduction ? "; Secure" : ""
    }`
  );
}

/**
 * Get CSRF token from cookie
 *
 * @param {Object} req - Next.js API request object
 * @returns {string|null} CSRF token from cookie or null
 */
export function getCSRFTokenFromCookie(req) {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/csrf-token=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Validate CSRF token
 * Compares token from cookie with token from request body/header
 *
 * @param {Object} req - Next.js API request object
 * @param {string} tokenFromRequest - CSRF token from request body or header
 * @returns {boolean} True if tokens match
 */
export function validateCSRFToken(req, tokenFromRequest) {
  if (!tokenFromRequest) {
    return false;
  }
  
  const tokenFromCookie = getCSRFTokenFromCookie(req);
  if (!tokenFromCookie) {
    return false;
  }
  
  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(tokenFromRequest),
    Buffer.from(tokenFromCookie)
  );
}

/**
 * Middleware to validate CSRF token
 * Use this in API routes that require CSRF protection
 *
 * @param {Object} req - Next.js API request object
 * @param {Object} res - Next.js API response object
 * @returns {boolean} True if CSRF token is valid
 */
export function validateCSRFMiddleware(req, res) {
  // GET requests don't need CSRF protection
  if (req.method === "GET") {
    return true;
  }
  
  // Get token from body (csrfToken) or header (x-csrf-token)
  const tokenFromRequest =
    req.body?.csrfToken || req.headers["x-csrf-token"];
  
  if (!tokenFromRequest) {
    res.status(403).json({
      error: "CSRF token validation failed",
      message: "CSRF token is required",
    });
    return false;
  }
  
  if (!validateCSRFToken(req, tokenFromRequest)) {
    res.status(403).json({
      error: "CSRF token validation failed",
      message: "Invalid CSRF token",
    });
    return false;
  }
  
  return true;
}
