# seo-meta-tags Specification

## Purpose
Provide a consistent, reusable system for managing SEO meta tags across all public pages, ensuring proper title tags, meta descriptions, Open Graph tags, Twitter Cards, and canonical URLs.

## ADDED Requirements

### Requirement: SEOHead component provides meta tags
The system SHALL provide a reusable `SEOHead` component that generates all necessary SEO meta tags including title, description, Open Graph tags, Twitter Cards, and canonical URL.

#### Scenario: SEOHead component accepts required props
- **WHEN** a page uses the `SEOHead` component
- **THEN** it accepts `title` prop for the page title
- **AND** it accepts `description` prop for the meta description
- **AND** it accepts `canonical` prop for the canonical URL path
- **AND** all props are required or have sensible defaults

#### Scenario: SEOHead generates title tag
- **WHEN** `SEOHead` is used with a title prop
- **THEN** it generates a `<title>` tag with the provided title
- **AND** the title follows the format specified in seo_plan.md (e.g., "[Page Title] – Nosework Trial")
- **AND** the title is properly escaped for HTML

#### Scenario: SEOHead generates meta description
- **WHEN** `SEOHead` is used with a description prop
- **THEN** it generates a `<meta name="description">` tag
- **AND** the description is truncated to 160 characters if longer
- **AND** the description is properly escaped for HTML

#### Scenario: SEOHead generates canonical URL
- **WHEN** `SEOHead` is used with a canonical prop
- **THEN** it generates a `<link rel="canonical">` tag
- **AND** it uses the `getCanonicalUrl()` utility to generate absolute URLs
- **AND** the canonical URL uses HTTPS and the correct domain

### Requirement: SEOHead supports Open Graph tags
The system SHALL generate Open Graph meta tags for social media sharing when using `SEOHead`.

#### Scenario: Open Graph tags are generated
- **WHEN** `SEOHead` is used with Open Graph props
- **THEN** it generates `og:title`, `og:description`, `og:type`, `og:url`, and `og:image` tags
- **AND** Open Graph tags use the provided values or sensible defaults
- **AND** `og:image` defaults to a site-wide image if not provided

#### Scenario: Open Graph image is optimized
- **WHEN** `og:image` is specified
- **THEN** the image URL is absolute (includes domain)
- **AND** the image path is validated or uses a default fallback
- **AND** the image meets recommended Open Graph dimensions (1200x630px)

### Requirement: SEOHead supports Twitter Card tags
The system SHALL generate Twitter Card meta tags for Twitter sharing when using `SEOHead`.

#### Scenario: Twitter Card tags are generated
- **WHEN** `SEOHead` is used
- **THEN** it generates Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- **AND** Twitter Card uses "summary_large_image" format by default
- **AND** Twitter Card tags use the same values as Open Graph tags when appropriate

### Requirement: SEOHead supports custom Schema.org markup
The system SHALL allow pages to provide custom Schema.org JSON-LD markup through `SEOHead`.

#### Scenario: Custom schema can be provided
- **WHEN** `SEOHead` is used with a `schema` prop
- **THEN** it includes the provided Schema.org JSON-LD in a `<script type="application/ld+json">` tag
- **AND** the schema is properly formatted and escaped
- **AND** multiple schema objects can be provided (as an array)

#### Scenario: SEOHead supports breadcrumbs schema
- **WHEN** `SEOHead` is used with a `breadcrumbs` prop
- **THEN** it generates Schema.org BreadcrumbList JSON-LD automatically
- **AND** breadcrumbs schema matches the breadcrumb items provided
- **AND** breadcrumb schema uses proper Schema.org structure

### Requirement: SEOHead utility functions exist
The system SHALL provide utility functions for generating canonical URLs and other SEO-related values.

#### Scenario: getCanonicalUrl utility exists
- **WHEN** `getCanonicalUrl(path)` is called
- **THEN** it returns an absolute URL with the site domain
- **AND** it uses `NEXT_PUBLIC_SITE_URL` environment variable or defaults to production domain
- **AND** it handles paths with or without leading slash consistently
- **AND** it does not add trailing slashes unless required

#### Scenario: Utility functions are exported
- **WHEN** SEO utilities are needed
- **THEN** `getCanonicalUrl` is exported from `utils/seo.js`
- **AND** other SEO utilities (e.g., `getSportsOrganizationSchema`) are also exported
- **AND** utilities can be used independently of `SEOHead` component

### Requirement: All public pages use SEOHead
The system SHALL ensure all public pages use the `SEOHead` component for consistent meta tags.

#### Scenario: Homepage uses SEOHead
- **WHEN** the homepage is rendered
- **THEN** it uses `SEOHead` with appropriate title, description, and canonical URL
- **AND** meta tags match the templates in seo_plan.md

#### Scenario: Events list page uses SEOHead
- **WHEN** the events list page is rendered
- **THEN** it uses `SEOHead` with appropriate meta tags
- **AND** canonical URL points to `/events`

#### Scenario: Event detail page uses SEOHead
- **WHEN** an event detail page is rendered
- **THEN** it uses `SEOHead` with dynamic title and description from event data
- **AND** canonical URL points to the specific event URL
- **AND** Open Graph image uses event image if available

#### Scenario: Other public pages use SEOHead
- **WHEN** other public pages (about, contact, que-es-nosework-trial, etc.) are rendered
- **THEN** they use `SEOHead` with appropriate meta tags
- **AND** meta tags follow templates from seo_plan.md
- **AND** canonical URLs are properly set
