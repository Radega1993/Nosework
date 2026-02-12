# sitemap-generation Specification

## Purpose
Generate dynamic sitemap.xml files for the site, including static pages and dynamic content (events) with language prefixes to help search engines discover and index all public pages efficiently.

## Requirements

### Requirement: Sitemap index is generated
The system SHALL generate a sitemap index (`/sitemap.xml`) that references all individual sitemaps (static pages, events, and future sitemaps for blog/clubs when available).

#### Scenario: Sitemap index is accessible
- **WHEN** a search engine crawler requests `/sitemap.xml`
- **THEN** the system returns a valid XML sitemap index document
- **AND** the sitemap index includes references to `/sitemap-events.xml`
- **AND** the sitemap index uses proper XML sitemap index format (`<sitemapindex>`)
- **AND** each sitemap reference includes `<loc>` and `<lastmod>` tags

#### Scenario: Sitemap index references static pages sitemap
- **WHEN** the sitemap index is generated
- **THEN** it includes a reference to a sitemap containing static pages (homepage, about, events list, etc.)
- **AND** static pages sitemap includes priority and changefreq attributes

### Requirement: Static pages sitemap is generated
The system SHALL generate a sitemap for static pages including homepage, about, events list, and other public static pages with appropriate priorities and change frequencies, using language-prefixed URLs.

#### Scenario: Static pages are included in sitemap
- **WHEN** the static pages sitemap is generated
- **THEN** it includes the homepage (`/es/`) with priority 1.0 and changefreq "daily"
- **AND** it includes main content pages (`/es/que-es-nosework-trial`, `/es/reglamento`, `/es/como-empezar`) with priority 0.9 and changefreq "weekly"
- **AND** it includes `/es/eventos` with priority 0.8 and changefreq "daily"
- **AND** it includes other public pages (`/es/about`, `/es/contact`) with appropriate priorities
- **AND** each URL includes `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags
- **AND** all URLs include the `/es/` language prefix

#### Scenario: Static pages sitemap excludes private routes
- **WHEN** the static pages sitemap is generated
- **THEN** it does not include routes under `/dashboard`, `/api`, or `/admin`
- **AND** it only includes publicly accessible pages
- **AND** it does not include URLs without language prefixes

### Requirement: Events sitemap is generated dynamically
The system SHALL generate a sitemap for events (`/sitemap-events.xml`) dynamically from the database, including only future events and recent past events (last 30 days), with language-prefixed URLs.

#### Scenario: Events sitemap includes future events
- **WHEN** the events sitemap is generated
- **THEN** it includes all events with dates in the future
- **AND** each event URL follows the pattern `/es/eventos/[id]` (with language prefix)
- **AND** each event entry includes `<loc>`, `<lastmod>`, `<changefreq>` ("daily"), and `<priority>` (0.7)
- **AND** the sitemap is generated dynamically from the events database table
- **AND** all event URLs include the `/es/` language prefix

#### Scenario: Events sitemap includes recent past events
- **WHEN** the events sitemap is generated
- **THEN** it includes events from the last 30 days (if any)
- **AND** events older than 30 days are excluded from the sitemap
- **AND** this ensures the sitemap remains relevant and manageable
- **AND** past event URLs include the `/es/` language prefix

#### Scenario: Events sitemap excludes private or cancelled events
- **WHEN** the events sitemap is generated
- **THEN** it only includes events that are publicly visible
- **AND** cancelled or private events are excluded
- **AND** the sitemap respects event visibility settings

### Requirement: Sitemaps are valid XML
The system SHALL generate sitemaps that conform to the XML Sitemap protocol and are valid according to sitemap standards.

#### Scenario: Sitemap XML is well-formed
- **WHEN** a sitemap is generated
- **THEN** the XML is well-formed and valid
- **AND** it includes proper XML declaration (`<?xml version="1.0" encoding="UTF-8"?>`)
- **AND** it uses correct XML namespace for sitemap (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`)
- **AND** URLs are properly escaped and encoded

#### Scenario: Sitemap URLs are absolute
- **WHEN** URLs are included in sitemaps
- **THEN** all URLs use absolute paths with the full domain (e.g., `https://www.noseworktrialcommunity.com/es/eventos/1`)
- **AND** URLs use HTTPS protocol
- **AND** URLs do not include trailing slashes unless required
- **AND** all URLs include the language prefix (`/es/` or `/ca/`)

### Requirement: Sitemap generation is performant
The system SHALL generate sitemaps efficiently, limiting database queries and response time.

#### Scenario: Events sitemap limits database queries
- **WHEN** the events sitemap is generated
- **THEN** it uses a single efficient database query to fetch events
- **AND** it limits results to relevant events (future + last 30 days)
- **AND** it does not fetch unnecessary event data

#### Scenario: Sitemap generation handles errors gracefully
- **WHEN** an error occurs during sitemap generation (e.g., database error)
- **THEN** the system returns an appropriate HTTP error status
- **AND** it does not expose sensitive error information
- **AND** it logs the error for debugging purposes

### Requirement: Sitemap prepares for future multilingual content
The system SHALL generate sitemaps with structure ready for multiple languages, but initially only includes Spanish URLs.

#### Scenario: Sitemap structure supports multiple languages
- **WHEN** the sitemap is generated
- **THEN** it uses a structure that can be extended to include multiple language versions
- **AND** currently only Spanish (`/es/`) URLs are included
- **AND** the structure allows adding `/ca/` URLs when Catalan translations are available

#### Scenario: Sitemap does not duplicate content across languages
- **WHEN** multiple language versions exist for the same page
- **THEN** each language version is included as a separate URL entry
- **AND** URLs are clearly differentiated by language prefix
- **AND** no duplicate content warnings are generated
