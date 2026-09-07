import { defineConfig, devices } from "@playwright/test";

const chromiumLaunchOptions = {
  args: [
    "--enable-gpu",
    "--ignore-gpu-blocklist",
    "--use-gl=angle",
    "--use-angle=gl",
  ],
};

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: "playwright-report", open: "never" }]]
    : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
        headless: false,
        launchOptions: chromiumLaunchOptions,
      },
    },
    {
      name: "chromium-tablet",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
        headless: false,
        isMobile: true,
        hasTouch: true,
        viewport: { width: 768, height: 1024 },
        launchOptions: chromiumLaunchOptions,
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 7"],
        channel: "chromium",
        headless: false,
        launchOptions: chromiumLaunchOptions,
      },
    },
  ],
});
