import { test } from "@playwright/test";
import { Registration } from "../Page/Registration";

test("E2E User Registration", async ({ page }) => {

    const register = new Registration(page);

    const email = `user${Date.now()}@gmail.com`;

    await page.goto("https://automationexercise.com/signup");

    await register.username.fill("Pulkit");
    await register.email.fill(email);
   
    await register.signupButton.click();

    await register.selectSalutation("Mr");

    await register.password.fill("Jd@12345");

    await register.selectDOB("28", "9", "2003");

    await register.firstname.fill('p');
    await register.lastname.fill('v');
    await register.address.fill("MP");
    await register.country.selectOption("India");
    await register.state.fill("Delhi");
    await register.city.fill("New Delhi");
    await register.zipcode.fill("110076");
    await register.mobile.fill("9876543210");

    await register.createAccButton.click();

    await register.verifyAccountCreated();

    await page.pause();

});