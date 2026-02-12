# language-detection Specification

## Purpose
Automatically detect the user's preferred language from browser settings and redirect them to the appropriate language version on first visit, while respecting explicit language selections.

## Requirements

### Requirement: Browser language is detected
The system SHALL detect the user's preferred language from browser Accept-Language header on first visit.

#### Scenario: Browser language header is read
- **WHEN** a user visits the site for the first time (no language cookie exists)
- **THEN** the system reads the `Accept-Language` header from the request
- **AND** the system parses the header to determine preferred language
- **AND** the system maps browser language codes to supported languages (es, ca)

#### Scenario: Language detection maps to supported languages
- **WHEN** browser language is "es" or "es-ES"
- **THEN** the system maps it to Spanish (`es`)
- **AND** the user is redirected to `/es/...` URLs

#### Scenario: Catalan language is detected
- **WHEN** browser language is "ca" or "ca-ES"
- **THEN** the system maps it to Catalan (`ca`)
- **AND** the user is redirected to `/ca/...` URLs

#### Scenario: Unsupported languages default to Spanish
- **WHEN** browser language is not Spanish or Catalan (e.g., "en", "fr", "de")
- **THEN** the system defaults to Spanish (`es`)
- **AND** the user is redirected to `/es/...` URLs

### Requirement: Language detection respects explicit selection
The system SHALL prioritize explicit language selection (cookie) over browser language detection.

#### Scenario: Cookie takes precedence over browser language
- **WHEN** a user has a `NEXT_LOCALE` cookie set to "ca"
- **THEN** the system uses the cookie value regardless of browser language
- **AND** browser language detection is skipped
- **AND** the user is redirected to `/ca/...` URLs

#### Scenario: Explicit selection overrides detection
- **WHEN** a user has previously selected a language via `LanguageSwitcher`
- **THEN** subsequent visits use the saved preference
- **AND** browser language detection is not performed
- **AND** the user is redirected to their preferred language

### Requirement: Language detection happens in middleware
The system SHALL perform language detection in Next.js middleware before page rendering.

#### Scenario: Middleware detects language on first visit
- **WHEN** a user visits the site without a language cookie
- **THEN** middleware reads the `Accept-Language` header
- **AND** middleware determines the appropriate language
- **AND** middleware redirects to the URL with language prefix
- **AND** middleware sets the `NEXT_LOCALE` cookie

#### Scenario: Language detection is efficient
- **WHEN** language detection occurs
- **THEN** it does not significantly impact page load time
- **AND** it uses minimal processing resources
- **AND** it only runs when necessary (no cookie exists)

### Requirement: Language detection handles edge cases
The system SHALL handle edge cases gracefully during language detection.

#### Scenario: Multiple language preferences are handled
- **WHEN** browser sends multiple languages in Accept-Language header (e.g., "es,ca;q=0.9,en;q=0.8")
- **THEN** the system uses the highest priority supported language
- **AND** quality values (q-values) are respected
- **AND** Spanish is used as fallback if no supported language is found

#### Scenario: Invalid Accept-Language header is handled
- **WHEN** Accept-Language header is malformed or missing
- **THEN** the system defaults to Spanish (`es`)
- **AND** the user is redirected to `/es/...` URLs
- **AND** no error is thrown

#### Scenario: Language detection works with API routes excluded
- **WHEN** a request is made to `/api/*` routes
- **THEN** language detection does not run
- **AND** API routes are not affected by language detection logic
