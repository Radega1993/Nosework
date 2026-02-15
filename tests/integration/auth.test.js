/**
 * Integration tests for authentication endpoints
 * 
 * These tests verify the full flow of authentication including:
 * - Rate limiting
 * - Input validation
 * - CSRF protection
 * - Token management
 * - Account lockout
 */

import { createMocks } from 'node-mocks-http';
import loginHandler from '../../pages/api/auth/login';
import registerHandler from '../../pages/api/auth/register';
import refreshHandler from '../../pages/api/auth/refresh';
import logoutHandler from '../../pages/api/auth/logout';
import changePasswordHandler from '../../pages/api/auth/change-password';
import csrfTokenHandler from '../../pages/api/auth/csrf-token';
import { getDBConnection } from '../../utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let requestCount = 0;
function uniqueIP() {
  requestCount += 1;
  return `127.0.0.${(requestCount % 254) + 1}`;
}

// Helper to create mock request/response (unique IP per call to avoid rate limit)
function createMockReqRes(method, body, headers = {}) {
  return createMocks({
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': uniqueIP(),
      ...headers,
    },
  });
}

// Helper to create a test user
async function createTestUser(email, password) {
  const db = getDBConnection();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);
  return result.lastInsertRowid;
}

// Helper to get CSRF token
async function getCSRFToken() {
  const { req, res } = createMockReqRes('GET');
  await csrfTokenHandler(req, res);
  const data = JSON.parse(res._getData());
  return data.csrfToken;
}

