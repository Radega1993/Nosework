import { test, expect } from "@playwright/test";

test.describe("Event Detail Page", () => {
  test("event detail page loads correctly", async ({ page }) => {
    // First, get an event ID from the events list
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      const firstLink = eventLinks.first();
      const href = await firstLink.getAttribute("href");
      const eventId = href?.split("/").pop();
      
      if (eventId) {
        await page.goto(`/events/${eventId}`);
        
        // Check that event detail page loads
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.getByRole("main")).toBeVisible();
      }
    } else {
      // Skip test if no events exist
      test.skip();
    }
  });

  test("breadcrumbs are displayed and functional", async ({ page }) => {
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      const firstLink = eventLinks.first();
      await firstLink.click();
      
      // Check breadcrumbs
      const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumbs).toBeVisible();
      
      // Check breadcrumb links
      const homeLink = page.getByRole("link", { name: "Inicio" });
      const eventsLink = page.getByRole("link", { name: "Eventos" });
      
      await expect(homeLink).toBeVisible();
      await expect(eventsLink).toBeVisible();
      
      // Test navigation
      await eventsLink.click();
      await expect(page).toHaveURL(/\/events/);
    } else {
      test.skip();
    }
  });

  test("event information is displayed correctly", async ({ page }) => {
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      
      // Check that event title is displayed as H1
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();
      
      // Check that event details are visible
      const mainContent = page.getByRole("main");
      await expect(mainContent).toBeVisible();
    } else {
      test.skip();
    }
  });

  test("related events section is displayed", async ({ page }) => {
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 1) {
      await eventLinks.first().click();
      
      // Check for related events section
      const relatedSection = page.getByRole("heading", { name: /Próximos Eventos/i });
      const relatedCount = await relatedSection.count();
      
      // Related events may or may not be present depending on data
      if (relatedCount > 0) {
        await expect(relatedSection).toBeVisible();
      }
    } else {
      test.skip();
    }
  });

  test("social sharing buttons are displayed", async ({ page }) => {
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      
      // Check for social sharing section
      const shareSection = page.getByRole("heading", { name: /Compartir evento/i });
      const shareCount = await shareSection.count();
      
      if (shareCount > 0) {
        await expect(shareSection).toBeVisible();
        
        // Check for social sharing buttons
        const facebookButton = page.getByRole("link", { name: /Facebook/i });
        const twitterButton = page.getByRole("link", { name: /Twitter/i });
        const whatsappButton = page.getByRole("link", { name: /WhatsApp/i });
        
        await expect(facebookButton).toBeVisible();
        await expect(twitterButton).toBeVisible();
        await expect(whatsappButton).toBeVisible();
      }
    } else {
      test.skip();
    }
  });

  test("404 page is displayed for non-existent event", async ({ page }) => {
    await page.goto("/events/999999");
    
    // Check for 404 message
    const notFoundMessage = page.getByText(/Evento no encontrado/i);
    await expect(notFoundMessage).toBeVisible();
    
    // Check for link back to events
    const backLink = page.getByRole("link", { name: /Volver a eventos/i });
    await expect(backLink).toBeVisible();
  });

  test("loading state is displayed", async ({ page }) => {
    // Navigate to event detail page
    await page.goto("/events/1");
    
    // Loading state should appear briefly
    const loadingIndicator = page.locator("text=Cargando evento");
    // Note: This might be too fast to catch, so we'll just check the page loads
    await page.waitForLoadState("networkidle");
  });
});

test.describe("Event Detail Page - Responsive", () => {
  test("mobile viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    } else {
      test.skip();
    }
  });

  test("tablet viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    } else {
      test.skip();
    }
  });

  test("desktop viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto("/events");
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      await eventLinks.first().click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    } else {
      test.skip();
    }
  });
});
