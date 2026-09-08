import { test, expect } from "@playwright/test";

const VIEWPORTS = [[320, 568], [390, 844], [768, 1024], [1024, 768], [1280, 800], [1440, 900]] as const;

test.describe("MedMap Three.js WebGL2 spatial baseline", () => {
  test("renders the semantic shell with MapLibre and the authored 3D canvas", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Find care nearby." })).toBeVisible();
    await expect(page.locator(".map-canvas")).toBeVisible();
    const canvas = page.getByTestId("hero-mesh-canvas");
    await expect(canvas).toBeVisible();
    await expect(canvas).toHaveAttribute("data-environment-version", "5");
    await expect(canvas).toHaveAttribute("data-webgl", /^(active|unavailable)$/);
  });

  test("uses WebGL2 when the browser exposes it", async ({ page }) => {
    await page.goto("/");
    const canvas = page.getByTestId("hero-mesh-canvas");
    if (await canvas.getAttribute("data-webgl") === "active") {
      await expect(canvas).toHaveAttribute("data-camera-pov", "arrival");
      await expect(canvas).toHaveAttribute("data-camera-progress", /\d+\.\d{3}/);
      expect(Number(await canvas.getAttribute("data-camera-distance"))).toBeGreaterThan(1);
    }
  });

  test("keeps the product usable when WebGL2 is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
        if (type === "webgl2" && this.dataset.testid === "hero-mesh-canvas") return null;
        return original.call(this, type as never, ...args as never[]);
      };
    });
    await page.goto("/");
    await expect(page.getByTestId("hero-mesh-canvas")).toHaveAttribute("data-webgl", "unavailable");
    await expect(page.getByRole("heading", { name: "Find care nearby." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open clinic" })).toBeVisible();
    await expect(page.locator(".map-canvas")).toBeVisible();
  });

  test("moves the camera through a bounded Hero traversal", async ({ page }) => {
    await page.goto("/");
    const canvas = page.getByTestId("hero-mesh-canvas");
    if (await canvas.getAttribute("data-webgl") !== "active") test.skip();
    await expect.poll(async () => Number(await canvas.getAttribute("data-camera-progress"))).toBeLessThan(0.12);
    await page.evaluate(() => window.scrollTo({ top: Math.max(1, document.body.scrollHeight * 0.45), behavior: "auto" }));
    await expect.poll(async () => Number(await canvas.getAttribute("data-camera-progress"))).toBeGreaterThan(0.12);
    const pov = await canvas.getAttribute("data-camera-pov");
    expect(["hall", "overview"]).toContain(pov);
    const distance = Number(await canvas.getAttribute("data-camera-distance"));
    expect(distance).toBeGreaterThan(4);
    expect(distance).toBeLessThan(20);
  });

  test("preserves mobile layout integrity", async ({ page }) => {
    for (const [width, height] of VIEWPORTS) {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await expect(page.getByTestId("hero-mesh-canvas")).toBeVisible();
      await expect(page.getByRole("link", { name: "Open clinic" })).toBeVisible();
      const bodyWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(width);
    }
  });

  test("keeps the canonical clinic public surface intact", async ({ page }) => {
    await page.goto("/clinics/northstar");
    await expect(page.getByRole("heading", { name: "Northstar Family Clinic" })).toBeVisible();
    for (const label of ["Profile", "Services", "Booking", "About", "Contact"]) await expect(page.getByRole("link", { name: label, exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Edit", exact: true })).toHaveCount(0);
  });
});
