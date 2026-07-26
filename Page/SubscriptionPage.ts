import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SubscriptionPage extends BasePage {

    readonly subscriptionHeading: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.subscriptionHeading = page.getByRole("heading", {
            name: "Subscription"
        });

        this.emailInput = page.locator("#susbscribe_email");

        this.subscribeButton = page.locator("#subscribe");

        this.successMessage = page.locator(".alert-success");
    }

    async subscribe(email: string) {

        await this.subscriptionHeading.scrollIntoViewIfNeeded();

        await this.emailInput.fill(email);

        await this.subscribeButton.click();

    }

    async verifySubscriptionSuccess() {

        await expect(this.successMessage)
            .toContainText("You have been successfully subscribed!");

    }

}