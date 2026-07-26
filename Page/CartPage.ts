import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

  readonly firstAddToCart: Locator;
  readonly secondAddToCart: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartBtn: Locator;
  readonly cartRows: Locator;
  readonly deleteButton: Locator;
  readonly quantityButton: Locator;
  readonly cartMenu: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    super(page);

    this.firstAddToCart = page.getByText("Add to cart").nth(1);
    this.secondAddToCart = page.getByText("Add to cart").nth(3);

    this.continueShoppingBtn = page.getByRole("button", {
      name: "Continue Shopping"
    });

    this.viewCartBtn = page.getByRole("link", {
      name: "View Cart"
    });

    this.cartRows = page.locator("#cart_info_table tbody tr");
    this.deleteButton = page.locator(".cart_quantity_delete").first();
    this.quantityButton = page.locator(".cart_quantity button").first();
    this.cartMenu = this.page.locator('header a[href="/view_cart"]');
    this.deleteButtons = this.page.locator(".cart_quantity_delete");
  }

  async addFirstProduct() {
    await this.firstAddToCart.dispatchEvent("click");
    await expect(this.continueShoppingBtn).toBeVisible();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
    await expect(this.continueShoppingBtn).toBeHidden();
  }

  async addSecondProduct() {
    await this.secondAddToCart.dispatchEvent("click");
    await expect(this.continueShoppingBtn).toBeVisible();
  }

  async openCart() {
  const modal = this.page.locator("#cartModal");
  if (await modal.isVisible()) {
    await this.continueShoppingBtn.click();
    await expect(this.continueShoppingBtn).toBeHidden();
  }
  await this.cartMenu.click();
  await expect(this.page).toHaveURL(/view_cart/);
}

  async verifyProductsInCart(expectedCount: number) {
    await expect(this.cartRows).toHaveCount(expectedCount);
  }

  async verifyQuantity(expectedQuantity: string) {
    await expect(this.quantityButton).toHaveText(expectedQuantity);
  }

  async removeFirstProduct() {
    await this.deleteButton.click();
  }

  async verifyProductRemoved() {
    await expect(this.cartRows).toHaveCount(0);
  }

  async clearCart() {
    await this.cartMenu.click();
    await expect(this.page).toHaveURL(/view_cart/);

    while (await this.deleteButtons.count() > 0) {
      await this.deleteButtons.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.page.goto("https://automationexercise.com");
  }
}