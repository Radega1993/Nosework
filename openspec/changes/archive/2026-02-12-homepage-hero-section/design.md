## Context

The homepage currently has a basic hero section implemented inline within `pages/index.js` (lines 82-104). It displays the brand name, tagline, and two CTA buttons with a gradient background. The existing implementation uses Tailwind CSS classes and the existing Button component.

The events API (`/api/events`) currently returns all events without filtering. The homepage already fetches events for the calendar section, but there's no dedicated component for displaying featured events in a card format.

This change will enhance the hero section and create a new FeaturedEvents component to improve user engagement and provide immediate visibility into upcoming events.

## Goals / Non-Goals

**Goals:**
- Enhance the hero section with improved visual design and optional background image support
- Create a reusable FeaturedEvents component that displays 3-5 upcoming events
- Improve homepage conversion rates by prominently showcasing upcoming events
- Maintain or improve Core Web Vitals (LCP, FID, CLS)
- Ensure WCAG 2.1 AA accessibility compliance
- Keep the implementation frontend-only (no backend changes required)

**Non-Goals:**
- Modifying the events API structure or database schema
- Creating a separate hero image management system (images will be static assets)
- Implementing event registration functionality (out of scope for this change)
- Adding complex filtering or search capabilities to featured events
- Internationalization (i18n) support (will use Spanish locale only for now)

## Decisions

### Decision 1: Component Architecture
**Decision:** Create two separate components: `HeroSection` and `FeaturedEvents`, rather than combining them into one monolithic component.

**Rationale:**
- Separation of concerns: Hero section handles branding/CTAs, FeaturedEvents handles event display
- Reusability: FeaturedEvents can be used elsewhere (e.g., events page sidebar)
- Maintainability: Easier to test and modify independently
- Single Responsibility Principle: Each component has a clear, focused purpose

**Alternatives Considered:**
- Single combined component: Rejected due to reduced reusability and increased complexity
- Inline implementation: Rejected as it doesn't improve maintainability

### Decision 2: Hero Background Image Implementation
**Decision:** Use Next.js `next/image` component with optional `backgroundImage` prop, falling back to gradient if not provided.

**Rationale:**
- Next.js Image provides automatic optimization (WebP conversion, lazy loading, responsive sizing)
- Maintains Core Web Vitals by optimizing LCP (Largest Contentful Paint)
- Graceful degradation: Works with or without background image
- Follows project patterns (other pages use next/image)

**Alternatives Considered:**
- CSS background-image: Rejected as it doesn't provide Next.js optimization benefits
- Separate image component: Rejected as it adds unnecessary complexity

**Implementation Approach:**
```jsx
// HeroSection component will accept optional backgroundImage prop
<HeroSection 
  backgroundImage="/images/hero-dogs.jpg" // optional
  // ... other props
/>
```

### Decision 3: Events API Filtering Strategy
**Decision:** Filter and sort events on the client-side in the FeaturedEvents component, rather than adding query parameters to the API.

**Rationale:**
- No backend changes required (fits non-goals)
- API already returns all events, which is a small dataset for MVP
- Client-side filtering is sufficient for 3-5 events
- Simpler implementation: no API modifications needed

**Alternatives Considered:**
- Add `?upcoming=true&limit=5` query params: Rejected as it requires backend changes
- Server-side filtering in getServerSideProps: Rejected as homepage uses client-side data fetching (useEffect pattern)

**Future Consideration:**
If the events dataset grows significantly (>100 events), consider adding API query parameters for server-side filtering.

### Decision 4: Date Formatting
**Decision:** Use JavaScript `Intl.DateTimeFormat` with Spanish locale (`es-ES`) for consistent date formatting.

**Rationale:**
- Native browser API, no additional dependencies
- Proper locale support for Spanish formatting
- Consistent with project's Spanish-first approach
- Format: "15 de marzo de 2025" (matches spec requirement)

**Alternatives Considered:**
- date-fns library: Rejected as it adds unnecessary dependency for simple formatting
- Manual string formatting: Rejected as it's error-prone and doesn't handle locales

