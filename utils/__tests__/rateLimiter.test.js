/**
 * Unit tests for rate limiting utilities
 */

import { getClientIP, createRateLimiter } from '../rateLimiter';

describe('Rate Limiter Utilities', () => {
  describe('getClientIP', () => {
    it('returns IP from x-forwarded-for first in list', () => {
      const req = {
        headers: { 'x-forwarded-for': ' 192.168.1.1, 10.0.0.1' },
      };
      expect(getClientIP(req)).toBe('192.168.1.1');
    });

    it('returns IP from x-real-ip when x-forwarded-for is missing', () => {
      const req = {
        headers: { 'x-real-ip': '203.0.113.50' },
      };
      expect(getClientIP(req)).toBe('203.0.113.50');
    });

    it('returns socket.remoteAddress when other headers missing', () => {
      const req = {
        headers: {},
        socket: { remoteAddress: '127.0.0.1' },
      };
      expect(getClientIP(req)).toBe('127.0.0.1');
    });

    it('returns unknown when no source available', () => {
      const req = { headers: {} };
      expect(getClientIP(req)).toBe('unknown');
    });
  });

  describe('createRateLimiter', () => {
    it('allows requests within limit', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        maxRequests: 2,
        keyGenerator: () => 'test-key-1',
      });

      const req = { headers: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
      };

      expect(limiter(req, res)).toBe(true);
      expect(limiter(req, res)).toBe(true);
      expect(res.status).not.toHaveBeenCalledWith(429);
    });

    it('blocks requests when limit exceeded', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        maxRequests: 2,
        keyGenerator: () => 'test-key-2',
      });

      const req = { headers: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
      };

      expect(limiter(req, res)).toBe(true);
      expect(limiter(req, res)).toBe(true);
      expect(limiter(req, res)).toBe(false);
      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Too many requests',
          message: expect.stringContaining('Demasiadas solicitudes'),
          retryAfter: expect.any(Number),
        })
      );
    });

    it('sets rate limit headers when allowing request', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        maxRequests: 5,
        keyGenerator: () => 'test-key-3',
      });

      const req = { headers: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
      };

      limiter(req, res);

      expect(res.setHeader).toHaveBeenCalledWith('X-RateLimit-Limit', 5);
      expect(res.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 4);
      expect(res.setHeader).toHaveBeenCalledWith(
        'X-RateLimit-Reset',
        expect.any(String)
      );
    });

    it('uses custom keyGenerator when provided', () => {
      const keyGenerator = jest.fn((req) => req.userId);
      const limiter = createRateLimiter({
        windowMs: 60000,
        maxRequests: 1,
        keyGenerator,
      });

      const req1 = { headers: {}, userId: 'user-1' };
      const req2 = { headers: {}, userId: 'user-2' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
      };

      limiter(req1, res);
      limiter(req2, res);
      expect(keyGenerator).toHaveBeenCalledWith(req1);
      expect(keyGenerator).toHaveBeenCalledWith(req2);
      expect(res.status).not.toHaveBeenCalledWith(429);
    });
  });
});
