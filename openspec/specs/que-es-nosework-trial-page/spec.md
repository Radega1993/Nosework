# que-es-nosework-trial-page Specification

## Purpose
The "Qué es Nosework Trial" page provides comprehensive information about the Nosework Trial sport discipline, including its history, benefits, structure, and differences from other modalities. The page serves as the primary entry point for visitors to understand the sport and decide if they want to participate.

## ADDED Requirements

### Requirement: Page displays history and origin of the discipline
The page SHALL explain the history of Nosework Trial, its origin, and inspiration from detection sports (detección deportiva), nosework, and scent work. The page SHALL also explain the philosophy of NTC (Nosework Trial Community) as an open group, not a federation or association.

#### Scenario: History section displays discipline origins
- **WHEN** user visits the "Qué es Nosework Trial" page
- **THEN** the page displays a section explaining the history of the discipline
- **AND** the section explains that Nosework Trial combines elements from:
  - Detection sports (detección deportiva)
  - Traditional nosework (focus on dog welfare and accessibility)
- **AND** the section explains how these approaches combine to create a unique modality focused on learning, inclusion, and enjoyment

#### Scenario: History section explains NTC philosophy
- **WHEN** user views the history section
- **THEN** the page explains that Nosework Trial Community (NTC) is a group dedicated to organizing events and trials where canine detection is the protagonist
- **AND** the page clarifies that NTC is NOT a federation, association, or organization with a chain of command
- **AND** the page explains that any working group or individual wishing to participate is welcome
- **AND** the page emphasizes the focus on originality in recreating scenarios and variables
- **AND** the page explains that organizers have freedom to create trials within minimum standards

### Requirement: Page lists benefits for dogs
The page SHALL list the benefits of Nosework Trial for dogs, including confidence development, mental work, physical exercise, and that it is suitable for all breeds and ages.

#### Scenario: Benefits for dogs section displays comprehensive information
- **WHEN** user views the benefits section
- **THEN** the page displays benefits for dogs including:
  - Confidence development: improves self-esteem and security
  - Mental work: exercises the mind and reduces stress
  - Physical exercise: adapted physical activity for each dog
  - Suitable for all breeds and ages: no limitations
  - Promotes calm: scent work is naturally relaxing

### Requirement: Page lists benefits for guides
The page SHALL list the benefits of Nosework Trial for guides, including bond strengthening, shared activity, and community.

#### Scenario: Benefits for guides section displays comprehensive information
- **WHEN** user views the benefits section
- **THEN** the page displays benefits for guides including:
  - Bond with dog: strengthens relationship and communication
  - Shared activity: enjoy a sport together with your dog
  - Community: meet other nosework enthusiasts
  - Continuous learning: always something new to learn
  - Accessible: no prior experience required

### Requirement: Page explains sport structure with correct levels
The page SHALL explain the sport structure including levels (Base and Avanzado), categories, and types of searches according to the official regulations.

#### Scenario: Sport structure section displays correct levels
- **WHEN** user views the sport structure section
- **THEN** the page displays that Nosework Trial has two levels:
  - **Base**: Initial level, ideal for beginners
  - **Avanzado**: Advanced level, for experienced dogs
- **AND** the page does NOT display generic "Grado 1, 2, 3..." terminology
- **AND** the page explains the progression from Base to Avanzado

#### Scenario: Sport structure section displays level-specific rules
- **WHEN** user views the sport structure section
- **THEN** the page explains Base level rules:
  - No toys or food can be used as distractors
  - Organizer must inform what type of elements will be worked in this level
- **AND** the page explains Avanzado level rules:
  - Everything is valid as long as the organizer can demonstrate (if required) that the tests have been successfully passed with a blank dog or a recording that leaves no doubt

#### Scenario: Sport structure section displays evaluation system details
- **WHEN** user views the sport structure section
- **THEN** the page explains the evaluation criteria:
  - Systematic approach (sistemática)
  - Focus (focalización)
  - Intensity (intensidad)
