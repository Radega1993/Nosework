/**
 * Unit tests for token blacklist utilities
 */

import {
  hashToken,
  addToBlacklist,
  isTokenBlacklisted,
  cleanupExpiredTokens,
  invalidateUserTokens,
} from '../tokenBlacklist';
import { getDBConnection } from '../db';

function cleanup() {
  const db = getDBConnection();
  db.prepare('DELETE FROM token_blacklist').run();
}

describe('Token Blacklist Utilities', () => {
  beforeEach(cleanup);
  afterAll(cleanup);

  describe('hashToken', () => {
    it('returns deterministic SHA-256 hex string', () => {
      const hash1 = hashToken('my-jwt-token');
      const hash2 = hashToken('my-jwt-token');
      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/);
    });
    it('returns different hashes for different tokens', () => {
      expect(hashToken('token1')).not.toBe(hashToken('token2'));
    });
  });

  describe('addToBlacklist', () => {
    it('adds token and makes it blacklisted', () => {
      const token = 'jwt-to-blacklist';
      const expiresAt = new Date(Date.now() + 3600000).toISOString();
      expect(addToBlacklist(token, expiresAt)).toBe(true);
      expect(isTokenBlacklisted(token)).toBe(true);
    });
  });

  describe('isTokenBlacklisted', () => {
    it('returns false for token not in blacklist', () => {
      expect(isTokenBlacklisted('unknown-token')).toBe(false);
    });
  });

  describe('cleanupExpiredTokens', () => {
    it('removes expired tokens', () => {
      const token = 'expired-token';
      const past = '2000-01-01T00:00:00.000Z';
      addToBlacklist(token, past);
      const removed = cleanupExpiredTokens();
      expect(removed).toBeGreaterThanOrEqual(1);
      expect(isTokenBlacklisted(token)).toBe(false);
    });
  });

  describe('invalidateUserTokens', () => {
    it('returns true', () => {
      expect(invalidateUserTokens(1)).toBe(true);
    });
  });
});
