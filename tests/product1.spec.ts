import { test } from "@playwright/test";
import { ProductPage } from "../Page/ProductPage";
test.beforeEach(async ({ page }) => {

    await page.route('**/*', route => {

        const url = route.request().url();

        if (
            url.includes('googleads') ||
            url.includes('googlesyndication') ||
            url.includes('doubleclick') ||
            url.includes('adsystem') ||
            url.includes('adservice')
        ) {
            return route.abort();
        }

        route.continue();

    });

    await page.goto("https://automationexercise.com");

});

test.describe("Products Module", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://automationexercise.com");
    });

    test("Verify All Products Page", async ({ page }) => {

        const product = new ProductPage(page);

        await product.navigateToProducts();

        await product.verifyProductsPage();

    });

    test("View Product Details", async ({ page }) => {

        const product = new ProductPage(page);

        await product.navigateToProducts();

        await product.openFirstProduct();

        await product.verifyProductDetails();

    });

    test("Search Product", async ({ page }) => {

        const product = new ProductPage(page);

        await product.navigateToProducts();

        await product.searchProduct("Blue Top");

        await product.verifySearchResults();

    });

});