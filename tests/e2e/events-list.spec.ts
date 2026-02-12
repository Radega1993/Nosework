import { test, expect } from "@playwright/test";

test.describe("Events List Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/events");
  });

  test("events list page loads correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Eventos y Pruebas");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("calendar view is displayed by default", async ({ page }) => {
    const calendarView = page.getByRole("tab", { name: "Calendario" });
    await expect(calendarView).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".react-calendar")).toBeVisible();
  });

  test("can switch to list view", async ({ page }) => {
    await page.getByRole("tab", { name: "Lista" }).click();
    await expect(page.getByRole("tab", { name: "Lista" })).toHaveAttribute("aria-selected", "true");
    // Check that events are displayed in list format
    const eventCards = page.locator("article");
    if ((await eventCards.count()) > 0) {
      await expect(eventCards.first()).toBeVisible();
    }
  });

  test("can switch to grid view", async ({ page }) => {
    await page.getByRole("tab", { name: "Grid" }).click();
    await expect(page.getByRole("tab", { name: "Grid" })).toHaveAttribute("aria-selected", "true");
    // Check that events are displayed in grid format
    const eventCards = page.locator("article");
    if ((await eventCards.count()) > 0) {
      await expect(eventCards.first()).toBeVisible();
    }
  });

  test("search functionality works", async ({ page }) => {
    // Switch to grid view to see search
    await page.getByRole("tab", { name: "Grid" }).click();
    
    const searchInput = page.getByPlaceholder(/Buscar eventos/i);
    await expect(searchInput).toBeVisible();
    
    // Type search query
    await searchInput.fill("test");
    // Wait for debounce
    await page.waitForTimeout(500);
    
    // Verify search is applied (URL should have search param)
    await expect(page).toHaveURL(/.*search=test.*/);
  });

  test("filters are displayed in grid/list view", async ({ page }) => {
    await page.getByRole("tab", { name: "Grid" }).click();
    
    // Check that filters section is visible
    const filtersSection = page.locator("fieldset");
    await expect(filtersSection.first()).toBeVisible();
  });

  test("pagination works when there are many events", async ({ page }) => {
    await page.getByRole("tab", { name: "Grid" }).click();
    
    // Wait for events to load
    await page.waitForTimeout(1000);
    
    // Check if pagination exists (only if there are more than 12 events)
    const pagination = page.locator("button:has-text('Siguiente')");
    const paginationCount = await pagination.count();
    
    if (paginationCount > 0) {
      await pagination.first().click();
      await expect(page).toHaveURL(/.*page=2.*/);
    }
  });

  test("event cards link to detail page", async ({ page }) => {
    await page.getByRole("tab", { name: "Grid" }).click();
    await page.waitForTimeout(1000);
    
    const eventLinks = page.locator('a[href^="/events/"]');
    const linkCount = await eventLinks.count();
    
    if (linkCount > 0) {
      const firstLink = eventLinks.first();
      await expect(firstLink).toBeVisible();
      const href = await firstLink.getAttribute("href");
      expect(href).toMatch(/^\/events\/\d+$/);
    }
  });

  test("empty state is displayed when no events match filters", async ({ page }) => {
    await page.getByRole("tab", { name: "Grid" }).click();
    
    // Apply a filter that won't match any events
    const searchInput = page.getByPlaceholder(/Buscar eventos/i);
    await searchInput.fill("nonexistent-event-xyz-123");
    await page.waitForTimeout(500);
    
    // Check for empty state message
    const emptyState = page.getByText(/No se encontraron eventos/i);
    await expect(emptyState).toBeVisible();
  });

  test("calendar date selection filters events", async ({ page }) => {
    // Select a date in the calendar
    const calendar = page.locator(".react-calendar");
    await expect(calendar).toBeVisible();
    
    // Click on a date (if available)
    const dateButtons = calendar.locator("button[class*='react-calendar__tile']");
    const dateCount = await dateButtons.count();
    
    if (dateCount > 0) {
      await dateButtons.first().click();
      // Should switch to grid view and filter events
      await expect(page.getByRole("tab", { name: "Grid" })).toHaveAttribute("aria-selected", "true");
    }
  });
});

test.describe("Events List Page - Responsive", () => {
  test("mobile viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/events");
    
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Filters should be collapsible on mobile
    const filtersButton = page.getByRole("button", { name: /Filtros/i });
    if ((await filtersButton.count()) > 0) {
      await expect(filtersButton.first()).toBeVisible();
    }
  });

  test("tablet viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/events");
    
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("desktop viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/events");
    
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
  });
});
