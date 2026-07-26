import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    readonly proceedToCheckoutBtn: Locator;
    readonly messageArea: Locator;
    readonly placeOrderBtn: Locator;
    readonly addressDetailsHeading: Locator;
    readonly reviewOrderHeading: Locator;
    readonly paymentHeading: Locator;

    constructor(page: Page) {
        super(page);

        this.proceedToCheckoutBtn = page.getByText("Proceed To Checkout");
        this.messageArea = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.getByRole("link", { name: "Place Order" });

        this.addressDetailsHeading = page.getByText("Address Details");
        this.reviewOrderHeading = page.getByText("Review Your Order");
        this.paymentHeading = page.getByRole("heading", { name: "Payment" });
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutBtn.click();
    }

    async verifyCheckoutPage() {
        await expect(this.addressDetailsHeading).toBeVisible();
        await expect(this.reviewOrderHeading).toBeVisible();
    }

    async enterMessage(message: string) {
        await this.messageArea.fill(message);
    }

    async clickPlaceOrder() {
        await this.placeOrderBtn.click();
    }

    async verifyReachedPayment() {
        await expect(this.paymentHeading).toBeVisible();
        await expect(this.page).toHaveURL(/payment/);
    }
}