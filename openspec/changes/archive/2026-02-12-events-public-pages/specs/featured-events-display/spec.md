# featured-events-display Specification

## Purpose
TBD - created by archiving change homepage-hero-section. Update Purpose after archive.

## MODIFIED Requirements

### Requirement: Featured events link to event details
Each featured event SHALL include a link or button that navigates to the event detail page (`/events/[id]`) using the reusable `EventCardPublic` component for visual consistency with the events list page and event detail pages.

#### Scenario: Event links are functional
- **WHEN** user clicks on a featured event or its "Ver detalles" button
- **THEN** the user is navigated to the event detail page (e.g., `/events/[id]`)
- **AND** the link uses proper Next.js Link component for client-side navigation
- **AND** the link is accessible via keyboard navigation
- **AND** the event is displayed using the `EventCardPublic` component for visual consistency

## ADDED Requirements

### Requirement: Featured events component uses EventCardPublic component
The featured events component SHALL use the reusable `EventCardPublic` component to display events for visual consistency with the events list page and event detail pages.

#### Scenario: EventCardPublic component is used for featured events
- **WHEN** featured events are displayed on the homepage
- **THEN** each featured event is rendered using the `EventCardPublic` component
- **AND** the EventCardPublic displays event title, date, location, level, and other available information
- **AND** the EventCardPublic links to the event detail page (`/events/[id]`)
- **AND** the EventCardPublic styling is consistent with EventCardPublic usage in the events list page

#### Scenario: EventCardPublic maintains component consistency
- **WHEN** EventCardPublic is used in featured events, events list, and other pages
- **THEN** the visual design and layout are consistent across all usages
- **AND** the component accepts props to customize display if needed (e.g., compact mode for list view)
- **AND** changes to EventCardPublic design automatically apply to all usages