### Decision 5: Responsive Grid Layout
**Decision:** Use Tailwind CSS grid classes with responsive breakpoints: 1 column (mobile), 2 columns (tablet), 2-3 columns (desktop).

**Rationale:**
- Consistent with existing Tailwind usage in the project
- No additional CSS files or dependencies
- Standard responsive breakpoints align with project conventions
- Flexible grid adapts to number of events (1-5)

**Breakpoints:**
- Mobile (< 768px): `grid-cols-1`
- Tablet (768px - 1024px): `grid-cols-2`
- Desktop (> 1024px): `grid-cols-2` or `grid-cols-3` depending on event count

### Decision 6: Loading and Error States
**Decision:** Use skeleton loading placeholders and inline error messages within the FeaturedEvents component.

**Rationale:**
- Better UX than blank space during loading
- Error messages don't break page layout
- Consistent with modern web patterns
- No additional loading library needed

**Implementation:**
- Loading: Show 3-5 skeleton cards matching event card structure
- Error: Display user-friendly message: "No se pudieron cargar los eventos. Por favor, intenta más tarde."

### Decision 7: Event Card Information Display
**Decision:** Display title, formatted date, location (city), and level badge (if available) in each event card.

**Rationale:**
- Matches spec requirements
- Provides essential information without overwhelming the card
- Level badge helps users quickly identify event type
- Location helps users assess proximity

**Card Structure:**
- Title (prominent, h3 or h4)
- Date (formatted in Spanish)
- Location (city name)
- Level badge ("Base" or "Avanzado") - conditional display
- "Ver detalles" link/button

## Risks / Trade-offs

### Risk 1: Client-Side Event Filtering Performance
**Risk:** If events dataset grows large (>50 events), client-side filtering could impact performance.

**Mitigation:**
- Current MVP has small event dataset (<20 events expected)
- Filtering is simple (date comparison + sort), very fast
- Monitor performance and add API query params if needed
- Consider pagination or server-side filtering in future phases

### Risk 2: Hero Image Loading Impact on LCP
**Risk:** Large hero background image could negatively impact Largest Contentful Paint (LCP) metric.

**Mitigation:**
- Use Next.js Image component with optimization
- Prefer WebP format for hero images
- Set appropriate `priority` prop for above-the-fold image
- Consider using `loading="eager"` for hero images
- Test LCP with Lighthouse before/after implementation
- Fallback to gradient if image doesn't load quickly

### Risk 3: Accessibility with Background Images
**Risk:** Background images with overlays might not meet contrast requirements for all users.

**Mitigation:**
- Ensure overlay opacity provides sufficient contrast (test with WCAG contrast checker)
- Use semi-transparent dark overlay (opacity 0.4-0.6) over light images
- Test with screen readers to ensure text is readable
- Provide fallback gradient that meets contrast requirements
- Use semantic HTML and proper ARIA labels

### Risk 4: Event Data Availability
**Risk:** If no upcoming events exist, featured events section might look empty or broken.

**Mitigation:**
- Display friendly message: "No hay eventos próximos. ¡Vuelve pronto!"
- Maintain visual consistency with empty state
- Ensure layout doesn't collapse or break
- Consider hiding section entirely if no events (alternative approach)

### Trade-off: Component Reusability vs. Simplicity
**Trade-off:** Creating separate components adds structure but increases file count.

**Decision:** Accept increased file count for better maintainability and reusability.

### Trade-off: Client-Side vs. Server-Side Filtering
**Trade-off:** Client-side filtering is simpler but less scalable than server-side filtering.

**Decision:** Use client-side filtering for MVP, plan for server-side filtering in future if needed.

## Migration Plan

### Phase 1: Component Creation
1. Create `components/HeroSection.js` with enhanced hero implementation
2. Create `components/FeaturedEvents.js` with event fetching and display logic
3. Add utility function for date formatting (or inline in component)

### Phase 2: Homepage Integration
1. Update `pages/index.js` to use new HeroSection component
2. Add FeaturedEvents component after hero section (before existing "Explicación Corta" section)
3. Remove inline hero implementation from index.js

