## ADDED Requirements

### Requirement: Featured events component displays upcoming events
The featured events component SHALL display 3-5 upcoming events fetched from the `/api/events` endpoint, filtered to show only future events sorted by date (earliest first).

#### Scenario: Featured events are displayed
- **WHEN** user visits the homepage
- **THEN** the featured events component fetches events from `/api/events`
- **AND** only events with future dates are displayed
- **AND** events are sorted by date in ascending order (earliest first)
- **AND** a maximum of 5 events are displayed
- **AND** if fewer than 3 events exist, all available events are displayed

#### Scenario: No upcoming events available
- **WHEN** no upcoming events exist in the system
- **THEN** the featured events component displays an appropriate message indicating no upcoming events
- **AND** the component remains visually consistent with the page layout

### Requirement: Featured events display key event information
Each featured event SHALL display the event title, date (formatted in Spanish locale), location, and level (Base or Avanzado) when available.

#### Scenario: Event information is displayed correctly
- **WHEN** an event is displayed in the featured events component
- **THEN** the event title is shown prominently
- **AND** the event date is formatted in Spanish locale (e.g., "15 de marzo de 2025")
- **AND** the event location (city or location field) is displayed
- **AND** the event level ("Base" or "Avanzado") is displayed when available
- **AND** all information is readable and properly formatted

### Requirement: Featured events link to event details
Each featured event SHALL include a link or button that navigates to the event detail page or event listing page.

#### Scenario: Event links are functional
- **WHEN** user clicks on a featured event or its "Ver detalles" button
- **THEN** the user is navigated to the event detail page (e.g., `/events/[id]`) or events listing page
- **AND** the link uses proper Next.js Link component for client-side navigation
- **AND** the link is accessible via keyboard navigation

### Requirement: Featured events component is responsive
The featured events component SHALL adapt its layout for mobile, tablet, and desktop viewports, displaying events in an appropriate grid or list format.

#### Scenario: Featured events display correctly on mobile
- **WHEN** user views featured events on mobile (viewport width < 768px)
- **THEN** events are displayed in a single column layout
- **AND** each event card is appropriately sized for mobile screens
- **AND** text and buttons are sized appropriately for mobile interaction

#### Scenario: Featured events display correctly on tablet
- **WHEN** user views featured events on tablet (viewport width 768px - 1024px)
- **THEN** events are displayed in a 2-column grid layout
- **AND** event cards are sized appropriately for tablet screens

#### Scenario: Featured events display correctly on desktop
- **WHEN** user views featured events on desktop (viewport width > 1024px)
- **THEN** events are displayed in a grid layout (2-3 columns depending on number of events)
- **AND** event cards are sized appropriately for desktop screens
- **AND** spacing and visual hierarchy are optimized for desktop viewing

### Requirement: Featured events component handles loading and error states
The featured events component SHALL display appropriate loading indicators while fetching data and error messages if the API request fails.

#### Scenario: Loading state is displayed
- **WHEN** the featured events component is fetching data from the API
- **THEN** a loading indicator or skeleton is displayed
- **AND** the loading state is visually consistent with the page design

#### Scenario: Error state is handled gracefully
- **WHEN** the API request fails or returns an error
- **THEN** an appropriate error message is displayed
- **AND** the error message does not break the page layout
- **AND** the error message is user-friendly and accessible

### Requirement: Featured events component supports optional "View All Events" link
The featured events component SHALL include an optional "Ver Todos los Eventos" link that navigates to the full events listing page (`/events`).

#### Scenario: View all events link is displayed
- **WHEN** featured events are displayed
- **THEN** a "Ver Todos los Eventos" link or button is shown
- **AND** clicking the link navigates to `/events`
- **AND** the link is visually distinct from individual event links

### Requirement: Featured events component maintains accessibility standards
The featured events component SHALL meet WCAG 2.1 AA accessibility standards including proper semantic HTML, keyboard navigation, and screen reader support.

#### Scenario: Featured events are keyboard accessible
- **WHEN** user navigates using keyboard only
- **THEN** all event links and buttons are focusable via Tab key
- **AND** links can be activated using Enter key
- **AND** focus indicators are clearly visible

#### Scenario: Featured events are screen reader accessible
- **WHEN** screen reader users access the featured events component
- **THEN** the component uses semantic HTML (e.g., `<section>`, `<article>`)
- **AND** event information is properly structured with headings and lists
- **AND** links have descriptive text or ARIA labels
- **AND** the component has an appropriate heading (e.g., "Próximos Eventos")
