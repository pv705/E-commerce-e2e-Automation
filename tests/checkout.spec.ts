import { test } from "@playwright/test";
import { loginPage } from "../Page/LoginPage";
import { CartPage } from "../Page/CartPage";
import { CheckoutPage } from "../Page/CheckoutPage";

test.describe("Checkout Module", () => {

    test.beforeEach(async ({ page }) => {

        // Block ads
        await page.route("**://*.doubleclick.net/**", route => route.abort());
        await page.route("**://*.googlesyndication.com/**", route => route.abort());
        await page.route("**://*.google.com/pagead/**", route => route.abort());
        await page.route("**googleadservices.com/**", route => route.abort());
        await page.route("**adsbygoogle.js", route => route.abort());
        await page.route("**vignette**", route => route.abort());

        await page.goto("https://automationexercise.com");

        // const login = new loginPage(page);

        // await login.navigateTologinPage();

        // await login.login(
        //     "johndoe75@gmail.com",
        //     "JD@12345"
        // );

        // await login.verifySuccessfulLogin();

        const cart = new CartPage(page);

        await cart.clearCart();

    });

    test("Verify Checkout End-to-End", async ({ page }) => {

        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Add product
        await cart.addFirstProduct();

        // Open Cart
        await cart.openCart();

        // Checkout
        await checkout.clickProceedToCheckout();

        // Enter order message
        await checkout.enterMessage(
            "Please deliver between 10 AM and 5 PM"
        );

        // Place Order
        await checkout.clickPlaceOrder();

        // Verify Payment Page
        await checkout.verifyReachedPayment();

    });

});