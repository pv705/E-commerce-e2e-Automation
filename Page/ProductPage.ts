import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

    readonly productsBtn: Locator;
    readonly searchInput: Locator;
    readonly searchBtn: Locator;
    readonly searchedProductsTitle: Locator;
    readonly productCards: Locator;
    readonly firstViewProduct: Locator;
    readonly productInformation: Locator;

    constructor(page: Page) {
        super(page);

        this.productsBtn = page.locator('a[href="/products"]');

        this.searchInput = page.locator('#search_product');

        this.searchBtn = page.locator('#submit_search');

        this.searchedProductsTitle = page.locator('h2.title.text-center');

        this.productCards = page.locator('.features_items .product-image-wrapper');

        this.firstViewProduct = page.locator('.choose .nav li a').first();

        this.productInformation = page.locator('.product-information');
    }

    async navigateToProducts() {

        if (this.page.url().includes("#google_vignette")) {
        await this.page.goBack();
        await this.productsBtn.click();
    }
        await this.productsBtn.click();

        await expect(this.page).toHaveURL(/products/);

        await this.productCards.first().waitFor();
    }

    async verifyProductsPage() {
        await expect(this.page).toHaveURL(/products/);

        const count = await this.productCards.count();

        expect(count).toBeGreaterThan(0);
    }

   async searchProduct(productName: string) {
  await expect(this.searchInput).toBeVisible();

  // fill() sets the value directly without firing per-keystroke events;
  // pressSequentially() simulates real typing, which this site's JS
  // may depend on to track the search term
  await this.searchInput.click();
  await this.searchInput.pressSequentially(productName, { delay: 50 });
  await expect(this.searchInput).toHaveValue(productName);

  await this.searchBtn.click();
console.log("URL after search click:", this.page.url());

  await expect(this.searchedProductsTitle).toHaveText(
    "Searched Products",
    { timeout: 10000 }
  );

  await expect(this.productCards.first()).toBeVisible();
}
   async verifySearchResults() {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
}

    async openFirstProduct() {

        await this.firstViewProduct.scrollIntoViewIfNeeded();

        await this.firstViewProduct.click({
            force: true
        });

    }

    async verifyProductDetails() {

        await expect(this.page).toHaveURL(/product_details/);

        await expect(this.productInformation).toBeVisible();

    }

}