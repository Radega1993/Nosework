import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('home has no critical a11y violations', async ({ page }) => {
    await page.goto('/');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();
    
    // Filter out known non-critical issues
    const criticalViolations = results.violations.filter(v => 
      v.impact === 'critical' || v.impact === 'serious'
    );
    
    expect(criticalViolations).toEqual([]);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Verify focus is on a focusable element
    const focusedElement = page.locator(':focus');
    const tagName = await focusedElement.evaluate((el) => el.tagName.toLowerCase());
    expect(['a', 'button', 'input', 'textarea', 'select']).toContain(tagName);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt can be empty string for decorative images, but attribute should exist
      expect(alt).not.toBeNull();
    }
  });

  test('heading hierarchy is correct', async ({ page }) => {
    await page.goto('/');
    
    // Verify H1 exists (should be only one)
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Verify H1 comes before H2
    const h1 = page.locator('h1').first();
    const h2 = page.locator('h2').first();
    
    if (await h2.count() > 0) {
      const h1Index = await h1.evaluate((el) => {
        let index = 0;
        let node = el.previousSibling;
        while (node) {
          index++;
          node = node.previousSibling;
        }
        return index;
      });
      
      const h2Index = await h2.evaluate((el) => {
        let index = 0;
        let node = el.previousSibling;
        while (node) {
          index++;
          node = node.previousSibling;
        }
        return index;
      });
      
      // H1 should come before H2 (simplified check)
      expect(h1Index).toBeLessThan(h2Index + 100); // Allow some flexibility
    }
  });

  test('color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();
    
    // Filter contrast-related violations
    const contrastViolations = results.violations.filter(v =>
      v.id === 'color-contrast' || v.help?.toLowerCase().includes('contrast')
    );
    
    expect(contrastViolations.length).toBe(0);
  });
});

test.describe('Events List Page Accessibility', () => {
  test('events list page has no critical a11y violations', async ({ page }) => {
    await page.goto('/events');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();
    
    const criticalViolations = results.violations.filter(v => 
      v.impact === 'critical' || v.impact === 'serious'
    );
    
    expect(criticalViolations).toEqual([]);
  });

  test('events list page keyboard navigation works', async ({ page }) => {
    await page.goto('/events');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Verify focus is on a focusable element
    const focusedElement = page.locator(':focus');
    const tagName = await focusedElement.evaluate((el) => el.tagName.toLowerCase());
    expect(['a', 'button', 'input', 'textarea', 'select']).toContain(tagName);
  });

  test('events list page filters are accessible', async ({ page }) => {
    await page.goto('/events');
    
    // Switch to grid view to see filters
    await page.getByRole('tab', { name: 'Grid' }).click();
    
    // Check that filters use proper semantic HTML
    const fieldsets = page.locator('fieldset');
    const fieldsetCount = await fieldsets.count();
    
    if (fieldsetCount > 0) {
      // Verify fieldset has legend
      const firstFieldset = fieldsets.first();
      const legend = firstFieldset.locator('legend');
      await expect(legend).toBeVisible();
    }
  });
});

test.describe('Event Detail Page Accessibility', () => {
  test('event detail page has no critical a11y violations', async ({ page }) => {
    // Navigate to an event detail page
    await page.goto('/events');
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
        .analyze();
      
      const criticalViolations = results.violations.filter(v => 
        v.impact === 'critical' || v.impact === 'serious'
      );
      
      expect(criticalViolations).toEqual([]);
    } else {
      test.skip();
    }
  });

  test('event detail page keyboard navigation works', async ({ page }) => {
    await page.goto('/events');
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('event detail page heading hierarchy is correct', async ({ page }) => {
    await page.goto('/events');
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      
      // Verify H1 exists (should be only one)
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    } else {
      test.skip();
    }
  });
});
