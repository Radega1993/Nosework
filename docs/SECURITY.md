# Security Documentation

## Authentication & Authorization Hardening

This document describes the security measures implemented in the authentication system.

## Overview

The authentication system has been hardened with multiple layers of security:

- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Server-side and client-side validation using Joi schemas
- **Input Sanitization**: Prevents XSS and injection attacks
- **Token Management**: Token blacklist and refresh tokens
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Password Security**: Strength requirements and common password rejection
- **Account Lockout**: Temporary lockout after failed login attempts
- **Audit Logging**: Comprehensive logging of security events

## Rate Limiting

Rate limiting is implemented to prevent brute force attacks:

- **Login**: 5 attempts per 15 minutes per IP
- **Register**: 3 attempts per hour per IP
- **Change Password**: 3 attempts per hour per authenticated user

Rate limiters are configured in `utils/rateLimiter.js` and applied as middleware in API routes.

### Configuration

Rate limiters use in-memory storage (suitable for single-instance deployments). For production with multiple instances, consider migrating to Redis-based rate limiting.

## Input Validation

All user inputs are validated using Joi schemas defined in `utils/validation.js`:

- `loginSchema`: Validates email and password
- `registerSchema`: Validates email and password with strength requirements
- `changePasswordSchema`: Validates current password, new password, and confirmation
- `refreshTokenSchema`: Validates refresh token

Validation occurs on both client and server side for better UX and security.

## Input Sanitization

User inputs are sanitized to prevent XSS and injection attacks:

- **HTML**: Sanitized using DOMPurify (client-side) or regex (server-side)
- **Emails**: Normalized (trimmed, lowercased) and validated
- **URLs**: Validated and restricted to http/https schemes
- **Text**: HTML tags and null bytes removed

Sanitization utilities are in `utils/sanitization.js`.

## Token Management

### Access Tokens (JWT)

- **Expiration**: 15 minutes
- **Storage**: localStorage (client-side)
- **Invalidation**: Tokens can be invalidated via blacklist

### Refresh Tokens

- **Expiration**: 7 days
- **Storage**: Database (hashed)
- **Storage (Client)**: localStorage
- **Revocation**: Can be revoked individually or for all user tokens

### Token Blacklist

Invalidated tokens are stored in the `token_blacklist` table:

- Tokens are hashed (SHA-256) before storage
- Expired tokens are automatically cleaned up
- Cleanup script: `npm run cleanup:tokens`

## CSRF Protection

CSRF protection is implemented using tokens:

1. CSRF token is generated server-side
2. Token is stored in httpOnly cookie
3. Token is included in request body or header
4. Server validates token matches cookie

CSRF tokens are required for:
- Login
- Register
- Change Password
- Other state-changing operations

CSRF utilities are in `utils/csrf.js`.

## Password Security

Password requirements:

- **Minimum length**: 8 characters
- **Complexity**: Must contain uppercase, lowercase, and number
- **Common passwords**: Rejected (blacklist of common passwords)

Password strength is calculated and displayed to users in real-time.

Utilities are in `utils/passwordSecurity.js`.

## Account Lockout

Accounts are temporarily locked after failed login attempts:

- **Threshold**: 5 consecutive failed attempts
- **Duration**: 15 minutes (initial lockout)
- **Reset**: Automatic unlock after duration expires or on successful login

Lockout information is stored in the `users` table:
- `failed_login_attempts`: Counter of failed attempts
- `account_locked_until`: Timestamp when account unlocks

## Audit Logging

Security events are logged to the `audit_logs` table:

- Login success/failure
- Password changes
- Role changes
- Account lockouts/unlocks
- Token invalidations

Each log entry includes:
- Event type
- User ID (if applicable)
- IP address
- User agent
- Timestamp
- Additional details (JSON)

Audit logging utilities are in `utils/auditLogger.js`.

## Database Schema

### New Tables

**token_blacklist**
- `token_hash` (TEXT, PRIMARY KEY)
- `expires_at` (TEXT)
- `created_at` (TEXT)

**refresh_tokens**
- `id` (INTEGER, PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY)
- `token_hash` (TEXT, UNIQUE)
- `expires_at` (TEXT)
- `created_at` (TEXT)

**audit_logs**
- `id` (INTEGER, PRIMARY KEY)
- `event_type` (TEXT)
- `user_id` (INTEGER, nullable)
- `ip_address` (TEXT)
- `user_agent` (TEXT)
- `details` (TEXT, JSON)
- `created_at` (TEXT)

### Updated Tables

**users**
- Added: `failed_login_attempts` (INTEGER, default 0)
- Added: `account_locked_until` (TEXT, nullable)

## Maintenance

### Token Cleanup

Expired tokens should be cleaned up periodically:

```bash
npm run cleanup:tokens
```

For production, set up a cron job or scheduled task:

```bash
# Run daily at 2 AM
0 2 * * * cd /path/to/project && npm run cleanup:tokens
```

### Audit Log Review

Query audit logs to review security events:

```sql
-- Recent login failures
SELECT * FROM audit_logs 
WHERE event_type = 'login_failed' 
ORDER BY created_at DESC 
LIMIT 100;

-- Account lockouts
SELECT * FROM audit_logs 
WHERE event_type = 'account_locked' 
ORDER BY created_at DESC;

-- Password changes
SELECT * FROM audit_logs 
WHERE event_type = 'password_changed' 
ORDER BY created_at DESC;
```

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/login` - Login with rate limiting, validation, CSRF
- `POST /api/auth/register` - Register with rate limiting, validation, CSRF
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and invalidate tokens
- `POST /api/auth/change-password` - Change password (authenticated)
- `GET /api/auth/csrf-token` - Get CSRF token

All endpoints include appropriate security measures as described above.

## Best Practices

1. **Always validate and sanitize inputs** on the server side
2. **Use CSRF tokens** for all state-changing operations
3. **Monitor audit logs** regularly for suspicious activity
4. **Run token cleanup** periodically to keep database clean
5. **Review rate limit logs** to identify potential attacks
6. **Keep dependencies updated** to patch security vulnerabilities

## Future Improvements

- Migrate to Redis for rate limiting (multi-instance support)
- Implement 2FA (Two-Factor Authentication)
- Add password history to prevent reuse
- Implement session management UI
- Add IP whitelisting for admin accounts
- Implement CAPTCHA for high-risk operations
