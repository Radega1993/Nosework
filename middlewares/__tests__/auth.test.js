/**
 * Unit tests for auth middleware (authenticateToken, blacklist check)
 */

import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRoles } from '../auth';

jest.mock('../../utils/tokenBlacklist', () => ({
  isTokenBlacklisted: jest.fn(),
}));

const { isTokenBlacklisted } = require('../../utils/tokenBlacklist');

beforeEach(() => {
  jest.clearAllMocks();
  isTokenBlacklisted.mockReturnValue(false);
});

describe('authenticateToken', () => {
  const secret = process.env.JWT_SECRET || 'test-secret';

  it('returns 401 when no authorization header', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token requerido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when token is blacklisted', () => {
    isTokenBlacklisted.mockReturnValue(true);
    const req = { headers: { authorization: 'Bearer some-token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authenticateToken(req, res, next);
    expect(isTokenBlacklisted).toHaveBeenCalledWith('some-token');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when token is invalid', () => {
    isTokenBlacklisted.mockReturnValue(false);
    const req = { headers: { authorization: 'Bearer invalid-jwt' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next and sets req.user when token is valid', () => {
    isTokenBlacklisted.mockReturnValue(false);
    const payload = { id: 1, email: 'u@t.com', role: 'user' };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authenticateToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(1);
    expect(req.user.email).toBe('u@t.com');
  });
});

describe('authorizeRoles', () => {
  it('returns 403 when req.user is missing', () => {
    const middleware = authorizeRoles('admin');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Acceso denegado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when user role not in allowed list', () => {
    const middleware = authorizeRoles('admin');
    const req = { user: { role: 'user' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next when user role is allowed', () => {
    const middleware = authorizeRoles('admin', 'organizador');
    const req = { user: { role: 'organizador' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
