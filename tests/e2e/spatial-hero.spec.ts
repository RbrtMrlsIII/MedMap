import { test, expect } from "@playwright/test";

const VIEWPORT_MATRIX = [
  { name: "small-phone", width: 320, height: 568 },
  { name: "phone", width: 360, height: 800 },
  { name: "phone-plus", width: 390, height: 844 },
  { name: "large-phone", width: 430, height: 932 },
  { name: "small-tablet", width: 600, height: 960 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "large-tablet", width: 834, height: 1112 },
  { name: "small-desktop", width: 1024, height: 768 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "large-desktop", width: 1440, height: 900 },
  { name: "wide-desktop", width: 1728, height: 1117 },
];

async function assertViewportIntegrity(page: Parameters<Parameters<typeof test>[1]>[0]["page"], width: number, height: number) {
  await page.setViewportSize({ width, height });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Find a clinic that can actually take your appointment." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open clinic" })).toBeVisible();
  await expect(page.getByTestId("hero-mesh-canvas")).toBeVisible();

  const metrics = await page.evaluate(() => ({
    bodyWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    docWidth: document.documentElement.scrollWidth,
    heroWidth: document.querySelector(".hero-environment")?.getBoundingClientRect().width ?? 0,
  }));

  expect(metrics.bodyWidth).toBeLessThanOrEqual(width);
  expect(metrics.docWidth).toBeLessThanOrEqual(width);
  expect(Math.abs(metrics.heroWidth - width)).toBeLessThanOrEqual(1);
}

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
    await expect(meshCanvas).toHaveAttribute("data-environment-version", "2");

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

  test("preserves the semantic Hero when authored WebGL2 is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function getContext(type: string, ...args: unknown[]) {
        if (type === "webgl2" && this.dataset.testid === "hero-mesh-canvas") return null;
        return originalGetContext.call(this, type as never, ...args as never[]);
      };
    });

    await page.goto("/");

    const meshCanvas = page.getByTestId("hero-mesh-canvas");
    await expect(meshCanvas).toHaveAttribute("data-webgl", "unavailable");
    await expect(page.getByRole("heading", { name: "Find a clinic that can actually take your appointment." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open clinic" })).toBeVisible();
    await expect(page.locator(".map-canvas")).toBeVisible();
  });

  test("moves into the focus POV when the featured clinic receives focus", async ({ page }) => {
    await page.goto("/");

    const meshCanvas = page.getByTestId("hero-mesh-canvas");
    const featuredLink = page.getByRole("link", { name: "Open clinic" });

    await featuredLink.focus();
    await expect(meshCanvas).toHaveAttribute("data-camera-pov", "focus");
    await expect(meshCanvas).toHaveCSS("filter", /saturate\(1\.08\)/);

    const depth = await page.locator(".floating-clinic-card").evaluate((element) => {
      const transform = getComputedStyle(element).transform;
      return transform === "none" ? 0 : new DOMMatrix(transform).m43;
    });
    expect(depth).toBeGreaterThan(45);
    await expect(featuredLink).toBeFocused();
  });

  test("traverses from arrival into overview within bounded camera state", async ({ page }) => {
    await page.goto("/");

    const meshCanvas = page.getByTestId("hero-mesh-canvas");
    const initialProgress = Number(await meshCanvas.getAttribute("data-camera-progress"));
    expect(initialProgress).toBeGreaterThanOrEqual(0);
    expect(initialProgress).toBeLessThan(0.12);

    await page.evaluate(() => window.scrollTo({ top: Math.max(1, document.body.scrollHeight * 0.45), behavior: "auto" }));
    await expect.poll(async () => Number(await meshCanvas.getAttribute("data-camera-progress"))).toBeGreaterThan(0.12);
    await expect(meshCanvas).toHaveAttribute("data-camera-pov", "overview");

    const distance = Number(await meshCanvas.getAttribute("data-camera-distance"));
    expect(distance).toBeGreaterThanOrEqual(7.7);
    expect(distance).toBeLessThanOrEqual(10.8);
  });

  test("sweeps the Hero across phone, tablet, and desktop viewport classes", async ({ page }, testInfo) => {
    const failures: string[] = [];

    for (const viewport of VIEWPORT_MATRIX) {
      try {
        await assertViewportIntegrity(page, viewport.width, viewport.height);

        const meshCanvas = page.getByTestId("hero-mesh-canvas");
        await expect(meshCanvas).toHaveAttribute("data-mesh-count", "12");
        await expect(meshCanvas).toHaveAttribute("data-mesh-triangles", "144");

        const cardBox = await page.locator(".floating-clinic-card").boundingBox();
        const headingBox = await page.getByRole("heading", { name: "Find a clinic that can actually take your appointment." }).boundingBox();
        if (!cardBox || !headingBox) throw new Error("Hero geometry could not be measured");
        if (viewport.width <= 600 && cardBox.y < headingBox.y + headingBox.height) {
          throw new Error("Featured clinic card overlaps the discovery heading");
        }
      } catch (error) {
        failures.push(`${viewport.name} (${viewport.width}x${viewport.height}): ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    if (failures.length) throw new Error(failures.join("\n"));

    await testInfo.attach("spatial-hero-viewport-matrix", {
      body: Buffer.from(JSON.stringify(VIEWPORT_MATRIX, null, 2)),
      contentType: "application/json",
    });
  });

  test("keeps the mobile clinic card below the discovery copy", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const heroCopy = page.locator(".hero-copy");
    const featuredCard = page.locator(".floating-clinic-card");
    const [copyBox, cardBox] = await Promise.all([heroCopy.boundingBox(), featuredCard.boundingBox()]);

    expect(copyBox).not.toBeNull();
    expect(cardBox).not.toBeNull();
    expect(cardBox!.y).toBeGreaterThanOrEqual(copyBox!.y + copyBox!.height + 12);
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
