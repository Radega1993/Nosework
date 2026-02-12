## 1. Setup and Preparation

- [x] 1.1 Verify event detail page route structure (`/events/[id]` vs `/eventos/[id]`)
- [x] 1.2 Confirm hero background image source and ensure image is optimized (WebP format, appropriate size)
- [x] 1.3 Review existing Button component API to ensure compatibility with new components
- [x] 1.4 Check existing event data structure from `/api/events` endpoint to confirm available fields

## 2. HeroSection Component Implementation

- [x] 2.1 Create `components/HeroSection.js` file with basic component structure
- [x] 2.2 Implement brand name display ("Nosework Trial") as h1 heading
- [x] 2.3 Implement tagline display ("Deporte de perros detectores y nosework deportivo")
- [x] 2.4 Add optional backgroundImage prop support with Next.js Image component
- [x] 2.5 Implement gradient fallback when no backgroundImage is provided
- [x] 2.6 Add overlay div for text readability when background image is used
- [x] 2.7 Implement "Cómo Empezar" CTA button linking to `/como-empezar`
- [x] 2.8 Implement "Ver Reglamento" CTA button linking to `/reglamento`
- [x] 2.9 Add responsive typography (text sizes for mobile, tablet, desktop)
- [x] 2.10 Implement responsive button layout (vertical stack on mobile, horizontal on desktop)
- [x] 2.11 Ensure semantic HTML structure (use `<header>` element)
- [x] 2.12 Add proper ARIA labels and accessibility attributes
- [x] 2.13 Test color contrast ratios meet WCAG 2.1 AA standards
- [x] 2.14 Verify keyboard navigation (Tab, Enter, Space keys)

## 3. FeaturedEvents Component Implementation

- [x] 3.1 Create `components/FeaturedEvents.js` file with basic component structure
- [x] 3.2 Implement useEffect hook to fetch events from `/api/events` endpoint
- [x] 3.3 Add client-side filtering to show only future events (date > current date)
- [x] 3.4 Implement sorting by date (ascending order, earliest first)
- [x] 3.5 Limit displayed events to maximum of 5
- [x] 3.6 Create date formatting utility function using `Intl.DateTimeFormat` with Spanish locale (`es-ES`)
- [x] 3.7 Implement event card component displaying title, formatted date, location, and level
- [x] 3.8 Add conditional level badge display ("Base" or "Avanzado" when available)
- [x] 3.9 Implement "Ver detalles" link/button for each event card
- [x] 3.10 Add link navigation to event detail page (verify route structure)
- [x] 3.11 Implement responsive grid layout (1 column mobile, 2 columns tablet, 2-3 columns desktop)
- [x] 3.12 Create loading state with skeleton placeholders (3-5 skeleton cards)
- [x] 3.13 Implement error state with user-friendly error message
- [x] 3.14 Add empty state message when no upcoming events exist
- [x] 3.15 Implement optional "Ver Todos los Eventos" link/button linking to `/events`
- [x] 3.16 Ensure semantic HTML structure (use `<section>` and `<article>` elements)
- [x] 3.17 Add proper heading ("Próximos Eventos") with appropriate heading level
- [x] 3.18 Add ARIA labels and accessibility attributes for event cards
- [x] 3.19 Verify keyboard navigation for all links and buttons
- [x] 3.20 Test screen reader compatibility

## 4. Homepage Integration

- [x] 4.1 Import HeroSection component into `pages/index.js`
- [x] 4.2 Replace existing inline hero section (lines 82-104) with HeroSection component
- [x] 4.3 Pass appropriate props to HeroSection (backgroundImage if available)
- [x] 4.4 Import FeaturedEvents component into `pages/index.js`
- [x] 4.5 Add FeaturedEvents component after hero section (before "Explicación Corta" section)
- [x] 4.6 Remove duplicate event fetching logic if FeaturedEvents handles it independently
- [x] 4.7 Verify page layout and spacing between sections
- [x] 4.8 Ensure no duplicate event data fetching (optimize if both calendar and FeaturedEvents fetch events)

## 5. Testing and Quality Assurance

- [x] 5.1 Test responsive layout on mobile devices (< 768px viewport)
- [x] 5.2 Test responsive layout on tablet devices (768px - 1024px viewport)
- [x] 5.3 Test responsive layout on desktop devices (> 1024px viewport)
- [x] 5.4 Test hero section with background image provided
- [x] 5.5 Test hero section without background image (gradient fallback)
- [x] 5.6 Test FeaturedEvents with multiple upcoming events (3-5 events)
- [x] 5.7 Test FeaturedEvents with fewer than 3 events
- [x] 5.8 Test FeaturedEvents with no upcoming events (empty state)
- [x] 5.9 Test loading state during API fetch
- [x] 5.10 Test error state when API request fails
- [x] 5.11 Verify all CTA buttons navigate to correct routes
- [x] 5.12 Verify event detail links navigate correctly
- [x] 5.13 Test keyboard navigation (Tab, Enter, Space keys)
- [x] 5.14 Test with screen reader (NVDA/JAWS/VoiceOver)
- [x] 5.15 Verify color contrast ratios meet WCAG 2.1 AA standards
- [x] 5.16 Run Lighthouse audit and verify Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [x] 5.17 Test hero image optimization (verify WebP format, appropriate sizing)
- [x] 5.18 Verify no console errors or warnings
- [x] 5.19 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## 6. Optimization and Final Polish

