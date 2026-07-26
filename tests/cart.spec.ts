import { test } from "../fixtures/baseFixtures";

test.describe("Cart Module", () => {

    test.describe.configure({ mode: "serial"});

    test.beforeEach(async ({ page, cartPage }) => {

        // Route blocking...

        await page.goto("https://automationexercise.com", {
    waitUntil: "domcontentloaded",
   });
        await cartPage.clearCart();

        await page.goto("https://automationexercise.com", {
    waitUntil: "domcontentloaded",

    });
})

    test("Add Single Product", async ({ cartPage }) => {

        await cartPage.addFirstProduct();
        await cartPage.openCart();
        await cartPage.verifyProductsInCart(1);

    });

    test("Add Multiple Products", async ({ cartPage }) => {

        await cartPage.addFirstProduct();
        await cartPage.continueShopping();
        await cartPage.addSecondProduct();
        await cartPage.continueShopping();
        await cartPage.openCart();
        await cartPage.verifyProductsInCart(2);

    });

    test("Verify Quantity", async ({ cartPage }) => {

        await cartPage.addFirstProduct();
        await cartPage.openCart();
        await cartPage.verifyQuantity("1");

    });

    test("Remove Product", async ({ cartPage }) => {

        await cartPage.addFirstProduct();
        await cartPage.openCart();
        await cartPage.removeFirstProduct();
        await cartPage.verifyProductRemoved();

    });
  })

