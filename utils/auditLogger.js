/**
 * Audit logging utilities
 *
 * Logs security-related events for audit trail and compliance.
 */

import { getDBConnection } from "./db.js";

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
 * Get user agent from request
 *
 * @param {Object} req - Next.js API request object
 * @returns {string} User agent string
 */
export function getUserAgent(req) {
  return req.headers["user-agent"] || "unknown";
}

/**
 * Log audit event
 *
 * @param {string} eventType - Type of event (e.g., "login_success", "login_failed")
 * @param {Object} options - Event options
 * @param {number} [options.userId] - User ID (if applicable)
 * @param {Object} [options.req] - Request object (for IP and user agent)
 * @param {string} [options.ipAddress] - IP address (if req not provided)
 * @param {string} [options.userAgent] - User agent (if req not provided)
 * @param {Object} [options.details] - Additional event details (will be JSON stringified)
 * @returns {boolean} True if event was logged successfully
 */
export function logAuditEvent(eventType, options = {}) {
  try {
    const db = getDBConnection();
    
    const {
      userId = null,
      req = null,
      ipAddress = null,
      userAgent = null,
      details = null,
    } = options;
    
    // Get IP and user agent from request if available
    const finalIP = ipAddress || (req ? getClientIP(req) : "unknown");
    const finalUserAgent = userAgent || (req ? getUserAgent(req) : "unknown");
    
    // Stringify details if it's an object
    const detailsStr = details ? JSON.stringify(details) : null;
    
    db.prepare(
      `INSERT INTO audit_logs (event_type, user_id, ip_address, user_agent, details) VALUES (?, ?, ?, ?, ?)`
    ).run(eventType, userId, finalIP, finalUserAgent, detailsStr);
    
    return true;
  } catch (error) {
    console.error("Error logging audit event:", error);
    return false;
  }
}

/**
 * Log login success event
 *
 * @param {number} userId - User ID
 * @param {Object} req - Request object
 */
export function logLoginSuccess(userId, req) {
  return logAuditEvent("login_success", {
    userId,
    req,
    details: { timestamp: new Date().toISOString() },
  });
}

/**
 * Log login failed event
 *
 * @param {string} email - Attempted email (may not exist)
 * @param {Object} req - Request object
 * @param {string} reason - Failure reason
 */
export function logLoginFailed(email, req, reason = "invalid_credentials") {
  return logAuditEvent("login_failed", {
    req,
    details: {
      attemptedEmail: email,
      reason,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Log password change event
 *
 * @param {number} userId - User ID
 * @param {Object} req - Request object
 */
export function logPasswordChanged(userId, req) {
  return logAuditEvent("password_changed", {
    userId,
    req,
    details: { timestamp: new Date().toISOString() },
  });
}

/**
 * Log password change failed event
 *
 * @param {number} userId - User ID
 * @param {Object} req - Request object
 * @param {string} reason - Failure reason
 */
export function logPasswordChangeFailed(userId, req, reason = "invalid_current_password") {
  return logAuditEvent("password_change_failed", {
    userId,
    req,
    details: {
      reason,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Log role change event
 *
 * @param {number} userId - User ID whose role was changed
 * @param {number} changedBy - Admin user ID who made the change
 * @param {string} oldRole - Previous role
 * @param {string} newRole - New role
 * @param {Object} req - Request object
 */
export function logRoleChanged(userId, changedBy, oldRole, newRole, req) {
  return logAuditEvent("role_changed", {
    userId,
    req,
    details: {
      changedBy,
      oldRole,
      newRole,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Log account locked event
 *
 * @param {number} userId - User ID
 * @param {Object} req - Request object
 * @param {number} failedAttempts - Number of failed attempts
 * @param {string} lockoutDuration - Lockout duration
 */
export function logAccountLocked(userId, req, failedAttempts, lockoutDuration) {
  return logAuditEvent("account_locked", {
    userId,
    req,
    details: {
      failedAttempts,
      lockoutDuration,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Log account unlocked event
 *
 * @param {number} userId - User ID
 * @param {string} unlockMethod - How account was unlocked ("automatic" or "manual")
 * @param {Object} req - Request object (optional)
 */
export function logAccountUnlocked(userId, unlockMethod, req = null) {
  return logAuditEvent("account_unlocked", {
    userId,
    req,
    details: {
      unlockMethod,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Log token invalidation event
 *
 * @param {number} userId - User ID
 * @param {string} reason - Reason for invalidation ("password_change", "logout", etc.)
 * @param {Object} req - Request object
 */
export function logTokensInvalidated(userId, reason, req) {
  return logAuditEvent("tokens_invalidated", {
    userId,
    req,
    details: {
      reason,
      timestamp: new Date().toISOString(),
    },
  });
}
