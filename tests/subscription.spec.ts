import { test } from "@playwright/test";
import { SubscriptionPage } from "../Page/SubscriptionPage";

test("Subscribe successfully", async ({ page }) => {

    await page.goto("https://automationexercise.com");

    const subscription = new SubscriptionPage(page);

    await subscription.subscribe(
        `user${Date.now()}@gmail.com`
    );

    await subscription.verifySubscriptionSuccess();

});