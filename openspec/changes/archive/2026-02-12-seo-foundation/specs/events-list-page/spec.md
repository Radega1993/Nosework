# events-list-page Specification

## Purpose
TBD - created by archiving change events-public-pages. Update Purpose after archive.

## MODIFIED Requirements

### Requirement: Events list page includes SEO meta tags
The events list page SHALL include optimized meta tags for SEO using the `SEOHead` component, including title, description, Open Graph tags, Twitter Cards, and canonical URL.

#### Scenario: SEO meta tags are present
- **WHEN** user views the events list page
- **THEN** the page uses the `SEOHead` component for all meta tags
- **AND** the page includes a descriptive `<title>` tag (e.g., "Calendario de Eventos Nosework Trial – Pruebas y Competiciones 2025")
- **AND** the page includes a `<meta name="description">` tag with appropriate description
- **AND** the page includes Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- **AND** the page includes Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- **AND** the page includes a canonical URL pointing to `/events`

#### Scenario: Canonical URL uses centralized utility
- **WHEN** canonical URL is generated
- **THEN** it uses the `getCanonicalUrl()` utility function
- **AND** the canonical URL is absolute (includes domain and uses HTTPS)
- **AND** the canonical URL follows consistent format (no trailing slash unless required)
- **AND** the canonical URL points to `/events` (base events list page, without query parameters)
