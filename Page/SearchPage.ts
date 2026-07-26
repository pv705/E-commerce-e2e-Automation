import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {

    readonly productsMenu: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProductsHeading: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        super(page);

        this.productsMenu = page.getByRole("link", {
            name: "Products"
        });

        this.searchInput = page.locator("#search_product");

        this.searchButton = page.locator("#submit_search");

        this.searchedProductsHeading = page.getByRole("heading", {
            name: "Searched Products"
        });

        this.productCards = page.locator(".features_items .product-image-wrapper");
    }

    async navigateToProducts() {
        await this.productsMenu.click();
        await expect(this.page).toHaveURL(/products/);
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async verifySearchResults() {
        await expect(this.searchedProductsHeading).toBeVisible();
        await expect(this.productCards.first()).toBeVisible();
    }

    async verifyProductPresent(productName: string) {
        await expect(
            this.page.getByText(productName, { exact: false }).first()
        ).toBeVisible();
    }

    async verifyResultsCountGreaterThanZero() {
        await expect(this.productCards).not.toHaveCount(0);
    }

}