- **AND** the page explains that both criteria have coefficients that serve to evaluate the work
- **AND** the page mentions that the organizer can give greater or lesser coefficient to any criterion if they wish to work on a specific aspect, and can announce this before the trial
- **AND** the page explains that to the sum of the criteria, a general impression sum is added
- **AND** the page explains that the judge/organizer can write a brief note of observations on the evaluation sheet
- **AND** the page explains the minimum mark requirement: 3 seconds (to observe minimum focus behavior)

#### Scenario: Sport structure section displays odor information
- **WHEN** user views the sport structure section
- **THEN** the page explains that searches in both levels use Kong and essential oil of sage (salvia)
- **AND** the page explains that searches cover minimum intensities and odor saturations
- **AND** the page explains that in Avanzado level, reference odor search may be added
- **AND** the information reflects the actual regulations from the official normativas

#### Scenario: Sport structure section displays inclusivity information
- **WHEN** user views the sport structure section
- **THEN** the page explains that dogs with behavior problems can participate in both levels by notifying the organizer and adapting to modifications the organizer considers appropriate
- **AND** the page explains that there are no traditional podiums, but alternative recognitions are awarded (best works, best talents, best debuts, most meritorious, fighters, or even worst teams)
- **AND** the page explains that participants can use reinforcers during trials (as the philosophy focuses on work motivation)
- **AND** the page explains that participants can choose whether to know where the substance is or not (providing equal exhibition opportunities)
- **AND** the page explains that there is no limit to scenarios and times depend on the organizer (aiming to streamline trials as much as possible)
- **AND** the page explains that participants can go with or without a leash

### Requirement: Page explains differences with other modalities
The page SHALL explain the differences between Nosework Trial and other modalities including FEPDE (detección deportiva), AKC Scent Work, NACSW, and traditional nosework. The page SHALL also explain key characteristics that make NTC unique: no fees, open participation, freedom for organizers within minimum standards, and focus on inclusion and originality.

#### Scenario: Differences section compares with FEPDE
- **WHEN** user views the differences section
- **THEN** the page explains that while FEPDE detection sports focus on competition and performance, Nosework Trial prioritizes learning, inclusion, and dog welfare
- **AND** the page maintains a structured format but is more accessible
- **AND** the comparison is presented as reference only, not as criticism

#### Scenario: Differences section compares with traditional nosework
- **WHEN** user views the differences section
- **THEN** the page explains that unlike traditional nosework which is primarily recreational, Nosework Trial offers a competitive structure with levels, titles, and a scoring system
- **AND** the page emphasizes that it maintains the focus on enjoyment

#### Scenario: Differences section compares with international modalities
- **WHEN** user views the differences section
- **THEN** the page explains that Nosework Trial adapts concepts from international modalities (AKC Scent Work, NACSW) to the Spanish context
- **AND** the page explains that it has its own regulations and structure adapted to Spanish clubs and guides

#### Scenario: Differences section explains NTC unique characteristics
- **WHEN** user views the differences section
- **THEN** the page explains that NTC is an open group, not a federation or association
- **AND** the page explains that participation does not imply any type of fee
- **AND** the page explains that any member of NTC is free to use the name and logo to promote Trials, training, events, or activities related to detection
- **AND** the page emphasizes the focus on inclusion and originality in recreating scenarios

### Requirement: Page maintains SEO optimization
The page SHALL maintain proper SEO meta tags, Schema.org markup, and canonical URLs as configured.

#### Scenario: Page includes proper SEO meta tags
- **WHEN** user views the page source
- **THEN** the page includes:
  - Title: "Qué es Nosework Trial – Nosework deportivo para todos los perros"
  - Meta description explaining what Nosework Trial is
  - Canonical URL pointing to `/que-es-nosework-trial`
  - Keywords meta tag with relevant terms

