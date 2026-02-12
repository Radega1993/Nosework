# token-invalidation Specification

## Purpose
Implement a system to invalidate JWT tokens when users change their passwords, ensuring that compromised tokens cannot be used after password changes.

## ADDED Requirements

### Requirement: Token blacklist exists
The system SHALL maintain a blacklist of invalidated tokens in the database.

#### Scenario: Token blacklist table exists
- **WHEN** the system is initialized
- **THEN** a `token_blacklist` table exists in the database
- **AND** the table stores token hashes and expiration dates
- **AND** the table structure supports efficient lookups

#### Scenario: Tokens are added to blacklist
- **WHEN** a token needs to be invalidated
- **THEN** the token hash is added to the blacklist table
- **AND** the token expiration date is stored
- **AND** the blacklist entry includes a creation timestamp

### Requirement: Tokens are invalidated on password change
The system SHALL invalidate all existing tokens when a user changes their password.

#### Scenario: Password change invalidates existing tokens
- **WHEN** a user successfully changes their password
- **THEN** all existing access tokens for that user are added to the blacklist
- **AND** all existing refresh tokens for that user are revoked
- **AND** the user must re-authenticate to obtain new tokens

#### Scenario: Invalidated tokens cannot be used
- **WHEN** a request includes a token that has been invalidated
- **THEN** the middleware rejects the token
- **AND** HTTP status 401 (Unauthorized) is returned
- **AND** the user is required to re-authenticate

### Requirement: Middleware checks token blacklist
The system SHALL verify tokens against the blacklist during authentication.

#### Scenario: Authentication middleware checks blacklist
- **WHEN** a request includes a JWT token
- **THEN** the middleware verifies the token signature
- **AND** the middleware checks if the token hash exists in the blacklist
- **AND** blacklisted tokens are rejected even if signature is valid

#### Scenario: Blacklist check is efficient
- **WHEN** token blacklist is checked during authentication
- **THEN** the check uses indexed database queries
- **AND** the check does not significantly impact request performance
- **AND** expired tokens are not checked against blacklist

### Requirement: Expired tokens are cleaned up
The system SHALL periodically clean up expired tokens from the blacklist.

#### Scenario: Expired tokens are removed from blacklist
- **WHEN** tokens in the blacklist have expired
- **THEN** expired tokens are removed from the blacklist table
- **AND** cleanup occurs periodically or on-demand
- **AND** cleanup does not affect active tokens

#### Scenario: Cleanup prevents blacklist growth
- **WHEN** blacklist cleanup is performed
- **THEN** the blacklist size remains manageable
- **AND** database performance is not degraded by large blacklist
- **AND** cleanup is automated or can be triggered manually

### Requirement: Logout invalidates tokens
The system SHALL provide a logout endpoint that invalidates the current token.

#### Scenario: Logout endpoint exists
- **WHEN** a user calls the logout endpoint
- **THEN** the current access token is added to the blacklist
- **AND** the current refresh token is revoked
- **AND** HTTP status 200 (OK) is returned

#### Scenario: Logged out tokens cannot be reused
- **WHEN** a user logs out
- **THEN** the token used for logout cannot be used for subsequent requests
- **AND** attempts to use the logged-out token return HTTP status 401 (Unauthorized)
