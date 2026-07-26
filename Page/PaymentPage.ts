import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentPage extends BasePage {

    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payAndConfirmOrderBtn: Locator;
    readonly orderPlacedHeading: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.nameOnCard = page.locator('input[data-qa="name-on-card"]');
        this.cardNumber = page.locator('input[data-qa="card-number"]');
        this.cvc = page.locator('input[data-qa="cvc"]');
        this.expiryMonth = page.locator('input[data-qa="expiry-month"]');
        this.expiryYear = page.locator('input[data-qa="expiry-year"]');

        this.payAndConfirmOrderBtn = page.getByRole("button", {
            name: "Pay and Confirm Order"
        });

        this.orderPlacedHeading = page.getByRole("heading", {
            name: "Order Placed!"
        });

        this.continueBtn = page.getByRole("link", {
            name: "Continue"
        });
    }

    async enterNameOnCard(name: string) {
        await this.nameOnCard.fill(name);
    }

    async enterCardNumber(number: string) {
        await this.cardNumber.fill(number);
    }

    async enterCVC(cvc: string) {
        await this.cvc.fill(cvc);
    }

    async enterExpiryMonth(month: string) {
        await this.expiryMonth.fill(month);
    }

    async enterExpiryYear(year: string) {
        await this.expiryYear.fill(year);
    }

    async fillPaymentDetails(
        name: string,
        cardNumber: string,
        cvc: string,
        month: string,
        year: string
    ) {
        await this.enterNameOnCard(name);
        await this.enterCardNumber(cardNumber);
        await this.enterCVC(cvc);
        await this.enterExpiryMonth(month);
        await this.enterExpiryYear(year);
    }

    async clickPayAndConfirmOrder() {
        await this.payAndConfirmOrderBtn.click();
    }

    async verifyOrderPlaced() {
        await expect(this.orderPlacedHeading).toBeVisible();
    }

    async clickContinue() {
        await this.continueBtn.click();
    }
}