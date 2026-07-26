import { test } from "@playwright/test";
import { loginPage } from "../Page/LoginPage";
import { CartPage } from "../Page/CartPage";
import { CheckoutPage } from "../Page/CheckoutPage";
import { PaymentPage } from "../Page/PaymentPage";

test.describe("Payment Module", () => {

    test.beforeEach(async ({ page }) => {

        // Block Ads
        await page.route("**://*.doubleclick.net/**", route => route.abort());
        await page.route("**://*.googlesyndication.com/**", route => route.abort());
        await page.route("**://*.google.com/pagead/**", route => route.abort());
        await page.route("**googleadservices.com/**", route => route.abort());
        await page.route("**adsbygoogle.js", route => route.abort());
        await page.route("**vignette**", route => route.abort());

        await page.goto("https://automationexercise.com");

        // const login = new loginPage(page);

        // await login.navigateTologinPage();
        // await login.login("johndoe75@gmail.com", "JD@12345");
        // await login.verifySuccessfulLogin();

        const cart = new CartPage(page);
        await cart.clearCart();
    });

    test("Verify Complete Payment Flow", async ({ page }) => {

        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        const payment = new PaymentPage(page);

        // Add Product
        await cart.addFirstProduct();
        await cart.openCart();

        // Checkout
        await checkout.clickProceedToCheckout();
        await checkout.verifyCheckoutPage();
        await checkout.enterMessage("Automation order");
        await checkout.clickPlaceOrder();

        // Payment
        await payment.fillPaymentDetails(
            "John Doe",
            "4111111111111111",
            "123",
            "12",
            "2030"
        );

        await payment.clickPayAndConfirmOrder();

        await payment.verifyOrderPlaced();

        await payment.clickContinue();

    });

});