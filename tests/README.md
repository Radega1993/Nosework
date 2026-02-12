# QA Automation Tests

This directory contains automated QA tests for the Nosework Trial website.

## Setup

### 1. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

This installs Chromium, Firefox, and WebKit browsers required for testing.

### 2. Run Tests

**All E2E Tests:**
```bash
npm run test:e2e
```

**Accessibility Tests Only:**
```bash
npm run test:a11y
```

**Visual Regression Tests:**
```bash
npm run test:visual
```

**Lighthouse CI:**
```bash
npm run build
npm run test:lighthouse
```

**Full QA Suite:**
```bash
npm run test:qa
```

**Interactive UI Mode:**
```bash
npm run test:e2e:ui
```

**Headed Mode (see browser):**
```bash
npm run test:e2e:headed
```

## Test Coverage

### E2E Tests (`tests/e2e/home.spec.ts`)
- Homepage loads correctly
- Hero section displays
- Featured events section displays
- CTA buttons navigate correctly
- Responsive layouts (mobile, tablet, desktop)

### Accessibility Tests (`tests/e2e/a11y.spec.ts`)
- WCAG 2.1 AA compliance (axe-core)
- Keyboard navigation
- Image alt text
- Heading hierarchy
- Color contrast

### Visual Regression Tests (`tests/e2e/visual.spec.ts`)
- Desktop visual snapshot
- Mobile visual snapshot
- Tablet visual snapshot
- Hero section snapshot

### Lighthouse CI (`.lighthouserc.json`)
- Performance score >= 90
- Accessibility score >= 95
- SEO score >= 90
- Best Practices score >= 95

## Test Execution

Tests run against a production build (`npm run build && npm start`) to ensure accurate performance metrics.

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- run: npm ci
- run: npx playwright install --with-deps
- run: npm run build
- run: npm run test:qa
```

## Updating Visual Snapshots

If visual changes are intentional:

```bash
npx playwright test tests/e2e/visual.spec.ts --update-snapshots
```
