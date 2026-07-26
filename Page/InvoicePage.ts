import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InvoicePage extends BasePage {

    readonly downloadInvoiceBtn: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.downloadInvoiceBtn = page.getByRole("link", {
            name: "Download Invoice"
        });

        this.continueBtn = page.getByRole("link", {
            name: "Continue"
        });
    }

    async downloadInvoice() {
        await this.downloadInvoiceBtn.click();
    }

    async clickContinue() {
        await this.continueBtn.click();
    }
}