### Phase 3: Testing and Optimization
1. Test responsive layouts across devices
2. Verify accessibility with screen readers and keyboard navigation
3. Test loading and error states
4. Optimize hero image (compress, convert to WebP)
5. Run Lighthouse audit to verify Core Web Vitals

### Phase 4: Deployment
1. Deploy to staging environment
2. Verify functionality and visual appearance
3. Deploy to production
4. Monitor performance metrics post-deployment

### Rollback Strategy
- Keep existing inline hero implementation until new components are verified
- Use feature flag or conditional rendering if needed
- Revert to previous commit if critical issues arise

## Open Questions

1. **Hero Image Asset:** Where will the hero background image be sourced from? (Design team, stock photo, user-submitted?)
   - **Resolution needed:** Confirm image source and ensure it's optimized before implementation

2. **Event Detail Page Route:** What is the exact route structure for event detail pages? (`/events/[id]` or `/eventos/[id]`?)
   - **Current assumption:** `/events/[id]` based on existing `/events` route
   - **Action:** Verify route structure before implementing links

3. **Empty State Behavior:** Should the FeaturedEvents component be hidden entirely if no events exist, or show a message?
   - **Current decision:** Show friendly message (see Risk 4 mitigation)
   - **Alternative:** Hide component if events.length === 0

4. **Level Badge Styling:** What visual style should level badges use? (Color coding, icons, text-only?)
   - **Decision needed:** Define badge design system or use simple text badges initially

## Post-Implementation: Lighthouse Audit Findings

**Date:** February 12, 2026  
**Lighthouse Scores:** Performance 91, Accessibility 96, Best Practices 100, SEO 52  
**Target Scores:** Performance 91+, Accessibility 100, SEO 90+

### Findings and Mitigation Strategies

#### 1. Performance Issues

**Finding:** LCP 6.2s (target: < 3.0s), TBT 980ms (target: < 300ms)

**Root Causes Identified:**
- Image delivery optimization needed (~258 KiB)
- Unused JavaScript (~348 KiB)
- JavaScript minification needed (~208 KiB)

**Mitigation Strategies:**

**LCP Optimization:**
- **Hero Image:** Ensure hero background image (if used) is optimized:
  - Use WebP format with fallback
  - Compress to < 100 KiB if possible
  - Use Next.js Image `priority` prop (already implemented)
  - Consider using `loading="eager"` for above-the-fold images
  - Implement responsive image sizes (srcset) via Next.js Image
- **Font Loading:** Ensure web fonts are preloaded or use font-display: swap
- **Critical CSS:** Inline critical CSS for above-the-fold content
- **Server Response:** Optimize API response time for `/api/events` endpoint

**TBT (Total Blocking Time) Optimization:**
- **Code Splitting:** Implement dynamic imports for FeaturedEvents component if not critical for initial render
- **JavaScript Optimization:**
  - Enable production minification (Next.js should handle this automatically)
  - Remove unused JavaScript dependencies
  - Consider lazy loading FeaturedEvents component: `const FeaturedEvents = dynamic(() => import('@/components/FeaturedEvents'), { ssr: false })`
- **Reduce Main Thread Work:**
  - Move event filtering/sorting to Web Worker if dataset grows large
  - Debounce/throttle API calls if multiple components fetch events

**Image Delivery Optimization:**
- Use Next.js Image component for all images (already implemented for hero)
- Implement responsive images with appropriate sizes
- Consider using CDN for static assets in production
- Optimize image formats (WebP, AVIF where supported)

#### 2. Accessibility Issues

**Finding:** `<html>` missing `lang` attribute, insufficient contrast somewhere

**Mitigation Strategies:**

**HTML Lang Attribute:**
- Add `lang="es"` to `<html>` tag in `pages/_app.js` or `pages/_document.js`
- Ensure it's set correctly for Spanish content (default locale)
- Future-proof for i18n by making it configurable

