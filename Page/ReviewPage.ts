import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReviewPage extends BasePage {

    readonly productsBtn: Locator;
    readonly firstProduct: Locator;

    readonly name: Locator;
    readonly email: Locator;
    readonly review: Locator;
    readonly submit: Locator;

    readonly success: Locator;

    constructor(page: Page) {

        super(page);

        this.productsBtn = page.locator('a[href="/products"]');

        this.firstProduct = page.locator("text=View Product").first();

        this.name = page.locator("#name");

        this.email = page.locator("#email");

        this.review = page.locator("#review");

        this.submit = page.locator("#button-review");

       this.success = page.locator(".alert-success", {
    hasText: "Thank you for your review."
});

    }

    async openReviewSection() {

        await this.productsBtn.click();

        await this.firstProduct.click();

    }

    async submitReview(
        user: string,
        email: string,
        message: string
    ) {

        await this.name.fill(user);

        await this.email.fill(email);

        await this.review.fill(message);

        await this.submit.click();

    }

    async verifyReviewSubmitted() {
    await expect(this.success).toBeVisible();
}

}