# Manual Testing Guide - Events Public Pages

This document provides guidance for manual testing tasks that require human verification or cannot be fully automated.

## 11.18 - Screen Reader Testing

### NVDA (Windows)
1. Download and install NVDA from https://www.nvaccess.org/
2. Start NVDA (Insert+N to toggle)
3. Navigate to `/events` page
4. Verify:
   - All interactive elements are announced correctly
   - Event cards are properly described
   - Filters are accessible and understandable
   - Search input is clearly labeled
   - Pagination controls are announced
5. Navigate to `/events/[id]` page
6. Verify:
   - Event title is announced as H1
   - All event information is read in logical order
   - Breadcrumbs are navigable
   - Social sharing buttons are accessible

### VoiceOver (macOS/iOS)
1. Enable VoiceOver: Cmd+F5 (macOS) or Settings > Accessibility > VoiceOver (iOS)
2. Navigate to `/events` page
3. Use VoiceOver gestures:
   - Swipe right to navigate forward
   - Swipe left to navigate backward
   - Double tap to activate
4. Verify same items as NVDA testing

### Testing Checklist
- [ ] All headings are announced correctly
- [ ] Links have descriptive text
- [ ] Form inputs have labels
- [ ] Buttons have accessible names
- [ ] Images have alt text (or are marked decorative)
- [ ] Navigation is logical and sequential
- [ ] Error messages are announced
- [ ] Loading states are communicated

## 11.20 - Lighthouse Audit

### Running Lighthouse CI
```bash
npm run build
npm run start -- -p 3000
# In another terminal:
npm run test:lighthouse
```

### Manual Lighthouse Audit
1. Build and start production server:
   ```bash
   npm run build
   npm run start -- -p 3000
   ```
2. Open Chrome DevTools (F12)
3. Go to Lighthouse tab
4. Select:
   - Desktop or Mobile
   - Performance, Accessibility, SEO, Best Practices
5. Run audit for:
   - `http://localhost:3000/events`
   - `http://localhost:3000/events/1` (or any event ID)
6. Verify scores meet thresholds:
   - Performance >= 90
   - Accessibility >= 95
   - SEO >= 90
   - Best Practices >= 95

### Expected Results
- Performance: Should be >= 90 (optimized components, code splitting)
- Accessibility: Should be >= 95 (semantic HTML, ARIA labels, keyboard navigation)
- SEO: Should be >= 90 (meta tags, Schema.org markup, canonical URLs)
- Best Practices: Should be >= 95 (HTTPS, modern APIs, no console errors)

## 11.21 - Cross-Browser Compatibility Testing

### Chrome
1. Open `http://localhost:3000/events` in Chrome
2. Test all functionality:
   - View toggle (Calendar/List/Grid)
   - Filters
   - Search
   - Pagination
   - Event card links
3. Test event detail page
4. Verify no console errors

### Firefox
1. Open `http://localhost:3000/events` in Firefox
2. Test same functionality as Chrome
3. Verify CSS rendering is correct
4. Check for Firefox-specific issues

### Safari
1. Open `http://localhost:3000/events` in Safari
2. Test same functionality
3. Verify CSS Grid/Flexbox works correctly
4. Check date inputs work properly

### Edge
1. Open `http://localhost:3000/events` in Edge
2. Test same functionality
3. Verify compatibility

### Mobile Browsers
- **Chrome Mobile**: Test on Android device or Chrome DevTools mobile emulation
- **Safari Mobile**: Test on iOS device or Safari DevTools mobile emulation

### Testing Checklist
- [ ] All views (Calendar/List/Grid) work correctly
- [ ] Filters function properly
- [ ] Search works as expected
- [ ] Pagination navigates correctly
- [ ] Event cards display properly
- [ ] Event detail page loads correctly
- [ ] No visual regressions
- [ ] No JavaScript errors in console
- [ ] Responsive design works on all screen sizes

## 12.1 - Schema.org Validation

### Google Rich Results Test
1. Build and start production server:
   ```bash
   npm run build
   npm run start -- -p 3000
   ```
