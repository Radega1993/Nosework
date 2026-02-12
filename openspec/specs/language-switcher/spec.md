# language-switcher Specification

## Purpose
Provide a UI component that allows users to switch between available languages (ES, CA), with persistence of language selection in cookies and localStorage.

## Requirements

### Requirement: Language switcher component exists
The system SHALL provide a `LanguageSwitcher` component that displays available languages and allows users to switch between them.

#### Scenario: LanguageSwitcher component is available
- **WHEN** a developer needs to add language switching functionality
- **THEN** a `LanguageSwitcher` component exists in `components/LanguageSwitcher.js`
- **AND** the component can be imported and used in pages or other components
- **AND** the component follows React component patterns (functional component with hooks)

#### Scenario: LanguageSwitcher displays available languages
- **WHEN** the `LanguageSwitcher` component is rendered
- **THEN** it displays available languages (ES and CA initially)
- **AND** the current language is visually indicated (e.g., highlighted or marked as active)
- **AND** languages are displayed with their native names (Español, Català)

#### Scenario: LanguageSwitcher allows language selection
- **WHEN** a user clicks on a language option in the `LanguageSwitcher`
- **THEN** the system navigates to the same page in the selected language
- **AND** the URL changes to include the new language prefix
- **AND** the page content updates (or remains the same if not translated yet)

### Requirement: Language selection persists in cookie
The system SHALL persist the user's language selection in a cookie named `NEXT_LOCALE`.

#### Scenario: Language selection is saved to cookie
- **WHEN** a user selects a language via `LanguageSwitcher`
- **THEN** the selected language is saved to a cookie named `NEXT_LOCALE`
- **AND** the cookie value is the language code (e.g., "es", "ca")
- **AND** the cookie is accessible from both client and server-side code

#### Scenario: Cookie persists across sessions
- **WHEN** a user returns to the site after closing the browser
- **THEN** the language preference from the cookie is used
- **AND** the user is redirected to the appropriate language version
- **AND** the cookie persists for a reasonable duration (e.g., 1 year)

### Requirement: Language selection persists in localStorage
The system SHALL also persist the user's language selection in localStorage as a fallback.

#### Scenario: Language selection is saved to localStorage
- **WHEN** a user selects a language via `LanguageSwitcher`
- **THEN** the selected language is saved to localStorage with key `NEXT_LOCALE`
- **AND** localStorage is used as a fallback if cookie is not available
- **AND** cookie takes precedence over localStorage when both exist

### Requirement: LanguageSwitcher integrates with Navbar
The system SHALL integrate the `LanguageSwitcher` component into the main navigation bar.

#### Scenario: LanguageSwitcher appears in Navbar
- **WHEN** the `Navbar` component is rendered
- **THEN** it includes the `LanguageSwitcher` component
- **AND** the `LanguageSwitcher` is positioned appropriately (e.g., top right corner)
- **AND** the `LanguageSwitcher` is visible on both desktop and mobile views

#### Scenario: LanguageSwitcher is accessible
- **WHEN** the `LanguageSwitcher` is rendered
- **THEN** it is keyboard accessible
- **AND** it has appropriate ARIA labels for screen readers
- **AND** it follows accessibility best practices (WCAG 2.1 AA)

### Requirement: LanguageSwitcher handles edge cases
The system SHALL handle edge cases gracefully when switching languages.

#### Scenario: LanguageSwitcher preserves current page path
- **WHEN** a user switches language from `/es/eventos/123` to Catalan
- **THEN** the system navigates to `/ca/eventos/123` (same page, different language)
- **AND** query parameters are preserved if present
- **AND** hash fragments are preserved if present

#### Scenario: LanguageSwitcher handles missing translations
- **WHEN** a user switches to a language that doesn't have content yet
- **THEN** the system still navigates to the URL with the new language prefix
- **AND** the page renders (showing Spanish content as fallback if needed)
- **AND** the language preference is still saved
