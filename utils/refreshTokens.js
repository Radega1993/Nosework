/**
 * Refresh token utilities
 *
 * Manages refresh tokens for secure session renewal.
 */

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getDBConnection } from "./db.js";

/**
 * Generate a secure random refresh token
 *
 * @returns {string} Random token string
 */
export function generateRefreshToken() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Hash refresh token for storage
 *
 * @param {string} token - Refresh token to hash
 * @returns {string} SHA-256 hash of the token
 */
export function hashRefreshToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Store refresh token in database
 *
 * @param {number} userId - User ID
 * @param {string} token - Refresh token (plain text)
 * @param {Date|string} expiresAt - Token expiration date
 * @returns {boolean} True if token was stored successfully
 */
export function storeRefreshToken(userId, token, expiresAt) {
  try {
    const db = getDBConnection();
    const tokenHash = hashRefreshToken(token);
    const expiresAtStr =
      expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt;
    
    db.prepare(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)`
    ).run(userId, tokenHash, expiresAtStr);
    
    return true;
  } catch (error) {
    console.error("Error storing refresh token:", error);
    return false;
  }
}

/**
 * Verify refresh token against database
 *
 * @param {string} token - Refresh token to verify
 * @returns {Object|null} { userId, expiresAt } if valid, null otherwise
 */
export function verifyRefreshToken(token) {
  try {
    const db = getDBConnection();
    const tokenHash = hashRefreshToken(token);
    
    const result = db
      .prepare(
        `SELECT user_id, expires_at FROM refresh_tokens WHERE token_hash = ? AND expires_at > datetime('now')`
      )
      .get(tokenHash);
    
    if (!result) {
      return null;
    }
    
    return {
      userId: result.user_id,
      expiresAt: result.expires_at,
    };
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null;
  }
}

/**
 * Revoke refresh token (delete from database)
 *
 * @param {string} token - Refresh token to revoke
 * @returns {boolean} True if token was revoked successfully
 */
export function revokeRefreshToken(token) {
  try {
    const db = getDBConnection();
    const tokenHash = hashRefreshToken(token);
    
    const result = db
      .prepare(`DELETE FROM refresh_tokens WHERE token_hash = ?`)
      .run(tokenHash);
    
    return (result.changes || 0) > 0;
  } catch (error) {
    console.error("Error revoking refresh token:", error);
    return false;
  }
}

/**
 * Revoke all refresh tokens for a user
 *
 * @param {number} userId - User ID
 * @returns {number} Number of tokens revoked
 */
export function revokeAllUserRefreshTokens(userId) {
  try {
    const db = getDBConnection();
    const result = db
      .prepare(`DELETE FROM refresh_tokens WHERE user_id = ?`)
      .run(userId);
    
    return result.changes || 0;
  } catch (error) {
    console.error("Error revoking all user refresh tokens:", error);
    return 0;
  }
}

/**
 * Clean up expired refresh tokens from database
 *
 * @returns {number} Number of tokens removed
 */
export function cleanupExpiredRefreshTokens() {
  try {
    const db = getDBConnection();
    const result = db
      .prepare(`DELETE FROM refresh_tokens WHERE expires_at <= datetime('now')`)
      .run();
    
    return result.changes || 0;
  } catch (error) {
    console.error("Error cleaning up expired refresh tokens:", error);
    return 0;
  }
}

/**
 * Generate access token (JWT)
 *
 * @param {Object} payload - Token payload (id, email, role)
 * @returns {string} JWT access token
 */
export function generateAccessToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  
  return jwt.sign(payload, secret, { expiresIn: "15m" });
}
