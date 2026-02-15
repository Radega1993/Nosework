# UI / UX System Specification
# Change: ui-redesign-detection-association
# Schema: spec-driven
# Capability: Complete Visual Redesign

---

# 1. Objective

Redesign the entire website of the Asociación de Perros Detectores to achieve a:

- Professional
- Modern
- Institutional
- Sport-oriented
- Trust-building and authoritative visual identity

The visual direction should include:

- Full-width hero with impactful imagery
- Dark overlay
- Strong CTA buttons
- Structured sections with visual cards
- Clean white space
- Clear typography hierarchy

---

# 2. Design System

## 2.1 Color Palette

### Primary
- Navy Blue: #0F2A44
- Dark Navy: #091C2E

### Accent
- Gold CTA: #F5B400
- Gold Hover: #E0A100

### Neutral
- White: #FFFFFF
- Light Gray Background: #F4F6F8
- Border Gray: #E2E8F0
- Dark Text: #1A202C
- Medium Text: #4A5568

---

## 2.2 Typography

### Headings
- Font family: Inter / Montserrat / Poppins
- H1: 56px desktop / 36px mobile
- H2: 36px
- H3: 24px
- Line-height: 1.2

### Body
- Base size: 16px
- Highlight text: 18px
- Line-height: 1.6

---

# 3. Global Layout

## 3.1 Container

- Max width: 1200px
- Horizontal padding: 24px
- Centered content

---

## 3.2 Header

### Behavior
- Sticky
- Solid navy background
- Height: 80px

### Structure
- Logo aligned left
- Main navigation centered/right
- Social icons aligned right

### Desktop Navigation
Links:
- Inicio
- Quiénes somos
- Especialidades
- Formación
- Noticias
- Contacto

Hover behavior:
- Animated underline
- Accent color transition

### Mobile
- Hamburger menu
- Slide-in drawer from right

---

# 4. Hero Section

## 4.1 Layout

- Full width
- Height: 85vh
- Background image (cover)
- Dark overlay rgba(0,0,0,0.55)

## 4.2 Content

Left aligned:

H1:
"Expertos en Detección Canina"

Subheading:
"Entrenamiento, formación y operativos con perros detectores"

Buttons:
- Primary (Gold): "Saber más"
- Secondary (White outline): "Hazte socio"

Spacing:
- 24px between elements

---

# 5. Main Cards Section

- Grid layout
- 3 columns desktop
- 1 column mobile

Cards:
- Top image
- White background
- Light shadow
- Hover translateY(-6px)

Cards content:
- Nuestras especialidades
- Formación profesional
- Hazte socio

Equal height enforced.

---

# 6. About Section

Split layout 50/50:

Left:
- H2
- Text
- Secondary button

Right:
- Large image
- Border radius 12px

Background:
- Light gray (#F4F6F8)

---

# 7. News & Events Section

- 3-column grid

Card structure:
- Image
- Small date label
- Title
- Read more link

Button centered:
"Ver todas las noticias"

Hover behavior:
- Soft image zoom
- Title color transition to primary

---

# 8. Partners Section

- Horizontal logo row
- Opacity 0.7 default
- Opacity 1 on hover

White background
Subtle top border

---

# 9. Footer

- Dark navy background
- White text

Columns:
- Navigation
- Contact
- Legal

Bottom bar:
- Aviso legal
- Política de privacidad
- Política de cookies

---

# 10. Reusable Components

## 10.1 Button Component

Variants:
- primary (gold background)
- secondary (white outline)
- dark (navy)
- ghost

States:
- hover
- active
- disabled

---

## 10.2 Card Component

Props:
- image
- title
- description
- link

Shadow:
0 10px 30px rgba(0,0,0,0.08)

---

## 10.3 Section Wrapper

Props:
- background type
- padding size (sm, md, lg)
- centered option

---

# 11. Responsive Rules

Breakpoints:

- Mobile: <768px
- Tablet: 768px–1024px
- Desktop: >1024px

Hero:
- Reduce H1 size
- Stack buttons vertically
- Center background focal point

Grid:
- 3 → 2 → 1 columns

---

# 12. Accessibility Requirements

- Minimum contrast ratio 4.5:1
- Visible focus states
- aria-labels on icons
- Mandatory alt text on images
- Fully keyboard navigable

---

# 13. Animations

- Fade-in on scroll
- Hover transitions 200ms ease
- No excessive animations

---

# 14. SEO Structural Requirements

- Single H1 per page
- Proper H2 hierarchy
- Schema.org SportsOrganization JSON-LD
- Dynamic meta title
- Dynamic meta description
- Canonical URL support

---

# 15. Performance Targets

- LCP < 2.5s
- WebP optimized hero image
- Lazy loading for secondary images
- Code splitting per section

---

# 16. Page States

Must include support for:

- Loading
- Error
- Empty state
- Success state
- Custom 404 page
- Custom 500 page

---

# 17. Dark Mode (Future Phase)

Prepare design tokens to allow future dark mode implementation.

---

# 18. Global Acceptance Criteria

Implementation is considered valid when:

- Lighthouse Performance > 90
- Accessibility > 95
- SEO > 90
- Responsive validated manually and automatically
- Visual consistency across all pages
