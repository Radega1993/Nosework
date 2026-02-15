# refresh-tokens Specification

## Purpose
Implement refresh tokens system to allow secure session renewal without frequent re-authentication, improving security and user experience.

## ADDED Requirements

### Requirement: Refresh tokens table exists
The system SHALL maintain a refresh_tokens table to store refresh token information.

#### Scenario: Refresh tokens table exists in database
- **WHEN** the system is initialized
- **THEN** a `refresh_tokens` table exists in the database
- **AND** the table stores user_id, token_hash, expires_at, and created_at
- **AND** the table structure supports efficient lookups and cleanup

#### Scenario: Refresh tokens table has required fields
- **WHEN** refresh tokens are implemented
- **THEN** refresh_tokens table includes: id, user_id, token_hash (UNIQUE), expires_at, created_at
- **AND** foreign key constraint links to users table
- **AND** table supports cascade delete when user is deleted

### Requirement: Refresh tokens are issued on login
The system SHALL issue refresh tokens along with access tokens during successful login.

#### Scenario: Login returns access and refresh tokens
- **WHEN** a user successfully logs in
- **THEN** response includes both access_token and refresh_token
- **AND** access_token has short expiration (15 minutes)
- **AND** refresh_token has long expiration (7 days)

#### Scenario: Refresh tokens are stored securely
- **WHEN** refresh tokens are issued
- **THEN** refresh token hash is stored in database (not plain token)
- **AND** refresh token is returned to client only once
- **AND** refresh token cannot be retrieved from database

### Requirement: Access tokens can be refreshed
The system SHALL provide an endpoint to refresh access tokens using refresh tokens.

#### Scenario: Refresh endpoint exists
- **WHEN** refresh token system is implemented
- **THEN** endpoint `/api/auth/refresh` exists
- **AND** endpoint accepts refresh_token in request body
- **AND** endpoint validates refresh token and returns new access token

#### Scenario: Refresh endpoint validates refresh token
- **WHEN** refresh endpoint receives refresh token
- **THEN** refresh token hash is verified against database
- **AND** refresh token expiration is checked
- **AND** if valid, new access token is issued
- **AND** if invalid, HTTP status 401 (Unauthorized) is returned

#### Scenario: Refresh endpoint returns new access token
- **WHEN** refresh token is valid
- **THEN** new access token is generated with 15-minute expiration
- **AND** new access token is returned in response
- **AND** refresh token remains valid until expiration

### Requirement: Refresh tokens have longer expiration
The system SHALL set refresh token expiration longer than access token expiration.

#### Scenario: Refresh tokens expire after 7 days
- **WHEN** refresh tokens are issued
- **THEN** refresh tokens have expiration of 7 days
- **AND** expiration is stored in expires_at field
- **AND** expired refresh tokens cannot be used

#### Scenario: Access tokens expire after 15 minutes
- **WHEN** access tokens are issued
- **THEN** access tokens have expiration of 15 minutes
- **AND** expired access tokens require refresh token to obtain new access token
- **AND** short expiration limits damage if access token is compromised

### Requirement: Refresh tokens can be revoked
The system SHALL allow revocation of refresh tokens.

#### Scenario: Logout revokes refresh token
- **WHEN** a user logs out
- **THEN** the refresh token is removed from database
- **AND** refresh token can no longer be used to obtain access tokens
- **AND** logout is successful

#### Scenario: Password change revokes refresh tokens
- **WHEN** a user changes their password
- **THEN** all refresh tokens for that user are revoked (deleted from database)
- **AND** user must re-authenticate to obtain new refresh token
- **AND** security is maintained after password change

### Requirement: Refresh tokens are validated on use
The system SHALL validate refresh tokens before issuing new access tokens.

#### Scenario: Refresh token validation checks database
- **WHEN** refresh endpoint receives refresh token
- **THEN** token hash is looked up in refresh_tokens table
- **AND** token existence is verified
- **AND** token expiration is checked

#### Scenario: Invalid refresh tokens are rejected
- **WHEN** refresh token is invalid (not found, expired, revoked)
- **THEN** HTTP status 401 (Unauthorized) is returned
- **AND** error message indicates refresh token is invalid
- **AND** no new access token is issued

### Requirement: Expired refresh tokens are cleaned up
The system SHALL periodically clean up expired refresh tokens from the database.

#### Scenario: Expired refresh tokens are removed
- **WHEN** refresh tokens have expired
- **THEN** expired tokens are removed from database
- **AND** cleanup occurs periodically or on-demand
- **AND** cleanup prevents database growth

#### Scenario: Cleanup does not affect active tokens
- **WHEN** refresh token cleanup is performed
- **THEN** only expired tokens are removed
- **AND** active tokens remain in database
- **AND** cleanup does not interfere with token validation

### Requirement: Client manages refresh tokens
The system SHALL provide client-side support for refresh token management.

#### Scenario: Client stores refresh token securely
- **WHEN** refresh token is received from server
- **THEN** client stores refresh token (e.g., in localStorage or httpOnly cookie)
- **AND** refresh token is used to obtain new access tokens when needed
- **AND** refresh token is protected from XSS attacks

#### Scenario: Client automatically refreshes access token
- **WHEN** access token expires during user session
- **THEN** client automatically uses refresh token to obtain new access token
- **AND** user experience is seamless (no re-authentication required)
- **AND** refresh happens transparently to user

#### Scenario: Client handles refresh token expiration
- **WHEN** refresh token expires
- **THEN** client detects expiration
- **AND** user is redirected to login page
- **AND** user must re-authenticate to obtain new refresh token
