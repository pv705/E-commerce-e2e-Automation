import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContactPage extends BasePage {

  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.getInTouchHeading = page.getByRole("heading", { name: "Get In Touch" });
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.fileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');

    // scoped to the contact form container so it can't collide with
    // unrelated ".status"/"alert-success" elements elsewhere on the page
    this.successMessage = page.locator("#contact-page .status.alert-success");
  }

  async navigateToContactUs() {
    await this.page.goto("https://automationexercise.com/contact_us");
    await expect(this.getInTouchHeading).toBeVisible();
  }

  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

 async submitForm() {
  // inline event listener — fires synchronously mid-click, unblocking
  // the paused confirm() call so click() can resolve
  this.page.once("dialog", async dialog => {
    expect(dialog.message()).toContain("Press OK");
    await dialog.accept();
  });

  await this.submitButton.click();
  // no navigation occurs on this site — confirmed empirically (30s,
  // zero navigation events). The success message is inserted via
  // client-side DOM mutation, so we just need to wait it out with
  // a longer window on the assertion itself, not a navigation wait.
}

async verifySuccessMessage() {
  await expect(this.successMessage).toBeVisible({ timeout: 15000 });
  await expect(this.successMessage).toHaveText(
    /Success! Your details have been submitted successfully/,
    { timeout: 15000 }
  );
}
}