#### Scenario: Page includes Schema.org Article markup
- **WHEN** user views the page source
- **THEN** the page includes JSON-LD script with `@type: "Article"`
- **AND** the schema includes `headline: "Qué es Nosework Trial"`
- **AND** the schema includes author and publisher as "Nosework Trial Community"
- **AND** the schema markup is valid

### Requirement: Page supports i18n routing
The page SHALL be accessible via language-prefixed routes (`/es/que-es-nosework-trial`, `/ca/que-es-nosework-trial`, etc.) and maintain proper language detection and persistence.

#### Scenario: Page is accessible via language-prefixed routes
- **WHEN** user accesses `/es/que-es-nosework-trial`
- **THEN** the page displays in Spanish
- **AND** the URL remains `/es/que-es-nosework-trial` in the browser
- **AND** the language preference is persisted via cookie

#### Scenario: Page redirects to language-prefixed version when accessed without prefix
- **WHEN** user accesses `/que-es-nosework-trial` without language prefix
- **THEN** the middleware redirects to `/es/que-es-nosework-trial` (or user's preferred language)
- **AND** the redirect is a 301 permanent redirect
- **AND** the language preference is detected from cookie, Accept-Language header, or defaults to Spanish

### Requirement: Page includes call-to-action sections
The page SHALL include call-to-action sections linking to related pages such as "Cómo Empezar" and "Reglamento".

#### Scenario: Page includes CTA to "Cómo Empezar"
- **WHEN** user views the page
- **THEN** the page displays a call-to-action section with a link to `/como-empezar` (or `/es/como-empezar` if using i18n)
- **AND** the CTA is visually prominent and accessible

#### Scenario: Page includes CTA to "Reglamento"
- **WHEN** user views the page
- **THEN** the page displays a call-to-action section with a link to `/reglamento` (or `/es/reglamento` if using i18n)
- **AND** the CTA is visually prominent and accessible

### Requirement: Page maintains responsive design
The page SHALL adapt its layout, typography, and spacing appropriately for mobile, tablet, and desktop viewports.

#### Scenario: Page displays correctly on mobile devices
- **WHEN** user views the page on a mobile device (viewport width < 768px)
- **THEN** the page layout adapts to mobile screen size
- **AND** typography scales appropriately
- **AND** sections stack vertically or adapt layout
- **AND** all content remains readable and accessible

#### Scenario: Page displays correctly on tablet devices
- **WHEN** user views the page on a tablet device (viewport width 768px - 1024px)
- **THEN** the page layout adapts to tablet screen size
- **AND** typography scales appropriately
- **AND** sections are arranged optimally for tablet viewing

#### Scenario: Page displays correctly on desktop devices
- **WHEN** user views the page on a desktop device (viewport width > 1024px)
- **THEN** the page displays with full desktop layout
- **AND** typography uses larger sizes appropriate for desktop
- **AND** sections are arranged with optimal spacing and visual hierarchy

### Requirement: Page maintains accessibility standards
The page SHALL meet WCAG 2.1 AA accessibility standards including proper color contrast, semantic HTML, and keyboard navigation support.

#### Scenario: Page meets color contrast requirements
- **WHEN** user views the page
- **THEN** text color contrast ratio meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- **AND** all interactive elements meet contrast requirements

#### Scenario: Page supports keyboard navigation
- **WHEN** user navigates using keyboard only
- **THEN** all links and interactive elements are focusable via Tab key
- **AND** elements can be activated using Enter or Space key
- **AND** focus indicators are clearly visible

#### Scenario: Page uses semantic HTML
- **WHEN** screen reader users access the page
- **THEN** the page uses semantic HTML elements (`<header>`, `<main>`, `<section>`, `<h1>`, `<h2>`, etc.)
- **AND** heading hierarchy is correct (h1 for main title, h2 for sections)
- **AND** all interactive elements have appropriate ARIA labels where needed
