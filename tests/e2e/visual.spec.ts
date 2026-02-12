import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('home visual snapshot - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('home-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100, // Allow small differences
    });
  });

  test('home visual snapshot - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('home-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('home visual snapshot - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('home-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('hero section visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const heroSection = page.locator('header').first();
    await expect(heroSection).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 50,
    });
  });
});
