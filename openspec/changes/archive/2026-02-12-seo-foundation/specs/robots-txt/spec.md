# robots-txt Specification

## Purpose
Configure robots.txt to control search engine crawling behavior, allowing public pages to be indexed while blocking private routes and referencing sitemaps.

## ADDED Requirements

### Requirement: Robots.txt file exists and is accessible
The system SHALL provide a robots.txt file at `/robots.txt` that is accessible to search engine crawlers.

#### Scenario: Robots.txt is accessible
- **WHEN** a search engine crawler requests `/robots.txt`
- **THEN** the system returns a valid robots.txt file
- **AND** the file is served with appropriate content-type (`text/plain`)
- **AND** the file is accessible without authentication

#### Scenario: Robots.txt uses correct format
- **WHEN** robots.txt is accessed
- **THEN** it follows the robots.txt standard format
- **AND** it uses proper line breaks and syntax
- **AND** it is readable by search engine crawlers

### Requirement: Robots.txt allows public pages
The robots.txt file SHALL allow crawling of all public pages by default.

#### Scenario: Public pages are allowed
- **WHEN** robots.txt is configured
- **THEN** it includes `Allow: /` to permit crawling of public pages
- **AND** it applies to all user agents (`User-agent: *`)
- **AND** public pages like homepage, events, about, etc. are crawlable

### Requirement: Robots.txt blocks private routes
The robots.txt file SHALL disallow crawling of private routes including dashboard, API endpoints, and admin pages.

#### Scenario: Dashboard routes are blocked
- **WHEN** robots.txt is configured
- **THEN** it includes `Disallow: /dashboard/` to block crawling of dashboard pages
- **AND** dashboard routes are not indexed by search engines

#### Scenario: API routes are blocked
- **WHEN** robots.txt is configured
- **THEN** it includes `Disallow: /api/` to block crawling of API endpoints
- **AND** API routes are not indexed by search engines

#### Scenario: Admin routes are blocked
- **WHEN** robots.txt is configured
- **THEN** it includes `Disallow: /admin/` to block crawling of admin pages
- **AND** admin routes are not indexed by search engines

### Requirement: Robots.txt references sitemaps
The robots.txt file SHALL include references to all available sitemaps to help search engines discover them.

#### Scenario: Main sitemap is referenced
- **WHEN** robots.txt is configured
- **THEN** it includes `Sitemap: https://www.noseworktrialcommunity.com/sitemap.xml`
- **AND** the sitemap URL uses absolute HTTPS URL
- **AND** the sitemap reference uses proper `Sitemap:` directive

#### Scenario: Events sitemap is referenced
- **WHEN** robots.txt is configured
- **THEN** it includes `Sitemap: https://www.noseworktrialcommunity.com/sitemap-events.xml`
- **AND** all available sitemaps are listed
- **AND** sitemap URLs are absolute and use HTTPS

### Requirement: Robots.txt is static and maintainable
The robots.txt file SHALL be a static file that is easy to maintain and update.

#### Scenario: Robots.txt is stored in public directory
- **WHEN** robots.txt is implemented
- **THEN** it is stored as a static file in the `public/` directory
- **AND** it is served directly by Next.js without requiring dynamic generation
- **AND** it can be easily edited and version controlled
