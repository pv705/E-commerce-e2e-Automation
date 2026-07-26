import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async type(locator: Locator, text: string) {
    await locator.type(text);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }

  async isVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async verifyText(locator: Locator, expectedText: string) {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async waitForLocator(locator: Locator) {
    await locator.waitFor({ state: "visible" });
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}