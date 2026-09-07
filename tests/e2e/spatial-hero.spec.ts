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
    await expect(page.getByTestId("hero-mesh-canvas")).toHaveAttribute("data-webgl", "active");
  });

  test("enters the canonical clinic public surface", async ({ page }) => {
    await page.goto("/clinics/northstar");

    await expect(page.getByRole("heading", { name: "Northstar Family Clinic" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Booking" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Edit" })).toHaveCount(0);
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
});
