# Testing in OpenSpec Workflow

## Overview

Testing is now integrated into the OpenSpec workflow as an automated step. After completing the `tasks.md` artifact, you should create a `testing.md` artifact that documents automated test setup and coverage.

## Workflow Integration

### Standard Workflow (spec-driven)
1. proposal
2. specs
3. design
4. tasks
5. **testing** ← Add this step

### Adding Testing to a Change

#### Option 1: Manual Creation
After completing `tasks.md`, create `testing.md` in the change directory:
```bash
touch openspec/changes/<change-name>/testing.md
```

Then document:
- Automated test setup (Playwright, Lighthouse CI, axe-core)
- Test coverage (E2E, accessibility, visual regression)
- Test execution commands
- Success criteria

#### Option 2: Using the Script
Use the provided script to create a template:
```bash
.openspec/add-testing.sh <change-name>
```

This creates a `testing.md` template with placeholders that you can fill in.

## Testing Artifact Template

The `testing.md` artifact should include:

1. **Automated Testing Setup**
   - Tools installed/configured
   - Configuration files created
   - Test infrastructure setup

2. **Test Coverage**
   - E2E tests (`tests/e2e/*.spec.ts`)
   - Accessibility tests (`tests/e2e/a11y.spec.ts`)
   - Visual regression tests (`tests/e2e/visual.spec.ts`)
   - Lighthouse CI configuration

3. **Test Execution**
   - Commands to run tests
   - CI/CD integration examples
   - How to interpret results

4. **Automated vs Manual Testing**
   - What's fully automated
   - What requires manual testing
   - Coverage gaps

5. **Success Criteria**
   - Test pass requirements
   - Performance thresholds
   - Accessibility compliance

## Example: homepage-hero-section

See `openspec/changes/homepage-hero-section/testing.md` for a complete example of a testing artifact.

## Rules in config.yaml

Testing rules are defined in `openspec/config.yaml`:
```yaml
rules:
  testing:
    - Include automated test setup: Playwright E2E, Lighthouse CI, axe-core accessibility
    - Document test coverage: what's automated vs manual
    - Include test execution commands and CI/CD integration
    - Reference test files created: test specs, configs, scripts
    - Document how to run tests and interpret results
```

## Future Enhancements

Potential improvements:
- Custom schema `spec-driven-with-testing` that includes testing as a standard artifact
- Automated test generation from specs
- Integration with CI/CD pipelines
- Test coverage reporting

## Current Status

✅ Testing artifact created for `homepage-hero-section`  
✅ Testing rules added to `config.yaml`  
✅ Script created to automate testing artifact creation  
✅ Documentation created
