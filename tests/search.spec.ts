import { test } from "@playwright/test";
import { loginPage } from "../Page/LoginPage";
import { CartPage } from "../Page/CartPage";
import { SearchPage } from "../Page/SearchPage";

test.describe("Search Module", () => {

    test.beforeEach(async ({ page }) => {

        // Block Ads
        await page.route("**://*.doubleclick.net/**", route => route.abort());
        await page.route("**://*.googlesyndication.com/**", route => route.abort());
        await page.route("**://*.google.com/pagead/**", route => route.abort());
        await page.route("**googleadservices.com/**", route => route.abort());
        await page.route("**adsbygoogle.js", route => route.abort());
        await page.route("**vignette**", route => route.abort());

        await page.goto("https://automationexercise.com");

        const login = new loginPage(page);

        await login.navigateTologinPage();
        await login.login(
            "johndoe75@gmail.com",
            "JD@12345"
        );
        await login.verifySuccessfulLogin();

        const cart = new CartPage(page);
        await cart.clearCart();
    });

    test("Search Product Successfully", async ({ page }) => {

        const search = new SearchPage(page);

        await search.navigateToProducts();

        await search.searchProduct("Blue Top");

        await search.verifySearchResults();

        await search.verifyProductPresent("Blue Top");

        await search.verifyResultsCountGreaterThanZero();

    });

});