2. Navigate to: https://search.google.com/test/rich-results
3. Enter URL: `http://localhost:3000/events` (or use ngrok for public URL)
4. Verify:
   - Schema.org markup is detected
   - No errors in validation
   - Events are properly structured
5. Test event detail page: `http://localhost:3000/events/1`
6. Verify:
   - SportsEvent schema is detected
   - All required fields are present
   - Location and organizer data is structured correctly

### Schema.org Validator
1. Navigate to: https://validator.schema.org/
2. Enter page URL or paste JSON-LD markup
3. Verify no validation errors

### Expected Schema Structure
**Events List Page:**
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SportsEvent",
      "position": 1,
      "name": "Event Title",
      "startDate": "2025-03-15",
      "location": "Barcelona"
    }
  ]
}
```

**Event Detail Page:**
```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Event Title",
  "startDate": "2025-03-15T10:00:00Z",
  "location": {
    "@type": "Place",
    "name": "Barcelona"
  }
}
```

## 12.4 - Open Graph Image Verification

### Current Implementation
- Default OG image: `/images/og-image.jpg`
- Used on all pages (homepage, events list, event detail)

### Verification Steps
1. Check if `/public/images/og-image.jpg` exists
2. Verify image dimensions:
   - Recommended: 1200x630px
   - Minimum: 600x315px
   - Maximum: 1200x1200px
3. Test with Facebook Debugger:
   - Navigate to: https://developers.facebook.com/tools/debug/
   - Enter URL: `https://www.noseworktrialcommunity.com/events` (or use ngrok)
   - Verify image displays correctly
   - Check for any warnings
4. Test with Twitter Card Validator:
   - Navigate to: https://cards-dev.twitter.com/validator
   - Enter URL
   - Verify card preview

### Future Enhancement
- Consider generating dynamic OG images per event using:
  - `@vercel/og` (Vercel OG Image Generation)
  - Or static images per event category/type

## 12.5 - Social Sharing Previews

### Facebook Sharing Test
1. Navigate to: https://developers.facebook.com/tools/debug/
2. Enter URL: `http://localhost:3000/events` (use ngrok for public URL)
3. Click "Scrape Again" to refresh cache
4. Verify preview shows:
   - Correct title
   - Correct description
   - Correct image
   - Correct URL

### Twitter Sharing Test
1. Navigate to: https://cards-dev.twitter.com/validator
2. Enter URL
3. Verify card preview shows:
   - Correct title
   - Correct description
   - Correct image
   - Correct card type (summary_large_image)

### WhatsApp Sharing Test
1. Open WhatsApp Web or mobile app
2. Share URL: `http://localhost:3000/events/[id]`
3. Verify preview shows:
   - Correct title
   - Correct description
   - Correct image

### Testing Checklist
- [ ] Facebook preview displays correctly
- [ ] Twitter card preview displays correctly
- [ ] WhatsApp preview displays correctly
- [ ] Images load properly
- [ ] Titles and descriptions are correct
- [ ] URLs are correct

## 12.9 - Core Web Vitals Check

### Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click "Record" and reload page
4. Check metrics:
   - **LCP (Largest Contentful Paint)**: Should be < 2.5s
   - **FID (First Input Delay)**: Should be < 100ms
   - **CLS (Cumulative Layout Shift)**: Should be < 0.1

### Using PageSpeed Insights
1. Navigate to: https://pagespeed.web.dev/
2. Enter URL: `http://localhost:3000/events` (or use ngrok)
3. Run analysis
4. Review Core Web Vitals scores
5. Address any issues found

### Expected Metrics
- **LCP**: < 2.5s (optimized images, code splitting)
- **FID**: < 100ms (minimal JavaScript blocking)
- **CLS**: < 0.1 (stable layout, no layout shifts)

## Notes

- For testing with public URLs, use ngrok or deploy to staging environment
- Some tests require production build (`npm run build && npm run start`)
- Screen reader testing should be done by users familiar with assistive technologies
- Cross-browser testing should include both desktop and mobile browsers
- Schema.org validation should be done after deployment or with public URL
