# events-list-page Specification

## Purpose
TBD - created by archiving change events-public-pages. Update Purpose after archive.
## Requirements
### Requirement: Events list page displays events in multiple views
The events list page SHALL support three viewing modes: Calendar view, List view, and Grid view, with the ability to toggle between them.

#### Scenario: Calendar view is available
- **WHEN** user visits `/events`
- **THEN** the calendar view is displayed by default (on mobile) or available as an option
- **AND** the calendar shows dates with events marked visually
- **AND** selecting a date filters events to show only events on that date
- **AND** the calendar uses the existing `react-calendar` component

#### Scenario: List view displays events
- **WHEN** user selects list view
- **THEN** events are displayed in a vertical list format
- **AND** each event shows key information (title, date, location, level) in a compact format
- **AND** events are sorted by date (earliest first)
- **AND** each event is clickable and links to the event detail page

#### Scenario: Grid view displays events
- **WHEN** user selects grid view
- **THEN** events are displayed in a card-based grid layout
- **AND** each event card shows visual information (image if available), title, date, location, and level
- **AND** the grid adapts to viewport size (1 column mobile, 2 columns tablet, 3 columns desktop)
- **AND** each event card links to the event detail page

#### Scenario: View toggle is functional
- **WHEN** user clicks on a view toggle button (Calendar/List/Grid)
- **THEN** the page switches to the selected view
- **AND** the selected view is visually indicated (active state)
- **AND** filters and search remain applied across view changes
- **AND** the view preference is stored in URL parameters or localStorage

### Requirement: Events list page supports filtering
The events list page SHALL allow users to filter events by date range, level (Base/Avanzado), type (interior/exterior/vehiculos/contenedores), location/city, and status (open/closed/cancelled).

#### Scenario: Date filter is applied
- **WHEN** user selects a date range filter
- **THEN** only events within the selected date range are displayed
- **AND** the filter is reflected in the URL query parameters
- **AND** the filter persists when switching between views
- **AND** the filter can be cleared to show all events

#### Scenario: Level filter is applied
- **WHEN** user selects a level filter (Base or Avanzado)
- **THEN** only events matching the selected level are displayed
- **AND** if level field is not available in event data, filter is gracefully ignored or hidden
- **AND** multiple levels can be selected if applicable
- **AND** the filter is reflected in URL query parameters

#### Scenario: Type filter is applied
- **WHEN** user selects an event type filter (interior, exterior, vehiculos, contenedores)
- **THEN** only events matching the selected type are displayed
- **AND** if type field is not available in event data, filter is gracefully ignored or hidden
- **AND** multiple types can be selected if applicable
- **AND** the filter is reflected in URL query parameters

#### Scenario: Location filter is applied
- **WHEN** user selects a location or city filter
- **THEN** only events in the selected location are displayed
- **AND** if location field is not available in event data, filter is gracefully ignored or hidden
- **AND** the filter supports text input or dropdown selection
- **AND** the filter is reflected in URL query parameters

#### Scenario: Status filter is applied
- **WHEN** user selects a status filter (open, closed, cancelled)
- **THEN** only events with the selected status are displayed
- **AND** if status field is not available in event data, defaults to showing all events
- **AND** the filter is reflected in URL query parameters

#### Scenario: Multiple filters can be combined
- **WHEN** user applies multiple filters simultaneously
- **THEN** events matching ALL selected filters are displayed
- **AND** filters are combined with AND logic
- **AND** all active filters are visible and can be individually cleared
- **AND** the combined filters are reflected in URL query parameters

### Requirement: Events list page supports text search
The events list page SHALL allow users to search events by title and description using a text search input.

#### Scenario: Search filters events by title
- **WHEN** user enters text in the search input
- **THEN** events with matching text in title are displayed
- **AND** search is case-insensitive
- **AND** search results update as user types (debounced)
- **AND** the search query is reflected in URL query parameters

#### Scenario: Search filters events by description
- **WHEN** user enters text in the search input
- **THEN** events with matching text in description are also displayed
- **AND** search matches partial text (not just exact matches)
- **AND** search is case-insensitive

#### Scenario: Search can be cleared
- **WHEN** user clears the search input
- **THEN** all events matching current filters are displayed
- **AND** the search query parameter is removed from URL

#### Scenario: Search combines with filters
- **WHEN** user applies both search and filters
- **THEN** events matching both search query AND filters are displayed
- **AND** search and filters work together with AND logic

### Requirement: Events list page implements pagination
The events list page SHALL paginate events with a configurable number of events per page (default: 12-20 events per page).

#### Scenario: Pagination displays multiple pages
- **WHEN** there are more events than the page size
- **THEN** pagination controls are displayed (page numbers, previous/next buttons)
- **AND** the current page is visually indicated
- **AND** the page number is reflected in URL query parameters (`?page=2`)

#### Scenario: User can navigate between pages
- **WHEN** user clicks on a page number or navigation button
- **THEN** the page updates to show events for the selected page
- **AND** filters and search remain applied
- **AND** the page scrolls to top or to the events list
- **AND** URL updates with the new page number

#### Scenario: Pagination shows correct page information
- **WHEN** user views a paginated list
- **THEN** the page displays information like "Página X de Y" or "Mostrando X-Y de Z eventos"
- **AND** the information is accessible and clearly visible

