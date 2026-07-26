import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./",

  testIgnore: [
    "node_modules",
    "playwright-report",
    "test-results"
  ],

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [["html"],
             ["list"]],

  use: {
    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",
  },

  projects: [
  // Setup
  {
    name: "setup",
    testMatch: /.*login\.setup\.ts/,
  },

  // Login tests (NO storage state)
  {
    name: "login",
    testMatch: /.*login\.spec\.ts/,
    use: {
      ...devices["Desktop Chrome"],
    },
  },

  // All other tests (WITH storage state)
  {
    name: "chromium",
    testIgnore: /.*login\.spec\.ts/,
    use: {
      ...devices["Desktop Chrome"],
      storageState: "playwright/.auth/user.json",
    },
    dependencies: ["setup"],
  },
],

  // webServer: {
  //   command: "npm run start",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});