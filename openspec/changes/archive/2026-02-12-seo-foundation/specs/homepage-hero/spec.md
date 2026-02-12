# homepage-hero Specification

## Purpose
TBD - created by archiving change homepage-hero-section. Update Purpose after archive.

## MODIFIED Requirements

### Requirement: Homepage includes Schema.org SportsOrganization markup
The homepage SHALL include comprehensive Schema.org `SportsOrganization` JSON-LD markup with all required and recommended fields for SEO purposes.

#### Scenario: SportsOrganization schema is present and complete
- **WHEN** user views the homepage
- **THEN** the page includes JSON-LD script tag with `SportsOrganization` schema
- **AND** the schema includes `@context: "https://schema.org"` and `@type: "SportsOrganization"`
- **AND** the schema includes required fields: `name`, `url`, `sport`
- **AND** the schema includes recommended fields: `alternateName`, `description`, `logo`, `areaServed`, `sameAs`, `contactPoint`
- **AND** the schema markup is valid and can be tested with Google Rich Results Test

#### Scenario: SportsOrganization schema includes organization details
- **WHEN** SportsOrganization schema is generated
- **THEN** it includes `name: "Nosework Trial Community"` and `alternateName: "NTC"`
- **AND** it includes a descriptive `description` field
- **AND** it includes `url` pointing to the homepage
- **AND** it includes `sport: "Nosework Trial"`

#### Scenario: SportsOrganization schema includes logo
- **WHEN** SportsOrganization schema is generated
- **THEN** it includes a `logo` field with absolute URL to the organization logo
- **AND** the logo URL uses HTTPS and points to a valid image file
- **AND** if logo is not available, the field is omitted gracefully

#### Scenario: SportsOrganization schema includes contact information
- **WHEN** SportsOrganization schema is generated
- **THEN** it includes a `contactPoint` object with `@type: "ContactPoint"`
- **AND** contactPoint includes `email` and `contactType: "customer service"`
- **AND** contact information is properly formatted

#### Scenario: SportsOrganization schema includes social media links
- **WHEN** SportsOrganization schema is generated
- **THEN** it includes a `sameAs` array with social media profile URLs (Facebook, Instagram, etc.)
- **AND** social media URLs are absolute and use HTTPS
- **AND** if social media links are not available, the array is empty or omitted

#### Scenario: SportsOrganization schema includes area served
- **WHEN** SportsOrganization schema is generated
- **THEN** it includes an `areaServed` object with `@type: "Country"` and `name: "España"`
- **AND** area served information helps search engines understand geographic scope