### Requirement: Events list page uses EventCard component
The events list page SHALL use the reusable `EventCard` component to display events in grid and list views for consistency with other pages.

#### Scenario: EventCard component is used
- **WHEN** events are displayed in grid or list view
- **THEN** each event is rendered using the `EventCard` component
- **AND** the EventCard displays event title, date, location, level, and other available information
- **AND** the EventCard links to the event detail page (`/events/[id]`)

### Requirement: Events list page synchronizes filters with URL
The events list page SHALL synchronize all filters, search query, pagination, and view mode with URL query parameters to enable sharing and browser navigation.

#### Scenario: URL reflects current state
- **WHEN** user applies filters, search, pagination, or changes view
- **THEN** the URL query parameters are updated (e.g., `?level=base&type=interior&search=barcelona&page=1&view=grid`)
- **AND** the URL is shareable and bookmarkable
- **AND** browser back/forward buttons work correctly

#### Scenario: URL state is restored on page load
- **WHEN** user visits `/events` with query parameters in URL
- **THEN** filters, search, pagination, and view are restored from URL parameters
- **AND** events are filtered and displayed according to URL state
- **AND** invalid parameters are ignored gracefully

### Requirement: Events list page displays loading and error states
The events list page SHALL display appropriate loading indicators while fetching events and error messages if the API request fails.

#### Scenario: Loading state is displayed
- **WHEN** the page is fetching events from the API
- **THEN** a loading indicator or skeleton is displayed
- **AND** the loading state is visually consistent with the page design
- **AND** existing filters and search remain visible during loading

#### Scenario: Error state is handled gracefully
- **WHEN** the API request fails or returns an error
- **THEN** an appropriate error message is displayed
- **AND** the error message is user-friendly and accessible
- **AND** the error message does not break the page layout
- **AND** a retry option is provided if applicable

#### Scenario: Empty state is displayed
- **WHEN** no events match the current filters or search
- **THEN** an appropriate empty state message is displayed
- **AND** the message suggests clearing filters or adjusting search
- **AND** the empty state is visually consistent with the page design

### Requirement: Events list page includes Schema.org markup
The events list page SHALL include Schema.org `SportsEvent` JSON-LD markup for SEO purposes.

#### Scenario: Schema.org markup is present
- **WHEN** user views the events list page
- **THEN** the page includes JSON-LD script tag with `SportsEvent` schema
- **AND** each displayed event is represented in the schema markup
- **AND** the schema includes required fields (name, startDate, location, etc.)
- **AND** the schema markup is valid according to Schema.org specifications

### Requirement: Events list page is responsive
The events list page SHALL adapt its layout for mobile, tablet, and desktop viewports, ensuring usability across all device sizes.

#### Scenario: Events list page displays correctly on mobile
- **WHEN** user views the page on mobile (viewport width < 768px)
- **THEN** filters are displayed in a collapsible section or modal
- **AND** events are displayed in a single column layout
- **AND** pagination controls are touch-friendly
- **AND** view toggle is accessible and functional

#### Scenario: Events list page displays correctly on tablet
- **WHEN** user views the page on tablet (viewport width 768px - 1024px)
- **THEN** filters are displayed in a sidebar or collapsible section
- **AND** events are displayed in a 2-column grid layout
- **AND** all functionality is accessible and usable

#### Scenario: Events list page displays correctly on desktop
- **WHEN** user views the page on desktop (viewport width > 1024px)
- **THEN** filters are displayed in a sidebar
- **AND** events are displayed in a 3-column grid layout (or appropriate columns)
- **AND** spacing and visual hierarchy are optimized for desktop viewing

### Requirement: Events list page meets accessibility standards
The events list page SHALL meet WCAG 2.1 AA accessibility standards including proper semantic HTML, keyboard navigation, and screen reader support.

#### Scenario: Events list page is keyboard accessible
- **WHEN** user navigates using keyboard only
- **THEN** all interactive elements (filters, search, pagination, view toggle, event cards) are focusable via Tab key
- **AND** focus indicators are clearly visible
- **AND** keyboard shortcuts work correctly (Enter to activate, Escape to close modals)

#### Scenario: Events list page is screen reader accessible
- **WHEN** screen reader users access the page
- **THEN** the page uses semantic HTML (e.g., `<main>`, `<section>`, `<article>`, `<nav>`)
- **AND** filters are properly labeled with `<fieldset>` and `<legend>`
- **AND** event cards use proper heading hierarchy
- **AND** ARIA labels are provided where necessary
- **AND** the page has a proper heading structure (H1 → H2 → H3)

#### Scenario: Events list page has proper color contrast
- **WHEN** user views the page
- **THEN** all text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- **AND** interactive elements have sufficient contrast
- **AND** focus indicators are clearly visible

### Requirement: Events list page includes SEO meta tags
The events list page SHALL include optimized meta tags for SEO including title, description, Open Graph tags, and canonical URL.

#### Scenario: SEO meta tags are present
- **WHEN** user views the events list page
- **THEN** the page includes a descriptive `<title>` tag
- **AND** the page includes a `<meta name="description">` tag
- **AND** the page includes Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- **AND** the page includes a canonical URL
- **AND** meta tags are optimized for search engines

