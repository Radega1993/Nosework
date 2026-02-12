# schema-breadcrumbs Specification

## Purpose
Provide a reusable Breadcrumbs component that renders both visual breadcrumb navigation and Schema.org BreadcrumbList JSON-LD markup for SEO and accessibility.

## Requirements

### Requirement: Breadcrumbs component exists
The system SHALL provide a reusable `Breadcrumbs` component that accepts breadcrumb items and renders both visual navigation and Schema.org markup.

#### Scenario: Breadcrumbs component accepts items prop
- **WHEN** `Breadcrumbs` component is used
- **THEN** it accepts an `items` prop that is an array of breadcrumb objects
- **AND** each breadcrumb object has `label` (string) and `href` (string) properties
- **AND** the component handles empty or missing items gracefully

#### Scenario: Breadcrumbs renders visual navigation
- **WHEN** `Breadcrumbs` component is rendered with items
- **THEN** it renders a `<nav>` element with `aria-label="Breadcrumb"`
- **AND** it uses an ordered list (`<ol>`) for semantic HTML
- **AND** breadcrumb items are displayed with separators (e.g., "Inicio > Eventos > Event Title")
- **AND** all breadcrumb items except the last are clickable links
- **AND** the last breadcrumb item is marked with `aria-current="page"`

#### Scenario: Breadcrumbs uses Next.js Link component
- **WHEN** breadcrumb items include href values
- **THEN** links use Next.js `Link` component for client-side navigation
- **AND** links are accessible via keyboard navigation
- **AND** links have proper focus indicators

### Requirement: Breadcrumbs generates Schema.org BreadcrumbList
The system SHALL automatically generate Schema.org BreadcrumbList JSON-LD markup when `Breadcrumbs` component is used.

#### Scenario: BreadcrumbList schema is generated
- **WHEN** `Breadcrumbs` component is rendered with items
- **THEN** it includes a `<script type="application/ld+json">` tag with BreadcrumbList schema
- **AND** the schema uses `@context: "https://schema.org"` and `@type: "BreadcrumbList"`
- **AND** the schema includes an `itemListElement` array with all breadcrumb items

#### Scenario: BreadcrumbList schema has correct structure
- **WHEN** BreadcrumbList schema is generated
- **THEN** each item in `itemListElement` has `@type: "ListItem"`
- **AND** each item includes `position` (1-based index), `name` (label), and `item` (absolute URL)
- **AND** URLs in schema are absolute (include domain)
- **AND** schema is valid JSON-LD

#### Scenario: BreadcrumbList schema matches visual breadcrumbs
- **WHEN** breadcrumbs are rendered
- **THEN** the Schema.org BreadcrumbList includes the same items as the visual breadcrumbs
- **AND** labels and URLs match between visual and schema
- **AND** schema and visual breadcrumbs stay synchronized

### Requirement: Breadcrumbs component is reusable
The system SHALL allow `Breadcrumbs` component to be used on any page that needs breadcrumb navigation.

#### Scenario: Event detail page uses Breadcrumbs
- **WHEN** an event detail page is rendered
- **THEN** it uses `Breadcrumbs` with items: [{label: "Inicio", href: "/"}, {label: "Eventos", href: "/events"}, {label: event.title, href: `/events/${id}`}]
- **AND** both visual breadcrumbs and Schema.org markup are rendered

#### Scenario: Other pages can use Breadcrumbs
- **WHEN** other pages need breadcrumb navigation (e.g., blog posts, club pages)
- **THEN** they can use `Breadcrumbs` component with appropriate items
- **AND** breadcrumbs work consistently across all pages
- **AND** Schema.org markup is automatically generated

### Requirement: Breadcrumbs are accessible
The system SHALL ensure breadcrumbs meet accessibility standards including keyboard navigation and screen reader support.

#### Scenario: Breadcrumbs support keyboard navigation
- **WHEN** user navigates using keyboard only
- **THEN** all breadcrumb links are focusable via Tab key
- **AND** links can be activated using Enter or Space key
- **AND** focus indicators are clearly visible

#### Scenario: Breadcrumbs are screen reader friendly
- **WHEN** screen reader users access breadcrumbs
- **THEN** the `<nav>` element has proper `aria-label`
- **AND** the last breadcrumb item uses `aria-current="page"` to indicate current page
- **AND** breadcrumb structure is announced correctly by screen readers
