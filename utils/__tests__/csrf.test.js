/**
 * Unit tests for CSRF protection utilities
 */

import {
  generateCSRFToken,
  setCSRFTokenCookie,
  getCSRFTokenFromCookie,
  validateCSRFToken,
  validateCSRFMiddleware,
} from '../csrf';

describe('CSRF Utilities', () => {
  describe('generateCSRFToken', () => {
    it('should generate a 64-character hex string', () => {
      const token = generateCSRFToken();
      expect(token).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should generate unique tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('setCSRFTokenCookie', () => {
    it('should set Set-Cookie header with HttpOnly and SameSite=Strict', () => {
      const res = { setHeader: jest.fn() };
      const token = 'abc123';
      setCSRFTokenCookie(res, token);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('csrf-token=abc123')
      );
      expect(res.setHeader.mock.calls[0][1]).toContain('HttpOnly');
      expect(res.setHeader.mock.calls[0][1]).toContain('SameSite=Strict');
      expect(res.setHeader.mock.calls[0][1]).toContain('Path=/');
    });
  });

  describe('getCSRFTokenFromCookie', () => {
    it('should extract token from cookie header', () => {
      const req = { headers: { cookie: 'csrf-token=my-token-here; other=value' } };
      expect(getCSRFTokenFromCookie(req)).toBe('my-token-here');
    });

    it('should return null when cookie is missing', () => {
      const req = { headers: {} };
      expect(getCSRFTokenFromCookie(req)).toBeNull();
    });

    it('should return null when csrf-token cookie is not present', () => {
      const req = { headers: { cookie: 'session=abc' } };
      expect(getCSRFTokenFromCookie(req)).toBeNull();
    });
  });

  describe('validateCSRFToken', () => {
    it('should return true when cookie and request token match', () => {
      const token = generateCSRFToken();
      const req = { headers: { cookie: `csrf-token=${token}` } };
      expect(validateCSRFToken(req, token)).toBe(true);
    });

    it('should return false when request token is missing', () => {
      const token = generateCSRFToken();
      const req = { headers: { cookie: `csrf-token=${token}` } };
      expect(validateCSRFToken(req, null)).toBe(false);
      expect(validateCSRFToken(req, '')).toBe(false);
    });

    it('should return false when cookie is missing', () => {
      const req = { headers: {} };
      expect(validateCSRFToken(req, 'sometoken')).toBe(false);
    });

    it('should return false when tokens do not match', () => {
      const token = generateCSRFToken();
      const req = { headers: { cookie: `csrf-token=${token}` } };
      const wrongToken = token.slice(0, -1) + (token.slice(-1) === 'a' ? 'b' : 'a');
      expect(validateCSRFToken(req, wrongToken)).toBe(false);
    });
  });

  describe('validateCSRFMiddleware', () => {
    it('should allow GET requests without CSRF token', () => {
      const req = { method: 'GET' };
      const res = {};
      expect(validateCSRFMiddleware(req, res)).toBe(true);
    });

    it('should return false and 403 when body and header lack csrf token', () => {
      const req = { method: 'POST', body: {}, headers: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      expect(validateCSRFMiddleware(req, res)).toBe(false);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'CSRF token validation failed',
          message: 'CSRF token is required',
        })
      );
    });

    it('should return false when token is invalid', () => {
      const token = generateCSRFToken();
      const wrongToken = 'a'.repeat(64);
      const req = {
        method: 'POST',
        body: { csrfToken: wrongToken },
        headers: { cookie: `csrf-token=${token}` },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      expect(validateCSRFMiddleware(req, res)).toBe(false);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'CSRF token validation failed',
          message: 'Invalid CSRF token',
        })
      );
    });

    it('should return true when token from body matches cookie', () => {
      const token = generateCSRFToken();
      const req = {
        method: 'POST',
        body: { csrfToken: token },
        headers: { cookie: `csrf-token=${token}` },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      expect(validateCSRFMiddleware(req, res)).toBe(true);
    });

    it('should accept token from x-csrf-token header', () => {
      const token = generateCSRFToken();
      const req = {
        method: 'POST',
        body: {},
        headers: {
          cookie: `csrf-token=${token}`,
          'x-csrf-token': token,
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      expect(validateCSRFMiddleware(req, res)).toBe(true);
    });
  });
});
