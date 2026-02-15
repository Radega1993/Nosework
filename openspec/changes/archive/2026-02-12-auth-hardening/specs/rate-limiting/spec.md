# rate-limiting Specification

## Purpose
Implement rate limiting for authentication endpoints and critical API routes to prevent brute force attacks and API abuse.

## ADDED Requirements

### Requirement: Rate limiting exists for login endpoint
The system SHALL implement rate limiting on the `/api/auth/login` endpoint to prevent brute force attacks.

#### Scenario: Login endpoint rate limits requests
- **WHEN** a client makes more than 5 login attempts from the same IP address within 15 minutes
- **THEN** the system returns HTTP status 429 (Too Many Requests)
- **AND** the response includes a message indicating rate limit exceeded
- **AND** subsequent requests are blocked until the time window expires

#### Scenario: Rate limiting resets after time window
- **WHEN** the 15-minute time window expires after rate limit is triggered
- **THEN** the rate limit counter resets for that IP address
- **AND** new login attempts are allowed again

#### Scenario: Rate limiting tracks by IP address
- **WHEN** multiple login attempts are made from different IP addresses
- **THEN** each IP address has its own independent rate limit counter
- **AND** rate limiting for one IP does not affect other IPs

### Requirement: Rate limiting exists for register endpoint
The system SHALL implement rate limiting on the `/api/auth/register` endpoint to prevent abuse.

#### Scenario: Register endpoint rate limits requests
- **WHEN** a client makes more than 3 registration attempts from the same IP address within 1 hour
- **THEN** the system returns HTTP status 429 (Too Many Requests)
- **AND** the response includes a message indicating rate limit exceeded
- **AND** subsequent registration attempts are blocked until the time window expires

### Requirement: Rate limiting exists for change password endpoint
The system SHALL implement rate limiting on the `/api/auth/change-password` endpoint for authenticated users.

#### Scenario: Change password endpoint rate limits requests
- **WHEN** an authenticated user makes more than 3 password change attempts within 1 hour
- **THEN** the system returns HTTP status 429 (Too Many Requests)
- **AND** the response includes a message indicating rate limit exceeded
- **AND** subsequent password change attempts are blocked until the time window expires

#### Scenario: Change password rate limiting tracks by user
- **WHEN** rate limiting is applied to password change endpoint
- **THEN** the rate limit is tracked per authenticated user ID
- **AND** different users have independent rate limit counters

### Requirement: Rate limiting provides informative error messages
The system SHALL return clear error messages when rate limits are exceeded.

#### Scenario: Rate limit error message includes retry information
- **WHEN** a rate limit is exceeded
- **THEN** the error response includes a message indicating the rate limit was exceeded
- **AND** the response includes information about when the rate limit will reset (Retry-After header or similar)
- **AND** the message is user-friendly and does not expose internal implementation details

### Requirement: Rate limiting is configurable
The system SHALL allow configuration of rate limit thresholds and time windows.

#### Scenario: Rate limit configuration can be adjusted
- **WHEN** rate limiting is implemented
- **THEN** the limits (attempts per time window) can be configured via environment variables or configuration file
- **AND** different limits can be set for different endpoints
- **AND** limits can be adjusted without code changes
