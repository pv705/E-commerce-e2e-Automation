import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {

    await page.goto("https://automationexercise.com/login");

    await page
        .locator("form")
        .filter({ hasText: "Login" })
        .getByPlaceholder("Email Address")
        .fill("johndoe75@gmail.com");

    await page
        .locator("form")
        .filter({ hasText: "Login" })
        .getByPlaceholder("Password")
        .fill("JD@12345");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Logged in as")).toBeVisible();

    await page.context().storageState({
        path: "playwright/.auth/user.json",
    });

});