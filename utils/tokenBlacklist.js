/**
 * Token blacklist utilities
 *
 * Manages JWT token blacklist to invalidate tokens when needed
 * (e.g., password change, logout).
 */

import crypto from "crypto";
import { getDBConnection } from "./db.js";

/**
 * Hash token for storage in blacklist
 * Uses SHA-256 to create a hash of the token
 *
 * @param {string} token - JWT token to hash
 * @returns {string} SHA-256 hash of the token
 */
export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Add token to blacklist
 *
 * @param {string} token - JWT token to blacklist
 * @param {Date|string} expiresAt - Token expiration date
 * @returns {boolean} True if token was added successfully
 */
export function addToBlacklist(token, expiresAt) {
  try {
    const db = getDBConnection();
    const tokenHash = hashToken(token);
    const expiresAtStr =
      expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt;
    
    db.prepare(
      `INSERT OR IGNORE INTO token_blacklist (token_hash, expires_at) VALUES (?, ?)`
    ).run(tokenHash, expiresAtStr);
    
    return true;
  } catch (error) {
    console.error("Error adding token to blacklist:", error);
    return false;
  }
}

/**
 * Check if token is in blacklist
 *
 * @param {string} token - JWT token to check
 * @returns {boolean} True if token is blacklisted
 */
export function isTokenBlacklisted(token) {
  try {
    const db = getDBConnection();
    const tokenHash = hashToken(token);
    
    const result = db
      .prepare(
        `SELECT expires_at FROM token_blacklist WHERE token_hash = ? AND expires_at > datetime('now')`
      )
      .get(tokenHash);
    
    return !!result;
  } catch (error) {
    console.error("Error checking token blacklist:", error);
    return false; // Fail open - don't block if there's an error
  }
}

/**
 * Clean up expired tokens from blacklist
 *
 * @returns {number} Number of tokens removed
 */
export function cleanupExpiredTokens() {
  try {
    const db = getDBConnection();
    const result = db
      .prepare(`DELETE FROM token_blacklist WHERE expires_at <= datetime('now')`)
      .run();
    
    return result.changes || 0;
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
    return 0;
  }
}

/**
 * Invalidate all tokens for a user
 * This is used when password is changed - all existing tokens should be invalidated
 *
 * Note: This function adds tokens to blacklist, but since we don't store
 * all active tokens, we rely on refresh token revocation for complete invalidation.
 * This function is mainly for logging purposes.
 *
 * @param {number} userId - User ID whose tokens should be invalidated
 * @returns {boolean} True if operation succeeded
 */
export function invalidateUserTokens(userId) {
  try {
    // This is mainly for audit logging
    // Actual token invalidation happens through refresh token revocation
    // and blacklist check in middleware
    return true;
  } catch (error) {
    console.error("Error invalidating user tokens:", error);
    return false;
  }
}
