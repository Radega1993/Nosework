---
name: Nosework Federation Identity
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#4e5f7c'
  primary: '#04162f'
  on-primary: '#ffffff'
  primary-container: '#1a2b45'
  on-primary-container: '#8293b2'
  inverse-primary: '#b6c7e8'
  secondary: '#506600'
  on-secondary: '#ffffff'
  secondary-container: '#c1f100'
  on-secondary-container: '#546b00'
  tertiary: '#271100'
  on-tertiary: '#ffffff'
  tertiary-container: '#452200'
  on-tertiary-container: '#dc7800'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b6c7e8'
  on-primary-fixed: '#091c35'
  on-primary-fixed-variant: '#374763'
  secondary-fixed: '#c3f400'
  secondary-fixed-dim: '#abd600'
  on-secondary-fixed: '#161e00'
  on-secondary-fixed-variant: '#3c4d00'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-h1:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-h2:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-h3:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  status-badge:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system establishes a premium, official identity for the sport of canine nosework. It balances the gravity of a national federation with the dynamic energy of competitive sports. The brand personality is rooted in professional excellence and the technical precision of detection work.

The visual style follows a **Corporate Modern** approach. It utilizes expansive whitespace to denote organizational transparency and high-quality action photography to ground the digital experience in the physical reality of the sport. The aesthetic is "technical-humanist"—it feels like a professional sports body while remaining welcoming to dog owners of all levels. Every interface element is designed to convey authority, from the structured data tables to the crisp, athletic iconography.

## Colors

The palette is anchored by **Dark Navy (#1A2B45)**, providing a foundational sense of authority and institutional weight. This is contrasted against **Crisp White (#FFFFFF)** and **Light Gray (#F5F7FA)** backgrounds to maintain a clean, high-breathability layout.

Accents are used strategically to guide user behavior and signify athletic energy. **Lime Green (#CCFF00)** is the primary high-visibility accent, used for "Open" status indicators, success states, and primary Call-to-Action (CTA) highlights where maximum contrast is required. **Vibrant Orange (#FF8C00)** serves as a secondary accent for urgency, warnings, or secondary actions like "Register Now" to ensure they stand out against the deep navy or light gray surfaces.

## Typography

This design system employs a dual-sans-serif hierarchy to balance impact with legibility. **Montserrat** is the display typeface, chosen for its geometric strength and athletic feel. It is used exclusively for headings and major brand touchpoints to project a confident, modern institutional voice.

**Inter** is utilized for all body copy, UI elements, and data-heavy tables. Its high x-height and neutral character ensure excellent readability at small sizes, which is critical for competition results and technical regulations. A strict scale is enforced, using uppercase labels for metadata and specific weights for hierarchy in complex data environments.

## Layout & Spacing

The layout philosophy relies on a **12-column fluid grid** with a maximum container width of 1280px to maintain readability on wide monitors. The spacing rhythm is built on an 8px base unit, ensuring consistent vertical and horizontal cadence across all components.

High whitespace is a core requirement of this design system to separate complex data sets and administrative tasks. Margins between major sections (xl) are generous to prevent visual clutter, while internal component padding (md) provides enough "air" for touch targets and clarity in data-heavy views.

## Elevation & Depth

Visual hierarchy is achieved through **tonal layers** and **ambient shadows**. The design avoids heavy skueomorphism, preferring a "flat-plus" approach. 

- **Level 0 (Surface):** Light Gray (#F5F7FA) serves as the primary canvas background.
- **Level 1 (Card/Container):** Pure White (#FFFFFF) containers used for content, slightly elevated with a soft, diffused shadow (0px 4px 12px rgba(26, 43, 69, 0.05)).
- **Level 2 (Interactive):** Active cards or hover states use a more pronounced shadow (0px 8px 24px rgba(26, 43, 69, 0.1)) to indicate clickability.
- **Overlays:** Modals and dropdowns use a semi-transparent Dark Navy scrim (20% opacity) to focus the user's attention while maintaining context.

## Shapes

The design system uses a consistent **rounded-lg (8-12px)** language to soften the institutional feel and make the federation appear more accessible. 

- **Standard components** (Inputs, small cards, buttons) use an 8px radius.
- **Major containers** and featured event cards use a 12px radius for a more modern, friendly silhouette.
- **Status badges** and level indicators utilize a "pill" shape (999px radius) to differentiate them from interactive buttons and structural containers. 
- **Imagery** should always feature rounded corners to match the UI, avoiding sharp edges that conflict with the "accessible" brand goal.

## Components

### Buttons & CTAs
Primary buttons use the Dark Navy background with White text for a formal look, or Lime Green with Navy text for high-impact actions. Buttons feature a minimum height of 48px to accommodate mobile accessibility.

### Cards (Events & Clubs)
Cards are the primary vehicle for discovery. They must feature high-quality action photography of dogs in the header, followed by a structured content area including the event title (H3), date, and a pill-shaped status badge.

### Data Tables (Results)
Results tables must be clean and highly legible. Use zebra-striping (Light Gray/White) for long lists. Column headers are uppercase Inter Bold (12px). Level indicators for dogs (L1, L2, L3) should be color-coded and contained in small circular badges.

### Timelines (Progression)
Vertical timelines show a handler's journey. Nodes are Dark Navy with Lime Green connectors for "completed" steps, and Light Gray for "upcoming" milestones.

### Status Badges
- **Inscripción abierta:** Lime Green background (#CCFF00) with Navy text.
- **Lista de espera:** Orange background (#FF8C00) with White text.
- **Cerrado/Finalizado:** Light Gray background with Dark Navy text.

### Professional Badges
Official federation seals and level badges (e.g., "Grado I") should be rendered as vector graphics with metallic accents or solid navy fills to signify accomplishment and official certification.