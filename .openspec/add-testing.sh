#!/bin/bash
# Script to automatically add testing artifact to an OpenSpec change
# Usage: ./add-testing.sh <change-name>

CHANGE_NAME="$1"
CHANGE_DIR="openspec/changes/${CHANGE_NAME}"

if [ -z "$CHANGE_NAME" ]; then
    echo "Usage: ./add-testing.sh <change-name>"
    exit 1
fi

if [ ! -d "$CHANGE_DIR" ]; then
    echo "Error: Change directory not found: $CHANGE_DIR"
    exit 1
fi

# Create testing.md if it doesn't exist
if [ ! -f "$CHANGE_DIR/testing.md" ]; then
    cat > "$CHANGE_DIR/testing.md" << 'EOF'
# Testing - [CHANGE_NAME]

**Date:** $(date +%Y-%m-%d)  
**Change:** [CHANGE_NAME]

## Automated Testing Setup

### Tools Available

1. **Lighthouse CI** (`@lhci/cli`)
   - Configuration: `.lighthouserc.json`
   - Purpose: Automated performance, accessibility, SEO, and best practices audits

2. **Playwright** (`@playwright/test`)
   - Configuration: `playwright.config.ts`
   - Purpose: E2E testing, responsive testing, cross-browser compatibility

3. **Axe Core** (`@axe-core/playwright`)
   - Purpose: Automated WCAG 2.1 AA accessibility compliance testing

## Test Coverage

Document the test coverage for this change:
- E2E tests created/updated
- Accessibility tests
- Visual regression tests
- Lighthouse CI assertions

## Test Execution

```bash
# Full QA Suite
npm run test:qa

# Individual Test Suites
npm run test:e2e
npm run test:a11y
npm run test:visual
npm run test:lighthouse
```

## Automated vs Manual Testing

Document what's automated vs what requires manual testing.

## Success Criteria

- All automated tests pass
- Lighthouse scores meet thresholds
- Performance targets met

EOF
    sed -i "s/\[CHANGE_NAME\]/$CHANGE_NAME/g" "$CHANGE_DIR/testing.md"
    echo "✅ Created testing.md for change: $CHANGE_NAME"
else
    echo "⚠️  testing.md already exists for change: $CHANGE_NAME"
fi
