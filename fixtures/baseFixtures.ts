import { test as base, expect } from "@playwright/test";

import { loginPage } from "../Page/LoginPage";
import { Registration } from "../Page/Registration";
import { ProductPage } from "../Page/ProductPage";
import { CartPage } from "../Page/CartPage";
import { CheckoutPage } from "../Page/CheckoutPage";
import { PaymentPage } from "../Page/PaymentPage";
import { SearchPage } from "../Page/SearchPage";
import { ContactPage } from "../Page/ContactPage";
import { ReviewPage } from "../Page/ReviewPage";
import { InvoicePage } from "../Page/InvoicePage";
import { SubscriptionPage } from "../Page/SubscriptionPage";

type MyFixtures = {
  loginPage: loginPage;
  registrationPage: Registration;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  searchPage: SearchPage;
  contactPage: ContactPage;
  reviewPage: ReviewPage;
  invoicePage: InvoicePage;
  subscriptionPage: SubscriptionPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new Registration(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  reviewPage: async ({ page }, use) => {
    await use(new ReviewPage(page));
  },

  invoicePage: async ({ page }, use) => {
    await use(new InvoicePage(page));
  },

  subscriptionPage: async ({ page }, use) => {
    await use(new SubscriptionPage(page));
  },
});

export { expect };