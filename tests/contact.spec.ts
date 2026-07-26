import { test } from "@playwright/test";
import { ContactPage } from "../Page/ContactPage";
import path from "path";

test.describe("Contact Us Module", () => {

  test.beforeEach(async ({ page }) => {
    // keep ad-blocking as defense-in-depth for the initial submit click,
    // even though it's not the root cause of this specific bug
    await page.route('**://*.doubleclick.net/**', route => route.abort());
    await page.route('**://*.googlesyndication.com/**', route => route.abort());
    await page.route('**://*.google.com/pagead/**', route => route.abort());
    await page.route('**adsbygoogle.js', route => route.abort());
  });

  test("Submit contact form successfully", async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.navigateToContactUs();
    await contact.fillForm(
      "Pulkit Verma",
      "pulkit.test@example.com",
      "Test Subject",
      "This is a test message."
    );
    await contact.uploadFile(path.join(__dirname, "../test-data/sample.txt"));
    await contact.submitForm();
    await contact.verifySuccessMessage();
  });

});