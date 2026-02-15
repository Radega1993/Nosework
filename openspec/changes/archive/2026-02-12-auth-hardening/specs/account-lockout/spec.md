# account-lockout Specification

## Purpose
Implement temporary account lockout after multiple failed login attempts to prevent brute force attacks.

## ADDED Requirements

### Requirement: Failed login attempts are tracked
The system SHALL track the number of consecutive failed login attempts per user account.

#### Scenario: Failed login attempts counter exists
- **WHEN** a login attempt fails
- **THEN** the failed login attempts counter for that account is incremented
- **AND** the counter is stored in the database (users table)
- **AND** the counter is reset when login succeeds

#### Scenario: Failed login attempts are tracked per account
- **WHEN** multiple failed login attempts occur for different accounts
- **THEN** each account has its own independent failed attempts counter
- **AND** failed attempts for one account do not affect other accounts

### Requirement: Accounts are locked after threshold
The system SHALL lock user accounts after a specified number of failed login attempts.

#### Scenario: Account is locked after 5 failed attempts
- **WHEN** a user account has 5 consecutive failed login attempts
- **THEN** the account is locked
- **AND** the account_locked_until timestamp is set in the database
- **AND** subsequent login attempts are rejected even with correct password

#### Scenario: Locked account prevents login
- **WHEN** a login attempt is made for a locked account
- **THEN** login is rejected regardless of password correctness
- **AND** HTTP status 423 (Locked) or 401 (Unauthorized) is returned
- **AND** error message indicates account is locked and when it will be unlocked

### Requirement: Account lockout duration is configurable
The system SHALL allow configuration of lockout duration.

#### Scenario: Initial lockout duration is 15 minutes
- **WHEN** an account is locked for the first time
- **THEN** the lockout duration is 15 minutes
- **AND** the account_locked_until timestamp reflects the unlock time
- **AND** the account becomes accessible after the duration expires

#### Scenario: Lockout duration can increase exponentially
- **WHEN** an account is locked multiple times
- **THEN** subsequent lockouts can have longer durations (exponential backoff)
- **AND** lockout duration increases with repeated lockouts
- **AND** maximum lockout duration is capped

### Requirement: Account lockout expires automatically
The system SHALL automatically unlock accounts after the lockout period expires.

#### Scenario: Locked account unlocks after duration
- **WHEN** the account_locked_until timestamp has passed
- **THEN** the account is automatically unlocked
- **AND** the failed_login_attempts counter is reset
- **AND** login attempts are allowed again

#### Scenario: Lockout expiration is checked on login attempt
- **WHEN** a login attempt is made for a locked account
- **THEN** the system checks if lockout period has expired
- **AND** if expired, account is unlocked and login can proceed
- **AND** if not expired, login is rejected

### Requirement: Successful login resets lockout
The system SHALL reset the failed login attempts counter when login succeeds.

#### Scenario: Successful login resets counter
- **WHEN** a user successfully logs in
- **THEN** the failed_login_attempts counter is reset to 0
- **AND** the account_locked_until timestamp is cleared
- **AND** account lockout status is cleared

#### Scenario: Successful login unlocks account
- **WHEN** a user successfully logs in
- **THEN** any existing account lockout is cleared
- **AND** the account is immediately available for normal use
- **AND** failed attempts counter starts fresh

### Requirement: Lockout information is communicated to users
The system SHALL provide clear information to users about account lockout status.

#### Scenario: Lockout error message includes unlock time
- **WHEN** a login attempt is made for a locked account
- **THEN** error message indicates account is locked
- **AND** error message includes when the account will be unlocked
- **AND** error message is user-friendly and helpful

#### Scenario: Lockout warning is shown before lockout
- **WHEN** a user has multiple failed login attempts (e.g., 3 out of 5)
- **THEN** warning message indicates remaining attempts before lockout
- **AND** users are informed about lockout policy
- **AND** warning helps prevent accidental lockouts

### Requirement: Account lockout fields exist in database
The system SHALL store account lockout information in the users table.

#### Scenario: Users table includes lockout fields
- **WHEN** database schema is updated
- **THEN** users table includes failed_login_attempts field (INTEGER, default 0)
- **AND** users table includes account_locked_until field (TEXT, nullable)
- **AND** fields are properly indexed for efficient queries
