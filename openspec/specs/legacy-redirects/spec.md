# legacy-redirects Specification

## Purpose
Provide a system of 301 (permanent) redirects for legacy URLs to their Spanish equivalents or new URLs with language prefixes, ensuring SEO-friendly redirects and consistent URL structure.

## Requirements

### Requirement: Legacy URL redirects are configured
The system SHALL redirect legacy URLs to their Spanish equivalents or URLs with language prefixes using 301 permanent redirects.

#### Scenario: Events URL redirects to Spanish equivalent
- **WHEN** a user or crawler requests `/events`
- **THEN** the system returns a 301 redirect to `/es/eventos`
- **AND** the redirect is permanent (301 status code)
- **AND** the redirect preserves query parameters if present

#### Scenario: Legacy content URLs redirect with language prefix
- **WHEN** a user or crawler requests `/que-es-nosework-trial` without language prefix
- **THEN** the system returns a 301 redirect to `/es/que-es-nosework-trial`
- **AND** the redirect is permanent (301 status code)
- **AND** the redirect preserves query parameters if present

#### Scenario: Redirects are configured in next.config.mjs
- **WHEN** the application starts
- **THEN** redirects are configured in `next.config.mjs` using Next.js redirects configuration
- **AND** redirects are processed before routing
- **AND** redirects are efficient and do not impact performance

### Requirement: Redirects preserve query parameters
The system SHALL preserve query parameters when redirecting legacy URLs.

#### Scenario: Query parameters are preserved in redirects
- **WHEN** a user requests `/events?filter=upcoming`
- **THEN** the system redirects to `/es/eventos?filter=upcoming`
- **AND** all query parameters are preserved in the redirect URL

### Requirement: Redirects handle edge cases
The system SHALL handle edge cases gracefully when redirecting legacy URLs.

#### Scenario: Redirects handle trailing slashes
- **WHEN** a user requests `/events/` (with trailing slash)
- **THEN** the system redirects to `/es/eventos` (without trailing slash)
- **AND** trailing slashes are normalized consistently

#### Scenario: Redirects handle hash fragments
- **WHEN** a user requests `/events#section`
- **THEN** the system redirects to `/es/eventos#section`
- **AND** hash fragments are preserved in the redirect URL
