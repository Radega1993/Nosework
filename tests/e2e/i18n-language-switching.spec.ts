import { test, expect } from '@playwright/test';

/**
 * E2E tests for i18n language switching functionality
 * 
 * These tests verify:
 * - Language switcher component functionality
 * - Language switching preserves current page
 * - Language preference persistence (cookie/localStorage)
 * - URL redirects for language prefixes
 * - Legacy URL redirects
 */

test.describe('i18n Language Switching E2E Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear cookies and localStorage before each test
    await context.clearCookies();
    await page.goto('/');
  });

  test.describe('Language Switcher Component', () => {
    test('should display language switcher in navbar', async ({ page }) => {
      await page.goto('/es/');
      
      const languageSwitcher = page.locator('[role="group"][aria-label="Seleccionar idioma"]');
      await expect(languageSwitcher).toBeVisible();
      
      // Should show ES and CA buttons
      await expect(page.locator('button:has-text("ES")')).toBeVisible();
      await expect(page.locator('button:has-text("CA")')).toBeVisible();
    });

    test('should highlight current language', async ({ page }) => {
      await page.goto('/es/eventos');
      
      const esButton = page.locator('button:has-text("ES")');
      await expect(esButton).toHaveAttribute('aria-pressed', 'true');
      
      const caButton = page.locator('button:has-text("CA")');
      await expect(caButton).toHaveAttribute('aria-pressed', 'false');
    });

    test('should switch language when clicking language button', async ({ page }) => {
      await page.goto('/es/eventos');
      
      // Click Catalan button
      await page.locator('button:has-text("CA")').click();
      
      // Should navigate to Catalan version
      await expect(page).toHaveURL(/\/ca\/eventos/);
    });

    test('should preserve current page path when switching language', async ({ page }) => {
      await page.goto('/es/about');
      
      // Switch to Catalan
      await page.locator('button:has-text("CA")').click();
      
      // Should be on same page but in Catalan
      await expect(page).toHaveURL(/\/ca\/about/);
    });

    test('should preserve query parameters when switching language', async ({ page }) => {
      await page.goto('/es/eventos?filter=upcoming');
      
      // Switch to Catalan
      await page.locator('button:has-text("CA")').click();
      
      // Should preserve query parameters
      await expect(page).toHaveURL(/\/ca\/eventos\?filter=upcoming/);
    });
  });

  test.describe('Language Preference Persistence', () => {
    test('should set cookie when language is changed', async ({ page, context }) => {
      await page.goto('/es/');
      
      // Switch to Catalan
      await page.locator('button:has-text("CA")').click();
      await page.waitForURL(/\/ca\//);
      
      // Check cookie
      const cookies = await context.cookies();
      const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE');
      expect(localeCookie).toBeDefined();
      expect(localeCookie?.value).toBe('ca');
    });

    test('should persist language preference on page reload', async ({ page, context }) => {
      await page.goto('/es/');
      
      // Switch to Catalan
      await page.locator('button:has-text("CA")').click();
      await page.waitForURL(/\/ca\//);
      
      // Reload page
      await page.reload();
      
      // Should still be in Catalan
      await expect(page).toHaveURL(/\/ca\//);
    });

    test('should use cookie preference on new visit', async ({ page, context }) => {
      // Set cookie manually
      await context.addCookies([{
        name: 'NEXT_LOCALE',
        value: 'ca',
        domain: 'localhost',
        path: '/',
      }]);
      
      await page.goto('/');
      
      // Should redirect to Catalan version
      await expect(page).toHaveURL(/\/ca\//);
    });
  });

  test.describe('URL Redirects', () => {
    test('should redirect URLs without language prefix to Spanish', async ({ page }) => {
      await page.goto('/eventos');
      
      // Should redirect to /es/eventos
      await expect(page).toHaveURL(/\/es\/eventos/);
    });

    test('should redirect root URL to Spanish', async ({ page }) => {
      await page.goto('/');
      
      // Should redirect to /es/
      await expect(page).toHaveURL(/\/es\//);
    });

    test('should redirect legacy /events to /es/eventos', async ({ page }) => {
      await page.goto('/events');
      
      // Should redirect to /es/eventos
      await expect(page).toHaveURL(/\/es\/eventos/);
    });

    test('should redirect legacy URLs with query parameters', async ({ page }) => {
      await page.goto('/events?filter=upcoming');
      
      // Should redirect preserving query parameters
      await expect(page).toHaveURL(/\/es\/eventos\?filter=upcoming/);
    });
  });

  test.describe('Browser Language Detection', () => {
    test('should detect browser language on first visit', async ({ page, context }) => {
      // Set Accept-Language header to Catalan
      await context.setExtraHTTPHeaders({
        'Accept-Language': 'ca,es;q=0.9',
      });
      
      await page.goto('/');
      
      // Should redirect to Catalan version
      await expect(page).toHaveURL(/\/ca\//);
    });

    test('should prioritize cookie over browser language', async ({ page, context }) => {
      // Set cookie to Spanish
      await context.addCookies([{
        name: 'NEXT_LOCALE',
        value: 'es',
        domain: 'localhost',
        path: '/',
      }]);
      
      // Set browser language to Catalan
      await context.setExtraHTTPHeaders({
        'Accept-Language': 'ca,es;q=0.9',
      });
      
      await page.goto('/');
      
      // Should use cookie (Spanish) not browser language
      await expect(page).toHaveURL(/\/es\//);
    });
  });

  test.describe('API Routes Exclusion', () => {
    test('should not redirect API routes', async ({ page }) => {
      // Try to access API route
      const response = await page.goto('/api/events');
      
      // Should not redirect (API routes don't need language prefix)
      expect(response?.url()).toContain('/api/events');
    });
  });

  test.describe('Dashboard Routes Exclusion', () => {
    test('should not redirect dashboard routes', async ({ page }) => {
      // Try to access dashboard (will redirect to login if not authenticated)
      await page.goto('/dashboard');
      
      // Should not add language prefix to dashboard routes
      // (will redirect to login, but login should have language prefix)
      await expect(page).toHaveURL(/\/login/);
    });
  });
});