**Contrast Issues:**
- Review all text colors in HeroSection and FeaturedEvents components
- Verify contrast ratios meet WCAG 2.1 AA standards:
  - Normal text: 4.5:1 minimum
  - Large text (18pt+): 3:1 minimum
- Test with contrast checker tools (WebAIM, axe DevTools)
- Ensure overlay opacity on hero background image maintains sufficient contrast
- Review button text colors and backgrounds
- Check event card text colors against background

**Implementation:**
- Add `lang="es"` attribute to HTML root element
- Audit all color combinations in components
- Test with accessibility tools (Lighthouse, axe, WAVE)

#### 3. SEO Issues

**Finding:** SEO score 52 (target: >= 90)

**Root Causes:**
- Missing or incomplete meta tags
- Missing lang attribute (affects SEO)
- Potentially missing structured data
- Missing or incorrect canonical URLs
- Missing robots.txt or sitemap.xml

**Mitigation Strategies:**

**Meta Tags:**
- Ensure all required meta tags are present in `pages/index.js` Head component:
  - Title tag (already present)
  - Meta description (already present)
  - Open Graph tags (already present)
  - Twitter Card tags (add if missing)
  - Viewport tag (already present)
- Verify meta description is between 120-160 characters
- Ensure title is unique and descriptive

**Structured Data:**
- Verify Schema.org markup is present (SportsOrganization already implemented)
- Add SportsEvent schema for featured events if applicable
- Ensure structured data is valid (test with Google Rich Results Test)

**Technical SEO:**
- Add `lang` attribute to HTML (fixes both accessibility and SEO)
- Ensure canonical URL is correct (already present)
- Verify robots.txt exists and allows crawling
- Create/verify sitemap.xml includes homepage
- Ensure proper heading hierarchy (H1 → H2 → H3)

**Content SEO:**
- Ensure hero section H1 contains primary keyword
- Verify featured events section has proper heading structure
- Add alt text to all images (already implemented for hero image)

### Updated Risk Assessment

**Risk 5: Lighthouse Performance Targets Not Met**
**Risk:** Current LCP (6.2s) and TBT (980ms) exceed targets significantly.

**Mitigation:**
- Prioritize image optimization (largest impact on LCP)
- Implement code splitting for FeaturedEvents component
- Monitor bundle size and remove unused dependencies
- Consider server-side rendering for initial event data if LCP remains high
- Test performance improvements incrementally

**Risk 6: SEO Score Below Target**
**Risk:** SEO score of 52 indicates missing critical SEO elements.

**Mitigation:**
- Fix lang attribute immediately (quick win)
- Audit and complete all meta tags
- Verify structured data validity
- Ensure proper heading hierarchy
- Test with Google Search Console (when deployed)

### Updated Migration Plan

**Phase 3.5: Post-Implementation Optimization (NEW)**

1. **Immediate Fixes:**
   - Add `lang="es"` attribute to HTML root
   - Audit and fix contrast issues
   - Verify all meta tags are complete

2. **Performance Optimization:**
   - Optimize hero image (compress, WebP conversion)
   - Implement code splitting for FeaturedEvents
   - Remove unused JavaScript dependencies
   - Enable production optimizations

3. **SEO Improvements:**
   - Complete meta tag audit
   - Verify structured data
   - Test with SEO tools
   - Ensure proper heading hierarchy

4. **Re-test with Lighthouse:**
   - Run Lighthouse audit after fixes
   - Verify scores meet targets
   - Document any remaining issues

### Updated Open Questions

5. **Performance Budget:** What are acceptable performance budgets for LCP, TBT, and bundle size?
   - **Action:** Define performance budgets and monitor in CI/CD

6. **Image Optimization Strategy:** What is the preferred image optimization pipeline?
   - **Options:** Next.js Image optimization, external CDN, manual optimization
   - **Decision needed:** Choose approach and document process

7. **Code Splitting Strategy:** Should FeaturedEvents be lazy-loaded or server-rendered?
   - **Current:** Client-side rendered
   - **Consideration:** Lazy loading may improve TBT but could impact UX
   - **Decision needed:** Test both approaches and choose based on metrics
