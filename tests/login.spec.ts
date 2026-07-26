import { test } from "@playwright/test";
import { loginPage } from "../Page/LoginPage";

test.describe("Login Functionality", () => {

    test("Valid Login", async ({ page }) => {

        const login = new loginPage(page);

        await page.goto("https://automationexercise.com");
        await page.getByRole("link", { name: "Signup / Login" }).click();

        await login.login(
            "johndoe75@gmail.com",
            "JD@12345"
        );

        await login.verifySuccessfulLogin();

    });

    test("Invalid Login", async ({ page }) => {

        const login = new loginPage(page);

        await page.goto("https://automationexercise.com");
        await page.getByRole("link", { name: "Signup / Login" }).click();

        await login.login(
            "wrong@gmail.com",
            "WrongPassword"
        );

        await login.verifyInvalidLogin();

    });

    test("Logout", async ({ page }) => {

        const login = new loginPage(page);

        await page.goto("https://automationexercise.com");
        await page.getByRole("link", { name: "Signup / Login" }).click();

        await login.login(
            "johndoe75@gmail.com",
            "JD@12345"
        );

        await login.verifySuccessfulLogin();

        await login.logout();

    });

});