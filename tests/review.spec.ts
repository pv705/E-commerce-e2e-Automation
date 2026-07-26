import { test } from "@playwright/test";
import { ReviewPage } from "../Page/ReviewPage";

test("Submit Product Review", async ({ page }) => {

    await page.goto("https://automationexercise.com");

    const review = new ReviewPage(page);

    await review.openReviewSection();

    await review.submitReview(

        "Pulkit",

        "pulkit@gmail.com",

        "Excellent product."

    );

    await review.verifyReviewSubmitted();

});