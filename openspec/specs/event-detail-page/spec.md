# event-detail-page Specification

## Purpose
TBD - created by archiving change events-public-pages. Update Purpose after archive.
## Requirements
### Requirement: Event detail page displays complete event information
The event detail page SHALL display all available information about the event including title, date, time, location, address, city, postal code, level, type, description, price, registration dates, and maximum participants.

#### Scenario: Basic event information is displayed
- **WHEN** user visits `/events/[id]`
- **THEN** the event title is displayed prominently as an H1 heading
- **AND** the event date is displayed and formatted in Spanish locale (e.g., "15 de marzo de 2025")
- **AND** the event time is displayed if available
- **AND** the event description is displayed in a readable format
- **AND** all information is clearly structured and easy to scan

#### Scenario: Location information is displayed
- **WHEN** event has location data
- **THEN** the location, address, city, and postal code are displayed
- **AND** location information is formatted clearly
- **AND** if location data is not available, the field is gracefully omitted or shows a placeholder

#### Scenario: Event level and type are displayed
- **WHEN** event has level or type information
- **THEN** the level (Base or Avanzado) is displayed as a badge or label
- **AND** the event type (interior, exterior, vehiculos, contenedores) is displayed if available
- **AND** if level or type is not available, the field is gracefully omitted

#### Scenario: Registration information is displayed
- **WHEN** event has registration details
- **THEN** registration start and end dates are displayed if available
- **AND** event price is displayed if available
- **AND** maximum participants and current registration count are displayed if available
- **AND** registration status (open, closed, cancelled) is clearly indicated

### Requirement: Event detail page displays organizer information
The event detail page SHALL display information about the club or organizer hosting the event, if available.

#### Scenario: Organizer information is displayed
- **WHEN** event has an associated club or organizer
- **THEN** the organizer name is displayed
- **AND** organizer contact information (email, phone) is displayed if available
- **AND** organizer website or social media links are displayed if available
- **AND** if organizer information is not available, the section is gracefully omitted

#### Scenario: Organizer information links to club page
- **WHEN** organizer has a club page or profile
- **THEN** the organizer name or logo links to the club page
- **AND** the link uses proper Next.js Link component
- **AND** the link is accessible via keyboard navigation

### Requirement: Event detail page includes call-to-action for registration
The event detail page SHALL include a call-to-action button or link for event registration, if registration is open and applicable.

#### Scenario: Registration CTA is displayed for open events
- **WHEN** event registration is open
- **THEN** a prominent "Inscribirse" or "Registrarse" button is displayed
- **AND** the button links to the registration page or opens a registration modal
- **AND** the button is visually prominent and accessible

#### Scenario: Registration CTA is hidden for closed events
- **WHEN** event registration is closed or event is cancelled
- **THEN** the registration button is not displayed or is disabled
- **AND** an appropriate message is shown (e.g., "Inscripciones cerradas" or "Evento cancelado")
- **AND** the message is clear and accessible

### Requirement: Event detail page includes breadcrumbs
The event detail page SHALL include breadcrumb navigation to help users understand their location and navigate back to the events list.

#### Scenario: Breadcrumbs are displayed
- **WHEN** user views the event detail page
- **THEN** breadcrumbs are displayed showing: Inicio > Eventos > [Event Title]
- **AND** breadcrumb links are functional and use Next.js Link component
- **AND** breadcrumbs are accessible via keyboard navigation
- **AND** breadcrumbs use proper semantic HTML (`<nav>` with `<ol>`)

### Requirement: Event detail page includes Schema.org markup
The event detail page SHALL include comprehensive Schema.org `SportsEvent` JSON-LD markup for SEO purposes.

#### Scenario: Schema.org markup is present and complete
- **WHEN** user views the event detail page
- **THEN** the page includes JSON-LD script tag with `SportsEvent` schema
- **AND** the schema includes all available event information (name, startDate, location, organizer, etc.)
- **AND** the schema includes required fields according to Schema.org specifications
- **AND** the schema markup is valid and can be tested with Google Rich Results Test

#### Scenario: Schema.org markup includes location data
- **WHEN** event has location information
- **THEN** the schema includes `location` property with `Place` schema
- **AND** address, city, and postal code are included if available
- **AND** geographic coordinates are included if available

#### Scenario: Schema.org markup includes organizer data
- **WHEN** event has organizer information
- **THEN** the schema includes `organizer` property with `Organization` or `Person` schema
- **AND** organizer name and contact information are included if available

### Requirement: Event detail page includes SEO meta tags
The event detail page SHALL include optimized meta tags for SEO including dynamic title, description, Open Graph tags, and canonical URL specific to the event.

#### Scenario: Dynamic SEO meta tags are present
- **WHEN** user views the event detail page
- **THEN** the page includes a dynamic `<title>` tag with event name (e.g., "[Event Name] - Nosework Trial")
- **AND** the page includes a dynamic `<meta name="description">` tag with event summary
- **AND** the page includes Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- **AND** the page includes Twitter Card tags if applicable
- **AND** the page includes a canonical URL pointing to the event detail page

