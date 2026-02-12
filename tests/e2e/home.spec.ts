import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('home loads and has hero + featured events', async ({ page }) => {
    await page.goto('/');
    
    // Verify navigation is visible
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Verify H1 heading (hero section)
    await expect(page.getByRole('heading', { level: 1, name: /Nosework Trial/i })).toBeVisible();
    
    // Verify featured events section
    await expect(page.getByRole('heading', { level: 2, name: /Próximos Eventos/i })).toBeVisible();
    
    // Verify hero section CTAs
    await expect(page.getByRole('link', { name: /Cómo Empezar/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Ver Reglamento/i })).toBeVisible();
  });

  test('hero section displays correctly', async ({ page }) => {
    await page.goto('/');
    
    // Verify hero section structure
    const heroSection = page.locator('header').first();
    await expect(heroSection).toBeVisible();
    
    // Verify brand name
    await expect(heroSection.getByRole('heading', { level: 1 })).toContainText('Nosework Trial');
    
    // Verify tagline
    await expect(heroSection.getByText(/Deporte de perros detectores/i)).toBeVisible();
  });

  test('featured events section displays correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for featured events to load
    const featuredEventsSection = page.getByRole('heading', { level: 2, name: /Próximos Eventos/i });
    await expect(featuredEventsSection).toBeVisible();
    
    // Verify section is present (may be empty, loading, or have events)
    const section = featuredEventsSection.locator('..').locator('..');
    await expect(section).toBeVisible();
  });

  test('CTA buttons navigate correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test "Cómo Empezar" button
    const comoEmpezarLink = page.getByRole('link', { name: /Cómo Empezar/i }).first();
    await expect(comoEmpezarLink).toHaveAttribute('href', '/como-empezar');
    
    // Test "Ver Reglamento" button
    const reglamentoLink = page.getByRole('link', { name: /Ver Reglamento/i }).first();
    await expect(reglamentoLink).toHaveAttribute('href', '/reglamento');
  });

  test('responsive layout - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');
    
    // Verify hero section is visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Verify CTAs stack vertically on mobile (check flex direction)
    const ctaContainer = page.getByRole('link', { name: /Cómo Empezar/i }).locator('..').locator('..');
    const flexDirection = await ctaContainer.evaluate((el) => {
      return window.getComputedStyle(el).flexDirection;
    });
    expect(['column', 'column-reverse']).toContain(flexDirection);
  });

  test('responsive layout - tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet size
    await page.goto('/');
    
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /Próximos Eventos/i })).toBeVisible();
  });

  test('responsive layout - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop size
    await page.goto('/');
    
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /Próximos Eventos/i })).toBeVisible();
  });
});
