# Testing - Homepage Hero Section

**Date:** February 12, 2026  
**Change:** homepage-hero-section

## Automated Testing Setup

### Tools Installed

1. **Lighthouse CI** (`@lhci/cli`)
   - Configuration: `.lighthouserc.json`
   - Purpose: Automated performance, accessibility, SEO, and best practices audits
   - Assertions:
     - Performance: >= 90
     - Accessibility: >= 95
     - SEO: >= 90
     - Best Practices: >= 95

2. **Playwright** (`@playwright/test`)
   - Configuration: `playwright.config.ts`
   - Purpose: E2E testing, responsive testing, cross-browser compatibility
   - Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

3. **Axe Core** (`@axe-core/playwright`)
   - Purpose: Automated WCAG 2.1 AA accessibility compliance testing

## Test Coverage

### E2E Tests (`tests/e2e/home.spec.ts`)

**Coverage:**
- ✅ Homepage loads correctly
- ✅ Hero section displays with H1 heading and CTAs
- ✅ Featured events section displays
- ✅ CTA buttons ("Cómo Empezar", "Ver Reglamento") navigate correctly
- ✅ Responsive layouts tested across viewports:
  - Mobile (< 768px)
  - Tablet (768px - 1024px)
  - Desktop (> 1024px)

**Test Scenarios:**
- Home loads and has hero + featured events
- Hero section displays correctly
- Featured events section displays correctly
- CTA buttons navigate correctly
- Responsive layout - mobile viewport
- Responsive layout - tablet viewport
- Responsive layout - desktop viewport

### Accessibility Tests (`tests/e2e/a11y.spec.ts`)

**Coverage:**
- ✅ WCAG 2.1 AA compliance (axe-core)
- ✅ Keyboard navigation (Tab, Enter, Space keys)
- ✅ All images have alt text
- ✅ Heading hierarchy is correct (H1 → H2 → H3)
- ✅ Color contrast meets WCAG 2.1 AA standards

**Test Scenarios:**
- Home has no critical a11y violations
- Keyboard navigation works
- All images have alt text
- Heading hierarchy is correct
- Color contrast meets WCAG AA

### Visual Regression Tests (`tests/e2e/visual.spec.ts`)

**Coverage:**
- ✅ Desktop visual snapshot (1920x1080)
- ✅ Mobile visual snapshot (375x667)
- ✅ Tablet visual snapshot (768x1024)
- ✅ Hero section visual snapshot

**Test Scenarios:**
- Home visual snapshot - desktop
- Home visual snapshot - mobile
- Home visual snapshot - tablet
- Hero section visual snapshot

### Lighthouse CI (`.lighthouserc.json`)

**Coverage:**
- ✅ Performance score verification (>= 90)
- ✅ Accessibility score verification (>= 95)
- ✅ SEO score verification (>= 90)
- ✅ Best Practices score verification (>= 95)
- ✅ Core Web Vitals (LCP, TBT, CLS)

**Runs:** 3 runs per test for consistency

## Test Execution

### Setup (One-time)

```bash
# Install Playwright browsers
npx playwright install --with-deps
```

### Run Tests

**Full QA Suite:**
```bash
npm run test:qa
```

**Individual Test Suites:**
```bash
# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y

# Visual regression tests
npm run test:visual

# Lighthouse CI
npm run build
npm run test:lighthouse
```

**Interactive Modes:**
```bash
# UI mode (visual test runner)
npm run test:e2e:ui

# Headed mode (see browser)
npm run test:e2e:headed
```

## Automated vs Manual Testing

### Fully Automated ✅
- Responsive layout testing (mobile, tablet, desktop)
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Keyboard navigation
- Accessibility compliance (WCAG 2.1 AA)
- Color contrast verification
- Image alt text verification
- Heading hierarchy validation
- CTA button navigation
- Lighthouse performance/SEO/accessibility audits
- Visual regression detection
- Console error detection

### Partially Automated / Manual
- Screen reader testing with NVDA/JAWS/VoiceOver (partial coverage via axe-core)
- User acceptance testing
- Complex interaction flows
- Edge case scenarios

## CI/CD Integration

### GitHub Actions Example

```yaml
name: QA Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:qa
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: test-results
          path: test-results/
```

## Test Results Location

- **Lighthouse Reports:** `openspec/changes/homepage-hero-section/evidence/lighthouse/`
- **Playwright Reports:** `playwright-report/` (generated on failure or with `--reporter=html`)
- **Visual Snapshots:** `tests/e2e/__snapshots__/` (committed to version control)

## Updating Visual Snapshots

If visual changes are intentional:

```bash
npx playwright test tests/e2e/visual.spec.ts --update-snapshots
```

## Test Maintenance

### When to Update Tests
- When component structure changes
- When new features are added
- When visual design changes (update snapshots)
- When accessibility improvements are made

### Test Files to Maintain
- `tests/e2e/home.spec.ts` - E2E functionality tests
- `tests/e2e/a11y.spec.ts` - Accessibility tests
- `tests/e2e/visual.spec.ts` - Visual regression tests
- `.lighthouserc.json` - Lighthouse CI configuration
- `playwright.config.ts` - Playwright configuration

## Success Criteria

### Automated Tests Must Pass
- ✅ All E2E tests pass across all browsers
- ✅ No critical accessibility violations
- ✅ Visual snapshots match (or updated if intentional)
- ✅ Lighthouse scores meet minimum thresholds:
  - Performance >= 90
  - Accessibility >= 95
  - SEO >= 90
  - Best Practices >= 95

### Performance Targets
- LCP < 3.0s
- TBT < 300ms
- CLS < 0.1

## Notes

- Tests run against production build for accurate metrics
- Lighthouse CI requires `npm run build` before running
- Playwright automatically handles server startup/shutdown
- Visual snapshots should be reviewed and committed when intentional changes are made
- Test failures include detailed error messages and screenshots
