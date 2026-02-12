/**
 * Rate limiting utilities
 *
 * Provides rate limiting middleware for API routes to prevent brute force attacks.
 * Uses in-memory storage (suitable for single-instance deployments).
 */

/**
 * Get client IP address from request
 *
 * @param {Object} req - Next.js API request object
 * @returns {string} IP address
 */
export function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

/**
 * In-memory rate limit store
 * Format: { [key]: { count: number, resetTime: number } }
 */
const rateLimitStore = new Map();

/**
 * Clean up expired entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

/**
 * Rate limiter middleware factory
 *
 * @param {Object} options - Rate limit options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.maxRequests - Maximum requests per window
 * @param {Function} options.keyGenerator - Function to generate rate limit key (default: by IP)
 * @returns {Function} Middleware function
 */
export function createRateLimiter(options) {
  const {
    windowMs,
    maxRequests,
    keyGenerator = (req) => getClientIP(req),
  } = options;

  return (req, res) => {
    const key = keyGenerator(req);
    const now = Date.now();
    
    // Get or create entry
    let entry = rateLimitStore.get(key);
    
    if (!entry || entry.resetTime < now) {
      // Create new entry or reset expired one
      entry = {
        count: 0,
        resetTime: now + windowMs,
      };
      rateLimitStore.set(key, entry);
    }
    
    // Increment count
    entry.count++;
    
    // Check if limit exceeded
    if (entry.count > maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      res.status(429).json({
        error: "Too many requests",
        message: `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter} segundos.`,
        retryAfter,
      });
      return false; // Rate limit exceeded
    }
    
    // Set rate limit headers
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, maxRequests - entry.count));
    res.setHeader("X-RateLimit-Reset", new Date(entry.resetTime).toISOString());
    
    return true; // Request allowed
  };
}

/**
 * Rate limiter for login endpoint
 * 5 attempts per 15 minutes per IP
 */
export const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
});

/**
 * Rate limiter for registration endpoint
 * 3 attempts per hour per IP
 */
export const registerRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
});

/**
 * Rate limiter for change password endpoint
 * 3 attempts per hour per user (requires authenticated user)
 */
export const changePasswordRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise fall back to IP
    if (req.user && req.user.id) {
      return `user:${req.user.id}`;
    }
    return getClientIP(req);
  },
});