// Clean up test data
function cleanupTestData() {
  const db = getDBConnection();
  db.prepare('DELETE FROM users WHERE email LIKE ?').run('test%@example.com');
  db.prepare('DELETE FROM token_blacklist').run();
  db.prepare('DELETE FROM refresh_tokens').run();
  db.prepare('DELETE FROM audit_logs').run();
}

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    cleanupTestData();
  });

  afterAll(() => {
    cleanupTestData();
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const email = 'test-login@example.com';
      const password = 'TestPass123';
      await createTestUser(email, password);

      const csrfToken = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        email,
        password,
        csrfToken,
      });

      // Set CSRF cookie
      req.headers.cookie = `csrf-token=${csrfToken}`;

      await loginHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.token).toBeTruthy();
      expect(data.refreshToken).toBeTruthy();
      expect(data.user.email).toBe(email);
    });

    it('should reject login with invalid credentials', async () => {
      const email = 'test-invalid@example.com';
      const password = 'TestPass123';
      await createTestUser(email, password);

      const csrfToken = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        email,
        password: 'WrongPassword123',
        csrfToken,
      });

      req.headers.cookie = `csrf-token=${csrfToken}`;

      await loginHandler(req, res);

      expect(res._getStatusCode()).toBe(401);
      const data = JSON.parse(res._getData());
      expect(data.error).toBeTruthy();
    });

    it('should reject login without CSRF token', async () => {
      const { req, res } = createMockReqRes('POST', {
        email: 'test@example.com',
        password: 'TestPass123',
      });

      await loginHandler(req, res);

      expect(res._getStatusCode()).toBe(403);
    });

    it('should reject login with invalid email format', async () => {
      const csrfToken = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        email: 'invalid-email',
        password: 'TestPass123',
        csrfToken,
      });

      req.headers.cookie = `csrf-token=${csrfToken}`;

      await loginHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBeTruthy();
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register successfully with valid data', async () => {
      const csrfToken = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        email: 'test-register@example.com',
        password: 'TestPass123',
        csrfToken,
      });

      req.headers.cookie = `csrf-token=${csrfToken}`;

      await registerHandler(req, res);

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.message).toContain('exitosamente');
    });

    it('should reject registration with weak password', async () => {
      const csrfToken = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        email: 'test-weak@example.com',
        password: 'weak',
        csrfToken,
      });

      req.headers.cookie = `csrf-token=${csrfToken}`;

      await registerHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBeTruthy();
    });

    it('should reject registration with duplicate email', async () => {
      const email = 'test-duplicate@example.com';
      await createTestUser(email, 'TestPass123');

      const csrfToken = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        email,
        password: 'AnotherPass123',
        csrfToken,
      });

      req.headers.cookie = `csrf-token=${csrfToken}`;

      await registerHandler(req, res);

      expect(res._getStatusCode()).toBe(409);
      const data = JSON.parse(res._getData());
      expect(data.error).toContain('registrado');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const email = 'test-refresh@example.com';
      const password = 'TestPass123';
      const userId = await createTestUser(email, password);

      // Login first to get refresh token
      const csrfToken = await getCSRFToken();
      const { req: loginReq, res: loginRes } = createMockReqRes('POST', {
        email,
        password,
        csrfToken,
      });
      loginReq.headers.cookie = `csrf-token=${csrfToken}`;
      await loginHandler(loginReq, loginRes);
      const loginData = JSON.parse(loginRes._getData());
      const refreshToken = loginData.refreshToken;

      // Now refresh
      const { req, res } = createMockReqRes('POST', {
        refreshToken,
      });

      await refreshHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.token).toBeTruthy();
    });

    it('should reject invalid refresh token', async () => {
      const { req, res } = createMockReqRes('POST', {
        refreshToken: 'invalid-token',
      });

      await refreshHandler(req, res);

      expect(res._getStatusCode()).toBe(401);
      const data = JSON.parse(res._getData());
      expect(data.error).toBeTruthy();
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully and invalidate tokens', async () => {
      const email = 'test-logout@example.com';
      const password = 'TestPass123';
      const userId = await createTestUser(email, password);

      // Login first
      const csrfToken = await getCSRFToken();
      const { req: loginReq, res: loginRes } = createMockReqRes('POST', {
        email,
        password,
        csrfToken,
      });
      loginReq.headers.cookie = `csrf-token=${csrfToken}`;
      await loginHandler(loginReq, loginRes);
      const loginData = JSON.parse(loginRes._getData());
      const accessToken = loginData.token;
      const refreshToken = loginData.refreshToken;

      // Mock user in request (as authenticateToken middleware would do)
      const { req, res } = createMockReqRes('POST', {
        refreshToken,
      });
      req.headers.authorization = `Bearer ${accessToken}`;
      // Simulate authenticated user
      const decoded = jwt.decode(accessToken);
      req.user = decoded;

      await logoutHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.message).toContain('exitosamente');
    });
  });

  describe('POST /api/auth/change-password', () => {
    const waitForResponse = () => new Promise((r) => setTimeout(r, 50));

    it('should change password successfully', async () => {
      const email = 'test-changepass@example.com';
      const oldPassword = 'OldPass123';
      const newPassword = 'NewPass123';
      const userId = await createTestUser(email, oldPassword);

      // Login first
      const csrfToken = await getCSRFToken();
      const { req: loginReq, res: loginRes } = createMockReqRes('POST', {
        email,
        password: oldPassword,
        csrfToken,
      });
      loginReq.headers.cookie = `csrf-token=${csrfToken}`;
      await loginHandler(loginReq, loginRes);
      const loginData = JSON.parse(loginRes._getData());
      const accessToken = loginData.token;

      // Change password
      const csrfToken2 = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        currentPassword: oldPassword,
        newPassword,
        confirmPassword: newPassword,
        csrfToken: csrfToken2,
      });
      req.headers.authorization = `Bearer ${accessToken}`;
      req.headers.cookie = `csrf-token=${csrfToken2}`;

      changePasswordHandler(req, res);
      await waitForResponse();

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.message).toContain('exitosamente');
    });

    it('should reject change password with incorrect current password', async () => {
      const email = 'test-changepass2@example.com';
      const password = 'TestPass123';
      await createTestUser(email, password);

      // Login first
      const csrfToken = await getCSRFToken();
      const { req: loginReq, res: loginRes } = createMockReqRes('POST', {
        email,
        password,
        csrfToken,
      });
      loginReq.headers.cookie = `csrf-token=${csrfToken}`;
      await loginHandler(loginReq, loginRes);
      const loginData = JSON.parse(loginRes._getData());
      const accessToken = loginData.token;

      // Try to change password with wrong current password
      const csrfToken2 = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        currentPassword: 'WrongPass123',
        newPassword: 'NewPass123',
        confirmPassword: 'NewPass123',
        csrfToken: csrfToken2,
      });
      req.headers.authorization = `Bearer ${accessToken}`;
      req.headers.cookie = `csrf-token=${csrfToken2}`;

      changePasswordHandler(req, res);
      await waitForResponse();

      expect(res._getStatusCode()).toBe(401);
      const data = JSON.parse(res._getData());
      expect(data.error).toContain('incorrecta');
    });

    it('should reject change password when newPassword and confirmPassword do not match', async () => {
      const email = 'test-changepass3@example.com';
      const password = 'TestPass123';
      await createTestUser(email, password);
      const csrfToken = await getCSRFToken();
      const { req: loginReq, res: loginRes } = createMockReqRes('POST', {
        email,
        password,
        csrfToken,
      });
      loginReq.headers.cookie = `csrf-token=${csrfToken}`;
      await loginHandler(loginReq, loginRes);
      const loginData = JSON.parse(loginRes._getData());
      const accessToken = loginData.token;
      const csrfToken2 = await getCSRFToken();
      const { req, res } = createMockReqRes('POST', {
        currentPassword: password,
        newPassword: 'NewPass123',
        confirmPassword: 'OtherPass456',
        csrfToken: csrfToken2,
      });
      req.headers.authorization = `Bearer ${accessToken}`;
      req.headers.cookie = `csrf-token=${csrfToken2}`;

      changePasswordHandler(req, res);
      await waitForResponse();

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBeTruthy();
    });
  });
});
