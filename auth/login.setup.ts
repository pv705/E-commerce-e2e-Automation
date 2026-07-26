import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    if (!email || !password) {
        throw new Error("TEST_EMAIL and TEST_PASSWORD must be set in .env or CI secrets");
    }

    await page.goto("https://automationexercise.com/login");
    await page.locator("form").filter({ hasText: "Login" }).getByPlaceholder("Email Address").fill(email);
    await page.locator("form").filter({ hasText: "Login" }).getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Logged in as")).toBeVisible();
    await page.context().storageState({ path: "playwright/.auth/user.json" });
});