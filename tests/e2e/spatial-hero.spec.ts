import { test, expect } from "@playwright/test";

test.describe("MedMap spatial Hero", () => {
  test("renders the spatial discovery shell and clinic entry", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Find a clinic that can actually take your appointment." })).toBeVisible();
    await expect(page.getByText("MapLibre WebGL", { exact: true })).toHaveCount(2);
    await expect(page.getByText("Clinic-first", { exact: true })).toBeVisible();
    await expect(page.getByText("Prototype data", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open clinic" })).toHaveAttribute("href", "/clinics/northstar");
    await expect(page.locator(".map-canvas")).toBeVisible();
    await expect(page.locator(".hero-environment")).toBeVisible();
    await expect(page.locator(".floating-clinic-card")).toBeVisible();
  });

  test("renders the authored mesh scene and preserves the semantic fallback", async ({ page }, testInfo) => {
    await page.goto("/");

    const meshCanvas = page.getByTestId("hero-mesh-canvas");
    await expect(meshCanvas).toBeVisible();
    await expect(meshCanvas).toHaveAttribute("data-webgl", /^(active|unavailable)$/);
    await expect(meshCanvas).toHaveAttribute("data-mesh-count", "12");
    await expect(meshCanvas).toHaveAttribute("data-mesh-triangles", "144");

    if (process.env.CI) {
      await expect(page.getByRole("heading", { name: "Find a clinic that can actually take your appointment." })).toBeVisible();
      await expect(page.getByRole("link", { name: "Open clinic" })).toBeVisible();
    } else {
      await expect(meshCanvas).toHaveAttribute("data-webgl", "active");
    }

    await testInfo.attach("spatial-hero-desktop", {
      body: await page.screenshot({ fullPage: false }),
      contentType: "image/png",
    });
  });

  test("enters the canonical clinic public surface", async ({ page }) => {
    await page.goto("/clinics/northstar");

    await expect(page.getByRole("heading", { name: "Northstar Family Clinic" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Profile", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Services", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Booking", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Edit", exact: true })).toHaveCount(0);
  });

  test("ships the reduced-motion CSS contract", async ({ page }) => {
    await page.goto("/");

    const reducedMotionRuleExists = await page.evaluate(() =>
      Array.from(document.styleSheets).some((sheet) => {
        try {
          return Array.from(sheet.cssRules).some((rule) => rule.cssText.includes("prefers-reduced-motion"));
        } catch {
          return false;
        }
      }),
    );

    expect(reducedMotionRuleExists).toBeTruthy();
  });

  test("keeps the spatial shell usable at mobile width", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Find a clinic that can actually take your appointment." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open clinic" })).toBeVisible();
    await expect(page.getByTestId("hero-mesh-canvas")).toBeVisible();

    const bodyWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(390);

    await testInfo.attach("spatial-hero-mobile", {
      body: await page.screenshot({ fullPage: false }),
      contentType: "image/png",
    });
  });
});
