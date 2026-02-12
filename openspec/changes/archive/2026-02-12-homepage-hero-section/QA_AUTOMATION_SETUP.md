# QA Automation Setup

**Date:** February 12, 2026  
**Status:** Complete ✅

## Overview

Automated QA testing has been set up to cover:
- ✅ Lighthouse CI for performance/SEO/accessibility testing
- ✅ Playwright E2E tests for functionality and responsive design
- ✅ Accessibility testing with axe-core
- ✅ Visual regression testing
- ✅ Cross-browser compatibility testing

## Tools Installed

### 1. Lighthouse CI (`@lhci/cli`)
- **Purpose:** Automated Lighthouse audits
- **Configuration:** `.lighthouserc.json`
- **Output:** `openspec/changes/homepage-hero-section/evidence/lighthouse/`

### 2. Playwright (`@playwright/test`)
- **Purpose:** E2E testing, responsive testing, browser compatibility
- **Configuration:** `playwright.config.ts`
- **Browsers:** Chromium, Firefox, WebKit (Safari), Mobile Chrome, Mobile Safari

### 3. Axe Core (`@axe-core/playwright`)
- **Purpose:** Automated accessibility testing
- **Coverage:** WCAG 2.1 AA compliance

## Test Files Created

### `tests/e2e/home.spec.ts`
**Coverage:**
- Homepage loads correctly
- Hero section displays with H1 and CTAs
- Featured events section displays
- CTA button navigation
- Responsive layouts (mobile, tablet, desktop)

### `tests/e2e/a11y.spec.ts`
**Coverage:**
- WCAG 2.1 AA compliance (axe-core)
- Keyboard navigation
- Image alt text verification
- Heading hierarchy validation
- Color contrast checks

### `tests/e2e/visual.spec.ts`
**Coverage:**
- Visual snapshots for desktop, mobile, tablet
- Hero section visual snapshot
- Visual regression detection

## NPM Scripts Added

```json
{
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed",
  "test:a11y": "playwright test tests/e2e/a11y.spec.ts",
  "test:visual": "playwright test tests/e2e/visual.spec.ts",
  "test:lighthouse": "lhci autorun",
  "test:qa": "npm run test:e2e && npm run test:lighthouse"
}
```

## Lighthouse CI Configuration

**File:** `.lighthouserc.json`

**Assertions:**
- Performance: >= 90
- Accessibility: >= 95
- SEO: >= 90
- Best Practices: >= 95

**Runs:** 3 runs per test for consistency

## Playwright Configuration

**File:** `playwright.config.ts`

**Projects:**
- chromium-desktop (Desktop Chrome)
- firefox-desktop (Desktop Firefox)
- webkit-desktop (Desktop Safari)
- mobile-chrome (Pixel 5)
- mobile-safari (iPhone 13)

**Server:** Automatically builds and starts production server

## Usage

### First Time Setup

```bash
# Install Playwright browsers (requires sudo)
npx playwright install --with-deps
```

### Run All Tests

```bash
# Full QA suite (E2E + Lighthouse)
npm run test:qa

# Just E2E tests
npm run test:e2e

# Just Lighthouse
npm run build
npm run test:lighthouse

# Just accessibility
npm run test:a11y

# Just visual regression
npm run test:visual
```

### Interactive Testing

```bash
# UI mode (visual test runner)
npm run test:e2e:ui

# Headed mode (see browser)
npm run test:e2e:headed
```

### Update Visual Snapshots

If visual changes are intentional:

```bash
npx playwright test tests/e2e/visual.spec.ts --update-snapshots
```

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
```

## Test Coverage Summary

### Automated (No Manual Work Required)
- ✅ Responsive layout testing (mobile, tablet, desktop)
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari)
- ✅ Keyboard navigation
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Color contrast verification
- ✅ Image alt text verification
- ✅ Heading hierarchy validation
- ✅ CTA button navigation
- ✅ Lighthouse performance/SEO/accessibility audits
- ✅ Visual regression detection
- ✅ Console error detection

### Still Requires Manual Testing
- Screen reader testing with NVDA/JAWS/VoiceOver (partial coverage via axe-core)
- User acceptance testing
- Complex interaction flows

## Next Steps

1. **Run initial tests:**
   ```bash
   npm run build
   npm run test:qa
   ```

2. **Review test results** and fix any failures

3. **Update visual snapshots** if design changes are intentional

4. **Integrate into CI/CD** pipeline for automated testing on every commit

## Notes

- Tests run against production build for accurate performance metrics
- Lighthouse CI requires production build (`npm run build`)
- Playwright automatically handles server startup/shutdown
- Visual snapshots should be committed to version control
- Test failures will show detailed error messages and screenshots
