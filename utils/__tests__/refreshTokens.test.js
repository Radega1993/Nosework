/**
 * Unit tests for refresh token utilities
 */

import {
  generateRefreshToken,
  hashRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserRefreshTokens,
  cleanupExpiredRefreshTokens,
} from '../refreshTokens';
import { getDBConnection } from '../db';
import bcrypt from 'bcryptjs';

let testUserId;

function cleanup() {
  if (!testUserId) return;
  const db = getDBConnection();
  db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(testUserId);
}

describe('Refresh Token Utilities', () => {
  beforeAll(() => {
    if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'test-secret';
    const db = getDBConnection();
    const hashed = bcrypt.hashSync('TestPass123', 10);
    const r = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run('refresh-test@example.com', hashed);
    testUserId = r.lastInsertRowid;
  });
  afterAll(() => {
    cleanup();
    const db = getDBConnection();
    db.prepare('DELETE FROM users WHERE id = ?').run(testUserId);
  });
  beforeEach(cleanup);

  describe('generateRefreshToken', () => {
    it('returns 64-character hex string', () => {
      const token = generateRefreshToken();
      expect(token).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe('hashRefreshToken', () => {
    it('returns deterministic 64-char hex', () => {
      const t = 'abc';
      expect(hashRefreshToken(t)).toMatch(/^[a-f0-9]{64}$/);
      expect(hashRefreshToken(t)).toBe(hashRefreshToken(t));
    });
  });

  describe('storeRefreshToken and verifyRefreshToken', () => {
    it('stores token and verify returns userId', () => {
      const token = generateRefreshToken();
      const expiresAt = new Date(Date.now() + 3600000).toISOString();
      expect(storeRefreshToken(testUserId, token, expiresAt)).toBe(true);
      const result = verifyRefreshToken(token);
      expect(result).not.toBeNull();
      expect(result.userId).toBe(testUserId);
    });
    it('verify returns null for unknown token', () => {
      expect(verifyRefreshToken('unknown-token')).toBeNull();
    });
    it('verify returns null after revoke', () => {
      const token = generateRefreshToken();
      const expiresAt = new Date(Date.now() + 3600000).toISOString();
      storeRefreshToken(testUserId, token, expiresAt);
      revokeRefreshToken(token);
      expect(verifyRefreshToken(token)).toBeNull();
    });
  });

  describe('revokeRefreshToken', () => {
    it('returns true and removes token', () => {
      const token = generateRefreshToken();
      const expiresAt = new Date(Date.now() + 3600000).toISOString();
      storeRefreshToken(testUserId, token, expiresAt);
      expect(revokeRefreshToken(token)).toBe(true);
      expect(verifyRefreshToken(token)).toBeNull();
    });
  });

  describe('revokeAllUserRefreshTokens', () => {
    it('removes all tokens for user', () => {
      const t1 = generateRefreshToken();
      const t2 = generateRefreshToken();
      const exp = new Date(Date.now() + 3600000).toISOString();
      storeRefreshToken(testUserId, t1, exp);
      storeRefreshToken(testUserId, t2, exp);
      const n = revokeAllUserRefreshTokens(testUserId);
      expect(n).toBe(2);
      expect(verifyRefreshToken(t1)).toBeNull();
      expect(verifyRefreshToken(t2)).toBeNull();
    });
  });

  describe('cleanupExpiredRefreshTokens', () => {
    it('removes expired tokens', () => {
      const token = generateRefreshToken();
      const past = '2000-01-01T00:00:00.000Z';
      storeRefreshToken(testUserId, token, past);
      const removed = cleanupExpiredRefreshTokens();
      expect(removed).toBeGreaterThanOrEqual(1);
      expect(verifyRefreshToken(token)).toBeNull();
    });
  });
});
