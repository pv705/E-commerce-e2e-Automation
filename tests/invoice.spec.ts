import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { loginPage } from "../Page/LoginPage";
import { CartPage } from "../Page/CartPage";
import { CheckoutPage } from "../Page/CheckoutPage";
import { PaymentPage } from "../Page/PaymentPage";
import { InvoicePage } from "../Page/InvoicePage";

test("Verify user can download invoice", async ({ page }) => {

    // const login = new loginPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const payment = new PaymentPage(page);
    const orderPlaced = new InvoicePage(page);

    // // Login
     await page.goto('https://automationexercise.com/signup');
    // await login.login("johndoe75@gmail.com", "JD@12345");

    // Cart
    await cart.clearCart();
    await cart.addFirstProduct();
    await cart.openCart();

    // Checkout
    await checkout.clickProceedToCheckout();
    await checkout.enterMessage("Please deliver soon.");
    await checkout.clickPlaceOrder();

    // Payment
    await payment.fillPaymentDetails(
        "John Doe",
        "4111111111111111",
        "123",
        "03",
        "2029"
    );

    await payment.clickPayAndConfirmOrder();
    await payment.verifyOrderPlaced();

    // Download Invoice
    const downloadPromise = page.waitForEvent("download");

    await orderPlaced.downloadInvoice();

    const download = await downloadPromise;

    const filePath = path.join(
        process.cwd(),
        "downloads",
        await download.suggestedFilename()
    );

    await download.saveAs(filePath);

    expect(fs.existsSync(filePath)).toBeTruthy();

    await orderPlaced.clickContinue();
});