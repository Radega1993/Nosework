# i18n-routing Specification

## Purpose
Provide a routing system with language prefixes (`/es/`, `/ca/`) using Next.js middleware, enabling multilingual URL structure and automatic language detection.

## Requirements

### Requirement: URLs require language prefix
The system SHALL require all public page URLs to include a language prefix (`/es/` or `/ca/`).

#### Scenario: URLs without prefix redirect to Spanish
- **WHEN** a user requests a URL without language prefix (e.g., `/events`, `/about`)
- **THEN** the system returns a 301 redirect to the same URL with `/es/` prefix (e.g., `/es/eventos`, `/es/about`)
- **AND** the redirect is permanent (301 status code)
- **AND** query parameters and hash fragments are preserved

#### Scenario: Valid language prefixes are accepted
- **WHEN** a user requests a URL with valid language prefix (`/es/...` or `/ca/...`)
- **THEN** the system processes the request normally
- **AND** the language prefix is recognized and stored in context
- **AND** the page renders correctly

#### Scenario: Invalid language prefixes redirect to Spanish
- **WHEN** a user requests a URL with invalid language prefix (e.g., `/en/...` or `/fr/...`)
- **THEN** the system redirects to the Spanish equivalent (`/es/...`)
- **AND** the redirect is permanent (301 status code)

### Requirement: Middleware handles language routing
The system SHALL use Next.js middleware to handle language prefix routing and redirections.

#### Scenario: Middleware processes requests before routing
- **WHEN** any request is made to the application
- **THEN** Next.js middleware executes before page routing
- **AND** middleware checks for language prefix in the URL
- **AND** middleware handles redirections when necessary

#### Scenario: Middleware excludes API routes
- **WHEN** a request is made to `/api/*` routes
- **THEN** middleware does not process the request
- **AND** API routes work without language prefixes
- **AND** API routes are not affected by i18n routing

#### Scenario: Middleware excludes static files
- **WHEN** a request is made to static files (images, CSS, JS)
- **THEN** middleware does not process the request
- **AND** static files are served normally without language prefix processing

#### Scenario: Middleware excludes dashboard routes
- **WHEN** a request is made to `/dashboard/*` routes
- **THEN** middleware does not process the request
- **AND** dashboard routes work without language prefixes
- **AND** private routes are not affected by i18n routing

### Requirement: Language prefix is stored in context
The system SHALL store the current language prefix in a way that is accessible to pages and components.

#### Scenario: Language is accessible from router
- **WHEN** a page component uses `useRouter()` from Next.js
- **THEN** the current language can be determined from the URL path
- **AND** the language prefix is available for use in components

#### Scenario: Language context is available server-side
- **WHEN** server-side rendering occurs
- **THEN** the language prefix can be determined from the request URL
- **AND** the language is available for server-side logic

### Requirement: Internal links include language prefix
The system SHALL ensure internal links include the appropriate language prefix.

#### Scenario: Next.js Link components preserve language
- **WHEN** a component uses Next.js `Link` component
- **THEN** links automatically include the current language prefix
- **AND** links maintain language context when navigating

#### Scenario: Programmatic navigation preserves language
- **WHEN** code uses `router.push()` or `router.replace()`
- **THEN** the language prefix is preserved in the navigation
- **AND** relative paths are resolved with the current language prefix