#### Scenario: Open Graph image is optimized
- **WHEN** event has an image
- **THEN** the `og:image` tag uses the event image
- **AND** if event has no image, a default image is used
- **AND** the image meets Open Graph size requirements (1200x630px recommended)

### Requirement: Event detail page handles loading and error states
The event detail page SHALL display appropriate loading indicators while fetching event data and error messages if the event is not found or the API request fails.

#### Scenario: Loading state is displayed
- **WHEN** the page is fetching event data from the API
- **THEN** a loading indicator or skeleton is displayed
- **AND** the loading state is visually consistent with the page design
- **AND** the page structure is visible during loading (header, breadcrumbs)

#### Scenario: Error state is handled gracefully
- **WHEN** the event is not found (404)
- **THEN** a 404 error page or message is displayed
- **AND** the error message is user-friendly
- **AND** a link back to the events list is provided
- **AND** the error page includes proper SEO meta tags

#### Scenario: API error is handled gracefully
- **WHEN** the API request fails
- **THEN** an appropriate error message is displayed
- **AND** the error message is user-friendly and accessible
- **AND** a retry option is provided if applicable
- **AND** the error does not break the page layout

### Requirement: Event detail page includes related events section
The event detail page SHALL display a section with related or upcoming events to encourage further exploration.

#### Scenario: Related events are displayed
- **WHEN** user views the event detail page
- **THEN** a "Próximos Eventos" or "Eventos Relacionados" section is displayed
- **AND** the section shows 3-5 upcoming events (excluding the current event)
- **AND** events are displayed using the `EventCard` component for consistency
- **AND** each event links to its detail page

#### Scenario: Related events section is optional
- **WHEN** there are no other upcoming events
- **THEN** the related events section is gracefully omitted or shows an appropriate message
- **AND** the page layout remains consistent

### Requirement: Event detail page is responsive
The event detail page SHALL adapt its layout for mobile, tablet, and desktop viewports, ensuring usability across all device sizes.

#### Scenario: Event detail page displays correctly on mobile
- **WHEN** user views the page on mobile (viewport width < 768px)
- **THEN** content is displayed in a single column layout
- **AND** images and media are appropriately sized for mobile
- **AND** buttons and interactive elements are touch-friendly
- **AND** text is readable without zooming

#### Scenario: Event detail page displays correctly on tablet
- **WHEN** user views the page on tablet (viewport width 768px - 1024px)
- **THEN** content layout adapts appropriately
- **AND** images and media are appropriately sized
- **AND** all functionality is accessible and usable

#### Scenario: Event detail page displays correctly on desktop
- **WHEN** user views the page on desktop (viewport width > 1024px)
- **THEN** content uses optimal spacing and layout
- **AND** related events section may use a sidebar or multi-column layout
- **AND** spacing and visual hierarchy are optimized for desktop viewing

### Requirement: Event detail page meets accessibility standards
The event detail page SHALL meet WCAG 2.1 AA accessibility standards including proper semantic HTML, keyboard navigation, and screen reader support.

#### Scenario: Event detail page is keyboard accessible
- **WHEN** user navigates using keyboard only
- **THEN** all interactive elements (links, buttons, breadcrumbs) are focusable via Tab key
- **AND** focus indicators are clearly visible
- **AND** keyboard shortcuts work correctly (Enter to activate links)

#### Scenario: Event detail page is screen reader accessible
- **WHEN** screen reader users access the page
- **THEN** the page uses semantic HTML (e.g., `<main>`, `<article>`, `<section>`)
- **AND** the page has a proper heading hierarchy (H1 for event title, H2 for sections)
- **AND** images have descriptive alt text
- **AND** ARIA labels are provided where necessary
- **AND** the page has skip navigation links if applicable

#### Scenario: Event detail page has proper color contrast
- **WHEN** user views the page
- **THEN** all text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- **AND** interactive elements have sufficient contrast
- **AND** focus indicators are clearly visible

### Requirement: Event detail page includes social sharing
The event detail page SHALL include social sharing buttons or links for common platforms (Facebook, Twitter, WhatsApp) to encourage event promotion.

#### Scenario: Social sharing buttons are displayed
- **WHEN** user views the event detail page
- **THEN** social sharing buttons are displayed (Facebook, Twitter, WhatsApp, etc.)
- **AND** sharing buttons use proper URLs with event information
- **AND** sharing buttons are accessible via keyboard navigation
- **AND** sharing opens in a new window/tab

#### Scenario: Social sharing includes event information
- **WHEN** user clicks a social sharing button
- **THEN** the shared content includes event title, date, and link
- **AND** the shared content is properly formatted for each platform
- **AND** Open Graph tags ensure proper preview on social platforms

