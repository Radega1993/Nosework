/**
 * Unit tests for audit logging utilities
 */

import {
  getClientIP,
  getUserAgent,
  logAuditEvent,
  logLoginSuccess,
  logLoginFailed,
  logPasswordChanged,
  logPasswordChangeFailed,
  logAccountLocked,
  logTokensInvalidated,
} from '../auditLogger';
import { getDBConnection } from '../db';

function cleanup() {
  const db = getDBConnection();
  db.prepare('DELETE FROM audit_logs').run();
}

describe('Audit Logger Utilities', () => {
  beforeEach(cleanup);
  afterAll(cleanup);

  describe('getClientIP', () => {
    it('returns IP from x-forwarded-for', () => {
      const req = { headers: { 'x-forwarded-for': '10.0.0.1' } };
      expect(getClientIP(req)).toBe('10.0.0.1');
    });

    it('returns unknown when no headers', () => {
      expect(getClientIP({ headers: {} })).toBe('unknown');
    });
  });

  describe('getUserAgent', () => {
    it('returns user-agent from request', () => {
      const req = { headers: { 'user-agent': 'Mozilla/5.0' } };
      expect(getUserAgent(req)).toBe('Mozilla/5.0');
    });

    it('returns unknown when missing', () => {
      expect(getUserAgent({ headers: {} })).toBe('unknown');
    });
  });

  describe('logAuditEvent', () => {
    it('logs event and returns true', () => {
      expect(logAuditEvent('test_event', { ipAddress: '1.2.3.4', userAgent: 'Test' })).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('test_event');
      expect(row).toBeTruthy();
      expect(row.ip_address).toBe('1.2.3.4');
      expect(row.user_agent).toBe('Test');
    });

    it('uses req for IP and user agent when provided', () => {
      const req = {
        headers: { 'x-forwarded-for': '5.6.7.8', 'user-agent': 'Agent' },
      };
      expect(logAuditEvent('test_event_req', { req })).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('test_event_req');
      expect(row.ip_address).toBe('5.6.7.8');
      expect(row.user_agent).toBe('Agent');
    });

    it('stores details as JSON', () => {
      logAuditEvent('test_details', {
        ipAddress: '0.0.0.0',
        userAgent: 'x',
        details: { key: 'value' },
      });
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('test_details');
      expect(JSON.parse(row.details)).toEqual({ key: 'value' });
    });
  });

  describe('logLoginSuccess', () => {
    it('logs login_success with userId', () => {
      const req = { headers: {} };
      expect(logLoginSuccess(42, req)).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('login_success');
      expect(row.user_id).toBe(42);
    });
  });

  describe('logLoginFailed', () => {
    it('logs login_failed with details', () => {
      const req = { headers: {} };
      expect(logLoginFailed('a@b.com', req, 'invalid_credentials')).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('login_failed');
      expect(row.user_id).toBeNull();
      const details = JSON.parse(row.details);
      expect(details.attemptedEmail).toBe('a@b.com');
      expect(details.reason).toBe('invalid_credentials');
    });
  });

  describe('logPasswordChanged', () => {
    it('logs password_changed', () => {
      const req = { headers: {} };
      expect(logPasswordChanged(1, req)).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('password_changed');
      expect(row.user_id).toBe(1);
    });
  });

  describe('logPasswordChangeFailed', () => {
    it('logs password_change_failed', () => {
      const req = { headers: {} };
      expect(logPasswordChangeFailed(1, req, 'wrong_password')).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('password_change_failed');
      expect(JSON.parse(row.details).reason).toBe('wrong_password');
    });
  });

  describe('logAccountLocked', () => {
    it('logs account_locked with details', () => {
      const req = { headers: {} };
      expect(logAccountLocked(1, req, 5, '15m')).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('account_locked');
      const details = JSON.parse(row.details);
      expect(details.failedAttempts).toBe(5);
      expect(details.lockoutDuration).toBe('15m');
    });
  });

  describe('logTokensInvalidated', () => {
    it('logs tokens_invalidated', () => {
      const req = { headers: {} };
      expect(logTokensInvalidated(1, 'logout', req)).toBe(true);
      const db = getDBConnection();
      const row = db.prepare('SELECT * FROM audit_logs WHERE event_type = ?').get('tokens_invalidated');
      expect(JSON.parse(row.details).reason).toBe('logout');
    });
  });
});
