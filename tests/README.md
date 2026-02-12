# Testing Documentation

## Test Structure

This project uses multiple testing approaches:

- **Unit Tests**: Jest for testing utility functions and components
- **E2E Tests**: Playwright for end-to-end testing
- **Accessibility Tests**: Playwright with axe-core
- **Visual Regression**: Playwright for visual testing
- **Performance**: Lighthouse CI for performance audits

## Unit Tests

Unit tests are located in `utils/__tests__/` and test individual utility functions.

### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run in watch mode
npm run test:unit:watch

# Run with coverage
npm run test:unit:coverage
```

### Test Coverage

Current unit test coverage includes:

- ✅ **Validation** (`utils/validation.js`)
  - Login schema validation
  - Register schema validation
  - Change password schema validation
  - Refresh token schema validation

- ✅ **Password Security** (`utils/passwordSecurity.js`)
  - Password strength validation
  - Common password detection
  - Password strength calculation

- ✅ **Sanitization** (`utils/sanitization.js`)
  - HTML sanitization
  - Email normalization
  - URL validation
  - Text sanitization
  - Object sanitization

### Adding New Unit Tests

1. Create test file: `utils/__tests__/yourModule.test.js`
2. Import the module to test
3. Write test cases using Jest's `describe` and `it` blocks
4. Run tests: `npm test`

Example:

```javascript
import { yourFunction } from '../yourModule';

describe('YourModule', () => {
  it('should do something', () => {
    const result = yourFunction('input');
    expect(result).toBe('expected');
  });
});
```

## E2E Tests

E2E tests are located in `tests/e2e/` and use Playwright.

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed

# Run accessibility tests
npm run test:a11y

# Run visual regression tests
npm run test:visual

# Run security E2E tests specifically
npm run test:e2e -- tests/e2e/auth-security.spec.ts
```

### Security E2E Tests

The `auth-security.spec.ts` file contains comprehensive E2E tests for authentication security features:

- **Login Security**: Validation, rate limiting, invalid credentials
- **Registration Security**: Password strength, validation, duplicate email
- **Change Password Security**: Password strength, current password validation
- **CSRF Protection**: CSRF token requirements
- **Account Lockout**: Account locking after failed attempts
- **Token Management**: Token storage and cleanup on logout

These tests verify security features from the user's perspective and ensure the UI properly handles security scenarios.

## Test Coverage Goals

- **Unit Tests**: Aim for >80% coverage on utility functions
- **E2E Tests**: Cover critical user flows
- **Accessibility**: All public pages should pass WCAG 2.1 AA
- **Performance**: Lighthouse score >90

## Continuous Integration

Tests should be run:
- Before committing (pre-commit hook recommended)
- In CI/CD pipeline
- Before deploying to production

## Test Data

- Use test databases for E2E tests
- Clean up test data after tests
- Use factories or fixtures for consistent test data

## Best Practices

1. **Isolation**: Each test should be independent
2. **Naming**: Use descriptive test names
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Mock External Dependencies**: Don't rely on external services
5. **Fast Tests**: Unit tests should run quickly
6. **Deterministic**: Tests should produce consistent results