- [x] 6.1 Optimize hero background image (compress, convert to WebP if not already)
- [x] 6.2 Set appropriate `priority` prop on hero image for LCP optimization
- [x] 6.3 Review and optimize component re-renders (use React.memo if needed)
- [x] 6.4 Verify no unnecessary API calls (check if events are fetched multiple times)
- [x] 6.5 Review Tailwind CSS classes for unused or redundant styles
- [x] 6.6 Ensure consistent spacing and visual hierarchy
- [x] 6.7 Verify all text content matches requirements (brand name, tagline, button labels)
- [x] 6.8 Double-check date formatting matches Spanish locale format ("15 de marzo de 2025")
- [x] 6.9 Verify level badge displays correctly ("Base" or "Avanzado")
- [x] 6.10 Final visual review and design consistency check

## 7. Lighthouse Optimization Tasks

### 7.1 Accessibility Fixes

- [x] 7.1.1 Add `lang="es"` attribute to `<html>` tag in `pages/_app.js` or `pages/_document.js`
- [x] 7.1.2 Audit all text colors in HeroSection component for contrast compliance
- [x] 7.1.3 Audit all text colors in FeaturedEvents component for contrast compliance
- [x] 7.1.4 Verify hero overlay opacity maintains sufficient contrast (test with WCAG contrast checker)
- [x] 7.1.5 Test button text colors against backgrounds meet WCAG 2.1 AA standards
- [x] 7.1.6 Test event card text colors against card backgrounds
- [x] 7.1.7 Fix any contrast issues identified in audit
- [x] 7.1.8 Re-run Lighthouse accessibility audit and verify score reaches 100

### 7.2 Performance Optimizations (LCP)

- [x] 7.2.1 Optimize hero background image (compress to < 100 KiB if possible)
- [x] 7.2.2 Convert hero image to WebP format with fallback
- [x] 7.2.3 Verify Next.js Image component uses responsive sizes (srcset) for hero image
- [x] 7.2.4 Ensure hero image uses `priority` prop (already implemented, verify)
- [x] 7.2.5 Preload critical web fonts or add font-display: swap
- [x] 7.2.6 Inline critical CSS for above-the-fold content (hero section)
- [x] 7.2.7 Optimize `/api/events` endpoint response time (if slow)
- [x] 7.2.8 Test LCP after optimizations (target: < 3.0s)

### 7.3 Performance Optimizations (TBT)

- [x] 7.3.1 Audit JavaScript bundle size and identify unused dependencies
- [x] 7.3.2 Remove unused JavaScript dependencies (~348 KiB target reduction)
- [x] 7.3.3 Enable production JavaScript minification (verify Next.js config)
- [x] 7.3.4 Implement code splitting for FeaturedEvents component (lazy load if appropriate)
- [x] 7.3.5 Consider dynamic import for FeaturedEvents: `dynamic(() => import('@/components/FeaturedEvents'), { ssr: false })`
- [x] 7.3.6 Verify code splitting doesn't negatively impact UX
- [x] 7.3.7 Test TBT after optimizations (target: < 300ms)

### 7.4 Image Delivery Optimization

- [x] 7.4.1 Verify all images use Next.js Image component (hero image already done)
- [x] 7.4.2 Implement responsive image sizes for all images
- [x] 7.4.3 Ensure proper image formats (WebP, AVIF where supported)
- [x] 7.4.4 Review image loading strategy (lazy loading for below-fold images)
- [x] 7.4.5 Consider CDN configuration for static assets (production)

### 7.5 SEO Improvements

- [x] 7.5.1 Verify all meta tags are present in `pages/index.js` Head component
- [x] 7.5.2 Add Twitter Card meta tags if missing
- [x] 7.5.3 Verify meta description is between 120-160 characters
- [x] 7.5.4 Ensure title tag is unique and descriptive
- [x] 7.5.5 Verify Schema.org SportsOrganization markup is valid (test with Google Rich Results Test)
- [x] 7.5.6 Add SportsEvent schema for featured events if applicable
- [x] 7.5.7 Verify canonical URL is correct and uses proper base URL
- [x] 7.5.8 Ensure robots.txt exists and allows crawling
- [x] 7.5.9 Verify sitemap.xml includes homepage
- [x] 7.5.10 Verify proper heading hierarchy (H1 → H2 → H3) throughout page
- [x] 7.5.11 Ensure hero section H1 contains primary keyword
- [x] 7.5.12 Verify featured events section has proper heading structure
- [x] 7.5.13 Add alt text to all images (verify hero image alt text)
- [x] 7.5.14 Re-run Lighthouse SEO audit and verify score reaches >= 90

### 7.6 Post-Optimization Verification

- [x] 7.6.1 Run full Lighthouse audit after all optimizations
- [x] 7.6.2 Verify Performance score maintains or improves (target: 91+)
- [x] 7.6.3 Verify Accessibility score reaches 100
- [x] 7.6.4 Verify SEO score reaches >= 90
- [x] 7.6.5 Verify LCP is < 3.0s
- [x] 7.6.6 Verify TBT is < 300ms
- [x] 7.6.7 Document any remaining issues or limitations
- [x] 7.6.8 Create performance budget documentation for future monitoring
